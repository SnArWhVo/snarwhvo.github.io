const viewport = document.querySelector('.screen');
const img = viewport.querySelector('img');
const label = document.querySelector('.gviewport p');
const defaultLabel = "// FULL VIEW";
label.textContent = defaultLabel;

const mobile = window.matchMedia("(max-width:900px)");

const HOME = { desktop: .6, mobile: .8 }
function homeScale() {
  return mobile.matches ? HOME.mobile : HOME.desktop;
}

function pick(d, name) {
  const mobileKey = 'm' + name.charAt(0).toUpperCase() + name.slice(1)
  return mobile.matches && d[mobileKey] !== undefined ? d[mobileKey] : d[name];
}

let scale = homeScale();
let x = 0;
let y = 0;

function apply() {
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;
  const w = img.offsetWidth * scale;
  const h = img.offsetHeight * scale;
  x = w > vw ? Math.min(0, Math.max(vw - w, x)) : (vw - w) / 2;
  y = h > vh ? Math.min(0, Math.max(vh - h, y)) : (vh - h) / 2;

  img.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
}

img.addEventListener('load', apply);
if (img.complete) apply();
window.addEventListener('resize', apply);



/*  Drag  */
let dragging = false;
let lastX = 0;
let lastY = 0;

viewport.addEventListener("pointerdown", function (e) {
  img.classList.remove("animate");
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  viewport.setPointerCapture(e.pointerId);
});

viewport.addEventListener("pointermove", function (e) {
  if (!dragging) return;
  x += e.clientX - lastX;
  y += e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  apply();
});

viewport.addEventListener("pointerup", function () {
  dragging = false;
});

/*  PRESETS */
document.querySelectorAll('.gbuttons button[data-zoom]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    img.classList.add("animate");

    const d = btn.dataset;
    scale = Number(pick(d, 'zoom'));                                    // CHANGED
    const px = (Number(pick(d, 'x')) / 100) * img.offsetWidth;          // CHANGED
    const py = (Number(pick(d, 'y')) / 100) * img.offsetHeight;         // CHANGED


    x = viewport.clientWidth / 2 - px * scale;
    y = viewport.clientHeight / 2 - py * scale;
    apply();

    label.textContent = btn.dataset.text;
  });
});

/*  RESET */
document.getElementById('greset').addEventListener('click', function () {
  img.classList.add("animate");
  scale = homeScale();
  x = 0;
  y = 0;
  apply();

  label.textContent = defaultLabel;
});

viewport.addEventListener("click", function (e) {
  const rect = viewport.getBoundingClientRect();
  const px = ((e.clientX - rect.left - x) / scale / img.offsetWidth) * 100;
  const py = ((e.clientY - rect.top - y) / scale / img.offsetHeight) * 100;
  console.log("data-x=" + Math.round(px) + " data-y=" + Math.round(py));
});

mobile.addEventListener('change', function () {
  document.querySelector('.gbtn-item.active')?.click();
});


/*  BUTTON STATE  */
const buttons = document.querySelectorAll('.gbtn-item');



buttons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.gbtn-item.active')?.classList.remove('active');

    button.classList.add('active');
  });
});
