// Svelte action: adds `.revealed` when the element scrolls into view.
// Usage: <div use:reveal> or <div use:reveal={{ delay: 120, threshold: 0.2 }}>
export function reveal(node, options = {}) {
  const { delay = 0, threshold = 0.12, once = true } = options;

  node.classList.add('reveal');
  if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('revealed');
        if (once) observer.disconnect();
      } else if (!once) {
        node.classList.remove('revealed');
      }
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
