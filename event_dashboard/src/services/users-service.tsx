import { User } from "../models/user";
import { getAuthConfig } from "./auth-service";
import axios from "./axios";

export const searchUsers = async (query: string) => {
  try {
    let response = await axios.get("/users/search", {
      params: { query: query },
    });
    return response.data as User[];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const toggleFollowUser = async (userId: string) => {
  try {
    let config = await getAuthConfig();
    await axios.post(`/interaction/follow/${userId}`, null, config);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
