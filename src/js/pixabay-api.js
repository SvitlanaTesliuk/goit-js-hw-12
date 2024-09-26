import axios from 'axios';

const API_KEY = '46065548-5ae4334dfe4b7f7d37f4bc842';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 15;

export async function fetchImages(query, page = 1) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
  
    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error('Failed to fetch images');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }
