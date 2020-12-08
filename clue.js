// https://docs.google.com/document/d/189rXWgWgLhi-c3T9G9vzimB52wAfgEx51TpDRj_0fg0/edit

const people = ["Miss Scarlett", "Professor Plum", "Mrs. Peacock", "Mr. Green", "Colonel Mustard"];
const rooms = ["Kitchen", "Dining Room", "Lounge", "Library", "Cellar"];
const weapons = ["Candlestick", "Knife", "Revolver", "Rope", "Lead pipe"];
const possiblePeople = [...people];
const possibleRooms = [...rooms];
const possibleWeapons = [...weapons];

let answer = {};
let incorrectGuess = null;

const getRandomCards = () => {
    const person = people[Math.floor(Math.random() * 5)];
    const room = rooms[Math.floor(Math.random() * 5)];
    const weapon = weapons[Math.floor(Math.random() * 5)];
    
    return {
        person,
        room,
        weapon
    }
}

const getAnswers = () => {   
    answer = getRandomCards();
}

const getGuess = ( guesses = { person: "", room: "", weapon: "" }) => {
    let person = guesses.person;
    let room = guesses.room;
    let weapon = guesses.weapon;
    
    if(incorrectGuess) {
        if(incorrectGuess === "person") {
            const length = possiblePeople.length;
            person = possiblePeople[Math.floor(Math.random() * length)]
        } else if(incorrectGuess === "room") {
            const length = possibleRooms.length;
            room = possibleRooms[Math.floor(Math.random() * length)]
        } else {
            const length = possibleWeapons.length;
            weapon = possibleWeapons[Math.floor(Math.random() * length)]
        }
    } else {
        person = people[Math.floor(Math.random() * 5)];
        room = rooms[Math.floor(Math.random() * 5)];
        weapon = weapons[Math.floor(Math.random() * 5)];
    }
    
    return {
        person,
        room,
        weapon
    }
    
    return getRandomCards();
}

const getIncorrectGuess = ( guess = {} ) => {
    let incorrectGuesses = [];
    
    for(let key in guess) {
        if(guess[key] !== answer[key]) {
            incorrectGuesses.push(key);
        }
    }
    
    return incorrectGuesses.length ? incorrectGuesses[Math.floor(Math.random() * incorrectGuesses.length)] : "";
}

const play = () => {
    getAnswers();
    let isGuessCorrect = false;
    let guessesMade = 0;
    let guesses = {};
    
    while(!isGuessCorrect) {
        guessesMade++;
        console.log("Turn " + guessesMade);
        guesses = getGuess(guesses);
        const { person, room, weapon } = guesses;
        console.log(`Guess: ${person} in the ${room} with the ${weapon}`);
        incorrectGuess = getIncorrectGuess(guesses);
        
        if(!incorrectGuess) {
            isGuessCorrect = true;
            break;
        } else {
            if(incorrectGuess === "person") {
                const personIndex = possiblePeople.indexOf(person);
                possiblePeople.splice(personIndex, 1);
            } else if(incorrectGuess === "room") {
                const roomIndex = possibleRooms.indexOf(room);
                possibleRooms.splice(roomIndex, 1);
            } else {
                const weaponIndex = possibleWeapons.indexOf(weapon);
                possibleWeapons.splice(weaponIndex, 1);
            }
        }
        
        console.log("An incorrect guess was made. Incorrect: " + incorrectGuess);
    }
    
    console.log("It took the player " + guessesMade + " turns to win.");
}

play();