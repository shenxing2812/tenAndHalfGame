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
var GameRoomListScene = (function (_super) {
    __extends(GameRoomListScene, _super);
    function GameRoomListScene() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameRoomListScene.prototype.onAddToStage = function () {
        var result = new egret.Bitmap();
        var texture = RES.getRes("cardBack_png");
        result.texture = texture;
        this.addChild(result);
        result.width = this.stage.stageWidth;
        result.height = this.stage.stageHeight;
    };
    GameRoomListScene.prototype.handelServerMessage = function (messgae) {
        var messageName = messgae.messageName;
        if (messageName === "getAllRoomInfo_r") {
            //	roomsInfo:{roomId:gameRoom.roomId,count:gameRoom.count,maxCount:gameRoom.maxCount}
            this.setUpRooms(messgae.roomsInfo);
        }
    };
    GameRoomListScene.prototype.setUpRooms = function (oneRoom) {
        this.oneRoom = oneRoom;
        if (!this.numberLabel) {
            var numberLabel = new egret.TextField();
            numberLabel.textColor = 0xff0000;
            numberLabel.width = 300;
            numberLabel.height = 50;
            numberLabel.x = (this.stage.stageWidth - numberLabel.width) * 0.5;
            numberLabel.y = 150;
            this.addChild(numberLabel);
            this.numberLabel = numberLabel;
        }
        this.numberLabel.text = "房间号：" + oneRoom.roomId + " " + oneRoom.curCount + "/" + oneRoom.maxCount;
        if (!this.button) {
            var button = new eui.Button();
            button.label = "进入房间";
            button.x = (this.stage.stageWidth - 100) * 0.5;
            button.y = 250;
            this.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this.button = button;
        }
    };
    GameRoomListScene.prototype.onButtonClick = function (event) {
        MyGlobal.roomId = this.oneRoom.roomId;
        GameSocket.getInstance().sendMessage({ "messageName": "enterRoom", "roomId": this.oneRoom.roomId });
    };
    return GameRoomListScene;
}(BaseScene));
__reflect(GameRoomListScene.prototype, "GameRoomListScene");
//# sourceMappingURL=GameRoomListScene.js.map