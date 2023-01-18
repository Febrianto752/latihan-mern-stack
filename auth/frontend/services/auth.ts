// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import { secretKey } from "../config/auth";
import CryptoJS from "crypto-js";

const decryptToken = (encryptToken: string) => {
  if (!encryptToken) {
    return false;
  }
  try {
    let bytes = CryptoJS.AES.decrypt(encryptToken!, secretKey!);

    let originalToken = bytes.toString(CryptoJS.enc.Utf8);

    return originalToken;
  } catch (error) {
    console.log("error ", error);
    return false;
  }
};

export { decryptToken };
