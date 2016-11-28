module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "74b33f308650cdb3be12"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 2;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3030/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	module.exports = __webpack_require__(94);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(14).Object.getPrototypeOf;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(4)
	  , $getPrototypeOf = __webpack_require__(6);

	__webpack_require__(12)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(5);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(7)
	  , toObject    = __webpack_require__(4)
	  , IE_PROTO    = __webpack_require__(8)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(9)('keys')
	  , uid    = __webpack_require__(11);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(13)
	  , core    = __webpack_require__(14)
	  , fails   = __webpack_require__(23);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(10)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(15)
	  , hide      = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(18)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(22) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(19)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , toPrimitive    = __webpack_require__(25)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(22) && !__webpack_require__(23)(function(){
	  return Object.defineProperty(__webpack_require__(24)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20)
	  , document = __webpack_require__(10).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(20);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(29);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(31);
	var $Object = __webpack_require__(14).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(22), 'Object', {defineProperty: __webpack_require__(18).f});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(33);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(34);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(63);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(35), __esModule: true };

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	__webpack_require__(58);
	module.exports = __webpack_require__(62).f('iterator');

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(37)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(39)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(5);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(40)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(41)
	  , hide           = __webpack_require__(17)
	  , has            = __webpack_require__(7)
	  , Iterators      = __webpack_require__(42)
	  , $iterCreate    = __webpack_require__(43)
	  , setToStringTag = __webpack_require__(56)
	  , getPrototypeOf = __webpack_require__(6)
	  , ITERATOR       = __webpack_require__(57)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(44)
	  , descriptor     = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(56)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(57)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(19)
	  , dPs         = __webpack_require__(45)
	  , enumBugKeys = __webpack_require__(54)
	  , IE_PROTO    = __webpack_require__(8)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(24)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(55).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(18)
	  , anObject = __webpack_require__(19)
	  , getKeys  = __webpack_require__(46);

	module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(47)
	  , enumBugKeys = __webpack_require__(54);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(7)
	  , toIObject    = __webpack_require__(48)
	  , arrayIndexOf = __webpack_require__(51)(false)
	  , IE_PROTO     = __webpack_require__(8)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(49)
	  , defined = __webpack_require__(5);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(50);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(48)
	  , toLength  = __webpack_require__(52)
	  , toIndex   = __webpack_require__(53);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10).document && document.documentElement;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).f
	  , has = __webpack_require__(7)
	  , TAG = __webpack_require__(57)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(9)('wks')
	  , uid        = __webpack_require__(11)
	  , Symbol     = __webpack_require__(10).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	var global        = __webpack_require__(10)
	  , hide          = __webpack_require__(17)
	  , Iterators     = __webpack_require__(42)
	  , TO_STRING_TAG = __webpack_require__(57)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(60)
	  , step             = __webpack_require__(61)
	  , Iterators        = __webpack_require__(42)
	  , toIObject        = __webpack_require__(48);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(39)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(57);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	__webpack_require__(76);
	__webpack_require__(77);
	__webpack_require__(78);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(10)
	  , has            = __webpack_require__(7)
	  , DESCRIPTORS    = __webpack_require__(22)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(41)
	  , META           = __webpack_require__(66).KEY
	  , $fails         = __webpack_require__(23)
	  , shared         = __webpack_require__(9)
	  , setToStringTag = __webpack_require__(56)
	  , uid            = __webpack_require__(11)
	  , wks            = __webpack_require__(57)
	  , wksExt         = __webpack_require__(62)
	  , wksDefine      = __webpack_require__(67)
	  , keyOf          = __webpack_require__(68)
	  , enumKeys       = __webpack_require__(69)
	  , isArray        = __webpack_require__(72)
	  , anObject       = __webpack_require__(19)
	  , toIObject      = __webpack_require__(48)
	  , toPrimitive    = __webpack_require__(25)
	  , createDesc     = __webpack_require__(26)
	  , _create        = __webpack_require__(44)
	  , gOPNExt        = __webpack_require__(73)
	  , $GOPD          = __webpack_require__(75)
	  , $DP            = __webpack_require__(18)
	  , $keys          = __webpack_require__(46)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(74).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(71).f  = $propertyIsEnumerable;
	  __webpack_require__(70).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(40)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(11)('meta')
	  , isObject = __webpack_require__(20)
	  , has      = __webpack_require__(7)
	  , setDesc  = __webpack_require__(18).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(23)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(10)
	  , core           = __webpack_require__(14)
	  , LIBRARY        = __webpack_require__(40)
	  , wksExt         = __webpack_require__(62)
	  , defineProperty = __webpack_require__(18).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(46)
	  , toIObject = __webpack_require__(48);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(46)
	  , gOPS    = __webpack_require__(70)
	  , pIE     = __webpack_require__(71);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 71 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(50);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(48)
	  , gOPN      = __webpack_require__(74).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(47)
	  , hiddenKeys = __webpack_require__(54).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(71)
	  , createDesc     = __webpack_require__(26)
	  , toIObject      = __webpack_require__(48)
	  , toPrimitive    = __webpack_require__(25)
	  , has            = __webpack_require__(7)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(22) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67)('asyncIterator');

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67)('observable');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(80);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(84);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(33);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	module.exports = __webpack_require__(14).Object.setPrototypeOf;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(13);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(83).set});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(20)
	  , anObject = __webpack_require__(19);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(15)(Function.call, __webpack_require__(75).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	var $Object = __webpack_require__(14).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(44)});

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 88 */,
/* 89 */,
/* 90 */
/***/ function(module, exports) {

	module.exports = require("next/css");

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				__webpack_require__(92)(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },
/* 92 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});

		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}

		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 93 */,
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	var _button = __webpack_require__(95);

	var _button2 = _interopRequireDefault(_button);

	var _topElbow = __webpack_require__(96);

	var _topElbow2 = _interopRequireDefault(_topElbow);

	var _bottomElbow = __webpack_require__(121);

	var _bottomElbow2 = _interopRequireDefault(_bottomElbow);

	var _css = __webpack_require__(90);

	var _css2 = _interopRequireDefault(_css);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  return _react2.default.createElement(
	    'div',
	    { className: style },
	    _react2.default.createElement(_topElbow2.default, null),
	    _react2.default.createElement(_bottomElbow2.default, null)
	  );
	};

	var style = (0, _css2.default)({
	  'background-color': 'black',
	  'height': '800px'
	});
	    if (true) {
	      module.hot.accept()

	      var Component = module.exports.default || module.exports
	      Component.__route = "/"

	      if (module.hot.status() !== 'idle') {
	        var components = next.router.components
	        for (var r in components) {
	          if (!components.hasOwnProperty(r)) continue

	          if (components[r].Component.__route === "/") {
	            next.router.update(r, Component)
	          }
	        }
	      }
	    }
	  

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Button = function (_Component) {
	  (0, _inherits3.default)(Button, _Component);

	  function Button(props) {
	    (0, _classCallCheck3.default)(this, Button);
	    return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this, props));
	  }

	  (0, _createClass3.default)(Button, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'button',
	        null,
	        'Hi'
	      );
	    }
	  }]);
	  return Button;
	}(_react.Component);

	exports.default = Button;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(97);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	var _css = __webpack_require__(90);

	var _css2 = _interopRequireDefault(_css);

	var _topLabel = __webpack_require__(102);

	var _topLabel2 = _interopRequireDefault(_topLabel);

	var _elbowBottomLeft = __webpack_require__(120);

	var _elbowBottomLeft2 = _interopRequireDefault(_elbowBottomLeft);

	var _glamor = __webpack_require__(103);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TopElbow = function (_Component) {
	  (0, _inherits3.default)(TopElbow, _Component);

	  function TopElbow(props) {
	    (0, _classCallCheck3.default)(this, TopElbow);
	    return (0, _possibleConstructorReturn3.default)(this, (TopElbow.__proto__ || (0, _getPrototypeOf2.default)(TopElbow)).call(this, props));
	  }

	  (0, _createClass3.default)(TopElbow, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: main },
	        _react2.default.createElement(
	          'div',
	          { className: firstButton },
	          _react2.default.createElement(
	            'a',
	            (0, _extends3.default)({ className: text }, (0, _glamor.style)({ fontFamily: family })),
	            'Button 1'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: elbowAndNav },
	          _react2.default.createElement(_elbowBottomLeft2.default, null),
	          _react2.default.createElement(
	            'div',
	            { className: navBar },
	            _react2.default.createElement('div', { className: segment1 }),
	            _react2.default.createElement('div', { className: segment2 }),
	            _react2.default.createElement('div', { className: segment3 }),
	            _react2.default.createElement('div', { className: end })
	          )
	        )
	      );
	    }
	  }]);
	  return TopElbow;
	}(_react.Component);

	exports.default = TopElbow;


	var firstButton = (0, _css2.default)({
	  'background-color': '#cc99cc',
	  'width': '100px',
	  'height': '40px',
	  'margin-right': '400px'
	});

	var segment1 = (0, _css2.default)({
	  'background-color': '#FFA600',
	  'margin-left': '50px',
	  'width': '100px',
	  'height': '10px'
	});

	var segment2 = (0, _css2.default)({
	  'background-color': '#cc6666',
	  'margin-left': '10px',
	  'width': '300px',
	  'height': '30px'
	});

	var segment3 = (0, _css2.default)({
	  'background-color': '#cc99cc',
	  'margin-left': '10px',
	  'width': '120px',
	  'height': '30px'
	});

	var main = (0, _css2.default)({
	  'display': 'flex',
	  'flex-direction': 'column'
	});

	var navBar = (0, _css2.default)({
	  'display': 'flex',
	  'flex-direction': 'row',
	  'align-items': 'flex-end'
	});

	var elbowAndNav = (0, _css2.default)({
	  'display': 'flex',
	  'flex-direction': 'row',
	  'align-items': 'flex-end'
	});

	var end = (0, _css2.default)({
	  'background-color': '#fc6',
	  'width': '60px',
	  'height': '30px',
	  'margin-left': '10px',
	  'border-bottom-right-radius': '2em',
	  'border-top-right-radius': '2em'
	});

	var text = (0, _css2.default)({
	  'color': 'black',
	  'display': 'flex',
	  'font-size': '160%'
	});

	var family = (0, _glamor.fontFace)({
	  fontFamily: 'Okuda',
	  fontStyle: 'normal',
	  src: "url('https://s3-us-west-2.amazonaws.com/lcars-react/lcars.ttf')"
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(98);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(100);
	module.exports = __webpack_require__(14).Object.assign;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(13);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(101)});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(46)
	  , gOPS     = __webpack_require__(70)
	  , pIE      = __webpack_require__(71)
	  , toObject = __webpack_require__(4)
	  , IObject  = __webpack_require__(49)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(23)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(97);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	var _css = __webpack_require__(90);

	var _css2 = _interopRequireDefault(_css);

	var _glamor = __webpack_require__(103);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TopLabel = function (_Component) {
	  (0, _inherits3.default)(TopLabel, _Component);

	  function TopLabel(props) {
	    (0, _classCallCheck3.default)(this, TopLabel);
	    return (0, _possibleConstructorReturn3.default)(this, (TopLabel.__proto__ || (0, _getPrototypeOf2.default)(TopLabel)).call(this, props));
	  }

	  (0, _createClass3.default)(TopLabel, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: main },
	        _react2.default.createElement('div', { className: leftCap }),
	        _react2.default.createElement('div', { className: segment }),
	        _react2.default.createElement(
	          'div',
	          { className: textArea },
	          _react2.default.createElement(
	            'h1',
	            (0, _extends3.default)({ className: text }, (0, _glamor.style)({ fontFamily: family })),
	            '01:06'
	          )
	        ),
	        _react2.default.createElement('div', { className: rightCap })
	      );
	    }
	  }]);
	  return TopLabel;
	}(_react.Component);

	exports.default = TopLabel;


	var segment = (0, _css2.default)({
	  'background-color': '#cc99cc',
	  'margin-left': '10px',
	  'width': '100px',
	  'height': '40px'
	});

	var text = (0, _css2.default)({
	  'color': '#f90',
	  'display': 'flex',
	  'font-size': '250%'
	});

	var textArea = (0, _css2.default)({
	  'background-color': 'black',
	  'width': '80px',
	  'height': '40px',
	  'align-items': 'center',
	  'display': 'flex',
	  'justify-content': 'center'
	});

	var family = (0, _glamor.fontFace)({
	  fontFamily: 'Okuda',
	  fontStyle: 'normal',
	  src: "url('https://s3-us-west-2.amazonaws.com/lcars-react/lcars.ttf')"
	});

	var main = (0, _css2.default)({
	  'display': 'flex',
	  'flex-direction': 'row',
	  'align-items': 'flex-end'
	});

	var leftCap = (0, _css2.default)({
	  'background-color': '#cc99cc',
	  'width': '40px',
	  'height': '40px',
	  'margin-left': '10px',
	  'border-bottom-left-radius': '2em',
	  'border-top-left-radius': '2em'
	});

	var rightCap = (0, _css2.default)({
	  'background-color': '#cc99cc',
	  'width': '40px',
	  'height': '40px',
	  'border-bottom-right-radius': '2em',
	  'border-top-right-radius': '2em'
	});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.presets = exports.compose = exports.$ = exports.plugins = exports.styleSheet = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.speedy = speedy;
	exports.simulations = simulations;
	exports.simulate = simulate;
	exports.cssLabels = cssLabels;
	exports.isLikeRule = isLikeRule;
	exports.idFor = idFor;
	exports.insertRule = insertRule;
	exports.insertGlobal = insertGlobal;
	exports.rehydrate = rehydrate;
	exports.flush = flush;
	exports.style = style;
	exports.select = select;
	exports.parent = parent;
	exports.merge = merge;
	exports.media = media;
	exports.trackMediaQueryLabels = trackMediaQueryLabels;
	exports.pseudo = pseudo;
	exports.active = active;
	exports.any = any;
	exports.checked = checked;
	exports.disabled = disabled;
	exports.empty = empty;
	exports.enabled = enabled;
	exports._default = _default;
	exports.first = first;
	exports.firstChild = firstChild;
	exports.firstOfType = firstOfType;
	exports.fullscreen = fullscreen;
	exports.focus = focus;
	exports.hover = hover;
	exports.indeterminate = indeterminate;
	exports.inRange = inRange;
	exports.invalid = invalid;
	exports.lastChild = lastChild;
	exports.lastOfType = lastOfType;
	exports.left = left;
	exports.link = link;
	exports.onlyChild = onlyChild;
	exports.onlyOfType = onlyOfType;
	exports.optional = optional;
	exports.outOfRange = outOfRange;
	exports.readOnly = readOnly;
	exports.readWrite = readWrite;
	exports.required = required;
	exports.right = right;
	exports.root = root;
	exports.scope = scope;
	exports.target = target;
	exports.valid = valid;
	exports.visited = visited;
	exports.dir = dir;
	exports.lang = lang;
	exports.not = not;
	exports.nthChild = nthChild;
	exports.nthLastChild = nthLastChild;
	exports.nthLastOfType = nthLastOfType;
	exports.nthOfType = nthOfType;
	exports.after = after;
	exports.before = before;
	exports.firstLetter = firstLetter;
	exports.firstLine = firstLine;
	exports.selection = selection;
	exports.backdrop = backdrop;
	exports.placeholder = placeholder;
	exports.keyframes = keyframes;
	exports.fontFace = fontFace;
	exports.cssFor = cssFor;
	exports.attribsFor = attribsFor;

	var _sheet = __webpack_require__(105);

	var _CSSPropertyOperations = __webpack_require__(106);

	var _clean = __webpack_require__(116);

	var _clean2 = _interopRequireDefault(_clean);

	var _plugins = __webpack_require__(117);

	var _hash = __webpack_require__(119);

	var _hash2 = _interopRequireDefault(_hash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**** stylesheet  ****/

	var styleSheet = exports.styleSheet = new _sheet.StyleSheet();
	// an isomorphic StyleSheet shim. hides all the nitty gritty.

	// /**************** LIFTOFF IN 3... 2... 1... ****************/
	styleSheet.inject(); //eslint-disable-line indent
	// /****************      TO THE MOOOOOOON     ****************/

	// convenience function to toggle speedy
	function speedy(bool) {
	  return styleSheet.speedy(bool);
	}

	// plugins
	// we include these by default
	var plugins = exports.plugins = styleSheet.plugins = new _plugins.PluginSet(_plugins.fallbacks, _plugins.bug20fix, _plugins.prefixes);
	plugins.media = new _plugins.PluginSet(); // neat! media, font-face, keyframes
	plugins.fontFace = new _plugins.PluginSet();
	plugins.keyframes = new _plugins.PluginSet(_plugins.prefixes);

	// define some constants
	var isBrowser = typeof window !== 'undefined';
	var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
	var isTest = process.env.NODE_ENV === 'test';

	/**** simulations  ****/

	// a flag to enable simulation meta tags on dom nodes
	// defaults to true in dev mode. recommend *not* to
	// toggle often.
	var canSimulate = isDev;

	// we use these flags for issuing warnings when simulate is called
	// in prod / in incorrect order
	var warned1 = false,
	    warned2 = false;

	// toggles simulation activity. shouldn't be needed in most cases
	function simulations() {
	  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	  canSimulate = !!bool;
	}

	// use this on dom nodes to 'simulate' pseudoclasses
	// <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
	// you can even send in some weird ones, as long as it's in simple format
	// and matches an existing rule on the element
	// eg simulate('nthChild2', ':hover:active') etc
	function simulate() {
	  for (var _len = arguments.length, pseudos = Array(_len), _key = 0; _key < _len; _key++) {
	    pseudos[_key] = arguments[_key];
	  }

	  pseudos = (0, _clean2.default)(pseudos);
	  if (!pseudos) return {};
	  if (!canSimulate) {
	    if (!warned1) {
	      console.warn('can\'t simulate without once calling simulations(true)'); //eslint-disable-line no-console
	      warned1 = true;
	    }
	    if (!isDev && !isTest && !warned2) {
	      console.warn('don\'t use simulation outside dev'); //eslint-disable-line no-console
	      warned2 = true;
	    }
	    return {};
	  }
	  return pseudos.reduce(function (o, p) {
	    return o['data-simulate-' + simple(p)] = '', o;
	  }, {});
	}

	/**** labels ****/
	// toggle for debug labels.
	// *shouldn't* have to mess with this manually
	var hasLabels = isDev;

	function cssLabels(bool) {
	  hasLabels = !!bool;
	}

	// takes a string, converts to lowercase, strips out nonalphanumeric.
	function simple(str) {
	  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
	}

	// flatten a nested array
	function flatten(inArr) {
	  var arr = [];
	  for (var i = 0; i < inArr.length; i++) {
	    if (Array.isArray(inArr[i])) arr = arr.concat(flatten(inArr[i]));else arr = arr.concat(inArr[i]);
	  }
	  return arr;
	}

	// hashes a string to something 'unique'
	// we use this to generate ids for styles


	function hashify() {
	  for (var _len2 = arguments.length, objs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    objs[_key2] = arguments[_key2];
	  }

	  return (0, _hash2.default)(objs.map(function (x) {
	    return JSON.stringify(x);
	  }).join('')).toString(36);
	}

	// of shape { 'data-css-<id>': ''}
	function isLikeRule(rule) {
	  var keys = Object.keys(rule).filter(function (x) {
	    return x !== 'toString';
	  });
	  if (keys.length !== 1) {
	    return false;
	  }
	  return !!/data\-css\-([a-zA-Z0-9]+)/.exec(keys[0]);
	}

	// extracts id from a { 'data-css-<id>': ''} like object
	function idFor(rule) {
	  var keys = Object.keys(rule).filter(function (x) {
	    return x !== 'toString';
	  });
	  if (keys.length !== 1) throw new Error('not a rule');
	  var regex = /data\-css\-([a-zA-Z0-9]+)/;
	  var match = regex.exec(keys[0]);
	  if (!match) throw new Error('not a rule');
	  return match[1];
	}

	// a simple cache to store generated rules
	var registered = styleSheet.registered = {};
	function register(spec) {
	  if (!registered[spec.id]) {
	    registered[spec.id] = spec;
	  }
	}

	// semi-deeply merge 2 'mega' style objects
	function deepMergeStyles(dest, src) {
	  Object.keys(src).forEach(function (expr) {
	    dest[expr] = dest[expr] || {};
	    Object.keys(src[expr]).forEach(function (type) {
	      dest[expr][type] = dest[expr][type] || {};
	      Object.assign(dest[expr][type], src[expr][type]);
	    });
	  });
	}

	//todo - prevent nested media queries
	function deconstruct(obj) {
	  var ret = [],
	      composesWith = void 0;
	  var plain = {},
	      hasPlain = false;
	  var isSpecial = obj && find(Object.keys(obj), function (x) {
	    return x.charAt(0) === ':' || // pseudos
	    x.charAt(0) === '@' || // media queries; todo - check @media
	    x.indexOf('&') >= 0 || // 'selects'
	    x === 'composes';
	  } // like css modules!
	  );

	  if (isSpecial) {
	    Object.keys(obj).forEach(function (key) {
	      if (key === 'composes') {
	        composesWith = obj[key];
	      } else if (key.charAt(0) === ':') {
	        ret.push({
	          type: 'pseudo',
	          style: obj[key],
	          selector: key
	        });
	      } else if (key.charAt(0) === '@') {
	        ret.push({
	          type: 'media',
	          rules: deconstruct(obj[key]),
	          expr: key.substring(6)
	        });
	      } else if (key.indexOf('&') >= 0) {
	        ret.push({
	          type: 'select',
	          style: Array.isArray(obj[key]) ? Object.assign.apply(Object, [{}].concat(_toConsumableArray(obj[key]))) : obj[key],
	          selector: key
	        });
	      } else {
	        hasPlain = true;
	        plain[key] = obj[key];
	      }
	    });
	    ret = hasPlain ? [plain].concat(_toConsumableArray(ret)) : ret;
	    ret = composesWith ? [composesWith].concat(_toConsumableArray(ret)) : ret;
	    return ret;
	  }
	  return obj;
	}

	function _getRegistered(rule) {
	  if (isLikeRule(rule)) {
	    var ret = registered[idFor(rule)];
	    if (ret == null) {
	      throw new Error('[glamor] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79');
	    }
	    return ret;
	  }
	  return rule;
	}

	// extracts and composes styles from a rule into a 'mega' style
	// with sub styles keyed by media query + 'path'
	function extractStyles() {
	  for (var _len3 = arguments.length, rules = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    rules[_key3] = arguments[_key3];
	  }

	  rules = flatten(rules);
	  var exprs = {};
	  // converts {[data-css-<id>]} to the backing rule

	  rules = rules.map(_getRegistered).map(function (x) {
	    return x.type === 'style' || !x.type ? deconstruct(x.style || x) : x;
	  });

	  rules = flatten(rules).map(_getRegistered); // sigh, this is to handle arrays in `composes`. must make better.

	  rules.forEach(function (rule) {
	    // avoid possible label. todo - cleaner
	    if (typeof rule === 'string') {
	      return;
	    }
	    switch (rule.type) {
	      case 'raw':
	        throw new Error('not implemented');
	      case 'font-face':
	        throw new Error('not implemented');
	      case 'keyframes':
	        throw new Error('not implemented');

	      case 'merge':
	        return deepMergeStyles(exprs, extractStyles(rule.rules));

	      case 'pseudo':
	        if (rule.selector === ':hover' && exprs._ && exprs._['%%%:active'] && !exprs._['%%%:hover']) {
	          console.warn(':active must come after :hover to work correctly'); //eslint-disable-line no-console
	        }
	        return deepMergeStyles(exprs, { _: _defineProperty({}, '%%%' + rule.selector, rule.style) });
	      case 'select':
	        return deepMergeStyles(exprs, { _: _defineProperty({}, '^^^' + rule.selector, rule.style) });
	      case 'parent':
	        return deepMergeStyles(exprs, { _: _defineProperty({}, '***' + rule.selector, rule.style) });

	      case 'style':
	        return deepMergeStyles(exprs, { _: { _: rule.style } });

	      case 'media':
	        return deepMergeStyles(exprs, _defineProperty({}, rule.expr, extractStyles(rule.rules)._));

	      default:
	        return deepMergeStyles(exprs, { _: { _: rule } });
	    }
	  });
	  return exprs;
	}

	// extract label from a rule / style
	function extractLabel(rule) {
	  if (isLikeRule(rule)) {
	    rule = registered[idFor(rule)];
	  }
	  return rule.label || '{:}';
	}

	// given an id / 'path', generate a css selector
	function selector(id, path) {
	  if (path === '_') return '.css-' + id + ',[data-css-' + id + ']';

	  if (path.indexOf('%%%') === 0) {
	    var x = '.css-' + id + path.slice(3) + ',[data-css-' + id + ']' + path.slice(3);
	    if (canSimulate) x += ',.css-' + id + '[data-simulate-' + simple(path) + '],[data-css-' + id + '][data-simulate-' + simple(path) + ']';
	    return x;
	  }

	  if (path.indexOf('***') === 0) {
	    return path.slice(3).split(',').map(function (x) {
	      return x + ' .css-' + id + ',' + x + ' [data-css-' + id + ']';
	    }).join(',');
	  }
	  if (path.indexOf('^^^') === 0) {
	    return path.slice(3).split(',').map(function (x) {
	      return x.indexOf('&') >= 0 ? [x.replace(/\&/mg, '.css-' + id), x.replace(/\&/mg, '[data-css-' + id + ']')].join(',') // todo - make sure each sub selector has an &
	      : '.css-' + id + x + ',[data-css-' + id + ']' + x;
	    }).join(',');
	  }
	}

	function toCSS(_ref4) {
	  var selector = _ref4.selector,
	      style = _ref4.style;

	  var result = plugins.transform({ selector: selector, style: style });
	  return result.selector + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
	}

	function ruleToAst(rule) {
	  var styles = extractStyles(rule);
	  return Object.keys(styles).reduce(function (o, expr) {
	    o[expr] = Object.keys(styles[expr]).map(function (s) {
	      return { selector: selector(rule.id, s), style: styles[expr][s] };
	    });
	    return o;
	  }, {});
	}

	function ruleToCSS(spec) {
	  var css = [];
	  var ast = ruleToAst(spec);
	  // plugins here

	  var _ = ast._,
	      exprs = _objectWithoutProperties(ast, ['_']);

	  if (_) {
	    _.map(toCSS).forEach(function (str) {
	      return css.push(str);
	    });
	  }
	  Object.keys(exprs).forEach(function (expr) {
	    css.push('@media ' + expr + '{' + exprs[expr].map(toCSS).join('') + '}');
	  });
	  return css;
	}

	// this cache to track which rules have
	// been inserted into the stylesheet
	var inserted = styleSheet.inserted = {};

	// and helpers to insert rules into said styleSheet
	function insert(spec) {
	  if (!inserted[spec.id]) {
	    inserted[spec.id] = true;
	    ruleToCSS(spec).map(function (cssRule) {
	      return styleSheet.insert(cssRule);
	    });
	  }
	}

	function insertRule(css) {
	  var spec = {
	    id: hashify(css),
	    css: css,
	    type: 'raw',
	    label: '^'
	  };
	  register(spec);
	  if (!inserted[spec.id]) {
	    styleSheet.insert(spec.css);
	    inserted[spec.id] = true;
	  }
	}

	function insertGlobal(selector, style) {
	  return insertRule(selector + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(style) + '}');
	}

	function insertKeyframe(spec) {
	  if (!inserted[spec.id]) {
	    (function () {
	      var inner = Object.keys(spec.keyframes).map(function (kf) {
	        var result = plugins.keyframes.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
	        return result.name + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
	      }).join('');

	      ['-webkit-', '-moz-', '-o-', ''].forEach(function (prefix) {
	        return styleSheet.insert('@' + prefix + 'keyframes ' + (spec.name + '_' + spec.id) + '{' + inner + '}');
	      });

	      inserted[spec.id] = true;
	    })();
	  }
	}

	function insertFontFace(spec) {
	  if (!inserted[spec.id]) {
	    styleSheet.insert('@font-face{' + (0, _CSSPropertyOperations.createMarkupForStyles)(spec.font) + '}');
	    inserted[spec.id] = true;
	  }
	}

	// rehydrate the insertion cache with ids sent from
	// renderStatic / renderStaticOptimized
	function rehydrate(ids) {
	  // load up ids
	  Object.assign(inserted, ids.reduce(function (o, i) {
	    return o[i] = true, o;
	  }, {}));
	  // assume css loaded separately
	}

	// todo - perf
	var ruleCache = {};
	function toRule(spec) {
	  register(spec);
	  insert(spec);
	  if (ruleCache[spec.id]) {
	    return ruleCache[spec.id];
	  }

	  var ret = _defineProperty({}, 'data-css-' + spec.id, hasLabels ? spec.label || '' : '');
	  Object.defineProperty(ret, 'toString', {
	    enumerable: false, value: function value() {
	      return 'css-' + spec.id;
	    }
	  });
	  ruleCache[spec.id] = ret;
	  return ret;
	}

	// clears out the cache and empties the stylesheet
	// best for tests, though there might be some value for SSR.

	function flush() {
	  inserted = styleSheet.inserted = {};
	  registered = styleSheet.registered = {};
	  ruleCache = {};
	  styleSheet.flush();
	  styleSheet.inject();
	}

	function find(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    if (fn(arr[i]) === true) {
	      return true;
	    }
	  }
	  return false;
	}

	function style(obj) {
	  obj = (0, _clean2.default)(obj);

	  return obj ? toRule({
	    id: hashify(obj),
	    type: 'style',
	    style: obj,
	    label: obj.label || '*'
	  }) : {};
	}

	// unique feature
	// when you need to define 'real' css (whatever that may be)
	// https://twitter.com/threepointone/status/756585907877273600
	// https://twitter.com/threepointone/status/756986938033254400
	function select(selector, obj) {
	  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
	    return style(selector);
	  }
	  obj = (0, _clean2.default)(obj);

	  return obj ? toRule({
	    id: hashify(selector, obj),
	    type: 'select',
	    selector: selector,
	    style: obj,
	    label: obj.label || '*'
	  }) : {};
	}

	var $ = exports.$ = select; // bringin' jquery back

	function parent(selector, obj) {
	  obj = (0, _clean2.default)(obj);
	  return obj ? toRule({
	    id: hashify(selector, obj),
	    type: 'parent',
	    selector: selector,
	    style: obj,
	    label: obj.label || '*'
	  }) : {};
	}

	// we define a function to 'merge' styles together.
	// backstory - because of a browser quirk, multiple styles are applied in the order they're
	// defined in the stylesheet, not in the order of application
	// in most cases, this won't case an issue UNTIL IT DOES
	// instead, use merge() to merge styles,
	// with latter styles gaining precedence over former ones

	function merge() {
	  for (var _len4 = arguments.length, rules = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    rules[_key4] = arguments[_key4];
	  }

	  rules = (0, _clean2.default)(rules);
	  return rules ? toRule({
	    id: hashify(extractStyles(rules)),
	    type: 'merge',
	    rules: rules,
	    label: '[' + (typeof rules[0] === 'string' ? rules[0] : rules.map(extractLabel).join(' + ')) + ']'
	  }) : {};
	}

	var compose = exports.compose = merge;

	function media(expr) {
	  for (var _len5 = arguments.length, rules = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	    rules[_key5 - 1] = arguments[_key5];
	  }

	  rules = (0, _clean2.default)(rules);
	  return rules ? toRule({
	    id: hashify(expr, extractStyles(rules)),
	    type: 'media',
	    rules: rules,
	    expr: expr,
	    label: '*mq(' + rules.map(extractLabel).join(' + ') + ')'
	  }) : {};
	}

	var presets = exports.presets = {
	  mobile: '(min-width: 400px)',
	  phablet: '(min-width: 550px)',
	  tablet: '(min-width: 750px)',
	  desktop: '(min-width: 1000px)',
	  hd: '(min-width: 1200px)'
	};

	/**** live media query labels ****/

	// simplest implementation -
	// cycle through the cache, and for every media query
	// find matching elements and update the label
	function updateMediaQueryLabels() {
	  Object.keys(registered).forEach(function (id) {
	    var expr = registered[id].expr;

	    if (expr && hasLabels && window.matchMedia) {
	      (function () {
	        var els = document.querySelectorAll('[data-css-' + id + ']');
	        var match = window.matchMedia(expr).matches ? '✓' : '✕';
	        var regex = /^(✓|✕|\*)mq/;
	        [].concat(_toConsumableArray(els)).forEach(function (el) {
	          return el.setAttribute('data-css-' + id, el.getAttribute('data-css-' + id).replace(regex, match + 'mq'));
	        });
	      })();
	    }
	  });
	}

	// saves a reference to the loop we trigger
	var interval = void 0;

	function trackMediaQueryLabels() {
	  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	  var period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

	  if (bool) {
	    if (interval) {
	      console.warn('already tracking labels, call trackMediaQueryLabels(false) to stop'); // eslint-disable-line no-console
	      return;
	    }
	    interval = setInterval(function () {
	      return updateMediaQueryLabels();
	    }, period);
	  } else {
	    clearInterval(interval);
	    interval = null;
	  }
	}

	// in dev mode, start this up immediately
	if (isDev && isBrowser) {
	  trackMediaQueryLabels(true);
	  // todo - make sure hot loading isn't broken
	  // todo - clearInterval on browser close
	}

	function pseudo(selector, obj) {
	  obj = (0, _clean2.default)(obj);
	  return obj ? toRule({
	    id: hashify(selector, obj),
	    type: 'pseudo',
	    selector: selector,
	    style: obj,
	    label: obj.label || ':*'
	  }) : {};
	}

	// allllll the pseudoclasses

	function active(x) {
	  return pseudo(':active', x);
	}

	function any(x) {
	  return pseudo(':any', x);
	}

	function checked(x) {
	  return pseudo(':checked', x);
	}

	function disabled(x) {
	  return pseudo(':disabled', x);
	}

	function empty(x) {
	  return pseudo(':empty', x);
	}

	function enabled(x) {
	  return pseudo(':enabled', x);
	}

	function _default(x) {
	  return pseudo(':default', x); // note '_default' name
	}

	function first(x) {
	  return pseudo(':first', x);
	}

	function firstChild(x) {
	  return pseudo(':first-child', x);
	}

	function firstOfType(x) {
	  return pseudo(':first-of-type', x);
	}

	function fullscreen(x) {
	  return pseudo(':fullscreen', x);
	}

	function focus(x) {
	  return pseudo(':focus', x);
	}

	function hover(x) {
	  return pseudo(':hover', x);
	}

	function indeterminate(x) {
	  return pseudo(':indeterminate', x);
	}

	function inRange(x) {
	  return pseudo(':in-range', x);
	}

	function invalid(x) {
	  return pseudo(':invalid', x);
	}

	function lastChild(x) {
	  return pseudo(':last-child', x);
	}

	function lastOfType(x) {
	  return pseudo(':last-of-type', x);
	}

	function left(x) {
	  return pseudo(':left', x);
	}

	function link(x) {
	  return pseudo(':link', x);
	}

	function onlyChild(x) {
	  return pseudo(':only-child', x);
	}

	function onlyOfType(x) {
	  return pseudo(':only-of-type', x);
	}

	function optional(x) {
	  return pseudo(':optional', x);
	}

	function outOfRange(x) {
	  return pseudo(':out-of-range', x);
	}

	function readOnly(x) {
	  return pseudo(':read-only', x);
	}

	function readWrite(x) {
	  return pseudo(':read-write', x);
	}

	function required(x) {
	  return pseudo(':required', x);
	}

	function right(x) {
	  return pseudo(':right', x);
	}

	function root(x) {
	  return pseudo(':root', x);
	}

	function scope(x) {
	  return pseudo(':scope', x);
	}

	function target(x) {
	  return pseudo(':target', x);
	}

	function valid(x) {
	  return pseudo(':valid', x);
	}

	function visited(x) {
	  return pseudo(':visited', x);
	}

	// parameterized pseudoclasses
	function dir(p, x) {
	  return pseudo(':dir(' + p + ')', x);
	}
	function lang(p, x) {
	  return pseudo(':lang(' + p + ')', x);
	}
	function not(p, x) {
	  // should this be a plugin?
	  var selector = p.split(',').map(function (x) {
	    return x.trim();
	  }).map(function (x) {
	    return ':not(' + x + ')';
	  });
	  if (selector.length === 1) {
	    return pseudo(':not(' + p + ')', x);
	  }
	  return select(selector.join(''), x);
	}
	function nthChild(p, x) {
	  return pseudo(':nth-child(' + p + ')', x);
	}
	function nthLastChild(p, x) {
	  return pseudo(':nth-last-child(' + p + ')', x);
	}
	function nthLastOfType(p, x) {
	  return pseudo(':nth-last-of-type(' + p + ')', x);
	}
	function nthOfType(p, x) {
	  return pseudo(':nth-of-type(' + p + ')', x);
	}

	// pseudoelements
	function after(x) {
	  return pseudo('::after', x);
	}
	function before(x) {
	  return pseudo('::before', x);
	}
	function firstLetter(x) {
	  return pseudo('::first-letter', x);
	}
	function firstLine(x) {
	  return pseudo('::first-line', x);
	}
	function selection(x) {
	  return pseudo('::selection', x);
	}
	function backdrop(x) {
	  return pseudo('::backdrop', x);
	}
	function placeholder(x) {
	  // https://github.com/threepointone/glamor/issues/14
	  return merge(pseudo('::placeholder', x), pseudo('::-webkit-input-placeholder', x), pseudo('::-moz-placeholder', x), pseudo('::-ms-input-placeholder', x));
	}

	// we can add keyframes in a similar manner, but still generating a unique name
	// for including in styles. this gives us modularity, but still a natural api
	function keyframes(name, kfs) {
	  if (!kfs) {
	    kfs = name, name = 'animation';
	  }

	  // do not ignore empty keyframe definitions for now.
	  kfs = (0, _clean2.default)(kfs) || {};
	  var spec = {
	    id: hashify(name, kfs),
	    type: 'keyframes',
	    name: name,
	    keyframes: kfs
	  };
	  register(spec);
	  insertKeyframe(spec);
	  return name + '_' + spec.id;
	}

	// we don't go all out for fonts as much, giving a simple font loading strategy
	// use a fancier lib if you need moar power
	function fontFace(font) {
	  font = (0, _clean2.default)(font);
	  var spec = {
	    id: hashify(font),
	    type: 'font-face',
	    font: font
	  };
	  register(spec);
	  insertFontFace(spec);

	  return font.fontFamily;
	}

	/*** helpers for web components ***/
	// https://github.com/threepointone/glamor/issues/16

	function cssFor() {
	  for (var _len6 = arguments.length, rules = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	    rules[_key6] = arguments[_key6];
	  }

	  rules = (0, _clean2.default)(rules);
	  return rules ? flatten(rules.map(function (r) {
	    return registered[idFor(r)];
	  }).map(ruleToCSS)).join('') : '';
	}

	function attribsFor() {
	  for (var _len7 = arguments.length, rules = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	    rules[_key7] = arguments[_key7];
	  }

	  rules = (0, _clean2.default)(rules);
	  var htmlAttributes = rules ? rules.map(function (rule) {
	    idFor(rule); // throwaway check for rule
	    var key = Object.keys(rule)[0],
	        value = rule[key];
	    return key + '="' + (value || '') + '"';
	  }).join(' ') : '';

	  return htmlAttributes;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 104 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* 

	high performance StyleSheet for css-in-js systems 

	- uses multiple style tags behind the scenes for millions of rules 
	- uses `insertRule` for appending in production for *much* faster performance
	- 'polyfills' on server side 


	// usage

	import StyleSheet from 'glamor/lib/sheet'
	let styleSheet = new StyleSheet()

	styleSheet.inject() 
	- 'injects' the stylesheet into the page (or into memory if on server)

	styleSheet.insert('#box { border: 1px solid red; }') 
	- appends a css rule into the stylesheet 

	styleSheet.flush() 
	- empties the stylesheet of all its contents


	*/

	function last(arr) {
	  return arr[arr.length - 1];
	}

	function sheetForTag(tag) {
	  if (tag.sheet) {
	    return tag.sheet;
	  }

	  // this weirdness brought to you by firefox 
	  for (var i = 0; i < document.styleSheets.length; i++) {
	    if (document.styleSheets[i].ownerNode === tag) {
	      return document.styleSheets[i];
	    }
	  }
	}

	var isBrowser = typeof window !== 'undefined';
	var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV; //(x => (x === 'development') || !x)(process.env.NODE_ENV)
	var isTest = process.env.NODE_ENV === 'test';

	var oldIE = function () {
	  if (isBrowser) {
	    var div = document.createElement('div');
	    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
	    return div.getElementsByTagName('i').length === 1;
	  }
	}();

	function makeStyleTag() {
	  var tag = document.createElement('style');
	  tag.type = 'text/css';
	  tag.appendChild(document.createTextNode(''));
	  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
	  return tag;
	}

	var StyleSheet = exports.StyleSheet = function () {
	  function StyleSheet() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$speedy = _ref.speedy,
	        speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy,
	        _ref$maxLength = _ref.maxLength,
	        maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

	    _classCallCheck(this, StyleSheet);

	    this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
	    this.sheet = undefined;
	    this.tags = [];
	    this.maxLength = maxLength;
	    this.ctr = 0;
	  }

	  _createClass(StyleSheet, [{
	    key: 'getSheet',
	    value: function getSheet() {
	      return sheetForTag(last(this.tags));
	    }
	  }, {
	    key: 'inject',
	    value: function inject() {
	      var _this = this;

	      if (this.injected) {
	        throw new Error('already injected stylesheet!');
	      }
	      if (isBrowser) {
	        this.tags[0] = makeStyleTag();
	      } else {
	        // server side 'polyfill'. just enough behavior to be useful.
	        this.sheet = {
	          cssRules: [],
	          insertRule: function insertRule(rule) {
	            // enough 'spec compliance' to be able to extract the rules later  
	            // in other words, just the cssText field 
	            _this.sheet.cssRules.push({ cssText: rule });
	          }
	        };
	      }
	      this.injected = true;
	    }
	  }, {
	    key: 'speedy',
	    value: function speedy(bool) {
	      if (this.ctr !== 0) {
	        throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
	      }
	      this.isSpeedy = !!bool;
	    }
	  }, {
	    key: '_insert',
	    value: function _insert(rule) {
	      // this weirdness for perf, and chrome's weird bug 
	      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
	      try {
	        var sheet = this.getSheet();
	        sheet.insertRule(rule, sheet.cssRules.length); // todo - correct index here     
	      } catch (e) {
	        if (isDev) {
	          // might need beter dx for this 
	          console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
	        }
	      }
	    }
	  }, {
	    key: 'insert',
	    value: function insert(rule) {

	      if (isBrowser) {
	        // this is the ultrafast version, works across browsers 
	        if (this.isSpeedy && this.getSheet().insertRule) {
	          this._insert(rule);
	        }
	        // more browser weirdness. I don't even know    
	        // else if(this.tags.length > 0 && this.tags::last().styleSheet) {      
	        //   this.tags::last().styleSheet.cssText+= rule
	        // }
	        else {
	            last(this.tags).appendChild(document.createTextNode(rule));
	          }
	      } else {
	        // server side is pretty simple         
	        this.sheet.insertRule(rule);
	      }

	      this.ctr++;
	      if (isBrowser && this.ctr % this.maxLength === 0) {
	        this.tags.push(makeStyleTag());
	      }
	      return this.ctr - 1;
	    }
	    // commenting this out till we decide on v3's decision 
	    // _replace(index, rule) {
	    //   // this weirdness for perf, and chrome's weird bug 
	    //   // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
	    //   try {  
	    //     let sheet = this.getSheet()        
	    //     sheet.deleteRule(index) // todo - correct index here     
	    //     sheet.insertRule(rule, index)
	    //   }
	    //   catch(e) {
	    //     if(isDev) {
	    //       // might need beter dx for this 
	    //       console.warn('whoops, problem replacing rule', rule) //eslint-disable-line no-console
	    //     }          
	    //   }          

	    // }
	    // replace(index, rule) {
	    //   if(isBrowser) {
	    //     if(this.isSpeedy && this.getSheet().insertRule) {
	    //       this._replace(index, rule)
	    //     }
	    //     else {
	    //       let _slot = Math.floor((index  + this.maxLength) / this.maxLength) - 1        
	    //       let _index = (index % this.maxLength) + 1
	    //       let tag = this.tags[_slot]
	    //       tag.replaceChild(document.createTextNode(rule), tag.childNodes[_index])
	    //     }
	    //   }
	    //   else {
	    //     let rules = this.sheet.cssRules
	    //     this.sheet.cssRules = [ ...rules.slice(0, index), { cssText: rule }, ...rules.slice(index + 1) ]
	    //   }
	    // }
	    // delete(index) {
	    //   // we insert a blank rule when 'deleting' so previously returned indexes remain stable
	    //   return this.replace(index, '')
	    // }

	  }, {
	    key: 'flush',
	    value: function flush() {
	      if (isBrowser) {
	        this.tags.forEach(function (tag) {
	          return tag.parentNode.removeChild(tag);
	        });
	        this.tags = [];
	        this.sheet = null;
	        this.ctr = 0;
	        // todo - look for remnants in document.styleSheets
	      } else {
	        // simpler on server 
	        this.sheet.cssRules = [];
	      }
	      this.injected = false;
	    }
	  }, {
	    key: 'rules',
	    value: function rules() {
	      if (!isBrowser) {
	        return this.sheet.cssRules;
	      }
	      var arr = [];
	      this.tags.forEach(function (tag) {
	        return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
	      });
	      return arr;
	    }
	  }]);

	  return StyleSheet;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createMarkupForStyles = createMarkupForStyles;

	var _camelizeStyleName = __webpack_require__(107);

	var _camelizeStyleName2 = _interopRequireDefault(_camelizeStyleName);

	var _dangerousStyleValue = __webpack_require__(109);

	var _dangerousStyleValue2 = _interopRequireDefault(_dangerousStyleValue);

	var _hyphenateStyleName = __webpack_require__(113);

	var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

	var _memoizeStringOnly = __webpack_require__(115);

	var _memoizeStringOnly2 = _interopRequireDefault(_memoizeStringOnly);

	var _warning = __webpack_require__(111);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var processStyleName = (0, _memoizeStringOnly2.default)(_hyphenateStyleName2.default); /**
	                                                                                        * Copyright 2013-present, Facebook, Inc.
	                                                                                        * All rights reserved.
	                                                                                        *
	                                                                                        * This source code is licensed under the BSD-style license found in the
	                                                                                        * LICENSE file in the root directory of this source tree. An additional grant
	                                                                                        * of patent rights can be found in the PATENTS file in the same directory.
	                                                                                        *
	                                                                                        * @providesModule CSSPropertyOperations
	                                                                                        */

	if (process.env.NODE_ENV !== 'production') {
	  var warnValidStyle;

	  (function () {
	    // 'msTransform' is correct, but the other prefixes should be capitalized
	    var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

	    // style values shouldn't contain a semicolon
	    var badStyleValueWithSemicolonPattern = /;\s*$/;

	    var warnedStyleNames = {};
	    var warnedStyleValues = {};
	    var warnedForNaNValue = false;

	    var warnHyphenatedStyleName = function warnHyphenatedStyleName(name, owner) {
	      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	        return;
	      }

	      warnedStyleNames[name] = true;
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported style property %s. Did you mean %s?%s', name, (0, _camelizeStyleName2.default)(name), checkRenderMessage(owner)) : void 0;
	    };

	    var warnBadVendoredStyleName = function warnBadVendoredStyleName(name, owner) {
	      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	        return;
	      }

	      warnedStyleNames[name] = true;
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
	    };

	    var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value, owner) {
	      if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	        return;
	      }

	      warnedStyleValues[value] = true;
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
	    };

	    var warnStyleValueIsNaN = function warnStyleValueIsNaN(name, value, owner) {
	      if (warnedForNaNValue) {
	        return;
	      }

	      warnedForNaNValue = true;
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
	    };

	    var checkRenderMessage = function checkRenderMessage(owner) {
	      if (owner) {
	        var name = owner.getName();
	        if (name) {
	          return ' Check the render method of `' + name + '`.';
	        }
	      }
	      return '';
	    };

	    /**
	     * @param {string} name
	     * @param {*} value
	     * @param {ReactDOMComponent} component
	     */

	    warnValidStyle = function warnValidStyle(name, value, component) {
	      //eslint-disable-line no-var
	      var owner = void 0;
	      if (component) {
	        owner = component._currentElement._owner;
	      }
	      if (name.indexOf('-') > -1) {
	        warnHyphenatedStyleName(name, owner);
	      } else if (badVendoredStyleNamePattern.test(name)) {
	        warnBadVendoredStyleName(name, owner);
	      } else if (badStyleValueWithSemicolonPattern.test(value)) {
	        warnStyleValueWithSemicolon(name, value, owner);
	      }

	      if (typeof value === 'number' && isNaN(value)) {
	        warnStyleValueIsNaN(name, value, owner);
	      }
	    };
	  })();
	}

	/**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @param {ReactDOMComponent} component
	   * @return {?string}
	   */

	function createMarkupForStyles(styles, component) {
	  var serialized = '';
	  for (var styleName in styles) {
	    if (!styles.hasOwnProperty(styleName)) {
	      continue;
	    }
	    var styleValue = styles[styleName];
	    if (process.env.NODE_ENV !== 'production') {
	      warnValidStyle(styleName, styleValue, component);
	    }
	    if (styleValue != null) {
	      serialized += processStyleName(styleName) + ':';
	      serialized += (0, _dangerousStyleValue2.default)(styleName, styleValue, component) + ';';
	    }
	  }
	  return serialized || null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var camelize = __webpack_require__(108);

	var msPattern = /^-ms-/;

	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	}

	module.exports = camelizeStyleName;

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CSSProperty = __webpack_require__(110);

	var _CSSProperty2 = _interopRequireDefault(_CSSProperty);

	var _warning = __webpack_require__(111);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule dangerousStyleValue
	 */

	var isUnitlessNumber = _CSSProperty2.default.isUnitlessNumber;
	var styleWarnings = {};

	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @param {ReactDOMComponent} component
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value, component) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901

	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }

	  var isNonNumeric = isNaN(value);
	  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }

	  if (typeof value === 'string') {
	    if (process.env.NODE_ENV !== 'production') {
	      // Allow '0' to pass through without warning. 0 is already special and
	      // doesn't require units, so we don't need to warn about it.
	      if (component && value !== '0') {
	        var owner = component._currentElement._owner;
	        var ownerName = owner ? owner.getName() : null;
	        if (ownerName && !styleWarnings[ownerName]) {
	          styleWarnings[ownerName] = {};
	        }
	        var warned = false;
	        if (ownerName) {
	          var warnings = styleWarnings[ownerName];
	          warned = warnings[name];
	          if (!warned) {
	            warnings[name] = true;
	          }
	        }
	        if (!warned) {
	          process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
	        }
	      }
	    }
	    value = value.trim();
	  }
	  return value + 'px';
	}

	exports.default = dangerousStyleValue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSProperty
	 */

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */

	var isUnitlessNumber = {
	  animationIterationCount: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridColumn: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundAttachment: true,
	    backgroundColor: true,
	    backgroundImage: true,
	    backgroundPositionX: true,
	    backgroundPositionY: true,
	    backgroundRepeat: true
	  },
	  backgroundPosition: {
	    backgroundPositionX: true,
	    backgroundPositionY: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  },
	  outline: {
	    outlineWidth: true,
	    outlineStyle: true,
	    outlineColor: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	exports.default = CSSProperty;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(112);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 112 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var hyphenate = __webpack_require__(114);

	var msPattern = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}

	module.exports = hyphenateStyleName;

