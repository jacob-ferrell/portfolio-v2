<script>
  import { reveal } from '../actions/reveal.js';

  let status = 'idle'; // idle | sending | success | error
  let formEl;

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

<section id="contact">
  <div class="section-inner">
    <h2 class="section-title" use:reveal>
      <span class="title-index">04</span>
      Contact
    </h2>
    <div class="contact-wrap">
      <div class="contact-info" use:reveal={{ delay: 80 }}>
        <p class="contact-intro">
          Have a project in mind or just want to say hello? My inbox is always open.
        </p>
        <a href="https://www.linkedin.com/in/mjferrell" target="_blank" rel="noopener noreferrer" class="contact-item">
          <span class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </span>
          linkedin.com/in/mjferrell
        </a>
        <a href="https://www.github.com/jacob-ferrell" target="_blank" rel="noopener noreferrer" class="contact-item">
          <span class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </span>
          github.com/jacob-ferrell
        </a>
      </div>
      <form bind:this={formEl} on:submit={handleSubmit} class="contact-form" use:reveal={{ delay: 160 }}>
        <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" />
        <input type="hidden" name="_captcha" value="false" />

        <div class="field-row">
          <div class="field">
            <label for="name">Name</label>
            <input id="name" type="text" name="name" placeholder="Your name" on:focus={handleFocus} required />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" placeholder="your@email.com" on:focus={handleFocus} required />
          </div>
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="Your message..." on:focus={handleFocus} required></textarea>
        </div>
        <button
          type="submit"
          class="submit-btn"
          class:success={status === 'success'}
          class:error={status === 'error'}
          disabled={status === 'sending'}
        >
          {#if status === 'sending'}
            <span class="spinner" aria-hidden="true" />
            Sending...
          {:else if status === 'success'}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Message Sent!
          {:else if status === 'error'}
            Failed to Send — Retry
          {:else}
            Send Message
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
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
    max-width: 960px;
    margin: 0 auto;
  }

  .contact-wrap {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
  }

  .contact-intro {
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0 0 1.75rem;
    font-size: 1.05rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    margin-bottom: 0.85rem;
    transition: color 0.2s;
  }

  .contact-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--border);
    border-radius: 10px;
    flex-shrink: 0;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
  }

  .contact-item:hover {
    color: var(--accent);
  }

  .contact-item:hover .contact-icon {
    border-color: var(--accent);
    background: var(--accent-subtle);
    transform: translateY(-2px);
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    border-radius: 10px;
    padding: 0.7rem 0.95rem;
    font-size: 0.95rem;
    font-family: inherit;
    color: var(--text);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    resize: vertical;
    width: 100%;
  }

  input::placeholder, textarea::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
  }

  input:focus, textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-subtle);
  }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    align-self: flex-start;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.7rem 1.6rem;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    box-shadow: 0 4px 18px var(--accent-glow);
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--accent-glow);
  }

  .submit-btn:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 700px) {
    .contact-wrap {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    .field-row {
      grid-template-columns: 1fr;
    }

    .submit-btn {
      align-self: stretch;
      justify-content: center;
    }
  }
</style>
