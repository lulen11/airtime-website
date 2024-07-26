import React, { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.scss";

const LoadingScreen = () => {
  const [bodyClass, setBodyClass] = useState<string>("");

  useEffect(() => {
    const bodyClass = document.body.className;
    setBodyClass(bodyClass);
  }, []);

  return (
    <div
      className={`${styles.loadingScreen} ${bodyClass.includes("playersPage") ? styles.playersPage : ""}`}
    >
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingScreen;
