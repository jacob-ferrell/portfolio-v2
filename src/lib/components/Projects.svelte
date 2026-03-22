<script>
  import { onMount } from 'svelte';
  import bugTracker from '../../assets/projectScreenshots/bug-tracker-screenshot2.png';
  import chesstopia from '../../assets/projectScreenshots/chesstopia.gif';

  const projects = [
    {
      name: 'Chesstopia',
      description: 'An online chess game featuring real-time multiplayer play, built with React, Java/Spring, and PostgreSQL.',
      image: chesstopia,
      repo: 'https://github.com/jacob-ferrell/chesstopia',
      demo: 'https://chess.jacobferrell.net',
      tags: ['React', 'Java', 'Spring', 'PostgreSQL'],
    },
    {
      name: 'Bug Tracker',
      description: 'A full-featured project management app for tracking bugs and issues, built with the MERN stack.',
      image: bugTracker,
      repo: 'https://github.com/jacob-ferrell/bug-tracker',
      demo: 'https://bug-tracker-rcf6.onrender.com/',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
    {
      name: 'Key2Glory',
      description: 'A typing speed test app with multiple modes — standard words, numbers, and special characters — featuring Auth0 authentication and stats tracking.',
      image: null,
      repo: 'https://github.com/jacob-ferrell/key2glory-frontend',
      demo: 'https://key2glory.jacobferrell.net',
      tags: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Auth0'],
    },
  ];

  let visible = false;
  let sectionEl;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="projects" bind:this={sectionEl}>
  <div class="section-inner">
    <h2 class="section-title {visible ? 'visible' : ''}">Projects</h2>
    <div class="cards">
      {#each projects as project, i}
        <article class="card {visible ? 'visible' : ''}" style="--delay: {i * 120}ms">
          <a href={project.demo} target="_blank" rel="noopener noreferrer" class="card-image-link">
            <div class="card-image">
              {#if project.image}
                <img src={project.image} alt="{project.name} screenshot" />
              {:else}
                <div class="img-placeholder">
                  <span>{project.name}</span>
                </div>
              {/if}
              <div class="image-overlay">
                <span>View Demo</span>
              </div>
            </div>
          </a>
          <div class="card-body">
            <div class="card-tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
            <h3 class="card-title">
              <a href={project.demo} target="_blank" rel="noopener noreferrer">{project.name}</a>
            </h3>
            <p class="card-desc">{project.description}</p>
            <div class="card-links">
              <a href={project.repo} target="_blank" rel="noopener noreferrer" class="card-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" class="card-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Live Demo
              </a>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    padding: 6rem 1.5rem;
    background: var(--surface-alt);
  }

  .section-inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 800;
    color: var(--text);
    margin: 0 0 2.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .section-title.visible {
    opacity: 1;
    transform: none;
  }

  .section-title::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: var(--accent);
    margin-top: 0.5rem;
    border-radius: 2px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease var(--delay), transform 0.5s ease var(--delay), border-color 0.2s;
  }

  .card.visible {
    opacity: 1;
    transform: none;
  }

  .card:hover {
    border-color: var(--accent);
  }

  .card-image-link {
    display: block;
    overflow: hidden;
  }

  .card-image {
    position: relative;
    overflow: hidden;
    height: 200px;
    background: var(--surface-alt);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.4s ease;
  }

  .card:hover .card-image img {
    transform: scale(1.04);
  }

  .img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    border-bottom: 1px dashed var(--border);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.04em;
  }

  .card:hover .image-overlay {
    opacity: 1;
  }

  .card-body {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .tag {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent);
    background: var(--accent-subtle);
    padding: 0.2rem 0.55rem;
    border-radius: 4px;
  }

  .card-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
  }

  .card-title a {
    color: var(--text);
    text-decoration: none;
    transition: color 0.2s;
  }

  .card-title a:hover {
    color: var(--accent);
  }

  .card-desc {
    color: var(--text-muted);
    font-size: 0.875rem;
    line-height: 1.65;
    margin: 0;
    flex: 1;
  }

  .card-links {
    display: flex;
    gap: 1rem;
    margin-top: 0.25rem;
  }

  .card-link {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .card-link:hover {
    color: var(--accent);
  }
</style>
