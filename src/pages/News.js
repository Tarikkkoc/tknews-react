import React, { useEffect, useState } from "react";
import useQuery from "../utils/useQuery";
import { Link, useParams } from "react-router-dom";

const News = () => {
  const { path, ...rest } = useParams();
  console.log(path, rest);
  const { data, isLoading, error } = useQuery({
    url: `http://localhost:5000/api/${path}`,
  });

  if (isLoading) {
    return (
      <div className="text-black dark:text-white bg-gray-100 dark:bg-zinc-950 h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <>kayıt bulunamadı...</>;
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-zinc-950">
      <h2 className="text-4xl text-black dark:text-white font-semibold pl-4 mobile:text-center tablet:text-center">
        {path.toLocaleUpperCase()}
      </h2>
      <div className=" rounded-md grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 lg:grid-cols-4 gap-10 p-4">
        {data.map((item, index) => (
          <Link to={`${item.id}`}>
            <div
              key={index}
              className="bg-gary-50 dark:bg-zinc-900 p-4 rounded shadow cursor-pointer"
            >
              <img
                src={item.image}
                // alt={pageTitle}
                className="w-full object-cover rounded mb-4 object-contain"
              />
              <h2
                title={item.title}
                className="text-xl dark:text-white mobile:text-xs font-semibold truncate mb-2"
              >
                {item.title}
              </h2>
              {/* <div
            className="text-sm text-gray-600 truncate"
            dangerouslySetInnerHTML={{ __html: item.content }}
          /> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
