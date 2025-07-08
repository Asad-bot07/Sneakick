const carousel = document.getElementById("carousel");
    const slides = carousel.querySelectorAll("img");
    const totalSlides = slides.length;
    let index = 0;

    document.getElementById("next").addEventListener("click", () => {
      index = (index + 1) % totalSlides;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    });

    document.getElementById("prev").addEventListener("click", () => {
      index = (index - 1 + totalSlides) % totalSlides;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    });