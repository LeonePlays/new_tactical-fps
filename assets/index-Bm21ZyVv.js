(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const za="170",bc=0,lo=1,wc=2,Ll=1,Dl=2,yi=3,Bi=0,Ne=1,Ke=2,Fi=0,Pn=1,ki=2,co=3,ho=4,Ac=5,en=100,Cc=101,Rc=102,Pc=103,Lc=104,Dc=200,Ic=201,Uc=202,Nc=203,Yr=204,$r=205,Fc=206,zc=207,Oc=208,Bc=209,kc=210,Hc=211,Vc=212,Gc=213,Wc=214,Zr=0,Kr=1,Jr=2,In=3,jr=4,Qr=5,ta=6,ea=7,Il=0,Xc=1,qc=2,zi=0,Yc=1,$c=2,Zc=3,Ul=4,Kc=5,Jc=6,jc=7,Nl=300,Un=301,Nn=302,ia=303,na=304,tr=306,Ys=1e3,sn=1001,sa=1002,ai=1003,Qc=1004,hs=1005,ui=1006,rr=1007,rn=1008,bi=1009,Fl=1010,zl=1011,ss=1012,Oa=1013,on=1014,Mi=1015,rs=1016,Ba=1017,ka=1018,Fn=1020,Ol=35902,Bl=1021,kl=1022,ri=1023,Hl=1024,Vl=1025,Ln=1026,zn=1027,Gl=1028,Ha=1029,Wl=1030,Va=1031,Ga=1033,ks=33776,Hs=33777,Vs=33778,Gs=33779,ra=35840,aa=35841,oa=35842,la=35843,ca=36196,ha=37492,ua=37496,da=37808,fa=37809,pa=37810,ma=37811,ga=37812,va=37813,_a=37814,xa=37815,ya=37816,Ma=37817,Sa=37818,Ea=37819,Ta=37820,ba=37821,Ws=36492,wa=36494,Aa=36495,Xl=36283,Ca=36284,Ra=36285,Pa=36286,th=3200,eh=3201,ql=0,ih=1,Ni="",Ue="srgb",Bn="srgb-linear",er="linear",jt="srgb",un=7680,uo=519,nh=512,sh=513,rh=514,Yl=515,ah=516,oh=517,lh=518,ch=519,La=35044,fo="300 es",Si=2e3,$s=2001;class kn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ar=Math.PI/180,Da=180/Math.PI;function Oi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]).toLowerCase()}function Ae(n,t,e){return Math.max(t,Math.min(e,n))}function hh(n,t){return(n%t+t)%t}function or(n,t,e){return(1-e)*n+e*t}function ci(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Qt(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class It{constructor(t,e,i,s,r,a,o,l,c){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],v=s[0],m=s[3],p=s[6],x=s[1],T=s[4],_=s[7],L=s[2],A=s[5],C=s[8];return r[0]=a*v+o*x+l*L,r[3]=a*m+o*T+l*A,r[6]=a*p+o*_+l*C,r[1]=c*v+h*x+u*L,r[4]=c*m+h*T+u*A,r[7]=c*p+h*_+u*C,r[2]=f*v+d*x+g*L,r[5]=f*m+d*T+g*A,r[8]=f*p+d*_+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-h*i)*v,t[2]=(o*i-s*a)*v,t[3]=f*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(i*l-c*e)*v,t[8]=(a*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(lr.makeScale(t,e)),this}rotate(t){return this.premultiply(lr.makeRotation(-t)),this}translate(t,e){return this.premultiply(lr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const lr=new It;function $l(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Zs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function uh(){const n=Zs("canvas");return n.style.display="block",n}const po={};function ts(n){n in po||(po[n]=!0,console.warn(n))}function dh(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function fh(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ph(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:Bn,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===jt&&(n.r=Ei(n.r),n.g=Ei(n.g),n.b=Ei(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===jt&&(n.r=Dn(n.r),n.g=Dn(n.g),n.b=Dn(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ni?er:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Dn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const mo=[.64,.33,.3,.6,.15,.06],go=[.2126,.7152,.0722],vo=[.3127,.329],_o=new It().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xo=new It().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[Bn]:{primaries:mo,whitePoint:vo,transfer:er,toXYZ:_o,fromXYZ:xo,luminanceCoefficients:go,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:mo,whitePoint:vo,transfer:jt,toXYZ:_o,fromXYZ:xo,luminanceCoefficients:go,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}});let dn;class mh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{dn===void 0&&(dn=Zs("canvas")),dn.width=t.width,dn.height=t.height;const i=dn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=dn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Zs("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ei(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gh=0;class Zl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Oi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(cr(s[a].image)):r.push(cr(s[a]))}else r=cr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function cr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?mh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vh=0;class Fe extends kn{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,i=sn,s=sn,r=ui,a=rn,o=ri,l=bi,c=Fe.DEFAULT_ANISOTROPY,h=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=Oi(),this.name="",this.source=new Zl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Nl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ys:t.x=t.x-Math.floor(t.x);break;case sn:t.x=t.x<0?0:1;break;case sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ys:t.y=t.y-Math.floor(t.y);break;case sn:t.y=t.y<0?0:1;break;case sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=Nl;Fe.DEFAULT_ANISOTROPY=1;class te{constructor(t=0,e=0,i=0,s=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,_=(d+1)/2,L=(p+1)/2,A=(h+f)/4,C=(u+v)/4,R=(g+m)/4;return T>_&&T>L?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=A/i,r=C/i):_>L?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=A/s,r=R/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=C/r,s=R/r),this.set(i,s,r,e),this}let x=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-v)/x,this.z=(f-h)/x,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _h extends kn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ui,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Fe(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Zl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends _h{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Kl extends Fe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ai,this.minFilter=ai,this.wrapR=sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class xh extends Fe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ai,this.minFilter=ai,this.wrapR=sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class si{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const f=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==f||c!==d||h!==g){let m=1-o;const p=l*f+c*d+h*g+u*v,x=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){const L=Math.sqrt(T),A=Math.atan2(L,p*x);m=Math.sin(m*A)/L,o=Math.sin(o*A)/L}const _=o*x;if(l=l*m+f*_,c=c*m+d*_,h=h*m+g*_,u=u*m+v*_,m===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),f=l(i/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>u){const d=2*Math.sqrt(1+i-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-i-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ae(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(t=0,e=0,i=0){w.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return hr.copy(this).projectOnVector(t),this.sub(hr)}reflect(t){return this.sub(hr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hr=new w,yo=new si;class as{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ei.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ei.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ei.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(t.matrixWorld),this.expandByPoint(ei);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),us.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),us.copy(i.boundingBox)),us.applyMatrix4(t.matrixWorld),this.union(us)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ei),ei.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Wn),ds.subVectors(this.max,Wn),fn.subVectors(t.a,Wn),pn.subVectors(t.b,Wn),mn.subVectors(t.c,Wn),Ci.subVectors(pn,fn),Ri.subVectors(mn,pn),Xi.subVectors(fn,mn);let e=[0,-Ci.z,Ci.y,0,-Ri.z,Ri.y,0,-Xi.z,Xi.y,Ci.z,0,-Ci.x,Ri.z,0,-Ri.x,Xi.z,0,-Xi.x,-Ci.y,Ci.x,0,-Ri.y,Ri.x,0,-Xi.y,Xi.x,0];return!ur(e,fn,pn,mn,ds)||(e=[1,0,0,0,1,0,0,0,1],!ur(e,fn,pn,mn,ds))?!1:(fs.crossVectors(Ci,Ri),e=[fs.x,fs.y,fs.z],ur(e,fn,pn,mn,ds))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ei).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ei).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const mi=[new w,new w,new w,new w,new w,new w,new w,new w],ei=new w,us=new as,fn=new w,pn=new w,mn=new w,Ci=new w,Ri=new w,Xi=new w,Wn=new w,ds=new w,fs=new w,qi=new w;function ur(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){qi.fromArray(n,r);const o=s.x*Math.abs(qi.x)+s.y*Math.abs(qi.y)+s.z*Math.abs(qi.z),l=t.dot(qi),c=e.dot(qi),h=i.dot(qi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const yh=new as,Xn=new w,dr=new w;class os{constructor(t=new w,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):yh.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xn.subVectors(t,this.center);const e=Xn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Xn,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xn.copy(t.center).add(dr)),this.expandByPoint(Xn.copy(t.center).sub(dr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gi=new w,fr=new w,ps=new w,Pi=new w,pr=new w,ms=new w,mr=new w;class Wa{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=gi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gi.copy(this.origin).addScaledVector(this.direction,e),gi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){fr.copy(t).add(e).multiplyScalar(.5),ps.copy(e).sub(t).normalize(),Pi.copy(this.origin).sub(fr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ps),o=Pi.dot(this.direction),l=-Pi.dot(ps),c=Pi.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(fr).addScaledVector(ps,f),d}intersectSphere(t,e){gi.subVectors(t.center,this.origin);const i=gi.dot(this.direction),s=gi.dot(gi)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,gi)!==null}intersectTriangle(t,e,i,s,r){pr.subVectors(e,t),ms.subVectors(i,t),mr.crossVectors(pr,ms);let a=this.direction.dot(mr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pi.subVectors(this.origin,t);const l=o*this.direction.dot(ms.crossVectors(Pi,ms));if(l<0)return null;const c=o*this.direction.dot(pr.cross(Pi));if(c<0||l+c>a)return null;const h=-o*Pi.dot(mr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gt{constructor(t,e,i,s,r,a,o,l,c,h,u,f,d,g,v,m){Gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,f,d,g,v,m)}set(t,e,i,s,r,a,o,l,c,h,u,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Gt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/gn.setFromMatrixColumn(t,0).length(),r=1/gn.setFromMatrixColumn(t,1).length(),a=1/gn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-v*c,e[9]=-o*l,e[2]=v-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,v=c*u;e[0]=f+v*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=v+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,v=c*u;e[0]=f-v*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=v-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+v,e[1]=l*u,e[5]=v*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+v,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Mh,t,Sh)}lookAt(t,e,i){const s=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),Li.crossVectors(i,He),Li.lengthSq()===0&&(Math.abs(i.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),Li.crossVectors(i,He)),Li.normalize(),gs.crossVectors(He,Li),s[0]=Li.x,s[4]=gs.x,s[8]=He.x,s[1]=Li.y,s[5]=gs.y,s[9]=He.y,s[2]=Li.z,s[6]=gs.z,s[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],v=i[6],m=i[10],p=i[14],x=i[3],T=i[7],_=i[11],L=i[15],A=s[0],C=s[4],R=s[8],E=s[12],M=s[1],P=s[5],z=s[9],O=s[13],W=s[2],Y=s[6],G=s[10],K=s[14],V=s[3],st=s[7],ut=s[11],Mt=s[15];return r[0]=a*A+o*M+l*W+c*V,r[4]=a*C+o*P+l*Y+c*st,r[8]=a*R+o*z+l*G+c*ut,r[12]=a*E+o*O+l*K+c*Mt,r[1]=h*A+u*M+f*W+d*V,r[5]=h*C+u*P+f*Y+d*st,r[9]=h*R+u*z+f*G+d*ut,r[13]=h*E+u*O+f*K+d*Mt,r[2]=g*A+v*M+m*W+p*V,r[6]=g*C+v*P+m*Y+p*st,r[10]=g*R+v*z+m*G+p*ut,r[14]=g*E+v*O+m*K+p*Mt,r[3]=x*A+T*M+_*W+L*V,r[7]=x*C+T*P+_*Y+L*st,r[11]=x*R+T*z+_*G+L*ut,r[15]=x*E+T*O+_*K+L*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*d-i*l*d)+v*(+e*l*d-e*c*f+r*a*f-s*a*d+s*c*h-r*l*h)+m*(+e*c*u-e*o*d-r*a*u+i*a*d+r*o*h-i*c*h)+p*(-s*o*h-e*l*u+e*o*f+s*a*u-i*a*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],x=u*m*c-v*f*c+v*l*d-o*m*d-u*l*p+o*f*p,T=g*f*c-h*m*c-g*l*d+a*m*d+h*l*p-a*f*p,_=h*v*c-g*u*c+g*o*d-a*v*d-h*o*p+a*u*p,L=g*u*l-h*v*l-g*o*f+a*v*f+h*o*m-a*u*m,A=e*x+i*T+s*_+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return t[0]=x*C,t[1]=(v*f*r-u*m*r-v*s*d+i*m*d+u*s*p-i*f*p)*C,t[2]=(o*m*r-v*l*r+v*s*c-i*m*c-o*s*p+i*l*p)*C,t[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*d-i*l*d)*C,t[4]=T*C,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*C,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*p-e*l*p)*C,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*d+e*l*d)*C,t[8]=_*C,t[9]=(g*u*r-h*v*r-g*i*d+e*v*d+h*i*p-e*u*p)*C,t[10]=(a*v*r-g*o*r+g*i*c-e*v*c-a*i*p+e*o*p)*C,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*d-e*o*d)*C,t[12]=L*C,t[13]=(h*v*s-g*u*s+g*i*f-e*v*f-h*i*m+e*u*m)*C,t[14]=(g*o*s-a*v*s-g*i*l+e*v*l+a*i*m-e*o*m)*C,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*f+e*o*f)*C,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,v=a*h,m=a*u,p=o*u,x=l*c,T=l*h,_=l*u,L=i.x,A=i.y,C=i.z;return s[0]=(1-(v+p))*L,s[1]=(d+_)*L,s[2]=(g-T)*L,s[3]=0,s[4]=(d-_)*A,s[5]=(1-(f+p))*A,s[6]=(m+x)*A,s[7]=0,s[8]=(g+T)*C,s[9]=(m-x)*C,s[10]=(1-(f+v))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=gn.set(s[0],s[1],s[2]).length();const a=gn.set(s[4],s[5],s[6]).length(),o=gn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ii.copy(this);const c=1/r,h=1/a,u=1/o;return ii.elements[0]*=c,ii.elements[1]*=c,ii.elements[2]*=c,ii.elements[4]*=h,ii.elements[5]*=h,ii.elements[6]*=h,ii.elements[8]*=u,ii.elements[9]*=u,ii.elements[10]*=u,e.setFromRotationMatrix(ii),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=Si){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s);let d,g;if(o===Si)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===$s)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Si){const l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*c,d=(i+s)*h;let g,v;if(o===Si)g=(a+r)*u,v=-2*u;else if(o===$s)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const gn=new w,ii=new Gt,Mh=new w(0,0,0),Sh=new w(1,1,1),Li=new w,gs=new w,He=new w,Mo=new Gt,So=new si;class Be{constructor(t=0,e=0,i=0,s=Be.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ae(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Mo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mo,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return So.setFromEuler(this),this.setFromQuaternion(So,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Be.DEFAULT_ORDER="XYZ";class Jl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Eh=0;const Eo=new w,vn=new si,vi=new Gt,vs=new w,qn=new w,Th=new w,bh=new si,To=new w(1,0,0),bo=new w(0,1,0),wo=new w(0,0,1),Ao={type:"added"},wh={type:"removed"},_n={type:"childadded",child:null},gr={type:"childremoved",child:null};class _e extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=Oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new w,e=new Be,i=new si,s=new w(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Gt},normalMatrix:{value:new It}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vn.setFromAxisAngle(t,e),this.quaternion.multiply(vn),this}rotateOnWorldAxis(t,e){return vn.setFromAxisAngle(t,e),this.quaternion.premultiply(vn),this}rotateX(t){return this.rotateOnAxis(To,t)}rotateY(t){return this.rotateOnAxis(bo,t)}rotateZ(t){return this.rotateOnAxis(wo,t)}translateOnAxis(t,e){return Eo.copy(t).applyQuaternion(this.quaternion),this.position.add(Eo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(To,t)}translateY(t){return this.translateOnAxis(bo,t)}translateZ(t){return this.translateOnAxis(wo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?vs.copy(t):vs.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),qn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(qn,vs,this.up):vi.lookAt(vs,qn,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),vn.setFromRotationMatrix(vi),this.quaternion.premultiply(vn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ao),_n.child=t,this.dispatchEvent(_n),_n.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wh),gr.child=t,this.dispatchEvent(gr),gr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vi.multiply(t.parent.matrixWorld)),t.applyMatrix4(vi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ao),_n.child=t,this.dispatchEvent(_n),_n.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qn,t,Th),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qn,bh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}_e.DEFAULT_UP=new w(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ni=new w,_i=new w,vr=new w,xi=new w,xn=new w,yn=new w,Co=new w,_r=new w,xr=new w,yr=new w,Mr=new te,Sr=new te,Er=new te;class Je{constructor(t=new w,e=new w,i=new w){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),ni.subVectors(t,e),s.cross(ni);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){ni.subVectors(s,e),_i.subVectors(i,e),vr.subVectors(t,e);const a=ni.dot(ni),o=ni.dot(_i),l=ni.dot(vr),c=_i.dot(_i),h=_i.dot(vr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,xi.x),l.addScaledVector(a,xi.y),l.addScaledVector(o,xi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Mr.setScalar(0),Sr.setScalar(0),Er.setScalar(0),Mr.fromBufferAttribute(t,e),Sr.fromBufferAttribute(t,i),Er.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Mr,r.x),a.addScaledVector(Sr,r.y),a.addScaledVector(Er,r.z),a}static isFrontFacing(t,e,i,s){return ni.subVectors(i,e),_i.subVectors(t,e),ni.cross(_i).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ni.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),ni.cross(_i).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Je.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;xn.subVectors(s,i),yn.subVectors(r,i),_r.subVectors(t,i);const l=xn.dot(_r),c=yn.dot(_r);if(l<=0&&c<=0)return e.copy(i);xr.subVectors(t,s);const h=xn.dot(xr),u=yn.dot(xr);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(xn,a);yr.subVectors(t,r);const d=xn.dot(yr),g=yn.dot(yr);if(g>=0&&d<=g)return e.copy(r);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(yn,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Co.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Co,o);const p=1/(m+v+f);return a=v*p,o=f*p,e.copy(i).addScaledVector(xn,a).addScaledVector(yn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const jl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},_s={h:0,s:0,l:0};function Tr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ft{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=qt.workingColorSpace){if(t=hh(t,1),e=Ae(e,0,1),i=Ae(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Tr(a,r,t+1/3),this.g=Tr(a,r,t),this.b=Tr(a,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ue){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){const i=jl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=Dn(t.r),this.g=Dn(t.g),this.b=Dn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return qt.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Ae(Pe.r*255,0,255))*65536+Math.round(Ae(Pe.g*255,0,255))*256+Math.round(Ae(Pe.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Pe.copy(this),e);const i=Pe.r,s=Pe.g,r=Pe.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Ue){qt.fromWorkingColorSpace(Pe.copy(this),t);const e=Pe.r,i=Pe.g,s=Pe.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Di),this.setHSL(Di.h+t,Di.s+e,Di.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Di),t.getHSL(_s);const i=or(Di.h,_s.h,e),s=or(Di.s,_s.s,e),r=or(Di.l,_s.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new Ft;Ft.NAMES=jl;let Ah=0;class Gi extends kn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=Oi(),this.name="",this.blending=Pn,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yr,this.blendDst=$r,this.blendEquation=en,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=In,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=un,this.stencilZFail=un,this.stencilZPass=un,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Pn&&(i.blending=this.blending),this.side!==Bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Yr&&(i.blendSrc=this.blendSrc),this.blendDst!==$r&&(i.blendDst=this.blendDst),this.blendEquation!==en&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==In&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==un&&(i.stencilFail=this.stencilFail),this.stencilZFail!==un&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==un&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class cn extends Gi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.combine=Il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new w,xs=new ct;class We{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=La,this.updateRanges=[],this.gpuType=Mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)xs.fromBufferAttribute(this,e),xs.applyMatrix3(t),this.setXY(e,xs.x,xs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ci(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Qt(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ci(e,this.array)),e}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ci(e,this.array)),e}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ci(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ci(e,this.array)),e}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),i=Qt(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),i=Qt(i,this.array),s=Qt(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),i=Qt(i,this.array),s=Qt(s,this.array),r=Qt(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==La&&(t.usage=this.usage),t}}class Ql extends We{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class tc extends We{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class he extends We{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Ch=0;const Ye=new Gt,br=new _e,Mn=new w,Ve=new as,Yn=new as,Me=new w;class Te extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=Oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new($l(t)?tc:Ql)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new It().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,i){return Ye.makeTranslation(t,e,i),this.applyMatrix4(Ye),this}scale(t,e,i){return Ye.makeScale(t,e,i),this.applyMatrix4(Ye),this}lookAt(t){return br.lookAt(t),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mn).negate(),this.translate(Mn.x,Mn.y,Mn.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new as);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ve.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Ve.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Ve.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Ve.min),this.boundingBox.expandByPoint(Ve.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new os);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(t){const i=this.boundingSphere.center;if(Ve.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Yn.setFromBufferAttribute(o),this.morphTargetsRelative?(Me.addVectors(Ve.min,Yn.min),Ve.expandByPoint(Me),Me.addVectors(Ve.max,Yn.max),Ve.expandByPoint(Me)):(Ve.expandByPoint(Yn.min),Ve.expandByPoint(Yn.max))}Ve.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Me.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Me.fromBufferAttribute(o,c),l&&(Mn.fromBufferAttribute(t,c),Me.add(Mn)),s=Math.max(s,i.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new We(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<i.count;R++)o[R]=new w,l[R]=new w;const c=new w,h=new w,u=new w,f=new ct,d=new ct,g=new ct,v=new w,m=new w;function p(R,E,M){c.fromBufferAttribute(i,R),h.fromBufferAttribute(i,E),u.fromBufferAttribute(i,M),f.fromBufferAttribute(r,R),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),o[R].add(v),o[E].add(v),o[M].add(v),l[R].add(m),l[E].add(m),l[M].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let R=0,E=x.length;R<E;++R){const M=x[R],P=M.start,z=M.count;for(let O=P,W=P+z;O<W;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const T=new w,_=new w,L=new w,A=new w;function C(R){L.fromBufferAttribute(s,R),A.copy(L);const E=o[R];T.copy(E),T.sub(L.multiplyScalar(L.dot(E))).normalize(),_.crossVectors(A,E);const P=_.dot(l[R])<0?-1:1;a.setXYZW(R,T.x,T.y,T.z,P)}for(let R=0,E=x.length;R<E;++R){const M=x[R],P=M.start,z=M.count;for(let O=P,W=P+z;O<W;O+=3)C(t.getX(O+0)),C(t.getX(O+1)),C(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new We(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new w,r=new w,a=new w,o=new w,l=new w,c=new w,h=new w,u=new w;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new We(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Te,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ro=new Gt,Yi=new Wa,ys=new os,Po=new w,Ms=new w,Ss=new w,Es=new w,wr=new w,Ts=new w,Lo=new w,bs=new w;class ce extends _e{constructor(t=new Te,e=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ts.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(wr.fromBufferAttribute(u,t),a?Ts.addScaledVector(wr,h):Ts.addScaledVector(wr.sub(e),h))}e.add(Ts)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ys.copy(i.boundingSphere),ys.applyMatrix4(r),Yi.copy(t.ray).recast(t.near),!(ys.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(ys,Po)===null||Yi.origin.distanceToSquared(Po)>(t.far-t.near)**2))&&(Ro.copy(r).invert(),Yi.copy(t.ray).applyMatrix4(Ro),!(i.boundingBox!==null&&Yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Yi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],x=Math.max(m.start,d.start),T=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let _=x,L=T;_<L;_+=3){const A=o.getX(_),C=o.getX(_+1),R=o.getX(_+2);s=ws(this,p,t,i,c,h,u,A,C,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const x=o.getX(m),T=o.getX(m+1),_=o.getX(m+2);s=ws(this,a,t,i,c,h,u,x,T,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],x=Math.max(m.start,d.start),T=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=x,L=T;_<L;_+=3){const A=_,C=_+1,R=_+2;s=ws(this,p,t,i,c,h,u,A,C,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const x=m,T=m+1,_=m+2;s=ws(this,a,t,i,c,h,u,x,T,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Rh(n,t,e,i,s,r,a,o){let l;if(t.side===Ne?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Bi,o),l===null)return null;bs.copy(o),bs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(bs);return c<e.near||c>e.far?null:{distance:c,point:bs.clone(),object:n}}function ws(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Ms),n.getVertexPosition(l,Ss),n.getVertexPosition(c,Es);const h=Rh(n,t,e,i,Ms,Ss,Es,Lo);if(h){const u=new w;Je.getBarycoord(Lo,Ms,Ss,Es,u),s&&(h.uv=Je.getInterpolatedAttribute(s,o,l,c,u,new ct)),r&&(h.uv1=Je.getInterpolatedAttribute(r,o,l,c,u,new ct)),a&&(h.normal=Je.getInterpolatedAttribute(a,o,l,c,u,new w),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new w,materialIndex:0};Je.getNormal(Ms,Ss,Es,f.normal),h.face=f,h.barycoord=u}return h}class de extends Te{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(u,2));function g(v,m,p,x,T,_,L,A,C,R,E){const M=_/C,P=L/R,z=_/2,O=L/2,W=A/2,Y=C+1,G=R+1;let K=0,V=0;const st=new w;for(let ut=0;ut<G;ut++){const Mt=ut*P-O;for(let zt=0;zt<Y;zt++){const ee=zt*M-z;st[v]=ee*x,st[m]=Mt*T,st[p]=W,c.push(st.x,st.y,st.z),st[v]=0,st[m]=0,st[p]=A>0?1:-1,h.push(st.x,st.y,st.z),u.push(zt/C),u.push(1-ut/R),K+=1}}for(let ut=0;ut<R;ut++)for(let Mt=0;Mt<C;Mt++){const zt=f+Mt+Y*ut,ee=f+Mt+Y*(ut+1),q=f+(Mt+1)+Y*(ut+1),tt=f+(Mt+1)+Y*ut;l.push(zt,ee,tt),l.push(ee,q,tt),V+=6}o.addGroup(d,V,E),d+=V,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new de(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function On(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ie(n){const t={};for(let e=0;e<n.length;e++){const i=On(n[e]);for(const s in i)t[s]=i[s]}return t}function Ph(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function ec(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const Lh={clone:On,merge:Ie};var Dh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ih=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hi extends Gi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dh,this.fragmentShader=Ih,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=On(t.uniforms),this.uniformsGroups=Ph(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class ic extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=Si}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ii=new w,Do=new ct,Io=new ct;class Oe extends ic{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Da*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Da*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z)}getViewSize(t,e){return this.getViewBounds(t,Do,Io),e.subVectors(Io,Do)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ar*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Sn=-90,En=1;class Uh extends _e{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Oe(Sn,En,t,e);s.layers=this.layers,this.add(s);const r=new Oe(Sn,En,t,e);r.layers=this.layers,this.add(r);const a=new Oe(Sn,En,t,e);a.layers=this.layers,this.add(a);const o=new Oe(Sn,En,t,e);o.layers=this.layers,this.add(o);const l=new Oe(Sn,En,t,e);l.layers=this.layers,this.add(l);const c=new Oe(Sn,En,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===$s)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class nc extends Fe{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Un,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nh extends ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new nc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ui}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new de(5,5,5),r=new Hi({name:"CubemapFromEquirect",uniforms:On(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ne,blending:Fi});r.uniforms.tEquirect.value=e;const a=new ce(s,r),o=e.minFilter;return e.minFilter===rn&&(e.minFilter=ui),new Uh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const Ar=new w,Fh=new w,zh=new It;class Qi{constructor(t=new w(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ar.subVectors(i,e).cross(Fh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ar),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||zh.getNormalMatrix(t),s=this.coplanarPoint(Ar).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new os,As=new w;class Xa{constructor(t=new Qi,e=new Qi,i=new Qi,s=new Qi,r=new Qi,a=new Qi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Si){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],v=s[10],m=s[11],p=s[12],x=s[13],T=s[14],_=s[15];if(i[0].setComponents(l-r,f-c,m-d,_-p).normalize(),i[1].setComponents(l+r,f+c,m+d,_+p).normalize(),i[2].setComponents(l+a,f+h,m+g,_+x).normalize(),i[3].setComponents(l-a,f-h,m-g,_-x).normalize(),i[4].setComponents(l-o,f-u,m-v,_-T).normalize(),e===Si)i[5].setComponents(l+o,f+u,m+v,_+T).normalize();else if(e===$s)i[5].setComponents(o,u,v,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(t){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(t.matrixWorld),this.intersectsSphere($i)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(As.x=s.normal.x>0?t.max.x:t.min.x,As.y=s.normal.y>0?t.max.y:t.min.y,As.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(As)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sc(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Oh(n){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Vi extends Te{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const x=p*f-a;for(let T=0;T<c;T++){const _=T*u-r;g.push(_,-x,0),v.push(0,0,1),m.push(T/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){const T=x+c*p,_=x+c*(p+1),L=x+1+c*(p+1),A=x+1+c*p;d.push(T,_,A),d.push(_,L,A)}this.setIndex(d),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.width,t.height,t.widthSegments,t.heightSegments)}}var Bh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$h=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,eu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,su=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ru=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,au=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ou=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,lu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,uu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,du=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mu="gl_FragColor = linearToOutputTexel( gl_FragColor );",gu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,_u=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Su=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Eu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Au=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ru=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Lu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Du=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Iu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Uu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ou=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ku=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$u=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ku=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ju=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ju=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,td=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ed=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,id=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ad=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,od=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ld=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ud=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,pd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,md=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_d=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Md=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Sd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ed=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Td=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ad=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ld=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Id=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Od=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$d=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ef=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,af=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,of=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,df=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ff=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_f=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nt={alphahash_fragment:Bh,alphahash_pars_fragment:kh,alphamap_fragment:Hh,alphamap_pars_fragment:Vh,alphatest_fragment:Gh,alphatest_pars_fragment:Wh,aomap_fragment:Xh,aomap_pars_fragment:qh,batching_pars_vertex:Yh,batching_vertex:$h,begin_vertex:Zh,beginnormal_vertex:Kh,bsdfs:Jh,iridescence_fragment:jh,bumpmap_pars_fragment:Qh,clipping_planes_fragment:tu,clipping_planes_pars_fragment:eu,clipping_planes_pars_vertex:iu,clipping_planes_vertex:nu,color_fragment:su,color_pars_fragment:ru,color_pars_vertex:au,color_vertex:ou,common:lu,cube_uv_reflection_fragment:cu,defaultnormal_vertex:hu,displacementmap_pars_vertex:uu,displacementmap_vertex:du,emissivemap_fragment:fu,emissivemap_pars_fragment:pu,colorspace_fragment:mu,colorspace_pars_fragment:gu,envmap_fragment:vu,envmap_common_pars_fragment:_u,envmap_pars_fragment:xu,envmap_pars_vertex:yu,envmap_physical_pars_fragment:Lu,envmap_vertex:Mu,fog_vertex:Su,fog_pars_vertex:Eu,fog_fragment:Tu,fog_pars_fragment:bu,gradientmap_pars_fragment:wu,lightmap_pars_fragment:Au,lights_lambert_fragment:Cu,lights_lambert_pars_fragment:Ru,lights_pars_begin:Pu,lights_toon_fragment:Du,lights_toon_pars_fragment:Iu,lights_phong_fragment:Uu,lights_phong_pars_fragment:Nu,lights_physical_fragment:Fu,lights_physical_pars_fragment:zu,lights_fragment_begin:Ou,lights_fragment_maps:Bu,lights_fragment_end:ku,logdepthbuf_fragment:Hu,logdepthbuf_pars_fragment:Vu,logdepthbuf_pars_vertex:Gu,logdepthbuf_vertex:Wu,map_fragment:Xu,map_pars_fragment:qu,map_particle_fragment:Yu,map_particle_pars_fragment:$u,metalnessmap_fragment:Zu,metalnessmap_pars_fragment:Ku,morphinstance_vertex:Ju,morphcolor_vertex:ju,morphnormal_vertex:Qu,morphtarget_pars_vertex:td,morphtarget_vertex:ed,normal_fragment_begin:id,normal_fragment_maps:nd,normal_pars_fragment:sd,normal_pars_vertex:rd,normal_vertex:ad,normalmap_pars_fragment:od,clearcoat_normal_fragment_begin:ld,clearcoat_normal_fragment_maps:cd,clearcoat_pars_fragment:hd,iridescence_pars_fragment:ud,opaque_fragment:dd,packing:fd,premultiplied_alpha_fragment:pd,project_vertex:md,dithering_fragment:gd,dithering_pars_fragment:vd,roughnessmap_fragment:_d,roughnessmap_pars_fragment:xd,shadowmap_pars_fragment:yd,shadowmap_pars_vertex:Md,shadowmap_vertex:Sd,shadowmask_pars_fragment:Ed,skinbase_vertex:Td,skinning_pars_vertex:bd,skinning_vertex:wd,skinnormal_vertex:Ad,specularmap_fragment:Cd,specularmap_pars_fragment:Rd,tonemapping_fragment:Pd,tonemapping_pars_fragment:Ld,transmission_fragment:Dd,transmission_pars_fragment:Id,uv_pars_fragment:Ud,uv_pars_vertex:Nd,uv_vertex:Fd,worldpos_vertex:zd,background_vert:Od,background_frag:Bd,backgroundCube_vert:kd,backgroundCube_frag:Hd,cube_vert:Vd,cube_frag:Gd,depth_vert:Wd,depth_frag:Xd,distanceRGBA_vert:qd,distanceRGBA_frag:Yd,equirect_vert:$d,equirect_frag:Zd,linedashed_vert:Kd,linedashed_frag:Jd,meshbasic_vert:jd,meshbasic_frag:Qd,meshlambert_vert:tf,meshlambert_frag:ef,meshmatcap_vert:nf,meshmatcap_frag:sf,meshnormal_vert:rf,meshnormal_frag:af,meshphong_vert:of,meshphong_frag:lf,meshphysical_vert:cf,meshphysical_frag:hf,meshtoon_vert:uf,meshtoon_frag:df,points_vert:ff,points_frag:pf,shadow_vert:mf,shadow_frag:gf,sprite_vert:vf,sprite_frag:_f},it={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},li={basic:{uniforms:Ie([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Ie([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Ie([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Ie([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Ie([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Ie([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Ie([it.points,it.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Ie([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Ie([it.common,it.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Ie([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Ie([it.sprite,it.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:Ie([it.common,it.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:Ie([it.lights,it.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};li.physical={uniforms:Ie([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const Cs={r:0,b:0,g:0},Zi=new Be,xf=new Gt;function yf(n,t,e,i,s,r,a){const o=new Ft(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(x){let T=x.isScene===!0?x.background:null;return T&&T.isTexture&&(T=(x.backgroundBlurriness>0?e:t).get(T)),T}function v(x){let T=!1;const _=g(x);_===null?p(o,l):_&&_.isColor&&(p(_,1),T=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,T){const _=g(T);_&&(_.isCubeTexture||_.mapping===tr)?(h===void 0&&(h=new ce(new de(1,1,1),new Hi({name:"BackgroundCubeMaterial",uniforms:On(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Zi.copy(T.backgroundRotation),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xf.makeRotationFromEuler(Zi)),h.material.toneMapped=qt.getTransfer(_.colorSpace)!==jt,(u!==_||f!==_.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=_,f=_.version,d=n.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ce(new Vi(2,2),new Hi({name:"BackgroundMaterial",uniforms:On(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=qt.getTransfer(_.colorSpace)!==jt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,d=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,T){x.getRGB(Cs,ec(n)),i.buffers.color.setClear(Cs.r,Cs.g,Cs.b,T,a)}return{getClearColor:function(){return o},setClearColor:function(x,T=1){o.set(x),l=T,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(o,l)},render:v,addToRenderList:m}}function Mf(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function o(M,P,z,O,W){let Y=!1;const G=u(O,z,P);r!==G&&(r=G,c(r.object)),Y=d(M,O,z,W),Y&&g(M,O,z,W),W!==null&&t.update(W,n.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,_(M,P,z,O),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,P,z){const O=z.wireframe===!0;let W=i[M.id];W===void 0&&(W={},i[M.id]=W);let Y=W[P.id];Y===void 0&&(Y={},W[P.id]=Y);let G=Y[O];return G===void 0&&(G=f(l()),Y[O]=G),G}function f(M){const P=[],z=[],O=[];for(let W=0;W<e;W++)P[W]=0,z[W]=0,O[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:O,object:M,attributes:{},index:null}}function d(M,P,z,O){const W=r.attributes,Y=P.attributes;let G=0;const K=z.getAttributes();for(const V in K)if(K[V].location>=0){const ut=W[V];let Mt=Y[V];if(Mt===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(Mt=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(Mt=M.instanceColor)),ut===void 0||ut.attribute!==Mt||Mt&&ut.data!==Mt.data)return!0;G++}return r.attributesNum!==G||r.index!==O}function g(M,P,z,O){const W={},Y=P.attributes;let G=0;const K=z.getAttributes();for(const V in K)if(K[V].location>=0){let ut=Y[V];ut===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ut=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ut=M.instanceColor));const Mt={};Mt.attribute=ut,ut&&ut.data&&(Mt.data=ut.data),W[V]=Mt,G++}r.attributes=W,r.attributesNum=G,r.index=O}function v(){const M=r.newAttributes;for(let P=0,z=M.length;P<z;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){const z=r.newAttributes,O=r.enabledAttributes,W=r.attributeDivisors;z[M]=1,O[M]===0&&(n.enableVertexAttribArray(M),O[M]=1),W[M]!==P&&(n.vertexAttribDivisor(M,P),W[M]=P)}function x(){const M=r.newAttributes,P=r.enabledAttributes;for(let z=0,O=P.length;z<O;z++)P[z]!==M[z]&&(n.disableVertexAttribArray(z),P[z]=0)}function T(M,P,z,O,W,Y,G){G===!0?n.vertexAttribIPointer(M,P,z,W,Y):n.vertexAttribPointer(M,P,z,O,W,Y)}function _(M,P,z,O){v();const W=O.attributes,Y=z.getAttributes(),G=P.defaultAttributeValues;for(const K in Y){const V=Y[K];if(V.location>=0){let st=W[K];if(st===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(st=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(st=M.instanceColor)),st!==void 0){const ut=st.normalized,Mt=st.itemSize,zt=t.get(st);if(zt===void 0)continue;const ee=zt.buffer,q=zt.type,tt=zt.bytesPerElement,_t=q===n.INT||q===n.UNSIGNED_INT||st.gpuType===Oa;if(st.isInterleavedBufferAttribute){const rt=st.data,At=rt.stride,Pt=st.offset;if(rt.isInstancedInterleavedBuffer){for(let Ot=0;Ot<V.locationSize;Ot++)p(V.location+Ot,rt.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ot=0;Ot<V.locationSize;Ot++)m(V.location+Ot);n.bindBuffer(n.ARRAY_BUFFER,ee);for(let Ot=0;Ot<V.locationSize;Ot++)T(V.location+Ot,Mt/V.locationSize,q,ut,At*tt,(Pt+Mt/V.locationSize*Ot)*tt,_t)}else{if(st.isInstancedBufferAttribute){for(let rt=0;rt<V.locationSize;rt++)p(V.location+rt,st.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let rt=0;rt<V.locationSize;rt++)m(V.location+rt);n.bindBuffer(n.ARRAY_BUFFER,ee);for(let rt=0;rt<V.locationSize;rt++)T(V.location+rt,Mt/V.locationSize,q,ut,Mt*tt,Mt/V.locationSize*rt*tt,_t)}}else if(G!==void 0){const ut=G[K];if(ut!==void 0)switch(ut.length){case 2:n.vertexAttrib2fv(V.location,ut);break;case 3:n.vertexAttrib3fv(V.location,ut);break;case 4:n.vertexAttrib4fv(V.location,ut);break;default:n.vertexAttrib1fv(V.location,ut)}}}}x()}function L(){R();for(const M in i){const P=i[M];for(const z in P){const O=P[z];for(const W in O)h(O[W].object),delete O[W];delete P[z]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const P=i[M.id];for(const z in P){const O=P[z];for(const W in O)h(O[W].object),delete O[W];delete P[z]}delete i[M.id]}function C(M){for(const P in i){const z=i[P];if(z[M.id]===void 0)continue;const O=z[M.id];for(const W in O)h(O[W].object),delete O[W];delete z[M.id]}}function R(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function Sf(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,i,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Ef(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==ri&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const R=C===rs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==bi&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Mi&&!R)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:T,maxFragmentUniforms:_,vertexTextures:L,maxSamples:A}}function Tf(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new Qi,o=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const x=r?0:i,T=x*4;let _=p.clippingState||null;l.value=_,_=h(g,f,T,d);for(let L=0;L!==T;++L)_[L]=e[L];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,_=d;T!==v;++T,_+=4)a.copy(u[T]).applyMatrix4(x,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function bf(n){let t=new WeakMap;function e(a,o){return o===ia?a.mapping=Un:o===na&&(a.mapping=Nn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ia||o===na)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nh(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class rc extends ic{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Rn=4,Uo=[.125,.215,.35,.446,.526,.582],nn=20,Cr=new rc,No=new Ft;let Rr=null,Pr=0,Lr=0,Dr=!1;const tn=(1+Math.sqrt(5))/2,Tn=1/tn,Fo=[new w(-tn,Tn,0),new w(tn,Tn,0),new w(-Tn,0,tn),new w(Tn,0,tn),new w(0,tn,-Tn),new w(0,tn,Tn),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class zo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Rr=this._renderer.getRenderTarget(),Pr=this._renderer.getActiveCubeFace(),Lr=this._renderer.getActiveMipmapLevel(),Dr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ko(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Rr,Pr,Lr),this._renderer.xr.enabled=Dr,t.scissorTest=!1,Rs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Un||t.mapping===Nn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Rr=this._renderer.getRenderTarget(),Pr=this._renderer.getActiveCubeFace(),Lr=this._renderer.getActiveMipmapLevel(),Dr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ui,minFilter:ui,generateMipmaps:!1,type:rs,format:ri,colorSpace:Bn,depthBuffer:!1},s=Oo(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oo(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wf(r)),this._blurMaterial=Af(r,t,e)}return s}_compileMaterial(t){const e=new ce(this._lodPlanes[0],t);this._renderer.compile(e,Cr)}_sceneToCubeUV(t,e,i,s){const o=new Oe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(No),h.toneMapping=zi,h.autoClear=!1;const d=new cn({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new ce(new de,d);let v=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(No),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):x===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const T=this._cubeSize;Rs(s,x*T,p>2?T:0,T,T),h.setRenderTarget(s),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Un||t.mapping===Nn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ko()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ce(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Rs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Cr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Fo[(s-r-1)%Fo.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ce(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*nn-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):nn;m>nn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${nn}`);const p=[];let x=0;for(let C=0;C<nn;++C){const R=C/v,E=Math.exp(-R*R/2);p.push(E),C===0?x+=E:C<m&&(x+=2*E)}for(let C=0;C<p.length;C++)p[C]=p[C]/x;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:T}=this;f.dTheta.value=g,f.mipInt.value=T-i;const _=this._sizeLods[s],L=3*_*(s>T-Rn?s-T+Rn:0),A=4*(this._cubeSize-_);Rs(e,L,A,3*_,2*_),l.setRenderTarget(e),l.render(u,Cr)}}function wf(n){const t=[],e=[],i=[];let s=n;const r=n-Rn+1+Uo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Rn?l=Uo[a-n+Rn-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,x=new Float32Array(v*g*d),T=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let A=0;A<d;A++){const C=A%3*2/3-1,R=A>2?0:-1,E=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];x.set(E,v*g*A),T.set(f,m*g*A);const M=[A,A,A,A,A,A];_.set(M,p*g*A)}const L=new Te;L.setAttribute("position",new We(x,v)),L.setAttribute("uv",new We(T,m)),L.setAttribute("faceIndex",new We(_,p)),t.push(L),s>Rn&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Oo(n,t,e){const i=new ln(n,t,e);return i.texture.mapping=tr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Rs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Af(n,t,e){const i=new Float32Array(nn),s=new w(0,1,0);return new Hi({name:"SphericalGaussianBlur",defines:{n:nn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Bo(){return new Hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function ko(){return new Hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function qa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Cf(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ia||l===na,h=l===Un||l===Nn;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new zo(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new zo(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Rf(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&ts("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Pf(n,t,e,i){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const v=d[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],n.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(d!==null){const x=d.array;v=d.version;for(let T=0,_=x.length;T<_;T+=3){const L=x[T+0],A=x[T+1],C=x[T+2];f.push(L,A,A,C,C,L)}}else if(g!==void 0){const x=g.array;v=g.version;for(let T=0,_=x.length/3-1;T<_;T+=3){const L=T+0,A=T+1,C=T+2;f.push(L,A,A,C,C,L)}}else return;const m=new($l(f)?tc:Ql)(f,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Lf(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*a),e.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,f*a,g),e.update(d,i,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function u(f,d,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,v,0,g);let p=0;for(let x=0;x<g;x++)p+=d[x]*v[x];e.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Df(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function If(n,t,e){const i=new WeakMap,s=new te;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(o);if(f===void 0||f.count!==u){let M=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let L=o.attributes.position.count*_,A=1;L>t.maxTextureSize&&(A=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const C=new Float32Array(L*A*4*u),R=new Kl(C,L,A,u);R.type=Mi,R.needsUpdate=!0;const E=_*4;for(let P=0;P<u;P++){const z=p[P],O=x[P],W=T[P],Y=L*A*4*P;for(let G=0;G<z.count;G++){const K=G*E;g===!0&&(s.fromBufferAttribute(z,G),C[Y+K+0]=s.x,C[Y+K+1]=s.y,C[Y+K+2]=s.z,C[Y+K+3]=0),v===!0&&(s.fromBufferAttribute(O,G),C[Y+K+4]=s.x,C[Y+K+5]=s.y,C[Y+K+6]=s.z,C[Y+K+7]=0),m===!0&&(s.fromBufferAttribute(W,G),C[Y+K+8]=s.x,C[Y+K+9]=s.y,C[Y+K+10]=s.z,C[Y+K+11]=W.itemSize===4?s.w:1)}}f={count:u,texture:R,size:new ct(L,A)},i.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Uf(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class ac extends Fe{constructor(t,e,i,s,r,a,o,l,c,h=Ln){if(h!==Ln&&h!==zn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ln&&(i=on),i===void 0&&h===zn&&(i=Fn),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ai,this.minFilter=l!==void 0?l:ai,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const oc=new Fe,Ho=new ac(1,1),lc=new Kl,cc=new xh,hc=new nc,Vo=[],Go=[],Wo=new Float32Array(16),Xo=new Float32Array(9),qo=new Float32Array(4);function Hn(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Vo[s];if(r===void 0&&(r=new Float32Array(s),Vo[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function xe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ye(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ir(n,t){let e=Go[t];e===void 0&&(e=new Int32Array(t),Go[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Nf(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Ff(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2fv(this.addr,t),ye(e,t)}}function zf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;n.uniform3fv(this.addr,t),ye(e,t)}}function Of(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4fv(this.addr,t),ye(e,t)}}function Bf(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,i))return;qo.set(i),n.uniformMatrix2fv(this.addr,!1,qo),ye(e,i)}}function kf(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,i))return;Xo.set(i),n.uniformMatrix3fv(this.addr,!1,Xo),ye(e,i)}}function Hf(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,i))return;Wo.set(i),n.uniformMatrix4fv(this.addr,!1,Wo),ye(e,i)}}function Vf(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Gf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2iv(this.addr,t),ye(e,t)}}function Wf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;n.uniform3iv(this.addr,t),ye(e,t)}}function Xf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4iv(this.addr,t),ye(e,t)}}function qf(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Yf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2uiv(this.addr,t),ye(e,t)}}function $f(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;n.uniform3uiv(this.addr,t),ye(e,t)}}function Zf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4uiv(this.addr,t),ye(e,t)}}function Kf(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ho.compareFunction=Yl,r=Ho):r=oc,e.setTexture2D(t||r,s)}function Jf(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||cc,s)}function jf(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||hc,s)}function Qf(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||lc,s)}function tp(n){switch(n){case 5126:return Nf;case 35664:return Ff;case 35665:return zf;case 35666:return Of;case 35674:return Bf;case 35675:return kf;case 35676:return Hf;case 5124:case 35670:return Vf;case 35667:case 35671:return Gf;case 35668:case 35672:return Wf;case 35669:case 35673:return Xf;case 5125:return qf;case 36294:return Yf;case 36295:return $f;case 36296:return Zf;case 35678:case 36198:case 36298:case 36306:case 35682:return Kf;case 35679:case 36299:case 36307:return Jf;case 35680:case 36300:case 36308:case 36293:return jf;case 36289:case 36303:case 36311:case 36292:return Qf}}function ep(n,t){n.uniform1fv(this.addr,t)}function ip(n,t){const e=Hn(t,this.size,2);n.uniform2fv(this.addr,e)}function np(n,t){const e=Hn(t,this.size,3);n.uniform3fv(this.addr,e)}function sp(n,t){const e=Hn(t,this.size,4);n.uniform4fv(this.addr,e)}function rp(n,t){const e=Hn(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function ap(n,t){const e=Hn(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function op(n,t){const e=Hn(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function lp(n,t){n.uniform1iv(this.addr,t)}function cp(n,t){n.uniform2iv(this.addr,t)}function hp(n,t){n.uniform3iv(this.addr,t)}function up(n,t){n.uniform4iv(this.addr,t)}function dp(n,t){n.uniform1uiv(this.addr,t)}function fp(n,t){n.uniform2uiv(this.addr,t)}function pp(n,t){n.uniform3uiv(this.addr,t)}function mp(n,t){n.uniform4uiv(this.addr,t)}function gp(n,t,e){const i=this.cache,s=t.length,r=ir(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||oc,r[a])}function vp(n,t,e){const i=this.cache,s=t.length,r=ir(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||cc,r[a])}function _p(n,t,e){const i=this.cache,s=t.length,r=ir(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||hc,r[a])}function xp(n,t,e){const i=this.cache,s=t.length,r=ir(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||lc,r[a])}function yp(n){switch(n){case 5126:return ep;case 35664:return ip;case 35665:return np;case 35666:return sp;case 35674:return rp;case 35675:return ap;case 35676:return op;case 5124:case 35670:return lp;case 35667:case 35671:return cp;case 35668:case 35672:return hp;case 35669:case 35673:return up;case 5125:return dp;case 36294:return fp;case 36295:return pp;case 36296:return mp;case 35678:case 36198:case 36298:case 36306:case 35682:return gp;case 35679:case 36299:case 36307:return vp;case 35680:case 36300:case 36308:case 36293:return _p;case 36289:case 36303:case 36311:case 36292:return xp}}class Mp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=tp(e.type)}}class Sp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=yp(e.type)}}class Ep{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const Ir=/(\w+)(\])?(\[|\.)?/g;function Yo(n,t){n.seq.push(t),n.map[t.id]=t}function Tp(n,t,e){const i=n.name,s=i.length;for(Ir.lastIndex=0;;){const r=Ir.exec(i),a=Ir.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Yo(e,c===void 0?new Mp(o,n,t):new Sp(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new Ep(o),Yo(e,u)),e=u}}}class Xs{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Tp(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function $o(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const bp=37297;let wp=0;function Ap(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Zo=new It;function Cp(n){qt._getMatrix(Zo,qt.workingColorSpace,n);const t=`mat3( ${Zo.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(n)){case er:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Ko(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Ap(n.getShaderSource(t),a)}else return s}function Rp(n,t){const e=Cp(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Pp(n,t){let e;switch(t){case Yc:e="Linear";break;case $c:e="Reinhard";break;case Zc:e="Cineon";break;case Ul:e="ACESFilmic";break;case Jc:e="AgX";break;case jc:e="Neutral";break;case Kc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ps=new w;function Lp(){qt.getLuminanceCoefficients(Ps);const n=Ps.x.toFixed(4),t=Ps.y.toFixed(4),e=Ps.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dp(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(es).join(`
`)}function Ip(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Up(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function es(n){return n!==""}function Jo(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jo(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Np=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ia(n){return n.replace(Np,zp)}const Fp=new Map;function zp(n,t){let e=Nt[t];if(e===void 0){const i=Fp.get(t);if(i!==void 0)e=Nt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ia(e)}const Op=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qo(n){return n.replace(Op,Bp)}function Bp(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function kp(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ll?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Dl?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===yi&&(t="SHADOWMAP_TYPE_VSM"),t}function Hp(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Un:case Nn:t="ENVMAP_TYPE_CUBE";break;case tr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Vp(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Nn:t="ENVMAP_MODE_REFRACTION";break}return t}function Gp(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Il:t="ENVMAP_BLENDING_MULTIPLY";break;case Xc:t="ENVMAP_BLENDING_MIX";break;case qc:t="ENVMAP_BLENDING_ADD";break}return t}function Wp(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Xp(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=kp(e),c=Hp(e),h=Vp(e),u=Gp(e),f=Wp(e),d=Dp(e),g=Ip(r),v=s.createProgram();let m,p,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(es).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(es).join(`
`),p.length>0&&(p+=`
`)):(m=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(es).join(`
`),p=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zi?"#define TONE_MAPPING":"",e.toneMapping!==zi?Nt.tonemapping_pars_fragment:"",e.toneMapping!==zi?Pp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,Rp("linearToOutputTexel",e.outputColorSpace),Lp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(es).join(`
`)),a=Ia(a),a=Jo(a,e),a=jo(a,e),o=Ia(o),o=Jo(o,e),o=jo(o,e),a=Qo(a),o=Qo(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===fo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=x+m+a,_=x+p+o,L=$o(s,s.VERTEX_SHADER,T),A=$o(s,s.FRAGMENT_SHADER,_);s.attachShader(v,L),s.attachShader(v,A),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(P){if(n.debug.checkShaderErrors){const z=s.getProgramInfoLog(v).trim(),O=s.getShaderInfoLog(L).trim(),W=s.getShaderInfoLog(A).trim();let Y=!0,G=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,L,A);else{const K=Ko(s,L,"vertex"),V=Ko(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+K+`
`+V)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||W==="")&&(G=!1);G&&(P.diagnostics={runnable:Y,programLog:z,vertexShader:{log:O,prefix:m},fragmentShader:{log:W,prefix:p}})}s.deleteShader(L),s.deleteShader(A),R=new Xs(s,v),E=Up(s,v)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,bp)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=wp++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=A,this}let qp=0;class Yp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new $p(t),e.set(t,i)),i}}class $p{constructor(t){this.id=qp++,this.code=t,this.usedTimes=0}}function Zp(n,t,e,i,s,r,a){const o=new Jl,l=new Yp,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,M,P,z,O){const W=z.fog,Y=O.geometry,G=E.isMeshStandardMaterial?z.environment:null,K=(E.isMeshStandardMaterial?e:t).get(E.envMap||G),V=K&&K.mapping===tr?K.image.height:null,st=g[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const ut=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Mt=ut!==void 0?ut.length:0;let zt=0;Y.morphAttributes.position!==void 0&&(zt=1),Y.morphAttributes.normal!==void 0&&(zt=2),Y.morphAttributes.color!==void 0&&(zt=3);let ee,q,tt,_t;if(st){const Jt=li[st];ee=Jt.vertexShader,q=Jt.fragmentShader}else ee=E.vertexShader,q=E.fragmentShader,l.update(E),tt=l.getVertexShaderID(E),_t=l.getFragmentShaderID(E);const rt=n.getRenderTarget(),At=n.state.buffers.depth.getReversed(),Pt=O.isInstancedMesh===!0,Ot=O.isBatchedMesh===!0,fe=!!E.map,Wt=!!E.matcap,me=!!K,N=!!E.aoMap,Xe=!!E.lightMap,kt=!!E.bumpMap,Ht=!!E.normalMap,bt=!!E.displacementMap,re=!!E.emissiveMap,Tt=!!E.metalnessMap,b=!!E.roughnessMap,y=E.anisotropy>0,F=E.clearcoat>0,$=E.dispersion>0,J=E.iridescence>0,X=E.sheen>0,xt=E.transmission>0,at=y&&!!E.anisotropyMap,dt=F&&!!E.clearcoatMap,Xt=F&&!!E.clearcoatNormalMap,j=F&&!!E.clearcoatRoughnessMap,ft=J&&!!E.iridescenceMap,wt=J&&!!E.iridescenceThicknessMap,Ct=X&&!!E.sheenColorMap,pt=X&&!!E.sheenRoughnessMap,Vt=!!E.specularMap,Ut=!!E.specularColorMap,ne=!!E.specularIntensityMap,D=xt&&!!E.transmissionMap,nt=xt&&!!E.thicknessMap,H=!!E.gradientMap,Z=!!E.alphaMap,ht=E.alphaTest>0,ot=!!E.alphaHash,Lt=!!E.extensions;let pe=zi;E.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(pe=n.toneMapping);const Ce={shaderID:st,shaderType:E.type,shaderName:E.name,vertexShader:ee,fragmentShader:q,defines:E.defines,customVertexShaderID:tt,customFragmentShaderID:_t,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:Ot,batchingColor:Ot&&O._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&O.instanceColor!==null,instancingMorph:Pt&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?n.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Bn,alphaToCoverage:!!E.alphaToCoverage,map:fe,matcap:Wt,envMap:me,envMapMode:me&&K.mapping,envMapCubeUVHeight:V,aoMap:N,lightMap:Xe,bumpMap:kt,normalMap:Ht,displacementMap:f&&bt,emissiveMap:re,normalMapObjectSpace:Ht&&E.normalMapType===ih,normalMapTangentSpace:Ht&&E.normalMapType===ql,metalnessMap:Tt,roughnessMap:b,anisotropy:y,anisotropyMap:at,clearcoat:F,clearcoatMap:dt,clearcoatNormalMap:Xt,clearcoatRoughnessMap:j,dispersion:$,iridescence:J,iridescenceMap:ft,iridescenceThicknessMap:wt,sheen:X,sheenColorMap:Ct,sheenRoughnessMap:pt,specularMap:Vt,specularColorMap:Ut,specularIntensityMap:ne,transmission:xt,transmissionMap:D,thicknessMap:nt,gradientMap:H,opaque:E.transparent===!1&&E.blending===Pn&&E.alphaToCoverage===!1,alphaMap:Z,alphaTest:ht,alphaHash:ot,combine:E.combine,mapUv:fe&&v(E.map.channel),aoMapUv:N&&v(E.aoMap.channel),lightMapUv:Xe&&v(E.lightMap.channel),bumpMapUv:kt&&v(E.bumpMap.channel),normalMapUv:Ht&&v(E.normalMap.channel),displacementMapUv:bt&&v(E.displacementMap.channel),emissiveMapUv:re&&v(E.emissiveMap.channel),metalnessMapUv:Tt&&v(E.metalnessMap.channel),roughnessMapUv:b&&v(E.roughnessMap.channel),anisotropyMapUv:at&&v(E.anisotropyMap.channel),clearcoatMapUv:dt&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:Xt&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:wt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:pt&&v(E.sheenRoughnessMap.channel),specularMapUv:Vt&&v(E.specularMap.channel),specularColorMapUv:Ut&&v(E.specularColorMap.channel),specularIntensityMapUv:ne&&v(E.specularIntensityMap.channel),transmissionMapUv:D&&v(E.transmissionMap.channel),thicknessMapUv:nt&&v(E.thicknessMap.channel),alphaMapUv:Z&&v(E.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Ht||y),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!Y.attributes.uv&&(fe||Z),fog:!!W,useFog:E.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:At,skinning:O.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:zt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:pe,decodeVideoTexture:fe&&E.map.isVideoTexture===!0&&qt.getTransfer(E.map.colorSpace)===jt,decodeVideoTextureEmissive:re&&E.emissiveMap.isVideoTexture===!0&&qt.getTransfer(E.emissiveMap.colorSpace)===jt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ke,flipSided:E.side===Ne,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Lt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&E.extensions.multiDraw===!0||Ot)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function p(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)M.push(P),M.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(x(M,E),T(M,E),M.push(n.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function x(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function T(E,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),E.push(o.mask)}function _(E){const M=g[E.type];let P;if(M){const z=li[M];P=Lh.clone(z.uniforms)}else P=E.uniforms;return P}function L(E,M){let P;for(let z=0,O=h.length;z<O;z++){const W=h[z];if(W.cacheKey===M){P=W,++P.usedTimes;break}}return P===void 0&&(P=new Xp(n,M,E,r),h.push(P)),P}function A(E){if(--E.usedTimes===0){const M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function C(E){l.remove(E)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:L,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:R}}function Kp(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Jp(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function el(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function il(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,d,g,v,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||Jp),i.length>1&&i.sort(f||el),s.length>1&&s.sort(f||el)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function jp(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new il,n.set(i,[a])):s>=r.length?(a=new il,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Qp(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new w,color:new Ft};break;case"SpotLight":e={position:new w,direction:new w,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new w,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new w,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new w,halfWidth:new w,halfHeight:new w};break}return n[t.id]=e,e}}}function tm(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let em=0;function im(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function nm(n){const t=new Qp,e=tm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new w);const s=new w,r=new Gt,a=new Gt;function o(c){let h=0,u=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,x=0,T=0,_=0,L=0,A=0,C=0;c.sort(im);for(let E=0,M=c.length;E<M;E++){const P=c[E],z=P.color,O=P.intensity,W=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=z.r*O,u+=z.g*O,f+=z.b*O;else if(P.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(P.sh.coefficients[G],O);C++}else if(P.isDirectionalLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,V=e.get(P);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,i.directionalShadow[d]=V,i.directionalShadowMap[d]=Y,i.directionalShadowMatrix[d]=P.shadow.matrix,x++}i.directional[d]=G,d++}else if(P.isSpotLight){const G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(z).multiplyScalar(O),G.distance=W,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,i.spot[v]=G;const K=P.shadow;if(P.map&&(i.spotLightMap[L]=P.map,L++,K.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[v]=K.matrix,P.castShadow){const V=e.get(P);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,i.spotShadow[v]=V,i.spotShadowMap[v]=Y,_++}v++}else if(P.isRectAreaLight){const G=t.get(P);G.color.copy(z).multiplyScalar(O),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=G,m++}else if(P.isPointLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){const K=P.shadow,V=e.get(P);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=Y,i.pointShadowMatrix[g]=P.shadow.matrix,T++}i.point[g]=G,g++}else if(P.isHemisphereLight){const G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(O),G.groundColor.copy(P.groundColor).multiplyScalar(O),i.hemi[p]=G,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=it.LTC_FLOAT_1,i.rectAreaLTC2=it.LTC_FLOAT_2):(i.rectAreaLTC1=it.LTC_HALF_1,i.rectAreaLTC2=it.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const R=i.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==x||R.numPointShadows!==T||R.numSpotShadows!==_||R.numSpotMaps!==L||R.numLightProbes!==C)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=_+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,R.directionalLength=d,R.pointLength=g,R.spotLength=v,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=x,R.numPointShadows=T,R.numSpotShadows=_,R.numSpotMaps=L,R.numLightProbes=C,i.version=em++)}function l(c,h){let u=0,f=0,d=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const T=c[p];if(T.isDirectionalLight){const _=i.directional[u];_.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(T.isSpotLight){const _=i.spot[d];_.position.setFromMatrixPosition(T.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(T.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(T.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(T.width*.5,0,0),_.halfHeight.set(0,T.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const _=i.point[f];_.position.setFromMatrixPosition(T.matrixWorld),_.position.applyMatrix4(m),f++}else if(T.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(T.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function nl(n){const t=new nm(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function sm(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new nl(n),t.set(s,[o])):r>=a.length?(o=new nl(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class rm extends Gi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class am extends Gi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const om=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function cm(n,t,e){let i=new Xa;const s=new ct,r=new ct,a=new te,o=new rm({depthPacking:eh}),l=new am,c={},h=e.maxTextureSize,u={[Bi]:Ne,[Ne]:Bi,[Ke]:Ke},f=new Hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:om,fragmentShader:lm}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Te;g.setAttribute("position",new We(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ce(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ll;let p=this.type;this.render=function(A,C,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),M=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),z=n.state;z.setBlending(Fi),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const O=p!==yi&&this.type===yi,W=p===yi&&this.type!==yi;for(let Y=0,G=A.length;Y<G;Y++){const K=A[Y],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const st=V.getFrameExtents();if(s.multiply(st),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,V.mapSize.y=r.y)),V.map===null||O===!0||W===!0){const Mt=this.type!==yi?{minFilter:ai,magFilter:ai}:{};V.map!==null&&V.map.dispose(),V.map=new ln(s.x,s.y,Mt),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const ut=V.getViewportCount();for(let Mt=0;Mt<ut;Mt++){const zt=V.getViewport(Mt);a.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),z.viewport(a),V.updateMatrices(K,Mt),i=V.getFrustum(),_(C,R,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===yi&&x(V,R),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,M,P)};function x(A,C){const R=t.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ln(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(C,null,R,f,v,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(C,null,R,d,v,null)}function T(A,C,R,E){let M=null;const P=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)M=P;else if(M=R.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const z=M.uuid,O=C.uuid;let W=c[z];W===void 0&&(W={},c[z]=W);let Y=W[O];Y===void 0&&(Y=M.clone(),W[O]=Y,C.addEventListener("dispose",L)),M=Y}if(M.visible=C.visible,M.wireframe=C.wireframe,E===yi?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=n.properties.get(M);z.light=R}return M}function _(A,C,R,E,M){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===yi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);const O=t.update(A),W=A.material;if(Array.isArray(W)){const Y=O.groups;for(let G=0,K=Y.length;G<K;G++){const V=Y[G],st=W[V.materialIndex];if(st&&st.visible){const ut=T(A,st,E,M);A.onBeforeShadow(n,A,C,R,O,ut,V),n.renderBufferDirect(R,null,O,ut,A,V),A.onAfterShadow(n,A,C,R,O,ut,V)}}}else if(W.visible){const Y=T(A,W,E,M);A.onBeforeShadow(n,A,C,R,O,Y,null),n.renderBufferDirect(R,null,O,Y,A,null),A.onAfterShadow(n,A,C,R,O,Y,null)}}const z=A.children;for(let O=0,W=z.length;O<W;O++)_(z[O],C,R,E,M)}function L(A){A.target.removeEventListener("dispose",L);for(const R in c){const E=c[R],M=A.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}const hm={[Zr]:Kr,[Jr]:ta,[jr]:ea,[In]:Qr,[Kr]:Zr,[ta]:Jr,[ea]:jr,[Qr]:In};function um(n,t){function e(){let D=!1;const nt=new te;let H=null;const Z=new te(0,0,0,0);return{setMask:function(ht){H!==ht&&!D&&(n.colorMask(ht,ht,ht,ht),H=ht)},setLocked:function(ht){D=ht},setClear:function(ht,ot,Lt,pe,Ce){Ce===!0&&(ht*=pe,ot*=pe,Lt*=pe),nt.set(ht,ot,Lt,pe),Z.equals(nt)===!1&&(n.clearColor(ht,ot,Lt,pe),Z.copy(nt))},reset:function(){D=!1,H=null,Z.set(-1,0,0,0)}}}function i(){let D=!1,nt=!1,H=null,Z=null,ht=null;return{setReversed:function(ot){if(nt!==ot){const Lt=t.get("EXT_clip_control");nt?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT);const pe=ht;ht=null,this.setClear(pe)}nt=ot},getReversed:function(){return nt},setTest:function(ot){ot?rt(n.DEPTH_TEST):At(n.DEPTH_TEST)},setMask:function(ot){H!==ot&&!D&&(n.depthMask(ot),H=ot)},setFunc:function(ot){if(nt&&(ot=hm[ot]),Z!==ot){switch(ot){case Zr:n.depthFunc(n.NEVER);break;case Kr:n.depthFunc(n.ALWAYS);break;case Jr:n.depthFunc(n.LESS);break;case In:n.depthFunc(n.LEQUAL);break;case jr:n.depthFunc(n.EQUAL);break;case Qr:n.depthFunc(n.GEQUAL);break;case ta:n.depthFunc(n.GREATER);break;case ea:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=ot}},setLocked:function(ot){D=ot},setClear:function(ot){ht!==ot&&(nt&&(ot=1-ot),n.clearDepth(ot),ht=ot)},reset:function(){D=!1,H=null,Z=null,ht=null,nt=!1}}}function s(){let D=!1,nt=null,H=null,Z=null,ht=null,ot=null,Lt=null,pe=null,Ce=null;return{setTest:function(Jt){D||(Jt?rt(n.STENCIL_TEST):At(n.STENCIL_TEST))},setMask:function(Jt){nt!==Jt&&!D&&(n.stencilMask(Jt),nt=Jt)},setFunc:function(Jt,Qe,fi){(H!==Jt||Z!==Qe||ht!==fi)&&(n.stencilFunc(Jt,Qe,fi),H=Jt,Z=Qe,ht=fi)},setOp:function(Jt,Qe,fi){(ot!==Jt||Lt!==Qe||pe!==fi)&&(n.stencilOp(Jt,Qe,fi),ot=Jt,Lt=Qe,pe=fi)},setLocked:function(Jt){D=Jt},setClear:function(Jt){Ce!==Jt&&(n.clearStencil(Jt),Ce=Jt)},reset:function(){D=!1,nt=null,H=null,Z=null,ht=null,ot=null,Lt=null,pe=null,Ce=null}}}const r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,x=null,T=null,_=null,L=null,A=null,C=new Ft(0,0,0),R=0,E=!1,M=null,P=null,z=null,O=null,W=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,K=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=K>=2);let st=null,ut={};const Mt=n.getParameter(n.SCISSOR_BOX),zt=n.getParameter(n.VIEWPORT),ee=new te().fromArray(Mt),q=new te().fromArray(zt);function tt(D,nt,H,Z){const ht=new Uint8Array(4),ot=n.createTexture();n.bindTexture(D,ot),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<H;Lt++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(nt,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,ht):n.texImage2D(nt+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ht);return ot}const _t={};_t[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),_t[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),_t[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(n.DEPTH_TEST),a.setFunc(In),kt(!1),Ht(lo),rt(n.CULL_FACE),N(Fi);function rt(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function At(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Pt(D,nt){return u[D]!==nt?(n.bindFramebuffer(D,nt),u[D]=nt,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=nt),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=nt),!0):!1}function Ot(D,nt){let H=d,Z=!1;if(D){H=f.get(nt),H===void 0&&(H=[],f.set(nt,H));const ht=D.textures;if(H.length!==ht.length||H[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,Lt=ht.length;ot<Lt;ot++)H[ot]=n.COLOR_ATTACHMENT0+ot;H.length=ht.length,Z=!0}}else H[0]!==n.BACK&&(H[0]=n.BACK,Z=!0);Z&&n.drawBuffers(H)}function fe(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const Wt={[en]:n.FUNC_ADD,[Cc]:n.FUNC_SUBTRACT,[Rc]:n.FUNC_REVERSE_SUBTRACT};Wt[Pc]=n.MIN,Wt[Lc]=n.MAX;const me={[Dc]:n.ZERO,[Ic]:n.ONE,[Uc]:n.SRC_COLOR,[Yr]:n.SRC_ALPHA,[kc]:n.SRC_ALPHA_SATURATE,[Oc]:n.DST_COLOR,[Fc]:n.DST_ALPHA,[Nc]:n.ONE_MINUS_SRC_COLOR,[$r]:n.ONE_MINUS_SRC_ALPHA,[Bc]:n.ONE_MINUS_DST_COLOR,[zc]:n.ONE_MINUS_DST_ALPHA,[Hc]:n.CONSTANT_COLOR,[Vc]:n.ONE_MINUS_CONSTANT_COLOR,[Gc]:n.CONSTANT_ALPHA,[Wc]:n.ONE_MINUS_CONSTANT_ALPHA};function N(D,nt,H,Z,ht,ot,Lt,pe,Ce,Jt){if(D===Fi){v===!0&&(At(n.BLEND),v=!1);return}if(v===!1&&(rt(n.BLEND),v=!0),D!==Ac){if(D!==m||Jt!==E){if((p!==en||_!==en)&&(n.blendEquation(n.FUNC_ADD),p=en,_=en),Jt)switch(D){case Pn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ki:n.blendFunc(n.ONE,n.ONE);break;case co:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ho:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Pn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ki:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case co:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ho:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}x=null,T=null,L=null,A=null,C.set(0,0,0),R=0,m=D,E=Jt}return}ht=ht||nt,ot=ot||H,Lt=Lt||Z,(nt!==p||ht!==_)&&(n.blendEquationSeparate(Wt[nt],Wt[ht]),p=nt,_=ht),(H!==x||Z!==T||ot!==L||Lt!==A)&&(n.blendFuncSeparate(me[H],me[Z],me[ot],me[Lt]),x=H,T=Z,L=ot,A=Lt),(pe.equals(C)===!1||Ce!==R)&&(n.blendColor(pe.r,pe.g,pe.b,Ce),C.copy(pe),R=Ce),m=D,E=!1}function Xe(D,nt){D.side===Ke?At(n.CULL_FACE):rt(n.CULL_FACE);let H=D.side===Ne;nt&&(H=!H),kt(H),D.blending===Pn&&D.transparent===!1?N(Fi):N(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const Z=D.stencilWrite;o.setTest(Z),Z&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),re(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?rt(n.SAMPLE_ALPHA_TO_COVERAGE):At(n.SAMPLE_ALPHA_TO_COVERAGE)}function kt(D){M!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),M=D)}function Ht(D){D!==bc?(rt(n.CULL_FACE),D!==P&&(D===lo?n.cullFace(n.BACK):D===wc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):At(n.CULL_FACE),P=D}function bt(D){D!==z&&(G&&n.lineWidth(D),z=D)}function re(D,nt,H){D?(rt(n.POLYGON_OFFSET_FILL),(O!==nt||W!==H)&&(n.polygonOffset(nt,H),O=nt,W=H)):At(n.POLYGON_OFFSET_FILL)}function Tt(D){D?rt(n.SCISSOR_TEST):At(n.SCISSOR_TEST)}function b(D){D===void 0&&(D=n.TEXTURE0+Y-1),st!==D&&(n.activeTexture(D),st=D)}function y(D,nt,H){H===void 0&&(st===null?H=n.TEXTURE0+Y-1:H=st);let Z=ut[H];Z===void 0&&(Z={type:void 0,texture:void 0},ut[H]=Z),(Z.type!==D||Z.texture!==nt)&&(st!==H&&(n.activeTexture(H),st=H),n.bindTexture(D,nt||_t[D]),Z.type=D,Z.texture=nt)}function F(){const D=ut[st];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function $(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Xt(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ft(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function wt(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(D){ee.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),ee.copy(D))}function pt(D){q.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),q.copy(D))}function Vt(D,nt){let H=c.get(nt);H===void 0&&(H=new WeakMap,c.set(nt,H));let Z=H.get(D);Z===void 0&&(Z=n.getUniformBlockIndex(nt,D.name),H.set(D,Z))}function Ut(D,nt){const Z=c.get(nt).get(D);l.get(nt)!==Z&&(n.uniformBlockBinding(nt,Z,D.__bindingPointIndex),l.set(nt,Z))}function ne(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},st=null,ut={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,x=null,T=null,_=null,L=null,A=null,C=new Ft(0,0,0),R=0,E=!1,M=null,P=null,z=null,O=null,W=null,ee.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:At,bindFramebuffer:Pt,drawBuffers:Ot,useProgram:fe,setBlending:N,setMaterial:Xe,setFlipSided:kt,setCullFace:Ht,setLineWidth:bt,setPolygonOffset:re,setScissorTest:Tt,activeTexture:b,bindTexture:y,unbindTexture:F,compressedTexImage2D:$,compressedTexImage3D:J,texImage2D:ft,texImage3D:wt,updateUBOMapping:Vt,uniformBlockBinding:Ut,texStorage2D:Xt,texStorage3D:j,texSubImage2D:X,texSubImage3D:xt,compressedTexSubImage2D:at,compressedTexSubImage3D:dt,scissor:Ct,viewport:pt,reset:ne}}function sl(n,t,e,i){const s=dm(i);switch(e){case Bl:return n*t;case Hl:return n*t;case Vl:return n*t*2;case Gl:return n*t/s.components*s.byteLength;case Ha:return n*t/s.components*s.byteLength;case Wl:return n*t*2/s.components*s.byteLength;case Va:return n*t*2/s.components*s.byteLength;case kl:return n*t*3/s.components*s.byteLength;case ri:return n*t*4/s.components*s.byteLength;case Ga:return n*t*4/s.components*s.byteLength;case ks:case Hs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Vs:case Gs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case aa:case la:return Math.max(n,16)*Math.max(t,8)/4;case ra:case oa:return Math.max(n,8)*Math.max(t,8)/2;case ca:case ha:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ua:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case da:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case fa:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case pa:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ma:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ga:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case va:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case _a:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case xa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ya:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Sa:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ea:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ba:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ws:case wa:case Aa:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Xl:case Ca:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ra:case Pa:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function dm(n){switch(n){case bi:case Fl:return{byteLength:1,components:1};case ss:case zl:case rs:return{byteLength:2,components:1};case Ba:case ka:return{byteLength:2,components:4};case on:case Oa:case Mi:return{byteLength:4,components:1};case Ol:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function fm(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,y){return d?new OffscreenCanvas(b,y):Zs("canvas")}function v(b,y,F){let $=1;const J=Tt(b);if((J.width>F||J.height>F)&&($=F/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const X=Math.floor($*J.width),xt=Math.floor($*J.height);u===void 0&&(u=g(X,xt));const at=y?g(X,xt):u;return at.width=X,at.height=xt,at.getContext("2d").drawImage(b,0,0,X,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+X+"x"+xt+")."),at}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){n.generateMipmap(b)}function x(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(b,y,F,$,J=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let X=y;if(y===n.RED&&(F===n.FLOAT&&(X=n.R32F),F===n.HALF_FLOAT&&(X=n.R16F),F===n.UNSIGNED_BYTE&&(X=n.R8)),y===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.R8UI),F===n.UNSIGNED_SHORT&&(X=n.R16UI),F===n.UNSIGNED_INT&&(X=n.R32UI),F===n.BYTE&&(X=n.R8I),F===n.SHORT&&(X=n.R16I),F===n.INT&&(X=n.R32I)),y===n.RG&&(F===n.FLOAT&&(X=n.RG32F),F===n.HALF_FLOAT&&(X=n.RG16F),F===n.UNSIGNED_BYTE&&(X=n.RG8)),y===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RG8UI),F===n.UNSIGNED_SHORT&&(X=n.RG16UI),F===n.UNSIGNED_INT&&(X=n.RG32UI),F===n.BYTE&&(X=n.RG8I),F===n.SHORT&&(X=n.RG16I),F===n.INT&&(X=n.RG32I)),y===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RGB8UI),F===n.UNSIGNED_SHORT&&(X=n.RGB16UI),F===n.UNSIGNED_INT&&(X=n.RGB32UI),F===n.BYTE&&(X=n.RGB8I),F===n.SHORT&&(X=n.RGB16I),F===n.INT&&(X=n.RGB32I)),y===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),F===n.UNSIGNED_INT&&(X=n.RGBA32UI),F===n.BYTE&&(X=n.RGBA8I),F===n.SHORT&&(X=n.RGBA16I),F===n.INT&&(X=n.RGBA32I)),y===n.RGB&&F===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),y===n.RGBA){const xt=J?er:qt.getTransfer($);F===n.FLOAT&&(X=n.RGBA32F),F===n.HALF_FLOAT&&(X=n.RGBA16F),F===n.UNSIGNED_BYTE&&(X=xt===jt?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function _(b,y){let F;return b?y===null||y===on||y===Fn?F=n.DEPTH24_STENCIL8:y===Mi?F=n.DEPTH32F_STENCIL8:y===ss&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===on||y===Fn?F=n.DEPTH_COMPONENT24:y===Mi?F=n.DEPTH_COMPONENT32F:y===ss&&(F=n.DEPTH_COMPONENT16),F}function L(b,y){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==ai&&b.minFilter!==ui?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function A(b){const y=b.target;y.removeEventListener("dispose",A),R(y),y.isVideoTexture&&h.delete(y)}function C(b){const y=b.target;y.removeEventListener("dispose",C),M(y)}function R(b){const y=i.get(b);if(y.__webglInit===void 0)return;const F=b.source,$=f.get(F);if($){const J=$[y.__cacheKey];J.usedTimes--,J.usedTimes===0&&E(b),Object.keys($).length===0&&f.delete(F)}i.remove(b)}function E(b){const y=i.get(b);n.deleteTexture(y.__webglTexture);const F=b.source,$=f.get(F);delete $[y.__cacheKey],a.memory.textures--}function M(b){const y=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(y.__webglFramebuffer[$]))for(let J=0;J<y.__webglFramebuffer[$].length;J++)n.deleteFramebuffer(y.__webglFramebuffer[$][J]);else n.deleteFramebuffer(y.__webglFramebuffer[$]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[$])}else{if(Array.isArray(y.__webglFramebuffer))for(let $=0;$<y.__webglFramebuffer.length;$++)n.deleteFramebuffer(y.__webglFramebuffer[$]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let $=0;$<y.__webglColorRenderbuffer.length;$++)y.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[$]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const F=b.textures;for(let $=0,J=F.length;$<J;$++){const X=i.get(F[$]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(F[$])}i.remove(b)}let P=0;function z(){P=0}function O(){const b=P;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),P+=1,b}function W(b){const y=[];return y.push(b.wrapS),y.push(b.wrapT),y.push(b.wrapR||0),y.push(b.magFilter),y.push(b.minFilter),y.push(b.anisotropy),y.push(b.internalFormat),y.push(b.format),y.push(b.type),y.push(b.generateMipmaps),y.push(b.premultiplyAlpha),y.push(b.flipY),y.push(b.unpackAlignment),y.push(b.colorSpace),y.join()}function Y(b,y){const F=i.get(b);if(b.isVideoTexture&&bt(b),b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){const $=b.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,b,y);return}}e.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+y)}function G(b,y){const F=i.get(b);if(b.version>0&&F.__version!==b.version){q(F,b,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+y)}function K(b,y){const F=i.get(b);if(b.version>0&&F.__version!==b.version){q(F,b,y);return}e.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+y)}function V(b,y){const F=i.get(b);if(b.version>0&&F.__version!==b.version){tt(F,b,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+y)}const st={[Ys]:n.REPEAT,[sn]:n.CLAMP_TO_EDGE,[sa]:n.MIRRORED_REPEAT},ut={[ai]:n.NEAREST,[Qc]:n.NEAREST_MIPMAP_NEAREST,[hs]:n.NEAREST_MIPMAP_LINEAR,[ui]:n.LINEAR,[rr]:n.LINEAR_MIPMAP_NEAREST,[rn]:n.LINEAR_MIPMAP_LINEAR},Mt={[nh]:n.NEVER,[ch]:n.ALWAYS,[sh]:n.LESS,[Yl]:n.LEQUAL,[rh]:n.EQUAL,[lh]:n.GEQUAL,[ah]:n.GREATER,[oh]:n.NOTEQUAL};function zt(b,y){if(y.type===Mi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===ui||y.magFilter===rr||y.magFilter===hs||y.magFilter===rn||y.minFilter===ui||y.minFilter===rr||y.minFilter===hs||y.minFilter===rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,st[y.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,st[y.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,st[y.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ut[y.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ut[y.minFilter]),y.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Mt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ai||y.minFilter!==hs&&y.minFilter!==rn||y.type===Mi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");n.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ee(b,y){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",A));const $=y.source;let J=f.get($);J===void 0&&(J={},f.set($,J));const X=W(y);if(X!==b.__cacheKey){J[X]===void 0&&(J[X]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),J[X].usedTimes++;const xt=J[b.__cacheKey];xt!==void 0&&(J[b.__cacheKey].usedTimes--,xt.usedTimes===0&&E(y)),b.__cacheKey=X,b.__webglTexture=J[X].texture}return F}function q(b,y,F){let $=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&($=n.TEXTURE_3D);const J=ee(b,y),X=y.source;e.bindTexture($,b.__webglTexture,n.TEXTURE0+F);const xt=i.get(X);if(X.version!==xt.__version||J===!0){e.activeTexture(n.TEXTURE0+F);const at=qt.getPrimaries(qt.workingColorSpace),dt=y.colorSpace===Ni?null:qt.getPrimaries(y.colorSpace),Xt=y.colorSpace===Ni||at===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);let j=v(y.image,!1,s.maxTextureSize);j=re(y,j);const ft=r.convert(y.format,y.colorSpace),wt=r.convert(y.type);let Ct=T(y.internalFormat,ft,wt,y.colorSpace,y.isVideoTexture);zt($,y);let pt;const Vt=y.mipmaps,Ut=y.isVideoTexture!==!0,ne=xt.__version===void 0||J===!0,D=X.dataReady,nt=L(y,j);if(y.isDepthTexture)Ct=_(y.format===zn,y.type),ne&&(Ut?e.texStorage2D(n.TEXTURE_2D,1,Ct,j.width,j.height):e.texImage2D(n.TEXTURE_2D,0,Ct,j.width,j.height,0,ft,wt,null));else if(y.isDataTexture)if(Vt.length>0){Ut&&ne&&e.texStorage2D(n.TEXTURE_2D,nt,Ct,Vt[0].width,Vt[0].height);for(let H=0,Z=Vt.length;H<Z;H++)pt=Vt[H],Ut?D&&e.texSubImage2D(n.TEXTURE_2D,H,0,0,pt.width,pt.height,ft,wt,pt.data):e.texImage2D(n.TEXTURE_2D,H,Ct,pt.width,pt.height,0,ft,wt,pt.data);y.generateMipmaps=!1}else Ut?(ne&&e.texStorage2D(n.TEXTURE_2D,nt,Ct,j.width,j.height),D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,j.width,j.height,ft,wt,j.data)):e.texImage2D(n.TEXTURE_2D,0,Ct,j.width,j.height,0,ft,wt,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ut&&ne&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Ct,Vt[0].width,Vt[0].height,j.depth);for(let H=0,Z=Vt.length;H<Z;H++)if(pt=Vt[H],y.format!==ri)if(ft!==null)if(Ut){if(D)if(y.layerUpdates.size>0){const ht=sl(pt.width,pt.height,y.format,y.type);for(const ot of y.layerUpdates){const Lt=pt.data.subarray(ot*ht/pt.data.BYTES_PER_ELEMENT,(ot+1)*ht/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,H,0,0,ot,pt.width,pt.height,1,ft,Lt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,H,0,0,0,pt.width,pt.height,j.depth,ft,pt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,H,Ct,pt.width,pt.height,j.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?D&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,H,0,0,0,pt.width,pt.height,j.depth,ft,wt,pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,H,Ct,pt.width,pt.height,j.depth,0,ft,wt,pt.data)}else{Ut&&ne&&e.texStorage2D(n.TEXTURE_2D,nt,Ct,Vt[0].width,Vt[0].height);for(let H=0,Z=Vt.length;H<Z;H++)pt=Vt[H],y.format!==ri?ft!==null?Ut?D&&e.compressedTexSubImage2D(n.TEXTURE_2D,H,0,0,pt.width,pt.height,ft,pt.data):e.compressedTexImage2D(n.TEXTURE_2D,H,Ct,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?D&&e.texSubImage2D(n.TEXTURE_2D,H,0,0,pt.width,pt.height,ft,wt,pt.data):e.texImage2D(n.TEXTURE_2D,H,Ct,pt.width,pt.height,0,ft,wt,pt.data)}else if(y.isDataArrayTexture)if(Ut){if(ne&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Ct,j.width,j.height,j.depth),D)if(y.layerUpdates.size>0){const H=sl(j.width,j.height,y.format,y.type);for(const Z of y.layerUpdates){const ht=j.data.subarray(Z*H/j.data.BYTES_PER_ELEMENT,(Z+1)*H/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,j.width,j.height,1,ft,wt,ht)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ft,wt,j.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ct,j.width,j.height,j.depth,0,ft,wt,j.data);else if(y.isData3DTexture)Ut?(ne&&e.texStorage3D(n.TEXTURE_3D,nt,Ct,j.width,j.height,j.depth),D&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ft,wt,j.data)):e.texImage3D(n.TEXTURE_3D,0,Ct,j.width,j.height,j.depth,0,ft,wt,j.data);else if(y.isFramebufferTexture){if(ne)if(Ut)e.texStorage2D(n.TEXTURE_2D,nt,Ct,j.width,j.height);else{let H=j.width,Z=j.height;for(let ht=0;ht<nt;ht++)e.texImage2D(n.TEXTURE_2D,ht,Ct,H,Z,0,ft,wt,null),H>>=1,Z>>=1}}else if(Vt.length>0){if(Ut&&ne){const H=Tt(Vt[0]);e.texStorage2D(n.TEXTURE_2D,nt,Ct,H.width,H.height)}for(let H=0,Z=Vt.length;H<Z;H++)pt=Vt[H],Ut?D&&e.texSubImage2D(n.TEXTURE_2D,H,0,0,ft,wt,pt):e.texImage2D(n.TEXTURE_2D,H,Ct,ft,wt,pt);y.generateMipmaps=!1}else if(Ut){if(ne){const H=Tt(j);e.texStorage2D(n.TEXTURE_2D,nt,Ct,H.width,H.height)}D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,wt,j)}else e.texImage2D(n.TEXTURE_2D,0,Ct,ft,wt,j);m(y)&&p($),xt.__version=X.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function tt(b,y,F){if(y.image.length!==6)return;const $=ee(b,y),J=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+F);const X=i.get(J);if(J.version!==X.__version||$===!0){e.activeTexture(n.TEXTURE0+F);const xt=qt.getPrimaries(qt.workingColorSpace),at=y.colorSpace===Ni?null:qt.getPrimaries(y.colorSpace),dt=y.colorSpace===Ni||xt===at?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Xt=y.isCompressedTexture||y.image[0].isCompressedTexture,j=y.image[0]&&y.image[0].isDataTexture,ft=[];for(let Z=0;Z<6;Z++)!Xt&&!j?ft[Z]=v(y.image[Z],!0,s.maxCubemapSize):ft[Z]=j?y.image[Z].image:y.image[Z],ft[Z]=re(y,ft[Z]);const wt=ft[0],Ct=r.convert(y.format,y.colorSpace),pt=r.convert(y.type),Vt=T(y.internalFormat,Ct,pt,y.colorSpace),Ut=y.isVideoTexture!==!0,ne=X.__version===void 0||$===!0,D=J.dataReady;let nt=L(y,wt);zt(n.TEXTURE_CUBE_MAP,y);let H;if(Xt){Ut&&ne&&e.texStorage2D(n.TEXTURE_CUBE_MAP,nt,Vt,wt.width,wt.height);for(let Z=0;Z<6;Z++){H=ft[Z].mipmaps;for(let ht=0;ht<H.length;ht++){const ot=H[ht];y.format!==ri?Ct!==null?Ut?D&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht,0,0,ot.width,ot.height,Ct,ot.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht,Vt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht,0,0,ot.width,ot.height,Ct,pt,ot.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht,Vt,ot.width,ot.height,0,Ct,pt,ot.data)}}}else{if(H=y.mipmaps,Ut&&ne){H.length>0&&nt++;const Z=Tt(ft[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,nt,Vt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(j){Ut?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ft[Z].width,ft[Z].height,Ct,pt,ft[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Vt,ft[Z].width,ft[Z].height,0,Ct,pt,ft[Z].data);for(let ht=0;ht<H.length;ht++){const Lt=H[ht].image[Z].image;Ut?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht+1,0,0,Lt.width,Lt.height,Ct,pt,Lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht+1,Vt,Lt.width,Lt.height,0,Ct,pt,Lt.data)}}else{Ut?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ct,pt,ft[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Vt,Ct,pt,ft[Z]);for(let ht=0;ht<H.length;ht++){const ot=H[ht];Ut?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht+1,0,0,Ct,pt,ot.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht+1,Vt,Ct,pt,ot.image[Z])}}}m(y)&&p(n.TEXTURE_CUBE_MAP),X.__version=J.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function _t(b,y,F,$,J,X){const xt=r.convert(F.format,F.colorSpace),at=r.convert(F.type),dt=T(F.internalFormat,xt,at,F.colorSpace),Xt=i.get(y),j=i.get(F);if(j.__renderTarget=y,!Xt.__hasExternalTextures){const ft=Math.max(1,y.width>>X),wt=Math.max(1,y.height>>X);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,X,dt,ft,wt,y.depth,0,xt,at,null):e.texImage2D(J,X,dt,ft,wt,0,xt,at,null)}e.bindFramebuffer(n.FRAMEBUFFER,b),Ht(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,J,j.__webglTexture,0,kt(y)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,J,j.__webglTexture,X),e.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(b,y,F){if(n.bindRenderbuffer(n.RENDERBUFFER,b),y.depthBuffer){const $=y.depthTexture,J=$&&$.isDepthTexture?$.type:null,X=_(y.stencilBuffer,J),xt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=kt(y);Ht(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at,X,y.width,y.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,at,X,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,X,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xt,n.RENDERBUFFER,b)}else{const $=y.textures;for(let J=0;J<$.length;J++){const X=$[J],xt=r.convert(X.format,X.colorSpace),at=r.convert(X.type),dt=T(X.internalFormat,xt,at,X.colorSpace),Xt=kt(y);F&&Ht(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt,dt,y.width,y.height):Ht(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt,dt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,dt,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function At(b,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,b),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(y.depthTexture);$.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y(y.depthTexture,0);const J=$.__webglTexture,X=kt(y);if(y.depthTexture.format===Ln)Ht(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(y.depthTexture.format===zn)Ht(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Pt(b){const y=i.get(b),F=b.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==b.depthTexture){const $=b.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),$){const J=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,$.removeEventListener("dispose",J)};$.addEventListener("dispose",J),y.__depthDisposeCallback=J}y.__boundDepthTexture=$}if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");At(y.__webglFramebuffer,b)}else if(F){y.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[$]),y.__webglDepthbuffer[$]===void 0)y.__webglDepthbuffer[$]=n.createRenderbuffer(),rt(y.__webglDepthbuffer[$],b,!1);else{const J=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,X)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),rt(y.__webglDepthbuffer,b,!1);else{const $=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,J)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ot(b,y,F){const $=i.get(b);y!==void 0&&_t($.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Pt(b)}function fe(b){const y=b.texture,F=i.get(b),$=i.get(y);b.addEventListener("dispose",C);const J=b.textures,X=b.isWebGLCubeRenderTarget===!0,xt=J.length>1;if(xt||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=y.version,a.memory.textures++),X){F.__webglFramebuffer=[];for(let at=0;at<6;at++)if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[at]=[];for(let dt=0;dt<y.mipmaps.length;dt++)F.__webglFramebuffer[at][dt]=n.createFramebuffer()}else F.__webglFramebuffer[at]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let at=0;at<y.mipmaps.length;at++)F.__webglFramebuffer[at]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(xt)for(let at=0,dt=J.length;at<dt;at++){const Xt=i.get(J[at]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&Ht(b)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let at=0;at<J.length;at++){const dt=J[at];F.__webglColorRenderbuffer[at]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[at]);const Xt=r.convert(dt.format,dt.colorSpace),j=r.convert(dt.type),ft=T(dt.internalFormat,Xt,j,dt.colorSpace,b.isXRRenderTarget===!0),wt=kt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,wt,ft,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,F.__webglColorRenderbuffer[at])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),rt(F.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),zt(n.TEXTURE_CUBE_MAP,y);for(let at=0;at<6;at++)if(y.mipmaps&&y.mipmaps.length>0)for(let dt=0;dt<y.mipmaps.length;dt++)_t(F.__webglFramebuffer[at][dt],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,dt);else _t(F.__webglFramebuffer[at],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(y)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let at=0,dt=J.length;at<dt;at++){const Xt=J[at],j=i.get(Xt);e.bindTexture(n.TEXTURE_2D,j.__webglTexture),zt(n.TEXTURE_2D,Xt),_t(F.__webglFramebuffer,b,Xt,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,0),m(Xt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let at=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(at=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(at,$.__webglTexture),zt(at,y),y.mipmaps&&y.mipmaps.length>0)for(let dt=0;dt<y.mipmaps.length;dt++)_t(F.__webglFramebuffer[dt],b,y,n.COLOR_ATTACHMENT0,at,dt);else _t(F.__webglFramebuffer,b,y,n.COLOR_ATTACHMENT0,at,0);m(y)&&p(at),e.unbindTexture()}b.depthBuffer&&Pt(b)}function Wt(b){const y=b.textures;for(let F=0,$=y.length;F<$;F++){const J=y[F];if(m(J)){const X=x(b),xt=i.get(J).__webglTexture;e.bindTexture(X,xt),p(X),e.unbindTexture()}}}const me=[],N=[];function Xe(b){if(b.samples>0){if(Ht(b)===!1){const y=b.textures,F=b.width,$=b.height;let J=n.COLOR_BUFFER_BIT;const X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xt=i.get(b),at=y.length>1;if(at)for(let dt=0;dt<y.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let dt=0;dt<y.length;dt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),at){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xt.__webglColorRenderbuffer[dt]);const Xt=i.get(y[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Xt,0)}n.blitFramebuffer(0,0,F,$,0,0,F,$,J,n.NEAREST),l===!0&&(me.length=0,N.length=0,me.push(n.COLOR_ATTACHMENT0+dt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(me.push(X),N.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,me))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),at)for(let dt=0;dt<y.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,xt.__webglColorRenderbuffer[dt]);const Xt=i.get(y[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Xt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const y=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function kt(b){return Math.min(s.maxSamples,b.samples)}function Ht(b){const y=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function bt(b){const y=a.render.frame;h.get(b)!==y&&(h.set(b,y),b.update())}function re(b,y){const F=b.colorSpace,$=b.format,J=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==Bn&&F!==Ni&&(qt.getTransfer(F)===jt?($!==ri||J!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}function Tt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=z,this.setTexture2D=Y,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=Ot,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Ht}function pm(n,t){function e(i,s=Ni){let r;const a=qt.getTransfer(s);if(i===bi)return n.UNSIGNED_BYTE;if(i===Ba)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ka)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ol)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fl)return n.BYTE;if(i===zl)return n.SHORT;if(i===ss)return n.UNSIGNED_SHORT;if(i===Oa)return n.INT;if(i===on)return n.UNSIGNED_INT;if(i===Mi)return n.FLOAT;if(i===rs)return n.HALF_FLOAT;if(i===Bl)return n.ALPHA;if(i===kl)return n.RGB;if(i===ri)return n.RGBA;if(i===Hl)return n.LUMINANCE;if(i===Vl)return n.LUMINANCE_ALPHA;if(i===Ln)return n.DEPTH_COMPONENT;if(i===zn)return n.DEPTH_STENCIL;if(i===Gl)return n.RED;if(i===Ha)return n.RED_INTEGER;if(i===Wl)return n.RG;if(i===Va)return n.RG_INTEGER;if(i===Ga)return n.RGBA_INTEGER;if(i===ks||i===Hs||i===Vs||i===Gs)if(a===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ks)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Hs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Vs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ks)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Hs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Vs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ra||i===aa||i===oa||i===la)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ra)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===aa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===la)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ca||i===ha||i===ua)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ca||i===ha)return a===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ua)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===da||i===fa||i===pa||i===ma||i===ga||i===va||i===_a||i===xa||i===ya||i===Ma||i===Sa||i===Ea||i===Ta||i===ba)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===da)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fa)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pa)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ma)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ga)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===va)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_a)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xa)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ya)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ma)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sa)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ea)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ta)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ba)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ws||i===wa||i===Aa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ws)return a===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Aa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xl||i===Ca||i===Ra||i===Pa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ws)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ca)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ra)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class mm extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Se extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gm={type:"move"};class Ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Se;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const vm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_m=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Fe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Hi({vertexShader:vm,fragmentShader:_m,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ce(new Vi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ym extends kn{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const v=new xm,m=e.getContextAttributes();let p=null,x=null;const T=[],_=[],L=new ct;let A=null;const C=new Oe;C.viewport=new te;const R=new Oe;R.viewport=new te;const E=[C,R],M=new mm;let P=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let tt=T[q];return tt===void 0&&(tt=new Ur,T[q]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(q){let tt=T[q];return tt===void 0&&(tt=new Ur,T[q]=tt),tt.getGripSpace()},this.getHand=function(q){let tt=T[q];return tt===void 0&&(tt=new Ur,T[q]=tt),tt.getHandSpace()};function O(q){const tt=_.indexOf(q.inputSource);if(tt===-1)return;const _t=T[tt];_t!==void 0&&(_t.update(q.inputSource,q.frame,c||a),_t.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Y);for(let q=0;q<T.length;q++){const tt=_[q];tt!==null&&(_[q]=null,T[q].disconnect(tt))}P=null,z=null,v.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,x=null,ee.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new ln(d.framebufferWidth,d.framebufferHeight,{format:ri,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,_t=null,rt=null;m.depth&&(rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?zn:Ln,_t=m.stencil?Fn:on);const At={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(At),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new ln(f.textureWidth,f.textureHeight,{format:ri,type:bi,depthTexture:new ac(f.textureWidth,f.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ee.setContext(s),ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y(q){for(let tt=0;tt<q.removed.length;tt++){const _t=q.removed[tt],rt=_.indexOf(_t);rt>=0&&(_[rt]=null,T[rt].disconnect(_t))}for(let tt=0;tt<q.added.length;tt++){const _t=q.added[tt];let rt=_.indexOf(_t);if(rt===-1){for(let Pt=0;Pt<T.length;Pt++)if(Pt>=_.length){_.push(_t),rt=Pt;break}else if(_[Pt]===null){_[Pt]=_t,rt=Pt;break}if(rt===-1)break}const At=T[rt];At&&At.connect(_t)}}const G=new w,K=new w;function V(q,tt,_t){G.setFromMatrixPosition(tt.matrixWorld),K.setFromMatrixPosition(_t.matrixWorld);const rt=G.distanceTo(K),At=tt.projectionMatrix.elements,Pt=_t.projectionMatrix.elements,Ot=At[14]/(At[10]-1),fe=At[14]/(At[10]+1),Wt=(At[9]+1)/At[5],me=(At[9]-1)/At[5],N=(At[8]-1)/At[0],Xe=(Pt[8]+1)/Pt[0],kt=Ot*N,Ht=Ot*Xe,bt=rt/(-N+Xe),re=bt*-N;if(tt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(re),q.translateZ(bt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),At[10]===-1)q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Tt=Ot+bt,b=fe+bt,y=kt-re,F=Ht+(rt-re),$=Wt*fe/b*Tt,J=me*fe/b*Tt;q.projectionMatrix.makePerspective(y,F,$,J,Tt,b),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function st(q,tt){tt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(tt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let tt=q.near,_t=q.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(_t=v.depthFar)),M.near=R.near=C.near=tt,M.far=R.far=C.far=_t,(P!==M.near||z!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,z=M.far),C.layers.mask=q.layers.mask|2,R.layers.mask=q.layers.mask|4,M.layers.mask=C.layers.mask|R.layers.mask;const rt=q.parent,At=M.cameras;st(M,rt);for(let Pt=0;Pt<At.length;Pt++)st(At[Pt],rt);At.length===2?V(M,C,R):M.projectionMatrix.copy(C.projectionMatrix),ut(q,M,rt)};function ut(q,tt,_t){_t===null?q.matrix.copy(tt.matrixWorld):(q.matrix.copy(_t.matrixWorld),q.matrix.invert(),q.matrix.multiply(tt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Da*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let Mt=null;function zt(q,tt){if(h=tt.getViewerPose(c||a),g=tt,h!==null){const _t=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let rt=!1;_t.length!==M.cameras.length&&(M.cameras.length=0,rt=!0);for(let Pt=0;Pt<_t.length;Pt++){const Ot=_t[Pt];let fe=null;if(d!==null)fe=d.getViewport(Ot);else{const me=u.getViewSubImage(f,Ot);fe=me.viewport,Pt===0&&(t.setRenderTargetTextures(x,me.colorTexture,f.ignoreDepthValues?void 0:me.depthStencilTexture),t.setRenderTarget(x))}let Wt=E[Pt];Wt===void 0&&(Wt=new Oe,Wt.layers.enable(Pt),Wt.viewport=new te,E[Pt]=Wt),Wt.matrix.fromArray(Ot.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Ot.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(fe.x,fe.y,fe.width,fe.height),Pt===0&&(M.matrix.copy(Wt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),rt===!0&&M.cameras.push(Wt)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")){const Pt=u.getDepthInformation(_t[0]);Pt&&Pt.isValid&&Pt.texture&&v.init(t,Pt,s.renderState)}}for(let _t=0;_t<T.length;_t++){const rt=_[_t],At=T[_t];rt!==null&&At!==void 0&&At.update(rt,tt,c||a)}Mt&&Mt(q,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),g=null}const ee=new sc;ee.setAnimationLoop(zt),this.setAnimationLoop=function(q){Mt=q},this.dispose=function(){}}}const Ki=new Be,Mm=new Gt;function Sm(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,ec(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,x,T,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,x,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ne&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ne&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=t.get(p),T=x.envMap,_=x.envMapRotation;T&&(m.envMap.value=T,Ki.copy(_),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),m.envMapRotation.value.setFromMatrix4(Mm.makeRotationFromEuler(Ki)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=T*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ne&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const x=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Em(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,T){const _=T.program;i.uniformBlockBinding(x,_)}function c(x,T){let _=s[x.id];_===void 0&&(g(x),_=h(x),s[x.id]=_,x.addEventListener("dispose",m));const L=T.program;i.updateUBOMapping(x,L);const A=t.render.frame;r[x.id]!==A&&(f(x),r[x.id]=A)}function h(x){const T=u();x.__bindingPointIndex=T;const _=n.createBuffer(),L=x.__size,A=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,_),_}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const T=s[x.id],_=x.uniforms,L=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let A=0,C=_.length;A<C;A++){const R=Array.isArray(_[A])?_[A]:[_[A]];for(let E=0,M=R.length;E<M;E++){const P=R[E];if(d(P,A,E,L)===!0){const z=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let W=0;for(let Y=0;Y<O.length;Y++){const G=O[Y],K=v(G);typeof G=="number"||typeof G=="boolean"?(P.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,z+W,P.__data)):G.isMatrix3?(P.__data[0]=G.elements[0],P.__data[1]=G.elements[1],P.__data[2]=G.elements[2],P.__data[3]=0,P.__data[4]=G.elements[3],P.__data[5]=G.elements[4],P.__data[6]=G.elements[5],P.__data[7]=0,P.__data[8]=G.elements[6],P.__data[9]=G.elements[7],P.__data[10]=G.elements[8],P.__data[11]=0):(G.toArray(P.__data,W),W+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,z,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,T,_,L){const A=x.value,C=T+"_"+_;if(L[C]===void 0)return typeof A=="number"||typeof A=="boolean"?L[C]=A:L[C]=A.clone(),!0;{const R=L[C];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return L[C]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function g(x){const T=x.uniforms;let _=0;const L=16;for(let C=0,R=T.length;C<R;C++){const E=Array.isArray(T[C])?T[C]:[T[C]];for(let M=0,P=E.length;M<P;M++){const z=E[M],O=Array.isArray(z.value)?z.value:[z.value];for(let W=0,Y=O.length;W<Y;W++){const G=O[W],K=v(G),V=_%L,st=V%K.boundary,ut=V+st;_+=st,ut!==0&&L-ut<K.storage&&(_+=L-ut),z.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=K.storage}}}const A=_%L;return A>0&&(_+=L-A),x.__size=_,x.__cache={},this}function v(x){const T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),T}function m(x){const T=x.target;T.removeEventListener("dispose",m);const _=a.indexOf(T.__bindingPointIndex);a.splice(_,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function p(){for(const x in s)n.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Tm{constructor(t={}){const{canvas:e=uh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const x=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this.toneMapping=zi,this.toneMappingExposure=1;const _=this;let L=!1,A=0,C=0,R=null,E=-1,M=null;const P=new te,z=new te;let O=null;const W=new Ft(0);let Y=0,G=e.width,K=e.height,V=1,st=null,ut=null;const Mt=new te(0,0,G,K),zt=new te(0,0,G,K);let ee=!1;const q=new Xa;let tt=!1,_t=!1;const rt=new Gt,At=new Gt,Pt=new w,Ot=new te,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function me(){return R===null?V:1}let N=i;function Xe(S,I){return e.getContext(S,I)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${za}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",ht,!1),e.addEventListener("webglcontextcreationerror",ot,!1),N===null){const I="webgl2";if(N=Xe(I,S),N===null)throw Xe(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let kt,Ht,bt,re,Tt,b,y,F,$,J,X,xt,at,dt,Xt,j,ft,wt,Ct,pt,Vt,Ut,ne,D;function nt(){kt=new Rf(N),kt.init(),Ut=new pm(N,kt),Ht=new Ef(N,kt,t,Ut),bt=new um(N,kt),Ht.reverseDepthBuffer&&f&&bt.buffers.depth.setReversed(!0),re=new Df(N),Tt=new Kp,b=new fm(N,kt,bt,Tt,Ht,Ut,re),y=new bf(_),F=new Cf(_),$=new Oh(N),ne=new Mf(N,$),J=new Pf(N,$,re,ne),X=new Uf(N,J,$,re),Ct=new If(N,Ht,b),j=new Tf(Tt),xt=new Zp(_,y,F,kt,Ht,ne,j),at=new Sm(_,Tt),dt=new jp,Xt=new sm(kt),wt=new yf(_,y,F,bt,X,d,l),ft=new cm(_,X,Ht),D=new Em(N,re,Ht,bt),pt=new Sf(N,kt,re),Vt=new Lf(N,kt,re),re.programs=xt.programs,_.capabilities=Ht,_.extensions=kt,_.properties=Tt,_.renderLists=dt,_.shadowMap=ft,_.state=bt,_.info=re}nt();const H=new ym(_,N);this.xr=H,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=kt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=kt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(G,K,!1))},this.getSize=function(S){return S.set(G,K)},this.setSize=function(S,I,B=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=S,K=I,e.width=Math.floor(S*V),e.height=Math.floor(I*V),B===!0&&(e.style.width=S+"px",e.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(G*V,K*V).floor()},this.setDrawingBufferSize=function(S,I,B){G=S,K=I,V=B,e.width=Math.floor(S*B),e.height=Math.floor(I*B),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(Mt)},this.setViewport=function(S,I,B,k){S.isVector4?Mt.set(S.x,S.y,S.z,S.w):Mt.set(S,I,B,k),bt.viewport(P.copy(Mt).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(zt)},this.setScissor=function(S,I,B,k){S.isVector4?zt.set(S.x,S.y,S.z,S.w):zt.set(S,I,B,k),bt.scissor(z.copy(zt).multiplyScalar(V).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(S){bt.setScissorTest(ee=S)},this.setOpaqueSort=function(S){st=S},this.setTransparentSort=function(S){ut=S},this.getClearColor=function(S){return S.copy(wt.getClearColor())},this.setClearColor=function(){wt.setClearColor.apply(wt,arguments)},this.getClearAlpha=function(){return wt.getClearAlpha()},this.setClearAlpha=function(){wt.setClearAlpha.apply(wt,arguments)},this.clear=function(S=!0,I=!0,B=!0){let k=0;if(S){let U=!1;if(R!==null){const Q=R.texture.format;U=Q===Ga||Q===Va||Q===Ha}if(U){const Q=R.texture.type,lt=Q===bi||Q===on||Q===ss||Q===Fn||Q===Ba||Q===ka,mt=wt.getClearColor(),gt=wt.getClearAlpha(),Rt=mt.r,Dt=mt.g,vt=mt.b;lt?(g[0]=Rt,g[1]=Dt,g[2]=vt,g[3]=gt,N.clearBufferuiv(N.COLOR,0,g)):(v[0]=Rt,v[1]=Dt,v[2]=vt,v[3]=gt,N.clearBufferiv(N.COLOR,0,v))}else k|=N.COLOR_BUFFER_BIT}I&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",ht,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),dt.dispose(),Xt.dispose(),Tt.dispose(),y.dispose(),F.dispose(),X.dispose(),ne.dispose(),D.dispose(),xt.dispose(),H.dispose(),H.removeEventListener("sessionstart",to),H.removeEventListener("sessionend",eo),Wi.stop()};function Z(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function ht(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const S=re.autoReset,I=ft.enabled,B=ft.autoUpdate,k=ft.needsUpdate,U=ft.type;nt(),re.autoReset=S,ft.enabled=I,ft.autoUpdate=B,ft.needsUpdate=k,ft.type=U}function ot(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Lt(S){const I=S.target;I.removeEventListener("dispose",Lt),pe(I)}function pe(S){Ce(S),Tt.remove(S)}function Ce(S){const I=Tt.get(S).programs;I!==void 0&&(I.forEach(function(B){xt.releaseProgram(B)}),S.isShaderMaterial&&xt.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,B,k,U,Q){I===null&&(I=fe);const lt=U.isMesh&&U.matrixWorld.determinant()<0,mt=Sc(S,I,B,k,U);bt.setMaterial(k,lt);let gt=B.index,Rt=1;if(k.wireframe===!0){if(gt=J.getWireframeAttribute(B),gt===void 0)return;Rt=2}const Dt=B.drawRange,vt=B.attributes.position;let Yt=Dt.start*Rt,se=(Dt.start+Dt.count)*Rt;Q!==null&&(Yt=Math.max(Yt,Q.start*Rt),se=Math.min(se,(Q.start+Q.count)*Rt)),gt!==null?(Yt=Math.max(Yt,0),se=Math.min(se,gt.count)):vt!=null&&(Yt=Math.max(Yt,0),se=Math.min(se,vt.count));const ae=se-Yt;if(ae<0||ae===1/0)return;ne.setup(U,k,mt,B,gt);let ze,$t=pt;if(gt!==null&&(ze=$.get(gt),$t=Vt,$t.setIndex(ze)),U.isMesh)k.wireframe===!0?(bt.setLineWidth(k.wireframeLinewidth*me()),$t.setMode(N.LINES)):$t.setMode(N.TRIANGLES);else if(U.isLine){let yt=k.linewidth;yt===void 0&&(yt=1),bt.setLineWidth(yt*me()),U.isLineSegments?$t.setMode(N.LINES):U.isLineLoop?$t.setMode(N.LINE_LOOP):$t.setMode(N.LINE_STRIP)}else U.isPoints?$t.setMode(N.POINTS):U.isSprite&&$t.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)$t.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))$t.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const yt=U._multiDrawStarts,pi=U._multiDrawCounts,Zt=U._multiDrawCount,ti=gt?$.get(gt).bytesPerElement:1,hn=Tt.get(k).currentProgram.getUniforms();for(let ke=0;ke<Zt;ke++)hn.setValue(N,"_gl_DrawID",ke),$t.render(yt[ke]/ti,pi[ke])}else if(U.isInstancedMesh)$t.renderInstances(Yt,ae,U.count);else if(B.isInstancedBufferGeometry){const yt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,pi=Math.min(B.instanceCount,yt);$t.renderInstances(Yt,ae,pi)}else $t.render(Yt,ae)};function Jt(S,I,B){S.transparent===!0&&S.side===Ke&&S.forceSinglePass===!1?(S.side=Ne,S.needsUpdate=!0,cs(S,I,B),S.side=Bi,S.needsUpdate=!0,cs(S,I,B),S.side=Ke):cs(S,I,B)}this.compile=function(S,I,B=null){B===null&&(B=S),p=Xt.get(B),p.init(I),T.push(p),B.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),S!==B&&S.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const k=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const Q=U.material;if(Q)if(Array.isArray(Q))for(let lt=0;lt<Q.length;lt++){const mt=Q[lt];Jt(mt,B,U),k.add(mt)}else Jt(Q,B,U),k.add(Q)}),T.pop(),p=null,k},this.compileAsync=function(S,I,B=null){const k=this.compile(S,I,B);return new Promise(U=>{function Q(){if(k.forEach(function(lt){Tt.get(lt).currentProgram.isReady()&&k.delete(lt)}),k.size===0){U(S);return}setTimeout(Q,10)}kt.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Qe=null;function fi(S){Qe&&Qe(S)}function to(){Wi.stop()}function eo(){Wi.start()}const Wi=new sc;Wi.setAnimationLoop(fi),typeof self<"u"&&Wi.setContext(self),this.setAnimationLoop=function(S){Qe=S,H.setAnimationLoop(S),S===null?Wi.stop():Wi.start()},H.addEventListener("sessionstart",to),H.addEventListener("sessionend",eo),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(I),I=H.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,I,R),p=Xt.get(S,T.length),p.init(I),T.push(p),At.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(At),_t=this.localClippingEnabled,tt=j.init(this.clippingPlanes,_t),m=dt.get(S,x.length),m.init(),x.push(m),H.enabled===!0&&H.isPresenting===!0){const Q=_.xr.getDepthSensingMesh();Q!==null&&sr(Q,I,-1/0,_.sortObjects)}sr(S,I,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(st,ut),Wt=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,Wt&&wt.addToRenderList(m,S),this.info.render.frame++,tt===!0&&j.beginShadows();const B=p.state.shadowsArray;ft.render(B,S,I),tt===!0&&j.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=m.opaque,U=m.transmissive;if(p.setupLights(),I.isArrayCamera){const Q=I.cameras;if(U.length>0)for(let lt=0,mt=Q.length;lt<mt;lt++){const gt=Q[lt];no(k,U,S,gt)}Wt&&wt.render(S);for(let lt=0,mt=Q.length;lt<mt;lt++){const gt=Q[lt];io(m,S,gt,gt.viewport)}}else U.length>0&&no(k,U,S,I),Wt&&wt.render(S),io(m,S,I);R!==null&&(b.updateMultisampleRenderTarget(R),b.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(_,S,I),ne.resetDefaultState(),E=-1,M=null,T.pop(),T.length>0?(p=T[T.length-1],tt===!0&&j.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function sr(S,I,B,k){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||q.intersectsSprite(S)){k&&Ot.setFromMatrixPosition(S.matrixWorld).applyMatrix4(At);const lt=X.update(S),mt=S.material;mt.visible&&m.push(S,lt,mt,B,Ot.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||q.intersectsObject(S))){const lt=X.update(S),mt=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ot.copy(S.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Ot.copy(lt.boundingSphere.center)),Ot.applyMatrix4(S.matrixWorld).applyMatrix4(At)),Array.isArray(mt)){const gt=lt.groups;for(let Rt=0,Dt=gt.length;Rt<Dt;Rt++){const vt=gt[Rt],Yt=mt[vt.materialIndex];Yt&&Yt.visible&&m.push(S,lt,Yt,B,Ot.z,vt)}}else mt.visible&&m.push(S,lt,mt,B,Ot.z,null)}}const Q=S.children;for(let lt=0,mt=Q.length;lt<mt;lt++)sr(Q[lt],I,B,k)}function io(S,I,B,k){const U=S.opaque,Q=S.transmissive,lt=S.transparent;p.setupLightsView(B),tt===!0&&j.setGlobalState(_.clippingPlanes,B),k&&bt.viewport(P.copy(k)),U.length>0&&ls(U,I,B),Q.length>0&&ls(Q,I,B),lt.length>0&&ls(lt,I,B),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function no(S,I,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new ln(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?rs:bi,minFilter:rn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const Q=p.state.transmissionRenderTarget[k.id],lt=k.viewport||P;Q.setSize(lt.z,lt.w);const mt=_.getRenderTarget();_.setRenderTarget(Q),_.getClearColor(W),Y=_.getClearAlpha(),Y<1&&_.setClearColor(16777215,.5),_.clear(),Wt&&wt.render(B);const gt=_.toneMapping;_.toneMapping=zi;const Rt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),tt===!0&&j.setGlobalState(_.clippingPlanes,k),ls(S,B,k),b.updateMultisampleRenderTarget(Q),b.updateRenderTargetMipmap(Q),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Dt=!1;for(let vt=0,Yt=I.length;vt<Yt;vt++){const se=I[vt],ae=se.object,ze=se.geometry,$t=se.material,yt=se.group;if($t.side===Ke&&ae.layers.test(k.layers)){const pi=$t.side;$t.side=Ne,$t.needsUpdate=!0,so(ae,B,k,ze,$t,yt),$t.side=pi,$t.needsUpdate=!0,Dt=!0}}Dt===!0&&(b.updateMultisampleRenderTarget(Q),b.updateRenderTargetMipmap(Q))}_.setRenderTarget(mt),_.setClearColor(W,Y),Rt!==void 0&&(k.viewport=Rt),_.toneMapping=gt}function ls(S,I,B){const k=I.isScene===!0?I.overrideMaterial:null;for(let U=0,Q=S.length;U<Q;U++){const lt=S[U],mt=lt.object,gt=lt.geometry,Rt=k===null?lt.material:k,Dt=lt.group;mt.layers.test(B.layers)&&so(mt,I,B,gt,Rt,Dt)}}function so(S,I,B,k,U,Q){S.onBeforeRender(_,I,B,k,U,Q),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(_,I,B,k,S,Q),U.transparent===!0&&U.side===Ke&&U.forceSinglePass===!1?(U.side=Ne,U.needsUpdate=!0,_.renderBufferDirect(B,I,k,U,S,Q),U.side=Bi,U.needsUpdate=!0,_.renderBufferDirect(B,I,k,U,S,Q),U.side=Ke):_.renderBufferDirect(B,I,k,U,S,Q),S.onAfterRender(_,I,B,k,U,Q)}function cs(S,I,B){I.isScene!==!0&&(I=fe);const k=Tt.get(S),U=p.state.lights,Q=p.state.shadowsArray,lt=U.state.version,mt=xt.getParameters(S,U.state,Q,I,B),gt=xt.getProgramCacheKey(mt);let Rt=k.programs;k.environment=S.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(S.isMeshStandardMaterial?F:y).get(S.envMap||k.environment),k.envMapRotation=k.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,Rt===void 0&&(S.addEventListener("dispose",Lt),Rt=new Map,k.programs=Rt);let Dt=Rt.get(gt);if(Dt!==void 0){if(k.currentProgram===Dt&&k.lightsStateVersion===lt)return ao(S,mt),Dt}else mt.uniforms=xt.getUniforms(S),S.onBeforeCompile(mt,_),Dt=xt.acquireProgram(mt,gt),Rt.set(gt,Dt),k.uniforms=mt.uniforms;const vt=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(vt.clippingPlanes=j.uniform),ao(S,mt),k.needsLights=Tc(S),k.lightsStateVersion=lt,k.needsLights&&(vt.ambientLightColor.value=U.state.ambient,vt.lightProbe.value=U.state.probe,vt.directionalLights.value=U.state.directional,vt.directionalLightShadows.value=U.state.directionalShadow,vt.spotLights.value=U.state.spot,vt.spotLightShadows.value=U.state.spotShadow,vt.rectAreaLights.value=U.state.rectArea,vt.ltc_1.value=U.state.rectAreaLTC1,vt.ltc_2.value=U.state.rectAreaLTC2,vt.pointLights.value=U.state.point,vt.pointLightShadows.value=U.state.pointShadow,vt.hemisphereLights.value=U.state.hemi,vt.directionalShadowMap.value=U.state.directionalShadowMap,vt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,vt.spotShadowMap.value=U.state.spotShadowMap,vt.spotLightMatrix.value=U.state.spotLightMatrix,vt.spotLightMap.value=U.state.spotLightMap,vt.pointShadowMap.value=U.state.pointShadowMap,vt.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=Dt,k.uniformsList=null,Dt}function ro(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=Xs.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function ao(S,I){const B=Tt.get(S);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Sc(S,I,B,k,U){I.isScene!==!0&&(I=fe),b.resetTextureUnits();const Q=I.fog,lt=k.isMeshStandardMaterial?I.environment:null,mt=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Bn,gt=(k.isMeshStandardMaterial?F:y).get(k.envMap||lt),Rt=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Dt=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),vt=!!B.morphAttributes.position,Yt=!!B.morphAttributes.normal,se=!!B.morphAttributes.color;let ae=zi;k.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ae=_.toneMapping);const ze=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,$t=ze!==void 0?ze.length:0,yt=Tt.get(k),pi=p.state.lights;if(tt===!0&&(_t===!0||S!==M)){const qe=S===M&&k.id===E;j.setState(k,S,qe)}let Zt=!1;k.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==pi.state.version||yt.outputColorSpace!==mt||U.isBatchedMesh&&yt.batching===!1||!U.isBatchedMesh&&yt.batching===!0||U.isBatchedMesh&&yt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&yt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&yt.instancing===!1||!U.isInstancedMesh&&yt.instancing===!0||U.isSkinnedMesh&&yt.skinning===!1||!U.isSkinnedMesh&&yt.skinning===!0||U.isInstancedMesh&&yt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&yt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&yt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&yt.instancingMorph===!1&&U.morphTexture!==null||yt.envMap!==gt||k.fog===!0&&yt.fog!==Q||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==j.numPlanes||yt.numIntersection!==j.numIntersection)||yt.vertexAlphas!==Rt||yt.vertexTangents!==Dt||yt.morphTargets!==vt||yt.morphNormals!==Yt||yt.morphColors!==se||yt.toneMapping!==ae||yt.morphTargetsCount!==$t)&&(Zt=!0):(Zt=!0,yt.__version=k.version);let ti=yt.currentProgram;Zt===!0&&(ti=cs(k,I,U));let hn=!1,ke=!1,Vn=!1;const oe=ti.getUniforms(),oi=yt.uniforms;if(bt.useProgram(ti.program)&&(hn=!0,ke=!0,Vn=!0),k.id!==E&&(E=k.id,ke=!0),hn||M!==S){bt.buffers.depth.getReversed()?(rt.copy(S.projectionMatrix),fh(rt),ph(rt),oe.setValue(N,"projectionMatrix",rt)):oe.setValue(N,"projectionMatrix",S.projectionMatrix),oe.setValue(N,"viewMatrix",S.matrixWorldInverse);const wi=oe.map.cameraPosition;wi!==void 0&&wi.setValue(N,Pt.setFromMatrixPosition(S.matrixWorld)),Ht.logarithmicDepthBuffer&&oe.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&oe.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,ke=!0,Vn=!0)}if(U.isSkinnedMesh){oe.setOptional(N,U,"bindMatrix"),oe.setOptional(N,U,"bindMatrixInverse");const qe=U.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),oe.setValue(N,"boneTexture",qe.boneTexture,b))}U.isBatchedMesh&&(oe.setOptional(N,U,"batchingTexture"),oe.setValue(N,"batchingTexture",U._matricesTexture,b),oe.setOptional(N,U,"batchingIdTexture"),oe.setValue(N,"batchingIdTexture",U._indirectTexture,b),oe.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&oe.setValue(N,"batchingColorTexture",U._colorsTexture,b));const Gn=B.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&Ct.update(U,B,ti),(ke||yt.receiveShadow!==U.receiveShadow)&&(yt.receiveShadow=U.receiveShadow,oe.setValue(N,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(oi.envMap.value=gt,oi.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&I.environment!==null&&(oi.envMapIntensity.value=I.environmentIntensity),ke&&(oe.setValue(N,"toneMappingExposure",_.toneMappingExposure),yt.needsLights&&Ec(oi,Vn),Q&&k.fog===!0&&at.refreshFogUniforms(oi,Q),at.refreshMaterialUniforms(oi,k,V,K,p.state.transmissionRenderTarget[S.id]),Xs.upload(N,ro(yt),oi,b)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Xs.upload(N,ro(yt),oi,b),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&oe.setValue(N,"center",U.center),oe.setValue(N,"modelViewMatrix",U.modelViewMatrix),oe.setValue(N,"normalMatrix",U.normalMatrix),oe.setValue(N,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const qe=k.uniformsGroups;for(let wi=0,Ai=qe.length;wi<Ai;wi++){const oo=qe[wi];D.update(oo,ti),D.bind(oo,ti)}}return ti}function Ec(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function Tc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,I,B){Tt.get(S.texture).__webglTexture=I,Tt.get(S.depthTexture).__webglTexture=B;const k=Tt.get(S);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,I){const B=Tt.get(S);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,B=0){R=S,A=I,C=B;let k=!0,U=null,Q=!1,lt=!1;if(S){const gt=Tt.get(S);if(gt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(N.FRAMEBUFFER,null),k=!1;else if(gt.__webglFramebuffer===void 0)b.setupRenderTarget(S);else if(gt.__hasExternalTextures)b.rebindTextures(S,Tt.get(S.texture).__webglTexture,Tt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const vt=S.depthTexture;if(gt.__boundDepthTexture!==vt){if(vt!==null&&Tt.has(vt)&&(S.width!==vt.image.width||S.height!==vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(S)}}const Rt=S.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(lt=!0);const Dt=Tt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Dt[I])?U=Dt[I][B]:U=Dt[I],Q=!0):S.samples>0&&b.useMultisampledRTT(S)===!1?U=Tt.get(S).__webglMultisampledFramebuffer:Array.isArray(Dt)?U=Dt[B]:U=Dt,P.copy(S.viewport),z.copy(S.scissor),O=S.scissorTest}else P.copy(Mt).multiplyScalar(V).floor(),z.copy(zt).multiplyScalar(V).floor(),O=ee;if(bt.bindFramebuffer(N.FRAMEBUFFER,U)&&k&&bt.drawBuffers(S,U),bt.viewport(P),bt.scissor(z),bt.setScissorTest(O),Q){const gt=Tt.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,gt.__webglTexture,B)}else if(lt){const gt=Tt.get(S.texture),Rt=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,gt.__webglTexture,B||0,Rt)}E=-1},this.readRenderTargetPixels=function(S,I,B,k,U,Q,lt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0&&(mt=mt[lt]),mt){bt.bindFramebuffer(N.FRAMEBUFFER,mt);try{const gt=S.texture,Rt=gt.format,Dt=gt.type;if(!Ht.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-k&&B>=0&&B<=S.height-U&&N.readPixels(I,B,k,U,Ut.convert(Rt),Ut.convert(Dt),Q)}finally{const gt=R!==null?Tt.get(R).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(S,I,B,k,U,Q,lt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0&&(mt=mt[lt]),mt){const gt=S.texture,Rt=gt.format,Dt=gt.type;if(!Ht.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=S.width-k&&B>=0&&B<=S.height-U){bt.bindFramebuffer(N.FRAMEBUFFER,mt);const vt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,vt),N.bufferData(N.PIXEL_PACK_BUFFER,Q.byteLength,N.STREAM_READ),N.readPixels(I,B,k,U,Ut.convert(Rt),Ut.convert(Dt),0);const Yt=R!==null?Tt.get(R).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,Yt);const se=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await dh(N,se,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,vt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Q),N.deleteBuffer(vt),N.deleteSync(se),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,I=null,B=0){S.isTexture!==!0&&(ts("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,S=arguments[1]);const k=Math.pow(2,-B),U=Math.floor(S.image.width*k),Q=Math.floor(S.image.height*k),lt=I!==null?I.x:0,mt=I!==null?I.y:0;b.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,lt,mt,U,Q),bt.unbindTexture()},this.copyTextureToTexture=function(S,I,B=null,k=null,U=0){S.isTexture!==!0&&(ts("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,S=arguments[1],I=arguments[2],U=arguments[3]||0,B=null);let Q,lt,mt,gt,Rt,Dt,vt,Yt,se;const ae=S.isCompressedTexture?S.mipmaps[U]:S.image;B!==null?(Q=B.max.x-B.min.x,lt=B.max.y-B.min.y,mt=B.isBox3?B.max.z-B.min.z:1,gt=B.min.x,Rt=B.min.y,Dt=B.isBox3?B.min.z:0):(Q=ae.width,lt=ae.height,mt=ae.depth||1,gt=0,Rt=0,Dt=0),k!==null?(vt=k.x,Yt=k.y,se=k.z):(vt=0,Yt=0,se=0);const ze=Ut.convert(I.format),$t=Ut.convert(I.type);let yt;I.isData3DTexture?(b.setTexture3D(I,0),yt=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(b.setTexture2DArray(I,0),yt=N.TEXTURE_2D_ARRAY):(b.setTexture2D(I,0),yt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const pi=N.getParameter(N.UNPACK_ROW_LENGTH),Zt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),ti=N.getParameter(N.UNPACK_SKIP_PIXELS),hn=N.getParameter(N.UNPACK_SKIP_ROWS),ke=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ae.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ae.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,gt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Rt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Dt);const Vn=S.isDataArrayTexture||S.isData3DTexture,oe=I.isDataArrayTexture||I.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const oi=Tt.get(S),Gn=Tt.get(I),qe=Tt.get(oi.__renderTarget),wi=Tt.get(Gn.__renderTarget);bt.bindFramebuffer(N.READ_FRAMEBUFFER,qe.__webglFramebuffer),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,wi.__webglFramebuffer);for(let Ai=0;Ai<mt;Ai++)Vn&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tt.get(S).__webglTexture,U,Dt+Ai),S.isDepthTexture?(oe&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tt.get(I).__webglTexture,U,se+Ai),N.blitFramebuffer(gt,Rt,Q,lt,vt,Yt,Q,lt,N.DEPTH_BUFFER_BIT,N.NEAREST)):oe?N.copyTexSubImage3D(yt,U,vt,Yt,se+Ai,gt,Rt,Q,lt):N.copyTexSubImage2D(yt,U,vt,Yt,se+Ai,gt,Rt,Q,lt);bt.bindFramebuffer(N.READ_FRAMEBUFFER,null),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else oe?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(yt,U,vt,Yt,se,Q,lt,mt,ze,$t,ae.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(yt,U,vt,Yt,se,Q,lt,mt,ze,ae.data):N.texSubImage3D(yt,U,vt,Yt,se,Q,lt,mt,ze,$t,ae):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,vt,Yt,Q,lt,ze,$t,ae.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,vt,Yt,ae.width,ae.height,ze,ae.data):N.texSubImage2D(N.TEXTURE_2D,U,vt,Yt,Q,lt,ze,$t,ae);N.pixelStorei(N.UNPACK_ROW_LENGTH,pi),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Zt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ti),N.pixelStorei(N.UNPACK_SKIP_ROWS,hn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,ke),U===0&&I.generateMipmaps&&N.generateMipmap(yt),bt.unbindTexture()},this.copyTextureToTexture3D=function(S,I,B=null,k=null,U=0){return S.isTexture!==!0&&(ts("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,S=arguments[2],I=arguments[3],U=arguments[4]||0),ts('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,I,B,k,U)},this.initRenderTarget=function(S){Tt.get(S).__webglFramebuffer===void 0&&b.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?b.setTextureCube(S,0):S.isData3DTexture?b.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?b.setTexture2DArray(S,0):b.setTexture2D(S,0),bt.unbindTexture()},this.resetState=function(){A=0,C=0,R=null,bt.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class Ya{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ft(t),this.near=e,this.far=i}clone(){return new Ya(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bm extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Be,this.environmentIntensity=1,this.environmentRotation=new Be,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class wm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=La,this.updateRanges=[],this.version=0,this.uuid=Oi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const De=new w;class Ks{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=ci(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Qt(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ci(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ci(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ci(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ci(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),i=Qt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),i=Qt(i,this.array),s=Qt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),i=Qt(i,this.array),s=Qt(s,this.array),r=Qt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new We(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ks(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class uc extends Gi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let bn;const $n=new w,wn=new w,An=new w,Cn=new ct,Zn=new ct,dc=new Gt,Ls=new w,Kn=new w,Ds=new w,rl=new ct,Nr=new ct,al=new ct;class Am extends _e{constructor(t=new uc){if(super(),this.isSprite=!0,this.type="Sprite",bn===void 0){bn=new Te;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new wm(e,5);bn.setIndex([0,1,2,0,2,3]),bn.setAttribute("position",new Ks(i,3,0,!1)),bn.setAttribute("uv",new Ks(i,2,3,!1))}this.geometry=bn,this.material=t,this.center=new ct(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),wn.setFromMatrixScale(this.matrixWorld),dc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),An.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&wn.multiplyScalar(-An.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;Is(Ls.set(-.5,-.5,0),An,a,wn,s,r),Is(Kn.set(.5,-.5,0),An,a,wn,s,r),Is(Ds.set(.5,.5,0),An,a,wn,s,r),rl.set(0,0),Nr.set(1,0),al.set(1,1);let o=t.ray.intersectTriangle(Ls,Kn,Ds,!1,$n);if(o===null&&(Is(Kn.set(-.5,.5,0),An,a,wn,s,r),Nr.set(0,1),o=t.ray.intersectTriangle(Ls,Ds,Kn,!1,$n),o===null))return;const l=t.ray.origin.distanceTo($n);l<t.near||l>t.far||e.push({distance:l,point:$n.clone(),uv:Je.getInterpolation($n,Ls,Kn,Ds,rl,Nr,al,new ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Is(n,t,e,i,s,r){Cn.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(Zn.x=r*Cn.x-s*Cn.y,Zn.y=s*Cn.x+r*Cn.y):Zn.copy(Cn),n.copy(t),n.x+=Zn.x,n.y+=Zn.y,n.applyMatrix4(dc)}class fc extends Gi{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Js=new w,js=new w,ol=new Gt,Jn=new Wa,Us=new os,Fr=new w,ll=new w;class Cm extends _e{constructor(t=new Te,e=new fc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Js.fromBufferAttribute(e,s-1),js.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Js.distanceTo(js);t.setAttribute("lineDistance",new he(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Us.copy(i.boundingSphere),Us.applyMatrix4(s),Us.radius+=r,t.ray.intersectsSphere(Us)===!1)return;ol.copy(s).invert(),Jn.copy(t.ray).applyMatrix4(ol);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){const p=h.getX(v),x=h.getX(v+1),T=Ns(this,t,Jn,l,p,x);T&&e.push(T)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(d),p=Ns(this,t,Jn,l,v,m);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){const p=Ns(this,t,Jn,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=Ns(this,t,Jn,l,g-1,d);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ns(n,t,e,i,s,r){const a=n.geometry.attributes.position;if(Js.fromBufferAttribute(a,s),js.fromBufferAttribute(a,r),e.distanceSqToSegment(Js,js,Fr,ll)>i)return;Fr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Fr);if(!(l<t.near||l>t.far))return{distance:l,point:ll.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class pc extends Gi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const cl=new Gt,Ua=new Wa,Fs=new os,zs=new w;class Rm extends _e{constructor(t=new Te,e=new pc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fs.copy(i.boundingSphere),Fs.applyMatrix4(s),Fs.radius+=r,t.ray.intersectsSphere(Fs)===!1)return;cl.copy(s).invert(),Ua.copy(t.ray).applyMatrix4(cl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=f,v=d;g<v;g++){const m=c.getX(g);zs.fromBufferAttribute(u,m),hl(zs,m,l,s,t,e,this)}}else{const f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let g=f,v=d;g<v;g++)zs.fromBufferAttribute(u,g),hl(zs,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function hl(n,t,e,i,s,r,a){const o=Ua.distanceSqToPoint(n);if(o<e){const l=new w;Ua.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class mc extends Fe{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);const h=i[s],f=i[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ct:new w);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new w,s=[],r=[],a=[],o=new w,l=new Gt;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new w)}r[0]=new w,a[0]=new w;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ae(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Ae(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class $a extends di{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ct){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Pm extends $a{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Za(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return n+t*r+e*a+i*o}}}const Os=new w,zr=new Za,Or=new Za,Br=new Za;class Lm extends di{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new w){const i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Os.subVectors(s[0],s[1]).add(s[0]),c=Os);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Os.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Os),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),zr.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,v,m),Or.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,v,m),Br.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(zr.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Or.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Br.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set(zr.calc(l),Or.calc(l),Br.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new w().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ul(n,t,e,i,s){const r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function Dm(n,t){const e=1-n;return e*e*t}function Im(n,t){return 2*(1-n)*n*t}function Um(n,t){return n*n*t}function is(n,t,e,i){return Dm(n,t)+Im(n,e)+Um(n,i)}function Nm(n,t){const e=1-n;return e*e*e*t}function Fm(n,t){const e=1-n;return 3*e*e*n*t}function zm(n,t){return 3*(1-n)*n*n*t}function Om(n,t){return n*n*n*t}function ns(n,t,e,i,s){return Nm(n,t)+Fm(n,e)+zm(n,i)+Om(n,s)}class gc extends di{constructor(t=new ct,e=new ct,i=new ct,s=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ct){const i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ns(t,s.x,r.x,a.x,o.x),ns(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Bm extends di{constructor(t=new w,e=new w,i=new w,s=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new w){const i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ns(t,s.x,r.x,a.x,o.x),ns(t,s.y,r.y,a.y,o.y),ns(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vc extends di{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class km extends di{constructor(t=new w,e=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new w){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new w){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _c extends di{constructor(t=new ct,e=new ct,i=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ct){const i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(is(t,s.x,r.x,a.x),is(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hm extends di{constructor(t=new w,e=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new w){const i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(is(t,s.x,r.x,a.x),is(t,s.y,r.y,a.y),is(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xc extends di{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(ul(o,l.x,c.x,h.x,u.x),ul(o,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new ct().fromArray(s))}return this}}var dl=Object.freeze({__proto__:null,ArcCurve:Pm,CatmullRomCurve3:Lm,CubicBezierCurve:gc,CubicBezierCurve3:Bm,EllipseCurve:$a,LineCurve:vc,LineCurve3:km,QuadraticBezierCurve:_c,QuadraticBezierCurve3:Hm,SplineCurve:xc});class Vm extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new dl[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new dl[s.type]().fromJSON(s))}return this}}class Gm extends Vm{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new vc(this.currentPoint.clone(),new ct(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new _c(this.currentPoint.clone(),new ct(t,e),new ct(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){const o=new gc(this.currentPoint.clone(),new ct(t,e),new ct(i,s),new ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new xc(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){const c=new $a(t,e,i,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ka extends Te{constructor(t=[new ct(0,-.5),new ct(.5,0),new ct(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Ae(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new w,f=new ct,d=new w,g=new w,v=new w;let m=0,p=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:m=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(g)}for(let x=0;x<=e;x++){const T=i+x*h*s,_=Math.sin(T),L=Math.cos(T);for(let A=0;A<=t.length-1;A++){u.x=t[A].x*_,u.y=t[A].y,u.z=t[A].x*L,a.push(u.x,u.y,u.z),f.x=x/e,f.y=A/(t.length-1),o.push(f.x,f.y);const C=l[3*A+0]*_,R=l[3*A+1],E=l[3*A+0]*L;c.push(C,R,E)}}for(let x=0;x<e;x++)for(let T=0;T<t.length-1;T++){const _=T+x*t.length,L=_,A=_+t.length,C=_+t.length+1,R=_+1;r.push(L,A,R),r.push(C,R,A)}this.setIndex(r),this.setAttribute("position",new he(a,3)),this.setAttribute("uv",new he(o,2)),this.setAttribute("normal",new he(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ka(t.points,t.segments,t.phiStart,t.phiLength)}}class hi extends Ka{constructor(t=1,e=1,i=4,s=8){const r=new Gm;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:i,radialSegments:s}}static fromJSON(t){return new hi(t.radius,t.length,t.capSegments,t.radialSegments)}}class Ti extends Te{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const v=[],m=i/2;let p=0;x(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new he(u,3)),this.setAttribute("normal",new he(f,3)),this.setAttribute("uv",new he(d,2));function x(){const _=new w,L=new w;let A=0;const C=(e-t)/i;for(let R=0;R<=r;R++){const E=[],M=R/r,P=M*(e-t)+t;for(let z=0;z<=s;z++){const O=z/s,W=O*l+o,Y=Math.sin(W),G=Math.cos(W);L.x=P*Y,L.y=-M*i+m,L.z=P*G,u.push(L.x,L.y,L.z),_.set(Y,C,G).normalize(),f.push(_.x,_.y,_.z),d.push(O,1-M),E.push(g++)}v.push(E)}for(let R=0;R<s;R++)for(let E=0;E<r;E++){const M=v[E][R],P=v[E+1][R],z=v[E+1][R+1],O=v[E][R+1];(t>0||E!==0)&&(h.push(M,P,O),A+=3),(e>0||E!==r-1)&&(h.push(P,z,O),A+=3)}c.addGroup(p,A,0),p+=A}function T(_){const L=g,A=new ct,C=new w;let R=0;const E=_===!0?t:e,M=_===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;const P=g;for(let z=0;z<=s;z++){const W=z/s*l+o,Y=Math.cos(W),G=Math.sin(W);C.x=E*G,C.y=m*M,C.z=E*Y,u.push(C.x,C.y,C.z),f.push(0,M,0),A.x=Y*.5+.5,A.y=G*.5*M+.5,d.push(A.x,A.y),g++}for(let z=0;z<s;z++){const O=L+z,W=P+z;_===!0?h.push(W,W+1,O):h.push(W+1,W,O),R+=3}c.addGroup(p,R,_===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ti(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ja extends Te{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new he(r,3)),this.setAttribute("normal",new he(r.slice(),3)),this.setAttribute("uv",new he(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const T=new w,_=new w,L=new w;for(let A=0;A<e.length;A+=3)d(e[A+0],T),d(e[A+1],_),d(e[A+2],L),l(T,_,L,x)}function l(x,T,_,L){const A=L+1,C=[];for(let R=0;R<=A;R++){C[R]=[];const E=x.clone().lerp(_,R/A),M=T.clone().lerp(_,R/A),P=A-R;for(let z=0;z<=P;z++)z===0&&R===A?C[R][z]=E:C[R][z]=E.clone().lerp(M,z/P)}for(let R=0;R<A;R++)for(let E=0;E<2*(A-R)-1;E++){const M=Math.floor(E/2);E%2===0?(f(C[R][M+1]),f(C[R+1][M]),f(C[R][M])):(f(C[R][M+1]),f(C[R+1][M+1]),f(C[R+1][M]))}}function c(x){const T=new w;for(let _=0;_<r.length;_+=3)T.x=r[_+0],T.y=r[_+1],T.z=r[_+2],T.normalize().multiplyScalar(x),r[_+0]=T.x,r[_+1]=T.y,r[_+2]=T.z}function h(){const x=new w;for(let T=0;T<r.length;T+=3){x.x=r[T+0],x.y=r[T+1],x.z=r[T+2];const _=m(x)/2/Math.PI+.5,L=p(x)/Math.PI+.5;a.push(_,1-L)}g(),u()}function u(){for(let x=0;x<a.length;x+=6){const T=a[x+0],_=a[x+2],L=a[x+4],A=Math.max(T,_,L),C=Math.min(T,_,L);A>.9&&C<.1&&(T<.2&&(a[x+0]+=1),_<.2&&(a[x+2]+=1),L<.2&&(a[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function d(x,T){const _=x*3;T.x=t[_+0],T.y=t[_+1],T.z=t[_+2]}function g(){const x=new w,T=new w,_=new w,L=new w,A=new ct,C=new ct,R=new ct;for(let E=0,M=0;E<r.length;E+=9,M+=6){x.set(r[E+0],r[E+1],r[E+2]),T.set(r[E+3],r[E+4],r[E+5]),_.set(r[E+6],r[E+7],r[E+8]),A.set(a[M+0],a[M+1]),C.set(a[M+2],a[M+3]),R.set(a[M+4],a[M+5]),L.copy(x).add(T).add(_).divideScalar(3);const P=m(L);v(A,M+0,x,P),v(C,M+2,T,P),v(R,M+4,_,P)}}function v(x,T,_,L){L<0&&x.x===1&&(a[T]=x.x-1),_.x===0&&_.z===0&&(a[T]=L/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ja(t.vertices,t.indices,t.radius,t.details)}}class ja extends Ja{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ja(t.radius,t.detail)}}class je extends Te{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new w,f=new w,d=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const x=[],T=p/i;let _=0;p===0&&a===0?_=.5/e:p===i&&l===Math.PI&&(_=-.5/e);for(let L=0;L<=e;L++){const A=L/e;u.x=-t*Math.cos(s+A*r)*Math.sin(a+T*o),u.y=t*Math.cos(a+T*o),u.z=t*Math.sin(s+A*r)*Math.sin(a+T*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(A+_,1-T),x.push(c++)}h.push(x)}for(let p=0;p<i;p++)for(let x=0;x<e;x++){const T=h[p][x+1],_=h[p][x],L=h[p+1][x],A=h[p+1][x+1];(p!==0||a>0)&&d.push(T,_,A),(p!==i-1||l<Math.PI)&&d.push(_,L,A)}this.setIndex(d),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new je(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Qa extends Te{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new w,u=new w,f=new w;for(let d=0;d<=i;d++)for(let g=0;g<=s;g++){const v=g/s*r,m=d/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=s;g++){const v=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,x=(s+1)*d+g;a.push(v,m,x),a.push(m,p,x)}this.setIndex(a),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qa(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class le extends Gi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ql,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nr extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Wm extends nr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const kr=new Gt,fl=new w,pl=new w;class yc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xa,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;fl.setFromMatrixPosition(t.matrixWorld),e.position.copy(fl),pl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pl),e.updateMatrixWorld(),kr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(kr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ml=new Gt,jn=new w,Hr=new w;class Xm extends yc{constructor(){super(new Oe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ct(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),jn.setFromMatrixPosition(t.matrixWorld),i.position.copy(jn),Hr.copy(i.position),Hr.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Hr),i.updateMatrixWorld(),s.makeTranslation(-jn.x,-jn.y,-jn.z),ml.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ml)}}class Mc extends nr{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Xm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class qm extends yc{constructor(){super(new rc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ym extends nr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new qm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class $m extends nr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Zm{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=gl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=gl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function gl(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:za}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=za);const Et={player:{radius:.36,standHeight:1.78,crouchHeight:1.24,standEye:1.64,crouchEye:1.1,walkSpeed:4.7,sprintSpeed:6.7,crouchSpeed:2.25,accel:15,airAccel:3.2,jumpSpeed:5.5,gravity:19.5,stepHeight:.44,maxHealth:100,respawnTime:3.6},weapons:{rifle:{id:"rifle",name:"AR-4 RIFLE",slot:1,damage:31,headMultiplier:2.35,fireRate:.105,automatic:!0,magazine:30,reserve:120,reloadTime:1.95,spread:.012,movingSpread:.055,maxSpread:.09,recoil:.012,range:130},pistol:{id:"pistol",name:"P-9 SIDEARM",slot:2,damage:27,headMultiplier:2.5,fireRate:.23,automatic:!1,magazine:12,reserve:60,reloadTime:1.35,spread:.009,movingSpread:.04,maxSpread:.065,recoil:.009,range:90}},difficulties:{Easy:{label:"EASY",reaction:[.55,.95],aimSpread:.085,damageScale:.72,perception:30,fov:105,burst:[2,4],burstPause:[.65,1.1],turnSpeed:5,accuracySkill:.28,aggression:.3,retreatHealth:25},Normal:{label:"NORMAL",reaction:[.28,.5],aimSpread:.047,damageScale:.9,perception:42,fov:120,burst:[3,5],burstPause:[.4,.75],turnSpeed:8,accuracySkill:.55,aggression:.55,retreatHealth:22},Hard:{label:"HARD",reaction:[.13,.27],aimSpread:.027,damageScale:1,perception:56,fov:135,burst:[4,7],burstPause:[.24,.5],turnSpeed:12,accuracySkill:.78,aggression:.78,retreatHealth:18}},modes:{tdm:{id:"tdm",name:"TEAM DEATHMATCH",short:"TDM",teamBased:!0,defaultTime:180,defaultScoreLimit:30},ffa:{id:"ffa",name:"FREE FOR ALL",short:"FFA",teamBased:!1,defaultTime:180,defaultScoreLimit:25}},maps:{old_quarter:{id:"old_quarter",name:"OLD QUARTER",subtitle:"URBAN COURTYARD • DUSK",description:"A walled old-town quarter of plaster facades, market lanes and a central well."},industrial:{id:"industrial",name:"INDUSTRIAL COMPLEX",subtitle:"FACTORY YARD • OVERCAST",description:"A cold freight yard of containers, silos and a warehouse with two open bays."}},quality:{low:{pixelRatio:.8,shadowMap:512,shadows:!1,anisotropy:1,particles:.45,fog:!0,antialias:!1},medium:{pixelRatio:1,shadowMap:1024,shadows:!0,anisotropy:4,particles:.8,fog:!0,antialias:!0},high:{pixelRatio:1.35,shadowMap:2048,shadows:!0,anisotropy:8,particles:1.2,fog:!0,antialias:!0}},botNames:["Viper","Sasha","Maverick","Rook","Kestrel","Bishop","Wraith","Nomad","Hawk","Sable","Ranger","Fox","Mako","Ghost","Aries","Cobalt","Dune","Ember","Frost","Grit","Havoc","Ironside","Jinx"]},Km=Object.values(Et.modes),Jm=Object.values(Et.maps),jm=Object.keys(Et.difficulties),vl="tacticalfps.settings.v2",Vr="tacticalfps.profile.v2",Qs=Object.freeze({sensitivity:1,masterVolume:.7,effectsVolume:.8,musicVolume:.35,quality:"medium",resolutionScale:1,shadows:!0,fov:74,showFps:!1,invertY:!1,crosshairColor:"#d9e2c4"}),Gr=Object.freeze({name:"Operator",team:"CT",matches:0,wins:0,kills:0,deaths:0});function _l(n,t){try{const e=localStorage.getItem(n);if(!e)return{...t};const i=JSON.parse(e);return{...t,...i&&typeof i=="object"?i:{}}}catch{return{...t}}}function xl(n){const t={...Qs,...n};return t.sensitivity=Math.min(2.5,Math.max(.15,Number(t.sensitivity)||1)),t.masterVolume=Math.min(1,Math.max(0,Number(t.masterVolume)||0)),t.effectsVolume=Math.min(1,Math.max(0,Number(t.effectsVolume)||0)),t.musicVolume=Math.min(1,Math.max(0,Number(t.musicVolume)||0)),t.resolutionScale=Math.min(1.25,Math.max(.6,Number(t.resolutionScale)||1)),t.fov=Math.min(95,Math.max(62,Number(t.fov)||74)),["low","medium","high"].includes(t.quality)||(t.quality="medium"),t.shadows=!!t.shadows,t.showFps=!!t.showFps,t.invertY=!!t.invertY,/^#[0-9a-f]{6}$/i.test(t.crosshairColor)||(t.crosshairColor=Qs.crosshairColor),t}class Qm{constructor(){this.settings=xl(_l(vl,Qs));const t=_l(Vr,Gr);this.profile={...Gr,...t,name:String(t.name||"Operator").slice(0,18),team:t.team==="T"?"T":"CT",matches:Number(t.matches)||0,wins:Number(t.wins)||0,kills:Number(t.kills)||0,deaths:Number(t.deaths)||0},this.listeners=new Set}get(t){return t?this.settings[t]:this.settings}update(t){return this.settings=xl({...this.settings,...t}),this.save(),this.listeners.forEach(e=>e(this.settings)),this.settings}reset(){return this.settings={...Qs},this.save(),this.listeners.forEach(t=>t(this.settings)),this.settings}save(){try{localStorage.setItem(vl,JSON.stringify(this.settings))}catch{}}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}updateProfile(t){this.profile={...this.profile,...t};try{localStorage.setItem(Vr,JSON.stringify(this.profile))}catch{}return this.profile}recordMatch({won:t,kills:e,deaths:i}){return this.updateProfile({matches:this.profile.matches+1,wins:this.profile.wins+(t?1:0),kills:this.profile.kills+e,deaths:this.profile.deaths+i})}resetProfile(){this.profile={...Gr,name:this.profile.name};try{localStorage.setItem(Vr,JSON.stringify(this.profile))}catch{}return this.profile}}const Ee=new Qm,an=(n,t,e)=>Math.min(e,Math.max(t,n)),t0=(n,t,e)=>n+(t-n)*e,Ge=(n,t,e,i)=>t0(n,t,1-Math.exp(-e*i)),Bt=(n=0,t=1)=>n+Math.random()*(t-n),e0=(n,t)=>Math.floor(Bt(n,t+1)),i0=n=>{const t=n.slice();for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t},Qn=n=>{const t=Math.max(0,Math.ceil(n));return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`},Ui=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),n0=(n,t)=>{let e=(t-n)%(Math.PI*2);return e>Math.PI&&(e-=Math.PI*2),e<-Math.PI&&(e+=Math.PI*2),e},yl=(n,t,e,i)=>n+n0(n,t)*(1-Math.exp(-e*i)),Ze=n=>String(n).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);class s0{constructor(){this.ctx=null,this.master=null,this.effects=null,this.music=null,this.noiseBuffer=null,this.musicNodes=[],this.enabled=!1,this.lastStep=0}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(t)try{this.ctx=new t,this.master=this.ctx.createGain(),this.effects=this.ctx.createGain(),this.music=this.ctx.createGain(),this.effects.connect(this.master),this.music.connect(this.master),this.master.connect(this.ctx.destination);const e=this.ctx.sampleRate*1.5;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const i=this.noiseBuffer.getChannelData(0);for(let s=0;s<e;s++)i[s]=(Math.random()*2-1)*(1-s/e);this.enabled=!0,this.setVolumes()}catch{this.enabled=!1}}setVolumes(){if(!this.ctx)return;const{masterVolume:t,effectsVolume:e,musicVolume:i}=Ee.get(),s=this.ctx.currentTime;this.master.gain.setTargetAtTime(t,s,.02),this.effects.gain.setTargetAtTime(e,s,.02),this.music.gain.setTargetAtTime(i*.22,s,.05)}get ready(){return!!(this.ctx&&this.enabled&&this.ctx.state==="running")}noiseBurst({duration:t=.1,volume:e=.2,filter:i=1200,type:s="lowpass",when:r=0,q:a=1}){if(!this.ready||e<=1e-4)return;const o=this.ctx,l=o.createBufferSource();l.buffer=this.noiseBuffer;const c=o.createBiquadFilter();c.type=s,c.frequency.value=i,c.Q.value=a;const h=o.createGain(),u=o.currentTime+r;h.gain.setValueAtTime(e,u),h.gain.exponentialRampToValueAtTime(1e-4,u+t),l.connect(c).connect(h).connect(this.effects),l.start(u),l.stop(u+t+.02)}tone({freq:t=440,end:e=t,duration:i=.08,volume:s=.1,type:r="sine",when:a=0}){if(!this.ready||s<=1e-4)return;const o=this.ctx,l=o.createOscillator(),c=o.createGain(),h=o.currentTime+a;l.type=r,l.frequency.setValueAtTime(t,h),l.frequency.exponentialRampToValueAtTime(Math.max(20,e),h+i),c.gain.setValueAtTime(s,h),c.gain.exponentialRampToValueAtTime(1e-4,h+i),l.connect(c).connect(this.effects),l.start(h),l.stop(h+i+.02)}gunshot(t="rifle",e=0){const i=Math.max(0,1-e/90);i<=.02||(t==="pistol"?(this.noiseBurst({duration:.09,volume:.32*i,filter:2300,q:.7}),this.tone({freq:155,end:55,duration:.09,volume:.18*i,type:"triangle"})):(this.noiseBurst({duration:.16,volume:.42*i,filter:1700,q:.6}),this.tone({freq:105,end:38,duration:.14,volume:.28*i,type:"sawtooth"}),this.noiseBurst({duration:.3,volume:.1*i,filter:500,when:.015})))}reload(){this.noiseBurst({duration:.05,volume:.13,filter:2800,type:"bandpass",q:2}),this.tone({freq:480,end:260,duration:.05,volume:.06,type:"square",when:.08}),this.noiseBurst({duration:.06,volume:.14,filter:2100,type:"bandpass",q:2,when:.34})}hitmarker(t=!1){this.tone({freq:t?980:760,end:t?760:600,duration:.055,volume:.12,type:"triangle"})}impact(){this.noiseBurst({duration:.04,volume:.07,filter:2600,type:"bandpass",q:1.4})}footstep(t=!1){const e=performance.now();e-this.lastStep<(t?210:300)||(this.lastStep=e,this.noiseBurst({duration:.055,volume:t?.075:.045,filter:420,q:.8}))}hurt(){this.tone({freq:170,end:90,duration:.12,volume:.14,type:"sawtooth"}),this.noiseBurst({duration:.12,volume:.1,filter:700})}death(){this.tone({freq:160,end:40,duration:.7,volume:.16,type:"sawtooth"}),this.noiseBurst({duration:.4,volume:.12,filter:300})}uiClick(){this.tone({freq:320,end:280,duration:.035,volume:.05,type:"square"})}matchStart(){this.tone({freq:220,end:330,duration:.18,volume:.1,type:"triangle"}),this.tone({freq:330,end:440,duration:.2,volume:.08,type:"triangle",when:.16})}victory(){[392,523,659,784].forEach((e,i)=>this.tone({freq:e,end:e,duration:.28,volume:.09,type:"triangle",when:i*.15}))}defeat(){[330,294,247,196].forEach((e,i)=>this.tone({freq:e,end:e*.98,duration:.3,volume:.08,type:"triangle",when:i*.17}))}startMusic(){if(!this.ctx||this.musicNodes.length)return;const t=this.ctx,e=t.currentTime,i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=420,i.Q.value=.7;const s=t.createGain();s.gain.value=.5,s.connect(i).connect(this.music),[55,82.5,110,164.8].forEach((c,h)=>{const u=t.createOscillator();u.type="triangle",u.frequency.value=c;const f=t.createGain();f.gain.value=.05/(h*.4+1);const d=t.createOscillator();d.frequency.value=.05+h*.013;const g=t.createGain();g.gain.value=.025/(h+1),d.connect(g).connect(f.gain),u.connect(f).connect(s),u.start(e),d.start(e),this.musicNodes.push(u,d)});const a=t.createBufferSource();a.buffer=this.noiseBuffer,a.loop=!0;const o=t.createBiquadFilter();o.type="lowpass",o.frequency.value=280;const l=t.createGain();l.gain.value=.025,a.connect(o).connect(l).connect(s),a.start(e),this.musicNodes.push(a)}stopMusic(){for(const t of this.musicNodes)try{t.stop()}catch{}this.musicNodes.length=0}randomStepPitch(){return Bt(-20,20)}}const ie=new s0;function r0(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,l=new Te;let c=0;for(let h=0;h<n.length;++h){const u=n[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=n[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Ml(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let v=0;v<a[h].length;++v)d.push(a[h][v][f]);const g=Ml(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Ml(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){const h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new We(a,e,i);let l=0;for(let c=0;c<n.length;++c){const h=n[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){const v=h.getComponent(f,g);o.setComponent(f+u,g,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}let Ji=2654435769;const St=()=>(Ji^=Ji<<13,Ji^=Ji>>>17,Ji^=Ji<<5,(Ji>>>0)/4294967296);function be(n,t=256){const e=document.createElement("canvas");e.width=e.height=t;const i=e.getContext("2d");n(i,t);const s=new mc(e);return s.wrapS=s.wrapT=Ys,s.colorSpace=Ue,s.anisotropy=4,s}function we(n,t,e="0,0,0",i=2400,s=.1){for(let r=0;r<i;r++){n.fillStyle=`rgba(${e},${s*(.25+St())})`;const a=1+St()*5;n.fillRect(St()*t,St()*t,a,a*(.4+St()))}}function ji(n,t,e=8,i="40,32,20"){for(let s=0;s<e;s++){const r=St()*t,a=St()*t,o=6+St()*42,l=n.createRadialGradient(r,a,0,r,a,o);l.addColorStop(0,`rgba(${i},${.06+St()*.1})`),l.addColorStop(1,`rgba(${i},0)`),n.fillStyle=l,n.fillRect(r-o,a-o,o*2,o*2)}}const a0={plaster:()=>be((n,t)=>{n.fillStyle="#ad9d80",n.fillRect(0,0,t,t),we(n,t,"53,42,28",2600,.08),ji(n,t,12),n.strokeStyle="rgba(50,40,26,.22)",n.lineWidth=1;for(let e=0;e<7;e++){let i=St()*t,s=St()*t;n.beginPath(),n.moveTo(i,s);for(let r=0;r<5;r++)i+=(St()-.5)*28,s+=St()*18,n.lineTo(i,s);n.stroke()}}),brick:()=>be((n,t)=>{n.fillStyle="#786a5b",n.fillRect(0,0,t,t);const e=62,i=26;for(let s=0;s<Math.ceil(t/i);s++){const r=s%2*e*.5;for(let a=-1;a<Math.ceil(t/e)+1;a++){const o=a*e+r,l=s*i,c=92+Math.floor(St()*32);n.fillStyle=`rgb(${c+20},${c-8},${c-24})`,n.fillRect(o+2,l+2,e-4,i-4),n.fillStyle=`rgba(255,236,205,${.03+St()*.06})`,n.fillRect(o+3,l+3,e-6,4),St()>.8&&(n.fillStyle="rgba(46,38,30,.15)",n.fillRect(o+6+St()*28,l+8,12+St()*18,8))}}we(n,t,"35,25,16",1200,.11)}),concrete:()=>be((n,t)=>{n.fillStyle="#818079",n.fillRect(0,0,t,t),we(n,t,"24,26,22",3e3,.13),ji(n,t,10,"24,24,20"),n.strokeStyle="rgba(38,38,34,.25)",n.lineWidth=1.5;for(let e=0;e<5;e++){let i=St()*t,s=St()*t;n.beginPath(),n.moveTo(i,s);for(let r=0;r<4;r++)i+=(St()-.5)*40,s+=St()*22,n.lineTo(i,s);n.stroke()}n.strokeStyle="rgba(45,45,40,.16)",n.strokeRect(.5,.5,t-1,t-1)}),asphalt:()=>be((n,t)=>{n.fillStyle="#4b4b47",n.fillRect(0,0,t,t),we(n,t,"18,18,17",5e3,.22),we(n,t,"190,186,170",700,.07),ji(n,t,8,"20,20,18");for(let e=0;e<4;e++){n.strokeStyle="rgba(28,28,26,.4)",n.lineWidth=1.2;let i=St()*t,s=St()*t;n.beginPath(),n.moveTo(i,s);for(let r=0;r<5;r++)i+=(St()-.5)*55,s+=14+St()*20,n.lineTo(i,s);n.stroke()}}),cobble:()=>be((n,t)=>{n.fillStyle="#5f5b51",n.fillRect(0,0,t,t);const e=40,i=30;for(let s=0;s<9;s++){const r=s%2*20;for(let a=-1;a<8;a++){const o=a*e+r,l=s*i,c=90+Math.floor(St()*34);n.fillStyle=`rgb(${c+8},${c+2},${c-12})`,n.beginPath(),n.roundRect(o+2,l+2,e-4,i-4,6),n.fill(),n.fillStyle="rgba(255,240,210,.06)",n.fillRect(o+6,l+5,e-16,4)}}we(n,t,"30,28,22",1300,.12)}),stone:()=>be((n,t)=>{n.fillStyle="#918a76",n.fillRect(0,0,t,t);for(let e=0;e<7;e++){const i=e%2*22;for(let s=-1;s<6;s++){const r=s*52+i,a=e*38,o=130+Math.floor(St()*38);n.fillStyle=`rgb(${o},${o-6},${o-24})`,n.fillRect(r+2,a+2,48,34),n.fillStyle="rgba(255,244,216,.08)",n.fillRect(r+3,a+3,46,3)}}we(n,t,"34,30,22",1600,.1)}),wood:()=>be((n,t)=>{n.fillStyle="#806339",n.fillRect(0,0,t,t);for(let e=0;e<8;e++){const i=e*32,s=88+Math.floor(St()*26);n.fillStyle=`rgb(${s+26},${s-4},${s-42})`,n.fillRect(0,i+2,t,28),n.strokeStyle="rgba(45,28,12,.32)",n.lineWidth=1;for(let r=0;r<5;r++){const a=i+6+St()*20;n.beginPath(),n.moveTo(0,a),n.bezierCurveTo(t*.3,a+(St()-.5)*7,t*.7,a+(St()-.5)*7,t,a),n.stroke()}n.fillStyle="rgba(25,16,8,.6)",n.fillRect(0,i,t,2),n.fillStyle="rgba(230,200,150,.1)",n.fillRect(0,i+3,t,2),n.fillStyle="rgba(25,24,20,.8)",n.fillRect(14+St()*20,i+14,3,3),n.fillRect(t-22-St()*20,i+14,3,3)}}),woodDark:()=>be((n,t)=>{n.fillStyle="#49341f",n.fillRect(0,0,t,t);for(let e=0;e<10;e++){const i=54+Math.floor(St()*22);n.fillStyle=`rgb(${i+20},${i+4},${i-16})`,n.fillRect(e*26,0,24,t),n.strokeStyle="rgba(20,12,6,.5)",n.lineWidth=1;for(let s=0;s<4;s++){const r=e*26+4+St()*18;n.beginPath(),n.moveTo(r,0),n.lineTo(r+(St()-.5)*8,t),n.stroke()}n.fillStyle="rgba(10,7,4,.6)",n.fillRect(e*26,0,2,t)}we(n,t,"20,14,8",600,.1)}),metal:()=>be((n,t)=>{n.fillStyle="#656961",n.fillRect(0,0,t,t);for(let e=0;e<400;e++){const i=St()*t;n.strokeStyle=`rgba(${St()>.5?"230,232,220":"30,32,30"},${.02+St()*.07})`,n.beginPath(),n.moveTo(0,i),n.lineTo(t,i+(St()-.5)*2),n.stroke()}n.fillStyle="rgba(30,31,28,.5)";for(let e=20;e<t;e+=64)for(let i=20;i<t;i+=64)n.beginPath(),n.arc(e,i,2.2,0,Math.PI*2),n.fill();ji(n,t,7,"50,30,20")}),rust:()=>be((n,t)=>{n.fillStyle="#70472f",n.fillRect(0,0,t,t),we(n,t,"42,24,14",3200,.2),we(n,t,"190,110,55",900,.12),ji(n,t,10,"45,25,14")}),roof:()=>be((n,t)=>{n.fillStyle="#7c4c36",n.fillRect(0,0,t,t);for(let e=0;e<8;e++){const i=e*32;for(let s=0;s<8;s++){const r=s*32+e%2*16,a=106+Math.floor(St()*34);n.fillStyle=`rgb(${a+16},${a-24},${a-44})`,n.beginPath(),n.arc(r+16,i+30,16,Math.PI,0),n.fill(),n.strokeStyle="rgba(40,20,12,.5)",n.lineWidth=1.5,n.beginPath(),n.arc(r+16,i+30,15,Math.PI,0),n.stroke()}}we(n,t,"40,20,12",1200,.13)}),container:(n="#4e6a70")=>be((t,e)=>{t.fillStyle=n,t.fillRect(0,0,e,e);for(let i=0;i<e;i+=16)t.fillStyle="rgba(255,255,255,.08)",t.fillRect(i,0,5,e),t.fillStyle="rgba(0,0,0,.16)",t.fillRect(i+8,0,5,e);we(t,e,"20,24,24",1400,.12),ji(t,e,9,"70,36,18"),t.strokeStyle="rgba(20,24,22,.5)",t.strokeRect(1,1,e-2,e-2)}),tarp:()=>be((n,t)=>{n.fillStyle="#7c7a62",n.fillRect(0,0,t,t),we(n,t,"35,34,28",2400,.16),n.strokeStyle="rgba(235,232,210,.12)",n.lineWidth=2;for(let e=0;e<t;e+=32)n.beginPath(),n.moveTo(0,e),n.lineTo(t,e),n.stroke();ji(n,t,5,"40,38,28")}),sandbag:()=>be((n,t)=>{n.fillStyle="#8a8064",n.fillRect(0,0,t,t),we(n,t,"48,43,30",3500,.18),n.strokeStyle="rgba(50,44,30,.3)",n.lineWidth=1;for(let e=0;e<20;e++)n.beginPath(),n.moveTo(0,St()*t),n.lineTo(t,St()*t),n.stroke()}),dirt:()=>be((n,t)=>{n.fillStyle="#5c513c",n.fillRect(0,0,t,t),we(n,t,"32,27,18",5e3,.22),we(n,t,"150,136,104",600,.1)}),foliage:()=>be((n,t)=>{n.fillStyle="#47523a",n.fillRect(0,0,t,t);for(let e=0;e<500;e++)n.fillStyle=`rgba(${40+St()*50},${70+St()*55},${35+St()*30},${.3+St()*.4})`,n.beginPath(),n.ellipse(St()*t,St()*t,1+St()*3,2+St()*5,St()*3,0,Math.PI*2),n.fill()}),warning:()=>be((n,t)=>{n.fillStyle="#b39532",n.fillRect(0,0,t,t),n.fillStyle="#25241e";for(let e=-t;e<t*2;e+=64)n.beginPath(),n.moveTo(e,0),n.lineTo(e+28,0),n.lineTo(e-t+28,t),n.lineTo(e-t,t),n.fill();we(n,t,"30,28,20",1200,.16)})},Na={plaster:{texture:"plaster",roughness:.96,uv:.3},brick:{texture:"brick",roughness:.95,uv:.45},concrete:{texture:"concrete",roughness:.98,uv:.3},asphalt:{texture:"asphalt",roughness:1,uv:.12},cobble:{texture:"cobble",roughness:.96,uv:.24},stone:{texture:"stone",roughness:.92,uv:.32},wood:{texture:"wood",roughness:.9,uv:.45},woodDark:{texture:"woodDark",roughness:.9,uv:.5},metal:{texture:"metal",roughness:.55,metalness:.35,uv:.35},rust:{texture:"rust",roughness:.9,metalness:.1,uv:.35},roof:{texture:"roof",roughness:.95,uv:.4},tarp:{texture:"tarp",roughness:.96,uv:.35},sandbag:{texture:"sandbag",roughness:1,uv:.7},dirt:{texture:"dirt",roughness:1,uv:.2},foliage:{texture:"foliage",roughness:1,uv:1},warning:{texture:"warning",roughness:.9,uv:.4},containerBlue:{texture:"container",textureArgs:["#4d6870"],roughness:.7,metalness:.2,uv:.35},containerRed:{texture:"container",textureArgs:["#7c4537"],roughness:.72,metalness:.2,uv:.35},containerGreen:{texture:"container",textureArgs:["#4f6045"],roughness:.72,metalness:.2,uv:.35},glass:{color:5466213,roughness:.25,metalness:.35},darkGlass:{color:2831412,roughness:.3,metalness:.3},black:{color:1908251,roughness:.85},steel:{color:7830386,roughness:.4,metalness:.55},brass:{color:10848845,roughness:.35,metalness:.6},fabric:{color:7236181,roughness:1},redCloth:{color:8207665,roughness:1},paintWhite:{color:12499882,roughness:.9},paintAmber:{color:11570253,roughness:.9},water:{color:4155747,roughness:.15,metalness:.2,transparent:!0,opacity:.82},emissiveLamp:{color:12886627,emissive:9067298,emissiveIntensity:1.4},skin:{color:11448463,roughness:.8}},Wr=new Map,qs=new Map;function o0(n,t){const e=t?`${n}:${t.join(",")}`:n;if(!qs.has(e)){const i=a0[n];qs.set(e,i?i(...t||[]):null)}return qs.get(e)}function Fa(n){if(Wr.has(n))return Wr.get(n);const t=Na[n]||Na.concrete,e={roughness:t.roughness??.9};t.texture&&(e.map=o0(t.texture,t.textureArgs)),t.color!==void 0&&(e.color=t.color),t.metalness!==void 0&&(e.metalness=t.metalness),t.emissive!==void 0&&(e.emissive=t.emissive),t.emissiveIntensity!==void 0&&(e.emissiveIntensity=t.emissiveIntensity),t.transparent&&(e.transparent=!0,e.opacity=t.opacity);const i=new le(e);return i.userData.uv=t.uv??.35,Wr.set(n,i),i}function Sl(n){const t=Na[n];return t!=null&&t.uv?t.uv:Fa(n).userData.uv}function l0(n){for(const t of qs.values())t&&(t.anisotropy=n)}class c0{constructor(t,e){this.scene=t,this.bounds=e,this.group=new Se,this.group.name="world",t.add(this.group),this.colliders=[],this.buckets=new Map,this.extraObjects=[],this.supports=[]}boxGeometry(t,e,i,s){const r=new de(t,e,i),a=r.attributes.uv,o=[[i,e],[i,e],[t,i],[t,i],[t,e],[t,e]];for(let l=0;l<6;l++)for(let c=0;c<4;c++){const h=l*4+c,[u,f]=o[l];a.setXY(h,a.getX(h)*u*s,a.getY(h)*f*s)}return r}addGeometry(t,e,i,{collide:s=!1,shadow:r=!0}={}){const a=Fa(e),o=t.index?t.toNonIndexed():t.clone();t.dispose(),i&&o.applyMatrix4(i);const l=`${e}:${r?1:0}`;if(this.buckets.has(l)||this.buckets.set(l,{material:a,geometries:[],shadow:r}),this.buckets.get(l).geometries.push(o),s){o.computeBoundingBox();const c=o.boundingBox;this.addColliderBox(c.min.x,c.max.x,c.min.z,c.max.z,c.min.y,c.max.y)}}addColliderBox(t,e,i,s,r,a,{support:o=!0,tag:l=""}={}){e-t<.01||s-i<.01||this.colliders.push({minX:t,maxX:e,minZ:i,maxZ:s,minY:r,maxY:a,support:o,tag:l})}addBox({x:t,z:e,y:i=0,w:s,h:r,d:a,material:o="concrete",collide:l=!0,support:c=!0,shadow:h=!0,uv:u,tag:f=""}){const d=this.boxGeometry(s,r,a,u??Sl(o)),g=new Gt().makeTranslation(t,i+r/2,e);this.addGeometry(d,o,g,{shadow:h}),l&&this.addColliderBox(t-s/2,t+s/2,e-a/2,e+a/2,i,i+r,{support:c,tag:f})}addDecoBox({x:t,z:e,y:i=0,w:s,h:r,d:a,material:o="concrete",rx:l=0,ry:c=0,rz:h=0,shadow:u=!0}){const f=this.boxGeometry(s,r,a,Sl(o)),d=new Gt().compose(new w(t,i+r/2,e),new si().setFromEuler(new Be(l,c,h)),new w(1,1,1));this.addGeometry(f,o,d,{shadow:u})}addCylinder({x:t,z:e,y:i=0,radius:s,radiusTop:r,h:a,material:o="metal",segments:l=10,collide:c=!0,support:h=!0,rx:u=0,ry:f=0,rz:d=0,shadow:g=!0,uv:v=.5}){const m=new Ti(r??s,s,a,l),p=m.attributes.uv;for(let T=0;T<p.count;T++)p.setXY(T,p.getX(T)*Math.PI*2*s*v,p.getY(T)*a*v);const x=new Gt().compose(new w(t,i+a/2,e),new si().setFromEuler(new Be(u,f,d)),new w(1,1,1));if(this.addGeometry(m,o,x,{shadow:g}),c){const T=Math.max(s,r??s);this.addColliderBox(t-T,t+T,e-T,e+T,i,i+a,{support:h})}}addCylinderBetween(t,e,i,s="metal",r=8,{collide:a=!1}={}){const o=new w(t.x,t.y,t.z),l=new w(e.x,e.y,e.z),c=l.clone().sub(o),h=c.length(),u=new Ti(i,i,h,r),f=new si().setFromUnitVectors(new w(0,1,0),c.clone().normalize()),d=new Gt().compose(o.clone().add(l).multiplyScalar(.5),f,new w(1,1,1));if(this.addGeometry(u,s,d,{shadow:!0}),a){const g=i+.02;this.addColliderBox(Math.min(o.x,l.x)-g,Math.max(o.x,l.x)+g,Math.min(o.z,l.z)-g,Math.max(o.z,l.z)+g,Math.min(o.y,l.y),Math.max(o.y,l.y),{support:!1})}}addTorus({x:t,z:e,y:i=0,radius:s=1.8,tube:r=.24,material:a="stone",segments:o=14,arc:l=Math.PI,rx:c=0,ry:h=0,rz:u=0}){const f=new Qa(s,r,6,o,l),d=new Gt().compose(new w(t,i,e),new si().setFromEuler(new Be(c,h,u)),new w(1,1,1));this.addGeometry(f,a,d)}addSphere({x:t,z:e,y:i=0,radius:s=1,material:r="foliage",segments:a=8,scale:o=[1,1,1]}){const l=new ja(s,1),c=new Gt().compose(new w(t,i,e),new si,new w(...o));this.addGeometry(l,r,c)}addPlaneDecal(t,e,i,s,r="paintWhite",a=.012){this.addBox({x:t,z:e,y:a,w:i,h:.008,d:s,material:r,collide:!1,shadow:!1})}crate(t,e,i=1.25,s=0,r="wood"){this.addBox({x:t,z:e,y:s,w:i,h:i,d:i,material:r}),this.addDecoBox({x:t,z:e,y:s+i-.06,w:i+.06,h:.09,d:i+.06,material:"woodDark",shadow:!1}),this.addDecoBox({x:t,z:e,y:s+i*.48,w:i+.04,h:.08,d:i+.04,material:"woodDark",shadow:!1});for(const a of[-1,1])this.addDecoBox({x:t+a*(i/2+.025),z:e,y:s+.08,w:.05,h:i-.16,d:i*.86,material:"woodDark",shadow:!1})}barrel(t,e,i=0,s="rust"){this.addCylinder({x:t,z:e,y:i,radius:.46,h:1.18,material:s,segments:12,uv:.7});for(const r of[.22,.94])this.addCylinder({x:t,z:e,y:i+r,radius:.485,h:.07,material:"metal",segments:12,collide:!1})}sandbagWall(t,e,i=3,s=0,r=3){const a=r,o=.8,l=.34;for(let u=0;u<a;u++){const f=Math.ceil(i/o);for(let d=0;d<f;d++){const g=-i/2+o/2+d*o+u%2*o*.3,v=Math.cos(s)*g,m=Math.sin(s)*g,p=new je(.44,7,5),x=new Gt().compose(new w(t+v,u*l+.17,e+m),new si().setFromEuler(new Be(.05,s,0)),new w(.92,.62,.74));this.addGeometry(p,"sandbag",x)}}const c=Math.abs(Math.cos(s))*i/2+.3,h=Math.abs(Math.sin(s))*i/2+.3;this.addColliderBox(t-c,t+c,e-h,e+h,0,a*l,{support:!0})}lampPost(t,e,i=5.2){this.addCylinder({x:t,z:e,y:0,radius:.1,radiusTop:.075,h:i,material:"black",segments:7,collide:!0}),this.addCylinder({x:t,z:e,y:.05,radius:.24,h:.25,material:"black",segments:8,collide:!1}),this.addDecoBox({x:t+.24,z:e,y:i-.25,w:.7,h:.08,d:.08,material:"black",shadow:!1}),this.addDecoBox({x:t+.55,z:e,y:i-.55,w:.26,h:.38,d:.26,material:"emissiveLamp",shadow:!1});const s=new Mc(16762242,9,9,2);s.position.set(t+.55,i-.6,e),this.extraObjects.push(s),this.scene.add(s)}marketStall(t,e,i=0){const s=Math.cos(i),r=Math.sin(i);for(const[a,o]of[[-1.5,-1.1],[1.5,-1.1],[-1.5,1.1],[1.5,1.1]])this.addCylinder({x:t+a*s-o*r,z:e+a*r+o*s,y:0,radius:.07,h:2.5,material:"woodDark",segments:6,collide:!1});this.addDecoBox({x:t,z:e,y:2.42,w:3.5,h:.12,d:2.7,material:"redCloth",ry:i,rx:.08}),this.addBox({x:t,z:e,y:0,w:2.9,h:.9,d:1.7,material:"wood",collide:!0}),this.addDecoBox({x:t,z:e,y:.9,w:3.1,h:.09,d:1.9,material:"woodDark"}),this.crate(t-.7,e,.6,.98,"wood"),this.crate(t+.7,e+.2,.5,.98,"wood")}planter(t,e,i=1.6){this.addBox({x:t,z:e,y:0,w:i,h:.5,d:i,material:"stone"}),this.addBox({x:t,z:e,y:.32,w:i-.22,h:.2,d:i-.22,material:"dirt",collide:!1}),this.addSphere({x:t,z:e,y:.85,radius:.65,material:"foliage",scale:[1.1,1.25,1.1]}),this.addSphere({x:t+.2,z:e-.1,y:1.15,radius:.4,material:"foliage",scale:[1,1.1,1]})}bench(t,e,i=0){this.addBox({x:t,z:e,y:.42,w:1.9,h:.14,d:.55,material:"wood",collide:!1}),this.addDecoBox({x:t,z:e-.22,y:.55,w:1.9,h:.55,d:.1,material:"wood",ry:i});for(const s of[-.75,.75])this.addDecoBox({x:t+s,z:e,y:0,w:.12,h:.42,d:.5,material:"metal"});this.addColliderBox(t-1,t+1,e-.35,e+.35,0,.95)}fence(t,e,i,s,r=2.1){const a=i-t,o=s-e,l=Math.hypot(a,o),c=Math.atan2(o,a),h=Math.max(2,Math.round(l/2.2)+1);for(let f=0;f<h;f++){const d=f/(h-1);this.addCylinder({x:t+a*d,z:e+o*d,y:0,radius:.055,h:r,material:"metal",segments:6,collide:!1})}for(const f of[.45,r-.2])this.addDecoBox({x:(t+i)/2,z:(e+s)/2,y:f,w:l,h:.06,d:.06,material:"metal",ry:c,shadow:!1});const u=.18;this.addColliderBox(Math.min(t,i)-u,Math.max(t,i)+u,Math.min(e,s)-u,Math.max(e,s)+u,0,r,{support:!1})}container(t,e,i=6,s=0,r="containerBlue",a=0){this.addDecoBox({x:t,z:e,y:a,w:i,h:2.6,d:2.5,material:r,ry:s});const c=Math.cos(s),h=Math.sin(s);for(const d of[-1,1]){const g=(i/2-.08)*c,v=(i/2-.08)*h;this.addDecoBox({x:t+g,z:e+v,y:a,w:.16,h:2.6,d:2.5,material:"metal",ry:s,shadow:!1})}for(const d of[.12,2.6-.12])this.addDecoBox({x:t,z:e,y:a+d,w:i,h:.1,d:2.5+.04,material:"metal",ry:s,shadow:!1});const u=Math.abs(c)*i/2+Math.abs(h)*2.5/2,f=Math.abs(h)*i/2+Math.abs(c)*2.5/2;this.addColliderBox(t-u,t+u,e-f,e+f,a,a+2.6,{support:!0})}building({x:t,z:e,w:i,d:s,h:r,material:a="plaster",roof:o="roof",windows:l=!0,door:c=!0,balcony:h=!1,variant:u=0}){this.addBox({x:t,z:e,w:i,h:r,d:s,material:a}),this.addDecoBox({x:t,z:e,y:r-.28,w:i+.7,h:.28,d:s+.7,material:"stone",shadow:!1}),this.addDecoBox({x:t,z:e,y:r-.62,w:i+.35,h:.16,d:s+.35,material:"stone",shadow:!1}),this.addDecoBox({x:t,z:e,y:r,w:i+.2,h:.2,d:s+.2,material:o,shadow:!0}),this.addDecoBox({x:t,z:e,y:r+.2,w:i+.2,h:.45,d:.35,material:a,shadow:!1}),this.addDecoBox({x:t,z:e-s/2,y:r+.2,w:.35,h:.45,d:s+.2,material:a,shadow:!1});const f=(d,g,v,m,p,x)=>{const T=Math.max(2,Math.floor(v/4));for(let _=0;_<T;_++){const A=((_+.5)/T-.5)*(v-2.2),C=d==="x"?t+A:t+p,R=d==="x"?e+p:e+A,E=r>8?2:1;for(let M=0;M<E;M++){const P=x+M*3.3,z=1.15,O=1.65,W=d==="x"?z:.16,Y=d==="x"?.16:z;if(this.addDecoBox({x:C,z:R,y:P,w:W+.3,h:O+.3,d:Y+.3,material:"stone",shadow:!1}),this.addDecoBox({x:C+(d==="x"?0:g*.05),z:R+(d==="x"?g*.05:0),y:P+.15,w:W,h:O,d:Y,material:"darkGlass",shadow:!1}),this.addDecoBox({x:C,z:R,y:P-.1,w:d==="x"?z+.5:.32,h:.13,d:d==="x"?.32:z+.5,material:"stone",shadow:!1}),this.addDecoBox({x:C,z:R,y:P+O+.05,w:d==="x"?z+.42:.26,h:.2,d:d==="x"?.26:z+.42,material:"stone",shadow:!1}),this.addDecoBox({x:C,z:R,y:P+O*.5,w:d==="x"?z:.05,h:.06,d:d==="x"?.05:z,material:"woodDark",shadow:!1}),u%2===0){const G=d==="x"?z*.72:0,K=d==="x"?0:z*.72;this.addDecoBox({x:C-G,z:R-K,y:P+.12,w:d==="x"?.38:.1,h:O-.24,d:d==="x"?.1:.38,material:"woodDark",shadow:!1}),this.addDecoBox({x:C+G,z:R+K,y:P+.12,w:d==="x"?.38:.1,h:O-.24,d:d==="x"?.1:.38,material:"woodDark",shadow:!1})}}}if(c){const _=d==="x"?t:t+p,L=d==="x"?e+p:e;this.addDecoBox({x:_,z:L,y:0,w:d==="x"?1.45:.2,h:2.45,d:d==="x"?.2:1.45,material:"woodDark",shadow:!1}),this.addDecoBox({x:_,z:L,y:2.45,w:d==="x"?1.75:.3,h:.18,d:d==="x"?.3:1.75,material:"stone",shadow:!1})}};if(l&&(f("x",1,i,0,s/2+.06,2.4+u%3*.15),f("x",-1,i,0,-s/2-.06,2.4+u%2*.2),f("z",1,s,0,i/2+.06,2.4),f("z",-1,s,0,-i/2-.06,2.4)),h){const d=t+i*.26,g=e+s/2+.65;this.addDecoBox({x:d,z:g,y:3.55,w:3.2,h:.15,d:1.25,material:"stone"});for(let v=-1;v<=1;v++)this.addDecoBox({x:d+v*1.25,z:g+.5,y:3.7,w:.08,h:.9,d:.08,material:"metal",shadow:!1});this.addDecoBox({x:d,z:g+.5,y:4.55,w:3.2,h:.07,d:.07,material:"metal",shadow:!1})}}archway(t,e,i=0,s=3.8,r=3.9){const a=Math.cos(i),o=Math.sin(i);for(const l of[-1,1]){const c=l*s/2*a,h=l*s/2*o;this.addBox({x:t+c,z:e+h,y:0,w:.65,h:r-.5,d:.9,material:"stone"})}this.addDecoBox({x:t,z:e,y:r-.55,w:s+.8,h:.5,d:.95,material:"stone",ry:i}),this.addTorus({x:t,z:e,y:r-.55,radius:s/2,tube:.2,material:"stone",arc:Math.PI,ry:i}),this.addDecoBox({x:t,z:e,y:r-.35,w:s+1,h:.18,d:1.1,material:"stone",ry:i,shadow:!1})}fountain(t,e,i=2.5){this.addCylinder({x:t,z:e,y:0,radius:i,h:.6,material:"stone",segments:16,collide:!0}),this.addCylinder({x:t,z:e,y:.05,radius:i-.35,h:.56,material:"water",segments:16,collide:!1}),this.addCylinder({x:t,z:e,y:.6,radius:.32,h:1.4,material:"stone",segments:10,collide:!0}),this.addCylinder({x:t,z:e,y:1.7,radius:.75,h:.22,material:"stone",segments:12,collide:!1}),this.addSphere({x:t,z:e,y:2.05,radius:.26,material:"brass",scale:[1,1.15,1]})}tree(t,e,i=4.4){this.addCylinder({x:t,z:e,y:0,radius:.2,radiusTop:.13,h:i,material:"woodDark",segments:7,collide:!0}),this.addSphere({x:t,z:e,y:i+.6,radius:1.5,material:"foliage",scale:[1,.9,1]}),this.addSphere({x:t+.8,z:e+.3,y:i-.1,radius:1.05,material:"foliage",scale:[1,.9,1]}),this.addSphere({x:t-.7,z:e-.4,y:i+.3,radius:1.1,material:"foliage"})}rubbleField(t,e,i=4,s=14){for(let r=0;r<s;r++){const a=Math.random()*Math.PI*2,o=Math.random()*i,l=.2+Math.random()*.65;this.addSphere({x:t+Math.cos(a)*o,z:e+Math.sin(a)*o,y:l*.5,radius:l,material:Math.random()>.4?"concrete":"stone",scale:[1.2,.65,1]})}}finalize(){for(const[e,{material:i,geometries:s,shadow:r}]of this.buckets){if(!s.length)continue;const a=s.length===1?s[0]:r0(s,!1);if(!a)continue;a.computeBoundingSphere();const o=new ce(a,i);o.name=`static:${e.split(":")[0]}`,o.castShadow=r,o.receiveShadow=!0,o.matrixAutoUpdate=!1,this.group.add(o),s.forEach(l=>{l!==a&&l.dispose()})}this.buckets.clear();const t=new ce(new Vi(this.bounds.maxX-this.bounds.minX+30,this.bounds.maxZ-this.bounds.minZ+30),Fa("asphalt"));t.rotation.x=-Math.PI/2,t.position.set((this.bounds.maxX+this.bounds.minX)/2,-.02,(this.bounds.maxZ+this.bounds.minZ)/2),t.receiveShadow=!0,this.group.add(t)}collidesCircle(t,e,i,s,r){for(const a of this.colliders)if(!(a.maxY<=s||a.minY>=r)&&t+i>a.minX&&t-i<a.maxX&&e+i>a.minZ&&e-i<a.maxZ)return!0;return!1}groundAt(t,e,i,s){let r=0;for(const a of this.colliders)a.support&&(a.maxY>s+.001||t+i>a.minX&&t-i<a.maxX&&e+i>a.minZ&&e-i<a.maxZ&&a.maxY>r&&(r=a.maxY));return r}pathClear(t,e,i=.42,s=.45){const r=e.x-t.x,a=e.z-t.z,o=Math.hypot(r,a),l=Math.max(1,Math.ceil(o/.7));for(let c=0;c<=l;c++){const h=c/l,u=t.x+r*h,f=t.z+a*h,d=(t.y??0)+((e.y??0)-(t.y??0))*h;if(this.collidesCircle(u,f,i,d+s,d+1.7))return!1}return!0}segmentBlocked(t,e){return this.segmentHitFraction(t,e)!==null}segmentHitFraction(t,e){let i=null;const s=e.x-t.x,r=e.y-t.y,a=e.z-t.z;for(const o of this.colliders){let l=0,c=1,h=!0;const u=[[t.x,s,o.minX,o.maxX],[t.y,r,o.minY,o.maxY],[t.z,a,o.minZ,o.maxZ]];for(const[f,d,g,v]of u)if(Math.abs(d)<1e-7){if(f<g||f>v){h=!1;break}}else{let m=(g-f)/d,p=(v-f)/d;if(m>p&&([m,p]=[p,m]),l=Math.max(l,m),c=Math.min(c,p),l>c){h=!1;break}}h&&l>.001&&(i===null||l<i)&&(i=l)}return i}clampToBounds(t,e){t.x=Math.max(this.bounds.minX+e,Math.min(this.bounds.maxX-e,t.x)),t.z=Math.max(this.bounds.minZ+e,Math.min(this.bounds.maxZ-e,t.z))}dispose(){for(const t of this.extraObjects)t.parent&&t.parent.remove(t),t.dispose&&t.dispose();this.scene.remove(this.group),this.group.traverse(t=>{t.geometry&&t.geometry.dispose()}),this.extraObjects.length=0,this.colliders.length=0}}class h0{constructor(t,e,{maxLink:i=14,maxRise:s=.52,radius:r=.38}={}){this.world=e,this.radius=r,this.nodes=t.map((a,o)=>({index:o,x:a.x,z:a.z,y:a.y??0,tag:a.tag||"",links:a.links||[],edges:[]})),this.build()}build(){for(const t of this.nodes)t.edges.length=0;for(let t=0;t<this.nodes.length;t++){const e=this.nodes[t];for(let i=t+1;i<this.nodes.length;i++){const s=this.nodes[i];if(Math.abs(e.y-s.y)>.56)continue;const r=Math.hypot(e.x-s.x,e.z-s.z);if(r>14.5||!this.world.pathClear(e,s,this.radius))continue;const a=r+Math.abs(e.y-s.y)*1.5;e.edges.push({to:i,weight:a}),s.edges.push({to:t,weight:a})}}for(const t of this.nodes)for(const e of t.links)if(!(e<0||e>=this.nodes.length)&&!t.edges.some(i=>i.to===e)){const i=this.nodes[e],s=Math.hypot(t.x-i.x,t.z-i.z);t.edges.push({to:e,weight:s+.1}),i.edges.some(r=>r.to===t.index)||i.edges.push({to:t.index,weight:s+.1})}this.ensureConnectivity()}ensureConnectivity(){const t=new Array(this.nodes.length).fill(-1);let e=0;for(let i=0;i<this.nodes.length;i++){if(t[i]!==-1)continue;const s=[i];for(t[i]=e;s.length;){const r=s.pop();for(const a of this.nodes[r].edges)t[a.to]===-1&&(t[a.to]=e,s.push(a.to))}e++}for(;e>1;){let i=null;for(let o=0;o<this.nodes.length;o++)for(let l=0;l<this.nodes.length;l++){if(t[o]===t[l])continue;const c=this.nodes[o],h=this.nodes[l];if(Math.abs(c.y-h.y)>.8)continue;const u=Math.hypot(c.x-h.x,c.z-h.z);u>18||i&&u>=i.d||this.world.pathClear(c,h,this.radius)&&(i={i:o,j:l,d:u})}if(!i)break;const s=this.nodes[i.i],r=this.nodes[i.j];s.edges.push({to:r.index,weight:i.d}),r.edges.push({to:s.index,weight:i.d});const a=t[r.index];for(let o=0;o<t.length;o++)t[o]===a&&(t[o]=t[i.i]);e=new Set(t).size}this.componentCount=e}nearestNode(t,e=!1){let i=null,s=1/0;for(const r of this.nodes){const a=e?0:(r.y-t.y)*2.2,o=Math.hypot(r.x-t.x,r.z-t.z,a);o<s&&(s=o,i=r)}return i}findPath(t,e,{exactStart:i=!0,exactEnd:s=!1}={}){if(!this.nodes.length)return null;const r=this.nearestNode(t);let a=this.nearestNode(e);if(!r||!a)return null;const o=new w(e.x,r.y,e.z);if(this.world.pathClear({x:t.x,z:t.z,y:t.y??0},o,this.radius*.95))return[new w(e.x,Math.max(e.y??0,0),e.z)];if(r.index===a.index)return[new w(e.x,a.y,e.z)];const l=new Set([r.index]),c=new Set,h=new Map([[r.index,0]]),u=new Map([[r.index,Math.hypot(r.x-a.x,r.z-a.z)]]),f=new Map;for(;l.size;){let d=null,g=1/0;for(const m of l){const p=u.get(m)??1/0;p<g&&(g=p,d=m)}if(d===a.index){const m=[];let p=d;for(;p!==void 0;)m.push(this.nodes[p]),p=f.get(p);m.reverse();const x=m.map(A=>new w(A.x,A.y,A.z)),T=[];let _=0;const L=[new w(t.x,t.y??0,t.z),...x];for(;_<L.length-1;){let A=_+1;for(let C=L.length-1;C>_+1;C--)if(this.world.pathClear(L[_],L[C],this.radius*.9)){A=C;break}T.push(L[A]),_=A}return s&&e&&(T[T.length-1]=new w(e.x,T[T.length-1].y,e.z)),T}l.delete(d),c.add(d);const v=this.nodes[d];for(const m of v.edges){if(c.has(m.to))continue;const p=(h.get(d)??1/0)+m.weight;if(p<(h.get(m.to)??1/0)){f.set(m.to,d),h.set(m.to,p);const x=this.nodes[m.to];u.set(m.to,p+Math.hypot(x.x-a.x,x.z-a.z)+Math.abs(x.y-a.y)),l.add(m.to)}}}return null}randomNode(t=null){const e=t?this.nodes.filter(t):this.nodes;return e.length?e[Math.floor(Math.random()*e.length)]:this.nodes[0]}nodeNear(t,e,i=4){let s=null,r=i;for(const a of this.nodes){const o=Math.hypot(a.x-t,a.z-e);o<r&&(r=o,s=a)}return s}}function u0(n,t){const e=new je(190,28,16),i=new Ft(t.skyTop),s=new Ft(t.skyBottom),r=[],a=e.attributes.position,o=new Ft;for(let h=0;h<a.count;h++){const u=a.getY(h)/190,f=Math.max(0,Math.min(1,(u+.15)/.9));o.copy(s).lerp(i,Math.pow(f,.72)),r.push(o.r,o.g,o.b)}e.setAttribute("color",new he(r,3));const l=new cn({vertexColors:!0,side:Ne,fog:!1,depthWrite:!1}),c=new ce(e,l);if(c.renderOrder=-10,n.add(c),t.sunDisc){const h=document.createElement("canvas");h.width=h.height=128;const u=h.getContext("2d"),f=u.createRadialGradient(64,64,2,64,64,64);f.addColorStop(0,"rgba(255,245,215,1)"),f.addColorStop(.18,"rgba(255,225,165,.95)"),f.addColorStop(.45,"rgba(255,200,120,.26)"),f.addColorStop(1,"rgba(255,190,110,0)"),u.fillStyle=f,u.fillRect(0,0,128,128);const d=new mc(h);d.colorSpace=Ue;const g=new uc({map:d,transparent:!0,depthWrite:!1,fog:!1,blending:ki}),v=new Am(g);v.scale.setScalar(42);const m=new w(...t.sunDirection).normalize().multiplyScalar(160);v.position.copy(m),n.add(v),c.userData.sun=v}return c}function d0(n,t,e){n.background=new Ft(t.fogColor),n.fog=new Ya(t.fogColor,t.fogNear,t.fogFar);const i=new Wm(t.hemiSky,t.hemiGround,t.hemiIntensity);n.add(i);const s=new Ym(t.sunColor,t.sunIntensity);s.position.set(...t.sunPosition),s.target.position.set(0,0,0),n.add(s,s.target),s.castShadow=!!e.shadows,s.shadow.mapSize.set(e.shadowMap,e.shadowMap);const r=t.shadowExtent;return s.shadow.camera.left=-r,s.shadow.camera.right=r,s.shadow.camera.top=r,s.shadow.camera.bottom=-r,s.shadow.camera.near=1,s.shadow.camera.far=160,s.shadow.bias=-4e-4,s.shadow.normalBias=.035,n.add(new $m(t.ambientColor,t.ambientIntensity)),{hemi:i,sun:s}}const f0=[{x:0,z:-38},{x:-5,z:-38},{x:5,z:-38},{x:-7,z:-31},{x:7,z:-31},{x:-7,z:-23},{x:7,z:-23},{x:-7,z:-16},{x:7,z:-16},{x:-5,z:-10},{x:5,z:-10},{x:-6,z:-6},{x:0,z:-8},{x:6,z:-6},{x:8,z:0},{x:6,z:6},{x:0,z:8},{x:-6,z:6},{x:-8,z:0},{x:-14,z:-10},{x:-14,z:0},{x:-14,z:10},{x:-22,z:-10},{x:-22,z:-2},{x:-22,z:10},{x:14,z:-10},{x:14,z:0},{x:14,z:10},{x:22,z:-10},{x:22,z:2},{x:23,z:12},{x:0,z:-16},{x:0,z:16},{x:-7,z:16},{x:7,z:16},{x:-7,z:23},{x:7,z:23},{x:-7,z:31},{x:7,z:31},{x:0,z:38},{x:-5,z:38},{x:5,z:38},{x:-37,z:-4,y:1.2},{x:-37,z:0,y:1.2},{x:-37,z:4,y:1.2},{x:-37,z:6.4,y:.9},{x:-37,z:7,y:.6},{x:-37,z:7.6,y:.3},{x:-37,z:8.4,y:0},{x:-37,z:-6.4,y:.9},{x:-37,z:-7,y:.6},{x:-37,z:-7.6,y:.3},{x:-37,z:-8.4,y:0},{x:-37,z:-28},{x:-37,z:-16},{x:-37,z:12},{x:-37,z:22},{x:-37,z:32},{x:37,z:-28},{x:37,z:-16},{x:37,z:12},{x:37,z:22},{x:37,z:32}],p0=[{x:-5,z:-38},{x:5,z:-38},{x:-22,z:-10},{x:23,z:13},{x:0,z:-16},{x:0,z:16},{x:-22,z:10},{x:22,z:-10},{x:-37,z:22},{x:37,z:-22},{x:-37,z:0,y:1.2},{x:5,z:38},{x:-5,z:38},{x:-14,z:10},{x:14,z:-10},{x:0,z:31}],El={old_quarter:{id:"old_quarter",name:"OLD QUARTER",subtitle:"URBAN COURTYARD • DUSK",description:"A walled old-town quarter of plaster facades, market lanes and a central well.",bounds:{minX:-40,maxX:40,minZ:-42,maxZ:42},theme:{skyTop:6716822,skyBottom:14071685,fogColor:12824973,fogNear:48,fogFar:150,hemiSky:13620948,hemiGround:5918525,hemiIntensity:1.55,sunColor:16765600,sunIntensity:2.65,sunPosition:[-36,48,21],sunDirection:[-.62,.56,.36],sunDisc:!0,shadowExtent:58,ambientColor:8221794,ambientIntensity:.35},spawns:{CT:[{x:0,z:38},{x:-5,z:38},{x:5,z:38},{x:-10,z:34},{x:10,z:34}],T:[{x:0,z:-38},{x:-5,z:-38},{x:5,z:-38},{x:-10,z:-34},{x:10,z:-34}]},ffaSpawns:p0,navNodes:f0,build(n){n.addBox({x:0,z:0,y:-.1,w:80,h:.1,d:84,material:"cobble",collide:!1,shadow:!1}),n.addBox({x:0,z:0,y:.002,w:30,h:.01,d:34,material:"stone",collide:!1,shadow:!1}),n.addBox({x:0,z:0,y:.013,w:2.6,h:.008,d:30,material:"stone",collide:!1,shadow:!1});for(const[t,e,i,s]of[[0,-42,82,2],[0,42,82,2],[-40,0,2,86],[40,0,2,86]])if(n.addBox({x:t,z:e,y:0,w:i,h:6.4,d:s,material:"stone"}),n.addDecoBox({x:t,z:e,y:6.4,w:i+.5,h:.35,d:s+.5,material:"stone"}),i>s)for(let r=-38;r<=38;r+=6)n.addDecoBox({x:r,z:e+(e>0?-.5:.5),y:6.75,w:1.6,h:.7,d:.55,material:"stone",shadow:!1});else for(let r=-40;r<=40;r+=6)n.addDecoBox({x:t+(t>0?-.5:.5),z:r,y:6.75,w:.55,h:.7,d:1.6,material:"stone",shadow:!1});for(let t=-34;t<=34;t+=8.5)n.addBox({x:t,z:-40.9,y:0,w:1.1,h:5.6,d:1.1,material:"stone"}),n.addBox({x:t,z:40.9,y:0,w:1.1,h:5.6,d:1.1,material:"stone"});n.building({x:-24,z:-26,w:22,d:18,h:10.5,material:"plaster",balcony:!0,variant:1}),n.building({x:24,z:-26,w:22,d:18,h:9.5,material:"brick",variant:2}),n.building({x:-24,z:26,w:22,d:18,h:9,material:"brick",balcony:!0,variant:0}),n.building({x:24,z:26,w:22,d:18,h:10,material:"plaster",variant:3});for(const[t,e,i]of[[-29,-26,2.4],[27,-28,2],[-20,28,2.2],[29,24,2.6]])n.addBox({x:t,z:e,y:10.6,w:1.2,h:i,d:1.2,material:"brick",collide:!1}),n.addDecoBox({x:t,z:e,y:10.6+i,w:1.5,h:.18,d:1.5,material:"stone",shadow:!1});n.archway(0,-17,0,7.2,4.2),n.archway(0,17,0,7.2,4.2),n.fountain(0,0,2.6),n.planter(-9,-10,1.3),n.planter(9,10,1.3),n.bench(-8,8,.2),n.bench(8,-8,-.2),n.addBox({x:-37,z:0,y:0,w:5,h:1.2,d:12,material:"stone"}),n.addDecoBox({x:-37,z:0,y:1.2,w:5.4,h:.18,d:12.4,material:"stone",shadow:!1});for(const t of[-1,1]){const e=t;for(let i=0;i<3;i++){const s=e*(6.4+i*.75);n.addBox({x:-37,z:s,y:0,w:4.8,h:.9-i*.3,d:.8,material:"stone"})}}for(const t of[-4,0,4])n.addCylinder({x:-34.8,z:t,y:1.2,radius:.16,h:3,material:"stone",segments:8,collide:!0});n.addDecoBox({x:-37,z:0,y:4.2,w:5.8,h:.22,d:13,material:"woodDark"});for(const t of[-4,0,4])n.addDecoBox({x:-37,z:t,y:4.42,w:5.4,h:.08,d:.5,material:"woodDark",shadow:!1});for(let t=-5.5;t<=5.5;t+=1.2)n.addDecoBox({x:-34.7,z:t,y:2.5,w:.08,h:.8,d:.08,material:"metal",shadow:!1});n.addDecoBox({x:-34.7,z:0,y:3.3,w:.09,h:.09,d:11.2,material:"metal",shadow:!1}),n.marketStall(-19,4,.1),n.marketStall(19,-4,-.1),n.marketStall(-19,-4,.1),n.marketStall(19,4,-.1),n.crate(-9,-4.5,1.25),n.crate(-10.2,-4.4,.9,0,"wood"),n.crate(9,4.5,1.3),n.crate(10.1,4.3,.85,0,"wood"),n.crate(-14,-13,1.35),n.crate(14,13,1.25),n.crate(16,14.5,.9),n.crate(-5,14.8,1),n.crate(5,-14.8,1),n.crate(-22,14,1.2),n.crate(22,-14,1.2),n.sandbagWall(-5,9,3.2,0,3),n.sandbagWall(5,-9,3.2,0,3),n.sandbagWall(-11,13.8,2.4,Math.PI/2,2),n.barrel(-12.5,4),n.barrel(-13.3,4.7),n.barrel(12.5,-4),n.barrel(13.3,-4.7),n.barrel(-22,.5),n.barrel(22,-.5),n.tree(-16,-12),n.tree(16,12),n.tree(-30,10),n.tree(30,-10),n.planter(12,10,1.4),n.planter(-12,-10,1.4),n.lampPost(-12.2,-12.2),n.lampPost(12.2,12.2),n.lampPost(-12.2,12.2),n.lampPost(12.2,-12.2),n.lampPost(-7,-34),n.lampPost(7,34),n.lampPost(-34,-18),n.lampPost(34,18);for(const[t,e]of[[{x:-13,y:7.4,z:-21},{x:13,y:7.8,z:-21}],[{x:-13,y:6.8,z:20},{x:13,y:7.1,z:20}],[{x:-13,y:7.2,z:-25},{x:-13,y:7.2,z:-14}],[{x:13,y:7,z:26},{x:13,y:7,z:13}]])n.addCylinderBetween(t,e,.025,"black",5);for(const[t,e]of[[-9,-21],[9,-21],[-9,20],[9,20]])n.addDecoBox({x:t,z:e,y:6.7,w:.14,h:.9,d:.14,material:"black",shadow:!1}),n.addDecoBox({x:t,z:e,y:6.45,w:.3,h:.25,d:.3,material:"emissiveLamp",shadow:!1});n.addBox({x:22,z:9,y:.5,w:2.2,h:.25,d:1.2,material:"wood"});for(const t of[-.8,.8])n.addCylinder({x:22+t,z:9,y:.28,radius:.38,h:.1,material:"woodDark",segments:10,rx:Math.PI/2,collide:!1});n.addDecoBox({x:22,z:8.2,y:.75,w:2.2,h:.12,d:.3,material:"woodDark"}),n.addColliderBox(20.7,23.3,8.1,9.9,0,1.2),n.rubbleField(-33,-14,2.3,9),n.rubbleField(33,14,2.3,9),n.rubbleField(0,39,2.8,8);for(const[t,e,i,s,r,a]of[[-48,-35,18,16,12,"plaster"],[48,-30,20,18,14,"brick"],[-46,30,22,16,11,"brick"],[50,32,18,20,13,"plaster"],[0,-52,30,14,15,"plaster"],[-28,-52,18,12,10,"brick"]])n.addBox({x:t,z:e,y:0,w:i,h:r,d:s,material:a,collide:!1,shadow:!1}),n.addDecoBox({x:t,z:e,y:r,w:i+.4,h:.3,d:s+.4,material:"roof",shadow:!1})}},industrial:{id:"industrial",name:"INDUSTRIAL COMPLEX",subtitle:"FREIGHT YARD • OVERCAST",description:"A cold freight yard of containers, silos and a warehouse with two open bays.",bounds:{minX:-44,maxX:44,minZ:-44,maxZ:44},theme:{skyTop:7372681,skyBottom:11975863,fogColor:11120813,fogNear:55,fogFar:165,hemiSky:12898260,hemiGround:4606791,hemiIntensity:1.8,sunColor:15002606,sunIntensity:1.55,sunPosition:[32,52,-28],sunDirection:[.5,.65,-.4],sunDisc:!1,shadowExtent:64,ambientColor:7766146,ambientIntensity:.3},spawns:{CT:[{x:0,z:39},{x:-6,z:39},{x:6,z:39},{x:-12,z:36},{x:12,z:36}],T:[{x:-10,z:-37},{x:0,z:-37},{x:10,z:-37},{x:-17,z:-35},{x:17,z:-35}]},ffaSpawns:[{x:-10,z:-37},{x:10,z:-37},{x:-18,z:-28},{x:18,z:-28},{x:-16,z:-4},{x:16,z:-4},{x:0,z:8},{x:-20,z:18},{x:20,z:18},{x:-16,z:30},{x:16,z:30},{x:0,z:39},{x:-32,z:18},{x:32,z:4},{x:35,z:30},{x:-32,z:-18}],navNodes:[{x:-18,z:-37},{x:-9,z:-37},{x:-4,z:-37},{x:9,z:-37},{x:18,z:-37},{x:-18,z:-30},{x:-9,z:-30},{x:0,z:-30},{x:9,z:-30},{x:18,z:-30},{x:-9,z:-23},{x:9,z:-23},{x:-18,z:-18},{x:0,z:-18},{x:18,z:-18},{x:-20,z:-4},{x:-4,z:-4},{x:4,z:-4},{x:20,z:-4},{x:-20,z:8},{x:-4,z:8},{x:4,z:8},{x:20,z:8},{x:-20,z:18},{x:-4,z:18},{x:4,z:18},{x:20,z:18},{x:-26,z:-16},{x:-26,z:2},{x:-26,z:16},{x:-32,z:14},{x:-32,z:24},{x:-32,z:-18},{x:28,z:-16},{x:28,z:-2},{x:28,z:12},{x:28,z:26},{x:34,z:6},{x:34,z:20},{x:-20,z:28},{x:-8,z:28},{x:6,z:28},{x:16,z:28},{x:-16,z:36},{x:0,z:36},{x:16,z:36},{x:0,z:40},{x:-4,z:40},{x:4,z:40}],build(n){n.addBox({x:0,z:0,y:-.1,w:88,h:.1,d:88,material:"asphalt",collide:!1,shadow:!1});for(const t of[-14,14])n.addPlaneDecal(t,24,.18,34,"paintWhite",.012);for(const t of[-10,34])n.addPlaneDecal(0,t,60,.2,"paintWhite",.012);for(let t=-36;t<=36;t+=6)n.addPlaneDecal(t,-14,3.2,.16,"warning",.013);for(const[t,e,i,s]of[[0,-44,90,1.5],[0,44,90,1.5],[-44,0,1.5,90],[44,0,1.5,90]])if(n.addBox({x:t,z:e,y:0,w:i,h:5.8,d:s,material:"concrete"}),i>s)for(let r=-40;r<=40;r+=8)n.addBox({x:r,z:e+(e>0?-1.3:1.3),y:0,w:1.2,h:6.4,d:.8,material:"concrete"});else for(let r=-40;r<=40;r+=8)n.addBox({x:t+(t>0?-1.3:1.3),z:r,y:0,w:.8,h:6.4,d:1.2,material:"concrete"});n.addBox({x:0,z:-32,y:0,w:48,h:.05,d:18,material:"concrete",collide:!1,shadow:!1}),n.addBox({x:0,z:-41,y:0,w:48,h:11,d:1.4,material:"concrete"}),n.addBox({x:-24,z:-32,y:0,w:1.4,h:11,d:18,material:"concrete"}),n.addBox({x:24,z:-32,y:0,w:1.4,h:11,d:18,material:"concrete"});for(const[t,e]of[[-19,10],[0,8],[19,10]])n.addBox({x:t,z:-23,y:0,w:e,h:11,d:1,material:"concrete"});for(const t of[-9,9]){n.addBox({x:t,z:-23,y:6,w:10,h:5,d:1,material:"concrete"}),n.addDecoBox({x:t,z:-23.58,y:5.8,w:10.6,h:.35,d:.2,material:"warning",shadow:!1});for(const e of[-1,1])n.addDecoBox({x:t+e*5.2,z:-23.6,y:5.8,w:.35,h:5.1,d:.2,material:"warning",shadow:!1});n.addDecoBox({x:t,z:-23.45,y:8.4,w:9.7,h:2.3,d:.08,material:"metal",shadow:!1})}n.addDecoBox({x:0,z:-32,y:11,w:48,h:.5,d:18.3,material:"metal",shadow:!0}),n.addBox({x:0,z:-32,y:11.5,w:48.4,h:.2,d:18.7,material:"metal",collide:!1});for(const t of[-15,0,15])n.addDecoBox({x:t,z:-32,y:10.9,w:5.5,h:.12,d:10.5,material:"emissiveLamp",shadow:!1});for(const t of[-12,12])for(const e of[-27,-37])n.addBox({x:t,z:e,y:0,w:.7,h:11,d:.7,material:"metal"});for(const t of[-1,1]){const e=t*20.5;for(let i=-39;i<=-25;i+=3.6)n.addBox({x:e,z:i,y:0,w:2.2,h:2.6,d:3,material:"metal"}),n.addDecoBox({x:e,z:i,y:2.6,w:2.5,h:.15,d:3.3,material:"metal",shadow:!1}),Math.random()>.35&&n.crate(e,i,.85,2.78,"wood")}n.crate(-14,-33,1.3),n.crate(-14.6,-31.9,.9),n.crate(13,-35,1.2),n.crate(14.2,-34,.8),n.crate(0,-37,1.1),n.barrel(-21.5,-29),n.barrel(-21.5,-28),n.barrel(21.5,-36);for(const t of[-12,12]){const e=new Mc(14280424,18,22,2);e.position.set(t,7.2,-32),n.extraObjects.push(e),n.scene.add(e),n.addDecoBox({x:t,z:-32,y:7.25,w:1,h:.08,d:.35,material:"emissiveLamp",shadow:!1})}n.container(-9,3,8,0,"containerBlue"),n.container(9,3,8,0,"containerRed"),n.container(-9,13,8,0,"containerGreen"),n.container(9,13,8,0,"containerBlue"),n.container(-9,3,8,0,"containerRed",2.6),n.container(-9,13,8,0,"containerRed",2.6),n.container(22,-14,6,Math.PI/2,"containerGreen"),n.container(-24,30,6,Math.PI/2,"containerRed"),n.lampPost(-4,9,5.5),n.lampPost(4,19,5.5);for(const[t,e]of[[0,0],[0,22]])n.addCylinder({x:t,z:e,y:0,radius:.75,h:.22,material:"woodDark",segments:12,rx:.03}),n.addCylinder({x:t,z:e,y:.24,radius:.45,h:.18,material:"black",segments:10,collide:!1});for(const t of[-8,2]){n.addCylinder({x:-33,z:t,y:0,radius:3.6,radiusTop:3.6,h:13,material:"metal",segments:18,collide:!0}),n.addCylinder({x:-33,z:t,y:13,radius:3.7,radiusTop:1.4,h:2.2,material:"metal",segments:18,collide:!1});for(const e of[2.2,6,9.8])n.addCylinder({x:-33,z:t,y:e,radius:3.67,h:.18,material:"rust",segments:18,collide:!1})}n.addCylinderBetween({x:-33,y:9.5,z:-4.4},{x:-33,y:9.5,z:-1.6},.35,"metal",10);for(const t of[4,8])n.addCylinderBetween({x:-33,y:t,z:5.6},{x:-24,y:t,z:13},.24,"rust",8);n.addCylinder({x:-23.5,z:13,y:0,radius:.35,h:8,material:"metal",segments:10,collide:!0}),n.addDecoBox({x:-24,z:13,y:0,w:1.4,h:.55,d:1.4,material:"warning",shadow:!1}),n.addBox({x:25,z:32,y:0,w:14,h:6.5,d:10,material:"brick"}),n.addDecoBox({x:25,z:32,y:6.5,w:14.6,h:.35,d:10.6,material:"metal"}),n.addDecoBox({x:25,z:27.3,y:0,w:3.4,h:2.6,d:.25,material:"woodDark",shadow:!1}),n.addDecoBox({x:25,z:26.8,y:2.8,w:5.2,h:3.7,d:.18,material:"warning",shadow:!1}),n.addBox({x:25,z:26.6,y:0,w:15,h:.35,d:1.6,material:"concrete",collide:!1}),n.crate(20,34,1.3),n.crate(21.2,34.2,.85),n.barrel(31,35),n.barrel(30.2,35.6),n.lampPost(25,24.5,6),n.addBox({x:14,z:24,y:.18,w:2.6,h:1.05,d:1.5,material:"warning"}),n.addBox({x:13.4,z:24,y:1.23,w:.9,h:.6,d:1.15,material:"black",collide:!1}),n.addDecoBox({x:12.4,z:24,y:.2,w:.28,h:2.7,d:.28,material:"metal"});for(const t of[-.5,.5])n.addDecoBox({x:11.2,z:24+t,y:0,w:2.2,h:.12,d:.16,material:"metal"});for(const[t,e]of[[-.9,-.62],[.9,-.62],[-.9,.62],[.9,.62]])n.addCylinder({x:14+t,z:24+e,y:0,radius:.4,h:.35,material:"black",segments:10,rx:Math.PI/2,collide:!1});n.addColliderBox(12.7,15.3,23.1,24.9,0,2.9),n.addBox({x:-18,z:22,y:0,w:3.2,h:1.6,d:1.8,material:"metal"}),n.addDecoBox({x:-18,z:21.05,y:.3,w:2.2,h:.9,d:.12,material:"warning",shadow:!1});for(let t=0;t<3;t++)n.addDecoBox({x:-18,z:22,y:1.62+t*.16,w:3.3,h:.07,d:1.9,material:"metal",shadow:!1});n.addBox({x:7,z:33,y:0,w:2.2,h:.22,d:1.6,material:"wood"}),n.addBox({x:7.2,z:33.3,y:.22,w:2,h:.2,d:1.4,material:"wood"});for(const[t,e]of[[-14,33],[-13,34],[-15,34]])n.barrel(t,e);for(const[t,e]of[[-4,34],[-3.2,34.8],[-4.8,34.8]])n.barrel(t,e,0,"metal");n.sandbagWall(-4,28,3.6,0,3),n.sandbagWall(9,-8,3.4,0,2),n.sandbagWall(-9,19.5,3.2,Math.PI/2,3),n.fence(33,-8,33,10,2.3),n.fence(-38,18,-38,34,2.2),n.addBox({x:-24,z:37,y:0,w:4,h:1.2,d:1.2,material:"concrete"}),n.addCylinderBetween({x:21,y:5.4,z:-23},{x:33,y:4.2,z:-10},.24,"metal",8),n.addCylinderBetween({x:33,y:4.2,z:-10},{x:33,y:4.2,z:8},.24,"metal",8);for(const[t,e,i,s,r]of[[-58,-30,18,22,16],[58,-24,20,24,14],[-56,30,16,20,12],[58,34,18,18,15],[0,-56,34,14,18]])n.addBox({x:t,z:e,y:0,w:i,h:r,d:s,material:"concrete",collide:!1,shadow:!1});for(const[t,e]of[[-50,-12],[52,10]])n.addCylinder({x:t,z:e,y:0,radius:1.5,radiusTop:1,h:24,material:"brick",segments:10,collide:!1,shadow:!1});n.rubbleField(-38,-25,3,12),n.rubbleField(38,22,3,12),n.planter(-8,39,1.3),n.planter(8,39,1.3)}}};function Tl(n,t,e=Et.quality.medium){const i=El[t]||El.old_quarter;n.clear();const s=u0(n,i.theme),r=d0(n,i.theme,e);l0(e.anisotropy);const a=new c0(n,i.bounds);i.build(a),a.finalize();const o=new h0(i.navNodes,a,{radius:.38});return{definition:i,world:a,nav:o,sky:s,lights:r}}const ge={metal:new le({color:3422257,roughness:.5,metalness:.4}),steel:new le({color:7633005,roughness:.36,metalness:.55}),wood:new le({color:6769454,roughness:.82}),glove:new le({color:3158571,roughness:.95}),sleeve:new le({color:4543309,roughness:.95}),brass:new le({color:10979915,roughness:.4,metalness:.6})};function $e(n,t,e,i,s=0,r=0,a=0){const o=new ce(new de(n,t,e),i);return o.position.set(s,r,a),o}function bl(n,t,e,i,s,r){const a=new ce(new Ti(n,n,t,8),e);return a.rotation.x=Math.PI/2,a.position.set(i,s,r),a}class m0{constructor(t){this.camera=t,this.root=new Se,t.add(this.root),this.rifle=new Se,this.pistol=new Se,this.muzzleFlashes=[],this.buildRifle(),this.buildPistol(),this.root.add(this.rifle,this.pistol),this.root.position.set(.34,-.3,-.58),this.recoil=0,this.recoilVelocity=0,this.bobPhase=0,this.switchOffset=0,this.flashTimer=0,this.rifle.visible=!0,this.pistol.visible=!1,this.current="rifle"}buildRifle(){const t=this.rifle;t.add($e(.13,.15,.5,ge.metal,0,0,-.14)),t.add($e(.145,.1,.22,ge.steel,0,.01,-.44)),t.add($e(.11,.11,.3,ge.wood,0,-.01,.24)),t.add($e(.09,.24,.12,ge.metal,0,-.16,-.16)),t.add($e(.08,.21,.1,ge.wood,0,-.15,.02)),t.add(bl(.025,.54,ge.steel,0,.025,-.61)),t.add($e(.04,.08,.05,ge.steel,0,.09,-.36)),t.add($e(.02,.07,.03,ge.steel,0,.095,-.84)),t.add($e(.16,.07,.38,ge.wood,0,-.04,-.42)),t.add($e(.04,.04,.14,ge.steel,.09,.05,-.13));const e=new ce(new je(.085,7,6),ge.glove);e.position.set(.02,-.16,.07),e.scale.set(.9,1.15,1.1),t.add(e);const i=new ce(new je(.08,7,6),ge.glove);i.position.set(-.01,-.1,-.46),i.scale.set(1.15,.9,1.2),t.add(i);const s=new ce(new hi(.085,.36,3,7),ge.sleeve);s.position.set(.1,-.34,.3),s.rotation.set(-.85,.12,-.3),t.add(s);const r=new ce(new hi(.08,.42,3,7),ge.sleeve);r.position.set(-.16,-.32,-.18),r.rotation.set(-.95,-.25,.55),t.add(r);const a=new ce(new Vi(.32,.32),new cn({color:16764794,transparent:!0,opacity:.95,blending:ki,depthWrite:!1,side:Ke}));a.position.set(0,.03,-.91),a.visible=!1,t.add(a),this.muzzleFlashes.push(a),t.traverse(o=>{o.isMesh&&(o.castShadow=!1,o.receiveShadow=!1)})}buildPistol(){const t=this.pistol;t.add($e(.09,.11,.42,ge.metal,0,.02,-.12)),t.add($e(.075,.16,.09,ge.wood,0,-.12,.06)),t.add(bl(.018,.15,ge.steel,0,.025,-.39)),t.add($e(.035,.035,.04,ge.steel,0,.085,-.3));const e=new ce(new je(.085,7,6),ge.glove);e.position.set(0,-.12,.07),e.scale.set(1,1.2,1),t.add(e);const i=new ce(new hi(.085,.4,3,7),ge.sleeve);i.position.set(.1,-.35,.26),i.rotation.set(-.9,.1,-.35),t.add(i);const s=new ce(new Vi(.22,.22),new cn({color:16765058,transparent:!0,opacity:.9,blending:ki,depthWrite:!1,side:Ke}));s.position.set(0,.025,-.5),s.visible=!1,t.add(s),this.muzzleFlashes.push(s),t.traverse(r=>{r.isMesh&&(r.castShadow=!1,r.receiveShadow=!1)})}setWeapon(t){this.current=t,this.rifle.visible=t==="rifle",this.pistol.visible=t==="pistol",this.switchOffset=1}fire(){this.recoilVelocity+=3.4;const t=this.muzzleFlashes[this.current==="rifle"?0:1];t&&(t.visible=!0,t.rotation.z=Math.random()*Math.PI,t.scale.setScalar(.8+Math.random()*.6),this.flashTimer=.045)}update(t,e){const i=e.speed||0,s=i>.3&&e.grounded;this.bobPhase+=t*(s?7+i*.9:1.5);const r=s?an(i/7,.2,1):.18;this.recoilVelocity*=Math.exp(-16*t),this.recoil=Ge(this.recoil,0,14,t),this.recoil+=this.recoilVelocity*t*.1,this.switchOffset=Ge(this.switchOffset,0,12,t);const a=e.reloadProgress||0,o=a>0?Math.sin(Math.min(1,a)*Math.PI):0,l=.34+Math.sin(this.bobPhase*.5)*.006*r-o*.09,c=-.3+Math.abs(Math.sin(this.bobPhase))*.012*r-o*.16-this.switchOffset*.25,h=-.58+this.recoil*.11+o*.03;if(this.root.position.set(l,c,h),this.root.rotation.x=this.recoil*.03-o*.25,this.root.rotation.y=Math.sin(this.bobPhase*.5)*.01-o*.35,this.root.rotation.z=o*.25,this.flashTimer>0&&(this.flashTimer-=t,this.flashTimer<=0))for(const u of this.muzzleFlashes)u.visible=!1}}class g0{constructor({scene:t,camera:e,world:i,audio:s,settings:r}){this.scene=t,this.camera=e,this.world=i,this.audio=s,this.settings=r,this.position=new w(0,0,0),this.velocity=new w,this.yaw=0,this.pitch=0,this.health=Et.player.maxHealth,this.armor=100,this.alive=!0,this.grounded=!0,this.crouched=!1,this.eye=Et.player.standEye,this.recoilPitch=0,this.recoilYaw=0,this.stepDistance=0,this.landKick=0,this.world=i,this.weaponId="rifle",this.ammo={rifle:{mag:Et.weapons.rifle.magazine,reserve:Et.weapons.rifle.reserve},pistol:{mag:Et.weapons.pistol.magazine,reserve:Et.weapons.pistol.reserve}},this.fireCooldown=0,this.reloadTimer=0,this.reloadTotal=0,this.shots=0,this.lastShot=0,this.view=new m0(e),this.deathTimer=0,this.respawnTimer=0,this.lastDamageTime=-10,this.lastDamageDirection=new w,this.stats={kills:0,deaths:0,headshots:0},this.camera.rotation.order="YXZ",this.camera.fov=r.get("fov"),this.camera.updateProjectionMatrix(),this.baseFov=r.get("fov"),this.currentSpread=0,t.add(e)}get weapon(){return Et.weapons[this.weaponId]}get currentAmmo(){return this.ammo[this.weaponId]}respawn(t,e=0){this.position.set(t.x,t.y??0,t.z),this.velocity.set(0,0,0),this.yaw=e,this.pitch=0,this.health=Et.player.maxHealth,this.armor=100,this.alive=!0,this.grounded=!0,this.crouched=!1,this.eye=Et.player.standEye,this.ammo.rifle={mag:Et.weapons.rifle.magazine,reserve:Et.weapons.rifle.reserve},this.ammo.pistol={mag:Et.weapons.pistol.magazine,reserve:Et.weapons.pistol.reserve},this.fireCooldown=0,this.reloadTimer=0,this.recoilPitch=0,this.recoilYaw=0,this.weaponId="rifle",this.view.setWeapon("rifle"),this.view.root.visible=!0,this.deathTimer=0,this.respawnTimer=0,this.updateCamera(0,0)}look(t,e){if(!this.alive)return;const i=this.settings.get("sensitivity")*.0021;this.yaw-=t*i,this.pitch-=e*i*(this.settings.get("invertY")?-1:1),this.pitch=an(this.pitch,-1.35,1.35)}update(t,e){if(!this.alive){this.deathTimer+=t,this.respawnTimer-=t,this.camera.position.y=Ge(this.camera.position.y,this.position.y+.45,3,t),this.camera.rotation.x=Ge(this.camera.rotation.x,-.35,3,t),this.view.root.visible=!1;return}this.fireCooldown=Math.max(0,this.fireCooldown-t),this.landKick=Ge(this.landKick,0,9,t),this.recoilPitch=Ge(this.recoilPitch,0,7,t),this.recoilYaw=Ge(this.recoilYaw,0,7,t),this.reloadTimer>0&&(this.reloadTimer-=t,this.reloadTimer<=0&&this.finishReload());const i=!!e.crouch;this.crouched=i;const s=this.crouched?Et.player.crouchHeight:Et.player.standHeight,r=new w(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),a=new w(Math.cos(this.yaw),0,-Math.sin(this.yaw)),o=new w;e.forward&&o.add(r),e.back&&o.sub(r),e.right&&o.add(a),e.left&&o.sub(a),o.lengthSq()>0&&o.normalize();const l=e.sprint&&!this.crouched&&!e.back;let c=this.crouched?Et.player.crouchSpeed:l?Et.player.sprintSpeed:Et.player.walkSpeed;this.reloadTimer>0&&(c*=.85);const h=this.grounded?Et.player.accel:Et.player.airAccel,u=1-Math.exp(-h*t),f=o.x*c,d=o.z*c;if(this.velocity.x+=(f-this.velocity.x)*u,this.velocity.z+=(d-this.velocity.z)*u,o.lengthSq()===0&&this.grounded){const M=Math.exp(-11*t);this.velocity.x*=M,this.velocity.z*=M}e.jump&&this.grounded&&(this.velocity.y=Et.player.jumpSpeed,this.grounded=!1,this.audio&&this.audio.footstep(!0));const g=Et.player.stepHeight,v=Et.player.radius,m=this.position.y;let p=this.position.x+this.velocity.x*t;this.world.collidesCircle(p,this.position.z,v,m+g,m+s)?this.velocity.x*=.1:this.position.x=p;let x=this.position.z+this.velocity.z*t;this.world.collidesCircle(this.position.x,x,v,m+g,m+s)?this.velocity.z*=.1:this.position.z=x,this.world.clampToBounds(this.position,v),this.velocity.y-=Et.player.gravity*t;const T=this.position.y+this.velocity.y*t,_=this.world.groundAt(this.position.x,this.position.z,v*.92,this.position.y+g+.05);if(this.grounded&&this.position.y>_+g+.02&&(this.grounded=!1),T<=_+.001&&this.velocity.y<=0?(!this.grounded&&this.velocity.y<-4.5&&(this.landKick=Math.min(.11,Math.abs(this.velocity.y)*.012),this.audio&&this.audio.footstep(!0)),this.position.y=_,this.velocity.y=0,this.grounded=!0):(this.position.y=T,T>_+.02&&(this.grounded=!1)),this.position.y<-6&&(this.position.y=0,this.velocity.set(0,0,0)),this.grounded&&Math.abs(this.velocity.x)+Math.abs(this.velocity.z)>.01){this.stepDistance+=Math.hypot(this.velocity.x,this.velocity.z)*t;const M=l||Math.hypot(this.velocity.x,this.velocity.z)>5.5?2.1:1.65;this.stepDistance>M&&(this.stepDistance=0,this.audio&&this.audio.footstep(l))}const L=this.crouched?Et.player.crouchEye:Et.player.standEye;this.eye=Ge(this.eye,L,13,t);const A=Math.hypot(this.velocity.x,this.velocity.z),C=this.grounded?Math.sin(this.stepDistance*7.5)*Math.min(.045,A*.006):0,R=this.baseFov+(l&&A>5.2?3:0);this.camera.fov=Ge(this.camera.fov,R,6,t),this.camera.updateProjectionMatrix(),this.updateCamera(t,C);const E=this.reloadTimer>0?1-this.reloadTimer/this.reloadTotal:0;this.view.update(t,{speed:A,grounded:this.grounded,reloadProgress:E,crouched:this.crouched}),this.currentSpread=this.calculateSpread(A)}updateCamera(t,e){const i=this.recoilYaw*.2;this.camera.position.set(this.position.x,this.position.y+this.eye+e-this.landKick,this.position.z),this.camera.rotation.set(this.pitch+this.recoilPitch,this.yaw+i,0,"YXZ")}calculateSpread(t=0){const e=this.weapon;if(!e)return .01;let i=e.spread;const s=Math.hypot(this.velocity.x,this.velocity.z);return i+=s/Et.player.sprintSpeed*e.movingSpread,this.grounded||(i+=.055),this.crouched&&(i*=.7),i+=Math.min(this.shots*.0025,e.maxSpread),i}canFire(){return this.alive&&this.fireCooldown<=0&&this.reloadTimer<=0&&this.currentAmmo.mag>0}fire(t){if(!this.alive||this.reloadTimer>0||this.fireCooldown>0)return!1;const e=this.currentAmmo;if(e.mag<=0)return this.startReload(),!1;const i=this.weapon;e.mag--,this.fireCooldown=i.fireRate,this.shots=Math.min(this.shots+1,12);const s=this.calculateSpread(Math.hypot(this.velocity.x,this.velocity.z));return this.recoilPitch+=i.recoil*(this.crouched?.8:1),this.recoilYaw+=Bt(-1,1)*i.recoil*.55,this.view.fire(),t.playerShoot(this,i,s),e.mag===0&&this.startReload(),!0}releaseTrigger(){this.shots=0}startReload(){if(this.reloadTimer>0||!this.alive)return!1;const t=this.currentAmmo,e=this.weapon;return t.mag>=e.magazine||t.reserve<=0?!1:(this.reloadTotal=e.reloadTime,this.reloadTimer=this.reloadTotal,this.audio&&this.audio.reload(),this.shots=0,!0)}finishReload(){const t=this.currentAmmo,i=this.weapon.magazine-t.mag,s=Math.min(i,t.reserve);t.mag+=s,t.reserve-=s,this.reloadTimer=0}switchWeapon(t){!Et.weapons[t]||t===this.weaponId||this.reloadTimer>0||!this.alive||(this.weaponId=t,this.fireCooldown=Math.max(this.fireCooldown,.35),this.shots=0,this.view.setWeapon(t),this.audio&&this.audio.uiClick())}takeDamage(t,e,i){if(!this.alive)return!1;const s=this.armor;let r=t;if(this.armor>0){const a=Math.min(this.armor,r*.5);this.armor-=a,r-=a*.72}return this.health-=r,this.lastDamageTime=(i==null?void 0:i.time)??0,e&&this.lastDamageDirection.set(e.x-this.position.x,0,e.z-this.position.z).normalize(),this.audio&&this.audio.hurt(),this.health<=0?(this.health=0,this.alive=!1,this.velocity.set(0,0,0),this.deathTimer=0,this.respawnTimer=Et.player.respawnTime,this.stats.deaths++,this.audio&&this.audio.death(),!0):(s<=0&&this.armor<=0,!1)}dispose(){this.camera.remove(this.view.root),this.view.root.traverse(t=>{t.isMesh&&(t.geometry.dispose(),t.material&&!Object.values(ge).includes(t.material)&&t.material.dispose())}),this.scene.remove(this.camera)}}const Le={skin:new le({color:11109991,roughness:.85}),skinDark:new le({color:8347978,roughness:.9}),boot:new le({color:2368799,roughness:.95}),glove:new le({color:2829350,roughness:.95}),gunMetal:new le({color:3422259,roughness:.55,metalness:.35}),gunSteel:new le({color:6777699,roughness:.4,metalness:.5}),gunWood:new le({color:6309422,roughness:.85}),eyes:new le({color:1513235,roughness:1}),strap:new le({color:2828834,roughness:1})},wl={CT:{uniform:new le({color:4610658,roughness:.94}),vest:new le({color:2964289,roughness:.92}),helmet:new le({color:3754835,roughness:.75}),accent:new le({color:7314093,roughness:.8}),balaclava:null},T:{uniform:new le({color:7166785,roughness:.95}),vest:new le({color:5062187,roughness:.92}),helmet:new le({color:5785910,roughness:.85}),accent:new le({color:12024388,roughness:.8}),balaclava:new le({color:2368286,roughness:1})}},ue={torso:new hi(.23,.32,3,8),vest:new de(.47,.42,.31),hip:new de(.36,.19,.28),head:new je(.145,8,7),neck:new Ti(.075,.09,.12,6),helmet:new je(.165,8,6,0,Math.PI*2,0,Math.PI*.58),cap:new Ti(.145,.16,.1,8),brim:new de(.26,.035,.18),thigh:new hi(.105,.27,2,6),shin:new hi(.083,.27,2,6),boot:new de(.16,.16,.28),upperArm:new hi(.083,.25,2,6),forearm:new hi(.07,.22,2,6),hand:new je(.075,6,5),pouch:new de(.15,.18,.09),pack:new de(.36,.42,.18),receiver:new de(.085,.12,.48),barrel:new Ti(.025,.028,.5,7),stock:new de(.07,.12,.32),magazine:new de(.07,.19,.11),grip:new de(.065,.19,.08),sight:new de(.035,.07,.05),muzzle:new Vi(.17,.17)};function Kt(n,t,e=[0,0,0],i=[0,0,0]){const s=new ce(n,t);return s.position.set(...e),s.rotation.set(...i),s.castShadow=!0,s.receiveShadow=!0,s}class v0{constructor(t,e="CT",{name:i="BOT",scale:s=1}={}){this.scene=t,this.team=e,this.name=i,this.group=new Se,this.body=new Se,this.group.add(this.body),this.group.scale.setScalar(s);const r=wl[e]||wl.CT;this.legs=[];for(const v of[-1,1]){const m=new Se;m.position.set(v*.125,.9,0);const p=Kt(ue.thigh,r.uniform,[0,-.2,0]);m.add(p);const x=new Se;x.position.y=-.41;const T=Kt(ue.shin,r.uniform,[0,-.19,0]),_=Kt(ue.boot,Le.boot,[0,-.43,.05]);x.add(T,_),m.add(x),this.body.add(m),this.legs.push({hip:m,knee:x,side:v})}this.body.add(Kt(ue.hip,r.uniform,[0,.95,0]));const a=Kt(ue.torso,r.uniform,[0,1.26,0]);a.scale.set(1.08,1.06,.84),this.body.add(a),this.body.add(Kt(ue.vest,r.vest,[0,1.28,.01]));for(let v=-1;v<=1;v++)this.body.add(Kt(ue.pouch,r.vest,[v*.15,1.22,.17]));this.body.add(Kt(new de(.42,.06,.32),Le.strap,[0,1.49,0])),this.body.add(Kt(ue.neck,Le.skin,[0,1.57,0])),this.headGroup=new Se,this.headGroup.position.set(0,1.69,0);const o=Kt(ue.head,e==="T"?Le.skinDark:Le.skin);if(o.scale.set(.92,1.06,.95),this.headGroup.add(o),e==="CT")this.headGroup.add(Kt(ue.helmet,r.helmet,[0,.035,0])),this.headGroup.add(Kt(new de(.22,.05,.06),r.accent,[0,.06,.14]));else{this.headGroup.add(Kt(ue.cap,r.helmet,[0,.1,0])),this.headGroup.add(Kt(ue.brim,r.helmet,[0,.07,.14]));const v=Kt(new je(.15,8,6),r.balaclava,[0,-.01,0]);v.scale.set(.94,1,.95),this.headGroup.add(v);for(const m of[-1,1])this.headGroup.add(Kt(new de(.045,.022,.02),Le.eyes,[m*.055,.01,.137]))}this.body.add(this.headGroup),this.arms=[];for(const v of[-1,1]){const m=new Se;m.position.set(v*.3,1.44,0),m.rotation.z=v*-.08;const p=Kt(ue.upperArm,r.uniform,[0,-.16,0]),x=new Se;x.position.y=-.33;const T=Kt(ue.forearm,r.uniform,[0,-.14,0]),_=Kt(ue.hand,Le.glove,[0,-.29,0]);x.add(T,_),m.add(p,x),this.body.add(m),this.arms.push({shoulder:m,elbow:x,side:v,hand:_})}this.body.add(Kt(new de(.07,.1,.2),r.accent,[-.33,1.48,0])),e==="T"?this.body.add(Kt(ue.pack,r.vest,[0,1.3,-.21])):(this.body.add(Kt(new de(.24,.3,.12),r.vest,[0,1.31,-.21])),this.body.add(Kt(new Ti(.012,.012,.3,4),Le.gunMetal,[.08,1.5,-.22]))),this.weaponMount=new Se,this.weaponMount.position.set(.14,1.3,.18),this.rifle=new Se;const l=Kt(ue.receiver,Le.gunMetal,[0,0,.16]),c=Kt(ue.barrel,Le.gunSteel,[0,.015,.57],[Math.PI/2,0,0]),h=Kt(ue.stock,Le.gunWood,[0,-.01,-.18]),u=Kt(ue.magazine,Le.gunMetal,[0,-.14,.12]);u.rotation.x=-.28;const f=Kt(ue.grip,Le.gunMetal,[0,-.14,-.02]);f.rotation.x=.2;const d=Kt(ue.sight,Le.gunSteel,[0,.085,.1]),g=Kt(new de(.02,.055,.03),Le.gunSteel,[0,.08,.5]);this.rifle.add(l,c,h,u,f,d,g),this.muzzleFlash=new ce(ue.muzzle,new cn({color:16766090,transparent:!0,opacity:.9,blending:ki,depthWrite:!1,side:Ke})),this.muzzleFlash.position.set(0,.015,.84),this.muzzleFlash.rotation.x=Math.PI/2,this.muzzleFlash.visible=!1,this.rifle.add(this.muzzleFlash),this.weaponMount.add(this.rifle),this.body.add(this.weaponMount),this.group.traverse(v=>{v.isMesh&&(v.castShadow=!0,v.receiveShadow=!0)}),this.phase=Math.random()*Math.PI*2,this.flashTimer=0,this.deadTime=0,this.dead=!1,this.aimBlend=0,this.crouchBlend=0,this.scene.add(this.group)}setPosition(t,e,i){this.group.position.set(t,e,i)}setYaw(t){this.group.rotation.y=t}muzzle(){this.flashTimer<=0&&(this.flashTimer=.055,this.muzzleFlash.visible=!0,this.muzzleFlash.rotation.z=Math.random()*Math.PI,this.muzzleFlash.scale.setScalar(.8+Math.random()*.7))}reset(){this.dead=!1,this.deadTime=0,this.body.rotation.set(0,0,0),this.body.position.set(0,0,0),this.group.visible=!0,this.flashTimer=0,this.muzzleFlash.visible=!1,this.aimBlend=0,this.crouchBlend=0;for(const t of this.legs)t.hip.rotation.set(0,0,0),t.knee.rotation.set(0,0,0);for(const t of this.arms)t.shoulder.rotation.set(0,0,t.side*-.08),t.elbow.rotation.set(0,0,0)}setDead(){this.dead=!0,this.deadTime=0}update(t,e={}){const{speed:i=0,crouched:s=!1,aiming:r=!1,grounded:a=!0}=e,o=i>.15;if(this.dead){this.deadTime+=t,this.body.rotation.x=Ge(this.body.rotation.x,-Math.PI/2,8,t),this.body.position.y=Ge(this.body.position.y,.18,8,t),this.group.visible=this.deadTime<12;return}this.aimBlend=Ge(this.aimBlend,r?1:0,10,t),this.crouchBlend=Ge(this.crouchBlend,s?1:0,12,t),o&&a?this.phase+=t*(2.5+i*1.35):this.phase+=t*1.5;const l=o?an(i/6.5,.18,1):0,c=Math.sin(this.phase)*.72*l;for(const u of this.legs){const f=u.side===1?1:-1,d=this.crouchBlend*.5;u.hip.rotation.x=c*f-d*.7,u.knee.rotation.x=Math.max(0,-Math.sin(this.phase*1+(u.side>0?0:Math.PI)))*.65*l+d*1.25}const h=o?Math.abs(Math.sin(this.phase*2))*.025:Math.sin(this.phase*.8)*.006;this.body.position.y=h-this.crouchBlend*.23,this.body.rotation.z=o?Math.sin(this.phase)*.012:0;for(const u of this.arms){const f=u.side===1?1:-1,d=u.side===1?-1.42:-1.28,g=-c*f*.55;u.shoulder.rotation.x=g*(1-this.aimBlend)+d*this.aimBlend,u.shoulder.rotation.z=u.side*(-.08-this.aimBlend*.22),u.elbow.rotation.x=(o?.28:.08)*(1-this.aimBlend)+(u.side===1?.55:1)*this.aimBlend}this.weaponMount.rotation.x=(1-this.aimBlend)*.72-.02,this.weaponMount.rotation.y=(1-this.aimBlend)*.18,this.weaponMount.position.y=1.3-this.crouchBlend*.05,this.headGroup.rotation.y=Math.sin(this.phase*.35)*(o?.05:.16),this.headGroup.rotation.x=this.aimBlend*-.04,this.flashTimer>0&&(this.flashTimer-=t,this.flashTimer<=0&&(this.muzzleFlash.visible=!1))}dispose(){this.scene.remove(this.group),this.group.traverse(t=>{t.isMesh&&t.geometry&&!Object.values(ue).includes(t.geometry)&&t.geometry.dispose(),t.isMesh&&t.material!==Le.eyes&&t.material&&t.material.transparent&&t.material.map&&t.material.map.dispose()}),this.muzzleFlash.material.dispose()}}const Al=new w,Cl=new w;class _0{constructor({scene:t,world:e,nav:i,team:s,visualTeam:r,name:a,difficulty:o,mode:l,index:c,game:h}){this.scene=t,this.world=e,this.nav=i,this.team=s,this.visualTeam=r,this.name=a,this.mode=l,this.game=h,this.index=c,this.difficultyName=o,this.character=new v0(t,r,{name:a}),this.position=new w,this.velocity=new w,this.yaw=Math.PI,this.health=100,this.alive=!0,this.grounded=!0,this.state="patrol",this.stateTimer=Bt(0,2),this.respawnTimer=0,this.path=[],this.pathGoal=null,this.pathTimer=0,this.perceptionTimer=Bt(0,.15),this.target=null,this.targetVisible=!1,this.lastSeen=new w,this.lastSeenAt=-100,this.reactionTimer=0,this.fireTimer=Bt(.2,.8),this.burstRemaining=0,this.burstPause=0,this.turnSpeed=8,this.crouched=!1,this.stuckTimer=0,this.stuckCheckTimer=0,this.lastPosition=new w,this.strafeDir=Math.random()>.5?1:-1,this.strafeTimer=Bt(.7,1.6),this.patrolGoalNode=null,this.idleLook=0,this.kills=0,this.deaths=0,this.headshots=0,this.damageDealt=0,this.aimPitch=0,this.skill={reaction:Bt(.85,1.18),accuracy:Bt(.82,1.18),aggression:Bt(.75,1.25),perception:Bt(.9,1.12)},this.currentSpeed=0,this.deadTime=0,this.footstepTimer=0,this.lastNoise=new w}configure(t,e){this.difficultyName=t,this.mode=e}spawn(t){this.position.set(t.x,t.y??0,t.z),this.velocity.set(0,0,0),this.health=100,this.alive=!0,this.grounded=!0,this.state="patrol",this.stateTimer=Bt(0,1.2),this.path=[],this.pathGoal=null,this.target=null,this.targetVisible=!1,this.lastSeenAt=-100,this.reactionTimer=0,this.burstRemaining=0,this.respawnTimer=0,this.deadTime=0,this.stuckTimer=0,this.character.reset(),this.character.setPosition(t.x,t.y??0,t.z),this.character.setYaw(this.yaw=Math.atan2(-t.x,-t.z)),this.choosePatrolPath(!0)}get eyePosition(){return Al.set(this.position.x,this.position.y+1.55,this.position.z)}get difficulty(){return Et.difficulties[this.difficultyName]||Et.difficulties.Normal}isEnemy(t){return!t||t===this||!t.alive?!1:this.mode==="ffa"?t!==this:t.team!==this.team}receiveAlert(t,e){this.alive&&(this.mode!=="ffa"&&e===this.team||this.state!=="engage"&&(this.lastSeen.copy(t),this.lastSeenAt=this.game.time,this.state="investigate",this.stateTimer=Bt(2.5,4.5),this.path=this.nav.findPath(this.position,t)||[],this.pathTimer=.8))}hear(t,e){!this.alive||this.state==="engage"||Ui(this.position,t)>28||this.mode!=="ffa"&&e===this.team||(this.lastSeen.copy(t),this.lastSeenAt=this.game.time,(this.state==="patrol"||this.state==="idle"||this.state==="regroup")&&(this.state="investigate",this.stateTimer=Bt(3,5),this.path=this.nav.findPath(this.position,t)||[],this.pathTimer=1))}choosePatrolPath(t=!1){const e=this.position;for(let i=0;i<8;i++){let s=this.nav.randomNode();if(!s)return;if(Ui(e,s)<(t?8:12))continue;const r=this.nav.findPath(e,s);if(r&&r.length){this.path=r,this.pathGoal=s,this.patrolGoalNode=s,this.pathTimer=3;return}}this.path=[]}chooseRetreatPath(){const t=this.target&&this.target.position?this.target.position:this.position,i=this.nav.nodes.filter(s=>Ui(s,t)>16&&Ui(s,this.position)>3).sort(()=>Math.random()-.5).slice(0,8);for(const s of i){const r=this.nav.findPath(this.position,s);if(r&&r.length)return this.path=r,this.pathGoal=s,this.pathTimer=2,!0}return!1}faceTarget(t,e,i){const s=t.x-this.position.x,r=t.z-this.position.z,a=Math.atan2(s,r);this.yaw=yl(this.yaw,a,i,e)}faceMovement(t,e,i){Math.abs(t)+Math.abs(e)<.001||(this.yaw=yl(this.yaw,Math.atan2(t,e),8,i))}moveToward(t,e,i,s=!1){const r=t.x-this.position.x,a=t.z-this.position.z,o=Math.hypot(r,a);if(o<.08)return 0;const l=r/o,c=a/o,h=Et.player.stepHeight,u=Et.player.radius;let f=e;s&&o>8&&(f=Math.min(Et.player.sprintSpeed*.86,e*1.35));const d=this.position.x+l*f*i,g=this.position.z+c*f*i,v=this.position.y;let m=0;return this.world.collidesCircle(d,this.position.z,u,v+h,v+1.7)||(m+=Math.abs(d-this.position.x),this.position.x=d),this.world.collidesCircle(this.position.x,g,u,v+h,v+1.7)||(m+=Math.abs(g-this.position.z),this.position.z=g),this.world.clampToBounds(this.position,u),this.currentSpeed=m/Math.max(i,.001),this.faceMovement(l,c,i),o}followPath(t,e,i){if(!this.path.length)return!1;const s=this.path[0];return Math.hypot(s.x-this.position.x,s.z-this.position.z)<.9&&(this.path.shift(),!this.path.length)?!1:(this.moveToward(this.path[0],e,t,i),!0)}updateVertical(t){this.velocity.y-=20*t,this.position.y+=this.velocity.y*t;const e=this.world.groundAt(this.position.x,this.position.z,.34,this.position.y+Et.player.stepHeight+.04);this.position.y<=e+.001?(this.position.y=e,this.velocity.y=0,this.grounded=!0):this.grounded=!1,this.position.y<-5&&(this.position.y=0,this.velocity.y=0)}perceive(t){const e=this.difficulty,i=this.eyePosition.clone(),s=[];this.isEnemy(t.player)&&s.push(t.player);for(const h of t.bots)h!==this&&h.alive&&this.isEnemy(h)&&s.push(h);let r=null,a=1/0;const o=Math.sin(this.yaw),l=Math.cos(this.yaw),c=e.perception*this.skill.perception;for(const h of s){const u=h.position,f=u.x-this.position.x,d=u.z-this.position.z,g=Math.hypot(f,d);if(g>c||!((f*o+d*l)/Math.max(g,.001)>Math.cos(e.fov*Math.PI/180/2)||g<5)&&h!==this.target)continue;const p=Cl.set(u.x,u.y+1.2,u.z);if(this.world.segmentBlocked(i,p))continue;let x=g;h===this.target&&(x*=.7),h.health<40&&(x*=.8),x<a&&(a=x,r=h)}r?(r!==this.target&&(this.target=r,this.reactionTimer=Bt(e.reaction[0],e.reaction[1])*this.skill.reaction,this.burstRemaining=0,this.lastSeen.copy(r.position),this.lastSeenAt=t.time),this.targetVisible=!0,this.lastSeen.copy(r.position),this.lastSeenAt=t.time,this.state!=="engage"&&this.state!=="retreat"&&(this.health<=e.retreatHealth&&Math.random()<.45?this.enterRetreat(t):(this.state="engage",this.stateTimer=0,this.game.alertTeam(this,r)))):(this.targetVisible=!1,this.target&&!this.target.alive&&(this.target=null))}enterRetreat(t){this.state="retreat",this.stateTimer=Bt(2.5,4),this.chooseRetreatPath(),this.game.alertTeam(this,this.target||{position:this.lastSeen})}handleCombat(t,e){const i=this.target;if(!i||!i.alive){this.target=null,this.targetVisible=!1,this.state="investigate",this.stateTimer=3;return}const s=this.difficulty,r=i.position.x-this.position.x,a=i.position.z-this.position.z,o=Math.hypot(r,a);if(this.reactionTimer-=t,this.faceTarget(i.position,t,s.turnSpeed),!this.targetVisible){e.time-this.lastSeenAt>1.4&&(this.state="investigate",this.stateTimer=Bt(3.5,6),this.path=this.nav.findPath(this.position,this.lastSeen)||[],this.pathTimer=1.2,this.target=null);return}this.strafeTimer-=t,this.strafeTimer<=0&&(this.strafeTimer=Bt(.7,1.8),this.strafeDir*=-1);const l=8+(1-s.aggression)*7;let c=0;if(o>l+2)(this.pathTimer<=0||!this.path.length)&&o>16&&(this.path=this.nav.findPath(this.position,i.position)||[],this.pathTimer=.8),this.path.length?this.followPath(t,3.4,!1):this.moveToward(i.position,3.4,t,!1),c=this.currentSpeed;else if(o<l-3){const h=-r/Math.max(o,.001),u=-a/Math.max(o,.001),f=Math.sin(e.time*1.7+this.index)>0?1:-1,d=Al.set(h+-u*f*.7,0,u+h*f*.7).normalize(),g=2.6,v=this.position.x+d.x*g*t,m=this.position.z+d.z*g*t;this.world.collidesCircle(v,m,.36,this.position.y+.44,this.position.y+1.7)||(this.position.x=v,this.position.z=m,this.currentSpeed=g,c=g)}else{const h=-a/Math.max(o,.001),u=r/Math.max(o,.001),f=2+this.skill.aggression,d=this.position.x+h*this.strafeDir*f*t,g=this.position.z+u*this.strafeDir*f*t;this.world.collidesCircle(d,g,.36,this.position.y+.44,this.position.y+1.7)?this.strafeDir*=-1:(this.position.x=d,this.position.z=g,this.currentSpeed=f,c=f)}if(this.reactionTimer<=0&&this.fireTimer<=0){const h=i.position.x-this.position.x,u=i.position.z-this.position.z,f=Math.atan2(h,u);Math.abs((f-this.yaw+Math.PI*3)%(Math.PI*2)-Math.PI)<.3&&this.world.segmentBlocked(this.eyePosition,Cl.set(i.position.x,i.position.y+1.15,i.position.z))===!1?this.burstRemaining<=0?(this.burstRemaining=e0(s.burst[0],s.burst[1]),this.fireTimer=.05):(this.game.botShoot(this,i,s),this.character.muzzle(),this.burstRemaining--,this.fireTimer=Bt(.11,.17),this.burstRemaining<=0&&(this.fireTimer=Bt(s.burstPause[0],s.burstPause[1])*(1.2-s.accuracySkill*.4))):this.fireTimer=.08}return this.fireTimer=Math.max(0,this.fireTimer-t),c}update(t,e){if(!this.alive){this.deadTime+=t,this.respawnTimer-=t,this.character.update(t,{aiming:!1}),this.respawnTimer<=0&&e.game.respawnBot(this);return}if(this.difficulty,this.stateTimer-=t,this.perceptionTimer-=t,this.pathTimer-=t,this.fireTimer=Math.max(0,this.fireTimer-t),this.currentSpeed=0,this.perceptionTimer<=0&&(this.perceptionTimer=Bt(.1,.19),this.perceive(e)),this.state==="engage"&&this.target)this.handleCombat(t,e);else if(this.state==="retreat")this.path.length?this.followPath(t,4.9,!0):this.chooseRetreatPath()||(this.state="patrol"),this.stateTimer<=0&&(this.state="regroup",this.stateTimer=4,this.path=[]);else if(this.state==="investigate")this.path.length?this.followPath(t,3.4,!0):(this.currentSpeed=0,this.idleLook+=t,this.yaw+=Math.sin(this.idleLook*1.8)*t*1.2),this.stateTimer<=0&&(this.state="patrol",this.choosePatrolPath());else if(this.state==="regroup"){let s=null,r=1/0;for(const a of e.bots)if(a!==this&&a.alive&&a.team===this.team){const o=Ui(a.position,this.position);o<r&&(r=o,s=a)}this.mode==="ffa"||!s||r<5?(this.state="patrol",this.choosePatrolPath()):((this.pathTimer<=0||!this.path.length)&&(this.path=this.nav.findPath(this.position,s.position)||[],this.pathTimer=1.4),this.followPath(t,3.6,!1),this.stateTimer<=0&&(this.state="patrol"))}else this.state==="idle"?(this.idleLook+=t,this.yaw+=Math.sin(this.idleLook*1.4)*t*.8,this.stateTimer<=0&&(this.state="patrol",this.choosePatrolPath())):this.path.length?this.followPath(t,3.8,!0)||(this.state="idle",this.stateTimer=Bt(.7,2.2),this.idleLook=0):this.stateTimer>0?(this.state="idle",this.stateTimer=Bt(.8,2.4),this.idleLook=0):(this.choosePatrolPath(),this.stateTimer=Bt(8,16));if(this.updateVertical(t),this.stuckCheckTimer+=t,this.stuckCheckTimer>1){const s=Ui(this.position,this.lastPosition);if(this.currentSpeed>.2&&s<.3?this.stuckTimer+=this.stuckCheckTimer:this.stuckTimer=Math.max(0,this.stuckTimer-.5),this.lastPosition.copy(this.position),this.stuckCheckTimer=0,this.stuckTimer>1.8&&(this.choosePatrolPath(),this.stuckTimer=0),this.stuckTimer>4.5){const a=this.nav.nearestNode(this.position);a&&(this.position.set(a.x,a.y,a.z),this.velocity.set(0,0,0),this.stuckTimer=0,this.path=[])}}for(const s of e.bots){if(s===this||!s.alive)continue;const r=this.position.x-s.position.x,a=this.position.z-s.position.z,o=Math.hypot(r,a);if(o>.01&&o<.85){const l=this.position.x+r/o*(.85-o)*.5,c=this.position.z+a/o*(.85-o)*.5;this.world.collidesCircle(l,c,.36,this.position.y+Et.player.stepHeight,this.position.y+1.7)||(this.position.x=l,this.position.z=c)}}this.world.clampToBounds(this.position,.36),this.character.setPosition(this.position.x,this.position.y,this.position.z),this.character.setYaw(this.yaw);const i=this.state==="engage"||this.state==="investigate"||this.state==="retreat";this.character.update(t,{speed:this.currentSpeed,grounded:this.grounded,crouched:this.crouched,aiming:i})}takeDamage(t){return this.alive?(this.health-=t,this.health<=0?(this.health=0,this.alive=!1,this.deadTime=0,this.respawnTimer=4.2,this.target=null,this.targetVisible=!1,this.state="respawn",this.character.setDead(),!0):!1):!1}dispose(){this.character.dispose()}}const et=(n,t=document)=>t.querySelector(n);class x0{constructor(t){this.game=t,this.menu=et("#menu-screen"),this.panelScreen=et("#panel-screen"),this.hud=et("#hud"),this.toastEl=et("#toast"),this.toastTimer=0,this.bannerTimer=0,this.introTimer=0,this.introHideTimer=0,this.damageTimer=0,this.hitmarkerTimer=0,this.scoreboardVisible=!1,this.pointerLocked=!1,this.fps=0,this.fpsAccumulator=0,this.fpsFrames=0,this.radarBg=null,this.radarBounds=null,this.mapRuntime=null,this.lastRadar=0,this.matchData=null,this.bind()}bind(){this.menu.addEventListener("click",t=>{const e=t.target.closest("button[data-action]");if(!e)return;ie.init(),ie.uiClick();const i=e.dataset.action;i==="play"?this.game.quickStart():i==="setup"?this.openMatchSetup("OFFLINE MATCH"):i==="servers"?this.openOnlineInfo():i==="settings"?this.openSettings():i==="profile"?this.openProfile():i==="credits"&&this.openCredits()}),this.panelScreen.addEventListener("click",t=>{if(ie.init(),t.target.closest("[data-close]")){ie.uiClick(),this.closePanel();return}const i=t.target.closest("button[data-action]");if(!i)return;ie.uiClick();const s=i.dataset.action;s==="start-match"?this.startFromSetup():s==="save-settings"?this.saveSettings():s==="reset-settings"?this.resetSettings():s==="fullscreen"?this.toggleFullscreen():s==="save-profile"?this.saveProfile():s==="reset-profile"?this.resetProfile():s==="offline-setup"?(this.closePanel(),this.openMatchSetup("OFFLINE MATCH")):s==="credits"&&this.openCredits()}),this.panelScreen.addEventListener("keydown",t=>{t.key==="Escape"&&(t.stopPropagation(),this.closePanel())}),this.hud.addEventListener("click",t=>{const e=t.target.closest("button[data-action]");if(!e)return;ie.init(),ie.uiClick();const i=e.dataset.action;i==="resume"?this.game.resume():i==="restart"?this.game.restartMatch():i==="pause-settings"?this.openSettings():i==="quit"?this.game.leaveMatch():i==="play-again"?this.game.restartMatch():i==="new-match"?(this.hideResults(),this.game.leaveMatch(!0),this.openMatchSetup("NEW MATCH")):i==="main-menu"&&this.game.leaveMatch()})}showMenu(){this.menu.classList.add("visible"),this.hud.classList.add("hidden")}hideMenu(){this.menu.classList.remove("visible"),this.hud.classList.remove("hidden")}showPanel(t,{wide:e=!1}={}){this.panelScreen.innerHTML=`
      <div class="panel-backdrop" data-close></div>
      <div class="panel ${e?"panel-wide":""}" role="dialog" aria-modal="true">
        <button class="panel-close" data-close aria-label="Close">&times;</button>
        ${t}
      </div>`,this.panelScreen.classList.add("visible");const i=this.panelScreen.querySelector("select, input, button:not(.panel-close)");i&&setTimeout(()=>i.focus(),20)}closePanel(){this.panelScreen.classList.remove("visible"),this.panelScreen.innerHTML=""}openMatchSetup(t="OFFLINE MATCH"){ie.init();const e=this.game.matchConfig||{mapId:"old_quarter",mode:"tdm",difficulty:"Normal"},i=Ee.profile.team||"CT",s=Jm.map(u=>`<option value="${u.id}" ${u.id===e.mapId?"selected":""}>${u.name} — ${u.subtitle}</option>`).join(""),r=Km.map(u=>`<option value="${u.id}" ${u.id===e.mode?"selected":""}>${u.name}</option>`).join(""),a=jm.map(u=>`<option value="${u}" ${u===e.difficulty?"selected":""}>${u.toUpperCase()}</option>`).join(""),o=Et.maps[e.mapId]||Et.maps.old_quarter;this.showPanel(`
      <div class="panel-kicker">LOCAL OPERATIONS</div>
      <h2>${t}</h2>
      <p class="panel-sub">Offline match against map-aware bots. No connection required.</p>
      <div class="form-grid">
        <label class="field full">MAP
          <select id="cfg-map">${s}</select>
          <span class="field-hint" id="cfg-map-description">${o.description}</span>
        </label>
        <label class="field">GAME MODE<select id="cfg-mode">${r}</select></label>
        <label class="field">BOT DIFFICULTY<select id="cfg-difficulty">${a}</select></label>
        <label class="field">NUMBER OF BOTS<select id="cfg-bots">
          ${[4,6,8,10,12].map(u=>`<option value="${u}" ${u===(e.botCount||8)?"selected":""}>${u} bots</option>`).join("")}
        </select></label>
        <label class="field" id="team-field">YOUR TEAM<select id="cfg-team">
          <option value="CT" ${i==="CT"?"selected":""}>Counter-Terrorists (CT)</option>
          <option value="T" ${i==="T"?"selected":""}>Terrorists (T)</option>
        </select></label>
        <label class="field">MATCH LENGTH<select id="cfg-time">
          <option value="120" ${e.timeLimit===120?"selected":""}>2 minutes</option>
          <option value="180" ${e.timeLimit===180||!e.timeLimit?"selected":""}>3 minutes</option>
          <option value="300" ${e.timeLimit===300?"selected":""}>5 minutes</option>
        </select></label>
        <label class="field">SCORE LIMIT<select id="cfg-score">
          <option value="15" ${e.scoreLimit===15?"selected":""}>15 kills</option>
          <option value="25" ${e.scoreLimit===25||!e.scoreLimit?"selected":""}>25 kills</option>
          <option value="40" ${e.scoreLimit===40?"selected":""}>40 kills</option>
        </select></label>
      </div>
      <div class="mode-note" id="cfg-mode-note">First team to the score limit or the highest team score at time-up wins.</div>
      <div class="panel-actions">
        <button data-close>CANCEL</button>
        <button class="accent" data-action="start-match">START MATCH</button>
      </div>`);const l=et("#cfg-map");l.addEventListener("change",()=>{const u=Et.maps[l.value];et("#cfg-map-description").textContent=u.description});const c=et("#cfg-mode"),h=()=>{const u=c.value==="ffa";et("#team-field").style.opacity=u?"0.4":"1",et("#cfg-team").disabled=u,et("#cfg-mode-note").textContent=u?"Every participant competes independently. Highest individual score wins.":"First team to the score limit or the highest team score at time-up wins."};c.addEventListener("change",h),h()}startFromSetup(){var l,c,h,u,f,d,g;const t=((l=et("#cfg-map"))==null?void 0:l.value)||"old_quarter",e=((c=et("#cfg-mode"))==null?void 0:c.value)||"tdm",i=((h=et("#cfg-difficulty"))==null?void 0:h.value)||"Normal",s=Number(((u=et("#cfg-bots"))==null?void 0:u.value)||8),r=e==="ffa"?"CT":((f=et("#cfg-team"))==null?void 0:f.value)||"CT",a=Number(((d=et("#cfg-time"))==null?void 0:d.value)||180),o=Number(((g=et("#cfg-score"))==null?void 0:g.value)||25);this.closePanel(),this.game.startMatch({mapId:t,mode:e,botCount:s,difficulty:i,team:r,timeLimit:a,scoreLimit:o})}openSettings(){ie.init();const t=Ee.get();this.showPanel(`
      <div class="panel-kicker">CONFIGURATION</div>
      <h2>SETTINGS</h2>
      <p class="panel-sub">Changes are applied immediately and saved on this device.</p>
      <div class="settings-section">
        <h3>CONTROLS</h3>
        <label class="field slider-field">MOUSE SENSITIVITY <output id="out-sensitivity">${t.sensitivity.toFixed(2)}</output>
          <input id="set-sensitivity" type="range" min="0.15" max="2.5" step="0.05" value="${t.sensitivity}">
        </label>
        <label class="field slider-field">FIELD OF VIEW <output id="out-fov">${Math.round(t.fov)}&deg;</output>
          <input id="set-fov" type="range" min="62" max="95" step="1" value="${t.fov}">
        </label>
        <label class="check-field"><input id="set-invert" type="checkbox" ${t.invertY?"checked":""}> INVERT MOUSE Y-AXIS</label>
      </div>
      <div class="settings-section">
        <h3>AUDIO</h3>
        <label class="field slider-field">MASTER VOLUME <output id="out-master">${Math.round(t.masterVolume*100)}%</output>
          <input id="set-master" type="range" min="0" max="1" step="0.05" value="${t.masterVolume}">
        </label>
        <label class="field slider-field">EFFECTS VOLUME <output id="out-effects">${Math.round(t.effectsVolume*100)}%</output>
          <input id="set-effects" type="range" min="0" max="1" step="0.05" value="${t.effectsVolume}">
        </label>
        <label class="field slider-field">MUSIC VOLUME <output id="out-music">${Math.round(t.musicVolume*100)}%</output>
          <input id="set-music" type="range" min="0" max="1" step="0.05" value="${t.musicVolume}">
        </label>
      </div>
      <div class="settings-section">
        <h3>VIDEO</h3>
        <div class="form-grid compact">
          <label class="field">GRAPHICS QUALITY<select id="set-quality">
            ${["low","medium","high"].map(i=>`<option value="${i}" ${t.quality===i?"selected":""}>${i.toUpperCase()}</option>`).join("")}
          </select></label>
          <label class="field">SHADOWS<select id="set-shadows">
            <option value="on" ${t.shadows?"selected":""}>ENABLED</option>
            <option value="off" ${t.shadows?"":"selected"}>DISABLED</option>
          </select></label>
          <label class="field slider-field full">RENDER SCALE <output id="out-resolution">${Math.round(t.resolutionScale*100)}%</output>
            <input id="set-resolution" type="range" min="0.6" max="1.25" step="0.05" value="${t.resolutionScale}">
          </label>
          <label class="field">CROSSHAIR COLOR<input id="set-crosshair" type="color" value="${t.crosshairColor}"></label>
          <label class="check-field"><input id="set-fps" type="checkbox" ${t.showFps?"checked":""}> SHOW FRAME-RATE COUNTER</label>
        </div>
        <button class="inline-button" data-action="fullscreen">TOGGLE FULLSCREEN</button>
      </div>
      <div class="panel-actions">
        <button data-close>CANCEL</button>
        <button data-action="reset-settings">RESET DEFAULTS</button>
        <button class="accent" data-action="save-settings">APPLY &amp; SAVE</button>
      </div>`);const e=(i,s,r=a=>a)=>{const a=et(i);a==null||a.addEventListener("input",()=>{s&&(et(s).textContent=r(a.value))})};e("#set-sensitivity","#out-sensitivity",i=>Number(i).toFixed(2)),e("#set-fov","#out-fov",i=>`${Math.round(i)}°`),e("#set-master","#out-master",i=>`${Math.round(i*100)}%`),e("#set-effects","#out-effects",i=>`${Math.round(i*100)}%`),e("#set-music","#out-music",i=>`${Math.round(i*100)}%`),e("#set-resolution","#out-resolution",i=>`${Math.round(i*100)}%`)}saveSettings(){Ee.update({sensitivity:Number(et("#set-sensitivity").value),fov:Number(et("#set-fov").value),invertY:et("#set-invert").checked,masterVolume:Number(et("#set-master").value),effectsVolume:Number(et("#set-effects").value),musicVolume:Number(et("#set-music").value),quality:et("#set-quality").value,shadows:et("#set-shadows").value==="on",resolutionScale:Number(et("#set-resolution").value),showFps:et("#set-fps").checked,crosshairColor:et("#set-crosshair").value}),ie.init(),ie.setVolumes(),this.game.applySettings(),this.closePanel(),this.toast("SETTINGS SAVED")}resetSettings(){Ee.reset(),this.game.applySettings(),this.toast("DEFAULTS RESTORED"),this.openSettings()}toggleFullscreen(){var t,e,i;document.fullscreenElement?(i=document.exitFullscreen)==null||i.call(document).catch(()=>{}):(e=(t=document.documentElement).requestFullscreen)==null||e.call(t).catch(()=>this.toast("FULLSCREEN WAS BLOCKED BY THE BROWSER"))}openProfile(){const t=Ee.profile,e=t.deaths>0?(t.kills/t.deaths).toFixed(2):t.kills.toFixed(2),i=t.matches>0?Math.round(t.wins/t.matches*100):0;this.showPanel(`
      <div class="panel-kicker">OPERATOR DOSSIER</div>
      <h2>PLAYER PROFILE</h2>
      <p class="panel-sub">Career statistics are stored locally on this device.</p>
      <div class="profile-layout">
        <div class="profile-identity">
          <div class="profile-patch">${Ze(t.name.slice(0,2).toUpperCase())}</div>
          <label class="field full">CALLSIGN<input id="profile-name" maxlength="18" value="${Ze(t.name)}"></label>
          <label class="field full">PREFERRED TEAM<select id="profile-team">
            <option value="CT" ${t.team==="CT"?"selected":""}>Counter-Terrorists</option>
            <option value="T" ${t.team==="T"?"selected":""}>Terrorists</option>
          </select></label>
          <div class="profile-rank">FIELD OPERATIVE <span>LOCAL RECORD</span></div>
        </div>
        <div class="profile-stats">
          <div><strong>${t.matches}</strong><span>MATCHES</span></div>
          <div><strong>${t.wins}</strong><span>WINS</span></div>
          <div><strong>${i}%</strong><span>WIN RATE</span></div>
          <div><strong>${t.kills}</strong><span>TOTAL KILLS</span></div>
          <div><strong>${t.deaths}</strong><span>DEATHS</span></div>
          <div><strong>${e}</strong><span>K/D RATIO</span></div>
        </div>
      </div>
      <p class="profile-note">Callsigns and settings persist through browser reloads using local storage.</p>
      <div class="panel-actions">
        <button data-action="reset-profile" class="danger-quiet">RESET RECORD</button>
        <button data-action="save-profile" class="accent">SAVE PROFILE</button>
      </div>`)}saveProfile(){const t=(et("#profile-name").value.trim()||"Operator").slice(0,18),e=et("#profile-team").value;Ee.updateProfile({name:t,team:e}),this.game.player&&(this.game.player.name=t),this.closePanel(),this.toast("PROFILE SAVED")}resetProfile(){Ee.resetProfile(),this.openProfile(),this.toast("CAREER RECORD RESET")}openCredits(){this.showPanel(`
      <div class="panel-kicker">ABOUT THIS BUILD</div>
      <h2>CREDITS</h2>
      <div class="credits-body">
        <p><b>TACTICAL FPS — CLASSIC COMBAT</b><br>Build 2.0.0 &bull; Original browser game</p>
        <p>An offline-first tactical shooter inspired by the feel of early-2000s PC shooters. All maps, textures, models, animation, audio and interface artwork in this project are generated procedurally or authored specifically for it. No Counter-Strike, Combat Online or other commercial game assets are included.</p>
        <p><b>ENGINE</b><br>Three.js &bull; WebGL2 &bull; Vite</p>
        <p><b>SYSTEMS</b><br>Procedural map construction &bull; A* navigation graph &bull; finite-state tactical AI &bull; hit-scan ballistics &bull; procedural character animation &bull; generated WebAudio effects</p>
        <p class="muted">Third-party software: Three.js (MIT), Vite (MIT). See package licenses for details.</p>
      </div>
      <div class="panel-actions"><button data-close>CLOSE</button></div>`)}openOnlineInfo(){this.showPanel(`
      <div class="panel-kicker">NETWORK STATUS</div>
      <h2>ONLINE MULTIPLAYER</h2>
      <div class="status-banner unavailable"><span class="status-dot"></span> ONLINE SERVICES UNAVAILABLE</div>
      <div class="credits-body">
        <p>This build is a complete <b>offline</b> game. It does not contain a lobby server or an authoritative networking backend, so online matchmaking and remote players are not available.</p>
        <p>No fake server list is shown and no bots are presented as human players. Every opponent in a match is clearly a local computer-controlled bot.</p>
        <p>The offline game includes two maps, Team Deathmatch, Free For All, three bot difficulties, full match scoring and saved preferences.</p>
      </div>
      <div class="panel-actions">
        <button data-close>BACK</button>
        <button class="accent" data-action="offline-setup">PLAY OFFLINE</button>
      </div>`)}toast(t,e=2300){this.toastEl.textContent=t,this.toastEl.classList.add("show"),clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.toastEl.classList.remove("show"),e)}banner(t,e=2400){const i=et("#objective-banner");i.textContent=t,i.classList.add("show"),clearTimeout(this.bannerTimer),this.bannerTimer=setTimeout(()=>{i.textContent="",i.classList.remove("show")},e)}showIntro(t,e){const i=et("#match-intro");et("#intro-map").textContent=t,et("#intro-mode").textContent=e,i.classList.remove("hidden"),i.classList.add("show"),clearTimeout(this.introTimer),clearTimeout(this.introHideTimer),this.introTimer=setTimeout(()=>{i.classList.remove("show"),this.introHideTimer=setTimeout(()=>i.classList.add("hidden"),350)},2400)}setMap(t){this.mapRuntime=t,this.buildRadarBackground()}buildRadarBackground(){if(!this.mapRuntime)return;const t=this.mapRuntime.world.bounds;this.radarBounds=t;const e=200,i=document.createElement("canvas");i.width=i.height=e;const s=i.getContext("2d");s.fillStyle="rgba(8, 18, 14, 0.74)",s.fillRect(0,0,e,e);const r=176/Math.max(t.maxX-t.minX,t.maxZ-t.minZ),a=(t.minX+t.maxX)/2,o=(t.minZ+t.maxZ)/2,l=h=>e/2+(h-a)*r,c=h=>e/2+(h-o)*r;for(const h of this.mapRuntime.world.colliders){if(h.minY>3||h.maxY<.3)continue;const u=(h.maxX-h.minX)*r,f=(h.maxZ-h.minZ)*r;u<.5&&f<.5||(s.fillStyle=h.maxY>2?"rgba(128, 134, 115, 0.34)":"rgba(149, 137, 105, 0.26)",s.fillRect(l(h.minX),c(h.minZ),Math.max(.7,u),Math.max(.7,f)))}s.strokeStyle="rgba(206, 199, 164, 0.35)",s.lineWidth=1.5,s.strokeRect(l(t.minX),c(t.minZ),(t.maxX-t.minX)*r,(t.maxZ-t.minZ)*r),this.radarBg=i}updateRadar(t){if(!this.radarBg||!this.mapRuntime)return;const e=et("#radar"),i=e.getContext("2d"),s=e.width;i.clearRect(0,0,s,s),i.save(),i.beginPath(),i.arc(s/2,s/2,s/2-4,0,Math.PI*2),i.clip(),i.drawImage(this.radarBg,0,0,s,s);const r=this.radarBounds,a=176/Math.max(r.maxX-r.minX,r.maxZ-r.minZ)*(s/200),o=(r.minX+r.maxX)/2,l=(r.minZ+r.maxZ)/2,c=m=>s/2+(m-o)*a,h=m=>s/2+(m-l)*a,u=t.player,f=c(u.position.x),d=h(u.position.z),g=u.yaw,v=Math.atan2(-Math.cos(g),-Math.sin(g));i.fillStyle="rgba(196, 207, 167, 0.12)",i.beginPath(),i.moveTo(f,d),i.arc(f,d,26,v-.48,v+.48),i.closePath(),i.fill();for(const m of t.bots){if(!m.alive)continue;const p=t.isEnemy(u,m),x=c(m.position.x),T=h(m.position.z);Math.hypot(x-s/2,T-s/2)>s/2-7||(i.beginPath(),i.fillStyle=p?"#d2674f":"#6ea4ba",i.shadowColor=p?"rgba(210,103,79,.8)":"rgba(110,164,186,.8)",i.shadowBlur=5,i.arc(x,T,p?3.6:3,0,Math.PI*2),i.fill())}i.shadowBlur=0,i.save(),i.translate(f,d),i.rotate(v+Math.PI/2),i.fillStyle="#e3d7aa",i.beginPath(),i.moveTo(0,-6),i.lineTo(4.2,4.5),i.lineTo(0,2.5),i.lineTo(-4.2,4.5),i.closePath(),i.fill(),i.restore(),i.restore(),i.strokeStyle="rgba(216, 207, 172, 0.34)",i.lineWidth=1.5,i.beginPath(),i.arc(s/2,s/2,s/2-4,0,Math.PI*2),i.stroke()}updateHUD(t){if(!t.active)return;const e=t.player;et("#round-mode").textContent=t.modeDef.name,et("#round-clock").textContent=Qn(t.timeLeft),et("#round-state").textContent=t.matchPoint?"MATCH POINT":"LIVE",et("#round-state").classList.toggle("match-point",!!t.matchPoint),et("#health-value").textContent=Math.max(0,Math.ceil(e.health)),et("#armor-value").textContent=Math.max(0,Math.ceil(e.armor)),et("#health-value").classList.toggle("critical",e.health<=30);const i=e.weapon;if(et("#weapon-name").textContent=i?i.name:"—",et("#ammo-value").textContent=e.currentAmmo.mag,et("#reserve-value").textContent=e.currentAmmo.reserve,et("#ammo-value").classList.toggle("empty",e.currentAmmo.mag===0),et("#match-mode-label").textContent=t.modeDef.name,t.mode==="tdm")et("#left-team-label").textContent="CT",et("#right-team-label").textContent="T",et("#ct-score").textContent=t.scores.CT,et("#t-score").textContent=t.scores.T,et("#match-score-label").textContent=`${t.scores.CT} – ${t.scores.T}`;else{const o=t.getSortedParticipants(),l=o.findIndex(h=>h.isPlayer)+1,c=o[0];et("#left-team-label").textContent="YOU",et("#right-team-label").textContent="LEADER",et("#ct-score").textContent=t.player.stats.kills,et("#t-score").textContent=c?c.kills:0,et("#match-score-label").textContent=`RANK ${l} / ${o.length}`}const s=et("#respawn-panel");!e.alive&&t.active&&!t.results?(s.classList.remove("hidden"),et("#respawn-count").textContent=Math.max(0,Math.ceil(e.respawnTimer)),et("#respawn-killer").textContent=t.lastDeathMessage||"RESPAWNING"):s.classList.add("hidden");const r=et("#pointer-prompt"),a=t.active&&!t.paused&&!t.results&&!this.pointerLocked&&e.alive;r.classList.toggle("hidden",!a)}updateCrosshair(t){const e=et("#crosshair"),i=Math.min(26,4+(t.player.currentSpread||0)*260);e.style.setProperty("--spread",`${i.toFixed(1)}px`)}setPointerLocked(t){this.pointerLocked=t,this.game.active&&this.updatePrompt()}updatePrompt(){const t=this.game,e=t.active&&!t.paused&&!t.results&&!this.pointerLocked&&t.player.alive;et("#pointer-prompt").classList.toggle("hidden",!e)}setFps(t){this.fps=t;const e=et("#fps-counter"),i=Ee.get("showFps");e.classList.toggle("hidden",!i),i&&(e.textContent=`FPS ${Math.round(t)}`)}feed(t,e,i,s,r){const a=et("#kill-feed"),o=document.createElement("div");for(o.className="kill-row",o.innerHTML=`<span class="killer team-${i}">${Ze(t)}</span><span class="weapon-mark">${r?"&#10022;":"&#9656;"}</span><span class="victim team-${s}">${Ze(e)}</span>`,a.prepend(o);a.children.length>6;)a.lastChild.remove();setTimeout(()=>o.remove(),4800)}hitmarker(t=!1){const e=et("#hitmarker");e.classList.remove("show","headshot"),e.offsetWidth,e.classList.add("show"),t&&e.classList.add("headshot"),clearTimeout(this.hitmarkerTimer),this.hitmarkerTimer=setTimeout(()=>e.classList.remove("show"),140)}damage(t,e=1){const i=et("#damage-vignette");if(i.style.opacity=String(Math.min(.85,.25+e*.55)),i.classList.add("show"),clearTimeout(this.damageTimer),this.damageTimer=setTimeout(()=>{i.classList.remove("show"),i.style.opacity="0"},220),t){const s=et("#damage-direction"),r=Math.atan2(t.x,-t.z)*(180/Math.PI);s.style.transform=`translate(-50%, -50%) rotate(${r}deg)`,s.classList.add("show"),clearTimeout(this.directionTimer),this.directionTimer=setTimeout(()=>s.classList.remove("show"),800)}}showScoreboard(t){this.scoreboardVisible=!0;const e=et("#scoreboard");e.innerHTML=this.scoreboardHtml(t),e.classList.remove("hidden")}hideScoreboard(){this.scoreboardVisible=!1,et("#scoreboard").classList.add("hidden")}scoreboardHtml(t){const e=t.getSortedParticipants();if(t.mode==="tdm"){const i=e.filter(r=>r.team==="CT").sort((r,a)=>a.kills-r.kills),s=e.filter(r=>r.team==="T").sort((r,a)=>a.kills-r.kills);return`
        <div class="scoreboard-head"><span>${Ze(t.mapDef.name)}</span><b>${t.scores.CT} : ${t.scores.T}</b><span>${t.modeDef.name}</span></div>
        <div class="scoreboard-teams">
          ${this.teamTable("COUNTER-TERRORISTS",i,"ct")}
          ${this.teamTable("TERRORISTS",s,"t")}
        </div>
        <div class="scoreboard-foot">TAB HOLD TO VIEW &bull; ${Qn(t.timeLeft)} REMAINING &bull; FIRST TO ${t.matchConfig.scoreLimit}</div>`}return`
      <div class="scoreboard-head"><span>${Ze(t.mapDef.name)}</span><b>FREE FOR ALL</b><span>${Qn(t.timeLeft)}</span></div>
      <table class="score-table">
        <thead><tr><th>#</th><th>OPERATOR</th><th>KILLS</th><th>DEATHS</th><th>STATUS</th></tr></thead>
        <tbody>${e.map((i,s)=>`
          <tr class="${i.isPlayer?"you":""}">
            <td>${s+1}</td>
            <td><span class="team-dot team-${i.team}"></span>${Ze(i.name)}${i.isPlayer?" <em>YOU</em>":""}</td>
            <td><b>${i.kills}</b></td><td>${i.deaths}</td><td>${i.alive?"ACTIVE":"DOWN"}</td>
          </tr>`).join("")}
        </tbody>
      </table>
      <div class="scoreboard-foot">TAB HOLD TO VIEW &bull; ${Qn(t.timeLeft)} REMAINING &bull; FIRST TO ${t.matchConfig.scoreLimit} KILLS</div>`}teamTable(t,e,i){return`
      <div class="score-team team-${i}">
        <h3>${t}</h3>
        <table class="score-table">
          <thead><tr><th>OPERATOR</th><th>K</th><th>D</th><th>STATUS</th></tr></thead>
          <tbody>${e.map(s=>`
            <tr class="${s.isPlayer?"you":""}">
              <td>${Ze(s.name)}${s.isPlayer?" <em>YOU</em>":""}</td>
              <td>${s.kills}</td><td>${s.deaths}</td><td>${s.alive?"ACTIVE":"DOWN"}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>`}showPause(t,e){et("#pause-panel").classList.toggle("hidden",!t),t&&e&&(et("#pause-subtitle").textContent=`${e.mapDef.name} • ${e.modeDef.name} • ${Qn(e.timeLeft)}`)}hidePause(){et("#pause-panel").classList.add("hidden")}showResults(t){this.matchData=t;const e=et("#results-content"),i=t.playerWon?"won":t.draw?"draw":"lost",s=t.draw?"DRAW":t.playerWon?"VICTORY":"DEFEAT",r=t.mode==="tdm"?t.draw?`Match drawn ${t.finalScore}`:`${t.winnerLabel} wins ${t.finalScore}`:t.draw?`Top score ${t.winnerScore} kills — no outright winner`:`${Ze(t.winnerName)} wins with ${t.winnerScore} kills`;e.className=`modal-frame results-frame ${i}`,e.innerHTML=`
      <div class="modal-kicker">MATCH COMPLETE &bull; ${Ze(t.mapName)}</div>
      <h2>${s}</h2>
      <p class="result-sub">${r}</p>
      <div class="result-scoreline">
        ${t.mode==="tdm"?`<div class="team-result ct"><span>CT</span><strong>${t.scores.CT}</strong></div><div class="vs">:</div><div class="team-result t"><span>T</span><strong>${t.scores.T}</strong></div>`:`<div class="ffa-result"><span>YOUR PLACEMENT</span><strong>#${t.playerPlace}</strong><small>${t.playerKills} KILLS &bull; ${t.playerDeaths} DEATHS</small></div>`}
      </div>
      <div class="result-stats">
        <div><strong>${t.playerKills}</strong><span>KILLS</span></div>
        <div><strong>${t.playerDeaths}</strong><span>DEATHS</span></div>
        <div><strong>${t.playerKd}</strong><span>K/D</span></div>
        <div><strong>${t.headshots}</strong><span>HEADSHOTS</span></div>
      </div>
      <div class="result-table">${t.table}</div>
      <div class="panel-actions">
        <button data-action="main-menu">MAIN MENU</button>
        <button data-action="new-match">NEW MATCH</button>
        <button class="accent" data-action="play-again">PLAY AGAIN</button>
      </div>`,et("#results-panel").classList.remove("hidden"),this.hideScoreboard(),this.hidePause()}hideResults(){et("#results-panel").classList.add("hidden")}showLoading(t="DEPLOYING TO MATCH…"){this.toast(t,900)}}const Bs=(n,t=document)=>t.querySelector(n),Xr={mapId:"old_quarter",mode:"tdm",botCount:8,difficulty:"Normal",team:"CT",timeLimit:180,scoreLimit:25};function Rl(n,t,e,i){const s=e.x-n.x,r=e.y-n.y,a=e.z-n.z,o=s*t.x+r*t.y+a*t.z;if(o<0)return null;const l=s*s+r*r+a*a-o*o,c=i*i;if(l>c)return null;const h=Math.sqrt(c-l),u=o-h,f=o+h;return f<0?null:u>=0?u:f}class y0{constructor(t){this.canvas=t,this.settings=Ee,this.scene=new bm,this.camera=new Oe(74,window.innerWidth/window.innerHeight,.055,240),this.menuCamera=new Oe(58,window.innerWidth/window.innerHeight,.08,260),this.renderer=new Tm({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputColorSpace=Ue,this.renderer.toneMapping=Ul,this.renderer.toneMappingExposure=1.12,this.renderer.shadowMap.type=Dl,this.renderer.setClearColor(10195575,1),this.clock=new Zm,this.active=!1,this.paused=!1,this.results=!1,this.resultsRecorded=!1,this.player=null,this.bots=[],this.mapRuntime=null,this.mapDef=Et.maps.old_quarter,this.modeDef=Et.modes.tdm,this.mode="tdm",this.matchConfig={...Xr,team:Ee.profile.team||"CT"},this.scores={CT:0,T:0},this.timeLeft=0,this.elapsed=0,this.keys={},this.mouseDown=!1,this.wasPointerLocked=!1,this.fps=0,this.fpsFrames=0,this.fpsTimer=0,this.uiTimer=0,this.radarTimer=0,this.lastDeathMessage="",this.matchPoint=!1,this.alertCooldown=new Map,this.menuTime=0,this.effectsGroup=null,this.tracers=[],this.sparks=[],this.dust=null,this.tracerIndex=0,this.sparkIndex=0,this.ui=new x0(this),this.applySettings(),this.bindInput(),this.bindResize(),this.createMenuPreview(),this.bindQaApi(),this.animate=this.animate.bind(this),requestAnimationFrame(this.animate)}get quality(){const t=Et.quality[Ee.get("quality")]||Et.quality.medium;return{...t,shadows:t.shadows&&Ee.get("shadows")}}get time(){return this.elapsed}applySettings(){var s,r;const t=this.quality,e=Ee.get(),i=Math.min(window.devicePixelRatio||1,t.pixelRatio*e.resolutionScale);if(this.renderer.setPixelRatio(Math.max(.6,i)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!!t.shadows,(r=(s=this.mapRuntime)==null?void 0:s.lights)!=null&&r.sun){this.mapRuntime.lights.sun.castShadow=!!t.shadows;const a=Math.min(t.shadowMap,this.renderer.capabilities.maxTextureSize);this.mapRuntime.lights.sun.shadow.mapSize.x!==a&&(this.mapRuntime.lights.sun.shadow.mapSize.set(a,a),this.mapRuntime.lights.sun.shadow.map&&(this.mapRuntime.lights.sun.shadow.map.dispose(),this.mapRuntime.lights.sun.shadow.map=null))}this.player&&(this.player.baseFov=e.fov,this.player.camera.fov=e.fov,this.player.camera.updateProjectionMatrix()),document.documentElement.style.setProperty("--crosshair-color",e.crosshairColor),this.renderer.shadowMap.needsUpdate=!0,this.ui.setFps(this.fps),ie.setVolumes()}createMenuPreview(){var i;this.cleanupRuntime();const t=this.quality,e=Tl(this.scene,"old_quarter",t);this.mapRuntime=e,this.mapDef=e.definition,this.scene.add(this.menuCamera),this.menuCamera.aspect=window.innerWidth/window.innerHeight,this.menuCamera.updateProjectionMatrix(),this.createEffects(),this.menuTime=0,this.active=!1,this.paused=!1,this.results=!1,this.ui.setMap(e),this.ui.showMenu(),this.ui.hideScoreboard(),this.ui.hideResults(),this.ui.hidePause(),(i=Bs("#respawn-panel"))==null||i.classList.add("hidden"),document.title="TACTICAL FPS — Classic Combat"}cleanupRuntime(){var t;for(const e of this.bots)e.dispose();if(this.bots.length=0,this.player&&(this.player.dispose(),this.player=null),this.mapRuntime){if(this.mapRuntime.world.dispose(),this.mapRuntime.sky){const e=this.mapRuntime.sky.userData.sun;e&&(this.scene.remove(e),(t=e.material.map)==null||t.dispose(),e.material.dispose()),this.scene.remove(this.mapRuntime.sky),this.mapRuntime.sky.geometry.dispose(),this.mapRuntime.sky.material.dispose()}this.mapRuntime.lights&&this.scene.remove(this.mapRuntime.lights.hemi,this.mapRuntime.lights.sun,this.mapRuntime.lights.sun.target),this.mapRuntime=null}this.effectsGroup&&(this.effectsGroup.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(i=>i.dispose()):e.material.dispose())}),this.scene.remove(this.effectsGroup),this.effectsGroup=null),this.tracers.length=0,this.sparks.length=0,this.dust=null,this.scene.clear(),this.renderer.renderLists.dispose()}createEffects(){this.effectsGroup=new Se,this.effectsGroup.name="effects",this.scene.add(this.effectsGroup);const t=[16766874,16760954];for(let c=0;c<20;c++){const h=new Te;h.setAttribute("position",new he(new Float32Array(6),3));const u=new fc({color:t[c%2],transparent:!0,opacity:.85,depthWrite:!1,blending:ki}),f=new Cm(h,u);f.visible=!1,f.frustumCulled=!1,this.effectsGroup.add(f),this.tracers.push({line:f,life:0,maxLife:.018})}const e=new cn({color:16761469,transparent:!0,opacity:.9,depthWrite:!1,blending:ki}),i=new je(.035,4,3);for(let c=0;c<42;c++){const h=new ce(i,e);h.visible=!1,this.effectsGroup.add(h),this.sparks.push({mesh:h,life:0,velocity:new w})}const s=this.mapDef.bounds,r=Math.round(260*this.quality.particles),a=new Float32Array(r*3);for(let c=0;c<r;c++)a[c*3]=Bt(s.minX,s.maxX),a[c*3+1]=Bt(.5,13),a[c*3+2]=Bt(s.minZ,s.maxZ);const o=new Te;o.setAttribute("position",new We(a,3));const l=new pc({color:this.mapDef.id==="industrial"?13160652:14731417,size:.075,transparent:!0,opacity:.3,depthWrite:!1,sizeAttenuation:!0});this.dust=new Rm(o,l),this.effectsGroup.add(this.dust)}quickStart(){this.startMatch({...Xr,team:Ee.profile.team||"CT"})}startMatch(t={}){ie.init(),ie.startMusic();const e={...Xr,...this.matchConfig,...t};Et.maps[e.mapId]||(e.mapId="old_quarter"),Et.modes[e.mode]||(e.mode="tdm"),Et.difficulties[e.difficulty]||(e.difficulty="Normal"),e.botCount=an(Number(e.botCount)||0,0,12),e.timeLimit=Math.max(60,Number(e.timeLimit)||180),e.scoreLimit=Math.max(5,Number(e.scoreLimit)||25),this.matchConfig=e,this.mode=e.mode,this.modeDef=Et.modes[e.mode],this.mapDef=Et.maps[e.mapId],this.cleanupRuntime(),this.ui.hideMenu(),this.ui.hideResults(),this.ui.hidePause(),this.ui.hideScoreboard(),this.ui.closePanel(),Bs("#respawn-panel").classList.add("hidden"),Bs("#match-intro").classList.add("hidden");const i=Bs("#kill-feed");i&&(i.innerHTML="");const s=Tl(this.scene,e.mapId,this.quality);this.mapRuntime=s,this.mapDef=s.definition,this.createEffects(),this.player=new g0({scene:this.scene,camera:this.camera,world:s.world,audio:ie,settings:Ee}),this.player.name=Ee.profile.name,this.player.team=e.mode==="ffa"?"FFA":e.team,this.player.stats={kills:0,deaths:0,headshots:0},this.scene.add(this.camera),this.active=!0,this.paused=!1,this.results=!1,this.resultsRecorded=!1,this.scores.CT=0,this.scores.T=0,this.timeLeft=e.timeLimit,this.elapsed=0,this.matchPoint=!1,this.lastDeathMessage="",this.mouseDown=!1,this.keys={},this.alertCooldown.clear(),this.createBots(e);const r=this.chooseSpawn(this.player.team,[]);this.player.respawn(r,this.playerYaw(r)),this.ui.setMap(s),this.ui.showIntro(s.definition.name,this.modeDef.name),this.ui.updateHUD(this),this.ui.setPointerLocked(!1),document.title=`${s.definition.name} — TACTICAL FPS`,ie.matchStart(),this.requestPointerLock(),this.clock.getDelta()}createBots(t){this.bots=[];const e=i0(Et.botNames);let i=0,s=0;if(t.mode==="tdm"){const r=t.botCount+1,a=Math.ceil(r/2);i=Math.max(0,a-(t.team==="CT"?1:0)),s=Math.max(0,t.botCount-i);const o=r-a;s>o&&(i+=s-o,s=o),i+s<t.botCount&&(i+=t.botCount-i-s)}for(let r=0;r<t.botCount;r++){let a,o;t.mode==="tdm"?(a=r<i?"CT":"T",o=a):(a="FFA",o=r%2===0?"CT":"T");const l=new _0({scene:this.scene,world:this.mapRuntime.world,nav:this.mapRuntime.nav,team:a,visualTeam:o,name:e[r%e.length]+(r>=e.length?` ${r+1}`:""),difficulty:t.difficulty,mode:t.mode,index:r,game:this}),c=this.chooseSpawn(a,[]);l.spawn(c),this.bots.push(l)}}chooseSpawn(t,e=[]){var l,c;const i=this.mode==="ffa"?this.mapDef.ffaSpawns:this.mapDef.spawns[t]||this.mapDef.spawns.CT;if(!(i!=null&&i.length))return{x:0,z:0,y:0};const s=e.length?e:[...this.bots.filter(h=>h.alive&&(this.mode==="ffa"||h.team!==t)),...(l=this.player)!=null&&l.alive&&(this.mode==="ffa"||this.player.team!==t)?[this.player]:[]],r=[...this.bots.filter(h=>h.alive),...(c=this.player)!=null&&c.alive?[this.player]:[]];let a=i[0],o=-1/0;for(const h of i){let u=100;for(const v of s)v!=null&&v.position&&(u=Math.min(u,Math.hypot(h.x-v.position.x,h.z-v.position.z)));let f=100;for(const v of r)v!=null&&v.position&&(f=Math.min(f,Math.hypot(h.x-v.position.x,h.z-v.position.z)));const d=Math.min(8,f)*.9,g=u+d+Bt(0,4);g>o&&(o=g,a=h)}return{x:a.x,z:a.z,y:a.y??0}}playerYaw(t){return Math.atan2(t.x,t.z)}respawnPlayer(){if(!this.active||this.results)return;const t=this.chooseSpawn(this.player.team,[]);this.player.respawn(t,this.playerYaw(t)),this.lastDeathMessage="",this.ui.banner("BACK IN THE FIGHT",1400),this.requestPointerLock()}respawnBot(t){if(!this.active||this.results)return;const e=this.chooseSpawn(t.team,[]);t.spawn(e)}getSortedParticipants(){if(!this.player)return[];const t=[{name:this.player.name,team:this.mode==="ffa"?"FFA":this.player.team,kills:this.player.stats.kills,deaths:this.player.stats.deaths,alive:this.player.alive,isPlayer:!0}];for(const e of this.bots)t.push({name:e.name,team:this.mode==="ffa"?"FFA":e.team,kills:e.kills,deaths:e.deaths,alive:e.alive,isPlayer:!1});return t.sort((e,i)=>this.mode==="tdm"&&e.team!==i.team?e.team==="CT"?-1:1:i.kills!==e.kills?i.kills-e.kills:e.deaths-i.deaths),t}isEnemy(t,e){return!t||!e||t===e?!1:this.mode==="ffa"?!0:t.team!==e.team}registerKill(t,e,i="rifle",s=!1){if(!t||!e||t===e)return;const r=t.name||"Unknown",a=e.name||"Unknown",o=t.team==="FFA"?"FFA":t.team,l=e.team==="FFA"?"FFA":e.team;t===this.player?(this.player.stats.kills++,s&&this.player.stats.headshots++,this.ui.banner(s?"HEADSHOT KILL":"TARGET DOWN",1100)):(t.kills=(t.kills||0)+1,s&&(t.headshots=(t.headshots||0)+1)),e===this.player?this.lastDeathMessage=`KILLED BY ${r.toUpperCase()}`:e.deaths=(e.deaths||0)+1,this.mode==="tdm"&&t.team!==e.team&&(this.scores[t.team]=(this.scores[t.team]||0)+1),this.ui.feed(r,a,o,l,s),t===this.player&&ie.hitmarker(s),this.updateMatchPoint(),this.uiTimer<=0&&this.ui.updateHUD(this)}updateMatchPoint(){const t=this.matchConfig.scoreLimit;if(this.mode==="tdm")this.matchPoint=this.scores.CT===t-1||this.scores.T===t-1;else{const e=Math.max(this.player.stats.kills,...this.bots.map(i=>i.kills));this.matchPoint=e===t-1}}checkEndConditions(){if(!this.active||this.results)return!1;const t=this.matchConfig.scoreLimit;if(this.mode==="tdm"){if(this.scores.CT>=t||this.scores.T>=t)return this.endMatch("score limit"),!0}else if(Math.max(this.player.stats.kills,...this.bots.map(e=>e.kills))>=t)return this.endMatch("score limit"),!0;return!1}endMatch(t="time expired"){var p;if(this.results||!this.active)return;this.results=!0,this.paused=!1,this.mouseDown=!1,this.ui.hidePause(),this.ui.hideScoreboard(),document.pointerLockElement&&((p=document.exitPointerLock)==null||p.call(document));const e=this.getSortedParticipants(),i=this.player.team;let s=!1,r=!1,a="",o="",l=0,c="",h=e.findIndex(x=>x.isPlayer)+1;if(this.mode==="tdm")if(this.scores.CT===this.scores.T)r=!0,a="DRAW",c=`${this.scores.CT} : ${this.scores.T}`;else{const x=this.scores.CT>this.scores.T?"CT":"T";a=x==="CT"?"COUNTER-TERRORISTS":"TERRORISTS",c=x==="CT"?`${this.scores.CT} : ${this.scores.T}`:`${this.scores.T} : ${this.scores.CT}`,s=x===i}else{const x=e[0];x&&(o=x.name,l=x.kills,r=e.length>1&&x.kills===e[1].kills&&x.deaths===e[1].deaths,s=!r&&x.isPlayer,r&&(a="DRAW"))}r&&(s=!1);const u=this.player.stats.kills,f=this.player.stats.deaths,d=f>0?(u/f).toFixed(2):u.toFixed(2),g=this.mode==="tdm"?e.map(x=>`<tr class="${x.isPlayer?"you":""}"><td><span class="team-dot team-${x.team}"></span>${Ze(x.name)}${x.isPlayer?" <em>YOU</em>":""}</td><td>${x.team}</td><td>${x.kills}</td><td>${x.deaths}</td></tr>`).join(""):e.map((x,T)=>`<tr class="${x.isPlayer?"you":""}"><td>${T+1}</td><td>${Ze(x.name)}${x.isPlayer?" <em>YOU</em>":""}</td><td>${x.kills}</td><td>${x.deaths}</td></tr>`).join(""),m=`<table class="score-table"><thead>${this.mode==="tdm"?"<tr><th>OPERATOR</th><th>TEAM</th><th>K</th><th>D</th></tr>":"<tr><th>#</th><th>OPERATOR</th><th>K</th><th>D</th></tr>"}</thead><tbody>${g}</tbody></table>`;this.resultsRecorded||(Ee.recordMatch({won:s,kills:u,deaths:f}),this.resultsRecorded=!0),this.ui.showResults({mode:this.mode,mapName:this.mapDef.name,scores:{...this.scores},finalScore:c,winnerLabel:a,winnerName:o,winnerScore:l,draw:r,playerWon:s,playerPlace:h,playerKills:u,playerDeaths:f,playerKd:d,headshots:this.player.stats.headshots,table:m,reason:t}),s?ie.victory():r?ie.uiClick():ie.defeat()}restartMatch(){this.matchConfig&&(this.ui.hideResults(),this.startMatch(this.matchConfig))}leaveMatch(t=!0){var e;this.active=!1,this.paused=!1,this.results=!1,this.mouseDown=!1,this.keys={},document.pointerLockElement&&((e=document.exitPointerLock)==null||e.call(document)),this.ui.hideScoreboard(),this.ui.hidePause(),this.ui.hideResults(),this.ui.closePanel(),t&&(this.createMenuPreview(),this.ui.toast("MATCH ENDED — RETURNED TO MENU"))}resume(){!this.active||this.results||(this.paused=!1,this.ui.hidePause(),this.clock.getDelta(),this.requestPointerLock())}pause(){var t;!this.active||this.results||this.paused||(this.paused=!0,this.mouseDown=!1,this.keys={},this.ui.showPause(!0,this),document.pointerLockElement&&((t=document.exitPointerLock)==null||t.call(document)))}requestPointerLock(){var t,e;if(!(!this.active||this.paused||this.results)&&document.pointerLockElement!==this.canvas)try{const i=(e=(t=this.canvas).requestPointerLock)==null?void 0:e.call(t);i&&typeof i.catch=="function"&&i.catch(()=>{})}catch{}}bindInput(){window.addEventListener("keydown",t=>{var e,i,s;if(!this.ui.panelScreen.classList.contains("visible")&&!(t.target instanceof HTMLInputElement||t.target instanceof HTMLSelectElement||t.target instanceof HTMLTextAreaElement)){if(["Space","Tab"].includes(t.code)&&t.preventDefault(),t.repeat){this.active&&!this.paused&&!this.results&&(this.keys[t.code]=!0);return}if(t.code==="Escape"&&this.active&&this.paused&&!this.results){t.preventDefault(),this.resume();return}!this.active||this.paused||this.results||(this.keys[t.code]=!0,t.code==="Escape"?this.pause():t.code==="Tab"?this.ui.showScoreboard(this):t.code==="KeyR"?(e=this.player)==null||e.startReload():t.code==="Digit1"?(i=this.player)==null||i.switchWeapon("rifle"):t.code==="Digit2"&&((s=this.player)==null||s.switchWeapon("pistol")))}}),window.addEventListener("keyup",t=>{t.code==="Tab"&&this.ui.scoreboardVisible&&this.ui.hideScoreboard(),this.keys[t.code]=!1}),window.addEventListener("blur",()=>{this.keys={},this.mouseDown=!1,this.active&&!this.paused&&!this.results&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.active&&!this.paused&&!this.results&&this.pause()}),document.addEventListener("pointerlockchange",()=>{const t=document.pointerLockElement===this.canvas;this.ui.setPointerLocked(t),!t&&this.wasPointerLocked&&this.active&&!this.paused&&!this.results&&this.pause(),this.wasPointerLocked=t}),document.addEventListener("pointerlockerror",()=>{this.ui.toast("MOUSE CAPTURE WAS BLOCKED — CLICK THE GAME VIEW"),this.ui.updatePrompt()}),this.canvas.addEventListener("mousedown",t=>{var e;if(!(!this.active||this.paused||this.results)&&t.button===0){if(document.pointerLockElement!==this.canvas){this.requestPointerLock();return}this.mouseDown=!0,(e=this.player)==null||e.fire(this)}}),window.addEventListener("mouseup",t=>{var e;t.button===0&&(this.mouseDown=!1,(e=this.player)==null||e.releaseTrigger())}),document.addEventListener("mousemove",t=>{var e;document.pointerLockElement!==this.canvas||!this.active||this.paused||this.results||(e=this.player)==null||e.look(t.movementX||0,t.movementY||0)}),this.canvas.addEventListener("contextmenu",t=>t.preventDefault()),window.addEventListener("wheel",t=>{var e;!this.active||this.paused||this.results||!((e=this.player)!=null&&e.alive)||(t.deltaY>0?this.player.switchWeapon(this.player.weaponId==="rifle"?"pistol":"rifle"):this.player.switchWeapon(this.player.weaponId==="rifle"?"pistol":"rifle"))},{passive:!0}),window.addEventListener("resize",()=>this.resize())}bindResize(){this.resize()}resize(){const t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.menuCamera.aspect=t/e,this.menuCamera.updateProjectionMatrix(),this.applySettings()}animate(){var e;requestAnimationFrame(this.animate);const t=Math.min(.05,this.clock.getDelta());if(this.fpsFrames++,this.fpsTimer+=t,this.fpsTimer>=.5&&(this.fps=this.fpsFrames/this.fpsTimer,this.fpsFrames=0,this.fpsTimer=0,this.ui.setFps(this.fps)),!this.active){this.updateMenu(t),this.updateEffects(t),this.renderer.render(this.scene,this.menuCamera);return}!this.paused&&!this.results?this.update(t):this.updateEffects(t),this.player&&(this.ui.updateCrosshair(this),!this.paused&&!this.results&&this.ui.updatePrompt()),this.renderer.render(this.scene,((e=this.player)==null?void 0:e.camera)||this.menuCamera)}updateMenu(t){this.menuTime+=t;const e=this.menuTime*.055+.8,i=31;this.menuCamera.position.set(Math.cos(e)*i,10.5+Math.sin(this.menuTime*.13)*1.2,Math.sin(e)*i),this.menuCamera.lookAt(0,2.2,0)}update(t){if(this.elapsed+=t,this.uiTimer-=t,this.radarTimer-=t,this.player){const i={forward:!!(this.keys.KeyW||this.keys.ArrowUp),back:!!(this.keys.KeyS||this.keys.ArrowDown),left:!!(this.keys.KeyA||this.keys.ArrowLeft),right:!!(this.keys.KeyD||this.keys.ArrowRight),sprint:!!(this.keys.ShiftLeft||this.keys.ShiftRight),crouch:!!(this.keys.ControlLeft||this.keys.ControlRight||this.keys.KeyC),jump:!!this.keys.Space};this.player.update(t,i),this.mouseDown&&this.player.alive&&this.player.weapon.automatic&&this.player.fire(this),!this.player.alive&&this.player.respawnTimer<=0&&this.respawnPlayer()}const e={player:this.player,bots:this.bots,time:this.elapsed,game:this};for(const i of this.bots)i.update(t,e);if(this.timeLeft-=t,this.timeLeft<=0){this.timeLeft=0,this.endMatch("time expired");return}this.updateEffects(t),this.checkEndConditions(),this.uiTimer<=0&&(this.uiTimer=.1,this.ui.updateHUD(this)),this.radarTimer<=0&&(this.radarTimer=.08,this.ui.updateRadar(this))}updateEffects(t){for(const e of this.tracers)e.life>0&&(e.life-=t,e.line.material.opacity=an(e.life/e.maxLife,0,1)*.85,e.life<=0&&(e.line.visible=!1));for(const e of this.sparks)if(e.life>0){e.life-=t,e.mesh.position.addScaledVector(e.velocity,t),e.velocity.y-=9*t;const i=Math.max(.05,e.life*4);e.mesh.scale.setScalar(i),e.life<=0&&(e.mesh.visible=!1)}if(this.dust){this.dust.rotation.y+=t*.003;const e=this.dust.geometry.attributes.position;for(let i=0;i<e.count;i+=5)e.setY(i,e.getY(i)+Math.sin(this.elapsed*.2+i)*t*.06);e.needsUpdate=!0}}addTracer(t,e,i=16766874){const s=this.tracers[this.tracerIndex];if(!s)return;this.tracerIndex=(this.tracerIndex+1)%this.tracers.length;const r=s.line.geometry.attributes.position;r.setXYZ(0,t.x,t.y,t.z),r.setXYZ(1,e.x,e.y,e.z),r.needsUpdate=!0,s.line.geometry.computeBoundingSphere(),s.line.material.color.setHex(i),s.line.material.opacity=.85,s.line.visible=!0,s.life=.055,s.maxLife=.055}spawnImpact(t,e=16761469,i=5){for(let s=0;s<i;s++){const r=this.sparks[this.sparkIndex];this.sparkIndex=(this.sparkIndex+1)%this.sparks.length,r.mesh.position.copy(t),r.mesh.visible=!0,r.mesh.scale.setScalar(1),r.mesh.material.color.setHex(e),r.life=Bt(.12,.28),r.velocity.set(Bt(-2.2,2.2),Bt(.8,3.4),Bt(-2.2,2.2))}}muzzlePosition(t=.18){const e=new w(0,0,-1).applyQuaternion(this.camera.quaternion),i=new w(1,0,0).applyQuaternion(this.camera.quaternion),s=new w(0,1,0).applyQuaternion(this.camera.quaternion);return this.camera.position.clone().addScaledVector(e,.8).addScaledVector(i,t).addScaledVector(s,-.18)}playerShoot(t,e,i){if(!this.active||this.results||!t.alive)return;const s=this.camera.position.clone(),r=new w(0,0,-1).applyQuaternion(this.camera.quaternion).normalize(),a=new w(1,0,0).applyQuaternion(this.camera.quaternion),o=new w(0,1,0).applyQuaternion(this.camera.quaternion),l=Math.tan(i),c=r.clone().addScaledVector(a,Bt(-1,1)*l).addScaledVector(o,Bt(-1,1)*l).normalize(),h=e.range,u=s.clone().addScaledVector(c,h),f=this.mapRuntime.world.segmentHitFraction(s,u);let d=f===null?h:Math.min(h,f*h);if(c.y<-.001){const _=-s.y/c.y;_>0&&_<d&&(d=_)}let g=null,v=null,m=d;for(const _ of this.bots){if(!_.alive||!this.isEnemy(t,_))continue;const L=_.position.x,A=_.position.y,C=_.position.z,R=[{x:L,y:A+1.72,z:C,r:.23,part:"head"},{x:L,y:A+1.25,z:C,r:.36,part:"body"},{x:L,y:A+.75,z:C,r:.33,part:"legs"}];for(const E of R){const M=Rl(s,c,{x:E.x,y:E.y,z:E.z},E.r);M!==null&&M<m&&(m=M,g=_,v=E.part)}}const p=this.muzzlePosition(),x=s.clone().addScaledVector(c,Math.min(m,h));if(this.addTracer(p,x),g){const _=v==="head",L=v==="legs"?.72:1,A=an(1-m/h*.3,.7,1),C=e.damage*(_?e.headMultiplier:L)*A,R=g.takeDamage(C);this.spawnImpact(x,_?16751210:13212267,6),this.ui.hitmarker(_),ie.hitmarker(_),R?this.registerKill(t,g,e.id,_):g.hear(t.position,t.team),this.makeNoise(t.position,t.team)}else this.spawnImpact(x,16761469,4),ie.impact(),this.makeNoise(t.position,t.team);const T=this.player?t.position.distanceTo(this.player.position):0;ie.gunshot(e.id,T),this.checkEndConditions()}botShoot(t,e,i){if(!this.active||this.results||!t.alive||!(e!=null&&e.alive))return;const s=new w(t.position.x,t.position.y+1.5,t.position.z),r=e===this.player,a=e.position.y+(r?e.crouched?.9:1.15:1.2),o=new w(e.position.x,a,e.position.z),l=s.distanceTo(o),c=o.clone().sub(s).normalize(),h=new w().crossVectors(c,new w(0,1,0)).normalize(),u=new w().crossVectors(h,c).normalize(),f=t.currentSpeed>1?1.35:1,d=i.aimSpread/Math.max(.5,t.skill.accuracy)*f,g=c.clone().addScaledVector(h,Bt(-1,1)*d).addScaledVector(u,Bt(-1,1)*d).normalize(),v=80,m=s.clone().addScaledVector(g,v),p=this.mapRuntime.world.segmentHitFraction(s,m);let x=p===null?v:Math.min(v,p*v);if(g.y<-.001){const R=-s.y/g.y;R>0&&R<x&&(x=R)}let T=x,_=null;const L=r?[{x:e.position.x,y:e.position.y+(e.crouched?1.1:1.62),z:e.position.z,r:.2,part:"head"},{x:e.position.x,y:e.position.y+(e.crouched?.7:1.1),z:e.position.z,r:.37,part:"body"},{x:e.position.x,y:e.position.y+.43,z:e.position.z,r:.3,part:"legs"}]:[{x:e.position.x,y:e.position.y+1.68,z:e.position.z,r:.22,part:"head"},{x:e.position.x,y:e.position.y+1.2,z:e.position.z,r:.36,part:"body"},{x:e.position.x,y:e.position.y+.72,z:e.position.z,r:.32,part:"legs"}];for(const R of L){const E=Rl(s,g,R,R.r);E!==null&&E<T&&(T=E,_=R.part)}const A=s.clone().addScaledVector(g,Math.min(T,v));this.addTracer(s,A,16758126);const C=this.player?s.distanceTo(this.player.position):0;if(ie.gunshot("rifle",C),t.character.muzzle(),this.makeNoise(t.position,t.team),_){const R=8.6*i.damageScale*(_==="head"?1.4:_==="legs"?.8:1);if(r){const E=e.takeDamage(R,t.position,this);this.ui.damage(new w().subVectors(t.position,e.position),R/20),E&&(this.registerKill(t,e,"rifle",_==="head"),this.ui.banner("YOU WERE ELIMINATED",1800))}else{const E=an(1-l/130,.65,1);e.takeDamage(R*E)&&this.registerKill(t,e,"rifle",_==="head")}}else this.spawnImpact(A,16761469,3);this.checkEndConditions()}makeNoise(t,e){for(const i of this.bots)i.alive&&Ui(i.position,t)<26&&i.hear(t,e)}alertTeam(t,e){if(this.mode==="ffa"||!e)return;const i=this.elapsed,s=t.team;if(!((this.alertCooldown.get(s)||0)>i)){this.alertCooldown.set(s,i+1.2);for(const r of this.bots)r===t||!r.alive||r.team!==t.team||Ui(r.position,t.position)<34&&r.receiveAlert(e.position,t.team)}}bindQaApi(){window.__TACTICAL__={game:this,start:t=>this.startMatch(t),leave:()=>this.leaveMatch(),state:()=>{var t;return{active:this.active,paused:this.paused,results:this.results,map:(t=this.mapDef)==null?void 0:t.id,mode:this.mode,timeLeft:this.timeLeft,scores:{...this.scores},player:this.player?{name:this.player.name,team:this.player.team,health:this.player.health,armor:this.player.armor,alive:this.player.alive,pos:{x:this.player.position.x,y:this.player.position.y,z:this.player.position.z},kills:this.player.stats.kills,deaths:this.player.stats.deaths,ammo:this.player.currentAmmo,weapon:this.player.weaponId}:null,bots:this.bots.map(e=>({name:e.name,team:e.team,alive:e.alive,state:e.state,health:e.health,kills:e.kills,deaths:e.deaths,pos:{x:e.position.x,y:e.position.y,z:e.position.z},target:e.target?e.target===this.player?"player":e.target.name:null,visible:e.targetVisible})),nav:this.mapRuntime?{nodes:this.mapRuntime.nav.nodes.length,components:this.mapRuntime.nav.componentCount}:null,scoreboard:this.getSortedParticipants()}},pause:()=>this.pause(),resume:()=>this.resume(),restart:()=>this.restartMatch(),damagePlayer:t=>{var e;return(e=this.player)==null?void 0:e.takeDamage(t,null,this)},teleport:(t,e,i=0)=>{this.player&&(this.player.position.set(t,i,e),this.player.velocity.set(0,0,0))},forceEnd:()=>this.endMatch("qa")}}}const Pl=document.querySelector("#game-canvas"),qr=document.querySelector("#boot-error");function M0(n){console.error(n),qr&&(qr.classList.remove("hidden"),qr.innerHTML=`<strong>THE GAME COULD NOT START</strong><span>${String((n==null?void 0:n.message)||n)}</span><small>Try a current desktop browser with WebGL2 enabled.</small>`)}try{if(!Pl)throw new Error("Game canvas was not found.");const n=new y0(Pl);window.game=n;const t=()=>{ie.init(),ie.startMusic(),ie.setVolumes()};window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("keydown",t,{once:!0}),window.addEventListener("error",e=>{e.error&&console.error("Runtime error:",e.error)}),window.addEventListener("unhandledrejection",e=>{console.error("Unhandled rejection:",e.reason)})}catch(n){M0(n)}
