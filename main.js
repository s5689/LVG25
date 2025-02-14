import "./runner";
import { showLetter } from "./letter";
import { origin, position } from "./states";

const modalHTML = document.getElementById("running-modal");

// Trackear movimiento de modal
let k = 0;

// Observar cambios en el modal
const observer = new MutationObserver((mutations) => {
  // Al moverse el modal, ejecutar.
  mutations.forEach((mutation) => {
    // Solo si el evento es por un atributo del style
    if (
      mutation.type === "attributes" &&
      mutation.attributeName === "style" &&
      origin.runnerState
    ) {
      const currentStyle = getComputedStyle(modalHTML);
      const currentX = currentStyle.left;
      const currentY = currentStyle.top;

      // Puntos de texto al mover
      const breakPoints = [
        { n: 2000, text: "Que pasa mama? no quieres el regalito? :c" },
        { n: 4000, text: "Dale a aceptal ÑAÑAAAAAAAAAA" },
        { n: 6000, text: "TU PUEDE MAMA TU PUEDE YO CLEO EN TI BEIBI" },
        { n: 8000, text: "ya casi mama vamo vamo vamo" },
        {
          n: 10000,
          text: "ÑOOOOOOOO si tarda mucho tu se va a ir el regalo mama :cccc",
        },
        { n: 12000, text: "SE VA A IL PALA SIEMPLE MAMAAAAAAAAAAAAA" },
        { n: 14000, text: "Ta bien agarra tu regalo derñañe jejejejj <3" },
      ];

      // Sumar el movimiento de ambos ejes
      position.acumulation += toAbsolute(toAbsolute(currentX) - toAbsolute(position.prevX));
      position.acumulation += toAbsolute(toAbsolute(currentY) - toAbsolute(position.prevY));

      // Guardar la ubicacion actual para el proximo movimiento
      position.prevX = currentX;
      position.prevY = currentY;

      // Recorrer los breakpoints
      if (false) {
        //(k !== breakPoints.length) {
        if (position.acumulation > breakPoints[k].n) {
          modalHTML.children[0].innerHTML = breakPoints[k].text;
          k++;
        }
      }
      // Al llegar al maximo, finalizar
      else {
        origin.runnerState = false;

        modalHTML.setAttribute("done", "");
        setTimeout(() => {
          modalHTML.setAttribute("style", `left: ${origin.x}px; top:${origin.y}px`);
          modalHTML.children[1].innerHTML = "ACEPTAAAAAAAAAAAL";
          modalHTML.children[1].addEventListener("click", showLetter);
        }, 500);
      }
    }
  });
});

observer.observe(modalHTML, {
  attributes: true,
  attributeFilter: ["style"],
});

// Generar valores absolutos
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
