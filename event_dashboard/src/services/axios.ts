import axios from 'axios';
const instance = axios.create({ 
    baseURL: 'http://127.0.0.1:5001/twreloaded-cc2cf/us-central1/api', 
    headers: { contentType: 'application/json' } 
});
export default instance