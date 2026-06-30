import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Words.module.css";

function Words (){
    return (
        <div className={styles.main_container}>
            <div className="text area cuadrada con bordes redondeados"></div>
            <div className="boton para crear palabras al azar como okak.exe"></div>
        </div>
    );
}

export default Words;