<script>
  import { onMount } from 'svelte';

  let status = 'idle'; // idle | sending | success | error
  let formEl;

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

  async function handleSubmit(e) {
    e.preventDefault();
    status = 'sending';
    try {
      const res = await fetch('https://formsubmit.co/ajax/c4e769c5bf3c037504b6fcdf6432e3c8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(formEl))),
      });
      const data = await res.json();
      if (data.success !== 'true') throw new Error();
      status = 'success';
      formEl.reset();
    } catch {
      status = 'error';
    }
  }

  function handleFocus() {
    if (status !== 'idle') status = 'idle';
  }
</script>

<section id="contact" bind:this={sectionEl}>
  <div class="section-inner">
    <h2 class="section-title {visible ? 'visible' : ''}">Contact</h2>
    <div class="contact-wrap {visible ? 'visible' : ''}">
      <div class="contact-info">
        <p class="contact-intro">
          Have a project in mind or just want to say hello? My inbox is always open.
        </p>
        <a href="https://www.linkedin.com/in/mjferrell" target="_blank" rel="noopener noreferrer" class="contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          linkedin.com/in/mjferrell
        </a>
        <a href="https://www.github.com/jacob-ferrell" target="_blank" rel="noopener noreferrer" class="contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          github.com/jacob-ferrell
        </a>
      </div>
      <form bind:this={formEl} on:submit={handleSubmit} class="contact-form">
        <input type="text" name="_honey" style="display:none" />
        <input type="hidden" name="_captcha" value="false" />

        <div class="field">
          <label for="name">Name</label>
          <input id="name" type="text" name="name" placeholder="Your name" on:focus={handleFocus} required />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" name="email" placeholder="your@email.com" on:focus={handleFocus} required />
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="Your message..." on:focus={handleFocus} required></textarea>
        </div>
        <button type="submit" class="submit-btn" disabled={status === 'sending'}>
          {#if status === 'sending'}
            Sending...
          {:else if status === 'success'}
            Message Sent!
          {:else if status === 'error'}
            Failed to Send
          {:else}
            Send Message
          {/if}
        </button>
      </form>
    </div>
  </div>
</section>

<style>
  section {
    padding: 6rem 1.5rem 8rem;
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

  .contact-wrap {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
  }

  .contact-wrap.visible {
    opacity: 1;
    transform: none;
  }

  .contact-intro {
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0 0 1.5rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
    transition: color 0.2s;
  }

  .contact-item:hover {
    color: var(--accent);
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  input, textarea {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.65rem 0.9rem;
    font-size: 0.95rem;
    font-family: inherit;
    color: var(--text);
    transition: border-color 0.2s, background 0.2s;
    outline: none;
    resize: vertical;
  }

  input::placeholder, textarea::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
  }

  input:focus, textarea:focus {
    border-color: var(--accent);
  }

  .submit-btn {
    align-self: flex-start;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.65rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--accent-hover);
    transform: translateY(-1px);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    .contact-wrap {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
