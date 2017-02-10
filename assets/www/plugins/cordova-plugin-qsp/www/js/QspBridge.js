cordova.define("cordova-plugin-qsp.QspBridge", function(require, exports, module) {
var exec = require('cordova/exec'),
   cordova = require('cordova');

function QspBridge() {

}

QspBridge.prototype.registerJsCallback = function(callbackFunction, callbackName) {
    exec(callbackFunction, null, "QspBridge", "registerJsCallback", [callbackName]);
};

QspBridge.prototype.initLib = function(onInited) {
    exec(onInited, null, "QspBridge", "initLib", []);
};

QspBridge.prototype.restartGame = function(item, classname, successCallback, errorCallback) {
    exec(null, null, "QspBridge", "restartGame", []);
};

QspBridge.prototype.version = function(types, success, fail) {
    exec(success, fail, "QspBridge", "version", types);
};

QspBridge.prototype.selectAction = function(index) {
    exec(null, null, "QspBridge", "selectAction", [index]);
};

QspBridge.prototype.executeAction = function(index) {
    exec(null, null, "QspBridge", "executeAction", [index]);
};

QspBridge.prototype.selectObject = function(index) {
    exec(null, null, "QspBridge", "selectObject", [index]);
};

QspBridge.prototype.loadGame = function() {
    exec(null, null, "QspBridge", "loadGame", []);
};

QspBridge.prototype.saveGame = function() {
    exec(null, null, "QspBridge", "saveGame", []);
};

QspBridge.prototype.saveSlotSelected = function(index, open) {
    var mode = open ? 1 : 0;
    exec(null, null, "QspBridge", "saveSlotSelected", [index, mode]);
};

QspBridge.prototype.msgResult = function() {
    exec(null, null, "QspBridge", "msgResult", []);
};

QspBridge.prototype.errorResult = function(item, classname, successCallback, errorCallback) {
    exec(null, null, "QspBridge", "errorResult", []);
};

QspBridge.prototype.userMenuResult = function(index) {
    exec(null, null, "QspBridge", "userMenuResult", [index]);
};

QspBridge.prototype.inputResult = function(text) {
    exec(null, null, "QspBridge", "inputResult", [text]);
};

QspBridge.prototype.setMute = function(mute) {
    exec(null, null, "QspBridge", "setMute", [mute]);
};

// Для того, чтобы приложение на Андроиде не закрывать по кнопке BACK, а отправлять в фоновый режим
QspBridge.prototype.moveTaskToBackground = function(item, classname, successCallback, errorCallback) {
    exec(null, null, "QspBridge", "moveTaskToBackground", []);
};

module.exports = new QspBridge();
});
