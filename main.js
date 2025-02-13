import "./runner";

const modalHTML = document.getElementById("running-modal");
const position = {
  prevX: 0,
  prevY: 0,
  acumulation: 0,
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "style") {
      const currentStyle = getComputedStyle(modalHTML);
      const currentX = currentStyle.left;
      const currentY = currentStyle.top;

      position.acumulation += toAbsolute(
        toAbsolute(currentX) - toAbsolute(position.prevX)
      );

      position.acumulation += toAbsolute(
        toAbsolute(currentY) - toAbsolute(position.prevY)
      );

      position.prevX = currentX;
      position.prevY = currentY;

      console.log(position.acumulation);
    }
  });
});

observer.observe(modalHTML, {
  attributes: true,
  attributeFilter: ["style"],
});

// Inicializar position
position.prevX = modalHTML.style.left;
position.prevY = modalHTML.style.top;

function toAbsolute(e) {
  let n = e;

  if (typeof e === "string") {
    n = Number(e.replace("px", ""));
  }

  if (n < 0) {
    return n * -1;
  }

  return n;
}
