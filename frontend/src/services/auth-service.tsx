import axios from 'axios';
import { User } from '../models/user';

const baseUrl = 'http://127.0.0.1:5001/twreloaded-cc2cf/us-central1/api';

export const registerUser = async (user: User) => {
    try {
        await axios.post(`${baseUrl}/users`, user);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getUserById = async (id: string) => {
    try { 
        const response = await axios.get(`${baseUrl}/users/${id}`);
        // console.log(response);
        return response.data as User;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getUserByUsername = async (username: string) => {
    try { 
        const response = await axios.get(`${baseUrl}/users/username/${username}`);
        // console.log(response);
        return response.data as User;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const changeUsername = async (user: User, newUsername: string) => {
    try { 
        await axios.put(`${baseUrl}/users/${user.id}`, {
            username: newUsername
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const deleteUser = async (user: User) => {
    try {
        await axios.delete(`${baseUrl}/users/${user.id}`);
    } catch (e) {
        console.log(e);
        throw e;
    }
}