const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = document.querySelectorAll('.fg-items-img');

function getSource(el) {
  // 1. an explicit full-size file always wins
  if (el.dataset.full) return el.dataset.full;

  // 2. normal <img>
  if (el.tagName === 'IMG') return el.src;

  // 3. <div> with a background image: pull the URL out of the CSS
  const bg = getComputedStyle(el).backgroundImage;   // looks like: url("https://.../photo.jpg")
  const match = bg.match(/url\(["']?(.*?)["']?\)/);
  return match ? match[1] : '';
}

function getAlt(el) {
  return el.alt || el.dataset.alt || el.getAttribute('aria-label') || '';
}

images.forEach(el => {
  el.addEventListener('click', () => {
    const src = getSource(el);
    if (!src) return;                      // nothing to show

    lightboxImg.src = src;
    lightboxImg.alt = getAlt(el);
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});
