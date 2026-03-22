import './app.css'
import App from './App.svelte'

// Set theme before first render to avoid flash
const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isDark = stored ? stored === 'dark' : prefersDark;
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

const app = new App({
  target: document.getElementById('app'),
})

export default app
