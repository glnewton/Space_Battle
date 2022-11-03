/// Classes & Other Stuff

// The game will be programmed for, and played using 
// window.prompt to get input from the user 
// and buttons in the browser, 
// you can also use console.log and window.alert. 
//This is your first mini-project. You should not style the page until you first get all the functionality down.




// Create Sub classes

// Implement factory

class Ship {
    constructor(hull, firepower, accuracy) {
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
      this.allegiance = null;
    }
    attack(){
        if (Math.random() < this.accuracy) {
            console.log(`Successful hit with ${this.firepower}`)
            return this.firepower
        }
        else{
            console.log(`The attack missed!`)
            return 0;
        }
    }
  }

let alienFleetArray = []
  
const earthShipUssAssembly = new Ship(20,5,0.7)  



////// Helper Fuctions

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }




const generateAlienFleet = () => {
    
    const generateAlienShipHullValue = () => {
        let hullValue = getRndInteger(3,6);
        return hullValue;
    }
    const generateAlienShipFirepowerValue = () => {
        let firepowerValue = getRndInteger(2,4);
        return firepowerValue;
    }
    const generateAlienShipAccuracyValue = () => {
        let accuracyValue = getRndInteger(6,8);
        accuracyValue*= 0.1
        accuracyValue = Number(accuracyValue.toFixed(1))
        return accuracyValue;
    }

    const alienShip1 = new Ship(generateAlienShipHullValue(), generateAlienShipFirepowerValue(), generateAlienShipAccuracyValue())  
    const alienShip2 = new Ship(generateAlienShipHullValue(), generateAlienShipFirepowerValue(), generateAlienShipAccuracyValue()) 
    const alienShip3 = new Ship(generateAlienShipHullValue(), generateAlienShipFirepowerValue(), generateAlienShipAccuracyValue()) 
    const alienShip4 = new Ship(generateAlienShipHullValue(), generateAlienShipFirepowerValue(), generateAlienShipAccuracyValue()) 
    const alienShip5 = new Ship(generateAlienShipHullValue(), generateAlienShipFirepowerValue(), generateAlienShipAccuracyValue()) 
    const alienShip6 = new Ship(generateAlienShipHullValue(), generateAlienShipFirepowerValue(), generateAlienShipAccuracyValue())

    alienFleetArray.push(alienShip1)
    alienFleetArray.push(alienShip2)
    alienFleetArray.push(alienShip3)
    alienFleetArray.push(alienShip4)
    alienFleetArray.push(alienShip5)
    alienFleetArray.push(alienShip6)
} 

/////////------------Main Functions

generateAlienFleet();

const battleRound = (earthShip,alienShip) => {
    
    console.log(`The battle has begun. The earth ship ${earthShip} has engaged the alien ship ${alienShip}.`)
    console.log(earthShip)
    console.log(alienShip)
    
    while(alienShip.hull >= 1 && earthShip.hull >= 1){
        console.log( '%c' +  `The earth ship ${earthShip} has fired on the alien ship ${alienShip}.`, 'color: green')
        alienShip.hull = alienShip.hull - earthShip.attack()
        if (alienShip.hull <= 0){
            console.log(`The battle has ended. The earth ship ${earthShip} has defeated the alien ship ${alienShip}.`)
            console.log(`Do you retreat, or press forward?`)
            console.log(earthShip)
            return true
        }
        else{
            console.log(`The alien ship ${alienShip} survived and retalitated against the earth ship ${earthShip}.`)
            earthShip.hull = earthShip.hull - alienShip.attack()
            if(earthShip.hull <= 0){
                console.log(`The battle has ended. The the alien ship ${alienShip} has defeated the earth ship ${earthShip}.`)
            }
            console.log(earthShip)
            console.log(alienShip)
            return false
        }
    }
}

const fullMatch = (earthShip,alienShips) =>{
    for(let i = 0; i<alienShips.length;i++){
        console.log(`Round ${i+1} has begun.`)
        battleRound(earthShip, alienShips[i])
    }    
}



fullMatch(earthShipUssAssembly, alienFleetArray)

// earthShipUssAssembly

// alienShip1


// You attack the first alien ship
// If the ship survives, it attacks you
// If you survive, you attack the ship again
// If it survives, it attacks you again ... etc
// If you destroy the ship, you have the option to attack the next ship or to retreat
// If you retreat, the game is over, perhaps leaving the game open for further developments or options
// You win the game if you destroy all of the aliens
    //After you have destroyed a ship, you have the option to make a hasty retreat.
// You lose the game if you are destroyed


///////////////////////

// const generateAlienShipValueArray = () =>{
//     let alienShipValueArray = []
//     let hullValue = getRndInteger(3,6);
//     let firepowerValue = getRndInteger(2,4);
//     let accuracyValue = getRndInteger(.6,.8);
//     alienShipValueArray.push(hullValue)
//     alienShipValueArray.push(firepowerValue)
//     alienShipValueArray.push(accuracyValue)
//     return alienShipValueArray
// }