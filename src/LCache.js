/*=====================================================
 *
 *	LCache : A Really Small JavaScript Library
 *	(c) Naveen Kumar 2015
 *
 ======================================================*/

/*	LCache Object Constructor
 =============================*/
var lcache;
window.onload = function(){
	window.lcache = new LCache();
	var script  = document.createElement('script');
	script.src  = 'config.js';
	script.type = 'text/javascript';
	script.defer = true;
	document.getElementsByTagName('head').item(0).appendChild(script);
}
window.onunload = window.onbeforeunload = (function(){
    lcache._data = null;
});
var _instance, _data = new Object();
var LCache = function LCache() {
    if (!_instance) {
        _instance = this;
    }
    return _instance;
};

LCache.CREATE = 'create';
LCache.UPDATE = 'update';

/*	_ Prototype Functions
 ============================*/
LCache.prototype = {
    store: function (key, value, method) {
        if (!key || !value || !method) {
            if (!key) {
                throw 'Key must be provided to store data.';
            } else if (!method) {
                throw 'No value provided to be stored.';
            } else  if (!method) {
                throw 'Method not provided.';
            }
        } else {
            if (method === LCache.CREATE) {
                if (this.fetch(key)) {
                    throw 'Data with give key already exists. Please provide new key or use update method to update existing data';
                }
                var destroyTimer =setInterval(function () {
					delete _data[key]; 
				}, LCache.DATA_LIFE * 60 * 1000);

                return _data[key] = {value:value,timeout:destroyTimer}
            } else if (method === LCache.UPDATE) {
                if (!this.fetch(key)) {
                    throw 'Data with given key not available to be update.';
                }
				window.clearInterval(_data[key].timeout);
				var destroyTimer =setInterval(function () {
					delete _data[key]; 
				}, LCache.DATA_LIFE * 60 *  1000);

                return _data[key] = {value:value,timeout:destroyTimer}
            } else {
                throw 'Incorrect method name.';
            }
        }
    },
    fetch: function (key) {
        if (!key) {
            throw 'No Key provided to fetch the data.';
        }
        return _data[key]?_data[key].value:null;
    },
    remove: function (key) {
        if (!key) {
            throw 'No Key provided to delete the data.';
        }
        return delete _data[key];
    }
};