/***/ },
/* 114 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;

/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 */

	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function (string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }
	    return cache[string];
	  };
	}

	module.exports = memoizeStringOnly;

/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = clean;
	// Returns true for null, false, undefined and {}
	function isFalsy(value) {
	  return value === null || value === undefined || value === false || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0;
	}

	function cleanObject(object) {
	  if (isFalsy(object)) return null;
	  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return object;

	  var acc = {},
	      keys = Object.keys(object),
	      hasFalsy = false;
	  for (var i = 0; i < keys.length; i++) {
	    var value = object[keys[i]];
	    var filteredValue = clean(value);
	    if (filteredValue === null || filteredValue !== value) {
	      hasFalsy = true;
	    }
	    if (filteredValue !== null) {
	      acc[keys[i]] = filteredValue;
	    }
	  }
	  return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object;
	}

	function cleanArray(rules) {
	  var hasFalsy = false;
	  var filtered = [];
	  rules.forEach(function (rule) {
	    var filteredRule = clean(rule);
	    if (filteredRule === null || filteredRule !== rule) {
	      hasFalsy = true;
	    }
	    if (filteredRule !== null) {
	      filtered.push(filteredRule);
	    }
	  });
	  return filtered.length == 0 ? null : hasFalsy ? filtered : rules;
	}

	// Takes style array or object provided by user and clears all the falsy data 
	// If there is no styles left after filtration returns null
	function clean(input) {
	  return Array.isArray(input) ? cleanArray(input) : cleanObject(input);
	}

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PluginSet = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.fallbacks = fallbacks;
	exports.prefixes = prefixes;
	exports.bug20fix = bug20fix;

	var _autoprefix = __webpack_require__(118);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var isDev = function (x) {
	  return x === 'development' || !x;
	}(process.env.NODE_ENV);

	var PluginSet = exports.PluginSet = function () {
	  function PluginSet() {
	    _classCallCheck(this, PluginSet);

	    for (var _len = arguments.length, initial = Array(_len), _key = 0; _key < _len; _key++) {
	      initial[_key] = arguments[_key];
	    }

	    this.fns = initial || [];
	  }

	  _createClass(PluginSet, [{
	    key: 'add',
	    value: function add() {
	      var _this = this;

	      for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        fns[_key2] = arguments[_key2];
	      }

	      fns.forEach(function (fn) {
	        if (_this.fns.indexOf(fn) >= 0) {
	          if (isDev) {
	            console.warn('adding the same plugin again, ignoring'); //eslint-disable-line no-console
	          }
	        } else {
	          _this.fns = [fn].concat(_toConsumableArray(_this.fns));
	        }
	      });
	    }
	  }, {
	    key: 'remove',
	    value: function remove(fn) {
	      this.fns = this.fns.filter(function (x) {
	        return x !== fn;
	      });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.fns = [];
	    }
	  }, {
	    key: 'transform',
	    value: function transform(o) {
	      return this.fns.reduce(function (o, fn) {
	        return fn(o);
	      }, o);
	    }
	  }]);

	  return PluginSet;
	}();

	function fallbacks(node) {
	  var hasArray = Object.keys(node.style).map(function (x) {
	    return Array.isArray(node.style[x]);
	  }).indexOf(true) >= 0;
	  if (hasArray) {
	    var _ret = function () {
	      var style = node.style,
	          rest = _objectWithoutProperties(node, ['style']);

	      var flattened = Object.keys(style).reduce(function (o, key) {
	        o[key] = Array.isArray(style[key]) ? style[key].join('; ' + key + ': ') : style[key];
	        return o;
	      }, {});
	      // todo - 
	      // flatten arrays which haven't been flattened yet 
	      return {
	        v: _extends({ style: flattened }, rest)
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  return node;
	}

	function prefixes(_ref) {
	  var style = _ref.style,
	      rest = _objectWithoutProperties(_ref, ['style']);

	  return _extends({ style: (0, _autoprefix.autoprefix)(style) }, rest);
	}

	function bug20fix(_ref2) {
	  var selector = _ref2.selector,
	      style = _ref2.style;

	  // https://github.com/threepointone/glamor/issues/20
	  // todo - only on chrome versions and server side   
	  return { selector: selector.replace(/\:hover/g, ':hover:nth-child(n)'), style: style };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 118 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// forked from https://www.npmjs.com/package/auto-prefixer

	function capitalize(str) {
	  return str && str.charAt(0).toUpperCase() + str.substring(1);
	}

	function includes(obj, search) {
	  if (typeof obj === 'number') {
	    obj = obj.toString();
	  }
	  return obj.indexOf(search) !== -1;
	}

	function values(obj) {
	  return Object.keys(obj).map(function (key) {
	    return obj[key];
	  });
	}

	var webkitPrefix = 'Webkit';
	var mozPrefix = 'Moz';
	var msPrefix = 'ms';
	var oPrefix = 'o';

	var webkit = [webkitPrefix];
	var webkitO = [webkitPrefix, oPrefix];
	var moz = [mozPrefix];
	var ms = [msPrefix];

	var webkitMoz = [webkitPrefix, mozPrefix];
	var webkitMozO = [webkitPrefix, mozPrefix, oPrefix];
	var webkitMozMs = [webkitPrefix, mozPrefix, msPrefix];
	var webkitMs = [webkitPrefix, msPrefix];
	var allPrefixes = [webkitPrefix, msPrefix, mozPrefix, oPrefix];

	var neededRules = {
	  alignContent: webkit,
	  alignItems: webkit,
	  alignSelf: webkit,
	  animation: webkitMoz,
	  animationDelay: webkitMoz,
	  animationDirection: webkitMoz,
	  animationDuration: webkitMoz,
	  animationFillMode: webkitMoz,
	  animationIterationCount: webkitMoz,
	  animationName: webkitMoz,
	  animationPlayState: webkitMoz,
	  animationTimingFunction: webkitMoz,
	  appearance: webkitMoz,
	  backfaceVisibility: webkitMoz,
	  backgroundClip: webkit,
	  borderImage: webkitMozO,
	  borderImageSlice: webkitMozO,
	  boxShadow: webkitMozMs,
	  boxSizing: webkitMoz,
	  clipPath: webkit,
	  columns: webkitMoz,
	  cursor: webkitMoz,
	  flex: webkitMs, //new flex and 2012 specification , no support for old specification
	  flexBasis: webkitMs,
	  flexDirection: webkitMs,
	  flexFlow: webkitMs,
	  flexGrow: webkitMs,
	  flexShrink: webkitMs,
	  flexWrap: webkitMs,
	  fontSmoothing: webkitMoz,
	  justifyContent: webkitMoz,
	  order: webkitMoz,
	  perspective: webkitMoz,
	  perspectiveOrigin: webkitMoz,
	  transform: webkitMozMs,
	  transformOrigin: webkitMozMs,
	  transformOriginX: webkitMozMs,
	  transformOriginY: webkitMozMs,
	  transformOriginZ: webkitMozMs,
	  transformStyle: webkitMozMs,
	  transition: webkitMozMs,
	  transitionDelay: webkitMozMs,
	  transitionDuration: webkitMozMs,
	  transitionProperty: webkitMozMs,
	  transitionTimingFunction: webkitMozMs,
	  userSelect: webkitMozMs
	};

	var neededCssValues = {
	  calc: webkitMoz,
	  flex: webkitMs
	};

	var clientPrefix = function () {
	  if (typeof navigator === 'undefined') {
	    //in server rendering
	    return allPrefixes; //also default when not passing true to 'all vendors' explicitly
	  }
	  var sUsrAg = navigator.userAgent;

	  if (includes(sUsrAg, 'Chrome')) {
	    return webkit;
	  } else if (includes(sUsrAg, 'Safari')) {
	    return webkit;
	  } else if (includes(sUsrAg, 'Opera')) {
	    return webkitO;
	  } else if (includes(sUsrAg, 'Firefox')) {
	    return moz;
	  } else if (includes(sUsrAg, 'MSIE')) {
	    return ms;
	  }

	  return [];
	}();

	function checkAndAddPrefix(styleObj, key, val, allVendors) {
	  var oldFlex = true;

	  function valueWithPrefix(cssVal, prefix) {
	    return includes(val, cssVal) && (allVendors || includes(clientPrefix, prefix)) ? val.replace(cssVal, ['', prefix.toLowerCase(), cssVal].join('-')) : null;
	    //example return -> 'transition: -webkit-transition'
	  }

	  function createObjectOfValuesWithPrefixes(cssVal) {
	    return neededCssValues[cssVal].reduce(function (o, v) {
	      o[v.toLowerCase()] = valueWithPrefix(cssVal, v);
	      return o;
	    }, {});
	    //example return -> {webkit: -webkit-calc(10% - 1px), moz: -moz-calc(10% - 1px)}
	  }

	  function composePrefixedValues(objOfPrefixedValues) {
	    var composed = values(objOfPrefixedValues).filter(function (str) {
	      return str !== null;
	    }).map(function (str) {
	      return key + ':' + str;
	    }).join(';');

	    if (composed) {
	      styleObj[key] = styleObj[key] + ';' + composed;
	    }
	    //example do -> {display: "flex;display:-webkit-flex;display:-ms-flexbox"}
	  }

	  function valWithoutFlex() {
	    return val.replace('flex-', '').toLowerCase();
	  }

	  if (val === 'flex' && key === 'display') {

	    var flex = createObjectOfValuesWithPrefixes('flex');
	    if (flex.ms) {
	      flex.ms = flex.ms.replace('flex', 'flexbox');
	    } //special case

	    composePrefixedValues(flex);
	    //if(oldFlex){styleObj[key] = styleObj[key] + ';display:-webkit-box'; }
	    if (oldFlex) {
	      styleObj[key] = '-webkit-box;display:' + styleObj[key];
	    }

	    //display:flex is simple case, no need for other checks
	    return styleObj;
	  }

	  var allPrefixedCssValues = Object.keys(neededCssValues).filter(function (c) {
	    return c !== 'flex';
	  }).reduce(function (o, c) {
	    o[c] = createObjectOfValuesWithPrefixes(c);
	    return o;
	  }, {});
	  /*
	   example allPrefixedCssValues = {
	   calc: {
	   webkit: "translateX(-webkit-calc(10% - 10px))",
	   moz: "translateX(-moz-calc(10% - 10px))"
	   },
	   flex: {
	   ms: null,
	   webkit: null
	   }
	   };*/

	  //if(includes(val, 'gradient')){
	  //
	  //}

	  if (neededRules[key]) {

	    var prefixes = allVendors ? neededRules[key] : neededRules[key].filter(function (vendor) {
	      return includes(clientPrefix, vendor);
	    });

	    var prefixedProperties = prefixes.reduce(function (obj, prefix) {
	      var property = val;

	      //add valueWithPrefixes in their position and null the property
	      Object.keys(allPrefixedCssValues).forEach(function (cssKey) {
	        var cssVal = allPrefixedCssValues[cssKey];
	        Object.keys(cssVal).forEach(function (vendor) {
	          if (cssVal[vendor] && capitalize(prefix) === capitalize(vendor)) {
	            property = cssVal[vendor];
	            cssVal[vendor] = null;
	          }
	        });
	      });

	      obj[prefix + capitalize(key)] = property;
	      return obj;
	    }, {});

	    if (oldFlex) {
	      switch (key) {
	        case 'flexDirection':
	          if (includes(val, 'reverse')) {
	            prefixedProperties.WebkitBoxDirection = 'reverse';
	          } else {
	            prefixedProperties.WebkitBoxDirection = 'normal';
	          }
	          if (includes(val, 'row')) {
	            prefixedProperties.WebkitBoxOrient = prefixedProperties.boxOrient = 'horizontal';
	          } else if (includes(val, 'column')) {
	            prefixedProperties.WebkitBoxOrient = 'vertical';
	          }
	          break;
	        case 'alignSelf':
	          prefixedProperties.msFlexItemAlign = valWithoutFlex();break;
	        case 'alignItems':
	          prefixedProperties.WebkitBoxAlign = prefixedProperties.msFlexAlign = valWithoutFlex();break;
	        case 'alignContent':
	          if (val === 'spaceAround') {
	            prefixedProperties.msFlexLinePack = 'distribute';
	          } else if (val === 'spaceBetween') {
	            prefixedProperties.msFlexLinePack = 'justify';
	          } else {
	            prefixedProperties.msFlexLinePack = valWithoutFlex();
	          }
	          break;
	        case 'justifyContent':
	          if (val === 'spaceAround') {
	            prefixedProperties.msFlexPack = 'distribute';
	          } else if (val === 'spaceBetween') {
	            prefixedProperties.WebkitBoxPack = prefixedProperties.msFlexPack = 'justify';
	          } else {
	            prefixedProperties.WebkitBoxPack = prefixedProperties.msFlexPack = valWithoutFlex();
	          }
	          break;
	        case 'flexBasis':
	          prefixedProperties.msFlexPreferredSize = val;break;
	        case 'order':
	          prefixedProperties.msFlexOrder = '-moz-calc(' + val + ')'; //ugly hack to prevent react from adding 'px'
	          prefixedProperties.WebkitBoxOrdinalGroup = '-webkit-calc(' + (parseInt(val) + 1) + ')'; //this might not work for browsers who don't support calc
	          break;
	        case 'flexGrow':
	          prefixedProperties.WebkitBoxFlex = prefixedProperties.msFlexPositive = val;break;
	        case 'flexShrink':
	          prefixedProperties.msFlexNegative = val;break;
	        case 'flex':
	          prefixedProperties.WebkitBoxFlex = val;break;
	      }
	    }

	    Object.assign(styleObj, prefixedProperties);
	  }

	  //if valueWithPrefixes were not added before
	  Object.keys(allPrefixedCssValues).forEach(function (cssKey) {
	    composePrefixedValues(allPrefixedCssValues[cssKey]);
	  });
	  return styleObj;
	}

	function autoPrefixer(obj, allVendors) {
	  Object.keys(obj).forEach(function (key) {
	    return obj = checkAndAddPrefix(_extends({}, obj), key, obj[key], allVendors);
	  });
	  return obj;
	}

	function gate(objOrBool) {
	  var optionalBoolean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


	  if (typeof objOrBool === 'boolean') {
	    return function (obj) {
	      return autoPrefixer(obj, objOrBool);
	    };
	  }
	  if (!objOrBool) {
	    return {};
	  } else {
	    return autoPrefixer(objOrBool, optionalBoolean);
	  } // default: don't include all browsers
	}

	var isBrowser = typeof window !== 'undefined';
	var autoprefix = exports.autoprefix = gate(!isBrowser);

/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = doHash;
	// murmurhash2 via https://gist.github.com/raycmorgan/588423

	function doHash(str, seed) {
	  var m = 0x5bd1e995;
	  var r = 24;
	  var h = seed ^ str.length;
	  var length = str.length;
	  var currentIndex = 0;

	  while (length >= 4) {
	    var k = UInt32(str, currentIndex);

	    k = Umul32(k, m);
	    k ^= k >>> r;
	    k = Umul32(k, m);

	    h = Umul32(h, m);
	    h ^= k;

	    currentIndex += 4;
	    length -= 4;
	  }

	  switch (length) {
	    case 3:
	      h ^= UInt16(str, currentIndex);
	      h ^= str.charCodeAt(currentIndex + 2) << 16;
	      h = Umul32(h, m);
	      break;

	    case 2:
	      h ^= UInt16(str, currentIndex);
	      h = Umul32(h, m);
	      break;

	    case 1:
	      h ^= str.charCodeAt(currentIndex);
	      h = Umul32(h, m);
	      break;
	  }

	  h ^= h >>> 13;
	  h = Umul32(h, m);
	  h ^= h >>> 15;

	  return h >>> 0;
	}

	function UInt32(str, pos) {
	  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
	}

	function UInt16(str, pos) {
	  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
	}

	function Umul32(n, m) {
	  n = n | 0;
	  m = m | 0;
	  var nlo = n & 0xffff;
	  var nhi = n >>> 16;
	  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
	  return res;
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	var _css = __webpack_require__(90);

	var _css2 = _interopRequireDefault(_css);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ElbowBottomLeft = function (_Component) {
	  (0, _inherits3.default)(ElbowBottomLeft, _Component);

	  function ElbowBottomLeft(props) {
	    (0, _classCallCheck3.default)(this, ElbowBottomLeft);
	    return (0, _possibleConstructorReturn3.default)(this, (ElbowBottomLeft.__proto__ || (0, _getPrototypeOf2.default)(ElbowBottomLeft)).call(this, props));
	  }

	  (0, _createClass3.default)(ElbowBottomLeft, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: mainElbow },
	        _react2.default.createElement(
	          'div',
	          { className: elbowContainer },
	          _react2.default.createElement('div', { className: button }),
	          _react2.default.createElement(
	            'div',
	            { className: corner },
	            _react2.default.createElement('div', { className: concave })
	          )
	        ),
	        _react2.default.createElement('div', { className: elbow })
	      );
	    }
	  }]);
	  return ElbowBottomLeft;
	}(_react.Component);

	exports.default = ElbowBottomLeft;


	var button = (0, _css2.default)({
	  'background-color': '#99ccff',
	  'width': '100px',
	  'height': '80px',
	  'margin-top': '10px'
	});

	var elbow = (0, _css2.default)({
	  'background-color': '#99ccff',
	  'width': '200px',
	  'height': '30px',
	  'border-bottom-left-radius': '2em'
	});

	var mainElbow = (0, _css2.default)({
	  'display': 'flex',
	  'flex-direction': 'column',
	  'width': '200px'
	});

	var elbowContainer = (0, _css2.default)({
	  'display': 'flex',
	  'flex-direction': 'row',
	  'align-items': 'flex-end'
	});

	var corner = (0, _css2.default)({
	  'background-color': '#99ccff',
	  'width': '30px',
	  'height': '30px',
	  'position': 'relative',
	  'display': 'flex'
	});
	var concave = (0, _css2.default)({
	  'background-color': 'black',
	  'width': '30px',
	  'height': '30px',
	  'border-bottom-left-radius': '2em',
	  'top': 0,
	  'right': 0
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	var _css = __webpack_require__(90);

	var _css2 = _interopRequireDefault(_css);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BottomElbow = function (_Component) {
	  (0, _inherits3.default)(BottomElbow, _Component);

	  function BottomElbow(props) {
	    (0, _classCallCheck3.default)(this, BottomElbow);
	    return (0, _possibleConstructorReturn3.default)(this, (BottomElbow.__proto__ || (0, _getPrototypeOf2.default)(BottomElbow)).call(this, props));
	  }

	  (0, _createClass3.default)(BottomElbow, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: main },
	        _react2.default.createElement(
	          'div',
	          { className: topBar },
	          _react2.default.createElement('div', { className: elbow }),
	          _react2.default.createElement('div', { className: square }),
	          _react2.default.createElement('div', { className: segment1 }),
	          _react2.default.createElement('div', { className: segment2 }),
	          _react2.default.createElement('div', { className: segment3 }),
	          _react2.default.createElement('div', { className: end })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: topBar },
	          _react2.default.createElement(
	            'div',
	            { className: secondary },
	            _react2.default.createElement('div', { className: firstButton }),
	            _react2.default.createElement('div', { className: secondButton }),
	            _react2.default.createElement('div', { className: thirdButton }),
	            _react2.default.createElement('div', { className: fourthButton })
	          ),
	          _react2.default.createElement('div', { className: corner })
	        )
	      );
	    }
	  }]);
	  return BottomElbow;
	}(_react.Component);

	exports.default = BottomElbow;


	var firstButton = (0, _css2.default)({
	  'background-color': '#cc6666',
	  'width': '100px',
	  'height': '80px'
	});

	var secondButton = (0, _css2.default)({
	  'background-color': '#cc6666',
	  'width': '100px',
	  'height': '180px',
	  'margin-top': '10px'
	});

	var thirdButton = (0, _css2.default)({
	  'background-color': '#FFA600',
	  'width': '100px',
	  'height': '30px',
	  'margin-top': '10px'
	});

	var fourthButton = (0, _css2.default)({
	  'background-color': '#cc6666',
	  'width': '100px',
	  'height': '100px',
	  'margin-top': '10px'
	});

	var elbow = (0, _css2.default)({
	  'background-color': '#cc6666',
	  'width': '200px',
	  'height': '30px',
	  'border-top-left-radius': '2em'
	});

	var segment1 = (0, _css2.default)({
	  'background-color': '#cc6666',
	  'margin-left': '10px',
	  'width': '100px',
	  'height': '10px'
	});

	var segment2 = (0, _css2.default)({
	  'background-color': '#fc6',
	  'margin-left': '10px',
	  'width': '300px',
	  'height': '30px'
	});

	var segment3 = (0, _css2.default)({
	  'background-color': '#f90',
	  'margin-left': '10px',
	  'width': '120px',
	  'height': '30px'
	});

	var square = (0, _css2.default)({
	  'background-color': '#f90',
	  'margin-left': '10px',
	  'width': '30px',
	  'height': '30px'
	});
	var main = (0, _css2.default)({
	  'display': 'flex',
	  'margin-top': '10px',
	  'flex-direction': 'column'
	});

	var secondary = (0, _css2.default)({
	  'display': 'flex',
	  'flex-direction': 'column'
	});

	var topBar = (0, _css2.default)({
	  'display': 'flex',
	  'flex-direction': 'row',
	  'align-items': 'flex-start'
	});

	var corner = (0, _css2.default)({
	  'background-color': 'black',
	  'width': '30px',
	  'height': '30px',
	  'border-bottom-left-radius': '2em'
	});

	var end = (0, _css2.default)({
	  'background-color': '#fc6',
	  'width': '60px',
	  'height': '30px',
	  'margin-left': '10px',
	  'border-bottom-right-radius': '2em',
	  'border-top-right-radius': '2em'
	});

/***/ }
/******/ ]);