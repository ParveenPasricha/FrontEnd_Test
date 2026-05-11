import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const Loader = () => {

  const containerRef = useRef(null);

  useEffect(() => {

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/Loader.json",
    });

    return () => animation.destroy();

  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-white">

      <div
        ref={containerRef}
        className="w-100 h-100"
      />

    </div>
  );
};

export default Loader;