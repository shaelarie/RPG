			var player = '';
			var boss = '';
			document.getElementById('final').style.display = 'none';
			document.getElementById('transition').style.display = 'none';
			setVisibility('', 'none', 'none');

			function startGame() {
			    document.getElementById('final').style.display = 'none';
			    setVisibility('none', '', 'none');
			    displayInstructions();
			    boss = new Player(1, 1);
			}

			function setVisibility(one, two, three) {
			    document.getElementById('startNewGame').style.display = one;
			    document.getElementById('opening').style.display = two;
			    document.getElementById('inGame').style.display = three;
			}

			function game() {

			}

			function Player(attack, defense) {
			    this.attack = attack;
			    this.defense = defense;
			    this.health = 100;
			    this.totalHealth = 100;
			    this.score = 0;
			    this.level = 1;
			}
			/*
						function setAttackAndDefense(character, args){
							character.attack = args[0];
							character.defense = args[1];
						}*/
			Player.prototype.resetHealth = function() {
			    this.health = this.totalHealth;
			    this.health = this.health * 1.05;
			}

			function alien() {
			    setVisibility('none', 'none', '');
			    player = new Player(6, 2);
			    player.health = 100;
			}

			function ninja() {
			    setVisibility('none', 'none', '');
			    player = new Player(2, 6);
			    player.health = 100;
			}

			function cowboy() {
			    setVisibility('none', 'none', '');
			    player = new Player(3, 3);
			    player.health = 100;
			}

			function displayInstructions() {
			    setOutput("game description and rules", "headLiner");
			}
			/*function myFunction() {
    		var x = document.getElementById("myText").value;
    		document.getElementById("demo").innerHTML = x;
			}
*/
			function getInput() {
			    return document.getElementById("myText").value;
			}

			function endGame() {
			    setVisibility('none', 'none', 'none');
			    document.getElementById('final').style.display = '';
			    setOutput("You were defeated by boss # " + boss.level + " - Your final gold total was " + player.score);
			}

			function setOutput(output) {
			    document.getElementById("display").innerHTML = output;
			}

			function playerTurn(attack, defend) {
			    boss.health -= attack;
			}

			function bossTurn(attack, playerDefense) {
			    player.health -= Math.abs(attack - playerDefense);
			}

			function delay(ms) {
			    var cur_d = new Date();
			    var cur_ticks = cur_d.getTime();
			    var ms_passed = 0;
			    while (ms_passed < ms) {
			        var d = new Date(); // Possible memory leak?
			        var ticks = d.getTime();
			        ms_passed = ticks - cur_ticks;
			        // d = null;  // Prevent memory leak?
			    }
			}

			function playSound() {
			    var sound = new Audio("http://themushroomkingdom.net/sounds/wav/smb/smb_stage_clear.wav");
			    sound.play();
			}

			function nextLevel() {
			    delay(2000);
			    boss.resetHealth();
			    player.health = 100;
			    boss.attack += .05;
			    boss.totalHealth = boss.health;
			    boss.level++;
			    document.getElementById('transition').style.display = 'none';
			    setVisibility('none', 'none', '');

			}

			function printGold(goldTotal) {
			    return ("Your gold total is " + goldTotal);
			}

			function showStats() {
			    playSound();
			    player.score = player.score + 10 * boss.level;
			    setVisibility('none', 'none', 'none');
			    document.getElementById('transition').style.display = '';
			    setOutput(printGold.call(player, player.score));
			}

			function primaryAttack() {
			    if (isAlive(player) && isAlive(boss)) {
			        playerTurn(getRandomArbitrary(1, player.attack), 0);
			        bossTurn(getRandomArbitrary(1, boss.attack), player.defense);
			    } else if (isAlive(player) && !isAlive(boss)) {
			        showStats();
			        return;
			    } else {
			        endGame();
			        return;
			    }
			    setOutput("Player health: " + Math.round(player.health) + " - Boss " + boss.level + " health: " + Math.round(boss.health));
			}

			function secondaryAttack() {
			    if (isAlive(player) && isAlive(boss)) {
			        player.health -= 2;
			        playerTurn(getRandomArbitrary(1, player.attack * 2), 0);
			        bossTurn(getRandomArbitrary(1, boss.attack), player.defense);
			    } else if (isAlive(player) && !isAlive(boss)) {
			        showStats();
			        return;
			    } else {
			        endGame();
			        return;
			    }
			    setOutput("Player health: " + Math.round(player.health) + " - Boss " + boss.level + " health: " + Math.round(boss.health));
			}

			function getRandomArbitrary(min, max) {
			    return Math.random() * (max - min) + min;
			}

			function defend() {
			    if (isAlive(player) && isAlive(boss)) {
			        player.health += getRandomArbitrary(0, 2);
			        playerTurn(getRandomArbitrary(0, 1), 0);
			        bossTurn(getRandomArbitrary(0, boss.attack - player.defense), 0);
			    } else if (isAlive(player) && !isAlive(boss)) {
			        showStats();
			        return;
			    } else {
			        endGame();
			        return;
			    }
			    setOutput("Player health: " + Math.round(player.health) + " - Boss " + boss.level + " health: " + Math.round(boss.health));
			}

			function isAlive(character) {

			    if (character.health > 0) {
			        return true;
			    } else {
			        return false;
			    }
			}