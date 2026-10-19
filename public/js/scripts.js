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
document.addEventListener("DOMContentLoaded", () => {
   console.log('DOMContentLoaded is loaded for navigation scripts!');

   const navigationButton = document.getElementById("navigation-button");
   const navigationBackground = document.getElementById("navigation-background");
   const navigationList = document.getElementById("navigation-list");

   const navLinks = [
      ...document.querySelectorAll(
         ".navigation-link, .footer-navigation-link"
      ),
   ];

   // Use the actual targets referenced by the navigation links.
   const sections = [
      ...new Set(
         navLinks
            .map((link) => {
               try {
                  return document.querySelector(link.hash);
               } catch {
                  return null;
               }
            })
            .filter(Boolean)
      ),
   ].sort((a, b) => {
      if (a === b) return 0;

      const position = a.compareDocumentPosition(b);
      return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
   });

   if (!navigationButton || !navigationBackground || !navigationList) {
      console.error("Navigation elements are missing.");
      return;
   }

   function setMenuOpen(isOpen) {
      navigationButton.classList.toggle("active", isOpen);
      navigationBackground.classList.toggle("active", isOpen);
      navigationList.classList.toggle("active", isOpen);
      document.body.classList.toggle("no-scroll", isOpen);

      navigationButton.setAttribute("aria-expanded", String(isOpen));
      navigationButton.setAttribute(
         "aria-label",
         isOpen ? "Close navigation" : "Open navigation"
      );
   }

   function setActiveLink(sectionId) {
      navLinks.forEach((link) => {
         const isActive = link.hash === `#${sectionId}`;

         link.classList.toggle("active", isActive);

         if (isActive) {
            link.setAttribute("aria-current", "location");
         } else {
            link.removeAttribute("aria-current");
         }
      });
   }

   // The button only opens or closes the menu. It never navigates.
   navigationButton.addEventListener("click", () => {
      const isOpen = navigationList.classList.contains("active");
      setMenuOpen(!isOpen);
   });

   // Close the menu if the user clicks outside the list.
   navigationBackground.addEventListener("click", (event) => {
      if (event.target === navigationBackground) {
         setMenuOpen(false);
      }
   });

   // A link click closes the menu and scrolls to that link's target.
   navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
         const target = sections.find(
            (section) => `#${section.id}` === link.hash
         );

         if (!target) return;

         event.preventDefault();
         setMenuOpen(false);

         requestAnimationFrame(() => {
            target.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });

            history.replaceState(null, "", link.hash);
            setActiveLink(target.id);
         });
      });
   });

   // Set the active link based on the section nearest the activation line.
   function updateActiveLink() {
      if (sections.length === 0) return;

      const activationPoint = window.innerHeight * 0.35;
      let currentSection = sections[0];

      for (const section of sections) {
         if (section.getBoundingClientRect().top <= activationPoint) {
            currentSection = section;
         } else {
            break;
         }
      }

      setActiveLink(currentSection.id);
   }

   window.addEventListener("scroll", updateActiveLink, { passive: true });
   window.addEventListener("resize", updateActiveLink);

   // Set the correct initial link on page load.
   updateActiveLink();
});





