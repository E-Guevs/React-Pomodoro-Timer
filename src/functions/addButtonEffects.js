export default function addButtonEffects(className) {
  const buttons = document.getElementsByClassName(className);

  for (let button of buttons) {
    button.addEventListener("pointerdown", () => {
      button.style.color = "#00c7c7";
      button.style.background = "ghostwhite";
      button.style.transform = "scale(0.95)";
    });

    button.addEventListener("pointerup", () => {
      button.style.color = "white";
      button.style.background = "#00c7c7";
      button.style.transform = "scale(1)";
    });
  }
}
