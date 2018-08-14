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
var GameRoomScene = (function (_super) {
    __extends(GameRoomScene, _super);
    function GameRoomScene() {
        var _this = _super.call(this) || this;
        _this.userView1 = new User();
        _this.userView2 = new User();
        _this.userList = [];
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameRoomScene.prototype.onAddToStage = function () {
        var result = new egret.Bitmap();
        var texture = RES.getRes("table_jpeg");
        result.texture = texture;
        this.addChild(result);
        result.width = this.stage.stageWidth;
        result.height = this.stage.stageHeight;
        this.addChild(this.userView1);
        this.addChild(this.userView2);
        this.userView2.x = 900;
        var button = new eui.Button();
        button.label = "退出";
        button.x = 0;
        button.y = this.stage.stageHeight - 50;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBack, this);
        var button2 = new eui.Button();
        button2.label = "准备";
        button2.x = 100;
        button2.y = this.stage.stageHeight - 50;
        this.addChild(button2);
        button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doReady, this);
        this.readyButton = button2;
    };
    GameRoomScene.prototype.goBack = function (event) {
        GameSocket.getInstance().sendMessage({ "messageName": "leaveRoom" });
    };
    GameRoomScene.prototype.doReady = function (event) {
        GameSocket.getInstance().sendMessage({ "messageName": "userReady", "isReady": !MyGlobal.isReady });
    };
    GameRoomScene.prototype.handelServerMessage = function (message) {
        var messageName = message.messageName;
        if (messageName === "enterRoom_r") {
            var userList = message.roomInfo;
            this.userList = userList;
            this.setUpUserViews();
        }
        else if (messageName === "enterRoom_s") {
            this.userList.push(message.userInfo);
            this.setUpUserViews();
        }
        else if (messageName === "leaveRoom_s") {
            for (var i = 0; i < this.userList.length; i++) {
                var userInfo = this.userList[i];
                if (message.userName === userInfo.userName) {
                    this.userList.splice(i, 1);
                    break;
                }
            }
            this.setUpUserViews();
        }
        else if (messageName === "userReady_r") {
            MyGlobal.isReady = message.isReady;
            if (MyGlobal.isReady) {
                this.readyButton.label = "取消";
            }
            else {
                this.readyButton.label = "准备";
            }
        }
        else if (messageName === "userReady_s") {
            for (var i = 0; i < this.userList.length; i++) {
                var userInfo = this.userList[i];
                if (message.userName === userInfo.userName) {
                    userInfo.isReady = message.isReady;
                    break;
                }
            }
            this.setUpUserViews();
        }
        else if (messageName === "offline_s") {
            for (var i = 0; i < this.userList.length; i++) {
                var userInfo = this.userList[i];
                if (message.userName === userInfo.userName) {
                    userInfo.isOnLine = false;
                    break;
                }
            }
            this.setUpUserViews();
        }
        else if (messageName === "online_s") {
            for (var i = 0; i < this.userList.length; i++) {
                var userInfo = this.userList[i];
                if (message.userName === userInfo.userName) {
                    userInfo.isOnLine = true;
                    break;
                }
            }
            this.setUpUserViews();
        }
        else if (messageName === "gameInit_s") {
            for (var i = 0; i < message.userMsgs.length; i++) {
                var firstCard = message.userMsgs[i].firstCard;
                var userName = message.userMsgs[i].userName;
                var card;
                if (firstCard === "canNotSee") {
                    card = new Card(0, 0, 0);
                }
                else {
                    card = new Card(firstCard.flower, firstCard.point, firstCard.realPoint);
                    card.open();
                }
                var userView = this.getUserViewByUserName(userName);
                userView.addCard(card);
                var addCards = message.userMsgs[i].addCards;
                for (var j = 0; j < addCards.length; j++) {
                    var oneCardData = addCards[j];
                    var tempCard = new Card(oneCardData.flower, oneCardData.point, oneCardData.realPoint);
                    tempCard.open();
                    userView.addCard(tempCard);
                }
            }
        }
    };
    GameRoomScene.prototype.getUserViewByIndex = function (index) {
        if (index == 0)
            return this.userView1;
        return this.userView2;
    };
    GameRoomScene.prototype.getUserViewByUserName = function (userName) {
        if (this.userView1.userName == userName)
            return this.userView1;
        else if (this.userView2.userName == userName)
            return this.userView2;
        return null;
    };
    GameRoomScene.prototype.setUpUserViews = function () {
        if (!this.userList)
            return;
        this.userView1.changeFree();
        this.userView2.changeFree();
        for (var i = 0; i < this.userList.length; i++) {
            var userInfo = this.userList[i];
            var userView = this.getUserViewByIndex(i);
            userView.setUserInfo(userInfo);
        }
    };
    return GameRoomScene;
}(BaseScene));
__reflect(GameRoomScene.prototype, "GameRoomScene");
//# sourceMappingURL=GameRoomScene.js.map