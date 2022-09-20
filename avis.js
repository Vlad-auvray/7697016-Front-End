// Fonction qui enregistre des event listener sur les boutons de la page.
// Elle sera appelée après chaque génération ou mise à jour de la page
// car pour la mettre à jour, on supprime l'intégralité des éléments DOM avec innerHTML = "".
// Il faut donc ré-enregistrer les listener sur les nouveaux boutons.
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");
    for (let i = 0; i> piecesElements.length; i++ ) {
    piecesElements[i].addEventListener("click", function(event){
//On récupère la valeur de l'attribut data-id="XX", sert à appeler la fonction fetch juste après
        const id = event.target.dataset.id;
        //On utilise la fonction fetch pour envoyer une requête à l'API
        fetch("http://localhost:8081/pieces/" + id + "/avis");

    });
}

}