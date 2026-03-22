<script>
  import { onMount } from 'svelte';

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

  const experience = [
    {
      company: 'Daxwell',
      role: 'Backend Software Engineer',
      period: 'May 2025 – Present',
      bullets: [
        'Designed and built a supply chain management backend from the ground up using Java, Spring Boot, and GraphQL, contributing the core architecture and making major backend design decisions.',
        'Implemented a schema-first GraphQL API, including complex queries and mutations, to support scalable data access while enforcing application-wide business rules.',
        'Designed and implemented cross-cutting backend systems, including full audit logging, field-level authorization and permissions, and centralized business validation layers.',
        'Developed Redis-based caching mechanisms to improve performance and scalability for data-intensive operations.',
        'Built and maintained CI/CD pipelines using GitHub Actions, with supporting shell scripts for automation and deployment workflows.',
        'Managed AWS infrastructure (S3 and EKS) and Kubernetes deployments to support production releases.',
      ],
    },
  ];

  const education = [
    {
      institution: 'Western Governors University',
      degree: 'B.S. Computer Science',
      period: 'October 2024',
    },
  ];
</script>

<section id="experience" bind:this={sectionEl}>
  <div class="section-inner">
    <h2 class="section-title {visible ? 'visible' : ''}">Experience</h2>
    <div class="timeline {visible ? 'visible' : ''}">
      {#each experience as job, i}
        <div class="entry" style="--delay: {i * 100}ms">
          <div class="entry-header">
            <div>
              <h3 class="entry-role">{job.role}</h3>
              <span class="entry-company">{job.company}</span>
            </div>
            <span class="entry-period">{job.period}</span>
          </div>
          <ul class="entry-bullets">
            {#each job.bullets as bullet}
              <li>{bullet}</li>
            {/each}
          </ul>
        </div>
      {/each}

      <div class="entry edu-entry" style="--delay: {experience.length * 100}ms">
        <div class="entry-header">
          <div>
            <h3 class="entry-role">Education</h3>
          </div>
        </div>
        {#each education as edu}
          <div class="edu-row">
            <div>
              <span class="edu-degree">{edu.degree}</span>
              <span class="entry-company">{edu.institution}</span>
            </div>
            <span class="entry-period">{edu.period}</span>
          </div>
        {/each}
      </div>
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

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
  }

  .timeline.visible {
    opacity: 1;
    transform: none;
  }

  .entry {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.75rem;
    transition: border-color 0.2s;
  }

  .entry:hover {
    border-color: var(--accent);
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  .entry-role {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin: 0 0 0.2rem;
  }

  .entry-company {
    font-size: 0.9rem;
    color: var(--accent);
    font-weight: 600;
    display: block;
  }

  .entry-period {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 500;
    white-space: nowrap;
    background: var(--pill-bg);
    border: 1px solid var(--border);
    padding: 0.25rem 0.7rem;
    border-radius: 20px;
    flex-shrink: 0;
  }

  .entry-bullets {
    margin: 0;
    padding: 0 0 0 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .entry-bullets li {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.65;
  }

  .edu-entry .entry-header {
    margin-bottom: 0.75rem;
  }

  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .edu-degree {
    display: block;
    font-weight: 600;
    color: var(--text);
    font-size: 0.95rem;
    margin-bottom: 0.15rem;
  }
</style>
