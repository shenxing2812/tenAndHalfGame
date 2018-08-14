class GameTipManager extends egret.Sprite{

	private static instance:GameTipManager;

	public static getInstance():GameTipManager{
		if(!this.instance){
			this.instance =  new GameTipManager();
		}
		return this.instance;
	}

    public showTips(tips){
        let tip = new GameTip(0xff0000,tips,null);
        tip.x = this.stage.stageWidth/2;
        tip.y = this.stage.stageHeight/2;;
        this.stage.addChild(tip);
    }
}