/*===============================================================
          progress-bars scripts
==================================================================*/
document.addEventListener("DOMContentLoaded", function () {
   console.log("DOMContentLoaded has loaded for skills section!");

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

/*===============================================================
          portfolio section scripts
==================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   console.log("DOMContentLoaded has loaded for portfolio section!");

   const filterButtons = document.querySelectorAll('.portfolio-filter-button');

   function removeFilterButtonActiveClass() {
      filterButtons.forEach((filterButton) => {
         filterButton.classList.remove('active');
      });
   }

   function addFilterButtonActiveClass(e) {
      removeFilterButtonActiveClass();
      e.target.classList.add('active');
   }

   filterButtons.forEach((filterButton) => {
      filterButton.addEventListener('click', addFilterButtonActiveClass);
   });


   document.querySelectorAll('.portfolio-icon-link').forEach((link) => {
      link.addEventListener('focus', () => {
         link.closest('.portfolio-card').classList.add('is-focused');
      });

      link.addEventListener('blur', () => {
         link.closest('.portfolio-card').classList.remove('is-focused');
      });
   });

$('#filtr-container').filterizr({});

});


/*===============================================================
          contact form scripts
==================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded has loaded for contact section!');

   /************************* contact section paragraph *************************/
   $('#contact-section-paragraph').waypoint(function () {
      const typed5 = new Typed('#contact-paragraph', {
         strings: ['If you have any', 'If you have any questions or wish', 'If you have any questions or wish to collaborate,', 'If you have any questions or wish to collaborate, send me a message! ',],
         typeSpeed: 120,
         backSpeed: 70,
         backDelay: 1000, // cursorChar: '_',
         showCursor: false,
         shuffle: false,
         smartBackspace: true,
         loop: false,
      });

      this.destroy();
   }, {
      offset: 'bottom-in-view',

   });

   /*************************** effect 07 scripts ***************************/
   const inputs = document.querySelectorAll('.js-effect-07 .utils-effect-07');


   function updateInputState(input) {
      input.classList.toggle('has-content', input.value.trim() !== '');
   }

   inputs.forEach((input) => {
      updateInputState(input); // Handles values already present on load.

      input.addEventListener('input', () => {
         updateInputState(input);
      });

      input.addEventListener('blur', () => {
         updateInputState(input);
      });
   });

   /************************* interactive contact form *************************/
   const fullnamePattern = /^([a-zA-Z-]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const emailPattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const root = document.documentElement;
   const form = document.getElementById('contact-form');
   const nameInput = document.getElementById('name');
   const emailInput = document.getElementById('email');
   const messageInput = document.getElementById('message');

   const requiredMinLength = 10;
   const requiredMaxLength = 280;

   let isNameValid = false;
   let isEmailValid = false;
   let isMessageValid = false;

   let namePrompt = document.getElementById('contact-form-name-prompt');
   let emailPrompt = document.getElementById('contact-form-email-prompt');
   let messagePrompt = document.getElementById('contact-form-message-prompt');
   let message = '';

   const successColor = root.getAttribute('data-theme') === 'dark'
      ? '#4bd704' : '#166534';
   const alertColor = root.getAttribute('data-theme') === 'dark'
      ? '#bc0404' : '#991b1b';
   const toastContainer = document.querySelector('.toast-container');

   if (!toastContainer) {
      console.error('Toast container not found!');
      return;
   }

   const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-xmark',
      warn: 'fa-triangle-exclamation',
      inform: 'fa-circle-info'
   };

   function getMessagePrompt(message, elementId, color) {
      const prompt = document.getElementById(elementId);
      prompt.textContent = message;
      prompt.style.color = color;
   }

   function validateName() {
      let name = nameInput.value.trim();
      message = '';

      if (name.length === 0) {
         message = 'Your first and last name are required!';
         isNameValid = false;
         getMessagePrompt(message, `${namePrompt.id}`, alertColor);
         return false;
      }
      if (!name.match(fullnamePattern)) {
         message = 'Enter your first and last name!';
         isNameValid = false;
         getMessagePrompt(message, `${namePrompt.id}`, alertColor);
         return false;
      }
      message = 'Welcome ' + name;
      isNameValid = true;
      getMessagePrompt(message, `${namePrompt.id}`, successColor);
      return true;
   }

   function validateEmail() {
      let email = emailInput.value.trim();
      message = '';

      if (email.length === 0) {
         message = 'Your email address is required!';
         isEmailValid = false;
         getMessagePrompt(message, `${emailPrompt.id}`, alertColor);
         return false;
      }
      if (!email.match(emailPattern)) {
         message = 'Enter a valid email address!';
         isEmailValid = false;
         getMessagePrompt(message, `${emailPrompt.id}`, alertColor);
         return false;
      }
      message = 'Valid email address';
      isEmailValid = true;
      getMessagePrompt(message, `${emailPrompt.id}`, successColor);
      return true;
   }

   function validateMessage() {
      let textAreaMessage = messageInput.value.trim();
      message = '';

      if (textAreaMessage.length < requiredMinLength) {
         message = `Minimum ${requiredMinLength} characters required!`;
         isMessageValid = false;
         getMessagePrompt(message, `${messagePrompt.id}`, alertColor);
         return false;
      }
      if (textAreaMessage.length > requiredMaxLength) {
         message = `Maximum ${requiredMaxLength} characters allowed!`;
         isMessageValid = false;
         getMessagePrompt(message, `${messagePrompt.id}`, alertColor);
         return false;
      }
      let maxRequiredCharactersLeft = requiredMaxLength - textAreaMessage.length;
      message = `Maximum ${maxRequiredCharactersLeft} characters left`;
      isMessageValid = true;
      getMessagePrompt(message, `${messagePrompt.id}`, successColor);
      return true;
   }

   function showToastNotification(type, messages) {
      const toast = document.createElement('div');
      const icon = document.createElement('i');
      const content = document.createElement('div');

      toast.className = `toast ${type}`;
      toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

      icon.className = `fa-solid ${icons[type]}`;
      icon.setAttribute('aria-hidden', 'true');

      if (Array.isArray(messages)) {
         const list = document.createElement('ul');

         messages.forEach((message) => {
            const item = document.createElement('li');
            item.textContent = message;
            list.appendChild(item);
         });

         content.appendChild(list);
      } else {
         content.textContent = messages;
      }

      toast.append(icon, content);
      toastContainer.appendChild(toast);

      window.setTimeout(() => {
         toast.classList.add('exit-to-left');
      }, 5000);

      toast.addEventListener('animationend', (event) => {
         if (event.animationName === 'exit-to-left') {
            toast.remove();
         }
      });
   }

   function performInvalidForm(errors) {
      showToastNotification('error', errors);
   }

   async function performValidForm() {
      const submitButton = document.getElementById("contact-form-submit");

      submitButton.disabled = true;
      submitButton.value = "Sending...";

      try {
         const data = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
         };

         const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         const result = await response.json();

         if (!response.ok) {
            throw new Error(result.message || "Unable to send message.");
         }

         showToastNotification("success", result.message);

         form.reset();

         inputs.forEach((input) => {
            updateInputState(input);
         });

         namePrompt.textContent = "\u00A0";
         emailPrompt.textContent = "\u00A0";
         messagePrompt.textContent = "\u00A0";
      } catch (error) {
         showToastNotification(
            "error",
            error.message || "Something went wrong while sending your message."
         );
      } finally {
         submitButton.disabled = false;
         submitButton.value = "Send Message";
      }
   }


   function validateForm(event) {
      event.preventDefault();

      const errors = [];

      if (!validateName()) {
         errors.push("Enter a valid first and last name!");
      }

      if (!validateEmail()) {
         errors.push("Enter a valid email address!");
      }

      if (!validateMessage()) {
         errors.push(
            `Enter a message between ${requiredMinLength} and ${requiredMaxLength} characters!`
         );
      }

      if (errors.length > 0) {
         performInvalidForm(errors);
         return;
      }

      performValidForm();
   }


   nameInput.addEventListener('keyup', validateName);
   emailInput.addEventListener('keyup', validateEmail);
   messageInput.addEventListener('keyup', validateMessage);
   form.addEventListener('submit', validateForm);

   document.getElementById('copyright-year').textContent = new Date().getFullYear();


});