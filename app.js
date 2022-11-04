/// Classes & Other Stuff

// The game will be programmed for, and played using 
// window.prompt to get input from the user 
// and buttons in the browser, 
// you can also use console.log and window.alert. 

//  Connect HTML to JS 

// Receive Prompts from user

// The aliens send a random number of ships to attack Earth. Think of a reasonable range and implement it.

// Scientists have developed a super targeting computer for your lasers. You now are asked which of the aliens you would like to hit with your lasers.
// Scientists have improved your ship's shields. They don't work that consistently, and only improve your hit points by a random number each time
// Scientists have put missiles on your ship. You only have a limited number of them, but they do a lot of damage. You can say before each battle if you want to use one of your missles.
// The aliens have gained emotions and now can attack more than one at a time.
// Evil alien scientists have created an alien mega-ship. This mega-ship contains a number of "weapon pods" that each have their own individual hit points. These "weapon-pods" ( objects ) must all be destroyed before you can begin doing damage to the main ship, which also has its own hit points.
let playerWins = 0
let playerLoses = 0

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

class Ship {
    constructor(name, hull, firepower, accuracy) {
      this.name = name;
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

class EarthShip extends Ship {
    constructor(name, hull, firepower, accuracy){
        super(name, hull, firepower, accuracy);
        this.allegiance = "Earth";
    }   
}

class AlienShip extends Ship {
    constructor(name, hull, firepower, accuracy){
        super(name);
        this.hull = this.#generateAlienShipHullValue()
        this.firepower = this.#generateAlienShipFirepowerValue()
        this.accuracy = this.#generateAlienShipAccuracyValue()
        this.allegiance = "Alien";
    }
    #generateAlienShipHullValue(){
        let hullValue = getRndInteger(3,6);
        return hullValue;
    }
    #generateAlienShipFirepowerValue(){
        let firepowerValue = getRndInteger(2,4);
        return firepowerValue;
    }
    #generateAlienShipAccuracyValue(){
        let accuracyValue = getRndInteger(6,8);
        accuracyValue*= 0.1
        accuracyValue = Number(accuracyValue.toFixed(1))
        return accuracyValue;
    }
}

class AlienFleet{
    constructor(factoryType) {
        this.factoryType = factoryType;
        this.fleetRoster = [];
      }
    deployFleet(numberOfShips=1, batchName="Alien Explorer ") {
        for(let i = 0; i <numberOfShips; i++ ){
            let name = `${batchName}` + `${i+1}`
            const newAlienShip = new AlienShip(name);
            this.fleetRoster.push(newAlienShip);
        }
    }
    printFleet() {
        for (let alienShip of this.fleetRoster) {
            console.log(alienShip);
        }
    }
}


const earthShip1 = new EarthShip("UssAssembly", 20,5,0.7) 

let message =''

const generateAlienFleet = (fleetType, squadronName, numberOfShips) => {
    enemyFleet = new AlienFleet(fleetType);
    enemyFleet.deployFleet(numberOfShips, `${squadronName}#`);
} 

const battleRound = (earthShip,alienShip) => {
    let playerRetreat = false;
    let message = `The battle has begun. The earth ship ${earthShip.name} has engaged the alien ship ${alienShip.name}.`
    updateDOM(earthShip, alienShip, message)
    console.log(message)
    //prompt("Will you engage the next enemy ship? Type Y for yes and N for no.", 'Y')
    while(alienShip.hull >= 1 && earthShip.hull >= 1 && playerRetreat == false){
        updateAndReturnMessage(`The earth ship ${earthShip.name} has fired on the alien ship ${alienShip.name}.`, 'color: green')
        alienShip.hull = alienShip.hull - earthShip.attack()
        updateEnemyDOM(alienShip)
        // setTimeout(2000, confirm("test"))
        if (alienShip.hull <= 0){
            playerWins++
            message = `The battle has ended. The earth ship ${earthShip.name} has defeated the alien ship ${alienShip.name}.`
            console.log('%c' + message,  'color: lawngreen')
            console.log('%c' + "Will you engage the next enemy ship? Type Y for yes and N for no.", 'color: orange')
            updateEnemyDOM(alienShip)
            //prompt("Will you engage the next enemy ship? Type Y for yes and N for no.", 'Y')
            // if (confirm("Will you engage the next enemy ship? Click OK for yes and Cancel for no.")){
            //     console.log("test")
            //     updateEnemyDOM(alienShip)
            //     updateResultsDOM("test")
            // }
        }
        else{
            playerLoses++
            console.log('%c' + `The alien ship ${alienShip.name} survived and retalitated against the earth ship ${earthShip.name}.`, 'color: red')
            earthShip.hull = earthShip.hull - alienShip.attack()
            updatePlayerDOM(earthShip)
            delay(1000)
            if(earthShip.hull <= 0){
                console.log('%c' + `The battle has ended. The the alien ship ${alienShip.name} has defeated the earth ship ${earthShip.name}.`, 'color: red')
            }
            return false
        }
    }
}

