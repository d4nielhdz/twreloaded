import { getAuthConfig } from "./auth-service";
import axios from "./axios";

export const logAppOpened = async (userId: string) => {
  try {
    const config = await getAuthConfig();
    await axios.post("/action/logOpen", { userId }, config);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
