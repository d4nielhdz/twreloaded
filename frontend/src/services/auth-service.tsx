
import { User } from '../models/user';
import { auth } from '../firebase-config';
import axios from './axios';

export const registerUser = async (user: User) => {
    try {
        await axios.post('/users', user);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getUserById = async (id: string) => {
    try { 
        const response = await axios.get(`/users/${id}`);
        // console.log(response);
        return response.data as User;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getUserByUsername = async (username: string) => {
    try { 
        const response = await axios.get(`/users/username/${username}`);
        // console.log(response);
        return response.data as User;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const changeUsername = async (user: User, newUsername: string) => {
    try { 
        await axios.put(`/users/${user.id}`, {
            username: newUsername
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const deleteUser = async (user: User) => {
    try {
        await axios.delete(`/users/${user.id}`);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getAuthConfig = async () => {
    let token = await auth.currentUser?.getIdToken() ?? "";
    return {
        headers: { 
            contentType: "application/json",
            Authorization: token
        }
    };
}