
// Global Variables and Contstants

// variable to store human data after IIFE call
let human = {};

// Document layout variables
const form = document.getElementById('dino-compare');
const dinoGrid = document.getElementById('grid');

// submit button
const submitBtn = document.getElementById('btn');

// refresh button
const refreshBtn = document.getElementById('refresh-btn');


// Animal Constructor

function Animal(species, weight, height) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.image = `images/${species.toLowerCase()}.png`;
    
}


// Create Dino Constructor

function Dino(species, weight, height, diet, where, when, fact) {
    Animal.call(this, species, weight, height);
    this.diet = diet;
    this.location = where;
    this.timePeriod = when;
    this.facts = [fact];
    this.compareWeight = compareWeight;
    this.compareHeight = compareHeight;
    this.compareDiet = compareDiet;
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
    Animal.apply(this, [species = 'human', weight]);
    this.name = name;
    this.height = (parseInt(feet) * 12) + parseInt(inches);
    this.diet = diet;
    this.image = 'images/human.png';
}


// Use IIFE to get human data from form

function getHumanData() {
    return (function() { 
        const humanName = document.getElementById('name').value;
        const humanHeightInFeet = document.getElementById('feet').value;
        const humanHeightInInches = document.getElementById('inches').value;
        const humanWeight = parseInt(document.getElementById('weight').value);
        const diet = document.getElementById('diet')
        const humanDiet = diet.options[diet.selectedIndex].text.toLowerCase();
        human = new Human(humanName, 
                    humanWeight, 
                    humanHeightInFeet, 
                    humanHeightInInches, 
                    humanDiet);
        return human;
    })();
}   

    
// Compare Weight Function
function compareWeight(weight) {
    let fact = '';
    if (this.weight > weight) {
        fact = `I am heavier than you by ${this.weight - weight} pounds!`;
    } else if (this.weight < weight) {
        fact = `You are heavier than me by ${weight - this.weight} pounds!`;
    } else if (this.weight === weight) {
        fact = 'It looks like we are the same weight!';
    }
    this.facts.push(fact);
}


// Compare Height Function
function compareHeight(height) {
    let fact = '';
    if (this.height > height) {
        fact = `I am taller than you by ${this.height - height} inches!`;
    } else if (this.height < height) {
        fact = `You are taller than me by ${height - this.height} inches!`;
    } else if (this.height === height) {
        fact = 'It looks like we are the same height!';
    }
    this.facts.push(fact);
}

// Compare Diet Function
function compareDiet(diet) {
    let fact = '';
    if (this.diet === 'herbavor') {
        switch (diet) {
            case 'herbavor':
                fact = 'It looks like we are both vegetarian!';
                break;
            case 'omnivor':
                fact = 'It looks like you eat some meat while I only eat plants.'
                break;
            case 'carnivor':
                fact = 'You eat meat!!!? YUCK!';
                break;
            default:
                fact = `I'm not sure what you eat`;
                break;
        }
    } else if (this.diet === 'omnivor') {
        switch (diet) {
            case 'herbavor':
                fact = 'It looks like you only eat vegetables.';
                break;
            case 'omnivor':
                fact = 'It looks like ywe both eat plants and animals!'
                break;
            case 'carnivor':
                fact = 'You only eat meat? I eat plants too!';
                break;
            default:
                fact = `I'm not sure what you eat`;
                break;
        }
    } else if (this.diet = 'carnivor') {
        switch (diet) {
            case 'herbavor':
                fact = `You don't eat meat? I couldn't live without it!`;
                break;
            case 'omnivor':
                fact = `It looks like you eat some meat, I don't eat plants!`
                break;
            case 'carnivor':
                fact = 'MEAT EATERS REPRESENT!';
                break;
            default:
                fact = `I'm not sure what you eat`;
                break;
        }
    }
        
    
    this.facts.push(fact);
}

// Get Random Fact Function
function getRandomFact(facts) {    
    return facts[Math.floor(Math.random() * facts.length)];
}


// Generate Tiles for each Dino in Array

function createTiles(name, image, fact) {
    // create grid item to display info
    let gridItem = document.createElement('div');
    gridItem.className = 'grid-item';

    // add name of species to parent div
    let speciesName = document.createElement('h3');
    speciesName.innerText = name;
    gridItem.appendChild(speciesName);

    // add image to parent div
    let speciesImage = document.createElement('img');
    speciesImage.src = image;
    gridItem.appendChild(speciesImage);

    // add random fact to display
    let randomFact = document.createElement('p');
    randomFact.innerText = fact;
    gridItem.appendChild(randomFact);

    return gridItem;
}


// On button click, prepare and display infographic

submitBtn.addEventListener('click', () => {
    
    const human = getHumanData();
    // console.log(human);
    // console.log([human.name, human.weight, human.height, human.diet, human.image]);

    // Invoke compare functions on each instance of dinosaur
    dinosaurs.forEach(dinosaur => {
        dinosaur.compareWeight(human.weight),
        dinosaur.compareHeight(human.height),
        dinosaur.compareDiet(human.diet);
    });

    // Iterate through dinosaurs to populate the grid
    for (let i = 0; i < dinosaurs.length; i++) {
        let dinosaur = dinosaurs[i];
        let fact = getRandomFact(dinosaur.facts);
        // check to see if item is a bird
        if (dinosaur.species === 'Pigeon') {
            fact = 'All birds are living dinosaurs.';
        }
        
        dinoGrid.appendChild(createTiles(dinosaur.species, dinosaur.image, fact));

        // Set middle tile to human object.
        if (i === 3) {
            dinoGrid.appendChild(createTiles(human.name, human.image, fact="I'm a human!"));
        }
    }

    // Remove form from window
    form.style.display = 'none';

    // Display grid in window
    grid.style.display = 'flex';

    // Display refresh button
    refreshBtn.style.display = 'block';
});

// Refresh page and data event listener;

refreshBtn.addEventListener('click', () => {
    // remove grid and refresh button from window
    grid.style.display = 'none';
    refreshBtn.style.display = 'none';

    // delete grid items
    let gridChild = grid.lastElementChild;
    while (gridChild) {
        grid.removeChild(gridChild);
        gridChild = grid.lastElementChild;
    }

    // Show form on window
    form.style.display = 'block';

    // Reset form inputs
    document.getElementById('name').value = '';
    document.getElementById('feet').value = '';
    document.getElementById('inches').value = '';
    document.getElementById('weight').value = '';

    // Reset human to empty object
    human = {};

    // Set dinosaur facts array to fact from JSON data
    dinosaurs.forEach(dinosaur => {
        dinosaur.facts = [dinosaur.facts[0]];
    });
});
