const axios = require('axios').default;
axios.defaults.baseURL = 'https://pixabay.com/api';

export class PixabayAPI {
  #page = 1;
  #query = '';
  #totalPages = 0;
  #params = {
    params: {
      key: '30554154-3b0c94c508b526685c8ecc515',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
    },
  };

  async getPhotos() {
    const { data } = await axios.get(`/?q=${this.#query}&page=${this.#page}`, this.#params);
    return data;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  get query() {
    return this.#query;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    const perPage = this.#params.params.per_page;
    this.#totalPages = Math.ceil(total / perPage);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}