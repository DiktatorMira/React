import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <NavLink to="/about-func" className={css.navLink}>AboutFunc</NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink to="/about-class" className={css.navLink}>AboutClass</NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink to="/city-func" className={css.navLink}>CityFunc</NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink to="/city-class" className={css.navLink}>CityClass</NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink to="/book-func" className={css.navLink}>BookFunc</NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink to="/book-class" className={css.navLink}>BookClass</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}