// Choper les éléments
const formulaire    = document.querySelector('#formulaire');
const prix          = document.querySelector('#prix');
const instructions  = document.getElementById('instructions');
const button        = document.querySelector('#verify');
const divTitle      = document.querySelector('#title');
const errorMessage  = document.querySelector('#error');
let buttonTimer     = document.createElement('button');


// Génère un nombre aléatoire à chaques parties
let randomNumber = Math.round(Math.random() * 1001) // sort un nombre aléatoire entre 0 et 1 multiplié par 1001
// console.log(randomNumber);


// Déclaration des variables
let rounds = 0;
let timer  = 0;


// !Fonctions

const handleShowResult = function (event){
    event.preventDefault();
    const inputValue = prix.value;

    if (isNaN(inputValue) || inputValue == '') { // Si quand on valide l'input contient du texte ou est vide, alors on mets la bordure en rouge
        prix.style.border = '1px red solid';
    } else {
        prix.style.borderColor = 'silver';
        rounds++;
        verifNumber(inputValue, rounds);
    }
}


const verifNumber = (number) => {
    // Créer ton élément / Modifier ton élément (ex: ajouter du texte dedans) / Afficher ton élément
    let stock = document.createElement('div'); // stock => "<p></p>"
    
    // Pour chaques actions afficher si plus petit, plus grand ou gagné
    if (number < randomNumber) {
        addActions(number, ' : il faut grandir du kiki', 'plus');

    } else if (number > randomNumber) {
        addActions(number, ' : encore une trop grosse', 'moins');  

    } else {
        addActions(number, ' : TU ES UN DIEU DU S..', 'fini');
        
        gameOver();
    }

    prix.value = "";

}

const gameOver = () => {
    clearInterval(timerInterval);
    
    button.disabled = true;                                                    
    prix.disabled = true;

    if(rounds === 1) {
        alert("TU ES UN PUTAIINNNN DE DIEU DU S.. (OU PAS) \n Tu as trouvé le juste prix en " + rounds + " tour \n et en " + timer + " secondes\n XoXo")
    }  else {                                               
    alert("TU ES UN DIEU DU ... \n Tu as réussi à trouver le juste prix en " + rounds + " tours \n et en " + timer + " secondes\n XoXo");
    }
}


const addActions = (number, phrase, classlist) => {
    let stock = document.createElement('div');

    stock.textContent = 'Tour n°' + rounds + ' - Tu as misé ' + number + " " +  phrase;     // stock => "<p>" + number + "</p>"
    stock.classList.add(classlist);
    instructions.prepend(stock); 
}


const handleErrors = () => {

    if (isNaN(prix.value)) {
        // Afficher le message d'erreur si input n'est pas un nombre
        errorMessage.style.display = 'block';
    } else {
        // Cacher le message d'erreur
        errorMessage.style.display = 'none';
    }
}


const timerHandler = () => {
    timer++;
        
    buttonTimer.innerText = 'Temps écoulé : ' + timer + ' s.';
    buttonTimer.classList.add('btn', 'btn-secondary', 'timer', 'mt-4', 'shadow');

    divTitle.appendChild(buttonTimer)
}


// !Evènements
formulaire.addEventListener('submit', handleShowResult);
prix.addEventListener('keyup', handleErrors)

const timerInterval = setInterval(timerHandler, 1000);
timerInterval;