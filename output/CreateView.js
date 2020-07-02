/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/creationView/creation.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/action-sdk-sunny/dist/ActionSDK.min.js":
/*!*************************************************************!*\
  !*** ./node_modules/action-sdk-sunny/dist/ActionSDK.min.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(window,function(){return function(n){var r={};function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=n,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=4)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(2),u=n(3);!function(t){var e=function(){function t(t){this.id=u.Utils.generateGUID(),this.apiType=t}return t.prototype.validate=function(){if(!this.apiType||!Object.values(i.ApiType).includes(this.apiType))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"Request - Invalid apiType!")},t.prototype.setDependentOn=function(t){var e=this;this.dependsOn=this.dependsOn||[],t.forEach(function(t){return e.dependsOn.push(t.id)})},t}();t.Request=e;var n=function(){function t(t,e){this.id=t,this.error=e}return Object.defineProperty(t.prototype,"success",{get:function(){return!this.error},enumerable:!0,configurable:!0}),t}();t.Response=n;var r=function(){function t(t){this.id=u.Utils.generateGUID(),this.requests=t||[]}return t.prototype.validate=function(){if(!this.requests||0==this.requests.length)throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"BatchRequest - There are no request!");this.requests.forEach(function(t){return t.validate()})},t}();t.BatchRequest=r;var o=function(){return function(t,e){this.id=t,this.responses=e}}();t.BatchResponse=o}(e.BaseApi||(e.BaseApi={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.CreateAction="CreateAction",t.UpdateAction="UpdateAction",t.DeleteAction="DeleteAction",t.GetAction="GetAction",t.AddActionDataRow="AddActionDataRow",t.UpdateActionDataRow="UpdateActionDataRow",t.DeleteActionDataRow="DeleteActionDataRow",t.GetActionDataRow="GetActionDataRow",t.GetActionDataRows="GetActionDataRows",t.GetActionDataRowsSummary="GetActionDataRowsSummary",t.DownloadActionDataRowsResult="DownloadActionDataRowsResult",t.GetLocalizedStrings="GetLocalizedStrings",t.GetSubscriptionMembers="GetSubscriptionMembers",t.GetSubscriptionMemberCount="GetSubscriptionMemberCount",t.GetActionSubscriptionNonParticipants="GetActionSubscriptionNonParticipants",t.GetContext="GetContext",t.CloseView="CloseView"}(e.ApiType||(e.ApiType={}))},function(t,e,n){"use strict";var r;Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Unknown="Unknown",t.BatchApiCountLimitExceeded="BatchApiCountLimitExceeded",t.UnsupportedApi="UnsupportedApi",t.InvalidRequest="InvalidRequest",t.ServerError="ServerError"}(r=e.ApiErrorCategory||(e.ApiErrorCategory={})),e.getApiError=function(t,e,n){return{category:t||r.Unknown,code:e,message:n}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(30),o=function(){function t(){}return t.generateGUID=function(){return r.v4()},t.isEmptyString=function(t){return this.isEmptyObject(t)},t.isEmptyObject=function(t){if(null==t||null==t)return!0;var e=!1;return"number"==typeof t||"boolean"==typeof t?e=!1:"string"==typeof t?e=0==t.trim().length:Array.isArray(t)?e=0==t.length:"object"==typeof t&&this.isValidJson(t)&&(e="{}"==JSON.stringify(t)),e},t.isValidJson=function(t){try{return JSON.parse(JSON.stringify(t)),!0}catch(t){return!1}},t}();e.Utils=o},function(t,n,e){"use strict";function r(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0});var o=e(5);n.ActionStatus=o.ActionStatus;var i=e(6);n.Visibility=i.Visibility;var a=e(7);n.ActionPropertyValueType=a.ActionPropertyValueType;var u=e(8);n.ActionPropertyUpdateType=u.ActionPropertyUpdateType;var c=e(9);n.ActionDataColumnValueType=c.ActionDataColumnValueType;var s=e(10);n.SubscriptionType=s.SubscriptionType;var p=e(0);n.BaseApi=p.BaseApi;var f=e(11);n.CreateAction=f.CreateAction;var l=e(12);n.UpdateAction=l.UpdateAction;var d=e(13);n.DeleteAction=d.DeleteAction;var y=e(14);n.GetAction=y.GetAction;var v=e(15);n.AddActionDataRow=v.AddActionDataRow;var h=e(16);n.UpdateActionDataRow=h.UpdateActionDataRow;var A=e(17);n.DeleteActionDataRow=A.DeleteActionDataRow;var _=e(18);n.GetActionDataRow=_.GetActionDataRow;var b=e(19);n.GetActionDataRows=b.GetActionDataRows;var w=e(20);n.GetActionDataRowsSummary=w.GetActionDataRowsSummary;var R=e(21);n.DownloadActionDataRowsResult=R.DownloadActionDataRowsResult;var m=e(22);n.GetLocalizedStrings=m.GetLocalizedStrings;var g=e(23);n.GetSubscriptionMembers=g.GetSubscriptionMembers;var O=e(24);n.GetSubscriptionMemberCount=O.GetSubscriptionMemberCount;var D=e(25);n.GetActionSubscriptionNonParticipants=D.GetActionSubscriptionNonParticipants;var S=e(26);n.GetContext=S.GetContext;var P=e(27);n.CloseView=P.CloseView,r(e(2)),r(e(28));var I=e(1);n.ApiType=I.ApiType},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Active="Active",t.Expired="Expired",t.Closed="Closed"}(e.ActionStatus||(e.ActionStatus={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Sender="Sender",t.All="All"}(e.Visibility||(e.Visibility={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Text="Text",t.Numeric="Numeric",t.Location="Location",t.DateTime="DateTime",t.StringSet="StringSet"}(e.ActionPropertyValueType||(e.ActionPropertyValueType={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Update="Update",t.Add="Add",t.Delete="Delete",t.Replace="Replace",t.Append="Append",t.Remove="Remove"}(e.ActionPropertyUpdateType||(e.ActionPropertyUpdateType={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.SingleOption="SingleOption",t.MultiOption="MultiOption",t.Text="Text",t.LargeText="LargeText",t.Numeric="Numeric",t.Location="Location",t.DateTime="DateTime",t.Date="Date",t.UserId="UserId"}(e.ActionDataColumnValueType||(e.ActionDataColumnValueType={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Group="Group",t.User="User"}(e.SubscriptionType||(e.SubscriptionType={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(n){function t(t){var e=n.call(this,i.ApiType.CreateAction)||this;return e.action=t,e}return r(t,n),t.prototype.validate=function(){if(u.Utils.isEmptyObject(this.action))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"CreateAction - Invalid action!")},t}(o.BaseApi.Request);t.Request=e;var n=function(o){function t(t,e,n){var r=o.call(this,t,n)||this;return r.actionId=e,r}return r(t,o),t}(o.BaseApi.Response);t.Response=n}(e.CreateAction||(e.CreateAction={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(n){function t(t){var e=n.call(this,i.ApiType.UpdateAction)||this;return e.actionUpdateInfo=t,e}return r(t,n),t.prototype.validate=function(){if(u.Utils.isEmptyObject(this.actionUpdateInfo)||u.Utils.isEmptyString(this.actionUpdateInfo.id))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"UpdateAction - Invalid actionUpdateInfo!")},t}(o.BaseApi.Request);t.Request=e;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e}(o.BaseApi.Response);t.Response=n}(e.UpdateAction||(e.UpdateAction={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(n){function t(t){var e=n.call(this,i.ApiType.DeleteAction)||this;return e.actionId=t,e}return r(t,n),t.prototype.validate=function(){if(u.Utils.isEmptyString(this.actionId))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"DeleteAction - Invalid actionId!")},t}(o.BaseApi.Request);t.Request=e;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e}(o.BaseApi.Response);t.Response=n}(e.DeleteAction||(e.DeleteAction={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(n){function t(t){var e=n.call(this,i.ApiType.GetAction)||this;return e.actionId=t,e}return r(t,n),t.prototype.validate=function(){if(u.Utils.isEmptyString(this.actionId))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"GetAction - Invalid actionId!")},t}(o.BaseApi.Request);t.Request=e;var n=function(o){function t(t,e,n){var r=o.call(this,t,n)||this;return r.action=e,r}return r(t,o),t}(o.BaseApi.Response);t.Response=n}(e.GetAction||(e.GetAction={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(n){function t(t){var e=n.call(this,i.ApiType.AddActionDataRow)||this;return e.dataRow=t,e}return r(t,n),t.prototype.validate=function(){if(u.Utils.isEmptyObject(this.dataRow)||u.Utils.isEmptyString(this.dataRow.actionId)||u.Utils.isEmptyObject(this.dataRow.columnValues))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"AddActionDataRow - Invalid dataRow!")},t}(o.BaseApi.Request);t.Request=e;var n=function(o){function t(t,e,n){var r=o.call(this,t,n)||this;return r.dataRowId=e,r}return r(t,o),t}(o.BaseApi.Response);t.Response=n}(e.AddActionDataRow||(e.AddActionDataRow={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(n){function t(t){var e=n.call(this,i.ApiType.UpdateActionDataRow)||this;return e.dataRow=t,e}return r(t,n),t.prototype.validate=function(){if(u.Utils.isEmptyObject(this.dataRow)||u.Utils.isEmptyString(this.dataRow.actionId)||u.Utils.isEmptyObject(this.dataRow.columnValues))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"UpdateActionDataRow - Invalid dataRow!")},t}(o.BaseApi.Request);t.Request=e;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e}(o.BaseApi.Response);t.Response=n}(e.UpdateActionDataRow||(e.UpdateActionDataRow={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(o){function t(t,e,n){var r=o.call(this,i.ApiType.DeleteActionDataRow)||this;return r.actionId=t,r.dataTableName=n,r.dataRowId=e,r}return r(t,o),t.prototype.validate=function(){if(u.Utils.isEmptyString(this.actionId)||u.Utils.isEmptyString(this.dataRowId))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"DeleteActionDataRow - Invalid actionId/dataRowId!")},t}(o.BaseApi.Request);t.Request=e;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e}(o.BaseApi.Response);t.Response=n}(e.DeleteActionDataRow||(e.DeleteActionDataRow={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(o){function t(t,e,n){var r=o.call(this,i.ApiType.GetActionDataRow)||this;return r.actionId=t,r.dataTableName=n,r.dataRowId=e,r}return r(t,o),t.prototype.validate=function(){if(u.Utils.isEmptyString(this.actionId)||u.Utils.isEmptyString(this.dataRowId))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"GetActionDataRow - Invalid actionId/dataRowId!")},t}(o.BaseApi.Request);t.Request=e;var n=function(o){function t(t,e,n){var r=o.call(this,t,n)||this;return r.dataRow=e,r}return r(t,o),t}(o.BaseApi.Response);t.Response=n}(e.GetActionDataRow||(e.GetActionDataRow={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),u=n(1),i=n(2),c=n(3);!function(t){var e=function(a){function t(t,e,n,r,o){var i=a.call(this,u.ApiType.GetActionDataRows)||this;return i.actionId=t,i.dataTableName=o,i.creatorId=e,i.continuationToken=n,i.pageSize=r||30,i}return r(t,a),t.prototype.validate=function(){if(c.Utils.isEmptyString(this.actionId))throw i.getApiError(i.ApiErrorCategory.InvalidRequest,null,"GetActionDataRows - Invalid actionId!")},t}(o.BaseApi.Request);t.Request=e;var n=function(i){function t(t,e,n,r){var o=i.call(this,t,r)||this;return o.dataRows=e,o.continuationToken=n,o}return r(t,i),t}(o.BaseApi.Response);t.Response=n}(e.GetActionDataRows||(e.GetActionDataRows={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(o){function t(t,e,n){var r=o.call(this,i.ApiType.GetActionDataRowsSummary)||this;return r.actionId=t,r.dataTableName=n,r.addDefaultAggregates=e||!1,r}return r(t,o),t.prototype.validate=function(){if(u.Utils.isEmptyString(this.actionId))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"GetActionDataRowsSummary - Invalid actionId!")},t}(o.BaseApi.Request);t.Request=e;var n=function(o){function t(t,e,n){var r=o.call(this,t,n)||this;return r.summary=e,r}return r(t,o),t}(o.BaseApi.Response);t.Response=n}(e.GetActionDataRowsSummary||(e.GetActionDataRowsSummary={}))},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(r){function t(t,e){var n=r.call(this,i.ApiType.DownloadActionDataRowsResult)||this;return n.actionId=t,n.dataTableName=e,n}return o(t,r),t.prototype.validate=function(){if(u.Utils.isEmptyString(this.actionId))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"DownloadActionDataRowsResult - Invalid actionId!")},t}(r.BaseApi.Request);t.Request=e;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e}(r.BaseApi.Response);t.Response=n}(e.DownloadActionDataRowsResult||(e.DownloadActionDataRowsResult={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1);!function(t){var e=function(t){function e(){return t.call(this,i.ApiType.GetLocalizedStrings)||this}return r(e,t),e}(o.BaseApi.Request);t.Request=e;var n=function(o){function t(t,e,n){var r=o.call(this,t,n)||this;return r.strings=e,r}return r(t,o),t}(o.BaseApi.Response);t.Response=n}(e.GetLocalizedStrings||(e.GetLocalizedStrings={}))},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(r){function t(t,e){var n=r.call(this,i.ApiType.GetSubscriptionMembers)||this;return n.subscription=t,n.memberIds=e,n}return o(t,r),t.prototype.validate=function(){if(u.Utils.isEmptyObject(this.subscription)||u.Utils.isEmptyObject(this.memberIds))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"GetActionSubscriptionMembers - Invalid subscription/memberIds!")},t}(r.BaseApi.Request);t.Request=e;var n=function(i){function t(t,e,n,r){var o=i.call(this,t,r)||this;return o.members=e,o.memberIdsNotFound=n,o}return o(t,i),t}(r.BaseApi.Response);t.Response=n}(e.GetSubscriptionMembers||(e.GetSubscriptionMembers={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(n){function t(t){var e=n.call(this,i.ApiType.GetSubscriptionMemberCount)||this;return e.subscription=t,e}return r(t,n),t.prototype.validate=function(){if(u.Utils.isEmptyObject(this.subscription))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"GetSubscriptionMemberCount - Invalid subscription!")},t}(o.BaseApi.Request);t.Request=e;var n=function(o){function t(t,e,n){var r=o.call(this,t,n)||this;return r.memberCount=e,r}return r(t,o),t}(o.BaseApi.Response);t.Response=n}(e.GetSubscriptionMemberCount||(e.GetSubscriptionMemberCount={}))},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(1),a=n(2),u=n(3);!function(t){var e=function(r){function t(t,e){var n=r.call(this,i.ApiType.GetActionSubscriptionNonParticipants)||this;return n.actionId=t,n.subscriptionId=e,n}return o(t,r),t.prototype.validate=function(){if(u.Utils.isEmptyString(this.actionId))throw a.getApiError(a.ApiErrorCategory.InvalidRequest,null,"GetActionSubscriptionNonParticipants - Invalid actionId!")},t}(r.BaseApi.Request);t.Request=e;var n=function(i){function t(t,e,n,r){var o=i.call(this,t,r)||this;return o.nonParticipants=e,o.nonParticipantCount=n,o}return o(t,i),t}(r.BaseApi.Response);t.Response=n}(e.GetActionSubscriptionNonParticipants||(e.GetActionSubscriptionNonParticipants={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1);!function(t){var e=function(t){function e(){return t.call(this,i.ApiType.GetContext)||this}return r(e,t),e}(o.BaseApi.Request);t.Request=e;var n=function(o){function t(t,e,n){var r=o.call(this,t,n)||this;return r.context=e,r}return r(t,o),t}(o.BaseApi.Response);t.Response=n}(e.GetContext||(e.GetContext={}))},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(1);!function(t){var e=function(t){function e(){return t.call(this,i.ApiType.CloseView)||this}return r(e,t),e}(o.BaseApi.Request);t.Request=e;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e}(o.BaseApi.Response);t.Response=n}(e.CloseView||(e.CloseView={}))},function(t,n,e){"use strict";var r=this&&this.__awaiter||function(t,a,n,u){function c(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n=n||Promise)(function(e,n){function r(t){try{i(u.next(t))}catch(t){n(t)}}function o(t){try{i(u.throw(t))}catch(t){n(t)}}function i(t){t.done?e(t.value):c(t.value).then(r,o)}i((u=u.apply(t,a||[])).next())})},o=this&&this.__generator||function(t,n){var r,o,i,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},e={next:u(0),throw:u(1),return:u(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function u(e){return function(t){return c([e,t])}}function c(e){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,o&&(i=2&e[0]?o.return:e[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,e[1])).done)return i;switch(o=0,i&&(e=[2&e[0],i.value]),e[0]){case 0:case 1:i=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,o=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(i=0<(i=a.trys).length&&i[i.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!i||e[1]>i[0]&&e[1]<i[3])){a.label=e[1];break}if(6===e[0]&&a.label<i[1]){a.label=i[1],i=e;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(e);break}i[2]&&a.ops.pop(),a.trys.pop();continue}e=n.call(t,a)}catch(t){e=[6,t],o=0}finally{r=i=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}};Object.defineProperty(n,"__esModule",{value:!0});var i=e(0),a=e(2),u=e(29);function c(e){return r(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:if(e.requests.length>n.maxBatchApisCount)throw a.getApiError(a.ApiErrorCategory.BatchApiCountLimitExceeded,null,"Cannot execute more than "+n.maxBatchApisCount+" APIs in a batch!");return[4,u.ActionSdkHostBridge.executeBatchApiRequest(e)];case 1:return[2,t.sent()]}})})}n.maxBatchApisCount=10,n.executeApi=function(e){return r(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,c(new i.BaseApi.BatchRequest([e]))];case 1:return[2,t.sent().responses[0]]}})})},n.executeBatchApi=c},function(t,e,n){"use strict";var o=this&&this.__awaiter||function(t,a,n,u){function c(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n=n||Promise)(function(e,n){function r(t){try{i(u.next(t))}catch(t){n(t)}}function o(t){try{i(u.throw(t))}catch(t){n(t)}}function i(t){t.done?e(t.value):c(t.value).then(r,o)}i((u=u.apply(t,a||[])).next())})},i=this&&this.__generator||function(t,n){var r,o,i,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},e={next:u(0),throw:u(1),return:u(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function u(e){return function(t){return c([e,t])}}function c(e){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,o&&(i=2&e[0]?o.return:e[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,e[1])).done)return i;switch(o=0,i&&(e=[2&e[0],i.value]),e[0]){case 0:case 1:i=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,o=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(i=0<(i=a.trys).length&&i[i.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!i||e[1]>i[0]&&e[1]<i[3])){a.label=e[1];break}if(6===e[0]&&a.label<i[1]){a.label=i[1],i=e;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(e);break}i[2]&&a.ops.pop(),a.trys.pop();continue}e=n.call(t,a)}catch(t){e=[6,t],o=0}finally{r=i=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}};Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.ensureInitialized=function(){this.currentWindow=this.currentWindow||window,this.actionSdkHost=this.actionSdkHost||window.actionSdkHost},t.executeBatchApiRequest=function(n){return o(this,void 0,void 0,function(){var e;return i(this,function(t){switch(t.label){case 0:return this.ensureInitialized(),n.validate(),this.actionSdkHost?[4,this.actionSdkHost.executeBatchApiRequest(n)]:[3,2];case 1:return e=t.sent(),[3,4];case 2:return[4,this.executeIFramedBatchApiRequest(n)];case 3:e=t.sent(),t.label=4;case 4:return[2,e]}})})},t.executeIFramedBatchApiRequest=function(r){return o(this,void 0,void 0,function(){var n=this;return i(this,function(t){return[2,new Promise(function(t,e){n.apiResolves[r.id]=t,n.sendMessageToActionHost(r),n.receiveMessageFromActionHost()})]})})},t.sendMessageToActionHost=function(t){this.currentWindow.parent.postMessage(t,"*")},t.receiveMessageFromActionHost=function(){var n;!this.receivingMessageFromActionHost&&this.currentWindow&&((n=this).currentWindow.addEventListener("message",function(t){var e=t.data;e.id&&n.apiResolves[e.id]&&(0,n.apiResolves[e.id])(e)}),this.receivingMessageFromActionHost=!0)},t.apiResolves={},t.receivingMessageFromActionHost=!1,t}();e.ActionSdkHostBridge=r},function(t,e,n){"use strict";n.r(e);var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),o=new Uint8Array(16);function y(){if(!r)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(o)}for(var i=[],a=0;a<256;++a)i[a]=(a+256).toString(16).substr(1);var v,h,A=function(t,e){var n=e||0;return[i[t[n++]],i[t[n++]],i[t[n++]],i[t[n++]],"-",i[t[n++]],i[t[n++]],"-",i[t[n++]],i[t[n++]],"-",i[t[n++]],i[t[n++]],"-",i[t[n++]],i[t[n++]],i[t[n++]],i[t[n++]],i[t[n++]],i[t[n++]]].join("")},_=0,b=0;function u(t,e,n){var r,o=e&&n||0,i=e||[],a=(t=t||{}).node||v,u=void 0!==t.clockseq?t.clockseq:h;null!=a&&null!=u||(r=t.random||(t.rng||y)(),null==a&&(a=v=[1|r[0],r[1],r[2],r[3],r[4],r[5]]),null==u&&(u=h=16383&(r[6]<<8|r[7])));var c=void 0!==t.msecs?t.msecs:(new Date).getTime(),s=void 0!==t.nsecs?t.nsecs:b+1,p=c-_+(s-b)/1e4;if(p<0&&void 0===t.clockseq&&(u=u+1&16383),(p<0||_<c)&&void 0===t.nsecs&&(s=0),1e4<=s)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");_=c,h=u;var f=(1e4*(268435455&(c+=122192928e5))+(b=s))%4294967296;i[o++]=f>>>24&255,i[o++]=f>>>16&255,i[o++]=f>>>8&255,i[o++]=255&f;var l=c/4294967296*1e4&268435455;i[o++]=l>>>8&255,i[o++]=255&l,i[o++]=l>>>24&15|16,i[o++]=l>>>16&255,i[o++]=u>>>8|128,i[o++]=255&u;for(var d=0;d<6;++d)i[o+d]=a[d];return e||A(i)}function s(t){var e=[];return t.replace(/[a-fA-F0-9]{2}/g,function(t){e.push(parseInt(t,16))}),e}function p(t){t=unescape(encodeURIComponent(t));for(var e=new Array(t.length),n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function c(t,u,c){function e(t,e,n,r){var o=n&&r||0;if("string"==typeof t&&(t=p(t)),"string"==typeof e&&(e=s(e)),!Array.isArray(t))throw TypeError("value must be an array of bytes");if(!Array.isArray(e)||16!==e.length)throw TypeError("namespace must be uuid string or an Array of 16 byte values");var i=c(e.concat(t));if(i[6]=15&i[6]|u,i[8]=63&i[8]|128,n)for(var a=0;a<16;++a)n[o+a]=i[a];return n||A(i)}try{e.name=t}catch(t){}return e.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",e.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",e}function f(t){for(var e,n,r=[],o=32*t.length,i="0123456789abcdef",a=0;a<o;a+=8)e=t[a>>5]>>>a%32&255,n=parseInt(i.charAt(e>>>4&15)+i.charAt(15&e),16),r.push(n);return r}function l(t,e){var n,r,o,i;t[e>>5]|=128<<e%32,t[14+(e+64>>>9<<4)]=e;for(var a=1732584193,u=-271733879,c=-1732584194,s=271733878,p=0;p<t.length;p+=16)a=g(n=a,r=u,o=c,i=s,t[p],7,-680876936),s=g(s,a,u,c,t[p+1],12,-389564586),c=g(c,s,a,u,t[p+2],17,606105819),u=g(u,c,s,a,t[p+3],22,-1044525330),a=g(a,u,c,s,t[p+4],7,-176418897),s=g(s,a,u,c,t[p+5],12,1200080426),c=g(c,s,a,u,t[p+6],17,-1473231341),u=g(u,c,s,a,t[p+7],22,-45705983),a=g(a,u,c,s,t[p+8],7,1770035416),s=g(s,a,u,c,t[p+9],12,-1958414417),c=g(c,s,a,u,t[p+10],17,-42063),u=g(u,c,s,a,t[p+11],22,-1990404162),a=g(a,u,c,s,t[p+12],7,1804603682),s=g(s,a,u,c,t[p+13],12,-40341101),c=g(c,s,a,u,t[p+14],17,-1502002290),a=O(a,u=g(u,c,s,a,t[p+15],22,1236535329),c,s,t[p+1],5,-165796510),s=O(s,a,u,c,t[p+6],9,-1069501632),c=O(c,s,a,u,t[p+11],14,643717713),u=O(u,c,s,a,t[p],20,-373897302),a=O(a,u,c,s,t[p+5],5,-701558691),s=O(s,a,u,c,t[p+10],9,38016083),c=O(c,s,a,u,t[p+15],14,-660478335),u=O(u,c,s,a,t[p+4],20,-405537848),a=O(a,u,c,s,t[p+9],5,568446438),s=O(s,a,u,c,t[p+14],9,-1019803690),c=O(c,s,a,u,t[p+3],14,-187363961),u=O(u,c,s,a,t[p+8],20,1163531501),a=O(a,u,c,s,t[p+13],5,-1444681467),s=O(s,a,u,c,t[p+2],9,-51403784),c=O(c,s,a,u,t[p+7],14,1735328473),a=D(a,u=O(u,c,s,a,t[p+12],20,-1926607734),c,s,t[p+5],4,-378558),s=D(s,a,u,c,t[p+8],11,-2022574463),c=D(c,s,a,u,t[p+11],16,1839030562),u=D(u,c,s,a,t[p+14],23,-35309556),a=D(a,u,c,s,t[p+1],4,-1530992060),s=D(s,a,u,c,t[p+4],11,1272893353),c=D(c,s,a,u,t[p+7],16,-155497632),u=D(u,c,s,a,t[p+10],23,-1094730640),a=D(a,u,c,s,t[p+13],4,681279174),s=D(s,a,u,c,t[p],11,-358537222),c=D(c,s,a,u,t[p+3],16,-722521979),u=D(u,c,s,a,t[p+6],23,76029189),a=D(a,u,c,s,t[p+9],4,-640364487),s=D(s,a,u,c,t[p+12],11,-421815835),c=D(c,s,a,u,t[p+15],16,530742520),a=S(a,u=D(u,c,s,a,t[p+2],23,-995338651),c,s,t[p],6,-198630844),s=S(s,a,u,c,t[p+7],10,1126891415),c=S(c,s,a,u,t[p+14],15,-1416354905),u=S(u,c,s,a,t[p+5],21,-57434055),a=S(a,u,c,s,t[p+12],6,1700485571),s=S(s,a,u,c,t[p+3],10,-1894986606),c=S(c,s,a,u,t[p+10],15,-1051523),u=S(u,c,s,a,t[p+1],21,-2054922799),a=S(a,u,c,s,t[p+8],6,1873313359),s=S(s,a,u,c,t[p+15],10,-30611744),c=S(c,s,a,u,t[p+6],15,-1560198380),u=S(u,c,s,a,t[p+13],21,1309151649),a=S(a,u,c,s,t[p+4],6,-145523070),s=S(s,a,u,c,t[p+11],10,-1120210379),c=S(c,s,a,u,t[p+2],15,718787259),u=S(u,c,s,a,t[p+9],21,-343485551),a=w(a,n),u=w(u,r),c=w(c,o),s=w(s,i);return[a,u,c,s]}function d(t){var e=[];for(e[(t.length>>2)-1]=void 0,r=0;r<e.length;r+=1)e[r]=0;for(var n=8*t.length,r=0;r<n;r+=8)e[r>>5]|=(255&t[r/8])<<r%32;return e}function w(t,e){var n=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(n>>16)<<16|65535&n}function R(t,e){return t<<e|t>>>32-e}function m(t,e,n,r,o,i){return w(R(w(w(e,t),w(r,i)),o),n)}function g(t,e,n,r,o,i,a){return m(e&n|~e&r,t,e,o,i,a)}function O(t,e,n,r,o,i,a){return m(e&r|n&~r,t,e,o,i,a)}function D(t,e,n,r,o,i,a){return m(e^n^r,t,e,o,i,a)}function S(t,e,n,r,o,i,a){return m(n^(e|~r),t,e,o,i,a)}var P=c("v3",48,function(t){if("string"==typeof t){var e=unescape(encodeURIComponent(t));t=new Array(e.length);for(var n=0;n<e.length;n++)t[n]=e.charCodeAt(n)}return f(l(d(t),8*t.length))});function I(t,e,n){var r=e&&n||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var o=(t=t||{}).random||(t.rng||y)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,e)for(var i=0;i<16;++i)e[r+i]=o[i];return e||A(o)}function j(t,e,n,r){switch(t){case 0:return e&n^~e&r;case 1:return e^n^r;case 2:return e&n^e&r^n&r;case 3:return e^n^r}}function E(t,e){return t<<e|t>>>32-e}var G=c("v5",80,function(t){var e=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof t){var r=unescape(encodeURIComponent(t));t=new Array(r.length);for(var o=0;o<r.length;o++)t[o]=r.charCodeAt(o)}t.push(128);for(var i=t.length/4+2,a=Math.ceil(i/16),u=new Array(a),o=0;o<a;o++){u[o]=new Array(16);for(var c=0;c<16;c++)u[o][c]=t[64*o+4*c]<<24|t[64*o+4*c+1]<<16|t[64*o+4*c+2]<<8|t[64*o+4*c+3]}for(u[a-1][14]=8*(t.length-1)/Math.pow(2,32),u[a-1][14]=Math.floor(u[a-1][14]),u[a-1][15]=8*(t.length-1)&4294967295,o=0;o<a;o++){for(var s=new Array(80),p=0;p<16;p++)s[p]=u[o][p];for(p=16;p<80;p++)s[p]=E(s[p-3]^s[p-8]^s[p-14]^s[p-16],1);for(var f=n[0],l=n[1],d=n[2],y=n[3],v=n[4],p=0;p<80;p++)var h=Math.floor(p/20),A=E(f,5)+j(h,l,d,y)+v+e[h]+s[p]>>>0,v=y,y=d,d=E(l,30)>>>0,l=f,f=A;n[0]=n[0]+f>>>0,n[1]=n[1]+l>>>0,n[2]=n[2]+d>>>0,n[3]=n[3]+y>>>0,n[4]=n[4]+v>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]});n.d(e,"v1",function(){return u}),n.d(e,"v3",function(){return P}),n.d(e,"v4",function(){return I}),n.d(e,"v5",function(){return G})}])});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/bytesToUuid.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  return (bth[buf[i + 0]] + bth[buf[i + 1]] + bth[buf[i + 2]] + bth[buf[i + 3]] + '-' + bth[buf[i + 4]] + bth[buf[i + 5]] + '-' + bth[buf[i + 6]] + bth[buf[i + 7]] + '-' + bth[buf[i + 8]] + bth[buf[i + 9]] + '-' + bth[buf[i + 10]] + bth[buf[i + 11]] + bth[buf[i + 12]] + bth[buf[i + 13]] + bth[buf[i + 14]] + bth[buf[i + 15]]).toLowerCase();
}

/* harmony default export */ __webpack_exports__["default"] = (bytesToUuid);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
  \*****************************************************/
