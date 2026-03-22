<script>
  import Nav from './lib/components/Nav.svelte';
  import Hero from './lib/components/Hero.svelte';
  import Experience from './lib/components/Experience.svelte';
  import Skills from './lib/components/Skills.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Contact from './lib/components/Contact.svelte';
  import { dark } from './lib/stores/theme.js';

  $: document.documentElement.setAttribute('data-theme', $dark ? 'dark' : 'light');
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
</style>
