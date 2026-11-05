/* The portrait is sampled from the original photo. No external runtime. */
(() => {
  const canvas = document.querySelector("#portrait-canvas");
  const figure = document.querySelector(".portrait");
  const image = figure.querySelector("img");
  const button = document.querySelector("#texture");
  const context = canvas.getContext("2d");
  if (!context) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: -1000, y: -1000 };
  let settleFrames = 0;
  let points = [],
    width = 0,
    height = 0,
    frame = 0,
    type = false,
    visible = true;
  const ink = "#24231f",
    paper = "#ece8df";
  const chars = " .,:;+=xX#@";
  function paint() {
    context.fillStyle = paper;
    context.fillRect(0, 0, width, height);
    context.fillStyle = ink;
    context.font = "8px Chivo, monospace";
    context.textAlign = "center";
    for (const p of points) {
      if (!reduced.matches) {
        const dx = p.x - pointer.x,
          dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 80 && distance > 0) {
          const force = ((80 - distance) / 80) * 3;
          p.vx += (dx / distance) * force;
          p.vy += (dy / distance) * force;
        }
        p.vx = (p.vx + (p.ox - p.x) * 0.045) * 0.83;
        p.vy = (p.vy + (p.oy - p.y) * 0.045) * 0.83;
        p.x += p.vx;
        p.y += p.vy;
      }
      if (type) {
        context.fillText(
          chars[Math.min(chars.length - 1, Math.floor(p.dark * chars.length))],
          p.x,
          p.y + 3,
        );
      } else {
        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();
      }
    }
  }
  function tick() {
    frame = 0;
    paint();
    if (
      visible &&
      !reduced.matches &&
      !document.hidden &&
      (pointer.x >= 0 || settleFrames-- > 0)
    )
      frame = requestAnimationFrame(tick);
  }
  function start() {
    if (!frame) tick();
  }
  function sample() {
    const bounds = canvas.getBoundingClientRect();
    width = Math.round(bounds.width);
    height = Math.round(bounds.height);
    if (!width || !height) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const source = document.createElement("canvas");
    source.width = width;
    source.height = height;
    const ctx = source.getContext("2d");
    const scale = Math.max(
      width / image.naturalWidth,
      height / image.naturalHeight,
    );
    const w = image.naturalWidth * scale,
      h = image.naturalHeight * scale;
    ctx.drawImage(image, (width - w) / 2, (height - h) * 0.3, w, h);
    const data = ctx.getImageData(0, 0, width, height).data;
    points = [];
    const step = width < 400 ? 5 : 6;
    for (let y = step; y < height; y += step)
      for (let x = step; x < width; x += step) {
        const i = (y * width + x) * 4;
        const luminance =
          (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) /
          255;
        const dark = Math.pow(1 - luminance, 1.15);
        if (dark > 0.06)
          points.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            dark,
            radius: Math.max(0.25, dark * step * 0.54),
          });
      }
    figure.classList.add("ready");
    button.hidden = false;
    start();
  }
  canvas.addEventListener("pointermove", (event) => {
    const box = canvas.getBoundingClientRect();
    pointer.x = event.clientX - box.left;
    pointer.y = event.clientY - box.top;
    settleFrames = 100;
    start();
  });
  function leave() {
    pointer.x = pointer.y = -1000;
    settleFrames = 100;
  }
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("pointerup", (event) => {
    if (event.pointerType !== "mouse") leave();
  });
  canvas.addEventListener("pointercancel", leave);
  button.addEventListener("click", () => {
    type = !type;
    settleFrames = 100;
    button.innerHTML = type
      ? 'Type <span aria-hidden="true">⇄</span> Ink'
      : 'Ink <span aria-hidden="true">⇄</span> Type';
    button.setAttribute(
      "aria-label",
      `Switch portrait to ${type ? "ink" : "character"} texture`,
    );
    if (!reduced.matches)
      points.forEach((p) => {
        p.vx += (Math.random() - 0.5) * 13;
        p.vy += (Math.random() - 0.5) * 13;
      });
    start();
  });
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) start();
  }).observe(canvas);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && visible) start();
  });
  reduced.addEventListener("change", () => {
    leave();
    points.forEach((p) => {
      p.x = p.ox;
      p.y = p.oy;
      p.vx = p.vy = 0;
    });
    start();
  });
  let resizeTimer;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sample, 100);
  }).observe(figure.querySelector(".portrait-surface"));
  if (image.complete && image.naturalWidth) sample();
  else image.addEventListener("load", sample, { once: true });
  if (matchMedia("(pointer: coarse)").matches)
    figure.querySelector(".portrait-hint").textContent = "Touch the portrait";
})();

const clock = document.querySelector(".local-time");
function updateClock() {
  clock.textContent = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}
updateClock();
setInterval(updateClock, 60000);
