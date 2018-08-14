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
var GameTipManager = (function (_super) {
    __extends(GameTipManager, _super);
    function GameTipManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameTipManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new GameTipManager();
        }
        return this.instance;
    };
    GameTipManager.prototype.showTips = function (tips) {
        var tip = new GameTip(0xff0000, tips, null);
        tip.x = this.stage.stageWidth / 2;
        tip.y = this.stage.stageHeight / 2;
        ;
        this.stage.addChild(tip);
    };
    return GameTipManager;
}(egret.Sprite));
__reflect(GameTipManager.prototype, "GameTipManager");
//# sourceMappingURL=GameTipManager.js.map