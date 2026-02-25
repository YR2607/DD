import{a as v}from"./index.DB4Po_jQ.js";const C="modulepreload",S=function(s){return"/"+s},f={},w=function(c,a,q){let m=Promise.resolve();if(a&&a.length>0){let n=function(e){return Promise.all(e.map(o=>Promise.resolve(o).then(i=>({status:"fulfilled",value:i}),i=>({status:"rejected",reason:i}))))};document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),p=t?.nonce||t?.getAttribute("nonce");m=n(a.map(e=>{if(e=S(e),e in f)return;f[e]=!0;const o=e.endsWith(".css"),i=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${i}`))return;const r=document.createElement("link");if(r.rel=o?"stylesheet":C,o||(r.as="script"),r.crossOrigin="",r.href=e,p&&r.setAttribute("nonce",p),document.head.appendChild(r),o)return new Promise((_,E)=>{r.addEventListener("load",_),r.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${e}`)))})}))}function d(n){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=n,window.dispatchEvent(t),!t.defaultPrevented)throw n}return m.then(n=>{for(const t of n||[])t.status==="rejected"&&d(t.reason);return c().catch(d)})};var u={exports:{}},l={};/**
 * @license React
 * react-compiler-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R;function N(){if(R)return l;R=1;var s=v().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;return l.c=function(c){return s.H.useMemoCache(c)},l}var h;function P(){return h||(h=1,u.exports=N()),u.exports}var x=P();export{w as _,x as c};
