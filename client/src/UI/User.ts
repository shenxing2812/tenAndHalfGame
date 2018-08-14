class User extends egret.Sprite {
    
    private freeSp;//空位置
    private userSp;

    private headImage;
    private headNameLabel;
    private cardSp:egret.Sprite;

    private userWidth = 200;
    private userHeight = 200;

    public userName;

    public constructor() {
		super();
        this.setUp();
	}

    private setUp(){
        let allBack = new egret.Bitmap();
        var texture2:egret.Texture = RES.getRes("cardBack_png");
        allBack.texture = texture2;
        allBack.width = this.userWidth;
        allBack.height = this.userHeight;
        this.addChild(allBack);

        this.freeSp = new egret.Sprite();
        this.addChild(this.freeSp);

        let freeLabel = new egret.TextField();
        freeLabel.size = 24;
        freeLabel.textColor = 0xff0000;
        freeLabel.text = "空位";
        freeLabel.textAlign = egret.HorizontalAlign.CENTER;
        freeLabel.width = 100;
        freeLabel.height = 50;
		freeLabel.x = 50;
		freeLabel.y = 75;
		this.freeSp.addChild(freeLabel);

        this.userSp = new egret.Sprite();
        this.addChild(this.userSp);

        this.headImage = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes("cardBack_png");
        this.headImage.texture = texture;
        this.headImage.width = 100;
        this.headImage.height = 100;
        this.userSp.addChild(this.headImage);

        this.headNameLabel = new egret.TextField();
        this.headNameLabel.size = 24;
        this.headNameLabel.textColor = 0xff0000;
        this.headNameLabel.text = "玩家";
        this.headNameLabel.width = 100;
        this.headNameLabel.height = 50;
		this.headNameLabel.x = 100;
		this.headNameLabel.y = 25;
		this.userSp.addChild(this.headNameLabel);

        this.cardSp = new egret.Sprite();
        this.cardSp.y = 100;
        this.userSp.addChild(this.cardSp);


        this.readyLabel = new egret.TextField();
        this.readyLabel.size = 30;
        this.readyLabel.textColor = 0x00ff00;
        this.readyLabel.text = "准备";
        this.readyLabel.width = 100;
        this.readyLabel.height = 50;
		this.readyLabel.x = 0;
		this.readyLabel.y = 150;
		this.userSp.addChild(this.readyLabel);


        this.isOffLineLabel = new egret.TextField();
        this.isOffLineLabel.size = 20;
        this.isOffLineLabel.textColor = 0xff0000;
        this.isOffLineLabel.text = "掉线";
        this.isOffLineLabel.width = 100;
        this.isOffLineLabel.height = 50;
		this.isOffLineLabel.x = 100;
		this.isOffLineLabel.y = 150;
		this.userSp.addChild(this.isOffLineLabel);

        this.changeFree();
    }

    public setUserInfo(userInfo){
        this.headNameLabel.text = userInfo.userName;
        this.userName = userInfo.userName;
        this.freeSp.visible = false;
        this.userSp.visible = true;


        this.readyLabel.visible = userInfo.isReady;
        this.isOffLineLabel.visible = !userInfo.isOnLine;
    }

    private readyLabel;
    private isOffLineLabel;

    public changeFree(){
        this.userName = "";
        this.freeSp.visible = true;
        this.userSp.visible = false;
    }

    public addCard(card){
        this.cards.push(card);
        this.showAllCards();
    }

    private showAllCards(){
        this.cardSp.removeChildren();
        for(let i=0;i<this.cards.length;i++){
            let card = this.cards[i];
            card.x = i*80;
            this.cardSp.addChild(card);
        }
    }

    private cards = [];
}