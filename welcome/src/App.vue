<template>
  <div class="body">
    <header class="bg-red-600 text-white flex px-6 py-5">
      <div id="logo" class="flex-shrink logo">
        <router-link to="/">Red Records</router-link>
      </div>

      <nav id="nav" class="ml-20 flex-grow flex items-center">
        <ul class="flex">
          <li class="nav-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signin">Signin</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<style>
.logo {
  font-family: Impact;
  font-size: 2em;
  text-transform: uppercase;
}

.nav-item +.nav-item::before {
  content: "|";
  display: inline;
  margin: 0 1em;
}
</style>
