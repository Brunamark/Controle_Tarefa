export class StorageService {
    static  saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static  loadData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
}