<script>
  import { onMount } from 'svelte';

  const specialties = [
    'distributed systems',
    'GraphQL API design',
    'cloud infrastructure',
    'CI/CD automation',
  ];

  let typed = '';
  let specialtyIndex = 0;

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typed = specialties[0];
      return;
    }

    let timer;
    let deleting = false;
    let char = 0;

    function tick() {
      const word = specialties[specialtyIndex];
      if (!deleting) {
        char++;
        typed = word.slice(0, char);
        if (char === word.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 55 + Math.random() * 45);
      } else {
        char--;
        typed = word.slice(0, char);
        if (char === 0) {
          deleting = false;
          specialtyIndex = (specialtyIndex + 1) % specialties.length;
        }
        timer = setTimeout(tick, deleting ? 28 : 350);
      }
    }

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  });
</script>

<section id="home">
  <div class="glow glow-1" aria-hidden="true" />
  <div class="glow glow-2" aria-hidden="true" />

  <div class="hero-content">
    <p class="eyebrow" style="--stagger: 0">Hi, my name is</p>
    <h1 class="name" style="--stagger: 1">Jacob Ferrell<span class="dot">.</span></h1>
    <p class="title" style="--stagger: 2">Backend Software Engineer</p>
    <p class="typed-line" style="--stagger: 3">
      I build <span class="typed">{typed}</span><span class="caret" aria-hidden="true" />
    </p>
    <p class="bio" style="--stagger: 4">
      I design and build production backend systems end to end — from data modeling and API design
      to deployment and cloud infrastructure. I care about clean architecture, scalability, and
      shipping software that holds up in the real world.
    </p>
    <div class="cta-row" style="--stagger: 5">
      <a
        href="https://docs.google.com/document/d/1EjZxIKgkSwgWMlyLXrC8quvW_wmdEaaPp8r1xO8JL68/export?format=pdf"
        class="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Resume
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </a>
      <button class="btn btn-outline" on:click={() => scrollTo('projects')}>
        View Projects
      </button>
    </div>
    <div class="social-links" style="--stagger: 6">
      <a href="https://www.linkedin.com/in/mjferrell" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      </a>
      <a href="https://www.github.com/jacob-ferrell" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      </a>
      <a href="#contact" on:click|preventDefault={() => scrollTo('contact')} aria-label="Email">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
    </div>
  </div>

  <button class="scroll-cue" on:click={() => scrollTo('experience')} aria-label="Scroll to experience">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  </button>
</section>

<style>
  section {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 1.5rem 4rem;
    overflow: hidden;
  }

  .glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    opacity: 0.55;
  }

  .glow-1 {
    width: 420px;
    height: 420px;
    top: 12%;
    right: -140px;
    background: radial-gradient(circle, var(--accent-glow), transparent 70%);
    animation: drift 14s ease-in-out infinite alternate;
  }

  .glow-2 {
    width: 320px;
    height: 320px;
    bottom: 5%;
    left: -120px;
    background: radial-gradient(circle, var(--accent-glow-soft), transparent 70%);
    animation: drift 18s ease-in-out infinite alternate-reverse;
  }

  @keyframes drift {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(-30px, 40px) scale(1.15); }
  }

  .hero-content {
    max-width: 640px;
    width: 100%;
    position: relative;
  }

  .hero-content > * {
    animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--stagger, 0) * 90ms);
  }

  .eyebrow {
    color: var(--accent);
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    margin: 0 0 0.75rem;
  }

  .name {
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    font-weight: 900;
    line-height: 1.05;
    margin: 0 0 0.5rem;
    color: var(--text);
    letter-spacing: -0.02em;
  }

  .dot {
    color: var(--accent);
  }

  .title {
    font-size: clamp(1.15rem, 3vw, 1.6rem);
    color: var(--text-muted);
    margin: 0 0 0.75rem;
    font-weight: 600;
  }

  .typed-line {
    font-size: clamp(1rem, 2.5vw, 1.15rem);
    color: var(--text-muted);
    margin: 0 0 1.5rem;
    min-height: 1.6em;
  }

  .typed {
    color: var(--accent);
    font-weight: 600;
  }

  .caret {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    background: var(--accent);
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink 1.1s steps(1) infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .bio {
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0 0 2rem;
    max-width: 540px;
  }

  .cta-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.6rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: var(--accent);
    color: #fff;
    box-shadow: 0 4px 18px var(--accent-glow);
  }

  .btn-primary:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--accent-glow);
  }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1.5px solid var(--border-strong);
  }

  .btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-subtle);
    transform: translateY(-2px);
  }

  .social-links {
    display: flex;
    gap: 1.1rem;
  }

  .social-links a {
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: color 0.2s, transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  }

  .social-links a:hover {
    color: var(--accent);
    border-color: var(--accent);
    transform: translateY(-3px);
    box-shadow: 0 6px 18px var(--accent-glow-soft);
  }

  .scroll-cue {
    position: absolute;
    bottom: 1.75rem;
    left: 50%;
    translate: -50% 0;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    animation: bob 2.2s ease-in-out infinite;
    transition: color 0.2s;
  }

  .scroll-cue:hover {
    color: var(--accent);
  }

  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(7px); }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(22px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .scroll-cue {
      display: none;
    }
  }
</style>
