import React from "react";
import loadingGif from "../../Assets/images/loading.gif";

function Loading() {
  return (
    <div className="loading">
      <img src={loadingGif} alt="loading" />
    </div>
  );
}

export default Loading;
