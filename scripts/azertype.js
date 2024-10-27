/* 
* Faire un chronomètre pour savoir combien de temps 
    user va mettre à taper correctement les 3 mots
* Déclencher le chronomètre quand user tape le premier mot de la partie (keydown, keypress, keyup)
* Si le score est égal à la taille du tableau, chronomètre s'arrête
    Sinon il continue
* Compter le nombre d'erreur
* Si user se trompe ou réussit : mot suivant
    Si user réussit : 1 pt
    Si user se trompe : O pt
*/
let chronometer = document.querySelector(".chronometer");
let wordsList = ["Cachalot", "Pétunia", "Serviette"];
let score = 0;
let tens = 00;
let seconds = 00;
let minute = 00;
const input = document.querySelector(".azertypeSection form input");

input.addEventListener("keydown", () => {
    console.log("input");
    // setInterval
    // clearInterval
});

/* Si < 9 : ajout de 0 devant
Inférieur à  : 
100 pour tens
60 pour les autres */
