import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
let modal = null;

galleryEl.innerHTML = galleryItems
   .map(({ original, preview, description }) => {
      return `
   <div class="gallery__item">
      <a class="gallery__link" href="${original}">
         <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
         />
      </a>
   </div>`;
   })
   .join("");

galleryEl.addEventListener("click", (e) => {
   e.preventDefault();

   if (e.target.nodeName !== "IMG") {
      return;
   }

   const src = e.target.dataset.source;
   const alt = e.target.alt;

   createModal(src, alt);

   document.addEventListener("keydown", closeModal);
});

function createModal(src, alt) {
   modal = basicLightbox.create(
      `<img src="${src}" alt="${alt}" width="800" height="600">`
   );
   modal.show();
}

function closeModal(e) {
   if (e.code === "Escape") {
      modal.close();
      document.removeEventListener("keydown", closeModal);
   }
}
