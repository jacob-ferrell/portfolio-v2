<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Nav from './lib/components/Nav.svelte';
  import Hero from './lib/components/Hero.svelte';
  import Experience from './lib/components/Experience.svelte';
  import Skills from './lib/components/Skills.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Contact from './lib/components/Contact.svelte';
  import { dark } from './lib/stores/theme.js';

  $: document.documentElement.setAttribute('data-theme', $dark ? 'dark' : 'light');

  let showTopBtn = false;

  onMount(() => {
    const onScroll = () => {
      showTopBtn = window.scrollY > window.innerHeight;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<div class="app">
  <Nav />
  <main>
    <Hero />
    <Experience />
    <Skills />
    <Projects />
    <Contact />
  </main>
  <footer>
    <p>Jacob Ferrell &copy; {new Date().getFullYear()} &mdash; Built with Svelte</p>
  </footer>

  {#if showTopBtn}
    <button
      class="to-top"
      on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      transition:fly={{ y: 16, duration: 250 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  {/if}
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  footer {
    text-align: center;
    padding: 1.5rem;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.8rem;
    background: var(--surface-alt);
  }

  .to-top {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 90;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text-muted);
    cursor: pointer;
    box-shadow: var(--shadow);
    transition: color 0.2s, border-color 0.2s, transform 0.2s;
  }

  .to-top:hover {
    color: var(--accent);
    border-color: var(--accent);
    transform: translateY(-3px);
  }
</style>
