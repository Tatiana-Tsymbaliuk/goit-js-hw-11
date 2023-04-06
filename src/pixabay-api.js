export class PixabayAPI{
 #API_KEY = '35097057-211b94425911255e7a1c05e6d';
#BASE_URL = 'https://pixabay.com/api/'; 
        page = 1;  
        q = null;

        fetchPhoto() {
                const searchParams = new URLSearchParams({
                        page: this.page,
                        q: this.q,
                        per_page: 100,
                        image_type: 'photo',
                        orientation: 'horizontal',
                        safesearch: true,
                });

                return fetch(`${this.#BASE_URL}?key=${this.#API_KEY}&${searchParams}`)
                        .then(res => {
                                if (!res.ok) {
                                        throw new Error(res.status);
                                }

                                return res.json();
                        });
}
}