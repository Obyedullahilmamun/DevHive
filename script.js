// ========================= Hero Slider =========================
document.addEventListener('DOMContentLoaded', () => {
  const heroSlider = document.getElementById('hero-slider');
  const dots = document.querySelectorAll('.dot');
  if (!heroSlider || !dots.length) return;

  const slides = heroSlider.children;
  const totalSlides = dots.length;

  let currentSlide = 0;
  let isTransitioning = false;

  // --- Clone first slide and append to end for smooth looping ---
  const firstClone = slides[0].cloneNode(true);
  heroSlider.appendChild(firstClone);

  function showSlide(index, animate = true) {
    if (animate) {
      heroSlider.style.transition = "transform 0.7s ease-in-out";
    } else {
      heroSlider.style.transition = "none";
    }
    heroSlider.style.transform = `translateX(-${index * 100}%)`;

    // Update dots (ignore the clone)
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-orange-500', i === index % totalSlides);
      dot.classList.toggle('bg-gray-300', i !== index % totalSlides);
    });
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide++;
    showSlide(currentSlide);

    // When reaching the clone, jump back to first real slide
    if (currentSlide === totalSlides) {
      setTimeout(() => {
        currentSlide = 0;
        showSlide(currentSlide, false); // reset instantly
        isTransitioning = false;
      }, 700); // match transition duration
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 700);
    }
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // autoplay
  setInterval(nextSlide, 5000);

  // init
  showSlide(currentSlide);
});



// ========================= Navbar Dropdowns =========================
document.addEventListener("DOMContentLoaded", () => {
  // Utility: handle dropdown toggle
  function setupDropdown(btnId, menuId) {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (btn && menu) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("hidden");
      });

      // Close when clicking outside
      document.addEventListener("click", (e) => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.add("hidden");
        }
      });

      // Close when clicking any link
      menu.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => menu.classList.add("hidden"));
      });
    }
  }

  // Desktop dropdowns
  setupDropdown("whoDropdownBtn", "whoDropdownMenu");
  setupDropdown("serviceDropdownBtn", "serviceDropdownMenu");
  setupDropdown("blogDropdownBtn", "blogDropdownMenu");
  setupDropdown("projectDropdownBtn", "projectDropdownMenu");

  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // NOTE: Your mobile HTML uses "group-hover" (CSS only) for dropdowns.
  // If you want JS-controlled toggles on mobile too, 
  // give buttons unique IDs like "mobileWhoBtn" + "mobileWhoMenu" and call setupDropdown for them too.
});


