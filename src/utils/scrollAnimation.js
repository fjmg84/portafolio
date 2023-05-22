const scrollAnimation = () => {
  addEventListener("scroll", () => {
    let elements = document.getElementsByClassName("scroll_content");
    let screenHeight = window.innerHeight;

    for (let div = 0; div < elements.length; div++) {
      const element = elements[div];
      if (element.getBoundingClientRect().top < screenHeight) {
        element.classList.add("visible");
      } else {
        element.classList.remove("visible");
      }
    }
  })
}

export default scrollAnimation
