class GameTip extends egret.Sprite{
    public constructor(color,tipString,callBackFun) {
		super();
        this.color = color;
        this.callBackFun = callBackFun;
        this.tipString = tipString;
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}

    private color;
    private callBackFun;
    private tipLabel;
    private tipString;

	private onAddToStage(){
		this.tipLabel = new egret.TextField();
        this.tipLabel.textColor = this.color;
        this.tipLabel.text = this.tipString;
        this.tipLabel.width = 200;
        this.tipLabel.height = 50;
        this.tipLabel.x = -100;
        this.tipLabel.y = -25;
        this.addChild(this.tipLabel);


        egret.Tween.get(this.tipLabel).to({y:-100},300,egret.Ease.sineIn).wait(500).call(this.clearSelf);
	}

    private clearSelf(){
        if(this.parent)
            this.parent.removeChild(this);
        if(this.callBackFun)
            this.callBackFun();
    }
}