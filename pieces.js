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