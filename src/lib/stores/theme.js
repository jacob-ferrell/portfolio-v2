import { writable } from 'svelte/store';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const stored = localStorage.getItem('theme');
const initial = stored ? stored === 'dark' : prefersDark;

export const dark = writable(initial);

dark.subscribe((value) => {
  localStorage.setItem('theme', value ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light');
});
