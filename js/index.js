/* Variables du quiz
============================================================*/

//Audio du quiz
let audio = {
    succes: new Audio('media/succes.mp3'),
    echec: new Audio('media/echec.mp3')
};

//Numéro de la question courante
let noQuestion = 0; 

//Nombre de réponses justes
let nombreReponsesJustes = 0;

//Variables pour le pointage
let pointage = document.querySelector(".points")

//Varibale pour le numéro de question
let nbQuestion = document.querySelector(".numero-question")

//Variables pour le temps de chaque question
let temps = document.querySelector(".temps");
let tempsQuestion = 15;
let intervalID = setInterval(afficherTemps, 1000);

//Zone d'affichage du quiz
let zoneQuiz = document.querySelector(".quiz");

//Section contenant une question du quiz
let sectionQuestion = document.querySelector("section");
let positionX = 100;

//Conteneurs des titres des questions et des choix de réponse
let titreQuestion = document.querySelector(".titre-question");
let lesChoixDeReponses = document.querySelector(".les-choix-de-reponse");

//Titre animé du quiz
let titreIntro = document.querySelector(".anim-titre-intro");

//Récupérer le main de l'intro
let leDegrade = document.querySelector("main.intro");
//Attribuer l'animation degrader-fond
leDegrade.style.animation = "degrader-fond 10s linear infinite";

//Récupérer la div pour l'animation du clip-path
let laDivClip = document.querySelector(".anim-interrogation");
//Attribuer l'animation anim-clip-path
laDivClip.style.animation = "anim-clip-path 5s ease-in infinite";

//Zone de fin du quiz
let zoneFin = document.querySelector(".fin");

//Bouton servant à recommencer le quiz
let btnRecommencer = document.querySelector('main.fin .btn-recommencer');

 
/* Évènement du quiz
============================================================*/

//Gérer la fin de l'animation d'intro
titreIntro.addEventListener("animationend", afficherConsignePourDebuterLeJeu);

// Gestion du bouton de redémarrage du quiz
btnRecommencer.addEventListener('click', recommencer);


/* Les fonctions
============================================================*/

/*Afficher les consignes pour débuter le jeu*/
function afficherConsignePourDebuterLeJeu(event) {

    //Si l'animation est terminée, on afficher la consigne pour commencer
    if (event.animationName == "couleur-animation") {
        //On affiche un message dans le footer
        let piedDePage = document.querySelector("footer");
        //Texte à afficher dans le footer
        piedDePage.innerHTML = "<h1>Cliquer pour commencer! &#127799;</h1>";
        //On met un écouteur sur la fenêtre pour enlever l'intro et commencer le quiz
        window.addEventListener("click", commencerLeQuiz);
    }
}

/*Enlever les éléments de l'intro et commencer le quiz*/
function commencerLeQuiz(event) {
    
    //Retirer le conteneur de l'intro
    document.querySelector("main.intro").remove();

    //Retirer l'écouteur qui gère le début du quiz
    window.removeEventListener("click", commencerLeQuiz);

    //On met le conteneur du quiz visible
    zoneQuiz.style.display = "flex";

    //Affiche la première question
    afficherQuestion();
    //Affiche le temps
    afficherTemps();
    //On ajouter le pointage et on lui attribut la classe points
    pointage.classList.add("points");
    //Texte afficher pour le pointage
    pointage.innerText = 'Points: ' + nombreReponsesJustes + '/' + lesQuestions.length;
    //On ajouter le numéro de question
    nbQuestion.classList.add("numero-question");
    //Texte afficher pour le numéro de la question
    nbQuestion.innerText = "Question: "+ (noQuestion+1) + '/' + lesQuestions.length;

    }       

/*Afficher la question courante*/
function afficherQuestion() {
    
    //Récupérer l'objet de la question en cours dans le tableau des questions
    let objetQuestion = lesQuestions[noQuestion];
    
    //Affecter le texte de la question
    titreQuestion.innerText = objetQuestion.titre;

    //Vider le conteneur des choix de réponses.
    lesChoixDeReponses.innerHTML = "";

    //Insérer les choix de réponses de la question
    let unChoix;
    for (let i = 0; i < objetQuestion.choix.length; i++) {
		//Création de la Div 
        unChoix = document.createElement("div");
        //On lui affecte la classe choix
        unChoix.classList.add("choix");
        //Valeur du choix de réponse
        unChoix.innerText = objetQuestion.choix[i];
        //On affecte dynamiquement l'index de chaque choix
        unChoix.indexChoix = i;
        //Écouteur pour vérifier la réponse choisie
        unChoix.addEventListener("mousedown", verifierReponse);
        //Affichage du choix dans le conteneur des choix
        lesChoixDeReponses.append(unChoix);
    }

    //Modifie la valeur x de la section pour son animation à l'arrivée
    positionX = 100;

    //Requête pour l'animation de la section
    requestAnimationFrame(animerSection);

    //Variables pour les images des question
    //On récupère la balise img
    let imageQuestion=document.querySelector("img");
    //On affecte la source de l'image en fonction du numéro de la question
    imageQuestion.src=lesQuestions[noQuestion].image;
    
}
/*Afficher le temps(chronomètre)/***********************************************************************/
/*J'ai laissé ma partie de code non fonctionnelle pour la gestion du temps, car je n'ai pas réussi à le faire et je voulais avoir votre avis.*/
/*Je voulais laisser 15 secondes par question et lorsque le temps est à zéro, l'explication s'affiche avec le bouton suivant*/
function afficherTemps() {
    //On lui affecte la classe temps
    temps.classList.add("temps");
    //tempsQuestion =20;
    tempsQuestion = tempsQuestion-1;
    temps.innerText = "Temps:" + tempsQuestion;
    if(tempsQuestion==0){
        //tempsQuestion = 15;
        //verifierReponse();
        //noQuestion ++;
    }
}

