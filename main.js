function initHeroOpacity() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  hero.style.opacity = "1";
  if (window.innerWidth < 800) return;

  const onScroll = () => {
    const y = window.pageYOffset;
    let o = 1;
    if (y > 100) o = Math.max(0, 1 - (y - 100) / 400);
    hero.style.opacity = o;
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
}

function initAccordion() {
  const headers = document.querySelectorAll(".accordion-item-header");

  headers.forEach((header) => {
    if (header.dataset.bound) return;
    header.dataset.bound = "1";

    header.addEventListener("click", () => {
      const open = header.classList.contains("active");

      headers.forEach((h) => {
        h.classList.remove("active");
        const b = h.nextElementSibling;
        if (b) b.style.maxHeight = 0;
      });

      if (!open) {
        header.classList.add("active");
        const body = header.nextElementSibling;
        if (body) body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const body = document.body;

  const updateNavbarHeight = () => {
    if (!navbar) return;
    const h = navbar.offsetHeight;
    body.style.paddingTop = h + "px";
    document.documentElement.style.scrollPaddingTop = h + "px";
  };

  initAccordion();
  updateNavbarHeight();

  window.addEventListener("resize", updateNavbarHeight);

  const burger = document.querySelector(".navbar-burger");
  burger?.addEventListener("click", () => {
    navbar.classList.toggle("open");
    const icon = document.getElementById("menu");
    icon?.classList.toggle("bx-menu");
    icon?.classList.toggle("bx-x");
  });

  document.querySelectorAll(".navbar-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!navbar.classList.contains("open")) return;
      navbar.classList.remove("open");
      const icon = document.getElementById("menu");
      if (icon) {
        icon.classList.remove("bx-x");
        icon.classList.add("bx-menu");
      }
    });
  });

  window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.style.transform = "translateY(0)";
    navbar.style.opacity = "1";
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
  });

  function TxtType(el, words, period) {
    this.el = el;
    this.words = words;
    this.period = parseInt(period, 10) || 2000;
    this.index = 0;
    this.txt = "";
    this.deleting = false;
    this.tick();
  }

  TxtType.prototype.tick = function () {
    const word = this.words[this.index % this.words.length];
    this.txt = this.deleting
      ? word.slice(0, this.txt.length - 1)
      : word.slice(0, this.txt.length + 1);

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    let delay = this.deleting ? 50 : 100;

    if (!this.deleting && this.txt === word) {
      delay = this.period;
      this.deleting = true;
    } else if (this.deleting && this.txt === "") {
      this.deleting = false;
      this.index++;
      delay = 500;
    }

    setTimeout(() => this.tick(), delay);
  };

  window.addEventListener("load", () => {
    document.querySelectorAll(".typewrite").forEach((el) => {
      const data = el.getAttribute("data-type");
      if (data)
        new TxtType(el, JSON.parse(data), el.getAttribute("data-period"));
    });

    const style = document.createElement("style");
    style.textContent =
      ".typewrite>.wrap{border-right:.08em solid #fff;animation:blink 1s infinite}@keyframes blink{0%,100%{border-color:transparent}50%{border-color:#fff}}";
    document.body.appendChild(style);
  });

  if (window.AOS) {
    setTimeout(() => {
      AOS.init({
        duration: 1000,
        easing: "ease-out-cubic",
        once: true,
        mirror: false,
        offset: 100,
        disable: window.innerWidth < 768,
      });
      setTimeout(() => AOS.refresh(), 500);
    }, 100);
  }

  const stats = document.querySelectorAll(".count-up");

  if ("IntersectionObserver" in window && stats.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target.querySelector(".stat-title");
          const raw = el.textContent;
          const num = parseInt(raw.match(/\d+/)?.[0]);
          if (!num) return;

          const percent = raw.includes("%");
          const plus = raw.includes("+");

          let count = 0;
          const step = Math.max(1, Math.ceil(num / 50));

          const timer = setInterval(() => {
            count += step;
            if (count >= num) {
              count = num;
              clearInterval(timer);
            }
            el.textContent =
              count + (percent ? "%" : "") + (plus && count === num ? "+" : "");
          }, 30);

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -100px 0px" },
    );

    stats.forEach((s) => observer.observe(s));
  }

  const fixVideos = () => {
    document
      .querySelectorAll(
        ".legit-clips-container iframe,.blatant-clips-container iframe",
      )
      .forEach((i) => (i.style.height = i.offsetWidth * 0.5625 + "px"));
  };

  fixVideos();
  window.addEventListener("resize", fixVideos);

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#" || id === "#!") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - (navbar?.offsetHeight || 80),
        behavior: "smooth",
      });
    });
  });

  initHeroOpacity();
  window.addEventListener("resize", initHeroOpacity);

  const fixImages = () => {
    const i1 = document.querySelector(".image-1");
    const i2 = document.querySelector(".image-2");
    if (!i1 || !i2) return;

    i1.style.zIndex = "2";
    i2.style.zIndex = "1";

    if (window.innerWidth < 768) {
      i2.style.transform =
        "perspective(1000px) rotateY(-5deg) rotateX(2deg) translateZ(10px) translate(30px,30px)";
    }
  };

  fixImages();
  window.addEventListener("resize", fixImages);

  window.addEventListener("load", () => {
    if (navbar) {
      navbar.style.transform = "translateY(0)";
      navbar.style.opacity = "1";
      navbar.style.zIndex = "1000";
    }

    fixVideos();
    updateNavbarHeight();
    window.AOS && setTimeout(() => AOS.refresh(), 300);
    initHeroOpacity();
    setTimeout(initAccordion, 100);
    setTimeout(initAccordion, 500);
  });

  const year = new Date().getFullYear();
  const footer = document.querySelector("footer .footer-center p");
  if (footer) footer.innerHTML = `&copy; ${year} Bruhware™`;
});

if (typeof pop_tag !== "undefined") {
  pop_tag.onload = () => {
    const nav = document.querySelector(".navbar");
    if (nav) document.body.style.paddingTop = nav.offsetHeight + "px";
  };
}
