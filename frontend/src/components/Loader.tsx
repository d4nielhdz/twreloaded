import React from "react";

const Loader = ({ color = "blue" }: { color?: string }) => {
  return (
    <div className={`lds-ring ${color}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
