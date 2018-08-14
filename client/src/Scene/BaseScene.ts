class BaseScene extends egret.Sprite {
	public constructor() {
		super();
	}

	public handelServerMessage(messgae){

	}

	public createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

	public showTips(tips){
		GameTipManager.getInstance().showTips(tips);
	}
}