import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Words.module.css";

function Words (){
    const [text, setText] = useState("");

    const generatedWords = () => {
        setText("Luna luna lunaaa");
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.words}>
                <div className={styles.generated_random}>Generador de palabras aleatorias</div>
                <textarea 
                    className={styles.generated_words}
                    value={text}
                />
                <button 
                    className={styles.generated_button} 
                    onClick={generatedWords}>Generar
                </button>
            </div>
        </div>
    );
}

export default Words;