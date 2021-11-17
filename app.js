const form = document.getElementById('dino-compare');
const dinoGrid = document.getElementById('grid');
const submitBtn = document.getElementById('btn');


    // Animal Factory Function
    function Animal(species, weight, height, fact) {
        this.name = species;
        this.weight = weight;
        this.height = height;
        this.fact = fact;
        this.image = `images/${species.toLowerCase()}.png`;
    }

    // Create Dino Constructor

    function Dino(species, weight, height, diet, where, when, fact) {
        Animal.call(this, species, weight, height, fact);
        // this.name = species;
        // this.weight = weight;
        // this.height = height;
        this.diet = diet;
        this.location = where;
        this.timePeriod = when;
        // this.fact = fact;
        // this.image = `images/${species.toLowerCase()}.png`;
    }




    // Create Dino Objects

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
            dinosaur.fact,
            dinosaur.image)
        ));


    // Create Human Object

    function Human(name, weight, feet, inches, diet) {
        Animal.call(this, 'human', weight);
        this.height = (feet * 12) + inches;
        this.diet = diet;
    }



    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

    
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic



submitBtn.addEventListener('click', () => {
    form.style.display = 'none';
    grid.style.display = 'flex';
});
