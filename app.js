			function changeColor() {
				var red = Math.round(Math.random() * 255 + 200);
				var green = Math.round(Math.random() * 255 + 200);
				var blue = Math.round(Math.random() * 255 + 200);

				var myColor = "rgb(" + red + ", " + green + ", " + blue + ")";
				document.body.style.backgroundColor = myColor;
			}
			window.setInterval(changeColor, 5000); //change every 5 seconds
			window.setInterval(mysteryButton, 600000); //show every 10 minutes

			var message = [];
			levelMessages();
			var player = '';
			var boss = '';
			initializeGame();


			function initializeGame(){
				document.getElementById('princess').style.display = 'none';
				document.getElementById('fun').style.display = 'none';
				document.getElementById('mystery').style.display = 'none';
				document.getElementById('exitButton').style.display = '';
				document.getElementById('final').style.display = 'none';
				document.getElementById('transition').style.display = 'none';
				setVisibility('', 'none', 'none');
			}
			function startGame() {
				initializeGame();
			    document.getElementById('final').style.display = 'none';
			    setVisibility('none', '', 'none');
			    boss = new Player(1, 1);
			    setOutput("Start new game!");
			}

			function setVisibility(one, two, three) {
			    document.getElementById('startNewGame').style.display = one;
			    document.getElementById('opening').style.display = two;
			    document.getElementById('inGame').style.display = three;
			}

			function Player(attack, defense, name) {
				this.name = name;
			    this.attack = attack;
			    this.defense = defense;
			    this.defendLeft = 2;
			    this.secondaryAttackLeft = 2;
			    this.secondaryAttackTotal = 2;
			    this.health = 100;
			    this.totalHealth = 100;
			    this.score = 0;
			    this.level = 1;
			}
			Player.prototype.resetHealth = function() {
			    this.health = this.totalHealth;
			    this.health = this.health * 1.05;
			}

			function alien() {
				document.getElementById('exitButton').style.display = '';
			    setVisibility('none', 'none', '');
			    player = new Player(10, 6, "Alien");
			    player.health = 100;
			    setOutput("Alien selected! GO!")
			}

			function ninja() {
				document.getElementById('exitButton').style.display = '';
			    setVisibility('none', 'none', '');
			    player = new Player(6, 10, "Ninja");
			    player.health = 100;
			    setOutput("Ninja selected! GO!")
			}

			function cowboy() {
				document.getElementById('exitButton').style.display = '';
			    setVisibility('none', 'none', '');
			    player = new Player(8, 8, "Cowboy");
			    player.health = 100;
			    setOutput("Cowboy selected! GO!")
			}

			function getInput() {
			    return document.getElementById("myText").value;
			}
			function alternateEnding(){
				setVisibility('none', 'none', 'none');
			    document.getElementById('transition').style.display = 'none';
			    document.getElementById('exitButton').style.display = 'none';
			    document.getElementById('final').style.display = '';
			    setOutput("You are a quitter!! - Your final gold total was " + player.score);
			}
			function endGame() {
			    setVisibility('none', 'none', 'none');
			    document.getElementById('transition').style.display = 'none';
			    document.getElementById('exitButton').style.display = 'none';
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

			function playSound(url) {
			    var sound = new Audio(url);
			    sound.play();
			}
			function addToSecondaryAttack(){
				if(boss.level % 2 == 0){
					player.secondaryAttackTotal ++;
				}
				player.secondaryAttackLeft = player.secondaryAttackTotal;
				player.defendLeft = player.secondaryAttackTotal;

			}
			function nextLevel() {

			    delay(2000);
			    addToSecondaryAttack();
			    boss.resetHealth();
			    player.health = 100;
			    boss.attack += .05;
			    boss.totalHealth = boss.health;
			    if(boss.level == 27){
			    	document.getElementById('princess').style.display = '';
			    }
			    boss.level++;
			    setOutput("Start Level " + boss.level);
			    document.getElementById('transition').style.display = 'none';
			    setVisibility('none', 'none', '');
			    
			}

			function printGold(goldTotal) {
				var winningLevel = 27;
				if (boss.level <= winningLevel){
			    	return (message[boss.level] + "\r\n" + "Your gold total is " + goldTotal);
				}
				else
				{
					return("Your gold total is " + goldTotal);
				}
			}
			function showStats() {
			    playSound("http://themushroomkingdom.net/sounds/wav/smb/smb_stage_clear.wav");
			    player.score = player.score + 10 * boss.level;
			    setVisibility('none', 'none', 'none');
			    document.getElementById('transition').style.display = '';
			    setOutput(printGold.call(player, player.score));
			}
			function primaryAttack() {
			    if (isAlive(player) && isAlive(boss)) {
			        playerTurn(getRandomArbitrary(1, player.attack * 4), 0);
			        bossTurn(getRandomArbitrary(1, boss.attack), player.defense);
			    } else if (isAlive(player) && !isAlive(boss)) {
			        showStats();
			        return;
			    } else {
			        endGame();
			        return;
			    }
			    setOutput("Your " + player.name + "'s health: " + Math.round(player.health) + " - Boss " + boss.level + " health: " + Math.round(boss.health));
			}

			function secondaryAttack() {
				if(player.secondaryAttackLeft > 0){
			    	if (isAlive(player) && isAlive(boss)) {
			    		player.secondaryAttackLeft --;
			        	player.health -= 1;
			        	playerTurn(getRandomArbitrary(1, player.attack * 6), 0);
			        	bossTurn(getRandomArbitrary(1, boss.attack), player.defense);
			    	} else if (isAlive(player) && !isAlive(boss)) {
			        	showStats();
			        return;
			    	} else {
			        	endGame();
			        	return;
			    	}
			    	setOutput("Your " + player.name + "'s health: " + Math.round(player.health) + " - Boss " + boss.level + " health: " + Math.round(boss.health));
			    }else{
			    	setOutput("You are out of secondary attacks!!")
			    }
			}
			function getRandomArbitrary(min, max) {
			    return Math.random() * (max - min) + min;
			}
			function defend() {
				if(player.defendLeft > 0){
			    	if (isAlive(player) && isAlive(boss)) {
			    		player.defendLeft --;
			        	player.health += getRandomArbitrary(1, 6);
			        	playerTurn(getRandomArbitrary(0, 1), 0);
			        	bossTurn(getRandomArbitrary(0, 4), 0);
			    	} else if (isAlive(player) && !isAlive(boss)) {
			        	showStats();
			        	return;
			    	} else {
			        	endGame();
			        	return;
			    	}
			    	setOutput("Your " + player.name + "'s health: " + Math.round(player.health) + " - Boss " + boss.level + " health: " + Math.round(boss.health));
				}else{
					setOutput("You are out of defends!!");
				}
			}
			function isAlive(character) {

			    if (character.health > 0) {
			        return true;
			    } else {
			        return false;
			    }
			}
			function mysteryButton(){
				if(document.getElementById('mystery').style.display == 'none'){
					document.getElementById('mystery').style.display = '';
				}else{
					document.getElementById('mystery').style.display = 'none';
				}
			}
			function funny(){
				setOutput("");
				setVisibility('none','none','none');
				document.getElementById('transition').style.display = 'none';
			    document.getElementById('exitButton').style.display = 'none';
			    document.getElementById('final').style.display = 'none';
			    document.getElementById('fun').style.display = '';
			    playSound("http://www.soundjay.com/human/man-giggling-01.wav");

			}
			function levelMessages(){
				message[1] = "Good work! You slayed Bayok, a baby Troll, and are moving on. It's only going to get more difficult. Be careful!";

				message[2] = "You vanquished the one-eyed giant on your way to the next level. Keep your head on a swivel!";

				message[3] = "Keep up the good work! After melting an evil witch, you may proceed to the next level. Remember you only have limited use of your secondary weapon and defense for each level.";

				message[4] = "Good riddance, Nuk-Nuk the Dragon! Keep moving forward. Can you hear the Princess calling?";

				message[5] = "Wow! We didn't think you'd get past the Saarlac. Stay focused.";

				message[6] = "Are you getting tired? Don't waver in your resolve to be a hero.";

				message[7] = "Great job! Tungortok just met the same fate as his younger brother Bayok.";

				message[8] = "Did you really just conquer Amaruq, a two-headed dragon? You are amazing.";

				message[9] = "Are you going to keep going or quit without rescuing the Princess?";

				message[10] = "The King would like to offer his congratulations for getting this far and give you some food. After eating a snack, you are ready to reconvene your adventure.";

				message[11] = "OMG, that was a close one! You might try a different strategy with your weapons.";

				message[12] = "Don't forget your mission. The Princess is counting on you. Can you hear her cries?";

				message[13] = "Sangilak, the troll, didn't stand a chance against you. Keep moving forward.";

				message[14] = "How did you do that? Ready to advance to the next level?";

				message[15] = "Let's take a minute to review what you have accomplished so far ... Nothing! The Princess is still captive in the castle. Get back to your mission!";

				message[16] = "Holy cow! That fire-breathing bovine nearly burned you to a crisp.";

				message[17] = "Nothing to see here, folks. Keep moving.";

				message[18] = "There's no time to lose if you want to save the Princess. Onward ho!";

				message[19] = "You are getting close, but the King has noticed you slowing down. Keep hope alive!";

				message[20] = "As the Princess' cries get louder and louder, you are becoming even more determined to accomplish your task. <br>Take each level one at a time. You never know what's lurking right around the corner.";

				message[21] = "Did you hear that? The Princess senses someone is getting close. Don't stop now, you are almost there.";

				message[22] = "Before moving on, take a drink of water. Think carefully about your strategy before proceeding to the next level.";

				message[23] = "Zoo-We-Momma! You just might be the one who saves the Princess.";

				message[24] = "Bazinga! Nailed it. Move on.";

				message[25] = "\"Help me! Help me!,\" cries the Princess. \"I'm almost there,\" you reply. Stop yakking and start fighting!";

				message[26] = "Only Sitiyok, a three-headed, 25-foot tall giant, stands between you and the Princess. You've got this. Go get him!";

				message[27] = "Congratulations!!! You have reached the Princess and saved her from imminent death. <br>Along with the gold you have accumulated, and the Princess' undying love, of course, <br>the King is offering you a chance to accumulate even more gold. <br>Continue to defeat the evil wizard's minions and watch your stacks of gold rise to <br>the skies. Or quit now and live happily ever after as the conquering hero.";
			}