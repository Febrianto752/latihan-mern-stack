import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
import { secretKey } from "../../config/auth";
import { decryptToken } from "../../services/auth";
import axios from "axios";

function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    username: string;
    orders: number;
  } | null>(null);

  useEffect(() => {
    const encryptToken = Cookies.get("token");

    const token = decryptToken(encryptToken!);
    if (!token) {
      router.push("/auth/signin");
    }

    axios
      .get("http://localhost:4000/api/v1/dashboard", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
        router.push("/auth/signin");
      });
  }, []);

  const handleSignout = () => {
    Cookies.remove("token");
    router.push("/auth/signin");
  };

  if (loading) {
    return <div></div>;
  }
  return (
    <div className="container">
      <button className="btn btn-danger" onClick={handleSignout}>
        Sign out
      </button>
      <h1>Dashboard Admin</h1>
      <p>username : {dashboardData?.username}</p>
      <p>orders : {dashboardData?.orders}</p>
    </div>
  );
}

export default Dashboard;
