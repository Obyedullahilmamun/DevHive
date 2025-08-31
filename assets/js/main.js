// =============================
// Sticky Header (no layout jump)
// =============================
const header = document.getElementById("mainHeader");
function updateBodyPadding() {
  document.body.style.paddingTop = header.classList.contains("sticky-header")
    ? header.offsetHeight + "px"
    : "0px";
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
  }
  updateBodyPadding();
});

window.addEventListener("load", updateBodyPadding);
window.addEventListener("resize", updateBodyPadding);

// =============================
// Mobile Menu Toggle
// =============================
const openBtn = document.getElementById("openMobileMenu");
const closeBtn = document.getElementById("closeMobileMenu");
const mobileMenu = document.getElementById("mobileMenu");

if (openBtn && closeBtn && mobileMenu) {
  openBtn.addEventListener("click", () =>
    mobileMenu.classList.remove("hidden")
  );
  closeBtn.addEventListener("click", () =>
    mobileMenu.classList.add("hidden")
  );
}

// =============================
// Swiper Init - Hero Slider
// =============================
const heroSwiper = new Swiper(".hero-swiper", {
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true },
  grabCursor: true,
  observeParents: true,
  observer: true,
  on: {
    slideChange: function () {
      moveBee(this.realIndex);
    },
  },
});

// =============================
// Swiper Init - Logo Slider
// =============================
const logoSwiper = new Swiper(".logo-swiper", {
  loop: true,
  autoplay: { delay: 2500, disableOnInteraction: false },
  spaceBetween: 30,
  grabCursor: true,
  observeParents: true,
  observer: true,
  breakpoints: {
    320: { slidesPerView: 2, spaceBetween: 20 },
    576: { slidesPerView: 3, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 25 },
    992: { slidesPerView: 4, spaceBetween: 25 },
    1200: { slidesPerView: 5, spaceBetween: 30 },
    1400: { slidesPerView: 6, spaceBetween: 30 },
  },
});

// =============================
// Bee Animation
// =============================
function moveBee(index) {
  const bee = document.getElementById("bee");
  if (bee) {
    bee.style.transform = `translateX(${index * 100}px)`; // move horizontally
  }
}

// =============================
// AOS Init (Animations on scroll)
// =============================
// AOS.init({
//   duration: 800,
//   once: true,
// });



// Init AOS
// AOS.init({
//   once: true, // animations run only once
// });

// // Counter Animation (runs only when visible)
// const counters = document.querySelectorAll(".counter");
// const speed = 200; // lower = faster

// const animateCounter = (counter) => {
//   const target = +counter.getAttribute("data-target");
//   const updateCount = () => {
//     const count = +counter.innerText;
//     const increment = Math.ceil(target / speed);

//     if (count < target) {
//       counter.innerText = count + increment;
//       setTimeout(updateCount, 20);
//     } else {
//       counter.innerText = target;
//     }
//   };
//   updateCount();
// };

// // Run counter when element comes into view (with AOS)
// counters.forEach((counter) => {
//   counter.addEventListener("aos:in", () => {
//     if (!counter.classList.contains("counted")) {
//       animateCounter(counter);
//       counter.classList.add("counted");
//     }
//   });
// });


  // Init AOS + Counter
  AOS.init({ duration: 1000, once: true });

    const counters = document.querySelectorAll(".counter");

    const runCounter = (counter) => {
      const target = +counter.getAttribute("data-target");
      const updateCount = () => {
        const current = +counter.innerText;
        const increment = Math.ceil(target / 200); // speed
        if (current < target) {
          counter.innerText = current + increment;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));