import _ from 'lodash';

class StateInitializer {

    constructor(imageRertriever, dimensions) {
        this.maxX = dimensions.x;
        this.maxY = dimensions.y;
        this.imageRertriever = imageRertriever;
    }

    getRandomLocation() {
        return {
            x: Math.floor(Math.random() * this.maxX + 1),
            y: Math.floor(Math.random() * this.maxY + 1)
        };
    }

    getRandomRotation() {
        return  Math.random() * Math.PI * 2;
    }

    createState() {
        return this.imageRertriever.retrieveImageUrls()
            .then(urls => ({
                images: urls.map(url => ({
                    url: url,
                    location: this.getRandomLocation(),
                    rotation: this.getRandomRotation(),
                    id: _.uniqueId('img-')
                })),
                activeId: 'img-0'
            }));
    }
}

export default StateInitializer;