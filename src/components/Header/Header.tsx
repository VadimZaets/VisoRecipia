import React from "react";
import styles from "./Header.module.scss";
import { FaBookmark } from "react-icons/fa";

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                Viso<span>Recipia</span>
            </h1>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>
                    <FaBookmark className={styles.icon}/>
                    My Selections
                </button>
            </div>
        </header>
    )
}
