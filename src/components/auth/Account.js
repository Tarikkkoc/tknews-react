import React, { useEffect, useState } from "react";
import useQuery from "../../utils/useQuery";
import jwt_decode from "jwt-decode";

const Account = () => {
  const [user, setUser] = useState([]);
  const { data, isLoading, error } = useQuery({
    url: "http://localhost:5000/users",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    let decodedToken;

    if (token) {
      try {
        decodedToken = jwt_decode(token);
      } catch (e) {
        console.error("Invalid token:", e);
        decodedToken = null;
      }
    }

    if (user.length >= 0) {
      let userData = data.find(
        (info) => info.username === decodedToken.username
      );
      setUser(userData);
    }
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>kayıt bulunamadı...</>;
  }

  return (
    <div>
      <div>{user.username}</div>
    </div>
  );
};

export default Account;
