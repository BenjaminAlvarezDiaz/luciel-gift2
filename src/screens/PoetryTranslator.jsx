import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/PoetryTranslator.module.css";

function PoetryTranslator (){
	const [textareaText, setTextareaText] = useState('');
	const [textareaResult, setTextareaResult] = useState('');

	const translated = () => {
		const result = translateToOkak(textareaText);
		setTextareaResult(result);
	};

    return (
        <div className={styles.main_container}>
            <div className={styles.translator}>
                <div className={styles.spanish_to_okak}>
					<div className={styles.translator_languages}>Spanish</div>
                  	<div><ion-icon name="arrow-forward"></ion-icon></div>
                  	<div className={styles.translator_languages}>Okak</div>
                </div>
                <div className={styles.translator_textareas}>
                  	<textarea 
						id="translated_text" 
						className={`${styles.textarea} ${styles.translator_text}`} 
						value={textareaText}
						onChange={(e) => setTextareaText(e.target.value)}
					/>
                  	<textarea 
						id="translator_result" 
						className={`${styles.textarea} ${styles.translator_result}`} 
						disabled  
						value={textareaResult}
					/>
                </div>
                <button 
					id="translator_button" 
					onClick={translated}
					className={styles.translator_button}>
						Traducir
				</button>
            </div>
        </div>
    );
}

const D = {
	yo: "mël",
  	mi: "mël",
  	mío: "mël",
  	mis: "mël",

  	tú: "sär",
  	tu: "sär",
  	tus: "sär",

  	él: "hynya",
  	ella: "hynya",

  	alma: "öntar",
  	vida: "änfal",
  	fuego: "zärvis",
  	luz: "glorblüntar",
  	pecado: "qürdis",

  	noche: "mördis",
  	día: "helvar",
  	estrella: "thorën",
  	mar: "flendor",
  	viento: "krandor",
  	corazón: "brelthor",
  	amor: "glorven",
  	muerte: "drakmör",
  	sueño: "velthor",
  	cielo: "aurëndor",
  	tierra: "kründor",

  	ser: "gënd",
  	estar: "gënd",
  	es: "gënd",
  	era: "gëndy",
  	fue: "gëndy",

  	amar: "glorven",
  	amo: "glorven",
  	ama: "glorven",

  	ver: "thalor",
  	veo: "thalor",
  	ve: "thalor",

  	buscar: "endarok",
  	busco: "endarok",

  	caminar: "flürven",
  	camino: "flürven",

  	hablar: "breggloss",
  	hablo: "breggloss",

  	y: "ven",
  	de: "ar",
  	en: "ven",
  	con: "hyr",
  	para: "tor",
  	sobre: "ar",
};	

const ROOTS = [
	"glor",
	"thor",
	"fliss",
	"krand",
	"drak",
	"vel",
	"breg",
	"hyn",
	"xan",
	"zär",
	"mör",
	"aur",
	"krü",
	"flor",
	"klam",
	"blün",
	"quor",
	"rant",
	"gor",
	"thal",
	"dry",
	"hel",
	"qür",
	"vax",
];

const SHORT_ROOTS = [
	"gl",
	"dr",
	"kr",
	"th",
	"vr",
	"ny",
	"zä",
	"mö",
	"bl",
	"qu",
	"hy",
	"fl",
	"br",
	"kl",
	"xa"
];

const SUFFIXES = [
	"tar",
	"dor",
	"dis",
	"ven",
	"nar",
	"tor",
	"mar",
	"sor",
	"dak",
	"thor",
	"ndar",
	"liss",
	"rak",
	"vyr",
	"mël",
	"nya",
];

const SHORT_SUFFIXES = [
	"r",
	"n",
	"s",
	"l",
	"th",
	"ar",
	"or",
	"en",
	"ël"
];

function randomItem(arr) {
  	return arr[Math.floor(Math.random() * arr.length)];
}

function okakize(word) {
	const lower = word.toLowerCase();

	if (D[lower]) {
		return preserveCase(word, D[lower]);
	}

	const x = lower
		.replaceAll("a", "ä")
		.replaceAll("e", "ë")
		.replaceAll("o", "ö")
		.replaceAll("u", "ü");

		

	if (x.length <= 2) {
		return (
			randomItem(SHORT_ROOTS) +
			randomItem(["a", "e", "ë", "o"])
		);
	}

	if (x.length <= 5) {
		return (
			x.charAt(0).toUpperCase() +
			x.slice(1) +
			randomItem(SHORT_SUFFIXES)
		);
	}

	if (x.length <= 6) {
		return (
			x.charAt(0).toUpperCase() +
			x.slice(1) +
			randomItem(SUFFIXES)
		);
	}

	if (x.length >= 7) {
		return (
		x.charAt(0).toUpperCase() +
		x.slice(1) +
		randomItem(SUFFIXES)
		);
	}

	const root1 = randomItem(ROOTS);
	const root2 = randomItem(ROOTS);

	return (
		root1.charAt(0).toUpperCase() +
		root1.slice(1) +
		root2 +
		randomItem(SUFFIXES)
	);
}

function preserveCase(original, translated) {
	if (original[0] === original[0].toUpperCase()) {
		return translated.charAt(0).toUpperCase() + translated.slice(1);
	}

	return translated.charAt(0).toLowerCase() + translated.slice(1);
}

function translateToOkak(text) {
	const parts =
		text.match(
		/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+|[^\w\s]|\n/g
		) || [];

	return parts
	.map((part) => {
	if (
		/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/.test(part)
	) {
		return okakize(part);
	}

	return part;
	})
	.join(" ")
	.replace(/¿\s+/g, "¿")
  	.replace(/¡\s+/g, "¡")
	.replace(/\s+\./g, ".")
	.replace(/\s+,/g, ",")
	.replace(/\s+;/g, ";")
	.replace(/\s+:/g, ":")
	.replace(/\s+!/g, "!")
	.replace(/\s+\?/g, "?");
}

export default PoetryTranslator;