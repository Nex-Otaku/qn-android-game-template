/*
*  Bridge:
*           Javascript -> PhoneGap QSP Plugin
*
*/

var qspLibMode = "PHONEGAP";       // "AIR", "PHONEGAP" - устанавливаем для того, 
                                   // чтобы api.js мог выполнять различный код в зависимости от платформы


var QspLib = {
    
    registerJsCallback: function(callbackFunction, callbackName)
    {
        return cordova.exec(callbackFunction, null, "QspBridge", "registerJsCallback", [callbackName]);
    },

    initLib: function(onInited) {
        return cordova.exec(onInited, null, "QspBridge", "initLib", []);
    },
    
    restartGame: function() {
        return cordova.exec(null, null, "QspBridge", "restartGame", []);
    },
    
    version: function(types, success, fail) {
      return cordova.exec(success, fail, "QspBridge", "version", types);
    },
    
    selectAction: function(index) {
        return cordova.exec(null, null, "QspBridge", "selectAction", [index]);
    },

    executeAction: function(index) {
        return cordova.exec(null, null, "QspBridge", "executeAction", [index]);
    },
    
    selectObject: function(index) {
        return cordova.exec(null, null, "QspBridge", "selectObject", [index]);
    },
    
    loadGame: function() {
        return cordova.exec(null, null, "QspBridge", "loadGame", []);
    },
    
    saveGame: function() {
        return cordova.exec(null, null, "QspBridge", "saveGame", []);
    },
    
    saveSlotSelected: function(index, open) {
        var mode = open ? 1 : 0;
        return cordova.exec(null, null, "QspBridge", "saveSlotSelected", [index, mode]);
    },

    msgResult: function() {
        return cordova.exec(null, null, "QspBridge", "msgResult", []);
    },
    
    errorResult: function() {
        return cordova.exec(null, null, "QspBridge", "errorResult", []);
    },
    
    userMenuResult: function(index) {
        return cordova.exec(null, null, "QspBridge", "userMenuResult", [index]);
    },
    
    inputResult: function(text) {
        return cordova.exec(null, null, "QspBridge", "inputResult", [text]);
    },

    setMute: function(mute) {
        return cordova.exec(null, null, "QspBridge", "setMute", [mute]);
    },
	
	// Для того, чтобы приложение на Андроиде не закрывать по кнопке BACK, а отправлять в фоновый режим
	moveTaskToBackground: function() {
		return cordova.exec(null, null, "QspBridge", "moveTaskToBackground", []);
	}
};


//Функция для предзагрузки картинок (сейчас не используется)
jQuery.preloadImages = function () {
    if (typeof arguments[arguments.length - 1] == 'function') {
        var callback = arguments[arguments.length - 1];
    } else {
        var callback = false;
    }
    if (typeof arguments[0] == 'object') {
        var images = arguments[0];
        var n = images.length;
    } else {
        var images = arguments;
        var n = images.length - 1;
    }
    if (n == 0 && typeof callback == 'function') {
        callback();
        return;
    }
    var not_loaded = n;
    for (var i = 0; i < n; i++) {
    	$(images[i]).imagesLoaded().always(function() {
                                                        if (--not_loaded < 1 && typeof callback == 'function') {
                                                            callback();
                                                        }
                                                        });
    }
}

var qspInitLevel = 0;

function qspInitNext()
{
    setTimeout(function() {
        qspInitLevel++;
        if (qspInitLevel == 1)
            QspLib.initLib(qspInitNext);
        else if (qspInitLevel == 2)
            QspLib.registerJsCallback(qspSetGroupedContent,		"qspSetGroupedContent");    //QspLib4
        else if (qspInitLevel == 3)
            QspLib.registerJsCallback(qspMsg,					"qspMsg");                  //QspLib5
        else if (qspInitLevel == 4)
            QspLib.registerJsCallback(qspView,                	"qspView");                 //QspLib6
        else if (qspInitLevel == 5)
            QspLib.registerJsCallback(qspInput,               	"qspInput");                //QspLib7
        else if (qspInitLevel == 6)
            QspLib.registerJsCallback(qspMenu,                	"qspMenu");                 //QspLib8
        else if (qspInitLevel == 7)
            QspLib.registerJsCallback(qspError,               	"qspError");                //QspLib9
        else if (qspInitLevel == 8)
            QspLib.registerJsCallback(qspShowSaveSlotsDialog,	"qspShowSaveSlotsDialog");  //QspLib10
        else if (qspInitLevel == 9)
            QspLib.restartGame();
        else
        {
            // no more init
        }
    }, 0);
}

function onPhoneGapDeviceReady() {
    // Now safe to use the PhoneGap API
	qspIsAndroid = device.platform === "Android";
	qspIsIos = (device.platform === "iPhone") || (device.platform === "iPad");
	if (qspIsAndroid)
	{
		// Переопределяем поведение кнопки BACK
		document.addEventListener("backbutton", qspBackKeyPressed, false);
		// По кнопке MENU вызываем диалог системного меню
		document.addEventListener("menubutton", qspShowSystemMenu, false);
	}

	// Сообщаем API, что нам стал известен тип устройства.
	qspSetDevice();

	qspInitNext();
}

function qspLibOnInitApi() {
	document.addEventListener("deviceready", onPhoneGapDeviceReady, false);
}