class GameSocket {

	private socket:SocketIOClient.Socket;

	private HOST:string = "http://127.0.0.1";
	private PORT:number = 8888;

	private static instance:GameSocket;

	public static getInstance():GameSocket{
		if(!this.instance){
			this.instance =  new GameSocket();
		}
		return this.instance;
	}

	public constructor() {
		this.initWebSocket();
	}

	private initWebSocket():void{
		var self = this;

		this.socket =  io.connect("http://127.0.0.1:8899");
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
	}

	public sendMessage(str:Object):void{
		this.socket.emit('clientMsgToServer',str);
	}

	private handelServerMessage(data):void{
		let messageName = data.messageName;
		if(messageName === "login_r"){//登陆返回
			let resultCode = data.resultCode;
			if(resultCode == 0){
				egret.log("登陆成功");
				SceneManager.getInstance().showGameRoomListScene();
			}
		}else if(messageName === "login_s"){//被踢返回
			egret.log("用户被踢");
		}else if(messageName === "enterRoom_r"){//进入房间
			let resultMessage = data.resultMessage;
			if(resultMessage){
				SceneManager.getInstance().cureScene.showTips(resultMessage);
				return;
			}
			SceneManager.getInstance().showGameRoomScene();
			SceneManager.getInstance().cureScene.handelServerMessage(data);
		}else if(messageName === "leaveRoom_r"){//退出房间
			let resultMessage = data.resultMessage;
			if(resultMessage){
				SceneManager.getInstance().cureScene.showTips(resultMessage);
				return;
			}
			SceneManager.getInstance().showGameRoomListScene();
		}else{
			SceneManager.getInstance().cureScene.handelServerMessage(data);
		}
	}
}