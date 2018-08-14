class GameRoomScene extends BaseScene {
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}

	private onAddToStage(){
		var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes("table_jpeg");
        result.texture = texture;
        this.addChild(result);
        result.width = this.stage.stageWidth;
        result.height = this.stage.stageHeight;

        this.addChild(this.userView1);
        this.addChild(this.userView2);

        this.userView2.x = 900;

        let button = new eui.Button();
        button.label = "退出";
        button.x = 0;
        button.y = this.stage.stageHeight - 50;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBack, this); 

        let button2 = new eui.Button();
        button2.label = "准备";
        button2.x = 100;
        button2.y = this.stage.stageHeight - 50;
        this.addChild(button2);
        button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doReady, this);
        this.readyButton = button2;
	}

    private readyButton;

    private goBack(event: egret.TouchEvent):void{
		GameSocket.getInstance().sendMessage({"messageName":"leaveRoom"});
	}

    private doReady(event: egret.TouchEvent):void{
		GameSocket.getInstance().sendMessage({"messageName":"userReady","isReady":!MyGlobal.isReady});
	}

    private userView1 = new User();
    private userView2 = new User();

    private userList = [];

	public handelServerMessage(message){
		let messageName = message.messageName;
		if(messageName === "enterRoom_r"){//房间列表
            var userList = message.roomInfo;
            this.userList = userList;
            this.setUpUserViews();
		}else if(messageName === "enterRoom_s"){//别人进入
            this.userList.push(message.userInfo);
            this.setUpUserViews();
        }else if(messageName === "leaveRoom_s"){//别人退出房间
            for (var i=0;i<this.userList.length;i++) {   
                var userInfo = this.userList[i];
                if(message.userName === userInfo.userName){
                    this.userList.splice(i,1);
                    break;
                }
            }
            this.setUpUserViews();
        }else if(messageName === "userReady_r"){//自己准备返回
            MyGlobal.isReady = message.isReady;
            if(MyGlobal.isReady){
                this.readyButton.label = "取消";
            }else{
                this.readyButton.label = "准备";
            }
        }else if(messageName === "userReady_s"){//别人准备
            for (var i=0;i<this.userList.length;i++) {   
                var userInfo = this.userList[i];
                if(message.userName === userInfo.userName){
                    userInfo.isReady = message.isReady;
                    break;
                }
            }
            this.setUpUserViews();
        }else if(messageName === "offline_s"){//别人掉线
            for (var i=0;i<this.userList.length;i++) {   
                var userInfo = this.userList[i];
                if(message.userName === userInfo.userName){
                    userInfo.isOnLine = false;
                    break;
                }
            }
            this.setUpUserViews();
        }else if(messageName === "online_s"){//别人上线
            for (var i=0;i<this.userList.length;i++) {   
                var userInfo = this.userList[i];
                if(message.userName === userInfo.userName){
                    userInfo.isOnLine = true;
                    break;
                }
            }
            this.setUpUserViews();
        }else if(messageName === "gameInit_s"){//初始化牌
            for (var i=0;i<message.userMsgs.length;i++) {
                var firstCard = message.userMsgs[i].firstCard;
                var userName = message.userMsgs[i].userName;
                var card;
                if(firstCard === "canNotSee"){
                    card = new Card(0,0,0);
                }else{
                    card = new Card(firstCard.flower,firstCard.point,firstCard.realPoint);
                    card.open();
                }
                var userView = this.getUserViewByUserName(userName);
                userView.addCard(card);

                let addCards = message.userMsgs[i].addCards;

                for (var j=0;j<addCards.length;j++) {   
                    var oneCardData = addCards[j];
                    var tempCard:Card = new Card(oneCardData.flower,oneCardData.point,oneCardData.realPoint);
                    tempCard.open();
                    userView.addCard(tempCard);
                }
            }
        }
	}

    private getUserViewByIndex(index){
        if(index == 0)
            return this.userView1;
        return this.userView2;
    }

    private getUserViewByUserName(userName){
        if(this.userView1.userName == userName)
            return this.userView1;
        else if(this.userView2.userName == userName)
            return this.userView2;
        return null;
    }

    private setUpUserViews(){
        if(!this.userList)
            return;
        this.userView1.changeFree();
        this.userView2.changeFree();
        for (var i=0;i<this.userList.length;i++) {   
            var userInfo = this.userList[i];
            var userView = this.getUserViewByIndex(i);
            userView.setUserInfo(userInfo);
        }
    }
}