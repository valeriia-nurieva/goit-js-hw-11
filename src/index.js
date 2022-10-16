import { refs } from './js/refs';
import { PixabayAPI } from './js/pixabay-api';
import { createMarkup } from './js/create-markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/gallery.css';

const pixabay = new PixabayAPI();

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();

  const { searchQuery } = e.currentTarget.elements;
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    Notify.failure('Enter data to search');
    return;
  }
  pixabay.query = query;
  clearPage();

  try {
    const { hits, total, totalHits } = await pixabay.getPhotos();

    hits.length === 0
      ? Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      : Notify.success(`Hooray! We found ${totalHits} images.`);

    pixabay.calculateTotalPages(totalHits);
    if (pixabay.isShowLoadMore) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
      renderMarkup(hits);
      const simpleLightbox = new SimpleLightbox('.gallery-item');

    // const { height: cardHeight } = document
    //   .querySelector('.gallery')
    //   .firstElementChild.getBoundingClientRect();
    // window.scrollBy({
    //   top: cardHeight * 2,
    //   behavior: 'smooth',
    // });
  } catch (error) {
    console.log(error.message);
    Notify.failure('Sorry, something went wrong. Please try again.');
    clearPage();
  }
}

async function onLoadMore() {
  try {
    pixabay.incrementPage();
    const { hits } = await pixabay.getPhotos();

    renderMarkup(hits);
    const simpleLightbox = new SimpleLightbox('.gallery-item');
    simpleLightbox.refresh();

    if (!pixabay.isShowLoadMore) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    }
  } catch (error) {
    console.log(error.message);
    Notify.failure('Sorry, something went wrong. Please try again.');
    clearPage();
  }
}

function clearPage() {
  pixabay.resetPage();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}

function renderMarkup(array) {
  const markup = createMarkup(array);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
