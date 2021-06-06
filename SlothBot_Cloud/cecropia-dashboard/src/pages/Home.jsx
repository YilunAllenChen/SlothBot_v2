import React from "react";

export default function BasicCardExample() {
  return (
    <div style={{ height: "calc(100vh - 80px)" }}>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/foiRTJnc-vA"
        title="YouTube video player"
        frameBorder="0"
        autoplay="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
