import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://pixabay.com/api/'
// });

export class PixabayAPI{
 #API_KEY = '35097057-211b94425911255e7a1c05e6d';
#BASE_URL = 'https://pixabay.com/api/'; 
        page = 1;  
        q = null;
        per_page = 40;

        fetchPhoto() {
                return axios.get(`${this.#BASE_URL}?key=${this.#API_KEY}`, {
                        params: {
                        page: this.page,
                        q: this.q,
                        per_page: this.per_page,
                        image_type: 'photo',
                        orientation: 'horizontal',
                        safesearch: true,       
                        },
                });
                    
}
}