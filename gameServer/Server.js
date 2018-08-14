var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var GameRoom = require('./GameRoom');

//账号列表
var loginList = new Array();
loginList["shenxing"] = {"name":"shenxing","pwd":"123"};
loginList["shenxing2"] = {"name":"shenxing2","pwd":"123"};

//在线连接
global.onLineClients = new Array();
var onLineClientsNumber = 0;

//在线房间
var gameRoom = new GameRoom("room1",1);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        var name = socket.id;
        if(name && name != undefined && onLineClients[name]){
            gameRoom.userOffLine(name);
            onLineClients[name] = null;
            onLineClientsNumber --;
        }
        console.log(name+' 断开连接，在线人数：'+onLineClientsNumber);
    });
    socket.on('clientMsgToServer', function(msg){
        console.log('clientMsgToServer: ' + msg.messageName);
        handelClientMessage(socket,msg);
    });
});

http.listen(8899, function(){
    console.log('listening on *:8899');
});

function handelClientMessage(socket,msg){
    var messageName = msg.messageName;
    if(messageName === "login"){//登陆
        var name = msg.name;

        if(onLineClients[name] && onLineClients[name] != undefined){//已经存在
            onLineClients[name].emit('serverMsgToClient',{"messageName":messageName+"_s",resultCode:-1001});//被踢出
            onLineClientsNumber --;
            console.log(name+' 被踢，在线人数：'+onLineClientsNumber);
            return;
        }

        var pwd = msg.pwd;
        var obj = loginList[name];
        if(obj && obj != undefined &&obj.pwd ===pwd){//账号密码一致
            socket.id = name;
            onLineClients[name] = socket;
            socket.emit('serverMsgToClient',{"messageName":messageName+"_r",resultCode:0});
            onLineClientsNumber ++;
            console.log(name+' login success，在线人数：'+onLineClientsNumber);
            return;
        }
    }else{
        if(socket.id == undefined){//没登陆过
            socket.emit('serverMsgToClient',{"messageName":messageName+"_r",resultCode:-1000});//没有登陆
            return;
        }else if(messageName === "getAllRoomInfo"){//获取所有房间信息
            socket.emit('serverMsgToClient',{"messageName":"getAllRoomInfo_r",resultCode:0,roomsInfo:{roomId:gameRoom.roomId,curCount:gameRoom.userList.length,maxCount:gameRoom.maxCount}});
            return;
        }else if(messageName === "enterRoom"){//获取所有房间信息
            gameRoom.enterRoom(socket.id);
            return;
        }else if(messageName === "leaveRoom"){//获取所有房间信息
            gameRoom.leaveRoom(socket.id);
            return;
        }else if(messageName === "userReady"){//获取所有房间信息
            gameRoom.userReady(socket.id,msg.isReady);
            return;
        }
    }
}

// var tempArr = new Array();
// tempArr.push(new Object());
// tempArr.push(new Object());
// console.log("tempArr="+tempArr);
// tempArr.splice(0,1);
// console.log("tempArr="+tempArr);
