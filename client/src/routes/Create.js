import { useState, useEffect } from "react";
import CreatePost from "../components/Form/CreatePost";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Create = () => {
  return (
    <section className={`flex h-screen w-screen justify-center items-center`}>
      <CreatePost />
    </section>
  );
};

export default Create;
