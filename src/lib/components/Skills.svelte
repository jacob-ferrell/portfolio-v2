<script>
  import { onMount } from 'svelte';

  const skillGroups = [
    {
      label: 'Front End',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS'],
    },
    {
      label: 'Back End',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Django', 'Python', 'Java', 'Spring', 'PostgreSQL'],
    },
    {
      label: 'Tools',
      skills: ['Git', 'GitHub'],
    },
  ];

  let visible = false;
  let sectionEl;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.15 }
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="skills" bind:this={sectionEl}>
  <div class="section-inner">
    <h2 class="section-title {visible ? 'visible' : ''}">Skills</h2>
    <div class="groups {visible ? 'visible' : ''}">
      {#each skillGroups as group, i}
        <div class="group" style="--delay: {i * 100}ms">
          <h3 class="group-label">{group.label}</h3>
          <div class="pills">
            {#each group.skills as skill}
              <span class="pill">{skill}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    padding: 6rem 1.5rem;
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

  .groups {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
  }

  .groups.visible {
    opacity: 1;
    transform: none;
  }

  .group {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    transition: border-color 0.2s;
    animation-delay: var(--delay);
  }

  .group:hover {
    border-color: var(--accent);
  }

  .group-label {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    margin: 0 0 1rem;
  }

  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .pill {
    background: var(--pill-bg);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 0.3rem 0.85rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }

  .pill:hover {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
  }
</style>
