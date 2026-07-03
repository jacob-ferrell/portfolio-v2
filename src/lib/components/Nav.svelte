<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { dark } from '../stores/theme.js';

  const links = ['home', 'experience', 'skills', 'projects', 'contact'];

  let activeSection = 'home';
  let menuOpen = false;
  let scrolled = false;
  let progress = 0;

  function toggleTheme() {
    dark.update(d => !d);
  }

  function handleNavClick(section) {
    menuOpen = false;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  function onScroll() {
    scrolled = window.scrollY > 8;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  }

  onMount(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll-spy: highlight the section closest to the top of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection = entry.target.id;
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    links.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  });
</script>

<nav class:scrolled>
  <div class="nav-inner">
    <button class="logo" on:click={() => handleNavClick('home')} aria-label="Back to top">
      J<span class="logo-accent">F</span>
    </button>
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
    <div class="nav-right">
      <button class="icon-btn" on:click={toggleTheme} aria-label="Toggle theme">
        {#if $dark}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
      </button>
      <button
        class="icon-btn hamburger"
        class:open={menuOpen}
        on:click={() => menuOpen = !menuOpen}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </button>
    </div>
  </div>
  <div class="progress" style="transform: scaleX({progress})" />
  {#if menuOpen}
    <div class="mobile-menu" transition:slide={{ duration: 250 }}>
      {#each links as link, i}
        <button
          class="mobile-link {activeSection === link ? 'active' : ''}"
          style="animation-delay: {i * 40}ms"
          on:click={() => handleNavClick(link)}
        >
          <span class="mobile-index">0{i + 1}</span>
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </button>
      {/each}
    </div>
  {/if}
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    background: var(--nav-bg);
    border-bottom: 1px solid transparent;
    transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
  }

  nav.scrolled {
    border-bottom-color: var(--border);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  }

  .progress {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent-hover));
    transform-origin: left;
    transform: scaleX(0);
  }

  .nav-inner {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    background: none;
    border: none;
    padding: 0;
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--text);
    cursor: pointer;
    letter-spacing: 0.03em;
    user-select: none;
    font-family: inherit;
    transition: transform 0.2s;
  }

  .logo:hover {
    transform: scale(1.08);
  }

  .logo-accent {
    color: var(--accent);
  }

  .nav-links {
    display: flex;
    gap: 0.25rem;
  }

  .nav-link {
    position: relative;
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

  .nav-link::after {
    content: '';
    position: absolute;
    left: 0.75rem;
    right: 0.75rem;
    bottom: 0.1rem;
    height: 2px;
    border-radius: 1px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .nav-link:hover {
    color: var(--text);
    background: var(--surface-hover);
  }

  .nav-link.active {
    color: var(--text);
    font-weight: 600;
  }

  .nav-link.active::after {
    transform: scaleX(1);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    padding: 0;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
  }

  .icon-btn:hover {
    color: var(--text);
    background: var(--surface-hover);
    border-color: var(--text-muted);
  }

  .icon-btn:active {
    transform: scale(0.92);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
  }

  .bar {
    display: block;
    width: 16px;
    height: 2px;
    border-radius: 1px;
    background: currentColor;
    transition: transform 0.25s, opacity 0.2s;
  }

  .hamburger.open .bar:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .hamburger.open .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open .bar:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  .mobile-menu {
    display: none;
    flex-direction: column;
    padding: 0.5rem 1rem 1.25rem;
    border-top: 1px solid var(--border);
  }

  .mobile-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1.05rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    padding: 0.85rem 0.75rem;
    text-align: left;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
    animation: menuItemIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes menuItemIn {
    from {
      opacity: 0;
      transform: translateX(-12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .mobile-index {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--accent);
    font-variant-numeric: tabular-nums;
  }

  .mobile-link:hover {
    color: var(--text);
    background: var(--surface-hover);
  }

  .mobile-link.active {
    color: var(--accent);
    font-weight: 600;
    background: var(--accent-subtle);
  }

  @media (max-width: 640px) {
    .nav-links {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .mobile-menu {
      display: flex;
    }
  }
</style>
