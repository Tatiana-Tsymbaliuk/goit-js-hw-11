import { PixabayAPI } from './pixabay-api';
import createPhotosCard from './template/photos.hbs'
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const photoWrapperEl = document.querySelector('.gallery');
const loadMoreBt = document.querySelector('.load-more');
const searchFormEl = document.querySelector('.search-form');

const fotoPixabayAPI = new PixabayAPI();

const handleSearchPhotos = event => {
        event.preventDefault();
const searchQuery = event.target.elements['searchQuery'].value.trim();
fotoPixabayAPI.q = searchQuery;
        fotoPixabayAPI.fetchPhoto()
                .then(data => {
                        if (!data.hits.length) {
                                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                                photoWrapperEl.innerHTML = '';
                                loadMoreBt.classList.add('is-hidden');
                        } else {
                                // Notify.info('Hooray! We found 500 images.');                
                                photoWrapperEl.innerHTML = createPhotosCard(data.hits)
                        }
                        if (data.totalHits.length === fotoPixabayAPI.page) {
                         loadMoreBt.classList.add('is-hidden');        
                    Notify.failure('We are sorry, but you have reached the end of search results.');       
                        } else {
                          loadMoreBt.classList.remove('is-hidden');      
                        }
                })
                .catch(error => { console.log(error) });
        loadMoreBt.classList.add('is-hidden');     
};
const handleLoadPhoto = () => {
fotoPixabayAPI.page += 1;

        fotoPixabayAPI.fetchPhoto()
                .then(data => {
                        if (fotoPixabayAPI.page === data.hits.length) {
                Notify.failure('We are sorry, but you have reached the end of search results.'); 
                loadMoreBt.classList.add('is-hidden');       
                } else
        photoWrapperEl.insertAdjacentHTML('beforeend', createPhotosCard(data.hits))
                })
                .catch(error => { console.log(error) });                      
};

searchFormEl.addEventListener('submit', handleSearchPhotos);
loadMoreBt.addEventListener('click', handleLoadPhoto);