const fullMatch = (earthShip,alienShips) =>{
    for(let i = 0; i<alienShips.length;i++){
        let roundNumber = i+1
        console.log(`Round ${roundNumber} has begun.`)
        updateRoundAndGameInfo(roundNumber)
        battleRound(earthShip, alienShips[i])
        console.log(`Round ${roundNumber} has ended.`)
    }
}

/////////-----------DOM Stuff

///---Master DOM Update

const updateDOM = (earthShip, alienShip, message) =>{
    updateEnemyDOM(alienShip);
    updatePlayerDOM(earthShip);
    updateResultsDOM(message);
}
const updateEnemyDOM = (alienShip) =>{
    let enemyName = document.getElementById("enemyName");
    let enemyHull = document.getElementById("enemyHull");
    let enemyFirePower = document.getElementById("enemyFirePower");
    let enemyAccuracy = document.getElementById("enemyAccuracy");
        enemyName.innerHTML = alienShip.name
        enemyHull.innerHTML = `Hull: ${alienShip.hull}`;
        enemyFirePower.innerHTML = `Firepower: ${alienShip.firepower}`;
        enemyAccuracy.innerHTML = `Accruracy: ${alienShip.accuracy}`;
}
const updatePlayerDOM = (earthShip) =>{
    let playerName = document.getElementById("playerName");
    let playerHull = document.getElementById("playerHull");
    let playerFirePower = document.getElementById("playerFirePower");
    let playerAccuracy = document.getElementById("playerAccuracy");
        playerName.innerHTML = earthShip.name
        playerHull.innerHTML = `Hull: ${earthShip.hull}`;
        playerFirePower.innerHTML = `Firepower: ${earthShip.firepower}`;
        playerAccuracy.innerHTML = `Accruracy: ${earthShip.accuracy}`;
}
const updateResultsDOM = (message="Click Fight to Begin") =>{
    let results = document.getElementById("results");
        results.innerHTML = `${message}`;
}

const updateAndReturnMessage = (text, style) => {
    message = text;
    updateResultsDOM(message)
    console.log( '%c' +  message, style)
}

const updateRoundAndGameInfo = (roundNumber) => {
    let round = document.getElementById("round");
    round.innerHTML = `Round ${roundNumber}`
}
    



const fightButton = document.getElementById("fightButton")
    fightButton.onclick = function(){
        fullMatch(earthShip1, enemyFleet.fleetRoster);
    }



/////////------------Main Function(s)
const onPageLoad = () =>{
    typeOfShips = "Battleships"
    numberOfShips = getRndInteger(2,10)
    squadronName = "AlienMarineForceRecon"
    generateAlienFleet(typeOfShips, squadronName, numberOfShips);
    updateResultsDOM(`${numberOfShips} alien ${typeOfShips} from ${squadronName} have appeared!!`);
}


/////////------------Entry

onPageLoad();


////-----Modal

// let launchModal = (object) => {

//     // Declare Variables
//     var modal = document.getElementById("modal");
//     // Get a copy of the HTML wihin the script modal__template
//     var template = document.getElementById("modal__template").innerHTML;
      