/*! exports provided: v1, v3, v4, v5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/esm-browser/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/esm-browser/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/esm-browser/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/md5.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/sha1.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v3.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/esm-browser/md5.js");


var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v35.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
  \***************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");


function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  var bytes = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
    bytes.push(parseInt(hex, 16));
  });
  return bytes;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var off = buf && offset || 0;
    if (typeof value === 'string') value = stringToBytes(value);
    if (typeof namespace === 'string') namespace = uuidToBytes(namespace);

    if (!Array.isArray(value)) {
      throw TypeError('value must be an array of bytes');
    }

    if (!Array.isArray(namespace) || namespace.length !== 16) {
      throw TypeError('namespace must be uuid string or an Array of 16 byte values');
    } // Per 4.3


    var bytes = hashfunc(namespace.concat(value));
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      for (var idx = 0; idx < 16; ++idx) {
        buf[off + idx] = bytes[idx];
      }
    }

    return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");



function v4(options, buf, offset) {
  if (typeof options === 'string') {
    buf = options === 'binary' ? new Uint8Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    var start = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[start + i] = rnds[i];
    }

    return buf;
  }

  return Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v5.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "./src/common/Utils.ts":
/*!*****************************!*\
  !*** ./src/common/Utils.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var uuid = __importStar(__webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js"));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.generateGUID = function () {
        return uuid.v4();
    };
    Utils.isEmptyString = function (str) {
        return this.isEmptyObject(str);
    };
    Utils.isEmptyObject = function (obj) {
        if (obj == undefined || obj == null) {
            return true;
        }
        var isEmpty = false;
        if (typeof obj === "number" || typeof obj === "boolean") {
            isEmpty = false;
        }
        else if (typeof obj === "string") {
            isEmpty = obj.trim().length == 0;
        }
        else if (Array.isArray(obj)) {
            isEmpty = obj.length == 0;
        }
        else if (typeof obj === "object") {
            if (this.isValidJson(obj)) {
                isEmpty = JSON.stringify(obj) == "{}";
            }
        }
        return isEmpty;
    };
    Utils.isValidJson = function (json) {
        try {
            JSON.parse(JSON.stringify(json));
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ }),

/***/ "./src/creationView/EnumContainer.ts":
/*!*******************************************!*\
  !*** ./src/creationView/EnumContainer.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItemState = exports.Status = exports.ChecklistGroupType = exports.ChecklistColumnType = void 0;
var ChecklistColumnType;
(function (ChecklistColumnType) {
    ChecklistColumnType["checklistItem"] = "checklistItem";
    ChecklistColumnType["status"] = "status";
    /*completionTime = "completionTime",
    completionUser = "completionUser",
    latestEditTime = "latestEditTime",
    latestEditUser = "latestEditUser",
    creationTime = "creationTime",
    creationUser = "creationUser",
    deletionTime = "deletionTime",
    deletionUser = "deletionUser",*/
})(ChecklistColumnType = exports.ChecklistColumnType || (exports.ChecklistColumnType = {}));
var ChecklistGroupType;
(function (ChecklistGroupType) {
    ChecklistGroupType["Open"] = "Open";
    ChecklistGroupType["Completed"] = "Completed";
    ChecklistGroupType["Deleted"] = "Deleted";
    ChecklistGroupType["All"] = "All";
})(ChecklistGroupType = exports.ChecklistGroupType || (exports.ChecklistGroupType = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["COMPLETED"] = "COMPLETED";
    Status["DELETED"] = "DELETED";
})(Status = exports.Status || (exports.Status = {}));
var ChecklistItemState;
(function (ChecklistItemState) {
    ChecklistItemState["GENERATED"] = "GENERATED";
    ChecklistItemState["MODIFIED"] = "MODIFIED";
})(ChecklistItemState = exports.ChecklistItemState || (exports.ChecklistItemState = {}));


