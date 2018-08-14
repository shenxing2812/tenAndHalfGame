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
var WelComeScene = (function (_super) {
    __extends(WelComeScene, _super);
    function WelComeScene() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    WelComeScene.prototype.onAddToStage = function () {
        // this.graphics.beginFill(0xff0000,1);
        // this.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        // this.graphics.endFill();
        var result = new egret.Bitmap();
        var texture = RES.getRes("cardBack_png");
        result.texture = texture;
        this.addChild(result);
        result.width = this.stage.stageWidth;
        result.height = this.stage.stageHeight;
        this.userNameTextField = new egret.TextField();
        this.userNameTextField.textColor = 0xffffff;
        this.userNameTextField.width = 200;
        this.userNameTextField.textAlign = "center";
        this.userNameTextField.text = "shenxing";
        this.userNameTextField.size = 24;
        this.userNameTextField.x = (this.stage.stageWidth - this.userNameTextField.width) * 0.5;
        this.userNameTextField.y = 150;
        this.userNameTextField.type = egret.TextFieldType.INPUT;
        this.addChild(this.userNameTextField);
        this.passwordTextField = new egret.TextField();
        this.passwordTextField.textColor = 0xffffff;
        this.passwordTextField.width = 200;
        this.passwordTextField.textAlign = "center";
        this.passwordTextField.text = "123";
        this.passwordTextField.size = 24;
        this.passwordTextField.x = (this.stage.stageWidth - this.passwordTextField.width) * 0.5;
        this.passwordTextField.y = 200;
        this.passwordTextField.type = egret.TextFieldType.INPUT;
        this.addChild(this.passwordTextField);
        var button = new eui.Button();
        button.label = "登录";
        button.x = (this.stage.stageWidth - 100) * 0.5;
        button.y = 250;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        // for(var i=0;i<15;i++){
        //     let flower = Math.ceil(Math.random()*4) - 1;
        //     let point = Math.ceil(Math.random()*13) - 1;
        //     let card = new Card(flower,point,0.5);    
        //     card.x = i*82;
        //     card.y = 350;
        //     this.addChild(card);
        //     card.turnPage();
        // }
    };
    WelComeScene.prototype.onButtonClick = function (event) {
        var name = this.userNameTextField.text;
        var pwd = this.passwordTextField.text;
        GameSocket.getInstance().sendMessage({ "messageName": "login", "name": name, "pwd": pwd });
        MyGlobal.userName = name;
    };
    WelComeScene.prototype.handelServerMessage = function (messgae) {
    };
    return WelComeScene;
}(BaseScene));
__reflect(WelComeScene.prototype, "WelComeScene");
//# sourceMappingURL=WelComeScene.js.map