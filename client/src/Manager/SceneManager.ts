class SceneManager extends egret.Sprite{

	private static instance:SceneManager;

	public static getInstance():SceneManager{
		if(!this.instance){
			this.instance =  new SceneManager();
		}
		return this.instance;
	}

	private welComeScene:WelComeScene;
	private gameRoomListScene:GameRoomListScene;
	private gameRoomScene:GameRoomScene;


	public cureScene:BaseScene;

	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		
	}

	private onAddToStage():void{
		this.graphics.beginFill(0x333333,1);
		this.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
		this.graphics.endFill();

		this.showWelComeScene();
	}

	public showGameRoomListScene():void{
		this.removeChild(this.cureScene);
		if(!this.gameRoomListScene){
			this.gameRoomListScene = new GameRoomListScene();
		}
		this.addChild(this.gameRoomListScene);
		this.cureScene = this.gameRoomListScene;

		GameSocket.getInstance().sendMessage({"messageName":"getAllRoomInfo"});
	}

	public showGameRoomScene():void{
		this.removeChild(this.cureScene);
		if(!this.gameRoomScene){
			this.gameRoomScene = new GameRoomScene();
		}
		this.addChild(this.gameRoomScene);
		this.cureScene = this.gameRoomScene;
	}

	public showWelComeScene():void{
		if(this.cureScene)
			this.removeChild(this.cureScene);
		if(!this.welComeScene){
			this.welComeScene = new WelComeScene();
		}
		this.addChild(this.welComeScene);
		this.cureScene = this.welComeScene;
	}

	
}