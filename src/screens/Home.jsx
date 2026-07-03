import React from "react";
import NavbarGifts from "./NavbarGifts.jsx";
import styles from "../styles/NavbarGifts.module.css";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PoetryTranslator from "./PoetryTranslator.jsx";
import Words from "./Words.jsx";
import Circle from "./Circle.jsx";

function Home (){
    return (
        <nav className={styles.main_container}>
            <NavbarGifts />
            <div className={styles.content}>
                <div>
                    <div>
                        <div id="poetryTranslator" className={styles.poetryTranslator}>
                            <PoetryTranslator />
                        </div>
                    </div>

                    <br />
                    <br />

                    <div>
                        <div id="words" className={styles.words}>
                            <Words />
                        </div>
                    </div>

                    <br />
                    <br />

                    <div>
                        <div id="circle" className={styles.circle}>
                            <Circle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Home;