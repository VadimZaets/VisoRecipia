import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaBookmark } from "react-icons/fa";

export const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/" >
                <h1 className={styles.logo}>
                    Viso<span>Recipia</span>
                </h1>
            </Link>

            <div className={styles.buttonContainer}>
                <Link to="/selections" className={styles.button}>
                    <FaBookmark className={styles.icon}/>
                    My Selections
                </Link>
            </div>
        </header>
    );
}
