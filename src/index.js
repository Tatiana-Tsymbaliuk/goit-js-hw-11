import { PixabayAPI } from './pixabay-api';
import createPhotosCard from './template/photos.hbs'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const photoWrapperEl = document.querySelector('.gallery');
const loadMoreBt = document.querySelector('.load-more');
const searchFormEl = document.querySelector('.search-form');
const endText = document.querySelector('.the-end');

const fotoPixabayAPI = new PixabayAPI();

const handleSearchPhotos =  async event => {
        event.preventDefault();
      
const searchQuery = event.target.elements['searchQuery'].value.trim();
        fotoPixabayAPI.q = searchQuery;
        try {
                const { data } = await fotoPixabayAPI.fetchPhoto();               
                        if (!data.hits.length) {                      
                         Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                        return;                              
                         }  Notify.success(`Hooray! We found ${data.totalHits} images.`);                           
                        loadMoreBt.classList.remove('is-hidden');
                
                        if (data.totalHits <= data.page*data.per_page) {
                        loadMoreBt.classList.add('is-hidden');
                                endText.classList.remove('is-hidden');
                                return;
                        } loadMoreBt.classList.remove('is-hidden');
                
               photoWrapperEl.innerHTML = createPhotosCard(data.hits)                       
      } catch (err) {
                console.log(err);
}              
};
const handleLoadPhoto = async () => {
fotoPixabayAPI.page += 1;
        try {
        const { data } = await fotoPixabayAPI.fetchPhoto();
         if (data.totalHits <= data.page*data.per_page) {
                loadMoreBt.classList.add('is-hidden');
                endText.classList.remove('is-hidden');
                  
          } loadMoreBt.classList.remove('is-hidden');       
                
          photoWrapperEl.insertAdjacentHTML('beforeend', createPhotosCard(data.hits));                                            
}       
        catch (err) {
                console.log(err);
        }                      
};

searchFormEl.addEventListener('submit', handleSearchPhotos);
loadMoreBt.addEventListener('click', handleLoadPhoto);





