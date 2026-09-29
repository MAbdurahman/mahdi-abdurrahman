'use strict';

document.addEventListener('DOMContentLoaded', () => {
   /*===============================================================
       preloader
==================================================================*/
   // makes sure that whole site is loaded
   $('#preloader__gif, #preloader').fadeOut(2500, function () {

   });
});

document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded has loaded!');


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
         const response = await fetch("http://localhost:5000/api/contact", {
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
   });

});