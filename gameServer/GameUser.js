function GameUser(userName,pos){
    this.userName = userName;
    this.isReady = false;
    this.firstCard = null;
    this.cards = [];
    this.pos = pos;
    this.isOnLine = true;
}

GameUser.prototype.getUserMessage = function(){
    return{"userName":this.userName,"isReady":this.isReady,"isOnLine":this.isOnLine};
}

module.exports = GameUser;