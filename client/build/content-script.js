(function(){var e,t,n;(function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}})(),n("almond",function(){}),n("text",["module"],function(e){var n,r,i,s,o,u=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],a=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,f=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,l=typeof location!="undefined"&&location.href,c=l&&location.protocol&&location.protocol.replace(/\:/,""),h=l&&location.hostname,p=l&&(location.port||undefined),d={},v=e.config&&e.config()||{};n={version:"2.0.10",strip:function(e){if(e){e=e.replace(a,"");var t=e.match(f);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:v.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=u[t];try{e=new ActiveXObject(n)}catch(r){}if(e){u=[n];break}}return e},parseName:function(e){var t,n,r,i=!1,s=e.indexOf("."),o=e.indexOf("./")===0||e.indexOf("../")===0;return s!==-1&&(!o||s>1)?(t=e.substring(0,s),n=e.substring(s+1,e.length)):t=e,r=n||t,s=r.indexOf("!"),s!==-1&&(i=r.substring(s+1)==="strip",r=r.substring(0,s),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,t,r,i){var s,o,u,a=n.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===t)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,t,r,i){r=t?n.strip(r):r,v.isBuild&&(d[e]=r),i(r)},load:function(e,t,r,i){if(i.isBuild&&!i.inlineText){r();return}v.isBuild=i.isBuild;var s=n.parseName(e),o=s.moduleName+(s.ext?"."+s.ext:""),u=t.toUrl(o),a=v.useXhr||n.useXhr;if(u.indexOf("empty:")===0){r();return}!l||a(u,c,h,p)?n.get(u,function(t){n.finishLoad(e,s.strip,t,r)},function(e){r.error&&r.error(e)}):t([o],function(e){n.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,t,r,i){if(d.hasOwnProperty(t)){var s=n.jsEscape(d[t]);r.asModule(e+"!"+t,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,t,r,i,s){var o=n.parseName(t),u=o.ext?"."+o.ext:"",a=o.moduleName+u,f=r.toUrl(o.moduleName+u)+".js";n.load(a,r,function(t){var r=function(e){return i(f,e)};r.asModule=function(e,t){return i.asModule(e,f,t)},n.write(e,a,r,s)},s)}};if(v.env==="node"||!v.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node&&!process.versions["node-webkit"])r=t.nodeRequire("fs"),n.get=function(e,t,n){try{var i=r.readFileSync(e,"utf8");i.indexOf("﻿")===0&&(i=i.substring(1)),t(i)}catch(s){n(s)}};else if(v.env==="xhr"||!v.env&&n.createXhr())n.get=function(e,t,r,i){var s=n.createXhr(),o;s.open("GET",e,!0);if(i)for(o in i)i.hasOwnProperty(o)&&s.setRequestHeader(o.toLowerCase(),i[o]);v.onXhr&&v.onXhr(s,e),s.onreadystatechange=function(n){var i,o;s.readyState===4&&(i=s.status,i>399&&i<600?(o=new Error(e+" HTTP status: "+i),o.xhr=s,r(o)):t(s.responseText),v.onXhrComplete&&v.onXhrComplete(s,e))},s.send(null)};else if(v.env==="rhino"||!v.env&&typeof Packages!="undefined"&&typeof java!="undefined")n.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),r!==null&&n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};else if(v.env==="xpconnect"||!v.env&&typeof Components!="undefined"&&Components.classes&&Components.interfaces)i=Components.classes,s=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),o="@mozilla.org/windows-registry-key;1"in i,n.get=function(e,t){var n,r,u,a={};o&&(e=e.replace(/\//g,"\\")),u=new FileUtils.File(e);try{n=i["@mozilla.org/network/file-input-stream;1"].createInstance(s.nsIFileInputStream),n.init(u,1,0,!1),r=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(s.nsIConverterInputStream),r.init(n,"utf-8",n.available(),s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(n.available(),a),r.close(),n.close(),t(a.value)}catch(f){throw new Error((u&&u.path||"")+": "+f)}};return n}),n("text!../styles/styles.css",[],function(){return'.panel-view{position:relative;width:100%;height:100%}.panel-view .ink-view{position:absolute;width:100%;height:100%}.panel-view .locale-btn{position:absolute;color:#686868;font:bold 12px sans-serif;text-align:center;width:88px;height:22px;line-height:22px;top:8px;left:8px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAWBAMAAAC26UYbAAAAIVBMVEXl5eXMzMzl5eXm5ubr6+vm5ub////////+/v7l5eX5+fnzqFNpAAAAB3RSTlN/Bf3f9dAA4y2SLgAAAFJJREFUeF7tkyEWgCAUBPc9uAKeAZvZRKZ5BE/xtVLoFB5ZD8oVdrNOnjiD062Dom0LQq5Gcb0HvNEk7Lz8IPJyQefl+1PyL0shSYlK8UtbScNOpwLIApcKt6gAAAAASUVORK5CYII=")}.panel-view .locale-btn:active,.panel-view .locale-btn.pressed{color:#fff;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAWBAMAAAC26UYbAAAAIVBMVEXj4+PMzMzl5eXh4eHY2Njj4+P///+ysrKzs7Pl5eW9vb30Jj5dAAAAB3RSTlN/Bf3f9dAA4y2SLgAAAFJJREFUeF7tkyEWgCAUBPc9uAKeAZvZRKZ5BE/xtVLoFB5ZD8oVdrNOnjiD062Dom0LQq5Gcb0HvNEk7Lz8IPJyQefl+1PyL0shSYlK8UtbScNOpwLIApcKt6gAAAAASUVORK5CYII=")}.panel-view .clear-btn{position:absolute;width:44px;height:44px;top:8px;right:8px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAilBMVEXMzMzr6+vl5eXl5eXm5ubm5ub///9oaGj+/v5xcXH5+fltbW3////MzMyrq6vl5eWEhIT29vbj4+Oqqqrr6+vb29t0dHSHh4eampp6enrOzs7h4eGDg4NpaWnm5ubk5OTn5+eSkpJ8fHyNjY1/f3/T09OJiYmBgYHz8/OmpqaMjIx7e3vW1tZ4eHhNTe9HAAAAB3RSTlMF9f1/39AAxhbeYQAAANRJREFUeF7t1ceOwyAQgGGKnaG5d6fX7e//ersrRRwMDiaJcvIvzQV9FzgwaIFoQBJnJKB/FIVYMOWMCRwiRLGaGKYoEFOxCBBhUzEjKFGTSx7D1T699lmN4zLPl30UfYHuJ4r6ZZ7vmIELGO3DwIdxfDLw+SIBJB/0f3b8tlxwDbXx5qyGtfU1ADpl1AHcwu+ZHjd+W+lxY871vAjPeMZxoceBjZ6CJchNNmgjQVpxC9ZaK95ym+VbK1Zl3KSDmrj0+nLvxV5rwmsBea02r6XptY5/ActDW4v0yvFcAAAAAElFTkSuQmCC")}.panel-view .clear-btn:active,.panel-view .clear-btn.pressed{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAh1BMVEXY2Njl5eXh4eHj4+PMzMz////j4+P///+0tLT7+/vBwcH8/Py+vr6zs7PNzc3l5eXd3d3x8fG9vb3CwsLw8PD9/f3e3t729vbAwMDLy8v5+fn19fXm5ua5ubn6+vrFxcW/v7/q6urz8/PJycnv7++4uLi3t7fg4ODt7e3y8vLs7OzIyMj39/eT6oZQAAAAB3RSTlP1/d9/BQDQcs+9nAAAANVJREFUeF7t1bduwzAUhlFSxZddvbj3kvL+z+cEMDiIlElGGfUB/yKcRRp0UZrEEc6c4ShOUpQskCDSGRFokaAYSc9+aCR8sYgQJr6YYJRJ77JpeH8sXj3247hkrFoqtQbdt1LLirEDMXALo90NvB7HJwOfLxyA00G/zz6/LC8IsDK+OVkBSGnFnTTq3uPtVc+NPwo9N6ZU7+94xjPe7fTcOG/1HNjoX3ADvL8N6jk0VrwBaxsrZtRmKbNiWeZ1MajOywm/XH8cdCaCDlDQaQs6mkHn+AkgAGHQCAJO1wAAAABJRU5ErkJggg==")}.panel-view .delete-btn{position:absolute;width:44px;height:44px;top:8px;right:58px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAqFBMVEXl5eXMzMzr6+vm5ubl5eX////m5uZoaGjU1NT5+fn////+/v5paWlsbGzl5eXs7Ozx8fHGxsb09PSXl5f4+Ph6enqFhYWLi4vHx8f8/Px1dXWIiIiGhoaKioqhoaHDw8P39/d2dnbQ0NDKysr19fXExMTBwcHa2tr29vampqZ4eHi/v79wcHBra2uNjY2Ojo79/f3W1ta+vr7y8vJqamrp6em9vb3z8/OE8EXSAAAAB3RSTlP9BfXffwDQJ52rqQAAAO1JREFUeF7t1UduxDAMBVBK8gxVXMv0nt57uf/NwgBGghgyJCLb+Quv3kK0KHwYiURBHgyoRIxAjKVxNhhn5FhAIm1kZALKxGKjAFwsdgC5jU4+jI94Ufrz6sGnSxzI9KmP5ykO5rmHK7J3B18yxJO/+Jzs+sz60vTxjuzqqluZa02kaOoBfEF2s+/sFjNtiwlOay++RcRZZ205Qcyq78+lD7+QfWh/Ri0IpmS19eDyDfGR7K++QcR7sh78njKw/QgcIzTgvBuQ9ev4l8K9btYicVZUM5Z/1sY/q89/PtgjZtUEq4BY1cYqTVYdfwGDyVg1EALvfgAAAABJRU5ErkJggg==")}.panel-view .delete-btn:active,.panel-view .delete-btn.pressed{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAilBMVEXj4+Ph4eHMzMzl5eXY2Njj4+P///+ysrL///+zs7O9vb3IyMj9/f329vbl5eW5ubm8vLz4+Pi3t7fPz8/n5+ft7e22trb+/v7w8PDT09PQ0NDv7+/g4OC1tbX7+/vOzs7u7u60tLTi4uLNzc3S0tLR0dHFxcXs7Ozr6+vKysr39/fHx8fU1NS4uLh0vMSmAAAAB3RSTlN/3wX99dAAIvfRTgAAAN5JREFUeF7t1cmOhSAQBdAC1CpwHN489zz//+81JLhoA5FKb99duDoBlSIXCglCNYtRAmQBMs+MxsVok+USIMPEZADCpGIjQOlUrBU0mJwmju/4oY0kgJ96imSn5/i6pWi+Zni09tKHUhF9/MUHt9uAoazm+MXao7f6VFrSrYYIfrb2tvH2kaoSu9puFMR7a9feYlsTVaN7vIaws2+TRbeojVs+gNst0fvZsUl/ehvAhoPxO/YarA9k/jr+oXCPmzVInBEtGcO/3qRfq59/Xtg7ZtUEq4BY1cYqTVYd/wLDrUVFgqoxOgAAAABJRU5ErkJggg==")}.panel-view .space-btn{position:absolute;width:44px;height:44px;top:8px;right:108px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAYFBMVEXMzMzr6+vl5eXl5eXm5ub////m5uZoaGj5+fn+/v7////l5eWcnJzLy8t3d3empqbY2NiXl5d2dnbx8fGlpaX7+/uoqKjq6uqPj4+ioqLT09PV1dWgoKCTk5Pp6en8/PxL9Sy1AAAAB3RSTlMF9f1/3wDQwf3JqgAAAIhJREFUeF7t1UcOwzAMRNFRsUkVt/Se+98ye4WBRSCLINBfv+UAgw7O27Sa9Q4d0BsOcbXApgeciZUZB8+1mD1sqMXBIsXq0p/ihhve7+6PEhxPk4wvRIcSn4lmEQ9EucSZaPgKXrZFy2csJuNZxlcRx9u4eWucnj+9jYZVN6E6INW1qU5TdccvVkFMH/BR850AAAAASUVORK5CYII=")}.panel-view .space-btn:active,.panel-view .space-btn.pressed{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAVFBMVEXY2Njl5eXMzMzj4+Ph4eH////j4+P///+9vb3l5eWzs7OysrL39/fNzc3f39+0tLTn5+fGxsbe3t65ubnr6+v4+Pjh4eHJycnHx8fi4uLg4ODp6elLkVEiAAAAB3RSTlP1/QV/3wDQMZRqggAAAIdJREFUeF7t1UcOwzAMRNFRsUlKcksv979n9goDi0AWQaC/fssBBoMP0cluLgY/wI/glHdLjNEjIDeGgMitmCNcasXJQXJz8qe4446Xx5NrwKdZx1eiQ40vRJuKJyKpsRBNX8HrsWr9jNV0vOn4puJ8L+e3yrz89DY6Nt2E6YBM12Y6TdMdvwBuSFE6zF/ZOgAAAABJRU5ErkJggg==")}.panel-view a{position:absolute;bottom:8px;right:8px;font:14px sans-serif;text-decoration:none}.panel-view a:link,.panel-view a:visited{color:#686868}.panel-view a:hover{color:#888}.panel-view a:active{color:#484848}'}),t(["text!../styles/styles.css"],function(e){var t=document.createElement("style");t.textContent=e,document.head.appendChild(t)}),n("styles",function(){}),n("text!../templates/panel.html",[],function(){return'<div class="panel-view">\n  <canvas class="ink-view"></canvas>\n  <div class="locale-btn"></div>\n  <div class="clear-btn"></div>\n  <div class="delete-btn"></div>\n  <div class="space-btn"></div>\n  <a href="https://dev.myscript.com/">MyScript</a>\n</div>\n'}),n("Stroker",[],function(){var e=function(e){e=e||{};var t={inkWidth:4,inkColor:"#33b5e5",shadow:!1,shadowColor:"#000000",shadowDx:1,shadowDy:1,minDistance:1,maxDistance:100};for(var n in t)e[n]=n in e?e[n]:t[n];this.options=e};return e.prototype={filter:function(e,t){var n=e-this.lastX,r=t-this.lastY,i=n*n+r*r,s=this.options.minDistance*this.options.minDistance,o=this.options.maxDistance*this.options.maxDistance;return i<s||i>o},begin:function(e,t,n){this.lastX=this.lastMidX=t,this.lastY=this.lastMidY=n},add:function(e,t,n){if(this.filter(t,n))return!1;var r=this.options.shadowDx,i=this.options.shadowDy,s=(this.lastX+t)/2,o=(this.lastY+n)/2;return this.options.shadow&&(e.lineWidth=this.options.inkWidth,e.lineJoin="round",e.lineCap="butt",e.beginPath(),e.moveTo(this.lastMidX+r,this.lastMidY+i),e.quadraticCurveTo(this.lastX+r,this.lastY+i,s+r,o+i),e.strokeStyle=this.options.shadowColor,e.stroke()),e.lineWidth=this.options.inkWidth,e.lineJoin="round",e.lineCap="round",e.beginPath(),e.moveTo(this.lastMidX,this.lastMidY),e.quadraticCurveTo(this.lastX,this.lastY,s,o),e.strokeStyle=this.options.inkColor,e.stroke(),this.lastX=t,this.lastY=n,this.lastMidX=s,this.lastMidY=o,!0},end:function(e,t){var n=this.options.shadowDx,r=this.options.shadowDy;t===1?(this.options.shadow&&(e.beginPath(),e.arc(this.lastX+n,this.lastY+r,this.options.inkWidth/2,0,2*Math.PI),e.fillStyle=this.options.shadowColor,e.fill()),e.beginPath(),e.arc(this.lastX,this.lastY,this.options.inkWidth/2,0,2*Math.PI),e.fillStyle=this.options.inkColor,e.fill()):(this.options.shadow&&(e.lineWidth=this.options.inkWidth,e.lineJoin="round",e.lineCap="butt",e.beginPath(),e.moveTo(this.lastMidX+n,this.lastMidY+r),e.lineTo(this.lastX+n,this.lastY+r),e.strokeStyle=this.options.shadowColor,e.stroke()),e.lineWidth=this.options.inkWidth,e.lineJoin="round",e.lineCap="round",e.beginPath(),e.moveTo(this.lastMidX,this.lastMidY),e.lineTo(this.lastX,this.lastY),e.strokeStyle=this.options.inkColor,e.stroke())}},e}),n("InkView",["Stroker"],function(e){var t=function(t,n){var r=this;this.stroker=new e(n),this.el=t,this.el.width=this.el.clientWidth,this.el.height=this.el.clientHeight,this.ctx=this.el.getContext("2d");var i=function(e,t){e.addEventListener(t,function(e){r[t](e)})};i(t,"mousedown"),i(t,"mousemove"),i(window,"mouseup"),i(t,"touchstart"),i(t,"touchmove"),i(window,"touchend")};return t.prototype={mousedown:function(e){if(!this.drawing){e.preventDefault(),this.drawing=!0;var t=e.clientX+window.pageXOffset,n=e.clientY+window.pageYOffset;this.pendown(t,n)}},mousemove:function(e){if(this.drawing){e.preventDefault();var t=e.clientX+window.pageXOffset,n=e.clientY+window.pageYOffset;this.penmove(t,n)}},mouseup:function(e){this.drawing&&(e.preventDefault(),this.drawing=!1,this.penup())},touchstart:function(e){if(!this.drawing){e.preventDefault();var t=e.changedTouches[0];this.drawing=!0,this.touchId=t.identifier;var n=t.pageX,r=t.pageY;this.pendown(n,r)}},touchmove:function(e){if(this.drawing){e.preventDefault();var t=e.changedTouches;for(var n=0;n<t.length;n++)if(t[n].identifier===this.touchId){var r=t[n].pageX,i=t[n].pageY;this.penmove(r,i);break}}},touchend:function(e){if(this.drawing){e.preventDefault();var t=e.changedTouches;for(var n=0;n<t.length;n++)if(t[n].identifier===this.touchId){this.drawing=!1,this.penup();break}}},pendown:function(e,t){(this.el.width===0||this.el.height===0)&&this.resize();var n=this.el.getBoundingClientRect();this.offsetLeft=n.left+window.pageXOffset,this.offsetTop=n.top+window.pageYOffset,e-=this.offsetLeft,t-=this.offsetTop,this.stroker.begin(this.ctx,e,t),this.stroke={x:[e],y:[t],options:this.stroker.options},this.ondrawbegin&&this.ondrawbegin.call(this)},penmove:function(e,t){e-=this.offsetLeft,t-=this.offsetTop,this.stroker.add(this.ctx,e,t)&&(this.stroke.x.push(e),this.stroke.y.push(t))},penup:function(){this.stroker.end(this.ctx,this.stroke.x.length),this.ondrawend&&this.ondrawend.call(this)},clear:function(){this.ctx.clearRect(0,0,this.el.width,this.el.height)},resize:function(){this.el.width=this.el.clientWidth,this.el.height=this.el.clientHeight,this.ctx=this.el.getContext("2d")}},t}),n("ButtonView",[],function(){var e=function(e){var t=this;this.el=e,this.className={normal:e.className,pressed:e.className+" pressed"},this.repeatDelay=600,this.repeatRate=100,this.repeatCount=0;var n=function(n){e.addEventListener(n,function(e){t[n](e)})};n("click"),n("touchstart"),n("touchmove"),n("touchend")};return e.prototype={setText:function(e){this.el.textContent=e},setPressed:function(e){this.el.className=this.className[e?"pressed":"normal"]},hitTest:function(e){var t=e.changedTouches[0],n=t.pageX-window.pageXOffset,r=t.pageY-window.pageYOffset,i=this.el.getBoundingClientRect();return i.left<n&&n<i.right&&i.top<r&&r<i.bottom},click:function(e){e.preventDefault(),this.onclick&&this.onclick.call(this)},touchstart:function(e){e.preventDefault(),this.setPressed(!0)},touchmove:function(e){e.preventDefault(),this.setPressed(this.hitTest(e))},touchend:function(e){e.preventDefault(),this.setPressed(!1),this.hitTest(e)&&this.onclick&&this.onclick.call(this)}},e}),n("Model",[],function(){var e=function(){this.strokes=[]};return e.prototype={add:function(e){this.strokes.push(e),this.onchange&&this.onchange.call(this)},clear:function(){this.strokes=[],this.onclear&&this.onclear.call(this)},isEmpty:function(){return this.strokes.length===0},toJSON:function(){var e=[];for(var t=0;t<this.strokes.length;t++){var n=this.strokes[t];e.push({type:"stroke",x:n.x,y:n.y})}return e}},e}),n("Recognizer",[],function(){var e=function(e){var t=this;this.instanceId=null,this.timeoutId=null,this.apiKey=e,this.url="https://cloud.myscript.com/api/myscript/v2.0/hwr/doSimpleRecognition.json",this.xhr=new XMLHttpRequest,this.xhr.onreadystatechange=function(){t.onreadystatechange()}};return e.prototype={run:function(e,t){this.isThrottling()||this.isBusy()?this.queueRequest(e,t):this.sendRequest(e,t)},clear:function(){this.cancelRequest(),this.instanceId=null},isBusy:function(){return this.xhr.readyState!==0&&this.xhr.readyState!==4},triggerThrottleTimer:function(){var e=this;this.timeoutId=window.setTimeout(function(){e.timeoutId=null,e.ontimeout()},100)},cancelThrottleTimer:function(){window.clearTimeout(this.timeoutId),this.timeoutId=null},isThrottling:function(){return this.timeoutId!==null},sendRequest:function(e,t){var n={hwrParameter:{language:e,hwrInputMode:"CURSIVE",hwrProperties:{},resultDetail:"TEXT",contentTypes:["text"]},inputUnits:[{hwrInputType:"MULTI_LINE_TEXT",components:t}]},r=["apiKey="+encodeURIComponent(this.apiKey),"hwrInput="+encodeURIComponent(JSON.stringify(n))],i=r.join("&");this.xhr.open("POST",this.url,!0),this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),this.xhr.send(i)},queueRequest:function(e,t){this.pendingRequest=function(){this.sendRequest(e,t)}},cancelRequest:function(){this.pendingRequest=null,this.xhr.abort()},ontimeout:function(){this.pendingRequest&&(this.pendingRequest(),this.pendingRequest=null)},onreadystatechange:function(){this.xhr.readyState===4&&(this.xhr.status===200?this.onsuccess():this.onfailure(),this.triggerThrottleTimer())},onsuccess:function(){var e=JSON.parse(this.xhr.responseText);this.instanceId=e.instanceId;var t,n=e.result.textSegmentResult.candidates;n&&n.length?t=n[0].label:t="",this.onresult&&this.onresult.call(this,t)},onfailure:function(){this.onfail&&this.onfail.call(this,this.xhr.statusText)}},e}),n("PanelView",["InkView","ButtonView","Model","Recognizer"],function(e,t,n,r){var i=function(i,s,o){var u=this;o=o||{};var a={locales:["en_US"]};for(var f in a)o[f]=f in o?o[f]:a[f];this.el=i,this.target=s,this.recognizer=new r(o.apiKey),this.recognizer.onresult=function(e){u.onrecoresult(e)},this.recognizer.onfail=function(e){u.onrecofail(e)},this.model=new n,this.model.onchange=function(){u.onmodelchange()},this.model.onclear=function(){u.onmodelclear()},this.inkView=new e(i.querySelector(".ink-view"),o),this.inkView.ondrawbegin=function(){u.ondrawbegin()},this.inkView.ondrawend=function(){u.ondrawend()},this.localeButtonView=new t(i.querySelector(".locale-btn")),this.clearButtonView=new t(i.querySelector(".clear-btn")),this.deleteButtonView=new t(i.querySelector(".delete-btn")),this.spaceButtonView=new t(i.querySelector(".space-btn")),this.localeButtonView.onclick=function(){u.onlocaleclick()},this.clearButtonView.onclick=function(){u.onclearclick()},this.deleteButtonView.onclick=function(){u.ondeleteclick()},this.spaceButtonView.onclick=function(){u.onspaceclick()},this.setAvailableLocales(o.locales),this.setLocale(o.locales[0])};return i.prototype={setLocale:function(e){this.isLocaleAvailable(e)||this.setAvailableLocales([e]),this.locale=e;var t={en_US:"English",es_ES:"Español",fr_FR:"Français",it_IT:"Italiano",ko_KR:"한국의"};this.localeButtonView.setText(t[e]||e),this.onlocalechange&&this.onlocalechange.call(this)},setAvailableLocales:function(e){this.availableLocales=e},isLocaleAvailable:function(e){return this.availableLocales&&this.availableLocales.indexOf(e)>=0},triggerCommitTimer:function(){var e=this;this.timeoutId=window.setTimeout(function(){e.timeoutId=null,e.ontimeout()},2e3)},cancelCommitTimer:function(){window.clearTimeout(this.timeoutId),this.timeoutId=null},shouldCommit:function(){return!this.timeoutId&&!this.inkView.drawing&&!this.recognizer.isBusy()},refreshText:function(){this.text=this.target.value},setText:function(e){this.text=e,this.target.value=e,this.notifyTextChange()},setComposingText:function(e){this.target.value=this.text+e,this.notifyTextChange()},commitComposingText:function(){this.model.clear(),this.inkView.clear(),this.text=this.target.value,this.notifyTextCommit()},notifyTextChange:function(){this.ontextchange&&this.ontextchange.call(this)},notifyTextCommit:function(){this.ontextcommit&&this.ontextcommit.call(this)},ontimeout:function(){this.shouldCommit()&&this.commitComposingText()},onrecoresult:function(e){this.setComposingText(e.replace("\n"," ")),this.shouldCommit()&&this.commitComposingText()},onrecofail:function(e){console.log("Handwriting recognition failure ("+e+")")},onmodelchange:function(){this.recognizer.run(this.locale,this.model.toJSON())},onmodelclear:function(){this.recognizer.clear()},ondrawbegin:function(){this.cancelCommitTimer(),this.model.isEmpty()&&this.refreshText()},ondrawend:function(){this.triggerCommitTimer(),this.model.add(this.inkView.stroke)},onlocaleclick:function(){if(this.availableLocales){var e=this.availableLocales.indexOf(this.locale)+1;this.setLocale(this.availableLocales[e%this.availableLocales.length])}},onclearclick:function(){this.cancelCommitTimer(),this.commitComposingText(),this.setText("")},ondeleteclick:function(){this.cancelCommitTimer(),this.commitComposingText(),this.setText(this.text.slice(0,-1))},onspaceclick:function(){this.cancelCommitTimer(),this.commitComposingText(),this.setText(this.text+" ")}},i}),t(["text!../templates/panel.html","PanelView"],function(e,t){function r(e){var t={};return e.hasAttribute(n.apiKey)&&(t.apiKey=e.getAttribute(n.apiKey)),e.hasAttribute(n.locales)&&(t.locales=e.getAttribute(n.locales).trim().split(/\s+/)),e.hasAttribute(n.inkWidth)&&(t.inkWidth=parseInt(e.getAttribute(n.inkWidth),10)),e.hasAttribute(n.inkColor)&&(t.inkColor=e.getAttribute(n.inkColor)),e.hasAttribute(n.shadow)&&(t.shadow=e.getAttribute(n.shadow)==="true"),e.hasAttribute(n.shadowColor)&&(t.shadowColor=e.getAttribute(n.shadowColor)),e.hasAttribute(n.shadowDx)&&(t.shadowDx=parseInt(e.getAttribute(n.shadowDx),10)),e.hasAttribute(n.shadowDy)&&(t.shadowDy=parseInt(e.getAttribute(n.shadowDy),10)),t}function i(e){var t=document.getElementsByTagName("input");for(var r=0;r<t.length;r++)if(t[r].hasAttribute(n.id)&&t[r].getAttribute(n.id)===e)return t[r]}function s(){var s=document.getElementsByTagName("div");for(var o=0;o<s.length;o++)if(s[o].hasAttribute(n.id)){var u=i(s[o].getAttribute(n.id));if(u){s[o].innerHTML=e;var a=r(s[o]);new t(s[o],u,a)}}}var n={id:"hwr-id",apiKey:"hwr-apikey",locales:"hwr-locales",inkWidth:"hwr-inkwidth",inkColor:"hwr-inkcolor",shadow:"hwr-shadow",shadowColor:"hwr-shadowcolor",shadowDx:"hwr-shadowdx",shadowDy:"hwr-shadowdy"};document.readyState==="complete"?s():window.addEventListener("load",s)}),n("main",function(){}),t(["styles","main"]),n("build",function(){})})();