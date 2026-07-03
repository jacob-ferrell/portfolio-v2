<script>
  import { reveal } from '../actions/reveal.js';

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

<section id="experience">
  <div class="section-inner">
    <h2 class="section-title" use:reveal>
      <span class="title-index">01</span>
      Experience
    </h2>
    <div class="timeline">
      {#each experience as job, i}
        <div class="entry" use:reveal={{ delay: 100 + i * 120 }}>
          <span class="node" aria-hidden="true" />
          <div class="entry-card">
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
        </div>
      {/each}

      <div class="entry" use:reveal={{ delay: 100 + experience.length * 120 }}>
        <span class="node" aria-hidden="true" />
        <div class="entry-card">
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

  .timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-left: 1.75rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    border-radius: 1px;
    background: linear-gradient(180deg, var(--accent), var(--border));
  }

  .entry {
    position: relative;
  }

  .node {
    position: absolute;
    left: -1.75rem;
    top: 1.9rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-subtle), 0 0 12px var(--accent-glow);
  }

  .entry-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.75rem;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  }

  .entry-card:hover {
    border-color: var(--accent);
    box-shadow: 0 8px 30px var(--accent-glow-soft);
    transform: translateY(-3px);
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
    font-size: 1.15rem;
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
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .entry-bullets li {
    position: relative;
    padding-left: 1.25rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.65;
  }

  .entry-bullets li::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: var(--accent);
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

  @media (max-width: 640px) {
    .timeline {
      padding-left: 1.25rem;
    }

    .node {
      left: -1.25rem;
      width: 10px;
      height: 10px;
    }

    .entry-card {
      padding: 1.25rem;
    }
  }
</style>
