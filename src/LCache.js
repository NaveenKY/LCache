/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*=====================================================
 *
 *	_LCache : A Really Small JavaScript Library
 *	(c) Naveen Kumar 2015
 *
 ======================================================*/

/*	LCache Object Constructor
 ========================*/
var _instance, _data = JSON;
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
            }
            if (!method) {
                throw 'No value provided to be stored.';
            }
            if (!method) {
                throw 'Method not provided.';
            }
        } else {
            if (method === LCache.CREATE) {
                if (this.fetch(key)) {
                    throw 'Data with give key already exists. Please provide new key or use update method to update existing data';
                }
                _data[key] = value;
            } else if (method === LCache.UPDATE) {
                if (!this.fetch(key)) {
                    throw 'Data with given key not avaailable to be update.';
                }
                _data[key] = value;
            } else {
                throw 'Incorrect method name.';
            }
        }
    },
    fetch: function (key) {
        if (!key) {
            throw 'No Key provided to fetch the data.';
        }
        return _data[key];
    },
    remove: function (key) {
        if (!key) {
            throw 'No Key provided to delete the data.';
        }
        return delete _data[key];
    }
};