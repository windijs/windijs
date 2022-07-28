<script>
import { lg } from 'windijs';

  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import { bg, w } from "./windi"

  const logo = [bg.orange[300], lg(bg.green[400])];
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" use:w={[bg.indigo[300]]} alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src={svelteLogo} class="logo svelte" use:w={logo} alt="Svelte Logo" />
    </a>
  </div>
  <!-- TODO: can svelte support Array as class param, without toString()? -->
  <!-- TODO: svelte args with array, the last element suggestion is wrong -->
  <h1 class={[bg.blue[300], bg.red[500]].toString()}>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
