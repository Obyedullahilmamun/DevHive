// Hero Slider
document.addEventListener("DOMContentLoaded", () => {
  const heroSlider = document.getElementById("hero-slider");
  const dots = document.querySelectorAll(".dot");
  if (!heroSlider || !dots.length) return;

  const slides = heroSlider.children;
  const totalSlides = dots.length;

  let currentSlide = 0;
  let isTransitioning = false;

  // Clone first slide for smooth looping
  const firstClone = slides[0].cloneNode(true);
  heroSlider.appendChild(firstClone);

  function showSlide(index, animate = true) {
    heroSlider.style.transition = animate
      ? "transform 0.7s ease-in-out"
      : "none";
    heroSlider.style.transform = `translateX(-${index * 100}%)`;

    // Update dots (ignore the clone)
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-orange-500", i === index % totalSlides);
      dot.classList.toggle("bg-gray-300", i !== index % totalSlides);
    });
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide++;
    showSlide(currentSlide);

    if (currentSlide === totalSlides) {
      setTimeout(() => {
        currentSlide = 0;
        showSlide(currentSlide, false); // reset instantly
        isTransitioning = false;
      }, 700);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 700);
    }
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Autoplay
  setInterval(nextSlide, 5000);

  // Initialize
  showSlide(currentSlide);
});

// Navbar Dropdowns
document.addEventListener("DOMContentLoaded", () => {
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
      menu
        .querySelectorAll("a")
        .forEach((a) =>
          a.addEventListener("click", () => menu.classList.add("hidden"))
        );
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
});

// Stats Animation on Scroll
document.addEventListener("DOMContentLoaded", () => {
  const statsContainer = document.getElementById("stats-container");
  if (!statsContainer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("div").forEach((item) => {
            item.classList.remove("opacity-0", "-translate-x-full");
            item.classList.add("opacity-100", "translate-x-0");
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsContainer);
});

// Services Section Animation on Scroll
document.addEventListener("DOMContentLoaded", () => {
  const serviceSection = document.getElementById("service-cards-container");
  if (!serviceSection) return;

  const serviceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document
            .getElementById("service-subtitle")
            ?.classList.remove("translate-y-10", "opacity-0");
          document
            .getElementById("service-title")
            ?.classList.remove("translate-y-10", "opacity-0");
          document
            .getElementById("service-description")
            ?.classList.remove("translate-y-10", "opacity-0");

          document
            .querySelectorAll("#service-cards-container > div")
            .forEach((card) => {
              card.classList.remove("scale-95", "opacity-0");
            });

          document
            .getElementById("cta-button")
            ?.classList.remove("translate-y-10", "opacity-0");
          serviceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  serviceObserver.observe(serviceSection);
});

// Logo Slider (Swiper)
const swiper = new Swiper(".logo-swiper", {
  slidesPerView: 2,
  spaceBetween: 16,
  loop: true,
  speed: 3000,
  autoplay: { delay: 0, disableOnInteraction: false },
  freeMode: true,
  freeModeMomentum: false,
  breakpoints: {
    640: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 6, spaceBetween: 32 },
  },
});

// Testimonials Slider
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
    container.style.transform = `translateX(-${index * cardWidth}%)`;
  }

  nextBtn.addEventListener("click", () => {
    const cardsPerView = window.innerWidth >= 768 ? 2 : 1;
    index = (index + 1) % (total - cardsPerView + 1);
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    const cardsPerView = window.innerWidth >= 768 ? 2 : 1;
    index =
      (index - 1 + (total - cardsPerView + 1)) % (total - cardsPerView + 1);
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
})();

// Project Hover Active Effect
document.querySelectorAll(".project-two__box li").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    document
      .querySelectorAll(".project-two__box li")
      .forEach((li) => li.classList.remove("active"));
    item.classList.add("active");
  });
});

// Animated Heading
document.addEventListener("DOMContentLoaded", function () {
  const target = document.getElementById("animated-heading");
  const spans = target.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          spans.forEach((span) => span.classList.add("animate"));
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.6, rootMargin: "0px 0px -20% 0px" }
  );

  observer.observe(target);
});

// Animated Subheading
document.addEventListener("DOMContentLoaded", function () {
  const target = document.getElementById("animated-subheading");
  const spans = target.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          spans.forEach((span) => span.classList.add("animate"));
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.6, rootMargin: "0px 0px -20% 0px" }
  );

  observer.observe(target);
});

// Contact Page

// Contact Form Handling (Can be implemented later)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  form.addEventListener("input", (e) => {
    const { name, value } = e.target;
    formData[name] = value;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been submitted.");
    form.reset();
  });
});
