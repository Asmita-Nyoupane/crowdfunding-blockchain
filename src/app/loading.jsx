"use client";
import React from "react";
import { TailSpin } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex justify-center py-10 items-center h-screen min-h-screen">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="2"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
