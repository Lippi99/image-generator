import style from "./navLink.module.scss";

export const NavLink = () => {
  return (
    <nav className={style.navLink}>
      <ul>
        <li>
          <a href="">Who we are</a>
        </li>
        <li>
          <a href="">What we build</a>
        </li>
        <li>
          <a href="">Our Actions</a>
        </li>
        <li>
          <a href="">Resources</a>
        </li>
        <li>
          <a href="">Our Community</a>
        </li>
      </ul>
    </nav>
  );
};
