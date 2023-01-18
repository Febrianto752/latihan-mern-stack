import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

function Sign() {
  const router = useRouter();
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (Cookies.get("token")) {
    router.back();
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/signin",
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      // verify token, jika ada salah maka otomatis membangkitkan error
      jwtDecode(token);

      // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(token, SECRET_KEY!).toString();

      Cookies.set("token", ciphertext, { expires: 1 });
      router.push("/admin/dashboard");
      // console.log(verifyToken);
    } catch (error: any) {
      alert("wrong credential");
      console.log("error : ", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign in Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Sign;
