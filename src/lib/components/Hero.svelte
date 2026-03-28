<script>
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="home">
  <div class="hero-content">
    <h1 class="name">Jacob Ferrell</h1>
    <p class="title">Backend Software Engineer</p>
    <p class="bio">
      Backend software engineer specializing in distributed systems, API design, and cloud infrastructure.
      At Daxwell, I architected a supply chain management platform from the ground up — delivering a schema-first
      GraphQL API, cross-cutting backend systems, and the AWS/Kubernetes infrastructure powering it in production.
    </p>
    <div class="cta-row">
      <a
        href="https://docs.google.com/document/d/1EjZxIKgkSwgWMlyLXrC8quvW_wmdEaaPp8r1xO8JL68/export?format=pdf"
        class="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Resume
      </a>
      <button class="btn btn-outline" on:click={() => scrollTo('projects')}>
        View Projects
      </button>
    </div>
    <div class="social-links">
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
</section>

<style>
  section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 1.5rem 2rem;
  }

  .hero-content {
    max-width: 620px;
    width: 100%;
    animation: fadeUp 0.7s ease both;
  }

  .name {
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    margin: 0 0 0.5rem;
    color: var(--text);
  }

  .title {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    color: var(--text-muted);
    margin: 0 0 1.25rem;
    font-weight: 400;
  }

  .bio {
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0 0 2rem;
    max-width: 500px;
  }

  .cta-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .btn {
    padding: 0.65rem 1.5rem;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: var(--accent);
    color: #fff;
  }

  .btn-primary:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
  }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1.5px solid var(--border-strong);
  }

  .btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-1px);
  }

  .social-links {
    display: flex;
    gap: 1rem;
  }

  .social-links a {
    color: var(--text-muted);
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 0.2s, transform 0.2s;
  }

  .social-links a:hover {
    color: var(--accent);
    transform: translateY(-2px);
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
