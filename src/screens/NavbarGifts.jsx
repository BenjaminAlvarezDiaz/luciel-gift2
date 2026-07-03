import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import styles from "../styles/NavbarGifts.module.css";

function NavbarGifts (){
    const [activeItem, setActiveItem] = useState("");
    const location = useLocation();

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    useEffect(() => {

        if(location.hash !== ""){
            setActiveItem(location.hash);
        } else if (location.pathname === "/"){
            setActiveItem("#poetryTranslator");
        }
        
        return () => {
            if(location.hash !== ""){
                setActiveItem(location.hash);
            } else if (location.pathname === "/"){
                setActiveItem("#poetryTranslator");
            }
        }
    }, []);

    return (
        <nav className={styles.navigation}>
            <ul>
                <li
                    className={`${styles.list} ${activeItem === "#poetryTranslator" && location.pathname === "/" ? styles.active : ""}`}
                    onClick={() => handleItemClick("#poetryTranslator")}
                >
                    <a href="#poetryTranslator">
                        <span className={styles.icon}>
                            <ion-icon name="language"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "#poetryTranslator" && location.pathname === "/" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                <li
                    className={`${styles.list} ${activeItem === "#words" && location.hash === "#words" ? styles.active : ""}`}
                    onClick={() => handleItemClick("#words")}
                >
                    <a href="#words">
                        <span className={styles.icon}>
                            <ion-icon name="reader"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "#words" && location.hash === "#words" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                <li
                    className={`${styles.list} ${activeItem === "#circle" && location.hash === "#circle" ? styles.active : ""}`}
                    onClick={() => handleItemClick("#circle")}
                >
                    <a href="#circle">
                        <span className={styles.icon}>
                            <ion-icon name="ellipse"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "#circle" && location.hash === "#circle" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                {/*<div className={styles.indicator}></div>*/}
            </ul>
        </nav>
    );
}

export default NavbarGifts;