import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";
import { Label } from "../core/Label.js";

export class Card extends Node {
    constructor(index) {
        super();
        this.index = index;
        this.value = null;
        this._createSprite();
        this._createCover();
        this._createLabel(this.index);
    }
    _createSprite() {
        this.sprite = new Sprite();
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.sprite.x = 150 ;
        this.sprite.y = 50 ;    
        this.addChild(this.sprite);
    }
    _createCover() {
        let cover = new Node();
        cover.x = 150 ;
        cover.y = 50 ;  
        cover.width = 100;
        cover.height = 100;
        cover.elm.style.backgroundColor = "orange";
        cover.elm.style.border = "solid 1px blue";
        this.cover = cover;
        this.addChild(this.cover);
    }
    _createLabel(index) {
        this.label = new Label();
        this.label.x = 195 ;
        this.label.y = 95 ;
        // this.label.elm.style.textAlign = "center" ;
        this.label.text = index + 1;
        // this.label.x = Math.floor(this.cover.width / 2.222);
        // this.label.y = Math.floor(this.cover.height / 2.222);
        this.addChild(this.label);
    }
    setValue(value) {
        this.value = value;
        this.sprite.path = "./images/trucxanh" + value + ".jpg";
    }
    open() {
        this.cover.elm.style.background = "none";
        this.label.elm.style.display = "none";
      
    }
    close() {
        this.cover.elm.style.background = "orange";
        this.label.elm.style.display = "block";
    }
    hide() {
        this.elm.hidden = "true";
    }
}