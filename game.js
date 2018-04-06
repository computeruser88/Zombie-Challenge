var inquirer = require("inquirer");

var playerTurn = {
    type: "list",
    name: "numberGuessed",
    choices: ["1", "2", "3", "4", "5"],
    message: "Try to stay alive! Guess a number 1-5 (use arrow keys):"
}
var playerHealth = 70;
var round = 1;
var zombieHealth = 10;
var killCount = 0;
var zombieRandomNumber;

function main() {
    console.log("\nZombie Challenge");
    console.log("----------------\n");
    zombieRandomNumber = Math.floor(Math.random() * 5) + 1;
    console.log("Round " + round + "\n");
    fight();
}
function fight() {
    console.log("It's your turn to fight!\n");
    inquirer.prompt(playerTurn).then(answers => {
        var playerAttackNumber = answers.numberGuessed;
        // console.log("player attack number " + playerAttackNumber);
        // console.log("zombie number: " + zombieRandomNumber);
        if (playerAttackNumber == zombieRandomNumber) {
            zombieHealth -= playerAttackNumber;
            console.log("You slashed the zombie with " + zombieRandomNumber + " damage.\n");
        }
        if (zombieHealth > 0) {
            var zombieAttackNumber = Math.floor(Math.random() * 3) + 1;
            console.log("Oh no! The zombie slashed you with " + zombieAttackNumber + " damage.\n");
            playerHealth -= zombieAttackNumber;
            console.log("You have " + playerHealth + " health left. The zombie has "+ zombieHealth + " health left.\n");
            if (playerHealth <= 0) {
                console.log("Game over. You are dead.\n");
                console.log("You managed to kill " + killCount + " zombies.\n");
                return true;
            } else {
                fight();
            }
        } else {
            console.log("You killed the zombie! Congrats!\n");
            console.log("You have " + playerHealth + " health left.\n");
            console.log("Heads up! Another one is here! Get ready to attack!\n");
            round++;
            killCount++;
            zombieHealth = 10;
            zombieRandomNumber = Math.floor(Math.random() * 5) + 1;
            console.log("Round " + round + "\n");
            fight();
        }
    });
}

main();
