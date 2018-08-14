var TenAndHalfGame = require('./TenAndHalfGame');
var GameUser = require('./GameUser');

function GameRoom(roomId,maxCount){
    this.roomId = roomId;
    this.maxCount = maxCount;
    this.userList = new Array();
    this.game = new TenAndHalfGame();
}

GameRoom.prototype.enterRoom = function(userName){
    var user = this.findUser(userName);
    if(user){
        if(!user.isOnLine){
            user.isOnLine = true;
            this.broadCastOthers(userName,{"messageName":"online_s","userName":userName});
            var socket = onLineClients[userName];
            if(socket){
                socket.emit('serverMsgToClient',{"messageName":"enterRoom_r","roomInfo":this.getRoomInfo(),resultCode:0});
                socket.emit('serverMsgToClient',this.game.getGameInitData(userName));
            }
                
        }
        //已经存在了
        console.log(userName+' enterRoom fail，该用户已经在房间里，房间在线人数：'+ this.userList.length);
        return;
    }else{
        if(this.userList.length >= this.maxCount){
            var socket = onLineClients[userName];
            socket.emit('serverMsgToClient',{"messageName":"enterRoom_r",resultMessage:"已经满了"});
            return;
        }
    }
    user = new GameUser(userName,this.userList.length);
    this.userList.push(user);

    console.log(userName+' enterRoom '+ this.roomId +'，房间在线人数：'+ this.userList.length);

    var socket = onLineClients[userName];
    if(socket)
        socket.emit('serverMsgToClient',{"messageName":"enterRoom_r","roomInfo":this.getRoomInfo(),resultCode:0});

    this.broadCastOthers(userName,{"messageName":"enterRoom_s","userInfo":user.getUserMessage()});
};

GameRoom.prototype.leaveRoom = function(userName){
    var user;
    var index = 0;
    for (let i = 0; i < this.userList.length; i++) {
        const user2 = this.userList[i];
        if(user2 && user2.userName == userName){
            index = i;
            user = user2;
            break;
        }
    }

    if(!user){
        //已经离开了
        return;
    }

    var socket = onLineClients[userName];

    if(user.isReady || this.game.isGameing){
        console.log(userName+'正在游戏中, 不能离开');
        if(socket)
            socket.emit('serverMsgToClient',{"messageName":"leaveRoom_r",resultMessage:"正在游戏中, 不能离开"});
        return;
    }

    this.userList.splice(index,1);

    this.broadCastOthers(userName,{"messageName":"leaveRoom_s","userName":userName});

    
    if(socket)
        socket.emit('serverMsgToClient',{"messageName":"leaveRoom_r",resultCode:0});
    
    console.log(userName+' leaveRoom '+ this.roomId +'，房间在线人数：'+ this.userList.length);
};

//掉线
GameRoom.prototype.userOffLine = function(userName){
    if(this.game.isGameing){
        var user = this.findUser(userName);
        if(user)
            user.isOnLine = false;
        this.broadCastOthers(userName,{"messageName":"offline_s",resultCode:0,"userName":userName});
    }else{
        this.leaveRoom(userName);
    }
}


GameRoom.prototype.broadCastOthers = function(userName,message){
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        if(user.userName == userName)
            continue;
        var client = onLineClients[user.userName];
        if(client)
            client.emit('serverMsgToClient',message);
    }
}

GameRoom.prototype.broadCast = function(message){
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        var client = onLineClients[user.userName];
        if(client)
            client.emit('serverMsgToClient',message);
    }
}

GameRoom.prototype.userReady = function(userName,isReady){
    console.log(userName+' userReady isReady='+ isReady+" this.maxCount="+this.maxCount);
    var user = this.findUser(userName);
    user.isReady = isReady;
    this.broadCast({"messageName":"userReady_s","isReady":isReady,"userName":userName});

    var socket = onLineClients[userName];
    if(socket)
        socket.emit('serverMsgToClient',{"messageName":"userReady_r","isReady":isReady});

    if(this.userList.length < this.maxCount)
        return;

    var isAllReady = true;
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        if(!user.isReady){
            isAllReady = false;
            break;
        }
    }

    if(isAllReady)
        this.startGame();
}

GameRoom.prototype.startGame = function(){
    this.game.userList = this.userList;
    this.game.startGame();
}

GameRoom.prototype.getRoomInfo = function(){
    var msg = [];
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        if(user){
            msg.push(user.getUserMessage());
        }            
    }
    
    return msg;
}

GameRoom.prototype.findUser = function(userName){
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        if(user && user.userName == userName)
            return user;
    }
    return null;
}


module.exports = GameRoom;
