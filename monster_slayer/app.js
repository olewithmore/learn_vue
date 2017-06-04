/**
 * Created by olewithmore on 6/4/2017.
 */

new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= this.calculateDamage(3, 10);
            this.turns.unshift({
                isPlayer: true,
                text: 'Player htis Monster for' + damage
            });
            if(this.checkWin()){
                return;
            }

            this.mosterAttack();
        },
        specialAttack: function () {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
	          this.turns.unshift({
		          isPlayer: true,
		          text: 'Player htis special atk Monster for' + damage
	          });
            if(this.checkWin()){
                return;
            }
            this.mosterAttack();
        },
        heal: function () {
            if (this.playerHealth <= 10) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

	        this.turns.unshift({
		        isPlayer: true,
		        text: 'Player heals for ' + 10
	        });

            this.mosterAttack();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        mosterAttack: function() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
	          this.turns.unshift({
		            isPlayer: false,
		            text: 'Monster htis Player for' + damage
	          });
            this.checkWin();
        },
        calculateDamage(min, max) {
          return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if(this.playerHealth <= 0){
              this.playerHealth = 0;
              if(confirm('You lost! New Game?')){
                  this.startGame();
              }else{
                  this.gameIsRunning= false;
              }
              return true;
            } else if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if(confirm('You won! New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning= false;
                }
                return true;
            }
            return false;
        }
    }
});
