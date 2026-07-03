<script>
  import { reveal } from '../actions/reveal.js';
  import bugTracker from '../../assets/projectScreenshots/bug-tracker-screenshot2.png';
  import key2glory from '../../assets/projectScreenshots/key2glory.png';
  import chesstopia from '../../assets/projectScreenshots/chesstopia.gif';
  import marketDataFeed from '../../assets/projectScreenshots/market-data-feed.svg';

  const projects = [
    {
      name: 'Market Data Feed',
      description:
        'A lock-free C++ processor for a simulated market data stream — maintains a per-instrument order book and publishes best-bid/ask snapshots through hand-written SPSC ring buffers. 330 ns p99 processing latency at ~4.9M msg/s across 1000 instruments, with zero hot-path allocation. TSan/ASan clean.',
      image: marketDataFeed,
      chart: true,
      repo: 'https://github.com/jacob-ferrell/market-data-feed',
      metrics: ['330 ns p99', '4.9M msg/s', 'TSan/ASan clean'],
      tags: ['C++', 'Lock-free', 'Concurrency', 'Systems'],
    },
    {
      name: 'Chesstopia',
      description: 'An online chess game featuring real-time multiplayer play via websockets, built with React, Java/Spring, and PostgreSQL.',
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
      demo: 'https://bugtracker.jacobferrell.net/',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
    {
      name: 'Key2Glory',
      description: 'A typing speed test app with multiple modes — standard words, numbers, and special characters — featuring Auth0 authentication and stats tracking.',
      image: key2glory,
      repo: 'https://github.com/jacob-ferrell/key2glory-frontend',
      demo: 'https://key2glory.jacobferrell.net',
      tags: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Auth0'],
    },
  ];

  // Track pointer position per-card for the spotlight glow
  function spotlight(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }
</script>

<section id="projects">
  <div class="section-inner">
    <h2 class="section-title" use:reveal>
      <span class="title-index">03</span>
      Projects
    </h2>
    <div class="cards">
      {#each projects as project, i}
        <article
          class="card"
          use:reveal={{ delay: 100 + i * 130 }}
          on:pointermove={spotlight}
        >
          <div class="spotlight" aria-hidden="true" />
          <a href={project.demo || project.repo} target="_blank" rel="noopener noreferrer" class="card-image-link" aria-label="{project.name} {project.demo ? 'live demo' : 'source code'}">
            <div class="card-image" class:chart={project.chart}>
              {#if project.image}
                <img src={project.image} alt="{project.name} {project.chart ? 'latency chart' : 'screenshot'}" loading="lazy" />
              {:else}
                <div class="img-placeholder">
                  <span>{project.name}</span>
                </div>
              {/if}
              <div class="image-overlay">
                <span class="overlay-pill">
                  {project.demo ? 'View Demo' : 'View Code'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </span>
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
              <a href={project.demo || project.repo} target="_blank" rel="noopener noreferrer">{project.name}</a>
            </h3>
            {#if project.metrics}
              <div class="card-metrics">
                {#each project.metrics as metric}
                  <span class="metric">{metric}</span>
                {/each}
              </div>
            {/if}
            <p class="card-desc">{project.description}</p>
            <div class="card-links">
              <a href={project.repo} target="_blank" rel="noopener noreferrer" class="card-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                GitHub
              </a>
              {#if project.demo}
                <a href={project.demo} target="_blank" rel="noopener noreferrer" class="card-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              {/if}
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
    max-width: 960px;
    margin: 0 auto;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .card {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition:
      border-color 0.25s,
      box-shadow 0.25s,
      transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .card:hover {
    border-color: var(--accent);
    transform: translateY(-6px);
    box-shadow: var(--card-shadow-hover);
  }

  .spotlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), var(--accent-glow-soft), transparent 65%);
    transition: opacity 0.3s;
    z-index: 1;
  }

  .card:hover .spotlight {
    opacity: 1;
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
    border-bottom: 1px solid var(--border);
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Charts render with dark text on transparency; a white panel keeps them
     legible in both light and dark themes. */
  .card-image.chart {
    background: #ffffff;
  }

  .card-image.chart img {
    padding: 0.85rem;
  }

  .card:hover .card-image img {
    transform: scale(1.05);
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
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .overlay-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--accent);
    color: #fff;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    padding: 0.5rem 1.1rem;
    border-radius: 999px;
    transform: translateY(8px);
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .card:hover .image-overlay {
    opacity: 1;
  }

  .card:hover .overlay-pill {
    transform: translateY(0);
  }

  .card-body {
    position: relative;
    z-index: 2;
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

  .card-metrics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .metric {
    font-size: 0.74rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--text);
    background: var(--surface-alt);
    border: 1px solid var(--border);
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
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
