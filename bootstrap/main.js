const { protocol, host, pathname } = new URL(window.location.href);
const appToLoad = pathname.replace(/\//g, '');
const availableApps = {
  hello: '/mfe/welcome',
  play: '/mfe/music',
};

console.log(`Fetching ${host}${availableApps[appToLoad]}…`);

const injectScript = (parent, src, innerHTML) => {
  const script = document.createElement('SCRIPT');

  script.src = src;
  script.innerHTML = innerHTML;

  return parent.appendChild(script);
}

const newPath = availableApps[appToLoad];
fetch(`http://${host}${newPath}`)
  .then(response => response.text())
  .then((html) => {
    const head = document.head;
    const body = document.body;

    // Replace the content of the current <head> with a <base> element
    const baseEl = `<base href="${newPath}/">`;
    head.innerHTML = baseEl;

    // Parse the page received
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Import <head> first
    const headChildren = Array.from(doc.querySelector('head').childNodes);
    headChildren.forEach(node => {
      if (node.nodeName === 'SCRIPT') {
        injectScript(head, node.src);
      } else {
        head.appendChild(document.adoptNode(node));
      }
    });

    // Import <body> next
    const srcRegex = /<script.*?src="(.*?)"/;
    const bodyChildren = Array.from(doc.querySelector('body').childNodes);
    bodyChildren.forEach(node => {
      if (node.nodeName === 'SCRIPT') {
        // For some reason, <base> doesn't change the `src` as expected,
        // so some magic is required to get it…
        const src = (srcRegex.exec(node.outerHTML) || [])[1];
        injectScript(body, src, node.innerHTML);
      } else {
        body.appendChild(document.adoptNode(node));
      }
    });
  })
  .catch(console.log);
