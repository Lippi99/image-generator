import NextImage from "next/image";
import { LoginButton } from "../LoginButton";
import { NavLink } from "../NavLink";
import style from "./header.module.scss";

export const Header = () => {
  return (
    <header className={style.headerContainer}>
      <div className={style.logoContainer}>
        <NextImage width={30} height={30} src="/logo.svg" alt="logo" />
      </div>
      <NavLink />
    </header>
  );
};
