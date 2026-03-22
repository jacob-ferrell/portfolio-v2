<script>
  import { onMount } from 'svelte';

  // Existing PNGs
  import javaImg      from '../../assets/softwareLogos/java.png';
  import jsImg        from '../../assets/softwareLogos/js.png';
  import pythonImg    from '../../assets/softwareLogos/python.png';
  import htmlImg      from '../../assets/softwareLogos/html.png';
  import cssImg       from '../../assets/softwareLogos/css.png';
  import springImg    from '../../assets/softwareLogos/spring.png';
  import reactImg     from '../../assets/softwareLogos/react.png';
  import nodeImg      from '../../assets/softwareLogos/node.png';
  import expressImg   from '../../assets/softwareLogos/express.png';
  import djangoImg    from '../../assets/softwareLogos/django.png';
  import tailwindImg  from '../../assets/softwareLogos/tailwind.png';
  import postgresImg  from '../../assets/softwareLogos/postgres.png';
  import gitImg       from '../../assets/softwareLogos/git.png';
  import githubImg    from '../../assets/softwareLogos/github.png';

  // New SVGs
  import graphqlImg   from '../../assets/softwareLogos/graphql-plain.svg';
  import flaskImg     from '../../assets/softwareLogos/flask-original.svg';
  import hibernateImg from '../../assets/softwareLogos/hibernate-plain.svg';
  import redisImg     from '../../assets/softwareLogos/redis-plain.svg';
  import awsImg       from '../../assets/softwareLogos/aws.svg';
  import k8sImg       from '../../assets/softwareLogos/kubernetes-plain.svg';
  import dockerImg    from '../../assets/softwareLogos/docker-plain.svg';
  import linuxImg     from '../../assets/softwareLogos/linux-original.svg';

  const skillGroups = [
    {
      label: 'Languages',
      skills: [
        { name: 'Java',       icon: javaImg },
        { name: 'JavaScript', icon: jsImg },
        { name: 'Python',     icon: pythonImg },
        { name: 'HTML',       icon: htmlImg },
        { name: 'CSS',        icon: cssImg },
      ],
    },
    {
      label: 'Frameworks & Libraries',
      skills: [
        { name: 'Spring Boot', icon: springImg },
        { name: 'Hibernate',   icon: hibernateImg },
        { name: 'React',       icon: reactImg },
        { name: 'Node.js',     icon: nodeImg },
        { name: 'Express.js',  icon: expressImg,  invertOnLight: true },
        { name: 'Django',      icon: djangoImg },
        { name: 'Flask',       icon: flaskImg,    invertOnDark: true },
        { name: 'Tailwind CSS',icon: tailwindImg },
      ],
    },
    {
      label: 'APIs & Data',
      skills: [
        { name: 'GraphQL',     icon: graphqlImg },
        { name: 'PostgreSQL',  icon: postgresImg },
        { name: 'Redis',       icon: redisImg },
      ],
    },
    {
      label: 'Infrastructure & Tools',
      skills: [
        { name: 'Git',            icon: gitImg },
        { name: 'GitHub Actions', icon: githubImg,  invertOnDark: true },
        { name: 'AWS',            icon: awsImg },
        { name: 'Kubernetes',     icon: k8sImg },
        { name: 'Docker',         icon: dockerImg },
        { name: 'Linux',          icon: linuxImg },
      ],
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
          <div class="skills-grid">
            {#each group.skills as skill}
              <div class="skill-item">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  class="skill-icon{skill.invertOnLight ? ' invert-light' : ''}{skill.invertOnDark ? ' invert-dark' : ''}"
                />
                <span class="skill-name">{skill.name}</span>
              </div>
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
    gap: 1.5rem;
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
  }

  .group:hover {
    border-color: var(--accent);
  }

  .group-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    margin: 0 0 1.1rem;
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .skill-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    background: var(--pill-bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 0.3rem 0.75rem 0.3rem 0.5rem;
    transition: border-color 0.2s, background 0.2s;
    cursor: default;
  }

  .skill-item:hover {
    border-color: var(--accent);
    background: var(--accent-subtle);
  }

  .skill-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
  }

  :global([data-theme="light"]) .invert-light {
    filter: invert(1);
  }

  :global([data-theme="dark"]) .invert-dark {
    filter: invert(1) brightness(1.8);
  }

  .skill-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text);
    white-space: nowrap;
  }
</style>
