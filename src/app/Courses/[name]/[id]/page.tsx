"use client";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { name, id } = useParams();

  return (
    <div>
      {/* Display the name and id */}
      <h1>Category Name: {name}</h1>
      <h2>Category ID: {id}</h2>
    </div>
  );
};

export default Page;
