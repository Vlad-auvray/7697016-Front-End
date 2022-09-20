import { ajoutListenersAvis } from "./avis.js"; 

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch ('pieces-autos.json');
const pieces = await reponse.json();



// Création des fiches produits en créant une boucle
for (let i = 0; i < pieces.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les fiches (D'abord "où"?)
    const sectionFiches = document.querySelector(".fiches");

    // Création d’une balise dédiée à une pièce automobile (Ensuite "quoi"?)
    const pieceElement = document.createElement("artcile");

    //Créer l'élément
    const imageElement = document.createElement("img");
    //Aller chercher l'indice [i] pour ajouter l'image
    imageElement.src = pieces[i].image;
    //rattacher l'image à la nouvelle balise
    pieceElement.appendChild(imageElement);

    //Répététition pour tous les autres éléments du json 
    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;
    pieceElement.appendChild(nomElement);
    
   
    const prixElement = document.createElement("p");
    prixElement.innerText = "Prix : " + pieces[i].prix + " €"
    +" ("
    + (pieces[i].prix < 35 ? "€" : "€€€")
    + ")";
    pieceElement.appendChild(prixElement);


    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)"; 
    pieceElement.appendChild(categorieElement);


    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "(Pas de description pour le moment.)";
    pieceElement.appendChild(descriptionElement);


    const disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
    pieceElement.appendChild(disponibiliteElement);

    //Une fois que tout est récupéré, on rattache la nouvelle balise à la section
    sectionFiches.appendChild(pieceElement);

ajoutListenersAvis();
}



// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function() {
    const piecesReordonnees = Array.from(pieces);
    piecesReordonnees.sort(function (a,b) {
        return a.prix - b.prix;
    });
    console.log(piecesReordonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
   console.log(piecesFiltrees);
}); 




//Récupérer le nom des pièces
const noms = pieces.map(piece => piece.nom);

//En remontant la liste des éléments par la fin, si les éléments balayés ont un prix supérieur à 35 alors on les retire de la liste. 
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice (i, 1);
    }
}

// Ces pièces doivent apparaitre au sein d'une liste qu'on va créer

const abordablesElement = document.createElement("ul");

//On créée les li associés
for (let i = 0; i < noms.length; i++)
{
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordablesElement.appendChild(nomElement);
}

//La liste est ensuite raccrochée au parent pour être visible sur le document

document.querySelector(".abordables").appendChild(abordablesElement);






// Résumé des pièces DISPONIBLES; la première ne retiens que le NOM; la seconde ne retient que le PRIX
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

//On REMONTE la liste des pièces, jusqu'à la première; pour vérifier si oui ou non la pièce est disponible. On souhaite RETIRER le nom et le prix, des pièces NON DISPO. 
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
    }
}

// Ces pièces disponibles doivent apparaitre au sein d'une liste qu'on va créer

const disponiblesElement = document.createElement("ul");

//On créée les li associés, 
for (let i = 0; i < nomsDisponibles.length; i++)
{
    const nomElement = document.createElement("li");
    nomElement.innerText = nomsDisponibles[i] + " - " + prixDisponibles[i] + " €";
    disponiblesElement.appendChild(nomElement);
}

//Cette deuxième liste est ensuite raccrochée au parent pour être visible sur le document

document.querySelector(".disponibles").appendChild(disponiblesElement);



// Fonction pour récupérer le RANGE (curseur), le but est que l'affichage change selon la fourchette de prix souhaitée 
const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input",function() {
    const piecesFiltrees= pieces.filter(function (piece) {
        return piece.prix <= inputPrixMax.value;
});

//On efface l'écran et régénère la page avec les uniquement pièces filtrées
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});