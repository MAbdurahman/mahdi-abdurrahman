'use strict';

/*===============================================================
            preloader scripts
==================================================================*/
window.addEventListener('load', () => {
   const preloader = document.getElementById('preloader');

   preloader.classList.add('is-hidden');

   // Optional: remove it from the DOM after its fade-out transition
   preloader.addEventListener(
      'transitionend',
      () => preloader.remove(),
      { once: true }
   );
});

/*===============================================================
          navigation and footer navigation
==================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded loaded for navigation scripts!');

   const navigationButton = document.getElementById('navigation-button');
   const navigationBackground = document.getElementById('navigation-background');
   const navigationList = document.getElementById('navigation-list');
   const navigationItems = document.querySelectorAll('.navigation-item');


   navigationButton.addEventListener('click', toggleNavigation);

   navigationList.addEventListener('click', closeNavigation);

   navigationBackground.addEventListener('click', (event) => {
      if (event.target === navigationBackground) {
         closeNavigation();
      }
   });


   navigationItems.forEach(navigationItem => {
      navigationItem.addEventListener('click', () => {
         closeNavigation();
      });
   });

   function toggleNavigation() {
      navigationButton.classList.toggle('active');
      navigationBackground.classList.toggle('active');
      navigationList.classList.toggle('active');
      document.body.classList.toggle('no-scroll');    // lock scrolling
   }

   function closeNavigation() {
      navigationButton.classList.remove('active');
      navigationBackground.classList.remove('active');
      navigationList.classList.remove('active');
      document.body.classList.remove('no-scroll');
   }


});

/*===============================================================
          progress-bars scripts
==================================================================*/
document.addEventListener("DOMContentLoaded", function () {
   console.log("DOMContentLoaded has loaded for progress-bars!");

   const progressSection = document.querySelector("#progress-bars");
   const progressBars = document.querySelectorAll(".progress-bar");

   function animateProgress(bar) {
      const target = Number(bar.dataset.target);
      const output = bar.closest(".progress-wrap").querySelector(".progress-value");
      const duration = 3000;
      const startTime = performance.now();

      function update(now) {
         const elapsed = now - startTime;
         const progress = Math.min(elapsed / duration, 1);
         const value = Math.round(progress * target);

         bar.value = value;
         output.value = `${value}%`;
         output.textContent = `${value}%`;

         // Position the badge at the current percentage.
         output.style.left = `${value}%`;

         if (progress < 1) {
            requestAnimationFrame(update);
         }
      }

      requestAnimationFrame(update);
   }

   const observer = new IntersectionObserver(
      (entries, currentObserver) => {
         if (!entries[0].isIntersecting) return;

         progressBars.forEach(animateProgress);
         currentObserver.unobserve(progressSection);
      },
      { threshold: 0.15 }
   );

   observer.observe(progressSection);


   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progressBars.forEach((bar) => {
         const target = Number(bar.dataset.target);
         const output = bar.closest(".progress-wrap").querySelector(".progress-value");

         bar.value = target;
         output.value = `${target}%`;
         output.textContent = `${target}%`;
         output.style.left = `${target}%`;
      });
   } else {
      observer.observe(progressSection);
   }


});



document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded has loaded!');

/*
   const form = document.getElementById("contact-form");
   const status = document.getElementById("form-status");

   form.addEventListener("submit", async (event) => {
      event.preventDefault();

      status.textContent = "Sending...";

      const data = {
         name: document.getElementById("name").value.trim(),
         email: document.getElementById("email").value.trim(),
         message: document.getElementById("message").value.trim(),
      };

      try {
         const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
         });

         const result = await response.json();

         if (!response.ok) {
            throw new Error(result.message);
         }

         status.textContent = result.message;
         form.reset();
      } catch (error) {
         status.textContent = error.message || "Something went wrong.";
      }
   });*/


});


$('#progress-bars').waypoint(function () {
   $('.progress-bar').each(function () {
      $(this).animate({
         width: $(this).attr('aria-valuenow') + '%',
      }, 3000);
   });

   this.destroy();
}, {
   offset: '100%',
});