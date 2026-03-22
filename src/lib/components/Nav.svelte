<script>
  import { dark } from '../stores/theme.js';

  let activeSection = 'home';

  function toggleTheme() {
    dark.update(d => !d);
  }

  function setActive(section) {
    activeSection = section;
  }

  function handleNavClick(section) {
    setActive(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  const links = ['home', 'skills', 'projects', 'contact'];
</script>

<nav>
  <div class="nav-inner">
    <span class="logo" on:click={() => handleNavClick('home')} on:keydown role="button" tabindex="0">JF</span>
    <div class="nav-links">
      {#each links as link}
        <button
          class="nav-link {activeSection === link ? 'active' : ''}"
          on:click={() => handleNavClick(link)}
        >
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </button>
      {/each}
    </div>
    <button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
      {#if $dark}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      {/if}
    </button>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: var(--nav-bg);
    border-bottom: 1px solid var(--border);
    transition: background 0.3s, border-color 0.3s;
  }

  .nav-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent);
    cursor: pointer;
    letter-spacing: 0.05em;
    user-select: none;
  }

  .nav-links {
    display: flex;
    gap: 0.25rem;
  }

  .nav-link {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 0.9rem;
    font-family: inherit;
    cursor: pointer;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    transition: color 0.2s, background 0.2s;
  }

  .nav-link:hover {
    color: var(--text);
    background: var(--surface-hover);
  }

  .nav-link.active {
    color: var(--accent);
    font-weight: 600;
  }

  .theme-toggle {
    background: none;
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
  }

  .theme-toggle:hover {
    color: var(--text);
    background: var(--surface-hover);
    border-color: var(--text-muted);
  }

  @media (max-width: 600px) {
    .nav-link {
      font-size: 0.8rem;
      padding: 0.35rem 0.5rem;
    }
    .logo {
      font-size: 1.1rem;
    }
  }
</style>
