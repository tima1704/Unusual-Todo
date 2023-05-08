import React from "react";
import cls from "./index.module.css";

const CardTheme = ({setTheme}) => {
  return (
    <div className={cls.container_Theme}>
      <button className={cls.light} onClick={() => setTheme("light")}>light</button>
      <button className={cls.dark} onClick={() => setTheme("dark")}>dark</button>
    </div>
  );
};

export default CardTheme