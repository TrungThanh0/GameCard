import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";
import { Card } from "./components/Card.js";
import { Label } from "./core/Label.js";

class Game extends Node {
    constructor() {
        super();
        this._init();

    }
    _init() {
        this.width = 900;
        this.height = 500;
        this.x=0;
        this.y=0;
        this.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)";
        this.cardFlipped = 0 ;
        this.canClick = true;
        this.firstCard = null;
        this.secondCard = null;
        this.score = 100;
        this.alpha = Math.floor(this.score / 10);
        this._createBPlay()
        this.removeChild();
        this._createCards();
        this._createScore();
    }
    _shuffleCards() {
        let randomCards = new Array(20)
        for (let i = 0; i < 20; i++) {
            randomCards[i] = i % (20 / 2)
        }
        randomCards.sort(() => {
            return 0.5 - Math.random()
        })
        randomCards.sort()
        return randomCards;
    }
    _createCards() {
        
let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        let cards = [];
        let card;
        let randomCards = this._shuffleCards()
        for (let index = 0; index < 20; index++) {
            card = new Card(index);
            let col = index % 5
            let row = Math.floor(index / 5)
            card.x = col * 110
            card.y = row * 110
            card.width = 50
            card.height = 50   
            tl.to(card, {
                ease: Back.easeIn,
                x: 200,
                y: 150,
                zIndex: 999,
                duration: 0.2
            }, "0.1");
            this.addChild(card)
            card.setValue(randomCards[index]);
            cards.push(card)
            card.elm.addEventListener("click", this.onClickCard.bind(this, card))
        }
        for (let index = 0; index < 20; index++) {
            let row = Math.floor(index / 5)
            let col = index % 5
            tl.to(cards[index], 0.2, {
                ease: Back.easeOut.config(),
                x: col * 110,
                y: row * 110,
                   
            })
        }
    }  
    _createBPlay() {
        let BTPlay = new Label();
        BTPlay.elm.style.position = "absolute"
        BTPlay.elm.style.padding = "5px 5px"
        BTPlay.elm.style.borderRadius = "5px"
        BTPlay.elm.style.background = "pink"
        BTPlay.elm.style.cursor = "pointer"
        BTPlay.fontsize = 39;
        BTPlay.width = 172
        BTPlay.height = -1
        BTPlay.elm.textContent = "BAT DAU "
        BTPlay.x = 720;
        BTPlay.y = 80;
        BTPlay.color = "Blue"
        BTPlay.elm.addEventListener("click", ()=>{
            document.getElementsByTagName("div")[0].innerHTML = "";
            this._init();
        });
        console.log(BTPlay);
        this.BTPlay = BTPlay
        this.addChild(this.BTPlay);    
    }
    _createScore() {
        this.lblScore = new Label();
        this.lblScore.text = 'score:' + this.score;
        this.lblScore.fontsize = 50;
        this.lblScore.x = 700;
        this.lblScore.width = 50;
        this.lblScore.height = 50;
        this.lblScore.y = 0;
        this.lblScore.color = "Black";  
        this.addChild(this.lblScore);
    }
    onClickCard(card) {
        if (this.flipCard = 0 )
        if (!this.canClick) return;
        if (card === this.firstCard) return;
        if (this.firstCard === null) {
            this.firstCard = card;              
            this.firstCard.flipCard();
            console.log("firstCard", card.value);
        } else {
            this.canClick = false;
            this.secondCard = card;
            this.secondCard.flipCard();
            console.log("second", card.value);  
        }
    }

    
    compareCard() {
        this.canClick = false;
        if (this.firstCard.value === this.secondCard.value) {
            this.cardFlipped += 1;
            this.plusScore(10);
            setTimeout(() => {
                this.firstCard.open();
                this.secondCard.open();
                setTimeout(() => {
                    matched.play();
                }, 500);
                console.log(true, "Hide");
            }, 500)
        } else {
            this.minusScore(10);
            setTimeout(() => {
                this.firstCard.close();
                this.secondCard.close();
                setTimeout(() => {
                    matchFail.play();
                }, 500)
                console.log(false, "Close");
            }, 500)
        }
        setTimeout(() => {
            this.canClick = true;
            this.firstCard = null;
            this.secondCard = null;
            console.log("reset var")
        }, 2000)
    }   
    failed() {
        console.log('failed');
        this.canClick = true;
        this.score -= this.alpha
        console.log(this.score);
        this.firstCard.close();
        this.secondCard.close();
        this.firstCard = null;
        this.secondCard = null;
    }
    success() {
        console.log('success');
        this.canClick = true;
        this.score += this.alpha;
        console.log(this.score);
        this.firstCard.hide();
        this.secondCard.hide();
        this.firstCard = null;
        this.secondCard = null;
    }
    resetGame() {
    const cards = document.body.getElementsByTagName("div")[0];
    cards.innerHTML = "";
    this._init();
    }
}
let game = new Game();
game.width = 900
game.height = 500
game.x = 50
game.y = 50
game.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)"
document.body.appendChild(game.elm) 