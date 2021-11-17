const form = document.getElementById('dino-compare');
const dinoGrid = document.getElementById('grid');
const submitBtn = document.getElementById('btn');

    // Create Dino Constructor

    function Dino(species, weight, height, diet, where, when, fact) {
        this.name = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.location = where;
        this.timePeriod = when;
        this.fact = fact;
    }




    // Create Dino Objects


    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

    // Call to fetch dinosaur data from dino.json and create array of Dino objects
    let dinosaurs = [];
    fetch('dino.json')
        .then(res => res.json())
        .then(json => dinosaurs = json.Dinos.map(dinosaur => new Dino(
            dinosaur.species, 
            dinosaur.weight, 
            dinosaur.height, 
            dinosaur.diet, 
            dinosaur.where, 
            dinosaur.when, 
            dinosaur.fact)
        ));
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic



submitBtn.addEventListener('click', () => {
    form.style.display = 'none';
    grid.style.display = 'flex';
});
