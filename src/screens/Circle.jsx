import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Circle.module.css";

function Circle (){
    return (
        <div className={styles.main_container}>
            <div className="cuadrado para poner por dentro la animacion de la pelotita"></div>
        </div>
    );
}

export default Circle;