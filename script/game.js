import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";
import { Card } from "./components/Card.js";
import { Label } from "./core/Label.js";

class Game extends Node {
    constructor() {
        super();
        this.canClick = true;
        this.firstCard = null;
        this.secondCard = null;
        this.score = 100;
        this.alpha = Math.floor(this.score / 10 );  
        this._init();
        
    }
    _init() {
        this._createBPlay()
        this.removeChild(); 
        this._createCards();
        this._createScore();
    }
    _createCards() {
        
        this.cards = [];
        for (let index = 0; index < 20; index++) {
            let card = new Card(index);
            this.cards.push(card);
            card.setValue(index % 10);
            let row = index % 5;
            let col = Math.floor(index / 5);
            card.x = row * 110;
            card.y = col * 110;

            card.elm.addEventListener("click", this.onClickCard.bind(this, card))
            this.addChild(card);
        }
    }
    _createBPlay(){
        let BTPlay = new Label();
        BTPlay.fontsize = 40 ;
        BTPlay.width = 200
        BTPlay.height = 200
        BTPlay.elm.textContent = "BAT DAU "
        BTPlay.x = 720 ;
        BTPlay.y = 80 ;
        BTPlay.color = "Blue"
        BTPlay.elm.addEventListener("click", this._init.bind(this,this.BTPlay));
        console.log(BTPlay);
        this.BTPlay = BTPlay
        this.addChild(this.BTPlay);
        
    }
    _createScore() {
        this.lblScore = new Label();
        this.lblScore.text = 'score:' + this.score ;
        this.lblScore.fontsize = 50 ;
        this.lblScore.x = 700;
        this.lblScore.width = 50 ;
        this.lblScore.height = 50 ;
        this.lblScore.y = 0;
        this.lblScore.color = "Black";

        this.addChild(this.lblScore);
        

    }

    onClickCard(card) {
         if(!this.canClick)  return;  
         if(card === this.firstCard) return ;
         if(this.firstCard === null){
             this.firstCard = card ;
             this.firstCard.open();

         } else {
             this.canClick = false ;
             this.secondCard = card;
             this.secondCard.open();

             setTimeout(() => {
                 this.compareCard();
             } , 1000 );
         }
        }

    compareCard() {
        if ( this.firstCard.value === this.secondCard.value ) {
            this.success();
        } else {
            this.failed();
        }
        this.lblScore.text = this.score;
    }
    failed(){
            console.log('failed');
        this.canClick = true; 
        this.score -=this.alpha
            console.log(this.score);
        this.firstCard.close();
        this.secondCard.close();
        this.firstCard = null;
        this.secondCard = null ;
        

    }
    success(){
            console.log('success');
        this.canClick = true ;
        this.score += this.alpha ;
            console.log(this.score);
        this.firstCard.hide();
        this.secondCard.hide();
        this.firstCard = null ;
        this.secondCard = null ;
    }
    resetGame() {

    }
}

let game = new Game();
game.width = 900 ;
game.height = 500;
game.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)";

document.body.appendChild(game.elm);

