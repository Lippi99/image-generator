import style from "./loginButton.module.scss";
export const LoginButton = () => {
  return (
    <button className={style.btn} type="button">
      Log in
    </button>
  );
};
