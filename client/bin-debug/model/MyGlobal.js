var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MyGlobal = (function (_super) {
    __extends(MyGlobal, _super);
    function MyGlobal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyGlobal.isReady = false;
    return MyGlobal;
}(egret.DisplayObject));
__reflect(MyGlobal.prototype, "MyGlobal");
//# sourceMappingURL=MyGlobal.js.map