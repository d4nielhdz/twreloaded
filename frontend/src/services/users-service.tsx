import axios from 'axios';
import { User } from '../models/user';

const baseUrl = 'http://127.0.0.1:5001/twreloaded-cc2cf/us-central1/api';

export const searchUsers = async (query: string) => {
    try {
        let response = await axios.get(`${baseUrl}/users/search`, { params: { query: query }});
        return response.data as User[];
    } catch (e) {
        console.log(e);
        throw e;
    }
}