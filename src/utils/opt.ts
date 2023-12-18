class opt {
    baseURL: string;
    constructor() {
        this.baseURL = 'http://localhost:8080';
        // this.baseURL = window.location.origin;
    }
}

export default new opt()