export class SelectImage {
    
    constructor() {
        this.key = 'Lt9am0k6ijWEDjgVOyxWsfjNV06AAdZ91lhqOM1yh5IwNgxgpyaDENqu';
        this.query = 'Gym';
    }
    
    async getPhotos() { 
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${this.query}`, {
                headers: {
                    Authorization: this.key
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error to fetch pexels:", error);
        }
    }
    
    async getPhoto(pos) {
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${this.query}`, {
                headers: {
                    Authorization: this.key
                }
            });
            const data = await response.json();
            if (data.photos && data.photos.length > 0) {
               console.log("url: ",data.photos);
                return data.photos[pos].src.original;
            } else {
                console.log("This photo doesn't have a url");
            }
        } catch (error) {
            console.error("Error to fetch pexels:", error);
        }
    }
}
