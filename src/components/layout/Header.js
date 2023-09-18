import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useQuery from "../../utils/useQuery";
import jwt_decode from "jwt-decode";

const { classList } = document.documentElement;
classList.add("dark");

const Header = () => {
  const [theme, setTheme] = useState(true);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const changeTheme = () => {
    if (classList[0] === "dark") {
      classList.remove("dark");
      classList.add("light");
    } else {
      classList.add("dark");
      classList.remove("light");
    }

    setTheme((prevState) => !prevState);
  };

  const { data, isLoading, error } = useQuery({
    url: "http://localhost:5000/menu-list",
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>kayıt bulunamadı...</>;
  }

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); //
  };

  return (
    <div className="h-full">
      {!isDrawerOpen && (
        <div className="h-full">
          <div className="h-full w-72 bg-gray-200 dark:bg-black py-16 flex flex-col items-center justify-between text-black dark:text-white tablet:hidden mobile:hidden">
            <Link to="/">
              <img
                className="h-32 rounded-lg"
                src="/img/logowhite.png"
                alt="logo"
              />
            </Link>
            <ul className="grid gap-5 text-xl text-center">
              {data.map((menu) => (
                <Link to={`${menu.link}`}>
                  <li className="hover:underline">{menu.name}</li>
                </Link>
              ))}
              <Link to="/hava">
                <li className="hover:underline">Hava</li>
              </Link>
              {decodedToken && decodedToken.username ? (
                <span
                  onClick={handleLogout}
                  className="hover:underline cursor-pointer"
                >
                  Çıkış Yap
                </span>
              ) : (
                <Link to="/login">
                  <li className="hover:underline">Giriş yap</li>
                </Link>
              )}
            </ul>
            <button
              className={
                "text-black dark:text-white border capitalize border-gray-300 dark:border-zinc-950 dark:bg-zinc-900 font-barlow py-1 px-3 bg-gray-200 hover:bg-zinc-900 hover:text-white rounded-md transition duration-200 ease-in-out dark:hover:bg-gray-200 dark:hover:text-black"
              }
              onClick={() => changeTheme()}
            >
              {theme ? "Light" : "Dark"}
            </button>
          </div>
          <div className="hidden mobile:flex tablet:flex w-full bg-gray-200 dark:bg-black h-16 justify-between items-center fixed top-0 px-8">
            <div>
              <Link to="/">
                <img
                  className="h-10 w-12 rounded-lg"
                  src="/img/logowhite.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="flex gap-10">
              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
                className="text-xl dark:text-white font-bold"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      )}
      {isDrawerOpen && (
        <div>
          <div className="hidden mobile:flex tablet:flex w-full bg-gray-200 dark:bg-black h-16 justify-between items-center fixed top-0 px-8">
            <div>
              <img
                className="h-10 rounded-lg"
                src="/img/logowhite.png"
                alt=""
              />
            </div>
            <div className="flex gap-10">
              <button
                onClick={() => changeTheme()}
                className={
                  "text-black dark:text-white border capitalize dark:border-zinc-950 dark:bg-zinc-900 font-barlow py-1 px-3 bg-gray-300 rounded-md transition duration-200 ease-in-out"
                }
              >
                {theme ? "Light" : "Dark"}
              </button>
              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
                className="text-xl dark:text-white font-bold"
              >
                ☰
              </button>
            </div>
          </div>
          <div className="h-screen fixed right-0 bg-gray-100 dark:bg-zinc-950 flex flex-col gap-20 w-44 py-10 items-center text-white">
            <div className="">
              <span
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
                className="text-3xl font-bold text-right p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 dark:bg-zinc-900 text-black"
              >
                X
              </span>
            </div>
            <ul className="grid gap-8 text-black dark:text-white">
              {data.map((menu) => (
                <Link to={`${menu.link}`}>
                  <li>{menu.name}</li>
                </Link>
              ))}
              <Link to="/hava">
                <li>Hava</li>
              </Link>
              {decodedToken && decodedToken.username ? (
                <span
                  onClick={handleLogout}
                  className="hover:underline cursor-pointer"
                >
                  Çıkış Yap
                </span>
              ) : (
                <Link to="/login">
                  <li className="hover:underline">Giriş yap</li>
                </Link>
              )}
              <button
                onClick={() => changeTheme()}
                className={
                  "text-black dark:text-white border capitalize dark:border-zinc-950 dark:bg-zinc-900 font-barlow py-1 px-3 bg-gray-300 rounded-md transition duration-200 ease-in-out"
                }
              >
                {theme ? "Light" : "Dark"}
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
