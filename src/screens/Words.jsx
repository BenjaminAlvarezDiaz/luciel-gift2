import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Words.module.css";

function Words (){
    const [text, setText] = useState("");

    const generatedWords = () => {
        setText(generateWords(1000));
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.words}>
                <div className={styles.generated_random}>Generador de palabras aleatorias</div>
                <textarea 
                    className={styles.generated_words}
                    value={text}
                    disabled
                />
                <button 
                    className={styles.generated_button} 
                    onClick={generatedWords}>Generar
                </button>
            </div>
        </div>
    );
}

const START = [
    "Glor","Thor","Fliss","Krand","Drak",
    "Vel","Breg","Hyn","Xan","Zär",
    "Mör","Aur","Krü","Flor","Klam",
    "Blün","Quor","Rant","Gor","Thal",
    "Dry","Hel","Qür","Vax","Lan",
    "San","Quand","Plon","Grim","Helm"
];

const MIDDLE = [
    "an","or","en","ur","is","ar",
    "el","un","ath","ond","iss",
    "ënd","ör","ür","akk","all",
    "ir","ul","orë","ent"
];

const END = [
    "tar","dor","dis","ven","nar",
    "tor","mar","sor","dak","thor",
    "ndar","liss","rak","vyr","mël",
    "nya","thës","dorës","ntar","ndarok"
];

function generateWord(){

    let word="";

    word += START[Math.floor(Math.random()*START.length)];

    if(Math.random()<0.70){
        word += MIDDLE[Math.floor(Math.random()*MIDDLE.length)];
    }

    word += END[Math.floor(Math.random()*END.length)];

    return word;
}

function generateWords(amount){

    const words=[];

    for(let i=0;i<amount;i++){

        words.push(generateWord());

    }

    return words.join("\n");

}

export default Words;