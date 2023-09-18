import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    const loginData = {
      name: name,
      surname: surname,
      username: username,
      password: password,
    };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire("Kullanıcı oluşturma işlemi başarılı", "", "success");
          navigate("/login");
        } else {
          Swal.fire("Kullanıcı oluşturulamadı", "error");
        }
      })
      .catch((error) => {
        console.error("Veri kaydedilirken bir hata oluştu", error);
      });
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 mx-auto px-4 pt-8 h-screen grid place-items-center text-white">
      <div className="grid place-items-center">
        <div className="flex flex-col gap-5 items-center w-full">
          <div className="flex flex-col gap-5">
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded-xl text-black dark:text-white dark:bg-zinc-700"
                placeholder="Adınız"
                type="text"
              />
            </div>
            <div>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="p-2 rounded-xl text-black dark:text-white dark:bg-zinc-700"
                placeholder="Soy adınız"
                type="text"
              />
            </div>
            <div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 rounded-xl text-black dark:text-white dark:bg-zinc-700"
                placeholder="Kullanıcı adı"
                type="text"
              />
            </div>
            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-xl text-black dark:text-white dark:bg-zinc-700"
                placeholder="Şifre"
                type="password"
              />
            </div>
            <div className="w-full bg-slate-500 text-center rounded-xl">
              <button onClick={handleSave} className="py-1">
                Kayıt ol
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
