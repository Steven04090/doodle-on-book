
const pages = document.querySelectorAll(".page");
let isFlipping = false;
(function () {
  function flip(e) {
    if (!isFlipping) {
      isFlipping = true;
      $('.flip_done:last').removeClass("last_flip_page");
      if (this.classList.contains("cover_page")) {
        if($('.book').hasClass("open")){
          $('.book').removeClass("open");
        }
        else
        $('.book').addClass("open");
      }
      if (this.classList.contains("flip_done")) {
        this.classList.remove("flip_done");
        this.classList.add("active");
      } else {
        this.classList.add("flip_done");
        this.classList.add("active");
        
      }
      
      setTimeout(() => {
        isFlipping = false;
        this.classList.remove("active");
        $('.flip_done:last').addClass("last_flip_page");
      }, 1500);
    }
  }

  pages.forEach((page) => page.addEventListener("click", flip));
})();
