enum CardFlower { Spade, Heart,Club,Diamond } ;

class Card extends egret.Sprite {

    private flower;
    private point;
    private realPoint;

    private backSprite;
    private frontSprite;

    private cardWidth = 80;
    private cardHeight = 140;

    private isOpen = false;

	public constructor(flower,point,realPoint) {
		super();
        this.flower = flower;
        this.point = point;
        this.realPoint = realPoint;
        this.setUp();
	}

    private setUp(){

        this.backSprite = new egret.Bitmap();
        this.backSprite.width = this.cardWidth;
        this.backSprite.height = this.cardHeight;
        this.backSprite.texture = RES.getRes("cardBack_png");
       

        this.frontSprite = new egret.Sprite();
        this.frontSprite.graphics.beginFill(0xffffff,1);
		this.frontSprite.graphics.drawRect(0,0,this.cardWidth,this.cardHeight);
		this.frontSprite.graphics.endFill();

        this.addChild(this.backSprite);
        this.addChild(this.frontSprite);

        this.close();


        let texture:egret.Texture;
        let isBlack = false;
         
        switch(this.flower){
            case CardFlower.Spade:
                texture = RES.getRes("heitao_png");
                isBlack = true;
                break;
            case CardFlower.Heart:
                texture = RES.getRes("hongtao_png");
                break;
            case CardFlower.Club:
                texture = RES.getRes("meihua_png");
                isBlack = true;
                break;
            case CardFlower.Diamond:
                texture = RES.getRes("fangkuai_png");
                break;
        }

        let numberLabel = new egret.TextField();
        this.frontSprite.addChild(numberLabel);
        numberLabel.textColor = isBlack?0x000000:0xff0000;
        numberLabel.text = this.getLabel();
        numberLabel.width = 100;
        numberLabel.height = 50;

        let flowerSp = new egret.Bitmap();
        flowerSp.width = 40;
        flowerSp.height = 40;
        flowerSp.texture = texture;
        flowerSp.x = (this.cardWidth - flowerSp.width) * 0.5;
        flowerSp.y = (this.cardHeight - flowerSp.height) * 0.5;
        this.frontSprite.addChild(flowerSp);
    }

    public open(){
        this.isOpen = true;
        this.frontSprite.visible = true;
        this.backSprite.visible = false;
    }

    public close(){
        this.isOpen = false;
        this.frontSprite.visible = false;
        this.backSprite.visible = true;
    }

    public turnPage(){
        if(this.isOpen)
            this.close();
        else
            this.open();
    }

    private getLabel():string{
        if(this.point == 0){
            return "A";
        }else if(this.point == 10){
            return "J";
        }else if(this.point == 11){
            return "Q";
        }else if(this.point == 12){
            return "K";
        }else{
            return (this.point+1)+"";
        }
    }

}