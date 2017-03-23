/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var extraSel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.extra';
    var buttonSel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.read-more';
    var startingHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    extra = document.querySelector(extraSel);
    button = document.querySelector(buttonSel);
    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        toggleHeight(startingHeight);
    });
};

var extra = null;
var button = null;

var getActualHeight = function getActualHeight() {
    var clone = extra.cloneNode(true);
    clone.style.height = 'auto';
    extra.parentNode.appendChild(clone);
    var height = clone.offsetHeight;
    extra.parentNode.removeChild(clone);
    return height;
};

var toggleHeight = function toggleHeight(height) {
    var autoHeight = 'defaultHeight' in extra.dataset ? extra.dataset.defaultHeight : false;
    if (!autoHeight) {
        autoHeight = getActualHeight();
        extra.dataset.defaultHeight = autoHeight;
    }
    extra.style.height = extra.offsetHeight === height ? autoHeight + 'px' : height + 'px';
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _show_hide = __webpack_require__(0);

var _show_hide2 = _interopRequireDefault(_show_hide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function loaded() {
    (0, _show_hide2.default)();
    window.removeEventListener('DOMConentLoaded', loaded);
});

/***/ })
/******/ ]);