import { getAuth } from "firebase/auth";
import { app } from "../firebase-config";
import { Report } from "../models/report";
import { getAuthConfig } from "./auth-service";
import axios from "./axios";

const auth = getAuth(app);

export const logAppOpened = async (userId: string) => {
  try {
    const config = await getAuthConfig();
    await axios.post("/action/logOpen", { userId }, config);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getReport = async (dateStart: number) => {
  try {
    const config = await getAuthConfig();
    const response = await axios.get(`/report/${dateStart}`, config);
    const report = response.data;
    return report as Report;
  } catch (e) {
    console.log(e);
    // throw e;
  }
};
