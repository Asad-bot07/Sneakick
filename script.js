document.addEventListener('DOMContentLoaded',()=>{
    const carousel = document.getElementById("carousel");
    const slides = carousel.querySelectorAll("img");
    const menu= document.getElementById('menu');
    menu.addEventListener('click',()=>{
      document.getElementById('PopUp').classList.add('opacity-100','scale-95')
      document.getElementById('PopUp').classList.remove('opacity-0','scale-0')
    })
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
  });