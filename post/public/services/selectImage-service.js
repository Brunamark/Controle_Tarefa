import { StorageService } from "../services/localStorage-service.js";
export class SelectImageService {
    
    constructor() {
        this.key = 'Lt9am0k6ijWEDjgVOyxWsfjNV06AAdZ91lhqOM1yh5IwNgxgpyaDENqu';
        this.query = 'Gym';
        this.url = '';
    }
    
    async getPhotos() { 
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${this.query}`, {
                headers: {
                    Authorization: this.key
                }
            });
            const data = await response.json();
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
               this.url = data.photos[pos].src.original;
            //   console.log("url: ",this.url);
                StorageService.saveData(1,this.url);
                return this.url;
            } else {
                console.log("This photo doesn't have a url");
            }
        } catch (error) {
            console.error("Error to fetch pexels:", error);
        }
    }
    getUrlPhoto(){
        this.url = StorageService.loadData(1);
       return this.url;
    }
    setQuery(newQuery) {
        if (typeof newQuery === 'string' && newQuery.trim() !== '') {
            this.query = newQuery;
        } else {
            console.error("Invalid query");
        }
    }
}
