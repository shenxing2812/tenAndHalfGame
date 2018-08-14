var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameSocket = (function () {
    function GameSocket() {
        this.HOST = "http://127.0.0.1";
        this.PORT = 8888;
        this.initWebSocket();
    }
    GameSocket.getInstance = function () {
        if (!this.instance) {
            this.instance = new GameSocket();
        }
        return this.instance;
    };
    GameSocket.prototype.initWebSocket = function () {
        var self = this;
        this.socket = io.connect("http://127.0.0.1:8899");
        this.socket.on('connection', function (data) {
            egret.log("socket connect");
        });
        this.socket.on('disconnect', function (data) {
            egret.log("socket disconnect");
            MyGlobal.isReady = false;
            SceneManager.getInstance().showWelComeScene();
        });
        this.socket.on('serverMsgToClient', function (data) {
            self.handelServerMessage(data);
        });
    };
    GameSocket.prototype.sendMessage = function (str) {
        this.socket.emit('clientMsgToServer', str);
    };
    GameSocket.prototype.handelServerMessage = function (data) {
        var messageName = data.messageName;
        if (messageName === "login_r") {
            var resultCode = data.resultCode;
            if (resultCode == 0) {
                egret.log("登陆成功");
                SceneManager.getInstance().showGameRoomListScene();
            }
        }
        else if (messageName === "login_s") {
            egret.log("用户被踢");
        }
        else if (messageName === "enterRoom_r") {
            var resultMessage = data.resultMessage;
            if (resultMessage) {
                SceneManager.getInstance().cureScene.showTips(resultMessage);
                return;
            }
            SceneManager.getInstance().showGameRoomScene();
            SceneManager.getInstance().cureScene.handelServerMessage(data);
        }
        else if (messageName === "leaveRoom_r") {
            var resultMessage = data.resultMessage;
            if (resultMessage) {
                SceneManager.getInstance().cureScene.showTips(resultMessage);
                return;
            }
            SceneManager.getInstance().showGameRoomListScene();
        }
        else {
            SceneManager.getInstance().cureScene.handelServerMessage(data);
        }
    };
    return GameSocket;
}());
__reflect(GameSocket.prototype, "GameSocket");
//# sourceMappingURL=GameSocket.js.map