const CLHH_SERVICE=Object.freeze(__CLHH_SERVICE_CONFIG__);
var Nm=Object.defineProperty;var _m=(e,t,n)=>t in e?Nm(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Qs=(e,t,n)=>_m(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function hd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var gd={exports:{}},ai={},yd={exports:{}},ae={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fs=Symbol.for("react.element"),Cm=Symbol.for("react.portal"),Em=Symbol.for("react.fragment"),Im=Symbol.for("react.strict_mode"),Rm=Symbol.for("react.profiler"),Tm=Symbol.for("react.provider"),Mm=Symbol.for("react.context"),Pm=Symbol.for("react.forward_ref"),Am=Symbol.for("react.suspense"),$m=Symbol.for("react.memo"),Dm=Symbol.for("react.lazy"),Mc=Symbol.iterator;function zm(e){return e===null||typeof e!="object"?null:(e=Mc&&e[Mc]||e["@@iterator"],typeof e=="function"?e:null)}var xd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},vd=Object.assign,wd={};function Ir(e,t,n){this.props=e,this.context=t,this.refs=wd,this.updater=n||xd}Ir.prototype.isReactComponent={};Ir.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ir.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function bd(){}bd.prototype=Ir.prototype;function xa(e,t,n){this.props=e,this.context=t,this.refs=wd,this.updater=n||xd}var va=xa.prototype=new bd;va.constructor=xa;vd(va,Ir.prototype);va.isPureReactComponent=!0;var Pc=Array.isArray,kd=Object.prototype.hasOwnProperty,wa={current:null},Sd={key:!0,ref:!0,__self:!0,__source:!0};function jd(e,t,n){var r,s={},o=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(o=""+t.key),t)kd.call(t,r)&&!Sd.hasOwnProperty(r)&&(s[r]=t[r]);var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){for(var a=Array(c),u=0;u<c;u++)a[u]=arguments[u+2];s.children=a}if(e&&e.defaultProps)for(r in c=e.defaultProps,c)s[r]===void 0&&(s[r]=c[r]);return{$$typeof:Fs,type:e,key:o,ref:l,props:s,_owner:wa.current}}function Lm(e,t){return{$$typeof:Fs,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ba(e){return typeof e=="object"&&e!==null&&e.$$typeof===Fs}function Fm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Ac=/\/+/g;function Ei(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Fm(""+e.key):t.toString(36)}function vo(e,t,n,r,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Fs:case Cm:l=!0}}if(l)return l=e,s=s(l),e=r===""?"."+Ei(l,0):r,Pc(s)?(n="",e!=null&&(n=e.replace(Ac,"$&/")+"/"),vo(s,t,n,"",function(u){return u})):s!=null&&(ba(s)&&(s=Lm(s,n+(!s.key||l&&l.key===s.key?"":(""+s.key).replace(Ac,"$&/")+"/")+e)),t.push(s)),1;if(l=0,r=r===""?".":r+":",Pc(e))for(var c=0;c<e.length;c++){o=e[c];var a=r+Ei(o,c);l+=vo(o,t,n,a,s)}else if(a=zm(e),typeof a=="function")for(e=a.call(e),c=0;!(o=e.next()).done;)o=o.value,a=r+Ei(o,c++),l+=vo(o,t,n,a,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function qs(e,t,n){if(e==null)return e;var r=[],s=0;return vo(e,r,"","",function(o){return t.call(n,o,s++)}),r}function Um(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Je={current:null},wo={transition:null},Bm={ReactCurrentDispatcher:Je,ReactCurrentBatchConfig:wo,ReactCurrentOwner:wa};function Nd(){throw Error("act(...) is not supported in production builds of React.")}ae.Children={map:qs,forEach:function(e,t,n){qs(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return qs(e,function(){t++}),t},toArray:function(e){return qs(e,function(t){return t})||[]},only:function(e){if(!ba(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ae.Component=Ir;ae.Fragment=Em;ae.Profiler=Rm;ae.PureComponent=xa;ae.StrictMode=Im;ae.Suspense=Am;ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Bm;ae.act=Nd;ae.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=vd({},e.props),s=e.key,o=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,l=wa.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(a in t)kd.call(t,a)&&!Sd.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&c!==void 0?c[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){c=Array(a);for(var u=0;u<a;u++)c[u]=arguments[u+2];r.children=c}return{$$typeof:Fs,type:e.type,key:s,ref:o,props:r,_owner:l}};ae.createContext=function(e){return e={$$typeof:Mm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Tm,_context:e},e.Consumer=e};ae.createElement=jd;ae.createFactory=function(e){var t=jd.bind(null,e);return t.type=e,t};ae.createRef=function(){return{current:null}};ae.forwardRef=function(e){return{$$typeof:Pm,render:e}};ae.isValidElement=ba;ae.lazy=function(e){return{$$typeof:Dm,_payload:{_status:-1,_result:e},_init:Um}};ae.memo=function(e,t){return{$$typeof:$m,type:e,compare:t===void 0?null:t}};ae.startTransition=function(e){var t=wo.transition;wo.transition={};try{e()}finally{wo.transition=t}};ae.unstable_act=Nd;ae.useCallback=function(e,t){return Je.current.useCallback(e,t)};ae.useContext=function(e){return Je.current.useContext(e)};ae.useDebugValue=function(){};ae.useDeferredValue=function(e){return Je.current.useDeferredValue(e)};ae.useEffect=function(e,t){return Je.current.useEffect(e,t)};ae.useId=function(){return Je.current.useId()};ae.useImperativeHandle=function(e,t,n){return Je.current.useImperativeHandle(e,t,n)};ae.useInsertionEffect=function(e,t){return Je.current.useInsertionEffect(e,t)};ae.useLayoutEffect=function(e,t){return Je.current.useLayoutEffect(e,t)};ae.useMemo=function(e,t){return Je.current.useMemo(e,t)};ae.useReducer=function(e,t,n){return Je.current.useReducer(e,t,n)};ae.useRef=function(e){return Je.current.useRef(e)};ae.useState=function(e){return Je.current.useState(e)};ae.useSyncExternalStore=function(e,t,n){return Je.current.useSyncExternalStore(e,t,n)};ae.useTransition=function(){return Je.current.useTransition()};ae.version="18.3.1";yd.exports=ae;var S=yd.exports;const _d=hd(S);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Om=S,Wm=Symbol.for("react.element"),Vm=Symbol.for("react.fragment"),Hm=Object.prototype.hasOwnProperty,Km=Om.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Qm={key:!0,ref:!0,__self:!0,__source:!0};function Cd(e,t,n){var r,s={},o=null,l=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)Hm.call(t,r)&&!Qm.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Wm,type:e,key:o,ref:l,props:s,_owner:Km.current}}ai.Fragment=Vm;ai.jsx=Cd;ai.jsxs=Cd;gd.exports=ai;var i=gd.exports,pl={},Ed={exports:{}},dt={},Id={exports:{}},Rd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(T,D){var Y=T.length;T.push(D);e:for(;0<Y;){var M=Y-1>>>1,C=T[M];if(0<s(C,D))T[M]=D,T[Y]=C,Y=M;else break e}}function n(T){return T.length===0?null:T[0]}function r(T){if(T.length===0)return null;var D=T[0],Y=T.pop();if(Y!==D){T[0]=Y;e:for(var M=0,C=T.length,A=C>>>1;M<A;){var q=2*(M+1)-1,$=T[q],W=q+1,H=T[W];if(0>s($,Y))W<C&&0>s(H,$)?(T[M]=H,T[W]=Y,M=W):(T[M]=$,T[q]=Y,M=q);else if(W<C&&0>s(H,Y))T[M]=H,T[W]=Y,M=W;else break e}}return D}function s(T,D){var Y=T.sortIndex-D.sortIndex;return Y!==0?Y:T.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var l=Date,c=l.now();e.unstable_now=function(){return l.now()-c}}var a=[],u=[],f=1,d=null,p=3,y=!1,g=!1,v=!1,k=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(T){for(var D=n(u);D!==null;){if(D.callback===null)r(u);else if(D.startTime<=T)r(u),D.sortIndex=D.expirationTime,t(a,D);else break;D=n(u)}}function b(T){if(v=!1,x(T),!g)if(n(a)!==null)g=!0,L(E);else{var D=n(u);D!==null&&se(b,D.startTime-T)}}function E(T,D){g=!1,v&&(v=!1,h(w),w=-1),y=!0;var Y=p;try{for(x(D),d=n(a);d!==null&&(!(d.expirationTime>D)||T&&!Q());){var M=d.callback;if(typeof M=="function"){d.callback=null,p=d.priorityLevel;var C=M(d.expirationTime<=D);D=e.unstable_now(),typeof C=="function"?d.callback=C:d===n(a)&&r(a),x(D)}else r(a);d=n(a)}if(d!==null)var A=!0;else{var q=n(u);q!==null&&se(b,q.startTime-D),A=!1}return A}finally{d=null,p=Y,y=!1}}var j=!1,N=null,w=-1,_=5,I=-1;function Q(){return!(e.unstable_now()-I<_)}function X(){if(N!==null){var T=e.unstable_now();I=T;var D=!0;try{D=N(!0,T)}finally{D?re():(j=!1,N=null)}}else j=!1}var re;if(typeof m=="function")re=function(){m(X)};else if(typeof MessageChannel<"u"){var O=new MessageChannel,te=O.port2;O.port1.onmessage=X,re=function(){te.postMessage(null)}}else re=function(){k(X,0)};function L(T){N=T,j||(j=!0,re())}function se(T,D){w=k(function(){T(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){g||y||(g=!0,L(E))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(a)},e.unstable_next=function(T){switch(p){case 1:case 2:case 3:var D=3;break;default:D=p}var Y=p;p=D;try{return T()}finally{p=Y}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,D){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var Y=p;p=T;try{return D()}finally{p=Y}},e.unstable_scheduleCallback=function(T,D,Y){var M=e.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?M+Y:M):Y=M,T){case 1:var C=-1;break;case 2:C=250;break;case 5:C=1073741823;break;case 4:C=1e4;break;default:C=5e3}return C=Y+C,T={id:f++,callback:D,priorityLevel:T,startTime:Y,expirationTime:C,sortIndex:-1},Y>M?(T.sortIndex=Y,t(u,T),n(a)===null&&T===n(u)&&(v?(h(w),w=-1):v=!0,se(b,Y-M))):(T.sortIndex=C,t(a,T),g||y||(g=!0,L(E))),T},e.unstable_shouldYield=Q,e.unstable_wrapCallback=function(T){var D=p;return function(){var Y=p;p=D;try{return T.apply(this,arguments)}finally{p=Y}}}})(Rd);Id.exports=Rd;var qm=Id.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gm=S,ut=qm;function U(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Td=new Set,gs={};function Hn(e,t){xr(e,t),xr(e+"Capture",t)}function xr(e,t){for(gs[e]=t,e=0;e<t.length;e++)Td.add(t[e])}var qt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ml=Object.prototype.hasOwnProperty,Xm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,$c={},Dc={};function Ym(e){return ml.call(Dc,e)?!0:ml.call($c,e)?!1:Xm.test(e)?Dc[e]=!0:($c[e]=!0,!1)}function Zm(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Jm(e,t,n,r){if(t===null||typeof t>"u"||Zm(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function et(e,t,n,r,s,o,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=l}var We={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){We[e]=new et(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];We[t]=new et(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){We[e]=new et(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){We[e]=new et(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){We[e]=new et(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){We[e]=new et(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){We[e]=new et(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){We[e]=new et(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){We[e]=new et(e,5,!1,e.toLowerCase(),null,!1,!1)});var ka=/[\-:]([a-z])/g;function Sa(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ka,Sa);We[t]=new et(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ka,Sa);We[t]=new et(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ka,Sa);We[t]=new et(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){We[e]=new et(e,1,!1,e.toLowerCase(),null,!1,!1)});We.xlinkHref=new et("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){We[e]=new et(e,1,!1,e.toLowerCase(),null,!0,!0)});function ja(e,t,n,r){var s=We.hasOwnProperty(t)?We[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Jm(t,n,s,r)&&(n=null),r||s===null?Ym(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Zt=Gm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Gs=Symbol.for("react.element"),Xn=Symbol.for("react.portal"),Yn=Symbol.for("react.fragment"),Na=Symbol.for("react.strict_mode"),hl=Symbol.for("react.profiler"),Md=Symbol.for("react.provider"),Pd=Symbol.for("react.context"),_a=Symbol.for("react.forward_ref"),gl=Symbol.for("react.suspense"),yl=Symbol.for("react.suspense_list"),Ca=Symbol.for("react.memo"),rn=Symbol.for("react.lazy"),Ad=Symbol.for("react.offscreen"),zc=Symbol.iterator;function zr(e){return e===null||typeof e!="object"?null:(e=zc&&e[zc]||e["@@iterator"],typeof e=="function"?e:null)}var je=Object.assign,Ii;function Yr(e){if(Ii===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ii=t&&t[1]||""}return`
`+Ii+e}var Ri=!1;function Ti(e,t){if(!e||Ri)return"";Ri=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var s=u.stack.split(`
`),o=r.stack.split(`
`),l=s.length-1,c=o.length-1;1<=l&&0<=c&&s[l]!==o[c];)c--;for(;1<=l&&0<=c;l--,c--)if(s[l]!==o[c]){if(l!==1||c!==1)do if(l--,c--,0>c||s[l]!==o[c]){var a=`
`+s[l].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=l&&0<=c);break}}}finally{Ri=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Yr(e):""}function eh(e){switch(e.tag){case 5:return Yr(e.type);case 16:return Yr("Lazy");case 13:return Yr("Suspense");case 19:return Yr("SuspenseList");case 0:case 2:case 15:return e=Ti(e.type,!1),e;case 11:return e=Ti(e.type.render,!1),e;case 1:return e=Ti(e.type,!0),e;default:return""}}function xl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Yn:return"Fragment";case Xn:return"Portal";case hl:return"Profiler";case Na:return"StrictMode";case gl:return"Suspense";case yl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Pd:return(e.displayName||"Context")+".Consumer";case Md:return(e._context.displayName||"Context")+".Provider";case _a:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ca:return t=e.displayName||null,t!==null?t:xl(e.type)||"Memo";case rn:t=e._payload,e=e._init;try{return xl(e(t))}catch{}}return null}function th(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xl(t);case 8:return t===Na?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function wn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function $d(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function nh(e){var t=$d(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(l){r=""+l,o.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Xs(e){e._valueTracker||(e._valueTracker=nh(e))}function Dd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=$d(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Po(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function vl(e,t){var n=t.checked;return je({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Lc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=wn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function zd(e,t){t=t.checked,t!=null&&ja(e,"checked",t,!1)}function wl(e,t){zd(e,t);var n=wn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?bl(e,t.type,n):t.hasOwnProperty("defaultValue")&&bl(e,t.type,wn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Fc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function bl(e,t,n){(t!=="number"||Po(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Zr=Array.isArray;function ur(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+wn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function kl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(U(91));return je({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Uc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(U(92));if(Zr(n)){if(1<n.length)throw Error(U(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:wn(n)}}function Ld(e,t){var n=wn(t.value),r=wn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Bc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Fd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Sl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Fd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ys,Ud=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ys=Ys||document.createElement("div"),Ys.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ys.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ys(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ss={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rh=["Webkit","ms","Moz","O"];Object.keys(ss).forEach(function(e){rh.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ss[t]=ss[e]})});function Bd(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ss.hasOwnProperty(e)&&ss[e]?(""+t).trim():t+"px"}function Od(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Bd(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var sh=je({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function jl(e,t){if(t){if(sh[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(U(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(U(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(U(61))}if(t.style!=null&&typeof t.style!="object")throw Error(U(62))}}function Nl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _l=null;function Ea(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Cl=null,dr=null,fr=null;function Oc(e){if(e=Os(e)){if(typeof Cl!="function")throw Error(U(280));var t=e.stateNode;t&&(t=pi(t),Cl(e.stateNode,e.type,t))}}function Wd(e){dr?fr?fr.push(e):fr=[e]:dr=e}function Vd(){if(dr){var e=dr,t=fr;if(fr=dr=null,Oc(e),t)for(e=0;e<t.length;e++)Oc(t[e])}}function Hd(e,t){return e(t)}function Kd(){}var Mi=!1;function Qd(e,t,n){if(Mi)return e(t,n);Mi=!0;try{return Hd(e,t,n)}finally{Mi=!1,(dr!==null||fr!==null)&&(Kd(),Vd())}}function xs(e,t){var n=e.stateNode;if(n===null)return null;var r=pi(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(U(231,t,typeof n));return n}var El=!1;if(qt)try{var Lr={};Object.defineProperty(Lr,"passive",{get:function(){El=!0}}),window.addEventListener("test",Lr,Lr),window.removeEventListener("test",Lr,Lr)}catch{El=!1}function oh(e,t,n,r,s,o,l,c,a){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(f){this.onError(f)}}var os=!1,Ao=null,$o=!1,Il=null,ih={onError:function(e){os=!0,Ao=e}};function lh(e,t,n,r,s,o,l,c,a){os=!1,Ao=null,oh.apply(ih,arguments)}function ah(e,t,n,r,s,o,l,c,a){if(lh.apply(this,arguments),os){if(os){var u=Ao;os=!1,Ao=null}else throw Error(U(198));$o||($o=!0,Il=u)}}function Kn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function qd(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Wc(e){if(Kn(e)!==e)throw Error(U(188))}function ch(e){var t=e.alternate;if(!t){if(t=Kn(e),t===null)throw Error(U(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return Wc(s),e;if(o===r)return Wc(s),t;o=o.sibling}throw Error(U(188))}if(n.return!==r.return)n=s,r=o;else{for(var l=!1,c=s.child;c;){if(c===n){l=!0,n=s,r=o;break}if(c===r){l=!0,r=s,n=o;break}c=c.sibling}if(!l){for(c=o.child;c;){if(c===n){l=!0,n=o,r=s;break}if(c===r){l=!0,r=o,n=s;break}c=c.sibling}if(!l)throw Error(U(189))}}if(n.alternate!==r)throw Error(U(190))}if(n.tag!==3)throw Error(U(188));return n.stateNode.current===n?e:t}function Gd(e){return e=ch(e),e!==null?Xd(e):null}function Xd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Xd(e);if(t!==null)return t;e=e.sibling}return null}var Yd=ut.unstable_scheduleCallback,Vc=ut.unstable_cancelCallback,uh=ut.unstable_shouldYield,dh=ut.unstable_requestPaint,Ee=ut.unstable_now,fh=ut.unstable_getCurrentPriorityLevel,Ia=ut.unstable_ImmediatePriority,Zd=ut.unstable_UserBlockingPriority,Do=ut.unstable_NormalPriority,ph=ut.unstable_LowPriority,Jd=ut.unstable_IdlePriority,ci=null,$t=null;function mh(e){if($t&&typeof $t.onCommitFiberRoot=="function")try{$t.onCommitFiberRoot(ci,e,void 0,(e.current.flags&128)===128)}catch{}}var Ct=Math.clz32?Math.clz32:yh,hh=Math.log,gh=Math.LN2;function yh(e){return e>>>=0,e===0?32:31-(hh(e)/gh|0)|0}var Zs=64,Js=4194304;function Jr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function zo(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,o=e.pingedLanes,l=n&268435455;if(l!==0){var c=l&~s;c!==0?r=Jr(c):(o&=l,o!==0&&(r=Jr(o)))}else l=n&~s,l!==0?r=Jr(l):o!==0&&(r=Jr(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ct(t),s=1<<n,r|=e[n],t&=~s;return r}function xh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vh(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var l=31-Ct(o),c=1<<l,a=s[l];a===-1?(!(c&n)||c&r)&&(s[l]=xh(c,t)):a<=t&&(e.expiredLanes|=c),o&=~c}}function Rl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ef(){var e=Zs;return Zs<<=1,!(Zs&4194240)&&(Zs=64),e}function Pi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Us(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ct(t),e[t]=n}function wh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-Ct(n),o=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~o}}function Ra(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ct(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var me=0;function tf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var nf,Ta,rf,sf,of,Tl=!1,eo=[],fn=null,pn=null,mn=null,vs=new Map,ws=new Map,on=[],bh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Hc(e,t){switch(e){case"focusin":case"focusout":fn=null;break;case"dragenter":case"dragleave":pn=null;break;case"mouseover":case"mouseout":mn=null;break;case"pointerover":case"pointerout":vs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ws.delete(t.pointerId)}}function Fr(e,t,n,r,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[s]},t!==null&&(t=Os(t),t!==null&&Ta(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function kh(e,t,n,r,s){switch(t){case"focusin":return fn=Fr(fn,e,t,n,r,s),!0;case"dragenter":return pn=Fr(pn,e,t,n,r,s),!0;case"mouseover":return mn=Fr(mn,e,t,n,r,s),!0;case"pointerover":var o=s.pointerId;return vs.set(o,Fr(vs.get(o)||null,e,t,n,r,s)),!0;case"gotpointercapture":return o=s.pointerId,ws.set(o,Fr(ws.get(o)||null,e,t,n,r,s)),!0}return!1}function lf(e){var t=Mn(e.target);if(t!==null){var n=Kn(t);if(n!==null){if(t=n.tag,t===13){if(t=qd(n),t!==null){e.blockedOn=t,of(e.priority,function(){rf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function bo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ml(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);_l=r,n.target.dispatchEvent(r),_l=null}else return t=Os(n),t!==null&&Ta(t),e.blockedOn=n,!1;t.shift()}return!0}function Kc(e,t,n){bo(e)&&n.delete(t)}function Sh(){Tl=!1,fn!==null&&bo(fn)&&(fn=null),pn!==null&&bo(pn)&&(pn=null),mn!==null&&bo(mn)&&(mn=null),vs.forEach(Kc),ws.forEach(Kc)}function Ur(e,t){e.blockedOn===t&&(e.blockedOn=null,Tl||(Tl=!0,ut.unstable_scheduleCallback(ut.unstable_NormalPriority,Sh)))}function bs(e){function t(s){return Ur(s,e)}if(0<eo.length){Ur(eo[0],e);for(var n=1;n<eo.length;n++){var r=eo[n];r.blockedOn===e&&(r.blockedOn=null)}}for(fn!==null&&Ur(fn,e),pn!==null&&Ur(pn,e),mn!==null&&Ur(mn,e),vs.forEach(t),ws.forEach(t),n=0;n<on.length;n++)r=on[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<on.length&&(n=on[0],n.blockedOn===null);)lf(n),n.blockedOn===null&&on.shift()}var pr=Zt.ReactCurrentBatchConfig,Lo=!0;function jh(e,t,n,r){var s=me,o=pr.transition;pr.transition=null;try{me=1,Ma(e,t,n,r)}finally{me=s,pr.transition=o}}function Nh(e,t,n,r){var s=me,o=pr.transition;pr.transition=null;try{me=4,Ma(e,t,n,r)}finally{me=s,pr.transition=o}}function Ma(e,t,n,r){if(Lo){var s=Ml(e,t,n,r);if(s===null)Wi(e,t,r,Fo,n),Hc(e,r);else if(kh(s,e,t,n,r))r.stopPropagation();else if(Hc(e,r),t&4&&-1<bh.indexOf(e)){for(;s!==null;){var o=Os(s);if(o!==null&&nf(o),o=Ml(e,t,n,r),o===null&&Wi(e,t,r,Fo,n),o===s)break;s=o}s!==null&&r.stopPropagation()}else Wi(e,t,r,null,n)}}var Fo=null;function Ml(e,t,n,r){if(Fo=null,e=Ea(r),e=Mn(e),e!==null)if(t=Kn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=qd(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Fo=e,null}function af(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(fh()){case Ia:return 1;case Zd:return 4;case Do:case ph:return 16;case Jd:return 536870912;default:return 16}default:return 16}}var cn=null,Pa=null,ko=null;function cf(){if(ko)return ko;var e,t=Pa,n=t.length,r,s="value"in cn?cn.value:cn.textContent,o=s.length;for(e=0;e<n&&t[e]===s[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===s[o-r];r++);return ko=s.slice(e,1<r?1-r:void 0)}function So(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function to(){return!0}function Qc(){return!1}function ft(e){function t(n,r,s,o,l){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?to:Qc,this.isPropagationStopped=Qc,this}return je(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=to)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=to)},persist:function(){},isPersistent:to}),t}var Rr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Aa=ft(Rr),Bs=je({},Rr,{view:0,detail:0}),_h=ft(Bs),Ai,$i,Br,ui=je({},Bs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$a,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Br&&(Br&&e.type==="mousemove"?(Ai=e.screenX-Br.screenX,$i=e.screenY-Br.screenY):$i=Ai=0,Br=e),Ai)},movementY:function(e){return"movementY"in e?e.movementY:$i}}),qc=ft(ui),Ch=je({},ui,{dataTransfer:0}),Eh=ft(Ch),Ih=je({},Bs,{relatedTarget:0}),Di=ft(Ih),Rh=je({},Rr,{animationName:0,elapsedTime:0,pseudoElement:0}),Th=ft(Rh),Mh=je({},Rr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ph=ft(Mh),Ah=je({},Rr,{data:0}),Gc=ft(Ah),$h={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Dh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},zh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Lh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=zh[e])?!!t[e]:!1}function $a(){return Lh}var Fh=je({},Bs,{key:function(e){if(e.key){var t=$h[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=So(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Dh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$a,charCode:function(e){return e.type==="keypress"?So(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?So(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Uh=ft(Fh),Bh=je({},ui,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xc=ft(Bh),Oh=je({},Bs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$a}),Wh=ft(Oh),Vh=je({},Rr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Hh=ft(Vh),Kh=je({},ui,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Qh=ft(Kh),qh=[9,13,27,32],Da=qt&&"CompositionEvent"in window,is=null;qt&&"documentMode"in document&&(is=document.documentMode);var Gh=qt&&"TextEvent"in window&&!is,uf=qt&&(!Da||is&&8<is&&11>=is),Yc=" ",Zc=!1;function df(e,t){switch(e){case"keyup":return qh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ff(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Zn=!1;function Xh(e,t){switch(e){case"compositionend":return ff(t);case"keypress":return t.which!==32?null:(Zc=!0,Yc);case"textInput":return e=t.data,e===Yc&&Zc?null:e;default:return null}}function Yh(e,t){if(Zn)return e==="compositionend"||!Da&&df(e,t)?(e=cf(),ko=Pa=cn=null,Zn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return uf&&t.locale!=="ko"?null:t.data;default:return null}}var Zh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Zh[e.type]:t==="textarea"}function pf(e,t,n,r){Wd(r),t=Uo(t,"onChange"),0<t.length&&(n=new Aa("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ls=null,ks=null;function Jh(e){jf(e,0)}function di(e){var t=tr(e);if(Dd(t))return e}function eg(e,t){if(e==="change")return t}var mf=!1;if(qt){var zi;if(qt){var Li="oninput"in document;if(!Li){var eu=document.createElement("div");eu.setAttribute("oninput","return;"),Li=typeof eu.oninput=="function"}zi=Li}else zi=!1;mf=zi&&(!document.documentMode||9<document.documentMode)}function tu(){ls&&(ls.detachEvent("onpropertychange",hf),ks=ls=null)}function hf(e){if(e.propertyName==="value"&&di(ks)){var t=[];pf(t,ks,e,Ea(e)),Qd(Jh,t)}}function tg(e,t,n){e==="focusin"?(tu(),ls=t,ks=n,ls.attachEvent("onpropertychange",hf)):e==="focusout"&&tu()}function ng(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return di(ks)}function rg(e,t){if(e==="click")return di(t)}function sg(e,t){if(e==="input"||e==="change")return di(t)}function og(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var It=typeof Object.is=="function"?Object.is:og;function Ss(e,t){if(It(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!ml.call(t,s)||!It(e[s],t[s]))return!1}return!0}function nu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ru(e,t){var n=nu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=nu(n)}}function gf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?gf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function yf(){for(var e=window,t=Po();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Po(e.document)}return t}function za(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ig(e){var t=yf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&gf(n.ownerDocument.documentElement,n)){if(r!==null&&za(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,o=Math.min(r.start,s);r=r.end===void 0?o:Math.min(r.end,s),!e.extend&&o>r&&(s=r,r=o,o=s),s=ru(n,o);var l=ru(n,r);s&&l&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var lg=qt&&"documentMode"in document&&11>=document.documentMode,Jn=null,Pl=null,as=null,Al=!1;function su(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Al||Jn==null||Jn!==Po(r)||(r=Jn,"selectionStart"in r&&za(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),as&&Ss(as,r)||(as=r,r=Uo(Pl,"onSelect"),0<r.length&&(t=new Aa("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Jn)))}function no(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var er={animationend:no("Animation","AnimationEnd"),animationiteration:no("Animation","AnimationIteration"),animationstart:no("Animation","AnimationStart"),transitionend:no("Transition","TransitionEnd")},Fi={},xf={};qt&&(xf=document.createElement("div").style,"AnimationEvent"in window||(delete er.animationend.animation,delete er.animationiteration.animation,delete er.animationstart.animation),"TransitionEvent"in window||delete er.transitionend.transition);function fi(e){if(Fi[e])return Fi[e];if(!er[e])return e;var t=er[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in xf)return Fi[e]=t[n];return e}var vf=fi("animationend"),wf=fi("animationiteration"),bf=fi("animationstart"),kf=fi("transitionend"),Sf=new Map,ou="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Sn(e,t){Sf.set(e,t),Hn(t,[e])}for(var Ui=0;Ui<ou.length;Ui++){var Bi=ou[Ui],ag=Bi.toLowerCase(),cg=Bi[0].toUpperCase()+Bi.slice(1);Sn(ag,"on"+cg)}Sn(vf,"onAnimationEnd");Sn(wf,"onAnimationIteration");Sn(bf,"onAnimationStart");Sn("dblclick","onDoubleClick");Sn("focusin","onFocus");Sn("focusout","onBlur");Sn(kf,"onTransitionEnd");xr("onMouseEnter",["mouseout","mouseover"]);xr("onMouseLeave",["mouseout","mouseover"]);xr("onPointerEnter",["pointerout","pointerover"]);xr("onPointerLeave",["pointerout","pointerover"]);Hn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Hn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Hn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Hn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Hn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Hn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var es="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ug=new Set("cancel close invalid load scroll toggle".split(" ").concat(es));function iu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,ah(r,t,void 0,e),e.currentTarget=null}function jf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var l=r.length-1;0<=l;l--){var c=r[l],a=c.instance,u=c.currentTarget;if(c=c.listener,a!==o&&s.isPropagationStopped())break e;iu(s,c,u),o=a}else for(l=0;l<r.length;l++){if(c=r[l],a=c.instance,u=c.currentTarget,c=c.listener,a!==o&&s.isPropagationStopped())break e;iu(s,c,u),o=a}}}if($o)throw e=Il,$o=!1,Il=null,e}function ve(e,t){var n=t[Fl];n===void 0&&(n=t[Fl]=new Set);var r=e+"__bubble";n.has(r)||(Nf(t,e,2,!1),n.add(r))}function Oi(e,t,n){var r=0;t&&(r|=4),Nf(n,e,r,t)}var ro="_reactListening"+Math.random().toString(36).slice(2);function js(e){if(!e[ro]){e[ro]=!0,Td.forEach(function(n){n!=="selectionchange"&&(ug.has(n)||Oi(n,!1,e),Oi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ro]||(t[ro]=!0,Oi("selectionchange",!1,t))}}function Nf(e,t,n,r){switch(af(t)){case 1:var s=jh;break;case 4:s=Nh;break;default:s=Ma}n=s.bind(null,t,n,e),s=void 0,!El||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Wi(e,t,n,r,s){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var c=r.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(l===4)for(l=r.return;l!==null;){var a=l.tag;if((a===3||a===4)&&(a=l.stateNode.containerInfo,a===s||a.nodeType===8&&a.parentNode===s))return;l=l.return}for(;c!==null;){if(l=Mn(c),l===null)return;if(a=l.tag,a===5||a===6){r=o=l;continue e}c=c.parentNode}}r=r.return}Qd(function(){var u=o,f=Ea(n),d=[];e:{var p=Sf.get(e);if(p!==void 0){var y=Aa,g=e;switch(e){case"keypress":if(So(n)===0)break e;case"keydown":case"keyup":y=Uh;break;case"focusin":g="focus",y=Di;break;case"focusout":g="blur",y=Di;break;case"beforeblur":case"afterblur":y=Di;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=qc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Eh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Wh;break;case vf:case wf:case bf:y=Th;break;case kf:y=Hh;break;case"scroll":y=_h;break;case"wheel":y=Qh;break;case"copy":case"cut":case"paste":y=Ph;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Xc}var v=(t&4)!==0,k=!v&&e==="scroll",h=v?p!==null?p+"Capture":null:p;v=[];for(var m=u,x;m!==null;){x=m;var b=x.stateNode;if(x.tag===5&&b!==null&&(x=b,h!==null&&(b=xs(m,h),b!=null&&v.push(Ns(m,b,x)))),k)break;m=m.return}0<v.length&&(p=new y(p,g,null,n,f),d.push({event:p,listeners:v}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",p&&n!==_l&&(g=n.relatedTarget||n.fromElement)&&(Mn(g)||g[Gt]))break e;if((y||p)&&(p=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,y?(g=n.relatedTarget||n.toElement,y=u,g=g?Mn(g):null,g!==null&&(k=Kn(g),g!==k||g.tag!==5&&g.tag!==6)&&(g=null)):(y=null,g=u),y!==g)){if(v=qc,b="onMouseLeave",h="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(v=Xc,b="onPointerLeave",h="onPointerEnter",m="pointer"),k=y==null?p:tr(y),x=g==null?p:tr(g),p=new v(b,m+"leave",y,n,f),p.target=k,p.relatedTarget=x,b=null,Mn(f)===u&&(v=new v(h,m+"enter",g,n,f),v.target=x,v.relatedTarget=k,b=v),k=b,y&&g)t:{for(v=y,h=g,m=0,x=v;x;x=Gn(x))m++;for(x=0,b=h;b;b=Gn(b))x++;for(;0<m-x;)v=Gn(v),m--;for(;0<x-m;)h=Gn(h),x--;for(;m--;){if(v===h||h!==null&&v===h.alternate)break t;v=Gn(v),h=Gn(h)}v=null}else v=null;y!==null&&lu(d,p,y,v,!1),g!==null&&k!==null&&lu(d,k,g,v,!0)}}e:{if(p=u?tr(u):window,y=p.nodeName&&p.nodeName.toLowerCase(),y==="select"||y==="input"&&p.type==="file")var E=eg;else if(Jc(p))if(mf)E=sg;else{E=ng;var j=tg}else(y=p.nodeName)&&y.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(E=rg);if(E&&(E=E(e,u))){pf(d,E,n,f);break e}j&&j(e,p,u),e==="focusout"&&(j=p._wrapperState)&&j.controlled&&p.type==="number"&&bl(p,"number",p.value)}switch(j=u?tr(u):window,e){case"focusin":(Jc(j)||j.contentEditable==="true")&&(Jn=j,Pl=u,as=null);break;case"focusout":as=Pl=Jn=null;break;case"mousedown":Al=!0;break;case"contextmenu":case"mouseup":case"dragend":Al=!1,su(d,n,f);break;case"selectionchange":if(lg)break;case"keydown":case"keyup":su(d,n,f)}var N;if(Da)e:{switch(e){case"compositionstart":var w="onCompositionStart";break e;case"compositionend":w="onCompositionEnd";break e;case"compositionupdate":w="onCompositionUpdate";break e}w=void 0}else Zn?df(e,n)&&(w="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(w="onCompositionStart");w&&(uf&&n.locale!=="ko"&&(Zn||w!=="onCompositionStart"?w==="onCompositionEnd"&&Zn&&(N=cf()):(cn=f,Pa="value"in cn?cn.value:cn.textContent,Zn=!0)),j=Uo(u,w),0<j.length&&(w=new Gc(w,e,null,n,f),d.push({event:w,listeners:j}),N?w.data=N:(N=ff(n),N!==null&&(w.data=N)))),(N=Gh?Xh(e,n):Yh(e,n))&&(u=Uo(u,"onBeforeInput"),0<u.length&&(f=new Gc("onBeforeInput","beforeinput",null,n,f),d.push({event:f,listeners:u}),f.data=N))}jf(d,t)})}function Ns(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Uo(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=xs(e,n),o!=null&&r.unshift(Ns(e,o,s)),o=xs(e,t),o!=null&&r.push(Ns(e,o,s))),e=e.return}return r}function Gn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function lu(e,t,n,r,s){for(var o=t._reactName,l=[];n!==null&&n!==r;){var c=n,a=c.alternate,u=c.stateNode;if(a!==null&&a===r)break;c.tag===5&&u!==null&&(c=u,s?(a=xs(n,o),a!=null&&l.unshift(Ns(n,a,c))):s||(a=xs(n,o),a!=null&&l.push(Ns(n,a,c)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var dg=/\r\n?/g,fg=/\u0000|\uFFFD/g;function au(e){return(typeof e=="string"?e:""+e).replace(dg,`
`).replace(fg,"")}function so(e,t,n){if(t=au(t),au(e)!==t&&n)throw Error(U(425))}function Bo(){}var $l=null,Dl=null;function zl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ll=typeof setTimeout=="function"?setTimeout:void 0,pg=typeof clearTimeout=="function"?clearTimeout:void 0,cu=typeof Promise=="function"?Promise:void 0,mg=typeof queueMicrotask=="function"?queueMicrotask:typeof cu<"u"?function(e){return cu.resolve(null).then(e).catch(hg)}:Ll;function hg(e){setTimeout(function(){throw e})}function Vi(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),bs(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);bs(t)}function hn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function uu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Tr=Math.random().toString(36).slice(2),At="__reactFiber$"+Tr,_s="__reactProps$"+Tr,Gt="__reactContainer$"+Tr,Fl="__reactEvents$"+Tr,gg="__reactListeners$"+Tr,yg="__reactHandles$"+Tr;function Mn(e){var t=e[At];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Gt]||n[At]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=uu(e);e!==null;){if(n=e[At])return n;e=uu(e)}return t}e=n,n=e.parentNode}return null}function Os(e){return e=e[At]||e[Gt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function tr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(U(33))}function pi(e){return e[_s]||null}var Ul=[],nr=-1;function jn(e){return{current:e}}function we(e){0>nr||(e.current=Ul[nr],Ul[nr]=null,nr--)}function ye(e,t){nr++,Ul[nr]=e.current,e.current=t}var bn={},Ge=jn(bn),st=jn(!1),Un=bn;function vr(e,t){var n=e.type.contextTypes;if(!n)return bn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function ot(e){return e=e.childContextTypes,e!=null}function Oo(){we(st),we(Ge)}function du(e,t,n){if(Ge.current!==bn)throw Error(U(168));ye(Ge,t),ye(st,n)}function _f(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(U(108,th(e)||"Unknown",s));return je({},n,r)}function Wo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||bn,Un=Ge.current,ye(Ge,e),ye(st,st.current),!0}function fu(e,t,n){var r=e.stateNode;if(!r)throw Error(U(169));n?(e=_f(e,t,Un),r.__reactInternalMemoizedMergedChildContext=e,we(st),we(Ge),ye(Ge,e)):we(st),ye(st,n)}var Bt=null,mi=!1,Hi=!1;function Cf(e){Bt===null?Bt=[e]:Bt.push(e)}function xg(e){mi=!0,Cf(e)}function Nn(){if(!Hi&&Bt!==null){Hi=!0;var e=0,t=me;try{var n=Bt;for(me=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Bt=null,mi=!1}catch(s){throw Bt!==null&&(Bt=Bt.slice(e+1)),Yd(Ia,Nn),s}finally{me=t,Hi=!1}}return null}var rr=[],sr=0,Vo=null,Ho=0,mt=[],ht=0,Bn=null,Vt=1,Ht="";function En(e,t){rr[sr++]=Ho,rr[sr++]=Vo,Vo=e,Ho=t}function Ef(e,t,n){mt[ht++]=Vt,mt[ht++]=Ht,mt[ht++]=Bn,Bn=e;var r=Vt;e=Ht;var s=32-Ct(r)-1;r&=~(1<<s),n+=1;var o=32-Ct(t)+s;if(30<o){var l=s-s%5;o=(r&(1<<l)-1).toString(32),r>>=l,s-=l,Vt=1<<32-Ct(t)+s|n<<s|r,Ht=o+e}else Vt=1<<o|n<<s|r,Ht=e}function La(e){e.return!==null&&(En(e,1),Ef(e,1,0))}function Fa(e){for(;e===Vo;)Vo=rr[--sr],rr[sr]=null,Ho=rr[--sr],rr[sr]=null;for(;e===Bn;)Bn=mt[--ht],mt[ht]=null,Ht=mt[--ht],mt[ht]=null,Vt=mt[--ht],mt[ht]=null}var ct=null,at=null,be=!1,_t=null;function If(e,t){var n=yt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function pu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ct=e,at=hn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ct=e,at=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Bn!==null?{id:Vt,overflow:Ht}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=yt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ct=e,at=null,!0):!1;default:return!1}}function Bl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ol(e){if(be){var t=at;if(t){var n=t;if(!pu(e,t)){if(Bl(e))throw Error(U(418));t=hn(n.nextSibling);var r=ct;t&&pu(e,t)?If(r,n):(e.flags=e.flags&-4097|2,be=!1,ct=e)}}else{if(Bl(e))throw Error(U(418));e.flags=e.flags&-4097|2,be=!1,ct=e}}}function mu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ct=e}function oo(e){if(e!==ct)return!1;if(!be)return mu(e),be=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!zl(e.type,e.memoizedProps)),t&&(t=at)){if(Bl(e))throw Rf(),Error(U(418));for(;t;)If(e,t),t=hn(t.nextSibling)}if(mu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(U(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){at=hn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}at=null}}else at=ct?hn(e.stateNode.nextSibling):null;return!0}function Rf(){for(var e=at;e;)e=hn(e.nextSibling)}function wr(){at=ct=null,be=!1}function Ua(e){_t===null?_t=[e]:_t.push(e)}var vg=Zt.ReactCurrentBatchConfig;function Or(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(U(309));var r=n.stateNode}if(!r)throw Error(U(147,e));var s=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(l){var c=s.refs;l===null?delete c[o]:c[o]=l},t._stringRef=o,t)}if(typeof e!="string")throw Error(U(284));if(!n._owner)throw Error(U(290,e))}return e}function io(e,t){throw e=Object.prototype.toString.call(t),Error(U(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function hu(e){var t=e._init;return t(e._payload)}function Tf(e){function t(h,m){if(e){var x=h.deletions;x===null?(h.deletions=[m],h.flags|=16):x.push(m)}}function n(h,m){if(!e)return null;for(;m!==null;)t(h,m),m=m.sibling;return null}function r(h,m){for(h=new Map;m!==null;)m.key!==null?h.set(m.key,m):h.set(m.index,m),m=m.sibling;return h}function s(h,m){return h=vn(h,m),h.index=0,h.sibling=null,h}function o(h,m,x){return h.index=x,e?(x=h.alternate,x!==null?(x=x.index,x<m?(h.flags|=2,m):x):(h.flags|=2,m)):(h.flags|=1048576,m)}function l(h){return e&&h.alternate===null&&(h.flags|=2),h}function c(h,m,x,b){return m===null||m.tag!==6?(m=Zi(x,h.mode,b),m.return=h,m):(m=s(m,x),m.return=h,m)}function a(h,m,x,b){var E=x.type;return E===Yn?f(h,m,x.props.children,b,x.key):m!==null&&(m.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===rn&&hu(E)===m.type)?(b=s(m,x.props),b.ref=Or(h,m,x),b.return=h,b):(b=Ro(x.type,x.key,x.props,null,h.mode,b),b.ref=Or(h,m,x),b.return=h,b)}function u(h,m,x,b){return m===null||m.tag!==4||m.stateNode.containerInfo!==x.containerInfo||m.stateNode.implementation!==x.implementation?(m=Ji(x,h.mode,b),m.return=h,m):(m=s(m,x.children||[]),m.return=h,m)}function f(h,m,x,b,E){return m===null||m.tag!==7?(m=zn(x,h.mode,b,E),m.return=h,m):(m=s(m,x),m.return=h,m)}function d(h,m,x){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Zi(""+m,h.mode,x),m.return=h,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Gs:return x=Ro(m.type,m.key,m.props,null,h.mode,x),x.ref=Or(h,null,m),x.return=h,x;case Xn:return m=Ji(m,h.mode,x),m.return=h,m;case rn:var b=m._init;return d(h,b(m._payload),x)}if(Zr(m)||zr(m))return m=zn(m,h.mode,x,null),m.return=h,m;io(h,m)}return null}function p(h,m,x,b){var E=m!==null?m.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return E!==null?null:c(h,m,""+x,b);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Gs:return x.key===E?a(h,m,x,b):null;case Xn:return x.key===E?u(h,m,x,b):null;case rn:return E=x._init,p(h,m,E(x._payload),b)}if(Zr(x)||zr(x))return E!==null?null:f(h,m,x,b,null);io(h,x)}return null}function y(h,m,x,b,E){if(typeof b=="string"&&b!==""||typeof b=="number")return h=h.get(x)||null,c(m,h,""+b,E);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Gs:return h=h.get(b.key===null?x:b.key)||null,a(m,h,b,E);case Xn:return h=h.get(b.key===null?x:b.key)||null,u(m,h,b,E);case rn:var j=b._init;return y(h,m,x,j(b._payload),E)}if(Zr(b)||zr(b))return h=h.get(x)||null,f(m,h,b,E,null);io(m,b)}return null}function g(h,m,x,b){for(var E=null,j=null,N=m,w=m=0,_=null;N!==null&&w<x.length;w++){N.index>w?(_=N,N=null):_=N.sibling;var I=p(h,N,x[w],b);if(I===null){N===null&&(N=_);break}e&&N&&I.alternate===null&&t(h,N),m=o(I,m,w),j===null?E=I:j.sibling=I,j=I,N=_}if(w===x.length)return n(h,N),be&&En(h,w),E;if(N===null){for(;w<x.length;w++)N=d(h,x[w],b),N!==null&&(m=o(N,m,w),j===null?E=N:j.sibling=N,j=N);return be&&En(h,w),E}for(N=r(h,N);w<x.length;w++)_=y(N,h,w,x[w],b),_!==null&&(e&&_.alternate!==null&&N.delete(_.key===null?w:_.key),m=o(_,m,w),j===null?E=_:j.sibling=_,j=_);return e&&N.forEach(function(Q){return t(h,Q)}),be&&En(h,w),E}function v(h,m,x,b){var E=zr(x);if(typeof E!="function")throw Error(U(150));if(x=E.call(x),x==null)throw Error(U(151));for(var j=E=null,N=m,w=m=0,_=null,I=x.next();N!==null&&!I.done;w++,I=x.next()){N.index>w?(_=N,N=null):_=N.sibling;var Q=p(h,N,I.value,b);if(Q===null){N===null&&(N=_);break}e&&N&&Q.alternate===null&&t(h,N),m=o(Q,m,w),j===null?E=Q:j.sibling=Q,j=Q,N=_}if(I.done)return n(h,N),be&&En(h,w),E;if(N===null){for(;!I.done;w++,I=x.next())I=d(h,I.value,b),I!==null&&(m=o(I,m,w),j===null?E=I:j.sibling=I,j=I);return be&&En(h,w),E}for(N=r(h,N);!I.done;w++,I=x.next())I=y(N,h,w,I.value,b),I!==null&&(e&&I.alternate!==null&&N.delete(I.key===null?w:I.key),m=o(I,m,w),j===null?E=I:j.sibling=I,j=I);return e&&N.forEach(function(X){return t(h,X)}),be&&En(h,w),E}function k(h,m,x,b){if(typeof x=="object"&&x!==null&&x.type===Yn&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Gs:e:{for(var E=x.key,j=m;j!==null;){if(j.key===E){if(E=x.type,E===Yn){if(j.tag===7){n(h,j.sibling),m=s(j,x.props.children),m.return=h,h=m;break e}}else if(j.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===rn&&hu(E)===j.type){n(h,j.sibling),m=s(j,x.props),m.ref=Or(h,j,x),m.return=h,h=m;break e}n(h,j);break}else t(h,j);j=j.sibling}x.type===Yn?(m=zn(x.props.children,h.mode,b,x.key),m.return=h,h=m):(b=Ro(x.type,x.key,x.props,null,h.mode,b),b.ref=Or(h,m,x),b.return=h,h=b)}return l(h);case Xn:e:{for(j=x.key;m!==null;){if(m.key===j)if(m.tag===4&&m.stateNode.containerInfo===x.containerInfo&&m.stateNode.implementation===x.implementation){n(h,m.sibling),m=s(m,x.children||[]),m.return=h,h=m;break e}else{n(h,m);break}else t(h,m);m=m.sibling}m=Ji(x,h.mode,b),m.return=h,h=m}return l(h);case rn:return j=x._init,k(h,m,j(x._payload),b)}if(Zr(x))return g(h,m,x,b);if(zr(x))return v(h,m,x,b);io(h,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,m!==null&&m.tag===6?(n(h,m.sibling),m=s(m,x),m.return=h,h=m):(n(h,m),m=Zi(x,h.mode,b),m.return=h,h=m),l(h)):n(h,m)}return k}var br=Tf(!0),Mf=Tf(!1),Ko=jn(null),Qo=null,or=null,Ba=null;function Oa(){Ba=or=Qo=null}function Wa(e){var t=Ko.current;we(Ko),e._currentValue=t}function Wl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function mr(e,t){Qo=e,Ba=or=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(rt=!0),e.firstContext=null)}function vt(e){var t=e._currentValue;if(Ba!==e)if(e={context:e,memoizedValue:t,next:null},or===null){if(Qo===null)throw Error(U(308));or=e,Qo.dependencies={lanes:0,firstContext:e}}else or=or.next=e;return t}var Pn=null;function Va(e){Pn===null?Pn=[e]:Pn.push(e)}function Pf(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,Va(t)):(n.next=s.next,s.next=n),t.interleaved=n,Xt(e,r)}function Xt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var sn=!1;function Ha(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Af(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Kt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function gn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,fe&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,Xt(e,n)}return s=r.interleaved,s===null?(t.next=t,Va(r)):(t.next=s.next,s.next=t),r.interleaved=t,Xt(e,n)}function jo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ra(e,n)}}function gu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=l:o=o.next=l,n=n.next}while(n!==null);o===null?s=o=t:o=o.next=t}else s=o=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function qo(e,t,n,r){var s=e.updateQueue;sn=!1;var o=s.firstBaseUpdate,l=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var a=c,u=a.next;a.next=null,l===null?o=u:l.next=u,l=a;var f=e.alternate;f!==null&&(f=f.updateQueue,c=f.lastBaseUpdate,c!==l&&(c===null?f.firstBaseUpdate=u:c.next=u,f.lastBaseUpdate=a))}if(o!==null){var d=s.baseState;l=0,f=u=a=null,c=o;do{var p=c.lane,y=c.eventTime;if((r&p)===p){f!==null&&(f=f.next={eventTime:y,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var g=e,v=c;switch(p=t,y=n,v.tag){case 1:if(g=v.payload,typeof g=="function"){d=g.call(y,d,p);break e}d=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=v.payload,p=typeof g=="function"?g.call(y,d,p):g,p==null)break e;d=je({},d,p);break e;case 2:sn=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,p=s.effects,p===null?s.effects=[c]:p.push(c))}else y={eventTime:y,lane:p,tag:c.tag,payload:c.payload,callback:c.callback,next:null},f===null?(u=f=y,a=d):f=f.next=y,l|=p;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;p=c,c=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);if(f===null&&(a=d),s.baseState=a,s.firstBaseUpdate=u,s.lastBaseUpdate=f,t=s.shared.interleaved,t!==null){s=t;do l|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);Wn|=l,e.lanes=l,e.memoizedState=d}}function yu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(U(191,s));s.call(r)}}}var Ws={},Dt=jn(Ws),Cs=jn(Ws),Es=jn(Ws);function An(e){if(e===Ws)throw Error(U(174));return e}function Ka(e,t){switch(ye(Es,t),ye(Cs,e),ye(Dt,Ws),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Sl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Sl(t,e)}we(Dt),ye(Dt,t)}function kr(){we(Dt),we(Cs),we(Es)}function $f(e){An(Es.current);var t=An(Dt.current),n=Sl(t,e.type);t!==n&&(ye(Cs,e),ye(Dt,n))}function Qa(e){Cs.current===e&&(we(Dt),we(Cs))}var ke=jn(0);function Go(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ki=[];function qa(){for(var e=0;e<Ki.length;e++)Ki[e]._workInProgressVersionPrimary=null;Ki.length=0}var No=Zt.ReactCurrentDispatcher,Qi=Zt.ReactCurrentBatchConfig,On=0,Se=null,Pe=null,$e=null,Xo=!1,cs=!1,Is=0,wg=0;function He(){throw Error(U(321))}function Ga(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!It(e[n],t[n]))return!1;return!0}function Xa(e,t,n,r,s,o){if(On=o,Se=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,No.current=e===null||e.memoizedState===null?jg:Ng,e=n(r,s),cs){o=0;do{if(cs=!1,Is=0,25<=o)throw Error(U(301));o+=1,$e=Pe=null,t.updateQueue=null,No.current=_g,e=n(r,s)}while(cs)}if(No.current=Yo,t=Pe!==null&&Pe.next!==null,On=0,$e=Pe=Se=null,Xo=!1,t)throw Error(U(300));return e}function Ya(){var e=Is!==0;return Is=0,e}function Pt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return $e===null?Se.memoizedState=$e=e:$e=$e.next=e,$e}function wt(){if(Pe===null){var e=Se.alternate;e=e!==null?e.memoizedState:null}else e=Pe.next;var t=$e===null?Se.memoizedState:$e.next;if(t!==null)$e=t,Pe=e;else{if(e===null)throw Error(U(310));Pe=e,e={memoizedState:Pe.memoizedState,baseState:Pe.baseState,baseQueue:Pe.baseQueue,queue:Pe.queue,next:null},$e===null?Se.memoizedState=$e=e:$e=$e.next=e}return $e}function Rs(e,t){return typeof t=="function"?t(e):t}function qi(e){var t=wt(),n=t.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=e;var r=Pe,s=r.baseQueue,o=n.pending;if(o!==null){if(s!==null){var l=s.next;s.next=o.next,o.next=l}r.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,r=r.baseState;var c=l=null,a=null,u=o;do{var f=u.lane;if((On&f)===f)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var d={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(c=a=d,l=r):a=a.next=d,Se.lanes|=f,Wn|=f}u=u.next}while(u!==null&&u!==o);a===null?l=r:a.next=c,It(r,t.memoizedState)||(rt=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do o=s.lane,Se.lanes|=o,Wn|=o,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Gi(e){var t=wt(),n=t.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,o=t.memoizedState;if(s!==null){n.pending=null;var l=s=s.next;do o=e(o,l.action),l=l.next;while(l!==s);It(o,t.memoizedState)||(rt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Df(){}function zf(e,t){var n=Se,r=wt(),s=t(),o=!It(r.memoizedState,s);if(o&&(r.memoizedState=s,rt=!0),r=r.queue,Za(Uf.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||$e!==null&&$e.memoizedState.tag&1){if(n.flags|=2048,Ts(9,Ff.bind(null,n,r,s,t),void 0,null),De===null)throw Error(U(349));On&30||Lf(n,t,s)}return s}function Lf(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Se.updateQueue,t===null?(t={lastEffect:null,stores:null},Se.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ff(e,t,n,r){t.value=n,t.getSnapshot=r,Bf(t)&&Of(e)}function Uf(e,t,n){return n(function(){Bf(t)&&Of(e)})}function Bf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!It(e,n)}catch{return!0}}function Of(e){var t=Xt(e,1);t!==null&&Et(t,e,1,-1)}function xu(e){var t=Pt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Rs,lastRenderedState:e},t.queue=e,e=e.dispatch=Sg.bind(null,Se,e),[t.memoizedState,e]}function Ts(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Se.updateQueue,t===null?(t={lastEffect:null,stores:null},Se.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Wf(){return wt().memoizedState}function _o(e,t,n,r){var s=Pt();Se.flags|=e,s.memoizedState=Ts(1|t,n,void 0,r===void 0?null:r)}function hi(e,t,n,r){var s=wt();r=r===void 0?null:r;var o=void 0;if(Pe!==null){var l=Pe.memoizedState;if(o=l.destroy,r!==null&&Ga(r,l.deps)){s.memoizedState=Ts(t,n,o,r);return}}Se.flags|=e,s.memoizedState=Ts(1|t,n,o,r)}function vu(e,t){return _o(8390656,8,e,t)}function Za(e,t){return hi(2048,8,e,t)}function Vf(e,t){return hi(4,2,e,t)}function Hf(e,t){return hi(4,4,e,t)}function Kf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Qf(e,t,n){return n=n!=null?n.concat([e]):null,hi(4,4,Kf.bind(null,t,e),n)}function Ja(){}function qf(e,t){var n=wt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ga(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Gf(e,t){var n=wt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ga(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Xf(e,t,n){return On&21?(It(n,t)||(n=ef(),Se.lanes|=n,Wn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,rt=!0),e.memoizedState=n)}function bg(e,t){var n=me;me=n!==0&&4>n?n:4,e(!0);var r=Qi.transition;Qi.transition={};try{e(!1),t()}finally{me=n,Qi.transition=r}}function Yf(){return wt().memoizedState}function kg(e,t,n){var r=xn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Zf(e))Jf(t,n);else if(n=Pf(e,t,n,r),n!==null){var s=Ze();Et(n,e,r,s),ep(n,t,r)}}function Sg(e,t,n){var r=xn(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Zf(e))Jf(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var l=t.lastRenderedState,c=o(l,n);if(s.hasEagerState=!0,s.eagerState=c,It(c,l)){var a=t.interleaved;a===null?(s.next=s,Va(t)):(s.next=a.next,a.next=s),t.interleaved=s;return}}catch{}finally{}n=Pf(e,t,s,r),n!==null&&(s=Ze(),Et(n,e,r,s),ep(n,t,r))}}function Zf(e){var t=e.alternate;return e===Se||t!==null&&t===Se}function Jf(e,t){cs=Xo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ep(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ra(e,n)}}var Yo={readContext:vt,useCallback:He,useContext:He,useEffect:He,useImperativeHandle:He,useInsertionEffect:He,useLayoutEffect:He,useMemo:He,useReducer:He,useRef:He,useState:He,useDebugValue:He,useDeferredValue:He,useTransition:He,useMutableSource:He,useSyncExternalStore:He,useId:He,unstable_isNewReconciler:!1},jg={readContext:vt,useCallback:function(e,t){return Pt().memoizedState=[e,t===void 0?null:t],e},useContext:vt,useEffect:vu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,_o(4194308,4,Kf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return _o(4194308,4,e,t)},useInsertionEffect:function(e,t){return _o(4,2,e,t)},useMemo:function(e,t){var n=Pt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Pt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=kg.bind(null,Se,e),[r.memoizedState,e]},useRef:function(e){var t=Pt();return e={current:e},t.memoizedState=e},useState:xu,useDebugValue:Ja,useDeferredValue:function(e){return Pt().memoizedState=e},useTransition:function(){var e=xu(!1),t=e[0];return e=bg.bind(null,e[1]),Pt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Se,s=Pt();if(be){if(n===void 0)throw Error(U(407));n=n()}else{if(n=t(),De===null)throw Error(U(349));On&30||Lf(r,t,n)}s.memoizedState=n;var o={value:n,getSnapshot:t};return s.queue=o,vu(Uf.bind(null,r,o,e),[e]),r.flags|=2048,Ts(9,Ff.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Pt(),t=De.identifierPrefix;if(be){var n=Ht,r=Vt;n=(r&~(1<<32-Ct(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Is++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=wg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Ng={readContext:vt,useCallback:qf,useContext:vt,useEffect:Za,useImperativeHandle:Qf,useInsertionEffect:Vf,useLayoutEffect:Hf,useMemo:Gf,useReducer:qi,useRef:Wf,useState:function(){return qi(Rs)},useDebugValue:Ja,useDeferredValue:function(e){var t=wt();return Xf(t,Pe.memoizedState,e)},useTransition:function(){var e=qi(Rs)[0],t=wt().memoizedState;return[e,t]},useMutableSource:Df,useSyncExternalStore:zf,useId:Yf,unstable_isNewReconciler:!1},_g={readContext:vt,useCallback:qf,useContext:vt,useEffect:Za,useImperativeHandle:Qf,useInsertionEffect:Vf,useLayoutEffect:Hf,useMemo:Gf,useReducer:Gi,useRef:Wf,useState:function(){return Gi(Rs)},useDebugValue:Ja,useDeferredValue:function(e){var t=wt();return Pe===null?t.memoizedState=e:Xf(t,Pe.memoizedState,e)},useTransition:function(){var e=Gi(Rs)[0],t=wt().memoizedState;return[e,t]},useMutableSource:Df,useSyncExternalStore:zf,useId:Yf,unstable_isNewReconciler:!1};function jt(e,t){if(e&&e.defaultProps){t=je({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Vl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:je({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var gi={isMounted:function(e){return(e=e._reactInternals)?Kn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ze(),s=xn(e),o=Kt(r,s);o.payload=t,n!=null&&(o.callback=n),t=gn(e,o,s),t!==null&&(Et(t,e,s,r),jo(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ze(),s=xn(e),o=Kt(r,s);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=gn(e,o,s),t!==null&&(Et(t,e,s,r),jo(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ze(),r=xn(e),s=Kt(n,r);s.tag=2,t!=null&&(s.callback=t),t=gn(e,s,r),t!==null&&(Et(t,e,r,n),jo(t,e,r))}};function wu(e,t,n,r,s,o,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,l):t.prototype&&t.prototype.isPureReactComponent?!Ss(n,r)||!Ss(s,o):!0}function tp(e,t,n){var r=!1,s=bn,o=t.contextType;return typeof o=="object"&&o!==null?o=vt(o):(s=ot(t)?Un:Ge.current,r=t.contextTypes,o=(r=r!=null)?vr(e,s):bn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=gi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function bu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&gi.enqueueReplaceState(t,t.state,null)}function Hl(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Ha(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=vt(o):(o=ot(t)?Un:Ge.current,s.context=vr(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Vl(e,t,o,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&gi.enqueueReplaceState(s,s.state,null),qo(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Sr(e,t){try{var n="",r=t;do n+=eh(r),r=r.return;while(r);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function Xi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Kl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Cg=typeof WeakMap=="function"?WeakMap:Map;function np(e,t,n){n=Kt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Jo||(Jo=!0,na=r),Kl(e,t)},n}function rp(e,t,n){n=Kt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Kl(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Kl(e,t),typeof r!="function"&&(yn===null?yn=new Set([this]):yn.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function ku(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Cg;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=Bg.bind(null,e,t,n),t.then(e,e))}function Su(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ju(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Kt(-1,1),t.tag=2,gn(n,t,1))),n.lanes|=1),e)}var Eg=Zt.ReactCurrentOwner,rt=!1;function Ye(e,t,n,r){t.child=e===null?Mf(t,null,n,r):br(t,e.child,n,r)}function Nu(e,t,n,r,s){n=n.render;var o=t.ref;return mr(t,s),r=Xa(e,t,n,r,o,s),n=Ya(),e!==null&&!rt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Yt(e,t,s)):(be&&n&&La(t),t.flags|=1,Ye(e,t,r,s),t.child)}function _u(e,t,n,r,s){if(e===null){var o=n.type;return typeof o=="function"&&!lc(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,sp(e,t,o,r,s)):(e=Ro(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var l=o.memoizedProps;if(n=n.compare,n=n!==null?n:Ss,n(l,r)&&e.ref===t.ref)return Yt(e,t,s)}return t.flags|=1,e=vn(o,r),e.ref=t.ref,e.return=t,t.child=e}function sp(e,t,n,r,s){if(e!==null){var o=e.memoizedProps;if(Ss(o,r)&&e.ref===t.ref)if(rt=!1,t.pendingProps=r=o,(e.lanes&s)!==0)e.flags&131072&&(rt=!0);else return t.lanes=e.lanes,Yt(e,t,s)}return Ql(e,t,n,r,s)}function op(e,t,n){var r=t.pendingProps,s=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ye(lr,lt),lt|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ye(lr,lt),lt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,ye(lr,lt),lt|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,ye(lr,lt),lt|=r;return Ye(e,t,s,n),t.child}function ip(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ql(e,t,n,r,s){var o=ot(n)?Un:Ge.current;return o=vr(t,o),mr(t,s),n=Xa(e,t,n,r,o,s),r=Ya(),e!==null&&!rt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Yt(e,t,s)):(be&&r&&La(t),t.flags|=1,Ye(e,t,n,s),t.child)}function Cu(e,t,n,r,s){if(ot(n)){var o=!0;Wo(t)}else o=!1;if(mr(t,s),t.stateNode===null)Co(e,t),tp(t,n,r),Hl(t,n,r,s),r=!0;else if(e===null){var l=t.stateNode,c=t.memoizedProps;l.props=c;var a=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=vt(u):(u=ot(n)?Un:Ge.current,u=vr(t,u));var f=n.getDerivedStateFromProps,d=typeof f=="function"||typeof l.getSnapshotBeforeUpdate=="function";d||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==r||a!==u)&&bu(t,l,r,u),sn=!1;var p=t.memoizedState;l.state=p,qo(t,r,l,s),a=t.memoizedState,c!==r||p!==a||st.current||sn?(typeof f=="function"&&(Vl(t,n,f,r),a=t.memoizedState),(c=sn||wu(t,n,c,r,p,a,u))?(d||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),l.props=r,l.state=a,l.context=u,r=c):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,Af(e,t),c=t.memoizedProps,u=t.type===t.elementType?c:jt(t.type,c),l.props=u,d=t.pendingProps,p=l.context,a=n.contextType,typeof a=="object"&&a!==null?a=vt(a):(a=ot(n)?Un:Ge.current,a=vr(t,a));var y=n.getDerivedStateFromProps;(f=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==d||p!==a)&&bu(t,l,r,a),sn=!1,p=t.memoizedState,l.state=p,qo(t,r,l,s);var g=t.memoizedState;c!==d||p!==g||st.current||sn?(typeof y=="function"&&(Vl(t,n,y,r),g=t.memoizedState),(u=sn||wu(t,n,u,r,p,g,a)||!1)?(f||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,g,a),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,g,a)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=g),l.props=r,l.state=g,l.context=a,r=u):(typeof l.componentDidUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return ql(e,t,n,r,o,s)}function ql(e,t,n,r,s,o){ip(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return s&&fu(t,n,!1),Yt(e,t,o);r=t.stateNode,Eg.current=t;var c=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=br(t,e.child,null,o),t.child=br(t,null,c,o)):Ye(e,t,c,o),t.memoizedState=r.state,s&&fu(t,n,!0),t.child}function lp(e){var t=e.stateNode;t.pendingContext?du(e,t.pendingContext,t.pendingContext!==t.context):t.context&&du(e,t.context,!1),Ka(e,t.containerInfo)}function Eu(e,t,n,r,s){return wr(),Ua(s),t.flags|=256,Ye(e,t,n,r),t.child}var Gl={dehydrated:null,treeContext:null,retryLane:0};function Xl(e){return{baseLanes:e,cachePool:null,transitions:null}}function ap(e,t,n){var r=t.pendingProps,s=ke.current,o=!1,l=(t.flags&128)!==0,c;if((c=l)||(c=e!==null&&e.memoizedState===null?!1:(s&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),ye(ke,s&1),e===null)return Ol(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,o?(r=t.mode,o=t.child,l={mode:"hidden",children:l},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=l):o=vi(l,r,0,null),e=zn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Xl(n),t.memoizedState=Gl,e):ec(t,l));if(s=e.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return Ig(e,t,l,r,c,s,n);if(o){o=r.fallback,l=t.mode,s=e.child,c=s.sibling;var a={mode:"hidden",children:r.children};return!(l&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=vn(s,a),r.subtreeFlags=s.subtreeFlags&14680064),c!==null?o=vn(c,o):(o=zn(o,l,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,l=e.child.memoizedState,l=l===null?Xl(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},o.memoizedState=l,o.childLanes=e.childLanes&~n,t.memoizedState=Gl,r}return o=e.child,e=o.sibling,r=vn(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ec(e,t){return t=vi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function lo(e,t,n,r){return r!==null&&Ua(r),br(t,e.child,null,n),e=ec(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ig(e,t,n,r,s,o,l){if(n)return t.flags&256?(t.flags&=-257,r=Xi(Error(U(422))),lo(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,s=t.mode,r=vi({mode:"visible",children:r.children},s,0,null),o=zn(o,s,l,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&br(t,e.child,null,l),t.child.memoizedState=Xl(l),t.memoizedState=Gl,o);if(!(t.mode&1))return lo(e,t,l,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var c=r.dgst;return r=c,o=Error(U(419)),r=Xi(o,r,void 0),lo(e,t,l,r)}if(c=(l&e.childLanes)!==0,rt||c){if(r=De,r!==null){switch(l&-l){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|l)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,Xt(e,s),Et(r,e,s,-1))}return ic(),r=Xi(Error(U(421))),lo(e,t,l,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Og.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,at=hn(s.nextSibling),ct=t,be=!0,_t=null,e!==null&&(mt[ht++]=Vt,mt[ht++]=Ht,mt[ht++]=Bn,Vt=e.id,Ht=e.overflow,Bn=t),t=ec(t,r.children),t.flags|=4096,t)}function Iu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Wl(e.return,t,n)}function Yi(e,t,n,r,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=s)}function cp(e,t,n){var r=t.pendingProps,s=r.revealOrder,o=r.tail;if(Ye(e,t,r.children,n),r=ke.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Iu(e,n,t);else if(e.tag===19)Iu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ye(ke,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Go(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Yi(t,!1,s,n,o);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Go(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Yi(t,!0,n,null,o);break;case"together":Yi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Co(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Yt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(U(153));if(t.child!==null){for(e=t.child,n=vn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=vn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Rg(e,t,n){switch(t.tag){case 3:lp(t),wr();break;case 5:$f(t);break;case 1:ot(t.type)&&Wo(t);break;case 4:Ka(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;ye(Ko,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ye(ke,ke.current&1),t.flags|=128,null):n&t.child.childLanes?ap(e,t,n):(ye(ke,ke.current&1),e=Yt(e,t,n),e!==null?e.sibling:null);ye(ke,ke.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return cp(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ye(ke,ke.current),r)break;return null;case 22:case 23:return t.lanes=0,op(e,t,n)}return Yt(e,t,n)}var up,Yl,dp,fp;up=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Yl=function(){};dp=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,An(Dt.current);var o=null;switch(n){case"input":s=vl(e,s),r=vl(e,r),o=[];break;case"select":s=je({},s,{value:void 0}),r=je({},r,{value:void 0}),o=[];break;case"textarea":s=kl(e,s),r=kl(e,r),o=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Bo)}jl(n,r);var l;n=null;for(u in s)if(!r.hasOwnProperty(u)&&s.hasOwnProperty(u)&&s[u]!=null)if(u==="style"){var c=s[u];for(l in c)c.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(gs.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var a=r[u];if(c=s!=null?s[u]:void 0,r.hasOwnProperty(u)&&a!==c&&(a!=null||c!=null))if(u==="style")if(c){for(l in c)!c.hasOwnProperty(l)||a&&a.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in a)a.hasOwnProperty(l)&&c[l]!==a[l]&&(n||(n={}),n[l]=a[l])}else n||(o||(o=[]),o.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,c=c?c.__html:void 0,a!=null&&c!==a&&(o=o||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(o=o||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(gs.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&ve("scroll",e),o||c===a||(o=[])):(o=o||[]).push(u,a))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};fp=function(e,t,n,r){n!==r&&(t.flags|=4)};function Wr(e,t){if(!be)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ke(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Tg(e,t,n){var r=t.pendingProps;switch(Fa(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(t),null;case 1:return ot(t.type)&&Oo(),Ke(t),null;case 3:return r=t.stateNode,kr(),we(st),we(Ge),qa(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(oo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,_t!==null&&(oa(_t),_t=null))),Yl(e,t),Ke(t),null;case 5:Qa(t);var s=An(Es.current);if(n=t.type,e!==null&&t.stateNode!=null)dp(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(U(166));return Ke(t),null}if(e=An(Dt.current),oo(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[At]=t,r[_s]=o,e=(t.mode&1)!==0,n){case"dialog":ve("cancel",r),ve("close",r);break;case"iframe":case"object":case"embed":ve("load",r);break;case"video":case"audio":for(s=0;s<es.length;s++)ve(es[s],r);break;case"source":ve("error",r);break;case"img":case"image":case"link":ve("error",r),ve("load",r);break;case"details":ve("toggle",r);break;case"input":Lc(r,o),ve("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},ve("invalid",r);break;case"textarea":Uc(r,o),ve("invalid",r)}jl(n,o),s=null;for(var l in o)if(o.hasOwnProperty(l)){var c=o[l];l==="children"?typeof c=="string"?r.textContent!==c&&(o.suppressHydrationWarning!==!0&&so(r.textContent,c,e),s=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&so(r.textContent,c,e),s=["children",""+c]):gs.hasOwnProperty(l)&&c!=null&&l==="onScroll"&&ve("scroll",r)}switch(n){case"input":Xs(r),Fc(r,o,!0);break;case"textarea":Xs(r),Bc(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Bo)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Fd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[At]=t,e[_s]=r,up(e,t,!1,!1),t.stateNode=e;e:{switch(l=Nl(n,r),n){case"dialog":ve("cancel",e),ve("close",e),s=r;break;case"iframe":case"object":case"embed":ve("load",e),s=r;break;case"video":case"audio":for(s=0;s<es.length;s++)ve(es[s],e);s=r;break;case"source":ve("error",e),s=r;break;case"img":case"image":case"link":ve("error",e),ve("load",e),s=r;break;case"details":ve("toggle",e),s=r;break;case"input":Lc(e,r),s=vl(e,r),ve("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=je({},r,{value:void 0}),ve("invalid",e);break;case"textarea":Uc(e,r),s=kl(e,r),ve("invalid",e);break;default:s=r}jl(n,s),c=s;for(o in c)if(c.hasOwnProperty(o)){var a=c[o];o==="style"?Od(e,a):o==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Ud(e,a)):o==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&ys(e,a):typeof a=="number"&&ys(e,""+a):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(gs.hasOwnProperty(o)?a!=null&&o==="onScroll"&&ve("scroll",e):a!=null&&ja(e,o,a,l))}switch(n){case"input":Xs(e),Fc(e,r,!1);break;case"textarea":Xs(e),Bc(e);break;case"option":r.value!=null&&e.setAttribute("value",""+wn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?ur(e,!!r.multiple,o,!1):r.defaultValue!=null&&ur(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=Bo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ke(t),null;case 6:if(e&&t.stateNode!=null)fp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(U(166));if(n=An(Es.current),An(Dt.current),oo(t)){if(r=t.stateNode,n=t.memoizedProps,r[At]=t,(o=r.nodeValue!==n)&&(e=ct,e!==null))switch(e.tag){case 3:so(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&so(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[At]=t,t.stateNode=r}return Ke(t),null;case 13:if(we(ke),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(be&&at!==null&&t.mode&1&&!(t.flags&128))Rf(),wr(),t.flags|=98560,o=!1;else if(o=oo(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(U(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(U(317));o[At]=t}else wr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ke(t),o=!1}else _t!==null&&(oa(_t),_t=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ke.current&1?Ae===0&&(Ae=3):ic())),t.updateQueue!==null&&(t.flags|=4),Ke(t),null);case 4:return kr(),Yl(e,t),e===null&&js(t.stateNode.containerInfo),Ke(t),null;case 10:return Wa(t.type._context),Ke(t),null;case 17:return ot(t.type)&&Oo(),Ke(t),null;case 19:if(we(ke),o=t.memoizedState,o===null)return Ke(t),null;if(r=(t.flags&128)!==0,l=o.rendering,l===null)if(r)Wr(o,!1);else{if(Ae!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Go(e),l!==null){for(t.flags|=128,Wr(o,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,l=o.alternate,l===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=l.childLanes,o.lanes=l.lanes,o.child=l.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=l.memoizedProps,o.memoizedState=l.memoizedState,o.updateQueue=l.updateQueue,o.type=l.type,e=l.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ye(ke,ke.current&1|2),t.child}e=e.sibling}o.tail!==null&&Ee()>jr&&(t.flags|=128,r=!0,Wr(o,!1),t.lanes=4194304)}else{if(!r)if(e=Go(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Wr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!l.alternate&&!be)return Ke(t),null}else 2*Ee()-o.renderingStartTime>jr&&n!==1073741824&&(t.flags|=128,r=!0,Wr(o,!1),t.lanes=4194304);o.isBackwards?(l.sibling=t.child,t.child=l):(n=o.last,n!==null?n.sibling=l:t.child=l,o.last=l)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ee(),t.sibling=null,n=ke.current,ye(ke,r?n&1|2:n&1),t):(Ke(t),null);case 22:case 23:return oc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?lt&1073741824&&(Ke(t),t.subtreeFlags&6&&(t.flags|=8192)):Ke(t),null;case 24:return null;case 25:return null}throw Error(U(156,t.tag))}function Mg(e,t){switch(Fa(t),t.tag){case 1:return ot(t.type)&&Oo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return kr(),we(st),we(Ge),qa(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Qa(t),null;case 13:if(we(ke),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(U(340));wr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return we(ke),null;case 4:return kr(),null;case 10:return Wa(t.type._context),null;case 22:case 23:return oc(),null;case 24:return null;default:return null}}var ao=!1,qe=!1,Pg=typeof WeakSet=="function"?WeakSet:Set,Z=null;function ir(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ne(e,t,r)}else n.current=null}function Zl(e,t,n){try{n()}catch(r){Ne(e,t,r)}}var Ru=!1;function Ag(e,t){if($l=Lo,e=yf(),za(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var l=0,c=-1,a=-1,u=0,f=0,d=e,p=null;t:for(;;){for(var y;d!==n||s!==0&&d.nodeType!==3||(c=l+s),d!==o||r!==0&&d.nodeType!==3||(a=l+r),d.nodeType===3&&(l+=d.nodeValue.length),(y=d.firstChild)!==null;)p=d,d=y;for(;;){if(d===e)break t;if(p===n&&++u===s&&(c=l),p===o&&++f===r&&(a=l),(y=d.nextSibling)!==null)break;d=p,p=d.parentNode}d=y}n=c===-1||a===-1?null:{start:c,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(Dl={focusedElem:e,selectionRange:n},Lo=!1,Z=t;Z!==null;)if(t=Z,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Z=e;else for(;Z!==null;){t=Z;try{var g=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var v=g.memoizedProps,k=g.memoizedState,h=t.stateNode,m=h.getSnapshotBeforeUpdate(t.elementType===t.type?v:jt(t.type,v),k);h.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(U(163))}}catch(b){Ne(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,Z=e;break}Z=t.return}return g=Ru,Ru=!1,g}function us(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&Zl(t,n,o)}s=s.next}while(s!==r)}}function yi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Jl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function pp(e){var t=e.alternate;t!==null&&(e.alternate=null,pp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[At],delete t[_s],delete t[Fl],delete t[gg],delete t[yg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function mp(e){return e.tag===5||e.tag===3||e.tag===4}function Tu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||mp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ea(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Bo));else if(r!==4&&(e=e.child,e!==null))for(ea(e,t,n),e=e.sibling;e!==null;)ea(e,t,n),e=e.sibling}function ta(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ta(e,t,n),e=e.sibling;e!==null;)ta(e,t,n),e=e.sibling}var Ue=null,Nt=!1;function en(e,t,n){for(n=n.child;n!==null;)hp(e,t,n),n=n.sibling}function hp(e,t,n){if($t&&typeof $t.onCommitFiberUnmount=="function")try{$t.onCommitFiberUnmount(ci,n)}catch{}switch(n.tag){case 5:qe||ir(n,t);case 6:var r=Ue,s=Nt;Ue=null,en(e,t,n),Ue=r,Nt=s,Ue!==null&&(Nt?(e=Ue,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ue.removeChild(n.stateNode));break;case 18:Ue!==null&&(Nt?(e=Ue,n=n.stateNode,e.nodeType===8?Vi(e.parentNode,n):e.nodeType===1&&Vi(e,n),bs(e)):Vi(Ue,n.stateNode));break;case 4:r=Ue,s=Nt,Ue=n.stateNode.containerInfo,Nt=!0,en(e,t,n),Ue=r,Nt=s;break;case 0:case 11:case 14:case 15:if(!qe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var o=s,l=o.destroy;o=o.tag,l!==void 0&&(o&2||o&4)&&Zl(n,t,l),s=s.next}while(s!==r)}en(e,t,n);break;case 1:if(!qe&&(ir(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){Ne(n,t,c)}en(e,t,n);break;case 21:en(e,t,n);break;case 22:n.mode&1?(qe=(r=qe)||n.memoizedState!==null,en(e,t,n),qe=r):en(e,t,n);break;default:en(e,t,n)}}function Mu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Pg),t.forEach(function(r){var s=Wg.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function St(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var o=e,l=t,c=l;e:for(;c!==null;){switch(c.tag){case 5:Ue=c.stateNode,Nt=!1;break e;case 3:Ue=c.stateNode.containerInfo,Nt=!0;break e;case 4:Ue=c.stateNode.containerInfo,Nt=!0;break e}c=c.return}if(Ue===null)throw Error(U(160));hp(o,l,s),Ue=null,Nt=!1;var a=s.alternate;a!==null&&(a.return=null),s.return=null}catch(u){Ne(s,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)gp(t,e),t=t.sibling}function gp(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(St(t,e),Mt(e),r&4){try{us(3,e,e.return),yi(3,e)}catch(v){Ne(e,e.return,v)}try{us(5,e,e.return)}catch(v){Ne(e,e.return,v)}}break;case 1:St(t,e),Mt(e),r&512&&n!==null&&ir(n,n.return);break;case 5:if(St(t,e),Mt(e),r&512&&n!==null&&ir(n,n.return),e.flags&32){var s=e.stateNode;try{ys(s,"")}catch(v){Ne(e,e.return,v)}}if(r&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,l=n!==null?n.memoizedProps:o,c=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&zd(s,o),Nl(c,l);var u=Nl(c,o);for(l=0;l<a.length;l+=2){var f=a[l],d=a[l+1];f==="style"?Od(s,d):f==="dangerouslySetInnerHTML"?Ud(s,d):f==="children"?ys(s,d):ja(s,f,d,u)}switch(c){case"input":wl(s,o);break;case"textarea":Ld(s,o);break;case"select":var p=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var y=o.value;y!=null?ur(s,!!o.multiple,y,!1):p!==!!o.multiple&&(o.defaultValue!=null?ur(s,!!o.multiple,o.defaultValue,!0):ur(s,!!o.multiple,o.multiple?[]:"",!1))}s[_s]=o}catch(v){Ne(e,e.return,v)}}break;case 6:if(St(t,e),Mt(e),r&4){if(e.stateNode===null)throw Error(U(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(v){Ne(e,e.return,v)}}break;case 3:if(St(t,e),Mt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{bs(t.containerInfo)}catch(v){Ne(e,e.return,v)}break;case 4:St(t,e),Mt(e);break;case 13:St(t,e),Mt(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(rc=Ee())),r&4&&Mu(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(qe=(u=qe)||f,St(t,e),qe=u):St(t,e),Mt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(Z=e,f=e.child;f!==null;){for(d=Z=f;Z!==null;){switch(p=Z,y=p.child,p.tag){case 0:case 11:case 14:case 15:us(4,p,p.return);break;case 1:ir(p,p.return);var g=p.stateNode;if(typeof g.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,g.props=t.memoizedProps,g.state=t.memoizedState,g.componentWillUnmount()}catch(v){Ne(r,n,v)}}break;case 5:ir(p,p.return);break;case 22:if(p.memoizedState!==null){Au(d);continue}}y!==null?(y.return=p,Z=y):Au(d)}f=f.sibling}e:for(f=null,d=e;;){if(d.tag===5){if(f===null){f=d;try{s=d.stateNode,u?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=d.stateNode,a=d.memoizedProps.style,l=a!=null&&a.hasOwnProperty("display")?a.display:null,c.style.display=Bd("display",l))}catch(v){Ne(e,e.return,v)}}}else if(d.tag===6){if(f===null)try{d.stateNode.nodeValue=u?"":d.memoizedProps}catch(v){Ne(e,e.return,v)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===e)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;d.sibling===null;){if(d.return===null||d.return===e)break e;f===d&&(f=null),d=d.return}f===d&&(f=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:St(t,e),Mt(e),r&4&&Mu(e);break;case 21:break;default:St(t,e),Mt(e)}}function Mt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(mp(n)){var r=n;break e}n=n.return}throw Error(U(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(ys(s,""),r.flags&=-33);var o=Tu(e);ta(e,o,s);break;case 3:case 4:var l=r.stateNode.containerInfo,c=Tu(e);ea(e,c,l);break;default:throw Error(U(161))}}catch(a){Ne(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function $g(e,t,n){Z=e,yp(e)}function yp(e,t,n){for(var r=(e.mode&1)!==0;Z!==null;){var s=Z,o=s.child;if(s.tag===22&&r){var l=s.memoizedState!==null||ao;if(!l){var c=s.alternate,a=c!==null&&c.memoizedState!==null||qe;c=ao;var u=qe;if(ao=l,(qe=a)&&!u)for(Z=s;Z!==null;)l=Z,a=l.child,l.tag===22&&l.memoizedState!==null?$u(s):a!==null?(a.return=l,Z=a):$u(s);for(;o!==null;)Z=o,yp(o),o=o.sibling;Z=s,ao=c,qe=u}Pu(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,Z=o):Pu(e)}}function Pu(e){for(;Z!==null;){var t=Z;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:qe||yi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!qe)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:jt(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&yu(t,o,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}yu(t,l,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var d=f.dehydrated;d!==null&&bs(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(U(163))}qe||t.flags&512&&Jl(t)}catch(p){Ne(t,t.return,p)}}if(t===e){Z=null;break}if(n=t.sibling,n!==null){n.return=t.return,Z=n;break}Z=t.return}}function Au(e){for(;Z!==null;){var t=Z;if(t===e){Z=null;break}var n=t.sibling;if(n!==null){n.return=t.return,Z=n;break}Z=t.return}}function $u(e){for(;Z!==null;){var t=Z;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{yi(4,t)}catch(a){Ne(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(a){Ne(t,s,a)}}var o=t.return;try{Jl(t)}catch(a){Ne(t,o,a)}break;case 5:var l=t.return;try{Jl(t)}catch(a){Ne(t,l,a)}}}catch(a){Ne(t,t.return,a)}if(t===e){Z=null;break}var c=t.sibling;if(c!==null){c.return=t.return,Z=c;break}Z=t.return}}var Dg=Math.ceil,Zo=Zt.ReactCurrentDispatcher,tc=Zt.ReactCurrentOwner,xt=Zt.ReactCurrentBatchConfig,fe=0,De=null,Ie=null,Oe=0,lt=0,lr=jn(0),Ae=0,Ms=null,Wn=0,xi=0,nc=0,ds=null,nt=null,rc=0,jr=1/0,Ut=null,Jo=!1,na=null,yn=null,co=!1,un=null,ei=0,fs=0,ra=null,Eo=-1,Io=0;function Ze(){return fe&6?Ee():Eo!==-1?Eo:Eo=Ee()}function xn(e){return e.mode&1?fe&2&&Oe!==0?Oe&-Oe:vg.transition!==null?(Io===0&&(Io=ef()),Io):(e=me,e!==0||(e=window.event,e=e===void 0?16:af(e.type)),e):1}function Et(e,t,n,r){if(50<fs)throw fs=0,ra=null,Error(U(185));Us(e,n,r),(!(fe&2)||e!==De)&&(e===De&&(!(fe&2)&&(xi|=n),Ae===4&&ln(e,Oe)),it(e,r),n===1&&fe===0&&!(t.mode&1)&&(jr=Ee()+500,mi&&Nn()))}function it(e,t){var n=e.callbackNode;vh(e,t);var r=zo(e,e===De?Oe:0);if(r===0)n!==null&&Vc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Vc(n),t===1)e.tag===0?xg(Du.bind(null,e)):Cf(Du.bind(null,e)),mg(function(){!(fe&6)&&Nn()}),n=null;else{switch(tf(r)){case 1:n=Ia;break;case 4:n=Zd;break;case 16:n=Do;break;case 536870912:n=Jd;break;default:n=Do}n=Np(n,xp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function xp(e,t){if(Eo=-1,Io=0,fe&6)throw Error(U(327));var n=e.callbackNode;if(hr()&&e.callbackNode!==n)return null;var r=zo(e,e===De?Oe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ti(e,r);else{t=r;var s=fe;fe|=2;var o=wp();(De!==e||Oe!==t)&&(Ut=null,jr=Ee()+500,Dn(e,t));do try{Fg();break}catch(c){vp(e,c)}while(!0);Oa(),Zo.current=o,fe=s,Ie!==null?t=0:(De=null,Oe=0,t=Ae)}if(t!==0){if(t===2&&(s=Rl(e),s!==0&&(r=s,t=sa(e,s))),t===1)throw n=Ms,Dn(e,0),ln(e,r),it(e,Ee()),n;if(t===6)ln(e,r);else{if(s=e.current.alternate,!(r&30)&&!zg(s)&&(t=ti(e,r),t===2&&(o=Rl(e),o!==0&&(r=o,t=sa(e,o))),t===1))throw n=Ms,Dn(e,0),ln(e,r),it(e,Ee()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(U(345));case 2:In(e,nt,Ut);break;case 3:if(ln(e,r),(r&130023424)===r&&(t=rc+500-Ee(),10<t)){if(zo(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Ze(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Ll(In.bind(null,e,nt,Ut),t);break}In(e,nt,Ut);break;case 4:if(ln(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var l=31-Ct(r);o=1<<l,l=t[l],l>s&&(s=l),r&=~o}if(r=s,r=Ee()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Dg(r/1960))-r,10<r){e.timeoutHandle=Ll(In.bind(null,e,nt,Ut),r);break}In(e,nt,Ut);break;case 5:In(e,nt,Ut);break;default:throw Error(U(329))}}}return it(e,Ee()),e.callbackNode===n?xp.bind(null,e):null}function sa(e,t){var n=ds;return e.current.memoizedState.isDehydrated&&(Dn(e,t).flags|=256),e=ti(e,t),e!==2&&(t=nt,nt=n,t!==null&&oa(t)),e}function oa(e){nt===null?nt=e:nt.push.apply(nt,e)}function zg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],o=s.getSnapshot;s=s.value;try{if(!It(o(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ln(e,t){for(t&=~nc,t&=~xi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ct(t),r=1<<n;e[n]=-1,t&=~r}}function Du(e){if(fe&6)throw Error(U(327));hr();var t=zo(e,0);if(!(t&1))return it(e,Ee()),null;var n=ti(e,t);if(e.tag!==0&&n===2){var r=Rl(e);r!==0&&(t=r,n=sa(e,r))}if(n===1)throw n=Ms,Dn(e,0),ln(e,t),it(e,Ee()),n;if(n===6)throw Error(U(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,In(e,nt,Ut),it(e,Ee()),null}function sc(e,t){var n=fe;fe|=1;try{return e(t)}finally{fe=n,fe===0&&(jr=Ee()+500,mi&&Nn())}}function Vn(e){un!==null&&un.tag===0&&!(fe&6)&&hr();var t=fe;fe|=1;var n=xt.transition,r=me;try{if(xt.transition=null,me=1,e)return e()}finally{me=r,xt.transition=n,fe=t,!(fe&6)&&Nn()}}function oc(){lt=lr.current,we(lr)}function Dn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,pg(n)),Ie!==null)for(n=Ie.return;n!==null;){var r=n;switch(Fa(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Oo();break;case 3:kr(),we(st),we(Ge),qa();break;case 5:Qa(r);break;case 4:kr();break;case 13:we(ke);break;case 19:we(ke);break;case 10:Wa(r.type._context);break;case 22:case 23:oc()}n=n.return}if(De=e,Ie=e=vn(e.current,null),Oe=lt=t,Ae=0,Ms=null,nc=xi=Wn=0,nt=ds=null,Pn!==null){for(t=0;t<Pn.length;t++)if(n=Pn[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,o=n.pending;if(o!==null){var l=o.next;o.next=s,r.next=l}n.pending=r}Pn=null}return e}function vp(e,t){do{var n=Ie;try{if(Oa(),No.current=Yo,Xo){for(var r=Se.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}Xo=!1}if(On=0,$e=Pe=Se=null,cs=!1,Is=0,tc.current=null,n===null||n.return===null){Ae=1,Ms=t,Ie=null;break}e:{var o=e,l=n.return,c=n,a=t;if(t=Oe,c.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,f=c,d=f.tag;if(!(f.mode&1)&&(d===0||d===11||d===15)){var p=f.alternate;p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var y=Su(l);if(y!==null){y.flags&=-257,ju(y,l,c,o,t),y.mode&1&&ku(o,u,t),t=y,a=u;var g=t.updateQueue;if(g===null){var v=new Set;v.add(a),t.updateQueue=v}else g.add(a);break e}else{if(!(t&1)){ku(o,u,t),ic();break e}a=Error(U(426))}}else if(be&&c.mode&1){var k=Su(l);if(k!==null){!(k.flags&65536)&&(k.flags|=256),ju(k,l,c,o,t),Ua(Sr(a,c));break e}}o=a=Sr(a,c),Ae!==4&&(Ae=2),ds===null?ds=[o]:ds.push(o),o=l;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var h=np(o,a,t);gu(o,h);break e;case 1:c=a;var m=o.type,x=o.stateNode;if(!(o.flags&128)&&(typeof m.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(yn===null||!yn.has(x)))){o.flags|=65536,t&=-t,o.lanes|=t;var b=rp(o,c,t);gu(o,b);break e}}o=o.return}while(o!==null)}kp(n)}catch(E){t=E,Ie===n&&n!==null&&(Ie=n=n.return);continue}break}while(!0)}function wp(){var e=Zo.current;return Zo.current=Yo,e===null?Yo:e}function ic(){(Ae===0||Ae===3||Ae===2)&&(Ae=4),De===null||!(Wn&268435455)&&!(xi&268435455)||ln(De,Oe)}function ti(e,t){var n=fe;fe|=2;var r=wp();(De!==e||Oe!==t)&&(Ut=null,Dn(e,t));do try{Lg();break}catch(s){vp(e,s)}while(!0);if(Oa(),fe=n,Zo.current=r,Ie!==null)throw Error(U(261));return De=null,Oe=0,Ae}function Lg(){for(;Ie!==null;)bp(Ie)}function Fg(){for(;Ie!==null&&!uh();)bp(Ie)}function bp(e){var t=jp(e.alternate,e,lt);e.memoizedProps=e.pendingProps,t===null?kp(e):Ie=t,tc.current=null}function kp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Mg(n,t),n!==null){n.flags&=32767,Ie=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ae=6,Ie=null;return}}else if(n=Tg(n,t,lt),n!==null){Ie=n;return}if(t=t.sibling,t!==null){Ie=t;return}Ie=t=e}while(t!==null);Ae===0&&(Ae=5)}function In(e,t,n){var r=me,s=xt.transition;try{xt.transition=null,me=1,Ug(e,t,n,r)}finally{xt.transition=s,me=r}return null}function Ug(e,t,n,r){do hr();while(un!==null);if(fe&6)throw Error(U(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(U(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(wh(e,o),e===De&&(Ie=De=null,Oe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||co||(co=!0,Np(Do,function(){return hr(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=xt.transition,xt.transition=null;var l=me;me=1;var c=fe;fe|=4,tc.current=null,Ag(e,n),gp(n,e),ig(Dl),Lo=!!$l,Dl=$l=null,e.current=n,$g(n),dh(),fe=c,me=l,xt.transition=o}else e.current=n;if(co&&(co=!1,un=e,ei=s),o=e.pendingLanes,o===0&&(yn=null),mh(n.stateNode),it(e,Ee()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Jo)throw Jo=!1,e=na,na=null,e;return ei&1&&e.tag!==0&&hr(),o=e.pendingLanes,o&1?e===ra?fs++:(fs=0,ra=e):fs=0,Nn(),null}function hr(){if(un!==null){var e=tf(ei),t=xt.transition,n=me;try{if(xt.transition=null,me=16>e?16:e,un===null)var r=!1;else{if(e=un,un=null,ei=0,fe&6)throw Error(U(331));var s=fe;for(fe|=4,Z=e.current;Z!==null;){var o=Z,l=o.child;if(Z.flags&16){var c=o.deletions;if(c!==null){for(var a=0;a<c.length;a++){var u=c[a];for(Z=u;Z!==null;){var f=Z;switch(f.tag){case 0:case 11:case 15:us(8,f,o)}var d=f.child;if(d!==null)d.return=f,Z=d;else for(;Z!==null;){f=Z;var p=f.sibling,y=f.return;if(pp(f),f===u){Z=null;break}if(p!==null){p.return=y,Z=p;break}Z=y}}}var g=o.alternate;if(g!==null){var v=g.child;if(v!==null){g.child=null;do{var k=v.sibling;v.sibling=null,v=k}while(v!==null)}}Z=o}}if(o.subtreeFlags&2064&&l!==null)l.return=o,Z=l;else e:for(;Z!==null;){if(o=Z,o.flags&2048)switch(o.tag){case 0:case 11:case 15:us(9,o,o.return)}var h=o.sibling;if(h!==null){h.return=o.return,Z=h;break e}Z=o.return}}var m=e.current;for(Z=m;Z!==null;){l=Z;var x=l.child;if(l.subtreeFlags&2064&&x!==null)x.return=l,Z=x;else e:for(l=m;Z!==null;){if(c=Z,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:yi(9,c)}}catch(E){Ne(c,c.return,E)}if(c===l){Z=null;break e}var b=c.sibling;if(b!==null){b.return=c.return,Z=b;break e}Z=c.return}}if(fe=s,Nn(),$t&&typeof $t.onPostCommitFiberRoot=="function")try{$t.onPostCommitFiberRoot(ci,e)}catch{}r=!0}return r}finally{me=n,xt.transition=t}}return!1}function zu(e,t,n){t=Sr(n,t),t=np(e,t,1),e=gn(e,t,1),t=Ze(),e!==null&&(Us(e,1,t),it(e,t))}function Ne(e,t,n){if(e.tag===3)zu(e,e,n);else for(;t!==null;){if(t.tag===3){zu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(yn===null||!yn.has(r))){e=Sr(n,e),e=rp(t,e,1),t=gn(t,e,1),e=Ze(),t!==null&&(Us(t,1,e),it(t,e));break}}t=t.return}}function Bg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ze(),e.pingedLanes|=e.suspendedLanes&n,De===e&&(Oe&n)===n&&(Ae===4||Ae===3&&(Oe&130023424)===Oe&&500>Ee()-rc?Dn(e,0):nc|=n),it(e,t)}function Sp(e,t){t===0&&(e.mode&1?(t=Js,Js<<=1,!(Js&130023424)&&(Js=4194304)):t=1);var n=Ze();e=Xt(e,t),e!==null&&(Us(e,t,n),it(e,n))}function Og(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Sp(e,n)}function Wg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(U(314))}r!==null&&r.delete(t),Sp(e,n)}var jp;jp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||st.current)rt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return rt=!1,Rg(e,t,n);rt=!!(e.flags&131072)}else rt=!1,be&&t.flags&1048576&&Ef(t,Ho,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Co(e,t),e=t.pendingProps;var s=vr(t,Ge.current);mr(t,n),s=Xa(null,t,r,e,s,n);var o=Ya();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ot(r)?(o=!0,Wo(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Ha(t),s.updater=gi,t.stateNode=s,s._reactInternals=t,Hl(t,r,e,n),t=ql(null,t,r,!0,o,n)):(t.tag=0,be&&o&&La(t),Ye(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Co(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=Hg(r),e=jt(r,e),s){case 0:t=Ql(null,t,r,e,n);break e;case 1:t=Cu(null,t,r,e,n);break e;case 11:t=Nu(null,t,r,e,n);break e;case 14:t=_u(null,t,r,jt(r.type,e),n);break e}throw Error(U(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:jt(r,s),Ql(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:jt(r,s),Cu(e,t,r,s,n);case 3:e:{if(lp(t),e===null)throw Error(U(387));r=t.pendingProps,o=t.memoizedState,s=o.element,Af(e,t),qo(t,r,null,n);var l=t.memoizedState;if(r=l.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=Sr(Error(U(423)),t),t=Eu(e,t,r,n,s);break e}else if(r!==s){s=Sr(Error(U(424)),t),t=Eu(e,t,r,n,s);break e}else for(at=hn(t.stateNode.containerInfo.firstChild),ct=t,be=!0,_t=null,n=Mf(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(wr(),r===s){t=Yt(e,t,n);break e}Ye(e,t,r,n)}t=t.child}return t;case 5:return $f(t),e===null&&Ol(t),r=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,l=s.children,zl(r,s)?l=null:o!==null&&zl(r,o)&&(t.flags|=32),ip(e,t),Ye(e,t,l,n),t.child;case 6:return e===null&&Ol(t),null;case 13:return ap(e,t,n);case 4:return Ka(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=br(t,null,r,n):Ye(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:jt(r,s),Nu(e,t,r,s,n);case 7:return Ye(e,t,t.pendingProps,n),t.child;case 8:return Ye(e,t,t.pendingProps.children,n),t.child;case 12:return Ye(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,o=t.memoizedProps,l=s.value,ye(Ko,r._currentValue),r._currentValue=l,o!==null)if(It(o.value,l)){if(o.children===s.children&&!st.current){t=Yt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){l=o.child;for(var a=c.firstContext;a!==null;){if(a.context===r){if(o.tag===1){a=Kt(-1,n&-n),a.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?a.next=a:(a.next=f.next,f.next=a),u.pending=a}}o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Wl(o.return,n,t),c.lanes|=n;break}a=a.next}}else if(o.tag===10)l=o.type===t.type?null:o.child;else if(o.tag===18){if(l=o.return,l===null)throw Error(U(341));l.lanes|=n,c=l.alternate,c!==null&&(c.lanes|=n),Wl(l,n,t),l=o.sibling}else l=o.child;if(l!==null)l.return=o;else for(l=o;l!==null;){if(l===t){l=null;break}if(o=l.sibling,o!==null){o.return=l.return,l=o;break}l=l.return}o=l}Ye(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,mr(t,n),s=vt(s),r=r(s),t.flags|=1,Ye(e,t,r,n),t.child;case 14:return r=t.type,s=jt(r,t.pendingProps),s=jt(r.type,s),_u(e,t,r,s,n);case 15:return sp(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:jt(r,s),Co(e,t),t.tag=1,ot(r)?(e=!0,Wo(t)):e=!1,mr(t,n),tp(t,r,s),Hl(t,r,s,n),ql(null,t,r,!0,e,n);case 19:return cp(e,t,n);case 22:return op(e,t,n)}throw Error(U(156,t.tag))};function Np(e,t){return Yd(e,t)}function Vg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function yt(e,t,n,r){return new Vg(e,t,n,r)}function lc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hg(e){if(typeof e=="function")return lc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===_a)return 11;if(e===Ca)return 14}return 2}function vn(e,t){var n=e.alternate;return n===null?(n=yt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ro(e,t,n,r,s,o){var l=2;if(r=e,typeof e=="function")lc(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Yn:return zn(n.children,s,o,t);case Na:l=8,s|=8;break;case hl:return e=yt(12,n,t,s|2),e.elementType=hl,e.lanes=o,e;case gl:return e=yt(13,n,t,s),e.elementType=gl,e.lanes=o,e;case yl:return e=yt(19,n,t,s),e.elementType=yl,e.lanes=o,e;case Ad:return vi(n,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Md:l=10;break e;case Pd:l=9;break e;case _a:l=11;break e;case Ca:l=14;break e;case rn:l=16,r=null;break e}throw Error(U(130,e==null?e:typeof e,""))}return t=yt(l,n,t,s),t.elementType=e,t.type=r,t.lanes=o,t}function zn(e,t,n,r){return e=yt(7,e,r,t),e.lanes=n,e}function vi(e,t,n,r){return e=yt(22,e,r,t),e.elementType=Ad,e.lanes=n,e.stateNode={isHidden:!1},e}function Zi(e,t,n){return e=yt(6,e,null,t),e.lanes=n,e}function Ji(e,t,n){return t=yt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Kg(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Pi(0),this.expirationTimes=Pi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pi(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function ac(e,t,n,r,s,o,l,c,a){return e=new Kg(e,t,n,c,a),t===1?(t=1,o===!0&&(t|=8)):t=0,o=yt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ha(o),e}function Qg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Xn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function _p(e){if(!e)return bn;e=e._reactInternals;e:{if(Kn(e)!==e||e.tag!==1)throw Error(U(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ot(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(U(171))}if(e.tag===1){var n=e.type;if(ot(n))return _f(e,n,t)}return t}function Cp(e,t,n,r,s,o,l,c,a){return e=ac(n,r,!0,e,s,o,l,c,a),e.context=_p(null),n=e.current,r=Ze(),s=xn(n),o=Kt(r,s),o.callback=t??null,gn(n,o,s),e.current.lanes=s,Us(e,s,r),it(e,r),e}function wi(e,t,n,r){var s=t.current,o=Ze(),l=xn(s);return n=_p(n),t.context===null?t.context=n:t.pendingContext=n,t=Kt(o,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=gn(s,t,l),e!==null&&(Et(e,s,l,o),jo(e,s,l)),l}function ni(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Lu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function cc(e,t){Lu(e,t),(e=e.alternate)&&Lu(e,t)}function qg(){return null}var Ep=typeof reportError=="function"?reportError:function(e){console.error(e)};function uc(e){this._internalRoot=e}bi.prototype.render=uc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(U(409));wi(e,t,null,null)};bi.prototype.unmount=uc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Vn(function(){wi(null,e,null,null)}),t[Gt]=null}};function bi(e){this._internalRoot=e}bi.prototype.unstable_scheduleHydration=function(e){if(e){var t=sf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<on.length&&t!==0&&t<on[n].priority;n++);on.splice(n,0,e),n===0&&lf(e)}};function dc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ki(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Fu(){}function Gg(e,t,n,r,s){if(s){if(typeof r=="function"){var o=r;r=function(){var u=ni(l);o.call(u)}}var l=Cp(t,r,e,0,null,!1,!1,"",Fu);return e._reactRootContainer=l,e[Gt]=l.current,js(e.nodeType===8?e.parentNode:e),Vn(),l}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var c=r;r=function(){var u=ni(a);c.call(u)}}var a=ac(e,0,!1,null,null,!1,!1,"",Fu);return e._reactRootContainer=a,e[Gt]=a.current,js(e.nodeType===8?e.parentNode:e),Vn(function(){wi(t,a,n,r)}),a}function Si(e,t,n,r,s){var o=n._reactRootContainer;if(o){var l=o;if(typeof s=="function"){var c=s;s=function(){var a=ni(l);c.call(a)}}wi(t,l,e,s)}else l=Gg(n,t,e,s,r);return ni(l)}nf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Jr(t.pendingLanes);n!==0&&(Ra(t,n|1),it(t,Ee()),!(fe&6)&&(jr=Ee()+500,Nn()))}break;case 13:Vn(function(){var r=Xt(e,1);if(r!==null){var s=Ze();Et(r,e,1,s)}}),cc(e,1)}};Ta=function(e){if(e.tag===13){var t=Xt(e,134217728);if(t!==null){var n=Ze();Et(t,e,134217728,n)}cc(e,134217728)}};rf=function(e){if(e.tag===13){var t=xn(e),n=Xt(e,t);if(n!==null){var r=Ze();Et(n,e,t,r)}cc(e,t)}};sf=function(){return me};of=function(e,t){var n=me;try{return me=e,t()}finally{me=n}};Cl=function(e,t,n){switch(t){case"input":if(wl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=pi(r);if(!s)throw Error(U(90));Dd(r),wl(r,s)}}}break;case"textarea":Ld(e,n);break;case"select":t=n.value,t!=null&&ur(e,!!n.multiple,t,!1)}};Hd=sc;Kd=Vn;var Xg={usingClientEntryPoint:!1,Events:[Os,tr,pi,Wd,Vd,sc]},Vr={findFiberByHostInstance:Mn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Yg={bundleType:Vr.bundleType,version:Vr.version,rendererPackageName:Vr.rendererPackageName,rendererConfig:Vr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Zt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Gd(e),e===null?null:e.stateNode},findFiberByHostInstance:Vr.findFiberByHostInstance||qg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var uo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!uo.isDisabled&&uo.supportsFiber)try{ci=uo.inject(Yg),$t=uo}catch{}}dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xg;dt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!dc(t))throw Error(U(200));return Qg(e,t,null,n)};dt.createRoot=function(e,t){if(!dc(e))throw Error(U(299));var n=!1,r="",s=Ep;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=ac(e,1,!1,null,null,n,!1,r,s),e[Gt]=t.current,js(e.nodeType===8?e.parentNode:e),new uc(t)};dt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(U(188)):(e=Object.keys(e).join(","),Error(U(268,e)));return e=Gd(t),e=e===null?null:e.stateNode,e};dt.flushSync=function(e){return Vn(e)};dt.hydrate=function(e,t,n){if(!ki(t))throw Error(U(200));return Si(null,e,t,!0,n)};dt.hydrateRoot=function(e,t,n){if(!dc(e))throw Error(U(405));var r=n!=null&&n.hydratedSources||null,s=!1,o="",l=Ep;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=Cp(t,null,e,1,n??null,s,!1,o,l),e[Gt]=t.current,js(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new bi(t)};dt.render=function(e,t,n){if(!ki(t))throw Error(U(200));return Si(null,e,t,!1,n)};dt.unmountComponentAtNode=function(e){if(!ki(e))throw Error(U(40));return e._reactRootContainer?(Vn(function(){Si(null,null,e,!1,function(){e._reactRootContainer=null,e[Gt]=null})}),!0):!1};dt.unstable_batchedUpdates=sc;dt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ki(n))throw Error(U(200));if(e==null||e._reactInternals===void 0)throw Error(U(38));return Si(e,t,n,!1,r)};dt.version="18.3.1-next-f1338f8080-20240426";function Ip(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ip)}catch(e){console.error(e)}}Ip(),Ed.exports=dt;var Rt=Ed.exports,Uu=Rt;pl.createRoot=Uu.createRoot,pl.hydrateRoot=Uu.hydrateRoot;/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Zg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),oe=(e,t)=>{const n=S.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:c="",children:a,...u},f)=>S.createElement("svg",{ref:f,...Zg,width:s,height:s,stroke:r,strokeWidth:l?Number(o)*24/Number(s):o,className:["lucide",`lucide-${Jg(e)}`,c].join(" "),...u},[...t.map(([d,p])=>S.createElement(d,p)),...Array.isArray(a)?a:[a]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ri=oe("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=oe("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bu=oe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fc=oe("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ou=oe("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=oe("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nr=oe("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rp=oe("ImagePlus",[["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7",key:"31hg93"}],["line",{x1:"16",x2:"22",y1:"5",y2:"5",key:"ez7e4s"}],["line",{x1:"19",x2:"19",y1:"2",y2:"8",key:"1gkr8c"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ey=oe("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pc=oe("KeyRound",[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",key:"167ctg"}],["circle",{cx:"16.5",cy:"7.5",r:".5",key:"1kog09"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ty=oe("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ny=oe("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const el=oe("ListOrdered",[["line",{x1:"10",x2:"21",y1:"6",y2:"6",key:"76qw6h"}],["line",{x1:"10",x2:"21",y1:"12",y2:"12",key:"16nom4"}],["line",{x1:"10",x2:"21",y1:"18",y2:"18",key:"u3jurt"}],["path",{d:"M4 6h1v4",key:"cnovpq"}],["path",{d:"M4 10h2",key:"16xx2s"}],["path",{d:"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",key:"m9a95d"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gr=oe("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ry=oe("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tp=oe("Music",[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sy=oe("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mp=oe("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",key:"1xcu5"}],["circle",{cx:"17.5",cy:"10.5",r:".5",key:"736e4u"}],["circle",{cx:"8.5",cy:"7.5",r:".5",key:"clrty"}],["circle",{cx:"6.5",cy:"12.5",r:".5",key:"1s4xz9"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=oe("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=oe("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=oe("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const si=oe("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oy=oe("RectangleHorizontal",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iy=oe("RectangleVertical",[["rect",{width:"12",height:"20",x:"6",y:"2",rx:"2",key:"1oxtiu"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ly=oe("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ps=oe("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=oe("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=oe("Scissors",[["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M8.12 8.12 12 12",key:"1alkpv"}],["path",{d:"M20 4 8.12 15.88",key:"xgtan2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M14.8 14.8 20 20",key:"ptml3r"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pp=oe("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ay=oe("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cy=oe("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ap=oe("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uy=oe("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ps=oe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dy=oe("Undo2",[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11",key:"llx8ln"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tl=oe("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $p=oe("UserRound",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=oe("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wu=oe("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=oe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fy=oe("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const py=oe("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);function mc(){var e,t;try{return((t=(e=window.require)==null?void 0:e.call(window,"electron"))==null?void 0:t.ipcRenderer)||null}catch{return null}}async function my(){var e;await((e=mc())==null?void 0:e.invoke("window-minimize"))}async function hc(){var e;await((e=mc())==null?void 0:e.invoke("toggle-maximize"))}async function hy(){var e;await((e=mc())==null?void 0:e.invoke("window-close"))}function gc({showMaximize:e=!0}){return i.jsxs("div",{className:"titlebar-no-drag flex items-center gap-1",children:[i.jsx("button",{type:"button",onClick:()=>void my(),className:"rounded-lg border border-white/20 bg-white/10 p-1.5 hover:bg-white/20",title:"最小化",children:i.jsx(ry,{className:"h-4 w-4"})}),e?i.jsx("button",{type:"button",onClick:()=>void hc(),className:"rounded-lg border border-white/20 bg-white/10 p-1.5 hover:bg-white/20",title:"最大化",children:i.jsx(uy,{className:"h-3.5 w-3.5"})}):null,i.jsx("button",{type:"button",onClick:()=>void hy(),className:"rounded-lg border border-white/20 bg-white/10 p-1.5 hover:bg-red-500 hover:text-white",title:"关闭",children:i.jsx(Re,{className:"h-4 w-4"})})]})}function Qn(e){return e===!1}function gy(e){return!(!Qn(e==null?void 0:e.packaged)||(e==null?void 0:e.uiMode)==="user")}const yy={},Vu=e=>{let t;const n=new Set,r=(f,d)=>{const p=typeof f=="function"?f(t):f;if(!Object.is(p,t)){const y=t;t=d??(typeof p!="object"||p===null)?p:Object.assign({},t,p),n.forEach(g=>g(t,y))}},s=()=>t,a={setState:r,getState:s,getInitialState:()=>u,subscribe:f=>(n.add(f),()=>n.delete(f)),destroy:()=>{(yy?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},u=t=e(r,s,a);return a},xy=e=>e?Vu(e):Vu;var zp={exports:{}},Lp={},Fp={exports:{}},Up={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _r=S;function vy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var wy=typeof Object.is=="function"?Object.is:vy,by=_r.useState,ky=_r.useEffect,Sy=_r.useLayoutEffect,jy=_r.useDebugValue;function Ny(e,t){var n=t(),r=by({inst:{value:n,getSnapshot:t}}),s=r[0].inst,o=r[1];return Sy(function(){s.value=n,s.getSnapshot=t,nl(s)&&o({inst:s})},[e,n,t]),ky(function(){return nl(s)&&o({inst:s}),e(function(){nl(s)&&o({inst:s})})},[e]),jy(n),n}function nl(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!wy(e,n)}catch{return!0}}function _y(e,t){return t()}var Cy=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?_y:Ny;Up.useSyncExternalStore=_r.useSyncExternalStore!==void 0?_r.useSyncExternalStore:Cy;Fp.exports=Up;var Ey=Fp.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ji=S,Iy=Ey;function Ry(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ty=typeof Object.is=="function"?Object.is:Ry,My=Iy.useSyncExternalStore,Py=ji.useRef,Ay=ji.useEffect,$y=ji.useMemo,Dy=ji.useDebugValue;Lp.useSyncExternalStoreWithSelector=function(e,t,n,r,s){var o=Py(null);if(o.current===null){var l={hasValue:!1,value:null};o.current=l}else l=o.current;o=$y(function(){function a(y){if(!u){if(u=!0,f=y,y=r(y),s!==void 0&&l.hasValue){var g=l.value;if(s(g,y))return d=g}return d=y}if(g=d,Ty(f,y))return g;var v=r(y);return s!==void 0&&s(g,v)?(f=y,g):(f=y,d=v)}var u=!1,f,d,p=n===void 0?null:n;return[function(){return a(t())},p===null?void 0:function(){return a(p())}]},[t,n,r,s]);var c=My(e,o[0],o[1]);return Ay(function(){l.hasValue=!0,l.value=c},[c]),Dy(c),c};zp.exports=Lp;var zy=zp.exports;const Ly=hd(zy),Bp={},{useDebugValue:Fy}=_d,{useSyncExternalStoreWithSelector:Uy}=Ly;let Hu=!1;const By=e=>e;function Oy(e,t=By,n){(Bp?"production":void 0)!=="production"&&n&&!Hu&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),Hu=!0);const r=Uy(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,n);return Fy(r),r}const Wy=e=>{(Bp?"production":void 0)!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t=typeof e=="function"?xy(e):e,n=(r,s)=>Oy(t,r,s);return Object.assign(n,t),n},Mr=e=>Wy,Vy={};function Op(e,t){let n;try{n=e()}catch{return}return{getItem:s=>{var o;const l=a=>a===null?null:JSON.parse(a,void 0),c=(o=n.getItem(s))!=null?o:null;return c instanceof Promise?c.then(l):l(c)},setItem:(s,o)=>n.setItem(s,JSON.stringify(o,void 0)),removeItem:s=>n.removeItem(s)}}const $s=e=>t=>{try{const n=e(t);return n instanceof Promise?n:{then(r){return $s(r)(n)},catch(r){return this}}}catch(n){return{then(r){return this},catch(r){return $s(r)(n)}}}},Hy=(e,t)=>(n,r,s)=>{let o={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:k=>k,version:0,merge:(k,h)=>({...h,...k}),...t},l=!1;const c=new Set,a=new Set;let u;try{u=o.getStorage()}catch{}if(!u)return e((...k)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),n(...k)},r,s);const f=$s(o.serialize),d=()=>{const k=o.partialize({...r()});let h;const m=f({state:k,version:o.version}).then(x=>u.setItem(o.name,x)).catch(x=>{h=x});if(h)throw h;return m},p=s.setState;s.setState=(k,h)=>{p(k,h),d()};const y=e((...k)=>{n(...k),d()},r,s);let g;const v=()=>{var k;if(!u)return;l=!1,c.forEach(m=>m(r()));const h=((k=o.onRehydrateStorage)==null?void 0:k.call(o,r()))||void 0;return $s(u.getItem.bind(u))(o.name).then(m=>{if(m)return o.deserialize(m)}).then(m=>{if(m)if(typeof m.version=="number"&&m.version!==o.version){if(o.migrate)return o.migrate(m.state,m.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return m.state}).then(m=>{var x;return g=o.merge(m,(x=r())!=null?x:y),n(g,!0),d()}).then(()=>{h==null||h(g,void 0),l=!0,a.forEach(m=>m(g))}).catch(m=>{h==null||h(void 0,m)})};return s.persist={setOptions:k=>{o={...o,...k},k.getStorage&&(u=k.getStorage())},clearStorage:()=>{u==null||u.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>v(),hasHydrated:()=>l,onHydrate:k=>(c.add(k),()=>{c.delete(k)}),onFinishHydration:k=>(a.add(k),()=>{a.delete(k)})},v(),g||y},Ky=(e,t)=>(n,r,s)=>{let o={storage:Op(()=>localStorage),partialize:v=>v,version:0,merge:(v,k)=>({...k,...v}),...t},l=!1;const c=new Set,a=new Set;let u=o.storage;if(!u)return e((...v)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),n(...v)},r,s);const f=()=>{const v=o.partialize({...r()});return u.setItem(o.name,{state:v,version:o.version})},d=s.setState;s.setState=(v,k)=>{d(v,k),f()};const p=e((...v)=>{n(...v),f()},r,s);s.getInitialState=()=>p;let y;const g=()=>{var v,k;if(!u)return;l=!1,c.forEach(m=>{var x;return m((x=r())!=null?x:p)});const h=((k=o.onRehydrateStorage)==null?void 0:k.call(o,(v=r())!=null?v:p))||void 0;return $s(u.getItem.bind(u))(o.name).then(m=>{if(m)if(typeof m.version=="number"&&m.version!==o.version){if(o.migrate)return[!0,o.migrate(m.state,m.version)];console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,m.state];return[!1,void 0]}).then(m=>{var x;const[b,E]=m;if(y=o.merge(E,(x=r())!=null?x:p),n(y,!0),b)return f()}).then(()=>{h==null||h(y,void 0),y=r(),l=!0,a.forEach(m=>m(y))}).catch(m=>{h==null||h(void 0,m)})};return s.persist={setOptions:v=>{o={...o,...v},v.storage&&(u=v.storage)},clearStorage:()=>{u==null||u.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>g(),hasHydrated:()=>l,onHydrate:v=>(c.add(v),()=>{c.delete(v)}),onFinishHydration:v=>(a.add(v),()=>{a.delete(v)})},o.skipHydration||g(),y||p},Qy=(e,t)=>"getStorage"in t||"serialize"in t||"deserialize"in t?((Vy?"production":void 0)!=="production"&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."),Hy(e,t)):Ky(e,t),Pr=Qy,kn=Mr()(Pr((e,t)=>({uiMode:"developer",setUiMode:n=>e({uiMode:n}),toggleUiMode:()=>e({uiMode:t().uiMode==="developer"?"user":"developer"})}),{name:"rh-ui-mode-v1"})),oi={morph:{id:"morph",label:"风格一",displayName:"CLHH MV 创作",mark:"CLHH",appId:"com.morph.tool",iconDir:"build/brands/morph"},wujiu:{id:"wujiu",label:"风格二",displayName:"无咎",mark:"W",appId:"com.wujiu.tool",iconDir:"build/brands/wujiu"}},Wp=[oi.morph,oi.wujiu],yc="morph";function xc(e){return e==="morph"||e==="wujiu"}function Ku(e){return xc(e)?oi[e]:oi[yc]}function qy(){const e="morph".trim();return xc(e)?e:yc}const vc=Mr()(Pr(e=>({previewBrandId:yc,setPreviewBrandId:t=>e({previewBrandId:t})}),{name:"rh-brand-preview-v1",partialize:e=>({previewBrandId:e.previewBrandId}),merge:(e,t)=>{const n=e||{};return{...t,previewBrandId:xc(n.previewBrandId)?n.previewBrandId:t.previewBrandId}}}));function Vs(e){const t=vc(n=>n.previewBrandId);return Qn(e)?Ku(t):Ku(qy())}function Gy({onOpenSettings:e,onOpenResultFolder:t,onOpenActivation:n,onOpenUserGuide:r,statusText:s,licensed:o,licenseReason:l,packaged:c=null}){const a=kn(g=>g.uiMode),u=kn(g=>g.toggleUiMode),f=vc(g=>g.setPreviewBrandId),d=Vs(c),p=Qn(c),y=a==="developer";return i.jsxs("header",{className:"titlebar-drag flex h-12 items-center justify-between border-b-2 border-black/20 bg-navy px-4 text-white shadow-md",onDoubleClick:()=>void hc(),children:[i.jsxs("div",{className:"flex min-w-0 items-center gap-3",children:[i.jsx("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold text-sm font-black text-navy",children:d.mark}),i.jsx("div",{className:"font-display truncate text-sm font-bold leading-tight",children:d.displayName})]}),i.jsxs("div",{className:"hidden items-center gap-2 rounded-full border border-gold/60 bg-black/30 px-3 py-1 text-xs text-gold md:flex",children:[i.jsx(Ap,{className:"h-3.5 w-3.5"}),s]}),i.jsxs("div",{className:"titlebar-no-drag flex items-center gap-2",onDoubleClick:g=>g.stopPropagation(),children:[p?i.jsxs(i.Fragment,{children:[i.jsxs("label",{className:"relative inline-flex items-center",title:"切换视觉品牌预览（仅开发环境；打包时用对应 build 脚本选定）",children:[i.jsx(Mp,{className:"pointer-events-none absolute left-2 h-3.5 w-3.5 text-gold"}),i.jsx("select",{value:d.id,onChange:g=>f(g.target.value==="wujiu"?"wujiu":"morph"),className:"appearance-none rounded-lg border border-white/30 bg-white/10 py-1.5 pl-7 pr-7 text-xs font-semibold text-white outline-none hover:bg-white/20",children:Wp.map(g=>i.jsxs("option",{value:g.id,className:"text-navy",children:[g.label," · ",g.displayName]},g.id))})]}),i.jsx("button",{type:"button",onClick:u,className:`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${y?"border-gold/70 bg-gold text-navy hover:brightness-95":"border-white/30 bg-white/10 text-white hover:bg-white/20"}`,title:y?"当前为开发模式（可见提示词文档）。点击切换为用户预览，模拟打包后界面。":"当前为用户预览（与打包后一致）。点击切回开发模式。",children:y?i.jsxs(i.Fragment,{children:[i.jsx(Dp,{className:"h-4 w-4"}),"开发模式"]}):i.jsxs(i.Fragment,{children:[i.jsx($p,{className:"h-4 w-4"}),"用户预览"]})})]}):null,i.jsxs("button",{type:"button",onClick:r,className:"inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs hover:bg-white/20",title:"使用说明",children:[i.jsx(ri,{className:"h-4 w-4"}),"使用说明"]}),l!=="open"?i.jsxs("button",{type:"button",onClick:n,className:`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs ${o?"border-white/20 bg-white/10 hover:bg-white/20":"border-amber-300 bg-amber-400 font-semibold text-navy hover:brightness-95"}`,title:o?"查看本机激活状态":"未激活，无法生成",children:[i.jsx(pc,{className:"h-4 w-4"}),o?l==="dev"?"本机免激活":"已激活":"未激活"]}):null,i.jsxs("button",{type:"button",onClick:t,className:"inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs hover:bg-white/20",title:"打开结果文件夹",children:[i.jsx(Nr,{className:"h-4 w-4"}),"结果文件夹"]}),i.jsxs("button",{type:"button",onClick:e,className:"inline-flex items-center gap-1 rounded-lg border border-white/20 bg-gold px-2.5 py-1.5 text-xs font-semibold text-navy hover:brightness-95",children:[i.jsx(Pp,{className:"h-4 w-4"}),"设置"]}),i.jsx(gc,{})]})]})}function Vp(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(n=Vp(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function Xy(){for(var e,t,n=0,r="",s=arguments.length;n<s;n++)(e=arguments[n])&&(t=Vp(e))&&(r&&(r+=" "),r+=t);return r}const wc="-",Yy=e=>{const t=Jy(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:l=>{const c=l.split(wc);return c[0]===""&&c.length!==1&&c.shift(),Hp(c,t)||Zy(l)},getConflictingClassGroupIds:(l,c)=>{const a=n[l]||[];return c&&r[l]?[...a,...r[l]]:a}}},Hp=(e,t)=>{var l;if(e.length===0)return t.classGroupId;const n=e[0],r=t.nextPart.get(n),s=r?Hp(e.slice(1),r):void 0;if(s)return s;if(t.validators.length===0)return;const o=e.join(wc);return(l=t.validators.find(({validator:c})=>c(o)))==null?void 0:l.classGroupId},Qu=/^\[(.+)\]$/,Zy=e=>{if(Qu.test(e)){const t=Qu.exec(e)[1],n=t==null?void 0:t.substring(0,t.indexOf(":"));if(n)return"arbitrary.."+n}},Jy=e=>{const{theme:t,prefix:n}=e,r={nextPart:new Map,validators:[]};return t0(Object.entries(e.classGroups),n).forEach(([o,l])=>{ua(l,r,o,t)}),r},ua=(e,t,n,r)=>{e.forEach(s=>{if(typeof s=="string"){const o=s===""?t:qu(t,s);o.classGroupId=n;return}if(typeof s=="function"){if(e0(s)){ua(s(r),t,n,r);return}t.validators.push({validator:s,classGroupId:n});return}Object.entries(s).forEach(([o,l])=>{ua(l,qu(t,o),n,r)})})},qu=(e,t)=>{let n=e;return t.split(wc).forEach(r=>{n.nextPart.has(r)||n.nextPart.set(r,{nextPart:new Map,validators:[]}),n=n.nextPart.get(r)}),n},e0=e=>e.isThemeGetter,t0=(e,t)=>t?e.map(([n,r])=>{const s=r.map(o=>typeof o=="string"?t+o:typeof o=="object"?Object.fromEntries(Object.entries(o).map(([l,c])=>[t+l,c])):o);return[n,s]}):e,n0=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,n=new Map,r=new Map;const s=(o,l)=>{n.set(o,l),t++,t>e&&(t=0,r=n,n=new Map)};return{get(o){let l=n.get(o);if(l!==void 0)return l;if((l=r.get(o))!==void 0)return s(o,l),l},set(o,l){n.has(o)?n.set(o,l):s(o,l)}}},Kp="!",r0=e=>{const{separator:t,experimentalParseClassName:n}=e,r=t.length===1,s=t[0],o=t.length,l=c=>{const a=[];let u=0,f=0,d;for(let k=0;k<c.length;k++){let h=c[k];if(u===0){if(h===s&&(r||c.slice(k,k+o)===t)){a.push(c.slice(f,k)),f=k+o;continue}if(h==="/"){d=k;continue}}h==="["?u++:h==="]"&&u--}const p=a.length===0?c:c.substring(f),y=p.startsWith(Kp),g=y?p.substring(1):p,v=d&&d>f?d-f:void 0;return{modifiers:a,hasImportantModifier:y,baseClassName:g,maybePostfixModifierPosition:v}};return n?c=>n({className:c,parseClassName:l}):l},s0=e=>{if(e.length<=1)return e;const t=[];let n=[];return e.forEach(r=>{r[0]==="["?(t.push(...n.sort(),r),n=[]):n.push(r)}),t.push(...n.sort()),t},o0=e=>({cache:n0(e.cacheSize),parseClassName:r0(e),...Yy(e)}),i0=/\s+/,l0=(e,t)=>{const{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:s}=t,o=[],l=e.trim().split(i0);let c="";for(let a=l.length-1;a>=0;a-=1){const u=l[a],{modifiers:f,hasImportantModifier:d,baseClassName:p,maybePostfixModifierPosition:y}=n(u);let g=!!y,v=r(g?p.substring(0,y):p);if(!v){if(!g){c=u+(c.length>0?" "+c:c);continue}if(v=r(p),!v){c=u+(c.length>0?" "+c:c);continue}g=!1}const k=s0(f).join(":"),h=d?k+Kp:k,m=h+v;if(o.includes(m))continue;o.push(m);const x=s(v,g);for(let b=0;b<x.length;++b){const E=x[b];o.push(h+E)}c=u+(c.length>0?" "+c:c)}return c};function a0(){let e=0,t,n,r="";for(;e<arguments.length;)(t=arguments[e++])&&(n=Qp(t))&&(r&&(r+=" "),r+=n);return r}const Qp=e=>{if(typeof e=="string")return e;let t,n="";for(let r=0;r<e.length;r++)e[r]&&(t=Qp(e[r]))&&(n&&(n+=" "),n+=t);return n};function c0(e,...t){let n,r,s,o=l;function l(a){const u=t.reduce((f,d)=>d(f),e());return n=o0(u),r=n.cache.get,s=n.cache.set,o=c,c(a)}function c(a){const u=r(a);if(u)return u;const f=l0(a,n);return s(a,f),f}return function(){return o(a0.apply(null,arguments))}}const xe=e=>{const t=n=>n[e]||[];return t.isThemeGetter=!0,t},qp=/^\[(?:([a-z-]+):)?(.+)\]$/i,u0=/^\d+\/\d+$/,d0=new Set(["px","full","screen"]),f0=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,p0=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,m0=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,h0=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,g0=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,zt=e=>yr(e)||d0.has(e)||u0.test(e),tn=e=>Ar(e,"length",j0),yr=e=>!!e&&!Number.isNaN(Number(e)),rl=e=>Ar(e,"number",yr),Hr=e=>!!e&&Number.isInteger(Number(e)),y0=e=>e.endsWith("%")&&yr(e.slice(0,-1)),ie=e=>qp.test(e),nn=e=>f0.test(e),x0=new Set(["length","size","percentage"]),v0=e=>Ar(e,x0,Gp),w0=e=>Ar(e,"position",Gp),b0=new Set(["image","url"]),k0=e=>Ar(e,b0,_0),S0=e=>Ar(e,"",N0),Kr=()=>!0,Ar=(e,t,n)=>{const r=qp.exec(e);return r?r[1]?typeof t=="string"?r[1]===t:t.has(r[1]):n(r[2]):!1},j0=e=>p0.test(e)&&!m0.test(e),Gp=()=>!1,N0=e=>h0.test(e),_0=e=>g0.test(e),C0=()=>{const e=xe("colors"),t=xe("spacing"),n=xe("blur"),r=xe("brightness"),s=xe("borderColor"),o=xe("borderRadius"),l=xe("borderSpacing"),c=xe("borderWidth"),a=xe("contrast"),u=xe("grayscale"),f=xe("hueRotate"),d=xe("invert"),p=xe("gap"),y=xe("gradientColorStops"),g=xe("gradientColorStopPositions"),v=xe("inset"),k=xe("margin"),h=xe("opacity"),m=xe("padding"),x=xe("saturate"),b=xe("scale"),E=xe("sepia"),j=xe("skew"),N=xe("space"),w=xe("translate"),_=()=>["auto","contain","none"],I=()=>["auto","hidden","clip","visible","scroll"],Q=()=>["auto",ie,t],X=()=>[ie,t],re=()=>["",zt,tn],O=()=>["auto",yr,ie],te=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],L=()=>["solid","dashed","dotted","double","none"],se=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],T=()=>["start","end","center","between","around","evenly","stretch"],D=()=>["","0",ie],Y=()=>["auto","avoid","all","avoid-page","page","left","right","column"],M=()=>[yr,ie];return{cacheSize:500,separator:":",theme:{colors:[Kr],spacing:[zt,tn],blur:["none","",nn,ie],brightness:M(),borderColor:[e],borderRadius:["none","","full",nn,ie],borderSpacing:X(),borderWidth:re(),contrast:M(),grayscale:D(),hueRotate:M(),invert:D(),gap:X(),gradientColorStops:[e],gradientColorStopPositions:[y0,tn],inset:Q(),margin:Q(),opacity:M(),padding:X(),saturate:M(),scale:M(),sepia:D(),skew:M(),space:X(),translate:X()},classGroups:{aspect:[{aspect:["auto","square","video",ie]}],container:["container"],columns:[{columns:[nn]}],"break-after":[{"break-after":Y()}],"break-before":[{"break-before":Y()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...te(),ie]}],overflow:[{overflow:I()}],"overflow-x":[{"overflow-x":I()}],"overflow-y":[{"overflow-y":I()}],overscroll:[{overscroll:_()}],"overscroll-x":[{"overscroll-x":_()}],"overscroll-y":[{"overscroll-y":_()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[v]}],"inset-x":[{"inset-x":[v]}],"inset-y":[{"inset-y":[v]}],start:[{start:[v]}],end:[{end:[v]}],top:[{top:[v]}],right:[{right:[v]}],bottom:[{bottom:[v]}],left:[{left:[v]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",Hr,ie]}],basis:[{basis:Q()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",ie]}],grow:[{grow:D()}],shrink:[{shrink:D()}],order:[{order:["first","last","none",Hr,ie]}],"grid-cols":[{"grid-cols":[Kr]}],"col-start-end":[{col:["auto",{span:["full",Hr,ie]},ie]}],"col-start":[{"col-start":O()}],"col-end":[{"col-end":O()}],"grid-rows":[{"grid-rows":[Kr]}],"row-start-end":[{row:["auto",{span:[Hr,ie]},ie]}],"row-start":[{"row-start":O()}],"row-end":[{"row-end":O()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",ie]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",ie]}],gap:[{gap:[p]}],"gap-x":[{"gap-x":[p]}],"gap-y":[{"gap-y":[p]}],"justify-content":[{justify:["normal",...T()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...T(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...T(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[m]}],px:[{px:[m]}],py:[{py:[m]}],ps:[{ps:[m]}],pe:[{pe:[m]}],pt:[{pt:[m]}],pr:[{pr:[m]}],pb:[{pb:[m]}],pl:[{pl:[m]}],m:[{m:[k]}],mx:[{mx:[k]}],my:[{my:[k]}],ms:[{ms:[k]}],me:[{me:[k]}],mt:[{mt:[k]}],mr:[{mr:[k]}],mb:[{mb:[k]}],ml:[{ml:[k]}],"space-x":[{"space-x":[N]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[N]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",ie,t]}],"min-w":[{"min-w":[ie,t,"min","max","fit"]}],"max-w":[{"max-w":[ie,t,"none","full","min","max","fit","prose",{screen:[nn]},nn]}],h:[{h:[ie,t,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[ie,t,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[ie,t,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[ie,t,"auto","min","max","fit"]}],"font-size":[{text:["base",nn,tn]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",rl]}],"font-family":[{font:[Kr]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",ie]}],"line-clamp":[{"line-clamp":["none",yr,rl]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",zt,ie]}],"list-image":[{"list-image":["none",ie]}],"list-style-type":[{list:["none","disc","decimal",ie]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...L(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",zt,tn]}],"underline-offset":[{"underline-offset":["auto",zt,ie]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:X()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",ie]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",ie]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...te(),w0]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",v0]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},k0]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[g]}],"gradient-via-pos":[{via:[g]}],"gradient-to-pos":[{to:[g]}],"gradient-from":[{from:[y]}],"gradient-via":[{via:[y]}],"gradient-to":[{to:[y]}],rounded:[{rounded:[o]}],"rounded-s":[{"rounded-s":[o]}],"rounded-e":[{"rounded-e":[o]}],"rounded-t":[{"rounded-t":[o]}],"rounded-r":[{"rounded-r":[o]}],"rounded-b":[{"rounded-b":[o]}],"rounded-l":[{"rounded-l":[o]}],"rounded-ss":[{"rounded-ss":[o]}],"rounded-se":[{"rounded-se":[o]}],"rounded-ee":[{"rounded-ee":[o]}],"rounded-es":[{"rounded-es":[o]}],"rounded-tl":[{"rounded-tl":[o]}],"rounded-tr":[{"rounded-tr":[o]}],"rounded-br":[{"rounded-br":[o]}],"rounded-bl":[{"rounded-bl":[o]}],"border-w":[{border:[c]}],"border-w-x":[{"border-x":[c]}],"border-w-y":[{"border-y":[c]}],"border-w-s":[{"border-s":[c]}],"border-w-e":[{"border-e":[c]}],"border-w-t":[{"border-t":[c]}],"border-w-r":[{"border-r":[c]}],"border-w-b":[{"border-b":[c]}],"border-w-l":[{"border-l":[c]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[...L(),"hidden"]}],"divide-x":[{"divide-x":[c]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[c]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:L()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-s":[{"border-s":[s]}],"border-color-e":[{"border-e":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...L()]}],"outline-offset":[{"outline-offset":[zt,ie]}],"outline-w":[{outline:[zt,tn]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:re()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[zt,tn]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",nn,S0]}],"shadow-color":[{shadow:[Kr]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...se(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":se()}],filter:[{filter:["","none"]}],blur:[{blur:[n]}],brightness:[{brightness:[r]}],contrast:[{contrast:[a]}],"drop-shadow":[{"drop-shadow":["","none",nn,ie]}],grayscale:[{grayscale:[u]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[d]}],saturate:[{saturate:[x]}],sepia:[{sepia:[E]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[n]}],"backdrop-brightness":[{"backdrop-brightness":[r]}],"backdrop-contrast":[{"backdrop-contrast":[a]}],"backdrop-grayscale":[{"backdrop-grayscale":[u]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[d]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[x]}],"backdrop-sepia":[{"backdrop-sepia":[E]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",ie]}],duration:[{duration:M()}],ease:[{ease:["linear","in","out","in-out",ie]}],delay:[{delay:M()}],animate:[{animate:["none","spin","ping","pulse","bounce",ie]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[b]}],"scale-x":[{"scale-x":[b]}],"scale-y":[{"scale-y":[b]}],rotate:[{rotate:[Hr,ie]}],"translate-x":[{"translate-x":[w]}],"translate-y":[{"translate-y":[w]}],"skew-x":[{"skew-x":[j]}],"skew-y":[{"skew-y":[j]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",ie]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",ie]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":X()}],"scroll-mx":[{"scroll-mx":X()}],"scroll-my":[{"scroll-my":X()}],"scroll-ms":[{"scroll-ms":X()}],"scroll-me":[{"scroll-me":X()}],"scroll-mt":[{"scroll-mt":X()}],"scroll-mr":[{"scroll-mr":X()}],"scroll-mb":[{"scroll-mb":X()}],"scroll-ml":[{"scroll-ml":X()}],"scroll-p":[{"scroll-p":X()}],"scroll-px":[{"scroll-px":X()}],"scroll-py":[{"scroll-py":X()}],"scroll-ps":[{"scroll-ps":X()}],"scroll-pe":[{"scroll-pe":X()}],"scroll-pt":[{"scroll-pt":X()}],"scroll-pr":[{"scroll-pr":X()}],"scroll-pb":[{"scroll-pb":X()}],"scroll-pl":[{"scroll-pl":X()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",ie]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[zt,tn,rl]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},E0=c0(C0);function ge(...e){return E0(Xy(e))}function I0(e){const t=String(e||"").trim();return t?/^【用户要求：[\s\S]*】$/.test(t)?t:`【用户要求：${t}】`:""}function R0(e){return String(e||"").replace(/\r\n/g,`
`).split(/\n?\s*===\s*\n?/).map(t=>t.trim()).filter(Boolean)}const Xp=6;function T0(e,t=Xp){const n=R0(e);if(n.length===0)return[""];if(n.length<=t)return[n.join(`
===
`)];const r=[];for(let s=0;s<n.length;s+=t)r.push(n.slice(s,s+t).join(`
===
`));return r}function M0({className:e,height:t=24}){return i.jsx("svg",{viewBox:"0 0 132 38",height:t,className:ge("shrink-0 select-none",e),"aria-label":"CLHH MV 创作",role:"img",children:i.jsx("text",{x:"0",y:"28",fontFamily:"system-ui, sans-serif",fontSize:"28",fontWeight:"700",fill:"currentColor",children:"CLHH"})})}function P0({onOpenSettings:e,onOpenResultFolder:t,onOpenActivation:n,onOpenUserGuide:r,onResetWorkspaces:s,licensed:o,licenseReason:l,packaged:c=null}){const a=kn(g=>g.uiMode),u=kn(g=>g.toggleUiMode),f=vc(g=>g.setPreviewBrandId),d=Vs(c),p=Qn(c),y=a==="developer";return i.jsxs("header",{className:"clhh-header titlebar-drag flex h-14 shrink-0 items-center justify-between px-5 morph-bg",onDoubleClick:()=>void hc(),children:[i.jsxs("div",{className:"clhh-brand",children:[i.jsx("strong",{children:"CLHH"}),i.jsx("small",{children:"MUSIC VIDEO CREATION"})]}),i.jsxs("div",{className:"titlebar-no-drag flex items-center gap-2",onDoubleClick:g=>g.stopPropagation(),children:[p?i.jsxs(i.Fragment,{children:[i.jsxs("label",{className:"relative inline-flex items-center",title:"切换视觉品牌预览",children:[i.jsx(Mp,{className:"pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-morph-muted"}),i.jsx("select",{value:d.id,onChange:g=>f(g.target.value==="wujiu"?"wujiu":"morph"),className:"morph-select w-auto min-w-[9rem] py-1.5 pl-8 pr-8 text-xs font-medium",children:Wp.map(g=>i.jsxs("option",{value:g.id,children:[g.label," · ",g.displayName]},g.id))})]}),i.jsx("button",{type:"button",onClick:u,className:`morph-btn-circle h-8 w-8 ${y?"text-morph-accent-deep":"text-morph-muted"}`,title:y?"当前为开发模式。点击切换为用户预览。":"当前为用户预览。点击切回开发模式。",children:y?i.jsx(Dp,{className:"h-4 w-4"}):i.jsx($p,{className:"h-4 w-4"})})]}):null,l!=="open"?i.jsxs("button",{type:"button",onClick:n,className:`morph-btn-circle h-8 gap-1 px-3 text-xs font-medium ${o?"text-morph-muted":"text-amber-700"}`,title:o?"查看本机激活状态":"未激活，无法生成",children:[i.jsx(pc,{className:"h-3.5 w-3.5"}),o?l==="dev"?"免激活":"已激活":"未激活"]}):null,i.jsx("button",{type:"button",onClick:r,className:"morph-btn-circle h-8 w-8 text-morph-muted",title:"使用说明",children:i.jsx(ri,{className:"h-4 w-4"})}),i.jsx("button",{type:"button",onClick:t,className:"morph-btn-circle h-8 w-8 text-morph-muted",title:"打开结果文件夹",children:i.jsx(Nr,{className:"h-4 w-4"})}),i.jsx("button",{type:"button",onClick:e,className:"morph-btn-circle h-8 w-8 text-morph-accent-deep",title:"设置",children:i.jsx(Pp,{className:"h-4 w-4"})}),i.jsx("button",{type:"button",onClick:s,className:"morph-btn-circle h-8 w-8 text-morph-muted",title:"重置工作台",children:i.jsx(Ps,{className:"h-4 w-4"})}),i.jsx(gc,{})]})]})}function Ni(e){if(!e)return[];const t=[];if(e.items){for(const n of Array.from(e.items))if(n.kind==="file"){const r=n.getAsFile();r&&t.push(r)}}return t.length?t:e.files?Array.from(e.files):[]}let Ds=null,Gu=!1;function A0(e){if(!Ds)return;const t=Ni(e.clipboardData);t.length&&Ds(t)&&e.preventDefault()}function $0(){Gu||(Gu=!0,window.addEventListener("paste",A0))}function Yp(e){$0(),Ds=e}function Zp(e){Ds===e&&(Ds=null)}/* @include image-import.js */
function em(e){var n;const t=e.toLowerCase().match(/\.(png|jpe?g|webp|gif|bmp|svg)$/);return((n=t==null?void 0:t[1])==null?void 0:n.replace("jpeg","jpg"))||""}function tm(e){const t=e.toLowerCase();return t.endsWith(".png")?"image/png":t.endsWith(".jpg")||t.endsWith(".jpeg")?"image/jpeg":t.endsWith(".webp")?"image/webp":t.endsWith(".gif")?"image/gif":t.endsWith(".bmp")?"image/bmp":t.endsWith(".svg")?"image/svg+xml":"image/png"}function nm(e){const t=(e.type.split("/")[1]||em(e.name)||"png").replace("jpeg","jpg"),n=e.name&&e.name!=="image.png"&&e.name!=="blob"?e.name:`粘贴图片-${Date.now()}.${t}`;return new File([e.slice()],n,{type:e.type||tm(n)})}function rm(e){return new Promise((t,n)=>{const r=new FileReader;r.onload=()=>t(String(r.result||"")),r.onerror=()=>n(r.error??new Error("读取图片失败")),r.readAsDataURL(e)})}function sm(e,t){return new File([e.slice()],t,{type:e.type||"application/octet-stream"})}function D0({label:e,hint:t,accept:n,value:r,onChange:s,kind:o,className:l,fill:c=!1,embedded:a=!1}){const u=S.useRef(null),f=S.useRef(r),d=S.useRef(s),p=S.useRef(null),y=S.useRef(null),g=S.useRef(!1),[v,k]=S.useState(!1),[h,m]=S.useState(!1),[x,b]=S.useState(0);f.current=r,d.current=s,S.useEffect(()=>{if(!v)return;const M=C=>{C.key==="Escape"&&k(!1)};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[v]),S.useEffect(()=>{if(o!=="audio"||!(r!=null&&r.previewUrl))return;const M=p.current;if(!M)return;const C=()=>{const H=y.current;if(!H)return;const G=M.clientWidth;G>8&&(H.style.width=`${G}px`,H.style.maxWidth="100%")},A=()=>{b(H=>H+1),requestAnimationFrame(C)},q=new IntersectionObserver(H=>{const G=H[0];if(!G)return;const ue=G.isIntersecting&&(G.intersectionRatio??0)>=.85,he=!G.isIntersecting||(G.intersectionRatio??0)<.4;ue&&!g.current?(A(),g.current=!0):he&&(g.current=!1),ue&&requestAnimationFrame(C)},{threshold:[0,.4,.85,1]});q.observe(M);let $=M.clientWidth;const W=new ResizeObserver(()=>{const H=M.clientWidth;H>120&&$>0&&$<H*.65&&A(),$=H,C()});return W.observe(M),C(),()=>{q.disconnect(),W.disconnect(),g.current=!1}},[o,r==null?void 0:r.previewUrl]),S.useEffect(()=>{if(o!=="audio")return;const M=y.current,C=p.current;if(!M||!C)return;const A=C.clientWidth;A>8&&(M.style.width=`${A}px`,M.style.maxWidth="100%")},[o,x,r==null?void 0:r.previewUrl]);const E=S.useCallback(M=>o==="image"?M.type.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(M.name):o==="audio"?M.type.startsWith("audio/")||/\.(mp3|wav|flac|m4a|aac|ogg)$/i.test(M.name):!0,[o]),j=M=>{M!=null&&M.previewUrl&&M.previewUrl.startsWith("blob:")&&URL.revokeObjectURL(M.previewUrl)},N=(M,C)=>{const A=f.current;j(A),d.current({name:M.name,file:M,previewUrl:C})},w=async(M,C=!1)=>{if(!M)return;if(o==="image"){const q=await Jp(M),$=await rm(q);N(q,$);return}const A=URL.createObjectURL(M);N(M,A)},_=S.useCallback((M,C=!1)=>{const A=M.find(E);return A?(w(A,C),!0):!1},[E,o]),I=S.useRef(()=>!1);I.current=M=>_(M,!0);const Q=S.useRef(M=>I.current(M)),X=()=>{o==="image"&&Yp(Q.current)},re=()=>{o==="image"&&Zp(Q.current)};S.useEffect(()=>()=>re(),[]);const O=M=>{[...M.dataTransfer.types].includes("Files")&&(M.preventDefault(),M.dataTransfer.dropEffect="copy",m(!0))},te=M=>{[...M.dataTransfer.types].includes("Files")&&(M.preventDefault(),M.dataTransfer.dropEffect="copy",m(!0))},L=M=>{M.currentTarget.contains(M.relatedTarget)||m(!1)},se=M=>{M.preventDefault(),m(!1),_(Ni(M.dataTransfer),o==="image")},T=()=>{k(!1),j(r),s(null),u.current&&(u.current.value="")},D={onMouseEnter:X,onMouseLeave:re,onFocus:X,onBlur:re,onDragEnter:O,onDragOver:te,onDragLeave:L,onDrop:se},Y=o==="audio";return i.jsxs("div",{className:ge(a?"flex flex-col":Y?"slot-box p-2":"slot-box p-3",c&&!Y&&!a&&"flex h-full min-h-0 flex-col",l),children:[a?e?i.jsx("div",{className:"mb-2 text-xs font-semibold text-morph-muted",children:e}):null:i.jsxs("div",{className:ge("flex shrink-0 items-center justify-between",Y?"mb-1":"mb-2"),children:[i.jsx("div",{className:"text-sm font-semibold text-navy",children:e}),t?i.jsx("div",{className:"text-[11px] text-slate-500",children:t}):null]}),i.jsx("input",{ref:u,type:"file",accept:n,className:"hidden",onChange:M=>{var C;w(((C=M.target.files)==null?void 0:C[0])||null,o==="image")}}),r?a&&o==="image"?i.jsxs("div",{tabIndex:0,className:"flex items-center gap-2 rounded-morph-sm px-3 py-2.5 morph-card-inset outline-none focus:ring-2 focus:ring-morph-accent/35",...D,children:[i.jsx("img",{src:r.previewUrl,alt:"",className:"h-10 w-10 shrink-0 rounded-lg object-cover"}),i.jsxs("div",{className:"min-w-0 flex-1",children:[i.jsx("div",{className:"truncate text-xs font-medium text-morph-text",children:r.name}),i.jsx("button",{type:"button",onClick:()=>{var M;return(M=u.current)==null?void 0:M.click()},className:"text-[11px] text-morph-accent-deep hover:underline",children:"更换图片"})]}),i.jsx("button",{type:"button",onClick:T,className:"morph-btn-circle h-8 w-8 shrink-0 text-morph-muted",title:"清除",children:i.jsx(Re,{className:"h-3.5 w-3.5"})})]}):i.jsxs("div",{tabIndex:o==="image"?0:void 0,className:ge("relative overflow-hidden outline-none focus:ring-2 focus:ring-gold/60",a?"rounded-morph-sm morph-card-inset focus:ring-morph-accent/40":"rounded-xl border bg-white focus:ring-gold/60",!a&&(h?"border-navy ring-2 ring-gold":"border-slate-300"),c&&o==="image"&&!a&&"flex min-h-0 flex-1 flex-col"),...D,children:[o==="image"?i.jsx("button",{type:"button",title:"点击预览，也可拖入或粘贴替换",onClick:()=>k(!0),className:ge("block w-full cursor-zoom-in",c&&"flex min-h-0 flex-1 items-center justify-center bg-slate-50"),children:i.jsx("img",{src:r.previewUrl,alt:r.name,draggable:!1,className:ge("w-full object-contain",a?"h-28 bg-transparent object-cover":"bg-slate-50",c&&!a?"max-h-full min-h-[12rem] h-full":a?"":"h-36")})}):i.jsxs("div",{className:"flex items-center gap-2 px-2 py-1.5",children:[i.jsx("div",{ref:p,className:"min-w-0 flex-1 overflow-hidden",children:i.jsx("audio",{ref:y,controls:!0,src:r.previewUrl,className:"block h-8 w-full max-w-full",preload:"metadata"},x)}),i.jsxs("button",{type:"button",onClick:T,className:"inline-flex shrink-0 items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 hover:bg-red-100 hover:text-red-700",children:[i.jsx(Re,{className:"h-3.5 w-3.5"}),"清除"]})]}),o==="image"?i.jsxs("div",{className:"flex shrink-0 items-center justify-between gap-2 border-t border-slate-200 px-2 py-1.5 text-xs text-slate-600",children:[i.jsx("span",{className:"truncate",children:r.name}),i.jsxs("button",{type:"button",onClick:T,className:"inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 hover:bg-red-100 hover:text-red-700",children:[i.jsx(Re,{className:"h-3.5 w-3.5"}),"清除"]})]}):i.jsx("div",{className:"truncate border-t border-slate-100 px-2 py-0.5 text-[11px] text-slate-500",children:r.name})]}):i.jsx("button",{type:"button",tabIndex:o==="image"?0:void 0,onClick:()=>{var M;return(M=u.current)==null?void 0:M.click()},className:ge(a?"morph-card-inset flex w-full flex-col items-center justify-center text-morph-muted outline-none focus:ring-2 focus:ring-morph-accent/35":"dashed-add flex w-full flex-col items-center justify-center text-slate-600 outline-none focus:ring-2 focus:ring-gold/60",Y?"h-12 gap-0.5":a?"h-28 gap-1.5":c?"min-h-[12rem] flex-1 gap-2":"h-36 gap-2",!a&&h?"border-navy bg-gold/20 text-navy":a&&h?"ring-2 ring-morph-accent/40":""),...D,children:Y?i.jsx("div",{className:"text-xs",children:"+ 点击或拖入音频"}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:ge("flex items-center justify-center rounded-xl text-navy",a?"h-10 w-10 text-lg text-morph-accent-deep":"h-12 w-12 border-2 border-slate-500 bg-cream text-2xl font-bold"),children:"+"}),i.jsxs("div",{className:ge("flex items-center gap-1 text-xs",a?"text-morph-muted":""),children:[i.jsx(Rp,{className:"h-3.5 w-3.5"}),h?"松开即可放入":"点击 / 拖入 / 粘贴"]})]})}),v&&o==="image"&&r?Rt.createPortal(i.jsxs("div",{className:"fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6",onMouseDown:M=>{M.target===M.currentTarget&&k(!1)},children:[i.jsx("button",{type:"button",onClick:()=>k(!1),className:"absolute right-4 top-4 rounded-lg bg-white/15 p-2 text-white hover:bg-white/25","aria-label":"关闭预览",children:i.jsx(Re,{className:"h-6 w-6"})}),i.jsx("img",{src:r.previewUrl,alt:r.name,className:"max-h-[60vh] max-w-[60vw] rounded-lg object-contain shadow-2xl",onMouseDown:M=>M.stopPropagation()})]}),document.body):null]})}const z0=`# 说唱MV视频提示词生成指令（H3 Ref2VA）

> **形态**：说唱 C+H Performance Block（SICKO MODE × K-Pop）  
> **一次完成**：ASR 解析 → 画风×元素解析器 → 说唱脸回访规划 → C+H 运镜 → Ref2VA  
> **切镜**：\`(start, end) text\` 时间戳最高优先  
> **说唱脸**：每 2–3 镜回访；正面为主 + 适量侧面 + 动态转头；禁止仰拍/俯拍对口型  
> **画风/元素**：由解析器每次生成，不写死固定场景皮  

---

## 〇、总流程

\`\`\`
1) 拆分输入：【用户要求】 / ASR (start,end) 行 / 歌名歌手线索
2) 逐行解析 ASR → segments 表 + duration_sec
3) 画风×元素解析器 → style_lock + elements_lock（必须先写）
4) 按碎段/长段规则合并拆分 → shot_plan（At 全部锚定 ASR）
5) 标记 lip_sync_face + face_mode
6) 为每镜分配 C+H 运镜（打满配额）+ 元素落地
7) 输出 Ref2VA 六段；所有 At 可追溯时间轴
\`\`\`

禁止：跳过解析器；有 ASR 却改用固定 1.2s 网格；连续 ≥3 镜无说唱脸；仰俯拍怼脸对口型。

---

## 一、角色与任务

你是专业 H3 Ref2VA 提示词工程师。输入：数字人图、音频、带时间戳 ASR 文本（可含用户要求）。输出：先锁画风元素与唱脸计划，再生成高冲击说唱 MV 提示词。

铁律：

1. **C+H 双引擎**：多场景硬切 + whip / crash / orbit / track 高密度运镜。  
2. **运镜优先（非唱脸）**：肢体 + 运镜撑节奏；非唱脸禁止靠嘴型撑场面。  
3. **说唱脸回访**：每隔 2–3 镜一次嘴可读的面部对口型。  
4. **节奏恒定**：运镜配额与能量地板不因歌词对错/多少而降低。  
5. **ASR 时间戳最高优先**：切镜时刻对齐 \`(start, end)\`。  
6. **画风×元素现解**：用户要求 + 歌词意象 + 可选歌名/歌手。  
7. **禁白底**：参考图白底不进任何镜头。

---

## 二、ASR 时间戳歌词格式

### 2.1 唯一合法格式

每一行：

\`\`\`text
(开始秒, 结束秒) 该时间段内的识别文字
\`\`\`

| 部分 | 规则 | 示例 |
|------|------|------|
| 左括号 | 半角 \`(\` | \`(\` |
| 开始时间 | 秒，整数或小数 | \`0.0\` / \`10.58\` |
| 逗号 | 半角 \`,\`，前后可有空格 | \`,\` |
| 结束时间 | 秒，大于开始 | \`0.68\` / \`13.8\` |
| 右括号 | 半角 \`)\` | \`)\` |
| 空格 | \`)\` 后通常有空格 | \` \` |
| 文本 | ASR 原文（可含错字） | \`凌晨回家的，\` |

完整识别样例：

\`\`\`text
(0.0, 0.68) 凌晨回家的，
(0.76, 1.44) 你好不好睡，
(1.6, 2.5) 生活的台词，
(2.54, 3.22) 你好不好背，
(3.56, 4.08) 站满就近，
(4.18, 4.94) 地板到不到位，
(5.08, 5.8) 口是拎的直，
(5.92, 6.74) 男人找不到背，
(7.0, 8.52) 想要的东西都特别的贵，
(8.8, 10.28) 窗外的金色都特别的美，
(10.58, 13.8) 何时才能够公平的对比类似里面的武器和外面的灰，
(13.84, 14.94) 我用手指在武器中。
\`\`\`

### 2.2 正则

\`\`\`regex
^\\((\\d+(?:\\.\\d+)?)\\s*,\\s*(\\d+(?:\\.\\d+)?)\\)\\s*(.*)$
\`\`\`

- Group1 = \`start_sec\`；Group2 = \`end_sec\`；Group3 = \`asr_text\`（**照抄进 \`<d>\`**）

### 2.3 不是此格式的内容

| 内容 | 处理 |
|------|------|
| \`【用户要求：xxxx】\` | 创意控制，**非歌词**，不进 \`<d>\` |
| 无括号纯歌词 | 无时间戳；切镜回退时长网格 |
| SRT/VTT | 不按 SRT 解析；标准输入是 \`(s, e) text\` |
| 行内错字怪句 | 不修正；时间可信，文本忠实 |

### 2.4 解析后必须先输出锁定表

写 Ref2VA 之前输出：

\`\`\`text
asr_format: (start_sec, end_sec) text
segment_count: [N]
duration_sec: [最后一行 end_sec]
cut_priority: ASR_timestamps > duration_grid > lyric_line_count
segments:
  - id: S01 | start: 0.0 | end: 0.68 | text: ...
  - id: S02 | ...
style_lock: ...
elements_lock: ...
shot_plan: ...  # 含 lip_sync_face + face_mode
\`\`\`

---

## 三、切镜优先级

### 3.1 从高到低

\`\`\`
1) ASR start / end          ← 最高
2) C+H 运镜配额与能量地板   ← 不可因时间戳取消
3) 单镜上限 / 最少镜头逻辑  ← 用合并·拆分满足
4) 默认 1.2s 网格           ← 仅当完全没有 ASR 行
5) 歌词行数                 ← 永远最低
\`\`\`

### 3.2 转为 H3 时间

1. Shot 切入 = 该镜对齐段（或合并组）的 \`start_sec\`  
2. 换算 \`MM:SS.mmm\`：\`1.44\`→\`00:01.440\`；\`10.58\`→\`00:10.580\`；\`0.0\`→Shot1 无 \`At\`  
3. \`[Shot N] At MM:SS.mmm, the edit whip-cuts to ...\`  
4. 禁止有 ASR 时仍写无关的 \`00:01.200 / 00:02.400 / 00:03.200…\`

### 3.3 过碎 / 过长处理

| 情况 | 做法 | 时间戳 |
|------|------|--------|
| 段长 0.35–0.90s 且密 | 合并 2–3 段为一镜 | 切入=组首 start；\`<d>\` 拼接全文 |
| 段长 0.90–2.20s | 一段一镜（优先） | 切入=该段 start |
| 段长 >2.20s | 拆 2 镜：表演 + 中途 insert | insert≈中点，仍在段内；可用 \`<scenetrans>\` |
| 段间空隙 ≥0.25s | 可插无词 insert | At=空隙中点或后段前 |
| 合并后仍 >2.5s | 再拆 | At 仍来自时间轴 |

合并示例：

\`\`\`text
S01 (0.0, 0.68) 凌晨回家的， + S02 (0.76, 1.44) 你好不好睡，
→ Shot1 开场 <d>凌晨回家的，你好不好睡，</d>
S03+S04 → Shot2 At 00:01.600 <d>生活的台词，你好不好背，</d>
\`\`\`

### 3.4 总时长

有 ASR：≈ 最后一行 \`end_sec\`（可 +0–0.3s 收束）。用户指定更短窗口则只取窗内段。

### 3.5 与运镜关系

时间戳决定何时切，不决定能不能少运镜。  
段少 → 在空隙/长段中点加密 insert；段多 → 合并碎段。运镜配额仍须打满。

---

## 四、决策顺序

\`\`\`
1) 解析所有 (start,end) text → segments
2) 剥离【用户要求】
3) duration_sec = max(end_sec)
4) 跑画风×元素解析器 → style_lock / elements_lock
5) 合并/拆分 → shot_plan（绑定 start_sec）
6) 标注 lip_sync_face + face_mode（正侧动态比例）
7) 分配场景元素 + C+H 运镜（打满）
8) 写 <d>（asr 原文）；无词 insert 无 <d>
9) 输出 Ref2VA；所有 At 来自 shot_plan
\`\`\`

禁止：先画固定网格再硬塞 ASR 文字。

---

## 五、画风×元素解析器

### 5.1 必须输出

\`\`\`text
style_lock:
  name: [...]
  palette: [3–6]
  lighting: [...]
  mood: [...]
  references_inspired_by: [...]

elements_lock:
  must_appear: [3–8]
  supporting: [2–5]
  avoid: [white studio, ...]
  lyric_motifs_used: [asr句 → 元素]
  user_forced: [...]

style_source: user | lyrics | artist_song | default | mixed
elements_source: user | lyrics | artist_song | default | mixed
\`\`\`

### 5.2 优先级

\`\`\`
【用户要求】 > 歌词可视觉化意象 > 歌名/歌手类型化 > 弱默认
\`\`\`

### 5.3 歌词抽元素

扫描全部 \`asr_text\`；清晰名词/场景优先；不可视化噪声句跳过。  
有可得意象时，\`must_appear\` 至少 2 个来自歌词；写入 \`lyric_motifs_used\`；元素打散到多镜。

| 信号例 | 元素例 |
|--------|--------|
| 凌晨/回家 | 深夜走廊、门口 |
| 睡 | 床、台灯 |
| 窗外/金色 | 窗框、城市金光 bokeh |
| 贵 | 橱窗暖光 |
| 武器/灰 | 金属剪影、尘雾 |
| 手指 | 手部 ECU |

### 5.4 用户要求 / 歌名歌手

\`【用户要求】\` 永不进 \`<d>\`。歌名歌手只做类型化 inspired by，不复刻特定版权分镜。

### 5.5 弱默认

\`cinematic urban night, teal-magenta, high contrast\`  
元素：wet street, neon spill, concrete corridor, chain ECU, rooftop rim light  
仍禁白棚。

### 5.6 禁白底

禁止：white studio / white backdrop / photography studio / seamless white / bright white void / neutral gray cyclorama。  
Shot 1 必须用 \`style_lock\` 下的非白环境开场。  
若解析结果偏浅，强制压暗或换非白场景。

非白开场参考池（可按 lock 改写）：  
neon wet street / underground magenta corridor / parking garage with cyan spill / rooftop night / window-lit dark interior / graffiti alley at night 等。

---

## 六、C+H 运镜与节奏恒定

### 6.1 强制配额

| 运镜 | 最少 |
|------|------|
| Orbit / Crane / 360° | ≥2 |
| Whip-pan → hard cut | ≥2 |
| Crash zoom | ≥1（常用于甩进说唱脸） |
| High-speed tracking / dolly | ≥2 |
| Pedestal / crane vertical | ≥1 |
| Detail insert | ≥1 |

### 6.2 每镜最低配置

| 必选 | 要求 |
|------|------|
| 主动运镜 | 类型 + 速度（fast / rising / high-speed / locked-to-snare） |
| 拍点绑定 | kick / snare / hi-hat / 808 / downbeat 至少一词 |
| 主体动态 | 非唱脸：肢体卡点；唱脸：嘴型为主，可轻点头 |
| 切镜出口 | 除末镜外 hard/whip/punch/snap |

### 6.3 能量地板

从中高起跳，禁止低能量开场。

\`\`\`
前段：中高（建场运镜或很快到第一次说唱脸）
中段：高（场景跳 + 唱脸回访交错）
收尾：最高或强收束
\`\`\`

禁用主运镜写法：

\`\`\`text
slow gentle push
subtle camera drift
mostly static
stands still delivering lyrics
calm establishing shot with minimal movement
fewer cuts for clarity
\`\`\`

高强度用语库（轮换）：

\`\`\`text
The camera tracks laterally at high speed, parallax streaking past, locked to the kick.
The camera whip-pans into the next beat-synced cut.
The camera crash-zooms on the snare hit.
The camera cranes up while orbiting 180° at rising speed.
The camera handheld-shakes locked to the hi-hats.
The camera pedestals down rapidly on the 808.
\`\`\`

唱脸镜内可用 micro-push / 轻转；进入唱脸仍应用 crash/whip。

### 6.4 切镜维度与镜头规格

每次切至少改 2 项：场景 / 景别 / 角度 / 镜头规格 / 运镜 / 色板。  
全片 ≥3 场景；禁止连续 3 镜同 Scene。  
≥3 种 lens feel：wide-angle / telephoto / fisheye / overhead / handheld raw。  
单镜建议 ≤2.2s（唱脸 ≤2.5s）。

### 6.5 非唱脸表演

指向镜头、拍胸、甩臂、肩弹、头甩、踏步；\`shoulders hitting the snare\` 等。  
每镜一个 signature gesture。  
低机位/高机位可用于非唱脸气势镜（\`lip_sync_face: no\`）。

### 6.6 Pedestal / 仰俯运镜 vs 对口型

允许 pedestal、仰俯用于表演镜。  
一旦进入对口型说唱脸，机位回到 eye-level 正侧体系，禁止仰俯怼脸 lip-sync。

---

## 七、说唱脸回访 · 正侧动态对口型

### 7.1 密度

最多连续 2 个非唱脸。Shot 2 或 3 内出现第一次唱脸。

| 总镜数 | 唱脸最少 |
|--------|----------|
| 5–6 | ≥2 |
| 7–9 | ≥3 |
| 10–12 | ≥4 |
| 13+ | ≥ ceil(n/3) |

Insert 不计唱脸。唱脸优先落在合并后约 ≥0.9s 的段或态度句。

### 7.2 合格说唱脸

面部 CU / 紧 MCU on face / mouth ECU + 嘴清晰可见 + 明确 lip-sync。  
平视 eye-level 为主。

### 7.3 允许 face_mode

| face_mode | 说明 |
|-----------|------|
| \`front\` | 正面平视（主力） |
| \`three_quarter\` | 三分侧，嘴可读 |
| \`profile\` | 侧脸，必须 lips visible in profile |
| \`turn_to_cam\` | 侧/三分 → 转正面，边转边对口型 |
| \`turn_to_side\` | 正面 → 转侧/三分，边转边对口型 |

### 7.4 禁止用于说唱脸

- low-angle / high-angle 面部对口型  
- Dutch 脸对口型（默认不要）  
- 嘴出画、背面、遮挡嘴  

### 7.5 正侧比例

| 唱脸次数 | 正面类（front + turn_to_cam） | 侧面类（three_quarter / profile / turn_to_side） | 动态 |
|----------|------------------------------|--------------------------------------------------|------|
| 2 | 1 | 1 | 建议含轻微转头 |
| 3 | 2 | 1 | ≥1 次 turn_* |
| 4 | 2–3 | 1–2 | ≥1 次 turn_* |
| 5+ | ~60–70% | ~30–40% | ≥2 次 turn_* |

相邻唱脸 \`face_mode\` 不得完全相同；若都偏正面，用 \`turn_*\` 区分。

### 7.6 写法

\`\`\`text
eye-level front facial close-up; lip-syncing with sharp, rhythmic mouth shapes matching the rap lyrics
three-quarter facial close-up, lips clearly readable; lip-syncing...
profile close-up, lips clearly visible in profile; lip-syncing...
three-quarter that turns toward camera while lip-syncing; mouth stays readable
front close-up that eases into a slight three-quarter turn while continuing lip-sync
\`\`\`

非唱脸禁止：\`lip-sync\` / \`mouth shapes matching the lyrics\`。

### 7.7 shot_plan 字段

\`\`\`text
lip_sync_face: yes | no
face_mode: front | three_quarter | profile | turn_to_cam | turn_to_side  # yes 时必填
\`\`\`

---

## 八、Ref2VA 六段

顺序：\`subject_definitions\` → \`summary\` → \`retention_analysis\` → \`detailed_description\` → \`overall_soundscape\` → \`non_diegetic_music\`

### 8.1 subject_definitions

\`<Subject 1>\` 外观跨场景一致；\`<Picture 1>\` 只锁人物，白底替换为非白 Scene；\`<Audio 1>\` 音色 + delivery + 节奏参考。

### 8.2 summary 必含

\`\`\`text
Edit cut times are locked to the provided ASR (start, end) timestamps as the highest-priority timing source.
Rap-face lip-sync revisits every 2–3 shots, mainly eye-level front with some three-quarter/profile and head-turn dynamics; no low-angle or high-angle facial lip-sync.
Visual style follows style_lock [...].
\`\`\`

### 8.3 retention_analysis

Subject / Picture：\`fully_preserved\`（白底不保留）；Audio：\`reference\`。

### 8.4 detailed_description

风格声明必加：

\`\`\`text
Cut timing follows the ASR timestamp list with highest priority; camera intensity stays constantly high.
Rap-face lip-sync uses eye-level front/side/dynamic turns only—no low/high-angle face lip-sync.
On-screen world follows elements_lock [...].
\`\`\`

每镜顺序：标记+At → Scene（元素来自 lock）→ 景别/角度/镜头 → 运镜+拍点 → 唱脸则 face_mode+lip-sync，否则肢体无对口型 → \`<d>\` → 跨镜 \`<scenetrans>\`。

字数通常 450–750 英文词；优先保证镜头数与运镜配额。

### 8.5 overall_soundscape / non_diegetic_music

环境音 + 物理声；不写歌词。  
Beat 写清与 hard cut / 唱脸进入同步；可写 visual rhythm stays high even if ASR text is messy。

---

## 九、完整示例

### 用户输入

- 白底数字人  
- \`【用户要求：偏深夜情绪，城市夜景说唱，不要喜庆】\`  
- 另附 §2.1 中的 12 行 ASR  

### 解析器示例

\`\`\`text
style_lock:
  name: Midnight Window Nocturne
  palette: warm tungsten, cold blue street, gold window glow
  lighting: practical lamps + city spill through glass
  mood: sleepless, expensive longing, quiet aggression
elements_lock:
  must_appear: dark hallway, sleepless bedside lamp, shop-window glow, window+golden bokeh, metal silhouette, dust haze, finger ECU
  lyric_motifs_used:
    - 凌晨回家的 → hallway
    - 你好不好睡 → bedside lamp
    - 特别的贵 → shop window
    - 窗外的金色 → golden window
    - 武器/灰 → metal + haze
    - 手指 → finger ECU
  user_forced: 深夜情绪, 城市夜景, 不要喜庆
\`\`\`

### shot_plan 示例

\`\`\`text
duration_sec: 14.94
Shot1 @ 0.0     merge S01+S02 | 走廊/床灯建场 | lip_sync_face: no
Shot2 @ 1.6     merge S03+S04 | 唱脸 | yes | face_mode: front
Shot3 @ 3.56    merge S05+S06 | 地面/站位表演 | no
Shot4 @ 5.08    merge S07+S08 | 唱脸 | yes | face_mode: three_quarter
Shot5 @ 7.0     S09 贵 | 橱窗侧跟 | no
Shot6 @ 8.8     S10 窗外金色 | 唱脸 | yes | face_mode: turn_to_cam
Shot7 @ 10.58   S11 前半 | orbit 表演（可低机位但无对口型）| no
Shot7b @ 12.2   insert 金属/灰 | no
Shot8 @ 13.0    S11 后段 | 唱脸 | yes | face_mode: front
Shot9 @ 13.84   S12 手指 ECU | no
\`\`\`

### detailed_description 写法摘录

\`\`\`text
[Shot 1] Scene: dark return hallway (non-white)... from <Picture 1>...
<d>[Chinese] 凌晨回家的，你好不好睡，</d>
[Shot 2] At 00:01.600, whip then crash into eye-level front facial close-up; lip-syncing with sharp, rhythmic mouth shapes...
<d>[Chinese] 生活的台词，你好不好背，</d>
[Shot 4] At 00:05.080, ... three-quarter facial close-up, lips clearly readable; lip-syncing...
[Shot 6] At 00:08.800, ... three-quarter turning toward camera while lip-syncing; mouth stays readable...
<d>[Chinese] 窗外的金色都特别的美，</d>
[Shot 7] At 00:10.580, ... low-angle body shot, no lip-sync...
[Shot 7b] At 00:12.200, insert...
[Shot 8] At 00:13.000, eye-level front facial close-up; lip-syncing...
[Shot 9] At 00:13.840, finger ECU... <d>[Chinese] 我用手指在武器中。</d>
\`\`\`

---

## 十、自检清单

### ASR

- [ ] 按 \`(start, end) text\` 逐行解析？  
- [ ] 输出 segments / duration / shot_plan？  
- [ ] 每个 At 可追溯 start 或合法中点？  
- [ ] 有 ASR 时未改用固定 1.2s 网格？  
- [ ] \`<d>\` 照抄 asr_text？用户要求未进 \`<d>\`？

### 解析器

- [ ] 先输出 style_lock / elements_lock？  
- [ ] lyric_motifs_used？must_appear 含歌词意象？  
- [ ] Shot1 非白？

### 说唱脸

- [ ] 密度达标？最多连续 2 非唱脸？  
- [ ] 无仰拍/俯拍面部 lip-sync？  
- [ ] 正面为主、侧面有保留、动态转头达标？  
- [ ] 相邻 face_mode 有区分？侧面写明嘴可见？

### C+H

- [ ] 运镜配额满？每镜主动运镜+拍点？  
- [ ] 能量中高起跳？无 soft 禁语？  
- [ ] ≥3 场景、≥3 lens、切改 ≥2 维？  
- [ ] Ref2VA 六段齐全？人物外观一致？
`,L0=`# 说唱MV视频提示词生成指令（H3 Ref2VA + 音频参考）· Lyric Typography 贴字视觉版

> **形态锁定**：Lyric Typography MV（贴字 / 空间歌词视觉）——**歌词文字是画面主视觉层，不是普通字幕**  
> **节奏层**：文字卡点 + 中高密度切镜 + 运镜辅助；节奏由**时长 + 拍点**锁定，不因 ASR 残缺塌缩  
> **用户要求格式**：\`【用户要求：xxxx】\` = 创意控制，**不是台词**

与 C+H Performance Block 的核心差异：

| | C+H 表演块 | 本版 Lyric Typography |
|--|-----------|------------------------|
| 主节奏载体 | 切镜 + 运镜 | **屏幕文字出现/位移/撞击 + 切镜** |
| 画面记忆点 | 场景跳 + 环绕甩镜 | **金句大字、空间排版、文字与人物互动** |
| 切镜密度 | 极高（1–2 秒一切） | 高（可略疏，但每镜必须有文字事件） |
| 对口型 | 仅大脸特写 | 同左；文字镜头可完全不对口型 |

---

## 一、角色与任务

你是一名专业的 H3 视频生成提示词工程师。任务：接收**数字人图片**、**音频参考**、**说话文本（可含用户要求）**，生成 H3 **Ref2VA** 提示词，驱动**歌词文字驱动的说唱 MV**。

五条铁律：

1. **文字是主视觉**：每个有词镜头必须描述**可见歌词文字**的位置、字号感、材质、运动与拍点；禁止只写「有字幕」了事。
2. **文字 ≠ 普通字幕**：禁止 bottom-center 小字幕审美；文字是海报级、空间级、可互动的设计元素。
3. **节奏恒定**：切镜与文字事件按时长 + 拍点锁定；歌词残缺时用符号字、单字 punch、无词文字节奏镜填满。
4. **对口型受限**：仅面部大脸 / 极特写写 lip-sync；文字大镜、宽景、插入镜不对口型。
5. **禁白底**：参考图白底不保留；[Shot 1] 必须进入当前文字风格包的非白环境。

---

## 二、输入说明与解析顺序

### 2.1 输入类型

| 输入 | 说明 | 处理 |
|------|------|------|
| 数字人图片 | \`<Picture 1>\` / \`<Subject 1>\` | 只锁人物；白底丢弃 |
| 音频参考 | \`<Audio 1>\` | 音色 + delivery + **文字卡点主时钟** |
| 说话文本 | 歌词 + 可选 \`【用户要求：…】\` | **先拆分再生成** |

### 2.2 【用户要求】识别（硬规则）

格式：\`【用户要求：xxxx】\`

1. 匹配片段 = 创意控制，**绝不是台词** → **禁止**写入 \`<d>\`  
2. 去掉全部用户要求后，剩余才是歌词  
3. 可识别旋钮：

| 旋钮 | 含义 | 示例 |
|------|------|------|
| **文字风格 \`type_style\`** | 锁定 8 套 typography pack 之一 | 「海报大字」「故障字」「霓虹字」「毛笔字」「立体金属字」 |
| **画面元素 \`elements\`** | 场景/道具强制植入 | 「雨」「天台」「LED墙」「篮球」 |
| **画面基调 \`mood\`**（可选） | 暗黑 / 赛博 / 国潮 / 派对 等 | 映射到文字包+场景色板 |

优先级：

\`\`\`
用户指定文字风格 > 真随机文字包
用户指定元素 > 当前包默认场景元素
节奏 / 文字卡点密度 / 对口型 / 禁白底 —— 不可覆盖
\`\`\`

### 2.3 生成前强制锁定行

在 Ref2VA 六段之前输出：

\`\`\`
mv_form: Lyric Typography
type_style_lock: [八包英文名之一]
type_style_source: random | user
elements_lock: [元素列表]
elements_source: pack_default | user | pack_default+user
user_request_raw: [原文或 none]
lyrics_used: [剥离用户要求后的歌词；sparse/none]
typography_events_per_shot: [每镜至少一个文字事件：已规划]
\`\`\`

### 2.4 白底与文案质量

- 白底参考图 → 只保留人物；Scene A 用当前包非白环境  
- ASR 残缺：有字则 \`<d>\` 逐字保留；同时**屏幕可见文字必须与该镜演唱/展示的词一致**（有词镜）  
- 无词 / 极少词：用单字、符号、上一句残影、beat 符号字（如 \`808\`、\`YEAH\` 作设计字，**不得冒充用户歌词**）做纯视觉文字节奏镜

---

## 三、Ref2VA 六段格式

顺序固定：

\`\`\`
subject_definitions:
summary:
retention_analysis:
detailed_description:
overall_soundscape:
non_diegetic_music:
\`\`\`

### 3.1 subject_definitions

- \`<Subject 1>\`：人物外观 fully 一致  
- \`<Picture 1>\`：第一帧锚点；白底不保留  
- \`<Audio 1>\`：音色 + delivery + **lyric-timing / beat 参考**

### 3.2 summary

模板：

\`\`\`
[reference generation + audio reference] The target video is a lyric-typography rap music video in which on-screen text is a designed primary visual layer (not ordinary subtitles), using the [TYPE_STYLE_PACK] typography look. Featuring <Subject 1> guided by <Audio 1>. <Picture 1> anchors [Shot 1]. Beat-synced spatial typography events, kinetic type motion, and multi-shot cuts across [N] shots. Visual rhythm is locked to the beat and duration, not to lyric length. Lip-sync is reserved for facial close-up / extreme close-up only.
\`\`\`

### 3.3 retention_analysis

同既有规则；注明白底替换为当前包 Scene A。

### 3.4 detailed_description

**风格声明**必须含：

- \`lyric-typography music-video style\`
- 本次 \`type_style_lock\` 名称与材质关键词  
- \`on-screen lyrics as primary designed visuals, not bottom captions\`  
- lip-sync only in facial close-ups  
- non-white opening environment  

**每个镜头必含（顺序）**：

1. 镜头标记 + 时间戳  
2. 场景（来自当前包）  
3. 景别 / 角度 / 镜头规格  
4. **Typography 事件（必写）**：可见文字内容、语言、字号感、位置、材质、运动、与拍点关系  
5. 运镜（辅助文字，不可抢戏到让人看不见字）  
6. 人物表演（肢体；大脸才可 lip-sync）  
7. \`<Subject 1> (S1)\` + \`<Audio 1>\` + \`<d>\`（有词时）  
8. \`<scenetrans>\`（歌词跨镜时）

**可见文字写法硬规则**：

- 必须写出实际要出现的字（与该镜歌词一致，或明确为设计符号字）  
- 英文描述示例：  
  \`Massive Chinese glyphs reading "新速度" slam into frame from the right on the snare, chrome-edged, filling the upper third behind <Subject 1>.\`  
- **禁止**：\`subtitles appear at the bottom\` / \`small caption text\` / \`generic lyric overlay\`

### 3.5–3.6 声音

- \`overall_soundscape\`：环境音 + 文字「撞击」可隐喻为物理声（whoosh、impact）但勿复述歌词  
- \`non_diegetic_music\`：beat 与**文字出现/切镜**同步描述  

---

## 四、Lyric Typography 核心规则

### 4.1 文字是「事件」，不是装饰

每镜至少一个 **typography event**，选自：

| 事件类型 | 说明 | 拍点绑定 |
|----------|------|----------|
| Slam / Impact | 大字砸入画面 | snare / 808 |
| Rise / Scale-up | 字从主角胸口或脚下放大 | kick |
| Orbit / Drift | 字绕人旋转或横向掠过 | hi-hat 滚奏 |
| Shatter / Glitch | 字碎裂、故障闪 | punchline |
| Stack / Cascade | 多行字叠落 | 快嘴段 |
| Mask / Cutout | 字作遮罩透出人物或场景 | 高潮 |
| Insert Type ECU | 单字/词极特写占满屏 | 断点 punctuation |

### 4.2 文字与人物关系（每镜选一种主关系）

| 关系 | 写法要点 |
|------|----------|
| Behind subject | 字在人后作巨型背景海报 |
| Beside / flanking | 字立在人物左右 |
| Overlaid / intersecting | 字穿过身体或脸部轮廓（不挡眼） |
| Interactive | 人物指向、推开、拍打文字 |
| Full-bleed type | 短暂无人物，纯文字全屏（≤1 秒，作 insert） |

### 4.3 可见歌词一致性

- 有演唱的镜头：屏幕主文字 = 该镜 \`<d>\` 中的关键词或整句（优先 punchline / 名词 / 态度词）  
- 一句可拆多镜：每镜只展示该镜对应片段，用 \`<scenetrans>\` 连歌词  
- **不得**把 \`【用户要求】\` 做成屏幕字  
- **不得**发明用户没给的歌词当主文字（符号设计字除外，且须标注为 design glyph，非歌词）

### 4.4 反「普通字幕」禁令（硬规则）

禁止默认使用：

- bottom-safe-area small subtitles  
- soft white outline TV caption look  
- 整句密密麻麻贴满下方  

鼓励：

- 超大号、少字、强对比  
- 每镜 1–6 个汉字或 1–4 个英文词为视觉焦点  
- 材质明确：neon / chrome / ink / vinyl sticker / LED / concrete relief / CRT

---

## 五、节奏层（恒定）

### 5.1 决策顺序

\`\`\`
1) 剥离【用户要求】
2) 锁定 type_style_lock + elements_lock
3) 按时长锁定镜头数与时间网格
4) 为每镜分配 typography event + 运镜
5) 挂歌词；挂不满用文字节奏镜 / 符号字 insert
6) 最多 1–2 镜大脸 lip-sync
\`\`\`

### 5.2 镜头数下限

| 时长 | 最少镜头 | 单镜 | 文字事件 |
|------|----------|------|----------|
| 4–6 秒 | 5 | 0.8–1.5s | 每镜 ≥1 |
| 6–8 秒 | 6–7 | 0.9–1.8s | 每镜 ≥1 |
| 8–10 秒 | 7–8 | 1.0–2.2s | 每镜 ≥1 |
| 10–12 秒 | 8–10 | 0.8–2.2s | 每镜 ≥1 |

硬规则：

- 单镜 ≤2.2 秒（大脸 lip-sync ≤2.5）  
- 全片 ≥1 次 full-bleed type insert 或 type ECU  
- 全片 ≥2 次文字 slam/impact  
- 全片 ≥1 次人物与文字互动  
- 运镜辅助：whip≥1、push/track≥2、orbit 可选（文字片可不强求 2 次 orbit，但切镜+文字密度不能掉）

### 5.3 能量地板

- 开场即可有大字冲击，禁止「先空镜站桩再慢慢出字」  
- 禁止因歌词少而减少文字事件  

### 5.4 默认 8 镜网格（~8–10 秒）

| Shot | 时间 | 文字事件 | 对口型 |
|------|------|----------|--------|
| 1 | 0:00 | 开场大字升起/砸入 + 人物入画 | 关 |
| 2 | 0:01.2 | 字侧立 + whip 换景 | 关 |
| 3 | 0:02.4 | **Type ECU / full-bleed** 闪切 | 关 |
| 4 | 0:03.3 | 字绕人 / cascade | 关 |
| 5 | 0:04.7 | 大脸 + 背景巨字；可 lip-sync | **可开** |
| 6 | 0:06.1 | 字碎裂/故障闪 + 换景 | 关 |
| 7 | 0:07.3 | 人物推/指文字 + lateral track | 关 |
| 8 | 0:08.6 | 终句巨字定格/放大收束 | 关 |

---

## 六、八套 Typography 风格包（真随机）

无用户指定时，从 Pack T01–T08 **真随机选 1 套**，整片只用这一套文字美学 + 配套场景色板。

#### Pack T01 · Poster Impact（海报撞击）

- 字：超大无衬线/黑体冲击、高对比、少字  
- 场景：暗底强色块、街头墙面  
- 运动：slam、scale punch  
- 开场：\`dark poster wall with cyan-magenta spill\`（非白）

#### Pack T02 · Neon Sign Type（霓虹招牌字）

- 字：霓虹管、辉光、湿反射  
- 场景：雨夜街、招牌巷  
- 运动：flicker on beat、反射掠过  
- 开场：\`rain-wet neon alley\`

#### Pack T03 · Chrome 3D Type（立体金属字）

- 字：镀铬 3D、高光边缘  
- 场景：镜面、黑金廊  
- 运动：orbit around subject、light sweep  
- 开场：\`mirrored black-gold corridor\`

#### Pack T04 · Ink Calligraphy Clash（墨迹/书法撞击）

- 字：毛笔/墨炸、飞白、国潮感（现代排版，非古风站桩）  
- 场景：红黑、烟雾、宣纸纹理墙（暗调）  
- 运动：ink splash on snare、stroke reveal  
- 开场：\`crimson-ink chamber with smoke\`（非白）

#### Pack T05 · Glitch CRT Type（故障屏幕字）

- 字：RGB 分离、扫描线、撕裂  
- 场景：地下、CRT、设备间  
- 运动：glitch shatter、frame tear  
- 开场：\`dim CRT-lit underground room\`

#### Pack T06 · Sticker / Vinyl Collage（贴纸拼贴字）

- 字：贴纸边缘、撕纸、多层叠贴  
- 场景：涂鸦墙、卧室海报墙、派对  
- 运动：peel、stack cascade  
- 开场：\`graffiti sticker wall at night\`

#### Pack T07 · Concrete Relief Type（水泥浮雕字）

- 字：刻进水泥/浮雕、硬阴影  
- 场景：停车场、立交桥底、brutalism  
- 运动：camera reveals carved type、parallax  
- 开场：\`parking garage with carved concrete lettering light\`

#### Pack T08 · LED Matrix Type（点阵/大屏字）

- 字：LED 点阵、舞台屏、像素块  
- 场景：舞台、仓库桁架、户外大屏  
- 运动：matrix wipe、row-scan on hats  
- 开场：\`dark stage with LED wall glow\`（环境暗，非白棚）

### 6.1 用户说法映射

| 用户说 | 映射 |
|--------|------|
| 海报、大字报、冲击字 | T01 |
| 霓虹字、夜店字 | T02 |
| 金属字、3D字、镀铬 | T03 |
| 毛笔、书法、国潮字、墨 | T04 |
| 故障字、VHS字、赛博字 | T05 |
| 贴纸、拼贴、撕纸字 | T06 |
| 水泥字、浮雕、冷硬 | T07 |
| LED、点阵、舞台大屏字 | T08 |

### 6.2 元素植入

用户点名元素 ≥2 镜出现；默认每包 4–6 个场景元素；**不改人物外观**。

---

## 七、运镜（辅助文字，不抢戏）

优先：

- Push in toward type + subject  
- Lateral track revealing type parallax  
- Whip-cut between type layouts  
- Brief crash zoom into a keyword  
- Micro orbit only if type stays readable  

禁止：

- 长时间剧烈晃到字不可读  
- 无文字事件的纯运镜炫技镜（insert 纯字除外）  
- 白棚、小字幕审美  

---

## 八、对口型与表演

- 对口型：仅 Shot 类 facial CU/ECU，优先 1 镜  
- 文字大镜：人物用指向、拍字、肩弹、头甩卡点  
- 全片 ≥1 次明确「与文字互动」动作  

---

## 九、歌词规则

- \`<d>\` = 剥离用户要求后的原文  
- 屏幕主字优先取 punchline / 态度词 / 名词  
- 跨镜 \`<scenetrans>\`  
- 允许无 \`<d>\` 但有 **design glyph** 的节奏镜（须声明非歌词）  

---

## 十、完整示例

### 用户输入

- 图片：白底数字人，黑卫衣银链  
- 音频：快嘴 trap  
- 文本：

\`\`\`
【用户要求：霓虹大字，加点雨】
他们说我做不到 我偏要走出新速度
这是我的主场
\`\`\`

### 锁定行

\`\`\`
mv_form: Lyric Typography
type_style_lock: Neon Sign Type
type_style_source: user
elements_lock: neon tubes, rain streaks, wet asphalt, alley signs
elements_source: pack_default+user
user_request_raw: 霓虹大字，加点雨
lyrics_used: 他们说我做不到… / 这是我的主场
\`\`\`

### 输出（节选结构）

\`\`\`
subject_definitions:
<Subject 1> is the young male rapper in <Picture 1>, short black hair, black hoodie, silver chain, identity preserved across scenes.
<Picture 1> is the first frame of [Shot 1], locking appearance and framing only; white backdrop is replaced by a rain-wet neon alley.
<Audio 1> is the voice-timbre, delivery, and lyric-timing reference for <Subject 1> (S1).

summary:
[reference generation + audio reference] The target video is a lyric-typography rap music video ... Neon Sign Type ... on-screen text is a designed primary visual layer (not ordinary subtitles) ... across eight shots. Visual rhythm locked to the beat ... Lip-sync reserved for facial close-ups only.

detailed_description:
The target video is a lyric-typography music-video style with Neon Sign Type: glowing tube glyphs, wet reflections, beat-synced kinetic Chinese lettering as primary visuals—not bottom captions. Camera supports readability. Lip-sync only in facial close-ups.
[Shot 1] Scene A: rain-wet neon alley... From <Picture 1>, non-white. Massive neon Chinese glyphs reading "做不到" flicker on above <Subject 1> on the kick as rain streaks cut the glow. Camera pushes in fast. <Subject 1> (S1)... begins: <d>[Chinese] 他们说我做不到 <scenetrans>
[Shot 2] At 00:01.200, whip-cut. Glyphs reading "新速度" slam from frame-right on the snare, flanking him... lyrics continue: 我偏要走出新速度.</d> He points at the glowing type. No lip-sync.
[Shot 3] At 00:02.400, full-bleed type ECU: neon "速度" fills the frame with rain refraction on the 808 — design-forward lyric fragment, no body shot.
...
[Shot 5] facial close-up, giant neon word soft behind head; lip-syncing with sharp mouth shapes for the punch phrase...
[Shot 8] final glyphs "主场" scale to max, rain and neon bloom; he pounds chest; orbit micro-settle; no lip-sync.
\`\`\`

---

## 十一、自检清单

### Typography（最重要）

- [ ] 每镜是否有明确 typography event？  
- [ ] 是否避免了底部小字幕审美？  
- [ ] 可见主字是否与该镜歌词/声明的设计字一致？  
- [ ] \`【用户要求】\` 是否未进 \`<d>\`、未当歌词上屏？  
- [ ] 是否有 ≥1 次全屏字/Type ECU、≥2 次 slam、≥1 次人字互动？  
- [ ] \`type_style_lock\` 是否输出且整片统一？

### 节奏 / 禁白 / 对口型

- [ ] 镜头数按时长下限？文字事件未因歌词短减少？  
- [ ] Shot 1 非白？人物外观一致？  
- [ ] 对口型仅大脸且少？

### 格式

- [ ] Ref2VA 六段齐全？锁定行齐全？

---

## 十二、版本定位

| 指令 | 形态 |
|------|------|
| \`…C+H-禁白底-节奏恒定-八风格随机.md\` | Performance Block 高密度表演 |
| **本文件** | **Lyric Typography 贴字视觉** |

路径：

\`H:\\0.cursor\\motion context问题\\说唱MV视频提示词生成指令-H3-LyricTypography贴字视觉版.md\`

**本版主目标**：让歌词成为 MV 的视觉主角——空间排版、卡点运动、材质风格可随机/可指定；节奏与禁白底规则与系列其他指令对齐。
`,F0=`# 流行MV视频提示词生成指令（H3 Ref2VA）· 节奏模板 B · 中速流行表演

> **节奏模板**：B · Mid-tempo Pop Performance  
> **一次完成**：ASR 解析 → 画风×元素解析器 → 唱歌脸回访 → 均衡运镜 → Ref2VA  
> **切镜**：\`(start, end) text\` 时间戳最高优先  
> **唱歌脸**：约每 3–4 镜回访；正面为主 + 适量侧面 + 动态转头；禁止仰拍/俯拍对口型  
> **运镜**：商业均衡——push / track / soft orbit + 乐句硬切；少 whip、少 crash  
> **画风/元素**：解析器每次生成，不写死固定场景皮  
> **禁止**：把本模板写成说唱级狂切、连续 whip、多发 crash  

---

## 〇、总流程

\`\`\`
1) 拆分输入：【用户要求】 / ASR (start,end) 行 / 歌名歌手线索
2) 逐行解析 ASR → segments 表 + duration_sec
3) 画风×元素解析器 → style_lock + elements_lock（必须先写）
4) 按碎段/长段规则合并拆分 → shot_plan（At 全部锚定 ASR；本模板单镜可略长）
5) 标记 lip_sync_face + face_mode（按 B 档密度与正侧比例）
6) 为每镜分配 Pop 均衡运镜配额 + 元素落地
7) 输出 Ref2VA 六段；所有 At 可追溯时间轴
\`\`\`

禁止：跳过解析器；有 ASR 却改用固定 1.2s 假网格；连续 ≥4 镜无唱歌脸；仰俯拍怼脸对口型；说唱级爆炸剪辑。

---

## 一、角色与任务

你是专业 H3 Ref2VA 提示词工程师。输入：数字人图、音频、带时间戳 ASR 文本（可含用户要求）。输出：先锁画风元素与唱歌脸计划，再生成**中速流行 / 旋律向** MV 提示词（含华语流行、主歌副歌结构、偏唱的旋律说唱等）。

铁律：

1. **Pop 均衡剪辑**：节拍/乐句可切，呼吸感优先于爆炸感。  
2. **非唱脸**：运镜 + 自然表演肢体；禁止靠嘴型撑场面。  
3. **唱歌脸回访**：约每 3–4 镜一次嘴可读的面部对口型。  
4. **节奏恒定**：运镜与切镜不因歌词对错/多少塌成站桩或乱切。  
5. **ASR 时间戳最高优先**：切镜时刻对齐 \`(start, end)\`。  
6. **画风×元素现解**：用户要求 + 歌词意象 + 可选歌名/歌手。  
7. **禁白底**：参考图白底不进任何镜头。

---

## 二、ASR 时间戳歌词格式

### 2.1 唯一合法格式

每一行：

\`\`\`text
(开始秒, 结束秒) 该时间段内的识别文字
\`\`\`

| 部分 | 规则 | 示例 |
|------|------|------|
| 左括号 | 半角 \`(\` | \`(\` |
| 开始时间 | 秒，整数或小数 | \`0.0\` / \`10.58\` |
| 逗号 | 半角 \`,\`，前后可有空格 | \`,\` |
| 结束时间 | 秒，大于开始 | \`0.68\` / \`13.8\` |
| 右括号 | 半角 \`)\` | \`)\` |
| 空格 | \`)\` 后通常有空格 | \` \` |
| 文本 | ASR 原文（可含错字） | \`凌晨回家的，\` |

完整识别样例：

\`\`\`text
(0.0, 0.68) 凌晨回家的，
(0.76, 1.44) 你好不好睡，
(1.6, 2.5) 生活的台词，
(2.54, 3.22) 你好不好背，
(3.56, 4.08) 站满就近，
(4.18, 4.94) 地板到不到位，
(5.08, 5.8) 口是拎的直，
(5.92, 6.74) 男人找不到背，
(7.0, 8.52) 想要的东西都特别的贵，
(8.8, 10.28) 窗外的金色都特别的美，
(10.58, 13.8) 何时才能够公平的对比类似里面的武器和外面的灰，
(13.84, 14.94) 我用手指在武器中。
\`\`\`

### 2.2 正则

\`\`\`regex
^\\((\\d+(?:\\.\\d+)?)\\s*,\\s*(\\d+(?:\\.\\d+)?)\\)\\s*(.*)$
\`\`\`

- Group1 = \`start_sec\`；Group2 = \`end_sec\`；Group3 = \`asr_text\`（**照抄进 \`<d>\`**）

### 2.3 不是此格式的内容

| 内容 | 处理 |
|------|------|
| \`【用户要求：xxxx】\` | 创意控制，**非歌词**，不进 \`<d>\` |
| 无括号纯歌词 | 无时间戳；切镜回退时长网格 |
| SRT/VTT | 不按 SRT 解析；标准输入是 \`(s, e) text\` |
| 行内错字怪句 | 不修正；时间可信，文本忠实 |

### 2.4 解析后必须先输出锁定表

写 Ref2VA 之前输出：

\`\`\`text
rhythm_template: B_midtempo_pop_performance
asr_format: (start_sec, end_sec) text
segment_count: [N]
duration_sec: [最后一行 end_sec]
cut_priority: ASR_timestamps > duration_grid > lyric_line_count
segments:
  - id: S01 | start: 0.0 | end: 0.68 | text: ...
  - id: S02 | ...
style_lock: ...
elements_lock: ...
shot_plan: ...  # 含 lip_sync_face + face_mode
\`\`\`

---

## 三、切镜优先级

### 3.1 从高到低

\`\`\`
1) ASR start / end                 ← 最高
2) Pop 运镜配额与呼吸感            ← 不可因时间戳取消必要运镜
3) 单镜上限 / 合并拆分逻辑         ← 本模板允许单镜略长
4) 默认时长网格                    ← 仅当完全没有 ASR 行
5) 歌词行数                        ← 永远最低
\`\`\`

### 3.2 转为 H3 时间

1. Shot 切入 = 该镜对齐段（或合并组）的 \`start_sec\`  
2. 换算 \`MM:SS.mmm\`：\`1.44\`→\`00:01.440\`；\`10.58\`→\`00:10.580\`；\`0.0\`→Shot1 无 \`At\`  
3. \`[Shot N] At MM:SS.mmm, the edit makes a clean hard cut to ...\`  
4. 禁止有 ASR 时仍写无关的 \`00:01.200 / 00:02.400 / 00:03.200…\`

### 3.3 过碎 / 过长处理（B 档：合并可更宽）

| 情况 | 做法 | 时间戳 |
|------|------|--------|
| 段长 0.35–1.20s 且密 | 合并 2–4 段为一镜（流行句读更完整） | 切入=组首 start；\`<d>\` 拼接全文 |
| 段长 1.20–3.00s | 一段一镜（优先） | 切入=该段 start |
| 段长 >3.00s | 拆 2 镜：唱歌脸或表演 + 中途轻 insert | insert≈中点，仍在段内；可用 \`<scenetrans>\` |
| 段间空隙 ≥0.30s | 可插无词环境/道具 insert（不要过密） | At=空隙中点或后段前 |
| 合并后仍 >3.5s | 再拆 | At 仍来自时间轴 |

合并示例：

\`\`\`text
S01 (0.0, 0.68) 凌晨回家的， + S02 (0.76, 1.44) 你好不好睡，
→ Shot1 开场 <d>凌晨回家的，你好不好睡，</d>
S03+S04 → Shot2 At 00:01.600 <d>生活的台词，你好不好背，</d>
\`\`\`

### 3.4 总时长

有 ASR：≈ 最后一行 \`end_sec\`（可 +0–0.3s 收束）。用户指定更短窗口则只取窗内段。

### 3.5 与运镜关系

时间戳决定何时切，不决定能不能省略运镜。  
段少 → 在空隙/长段中点加环境 insert；段多 → 合并碎段。  
**不要**为了炫技把切镜加密到说唱密度；Pop 配额仍须打满（push/track/orbit/hard cut/insert）。

---

## 四、决策顺序

\`\`\`
1) 解析所有 (start,end) text → segments
2) 剥离【用户要求】
3) duration_sec = max(end_sec)
4) 跑画风×元素解析器 → style_lock / elements_lock
5) 合并/拆分 → shot_plan（绑定 start_sec）
6) 按 B 档标注 lip_sync_face + face_mode（正侧动态比例）
7) 分配场景元素 + Pop 均衡运镜（打满 B 配额）
8) 写 <d>（asr 原文）；无词 insert 无 <d>
9) 输出 Ref2VA；所有 At 来自 shot_plan
\`\`\`

禁止：先画固定网格再硬塞 ASR 文字。

---

## 五、画风×元素解析器

### 5.1 必须输出

\`\`\`text
style_lock:
  name: [...]
  palette: [3–6]
  lighting: [...]
  mood: [...]
  references_inspired_by: [...]

elements_lock:
  must_appear: [3–8]
  supporting: [2–5]
  avoid: [white studio, ...]
  lyric_motifs_used: [asr句 → 元素]
  user_forced: [...]

style_source: user | lyrics | artist_song | default | mixed
elements_source: user | lyrics | artist_song | default | mixed
\`\`\`

### 5.2 优先级

\`\`\`
【用户要求】 > 歌词可视觉化意象 > 歌名/歌手类型化 > 弱默认
\`\`\`

### 5.3 歌词抽元素

扫描全部 \`asr_text\`；清晰名词/场景优先；不可视化噪声句跳过。  
有可得意象时，\`must_appear\` 至少 2 个来自歌词；写入 \`lyric_motifs_used\`；元素打散到多镜。

| 信号例 | 元素例 |
|--------|--------|
| 凌晨/回家 | 深夜走廊、门口、归家路灯 |
| 睡 | 床、台灯、窗帘缝 |
| 窗外/金色 | 窗框、城市金光 bokeh、玻璃反光 |
| 贵 | 橱窗暖光、虚化商品 |
| 武器/灰 | 金属剪影、尘雾（克制，勿恐怖化） |
| 手指 | 手部 ECU、触物特写 |
| 雨/风/车（若出现） | 直接入 must_appear |

### 5.4 用户要求 / 歌名歌手

\`【用户要求】\` 永不进 \`<d>\`。歌名歌手只做类型化 inspired by，不复刻特定版权分镜。

### 5.5 弱默认（流行向兜底）

\`cinematic contemporary pop, soft-contrast night or warm practicals + cool window spill\`  
元素：city window light, clean street, warm interior, subtle bokeh, fabric motion, hallway practical  
仍禁白棚。

### 5.6 禁白底

禁止：white studio / white backdrop / photography studio / seamless white / bright white void / neutral gray cyclorama。  
Shot 1 必须用 \`style_lock\` 下的非白环境开场。  
若解析结果偏浅，强制压暗或换非白场景。

非白开场参考池（可按 lock 改写）：  
window-lit dark interior / neon-soft wet street / warm hallway / rooftop night soft bokeh / cafe night glass / clean urban sidewalk at dusk 等。

---

## 六、运镜母版 B · 中速流行均衡

### 6.1 强制配额（B 档）

| 运镜 | 最少/上限 | 说明 |
|------|-----------|------|
| Push in / Pull out（中慢速） | ≥2 | 主呼吸 |
| Tracking / Dolly lateral（中速） | ≥2 | 流动感 |
| Soft orbit / arc（中速） | ≥1（可 1–2） | 不要狂加速 360 |
| Clean hard cut on phrase/beat | ≥3 | 乐句感切镜 |
| Detail insert | ≥1 | 环境/道具 punctuation |
| Whip-cut | ≤1，可选 | **非必须**；全片最多 1 |
| Crash zoom | ≤1，可选 | **非必须**；仅副歌/态度句可 1 次甩进唱脸 |

禁止：连续 whip；多发 crash；全程 rising-speed orbit；把说唱版 whip≥2/crash≥1/高速 track 当作本模板必达项。

### 6.2 每镜最低配置

| 必选 | 要求 |
|------|------|
| 主动运镜 | 类型 + 速度（prefer medium / controlled） |
| 乐句/拍点 | phrase / downbeat / snare / vocal entry 至少一词 |
| 主体动态 | 非唱脸：自然手势/呼吸/步伐；唱脸：嘴型为主，可轻点头 |
| 切镜出口 | 除末镜外 clean hard cut；少 punch/whip |

### 6.3 能量曲线（流行呼吸）

从**中**起跳，不要开场就炸。

\`\`\`
开场：中（建立人物与环境）
主歌：中 → 中高（唱脸与环境交替）
副歌/高潮句：中高（可略加密唱脸或一次 controlled half-orbit）
收尾：中高收住或轻拉远
\`\`\`

禁用主运镜写法：

\`\`\`text
explosive multi-scene hard cuts every second
whip-pan every cut
crash-zoom spam
stands still delivering lyrics
mostly static with no camera move
slow gentle push as the ONLY move for the whole video with no cuts
fewer cuts for clarity (当借此取消必要运镜时)
\`\`\`

推荐用语库（轮换）：

\`\`\`text
The camera pushes in at medium speed on the vocal entry.
The camera pulls out slowly, revealing the environment behind <Subject 1>.
The camera tracks laterally at controlled speed, soft parallax in the background.
The camera arcs slowly around <Subject 1> through a half-orbit.
The edit makes a clean hard cut on the phrase boundary.
The camera holds a stable eye-level frame with a subtle micro-push during lip-sync.
The camera pedestals slightly up with the melody lift (performance shot, no lip-sync required).
\`\`\`

唱脸镜内：micro-push / 轻转头；进入唱脸可用 clean cut 或偶尔一次 controlled crash（全片≤1）。

### 6.4 切镜维度与镜头规格

相邻镜应有可见变化；优先改：景别 / 角度 / 场景 / 运镜 / 色板（能改 2 项更好，B 档不强制每次硬凑 2 项）。  
全片 ≥2–3 场景；避免连续 3 镜完全同构图同场景。  
Lens：至少 2 种（常用 natural 35–50mm feel + 轻度 tele 或 mild wide）；少用 fisheye 狂畸变。  
单镜常见 **1.5–3.2s**；唱脸可达 **3.5s**。

### 6.5 非唱脸表演（流行）

自然手势、整理衣领/袖口、看窗外、轻踏步、随旋律微摆、呼吸起伏。  
克制：不要默认说唱级拍胸、砸拳、怒指镜头（除非歌词或用户要求强态度）。  
每镜一个小而清晰的 signature gesture。  
低机位/高机位可用于非唱脸气氛镜（\`lip_sync_face: no\`）。

### 6.6 Pedestal / 仰俯运镜 vs 对口型

允许 pedestal、仰俯用于表演/气氛镜。  
一旦进入对口型唱歌脸，机位回到 **eye-level 正侧体系**，禁止仰俯怼脸 lip-sync。

---

## 七、唱歌脸回访 · 正侧动态对口型（B 档密度）

### 7.1 密度

最多连续 **3** 个非唱脸镜，然后必须回访唱歌脸。  
Shot **2–4** 内出现第一次唱歌脸（允许 Shot1 纯建场）。

| 总镜数 | 唱歌脸最少 |
|--------|------------|
| 5–6 | ≥2 |
| 7–9 | ≥2–3 |
| 10–12 | ≥3 |
| 13+ | ≥ ceil(n/4) |

Insert 不计唱歌脸。优先落在乐句完整、合并后约 ≥1.0s 的段。

### 7.2 合格唱歌脸

面部 CU / 紧 MCU on face / mouth ECU + **嘴清晰可见** + 明确 lip-sync。  
平视 eye-level 为主。

### 7.3 允许 face_mode

| face_mode | 说明 |
|-----------|------|
| \`front\` | 正面平视（主力） |
| \`three_quarter\` | 三分侧，嘴可读 |
| \`profile\` | 侧脸，必须 lips visible in profile |
| \`turn_to_cam\` | 侧/三分 → 转正面，边唱边转 |
| \`turn_to_side\` | 正面 → 转侧/三分，边唱边转 |

### 7.4 禁止用于唱歌脸

- low-angle / high-angle 面部对口型  
- Dutch 脸对口型（默认不要）  
- 嘴出画、背面、遮挡嘴  

### 7.5 正侧比例

| 唱歌脸次数 | 正面类（front + turn_to_cam） | 侧面类（three_quarter / profile / turn_to_side） | 动态 |
|------------|------------------------------|--------------------------------------------------|------|
| 2 | 1 | 1 | 建议含轻微转头 |
| 3 | 2 | 1 | ≥1 次 turn_* |
| 4 | 2–3 | 1–2 | ≥1 次 turn_* |
| 5+ | ~60–70% | ~30–40% | ≥1–2 次 turn_* |

相邻唱歌脸 \`face_mode\` 不得完全相同；若都偏正面，用 \`turn_*\` 区分。

### 7.6 写法

\`\`\`text
eye-level front facial close-up; lip-syncing with clear, melodic mouth shapes matching the lyrics
three-quarter facial close-up, lips clearly readable; lip-syncing...
profile close-up, lips clearly visible in profile; lip-syncing...
three-quarter that turns toward camera while lip-syncing; mouth stays readable
front close-up that eases into a slight three-quarter turn while continuing lip-sync
\`\`\`

非唱脸禁止：\`lip-sync\` / \`mouth shapes matching the lyrics\`。

### 7.7 shot_plan 字段

\`\`\`text
lip_sync_face: yes | no
face_mode: front | three_quarter | profile | turn_to_cam | turn_to_side  # yes 时必填
\`\`\`

---

## 八、Ref2VA 六段

顺序：\`subject_definitions\` → \`summary\` → \`retention_analysis\` → \`detailed_description\` → \`overall_soundscape\` → \`non_diegetic_music\`

### 8.1 subject_definitions

\`<Subject 1>\` 外观跨场景一致；\`<Picture 1>\` 只锁人物，白底替换为非白 Scene；\`<Audio 1>\` 音色 + delivery + 乐句节奏参考。

### 8.2 summary 必含

\`\`\`text
[reference generation + audio reference] Mid-tempo pop-performance music video featuring <Subject 1> guided by <Audio 1>.
Edit cut times are locked to the provided ASR (start, end) timestamps as the highest-priority timing source.
Camera language is balanced and commercial: controlled push/track/soft-orbit and phrase-based hard cuts—not rapid whip/crash spam.
Singing-face lip-sync revisits about every 3–4 shots, mainly eye-level front with some three-quarter/profile and head-turn dynamics; no low-angle or high-angle facial lip-sync.
Visual style follows style_lock [...].
\`\`\`

### 8.3 retention_analysis

Subject / Picture：\`fully_preserved\`（白底不保留）；Audio：\`reference\`。

### 8.4 detailed_description

风格声明必加：

\`\`\`text
Mid-tempo pop-performance editing with ASR-locked cuts and controlled camera intensity.
Singing-face lip-sync uses eye-level front/side/dynamic turns only—no low/high-angle face lip-sync.
On-screen world follows elements_lock [...].
\`\`\`

每镜顺序：标记+At → Scene（元素来自 lock）→ 景别/角度/镜头 → 运镜+乐句/拍点 → 唱脸则 face_mode+lip-sync，否则自然表演无对口型 → \`<d>\` → 跨镜 \`<scenetrans>\`。

字数通常 400–700 英文词；优先保证镜头计划与 B 档运镜配额。

### 8.5 overall_soundscape / non_diegetic_music

环境音 + 轻物理声（衣料、脚步、窗缝风）；不写歌词。  
Beat/织体写清随主歌副歌变化；切镜对齐乐句边界；可写 visual rhythm stays controlled and musical even if ASR text is messy。

---

## 九、完整示例

### 用户输入

- 白底数字人  
- \`【用户要求：偏深夜情绪，城市夜景流行，不要喜庆，不要说唱炸切】\`  
- 另附 §2.1 中的 12 行 ASR  

### 解析器示例

\`\`\`text
style_lock:
  name: Midnight Window Pop
  palette: warm tungsten, cold blue street, gold window glow
  lighting: practical lamps + city spill through glass
  mood: sleepless, soft longing, contemporary pop
  references_inspired_by: urban night pop (user), not a specific MV copy
elements_lock:
  must_appear: dark hallway, sleepless bedside lamp, shop-window glow, window+golden bokeh, metal silhouette (restrained), dust haze soft, finger ECU
  supporting: coat fabric motion, glass reflection
  lyric_motifs_used:
    - 凌晨回家的 → hallway
    - 你好不好睡 → bedside lamp
    - 特别的贵 → shop window
    - 窗外的金色 → golden window
    - 武器/灰 → metal + soft haze
    - 手指 → finger ECU
  user_forced: 深夜情绪, 城市夜景流行, 不要喜庆, 不要说唱炸切
style_source: mixed
elements_source: mixed
\`\`\`

### shot_plan 示例

\`\`\`text
rhythm_template: B_midtempo_pop_performance
duration_sec: 14.94
Shot1 @ 0.0     merge S01+S02 | 走廊/床灯建场 | medium push | lip_sync_face: no
Shot2 @ 1.6     merge S03+S04 | 唱歌脸 | yes | face_mode: front
Shot3 @ 3.56    merge S05+S06 | 地面/站位自然表演 | controlled track | no
Shot4 @ 5.08    merge S07+S08 | 窗边环境 | no
Shot5 @ 7.0     S09 贵 | 橱窗侧跟 | no
Shot6 @ 8.8     S10 窗外金色 | 唱歌脸 | yes | face_mode: three_quarter
Shot7 @ 10.58   S11 前半 | soft half-orbit 表演（可低机位但无对口型）| no
Shot7b @ 12.2   insert 金属/灰雾（轻）| no
Shot8 @ 13.0    S11 后段倾向收束 | 唱歌脸 | yes | face_mode: turn_to_cam
Shot9 @ 13.84   S12 手指 ECU | no
\`\`\`

说明：约每 3 镜回访唱歌脸；运镜以 push/track/soft orbit + clean hard cut 为主；无连续 whip/crash。

### detailed_description 写法摘录

\`\`\`text
[Shot 1] Scene: dark return hallway (non-white)... from <Picture 1>...
The camera pushes in at medium speed on the vocal entry.
<d>[Chinese] 凌晨回家的，你好不好睡，</d>
[Shot 2] At 00:01.600, clean hard cut to eye-level front facial close-up; lip-syncing with clear, melodic mouth shapes matching the lyrics...
<d>[Chinese] 生活的台词，你好不好背，</d>
[Shot 5] At 00:07.000, ... tracks laterally at controlled speed past glowing shop windows... no lip-sync...
<d>[Chinese] 想要的东西都特别的贵，</d>
[Shot 6] At 00:08.800, ... three-quarter facial close-up, lips clearly readable; lip-syncing...
<d>[Chinese] 窗外的金色都特别的美，</d>
[Shot 7] At 00:10.580, ... soft half-orbit, optional low-angle body framing, no lip-sync...
[Shot 7b] At 00:12.200, insert...
[Shot 8] At 00:13.000, three-quarter turning toward camera while lip-syncing; mouth stays readable...
[Shot 9] At 00:13.840, finger ECU... <d>[Chinese] 我用手指在武器中。</d>
\`\`\`

---

## 十、自检清单

### ASR

- [ ] 按 \`(start, end) text\` 逐行解析？  
- [ ] 输出 segments / duration / shot_plan？  
- [ ] 每个 At 可追溯 start 或合法中点？  
- [ ] 有 ASR 时未改用固定 1.2s 网格？  
- [ ] \`<d>\` 照抄 asr_text？用户要求未进 \`<d>\`？

### 解析器

- [ ] 先输出完整 style_lock / elements_lock？  
- [ ] lyric_motifs_used？must_appear 含歌词意象？  
- [ ] Shot1 非白？

### 节奏模板 B

- [ ] 未写成说唱级 whip/crash 密度？  
- [ ] push≥2、track≥2、soft orbit≥1、clean hard cut≥3、insert≥1？  
- [ ] 单镜是否偏 1.5–3.2s 呼吸感？  
- [ ] 唱歌脸约每 3–4 镜、最多连续 3 非唱脸？  

### 唱歌脸

- [ ] 无仰拍/俯拍面部 lip-sync？  
- [ ] 正面为主、侧面有保留、动态转头达标？  
- [ ] 相邻 face_mode 有区分？侧面写明嘴可见？  
- [ ] 非唱脸无 lip-sync？

### Ref2VA

- [ ] 六段齐全？人物外观一致？能量从「中」起跳而非开场狂炸？
`,U0=`# 流行MV视频提示词生成指令（H3 Ref2VA）· 节奏模板 C · 慢抒情流动

> **节奏模板**：C · Ballad / Slow Flow（慢 · 抒情流动）  
> **一次完成**：ASR 解析 → 画风×元素解析器 → 唱歌脸回访 → 慢速运镜 → Ref2VA  
> **切镜**：\`(start, end) text\` 时间戳最高优先  
> **唱歌脸**：约每 **4–5** 镜回访；单次唱脸可更长；正面为主 + 适量侧面 + 轻柔动态转头；禁止仰拍/俯拍对口型  
> **运镜**：慢推、缓移、轻轨道；硬切减少；默认 **无 whip / 无 crash**  
> **画风/元素**：解析器每次生成，不写死固定场景皮  
> **禁止**：说唱级狂切、中速流行级密切、连续短镜闪切、开场高能量轰炸  

---

## 〇、总流程

\`\`\`
1) 拆分输入：【用户要求】 / ASR (start,end) 行 / 歌名歌手线索
2) 逐行解析 ASR → segments 表 + duration_sec
3) 画风×元素解析器 → style_lock + elements_lock（必须先写）
4) 按碎段/长段规则合并拆分 → shot_plan（At 全部锚定 ASR；本模板单镜明显更长）
5) 标记 lip_sync_face + face_mode（按 C 档疏密度）
6) 为每镜分配 Slow Flow 运镜配额 + 元素落地
7) 输出 Ref2VA 六段；所有 At 可追溯时间轴
\`\`\`

禁止：跳过解析器；有 ASR 却改用固定 1.2s 假网格；连续 ≥5 镜无唱歌脸；仰俯拍怼脸对口型；whip/crash；把本模板写成 B 档或说唱档密度。

---

## 一、角色与任务

你是专业 H3 Ref2VA 提示词工程师。输入：数字人图、音频、带时间戳 ASR 文本（可含用户要求）。输出：先锁画风元素与唱歌脸计划，再生成**慢歌 / 抒情 / 叙事 ballad** MV 提示词。

铁律：

1. **Slow Flow 剪辑**：气口与情绪优先；切镜服务于乐句，不服务于炫技。  
2. **非唱脸**：缓慢运镜 + 克制表演；不对口型。  
3. **唱歌脸回访**：约每 4–5 镜一次嘴可读的面部对口型；唱脸可持续更久。  
4. **节奏恒定**：不因 ASR 对错/字少变成死站桩，也不因「怕平」乱加密切镜。  
5. **ASR 时间戳最高优先**。  
6. **画风×元素现解**。  
7. **禁白底**。

---

## 二、ASR 时间戳歌词格式

### 2.1 唯一合法格式

每一行：

\`\`\`text
(开始秒, 结束秒) 该时间段内的识别文字
\`\`\`

| 部分 | 规则 | 示例 |
|------|------|------|
| 左括号 | 半角 \`(\` | \`(\` |
| 开始时间 | 秒，整数或小数 | \`0.0\` / \`10.58\` |
| 逗号 | 半角 \`,\`，前后可有空格 | \`,\` |
| 结束时间 | 秒，大于开始 | \`0.68\` / \`13.8\` |
| 右括号 | 半角 \`)\` | \`)\` |
| 空格 | \`)\` 后通常有空格 | \` \` |
| 文本 | ASR 原文（可含错字） | \`凌晨回家的，\` |

完整识别样例：

\`\`\`text
(0.0, 0.68) 凌晨回家的，
(0.76, 1.44) 你好不好睡，
(1.6, 2.5) 生活的台词，
(2.54, 3.22) 你好不好背，
(3.56, 4.08) 站满就近，
(4.18, 4.94) 地板到不到位，
(5.08, 5.8) 口是拎的直，
(5.92, 6.74) 男人找不到背，
(7.0, 8.52) 想要的东西都特别的贵，
(8.8, 10.28) 窗外的金色都特别的美，
(10.58, 13.8) 何时才能够公平的对比类似里面的武器和外面的灰，
(13.84, 14.94) 我用手指在武器中。
\`\`\`

### 2.2 正则

\`\`\`regex
^\\((\\d+(?:\\.\\d+)?)\\s*,\\s*(\\d+(?:\\.\\d+)?)\\)\\s*(.*)$
\`\`\`

- Group1 = \`start_sec\`；Group2 = \`end_sec\`；Group3 = \`asr_text\`（**照抄进 \`<d>\`**）

### 2.3 不是此格式的内容

| 内容 | 处理 |
|------|------|
| \`【用户要求：xxxx】\` | 创意控制，**非歌词**，不进 \`<d>\` |
| 无括号纯歌词 | 无时间戳；切镜回退时长网格 |
| SRT/VTT | 不按 SRT 解析；标准输入是 \`(s, e) text\` |
| 行内错字怪句 | 不修正；时间可信，文本忠实 |

### 2.4 解析后必须先输出锁定表

写 Ref2VA 之前输出：

\`\`\`text
rhythm_template: C_ballad_slow_flow
asr_format: (start_sec, end_sec) text
segment_count: [N]
duration_sec: [最后一行 end_sec]
cut_priority: ASR_timestamps > duration_grid > lyric_line_count
segments:
  - id: S01 | start: 0.0 | end: 0.68 | text: ...
  - id: S02 | ...
style_lock: ...
elements_lock: ...
shot_plan: ...  # 含 lip_sync_face + face_mode
\`\`\`

---

## 三、切镜优先级

### 3.1 从高到低

\`\`\`
1) ASR start / end                 ← 最高
2) Slow Flow 运镜与情绪呼吸        ← 不可因时间戳取消必要缓慢运镜
3) 单镜上限 / 合并拆分逻辑         ← 本模板单镜显著更长
4) 默认时长网格                    ← 仅当完全没有 ASR 行
5) 歌词行数                        ← 永远最低
\`\`\`

### 3.2 转为 H3 时间

1. Shot 切入 = 该镜对齐段（或合并组）的 \`start_sec\`  
2. 换算 \`MM:SS.mmm\`：\`1.44\`→\`00:01.440\`；\`10.58\`→\`00:10.580\`；\`0.0\`→Shot1 无 \`At\`  
3. \`[Shot N] At MM:SS.mmm, the shot eases / gently cuts to ...\`  
4. 禁止有 ASR 时仍写无关的 \`00:01.200 / 00:02.400 / 00:03.200…\`

### 3.3 过碎 / 过长处理（C 档：合并最宽）

| 情况 | 做法 | 时间戳 |
|------|------|--------|
| 段长 0.35–1.50s 且密 | 合并 **3–5** 段为一镜（慢歌句读完整） | 切入=组首 start；\`<d>\` 拼接全文 |
| 段长 1.50–4.00s | 一段一镜优先 | 切入=该段 start |
| 段长 >4.00s | 优先保持长表演/唱脸；仅在情绪转折处拆 1 次轻 insert | insert 仍在段内；可用 \`<scenetrans>\` |
| 段间空隙 ≥0.40s | 可插极短无词环境呼吸镜（全片少用） | At=空隙中点 |
| 合并后仍 >5.0s | 可再拆，但拆后单镜仍宜 ≥2.0s | At 仍来自时间轴 |

合并示例：

\`\`\`text
S01 (0.0, 0.68) 凌晨回家的， + S02 (0.76, 1.44) 你好不好睡，
→ Shot1 开场 <d>凌晨回家的，你好不好睡，</d>
可将 S03+S04 再并入更长句读，若仍偏碎：
S03+S04 → Shot2 At 00:01.600 <d>生活的台词，你好不好背，</d>
\`\`\`

### 3.4 总时长

有 ASR：≈ 最后一行 \`end_sec\`（可 +0–0.5s 收束余韵）。用户指定更短窗口则只取窗内段。

### 3.5 与运镜关系

时间戳决定何时切，不决定把片子切碎。  
段少 → 用更长 push/track 填满，少 insert。  
段多 → **大胆合并**，保持慢呼吸。  
禁止为了「有变化」故意加密到 B/说唱密度。C 档配额仍须打满（slow push/track/hold micro-move 等）。

---

## 四、决策顺序

\`\`\`
1) 解析所有 (start,end) text → segments
2) 剥离【用户要求】
3) duration_sec = max(end_sec)
4) 跑画风×元素解析器 → style_lock / elements_lock
5) 宽合并/少拆分 → shot_plan（绑定 start_sec）
6) 按 C 档标注 lip_sync_face + face_mode
7) 分配场景元素 + Slow Flow 运镜（打满 C 配额）
8) 写 <d>（asr 原文）；无词 insert 无 <d>
9) 输出 Ref2VA；所有 At 来自 shot_plan
\`\`\`

禁止：先画固定短网格再硬塞 ASR 文字。

---

## 五、画风×元素解析器

### 5.1 必须输出

\`\`\`text
style_lock:
  name: [...]
  palette: [3–6]
  lighting: [...]
  mood: [...]
  references_inspired_by: [...]

elements_lock:
  must_appear: [3–8]
  supporting: [2–5]
  avoid: [white studio, ...]
  lyric_motifs_used: [asr句 → 元素]
  user_forced: [...]

style_source: user | lyrics | artist_song | default | mixed
elements_source: user | lyrics | artist_song | default | mixed
\`\`\`

### 5.2 优先级

\`\`\`
【用户要求】 > 歌词可视觉化意象 > 歌名/歌手类型化 > 弱默认
\`\`\`

### 5.3 歌词抽元素

扫描全部 \`asr_text\`；清晰名词/场景优先；不可视化噪声句跳过。  
有可得意象时，\`must_appear\` 至少 2 个来自歌词；写入 \`lyric_motifs_used\`；元素打散到多镜（慢歌可更「场景化」，少闪切道具）。

| 信号例 | 元素例 |
|--------|--------|
| 凌晨/回家 | 深夜走廊、门口、归家路灯 |
| 睡 | 床、台灯、窗帘缝 |
| 窗外/金色 | 窗框、城市金光软 bokeh、玻璃 |
| 贵 | 橱窗暖光（柔、勿广告感） |
| 武器/灰 | 金属剪影、轻尘（极克制） |
| 手指 | 手部慢推 ECU |
| 雨/风/泪（若出现） | 直接入 must_appear |

### 5.4 用户要求 / 歌名歌手

\`【用户要求】\` 永不进 \`<d>\`。歌名歌手只做类型化 inspired by，不复刻特定版权分镜。

### 5.5 弱默认（抒情向兜底）

\`cinematic emotional ballad, soft practicals, gentle contrast, warm-cool window spill\`  
元素：quiet interior, window city haze, bed/lamp, curtain, empty hallway, subtle rain optional  
仍禁白棚。

### 5.6 禁白底

禁止：white studio / white backdrop / photography studio / seamless white / bright white void / neutral gray cyclorama。  
Shot 1 必须用 \`style_lock\` 下的非白环境开场。  
若解析结果偏浅，强制压暗或换非白场景。

非白开场参考池（可按 lock 改写）：  
dim bedroom with lamp / window-lit quiet apartment / rainy street soft focus / empty hallway warm practical / rooftop dusk soft wind 等。

---

## 六、运镜母版 C · 慢抒情流动

### 6.1 强制配额（C 档）

| 运镜 | 最少/上限 | 说明 |
|------|-----------|------|
| Slow push in / Slow pull out | ≥2 | 主情绪呼吸 |
| Slow tracking / gentle dolly | ≥1–2 | 流动，不急 |
| Ultra-slow arc / drift（可选） | ≤1 | 半弧即可，禁止加速环绕 |
| Soft hard cut on phrase / breath | ≥2 | 乐句或气口切；切次总数宜少 |
| Stable frame + micro-push（唱脸常用） | ≥1 | 唱脸可读嘴 |
| Detail / atmosphere insert | ≤2，可选 | 全片少；用于情绪标点 |
| Whip-cut | **0** | 禁止 |
| Crash zoom | **0** | 禁止 |
| Handheld shake locked to beat | **0** | 禁止说唱式抖 |

禁止：whip、crash、punch-cut 连发、高速 lateral、rising-speed 360 orbit、每秒一切。

### 6.2 每镜最低配置

| 必选 | 要求 |
|------|------|
| 主动运镜或稳定微动 | slow push / slow track / micro-push / gentle drift（禁止完全死画面） |
| 气口/乐句 | breath / phrase / vocal swell / downbeat 至少一词 |
| 主体动态 | 非唱脸：呼吸、微表情、慢手势；唱脸：嘴型为主 |
| 切镜出口 | 除末镜外 soft hard cut 或 motivated gentle cut；禁用 whip/punch |

### 6.3 能量曲线（抒情）

从**中低～中**起跳，缓慢抬升。

\`\`\`
开场：中低～中（环境+人物，慢推建立）
主段：中（唱脸与长环境镜交替，间距疏）
高潮句/桥段：中～中高（唱脸可略延长，仍不炸切）
收尾：中高后缓落，或轻拉远留白
\`\`\`

禁用：

\`\`\`text
explosive multi-scene hard cuts
whip-pan
crash-zoom
rapid tracking at high speed
handheld shake on snare
stands completely still with zero camera motion for the whole shot
cutting every 1 second
\`\`\`

推荐用语库（轮换）：

\`\`\`text
The camera slowly pushes in toward <Subject 1> on the vocal breath.
The camera gently pulls out, revealing the quiet room and window light.
The camera tracks laterally at a very slow pace, soft background drift.
The camera holds a stable eye-level frame with an almost imperceptible micro-push during lip-sync.
The edit makes a soft hard cut on the phrase ending / breath.
The camera drifts in a tiny arc, never rushing.
\`\`\`

唱脸镜：稳定构图 + micro-push / 极轻转头；**禁止** crash/whip 进入。

### 6.4 切镜维度与镜头规格

切次宜少；每次切应有动机（换乐句、换空间、换景别）。  
全片 ≥2 场景即可（可比 B 更少硬跳）。  
Lens：自然焦段为主（约 35–85mm feel）；柔和景深；少用畸变广角/鱼眼。  
单镜常见 **2.5–5.0s**；唱脸可达 **4.0–5.5s**。  
全片总镜头数通常少于 B（同等时长下更少切）。

### 6.5 非唱脸表演（抒情）

呼吸起伏、眨眼、轻触窗玻璃、握杯、低头再抬头、慢步。  
禁止默认：拍胸、砸拳、怒指、夸张肩弹（除非用户明确要求）。  
每镜一个极小而真实的动作即可。

### 6.6 仰俯 vs 对口型

极轻的仰俯可用于非唱脸气氛（慎用）。  
唱歌脸对口型：**仅 eye-level 正面 / 侧面 / 轻柔转头**；禁止仰俯怼脸 lip-sync。

---

## 七、唱歌脸回访 · 正侧动态对口型（C 档疏密度）

### 7.1 密度

最多连续 **4** 个非唱脸镜，然后必须回访唱歌脸。  
Shot **2–5** 内出现第一次唱歌脸（Shot1 可纯环境建场）。

| 总镜数 | 唱歌脸最少 |
|--------|------------|
| 4–5 | ≥1–2 |
| 6–8 | ≥2 |
| 9–11 | ≥2–3 |
| 12+ | ≥ ceil(n/5) |

Insert 不计唱歌脸。优先落在完整乐句、合并后约 ≥1.5s 的段；**单次唱脸宜唱满一句感**。

### 7.2 合格唱歌脸

面部 CU / 紧 MCU + 嘴清晰可见 + lip-sync。平视为主。  
可用略长的稳定唱脸，不要一闪而过。

### 7.3 允许 face_mode

| face_mode | 说明 |
|-----------|------|
| \`front\` | 正面平视（主力） |
| \`three_quarter\` | 三分侧，嘴可读 |
| \`profile\` | 侧脸，lips visible in profile |
| \`turn_to_cam\` | 极慢侧转正，边唱边转 |
| \`turn_to_side\` | 极慢正转侧，边唱边转 |

转头速度必须**慢**，与 ballad 匹配。

### 7.4 禁止用于唱歌脸

- low-angle / high-angle 面部对口型  
- Dutch 脸对口型  
- 嘴出画、背面、遮挡嘴  
- crash/whip 砸进脸  

### 7.5 正侧比例

| 唱歌脸次数 | 正面类 | 侧面类 | 动态 |
|------------|--------|--------|------|
| 1 | 1 front | — | 可选极轻呼吸感微动 |
| 2 | 1 | 1 | 建议 1 次极慢 turn_* |
| 3 | 2 | 1 | ≥1 次极慢 turn_* |
| 4+ | ~60–70% | ~30–40% | ≥1 次 turn_* |

相邻唱歌脸 \`face_mode\` 尽量不同。

### 7.6 写法

\`\`\`text
eye-level front facial close-up; lip-syncing with soft, clear mouth shapes matching the lyrics; subtle micro-push
three-quarter facial close-up, lips clearly readable; lip-syncing slowly with the melody
profile close-up, lips clearly visible in profile; lip-syncing...
three-quarter that turns very slowly toward camera while lip-syncing; mouth stays readable
\`\`\`

非唱脸禁止：\`lip-sync\` / \`mouth shapes matching the lyrics\`。

### 7.7 shot_plan 字段

\`\`\`text
lip_sync_face: yes | no
face_mode: front | three_quarter | profile | turn_to_cam | turn_to_side  # yes 时必填
\`\`\`

---

## 八、Ref2VA 六段

顺序：\`subject_definitions\` → \`summary\` → \`retention_analysis\` → \`detailed_description\` → \`overall_soundscape\` → \`non_diegetic_music\`

### 8.1 subject_definitions

\`<Subject 1>\` 外观跨场景一致；\`<Picture 1>\` 只锁人物，白底替换为非白 Scene；\`<Audio 1>\` 音色 + delivery + 气口/乐句节奏参考。

### 8.2 summary 必含

\`\`\`text
[reference generation + audio reference] Slow ballad / emotional slow-flow music video featuring <Subject 1> guided by <Audio 1>.
Edit cut times are locked to the provided ASR (start, end) timestamps as the highest-priority timing source.
Camera language is patient and lyrical: slow push/track, stable frames, soft phrase-based cuts—no whip, no crash, no rapid cutting.
Singing-face lip-sync revisits about every 4–5 shots, mainly eye-level front with some three-quarter/profile and very slow head-turn dynamics; no low-angle or high-angle facial lip-sync.
Visual style follows style_lock [...].
\`\`\`

### 8.3 retention_analysis

Subject / Picture：\`fully_preserved\`（白底不保留）；Audio：\`reference\`。

### 8.4 detailed_description

风格声明必加：

\`\`\`text
Ballad slow-flow editing with ASR-locked cuts and low cutting density.
Camera moves are slow and motivated; intensity stays emotional, never explosive.
Singing-face lip-sync uses eye-level front/side/slow-turn only—no low/high-angle face lip-sync.
On-screen world follows elements_lock [...].
\`\`\`

每镜顺序：标记+At → Scene（lock 元素）→ 景别 → 慢运镜+气口/乐句 → 唱脸则 face_mode+lip-sync，否则克制表演 → \`<d>\` → \`<scenetrans>\`。

字数通常 400–700 英文词；优先长句读与慢运镜描述，而非堆切镜动词。

### 8.5 overall_soundscape / non_diegetic_music

环境音偏安静（房间底噪、远车、窗风、衣料轻响）；不写歌词。  
音乐：慢板/抒情织体、BPM 或 “slow ballad tempo”；动态随乐句起伏；切镜对齐气口/乐句尾。

---

## 九、完整示例

### 用户输入

- 白底数字人  
- \`【用户要求：慢歌抒情，深夜安静，不要炸切，不要说唱运镜】\`  
- 另附 §2.1 中的 12 行 ASR  

### 解析器示例

\`\`\`text
style_lock:
  name: Quiet Midnight Ballad
  palette: warm lamp amber, cool window blue, soft shadow
  lighting: single practical lamp + distant city spill
  mood: sleepless, tender, restrained longing
  references_inspired_by: emotional night ballad (user), not a specific MV copy
elements_lock:
  must_appear: dim hallway, bedside lamp, window with golden city haze, quiet bed edge, soft dust in lamp beam, finger slow ECU
  supporting: curtain breath, glass reflection
  lyric_motifs_used:
    - 凌晨回家的 → hallway
    - 你好不好睡 → bedside lamp
    - 特别的贵 → soft shop-window glow (distant, restrained)
    - 窗外的金色 → golden window
    - 武器/灰 → soft metal glint + dust (restrained)
    - 手指 → finger ECU
  user_forced: 慢歌抒情, 深夜安静, 不要炸切, 不要说唱运镜
style_source: mixed
elements_source: mixed
\`\`\`

### shot_plan 示例

\`\`\`text
rhythm_template: C_ballad_slow_flow
duration_sec: 14.94
Shot1 @ 0.0     merge S01+S02(+可选更多) | 走廊/灯建场 | slow push | lip_sync_face: no
Shot2 @ 1.6     merge S03+S04 | 唱歌脸 | yes | face_mode: front | long stable + micro-push
Shot3 @ 3.56    merge S05+S06+S07+S08 若过碎则宽合并 | 窗边慢 track | no
Shot4 @ 7.0     S09+S10 可合并 | 窗金光环境长镜 | no
Shot5 @ 10.58   S11 前段 | 唱歌脸 | yes | face_mode: three_quarter | longer hold
Shot6 @ 12.5    S11 后段轻 insert 或继续表演 | soft atmosphere | no
Shot7 @ 13.84   S12 | 唱歌脸或手指慢 ECU 收束 | yes front 或 no+finger 二选一；若总镜少则保证 ≥2 次唱脸
\`\`\`

（实操时按 §7.1 保证唱歌脸次数；同等时长切次明显少于 B。）

更完整的 7 镜示意：

\`\`\`text
Shot1 @ 0.0     建场 | no | slow push
Shot2 @ 1.6     唱脸 | yes | front
Shot3 @ 3.56    环境慢移 | no
Shot4 @ 7.0     窗景长镜 | no
Shot5 @ 8.8     唱脸 | yes | three_quarter
Shot6 @ 10.58   soft drift 表演 | no
Shot7 @ 13.0    唱脸 | yes | turn_to_cam（极慢）
Shot8 @ 13.84   手指慢 ECU | no
\`\`\`

### detailed_description 写法摘录

\`\`\`text
[Shot 1] Scene: dim hallway (non-white)... from <Picture 1>...
The camera slowly pushes in on the vocal breath.
<d>[Chinese] 凌晨回家的，你好不好睡，</d>
[Shot 2] At 00:01.600, soft hard cut to eye-level front facial close-up; lip-syncing with soft, clear mouth shapes matching the lyrics; subtle micro-push...
<d>[Chinese] 生活的台词，你好不好背，</d>
[Shot 4] At 00:07.000, ... gently tracks past the window with golden city haze... no lip-sync...
[Shot 5] At 00:08.800, ... three-quarter facial close-up, lips clearly readable; lip-syncing slowly with the melody...
[Shot 7] At 00:13.000, ... three-quarter turning very slowly toward camera while lip-syncing; mouth stays readable...
[Shot 8] At 00:13.840, slow finger ECU... <d>[Chinese] 我用手指在武器中。</d>
\`\`\`

禁止出现 whip / crash / rapid cut 描述。

---

## 十、自检清单

### ASR

- [ ] 按 \`(start, end) text\` 逐行解析？  
- [ ] 输出 segments / duration / shot_plan？  
- [ ] 每个 At 可追溯 start 或合法中点？  
- [ ] 有 ASR 时未改用固定短网格？  
- [ ] \`<d>\` 照抄 asr_text？用户要求未进 \`<d>\`？

### 解析器

- [ ] 先输出完整 style_lock / elements_lock？  
- [ ] lyric_motifs_used？must_appear 含歌词意象？  
- [ ] Shot1 非白？

### 节奏模板 C

- [ ] **无** whip / crash / 高速 track / 说唱式抖镜？  
- [ ] slow push≥2，切次少，单镜多在 2.5–5s？  
- [ ] 未写成 B 档 3–4 镜一脸或说唱 2–3 镜一脸的密度？  
- [ ] 唱歌脸约每 4–5 镜、最多连续 4 非唱脸？  

### 唱歌脸

- [ ] 无仰拍/俯拍面部 lip-sync？  
- [ ] 正面为主、侧面有保留；转头足够慢？  
- [ ] 非唱脸无 lip-sync？

### Ref2VA

- [ ] 六段齐全？人物外观一致？能量从中低～中缓起，而非开场狂炸？
`,B0=`# 氛围MV视频提示词生成指令（H3 Ref2VA）· 节奏模板 F · 氛围少脸

> **节奏模板**：F · Aesthetic / Mood（氛围 · 少脸）  
> **一次完成**：ASR 解析 → 画风×元素解析器 → 极少唱歌脸 → 氛围运镜 → Ref2VA  
> **切镜**：\`(start, end) text\` 时间戳最高优先  
> **唱歌脸**：全片极少（通常 **1–2** 次，短片可 **0–1**）；不靠密对口型撑戏  
> **运镜**：环境与光影流动为主；慢推/缓移/长持；**禁止 whip / crash / 说唱式抖切**  
> **画风/元素**：解析器每次生成；人物常是风景中的一点  
> **禁止**：写成说唱炸切、流行密唱脸、或抒情歌那种植入式句句回脸  

适合：梦幻/电子氛围、迷幻夜景、影像诗、人声若有若无、少正脸表演的歌。  
不适合：必须看见表情的情歌主唱、trap 快嘴、副歌燃向。

---

## 〇、总流程

\`\`\`
1) 拆分输入：【用户要求】 / ASR (start,end) 行 / 歌名歌手线索
2) 逐行解析 ASR → segments 表 + duration_sec
3) 画风×元素解析器 → style_lock + elements_lock（必须先写；环境权重更高）
4) 宽合并/少切 → shot_plan（At 锚定 ASR；单镜长；环境镜占比高）
5) 唱歌脸极少：标记 lip_sync_face（多数 no；全片仅 0–2 次 yes）
6) 分配 Mood 运镜配额 + 元素落地（空镜/剪影/背影可用）
7) 输出 Ref2VA；所有 At 可追溯时间轴
\`\`\`

禁止：跳过解析器；有 ASR 却改用固定短网格；把唱脸加到 B/C 密度；仰俯拍怼脸对口型；whip/crash。

---

## 一、角色与任务

你是专业 H3 Ref2VA 提示词工程师。输入：数字人图、音频、带时间戳 ASR 文本（可含用户要求）。输出：先锁画风元素，再生成**氛围影像诗式** MV 提示词——声音与空间优先，人物与口型为辅。

铁律：

1. **Mood 剪辑**：气氛、空间、光影 > 表演秀。  
2. **少脸**：多数镜头不对口型；可为背影、侧剪影、远景小人、空镜。  
3. **唱歌脸可选且极少**：全片 0–2 次；有则平视正侧，禁止仰俯对口型。  
4. **节奏恒定**：慢而稳；不因歌词少就空，也不因「怕平」加密切镜或加唱脸。  
5. **ASR 时间戳最高优先**（用于切点与挂词，不强制每段都唱脸）。  
6. **画风×元素现解**（环境意象权重更高）。  
7. **禁白底**。

---

## 二、ASR 时间戳歌词格式

### 2.1 唯一合法格式

每一行：

\`\`\`text
(开始秒, 结束秒) 该时间段内的识别文字
\`\`\`

| 部分 | 规则 | 示例 |
|------|------|------|
| 左括号 | 半角 \`(\` | \`(\` |
| 开始时间 | 秒，整数或小数 | \`0.0\` / \`10.58\` |
| 逗号 | 半角 \`,\`，前后可有空格 | \`,\` |
| 结束时间 | 秒，大于开始 | \`0.68\` / \`13.8\` |
| 右括号 | 半角 \`)\` | \`)\` |
| 空格 | \`)\` 后通常有空格 | \` \` |
| 文本 | ASR 原文（可含错字） | \`凌晨回家的，\` |

完整识别样例：

\`\`\`text
(0.0, 0.68) 凌晨回家的，
(0.76, 1.44) 你好不好睡，
(1.6, 2.5) 生活的台词，
(2.54, 3.22) 你好不好背，
(3.56, 4.08) 站满就近，
(4.18, 4.94) 地板到不到位，
(5.08, 5.8) 口是拎的直，
(5.92, 6.74) 男人找不到背，
(7.0, 8.52) 想要的东西都特别的贵，
(8.8, 10.28) 窗外的金色都特别的美，
(10.58, 13.8) 何时才能够公平的对比类似里面的武器和外面的灰，
(13.84, 14.94) 我用手指在武器中。
\`\`\`

### 2.2 正则

\`\`\`regex
^\\((\\d+(?:\\.\\d+)?)\\s*,\\s*(\\d+(?:\\.\\d+)?)\\)\\s*(.*)$
\`\`\`

- Group1 = \`start_sec\`；Group2 = \`end_sec\`；Group3 = \`asr_text\`（有人声表演时照抄进 \`<d>\`；纯空镜可无人声 \`<d>\`）

### 2.3 不是此格式的内容

| 内容 | 处理 |
|------|------|
| \`【用户要求：xxxx】\` | 创意控制，**非歌词**，不进 \`<d>\` |
| 无括号纯歌词 | 无时间戳；切镜回退时长网格 |
| SRT/VTT | 不按 SRT 解析 |
| 行内错字怪句 | 不修正 |

### 2.4 解析后必须先输出锁定表

\`\`\`text
rhythm_template: F_aesthetic_mood_sparse_face
asr_format: (start_sec, end_sec) text
segment_count: [N]
duration_sec: [最后一行 end_sec]
cut_priority: ASR_timestamps > duration_grid > lyric_line_count
segments: ...
style_lock: ...
elements_lock: ...
shot_plan: ...  # 含 lip_sync_face；多数 no
face_budget: 0 | 1 | 2
\`\`\`

---

## 三、切镜优先级

### 3.1 从高到低

\`\`\`
1) ASR start / end
2) Mood 空间呼吸与运镜配额
3) 长单镜 / 宽合并逻辑
4) 默认网格（仅无 ASR）
5) 歌词行数（最低）
\`\`\`

### 3.2 转为 H3 时间

1. 切入 = \`start_sec\` → \`At MM:SS.mmm\`；Shot1 无 \`At\`  
2. 例：\`1.44\`→\`00:01.440\`；\`10.58\`→\`00:10.580\`  
3. 写法：\`the frame drifts / dissolves-feel hard cuts / eases to ...\`  
4. 禁止无关假网格时间  

### 3.3 过碎 / 过长（F 档：合并最宽、切最少）

| 情况 | 做法 | 时间戳 |
|------|------|--------|
| 段长 0.35–2.00s 且密 | 合并 **4–6** 段甚至更多为一镜 | 切入=组首 start；\`<d>\` 可挂组内词或仅环境 |
| 段长 2.00–5.00s | 一段一镜或继续并环境 | 切入=start |
| 段长 >5.00s | 优先超长氛围镜；少拆 | 仅情绪大转折可拆 |
| 空隙 ≥0.50s | 纯空镜/光斑/雨丝 insert（少） | At=空隙中点 |
| 合并后 >6.0s | 可拆，但拆后仍宜 ≥2.5s | At 仍锚定时间轴 |

合并示例：

\`\`\`text
S01+S02+S03+S04 → Shot1 长氛围：归家走廊+窗光，人可为背影
<d> 可挂前几句，或本镜无人近景则轻量挂词 / 部分镜无 <d>
\`\`\`

### 3.4 总时长

≈ 最后一行 \`end_sec\`（可 +0–0.5s 余韵）。

### 3.5 与运镜关系

时间戳决定何时换画面，不决定加密。  
F：**宁长勿碎**；用光影与景别变化代替密切。  
禁止为「有人在唱」而强行每 2–3 镜加唱脸。

---

## 四、决策顺序

\`\`\`
1) 解析 ASR → segments
2) 剥离【用户要求】
3) duration_sec = max(end)
4) 解析器 → style_lock / elements_lock（提高环境/空镜权重）
5) 宽合并 → shot_plan（镜头数通常少于 B/C）
6) face_budget = 0/1/2；标注极少 lip_sync_face: yes
7) Mood 运镜 + 元素（含空镜、剪影、远景）
8) <d>：有近景人声表演则挂；纯空镜可不挂
9) 输出 Ref2VA
\`\`\`

---

## 五、画风×元素解析器

### 5.1 必须输出

\`\`\`text
style_lock:
  name: [...]
  palette: [3–6]
  lighting: [...]
  mood: [...]
  references_inspired_by: [...]

elements_lock:
  must_appear: [3–8]   # 偏环境、材质、光
  supporting: [2–5]
  avoid: [white studio, crowded performance staging, ...]
  lyric_motifs_used: [asr句 → 元素]
  user_forced: [...]

style_source / elements_source: user | lyrics | artist_song | default | mixed
\`\`\`

### 5.2 优先级

\`\`\`
【用户要求】 > 歌词可视觉化意象 > 歌名/歌手类型化 > 弱默认
\`\`\`

### 5.3 歌词抽元素（环境优先）

同一歌词，F 优先映射为**空间/物件/光线**，其次才是人物动作。

| 信号例 | F 优先元素 |
|--------|------------|
| 凌晨/回家 | 空走廊、门缝光、街灯雾 |
| 睡 | 空床、台灯光锥、天花板慢移 |
| 窗外/金色 | 窗框、城市金雾、玻璃叠影 |
| 贵 | 橱窗虚化光斑（勿电商感） |
| 武器/灰 | 冷金属反光、浮尘丁达尔 |
| 手指 | 可作一次慢 ECU；非必须唱脸 |

有可得意象时，\`must_appear\` ≥2 个来自歌词；打散到多镜；噪声句跳过。

### 5.4 用户要求 / 歌名歌手

\`【用户要求】\` 不进 \`<d>\`。inspired by 只取气质（如 dream-pop night, neon haze），不抄版权分镜。

### 5.5 弱默认（氛围兜底）

\`cinematic aesthetic mood, soft haze, muted palette or selective neon, shallow depth\`  
元素：empty corridor, rain-streaked glass, distant silhouette, light beams, wet asphalt reflection, curtain drift  
禁白棚。

### 5.6 禁白底

禁止 white studio / white backdrop / seamless white / bright white void / neutral gray cyclorama。  
Shot1 非白。偏浅则压暗加雾/夜。

非白开场池：rain window / fog street / dim apartment / tunnel mouth / rooftop haze / underwater-like soft dark 等。

---

## 六、运镜母版 F · 氛围少脸

### 6.1 强制配额

| 运镜 | 最少/上限 | 说明 |
|------|-----------|------|
| Slow push / Slow pull / Slow drift | ≥2 | 主气氛 |
| Slow track / parallax | ≥1 | 空间层次 |
| Long hold + micro-drift | ≥1 | 可「几乎不动但有呼吸」 |
| Soft hard cut / motivated cut | ≥1–2 | 全片切次宜少 |
| Atmosphere insert（光/雨/物） | ≥1 | 情绪标点 |
| Subject as silhouette / wide tiny figure | ≥1 | 人融入环境 |
| Whip-cut | **0** | 禁止 |
| Crash zoom | **0** | 禁止 |
| Rapid orbit / snare shake | **0** | 禁止 |

### 6.2 每镜最低配置

| 必选 | 要求 |
|------|------|
| 运镜或微漂 | slow drift / push / track / micro-move（禁止整镜完全死图） |
| 气氛词 | haze / breath / light shift / rain / silence 等至少一类 |
| 主体 | 人可小、背、剪影；或纯环境 |
| 切出 | soft hard cut；禁用 whip/punch |

### 6.3 能量曲线

\`\`\`
开场：中低（空间建立）
中段：中低～中（环境变化 + 偶发人影）
若有 1 次唱脸：中（短暂）后回到氛围
收尾：中低余韵或渐远
\`\`\`

禁用：

\`\`\`text
explosive cuts every 1–2 seconds
whip-pan / crash-zoom
rap performance energy
lip-sync on most shots
stands as a static talking-head music video
\`\`\`

推荐用语：

\`\`\`text
The camera slowly drifts past rain-streaked glass, city lights smearing into bokeh.
The camera pushes in extremely slowly toward a distant silhouette of <Subject 1>.
The frame holds with a barely perceptible micro-drift as curtains breathe.
The edit makes a soft hard cut to an empty hallway washed in practical light.
Parallax of wet asphalt reflections slides gently across frame.
\`\`\`

### 6.4 景别与镜头

景别偏 wide / medium-wide / insert ECU（物/光）；人脸 CU 全片极少。  
Lens：柔和自然焦段 + 浅景深；可用 mild anamorphic-feel smear；少鱼眼。  
单镜常见 **3.0–6.0s**；允许更长。  
场景 ≥2；变化靠光与物件，不靠密跳切。

### 6.5 人物表演（少脸）

背影站立、慢走、靠窗、剪影抬头、手入画。  
禁止默认说唱肢体与夸张口播姿态。

### 6.6 仰俯 vs 对口型

气氛镜可用轻仰俯看空间。  
若出现唱歌脸：仅 eye-level 正侧；禁止仰俯对口型。

---

## 七、唱歌脸规则（F：稀疏）

### 7.1 预算

| 视频时长 | face_budget（lip_sync_face: yes 次数） |
|----------|----------------------------------------|
| ≤8s | 0–1 |
| 8–15s | 0–2 |
| >15s | 1–2（一般不超过 2） |

硬规则：

- **禁止**按每 2–3 或 3–4 镜回访。  
- 多数 Shot：\`lip_sync_face: no\`。  
- 若用户要求「几乎不要正脸」→ \`face_budget: 0\`，全片不对口型，歌词可挂在环境镜旁白式 \`<d>\` 或仅部分镜出现。  
- 若用户要求「偶尔看清在唱」→ 在高潮句或末段给 **1** 次 front/three_quarter。

### 7.2 若 yes：face_mode

仅：\`front\` | \`three_quarter\` | \`profile\`（须嘴可见）| 极慢 \`turn_to_cam\` / \`turn_to_side\`  

禁止：low/high-angle face lip-sync、Dutch face、crash 进脸。

### 7.3 写法

有唱脸时：

\`\`\`text
eye-level front facial close-up (rare); lip-syncing with soft mouth shapes matching the lyrics; brief, then return to environment
\`\`\`

无唱脸时明确：

\`\`\`text
no lip-sync; subject remains a silhouette / back view / distant figure
\`\`\`

### 7.4 shot_plan 字段

\`\`\`text
lip_sync_face: yes | no
face_mode: ...  # 仅 yes
\`\`\`

---

## 八、Ref2VA 六段

顺序：\`subject_definitions\` → \`summary\` → \`retention_analysis\` → \`detailed_description\` → \`overall_soundscape\` → \`non_diegetic_music\`

### 8.1 subject_definitions

人物外观一致；Picture 只锁人物、白底替换；Audio = 音色 + 氛围节奏参考。

### 8.2 summary 必含

\`\`\`text
[reference generation + audio reference] Aesthetic mood music video with sparse or no lip-sync faces.
Edit cut times locked to ASR (start, end) timestamps.
Camera language is atmospheric and patient: slow drifts, environmental frames, silhouettes—no whip, no crash, no rapid performance cutting.
Lip-sync facial shots are rare (0–2 total); most shots prioritize space, light, and texture.
Visual style follows style_lock [...].
\`\`\`

### 8.3 retention_analysis

Subject/Picture fully_preserved（白底不保留）；Audio reference。

### 8.4 detailed_description

风格声明必加：

\`\`\`text
Aesthetic mood editing with ASR-locked cuts and very low cutting density.
Subject often appears small, silhouetted, or from behind; lip-sync is sparse or absent.
World design follows elements_lock [...].
\`\`\`

每镜：At → 环境 Scene → 慢运镜 → 多数无 lip-sync → 可选 \`<d>\` → \`<scenetrans>\`。

字数约 400–700；多写光、雾、反射、空间，少写表演炫技。

### 8.5 声音

安静或设计感环境音（雨、远车、通风、房间底噪）。  
音乐：氛围垫、慢脉冲、稀疏鼓点或无鼓；强调 texture；切镜对齐气氛起伏而非 snare 轰炸。

---

## 九、完整示例

### 用户输入

- 白底数字人  
- \`【用户要求：氛围感，少怼脸，雨夜城市，不要说唱切，能不对口型就不对】\`  
- §2.1 的 12 行 ASR  

### 解析器示例

\`\`\`text
style_lock:
  name: Rain Glass Nocturne
  palette: muted teal, soft sodium, wet black
  lighting: street glow through rain glass, low contrast haze
  mood: detached, sleepless, cinematic loneliness
elements_lock:
  must_appear: rain-streaked window, empty hallway, distant silhouette, golden city smear, floating dust, finger as rare insert
  lyric_motifs_used:
    - 凌晨回家的 → empty hallway
    - 你好不好睡 → lamp cone in dark room
    - 窗外的金色 → golden city through wet glass
    - 手指 → optional slow finger ECU (no face)
  user_forced: 氛围少脸, 雨夜, 不对口型优先
face_budget: 0
\`\`\`

### shot_plan 示例

\`\`\`text
rhythm_template: F_aesthetic_mood_sparse_face
face_budget: 0
duration_sec: 14.94
Shot1 @ 0.0     雨窗+远人影 | slow drift | lip_sync_face: no
Shot2 @ 1.6     空走廊长推 | no
Shot3 @ 3.56    床灯光锥空镜 | no
Shot4 @ 7.0     窗外金色玻璃叠影 | no | 可挂 <d> 金句
Shot5 @ 10.58   剪影站窗前 | slow push | no
Shot6 @ 12.2    浮尘/金属微光 insert | no
Shot7 @ 13.84   手指慢 ECU 或渐远城市 | no
\`\`\`

若 \`face_budget: 1\`，仅在 Shot5 或末段加一次 \`front\`/\`three_quarter\` 短唱脸，其余仍 no。

### detailed_description 摘录

\`\`\`text
[Shot 1] Rain-streaked glass at night (non-white)... from <Picture 1> appearance only...
The camera slowly drifts; <Subject 1> is a distant silhouette. No lip-sync.
[Shot 4] At 00:07.000, golden city lights smear through wet glass...
<d>[Chinese] 窗外的金色都特别的美，</d>  # 环境镜挂词，无对口型
[Shot 5] At 00:10.580, silhouette at the window, slow push, no lip-sync...
\`\`\`

---

## 十、自检清单

### ASR

- [ ] \`(start,end) text\` 逐行解析？segments/shot_plan 齐全？  
- [ ] At 可追溯？未用假短网格？  
- [ ] 用户要求未进 \`<d>\`？

### 解析器

- [ ] style/elements 完整？环境意象优先？  
- [ ] Shot1 非白？lyric_motifs_used？

### 节奏模板 F

- [ ] face_budget 为 0–2，且**未**按 B/C/说唱密度回脸？  
- [ ] 无 whip/crash/高速表演切？  
- [ ] 单镜偏长（约 3–6s）？空镜/剪影/远景够多？  

### 唱歌脸

- [ ] 若有唱脸：平视正侧；无仰俯对口型？  
- [ ] 多数镜明确 no lip-sync？

### Ref2VA

- [ ] 六段齐全？summary 写明 sparse lip-sync + atmospheric camera？人物外观一致？
`,O0=[{id:"k-pop",name:"快速",accent:"#E91E63"},{id:"style-mtky5xyw",name:"中速",accent:"#276749"},{id:"style-mtkyb3jb",name:"慢速",accent:"#276749"},{id:"style-mtkyhwvn",name:"氛围",accent:"#744210"}],Xu={styles:O0},ii=new Map,W0=new Map,da=new Set;function bc(){da.forEach(e=>e())}function V0(e){return ii.has(e)?ii.get(e):null}function fa(e,t){ii.set(e,t.replace(/\r\n/g,`
`).replace(/\s+$/u,"")),bc()}function H0(e){ii.delete(e)&&bc()}function K0(e,t){const n=String(t||"").trim();n&&(W0.set(e,n),bc())}function Q0(e){return da.add(e),()=>{da.delete(e)}}const q0=Op(()=>({getItem:()=>null,setItem:()=>{},removeItem:()=>{}})),Cr=Mr()(Pr((e,t)=>({customStyles:[],suppressedStyleIds:[],addCustomStyle:n=>{const r=t().customStyles.some(o=>o.id===n.id),s=t().suppressedStyleIds.filter(o=>o!==n.id);if(r){e({customStyles:t().customStyles.map(o=>o.id===n.id?{...o,...n}:o),suppressedStyleIds:s});return}e({customStyles:[...t().customStyles,n],suppressedStyleIds:s})},updateCustomStylePrompt:(n,r)=>{e({customStyles:t().customStyles.map(s=>s.id===n?{...s,promptDocument:r}:s)})},renameCustomStyle:(n,r)=>{const s=String(r||"").trim();s&&e({customStyles:t().customStyles.map(o=>o.id===n?{...o,name:s}:o)})},removeCustomStyle:n=>{e({customStyles:t().customStyles.filter(r=>r.id!==n)})},suppressStyle:n=>{const r=new Set(t().suppressedStyleIds);r.add(n),e({customStyles:t().customStyles.filter(s=>s.id!==n),suppressedStyleIds:Array.from(r)})},upsertFromManifest:n=>{const r=new Set(t().suppressedStyleIds),s=new Map(t().customStyles.map(o=>[o.id,o]));for(const o of n)r.has(o.id)||s.has(o.id)||s.set(o.id,o);e({customStyles:Array.from(s.values())})}}),{name:"rh-style-catalog-v1",storage:q0})),li=["#E91E63","#1A365D","#276749","#744210","#9B2C2C","#6B46C1","#2B6CB0","#C05621"],G0=Object.assign({"./style-prompts/k-pop.md":z0,"./style-prompts/style-mtjprth4.md":L0,"./style-prompts/style-mtky5xyw.md":F0,"./style-prompts/style-mtkyb3jb.md":U0,"./style-prompts/style-mtkyhwvn.md":B0});function X0(e){return String(e||"").replace(/\r\n/g,`
`).trimEnd()}function Y0(e){const t=`./style-prompts/${e}.md`,n=G0[t];return n?X0(n):""}function kc(){return(Array.isArray(Xu.styles)?Xu.styles:[]).map((t,n)=>({id:t.id,name:t.name,accent:t.accent||li[n%li.length],promptDocument:Y0(t.id),builtin:!0}))}function $r(){return kc()}function ar(e){if(!e)return null;const t=$r().find(r=>r.id===e);if(!t)return null;const n=V0(e);return n==null?t:{...t,promptDocument:n}}function Er(){var e;return((e=$r()[0])==null?void 0:e.id)||null}function Sc(e){return $r().some(t=>t.id===e)}function ts(e){return kc().some(t=>t.id===e)}function Z0(e){return e&&Sc(e)?e:Er()}function J0(e){const n=e.trim().toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]+/g,"");return n&&/^[a-z0-9-]+$/.test(n)?n:`style-${Date.now().toString(36)}`}function ex(e){return li[e%li.length]}kc();function bt(){var e;try{const t=(e=window.require)==null?void 0:e.call(window,"electron");return(t==null?void 0:t.ipcRenderer)||null}catch{return null}}const Qr=["#1A365D","#2C5282","#276749","#744210","#9B2C2C","#6B46C1","#2B6CB0","#C05621"];async function tx(e){const t=bt();if(!t)throw new Error("请使用 Electron 启动本软件以导出模板包");return await t.invoke("template-pack-export",e)}async function nx(e){const t=bt();if(!t)throw new Error("请使用 Electron 启动本软件");return await t.invoke("template-pack-seal",e)}async function Yu(e){const t=bt();if(!t)throw new Error("请使用 Electron 启动本软件");return await t.invoke("template-pack-unseal",e)}function rx(){try{const e=window.require,t=e==null?void 0:e("electron");return(t==null?void 0:t.ipcRenderer)||null}catch{return null}}function om(){try{const e=window.require;return e?{fs:e("fs"),path:e("path")}:null}catch{return null}}let sl=null;async function sx(){return sl||(sl=(async()=>{const e=rx();if(!e)return null;try{const t=await e.invoke("media-cache-dir");return t!=null&&t.success&&t.path?String(t.path):null}catch{return null}})()),sl}function Zu(e){return String(e||"file").replace(/[<>:"/\\|?*\u0000-\u001f]/g,"_").replace(/\s+/g,"_").slice(0,80)||"file"}function po(e){var t;return e!=null&&e.cachePath?{name:e.name,cachePath:e.cachePath,mime:((t=e.file)==null?void 0:t.type)||void 0}:null}async function ox(e,t,n){const r=om(),s=await sx();if(!r||!s)return n;const{fs:o,path:l}=r,c=l.join(s,Zu(e));if(o.mkdirSync(c,{recursive:!0}),n.cachePath&&o.existsSync(n.cachePath))try{if(o.statSync(n.cachePath).size>0)return n}catch{}const a=`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,u=l.join(c,`${t}-${a}-${Zu(n.name)}`),f=Buffer.from(await n.file.arrayBuffer());o.writeFileSync(u,f);try{for(const d of o.readdirSync(c)){if(!d.startsWith(`${t}-`))continue;const p=l.join(c,d);p!==u&&o.unlinkSync(p)}}catch{}return{...n,cachePath:u}}function ix(e){if(!(e!=null&&e.cachePath))return null;const t=om();if(!t)return null;const{fs:n}=t;if(!n.existsSync(e.cachePath))return null;try{const r=n.readFileSync(e.cachePath),s=e.mime||lx(e.name),o=new File([r],e.name||"file",{type:s});return{name:e.name||"file",file:o,previewUrl:URL.createObjectURL(o),cachePath:e.cachePath}}catch{return null}}function lx(e){const t=e.toLowerCase();return t.endsWith(".png")?"image/png":t.endsWith(".jpg")||t.endsWith(".jpeg")?"image/jpeg":t.endsWith(".webp")?"image/webp":t.endsWith(".gif")?"image/gif":t.endsWith(".mp3")?"audio/mpeg":t.endsWith(".wav")?"audio/wav":t.endsWith(".m4a")?"audio/mp4":t.endsWith(".flac")?"audio/flac":"application/octet-stream"}function ax(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.cachePath=="string"&&t.cachePath.length>0}function zs(e){return e==="overseas"?"overseas":"cn"}function cx(e){return CLHH_SERVICE.apiKey}const tt={image1:{nodeId:"",fieldName:"image"},image2:{nodeId:"",fieldName:"image"},audio:{nodeId:"",fieldName:"audio"},text:{nodeId:"",fieldName:"text"},document:{nodeId:"",fieldName:"text"},float:{nodeId:"",fieldName:"value"},integer:{nodeId:"",fieldName:"value"}};function ux(e){const t=e.match(/===/g);return t?t.length:0}function gt(e){return{image1:{...tt.image1,...e==null?void 0:e.image1},image2:{...tt.image2,...e==null?void 0:e.image2},audio:{...tt.audio,...e==null?void 0:e.audio},text:{...tt.text,...e==null?void 0:e.text},document:{...tt.document,...e==null?void 0:e.document},float:{...tt.float,...e==null?void 0:e.float},integer:{...tt.integer,...e==null?void 0:e.integer}}}function jc(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(100,Math.max(1,Math.floor(t))):2}function im(e){if(e==null||e==="")return 0;const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(999,Math.max(0,Math.floor(t))):0}function lm(e){if(e==null||e==="")return 60;const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(500,Math.max(10,Math.floor(t))):60}function dx(e,t){const n=lm(t??60);if(e==null||e==="")return Math.min(20,n);const r=typeof e=="number"?e:Number(e);return Number.isFinite(r)?Math.min(n,Math.max(1,Math.floor(r))):Math.min(20,n)}let Nc=1,ol=!1;function Qe(e){return`工作台 ${e}`}function il(e,t){const n=String(e||"").trim();return n?n.replace(/^工作流输入台/,"工作台"):Qe(t)}function mo(e){[e.image1,e.image2,e.audio,e.audioSource].forEach(t=>{var n;(n=t==null?void 0:t.previewUrl)!=null&&n.startsWith("blob:")&&URL.revokeObjectURL(t.previewUrl)})}function ll(e,t){const n=Nc++;return{id:`panel-${Date.now()}-${n}`,title:e||Qe(n),templateId:t??Er(),image1:null,image2:null,audio:null,audioSource:null,audioTrim:null,audioBatchId:null,audioSegmentIndex:null,text:"",documentText:"",documentFileName:"",speedMode:"fast",floatValue:"0.5",orientation:1,isRunning:!1,isQueued:!1,queuePosition:0,statusText:"待命",lastTaskId:"",lastResults:[],resultUnread:!1}}function $n(e){if(!e)return null;const t=sm(e.file,e.name);return{name:e.name,file:t,previewUrl:e.previewUrl.startsWith("data:")?e.previewUrl:URL.createObjectURL(t)}}function ho(e,t){return e!=null&&e.file&&e.file.size>0?e:ax(t)?ix(t):e??null}const am=["image1","image2","audio","audioSource"];async function qr(e,t,n){for(const r of n){const s=e().panels.find(l=>l.id===r);if(!s)continue;const o={};for(const l of am){const c=s[l];if(!(!c||c.file.size<=0))try{const a=await ox(r,l,c);a.cachePath&&a.cachePath!==c.cachePath&&(o[l]=a)}catch{}}Object.keys(o).length&&t(l=>({panels:l.panels.map(c=>c.id===r?{...c,...o}:c)}))}}function al(e,t){const n=Nc++;return{id:`panel-${Date.now()}-${n}`,title:t,templateId:e.templateId||null,image1:$n(e.image1),image2:$n(e.image2),audio:$n(e.audio),audioSource:null,audioTrim:e.audioTrim?{...e.audioTrim}:null,audioBatchId:e.audioBatchId||null,audioSegmentIndex:e.audioSegmentIndex??null,text:e.text,documentText:e.documentText,documentFileName:e.documentFileName,speedMode:e.speedMode||"fast",floatValue:e.floatValue,orientation:e.orientation===0?0:1,isRunning:!1,isQueued:!1,queuePosition:0,statusText:"待命",lastTaskId:"",lastResults:[],resultUnread:!1}}function go(e,t){const n=e.kind==="workflow"||e.kind==="ai-app"?e.kind:e.webappId?"ai-app":"workflow",r=String(e.webappId||(n==="ai-app"?e.workflowId:"")||""),s=String(e.workflowId||(n==="workflow"?e.webappId:"")||"");return{kind:n,webappId:r,workflowId:s,bindings:gt(e.bindings),accessPassword:t}}function Ju(){return{kind:"ai-app",webappId:"",workflowId:"",bindings:tt,accessPassword:""}}const ee=Mr()(Pr((e,t)=>({...CLHH_SERVICE,workflowId:"",webappId:"",kind:"ai-app",accessPassword:"",resultFolder:"",maxConcurrentTasks:2,skipStartFrames:0,textSegmentMaxChars:60,textSegmentMinChars:20,bindings:tt,panels:[ll(Qe(1))],templates:[],activeTemplateId:null,templatesReady:!1,secretCache:{},setSettings:n=>e(r=>({...n,...CLHH_SERVICE,bindings:n.bindings?gt(n.bindings):r.bindings})),setBindings:n=>e(r=>({bindings:gt({...r.bindings,...n})})),addPanel:()=>{const n=t().panels.length+1,r=ll(Qe(n),Er());return e(s=>({panels:[...s.panels,r]})),r.id},copyPanel:n=>{const r=t().panels.find(l=>l.id===n);if(!r)return null;const s=t().panels.length+1,o=al(r,Qe(s));return e(l=>{const c=l.panels.findIndex(u=>u.id===n);if(c<0)return{panels:[...l.panels,o]};const a=[...l.panels];return a.splice(c+1,0,o),{panels:a}}),queueMicrotask(()=>{qr(t,e,[o.id])}),o.id},distributePanelText:(n,r,s=Xp)=>{const o=T0(r,s);return t().panels.find(c=>c.id===n)?o.length<=1?(e(c=>({panels:c.panels.map(a=>a.id===n?{...a,text:o[0]||""}:a)})),1):(e(c=>{const a=c.panels.findIndex(p=>p.id===n);if(a<0)return c;const u=c.panels[a],f=o.map((p,y)=>y===0?{...u,text:p}:{...al(u,Qe(a+y+1)),text:p}),d=[...c.panels];return d.splice(a,1,...f),{panels:d.map((p,y)=>y===0?{...p,title:Qe(1)}:p.title.startsWith("工作台")?{...p,title:Qe(y+1)}:p)}}),o.length):0},applyAudioSegments:(n,r)=>{const{source:s,segments:o}=r;if(!o.length)return[];const l=t(),c=l.panels.findIndex(k=>k.id===n);if(c<0)return[];const a=l.panels[c];if(a.isRunning||a.isQueued)return[];const u=k=>{[k.audio,k.audioSource].forEach(h=>{var m;(m=h==null?void 0:h.previewUrl)!=null&&m.startsWith("blob:")&&URL.revokeObjectURL(h.previewUrl)})},f=a.audioBatchId;f&&e(k=>{const h=[];for(const m of k.panels){if(m.id===n){h.push(m);continue}if(m.audioBatchId===f&&!m.isRunning&&!m.isQueued){mo(m);continue}h.push(m)}return{panels:h.map((m,x)=>x===0?{...m,title:Qe(1)}:m.title.startsWith("工作台")?{...m,title:Qe(x+1)}:m)}});const d=t().panels.findIndex(k=>k.id===n);if(d<0)return[];const p=t().panels[d];if(o.length===1){const k=o[0];u(p);const h=$n(s);return e(m=>({panels:m.panels.map(x=>x.id===n?{...x,audio:k.slot,audioSource:h,audioTrim:{...k.trim},audioBatchId:null,audioSegmentIndex:null,statusText:x.statusText.startsWith("完成")||x.statusText.startsWith("失败")||x.statusText.includes("取消")?"待命":x.statusText}:x)})),queueMicrotask(()=>{qr(t,e,[n])}),[n]}const y=`audio-batch-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,g=$n(s),v=[];return e(k=>{const h=k.panels.findIndex(E=>E.id===n);if(h<0)return k;const m=k.panels[h];u(m);const x=o.map((E,j)=>{if(j===0)return v.push(m.id),{...m,audio:E.slot,audioSource:g,audioTrim:{...E.trim},audioBatchId:y,audioSegmentIndex:E.index,isRunning:!1,isQueued:!1,queuePosition:0,statusText:"待命",lastTaskId:"",lastResults:[],resultUnread:!1};const N=al({...m,audio:null},Qe(h+j+1));return v.push(N.id),{...N,audio:E.slot,audioSource:null,audioTrim:{...E.trim},audioBatchId:y,audioSegmentIndex:E.index}}),b=[...k.panels];return b.splice(h,1,...x),{panels:b.map((E,j)=>j===0?{...E,title:Qe(1)}:E.title.startsWith("工作台")?{...E,title:Qe(j+1)}:E)}}),queueMicrotask(()=>{qr(t,e,v)}),v},syncBatchParamsFrom:n=>{const r=t().panels.find(l=>l.id===n);if(!(r!=null&&r.audioBatchId))return 0;const s=r.audioBatchId;let o=0;return e(l=>({panels:l.panels.map(c=>c.id===n||c.audioBatchId!==s||c.isRunning||c.isQueued?c:([c.image1,c.image2].forEach(a=>{var u;(u=a==null?void 0:a.previewUrl)!=null&&u.startsWith("blob:")&&URL.revokeObjectURL(a.previewUrl)}),o+=1,{...c,image1:$n(r.image1),image2:$n(r.image2),templateId:r.templateId,text:r.text,documentText:r.documentText,documentFileName:r.documentFileName,speedMode:r.speedMode,floatValue:r.floatValue,orientation:r.orientation===0?0:1}))})),queueMicrotask(()=>{const l=t().panels.filter(c=>c.audioBatchId===s).map(c=>c.id);qr(t,e,l)}),o},removePanel:n=>e(r=>{var o;if(r.panels.length<=1||((o=r.panels[0])==null?void 0:o.id)===n)return r;const s=r.panels.find(l=>l.id===n);return s&&mo(s),{panels:r.panels.filter(l=>l.id!==n)}}),resetPanel:n=>e(r=>{const s=r.panels.findIndex(c=>c.id===n);if(s<0)return r;const o=r.panels[s];if(o.isRunning)return r;mo(o);const l=[...r.panels];return l[s]={id:o.id,title:s===0?Qe(1):o.title,templateId:o.templateId||t().activeTemplateId||null,image1:null,image2:null,audio:null,audioSource:null,audioTrim:null,audioBatchId:null,audioSegmentIndex:null,text:"",documentText:"",documentFileName:"",speedMode:"fast",floatValue:"0.5",orientation:1,isRunning:!1,isQueued:!1,queuePosition:0,statusText:"待命",lastTaskId:"",lastResults:[],resultUnread:!1},{panels:l}}),resetPanels:n=>e(r=>{var a;if(r.panels.length<=1)return r;const s=new Set(n&&n.length?n:[]),o=(a=r.panels[0])==null?void 0:a.id;o&&s.add(o);const l=r.panels.filter((u,f)=>s.has(u.id)||f===0||u.isRunning);if(l.length===r.panels.length)return r;const c=new Set(l.map(u=>u.id));return r.panels.forEach(u=>{c.has(u.id)||mo(u)}),{panels:l.map((u,f)=>f===0?{...u,title:Qe(1)}:u)}}),updatePanel:(n,r)=>{e(o=>({panels:o.panels.map(l=>l.id===n?{...l,...r}:l)})),am.filter(o=>o in r).length&&queueMicrotask(()=>{qr(t,e,[n])})},hydrateTemplates:async()=>{if(!ol){ol=!0;try{const n=t(),r={...n.secretCache};for(const u of n.templates){if(r[u.localId])continue;const f=await Yu(u.sealed);f.success&&f.secret&&(r[u.localId]=f.secret)}let s=n.templates,o=n.activeTemplateId;const l=String(n.workflowId||"").trim();if(s.length===0&&l){const u=await nx({kind:"workflow",workflowId:l,bindings:gt(n.bindings)});if(u.success&&u.sealed){const f=`tpl-migrated-${Date.now()}`;s=[{localId:f,packId:f,name:"当前工作流",description:"由旧版设置自动转换",accent:"#1A365D",importedAt:new Date().toISOString(),sealed:u.sealed,accessPassword:n.accessPassword||""}],o=f,r[f]={kind:"workflow",workflowId:l,bindings:gt(n.bindings)}}}const c=s.find(u=>u.localId===o)||s[0]||null,a=c?r[c.localId]:null;e({templates:s,activeTemplateId:(c==null?void 0:c.localId)||null,secretCache:r,templatesReady:!0,panels:n.panels.map(u=>({...u,templateId:u.templateId===void 0?(c==null?void 0:c.localId)||null:u.templateId})),...a&&c?go(a,c.accessPassword):Ju()})}finally{ol=!1}}},installTemplate:({publicInfo:n,sealed:r,secret:s,accessPassword:o})=>{const l=t(),c=l.templates.find(p=>p.packId===n.packId),a=(c==null?void 0:c.localId)||`tpl-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,u={localId:a,packId:n.packId,name:n.name,description:n.description||"",accent:n.accent||"#1A365D",importedAt:new Date().toISOString(),sealed:r,accessPassword:o??(c==null?void 0:c.accessPassword)??""},f=c?l.templates.map(p=>p.localId===a?u:p):[...l.templates,u],d={...l.secretCache};return s&&(d[a]=s),e({templates:f,activeTemplateId:a,secretCache:d,...s?go(s,u.accessPassword):{}}),s||t().selectTemplate(a),a},selectTemplate:async n=>{const r=await t().ensureTemplateSecret(n),o=t().templates.find(l=>l.localId===n);return!o||!r?!1:(e({activeTemplateId:n,...go(r,o.accessPassword)}),!0)},ensureTemplateSecret:async n=>{const r=t(),s=r.secretCache[n];if(s)return s;const o=r.templates.find(c=>c.localId===n);if(!o)return null;const l=await Yu(o.sealed);return!l.success||!l.secret?null:(e({secretCache:{...t().secretCache,[n]:l.secret}}),l.secret)},removeTemplate:n=>{const r=t(),s=r.templates.filter(f=>f.localId!==n),o={...r.secretCache};delete o[n];const l=r.panels.map(f=>f.templateId===n?{...f,templateId:null}:f);if(!(r.activeTemplateId===n)){e({templates:s,secretCache:o,panels:l});return}const a=s[0]||null,u=a?o[a.localId]:null;e({templates:s,secretCache:o,panels:l,activeTemplateId:(a==null?void 0:a.localId)||null,...u&&a?go(u,a.accessPassword):Ju()}),a&&!u&&t().selectTemplate(a.localId)},setTemplateAccessPassword:(n,r)=>e(s=>({templates:s.templates.map(o=>o.localId===n?{...o,accessPassword:r}:o),accessPassword:s.activeTemplateId===n?r:s.accessPassword}))}),{name:"rh-simple-tool-settings",partialize:e=>({apiRegionDefaultCnV1:!0,resultFolder:e.resultFolder,maxConcurrentTasks:e.maxConcurrentTasks,skipStartFrames:e.skipStartFrames,textSegmentMaxChars:e.textSegmentMaxChars,textSegmentMinChars:e.textSegmentMinChars,templates:e.templates,activeTemplateId:e.activeTemplateId,workflowId:e.templates.length?"":e.workflowId,accessPassword:e.templates.length?"":e.accessPassword,bindings:e.templates.length?tt:e.bindings,panels:e.panels.map((t,n)=>({id:t.id,title:il(t.title,n+1),text:t.text,documentText:t.documentText,documentFileName:t.documentFileName,floatValue:t.floatValue,orientation:t.orientation===0?0:1,speedMode:t.speedMode||"fast",templateId:t.templateId||null,audioTrim:t.audioTrim,audioBatchId:t.audioBatchId,audioSegmentIndex:t.audioSegmentIndex,lastResults:t.lastResults||[],lastTaskId:t.lastTaskId||"",resultUnread:!!t.resultUnread,statusText:t.isRunning||t.isQueued?"刷新后任务已中断，请重新生成":t.statusText,image1:po(t.image1),image2:po(t.image2),audio:po(t.audio),audioSource:po(t.audioSource)}))}),merge:(e,t)=>{var c;const n=e||{},r=new Map(t.panels.map(a=>[a.id,a])),s=Array.isArray(n.panels)&&n.panels.length>0?n.panels.map((a,u)=>{const f=a.id||`panel-restored-${u+1}`,d=r.get(f)||t.panels[u],p=typeof a.statusText=="string"&&a.statusText.includes("刷新后任务已中断");return{...ll(il(a.title,u+1)),id:f,title:u===0?Qe(1):il(a.title,u+1),text:typeof a.text=="string"?a.text:"",documentText:typeof a.documentText=="string"?a.documentText:"",documentFileName:typeof a.documentFileName=="string"?a.documentFileName:"",floatValue:typeof a.floatValue=="string"?a.floatValue:"",orientation:a.orientation===0?0:1,speedMode:a.speedMode==="slow"||a.speedMode==="fast"?a.speedMode:"fast",templateId:Z0(a.templateId===null||a.templateId===""?null:typeof a.templateId=="string"?a.templateId:n.activeTemplateId||null),audioTrim:a.audioTrim&&typeof a.audioTrim.start=="number"&&typeof a.audioTrim.end=="number"?{start:a.audioTrim.start,end:a.audioTrim.end}:(d==null?void 0:d.audioTrim)??null,audioBatchId:typeof a.audioBatchId=="string"?a.audioBatchId:(d==null?void 0:d.audioBatchId)??null,audioSegmentIndex:typeof a.audioSegmentIndex=="number"?a.audioSegmentIndex:(d==null?void 0:d.audioSegmentIndex)??null,image1:ho(d==null?void 0:d.image1,a.image1),image2:ho(d==null?void 0:d.image2,a.image2),audio:ho(d==null?void 0:d.audio,a.audio),audioSource:ho(d==null?void 0:d.audioSource,a.audioSource),isRunning:!1,isQueued:!1,queuePosition:0,statusText:p?a.statusText:d!=null&&d.statusText&&d.statusText!=="待命"?d.statusText:typeof a.statusText=="string"?a.statusText:"待命",lastTaskId:typeof a.lastTaskId=="string"?a.lastTaskId:(d==null?void 0:d.lastTaskId)??"",lastResults:Array.isArray(a.lastResults)?a.lastResults:(d==null?void 0:d.lastResults)??[],resultUnread:!!(a.resultUnread??(d==null?void 0:d.resultUnread))}}):t.panels;Nc=s.length+1;const o=Array.isArray(n.templates)?n.templates.filter(a=>a&&a.localId&&a.sealed):[],l=n.apiRegionDefaultCnV1===!0;return{...t,...n,templates:o,activeTemplateId:n.activeTemplateId||((c=o[0])==null?void 0:c.localId)||null,templatesReady:!1,secretCache:{},bindings:gt(n.bindings),...CLHH_SERVICE,maxConcurrentTasks:jc(n.maxConcurrentTasks),skipStartFrames:im(n.skipStartFrames),textSegmentMaxChars:lm(n.textSegmentMaxChars),textSegmentMinChars:dx(n.textSegmentMinChars,n.textSegmentMaxChars),panels:s}}}));async function fx(e,t){if(!Sc(e))return{success:!1,error:"未知风格，无法保存"};const n=String(t||"").replace(/\r\n/g,`
`);ts(e)||(Cr.getState().updateCustomStylePrompt(e,n),fa(e,n));const r=bt();if(!r)return ts(e)?{success:!1,error:"请使用 Electron 开发模式启动，才能把内置风格提示词保存到项目文件"}:{success:!0};const s=await r.invoke("style-prompt-save",{styleId:e,content:n,allowCreate:!ts(e)});return s!=null&&s.success?(fa(e,n),{success:!0,path:s.path}):ts(e)?{success:!1,error:(s==null?void 0:s.error)||"保存失败"}:{success:!0}}async function px(e){const{id:t,name:n,accent:r,content:s=""}=e;if(!t||!n)return{success:!1,error:"风格名称不能为空"};const o=String(s||"").replace(/\r\n/g,`
`);Cr.getState().addCustomStyle({id:t,name:n,accent:r,promptDocument:o}),fa(t,o);const l=bt();if(!l)return{success:!0};const c=await l.invoke("style-prompt-create",{styleId:t,name:n,accent:r,content:o});return c!=null&&c.success?{success:!0,path:c.path}:{success:!0,error:c==null?void 0:c.error}}async function mx(e){const t=String(e||"").trim();if(!t)return{success:!1,error:"未指定风格"};if(!Sc(t))return{success:!1,error:"未知风格，无法删除"};if($r().length<=1)return{success:!1,error:"至少保留一个风格模板"};Cr.getState().suppressStyle(t),H0(t);const n=Er(),{panels:r,updatePanel:s}=ee.getState();for(const c of r)c.templateId===t&&s(c.id,{templateId:n});const o=bt();if(!o)return{success:!0};const l=await o.invoke("style-prompt-delete",{styleId:t});return l!=null&&l.success?{success:!0}:{success:!0,error:(l==null?void 0:l.error)||"已从列表移除，但项目文件删除可能未完成"}}async function hx(e,t){const n=String(e||"").trim(),r=String(t||"").trim();if(!n)return{success:!1,error:"未指定风格"};if(!r)return{success:!1,error:"风格名称不能为空"};const s=ar(n);if(!s)return{success:!1,error:"未知风格，无法改名"};const o=Cr.getState(),l=ts(n),c=o.customStyles.some(f=>f.id===n);l||(c?o.renameCustomStyle(n,r):o.addCustomStyle({id:n,name:r,accent:s.accent,promptDocument:s.promptDocument}));const a=bt();if(!a)return l?{success:!1,error:"请使用 Electron 开发模式启动，才能把风格名称写入项目清单"}:{success:!0};const u=await a.invoke("style-prompt-rename",{styleId:n,name:r});return u!=null&&u.success?(K0(n,r),{success:!0}):{success:!1,error:(u==null?void 0:u.error)||"风格名称未能写入项目清单"}}function ed({open:e,onClose:t,onAdded:n}){const[r,s]=S.useState(""),[o,l]=S.useState(""),[c,a]=S.useState(!1),[u,f]=S.useState("");if(!e)return null;const d=async()=>{const p=r.trim();if(!p){f("请输入风格名称");return}let y=J0(p);const g=$r();g.some(v=>v.id===y)&&(y=`${y}-${Date.now().toString(36)}`),a(!0),f("");try{const v=ex(g.length),k=await px({id:y,name:p,accent:v,content:o});if(k.error&&!k.success){f(k.error);return}n(y),s(""),l(""),t()}finally{a(!1)}};return i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",children:i.jsxs("div",{className:"morph-card w-full max-w-md p-5 shadow-xl",onMouseDown:p=>p.stopPropagation(),children:[i.jsxs("div",{className:"mb-4 flex items-center justify-between gap-2",children:[i.jsx("h3",{className:"text-sm font-semibold text-morph-accent-deep",children:"添加风格"}),i.jsx("button",{type:"button",onClick:t,className:"morph-btn-circle rounded-full p-1.5 text-morph-muted","aria-label":"关闭",children:i.jsx(Re,{className:"h-4 w-4"})})]}),i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{children:[i.jsx("label",{className:"mb-1.5 block text-xs font-semibold uppercase tracking-wide text-morph-muted",children:"风格名称"}),i.jsx("input",{value:r,onChange:p=>s(p.target.value),className:"morph-select w-full px-3 py-2 text-sm",placeholder:"例如：赛博朋克、复古胶片",autoFocus:!0})]}),i.jsxs("div",{children:[i.jsx("label",{className:"mb-1.5 block text-xs font-semibold uppercase tracking-wide text-morph-muted",children:"提示词文档（可选，稍后编辑）"}),i.jsx("textarea",{value:o,onChange:p=>l(p.target.value),className:"morph-textarea min-h-[120px] w-full px-3 py-2 text-sm leading-6",placeholder:"该风格对应的 309 节点提示词文档"})]}),u?i.jsx("p",{className:"text-xs text-red-600",children:u}):null]}),i.jsxs("div",{className:"mt-4 flex justify-end gap-2",children:[i.jsx("button",{type:"button",onClick:t,disabled:c,className:"morph-btn-circle px-4 py-2 text-sm text-morph-muted",children:"取消"}),i.jsxs("button",{type:"button",onClick:()=>void d(),disabled:c,className:"morph-btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white",children:[i.jsx(si,{className:"h-4 w-4"}),c?"添加中…":"添加"]})]})]})})}function td({open:e,styleId:t,currentName:n,onClose:r,onRenamed:s}){const[o,l]=S.useState(n),[c,a]=S.useState(!1),[u,f]=S.useState("");if(S.useEffect(()=>{e&&(l(n),f(""),a(!1))},[e,n,t]),!e)return null;const d=async()=>{const p=o.trim();if(!p){f("请输入风格名称");return}if(p===n.trim()){r();return}a(!0),f("");try{const y=await hx(t,p);if(!y.success){f(y.error||"改名失败");return}y.error&&f(y.error),s(),r()}finally{a(!1)}};return i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",children:i.jsxs("div",{className:"morph-card w-full max-w-md p-5 shadow-xl",onMouseDown:p=>p.stopPropagation(),children:[i.jsxs("div",{className:"mb-4 flex items-center justify-between gap-2",children:[i.jsx("h3",{className:"text-sm font-semibold text-morph-accent-deep",children:"修改风格名称"}),i.jsx("button",{type:"button",onClick:r,className:"morph-btn-circle rounded-full p-1.5 text-morph-muted","aria-label":"关闭",children:i.jsx(Re,{className:"h-4 w-4"})})]}),i.jsxs("div",{children:[i.jsx("label",{className:"mb-1.5 block text-xs font-semibold uppercase tracking-wide text-morph-muted",children:"风格名称"}),i.jsx("input",{value:o,onChange:p=>l(p.target.value),className:"morph-select w-full px-3 py-2 text-sm",placeholder:"输入新的风格名称",autoFocus:!0,onKeyDown:p=>{p.key==="Enter"&&(p.preventDefault(),d())}}),u?i.jsx("p",{className:"mt-2 text-xs text-red-600",children:u}):null]}),i.jsxs("div",{className:"mt-4 flex justify-end gap-2",children:[i.jsx("button",{type:"button",onClick:r,disabled:c,className:"morph-btn-circle px-4 py-2 text-sm text-morph-muted",children:"取消"}),i.jsxs("button",{type:"button",onClick:()=>void d(),disabled:c,className:"morph-btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white",children:[i.jsx(aa,{className:"h-4 w-4"}),c?"保存中…":"保存"]})]})]})})}function cm(e){return CLHH_SERVICE.baseUrl}async function Hs(e,t,n){const s=`${cm(n)}${e.startsWith("/")?e:"/"+e}`;return fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function gx(e){try{if(!e.apiKey)return{success:!1,connected:!1,error:"未配置 RunningHub API Key"};const t=await Hs("/uc/openapi/accountStatus",{apikey:e.apiKey,apiKey:e.apiKey},e);if(t.status!==200)return{success:!1,connected:!1,error:`请求失败 (HTTP ${t.status})`};const n=await t.json();return n.code===0?{success:!0,connected:!0,data:n.data||{},message:n.msg||"连接成功"}:{success:!1,connected:!1,error:n.msg||`API返回错误 (code: ${n.code||"未知"})`}}catch(t){return{success:!1,connected:!1,error:`请求失败: ${t instanceof Error?t.message:String(t)}`}}}function yx(e){const t=e.code;if(typeof t=="number"&&t!==0){const s=String(e.msg||e.message||"")||`创建任务失败 (code: ${t})`;return{success:!1,error:/password|密码|加密|accessPassword/i.test(s)||/password|密码|加密|accessPassword/i.test(JSON.stringify(e))?`${s}。请填写正确的访问密码`:s,raw:e}}const n=e.data||{},r=String(n.taskId||n.id||e.taskId||e.id||"");return r?{success:!0,data:{...n,taskId:r},raw:e}:{success:!1,error:String(e.msg||"")||"创建任务成功但未返回 taskId",raw:e}}function xx(e,t){return e.kind==="ai-app"||e.kind==="workflow"?e.kind:t.kind==="ai-app"||t.kind==="workflow"?t.kind:e.webappId||t.webappId?"ai-app":"workflow"}async function vx(e,t){var n;try{if(!t.apiKey)return{success:!1,error:"未配置 RunningHub API Key"};const r=xx(e,t),s=String(e.accessPassword||t.accessPassword||"").trim(),o={apiKey:t.apiKey,apikey:t.apiKey};(n=e.nodeInfoList)!=null&&n.length&&(o.nodeInfoList=e.nodeInfoList),s&&(o.accessPassword=s);let l="/task/openapi/create";if(r==="ai-app"){const f=String(e.webappId||t.webappId||e.workflowId||t.workflowId||"").trim();if(!f)return{success:!1,error:"请先配置 AI 应用 ID（webappId）"};o.webappId=f,l="/task/openapi/ai-app/run"}else{const f=String(e.workflowId||t.workflowId||"").trim();if(!f)return{success:!1,error:"请先配置 Workflow ID"};o.workflowId=f}const c=new Set(["apiKey","apikey","workflowId","webappId","nodeInfoList","baseUrl","accessPassword","kind"]);for(const[f,d]of Object.entries(e))c.has(f)||(o[f]=d);const a=await Hs(l,o,t);if(a.status!==200){const f=await a.text().catch(()=>"无响应内容");return{success:!1,error:`请求失败 (HTTP ${a.status}): ${f.substring(0,500)}`}}const u=await a.json();return yx(u)}catch(r){return{success:!1,error:`请求失败: ${r instanceof Error?r.message:String(r)}`}}}async function wx(e,t){try{if(!t.apiKey||!e)return{success:!1,error:"缺少 taskId 或 API Key"};const n=await Hs("/task/openapi/status",{apiKey:t.apiKey,apikey:t.apiKey,taskId:e},t);if(n.status!==200){const s=await n.text().catch(()=>"无响应内容");return{success:!1,error:`请求失败 (HTTP ${n.status}): ${s.substring(0,500)}`}}const r=await n.json();return{success:!0,data:r.data||r,raw:r}}catch(n){return{success:!1,error:`请求失败: ${n instanceof Error?n.message:String(n)}`}}}async function nd(e,t){try{if(!t.apiKey||!e)return{success:!1,error:"缺少 taskId 或 API Key"};const n=await Hs("/task/openapi/outputs",{apiKey:t.apiKey,apikey:t.apiKey,taskId:e},t);if(n.status!==200){const s=await n.text().catch(()=>"无响应内容");return{success:!1,error:`请求失败 (HTTP ${n.status}): ${s.substring(0,500)}`}}const r=await n.json();return{success:!0,code:typeof r.code=="number"?r.code:void 0,msg:r.msg||r.message,data:r.data??[],raw:r}}catch(n){return{success:!1,error:`请求失败: ${n instanceof Error?n.message:String(n)}`}}}async function bx(e,t){try{if(!t.apiKey||!e)return{success:!1,error:"缺少 taskId 或 API Key"};const n=await Hs("/task/openapi/cancel",{apiKey:t.apiKey,apikey:t.apiKey,taskId:e},t);if(n.status!==200){const o=await n.text().catch(()=>"无响应内容");return{success:!1,error:`取消失败 (HTTP ${n.status}): ${o.substring(0,500)}`}}const r=await n.json().catch(()=>({})),s=r.code;return typeof s=="number"&&s!==0?{success:!1,error:String(r.msg||r.message||"")||`取消失败 (code: ${s})`,raw:r}:{success:!0,data:r,raw:r}}catch(n){return{success:!1,error:`取消请求失败: ${n instanceof Error?n.message:String(n)}`}}}async function kx(e,t,n="input",r){var s,o,l,c,a;try{if(!r.apiKey)return{success:!1,error:"未配置 RunningHub API Key"};if(!t)return{success:!1,error:"缺少文件名"};if(!e||e instanceof Blob&&e.size===0)return{success:!1,error:"文件为空或无效"};const u=cm(r),f=new FormData;f.append("file",e,t),f.append("apiKey",r.apiKey),f.append("apikey",r.apiKey),f.append("fileType",n);const d=await fetch(`${u}/task/openapi/upload`,{method:"POST",body:f});if(d.status!==200){const g=await d.text().catch(()=>"无响应内容");return{success:!1,error:`上传失败 (HTTP ${d.status}): ${g.substring(0,500)}`}}const p=await d.json(),y=((s=p.data)==null?void 0:s.fileId)||((o=p.data)==null?void 0:o.fileName)||((l=p.data)==null?void 0:l.id)||p.fileId||p.fileName||p.id||((c=p.data)==null?void 0:c.file_id)||p.file_id;return{success:!0,data:{...p.data,...p,fileId:y,fileName:((a=p.data)==null?void 0:a.fileName)||p.fileName||y}}}catch(u){return{success:!1,error:`上传失败: ${u instanceof Error?u.message:String(u)}`}}}async function _c(){const e=bt();if(!e)return{packaged:!1,licensed:!1,machineCode:"",reason:"no-electron",error:"请使用桌面版运行以完成激活"};const t=await e.invoke("license-status");return{packaged:!!t.packaged,licensed:!!t.licensed,machineCode:String(t.machineCode||""),activatedAt:t.activatedAt,reason:t.reason,error:t.error,success:t.success}}async function Sx(e){const t=bt();if(!t)return{packaged:!1,licensed:!1,machineCode:"",success:!1,error:"请使用桌面版运行以完成激活"};const n=await t.invoke("license-activate",e);return n.success?{packaged:!!n.packaged,licensed:!!n.licensed,machineCode:String(n.machineCode||""),activatedAt:n.activatedAt,reason:n.reason,success:!0}:{packaged:!0,licensed:!1,machineCode:String(n.machineCode||""),success:!1,error:n.error||"激活失败"}}function um(e,t){return Math.max(0,t-e)}const To=new Set;function Ln(e){return ee.getState().panels.filter(t=>t.audioBatchId===e).sort((t,n)=>(t.audioSegmentIndex??0)-(n.audioSegmentIndex??0))}function _i(e){var t;return((t=e.find(n=>n.audioSource))==null?void 0:t.audioSource)??null}function jx(e){if(!e.audioBatchId||!e.audioTrim)return null;const t=Ln(e.audioBatchId);return t.length<=1?null:{markerStart:e.audioTrim.start,markerEnd:e.audioTrim.end,batchId:e.audioBatchId,segmentIndex:e.audioSegmentIndex??1,batchSize:t.length}}function Ks(){try{const e=window.require;return e?{fs:e("fs"),path:e("path"),os:e("os")}:null}catch{return null}}function Nx(e){return String(e||"").trim().replace(/\.[^.\\/]+$/i,"").replace(/[<>:"/\\|?*\u0000-\u001f]/g,"").replace(/\s+/g," ").trim().replace(/[.]+$/g,"")||"音频"}function rd(e=new Date){const t=n=>String(n).padStart(2,"0");return`${t(e.getMonth()+1)}${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}function _x(e){const t=/^audio-batch-(\d+)/.exec(e);if(t){const n=new Date(Number(t[1]));if(!Number.isNaN(n.getTime()))return rd(n)}return rd()}function Cx(e,t){return`${Nx(e)}_${_x(t)}`.replace(/[<>:"/\\|?*]/g,"_")}function Cc(e){var n;const t=(n=_i(Ln(e)))==null?void 0:n.name;return Cx(t,e)}function Ex(e,t,n){var a;const r=Ks(),s=(a=n??ee.getState().resultFolder)==null?void 0:a.trim();if(!r||!s||!e)return null;const o=Math.max(1,t||1),l=`seg_${String(o).padStart(2,"0")}.mp4`,c=Cc(e);return r.path.join(s,c,l)}function Ix(e,t,n){var c;const r=Ks(),s=(c=n??ee.getState().resultFolder)==null?void 0:c.trim();if(!r||!s||!e)return null;const o=Math.max(1,t||1),l=`seg_${String(o).padStart(2,"0")}.mp4`;return r.path.join(s,`_batch_${e}`,l)}function Rx(e){return/[\\/]seg_\d+\.mp4$/i.test(e)}function dm(e,t){var o,l;const n=Ks();if(!n)return null;const{fs:r}=n;if(e.audioBatchId){const c=Ex(e.audioBatchId,e.audioSegmentIndex??1,t);if(c&&r.existsSync(c))return c;const a=Ix(e.audioBatchId,e.audioSegmentIndex??1,t);if(a&&r.existsSync(a))return a}const s=String(((l=(o=e.lastResults)==null?void 0:o[0])==null?void 0:l.path)||"").trim();return s&&r.existsSync(s)&&Rx(s)?s:null}function Tx(e){return!!dm(e)}function pa(e){const t=Ln(e),n=t.length,r=!!_i(t),s=t.some(a=>a.isRunning||a.isQueued),o=[];let l=0;for(const a of t){const u=a.audioSegmentIndex??0;!!a.audioTrim&&um(a.audioTrim.start,a.audioTrim.end)>0&&Tx(a)?l+=1:o.push(u||l+o.length+1)}const c=n>1&&!s&&r&&l===n&&o.length===0;return{batchId:e,total:n,readyCount:l,ready:c,merging:To.has(e),missingIndexes:o,busy:s,hasMaster:r}}async function Mx(e){const t=Ks();if(!t)throw new Error("请使用 Electron 桌面版运行");const{fs:n,path:r,os:s}=t,o=r.join(s.tmpdir(),`morph-batch-${Date.now()}-${Math.random().toString(36).slice(2,8)}`);n.mkdirSync(o,{recursive:!0});const l=r.extname(e.name||"")||(e.file.type.includes("wav")?".wav":e.file.type.includes("m4a")?".m4a":".mp3"),c=r.join(o,`master${l}`);return n.writeFileSync(c,Buffer.from(await e.file.arrayBuffer())),{inputPath:c,stagingDir:o}}async function fm(e,t){var v;const n=!!(t!=null&&t.force);if(To.has(e))return{ok:!1,error:"该组正在合并中…",skipped:!0};const r=pa(e);if(!r.ready)return n?r.total<=1?{ok:!1,error:"当前不是多段同组，无需合并"}:r.hasMaster?r.busy?{ok:!1,error:"同组仍有工作台在生成或排队，请稍后再合并"}:r.missingIndexes.length>0?{ok:!1,error:`还有 ${r.missingIndexes.length} 段未生成成功（段 ${r.missingIndexes.join("、")}）。请先补跑失败的工作台，再合并。`}:{ok:!1,error:"同组尚未全部就绪，无法合并"}:{ok:!1,error:"找不到同组母带音频"}:{ok:!1,error:"尚未满足自动合并条件",skipped:!0};const s=bt(),o=Ks();if(!s||!o)return{ok:!1,error:"请使用 Electron 桌面版运行"};const{fs:l,path:c}=o,a=Ln(e),u=_i(a);if(!u)return{ok:!1,error:"找不到同组母带音频"};const d=(v=ee.getState().resultFolder)==null?void 0:v.trim();if(!d)return{ok:!1,error:"请先在设置中选择结果保存文件夹"};const p=a.map(k=>dm(k,d));if(p.some(k=>!k))return{ok:!1,error:`找不到段成片文件（段 ${a.map((h,m)=>p[m]?null:h.audioSegmentIndex??m+1).filter(h=>h!=null).join("、")}）。请先补跑对应工作台。`};To.add(e);const y=ee.getState().updatePanel;for(const k of a)y(k.id,{statusText:"批次合并中…"});let g="";try{const k=await Mx(u);g=k.stagingDir;const h=Cc(e);let m=`${h}.mp4`;l.mkdirSync(d,{recursive:!0});let x=2;for(;l.existsSync(c.join(d,m));)m=`${h}-${x}.mp4`,x+=1;const b=c.join(d,m),E=a.map((I,Q)=>({videoPath:String(p[Q]),markerStart:I.audioTrim.start,targetDuration:um(I.audioTrim.start,I.audioTrim.end),isLast:Q===a.length-1})),j=Math.min(...a.map(I=>I.audioTrim.start));let N;try{N=await s.invoke("merge-batch-timeline",{masterAudioPath:k.inputPath,masterAudioStart:j,segments:E,outputPath:b,skipStartFrames:0})}catch(I){const Q=I instanceof Error?I.message:String(I);throw/No handler/i.test(Q)?new Error("主进程未加载批次合并能力，请完全退出CLHH MV 创作 后重新运行 npm run electron:dev"):I}if(!(N!=null&&N.success)||!N.path)throw new Error((N==null?void 0:N.error)||"批次合并失败");const w=String(N.path);if(!l.existsSync(w))throw new Error(`批次合并失败：成片未写入磁盘（${w}）`);const _=[{filename:c.basename(w),path:w}];for(const I of a)y(I.id,{lastResults:_,statusText:`批次完成 · 已合并 ${a.length} 段`,resultUnread:!0});return{ok:!0,path:w}}catch(k){const h=k instanceof Error?k.message:String(k);for(const m of a)!m.isRunning&&!m.isQueued&&y(m.id,{statusText:`批次合并失败：${h}`});return{ok:!1,error:h}}finally{if(To.delete(e),g)try{l.rmSync(g,{recursive:!0,force:!0})}catch{}}}class Ls extends Error{constructor(t="已取消生成"){super(t),this.name="RunCancelledError"}}function pm(e){return e instanceof Ls||e instanceof Error&&e.name==="RunCancelledError"}const Fn=new Map;function Px(e){const t=Fn.get(e);t&&(t.abort.abort(),Fn.delete(e));const n=new AbortController;return Fn.set(e,{abort:n,taskId:"",config:null}),n.signal}function Ax(e){var t;return(t=Fn.get(e))==null?void 0:t.abort.signal}function $x(e,t,n){const r=Fn.get(e);r&&(r.taskId=t,r.config=n)}function Dx(e){Fn.delete(e)}async function zx(e){const t=Fn.get(e);if(!t)return{hadSession:!1,remoteCancelled:!1};t.abort.abort();const n=t.taskId,r=t.config;if(!n||!r)return{hadSession:!0,remoteCancelled:!1,taskId:n||void 0};const s=await bx(n,r);return{hadSession:!0,remoteCancelled:!!s.success,remoteError:s.success?void 0:s.error,taskId:n}}function Xe(e){if(e!=null&&e.aborted)throw new Ls}function Lx(e,t){return new Promise((n,r)=>{if(t!=null&&t.aborted){r(new Ls);return}const s=setTimeout(()=>{t==null||t.removeEventListener("abort",o),n()},e),o=()=>{clearTimeout(s),t==null||t.removeEventListener("abort",o),r(new Ls)};t==null||t.addEventListener("abort",o)})}function Fx(e){return e.includes("CANCEL")||e.includes("CANCELED")||e.includes("CANCELLED")||e.includes("ABORT")}function Ux(e){return String(e||"").trim().replace(/[<>:"/\\|?*\u0000-\u001f]/g,"").replace(/\s+/g,"").replace(/[.]+$/g,"")||"视频"}function Bx(e=new Date){const t=n=>String(n).padStart(2,"0");return`${t(e.getMonth()+1)}${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}function Ox(e){const t=typeof e=="number"&&Number.isFinite(e)?Math.floor(e)+1:1;return String(Math.max(1,t)).padStart(2,"0")}function Wx(e){if(!e)return"UNKNOWN";if(typeof e=="string")return e.toUpperCase();const t=e;return String(t.taskStatus||t.status||t.state||t.task_state||"").toUpperCase()||"UNKNOWN"}function Lt(e){var s,o;if(!e||typeof e!="object")return null;const t=e,n=t.failedReason||((s=t.data)==null?void 0:s.failedReason);if(n&&typeof n=="object"){const l=String(n.node_name||n.nodeName||n.node||""),c=String(n.exception_message||n.exceptionMessage||n.message||n.error||"");if(l||c)return[l&&`节点 ${l}`,c].filter(Boolean).join("：")}const r=t.errorMessage||t.errorMsg||t.error||t.msg||t.message||((o=t.data)==null?void 0:o.error);return typeof r=="string"&&r.trim()?r.trim():null}function Vx(e){return["FAILED","ERROR","CANCELLED","CANCELED","TIMEOUT","FAIL","FAILURE"].includes(e)||e.includes("FAIL")||e.includes("ERROR")}function Hx(e){return["SUCCESS","COMPLETED","FINISHED","DONE","COMPLETE"].includes(e)}async function cl(e,t,n){const r=await kx(e.file,`${t}-${Date.now()}-${e.name}`,"input",n);if(!r.success||!r.data)throw new Error(r.error||`上传失败: ${e.name}`);const s=r.data.fileName||r.data.fileId||r.data.url;if(!s)throw new Error(`上传响应中未包含文件名: ${e.name}`);return String(s)}function Kx(){var e;try{const t=(e=window.require)==null?void 0:e.call(window,"electron");return(t==null?void 0:t.ipcRenderer)||null}catch{return null}}function Qx(){try{const e=window.require;return e?{fs:e("fs"),path:e("path"),os:e("os")}:null}catch{return null}}async function qx(e,t){const n=Kx(),r=Qx();if(!n||!r)throw new Error("当前环境无法转码音频，请使用桌面版软件运行");t==null||t({stage:"转码音频",detail:"兼容手机录音等特殊格式…"});const{fs:s,path:o,os:l}=r,c=o.join(l.tmpdir(),`morph-audio-in-${Date.now()}-${Math.random().toString(36).slice(2,8)}`);s.mkdirSync(c,{recursive:!0});const a=o.extname(e.name||"")||"",u=e.file.type==="audio/mpeg"||e.file.type==="audio/mp3"?".mp3":e.file.type==="audio/wav"||e.file.type==="audio/x-wav"?".wav":e.file.type==="audio/mp4"||e.file.type==="audio/m4a"?".m4a":"",f=a||u||".audio",d=o.join(c,`source${f}`);let p="";try{const y=Buffer.from(await e.file.arrayBuffer());s.writeFileSync(d,y);const g=await n.invoke("prepare-audio-for-upload",{inputPath:d,originalName:e.name});if(!(g!=null&&g.success)||!g.path)throw new Error((g==null?void 0:g.error)||"音频转码失败");p=String(g.tmpDir||o.dirname(g.path));const v=s.readFileSync(g.path),k=o.basename(g.path),m=k.toLowerCase().endsWith(".wav")?"audio/wav":"audio/mpeg",x=new File([v],k,{type:m});return t==null||t({stage:"转码音频",detail:typeof g.channels=="number"?`已转为标准音频（${g.channels} 声道）`:"已转为标准音频"}),{name:k,file:x,previewUrl:e.previewUrl}}finally{try{s.rmSync(c,{recursive:!0,force:!0})}catch{}if(p)try{await n.invoke("cleanup-temp-path",p)}catch{try{s.rmSync(p,{recursive:!0,force:!0})}catch{}}}}function _n(e,t,n,r,s=!0){var c,a;const o=((c=t==null?void 0:t.nodeId)==null?void 0:c.trim())||"",l=((a=t==null?void 0:t.fieldName)==null?void 0:a.trim())||"";if(!o||!l){if(s)throw new Error(`请先在设置中配置「${r}」对应的节点 ID 与字段名`);return}e.push({nodeId:o,fieldName:l,fieldValue:n})}async function Gx(e){try{return await mm(e)}catch(t){const n=await fetch(e,{method:"GET",redirect:"follow",headers:{Referer:"https://www.runninghub.cn/",Origin:"https://www.runninghub.cn","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!n.ok){const s=t instanceof Error?t.message:String(t);throw new Error(`下载失败: ${n.status}${n.status===403?"（CDN 拒绝访问，可能是防盗链）。Node 下载："+s:""}`)}const r=await n.arrayBuffer();return new Uint8Array(r)}}function mm(e,t=5){return new Promise((n,r)=>{const s=window.require;if(!s){r(new Error("当前环境无法使用 Node 下载"));return}const o=s("https"),l=s("http"),{URL:c}=s("url");let a;try{a=new c(e)}catch{r(new Error(`无效下载地址: ${e}`));return}(a.protocol==="https:"?o:l).get(e,{headers:{Referer:"https://www.runninghub.cn/",Origin:"https://www.runninghub.cn","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"*/*"}},d=>{const p=d.statusCode||0,y=d.headers.location;if(p>=300&&p<400&&y){if(t<=0){r(new Error("下载失败：重定向次数过多"));return}const v=y.startsWith("http")?y:`${a.protocol}//${a.host}${y}`;mm(v,t-1).then(n,r);return}if(p!==200){r(new Error(`下载失败: ${p}`)),d.resume();return}const g=[];d.on("data",v=>{g.push(v)}),d.on("end",()=>{n(new Uint8Array(Buffer.concat(g)))}),d.on("error",r)}).on("error",r)})}function ul(e){let t=e;if(!Array.isArray(t)&&typeof t=="object"&&t){const n=t;if(n.failedReason)return[];t=n.files||n.output||n.results||n.data||[],Array.isArray(t)||(t=[t])}return Array.isArray(t)?t.filter(Boolean):[]}async function Xx(e,t,n,r){const l=Math.ceil(1200);let c=0;for(;c<l;){Xe(r),await Lx(3e3,r),c++,Xe(r);const a=await nd(e,t);if(Xe(r),a.success){const f=a.code,d=a.raw,p=a.data;if(f===0){const y=ul(p);if(y.length>0)return y;n==null||n({stage:"执行中",detail:`已完成但暂无文件（${c}/${l}）`})}else if(f===805){const y=Lt(p)||Lt(d)||a.msg||"工作流执行失败";throw new Error(y)}else if(f===804)n==null||n({stage:"执行中",detail:`云端运行中（${c}/${l}）`});else if(f===813)n==null||n({stage:"排队中",detail:`等待调度（${c}/${l}）`});else if(typeof f=="number"){const y=Lt(p)||Lt(d);if(y)throw new Error(y);n==null||n({stage:"执行中",detail:`code=${f}（${c}/${l}）`})}else{const y=Lt(p)||Lt(d);if(y)throw new Error(y);const g=ul(p);if(g.length>0)return g}}else n==null||n({stage:"查询结果",detail:`outputs 查询失败，改用 status（${c}/${l}）`});const u=await wx(e,t);if(Xe(r),u.success){const f=u.data||u.raw,d=Wx(f),p=Lt(f);if(Fx(d))throw new Ls("云端任务已取消");if(Vx(d)||p)throw new Error(p||`任务执行失败，状态: ${d}`);if(Hx(d)){const y=await nd(e,t);if(y.code===805)throw new Error(Lt(y.data)||Lt(y.raw)||y.msg||"工作流执行失败");const g=ul(y.data);if(g.length>0)return g}n==null||n({stage:"执行中",detail:`状态 ${d}（${c}/${l}）`})}}throw new Error("任务执行超时：已等待超过 60 分钟，云端仍未返回成功或失败结果")}async function Yx(e){var te,L,se,T,D,Y,M,C,A,q;const{config:t,bindings:n,inputs:r,resultFolder:s,onProgress:o,signal:l,panelId:c}=e,a=e.timelineMerge??null,u=im(e.skipStartFrames),f=await _c();if(Xe(l),!f.licensed)throw new Error("未激活：请先使用本机激活码激活后再生成");if(!t.apiKey)throw new Error("请先配置 RunningHub API Key");const d=t.kind!=="workflow";if(d&&!String(t.webappId||t.workflowId||"").trim())throw new Error("请先配置 AI 应用模板");if(!d&&!t.workflowId)throw new Error("请先配置 Workflow ID");if(!s.trim())throw new Error("请先在设置中选择结果保存文件夹");const p=[];if(r.image1){Xe(l),o==null||o({stage:"上传图片1",detail:r.image1.name});const $=await cl(r.image1,"image1",t);_n(p,n.image1,$,"图片1")}if(r.image2){Xe(l),o==null||o({stage:"上传图片2",detail:r.image2.name});const $=await cl(r.image2,"image2",t);_n(p,n.image2,$,"图片2")}if(r.audio){Xe(l),o==null||o({stage:"处理音频",detail:r.audio.name});const $=await qx(r.audio,o);Xe(l),o==null||o({stage:"上传音频",detail:$.name});const W=await cl($,"audio",t);_n(p,n.audio,W,"音频")}const y=I0(r.text);y&&(o==null||o({stage:"写入文本输入"}),_n(p,n.text,y,"文本"));const g=r.documentText??"";g.trim()&&(o==null||o({stage:"写入 MD 指令文档"}),_n(p,n.document,g,"MD 文档"));const v=(te=r.floatValue)==null?void 0:te.trim();if(v!==void 0&&v!==""){const $=Number(v);if(Number.isNaN($))throw new Error("浮点输入不是有效数字");o==null||o({stage:"写入浮点输入",detail:String($)}),_n(p,n.float,String($),"浮点")}const k=typeof r.integerValue=="number"?r.integerValue:ux(r.text||"")+1;if((se=(L=n.integer)==null?void 0:L.nodeId)!=null&&se.trim()&&((D=(T=n.integer)==null?void 0:T.fieldName)!=null&&D.trim())&&(o==null||o({stage:"写入整数输入",detail:String(k)}),_n(p,n.integer,String(k),"整数",!1)),p.length===0)throw new Error("请至少提供一个输入（图片 / 音频 / 文本 / 浮点）");Xe(l),o==null||o({stage:"创建任务"});const h=await vx({kind:t.kind,webappId:t.webappId,workflowId:t.workflowId,nodeInfoList:p,accessPassword:t.accessPassword},t);if(Xe(l),!h.success)throw new Error(h.error||(d?"AI 应用执行失败":"工作流执行失败"));if(!((Y=h.data)!=null&&Y.taskId))throw new Error(d?"AI 应用执行失败":"工作流执行失败");const m=String(h.data.taskId);c&&$x(c,m,t),(M=e.onTaskId)==null||M.call(e,m),o==null||o({stage:"等待任务完成",detail:`Task ID: ${m}`});const x=await Xx(m,t,o,l);if(Xe(l),x.length===0)throw new Error("工作流没有返回可下载的结果");const b=(t.baseUrl||"https://www.runninghub.cn").replace(/\/$/,""),E=[];for(let $=0;$<x.length;$++){Xe(l);const W=x[$];let H=String(W.url||W.fileUrl||W.imageUrl||W.path||W.file||"");const G=String(W.filename||W.fileName||W.name||`result_${$+1}`);if(!H)continue;H.startsWith("http")||(H=H.startsWith("/")?`${b}${H}`:`${b}/${H}`);const ue=nv(G,H,W,$);o==null||o({stage:"下载结果",detail:ue});const he=await Gx(H);E.push({filename:ue,data:Array.from(he),url:H})}if(E.length===0)throw new Error("未能从输出中解析出可下载文件");const j=window.require;if(!j)throw new Error("请使用 Electron 启动本软件以保存合并结果");const N=j("path"),w=j("fs"),_=j("os"),I=Bx(),Q=Ux(e.styleName),X=Ox(e.panelIndex);let re=`${X}_${Q}_${I}.mp4`;const O=N.join(_.tmpdir(),`rh-merge-${Date.now()}`);try{w.mkdirSync(O,{recursive:!0}),w.mkdirSync(s,{recursive:!0});let $=2;for(;w.existsSync(N.join(s,re));)re=`${X}_${Q}_${I}-${$}.mp4`,$+=1;o==null||o({stage:"准备合并",detail:"写入临时分段…"});const W=[];for(const ne of E){const z=N.join(O,ne.filename);w.writeFileSync(z,Buffer.from(ne.data)),W.push(z)}const H=W.length>=2?W.slice(0,-1):W;o==null||o({stage:"合并视频",detail:u<=0?W.length>=2?`合并 ${H.length} 段`:"保存为结果":W.length>=2?`去掉每段前 ${u} 帧后合并 ${H.length} 段`:`去掉前 ${u} 帧后保存为结果`});const G="_merged_temp.mp4",ue=N.join(s,re);let he="";const B=j("electron");try{const ne=await((C=B.ipcRenderer)==null?void 0:C.invoke("merge-videos",{folderPath:O,inputPaths:H,outputName:G,skipStartFrames:u}));if(!(ne!=null&&ne.success)||!ne.path)throw new Error((ne==null?void 0:ne.error)||"视频合并失败");he=String(ne.path)}catch(ne){const z=ne instanceof Error?ne.message:String(ne);if(/未激活/.test(z))throw ne;o==null||o({stage:"合并视频",detail:z.includes("No handler")?"主进程未更新，改用本地 ffmpeg…":"IPC 合并失败，改用本地 ffmpeg…"}),he=await tv({folderPath:O,inputPaths:H,outputName:G,skipStartFrames:u})}if(!he||!w.existsSync(he))throw new Error("视频合并失败：未生成合并文件");if(a){if(Xe(l),!r.audio)throw new Error("批次分段缺少音频，无法保存可核对成片");const ne=Cc(a.batchId),z=N.join(s,ne);w.mkdirSync(z,{recursive:!0});const le=`seg_${String(a.segmentIndex).padStart(2,"0")}.mp4`,Te=N.join(z,le);o==null||o({stage:"保存分段成片",detail:`段 ${a.segmentIndex}/${a.batchSize}（含本段音频）`});const Ve=N.extname(r.audio.name||"")||(r.audio.file.type.includes("wav")?".wav":r.audio.file.type.includes("mp4")||r.audio.file.type.includes("m4a")?".m4a":".mp3"),kt=N.join(O,`upload_audio${Ve}`);w.writeFileSync(kt,Buffer.from(await r.audio.file.arrayBuffer()));let pt="";try{const P=await((A=B.ipcRenderer)==null?void 0:A.invoke("replace-video-audio",{videoPath:he,audioPath:kt,outputPath:Te}));if(!(P!=null&&P.success)||!P.path)throw new Error((P==null?void 0:P.error)||"分段音视频融合失败");pt=String(P.path)}catch(P){const ce=P instanceof Error?P.message:String(P);if(/未激活/.test(ce))throw P;o==null||o({stage:"保存分段成片",detail:ce.includes("No handler")?"主进程未更新，改用本地 ffmpeg…":"IPC 融合失败，改用本地 ffmpeg…"}),pt=await od({videoPath:he,audioPath:kt,outputPath:Te})}if(!pt||!w.existsSync(pt))throw new Error("分段成片保存失败：未生成输出文件");return{taskId:m,saved:[{filename:sd(pt),path:pt}]}}let V=he;if(r.audio){Xe(l),o==null||o({stage:"替换音轨",detail:"去掉合并视频原音，叠加上传音频…"});const ne=N.extname(r.audio.name||"")||(r.audio.file.type.includes("wav")?".wav":r.audio.file.type.includes("mp4")||r.audio.file.type.includes("m4a")?".m4a":".mp3"),z=N.join(O,`upload_audio${ne}`);w.writeFileSync(z,Buffer.from(await r.audio.file.arrayBuffer()));try{const le=await((q=B.ipcRenderer)==null?void 0:q.invoke("replace-video-audio",{videoPath:he,audioPath:z,outputPath:ue}));if(!(le!=null&&le.success)||!le.path)throw new Error((le==null?void 0:le.error)||"音视频融合失败");V=String(le.path)}catch(le){const Te=le instanceof Error?le.message:String(le);if(/未激活/.test(Te))throw le;o==null||o({stage:"替换音轨",detail:Te.includes("No handler")?"主进程未更新，改用本地 ffmpeg…":"IPC 融合失败，改用本地 ffmpeg…"}),V=await od({videoPath:he,audioPath:z,outputPath:ue})}if(!V||!w.existsSync(V))throw new Error("音视频融合失败：未生成最终视频")}else w.copyFileSync(he,ue),V=ue;return{taskId:m,saved:[{filename:sd(V),path:V}]}}finally{try{w.rmSync(O,{recursive:!0,force:!0})}catch{}}}function sd(e){return e.split(/[/\\]/).pop()||e}async function Zx(e,t,n,r){const s=await ev(e,t),o=(r/s).toFixed(6),l=["-c:v","libx264","-preset","veryfast","-crf","18","-movflags","+faststart",n];try{await dn(e,["-y","-i",t,"-vf",`trim=start_frame=${r},setpts=PTS-STARTPTS`,"-af",`atrim=start=${o},asetpts=PTS-STARTPTS`,"-c:a","aac",...l])}catch{await dn(e,["-y","-i",t,"-vf",`trim=start_frame=${r},setpts=PTS-STARTPTS`,"-an",...l])}}function hm(e,t){const n=window.require;if(!n)throw new Error("当前环境无法调用本地 ffmpeg");const{spawn:r}=n("child_process");return new Promise((s,o)=>{var u;const l=r(e,t,{windowsHide:!0});let c="",a="";(u=l.stdout)==null||u.on("data",f=>{a+=f.toString()}),l.stderr.on("data",f=>{c+=f.toString()}),l.on("error",f=>o(f)),l.on("close",f=>{s({code:f??1,stderr:c,stdout:a})})})}function Jx(e){const t=e.match(/(\d+)\s*\/\s*(\d+)\s*fps/);if(t&&Number(t[2])){const s=Number(t[1])/Number(t[2]);if(s>0&&s<240)return s}const n=e.match(/,\s*([\d.]+)\s*fps/);if(n){const s=Number(n[1]);if(s>0&&s<240)return s}const r=e.match(/([\d.]+)\s*tbr/);if(r){const s=Number(r[1]);if(s>0&&s<240)return s}return 24}async function ev(e,t){const n=await hm(e,["-hide_banner","-i",t]);return Jx(`${n.stderr}
${n.stdout}`)}async function dn(e,t){const n=await hm(e,t);if(n.code!==0)throw new Error(n.stderr||`ffmpeg 退出码 ${n.code}`)}async function tv(e){const t=window.require;if(!t)throw new Error("当前环境无法调用本地 ffmpeg，请使用 Electron 启动本软件");const n=t("path"),r=t("fs"),s=t("os"),o=process.platform==="win32"?"ffmpeg.exe":"ffmpeg",l=process,a=[l.resourcesPath?n.join(l.resourcesPath,"ffmpeg",o):"",n.join(process.cwd(),"resources","ffmpeg",o)].filter(Boolean).find(k=>r.existsSync(k))||o,{folderPath:u,inputPaths:f,outputName:d,skipStartFrames:p}=e;r.existsSync(u)||r.mkdirSync(u,{recursive:!0});const y=d.replace(/[<>:"/\\|?*]/g,"_"),g=n.join(u,y.toLowerCase().endsWith(".mp4")?y:`${y}.mp4`),v=n.join(s.tmpdir(),`rh-trim-${Date.now()}`);r.mkdirSync(v,{recursive:!0});try{const k=[];for(let x=0;x<f.length;x++){if(p<=0){k.push(f[x]);continue}const b=n.join(v,`trim_${x}.mp4`);await Zx(a,f[x],b,p),k.push(b)}if(k.length===1)return r.copyFileSync(k[0],g),g;const h=n.join(v,"_concat.txt"),m=k.map(x=>`file '${String(x).replace(/\\/g,"/").replace(/'/g,"'\\''")}'`).join(`
`);r.writeFileSync(h,m,"utf8");try{await dn(a,["-y","-f","concat","-safe","0","-i",h,"-c","copy",g])}catch{await dn(a,["-y","-f","concat","-safe","0","-i",h,"-c:v","libx264","-c:a","aac","-movflags","+faststart",g])}return g}finally{try{r.rmSync(v,{recursive:!0,force:!0})}catch{}}}async function od(e){const t=window.require;if(!t)throw new Error("当前环境无法调用本地 ffmpeg，请使用 Electron 启动本软件");const n=t("path"),r=t("fs"),s=t("os"),o=process.platform==="win32"?"ffmpeg.exe":"ffmpeg",l=process,a=[l.resourcesPath?n.join(l.resourcesPath,"ffmpeg",o):"",n.join(process.cwd(),"resources","ffmpeg",o)].filter(Boolean).find(v=>r.existsSync(v))||o,{videoPath:u,audioPath:f,outputPath:d}=e,p=n.dirname(d);r.existsSync(p)||r.mkdirSync(p,{recursive:!0});const y=n.join(s.tmpdir(),`rh-replace-audio-${Date.now()}`);r.mkdirSync(y,{recursive:!0});const g=n.join(y,"silent.mp4");try{try{await dn(a,["-y","-i",u,"-an","-c:v","copy",g])}catch{await dn(a,["-y","-i",u,"-an","-c:v","libx264","-preset","veryfast","-crf","18","-movflags","+faststart",g])}try{await dn(a,["-y","-i",g,"-i",f,"-map","0:v:0","-map","1:a:0","-c:v","copy","-c:a","aac","-b:a","192k","-shortest","-movflags","+faststart",d])}catch{await dn(a,["-y","-i",g,"-i",f,"-map","0:v:0","-map","1:a:0","-c:v","libx264","-preset","veryfast","-crf","18","-c:a","aac","-b:a","192k","-shortest","-movflags","+faststart",d])}if(!r.existsSync(d))throw new Error("音视频融合失败：未生成输出文件");return d}finally{try{r.rmSync(y,{recursive:!0,force:!0})}catch{}}}function nv(e,t,n,r){var f,d;let s=(e||`result_${r+1}`).trim();if(s=s.replace(/[<>:"/\\|?*]/g,"_"),/\.[a-z0-9]{1,8}$/i.test(s))return s;const c=(d=(f=t.split("?")[0].split("#")[0].match(/\.([a-z0-9]{1,8})$/i))==null?void 0:f[1])==null?void 0:d.toLowerCase(),a=String(n.type||n.fileType||n.mimeType||"").toLowerCase();let u=c||"";return u||(a.includes("mp4")||a.includes("video")?u="mp4":a.includes("webm")?u="webm":a.includes("mov")?u="mov":a.includes("png")||a.includes("image/png")?u="png":a.includes("jpg")||a.includes("jpeg")?u="jpg":a.includes("wav")?u="wav":a.includes("mp3")||a.includes("audio")?u="mp3":u="mp4"),`${s}.${u}`}function gm(e){const t=e instanceof Error?e.message:String(e);return/TASK_QUEUE_MAXED/i.test(t)||/队列.*满|排队.*满|并发.*上限/i.test(t)}class rv{constructor(){Qs(this,"queue",[]);Qs(this,"active",new Set);Qs(this,"pumping",!1)}getMaxConcurrent(){return jc(ee.getState().maxConcurrentTasks)}getQueuedPanelIds(){return this.queue.map(t=>t.panelId)}getActiveCount(){return this.active.size}getQueuePosition(t){const n=this.queue.findIndex(r=>r.panelId===t);return n>=0?n+1:0}isQueued(t){return this.queue.some(n=>n.panelId===t)}isActive(t){return this.active.has(t)}notifyConcurrencyChanged(){this.pump()}enqueue(t,n){this.active.has(t)||this.queue.some(r=>r.panelId===t)||(this.queue.push({panelId:t,execute:n}),this.refreshQueueStatuses(),this.pump())}cancel(t){const n=this.queue.length;this.queue=this.queue.filter(r=>r.panelId!==t),this.queue.length!==n&&(ee.getState().updatePanel(t,{isQueued:!1,isRunning:!1,statusText:"已取消排队",queuePosition:0}),this.refreshQueueStatuses())}async cancelRunning(t){if(this.cancel(t),!this.active.has(t))return;ee.getState().updatePanel(t,{isRunning:!0,isQueued:!1,statusText:"正在取消…"});const n=await zx(t);n.hadSession&&n.taskId&&!n.remoteCancelled&&n.remoteError&&ee.getState().updatePanel(t,{statusText:`正在取消 · 云端取消失败：${n.remoteError.slice(0,80)}`})}dropQueuedExcept(t){const n=this.queue.length;this.queue=this.queue.filter(r=>t.has(r.panelId)),this.queue.length!==n&&this.refreshQueueStatuses()}refreshQueueStatuses(){const{updatePanel:t}=ee.getState();this.queue.forEach((n,r)=>{t(n.panelId,{isQueued:!0,isRunning:!1,queuePosition:r+1,statusText:`排队中 · 第 ${r+1} 位（前方 ${r} 个任务）`})})}async pump(){if(!this.pumping){this.pumping=!0;try{for(;this.active.size<this.getMaxConcurrent()&&this.queue.length>0;){const t=this.queue.shift();if(!t)break;this.active.add(t.panelId),this.refreshQueueStatuses(),ee.getState().updatePanel(t.panelId,{isQueued:!1,isRunning:!0,queuePosition:0,statusText:"准备执行…"}),this.runJob(t)}}finally{this.pumping=!1}}}async runJob(t){Px(t.panelId);try{await t.execute()}catch(n){if(pm(n))ee.getState().updatePanel(t.panelId,{isRunning:!1,isQueued:!1,queuePosition:0,statusText:"已取消"});else if(gm(n))ee.getState().updatePanel(t.panelId,{isQueued:!0,isRunning:!1,statusText:"云端队列已满，稍后自动重试…"}),await new Promise(r=>setTimeout(r,4e3)),this.queue.unshift(t),this.refreshQueueStatuses();else{const r=n instanceof Error?n.message:String(n),s=ee.getState().panels.find(o=>o.id===t.panelId);s!=null&&s.isRunning&&ee.getState().updatePanel(t.panelId,{isRunning:!1,isQueued:!1,queuePosition:0,statusText:`失败 · ${r.slice(0,180)}`})}}finally{Dx(t.panelId),this.active.delete(t.panelId),this.pump()}}}const Be=new rv;async function ms(e){var t;try{const n=(t=window.require)==null?void 0:t.call(window,"electron");if(n!=null&&n.ipcRenderer)return!!await n.ipcRenderer.invoke("app-confirm",e)}catch{}return window.confirm(e)}const ns=Mr()(Pr(e=>({webappId:"",accessPassword:"",setDevAiApp:t=>e(n=>({webappId:t.webappId!==void 0?String(t.webappId):n.webappId,accessPassword:t.accessPassword!==void 0?String(t.accessPassword):n.accessPassword})),clearDevAiApp:()=>e({webappId:"",accessPassword:""})}),{name:"rh-dev-ai-app-v1"})),Ot={kind:"ai-app",webappId:"2094964129089015809",workflowId:"",accessPassword:__CLHH_APP_PASSWORD__,bindings:gt({...tt,image1:{nodeId:"40",fieldName:"image"},audio:{nodeId:"211",fieldName:"audio"},text:{nodeId:"311",fieldName:"value"},document:{nodeId:"309",fieldName:"value"},float:{nodeId:"315",fieldName:"value"},image2:{nodeId:"",fieldName:"image"},integer:{nodeId:"327",fieldName:"value"}})},ma="2095368777387409410";function id(e){return e==="slow"?{floatValue:"0.7",integerValue:1}:{floatValue:"0.2",integerValue:1}}function sv(e){return Qn(e)?kn.getState().uiMode==="developer":!1}function ym(e){const t=zs(ee.getState().apiRegion),n={...Ot,webappId:t==="overseas"?ma:Ot.webappId,bindings:gt(Ot.bindings)};if(!sv(e==null?void 0:e.packaged))return n;const r=ns.getState(),s=r.webappId.trim(),o=r.accessPassword.trim();return{...n,webappId:s||n.webappId,accessPassword:o||n.accessPassword}}function ov(e){const{document:t}=ym({packaged:e}).bindings;return!!(t.nodeId.trim()&&t.fieldName.trim())}let hs=null,Ec=[];function Ic(){hs&&hs(Ec[0]??null)}function iv(e){return hs=e,Ic(),()=>{hs===e&&(hs=null)}}function xm(e){return new Promise(t=>{Ec.push({...e,resolve:t}),Ic()})}function lv(e){const t=Ec.shift();t==null||t.resolve(e),Ic()}function yo(e){lv(e)}function Rn(e,t){return xm({kind:"confirm",title:(t==null?void 0:t.title)||"请确认",message:e,confirmText:(t==null?void 0:t.confirmText)||"确定",cancelText:(t==null?void 0:t.cancelText)||"取消"})}function Tn(e,t){return xm({kind:"alert",title:(t==null?void 0:t.title)||"提示",message:e,confirmText:(t==null?void 0:t.confirmText)||"知道了"}).then(()=>{})}const rs=.2,Mo=1;function dl(e){const t=Number.parseFloat(String(e??""));if(!Number.isFinite(t))return .5;const n=Math.min(Mo,Math.max(rs,t));return Math.round(n*10)/10}function vm({panelId:e,index:t,canRemove:n,licensed:r,packaged:s=null,onNeedActivation:o,variant:l="default",groupBatchId:c=null}){const a=ee(P=>P.panels.find(ce=>ce.id===e)),u=ee(P=>P.updatePanel),f=ee(P=>P.removePanel),d=ee(P=>P.resetPanel),p=ee(P=>P.copyPanel),y=ee(P=>P.resultFolder),[g,v]=S.useState(""),[k,h]=S.useState(!1),[m,x]=S.useState(0),[b,E]=S.useState(0),[j,N]=S.useState(!1),[w,_]=S.useState(!1),I=kn(P=>P.uiMode),Q=Cr(P=>P.customStyles),X=Cr(P=>P.suppressedStyleIds);if(S.useEffect(()=>Q0(()=>{x(P=>P+1)}),[]),S.useEffect(()=>{const P=ar(a==null?void 0:a.templateId);v((P==null?void 0:P.promptDocument)||"")},[a==null?void 0:a.templateId,m]),S.useEffect(()=>{N(!1),_(!1)},[e]),S.useEffect(()=>{E(P=>P+1)},[Q,X]),!a)return null;const re=$r(),O=ar(a.templateId),te=gy({packaged:s,uiMode:I}),L=ov(s),se=a.speedMode==="slow"?"slow":"fast",T=g.replace(/\r\n/g,`
`)!==((O==null?void 0:O.promptDocument)||"").replace(/\r\n/g,`
`),D=a.isRunning||a.isQueued,Y=!!(te?g:(O==null?void 0:O.promptDocument)||"").trim(),M=!!a.image1,C=!!a.audio,A=!L||Y,q=!D&&A&&M&&C&&!!O,$=!!c&&l==="morph",W=$?Ln(String(c)):[],H=P=>{if(P.isRunning||P.isQueued)return{ok:!1,reason:`工作台「${P.title}」正在生成或排队`};const ce=ar(P.templateId);return ce?P.image1?P.audio?L&&!String(ce.promptDocument||"").trim()?{ok:!1,reason:`工作台「${P.title}」风格缺少提示词文档`}:{ok:!0}:{ok:!1,reason:`工作台「${P.title}」未上传音频`}:{ok:!1,reason:`工作台「${P.title}」未上传图片`}:{ok:!1,reason:`工作台「${P.title}」未选择风格`}},G=$?W.map(H).find(P=>!P.ok):null,ue=$&&W.length>1&&!G&&W.every(P=>H(P).ok),he=async()=>{if(!(!a.templateId||!O)&&T){h(!0);try{const P=await fx(a.templateId,g);if(!P.success){alert(P.error||"保存失败");return}}finally{h(!1)}}},B=!!(te&&O),V=B&&re.length>1,ne=async()=>{if(!O||!V)return;const P=O.name,ce=O.id;if(!(l==="morph"?await Rn(`确定删除风格「${P}」吗？删除后不可从软件内恢复。`,{title:"删除风格",confirmText:"删除",cancelText:"取消"}):await ms(`确定删除风格「${P}」吗？删除后不可从软件内恢复。`)))return;const R=await mx(ce);E(F=>F+1),R.error&&(l==="morph"?await Tn(R.error):alert(R.error))},z=P=>u(e,P),le=P=>{Be.enqueue(P,async()=>{var pe,R,F,K;const ce=J=>u(P,J);ce({isQueued:!1,isRunning:!0,statusText:"准备执行…"});try{const J=ee.getState().panels.find(Tt=>Tt.id===P);if(!J)return;const de=ee.getState(),ze=ar(J.templateId);if(!ze)throw new Error("请先在本工作台选择一个风格模板");const _e=ym({packaged:s});if(!_e.webappId&&!_e.workflowId)throw new Error("工作流尚未配置，请开发者先在内置工作流配置中填写 AI 应用 ID");const Le=te?id(J.speedMode):l==="morph"?{floatValue:String(dl(J.floatValue)),integerValue:J.orientation===1?1:0}:id("slow"),Jt=te&&P===e?g:ze.promptDocument,qn=jx(J),Sm=Math.max(0,ee.getState().panels.findIndex(Tt=>Tt.id===P)),Ci=await Yx({config:{baseUrl:de.baseUrl||"https://www.runninghub.cn",apiKey:cx(de),kind:_e.kind,webappId:_e.webappId,workflowId:_e.workflowId,accessPassword:_e.accessPassword},bindings:_e.bindings,inputs:{image1:J.image1,image2:null,audio:J.audio,text:J.text,documentText:Jt,floatValue:Le.floatValue,integerValue:Le.integerValue},resultFolder:de.resultFolder,skipStartFrames:de.skipStartFrames,styleName:ze.name,panelIndex:Sm,audioBaseName:(J.audioBatchId?(pe=_i(Ln(J.audioBatchId)))==null?void 0:pe.name:null)||((R=J.audioSource)==null?void 0:R.name)||((F=J.audio)==null?void 0:F.name)||ze.name,panelId:P,timelineMerge:qn,signal:Ax(P),onTaskId:Tt=>{ce({lastTaskId:Tt})},onProgress:Tt=>{ce({isRunning:!0,isQueued:!1,statusText:Tt.detail?`${Tt.stage} · ${Tt.detail}`:Tt.stage})}}),Dr=J.audioBatchId,Tc=Dr?Ln(Dr):[],jm=J.audioSegmentIndex??1;ce({lastTaskId:Ci.taskId,lastResults:Ci.saved,isRunning:!1,isQueued:!1,queuePosition:0,resultUnread:!0,statusText:Dr&&Tc.length>1?`段 ${jm}/${Tc.length} 已保存（含音频）· 等待批次合并…`:`完成 · 已保存 ${Ci.saved.length} 个文件`}),Dr&&fm(Dr)}catch(J){if(pm(J)){ce({isRunning:!1,isQueued:!1,queuePosition:0,statusText:"已取消"});return}if(gm(J))throw J;const de=J instanceof Error?J.message:String(J),ze=de.length>180?`${de.slice(0,180)}…`:de,_e=((K=ee.getState().panels.find(Le=>Le.id===P))==null?void 0:K.title)||"工作台";ce({isRunning:!1,isQueued:!1,queuePosition:0,statusText:`失败 · ${ze}`}),alert(`【${_e}】生成失败

${de}`)}})},Te=()=>{if($){if(!r){o();return}if(!ue){const P=(G==null?void 0:G.reason)||(W.length<=1?"当前不是有效分组":"请先补齐同组各工作台的图片、音频与风格");l==="morph"?Tn(P,{title:"生成整组"}):alert(P);return}for(const P of W)le(P.id);return}if(!D){if(!O){alert("请先选择一个风格模板");return}if(!a.image1){alert("请先上传图片后再开始生成");return}if(!a.audio){alert("请先上传音频后再开始生成");return}if(L&&!O.promptDocument.trim()){alert("当前风格缺少提示词文档，请联系开发者配置");return}if(!r){o();return}le(e)}},Ve=()=>{Be.cancel(e)},kt=()=>{if(a.isQueued){Be.cancel(e);return}a.isRunning&&(z({statusText:"正在取消…"}),Be.cancelRunning(e))},pt=async()=>{var pe,R;const P=(pe=a.lastResults.find(F=>F.path))==null?void 0:pe.path;let ce=y.trim();if(P)try{const F=window.require,K=F==null?void 0:F("path");K!=null&&K.dirname?ce=K.dirname(P):ce=P.replace(/[/\\][^/\\]+$/,"")||ce}catch{ce=P.replace(/[/\\][^/\\]+$/,"")||ce}if(!ce){alert("尚未设置结果文件夹");return}try{const F=(R=window.require)==null?void 0:R.call(window,"electron");if(!(F!=null&&F.ipcRenderer)){alert(`结果文件夹：${ce}`);return}const K=await F.ipcRenderer.invoke("open-folder",ce);K!=null&&K.success||alert((K==null?void 0:K.error)||"打开文件夹失败")}catch(F){const K=F instanceof Error?F.message:String(F);alert(K)}};if(l==="morph"){const P=dl(a.floatValue),ce=(P-rs)/(Mo-rs);return i.jsxs("div",{"data-panel-id":e,className:"flex h-full min-h-0 flex-col overflow-hidden p-5 morph-card",children:[i.jsxs("div",{className:te?"min-h-0 flex-1 space-y-4 overflow-x-hidden overflow-y-auto pr-1":"flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto pr-1",children:[i.jsxs("div",{className:"shrink-0",children:[i.jsxs("div",{className:"clhh-resolution-heading mb-2 flex items-center justify-between gap-2",children:[i.jsx("div",{className:"text-xs font-semibold uppercase tracking-wide text-morph-muted",children:"风格"}),te?i.jsxs("div",{className:"flex flex-wrap items-center justify-end gap-1.5",children:[i.jsxs("button",{type:"button",disabled:D,onClick:()=>N(!0),className:"inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-morph-accent-deep morph-btn-circle disabled:opacity-50",children:[i.jsx(si,{className:"h-3.5 w-3.5"}),"添加风格"]}),B?i.jsxs("button",{type:"button",disabled:D,onClick:()=>_(!0),className:"inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-morph-accent-deep morph-btn-circle disabled:opacity-50",title:`修改「${(O==null?void 0:O.name)||""}」名称`,children:[i.jsx(aa,{className:"h-3.5 w-3.5"}),"改名"]}):null,V?i.jsxs("button",{type:"button",disabled:D,onClick:()=>void ne(),className:"inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-red-600 morph-btn-circle disabled:opacity-50",title:`删除风格「${(O==null?void 0:O.name)||""}」`,children:[i.jsx(ps,{className:"h-3.5 w-3.5"}),"删除风格"]}):null]}):null]}),i.jsxs("select",{value:a.templateId||"",disabled:D,onChange:pe=>z({templateId:pe.target.value||null}),className:"morph-select text-sm",children:[i.jsx("option",{value:"",children:"请选择风格"}),re.map(pe=>i.jsx("option",{value:pe.id,children:pe.name},pe.id))]})]}),i.jsxs("div",{className:te?"":"flex min-h-[200px] flex-1 flex-col",children:[i.jsx("div",{className:"mb-2 shrink-0 text-xs font-semibold uppercase tracking-wide text-morph-muted",children:"创意方向"}),i.jsx("textarea",{value:a.text,disabled:D,onChange:pe=>z({text:pe.target.value}),className:te?"morph-textarea min-h-[160px] w-full px-3 py-2.5 text-sm leading-6 disabled:opacity-60":"morph-textarea min-h-[200px] w-full flex-1 resize-none px-3 py-2.5 text-sm leading-6 disabled:opacity-60",placeholder:"可不填",onMouseDown:pe=>pe.stopPropagation(),onClick:pe=>pe.currentTarget.focus()})]}),te?i.jsxs("div",{children:[i.jsxs("div",{className:"clhh-resolution-heading mb-2 flex items-center justify-between gap-2",children:[i.jsx("div",{className:"text-xs font-semibold uppercase tracking-wide text-morph-muted",children:"提示词文档"}),i.jsxs("button",{type:"button",disabled:D||k||!T,onClick:()=>void he(),className:"inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-morph-accent-deep morph-btn-circle disabled:opacity-50",children:[i.jsx(As,{className:"h-3.5 w-3.5"}),k?"保存中…":"保存"]})]}),i.jsx("textarea",{value:g,disabled:D||k,onChange:pe=>v(pe.target.value),className:"morph-textarea max-h-40 min-h-[100px] w-full px-3 py-2 text-[11px] leading-5 disabled:opacity-60",placeholder:"编辑该风格的提示词文档",onMouseDown:pe=>pe.stopPropagation(),onClick:pe=>pe.currentTarget.focus()})]}):null,i.jsxs("div",{className:"shrink-0",children:[i.jsxs("div",{className:"clhh-resolution-heading mb-2 flex items-center justify-between gap-2",children:[i.jsx("div",{className:"text-xs font-semibold uppercase tracking-wide text-morph-muted",children:"画幅"}),i.jsxs("div",{className:"flex items-center gap-1.5",children:[i.jsx("button",{type:"button",disabled:D,onClick:()=>z({orientation:0}),className:a.orientation!==1?"morph-btn-circle flex h-8 w-8 items-center justify-center text-morph-accent-deep ring-1 ring-morph-accent/35":"morph-btn-circle flex h-8 w-8 items-center justify-center text-morph-muted disabled:opacity-50",title:"9:16","aria-label":"9:16","aria-pressed":a.orientation!==1,children:"9:16"}),i.jsx("button",{type:"button",disabled:D,onClick:()=>z({orientation:1}),className:a.orientation===1?"morph-btn-circle flex h-8 w-8 items-center justify-center text-morph-accent-deep ring-1 ring-morph-accent/35":"morph-btn-circle flex h-8 w-8 items-center justify-center text-morph-muted disabled:opacity-50",title:"16:9","aria-label":"16:9","aria-pressed":a.orientation===1,children:"16:9"})]})]}),i.jsxs("div",{className:"relative overflow-x-clip pt-7",children:[i.jsx("div",{className:"pointer-events-none absolute top-0 z-[1] -translate-x-1/2",style:{left:`clamp(1.125rem, calc(${ce} * (100% - 16px) + 8px), calc(100% - 1.125rem))`},children:i.jsx("div",{className:"min-w-[2.25rem] rounded-full px-2.5 py-1 text-center text-[12px] font-semibold tabular-nums text-morph-accent-deep morph-btn-circle",children:P.toFixed(1)})}),i.jsx("input",{type:"range",min:rs,max:Mo,step:.1,value:P,disabled:D,onChange:pe=>z({floatValue:dl(pe.target.value).toFixed(1)}),className:"morph-range w-full"}),i.jsxs("div",{className:"mt-1 flex justify-between text-[10px] tabular-nums text-morph-muted",children:[i.jsx("span",{children:rs}),i.jsx("span",{children:Mo})]})]})]})]}),i.jsx("div",{className:"mt-4 shrink-0 pt-2",children:a.isRunning?i.jsxs("button",{type:"button",onClick:kt,className:"morph-btn-cancel flex w-full items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white",children:[i.jsx(Re,{className:"h-4 w-4"}),"取消生成"]}):a.isQueued?i.jsxs("button",{type:"button",onClick:Ve,className:"morph-btn-cancel flex w-full items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white",children:[i.jsx(el,{className:"h-4 w-4"}),"取消排队（第 ",a.queuePosition||"?"," 位）"]}):i.jsx("button",{type:"button",onClick:Te,disabled:$?!ue||!r:!q,title:r?$?ue?`将排队生成整组 ${W.length} 段`:(G==null?void 0:G.reason)||"请先补齐同组各工作台的图片、音频与风格":q?void 0:O?M?C?A?"请先完成必要输入":"当前风格缺少提示词文档":"请先上传音频后再开始生成":"请先上传图片后再开始生成":"请先选择一个风格模板":"未激活，无法生成",className:`morph-btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-55 ${($?ue:q)&&r?"is-ready":""}`,children:$?r?i.jsxs(i.Fragment,{children:[i.jsx(an,{className:"h-4 w-4 fill-current"}),"生成整组"]}):i.jsx(i.Fragment,{children:"未激活，无法生成"}):q?r?i.jsx(i.Fragment,{children:"生成"}):i.jsx(i.Fragment,{children:"未激活，无法生成"}):i.jsxs(i.Fragment,{children:[i.jsx(an,{className:"h-4 w-4 fill-current"}),O?M?C?A?"请先提供输入":"风格文档未配置":"请上传音频":"请上传图片":"请选择风格"]})})}),i.jsx(ed,{open:j,onClose:()=>N(!1),onAdded:pe=>z({templateId:pe})}),O?i.jsx(td,{open:w,styleId:O.id,currentName:O.name,onClose:()=>_(!1),onRenamed:()=>E(pe=>pe+1)}):null]})}return i.jsxs("div",{"data-panel-id":e,className:"flex h-full w-[min(920px,92vw)] shrink-0 flex-col",children:[i.jsxs("div",{className:"panel-cream flex min-h-0 flex-1 flex-col overflow-hidden",children:[i.jsxs("div",{className:"flex items-center justify-between border-b border-slate-300 bg-cream-soft px-4 py-3",children:[i.jsx("div",{className:"flex min-w-0 items-center",children:i.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-base font-black text-white",title:t===0?"工作台 1":a.title,children:t+1})}),i.jsxs("div",{className:"flex shrink-0 items-center gap-2",children:[a.isQueued?i.jsxs("div",{className:"inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800",children:[i.jsx(el,{className:"h-3.5 w-3.5"}),"排队第 ",a.queuePosition||"?"," 位"]}):null,i.jsx("button",{type:"button",onClick:()=>{p(e)||alert("复制失败：未找到源输入台")},className:"rounded-lg border border-slate-300 bg-white p-1.5 text-slate-600 hover:bg-blue-50 hover:text-navy",title:"复制此输入台（继承全部参数）",children:i.jsx(fc,{className:"h-4 w-4"})}),t===0?i.jsx("button",{type:"button",onClick:async()=>{if(a.isRunning){alert("该工作台正在生成中，请稍后再重置");return}await ms("第一个工作台不能删除，只能重置。将清空图片、文本、风格选择和结果，确定重置吗？")&&(Be.cancel(e),d(e))},className:"rounded-lg border border-slate-300 bg-white p-1.5 text-slate-600 hover:bg-amber-50 hover:text-navy",title:"重置此工作台（第一个工作台不可删除）",children:i.jsx(Ps,{className:"h-4 w-4"})}):n?i.jsx("button",{type:"button",onClick:async()=>{if(a.isRunning){alert("该输入台正在生成中，请稍后再删除");return}await ms(`确定删除「${a.title}」吗？`)&&(Be.cancel(e),f(e))},className:"rounded-lg border border-slate-300 bg-white p-1.5 text-slate-600 hover:bg-red-50 hover:text-red-700",title:"删除此输入台",children:i.jsx(ps,{className:"h-4 w-4"})}):null]})]}),i.jsxs("div",{className:te?"min-h-0 flex-1 space-y-4 overflow-y-auto p-4":"flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4",children:[i.jsxs("div",{className:te?"grid gap-3 md:grid-cols-2":"grid min-h-0 flex-1 grid-cols-2 gap-3",children:[i.jsx(D0,{label:"上传产品图",accept:"image/*",kind:"image",fill:!te,value:a.image1,onChange:P=>z({image1:P})}),i.jsxs("div",{className:te?"slot-box flex min-h-[180px] flex-col p-3":"slot-box flex h-full min-h-0 flex-col p-3",children:[i.jsx("div",{className:"mb-2 shrink-0 text-sm font-semibold text-navy",children:"核心卖点或创意方向（可不填）"}),i.jsx("textarea",{value:a.text,disabled:D,onChange:P=>z({text:P.target.value}),className:"rh-input min-h-0 w-full flex-1 resize-none rounded-xl border border-slate-400 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-navy disabled:opacity-60",placeholder:"在此输入文本内容",onMouseDown:P=>P.stopPropagation(),onClick:P=>P.currentTarget.focus()})]})]}),i.jsxs("div",{className:`slot-box p-3 ${te?"":"shrink-0"}`,children:[i.jsxs("div",{className:"mb-2.5 flex items-center justify-between gap-2",children:[i.jsx("div",{className:"text-sm font-semibold text-navy",children:"风格选择"}),i.jsxs("div",{className:"flex items-center gap-2",children:[te?i.jsxs(i.Fragment,{children:[i.jsxs("button",{type:"button",disabled:D,onClick:()=>N(!0),className:"inline-flex items-center gap-1 rounded-lg border border-slate-400 bg-white px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-cream-soft disabled:opacity-50",children:[i.jsx(si,{className:"h-3.5 w-3.5"}),"添加风格"]}),B?i.jsxs("button",{type:"button",disabled:D,onClick:()=>_(!0),className:"inline-flex items-center gap-1 rounded-lg border border-slate-400 bg-white px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-cream-soft disabled:opacity-50",title:`修改「${(O==null?void 0:O.name)||""}」名称`,children:[i.jsx(aa,{className:"h-3.5 w-3.5"}),"改名"]}):null,V?i.jsxs("button",{type:"button",disabled:D,onClick:()=>void ne(),className:"inline-flex items-center gap-1 rounded-lg border border-red-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50",title:`删除风格「${(O==null?void 0:O.name)||""}」`,children:[i.jsx(ps,{className:"h-3.5 w-3.5"}),"删除风格"]}):null]}):null,O?i.jsxs("span",{className:"inline-flex max-w-[60%] items-center gap-1 truncate rounded-full bg-navy/10 px-2.5 py-0.5 text-[11px] font-semibold text-navy",children:[i.jsx(Bu,{className:"h-3 w-3 shrink-0",strokeWidth:3}),O.name]}):i.jsx("span",{className:"text-[11px] text-amber-700",children:"请选择一个风格"})]})]}),i.jsx("div",{className:"grid grid-cols-4 gap-2",children:re.map(P=>{const ce=P.id===a.templateId;return i.jsxs("button",{type:"button",disabled:D,onClick:()=>z({templateId:P.id}),title:te&&P.description||P.name,"aria-pressed":ce,className:`flex w-full items-center justify-center gap-1.5 rounded-xl border-2 px-2 text-sm font-bold transition disabled:opacity-60 ${te?"h-10":"h-12"} ${ce?"border-gold bg-navy text-white shadow-[0_4px_14px_rgba(26,54,93,0.28)]":"border-slate-300/90 bg-white text-navy hover:border-navy/40 hover:bg-cream-soft"}`,children:[ce?i.jsx("span",{className:"flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-navy",children:i.jsx(Bu,{className:"h-3 w-3",strokeWidth:3})}):null,i.jsx("span",{className:"truncate",children:P.name})]},P.id)})}),te&&O?i.jsxs("div",{className:"mt-3 space-y-1.5",children:[i.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[i.jsxs("div",{className:"inline-flex items-center gap-1 text-[11px] font-semibold text-navy",children:[i.jsx(ia,{className:"h-3.5 w-3.5"}),"开发可见 · 提示词文档",T?i.jsx("span",{className:"rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800",children:"未保存"}):i.jsx("span",{className:"rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-800",children:"已同步"})]}),i.jsxs("button",{type:"button",disabled:D||k||!T,onClick:()=>void he(),className:"inline-flex items-center gap-1 rounded-lg border border-slate-400 bg-gold px-2.5 py-1 text-[11px] font-semibold text-navy hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50",title:"保存到 src/data/style-prompts，打包时会打进应用",children:[i.jsx(As,{className:"h-3.5 w-3.5"}),k?"保存中…":"保存提示词"]})]}),i.jsx("textarea",{value:g,disabled:D||k,onChange:P=>v(P.target.value),className:"rh-input max-h-56 min-h-[140px] w-full resize-y rounded-xl border border-slate-400 bg-white px-3 py-2 text-[11px] leading-5 text-slate-700 outline-none focus:border-navy disabled:opacity-60",placeholder:"在此编辑该风格的提示词文档，保存后写入项目文件",onMouseDown:P=>P.stopPropagation(),onClick:P=>P.currentTarget.focus()}),i.jsxs("div",{className:"text-[10px] text-slate-500",children:["保存路径：src/data/style-prompts/",O.id,".md · 生成时使用当前编辑内容；打包安装包会带上已保存版本"]})]}):null]}),te?i.jsxs("div",{className:"slot-box p-3",children:[i.jsx("div",{className:"mb-2 text-sm font-semibold text-navy",children:"生成模式"}),i.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[i.jsx("button",{type:"button",disabled:D,onClick:()=>z({speedMode:"fast"}),className:`rounded-xl border-2 px-3 py-3 text-sm font-bold transition disabled:opacity-60 ${se==="fast"?"border-navy bg-navy text-white shadow-sm":"border-slate-300 bg-white text-navy hover:border-navy/50 hover:bg-cream-soft"}`,children:"快速模式"}),i.jsx("button",{type:"button",disabled:D,onClick:()=>z({speedMode:"slow"}),className:`rounded-xl border-2 px-3 py-3 text-sm font-bold transition disabled:opacity-60 ${se==="slow"?"border-navy bg-navy text-white shadow-sm":"border-slate-300 bg-white text-navy hover:border-navy/50 hover:bg-cream-soft"}`,children:"慢速模式"})]})]}):null,i.jsxs("div",{className:`slot-box space-y-2 p-3 ${te?"":"shrink-0"}`,children:[i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsx("div",{className:"text-sm font-semibold text-navy",children:"执行状态"}),i.jsxs("div",{className:"flex items-center gap-1",children:[a.isQueued?i.jsxs("button",{type:"button",onClick:Ve,className:"inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-amber-700 hover:bg-amber-50",children:[i.jsx(Re,{className:"h-3.5 w-3.5"}),"取消排队"]}):null,i.jsxs("button",{type:"button",disabled:D,onClick:()=>z({isRunning:!1,isQueued:!1,queuePosition:0,statusText:"待命"}),className:"inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 disabled:opacity-40",children:[i.jsx(ly,{className:"h-3.5 w-3.5"}),"重置状态"]})]})]}),i.jsx("div",{className:`rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words ${a.statusText.startsWith("失败")?"border border-red-300 bg-red-50 text-red-800":a.statusText.startsWith("完成")?"border border-green-300 bg-green-50 text-green-800":a.statusText.includes("取消")?"border border-slate-300 bg-slate-100 text-slate-700":a.isQueued?"border border-amber-300 bg-amber-50 text-amber-900":"bg-white text-slate-700"}`,children:a.statusText}),a.lastResults.length>0?i.jsxs("button",{type:"button",onClick:()=>void pt(),className:"inline-flex items-center gap-1.5 rounded-lg border border-slate-400 bg-gold px-3 py-1.5 text-xs font-semibold text-navy hover:brightness-95",children:[i.jsx(Nr,{className:"h-3.5 w-3.5"}),"打开存储文件夹"]}):null]})]}),i.jsx("div",{className:"border-t border-slate-300 bg-cream-soft p-4",children:a.isRunning?i.jsxs("button",{type:"button",onClick:kt,className:"flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-300 bg-red-50 py-3 text-base font-bold text-red-700 shadow-md hover:bg-red-100",children:[i.jsx(Re,{className:"h-5 w-5"}),"取消生成"]}):a.isQueued?i.jsxs("button",{type:"button",onClick:Ve,className:"flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-amber-300 bg-amber-50 py-3 text-base font-bold text-amber-800 shadow-md hover:bg-amber-100",children:[i.jsx(el,{className:"h-5 w-5"}),"取消排队（第 ",a.queuePosition||"?"," 位）"]}):i.jsx("button",{type:"button",onClick:Te,disabled:!q,title:q?void 0:O?M?C?A?"请先完成必要输入":"当前风格缺少提示词文档":"请先上传音频后再开始生成":"请先上传图片后再开始生成":"请先选择一个风格模板",className:"flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-3 text-base font-bold text-white shadow-md hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-60",children:q?r?i.jsxs(i.Fragment,{children:[i.jsx(an,{className:"h-5 w-5 fill-current"}),"开始生成"]}):i.jsxs(i.Fragment,{children:[i.jsx(an,{className:"h-5 w-5 fill-current"}),"未激活，无法生成"]}):i.jsxs(i.Fragment,{children:[i.jsx(an,{className:"h-5 w-5 fill-current"}),O?M?C?A?"请先提供输入":"风格文档未配置":"请先上传音频":"请先上传图片":"请先选择风格"]})})})]}),i.jsx(ed,{open:j,onClose:()=>N(!1),onAdded:P=>z({templateId:P})}),O?i.jsx(td,{open:w,styleId:O.id,currentName:O.name,onClose:()=>_(!1),onRenamed:()=>E(P=>P+1)}):null]})}const av=24;function cv({onNeedActivation:e,licensed:t,packaged:n=null}){const r=ee(j=>j.panels),s=ee(j=>j.addPanel),o=ee(j=>j.resetPanels),l=ee(j=>j.resetPanel),c=ee(j=>j.updatePanel),a=S.useRef(null),u=S.useRef(null),f=S.useRef(r.length),d=S.useRef(r.map(j=>j.id)),p=S.useRef(!1),y=S.useRef(null),[g,v]=S.useState({left:0,width:0,visible:!1}),k=r[0],h=S.useCallback(()=>{const j=a.current,N=u.current;if(!j||!N)return;const{scrollLeft:w,scrollWidth:_,clientWidth:I}=j,Q=N.clientWidth;if(_<=I+1||Q<=0){v({left:0,width:0,visible:!1});return}const X=I/_,re=Math.max(48,Q*X),O=Q-re,te=O<=0?0:w/(_-I)*O;v({left:te,width:re,visible:!0})},[]),m=(j,N="smooth")=>{const w=a.current;if(!w||!j)return;const _=w.querySelector(`[data-panel-id="${j}"]`);if(!_)return;const I=Math.max(0,_.offsetLeft-Math.max(16,(w.clientWidth-_.offsetWidth)/2));w.scrollTo({left:I,behavior:N})};S.useEffect(()=>{k&&k.title!=="工作台 1"&&c(k.id,{title:"工作台 1"})},[k,c]);const x=async()=>{const j=ee.getState().panels,N=j[0];if(!N)return;const w=new Set(j.filter((X,re)=>re===0||X.isRunning||Be.isActive(X.id)).map(X=>X.id)),_=j.length-w.size,I=!N.isRunning&&!Be.isActive(N.id);_<=0&&!I||!await ms(_>0?I?`将重置第一个工作台（清空输入与结果），并清除其余 ${_} 个工作台（含排队任务）。正在执行的工作台会保留。确定吗？`:`第一个工作台正在执行，将保留它并清除其余 ${_} 个工作台（含排队任务）。确定吗？`:"将清空第一个工作台的图片、音频、文本和结果。确定重置吗？")||(Be.dropQueuedExcept(w),I&&(Be.cancel(N.id),l(N.id)),o([...w]))};S.useEffect(()=>{const j=a.current,N=d.current,w=r.map(Q=>Q.id),_=f.current,I=p.current;if(p.current=!1,j&&r.length>_)requestAnimationFrame(I?()=>{j.scrollTo({left:j.scrollWidth,behavior:"smooth"}),h()}:()=>h());else if(j&&r.length<_){const Q=N.findIndex(O=>!w.includes(O)),X=Q<0?w.length-1:Math.min(Q,Math.max(0,w.length-1)),re=w[X];requestAnimationFrame(()=>{m(re),h()})}else requestAnimationFrame(h);f.current=r.length,d.current=w},[r,h]),S.useEffect(()=>{const j=a.current;if(!j)return;const N=()=>h();j.addEventListener("scroll",N,{passive:!0});const w=new ResizeObserver(()=>h());return w.observe(j),u.current&&w.observe(u.current),window.addEventListener("resize",h),h(),()=>{j.removeEventListener("scroll",N),w.disconnect(),window.removeEventListener("resize",h)}},[h]),S.useEffect(()=>{const j=w=>{const _=y.current,I=a.current,Q=u.current;if(!_||!I||!Q)return;const{scrollWidth:X,clientWidth:re}=I,O=X-re;if(O<=0)return;const te=Q.clientWidth,L=Math.max(48,te*(re/X)),se=Math.max(0,te-L);if(se<=0)return;const T=w.clientX-_.startX,D=_.startScrollLeft+T/se*O;I.scrollLeft=Math.max(0,Math.min(O,D))},N=()=>{y.current=null};return window.addEventListener("pointermove",j),window.addEventListener("pointerup",N),()=>{window.removeEventListener("pointermove",j),window.removeEventListener("pointerup",N)}},[]);const b=j=>{if(j.target.dataset.thumb==="1")return;const N=a.current,w=u.current;if(!N||!w||!g.visible)return;const _=w.getBoundingClientRect(),{scrollWidth:I,clientWidth:Q}=N,X=I-Q;if(X<=0)return;const re=(j.clientX-_.left)/_.width;N.scrollLeft=Math.max(0,Math.min(X,re*X))},E=j=>{j.preventDefault(),j.stopPropagation();const N=a.current;N&&(y.current={startX:j.clientX,startScrollLeft:N.scrollLeft})};return i.jsxs("div",{className:"flex h-full min-h-0 flex-col",children:[i.jsx("div",{className:"flex items-center justify-end gap-3 px-4 py-2",children:i.jsx("div",{className:"flex shrink-0 items-center gap-2",children:i.jsxs("button",{type:"button",onClick:()=>void x(),className:"inline-flex items-center gap-1.5 rounded-xl border-2 border-white/40 bg-black/25 px-3 py-1.5 text-sm font-bold text-white shadow-md hover:bg-black/40",title:"重置第一个工作台并清除其余工作台（执行中的会保留）",children:[i.jsx(Ps,{className:"h-4 w-4"}),"重置工作台"]})})}),i.jsxs("div",{ref:a,className:"workspace-h-scroll flex min-h-0 flex-1 gap-4 overflow-x-auto overflow-y-hidden px-4 pb-2",children:[r.map((j,N)=>i.jsx(vm,{panelId:j.id,index:N,canRemove:N>0,licensed:t,packaged:n,onNeedActivation:e},j.id)),i.jsxs("button",{type:"button",onClick:()=>{p.current=!0,s()},className:"flex h-full w-56 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/70 bg-black/15 text-white hover:bg-black/25",children:[i.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white/80 bg-gold text-3xl font-black text-navy",children:"+"}),i.jsx("div",{className:"text-sm font-semibold",children:"添加工作台"}),i.jsx("div",{className:"px-4 text-center text-[11px] text-white/80",children:"新面板出现在右侧，输入互相独立"})]})]}),i.jsx("div",{className:"shrink-0 px-4 pb-3 pt-1",children:i.jsx("div",{ref:u,role:"scrollbar","aria-orientation":"horizontal","aria-valuenow":Math.round(g.left),onPointerDown:b,className:"relative w-full cursor-default rounded-xl bg-black/25",style:{height:av},children:g.visible?i.jsx("div",{"data-thumb":"1",onPointerDown:E,className:"absolute top-1 bottom-1 cursor-default rounded-lg bg-navy",style:{left:g.left,width:g.width},title:"左右拖动切换工作台"}):null})})]})}function ld(e){return e.type.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(e.name)}function xo(e,t=28){const n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t)}…`}function uv({className:e}){return i.jsxs("svg",{className:ge("pointer-events-none absolute inset-0 size-full opacity-30",e),viewBox:"0 0 100 100","aria-hidden":!0,children:[i.jsx("circle",{cx:"50",cy:"50",r:"46",fill:"none",stroke:"#C8C0B4",strokeWidth:"0.6"}),i.jsx("circle",{cx:"50",cy:"50",r:"34",fill:"none",stroke:"#D4CEC4",strokeWidth:"0.5"}),i.jsx("circle",{cx:"50",cy:"50",r:"22",fill:"none",stroke:"#DCD6CC",strokeWidth:"0.4"}),i.jsx("circle",{cx:"50",cy:"50",r:"6",fill:"#C8C0B4"})]})}function dv({active:e}){return i.jsx("div",{className:ge("flex h-8 items-end justify-center gap-[3px]",e&&"morph-equalizer-active"),"aria-hidden":!0,children:[0,1,2,3,4].map(t=>i.jsx("span",{className:"morph-equalizer-bar w-[3px] rounded-full bg-white/90",style:{animationDelay:`${t*.12}s`}},t))})}function fv({dragOver:e}){return i.jsxs("div",{className:"relative flex size-full cursor-pointer items-center justify-center",children:[i.jsx(uv,{className:"morph-disc-standby-pulse"}),i.jsx(Rp,{className:ge("relative z-[1] h-10 w-10 text-morph-muted opacity-45 transition",e&&"text-morph-accent-deep opacity-75"),"aria-hidden":!0})]})}function pv({isRunning:e,isQueued:t,queuePosition:n,statusText:r}){const s=r.startsWith("失败"),o=r.startsWith("完成"),l=r.includes("取消");return e?i.jsxs("div",{className:"pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center rounded-full bg-black/38 backdrop-blur-[2px]",children:[i.jsx(dv,{active:!0}),i.jsx("p",{className:"mt-3 max-w-[85%] text-center text-xs font-medium leading-relaxed text-white",children:xo(r||"生成中…",32)})]}):t?i.jsxs("div",{className:"pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center rounded-full bg-black/28 backdrop-blur-[1px]",children:[i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx("span",{className:"morph-queue-dot h-2 w-2 rounded-full bg-amber-300"}),i.jsx("span",{className:"text-sm font-medium text-white",children:"排队中"})]}),i.jsxs("p",{className:"mt-2 text-[11px] text-white/80",children:["第 ",n||"?"," 位 · ",xo(r||"等待执行",20)]})]}):s?i.jsx("div",{className:"pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center rounded-full bg-red-950/35 backdrop-blur-[1px]",children:i.jsx("p",{className:"max-w-[85%] px-3 text-center text-xs font-medium text-red-100",children:xo(r,36)})}):o?i.jsxs("div",{className:"pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center rounded-full bg-emerald-950/25 backdrop-blur-[1px]",children:[i.jsx("p",{className:"text-sm font-medium text-emerald-100",children:"完成"}),i.jsx("p",{className:"mt-1 max-w-[85%] px-3 text-center text-[11px] text-emerald-100/85",children:xo(r,28)})]}):l?i.jsx("div",{className:"pointer-events-none absolute inset-0 z-[2] flex items-center justify-center rounded-full bg-black/25",children:i.jsx("p",{className:"text-xs font-medium text-white/85",children:"已取消"})}):null}function mv(){return i.jsx("div",{className:"pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-black/40 via-black/15 to-transparent pb-3 pt-10 text-center",children:i.jsx("span",{className:"text-[11px] font-medium tracking-wide text-white/90",children:"待命"})})}function hv({value:e,onChange:t,disabled:n=!1,isRunning:r=!1,isQueued:s=!1,queuePosition:o=0,statusText:l="待命"}){const c=S.useRef(null),a=S.useRef(e),u=S.useRef(t),f=S.useRef(n),[d,p]=S.useState(!1),[y,g]=S.useState(!1);a.current=e,u.current=t,f.current=n;const v=r||s,k=v||l.startsWith("失败")||l.startsWith("完成")||l.includes("取消"),h=!v&&e&&l==="待命";S.useEffect(()=>{if(!d)return;const L=se=>{se.key==="Escape"&&p(!1)};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},[d]);const m=L=>{L!=null&&L.previewUrl&&L.previewUrl.startsWith("blob:")&&URL.revokeObjectURL(L.previewUrl)},x=async(L,se=!1)=>{if(!f.current){if(!ld(L)){alert("请选择图片文件（png / jpg / webp 等）");return}try{const T=await Jp(L);let D="";try{D=await rm(T)}catch{D=URL.createObjectURL(T)}m(a.current),u.current({name:T.name,file:T,previewUrl:D})}catch(T){const D=T instanceof Error?T.message:String(T);alert(D||"图片上传失败，请重试或改用拖入")}}},b=S.useCallback((L,se=!1)=>{if(f.current)return!1;const T=L.find(ld);return T?(x(T,se),!0):(L.length>0&&alert("请拖入图片文件（png / jpg / webp 等）"),!1)},[]),E=S.useRef(()=>!1);E.current=L=>b(L,!0);const j=S.useRef(L=>E.current(L)),N=()=>{n||Yp(j.current)},w=()=>{Zp(j.current)};S.useEffect(()=>()=>w(),[]);const _=L=>{n||![...L.dataTransfer.types].includes("Files")||(L.preventDefault(),L.dataTransfer.dropEffect="copy",g(!0))},I=L=>{n||![...L.dataTransfer.types].includes("Files")||(L.preventDefault(),L.dataTransfer.dropEffect="copy",g(!0))},Q=L=>{L.currentTarget.contains(L.relatedTarget)||g(!1)},X=L=>{L.preventDefault(),g(!1),b(Ni(L.dataTransfer),!0)},re=L=>{L.stopPropagation(),p(!1),m(e),t(null),c.current&&(c.current.value="")},O=()=>{var L;n||(c.current&&(c.current.value=""),(L=c.current)==null||L.click())},te=()=>{if(!n){if(e){p(!0);return}O()}};return i.jsxs(i.Fragment,{children:[i.jsx("input",{ref:c,type:"file",accept:"image/*,.png,.jpg,.jpeg,.webp,.gif,.bmp",className:"hidden",disabled:n,onChange:L=>{var T;const se=(T=L.target.files)==null?void 0:T[0];L.target.value="",se&&x(se,!0)}}),i.jsxs("div",{role:"button",tabIndex:n?-1:0,title:e?"点击预览，拖入或粘贴可替换":"点击 / 拖入 / 粘贴上传产品图",onClick:te,onKeyDown:L=>{n||(L.key==="Enter"||L.key===" ")&&(L.preventDefault(),te())},onMouseEnter:N,onMouseLeave:w,onFocus:N,onBlur:w,onDragEnter:_,onDragOver:I,onDragLeave:Q,onDrop:X,className:ge("morph-disc group absolute inset-[12px] outline-none transition",n&&"cursor-not-allowed",!n&&"cursor-pointer focus:ring-2 focus:ring-morph-accent/35",y&&!n&&"ring-2 ring-morph-accent/40",r&&"morph-disc-running"),children:[e?i.jsxs(i.Fragment,{children:[i.jsx("img",{src:e.previewUrl,alt:e.name,draggable:!1,className:ge("morph-disc-image",v&&"brightness-[0.72]")}),n?null:i.jsx("div",{className:"pointer-events-none absolute inset-0 z-[4] flex items-end justify-center bg-gradient-to-t from-black/45 via-black/10 to-transparent pb-5 opacity-0 transition group-hover:opacity-100",children:i.jsxs("div",{className:"pointer-events-auto flex items-center gap-2",children:[k?null:i.jsx("button",{type:"button",onClick:L=>{L.stopPropagation(),O()},className:"rounded-full bg-black/55 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-[2px] transition hover:bg-black/70",title:"更换图片",children:"更换"}),i.jsx("button",{type:"button",onClick:re,className:"rounded-full bg-black/55 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-[2px] transition hover:bg-red-500/85",title:"清除图片","aria-label":"清除图片",children:"清除"})]})}),h?i.jsx(mv,{}):null]}):i.jsx(fv,{dragOver:y}),k?i.jsx(pv,{isRunning:r,isQueued:s,queuePosition:o,statusText:l}):null]}),d&&e?Rt.createPortal(i.jsxs("div",{className:"fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6",onMouseDown:L=>{L.target===L.currentTarget&&p(!1)},children:[i.jsx("button",{type:"button",onClick:()=>p(!1),className:"absolute right-4 top-4 rounded-lg bg-white/15 p-2 text-white hover:bg-white/25","aria-label":"关闭预览",children:i.jsx(Re,{className:"h-6 w-6"})}),i.jsx("img",{src:e.previewUrl,alt:e.name,className:"max-h-[85vh] max-w-[min(90vw,960px)] rounded-2xl object-contain shadow-2xl",onMouseDown:L=>L.stopPropagation()})]}),document.body):null]})}function gv({progress:e,active:t=!1,indeterminate:n=!1,className:r}){const o=2*Math.PI*46,l=Math.max(0,Math.min(1,e)),c=o*l,a=n||l>.004,u=l*2*Math.PI,f=50+46*Math.cos(u),d=50+46*Math.sin(u);return i.jsxs("svg",{viewBox:"0 0 100 100",className:ge("pointer-events-none absolute inset-0 size-full -rotate-90",r),"aria-hidden":!0,children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"morphDiscGrad",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#E8A87C"}),i.jsx("stop",{offset:"55%",stopColor:"#C9A882"}),i.jsx("stop",{offset:"100%",stopColor:"#7BA7BC"})]}),i.jsxs("filter",{id:"morphDiscGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[i.jsx("feGaussianBlur",{stdDeviation:"0.6",result:"blur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"blur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsx("circle",{cx:"50",cy:"50",r:46,fill:"none",stroke:"#E6E0D6",strokeWidth:"1.75",opacity:"0.9"}),a?i.jsx("circle",{cx:"50",cy:"50",r:46,fill:"none",stroke:"url(#morphDiscGrad)",strokeWidth:"1.75",strokeLinecap:"butt",strokeDasharray:n?`${o*.22} ${o*.78}`:`${c} ${o-c}`,className:ge("transition-[stroke-dasharray] duration-150 ease-linear",n&&"morph-disc-ring-indeterminate origin-center"),filter:"url(#morphDiscGlow)"}):null,a&&t&&!n?i.jsx("circle",{cx:f,cy:d,r:"2.2",fill:"#7BA7BC",stroke:"#FAF7F0",strokeWidth:"0.8"}):null]})}function ad(e){if(!Number.isFinite(e)||e<0)return"0:00";const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n.toString().padStart(2,"0")}`}function yv(e){const t=e.toLowerCase();return t.endsWith(".mp3")?"audio/mpeg":t.endsWith(".wav")||t.endsWith(".wave")?"audio/wav":t.endsWith(".flac")?"audio/flac":t.endsWith(".m4a")?"audio/mp4":t.endsWith(".aac")?"audio/aac":t.endsWith(".ogg")||t.endsWith(".opus")?"audio/ogg":t.endsWith(".wma")?"audio/x-ms-wma":t.endsWith(".aiff")||t.endsWith(".aif")?"audio/aiff":"application/octet-stream"}function cd(e){return e.type.startsWith("audio/")||e.type==="video/mp4"&&/\.m4a$/i.test(e.name)?!0:/\.(mp3|wav|wave|flac|m4a|aac|ogg|opus|wma|aiff|aif)$/i.test(e.name)}function xv({audio:e,cover:t,title:n,statusText:r,disabled:s=!1,canTrim:o=!1,trimHint:l,embedded:c=!1,className:a,onChange:u,onRequestTrim:f,onPlaybackChange:d}){const p=S.useRef(null),y=S.useRef(null),g=S.useRef(null),v=S.useRef(!1),k=S.useRef(e),h=S.useRef(s),m=S.useRef(u),[x,b]=S.useState(!1),[E,j]=S.useState(0),[N,w]=S.useState(0),[_,I]=S.useState(!1),[Q,X]=S.useState(!1);k.current=e,h.current=s,m.current=u;const re=B=>{var V;(V=B==null?void 0:B.previewUrl)!=null&&V.startsWith("blob:")&&URL.revokeObjectURL(B.previewUrl)},O=S.useCallback(B=>{if(h.current)return;if(!cd(B)){alert("请选择音频文件（mp3 / wav / flac / m4a 等）");return}const V=B.type||yv(B.name),ne=sm(new File([B],B.name,{type:V,lastModified:B.lastModified}),B.name);re(k.current);const z=URL.createObjectURL(ne);m.current({name:ne.name,file:ne,previewUrl:z})},[]),te=()=>{re(e),u(null),b(!1),j(0),w(0),p.current&&(p.current.value="")},L=()=>{var B;s||(p.current&&(p.current.value=""),(B=p.current)==null||B.click())},se=B=>{if(s)return;const V=B.find(cd);if(!V){B.length>0&&alert("请拖入音频文件（mp3 / wav / flac / m4a 等）");return}O(V)};S.useEffect(()=>{b(!1),j(0),w(0)},[e==null?void 0:e.previewUrl]);const T=()=>{const B=y.current;!B||!e||(B.paused?B.play().catch(()=>b(!1)):B.pause())},D=S.useCallback(B=>{const V=y.current;if(!V||!Number.isFinite(V.duration)||V.duration<=0)return;const ne=Math.max(0,Math.min(1,B))*V.duration;V.currentTime=ne,j(ne)},[]),Y=S.useCallback(B=>{const V=g.current;if(!V)return;const ne=V.getBoundingClientRect();ne.width<=0||D((B-ne.left)/ne.width)},[D]),M=S.useCallback(()=>{v.current&&(v.current=!1,X(!1))},[]),C=B=>{e&&(B.preventDefault(),B.currentTarget.setPointerCapture(B.pointerId),v.current=!0,X(!0),Y(B.clientX))},A=B=>{v.current&&Y(B.clientX)},q=B=>{B.currentTarget.hasPointerCapture(B.pointerId)&&B.currentTarget.releasePointerCapture(B.pointerId),M()};S.useEffect(()=>{if(!Q)return;const B=()=>M();return window.addEventListener("pointerup",B),window.addEventListener("pointercancel",B),()=>{window.removeEventListener("pointerup",B),window.removeEventListener("pointercancel",B)}},[Q,M]);const $=N>0?E/N:0;S.useEffect(()=>{d==null||d({progress:$,playing:x})},[$,x,d]),S.useEffect(()=>{e||d==null||d({progress:0,playing:!1})},[e,d]);const W=B=>{s||![...B.dataTransfer.types].includes("Files")||(B.preventDefault(),I(!0))},H=B=>{s||![...B.dataTransfer.types].includes("Files")||(B.preventDefault(),I(!0))},G=B=>{B.currentTarget.contains(B.relatedTarget)||I(!1)},ue=B=>{B.preventDefault(),I(!1),se(Ni(B.dataTransfer))},he=c?"div":"footer";return i.jsxs(he,{className:ge(c?"flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 morph-well-flat transition":"mt-4 flex shrink-0 items-center gap-4 px-4 py-3 morph-status-bar transition",_&&"ring-2 ring-morph-accent/35",!e&&!_&&"ring-2 ring-morph-orange/45",a),onDragEnter:W,onDragOver:H,onDragLeave:G,onDrop:ue,children:[i.jsx("input",{ref:p,type:"file",accept:"audio/*,.mp3,.wav,.wave,.flac,.m4a,.aac,.ogg,.opus,.wma,.aiff,.aif",className:"hidden",disabled:s,onChange:B=>{var ne;const V=(ne=B.target.files)==null?void 0:ne[0];B.target.value="",V&&O(V)}}),e?i.jsx("audio",{ref:y,src:e.previewUrl,preload:"metadata",onLoadedMetadata:()=>{const B=y.current;B&&w(B.duration||0)},onTimeUpdate:()=>{const B=y.current;B&&j(B.currentTime)},onPlay:()=>b(!0),onPause:()=>b(!1),onEnded:()=>{b(!1),j(0)}}):null,!c&&i.jsxs("div",{className:"flex min-w-0 items-center gap-3",children:[i.jsx("div",{className:"relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl morph-well-flat",children:t&&e?i.jsx("img",{src:t.previewUrl,alt:"",className:"h-full w-full object-cover"}):i.jsx(Tp,{className:ge("h-5 w-5",e?"text-morph-accent-deep":"text-morph-muted/45")})}),i.jsx("div",{className:"min-w-0",children:e?i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"flex min-w-0 items-center gap-2",children:[i.jsx("div",{className:"truncate text-sm font-semibold text-morph-text",children:e.name}),i.jsx("span",{className:"shrink-0 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700",children:"已上传"})]}),(r.startsWith("失败")||r.startsWith("完成"))&&i.jsx("div",{className:"truncate text-xs text-morph-muted",children:r})]}):i.jsx("div",{className:"flex items-center gap-2",children:i.jsx("span",{className:"rounded-full bg-morph-orange/20 px-2 py-0.5 text-[11px] font-semibold text-morph-orange",children:_?"松开放入":"未上传"})})})]}),c&&!e?i.jsx("span",{className:"shrink-0 rounded-full bg-morph-orange/20 px-2 py-0.5 text-[11px] font-semibold text-morph-orange",children:_?"松开放入":"未上传"}):null,c?i.jsx("button",{type:"button",onClick:e?T:L,disabled:s&&!e,className:"morph-btn-circle h-9 w-9 shrink-0 text-morph-accent-deep",title:e?x?"暂停":"播放":"上传音频",children:e?x?i.jsx(la,{className:"h-4 w-4"}):i.jsx(an,{className:"ml-0.5 h-4 w-4 fill-current"}):i.jsx(tl,{className:"h-4 w-4"})}):null,i.jsxs("div",{className:ge("flex min-w-0 flex-1 items-center",c?"gap-2 px-1":"gap-3 px-2"),children:[i.jsx("span",{className:ge("shrink-0 text-[11px] tabular-nums text-morph-muted",c&&"w-9 text-right"),children:ad(E)}),i.jsxs("div",{ref:g,role:"slider","aria-label":"音频进度","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round($*100),tabIndex:e?0:-1,className:ge("relative flex h-6 min-w-0 flex-1 cursor-default items-center touch-none select-none",!e&&"opacity-40"),onPointerDown:C,onPointerMove:A,onPointerUp:q,onPointerCancel:q,onKeyDown:B=>{e&&(B.key==="ArrowRight"&&D($+.05),B.key==="ArrowLeft"&&D($-.05))},children:[i.jsx("div",{className:"absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full morph-card-inset"}),i.jsx("div",{className:ge("absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-morph-orange to-morph-blue",!Q&&"transition-[width] duration-150"),style:{width:`${Math.round($*100)}%`}}),e?i.jsx("div",{className:"morph-track-thumb pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2",style:{left:`calc(${Math.round($*100)}% - 7px)`}}):null]}),i.jsx("span",{className:ge("shrink-0 text-[11px] tabular-nums text-morph-muted",c&&"w-9"),children:e?ad(N):"0:00"})]}),i.jsx("div",{className:ge("flex shrink-0 items-center text-morph-muted",c?"gap-1.5":"gap-2"),children:e?i.jsxs(i.Fragment,{children:[c?null:i.jsx("button",{type:"button",onClick:T,className:"morph-btn-circle h-9 w-9 text-morph-accent-deep",title:x?"暂停":"播放",children:x?i.jsx(la,{className:"h-4 w-4"}):i.jsx(an,{className:"ml-0.5 h-4 w-4 fill-current"})}),o&&f?i.jsx("button",{type:"button",onClick:f,disabled:s,className:"morph-btn-circle h-8 w-8 text-morph-accent-deep",title:l||"裁切音频",children:i.jsx(ca,{className:"h-3.5 w-3.5"})}):null,i.jsx("button",{type:"button",onClick:L,disabled:s,className:"morph-btn-circle h-8 w-8",title:"更换音频",children:i.jsx(tl,{className:"h-3.5 w-3.5"})}),i.jsx("button",{type:"button",onClick:te,disabled:s,className:"morph-btn-circle h-8 w-8",title:"清除音频",children:i.jsx(Re,{className:"h-3.5 w-3.5"})})]}):c?null:i.jsxs("button",{type:"button",onClick:L,disabled:s,className:"morph-btn-cancel inline-flex h-9 items-center justify-center gap-1.5 px-4 text-xs font-semibold text-white",title:"上传音频",children:[i.jsx(tl,{className:"h-3.5 w-3.5 shrink-0"}),"上传音频"]})})]})}const Fe=15,Me=45;function ud(e,t,n=Me){const r=Math.max(0,t);let s=Math.max(0,Math.min(e.start,r)),o=Math.max(0,Math.min(e.end,r));return o<s&&([s,o]=[o,s]),o-s>n&&(o=s+n,o>r&&(o=r,s=Math.max(0,o-n))),{start:Math.round(s*100)/100,end:Math.round(o*100)/100}}function vv(e,t=Me,n=Fe){const r=Math.max(0,e);if(r<=0)return[];if(r<=t)return[ud({start:0,end:r},r,t)];const s=[];let o=0;for(;o+t<r-.08;){let a=o+t;if(r-a<n&&(a=r-n),a-o<n||a-o>t+.05)break;s.push(Math.round(a*100)/100),o=a}const l=[0,...s,Math.round(r*100)/100],c=[];for(let a=0;a<l.length-1;a++)c.push(ud({start:l[a],end:l[a+1]},r,t));return c}function Gr(e){if(!Number.isFinite(e)||e<0)return"0:00";const t=Math.floor(e/60),n=Math.floor(e%60),r=Math.floor(e%1*10);return e>=60?`${t}:${n.toString().padStart(2,"0")}.${r}`:`${t}:${n.toString().padStart(2,"0")}.${r}`}function Rc(){try{const e=window.require,t=e==null?void 0:e("electron");return(t==null?void 0:t.ipcRenderer)||null}catch{return null}}function wm(){try{const e=window.require;return e?{fs:e("fs"),path:e("path"),os:e("os")}:null}catch{return null}}function wv(e){return new Promise((t,n)=>{const r=new Audio;r.preload="metadata";let s=!1,o=null;const l=(f,d,p)=>{if(!s){s=!0,o&&clearTimeout(o),r.removeEventListener("loadedmetadata",a),r.removeEventListener("durationchange",a),r.removeEventListener("error",u);try{r.removeAttribute("src"),r.load()}catch{}f&&d!=null?t(d):n(p||new Error("无法读取音频时长"))}},c=()=>{const f=r.duration;return Number.isFinite(f)&&f>0&&f!==1/0?(l(!0,f),!0):!1},a=()=>{if(!c())try{r.currentTime=1e101}catch{}},u=()=>{l(!1,void 0,new Error("音频加载失败，请换一个文件"))};r.addEventListener("loadedmetadata",a),r.addEventListener("durationchange",a),r.addEventListener("error",u),o=setTimeout(()=>{c()||l(!1,void 0,new Error("无法读取音频时长"))},4e3),r.src=e;try{r.load()}catch{}})}async function bv(e){const t=Rc();if(!t)throw new Error("无法读取音频时长");const{inputPath:n,stagingDir:r}=await bm(e);try{const s=await t.invoke("probe-audio-duration",{inputPath:n});if(!(s!=null&&s.success)||!(Number(s.duration)>0))throw new Error((s==null?void 0:s.error)||"无法读取音频时长");return Number(s.duration)}finally{await ga(r)}}async function ha(e){try{return await wv(e.previewUrl)}catch{return bv(e)}}function kv(e){const t=(e.name.match(/\.[^.]+$/)||[""])[0];return t||(e.file.type.includes("wav")?".wav":e.file.type.includes("mpeg")||e.file.type.includes("mp3")?".mp3":e.file.type.includes("mp4")||e.file.type.includes("m4a")?".m4a":".audio")}async function bm(e){const t=wm();if(!t)throw new Error("请使用桌面版软件裁切音频");const{fs:n,path:r,os:s}=t,o=r.join(s.tmpdir(),`morph-trim-in-${Date.now()}-${Math.random().toString(36).slice(2,8)}`);n.mkdirSync(o,{recursive:!0});const l=r.join(o,`source${kv(e)}`),c=Buffer.from(await e.file.arrayBuffer());return n.writeFileSync(l,c),{inputPath:l,stagingDir:o}}async function ga(e){const t=Rc();if(!(!t||!e))try{await t.invoke("cleanup-temp-path",e)}catch{}}async function Sv(e,t,n){if(!t.length)throw new Error("请至少选择一段音频");const r=Rc();if(!r)throw new Error("请使用桌面版软件裁切音频");for(const c of t){const a=c.end-c.start;if(a<=.05)throw new Error("裁切区间过短");if(a<Fe-.05)throw new Error(`每段不能短于 ${Fe} 秒`);if(a>Me+.05)throw new Error(`每段不能超过 ${Me} 秒`)}const{inputPath:s,stagingDir:o}=await bm(e),l=[];try{const c=e.name.replace(/\.[^.]+$/,"").replace(/[<>:"/\\|?*\u0000-\u001f]/g,"_").slice(0,60)||"audio",a=[];for(let u=0;u<t.length;u++){const f=t[u];n==null||n(`正在导出第 ${u+1}/${t.length} 段…`);const d=await r.invoke("trim-audio-segment",{inputPath:s,start:f.start,end:f.end,originalName:`${c}_seg${u+1}`});if(!(d!=null&&d.success)||!d.path)throw new Error((d==null?void 0:d.error)||`第 ${u+1} 段导出失败`);d.tmpDir&&l.push(d.tmpDir);const p=wm();if(!p)throw new Error("无法读取裁切结果");const y=p.fs.readFileSync(d.path),g=p.path.basename(d.path),v=new File([y],g,{type:"audio/mpeg"}),k=URL.createObjectURL(v);a.push({index:u+1,trim:{start:f.start,end:f.end},slot:{name:g,file:v,previewUrl:k}})}return a}finally{await ga(o);for(const c of l)await ga(c)}}const cr=.05,jv=.12;function Qt(e){return Math.round(e*100)/100}async function Nv(e){const t=await e.arrayBuffer(),n=window.AudioContext||window.webkitAudioContext,r=new n;try{const s=await r.decodeAudioData(t.slice(0)),o=s.getChannelData(0);if(s.numberOfChannels===1)return{sampleRate:s.sampleRate,channel:o,duration:s.duration};const l=s.getChannelData(1),c=new Float32Array(o.length);for(let a=0;a<o.length;a++)c[a]=(o[a]+l[a])*.5;return{sampleRate:s.sampleRate,channel:c,duration:s.duration}}finally{r.close()}}function _v(e,t){const n=Math.max(32,t),r=new Float32Array(n),s=Math.max(1,Math.floor(e.length/n));for(let o=0;o<n;o++){const l=o*s,c=Math.min(e.length,l+s);let a=0;for(let u=l;u<c;u++){const f=Math.abs(e[u]);f>a&&(a=f)}r[o]=a}return r}function Cv(e,t,n=cr){const r=Math.max(1,Math.floor(t*n)),s=Math.max(1,Math.ceil(e.length/r)),o=new Float32Array(s);for(let c=0;c<s;c++){const a=c*r,u=Math.min(e.length,a+r);let f=0;for(let p=a;p<u;p++){const y=e[p];f+=y*y}const d=Math.max(1,u-a);o[c]=Math.sqrt(f/d)}const l=new Float32Array(s);for(let c=0;c<s;c++){const a=o[Math.max(0,c-1)],u=o[c],f=o[Math.min(s-1,c+1)];l[c]=(a+u*2+f)/4}return l}function Ev(e,t,n=cr){const r=Math.max(1,Math.floor(t*n)),s=Math.max(1,Math.ceil(e.length/r)),o=new Float32Array(s);for(let a=0;a<s;a++){const u=a*r,f=Math.min(e.length,u+r);let d=0,p=u>0?e[u-1]:0;for(let y=u;y<f;y++){const g=e[y]-p;d+=g*g,p=e[y]}o[a]=Math.sqrt(d/Math.max(1,f-u))}const l=new Float32Array(s);for(let a=0;a<s;a++){const u=a>0?o[a-1]:o[a];l[a]=Math.max(0,o[a]-u)}const c=new Float32Array(s);for(let a=0;a<s;a++){const u=l[Math.max(0,a-1)],f=l[a],d=l[Math.min(s-1,a+1)];c[a]=(u+f*2+d)/4}return c}function Iv(e,t,n){if(!e.length)return[];let r=0;for(let d=0;d<e.length;d++)r+=e[d];const s=r/e.length;let o=0;for(let d=0;d<e.length;d++){const p=e[d]-s;o+=p*p}const l=Math.sqrt(o/e.length),c=s+l*1.15,a=Math.max(2,Math.round(jv/t)),u=[];let f=-a;for(let d=1;d<e.length-1;d++){const p=e[d];if(p<c||p<e[d-1]||p<e[d+1])continue;if(d-f<a){u.length&&p>e[f]&&(u[u.length-1]=Qt(d*t),f=d);continue}const y=Qt(d*t);y>.08&&y<n-.08&&(u.push(y),f=d)}return u}async function Rv(e){const{sampleRate:t,channel:n,duration:r}=await Nv(e),s=_v(n,Math.min(12e3,Math.max(2e3,Math.floor(r*80)))),o=Cv(n,t,cr),l=Ev(n,t,cr),c=Iv(l,cr,r);return{duration:r,peaks:s,energy:o,onsets:c,hopSec:cr}}function Tv(e,t,n,r,s){const o=Math.max(0,n),l=Math.min(s,r);if(l<=o+.05)return Qt(l);const c=Math.max(0,Math.floor(o/t)),a=Math.min(e.length-1,Math.floor(l/t)),u=[];for(let g=c;g<=a;g++)u.push(e[g]);u.sort((g,v)=>g-v);const f=u[Math.max(0,Math.floor(u.length*.22))]??0;let d=a,p=-1/0;const y=Math.max(.01,l-o);for(let g=c;g<=a;g++){const v=g*t,k=e[g],h=e[Math.max(c,g-1)],m=e[Math.min(a,g+1)],x=k<=h&&k<=m,b=k<=f*1.15,E=(v-o)/y;let j=1/(k+1e-4)*.55+E*1.35;x&&(j+=.45),b&&(j+=.35),j>p&&(p=j,d=g)}return Qt(Math.min(s,Math.max(o,d*t)))}function Mv(e,t,n,r,s,o){const l=Math.max(0,r),c=Math.min(o,s);if(c<=l+.05)return Qt(c);const a=Math.max(.01,c-l),u=t.filter(y=>y>=l&&y<=c);if(u.length){let y=u[0],g=-1/0;for(const v of u){const h=(v-l)/a*2.2;h>g&&(g=h,y=v)}return Qt(y)}const f=Tv(e,n,l,c,o);let d=f,p=1/0;for(const y of t){if(y<l||y>c)continue;const g=Math.abs(y-f);g<p&&(p=g,d=y)}return p<=.4?Qt(d):f}function Pv(e,t=Me,n=Fe){const{duration:r,energy:s,hopSec:o}=e,l=e.onsets||[];if(!(r>t+.05)||!s.length)return[];const c=[];let a=0;for(;a+t<r-.08;){const u=a+n,f=Math.min(a+t,r-n);if(f<u-.001)break;let d=Mv(s,l,o,u,f,r);if(d=Math.max(u,Math.min(f,d)),d=Qt(Math.min(d,a+t)),d<=a+n-.05||r-d<n-.05&&(d=Qt(r-n),d-a<n-.05||d-a>t+.05))break;c.push(d),a=d}return c.filter(u=>u>n-.05&&u<r-(n-.05))}const Ft=.15,fl=96;function Wt(e){return Math.round(e*100)/100}function Av(e,t){const n=[0,...e.map(Wt).sort((o,l)=>o-l),Wt(t)],r=[];for(const o of n)(!r.length||Math.abs(r[r.length-1]-o)>=Ft)&&r.push(o);r[r.length-1]!==Wt(t)&&r.push(Wt(t));const s=[];for(let o=0;o<r.length-1;o++)s.push({start:r[o],end:r[o+1]});return s}function $v({open:e,source:t,force:n=!1,onClose:r,onConfirm:s}){const o=S.useRef(null),l=S.useRef(null),c=S.useRef(null),a=S.useRef(null),u=S.useRef(null),[f,d]=S.useState(0),[p,y]=S.useState([]),[g,v]=S.useState(null),[k,h]=S.useState(10),[m,x]=S.useState(0),[b,E]=S.useState(!1),[j,N]=S.useState(!1),[w,_]=S.useState(""),[I,Q]=S.useState(""),[X,re]=S.useState(""),[O,te]=S.useState(!1),[L,se]=S.useState(null),[T,D]=S.useState(""),Y=S.useRef(!1),M=S.useRef(null),C=S.useRef([]);C.current=p;const A=S.useMemo(()=>Av(p,f),[p,f]),q=A.reduce((R,F)=>Math.max(R,F.end-F.start),0),$=A.reduce((R,F)=>Math.min(R,F.end-F.start),Number.POSITIVE_INFINITY),W=q>Me+.05,H=A.length>0&&$<Fe-.05,G=W||H,ue=Math.max(280,f*k),he=S.useCallback(R=>{const F=Pv(R);y(F),se(null),D(F.length?`已推荐 ${F.length} 处切口（每段 ${Fe}–${Me}s，优先吸附鼓点）`:"无需分段"),Q("")},[]);S.useEffect(()=>{if(!e||!t)return;let R=!1;return re(""),Q(""),N(!1),_(""),E(!1),x(0),y([]),se(null),v(null),D(""),u.current=null,te(!0),(async()=>{try{const F=await ha(t);if(R)return;d(F),h(Math.max(6,Math.min(28,720/Math.max(F,1))));try{const K=await Rv(t.file);if(R)return;u.current=K,v(K.peaks),K.duration>Me&&he(K)}catch{if(R)return;if(v(null),F>Me){const K=vv(F).slice(0,-1).map(J=>Wt(J.end)).filter(J=>J>Ft&&J<F-Ft);y(K),D("波形分析失败，已使用等距切开，可手动调整")}}}catch(F){R||re(F instanceof Error?F.message:String(F))}finally{R||te(!1)}})(),()=>{R=!0}},[e,t,he]),S.useEffect(()=>{const R=c.current;if(!R||f<=0)return;const F=window.devicePixelRatio||1,K=ue,J=fl;R.width=Math.floor(K*F),R.height=Math.floor(J*F),R.style.width=`${K}px`,R.style.height=`${J}px`;const de=R.getContext("2d");if(!de)return;de.setTransform(F,0,0,F,0,0),de.clearRect(0,0,K,J),de.fillStyle="#e8e2d6",de.fillRect(0,0,K,J);for(const _e of A){const Le=_e.end-_e.start;if(Le<=Me+.05&&Le>=Fe-.05)continue;const Jt=_e.start/f*K,qn=_e.end/f*K;de.fillStyle="rgba(224, 100, 80, 0.16)",de.fillRect(Jt,0,Math.max(1,qn-Jt),J)}const ze=J/2;if(g&&g.length){de.fillStyle="#6f93a8";const _e=K/g.length;for(let Le=0;Le<g.length;Le++){const Jt=Math.min(1,g[Le]*1.55),qn=Math.max(1,Jt*(J*.4));de.fillRect(Le*_e,ze-qn,Math.max(1,_e*.85),qn*2)}}else de.fillStyle="rgba(111, 147, 168, 0.35)",de.fillRect(0,ze-6,K,12)},[g,ue,f,A]),S.useEffect(()=>{const R=o.current;if(!R)return;const F=()=>{Y.current||x(R.currentTime||0)},K=()=>E(!0),J=()=>E(!1);return R.addEventListener("timeupdate",F),R.addEventListener("play",K),R.addEventListener("pause",J),R.addEventListener("ended",J),()=>{R.removeEventListener("timeupdate",F),R.removeEventListener("play",K),R.removeEventListener("pause",J),R.removeEventListener("ended",J)}},[e,t]),S.useEffect(()=>{const R=l.current;if(!R||!e)return;const F=K=>{if(!K.ctrlKey&&!K.metaKey)return;K.preventDefault();const J=a.current;if(!J||f<=0)return;const de=J.getBoundingClientRect(),ze=Math.max(0,Math.min(1,(K.clientX-de.left)/de.width));h(_e=>{const Le=Math.max(4,Math.min(140,_e*(K.deltaY<0?1.14:.8771929824561404)));return requestAnimationFrame(()=>{const Jt=Math.max(280,f*Le);R.scrollLeft=ze*Jt-(K.clientX-R.getBoundingClientRect().left)}),Le})};return R.addEventListener("wheel",F,{passive:!1}),()=>R.removeEventListener("wheel",F)},[e,f]);const B=S.useCallback(R=>{const F=a.current;if(!F||f<=0)return 0;const K=F.getBoundingClientRect();return Wt(Math.max(0,Math.min(f,(R-K.left)/K.width*f)))},[f]),V=S.useCallback(R=>{const F=o.current,K=Wt(R);x(K),F&&(F.currentTime=K)},[]),ne=S.useCallback(R=>{se(R),V(R);const F=l.current;if(!F||f<=0)return;const K=R/f*Math.max(280,f*k);F.scrollLeft=Math.max(0,K-F.clientWidth/2)},[f,k,V]),z=S.useCallback((R,F)=>{const K=[...C.current].sort((_e,Le)=>_e-Le);if(R<0||R>=K.length)return;const J=(R===0?0:K[R-1])+Fe,de=(R===K.length-1?f:K[R+1])-Fe;if(de<J)return;const ze=Wt(Math.max(J,Math.min(de,F)));K[R]=ze,C.current=K,y(K),se(ze),V(ze)},[f,V]),le=S.useCallback(()=>{if(f<=0)return;const R=Wt(m);if(R<=Ft||R>=f-Ft){Q("请把播放头移到中间再切开");return}if(p.some(J=>Math.abs(J-R)<Ft)){Q("这里已经切过了");return}const F=[0,...p].sort((J,de)=>J-de).filter(J=>J<R).pop()??0,K=[...p,f].sort((J,de)=>J-de).find(J=>J>R)??f;if(R-F<Fe-.05||K-R<Fe-.05){Q(`切开后每段须在 ${Fe}–${Me} 秒之间`);return}y(J=>[...J,R].sort((de,ze)=>de-ze)),se(R),Q("")},[p,f,m]),Te=S.useCallback(()=>{y(R=>R.slice(0,-1)),se(null),Q("")},[]),Ve=S.useCallback(()=>{L!=null&&(y(R=>R.filter(F=>Math.abs(F-L)>=Ft)),se(null))},[L]),kt=()=>{const R=o.current;R&&(R.paused?R.play().catch(()=>E(!1)):R.pause())},pt=R=>{if(f<=0)return;const F=B(R.clientX),K=p.findIndex(J=>Math.abs(J-F)*k<=10);if(K>=0){const J=p[K];se(J),V(J),M.current={index:K,pointerId:R.pointerId},R.currentTarget.setPointerCapture(R.pointerId);return}se(null),Y.current=!0,V(F),R.currentTarget.setPointerCapture(R.pointerId)},P=R=>{const F=M.current;if(F&&F.pointerId===R.pointerId){z(F.index,B(R.clientX));return}Y.current&&V(B(R.clientX))},ce=R=>{var F;((F=M.current)==null?void 0:F.pointerId)===R.pointerId&&(M.current=null),Y.current=!1},pe=async()=>{if(!(!t||!A.length)){if(G){Q(W?`有段落超过 ${Me} 秒，请在过长处再切开`:`有段落短于 ${Fe} 秒，请调整刀口`);return}N(!0),Q("");try{const R=await Sv(t,A,_);s({source:t,segments:R})}catch(R){Q(R instanceof Error?R.message:String(R))}finally{N(!1),_("")}}};return S.useEffect(()=>{if(!e)return;const R=F=>{if(!(F.target instanceof HTMLInputElement||F.target instanceof HTMLTextAreaElement))if(F.code==="Space"){F.preventDefault();const K=o.current;if(!K)return;K.paused?K.play().catch(()=>E(!1)):K.pause()}else F.key==="b"||F.key==="B"?(F.preventDefault(),le()):(F.key==="Delete"||F.key==="Backspace")&&L!=null&&(F.preventDefault(),Ve())};return window.addEventListener("keydown",R),()=>window.removeEventListener("keydown",R)},[e,Ve,L,le]),!e||!t?null:Rt.createPortal(i.jsx("div",{className:"morph-dialog-overlay fixed inset-0 z-[10000] flex items-center justify-center p-4",onMouseDown:R=>{R.target===R.currentTarget&&!n&&!j&&r()},children:i.jsxs("div",{className:"morph-card morph-bg flex w-full max-w-3xl flex-col overflow-hidden",onMouseDown:R=>R.stopPropagation(),children:[i.jsxs("div",{className:"flex items-start justify-between gap-3 px-5 pt-5 pb-3",children:[i.jsxs("div",{children:[i.jsxs("div",{className:"flex items-center gap-2 text-base font-semibold text-morph-text",children:[i.jsx(ca,{className:"h-4 w-4 text-morph-accent-deep"}),"裁切音频"]}),i.jsxs("p",{className:"mt-1 text-xs text-morph-muted",children:["拖动找位置 →「切开」；或用「智能推荐」：在"," ",Fe,"–",Me," ","秒内尽量靠近上限吸附鼓点/起音（onset），找不到再退回安静点。"]}),i.jsx("p",{className:"mt-0.5 truncate text-[11px] text-morph-muted",children:t.name})]}),n?null:i.jsx("button",{type:"button",disabled:j,onClick:r,className:"morph-btn-circle h-9 w-9 text-morph-muted","aria-label":"关闭",children:i.jsx(Re,{className:"h-4 w-4"})})]}),i.jsxs("div",{className:"space-y-3 px-5 pb-2",children:[X?i.jsx("div",{className:"rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-700",children:X}):i.jsxs(i.Fragment,{children:[i.jsx("audio",{ref:o,src:t.previewUrl,preload:"auto"}),i.jsxs("div",{className:"flex items-center justify-between text-[12px] text-morph-muted",children:[i.jsxs("span",{children:["总时长"," ",i.jsx("strong",{className:"tabular-nums text-morph-text",children:Gr(f)}),i.jsx("span",{className:"mx-1.5 opacity-40",children:"·"}),i.jsx("span",{className:"tabular-nums",children:Gr(m)})]}),i.jsxs("span",{className:ge(G&&"font-medium text-red-600"),children:[A.length," 段",G?W?` · 最长 ${Gr(q)}（需 ${Fe}–${Me}s）`:` · 最短 ${Gr($)}（需 ${Fe}–${Me}s）`:""]})]}),i.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[i.jsx("button",{type:"button",disabled:j||f<=0,onClick:kt,className:"morph-btn-circle inline-flex h-9 w-9 items-center justify-center text-morph-accent-deep",title:"播放 / 暂停（空格）",children:b?i.jsx(la,{className:"h-4 w-4"}):i.jsx(an,{className:"ml-0.5 h-4 w-4"})}),i.jsxs("button",{type:"button",disabled:j||f<=0,onClick:le,className:"morph-btn-primary inline-flex h-9 items-center gap-1.5 px-4 text-sm font-semibold text-white",title:"在播放头处切开（B）",children:[i.jsx(ca,{className:"h-3.5 w-3.5"}),"切开"]}),i.jsxs("button",{type:"button",disabled:j||O||f<=Me,onClick:()=>{const R=u.current;if(!R){Q("还在分析音频，请稍后再试");return}he(R)},className:"morph-btn-circle inline-flex h-9 items-center gap-1.5 px-3 text-xs font-medium text-morph-accent-deep disabled:opacity-40",title:`每段 ${Fe}–${Me} 秒，优先吸附鼓点/起音`,children:[i.jsx(Ap,{className:"h-3.5 w-3.5"}),"智能推荐"]}),i.jsxs("button",{type:"button",disabled:j||p.length===0,onClick:Te,className:"morph-btn-circle inline-flex h-9 items-center gap-1 px-3 text-xs text-morph-muted disabled:opacity-40",title:"撤销上一刀",children:[i.jsx(dy,{className:"h-3.5 w-3.5"}),"撤销"]}),p.length>0?i.jsxs("div",{className:"flex max-w-[min(100%,280px)] flex-wrap items-center gap-1",children:[i.jsx("span",{className:"text-[10px] text-morph-muted",children:"剪切点"}),p.map((R,F)=>{const K=L!=null&&Math.abs(L-R)<Ft;return i.jsx("button",{type:"button",disabled:j,onClick:()=>ne(R),className:ge("flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums transition",K?"bg-morph-orange text-white":"morph-btn-circle text-morph-accent-deep"),title:`跳到剪切点 ${F+1}（${Gr(R)}）`,children:F+1},`${F}-${R}`)})]}):null,L!=null?i.jsx("button",{type:"button",disabled:j,onClick:Ve,className:"morph-btn-circle inline-flex h-9 px-3 text-xs text-red-500",children:"删除此刀口"}):null,i.jsxs("div",{className:"ml-auto flex items-center gap-1",children:[i.jsx("button",{type:"button",className:"morph-btn-circle h-8 w-8",onClick:()=>h(R=>Math.max(4,R/1.25)),title:"缩小",children:i.jsx(py,{className:"h-3.5 w-3.5"})}),i.jsx("button",{type:"button",className:"morph-btn-circle h-8 w-8",onClick:()=>h(R=>Math.min(140,R*1.25)),title:"放大",children:i.jsx(fy,{className:"h-3.5 w-3.5"})})]})]}),T?i.jsx("p",{className:"text-[11px] text-morph-accent-deep",children:T}):null,i.jsx("div",{ref:l,className:"overflow-x-auto overflow-y-hidden rounded-2xl bg-[#ebe5d9] px-2 py-3",children:i.jsxs("div",{ref:a,className:"relative cursor-default select-none",style:{width:ue,height:fl},onPointerDown:pt,onPointerMove:P,onPointerUp:ce,onPointerCancel:ce,children:[i.jsx("canvas",{ref:c,className:"absolute inset-0 rounded-lg"}),p.map(R=>{const F=R/f*ue,K=L!=null&&Math.abs(L-R)<Ft;return i.jsxs("div",{className:"absolute top-0 z-[2]",style:{left:F},children:[i.jsx("div",{className:ge("absolute top-0 w-px -translate-x-1/2",K?"bg-morph-orange":"bg-white/90"),style:{height:fl}}),i.jsx("div",{className:ge("absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm rotate-45 border border-white/80 shadow",K?"bg-morph-orange":"bg-slate-600")})]},R)}),i.jsxs("div",{className:"pointer-events-none absolute top-0 z-[3]",style:{left:m/Math.max(f,.001)*ue},children:[i.jsx("div",{className:"absolute top-0 h-full w-0.5 -translate-x-1/2 bg-morph-orange"}),i.jsx("div",{className:"absolute -top-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-morph-orange"})]}),O?i.jsxs("div",{className:"pointer-events-none absolute inset-0 z-[4] flex items-center justify-center rounded-lg bg-white/30 text-xs text-morph-muted",children:[i.jsx(gr,{className:"mr-2 h-4 w-4 animate-spin"}),"生成波形…"]}):null]})})]}),I?i.jsx("div",{className:"rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-700",children:I}):null,w?i.jsxs("div",{className:"flex items-center gap-2 text-xs text-morph-muted",children:[i.jsx(gr,{className:"h-3.5 w-3.5 animate-spin"}),w]}):null]}),i.jsxs("div",{className:"flex justify-end gap-2 px-5 py-4",children:[i.jsx("button",{type:"button",disabled:j,onClick:r,className:"morph-btn-circle px-4 py-2 text-sm font-medium text-morph-muted",children:n?"放弃上传":"取消"}),i.jsxs("button",{type:"button",disabled:j||!!X||!A.length||G,onClick:()=>void pe(),className:"morph-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-55",children:[j?i.jsx(gr,{className:"h-4 w-4 animate-spin"}):null,A.length>1?`确认（${A.length} 段）`:"确认"]})]})]})}),document.body)}function Dv(){const[e,t]=S.useState(null);if(S.useEffect(()=>iv(t),[]),!e)return null;const n=e.kind==="confirm";return Rt.createPortal(i.jsx("div",{className:"morph-dialog-overlay fixed inset-0 z-[11000] flex items-center justify-center p-4",onMouseDown:r=>{r.target===r.currentTarget&&yo(!1)},children:i.jsxs("div",{className:"morph-card morph-bg w-full max-w-sm overflow-hidden",onMouseDown:r=>r.stopPropagation(),role:"dialog","aria-modal":"true","aria-labelledby":"morph-dialog-title",children:[i.jsxs("div",{className:"flex items-start justify-between gap-3 px-5 pt-5 pb-2",children:[i.jsx("h3",{id:"morph-dialog-title",className:"text-sm font-semibold text-morph-text",children:e.title}),i.jsx("button",{type:"button",onClick:()=>yo(!1),className:"morph-btn-circle h-8 w-8 text-morph-muted","aria-label":"关闭",children:i.jsx(Re,{className:"h-4 w-4"})})]}),i.jsx("p",{className:"whitespace-pre-wrap px-5 pb-4 text-sm leading-6 text-morph-muted",children:e.message}),i.jsxs("div",{className:"flex justify-end gap-2 px-5 pb-5",children:[n?i.jsx("button",{type:"button",onClick:()=>yo(!1),className:"morph-btn-circle px-4 py-2 text-sm font-medium text-morph-muted",children:e.cancelText||"取消"}):null,i.jsx("button",{type:"button",onClick:()=>yo(!0),className:"morph-btn-primary px-4 py-2 text-sm font-semibold text-white",children:e.confirmText||(n?"确定":"知道了")})]})]})}),document.body)}/* @include generation-status.js */
const zv=S.memo(function({panelId:t,index:n,licensed:r,packaged:s,onNeedActivation:o,groupBatchId:l}){return i.jsx("aside",{className:"min-h-0",children:i.jsx(vm,{panelId:t,index:n,canRemove:n>0,licensed:r,packaged:s,onNeedActivation:o,variant:"morph",groupBatchId:l})})});function Lv({onNeedActivation:e,licensed:t,packaged:n=null}){var D,Y,M;const r=ee(C=>C.panels),s=ee(C=>C.addPanel),o=ee(C=>C.resetPanel),l=ee(C=>C.updatePanel),c=ee(C=>C.copyPanel),a=ee(C=>C.removePanel),u=ee(C=>C.applyAudioSegments),f=ee(C=>C.syncBatchParamsFrom),[d,p]=S.useState(((D=r[0])==null?void 0:D.id)??""),[y,g]=S.useState(null),[v,k]=S.useState({progress:0,playing:!1}),[h,m]=S.useState(null),x=r.findIndex(C=>C.id===d),b=x>=0?r[x]:r[0],E=r[0];S.useEffect(()=>{r.length!==0&&(r.some(C=>C.id===d)||p(r[0].id))},[r,d]),S.useEffect(()=>{if(!y)return;r.filter(A=>A.audioBatchId===y).length>1||g(null)},[r,y]),S.useEffect(()=>{!E||E.title==="工作台 1"||l(E.id,{title:"工作台 1"})},[E==null?void 0:E.id,E==null?void 0:E.title,l]),S.useEffect(()=>{k({progress:0,playing:!1})},[d]);const j=S.useCallback(C=>{k(A=>A.playing===C.playing&&Math.abs(A.progress-C.progress)<.004?A:C)},[]),N=S.useMemo(()=>b?b.isRunning?{progress:0,active:!0,indeterminate:!0}:b.audio?{progress:v.progress,active:v.playing,indeterminate:!1}:b.isQueued?{progress:.15,active:!1,indeterminate:!1}:{progress:0,active:!1,indeterminate:!1}:{progress:0,active:!1,indeterminate:!1},[b,v]),w=S.useCallback(C=>{g(null),p(C);const A=ee.getState().panels.find(q=>q.id===C);A!=null&&A.resultUnread&&l(C,{resultUnread:!1})},[l]),_=S.useCallback(C=>{const A=ee.getState().panels.filter(W=>W.audioBatchId===C);if(A.length<=1)return;g(C);const q=A.some(W=>W.id===d)?d:A[0].id;p(q);const $=ee.getState().panels.find(W=>W.id===q);$!=null&&$.resultUnread&&l(q,{resultUnread:!1})},[d,l]),I=S.useCallback(()=>{var A;const C=ee.getState().panels;return C.some(q=>q.id===d)?d:((A=C[0])==null?void 0:A.id)??""},[d]),Q=S.useCallback(C=>{const A=I();if(A){if(A!==d&&p(A),C===null){const q=ee.getState().panels.find(H=>H.id===A),$=String((q==null?void 0:q.statusText)||""),W=$.startsWith("完成")||$.startsWith("失败")||$.includes("取消");l(A,{image1:null,...W?{statusText:"待命"}:null});return}l(A,{image1:C})}},[d,I,l]),X=S.useCallback(async C=>{var q,$,W,H;const A=I();if(A){if(A!==d&&p(A),C===null){const G=ee.getState().panels.find(ue=>ue.id===A);($=(q=G==null?void 0:G.audio)==null?void 0:q.previewUrl)!=null&&$.startsWith("blob:")&&URL.revokeObjectURL(G.audio.previewUrl),(H=(W=G==null?void 0:G.audioSource)==null?void 0:W.previewUrl)!=null&&H.startsWith("blob:")&&URL.revokeObjectURL(G.audioSource.previewUrl),l(A,{audio:null,audioSource:null,audioTrim:null,audioBatchId:null,audioSegmentIndex:null});return}try{const G=await ha(C);if(G>Me){m({source:C,force:!0});return}u(A,{source:C,segments:[{slot:C,trim:{start:0,end:G},index:1}]})}catch(G){const ue=G instanceof Error?G.message:String(G);alert(ue||"读取音频失败"),C.previewUrl.startsWith("blob:")&&URL.revokeObjectURL(C.previewUrl)}}},[d,u,I,l]),re=S.useCallback(async()=>{var $;const C=I(),A=ee.getState().panels.find(W=>W.id===C);if(!A)return;const q=A.audioSource||(A.audioBatchId?($=ee.getState().panels.find(W=>W.audioBatchId===A.audioBatchId&&W.audioSource))==null?void 0:$.audioSource:null)||A.audio;if(!q){alert("没有可裁切的音频");return}try{const W=await ha(q);m({source:q,force:W>Me})}catch(W){const H=W instanceof Error?W.message:String(W);alert(H||"读取音频失败")}},[I]),O=S.useCallback(async C=>{const A=I();if(!A)return;if(C.segments.length>1&&!await Rn(`将按 ${C.segments.length} 段音频创建 ${C.segments.length} 个工作台，共用当前图片、风格与参数。是否继续？`,{title:"拆成多个工作台",confirmText:"创建",cancelText:"取消"})){C.segments.forEach(W=>{W.slot.previewUrl.startsWith("blob:")&&URL.revokeObjectURL(W.slot.previewUrl)});return}const q=u(A,C);m(null),q[0]&&p(q[0])},[u,I]),te=S.useCallback(async C=>{const A=C||I();if(!A||!await Rn("将把该工作台的图片、风格、创意方向、分辨率、画面方向同步到同组其它工作台（音频不变）。是否继续？",{title:"同步数据",confirmText:"同步",cancelText:"取消"}))return;const $=f(A);await Tn($>0?`已同步到同组 ${$} 个工作台`:"同组没有可同步的工作台",{title:"同步完成"})},[I,f]),L=S.useCallback(async C=>{const A=pa(C);if(A.merging){await Tn("该组正在合并中，请稍候。",{title:"合并分段"});return}if(!A.ready){const W=A.missingIndexes.length>0?`已就绪 ${A.readyCount}/${A.total} 段。请先对失败的工作台单独点「开始生成」补跑（缺段：${A.missingIndexes.join("、")}），全部成功后再合并。`:A.busy?"同组仍有工作台在生成或排队，请等全部完成后再合并。":"同组尚未就绪，无法合并。";await Tn(W,{title:"还不能合并"});return}if(!await Rn(`将按音频切割点对齐并合并同组 ${A.total} 段成片（使用母带原音）。是否继续？`,{title:"合并分段",confirmText:"开始合并",cancelText:"取消"}))return;const $=await fm(C,{force:!0});$.ok?await Tn(`合并完成：
${$.path}`,{title:"批次合并成功"}):await Tn($.error||"合并失败",{title:"批次合并失败"})},[]),se=async()=>{var $,W;const C=ee.getState().panels.find(H=>H.id===d);if(!C)return;const A=($=C.lastResults.find(H=>H.path))==null?void 0:$.path;let q=ee.getState().resultFolder.trim();if(A)try{const H=window.require,G=H==null?void 0:H("path");G!=null&&G.dirname?q=G.dirname(A):q=A.replace(/[/\\][^/\\]+$/,"")||q}catch{q=A.replace(/[/\\][^/\\]+$/,"")||q}if(!q){alert("尚未设置结果文件夹");return}try{const H=(W=window.require)==null?void 0:W.call(window,"electron");if(!(H!=null&&H.ipcRenderer)){alert(`结果文件夹：${q}`);return}const G=await H.ipcRenderer.invoke("open-folder",q);G!=null&&G.success||alert((G==null?void 0:G.error)||"打开文件夹失败")}catch(H){const G=H instanceof Error?H.message:String(H);alert(G)}};if(!b)return null;const T=x<0?0:x;return i.jsxs("div",{className:"clhh-workspace morph-app flex h-full min-h-0 flex-col px-4 pb-4 pt-3",children:[i.jsx(Dv,{}),i.jsxs("div",{className:"clhh-layout grid min-h-0 flex-1 grid-cols-[240px_minmax(0,1fr)_300px] gap-4",children:[i.jsxs("aside",{className:"flex min-h-0 flex-col px-4 pb-4 pt-3 morph-card",children:[i.jsx("div",{className:"mb-2.5 px-0.5 pt-0.5",children:i.jsx("h2",{className:"text-xs font-semibold tracking-wide text-morph-muted",children:"工作台"})}),i.jsx("div",{className:"min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1",children:(()=>{const C=[];r.forEach(($,W)=>{const H=$.audioBatchId||null,G=C[C.length-1];H&&(G==null?void 0:G.batchId)===H?G.items.push({panel:$,index:W}):C.push({key:H?`batch-${H}`:`solo-${$.id}`,batchId:H,items:[{panel:$,index:W}]})});const A=["一","二","三","四","五","六","七","八","九","十"];let q=0;return C.map($=>{const W=!!$.batchId&&$.items.length>1;W&&(q+=1);const H=q,G=A[H-1]!=null?`组${A[H-1]}`:`组${H}`,ue=({panel:V,index:ne})=>{const le=!!$.batchId&&y===$.batchId||!y&&V.id===b.id,Te=$.batchId?r.filter(pt=>pt.audioBatchId===$.batchId).length:0,Ve=V.audioSegmentIndex&&Te>1?`段${V.audioSegmentIndex}/${Te}`:"",kt=dd(V);return i.jsxs("button",{type:"button",onClick:()=>w(V.id),"aria-label":`工作台 ${ne+1}`,"aria-current":le?"true":void 0,className:`morph-sidebar-item flex w-full items-center gap-2.5 px-2.5 py-2 text-left ${le?"morph-sidebar-item-active":"hover:bg-white/30"}`,children:[i.jsx("span",{className:`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-semibold tabular-nums ${le?"text-morph-accent-deep":"text-morph-muted"}`,children:ne+1}),i.jsxs("div",{className:"clhh-panel-summary",children:[i.jsxs("span",{className:"clhh-panel-assets",children:[i.jsx("span",{className:V.image1?"clhh-asset-icon clhh-asset-ready":"clhh-asset-icon clhh-asset-missing",title:V.image1?"已上传图片":"未上传图片",children:i.jsx(ey,{className:"h-2.5 w-2.5",strokeWidth:2.5})}),i.jsx("span",{className:V.audio?"clhh-asset-icon clhh-asset-ready":"clhh-asset-icon clhh-asset-missing",title:V.audio?"已上传音频":"未上传音频",children:i.jsx(Tp,{className:"h-2.5 w-2.5",strokeWidth:2.5})}),Ve?i.jsx("span",{className:"clhh-segment-label",children:Ve}):null]}),i.jsx("span",{className:"clhh-generation-status","data-state":clhhStatusKind(kt),title:V.statusText||kt,children:kt})]}),i.jsx("span",{className:"clhh-generation-dot","data-state":clhhStatusKind(kt),title:kt})]},V.id)};if(!W)return i.jsx("div",{className:"space-y-1",children:$.items.map(ue)},$.key);const he=$.items.some(V=>V.panel.isRunning||V.panel.isQueued),B=$.items.some(V=>V.panel.id===b.id)?b.id:$.items[0].panel.id;return i.jsxs("div",{className:`rounded-xl p-1 ${y===$.batchId?"border-2 border-morph-accent-deep/70 bg-morph-accent/35 shadow-[0_0_0_1px_rgba(107,132,153,0.2),inset_0_1px_0_rgba(255,255,255,0.55)]":"border border-morph-blue/35 bg-transparent"}`,role:"group","aria-label":`${G}，共 ${$.items.length} 段`,children:[i.jsxs("div",{role:"button",tabIndex:0,onClick:()=>_(String($.batchId)),onKeyDown:V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),_(String($.batchId)))},className:`cursor-pointer space-y-1 rounded-lg px-1.5 pb-1 pt-1 outline-none ${y===$.batchId?"bg-morph-accent/40":"hover:bg-black/[0.03]"}`,"aria-label":`选中${G}`,"aria-pressed":y===$.batchId,children:[i.jsxs("div",{className:"flex items-center justify-between gap-1",children:[i.jsx("span",{className:"text-[10px] font-semibold tracking-wide text-morph-accent-deep",children:G}),i.jsxs("span",{className:`text-[10px] tabular-nums ${y===$.batchId?"font-medium text-morph-accent-deep":"text-morph-muted"}`,children:[$.items.length," 段"]})]}),(()=>{const V=pa(String($.batchId));return i.jsxs("div",{className:"flex gap-1",onClick:ne=>ne.stopPropagation(),onKeyDown:ne=>ne.stopPropagation(),children:[i.jsxs("button",{type:"button",onClick:()=>void te(B),disabled:he,className:"inline-flex min-w-0 flex-1 items-center justify-center gap-0.5 rounded-full px-1.5 py-1 text-[10px] font-medium text-morph-accent-deep morph-well-flat hover:brightness-[1.02] disabled:opacity-50",title:"同步参数到同组",children:[i.jsx(ny,{className:"h-2.5 w-2.5 shrink-0"}),"同步数据"]}),i.jsxs("button",{type:"button",onClick:()=>void L(String($.batchId)),disabled:V.merging||V.busy,className:`inline-flex min-w-0 flex-1 items-center justify-center gap-0.5 rounded-full px-1.5 py-1 text-[10px] font-medium morph-well-flat hover:brightness-[1.02] disabled:opacity-50 ${V.ready?"text-emerald-800":"text-morph-accent-deep"}`,title:V.ready?"同组各段已齐，可手动合并成片":`已就绪 ${V.readyCount}/${V.total} 段`,children:[i.jsx(ty,{className:"h-2.5 w-2.5 shrink-0"}),V.merging?"合并中…":"合并分段"]})]})})()]}),i.jsx("div",{className:"space-y-0.5",children:$.items.map(ue)})]},$.key)})})()}),i.jsx("div",{className:"mt-2 flex flex-col gap-1.5",children:i.jsxs("button",{type:"button",onClick:()=>{s();const C=ee.getState().panels,A=C[C.length-1];A&&w(A.id)},className:"mx-auto inline-flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium text-morph-accent-deep morph-well-flat hover:brightness-[1.02]",children:[i.jsx(si,{className:"h-3 w-3"}),"添加工作台"]})})]}),i.jsxs("section",{className:"clhh-stage relative flex min-h-0 flex-col items-center justify-center overflow-hidden p-6 morph-card",children:[i.jsx("div",{className:"clhh-track-number pointer-events-none absolute left-4 top-3 z-[2] select-none text-5xl font-semibold tabular-nums leading-none text-morph-accent-deep opacity-[0.14]","aria-hidden":!0,title:`工作台 ${T+1}`,children:T+1}),i.jsx("div",{className:"clhh-track-title relative z-[1] mb-6 flex max-w-[90%] items-center justify-center px-2",children:i.jsx("div",{className:"truncate text-center text-lg font-medium tracking-wide text-morph-text",title:((Y=b.audio)==null?void 0:Y.name)||void 0,children:((M=b.audio)==null?void 0:M.name)||"尚未上传音频"})}),i.jsxs("div",{className:"clhh-disc-row relative z-[1] flex w-full max-w-[420px] items-center justify-center",children:[i.jsx("button",{type:"button",className:"morph-btn-circle absolute left-0 h-12 w-12 text-morph-muted","aria-label":"上一个工作台",disabled:T<=0,onClick:()=>{const C=r[Math.max(0,T-1)];C&&w(C.id)},children:i.jsx(ay,{className:"h-5 w-5"})}),i.jsxs("div",{className:"clhh-disc-shell relative mx-auto size-[min(72vw,280px)] shrink-0",children:[i.jsx(gv,{progress:N.progress,active:N.active,indeterminate:N.indeterminate}),i.jsx(hv,{value:b.image1,disabled:b.isRunning||b.isQueued,isRunning:b.isRunning,isQueued:b.isQueued,queuePosition:b.queuePosition,statusText:b.statusText,onChange:Q})]}),i.jsx("button",{type:"button",className:"morph-btn-circle absolute right-0 h-12 w-12 text-morph-muted","aria-label":"下一个工作台",disabled:T>=r.length-1,onClick:()=>{const C=r[Math.min(r.length-1,T+1)];C&&w(C.id)},children:i.jsx(cy,{className:"h-5 w-5"})})]}),i.jsx("div",{className:"relative z-[1] mt-5 w-full max-w-[480px] px-1",children:i.jsx(xv,{embedded:!0,audio:b.audio,cover:b.image1,title:b.title,statusText:b.statusText,disabled:b.isRunning||b.isQueued,canTrim:!!(b.audio||b.audioSource),trimHint:b.audioTrim?`裁切（当前 ${b.audioTrim.start.toFixed(1)}s–${b.audioTrim.end.toFixed(1)}s）`:"裁切音频",onChange:C=>{X(C)},onRequestTrim:()=>{re()},onPlaybackChange:j},b.id)}),i.jsxs("div",{className:"relative z-[1] mt-6 flex items-center justify-center gap-5",children:[i.jsx("button",{type:"button",onClick:()=>{const C=c(b.id);C&&w(C)},className:"morph-btn-circle h-11 w-11 text-morph-muted",title:"复制此工作台",children:i.jsx(fc,{className:"h-4 w-4"})}),i.jsx("button",{type:"button",onClick:()=>void se(),className:"morph-btn-circle h-11 w-11 text-morph-accent-deep",title:"打开结果文件夹",children:i.jsx(Nr,{className:"h-4 w-4"})}),T>0?i.jsx("button",{type:"button",onClick:async()=>{if(b.isRunning){alert("该工作台正在生成中，请稍后再删除");return}await Rn(`确定删除「${b.title}」吗？`,{title:"删除工作台",confirmText:"删除",cancelText:"取消"})&&(Be.cancel(b.id),a(b.id))},className:"morph-btn-circle h-11 w-11 text-red-400",title:"删除此工作台",children:i.jsx(ps,{className:"h-4 w-4"})}):i.jsx("button",{type:"button",onClick:async()=>{if(b.isRunning){alert("该工作台正在生成中，请稍后再重置");return}await Rn("第一个工作台不能删除，只能重置。将清空图片、文本、风格选择和结果，确定吗？",{title:"重置工作台",confirmText:"重置",cancelText:"取消"})&&(Be.cancel(b.id),o(b.id))},className:"morph-btn-circle h-11 w-11 text-red-400",title:"重置此工作台",children:i.jsx(ps,{className:"h-4 w-4"})})]})]}),i.jsx(zv,{panelId:b.id,index:T,licensed:t,packaged:n,onNeedActivation:e,groupBatchId:y})]}),i.jsx($v,{open:!!h,source:(h==null?void 0:h.source)||null,force:h==null?void 0:h.force,onClose:()=>{h!=null&&h.force&&h.source.previewUrl.startsWith("blob:")&&(ee.getState().panels.some(A=>{var q,$;return((q=A.audioSource)==null?void 0:q.previewUrl)===h.source.previewUrl||(($=A.audio)==null?void 0:$.previewUrl)===h.source.previewUrl})||URL.revokeObjectURL(h.source.previewUrl)),m(null)},onConfirm:C=>{O(C)}})]})}function Ce(){return{onMouseDown:e=>{e.stopPropagation()},onClick:e=>{e.stopPropagation(),e.currentTarget.focus()}}}function Cn({title:e,value:t,onChange:n,hint:r}){return i.jsxs("div",{className:"space-y-1",children:[i.jsxs("div",{className:"grid grid-cols-[88px_1fr_1fr] items-center gap-2",children:[i.jsx("div",{className:"text-xs font-semibold text-navy",children:e}),i.jsx("input",{value:t.nodeId,onChange:s=>n({...t,nodeId:s.target.value}),placeholder:"节点 ID，如 12",className:"rh-input rounded-lg border border-slate-400 bg-white px-2 py-1.5 font-mono text-xs outline-none focus:border-navy",...Ce()}),i.jsx("input",{value:t.fieldName,onChange:s=>n({...t,fieldName:s.target.value}),placeholder:"字段名，如 value",className:"rh-input rounded-lg border border-slate-400 bg-white px-2 py-1.5 font-mono text-xs outline-none focus:border-navy",...Ce()})]}),r?i.jsx("p",{className:"pl-[88px] text-[11px] text-slate-500",children:r}):null]})}/* @include settings-panel.js */
function Uv({open:e,status:t,onClose:n,onActivated:r}){const[s,o]=S.useState(""),[l,c]=S.useState(!1),[a,u]=S.useState("");if(!e)return null;const f=!!(t!=null&&t.licensed),d=(t==null?void 0:t.machineCode)||"读取失败",p=async()=>{try{await navigator.clipboard.writeText(d),u("机器码已复制")}catch{u("复制失败，请手动选中机器码")}},y=async()=>{const g=s.trim();if(!g){u("请输入激活码");return}c(!0),u("");try{const v=await Sx(g);if(!v.licensed){u(v.error||"激活失败");return}r(v),o(""),u("激活成功")}catch(v){u(v instanceof Error?v.message:String(v))}finally{c(!1)}};return Rt.createPortal(i.jsx("div",{className:"fixed inset-0 z-[9998] flex items-center justify-center bg-black/45 p-4",onMouseDown:g=>{g.target===g.currentTarget&&n()},children:i.jsxs("div",{className:"panel-cream w-full max-w-lg overflow-hidden",onMouseDown:g=>g.stopPropagation(),role:"dialog","aria-modal":"true",children:[i.jsxs("div",{className:"flex items-center justify-between bg-navy px-4 py-3 text-white",children:[i.jsxs("div",{children:[i.jsx("div",{className:"font-display text-lg font-bold",children:"本机激活"}),i.jsx("div",{className:"text-xs text-blue-100",children:"激活码与这台电脑绑定，拷到其他电脑需重新激活"})]}),i.jsx("button",{type:"button",onClick:n,className:"rounded-lg p-1 hover:bg-white/10",children:i.jsx(Re,{className:"h-5 w-5"})})]}),i.jsxs("div",{className:"space-y-4 p-4",children:[i.jsx("div",{className:"rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm",children:f?(t==null?void 0:t.reason)==="dev"?"当前为开发模式，无需激活即可生成。":`已激活${t!=null&&t.activatedAt?` · ${t.activatedAt.slice(0,10)}`:""}`:"未激活。可以先整理工作台，但无法开始生成。"}),i.jsxs("label",{className:"block space-y-1",children:[i.jsx("span",{className:"text-xs text-slate-600",children:"本机机器码（发给作者以获取激活码）"}),i.jsxs("div",{className:"flex gap-2",children:[i.jsx("input",{readOnly:!0,value:d,className:"rh-input flex-1 rounded-lg border border-slate-400 bg-cream-soft px-3 py-2 font-mono text-sm outline-none",...Ce()}),i.jsxs("button",{type:"button",onClick:()=>void p(),className:"inline-flex items-center gap-1 rounded-xl border border-slate-400 bg-white px-3 py-2 text-xs text-slate-700 hover:bg-slate-50",children:[i.jsx(fc,{className:"h-3.5 w-3.5"}),"复制"]})]})]}),i.jsxs("label",{className:"block space-y-1",children:[i.jsx("span",{className:"text-xs text-slate-600",children:"激活码"}),i.jsx("input",{value:s,onChange:g=>o(g.target.value),placeholder:"粘贴作者发来的激活码",className:"rh-input w-full rounded-lg border border-slate-400 bg-white px-3 py-2 font-mono text-sm outline-none focus:border-navy",...Ce()})]}),a?i.jsx("p",{className:"text-xs text-slate-600",children:a}):null]}),i.jsxs("div",{className:"flex justify-end gap-2 border-t border-slate-300 bg-cream-soft px-4 py-3",children:[i.jsx("button",{type:"button",onClick:n,className:"rounded-xl border border-slate-400 bg-white px-4 py-2 text-sm hover:bg-slate-50",children:"关闭"}),i.jsxs("button",{type:"button",disabled:l||f&&(t==null?void 0:t.reason)!=="dev",onClick:()=>void y(),className:"inline-flex items-center gap-1 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-soft disabled:opacity-60",children:[i.jsx(pc,{className:"h-4 w-4"}),"激活"]})]})]})}),document.body)}const fd=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+[^\s<.,;:!?"')\]])/gi;function Bv(e,t,n){const r=String(e||""),s=n==null?void 0:n.linkClassName,o=n==null?void 0:n.emptyClassName;if(!r)return[S.createElement("span",{key:"empty",className:o},"暂无使用说明内容。")];const l=[];let c=0,a,u=0;const f=new RegExp(fd.source,fd.flags);for(;(a=f.exec(r))!==null;){a.index>c&&l.push(S.createElement("span",{key:`t-${u++}`},r.slice(c,a.index)));const d=a[1],p=a[2],y=a[3],g=p||y||"",v=d||y||g;l.push(S.createElement("button",{key:`l-${u++}`,type:"button",className:s,onClick:()=>t(g),title:g},v)),c=a.index+a[0].length}return c<r.length&&l.push(S.createElement("span",{key:`t-${u++}`},r.slice(c))),l}function Ov(e){return String(e||"").replace(/\r\n/g,`
`).split(/\n{2,}/).map(t=>t.trimEnd()).filter(t=>t.length>0)}async function Wv(e){const t=bt();if(!t)return{success:!0};try{const n=await t.invoke("user-guide-save",{title:e.title,content:e.content});return n!=null&&n.success?{success:!0,path:n.path}:{success:!1,error:(n==null?void 0:n.error)||"保存使用说明失败"}}catch(n){return{success:!1,error:n instanceof Error?n.message:"写入项目失败，请重启一次 Electron 开发窗口后再试"}}}async function Vv(e){const t=String(e||"").trim();if(!/^https?:\/\//i.test(t))return{success:!1,error:"仅支持 http/https 链接"};const n=bt();if(!n)return window.open(t,"_blank","noopener,noreferrer"),{success:!0};const r=await n.invoke("open-external",t);return r!=null&&r.success?{success:!0}:{success:!1,error:(r==null?void 0:r.error)||"打开链接失败"}}const Hv="使用说明",Kv=`作者：AI钱太守（B站/抖音）
B站主页: 
https://space.bilibili.com/3546723662170516?spm_id_from=333.1007.0.0
软件教程：
https://zzvo1gljeo.feishu.cn/wiki/TE5AwbfRAi0Bk6kskI4cyAhun4d?from=from_copylink
`,Qv={title:Hv,content:Kv};function ya(e){return{title:String((e==null?void 0:e.title)||"").trim()||"使用说明",content:String((e==null?void 0:e.content)??"")}}const pd=ya(Qv),Xr=Mr()(Pr(e=>({...pd,setGuide:t=>e(n=>({...n,...ya({title:t.title!==void 0?t.title:n.title,content:t.content!==void 0?t.content:n.content})})),resetToBundled:()=>e(t=>({...t,...pd}))}),{name:"rh-user-guide-v1",partialize:e=>({title:e.title,content:e.content}),merge:(e,t)=>{const n=e||{};return{...t,...ya({title:typeof n.title=="string"?n.title:t.title,content:typeof n.content=="string"?n.content:t.content})}}}));function qv({open:e,onClose:t,packaged:n=null}){const s=Vs(n).id==="morph",o=kn(_=>_.uiMode),l=Xr(_=>_.title),c=Xr(_=>_.content),a=Xr(_=>_.setGuide),u=Qn(n)&&o==="developer",[f,d]=S.useState(l),[p,y]=S.useState(c),[g,v]=S.useState(!1),[k,h]=S.useState(""),[m,x]=S.useState("ok");if(S.useEffect(()=>{e&&(d(Xr.getState().title),y(Xr.getState().content),h(""),x("ok"))},[e]),!e)return null;const b=f.trim()!==l.trim()||p.replace(/\r\n/g,`
`)!==c.replace(/\r\n/g,`
`),E=_=>{Vv(_).then(I=>{I.success||(x("err"),h(I.error||"打开链接失败"))})},j=async()=>{if(!u||g)return;const _={title:f.trim()||"使用说明",content:p.replace(/\r\n/g,`
`)};v(!0),h("");try{a(_),d(_.title),y(_.content);try{const I=await Wv(_);if(!I.success){x("err"),h(I.error||"本机已保存，但写入项目文件失败（用户预览仍可用；打包需成功写入）");return}x("ok"),h(I.path?"已保存。用户模式可查看；打包时会带上此说明。":"已保存到本机。用户模式可查看。")}catch(I){x("err"),h(I instanceof Error?`本机已保存，但写入项目失败：${I.message}`:"本机已保存，但写入项目失败")}}finally{v(!1)}},N=Ov(c),w=i.jsx(i.Fragment,{children:u?i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{className:"space-y-1.5",children:[i.jsx("label",{className:s?"text-xs font-medium text-morph-accent-deep":"text-xs text-slate-600",children:"标题"}),i.jsx("input",{value:f,onChange:_=>d(_.target.value),className:s?"morph-input w-full px-3 py-2.5 text-sm":"rh-input w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm outline-none focus:border-navy",...Ce()})]}),i.jsxs("div",{className:"space-y-1.5",children:[i.jsx("label",{className:s?"text-xs font-medium text-morph-accent-deep":"text-xs text-slate-600",children:"正文（支持链接）"}),i.jsx("textarea",{value:p,onChange:_=>y(_.target.value),className:s?"morph-textarea min-h-[220px] w-full px-3 py-2.5 text-sm leading-6":"rh-input min-h-[220px] w-full resize-y rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-navy",placeholder:`示例：
官网：https://example.com
教程：[点这里](https://example.com/guide)`,...Ce()}),i.jsxs("p",{className:s?"text-[11px] text-morph-muted":"text-[11px] text-slate-500",children:["支持直接写 https 链接，或 Markdown：","[显示文字](https://...)","。用户模式只读，链接可点击打开。"]})]}),k?i.jsx("p",{className:m==="err"?"text-xs text-red-600":s?"text-xs text-emerald-700":"text-xs text-green-800",children:k}):null]}):i.jsxs("div",{className:"space-y-3",children:[N.length===0?i.jsx("p",{className:s?"text-sm text-morph-muted":"text-sm text-slate-500",children:"暂无使用说明内容。"}):N.map((_,I)=>i.jsx("p",{className:s?"whitespace-pre-wrap text-sm leading-6 text-morph-text":"whitespace-pre-wrap text-sm leading-6 text-slate-700",children:Bv(_,E,{linkClassName:s?"inline break-all text-left font-medium text-morph-accent-deep underline underline-offset-2 hover:opacity-80":"inline break-all text-left font-medium text-navy underline underline-offset-2 hover:opacity-80",emptyClassName:s?"text-morph-muted":"text-slate-500"})},`p-${I}`)),k?i.jsx("p",{className:"text-xs text-red-600",children:k}):null]})});return s?Rt.createPortal(i.jsx("div",{className:"morph-dialog-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4",onMouseDown:_=>{_.target===_.currentTarget&&t()},children:i.jsxs("div",{className:"morph-card morph-bg flex max-h-[82vh] w-full max-w-xl flex-col overflow-hidden",onMouseDown:_=>_.stopPropagation(),role:"dialog","aria-modal":"true",children:[i.jsxs("div",{className:"flex items-start justify-between gap-3 px-5 pt-5 pb-3",children:[i.jsxs("div",{className:"min-w-0",children:[i.jsxs("div",{className:"flex items-center gap-2 text-lg font-semibold tracking-wide text-morph-accent-deep",children:[i.jsx(ri,{className:"h-5 w-5 shrink-0"}),i.jsx("span",{className:"truncate",children:u?"编辑使用说明":l})]}),i.jsx("div",{className:"mt-1 text-xs leading-5 text-morph-muted",children:u?"开发模式可编辑；保存后用户模式与打包版会展示对应内容":"说明中的链接可点击，将在浏览器中打开"})]}),i.jsx("button",{type:"button",onClick:t,className:"morph-btn-circle h-9 w-9 shrink-0 text-morph-muted","aria-label":"关闭",children:i.jsx(Re,{className:"h-4 w-4"})})]}),i.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto px-5 pb-2",children:w}),i.jsxs("div",{className:"flex justify-end gap-2 px-5 py-4",children:[i.jsx("button",{type:"button",onClick:t,className:"morph-btn-circle px-5 py-2.5 text-sm font-medium text-morph-muted",children:u?"关闭":"知道了"}),u?i.jsxs("button",{type:"button",disabled:g||!b,onClick:()=>void j(),className:"morph-btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-55",children:[i.jsx(As,{className:"h-4 w-4"}),g?"保存中…":b?"保存":"已保存"]}):null]})]})}),document.body):Rt.createPortal(i.jsx("div",{className:"fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 p-4",onMouseDown:_=>{_.target===_.currentTarget&&t()},children:i.jsxs("div",{className:"panel-cream flex max-h-[82vh] w-full max-w-xl flex-col overflow-hidden",onMouseDown:_=>_.stopPropagation(),role:"dialog","aria-modal":"true",children:[i.jsxs("div",{className:"flex items-center justify-between bg-navy px-4 py-3 text-white",children:[i.jsxs("div",{className:"min-w-0",children:[i.jsxs("div",{className:"flex items-center gap-2 font-display text-lg font-bold",children:[i.jsx(ri,{className:"h-5 w-5 shrink-0"}),i.jsx("span",{className:"truncate",children:u?"编辑使用说明":l})]}),i.jsx("div",{className:"text-xs text-blue-100",children:u?"开发模式可编辑；保存后用户模式与打包版会展示对应内容":"说明中的链接可点击，将在浏览器中打开"})]}),i.jsx("button",{type:"button",onClick:t,className:"rounded-lg p-1 hover:bg-white/10",children:i.jsx(Re,{className:"h-5 w-5"})})]}),i.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto p-4",children:w}),i.jsxs("div",{className:"flex justify-end gap-2 border-t border-slate-300 bg-cream-soft px-4 py-3",children:[i.jsx("button",{type:"button",onClick:t,className:"rounded-xl border border-slate-400 bg-white px-4 py-2 text-sm hover:bg-slate-50",children:u?"关闭":"知道了"}),u?i.jsxs("button",{type:"button",disabled:g||!b,onClick:()=>void j(),className:"inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-soft disabled:opacity-55",children:[i.jsx(As,{className:"h-4 w-4"}),g?"保存中…":b?"保存":"已保存"]}):null]})]})}),document.body)}const km="rh-pack-maker-draft-v1";function Gv(){try{const e=localStorage.getItem(km);if(!e)return null;const t=JSON.parse(e);return{name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",accent:typeof t.accent=="string"?t.accent:"",webappId:typeof t.webappId=="string"?t.webappId:"",bindings:gt(t.bindings||tt)}}catch{return null}}function md(e){localStorage.setItem(km,JSON.stringify({name:e.name,description:e.description,accent:e.accent,webappId:e.webappId,bindings:gt(e.bindings)}))}function Xv({open:e,onClose:t,standalone:n=!1}){const r=ee(w=>w.installTemplate),s=ee(w=>w.templates),[o,l]=S.useState(""),[c,a]=S.useState(""),[u,f]=S.useState(Qr[0]),[d,p]=S.useState(""),[y,g]=S.useState(tt),[v,k]=S.useState(!1),[h,m]=S.useState(!n),x=()=>{if(n){const _=Gv();if(_){l(_.name),a(_.description),f(_.accent||Qr[0]),p(_.webappId),g(gt(_.bindings));return}}const w=Qr[s.length%Qr.length];l(""),a(""),f(w),p(""),g(tt)};if(S.useEffect(()=>{e&&(x(),n&&m(!0))},[e,n]),!e||!h)return null;const b=()=>({name:o,description:c,accent:u,webappId:d,bindings:y}),E=()=>{md(b()),alert("设置已保存。下次打开制作模板包时会自动填入。")},j=async()=>{k(!0);try{const w=await tx({name:o.trim(),description:c.trim(),accent:u,kind:"ai-app",webappId:d.trim(),bindings:gt(y)});if(w.canceled)return;if(!w.success||!w.publicInfo||!w.sealed)throw new Error(w.error||"导出失败");n?(md(b()),alert(`模板包已导出：
${w.path}`)):(r({publicInfo:w.publicInfo,sealed:w.sealed,secret:w.secret}),alert(`模板包已导出并安装到本机：
${w.path}`),t())}catch(w){const _=w instanceof Error?w.message:String(w);alert(_)}finally{k(!1)}},N=i.jsxs("div",{className:`panel-cream flex w-full flex-col overflow-hidden ${n?"h-full max-h-none max-w-none":"max-w-2xl"}`,onMouseDown:w=>w.stopPropagation(),role:"dialog","aria-modal":!n,children:[i.jsxs("div",{className:`flex items-center justify-between bg-navy px-4 py-3 text-white ${n?"titlebar-drag":""}`,children:[i.jsx("div",{className:"font-display text-lg font-bold",children:"制作模板包"}),n?i.jsx(gc,{}):i.jsx("button",{type:"button",onClick:t,className:"rounded-lg p-1 hover:bg-white/10",children:i.jsx(Re,{className:"h-5 w-5"})})]}),i.jsxs("div",{className:`space-y-5 overflow-y-auto p-4 ${n?"min-h-0 flex-1":"max-h-[70vh]"}`,children:[i.jsxs("section",{className:"space-y-3",children:[i.jsx("h3",{className:"text-sm font-bold text-navy",children:"展示信息"}),i.jsxs("label",{className:"block space-y-1",children:[i.jsx("span",{className:"text-xs text-slate-600",children:"模板名称（对方可见）"}),i.jsx("input",{value:o,onChange:w=>l(w.target.value),placeholder:"例如：口播剪辑 / 双人对话",className:"rh-input w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm outline-none focus:border-navy",...Ce()})]}),i.jsxs("label",{className:"block space-y-1",children:[i.jsx("span",{className:"text-xs text-slate-600",children:"简介（可选，对方可见）"}),i.jsx("input",{value:c,onChange:w=>a(w.target.value),placeholder:"一句话说明这个模板做什么",className:"rh-input w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm outline-none focus:border-navy",...Ce()})]}),i.jsxs("div",{className:"space-y-1",children:[i.jsx("span",{className:"text-xs text-slate-600",children:"方块颜色"}),i.jsx("div",{className:"flex flex-wrap gap-2",children:Qr.map(w=>i.jsx("button",{type:"button",onClick:()=>f(w),className:`h-8 w-8 rounded-lg border-2 ${u===w?"border-black scale-110":"border-white"}`,style:{backgroundColor:w},title:w},w))})]})]}),i.jsxs("section",{className:"space-y-3 border-t border-slate-300 pt-4",children:[i.jsx("h3",{className:"text-sm font-bold text-navy",children:"AI 应用配置"}),i.jsxs("label",{className:"block space-y-1",children:[i.jsx("span",{className:"text-xs text-slate-600",children:"AI 应用 ID（webappId）"}),i.jsx("input",{value:d,onChange:w=>p(w.target.value),placeholder:"可粘贴 https://www.runninghub.cn/ai-detail/数字",className:"rh-input w-full rounded-lg border border-slate-400 bg-white px-3 py-2 font-mono text-sm outline-none focus:border-navy",...Ce()})]}),i.jsxs("div",{className:"grid grid-cols-[88px_1fr_1fr] gap-2 text-[11px] font-semibold text-slate-500",children:[i.jsx("div",{children:"输入"}),i.jsx("div",{children:"节点 ID"}),i.jsx("div",{children:"字段名"})]}),i.jsx(Cn,{title:"图片 1",value:y.image1,onChange:w=>g(_=>({..._,image1:w}))}),i.jsx(Cn,{title:"图片 2",value:y.image2,onChange:w=>g(_=>({..._,image2:w}))}),i.jsx(Cn,{title:"音频",value:y.audio,onChange:w=>g(_=>({..._,audio:w}))}),i.jsx(Cn,{title:"文本",value:y.text,onChange:w=>g(_=>({..._,text:w}))}),i.jsx(Cn,{title:"MD 文档",value:y.document,onChange:w=>g(_=>({..._,document:w}))}),i.jsx(Cn,{title:"浮点",value:y.float,onChange:w=>g(_=>({..._,float:w}))}),i.jsx(Cn,{title:"整数",value:y.integer,onChange:w=>g(_=>({..._,integer:w}))})]})]}),i.jsxs("div",{className:"flex justify-end gap-2 border-t border-slate-300 bg-cream-soft px-4 py-3",children:[n?i.jsxs("button",{type:"button",onClick:E,className:"inline-flex items-center gap-1 rounded-xl border border-slate-400 bg-white px-4 py-2 text-sm hover:bg-slate-50",children:[i.jsx(As,{className:"h-4 w-4"}),"保存设置"]}):i.jsx("button",{type:"button",onClick:t,className:"rounded-xl border border-slate-400 bg-white px-4 py-2 text-sm hover:bg-slate-50",children:"取消"}),i.jsxs("button",{type:"button",onClick:()=>void j(),disabled:v,className:"inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-soft disabled:opacity-60",children:[v?i.jsx(gr,{className:"h-4 w-4 animate-spin"}):i.jsx(sy,{className:"h-4 w-4"}),"导出加密模板包"]})]})]});return n?i.jsx("div",{className:"h-full min-h-0 bg-black/10 p-0",children:N}):Rt.createPortal(i.jsx("div",{className:"fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 p-4",onMouseDown:w=>{w.target===w.currentTarget&&t()},children:N}),document.body)}function Yv(){var t,n;if(typeof window>"u")return!1;if(String(window.location.hash||"").replace(/^#/,"")==="pack-maker")return!0;try{const r=(t=window.require)==null?void 0:t.call(window,"electron"),s=(n=r==null?void 0:r.process)==null?void 0:n.argv;return Array.isArray(s)&&s.includes("--pack-maker")}catch{return!1}}async function Zv(e){const{panels:t,resetPanels:n,resetPanel:r}=ee.getState(),s=t[0];if(!s)return!1;const o=new Set(t.filter((f,d)=>d===0||f.isRunning||Be.isActive(f.id)).map(f=>f.id)),l=t.length-o.size,c=!s.isRunning&&!Be.isActive(s.id);if(l<=0&&!c)return!1;const a=l>0?c?`将重置第一个工作台，并清除其余 ${l} 个工作台。正在执行的工作台会保留。确定吗？`:`第一个工作台正在执行，将保留它并清除其余 ${l} 个工作台。确定吗？`:"将清空第一个工作台的图片、文本和结果。确定重置吗？";return(e!=null&&e.useMorphDialog?await Rn(a,{title:"重置工作台",confirmText:"重置",cancelText:"取消"}):await ms(a))?(Be.dropQueuedExcept(o),c&&(Be.cancel(s.id),r(s.id)),n([...o]),!0):!1}function Jv(){const e=Yv(),[t,n]=S.useState(!1),[r,s]=S.useState(!1),[o,l]=S.useState(!1),[c,a]=S.useState(null),u=ee(w=>w.panels),f=ee(w=>w.resultFolder),d=ee(w=>w.updatePanel);S.useEffect(()=>{e||_c().then(a)},[e]),S.useEffect(()=>{if(e)return;const w=_=>{ee.getState().panels.some(Q=>Q.isRunning||Q.isQueued)&&(_.preventDefault(),_.returnValue="")};return window.addEventListener("beforeunload",w),()=>window.removeEventListener("beforeunload",w)},[e]),S.useEffect(()=>{if(e)return;const w=Er();if(!w)return;const _=()=>{const I=ee.getState().panels;for(const Q of I)ar(Q.templateId)||d(Q.id,{templateId:w})};return ee.persist.hasHydrated()&&_(),ee.persist.onFinishHydration(_)},[e,d]);const p=u.filter(w=>w.isRunning).length,y=u.filter(w=>w.isQueued).length,g=p>0||y>0?`执行 ${p} · 排队 ${y} · 共 ${u.length} 台`:`${u.length} 个输入台 · 待命`,v=async()=>{var w;if(!f){n(!0),alert("请先在设置中选择结果文件夹");return}try{const _=(w=window.require)==null?void 0:w.call(window,"electron");if(!(_!=null&&_.ipcRenderer)){alert(`结果文件夹：${f}`);return}const I=await _.ipcRenderer.invoke("open-folder",f);I!=null&&I.success||alert((I==null?void 0:I.error)||"打开文件夹失败")}catch(_){const I=_ instanceof Error?_.message:String(_);alert(I)}},k=S.useCallback(()=>s(!0),[]),h=S.useCallback(()=>n(!0),[]),m=S.useCallback(()=>l(!0),[]),x=!!(c!=null&&c.licensed),b=(c==null?void 0:c.packaged)??null,E=Vs(b),j=S.useCallback(()=>{Zv({useMorphDialog:E.id==="morph"})},[E.id]);if(S.useEffect(()=>(document.title=E.displayName,document.body.classList.toggle("morph-theme",E.id==="morph"),()=>{document.body.classList.remove("morph-theme")}),[E.displayName,E.id]),e)return i.jsx("div",{className:"h-full min-h-0",children:i.jsx(Xv,{open:!0,standalone:!0,onClose:()=>{window.close()}})});const N=E.id==="morph";return i.jsxs("div",{className:`flex h-full flex-col ${N?"morph-app":""}`,children:[N?i.jsx(P0,{licensed:x,licenseReason:c==null?void 0:c.reason,packaged:b,onOpenSettings:h,onOpenResultFolder:v,onOpenActivation:k,onOpenUserGuide:m,onResetWorkspaces:j}):i.jsx(Gy,{statusText:g,licensed:x,licenseReason:c==null?void 0:c.reason,packaged:b,onOpenSettings:h,onOpenResultFolder:v,onOpenActivation:k,onOpenUserGuide:m}),i.jsx("main",{className:`min-h-0 flex-1 overflow-hidden ${N?"morph-bg":"pitch-bg"}`,children:N?i.jsx(Lv,{onNeedActivation:k,licensed:x,packaged:b}):i.jsx(cv,{onNeedActivation:k,licensed:x,packaged:b})}),i.jsx(Fv,{open:t,onClose:()=>n(!1)}),i.jsx(qv,{open:o,packaged:b,onClose:()=>l(!1)}),i.jsx(Uv,{open:r,status:c,onClose:()=>s(!1),onActivated:w=>{a(w),s(!1)}})]})}pl.createRoot(document.getElementById("root")).render(i.jsx(_d.StrictMode,{children:i.jsx(Jv,{})}));
