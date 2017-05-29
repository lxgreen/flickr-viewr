import axios from 'axios';

class FlickrImageRetriever {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    // gets 'interestingness' images from Flickr, from a random page
    // returns a promise that is being resolved to url array
    retrieveImageUrls(imageCount = 20) {
        const flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&extras=url_m&format=json&nojsoncallback=1';
        const page = Math.floor(Math.random() * 24) + 1;

        return axios.get(`${flickrUrl}&per_page=${imageCount}&api_key=${this.apiKey}&page=${page}`)
            .then(response => {
                if (response.status === 200 && response.data && response.data.photos) {
                    return response.data.photos.photo.map(photo => photo.url_m)
                        .filter(url => typeof url === 'string');
                }
            })
            .catch(error => console.error(error));
    }
}

export default FlickrImageRetriever;