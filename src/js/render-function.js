import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';



const galleryElement = document.querySelector('.gallery');

export function renderImages(images) {
  const markup = images.map(image => createImageCard(image)).join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
  refreshGallery();
}

function createImageCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <a href="${largeImageURL}" class="gallery__item">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </a>
  `;
}

export function clearGallery() {
  galleryElement.innerHTML = '';
}

export function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

let lightbox;

function refreshGallery() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}