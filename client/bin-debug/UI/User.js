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
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super.call(this) || this;
        _this.userWidth = 200;
        _this.userHeight = 200;
        _this.cards = [];
        _this.setUp();
        return _this;
    }
    User.prototype.setUp = function () {
        var allBack = new egret.Bitmap();
        var texture2 = RES.getRes("cardBack_png");
        allBack.texture = texture2;
        allBack.width = this.userWidth;
        allBack.height = this.userHeight;
        this.addChild(allBack);
        this.freeSp = new egret.Sprite();
        this.addChild(this.freeSp);
        var freeLabel = new egret.TextField();
        freeLabel.size = 24;
        freeLabel.textColor = 0xff0000;
        freeLabel.text = "空位";
        freeLabel.textAlign = egret.HorizontalAlign.CENTER;
        freeLabel.width = 100;
        freeLabel.height = 50;
        freeLabel.x = 50;
        freeLabel.y = 75;
        this.freeSp.addChild(freeLabel);
        this.userSp = new egret.Sprite();
        this.addChild(this.userSp);
        this.headImage = new egret.Bitmap();
        var texture = RES.getRes("cardBack_png");
        this.headImage.texture = texture;
        this.headImage.width = 100;
        this.headImage.height = 100;
        this.userSp.addChild(this.headImage);
        this.headNameLabel = new egret.TextField();
        this.headNameLabel.size = 24;
        this.headNameLabel.textColor = 0xff0000;
        this.headNameLabel.text = "玩家";
        this.headNameLabel.width = 100;
        this.headNameLabel.height = 50;
        this.headNameLabel.x = 100;
        this.headNameLabel.y = 25;
        this.userSp.addChild(this.headNameLabel);
        this.cardSp = new egret.Sprite();
        this.cardSp.y = 100;
        this.userSp.addChild(this.cardSp);
        this.readyLabel = new egret.TextField();
        this.readyLabel.size = 30;
        this.readyLabel.textColor = 0x00ff00;
        this.readyLabel.text = "准备";
        this.readyLabel.width = 100;
        this.readyLabel.height = 50;
        this.readyLabel.x = 0;
        this.readyLabel.y = 150;
        this.userSp.addChild(this.readyLabel);
        this.isOffLineLabel = new egret.TextField();
        this.isOffLineLabel.size = 20;
        this.isOffLineLabel.textColor = 0xff0000;
        this.isOffLineLabel.text = "掉线";
        this.isOffLineLabel.width = 100;
        this.isOffLineLabel.height = 50;
        this.isOffLineLabel.x = 100;
        this.isOffLineLabel.y = 150;
        this.userSp.addChild(this.isOffLineLabel);
        this.changeFree();
    };
    User.prototype.setUserInfo = function (userInfo) {
        this.headNameLabel.text = userInfo.userName;
        this.userName = userInfo.userName;
        this.freeSp.visible = false;
        this.userSp.visible = true;
        this.readyLabel.visible = userInfo.isReady;
        this.isOffLineLabel.visible = !userInfo.isOnLine;
    };
    User.prototype.changeFree = function () {
        this.userName = "";
        this.freeSp.visible = true;
        this.userSp.visible = false;
    };
    User.prototype.addCard = function (card) {
        this.cards.push(card);
        this.showAllCards();
    };
    User.prototype.showAllCards = function () {
        this.cardSp.removeChildren();
        for (var i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
            card.x = i * 80;
            this.cardSp.addChild(card);
        }
    };
    return User;
}(egret.Sprite));
__reflect(User.prototype, "User");
//# sourceMappingURL=User.js.map