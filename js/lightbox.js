const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// every clickable thing that should open the lightbox
const SELECTOR = '.fg-items-img, .gallery-item';

function getSource(el) {
  // 1. an explicit full-size file always wins
  if (el.dataset.full) return el.dataset.full;

  // 2. the element is an <img>
  if (el.tagName === 'IMG') return el.src;

  // 3. the element contains an <img> (gallery tiles)
  const inner = el.querySelector('img');
  if (inner) return inner.dataset.full || inner.src;

  // 4. a <div> with a background image (featured panel)
  const bg = getComputedStyle(el).backgroundImage;
  const match = bg.match(/url\(["']?(.*?)["']?\)/);
  return match ? match[1] : '';
}

function getAlt(el) {
  const inner = el.querySelector('img');
  return el.alt || el.dataset.alt || el.getAttribute('aria-label') || (inner ? inner.alt : '');
}

// one listener for the whole page, so photos added later by fetch work too
document.addEventListener('click', (e) => {
  const el = e.target.closest(SELECTOR);
  if (!el) return;

  const src = getSource(el);
  if (!src) return;

  lightboxImg.src = src;
  lightboxImg.alt = getAlt(el);
  lightbox.classList.add('active');
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});