/***/ }),

/***/ "./src/creationView/creation.ts":
/*!**************************************!*\
  !*** ./src/creationView/creation.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actionSDK = __importStar(__webpack_require__(/*! action-sdk-sunny */ "./node_modules/action-sdk-sunny/dist/ActionSDK.min.js"));
var EnumContainer_1 = __webpack_require__(/*! ./EnumContainer */ "./src/creationView/EnumContainer.ts");
var Utils_1 = __webpack_require__(/*! ../common/Utils */ "./src/common/Utils.ts");
var root = document.getElementById("root");
var bodyDiv = document.createElement("div");
var footerDiv = document.createElement("div");
var itemsCount = 0;
var actionId = "";
var batchReq = [];
var isDeleted = {};
var isCompleted = {};
OnPageLoad();
function createAction(actionPackageId) {
    var columns = createChecklistColumns();
    var action = {
        id: Utils_1.Utils.generateGUID(),
        actionPackageId: actionPackageId,
        version: 1,
        displayName: document.getElementById("ChecklistName")
            .value,
        expiryTime: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        properties: [],
        dataTables: [
            {
                name: "TestDataSet",
                rowsVisibility: actionSDK.Visibility.All,
                rowsEditable: true,
                canUserAddMultipleRows: true,
                dataColumns: columns
            },
        ],
    };
    actionId = action.id;
    var createAction = new actionSDK.CreateAction.Request(action);
    batchReq.push(createAction);
    console.info("CreateAction - Request: " + JSON.stringify(action));
    getAddRowsRequests(actionId);
    console.info("BatchRequest - " + JSON.stringify(batchReq));
    var batchRequest = new actionSDK.BaseApi.BatchRequest(batchReq);
    actionSDK.executeBatchApi(batchRequest)
        .then(function (batchResponse) {
        console.info("Create Action and add rows BatchResponse: " + JSON.stringify(batchResponse));
    })
        .catch(function (error) {
        console.error("Create Action and add rows Error : " + JSON.stringify(error));
    });
}
//Add values for dataRows
function getAddRowsRequests(actionId) {
    var row = {};
    for (var i = itemsCount - 1; i >= 0; i--) {
        var item = document.getElementById(i.toString()).value;
        var itemId = i.toString();
        //Not to add deleted items to rows
        if (isDeleted[i.toString()] == false && (Utils_1.Utils.isEmptyString(item.toString())) == false) {
            var dataRow = {
                id: Utils_1.Utils.generateGUID(),
                actionId: actionId,
                dataTableName: "TestDataSet",
                columnValues: row
            };
            row[EnumContainer_1.ChecklistColumnType.checklistItem.toString()] = item;
            if (isCompleted[itemId] == true) {
                row[EnumContainer_1.ChecklistColumnType.status.toString()] = EnumContainer_1.Status.COMPLETED;
            }
            else {
                row[EnumContainer_1.ChecklistColumnType.status.toString()] = EnumContainer_1.Status.ACTIVE;
            }
            var addRowsRequest = new actionSDK.AddActionDataRow.Request(dataRow);
            console.info("AddActionRow Request -" + i + " " + JSON.stringify(addRowsRequest));
            batchReq.push(addRowsRequest);
            row = {}; //Reset to push next row's data
        }
    }
}
//Add values for dataColumns
function createChecklistColumns() {
    var columns = new Array();
    for (var item in EnumContainer_1.ChecklistColumnType) {
        var checklistCol = {
            name: item,
            valueType: actionSDK.ActionDataColumnValueType.Text,
            displayName: item,
            allowNullValue: true
        };
        if (item.match(EnumContainer_1.ChecklistColumnType.checklistItem) || item.match(EnumContainer_1.ChecklistColumnType.status)) {
            checklistCol.allowNullValue = false;
        }
        if (item.match(EnumContainer_1.ChecklistColumnType.status)) {
            checklistCol.valueType = actionSDK.ActionDataColumnValueType.SingleOption;
            checklistCol.options = [];
            checklistCol.options.push(statusParams(EnumContainer_1.Status.ACTIVE));
            checklistCol.options.push(statusParams(EnumContainer_1.Status.COMPLETED));
            checklistCol.options.push(statusParams(EnumContainer_1.Status.DELETED));
        }
        columns.push(checklistCol);
    }
    return columns;
}
function statusParams(state) {
    var optionActive = {
        name: state.toString(),
        displayName: state.toString(),
    };
    return optionActive;
}
function submitFormNew() {
    actionSDK
        .executeApi(new actionSDK.GetContext.Request())
        .then(function (response) {
        console.info("GetContext - Response: " + JSON.stringify(response));
        createAction(response.context.actionPackageId);
    })
        .catch(function (error) {
        console.error("GetContext - Error: " + error.message);
    });
}
//HTML
function OnPageLoad() {
    root.appendChild(createInputElement("Name your Checklist", "ChecklistName"));
    root.appendChild(bodyDiv);
    root.appendChild(footerDiv);
    var linebreak = document.createElement("br");
    var addItemButton = document.createElement("BUTTON"); // Create a <button> element
    addItemButton.innerHTML = "Add Item";
    var submit = document.createElement("BUTTON"); // Create a <button> element
    submit.innerHTML = "Submit";
    submit.style.float = "right";
    bodyDiv.appendChild(linebreak);
    footerDiv.appendChild(linebreak);
    footerDiv.appendChild(addItemButton);
    footerDiv.appendChild(submit);
    addItemButton.addEventListener("click", function () {
        bodyDiv.appendChild(addItem());
    });
    submit.addEventListener("click", function () {
        submitFormNew();
    });
}
function createInputElement(ph, id) {
    var inputelement = document.createElement("input"); // Create Input Field for Name
    inputelement.setAttribute("type", "text");
    inputelement.setAttribute("id", id);
    inputelement.placeholder = ph;
    return inputelement;
}
function addItem() {
    var itemDiv = document.createElement("div");
    var linebreak = document.createElement("br");
    var item = document.createElement("input");
    item.type = "item";
    item.setAttribute("id", itemsCount.toString());
    item.setAttribute("value", "");
    var itemId = item.id;
    isDeleted[itemId] = false;
    isCompleted[itemId] = false;
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", function () {
        if (checkbox.checked == true) {
            isCompleted[itemId] = true;
        }
        else {
            isCompleted[itemId] = false;
        }
    });
    var del = document.createElement("BUTTON");
    del.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    del.addEventListener("click", function () {
        isDeleted[itemId] = true;
        itemDiv.style.display = "none";
    });
    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(item);
    itemDiv.appendChild(del);
    itemsCount++;
    return itemDiv;
}


/***/ })

/******/ });
//# sourceMappingURL=CreateView.js.map