//     // Add new object here to use as content template
//     var message = {
//       resuableModal: { "title" : "Reusable Vanilla JavaScript Modal", "content": "Reuse this modal as many times as you want. Simply add a new object to var message and call it with launchModal('nameOfMessage')" , "button1": "Close", "button2" : "Save"},
//       gettingStarted: { "title" : "Getting Started", "content": "Add the JavaScript, the skeleton CSS and the Pug/HTML to your project. Edit the objects inside message object to suit your needs. Call it with launchModal('nameOfMessage'). Add new Modals by editing the messageb object inside the launchModule function." , "button1": "Cancel" },
//       moreDetails: {"title" : "More Details", "content": "The buttons only appear if the correct property exists in the object. Button1 is always the close button. Button2 can be a link button, if the message object contains button2 and button2Link." },
//       aboutMe: {"title" : "About Me", "content": "I'm a 24 year old web developer from England. I'm moving to London in September and hope to get a job as a JavaScript developer.", "button2" : "Get in Touch", "button2Link" : "https://uk.linkedin.com/in/edd-yerburgh-74aa5768" }    
//     };
//     modal.classList.add("show");
//     (function() {
//       function removeLink() {
//         var temp = button2;
//         button2Link.parentNode.removeChild(button2Link);
//         objEl.getElementsByTagName("footer")[0].appendChild(temp);
//       }
//       var prevModal = document.getElementById("objEl");
//       if (prevModal) { prevModal.parentNode.removeChild(prevModal);; }
        
//       // Save message object as data for easy reference
//       var data = message[object];
    
//       // Create pseudo element and fill it with HTML include in script#modal__template
//       var objEl = document.createElement('div');
//       objEl.innerHTML = template;
//       objEl.setAttribute("id", "objEl");
    
//       // Use tag names to access elements because ID selector doesn't work on elements
//       // not yet in DOM
//       var button1 = objEl.getElementsByClassName("modal__button1")[0];
//       var button2 = objEl.getElementsByClassName("modal__button2")[0];
//       var button2Link = objEl.getElementsByClassName("modal__button2link")[0];
    
//       // Append content to title and main
//       objEl.getElementsByTagName("h2")[0].appendChild(document.createTextNode(data.title));
//       objEl.getElementsByTagName("main")[0].appendChild(document.createTextNode(data.content)); 
    
//       // If button1 is specified in data, add text, otherwise remove
//       if ( data.button1 ) {
//         button1.appendChild(document.createTextNode(data.button1)); 
//       } else {
//         button1.parentNode.removeChild(button1);; 
//       }
//       // If button2link is specified, add link to button 2. Otherwise remove a tag, but keep button2
//       if ( data.button2Link ){
//         button2Link.setAttribute("href", data.button2Link);
//       } else {
//         removeLink(); 
//       }
//       // If button2 is specified in data, add text, otherwise remove      
//       if ( data.button2 ) {
//         button2.appendChild(document.createTextNode(data.button2));
//       } else {
//         button2.parentNode.removeChild(button2);
//       }
//       // Add pseudo element to document
//       document.getElementById("modal__dialog").appendChild(objEl);
      
//     })();
    
//     // Closes modal when called
//     function closeModal() {
//       console.log("close");
//       modal.classList.remove("show");
//     }  
    
//     // Bind close event to close button and button1
//     var closeButtons = modal.getElementsByClassName("modal__close");
//     for ( var i = 0; i < closeButtons.length; i++ ) { closeButtons[i].onclick = closeModal; }
    
//     // Close modal if it is clicked. Does not fire if target is modal__dialog or child
//     var modalDialog = document.getElementById('modal__dialog');
  
//     //I'm using "click" but it works with any event
//     modal.addEventListener('click', function(event) {
//       var isClickInside = modalDialog.contains(event.target);
  
//       if (!isClickInside) {
//         //the click was outside the specifiedElement, do something
//         closeModal();
//       }
//     });
  
//   };
  
//   // Launch modal on page load
// launchModal("resuableModal");
  
//   // Launch modal when buttons are clicked
// document.getElementById("getting-started").addEventListener('click', function() { launchModal("gettingStarted"); });
// document.getElementById("more-details").addEventListener('click', function() { launchModal("moreDetails"); });
// document.getElementById("about-me").addEventListener('click', function() { launchModal("aboutMe"); });