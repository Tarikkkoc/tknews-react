import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useQuery from "../../utils/useQuery";
import Cookies from "js-cookie";

const Login = ({ loginData, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data, isLoading, error } = useQuery({
    url: "http://localhost:5000/users",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);

      navigate("/");
    } else {
      Swal.fire("Hata", "Hatalı kullanıcı adı veya şifre", "error");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 mx-auto pt-8 h-screen grid place-items-center text-white">
      <div>
        <div className="flex flex-col gap-5 items-center w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="">
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="p-2 rounded-xl text-black dark:text-white dark:bg-zinc-700"
                placeholder="Kullanıcı adı"
                type="text"
              />
            </div>
            <div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="p-2 rounded-xl text-black dark:text-white dark:bg-zinc-700"
                placeholder="Şifre"
                type="password"
              />
            </div>
            <div className="w-full bg-slate-500 hover:bg-slate-200 text-center rounded-xl">
              <button className="py-1">Giriş yap</button>
            </div>
          </form>
          <div className="flex flex-col items-start">
            <Link to="/register">
              <span className="text-sm underline underline-offset-4">
                Hesabınız yok mu?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
