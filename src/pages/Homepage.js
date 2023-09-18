import React from "react";
import useQuery from "../utils/useQuery";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { data, isLoading, error } = useQuery({
    url: "http://localhost:5000/menu-list",
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>kayıt bulunamadı...</>;
  }

  const categories = ["Gündem", "Dünya", "Spor", "Finans"];

  return (
    <div className="w-full h-full tablet:h-screen bg-gray-200 dark:bg-zinc-950 py-10 mobile:py-0 tablet:py-0">
      <div className="rounded-md grid grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 tablet:place-content-center lg:grid-cols-4 gap-10 p-6">
        {data.map((item) => (
          <Link to={item.link}>
            <div className="bg-gary-50 dark:bg-zinc-900 flex flex-col items-center p-4 rounded shadow cursor-pointer">
              <img
                className="h-44 object-cover rounded mb-4 object-contain"
                src="/img/logowhite.png"
                alt={item.name}
              />
              <h2 className="text-black dark:text-white">
                {item.name} haberleri
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
