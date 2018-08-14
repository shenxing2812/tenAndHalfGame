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
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    SceneManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
    };
    SceneManager.prototype.onAddToStage = function () {
        this.graphics.beginFill(0x333333, 1);
        this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.graphics.endFill();
        this.showWelComeScene();
    };
    SceneManager.prototype.showGameRoomListScene = function () {
        this.removeChild(this.cureScene);
        if (!this.gameRoomListScene) {
            this.gameRoomListScene = new GameRoomListScene();
        }
        this.addChild(this.gameRoomListScene);
        this.cureScene = this.gameRoomListScene;
        GameSocket.getInstance().sendMessage({ "messageName": "getAllRoomInfo" });
    };
    SceneManager.prototype.showGameRoomScene = function () {
        this.removeChild(this.cureScene);
        if (!this.gameRoomScene) {
            this.gameRoomScene = new GameRoomScene();
        }
        this.addChild(this.gameRoomScene);
        this.cureScene = this.gameRoomScene;
    };
    SceneManager.prototype.showWelComeScene = function () {
        if (this.cureScene)
            this.removeChild(this.cureScene);
        if (!this.welComeScene) {
            this.welComeScene = new WelComeScene();
        }
        this.addChild(this.welComeScene);
        this.cureScene = this.welComeScene;
    };
    return SceneManager;
}(egret.Sprite));
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map