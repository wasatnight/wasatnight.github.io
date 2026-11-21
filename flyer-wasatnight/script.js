const preview = document.querySelector(".preview");

function fitFlyer() {
  const scale = preview.getBoundingClientRect().width / 1080;
  preview.style.setProperty("--flyer-scale", scale);
}

if (!document.documentElement.classList.contains("capture")) {
  fitFlyer();
  new ResizeObserver(fitFlyer).observe(preview);
}
