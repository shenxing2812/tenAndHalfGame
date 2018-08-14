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
var GameTip = (function (_super) {
    __extends(GameTip, _super);
    function GameTip(color, tipString, callBackFun) {
        var _this = _super.call(this) || this;
        _this.color = color;
        _this.callBackFun = callBackFun;
        _this.tipString = tipString;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameTip.prototype.onAddToStage = function () {
        this.tipLabel = new egret.TextField();
        this.tipLabel.textColor = this.color;
        this.tipLabel.text = this.tipString;
        this.tipLabel.width = 200;
        this.tipLabel.height = 50;
        this.tipLabel.x = -100;
        this.tipLabel.y = -25;
        this.addChild(this.tipLabel);
        egret.Tween.get(this.tipLabel).to({ y: -100 }, 300, egret.Ease.sineIn).wait(500).call(this.clearSelf);
    };
    GameTip.prototype.clearSelf = function () {
        if (this.parent)
            this.parent.removeChild(this);
        if (this.callBackFun)
            this.callBackFun();
    };
    return GameTip;
}(egret.Sprite));
__reflect(GameTip.prototype, "GameTip");
//# sourceMappingURL=GameTip.js.map