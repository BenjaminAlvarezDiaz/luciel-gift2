import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/PoetryTranslator.module.css";

function PoetryTranslator (){
    return (
        <div className={styles.main_container}>
            <div className="column">
                <div className="row buttons español->okak"></div>
                <div className="row con texts areas español y okak"></div>
                <div className="boton para traducir"></div>
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

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function okakize(word) {
  const lower = word.toLowerCase();

  if (D[lower]) {
    return D[lower];
  }

  const x = lower
    .replaceAll("a", "ä")
    .replaceAll("e", "ë")
    .replaceAll("o", "ö")
    .replaceAll("u", "ü");

  if (x.length < 4) {
    return randomItem(ROOTS) + randomItem(SUFFIXES);
  }

  if (x.length < 7) {
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

export function translateToOkak(text) {
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
    .replace(/\s+\./g, ".")
    .replace(/\s+,/g, ",")
    .replace(/\s+;/g, ";")
    .replace(/\s+:/g, ":")
    .replace(/\s+!/g, "!")
    .replace(/\s+\?/g, "?");
}

export default PoetryTranslator;