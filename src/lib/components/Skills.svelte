<script>
  import { reveal } from '../actions/reveal.js';

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
  import mavenImg     from '../../assets/softwareLogos/maven-original.svg';
  import gradleImg    from '../../assets/softwareLogos/gradle-original.svg';
  import junitImg     from '../../assets/softwareLogos/junit-plain.svg';

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
        { name: 'Spring Boot',     icon: springImg },
        { name: 'Spring Security', icon: springImg },
        { name: 'Hibernate',       icon: hibernateImg },
        { name: 'Lombok',          icon: null },
        { name: 'React',           icon: reactImg },
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
        { name: 'Maven',          icon: mavenImg },
        { name: 'Gradle',         icon: gradleImg },
        { name: 'JUnit',          icon: junitImg },
        { name: 'Mockito',        icon: null },
        { name: 'Git',            icon: gitImg },
        { name: 'GitHub Actions', icon: githubImg,  invertOnDark: true },
        { name: 'AWS',            icon: awsImg },
        { name: 'Kubernetes',     icon: k8sImg },
        { name: 'Docker',         icon: dockerImg },
        { name: 'Linux',          icon: linuxImg },
      ],
    },
  ];
</script>

<section id="skills">
  <div class="section-inner">
    <h2 class="section-title" use:reveal>
      <span class="title-index">02</span>
      Skills
    </h2>
    <div class="groups">
      {#each skillGroups as group, i}
        <div class="group" use:reveal={{ delay: 80 + i * 100 }}>
          <h3 class="group-label">{group.label}</h3>
          <div class="skills-grid">
            {#each group.skills as skill, j}
              <div class="skill-item" style="--pop-delay: {j * 35}ms">
                {#if skill.icon}
                  <img
                    src={skill.icon}
                    alt=""
                    loading="lazy"
                    class="skill-icon{skill.invertOnLight ? ' invert-light' : ''}{skill.invertOnDark ? ' invert-dark' : ''}"
                  />
                {/if}
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
    max-width: 960px;
    margin: 0 auto;
  }

  .groups {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .group {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.5rem;
    transition: border-color 0.25s, box-shadow 0.25s;
  }

  .group:hover {
    border-color: var(--accent);
    box-shadow: 0 8px 30px var(--accent-glow-soft);
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
    padding: 0.35rem 0.8rem;
    transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
    cursor: default;
  }

  /* Pills pop in with a stagger once their group has revealed */
  :global(.group.reveal) .skill-item {
    opacity: 0;
    transform: scale(0.85);
  }

  :global(.group.reveal.revealed) .skill-item {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1) var(--pop-delay, 0ms),
      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) var(--pop-delay, 0ms),
      border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .skill-item:hover {
    border-color: var(--accent);
    background: var(--accent-subtle);
    transform: translateY(-3px) !important;
    box-shadow: 0 6px 16px var(--accent-glow-soft);
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

  @media (prefers-reduced-motion: reduce) {
    :global(.group.reveal) .skill-item {
      opacity: 1;
      transform: none;
    }
  }
</style>
