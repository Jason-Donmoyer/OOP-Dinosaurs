const form = document.getElementById('dino-compare');
const dinoGrid = document.getElementById('grid');
const submitBtn = document.getElementById('btn');


    // Animal Constructor
    function Animal(species, weight, height) {
        this.name = species;
        this.weight = weight;
        this.height = height;
        this.image = `images/${species.toLowerCase()}.png`;
        
    }

    // Create Dino Constructor

    function Dino(species, weight, height, diet, where, when, fact) {
        Animal.call(this, species, weight, height);
        // this.name = species;
        // this.weight = weight;
        // this.height = height;
        this.diet = diet;
        this.location = where;
        this.timePeriod = when;
        this.fact = fact;
        this.compareWeight = compareWeight;
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
        Animal.apply(this, [name, weight]);
        this.height = (parseInt(feet) * 12) + parseInt(inches);
        this.diet = diet;
        this.image = 'images/human.png';
    }

    // Human.prototype = Object.create(Animal.prototype);
    // Human.prototype.constructor = Human;



    // Use IIFE to get human data from form
    
    let human = {};
            

    function getHumanData() {
        return (function() { 
            const humanName = document.getElementById('name').value;
            const humanHeightInFeet = document.getElementById('feet').value;
            const humanHeightInInches = document.getElementById('inches').value;
            const humanWeight = parseInt(document.getElementById('weight').value);
            const diet = document.getElementById('diet')
            const humanDiet = diet.options[diet.selectedIndex].text;
            human = new Human(humanName, 
                        humanWeight, 
                        humanHeightInFeet, 
                        humanHeightInInches, 
                        humanDiet);
            return human;
        })();
    }   


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    compareWeight = function(weight) {
        let fact = '';
        if (this.weight > weight) {
            fact = `I am heavier than you by ${this.weight - weight} punds!`;
        } else if (this.weight < weight) {
            fact = `You are heavier than me by ${weight - this.weight} pounds!`;
        } else {
            fact = 'It looks like we are the same weight!';
        }
        return fact;
    }

    
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
    const human = getHumanData();
    console.log(human);
    console.log([human.name, human.weight, human.height, human.diet, human.image]);
    grid.style.display = 'flex';
});
