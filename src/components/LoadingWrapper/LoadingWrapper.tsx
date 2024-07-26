"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return loading ? <LoadingScreen /> : <>{children}</>;
};

export default LoadingWrapper;
