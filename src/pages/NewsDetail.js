import React from "react";
import { useParams } from "react-router-dom";
import useQuery from "../utils/useQuery";

const NewsDetail = () => {
  const { path, id } = useParams();
  console.log(path, id);

  const { data, isLoading, error } = useQuery({
    url: `http://localhost:5000/detail?feedUrl=${path}&id=${id}`,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>kayıt bulunamadı...</>;
  }

  console.log(data);

  return (
    <div className="w-full mobile:h-screen tablet:h-screen flex flex-col items-center text-black dark:text-white bg-gray-100 dark:bg-zinc-950">
      <div>
        <div className="py-5 text-xl font-bold mobile:w-screen mobile:px-10 tablet:w-screen tablet:px-10">
          <h1>{data.title}</h1>
        </div>
        <div
          className="contentNew text-sm text-gray-600 w-[40rem] mobile:w-screen mobile:px-10 tablet:w-screen talet:px-10 flex flex-col gap-3.5 py-5"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </div>
    </div>
  );
};

export default NewsDetail;
