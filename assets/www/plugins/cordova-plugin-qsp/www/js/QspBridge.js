cordova.define("cordova-plugin-qsp.QspBridge", function(require, exports, module) {
var exec = require('cordova/exec'),
   cordova = require('cordova');

function QspBridge() {

}
QspBridge.prototype.addItem = function(item, classname, successCallback, errorCallback) {
   exec(successCallback, errorCallback, "QspBridge", "addItem", [item, classname]);
};

module.exports = new HybridBridge();
});
