import { PixabayAPI } from './pixabay-api';
import createPhotosCard from './template/photos.hbs'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

const photoWrapperEl = document.querySelector('.gallery');
const loadMoreBt = document.querySelector('.load-more');
const searchFormEl = document.querySelector('.search-form');
const endText = document.querySelector('.the-end');

const fotoPixabayAPI = new PixabayAPI();

const handleSearchPhotos =  async event => {
        event.preventDefault();
      
const searchQuery = event.target.elements['searchQuery'].value.trim();
        fotoPixabayAPI.q = searchQuery;
            if (searchQuery === '') {
    return;
  }
        try {
                const { data } = await fotoPixabayAPI.fetchPhoto(); 
 photoWrapperEl.innerHTML = createPhotosCard(data.hits);  
lightbox.refresh();              
             
                        if (!data.hits.length) {                      
                                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                                loadMoreBt.classList.add('is-hidden');
                                endText.classList.add('is-hidden');
                        return;                              
                         }  Notify.success(`Hooray! We found ${data.totalHits} images.`);                           
                        loadMoreBt.classList.remove('is-hidden');
                 
                        if (data.totalHits <= fotoPixabayAPI.page*fotoPixabayAPI.per_page) {
                              loadMoreBt.classList.add('is-hidden');
                                endText.classList.remove('is-hidden');
                                return;     
                                
                        } loadMoreBt.classList.remove('is-hidden');                                    
      } catch (err) {
                console.log(err);
}              
};
const handleLoadPhoto = async () => {
fotoPixabayAPI.page += 1;
        try {
        const { data } = await fotoPixabayAPI.fetchPhoto();
                photoWrapperEl.insertAdjacentHTML('beforeend', createPhotosCard(data.hits));
                
         if (data.totalHits <= fotoPixabayAPI.page*fotoPixabayAPI.per_page) {
                loadMoreBt.classList.add('is-hidden');
                 endText.classList.remove('is-hidden');
                 return;
                  
                } loadMoreBt.classList.remove('is-hidden');   
          
         if (data.hits.length === data.totalHits) {
    loadMoreBt.classList.add('is-hidden');
                 endText.classList.remove('is-hidden');
                 return;
  }
}       
        catch (err) {
                console.log(err);
        }                      
};

searchFormEl.addEventListener('submit', handleSearchPhotos);
loadMoreBt.addEventListener('click', handleLoadPhoto);

const lightbox = new SimpleLightbox(`.gallery__item`, { captionsData: "alt", captionDelay: 250, captions: true });



