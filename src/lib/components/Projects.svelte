<script>
  import { reveal } from '../actions/reveal.js';
  import bugTracker from '../../assets/projectScreenshots/bug-tracker-screenshot2.png';
  import key2glory from '../../assets/projectScreenshots/key2glory.png';
  import chesstopia from '../../assets/projectScreenshots/chesstopia.gif';
  import marketDataFeed from '../../assets/projectScreenshots/market-data-feed.svg';
  import mdfPin from '../../assets/projectScreenshots/market-data-feed-pin.svg';
  import mdfOverTime from '../../assets/projectScreenshots/market-data-feed-over-time.svg';
  import mdfSpec from '../../assets/projectScreenshots/market-data-feed-spec.svg';

  const projects = [
    {
      name: 'Market Data Feed',
      category: 'systems',
      description:
        'A lock-free C++ processor for a simulated market data stream — maintains a per-instrument order book and publishes best-bid/ask snapshots through hand-written SPSC ring buffers. 330 ns p99 processing latency at ~4.9M msg/s across 1000 instruments, with zero hot-path allocation. TSan/ASan clean.',
      image: marketDataFeed,
      chart: true,
      repo: 'https://github.com/jacob-ferrell/market-data-feed',
      metrics: ['330 ns p99', '4.9M msg/s', 'TSan/ASan clean'],
      tags: ['C++', 'Lock-free', 'Concurrency', 'Systems'],
      gallery: [
        { src: marketDataFeed, caption: 'Per-message processing latency against the 1 µs p99 target.' },
        { src: mdfPin, caption: 'Thread pinning: --pin vs. no pin across percentiles.' },
        { src: mdfOverTime, caption: 'Latency and throughput stability across a run.' },
        { src: mdfSpec, caption: 'Requirements vs. measured results.' },
      ],
    },
    {
      name: 'Chesstopia',
      category: 'web',
      description: 'An online chess game featuring real-time multiplayer play via websockets, built with React, Java/Spring, and PostgreSQL.',
      image: chesstopia,
      repo: 'https://github.com/jacob-ferrell/chesstopia',
      demo: 'https://chess.jacobferrell.net',
      tags: ['React', 'Java', 'Spring', 'PostgreSQL'],
    },
    {
      name: 'Bug Tracker',
      category: 'web',
      description: 'A full-featured project management app for tracking bugs and issues, built with the MERN stack.',
      image: bugTracker,
      repo: 'https://github.com/jacob-ferrell/bug-tracker',
      demo: 'https://bugtracker.jacobferrell.net/',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
    {
      name: 'Key2Glory',
      category: 'web',
      description: 'A typing speed test app with multiple modes — standard words, numbers, and special characters — featuring Auth0 authentication and stats tracking.',
      image: key2glory,
      repo: 'https://github.com/jacob-ferrell/key2glory-frontend',
      demo: 'https://key2glory.jacobferrell.net',
      tags: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Auth0'],
    },
  ];

  // Higher-level grouping shown as labeled sections. Systems work leads, so it
  // reads first to a low-latency / quant audience; ordering here is the display
  // order. A group with no matching projects is skipped in the template.
  const groups = [
    {
      id: 'systems',
      label: 'Systems & Low-Latency',
      blurb: 'Performance-critical C++ built and measured against hard latency and throughput targets.',
    },
    {
      id: 'web',
      label: 'Full-Stack & Web',
      blurb: 'End-to-end web applications across the React and Java/Node stacks.',
    },
  ].map((group) => ({
    ...group,
    projects: projects.filter((p) => p.category === group.id),
  }));

  // Track pointer position per-card for the spotlight glow
  function spotlight(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  // Lightbox for chart-based projects — the charts are the content, so let
  // visitors open them full size.
  let lightbox = null;
  let lightboxIndex = 0;

  function openLightbox(project) {
    lightbox = project;
    lightboxIndex = 0;
  }

  function closeLightbox() {
    lightbox = null;
  }

  function nextItem() {
    if (lightbox) lightboxIndex = (lightboxIndex + 1) % lightbox.gallery.length;
  }

  function prevItem() {
    if (lightbox) lightboxIndex = (lightboxIndex - 1 + lightbox.gallery.length) % lightbox.gallery.length;
  }

  function onKeydown(e) {
    if (!lightbox) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') nextItem();
    else if (e.key === 'ArrowLeft') prevItem();
  }
</script>

<svelte:window on:keydown={onKeydown} />

<section id="projects">
  <div class="section-inner">
    <h2 class="section-title" use:reveal>
      <span class="title-index">03</span>
      Projects
    </h2>
    {#each groups as group}
      {#if group.projects.length}
        <div class="group" use:reveal>
          <div class="group-head">
            <h3 class="group-label">{group.label}</h3>
            <p class="group-blurb">{group.blurb}</p>
          </div>
          <div class="cards">
            {#each group.projects as project, i}
        <article
          class="card"
          use:reveal={{ delay: 100 + i * 130 }}
          on:pointermove={spotlight}
        >
          <div class="spotlight" aria-hidden="true" />
          <a
            href={project.demo || project.repo}
            target="_blank"
            rel="noopener noreferrer"
            class="card-image-link"
            aria-label="{project.name} {project.gallery ? 'result charts' : project.demo ? 'live demo' : 'source code'}"
            on:click={(e) => { if (project.gallery) { e.preventDefault(); openLightbox(project); } }}
          >
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
                  {project.gallery ? 'View Results' : project.demo ? 'View Demo' : 'View Code'}
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
      {/if}
    {/each}
  </div>
</section>

{#if lightbox}
  <div
    class="lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="{lightbox.name} results"
    on:click={closeLightbox}
  >
    <div class="lightbox-panel" on:click|stopPropagation>
      <div class="lightbox-head">
        <h3>{lightbox.name} — results</h3>
        <div class="lightbox-actions">
          <a href={lightbox.repo} target="_blank" rel="noopener noreferrer" class="lightbox-gh">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            View on GitHub
          </a>
          <button type="button" class="lightbox-close" on:click={closeLightbox} aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="lightbox-body">
        <button type="button" class="lightbox-nav" on:click={prevItem} aria-label="Previous chart">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <figure class="lightbox-figure">
          <img src={lightbox.gallery[lightboxIndex].src} alt={lightbox.gallery[lightboxIndex].caption} />
          <figcaption>{lightbox.gallery[lightboxIndex].caption}</figcaption>
        </figure>
        <button type="button" class="lightbox-nav" on:click={nextItem} aria-label="Next chart">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
      <div class="lightbox-dots">
        {#each lightbox.gallery as _, i}
          <button
            type="button"
            class="dot"
            class:active={i === lightboxIndex}
            on:click={() => (lightboxIndex = i)}
            aria-label="Chart {i + 1}"
          />
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  section {
    padding: 6rem 1.5rem;
    background: var(--surface-alt);
  }

  .section-inner {
    max-width: 960px;
    margin: 0 auto;
  }

  .group + .group {
    margin-top: 3.5rem;
  }

  .group-head {
    margin-bottom: 1.5rem;
  }

  .group-label {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .group-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .group-blurb {
    margin: 0.4rem 0 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-muted);
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

  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: fade-in 0.2s ease;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lightbox-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    width: min(1040px, 100%);
    max-height: 92vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .lightbox-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border);
  }

  .lightbox-head h3 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text);
  }

  .lightbox-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .lightbox-gh {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: #fff;
    background: var(--accent);
    text-decoration: none;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    transition: opacity 0.2s;
  }

  .lightbox-gh:hover {
    opacity: 0.88;
  }

  .lightbox-close {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }

  .lightbox-close:hover {
    color: var(--text);
    background: var(--surface-hover);
  }

  .lightbox-body {
    padding: 1.25rem;
    overflow-y: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .lightbox-nav {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface-alt);
    color: var(--text);
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }

  .lightbox-nav:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .lightbox-figure {
    margin: 0;
    flex: 1;
    min-width: 0;
    text-align: center;
  }

  .lightbox-figure img {
    width: 100%;
    max-height: 66vh;
    object-fit: contain;
    display: block;
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem;
  }

  .lightbox-figure figcaption {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .lightbox-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 1.25rem 1.25rem;
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: var(--border);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }

  .dot:hover {
    transform: scale(1.2);
  }

  .dot.active {
    background: var(--accent);
  }

  @media (max-width: 560px) {
    .lightbox-nav {
      display: none;
    }
    .lightbox-gh span,
    .lightbox-head h3 {
      font-size: 0.95rem;
    }
  }
</style>
