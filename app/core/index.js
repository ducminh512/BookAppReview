
import { api } from "./api";
import { login, getCurrentUserInfo } from "./funcs";

export const sdk = {
  ...api,
    login,
    getCurrentUserInfo,
}