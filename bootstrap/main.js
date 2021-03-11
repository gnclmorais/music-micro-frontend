const availableApps = {
  hello: '/mfe/welcome',
  play: '/mfe/music',
};

const unmountClass = 'unmount';
const injectScript = (parent, src, innerHTML) => {
  const script = document.createElement('SCRIPT');

  // There there is no `src`, setting it would cause the <script> tag to try to
  // fetch a file from the href `undefined`
  if (src) script.src = src;

  script.innerHTML = innerHTML;
  script.classList.add(unmountClass);

  return parent.appendChild(script);
}

function unmount() {
  const head = document.head;
  const body = document.body;

  // Empty head
  const headChildren = head.querySelectorAll(`.${unmountClass}`);
  Array.from(headChildren).forEach((child) => head.removeChild(child));

  // Empty body
  body.innerHTML = '';
}

function mount(frontend, page) {
  console.log(`Mounting ${frontend}…`);

  const { host } = new URL(window.location.href);
  const base = availableApps[frontend];

  console.log(`Fetching ${base}…`);

  fetch(`http://${host}${base}`)
    .then(response => response.text())
    .then((html) => {
      const head = document.head;
      const body = document.body;

      // Replace the content of the current <head> with a <base> element
      const baseEl = `<base href="${base}/">`;
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
          node.classList.add(unmountClass);
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
}

function navigateTo(url, { back = false } = {}) {
  console.log(`Navigating to ${url}`)

  unmount();

  if (back) {
    history.replaceState({ id: url }, '', url);
  } else {
    history.pushState({ id: url }, '', url);
  }

  const [, frontend, , page] = url.split('/')
  mount(frontend, page);
}

// Set up our public API
if (!window.bootstrap) {
  window.bootstrap = { router: { navigateTo } };
}

// Navigate to our first page
const { pathname } = new URL(window.location.href);
navigateTo(pathname);

// Set up back and forward control
window.addEventListener('popstate', ({ state: { id: url } }) => navigateTo(url, { back: true }));
