var GameUser = require('./GameUser');

function TenAndHalfGame(){
    this.leftCars = [];
    this.allCards = [];
    this.timer = null;
    this.userList = [];
    this.betCard = null;
    this.isGameing = false;
}

TenAndHalfGame.prototype.startGame = function(){
    this.isGameing = true;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            var card =  new Card(i,j);
            this.allCards.push(card);
        }
    }

    let count = 0;
    while(1){
        let lenghth = this.allCards.length;
        let index = parseInt(Math.random()*lenghth);
        var card = this.allCards[index];
        this.leftCars.push(card);
        this.allCards.splice(index,1);
        console.log("初始化:"+card.toString());
        count ++;
        if(count > 20)
            break;
    }

    var userCount = this.userList.length;
    for (var i=0;i<userCount;i++) {
        var user = this.userList[i];
        var card = this.leftCars.shift();
        user.firstCard = card;
        console.log(user.userName+" 获取第一张牌是:"+card.toString());
    }

    this.betCard = this.leftCars.shift();


    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        var client = onLineClients[user.userName];
        if(client){
            var msg = this.getGameInitData(user.userName);
            client.emit('serverMsgToClient',msg);
        }
            
    }
 //   this.waitBet();
}

TenAndHalfGame.prototype.getGameInitData = function(userName){
    var userMsgs = [];
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        var userAddCard = [];

        for (let j = 0; j < user.cards.length; j++) {
            const card = user.cards[j];
            userAddCard.push(card.toMsg());
        }

        console.log("firstCard="+user.firstCard);

        if(userName == user.userName){
            userMsgs.push({"userName":userName,"firstCard":user.firstCard.toMsg(),"addCards":userAddCard});
        }else{
            userMsgs.push({"userName":userName,"firstCard":"canNotSee","addCards":userAddCard});
        }
        
    }
    return {"messageName":"gameInit_s","userMsgs":userMsgs,"betCard":this.betCard.toMsg()};
}

TenAndHalfGame.prototype.broadCast = function(message){
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        var client = onLineClients[user.userName];
        if(client)
            client.emit('serverMsgToClient',message);
    }
}

TenAndHalfGame.prototype.broadCastOthers = function(userName,message){
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        if(user.userName == userName)
            continue;
        var client = onLineClients[user.userName];
        if(client)
            client.emit('serverMsgToClient',message);
    }
}


//---------------Card---------------------

function Card(flower,point,realPoint){
    this.flower = flower;
    this.point = point;
    if(this.point > 9){
        this.realPoint = 0.5;
    }else{
        this.realPoint = this.point;
    }
}

Card.prototype.toString = function(){
    var flowerStr;
    switch (this.flower) {
        case 0:
            flowerStr = "黑桃";
            break;
        case 1:
            flowerStr = "红桃";
            break;
        case 2:
            flowerStr = "梅花";
            break;
        case 3:
            flowerStr = "方块";
            break;
        default:
            break;
    }

    var pointStr;
    if(this.point == 0){
        pointStr = "A";
    }else if(this.point > 0 && this.point < 10){
        pointStr = this.point+1;
    }else if(this.point == 10){
        pointStr = "J";
    }else if(this.point == 11){
        pointStr = "Q";
    }else if(this.point == 12){
        pointStr = "K";
    }
    return flowerStr + pointStr;
}

Card.prototype.toMsg = function(){
    return{"flower":this.flower,"point":this.point,"realPoint":this.realPoint};
}

module.exports = TenAndHalfGame;