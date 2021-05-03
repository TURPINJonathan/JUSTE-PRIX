const app = {

    // Génère un nombre aléatoire à chaques parties
    wtfItsSecret: Math.round(Math.random() * 1001),
    // Déclaration des variables
    rounds: 0,
    timer: 0,
    // Choper les éléments du JUSTE PRIX
    formContent: document.querySelector('.formContent'),
    inputNumber: document.querySelector('.inputNumber'),
    actionsList: document.querySelector('.actionsList'),
    checkNumber: document.querySelector('.checkNumber'),
    errorMessage: document.querySelector('.errorMessage'),
    buttonTimer: document.querySelector('#timer'),
    

    init: () => {

        app.formContent.addEventListener('submit', app.handleShowResult);
        app.inputNumber.addEventListener('keyup', app.handleErrors);

        const timerInterval = setInterval(app.timerHandler, 1000);
        app.timerInterval;
    },

    handleShowResult:  (event) => {
        event.preventDefault();
        const inputValue = app.inputNumber.value;
        console.log(inputValue)

        if (isNaN(inputValue) || inputValue == '') { // Si quand on valide l'input contient du texte ou est vide, alors on mets la bordure en rouge
            app.inputNumber.style.border = '1px red solid';
        } else {
            app.inputNumber.style.borderColor = 'silver';
            app.rounds++;
            app.verifNumber(inputValue, app.rounds);
        }
    },

    verifNumber: (number) => {
        // Créer ton élément / Modifier ton élément (ex: ajouter du texte dedans) / Afficher ton élément
        let stock = document.createElement('div'); // stock => "<p></p>"
        
        // Pour chaques actions afficher si plus petit, plus grand ou gagné
        if (number < app.wtfItsSecret) {
            app.addActions(number, ' : vise plus haut', 'moins');
            
        } else if (number > app.wtfItsSecret) {
            app.addActions(number, ' : un peu plus bas !', 'plus');  

        } else {
            app.gameOver();
        }

        app.inputNumber.value = "";
    },

    gameOver: () => {
        clearInterval(timerInterval);
        
        app.checkNumber.disabled = true;                                                    
        app.inputNumber.disabled = true;

        if(rounds === 1) {
            alert("C'EST EXEPTIONNEL ! \n Tu as trouvé le juste prix en seulement 1 tour ! \n Aurais-tu craqué le code ?! \n XoXo")
        
        }  else {                                               
        alert("BRAVO L'ARTISTE ! \n Tu as réussi à trouver le juste prix en " + app.rounds + " tours \n et en " + app.timer + " secondes\n XoXo");
        }
    },


    addActions: (number, phrase, classlist) => {
        app.actionsList.style.display = 'block';
        let action = document.createElement('div');

        action.textContent = 'Tour n°' + app.rounds + ' - Tu as misé ' + number + " " +  phrase;     // stock => "<p>" + number + "</p>"
        action.classList.add(classlist);
        app.actionsList.prepend(action); 
    },


    handleErrors: () => {

        if (isNaN(app.inputNumber.value)) {
            // Afficher le message d'erreur si input n'est pas un nombre
            app.errorMessage.style.visibility = 'visible';
        } else {
            // Cacher le message d'erreur
            app.errorMessage.style.visibility = 'hidden';
        }
    },


    timerHandler: () => {
        if(app.rounds > 0) {
            app.timer++;
            app.buttonTimer.innerText =  app.timer;
            app.buttonTimer.style.visibility = "visible";
        }
    }

}


document.addEventListener('DOMContentLoaded', app.init);