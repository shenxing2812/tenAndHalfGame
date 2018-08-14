class GameRoomListScene extends BaseScene {
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}

	private onAddToStage(){
		var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes("cardBack_png");
        result.texture = texture;
        this.addChild(result);
        result.width = this.stage.stageWidth;
        result.height = this.stage.stageHeight;
	}

	public handelServerMessage(messgae){
		let messageName = messgae.messageName;
		if(messageName === "getAllRoomInfo_r"){//房间列表
		//	roomsInfo:{roomId:gameRoom.roomId,count:gameRoom.count,maxCount:gameRoom.maxCount}
			this.setUpRooms(messgae.roomsInfo);
		}
	}

	private setUpRooms(oneRoom){
		this.oneRoom = oneRoom;
		if(!this.numberLabel){
			let numberLabel = new egret.TextField();
			numberLabel.textColor = 0xff0000;
			numberLabel.width = 300;
			numberLabel.height = 50;
			numberLabel.x = (this.stage.stageWidth-numberLabel.width)*0.5;
			numberLabel.y = 150;
			this.addChild(numberLabel);
			this.numberLabel = numberLabel;
		}
		this.numberLabel.text = "房间号："+oneRoom.roomId+" "+oneRoom.curCount+"/"+oneRoom.maxCount;

		if(!this.button){
			let button = new eui.Button();
			button.label = "进入房间";		
			button.x = (this.stage.stageWidth-100)*0.5;
			button.y = 250;
			this.addChild(button);
			button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this.button = button;
		}

		
	}

	private oneRoom;
	private numberLabel;
	private button;

	private onButtonClick(event: egret.TouchEvent):void{
		MyGlobal.roomId = this.oneRoom.roomId;
		GameSocket.getInstance().sendMessage({"messageName":"enterRoom","roomId":this.oneRoom.roomId});
	}

}