/* Animer l'arrivée de la section contenant la question*/
function animerSection() {
    //On décrémente la position de 1
    positionX -= 1;
    sectionQuestion.style.transform = `translateX(${positionX}vw)`;

    if (positionX > 0) {
        requestAnimationFrame(animerSection);
    }
}

/*Fonction pour vérifier la réponse*/
function verifierReponse(event) {
    
    lesChoixDeReponses.classList.toggle('desactiver');

    //Si la réponse est bonne
    if (event.target.indexChoix == lesQuestions[noQuestion].bonneReponse){
        //Affecte la class reponse-succes
        event.target.classList.add("reponse-succes")
        //Joue l'audio succes
        audio["succes"].play();
        //Incrémente le nombre de réponse juste
        nombreReponsesJustes ++ ;
        //affiche le nombre de points sur 10
        pointage.innerText = 'Points: ' + nombreReponsesJustes + '/' + lesQuestions.length;
    }
    //si la réponse est mauvaise
    else{
        //Affecte la class reponse-echec
        event.target.classList.add("reponse-echec")
        //Joue l'audio echec
        audio["echec"].play();
    }

    //Création de la div pour l'explication de la section
    let divExplication=document.createElement("div");
    //On lui affecte la classe de l'explication
    divExplication.classList.add("explication");
    //Insertion de la div sous la section des choix de réponse
    let laSection = document.querySelector("section:nth-child(3)");
    laSection.append(divExplication);
    //Insert le texte d'explication dans la div
    divExplication.innerText = lesQuestions[noQuestion].explication;
    /*event.target.addEventListener("animationend", gererProchaineQuestion);*/
  
        //création d'une div bouton le bouton "suivant"
        let boutonSuivant = document.createElement("div");
        //Affecte la classe à la div
        boutonSuivant.classList.add("btn-suivant");
        //Ajouter la div du bouton dans la div de l'explication
        divExplication.append(boutonSuivant);
        //Texte de la div du bouton
        boutonSuivant.innerHTML = "Suivant";

        //On met un écouteur sur la fenêtre pour enlever l'intro et commencer le quiz
        boutonSuivant.addEventListener("click", gererProchaineQuestion);
    
}

/* Fonction pour gérer l'affichage de la prochaine question*/
function gererProchaineQuestion(event) {

    // On réactive les click sur les choix de réponse
    lesChoixDeReponses.classList.toggle('desactiver');

    //Retire la div explication
    document.querySelector(".explication").remove();
    // On incrémente noQuestion pour la  prochaine question à afficher
    noQuestion++;
    //On incrémente le nbQuestion pour afficher le numéro de la question
    nbQuestion.classList.add("numero-question");
    nbQuestion.innerText = "Question: "+ (noQuestion+1) + '/' + lesQuestions.length;

    //S'il reste une question on l'affiche
    if (noQuestion < lesQuestions.length) {
        afficherQuestion();
    //Sinon, on affiche la fin du quiz
    } else {
        afficherFinQuiz();
    }
}

/*Fonction pour afficher l'interface de la fin du quiz*/
function afficherFinQuiz() {
    //Retirer la zone du quiz
    zoneQuiz.style.display = "none";

    //Création de la section pour le score
    let sectionResultat = document.createElement('section');
    //Affiche le score du joueur selon le nombre de réponses justes
    sectionResultat.innerText = "Vous avez obtenu " + nombreReponsesJustes + "points!"; 
    //Affecte la class résultat 
    sectionResultat.classList.add("resultat");

    //Remettre la zone de fin du quiz
    zoneFin.style.display = "flex"; 
    //Ajouter le bouton recommencer
    btnRecommencer.before(sectionResultat);

    //Le bouton rejouer apparait quand l'animation du résultat est terminée
    sectionResultat.addEventListener('animationend', afficherBtnRecommencer);

}

/* Fonction pour modifier l'opacité du bouton*/
function afficherBtnRecommencer() {
    btnRecommencer.style.opacity = "1";
}

/*Fonction pour recommencer le quiz*/
 function recommencer() {
    //On remet à 0 les variables
    noQuestion = 0;
    nombreReponsesJustes = 0;
    nbQuestion=1;
    temps=15;
    //Retire le conteneur résultat
    document.querySelector(".resultat").remove();
    //Remettre l'opacité du bouton à 0
    btnRecommencer.style.opacity = "0";
    //Réaffiche le conteneur de la zone du quiz
    zoneQuiz.style.display = "flex";
    //Retire la zone de fin du quiz
    zoneFin.style.display = "none";
    //Affiche la première question
    afficherQuestion();
}




/*///////////////////////////////////////////////////////////////////////
                        VÉRIFICATION DES DONNÉES SAUVEGARDÉES
///////////////////////////////////////////////////////////////////////*/