// ========================= Stats Animation on Scroll =========================
document.addEventListener('DOMContentLoaded', () => {
  const statsContainer = document.getElementById('stats-container');
  if (!statsContainer) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('div').forEach(item => {
          item.classList.remove('opacity-0', '-translate-x-full');
          item.classList.add('opacity-100', 'translate-x-0');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsContainer);
});

// ========================= Services Section Animation =========================
document.addEventListener('DOMContentLoaded', () => {
  const serviceSection = document.getElementById('service-cards-container');
  if (!serviceSection) return;

  const serviceObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.getElementById('service-subtitle')?.classList.remove('translate-y-10', 'opacity-0');
        document.getElementById('service-title')?.classList.remove('translate-y-10', 'opacity-0');
        document.getElementById('service-description')?.classList.remove('translate-y-10', 'opacity-0');

        document.querySelectorAll('#service-cards-container > div').forEach(card => {
          card.classList.remove('scale-95', 'opacity-0');
        });

        document.getElementById('cta-button')?.classList.remove('translate-y-10', 'opacity-0');
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  serviceObserver.observe(serviceSection);
});

// ========================= Back To Top Button =========================
// document.addEventListener('DOMContentLoaded', () => {
//   const backToTop = document.getElementById('backToTop');
//   const progressCircle = document.getElementById('progressCircle');
//   if (!backToTop || !progressCircle) return;

//   const updateProgress = () => {
//     const scrollTop = window.scrollY;
//     const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//     const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

//     const dashOffset = 100 - scrolled;
//     progressCircle.setAttribute("stroke-dashoffset", dashOffset);

//     if (scrollTop > 300) backToTop.classList.remove('hidden');
//     else backToTop.classList.add('hidden');
//   };

//   window.addEventListener('scroll', updateProgress);
//   backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
//   updateProgress();
// });



// ========================= Trusted by Leading Companies Slider =========================
// (() => {
//   const slider = document.getElementById("logo-slider");
//   if (!slider) return;
//   const container = slider.parentElement;

//   const waitForImages = (els) =>
//     Promise.all(
//       els.map(img => img.complete ? Promise.resolve()
//         : new Promise(res => img.addEventListener("load", res, { once: true })))
//     );

//   const imgs = Array.from(slider.querySelectorAll("img"));
//   waitForImages(imgs).then(() => {
//     const original = slider.innerHTML;
//     slider.innerHTML = original + original;

//     let half = slider.scrollWidth / 2;
//     let x = 0;
//     const speed = 0.6;
//     let rafId;

//     slider.style.willChange = "transform";

//     const animate = () => {
//       x -= speed;
//       if (x <= -half) x += half;
//       slider.style.transform = `translate3d(${x}px,0,0)`;
//       rafId = requestAnimationFrame(animate);
//     };

//     const onResize = () => {
//       cancelAnimationFrame(rafId);
//       half = slider.scrollWidth / 2;
//       while (x <= -half) x += half;
//       animate();
//     };
//     window.addEventListener("resize", onResize);

//     container.addEventListener("mouseenter", () => cancelAnimationFrame(rafId));
//     container.addEventListener("mouseleave", animate);

//     if (!window.matchMedia || !matchMedia("(prefers-reduced-motion: reduce)").matches) {
//       animate();
//     }
//   });
// })();

// const swiper = new Swiper(".logo-swiper", {
//     slidesPerView: 3,
//     spaceBetween: 16,
//     loop: true,
//     autoplay: {
//       delay: 0,
//       disableOnInteraction: false,
//     },
//     speed: 3000, // slide speed
//     breakpoints: {
//       640: { slidesPerView: 4, spaceBetween: 20 },
//       768: { slidesPerView: 5, spaceBetween: 24 },
//       1024: { slidesPerView: 6, spaceBetween: 32 },
//     },
//   });


const swiper = new Swiper(".logo-swiper", {
  slidesPerView: 2, // mobile default
  spaceBetween: 16,
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  freeMode: true,
  freeModeMomentum: false,
  breakpoints: {
    640: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 6, spaceBetween: 32 },
  },
});


// ========================= Testimonials Slider =========================
(() => {
  const container = document.getElementById("testimonialContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (!container || !prevBtn || !nextBtn) return;

  let index = 0;
  const total = container.children.length;

  function updateSlider() {
    const isDesktop = window.innerWidth >= 768;
    const cardsPerView = isDesktop ? 2 : 1;
    const cardWidth = 100 / cardsPerView;
    const offset = index * cardWidth;
    container.style.transform = `translateX(-${offset}%)`;
  }

  nextBtn.addEventListener("click", () => {
    const isDesktop = window.innerWidth >= 768;
    const cardsPerView = isDesktop ? 2 : 1;
    index = (index + 1) % (total - cardsPerView + 1);
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    const isDesktop = window.innerWidth >= 768;
    const cardsPerView = isDesktop ? 2 : 1;
    index = (index - 1 + (total - cardsPerView + 1)) % (total - cardsPerView + 1);
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
})();


// ========================= Service Details - Accordion Script =========================

 document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      content.classList.toggle("hidden");
      btn.querySelector("span").textContent = content.classList.contains("hidden") ? "+" : "-";
    });
  });

  // ========================= Project - Hover active effect =========================

  document.querySelectorAll('.project-two__box li').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      document.querySelectorAll('.project-two__box li').forEach(li => li.classList.remove('active'));
      item.classList.add('active');
    });
  });
