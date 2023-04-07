document.querySelectorAll(".navbar-burger")[0].onclick = () => {
    document.getElementsByClassName("navbar")[0].classList.toggle("open");
    document.getElementById("menu").classList.toggle("bx-x")
    document.getElementById("menu").classList.toggle("bx-menu")
}
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 100;
    // code for randomized delays
  
    //   var delta = 200 - Math.random() * 100; 
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }
  
    setTimeout(function() {
    that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  };
  window.addEventListener('load', () => {
    if (!isMobileDevice()) {
      // Initialize AOS for non-mobile devices
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    } else {
      // Disable AOS animations on mobile devices
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach(element => {
        element.removeAttribute('data-aos');
        element.removeAttribute('data-aos-duration');
      });
    }
  });
  
  function isMobileDevice() {
    // Define your breakpoint here, e.g. 768 pixels
    const breakpoint = 768;
    
    // Compare window.innerWidth with the breakpoint
    return window.innerWidth < breakpoint;
  }
  
  var prevScrollpos = window.pageYOffset;
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  var currentScrollPos = window.pageYOffset;
  if (currentScrollPos == 0) {
    navbar.classList.remove("navbar-scrolled");
  } else {
    navbar.classList.add("navbar-scrolled");
  }
  prevScrollpos = currentScrollPos;
});
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {
    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    }
    else {
      accordionItemBody.style.maxHeight = 0;
    }
    
  });
});
var heroSection = document.getElementsByClassName('hero')[0];

// Only apply opacity changes on larger screens
if (window.innerWidth >= 800) {
  // Listen for changes in the scroll position of the page
  window.addEventListener('scroll', function() {
    // Calculate the opacity based on the current scroll position
    var opacity = 1 - window.pageYOffset/500;
    // Set the opacity of the hero section
    heroSection.style.opacity = opacity.toString();
  });
}
// JavaScript
const stats = document.querySelectorAll('.count-up');

const options = {
  threshold: 0.8 // Trigger when 80% of the element is in the viewport
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Get the target stat element
      const statElement = entry.target;

      // Check if the count-up animation has already started for this stat
      const hasCountedUp = statElement.getAttribute('data-counted-up');
      if (!hasCountedUp) {
        // Set the flag to indicate that count-up animation has started
        statElement.setAttribute('data-counted-up', 'true');

        // Get the value to count up to
        const countTo = parseInt(statElement.querySelector('.stat-title').textContent);

        // Start counting up from 0 to the countTo value
        let count = 0;
        const countUp = setInterval(() => {
          // Update the stat value with plus sign for 'Bruhware users' stat after counting up
          if (statElement.querySelector('.stat-d').textContent === 'Bruhware users') {
            statElement.querySelector('.stat-title').textContent = count + '+';
          }
          // Update the stat value with percentage symbol for 'Customer satisfaction' and 'Undetected' stats
          else if (statElement.querySelector('.stat-d').textContent === 'Customer satisfaction' ||
            statElement.querySelector('.stat-d').textContent === 'Undetected') {
            statElement.querySelector('.stat-title').textContent = count + '%';
          }
          // Update the stat value without percentage symbol for other stats
          else {
            statElement.querySelector('.stat-title').textContent = count;
          }
          count++;
          if (count > countTo) {
            clearInterval(countUp);
          }
        }, 20); // Adjust the interval time for desired animation speed
      }
    }
  });
}, options);

stats.forEach(stat => {
  observer.observe(stat);
});
