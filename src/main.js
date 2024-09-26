import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showErrorMessage } from './js/render-function.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
    event.preventDefault();
    currentQuery = input.value.trim();
    currentPage = 1;  
  
    if (!currentQuery) {
      showErrorMessage('Please enter a search query.');
      return;
    }
  
    clearGallery();
    showLoader();
  
    try {
      const data = await fetchImages(currentQuery, currentPage);
      hideLoader();
  
      if (data.hits.length === 0) {
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
        loadMoreBtn.style.display = 'none';  
        return;
      }
  
      totalHits = data.totalHits;
      renderImages(data.hits);
      loadMoreBtn.style.display = currentPage * 15 < totalHits ? 'block' : 'none';  
  
    } catch (error) {
      hideLoader();
      showErrorMessage('Failed to fetch images. Please try again later.');
    }
  }
  
  async function onLoadMore() {
    currentPage += 1;  
    showLoader();
  
    try {
      const data = await fetchImages(currentQuery, currentPage);
      hideLoader();
  
      renderImages(data.hits);
      loadMoreBtn.style.display = currentPage * 15 < totalHits ? 'block' : 'none'; 
  
      
      const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
  
    } catch (error) {
      hideLoader();
      showErrorMessage('Failed to fetch more images. Please try again later.');
    }
  }

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}