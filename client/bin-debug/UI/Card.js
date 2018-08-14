var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var CardFlower;
(function (CardFlower) {
    CardFlower[CardFlower["Spade"] = 0] = "Spade";
    CardFlower[CardFlower["Heart"] = 1] = "Heart";
    CardFlower[CardFlower["Club"] = 2] = "Club";
    CardFlower[CardFlower["Diamond"] = 3] = "Diamond";
})(CardFlower || (CardFlower = {}));
;
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(flower, point, realPoint) {
        var _this = _super.call(this) || this;
        _this.cardWidth = 80;
        _this.cardHeight = 140;
        _this.isOpen = false;
        _this.flower = flower;
        _this.point = point;
        _this.realPoint = realPoint;
        _this.setUp();
        return _this;
    }
    Card.prototype.setUp = function () {
        this.backSprite = new egret.Bitmap();
        this.backSprite.width = this.cardWidth;
        this.backSprite.height = this.cardHeight;
        this.backSprite.texture = RES.getRes("cardBack_png");
        this.frontSprite = new egret.Sprite();
        this.frontSprite.graphics.beginFill(0xffffff, 1);
        this.frontSprite.graphics.drawRect(0, 0, this.cardWidth, this.cardHeight);
        this.frontSprite.graphics.endFill();
        this.addChild(this.backSprite);
        this.addChild(this.frontSprite);
        this.close();
        var texture;
        var isBlack = false;
        switch (this.flower) {
            case CardFlower.Spade:
                texture = RES.getRes("heitao_png");
                isBlack = true;
                break;
            case CardFlower.Heart:
                texture = RES.getRes("hongtao_png");
                break;
            case CardFlower.Club:
                texture = RES.getRes("meihua_png");
                isBlack = true;
                break;
            case CardFlower.Diamond:
                texture = RES.getRes("fangkuai_png");
                break;
        }
        var numberLabel = new egret.TextField();
        this.frontSprite.addChild(numberLabel);
        numberLabel.textColor = isBlack ? 0x000000 : 0xff0000;
        numberLabel.text = this.getLabel();
        numberLabel.width = 100;
        numberLabel.height = 50;
        var flowerSp = new egret.Bitmap();
        flowerSp.width = 40;
        flowerSp.height = 40;
        flowerSp.texture = texture;
        flowerSp.x = (this.cardWidth - flowerSp.width) * 0.5;
        flowerSp.y = (this.cardHeight - flowerSp.height) * 0.5;
        this.frontSprite.addChild(flowerSp);
    };
    Card.prototype.open = function () {
        this.isOpen = true;
        this.frontSprite.visible = true;
        this.backSprite.visible = false;
    };
    Card.prototype.close = function () {
        this.isOpen = false;
        this.frontSprite.visible = false;
        this.backSprite.visible = true;
    };
    Card.prototype.turnPage = function () {
        if (this.isOpen)
            this.close();
        else
            this.open();
    };
    Card.prototype.getLabel = function () {
        if (this.point == 0) {
            return "A";
        }
        else if (this.point == 10) {
            return "J";
        }
        else if (this.point == 11) {
            return "Q";
        }
        else if (this.point == 12) {
            return "K";
        }
        else {
            return (this.point + 1) + "";
        }
    };
    return Card;
}(egret.Sprite));
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map