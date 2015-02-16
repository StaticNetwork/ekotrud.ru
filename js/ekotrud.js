/* prefixfree */
(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute("data-href",t.getAttribute("href"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open("GET",r);f.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open("GET",r);f.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);

/* http://modernizr.com/download/#-cssclasses-load */
;window.Modernizr=function(a,b,c){function u(a){j.cssText=a}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m={},n={},o={},p=[],q=p.slice,r,s={}.hasOwnProperty,t;!w(s,"undefined")&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e});for(var z in m)t(m,z)&&(r=z.toLowerCase(),e[r]=m[z](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)t(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},u(""),i=k=null,e._version=d,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+p.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

(function(){
  var jquery_ver = '2.0.2'; if(document.documentElement.className.match('lt-ie9')) { jquery_ver = '1.10.1'; }
  yepnope({
    load: ['//yandex.st/jquery/'+jquery_ver+'/jquery.min.js','//yandex.st/jquery/fancybox/2.1.4/jquery.fancybox.min.js'],
    callback: function(url,result,key){
      if(!window.jQuery) {
        yepnope('//ajax.googleapis.com/ajax/libs/jquery/'+jquery_ver+'/jquery.min.js');
      }
    },
    complete: function(){

      (function($, self){
        if(!$ || !self) return;
        for(var i=0; i<self.properties.length; i++) {
        var property = self.properties[i],
          camelCased = StyleFix.camelCase(property),
          PrefixCamelCased = self.prefixProperty(property, true);
        $.cssProps[camelCased] = PrefixCamelCased; }
      })(window.jQuery,window.PrefixFree);

      var license = $('#license a');
      if(license.length) {
        license.fancybox({
          padding: 0,
          margin: 10,
          arrows: true,
          nextClick: false,
          openEffect: 'none',
          closeEffect: 'none',
          nextEffect: 'none',
          prevEffect: 'none'
        });
      }

      var tools = $('#tools');
      if(tools.length) {

/* browser */
(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);

/* easing */
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

/* animate-css-rotate-scale */
(function(c){function e(a){var b=a.data("_ARS_data");b||(b={rotateUnits:"deg",scale:1,rotate:0},a.data("_ARS_data",b));return b}function f(a,b){a.css("transform","rotate("+b.rotate+b.rotateUnits+") scale("+b.scale+","+b.scale+")")}c.fn.rotate=function(a){var b=c(this),d=e(b);if("undefined"==typeof a)return d.rotate+d.rotateUnits;if(a=a.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/))a[3]&&(d.rotateUnits=a[3]),d.rotate=a[1],f(b,d);return this};c.fn.scale=function(a){var b=c(this),d=e(b);if("undefined"==
typeof a)return d.scale;d.scale=a;f(b,d);return this};var g=c.fx.prototype.cur;c.fx.prototype.cur=function(){return"rotate"==this.prop?parseFloat(c(this.elem).rotate()):"scale"==this.prop?parseFloat(c(this.elem).scale()):g.apply(this,arguments)};c.fx.step.rotate=function(a){var b=e(c(a.elem));c(a.elem).rotate(a.now+b.rotateUnits)};c.fx.step.scale=function(a){c(a.elem).scale(a.now)};var h=c.fn.animate;c.fn.animate=function(a){if("undefined"!=typeof a.rotate){var b,d=a.rotate.toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
d&&d[5]&&(b=c(this),b=e(b),b.rotateUnits=d[5]);a.rotate=d[1]}return h.apply(this,arguments)}})(jQuery);

/* quicksand */
(function(b){b.fn.quicksand=function(w,j,n){var a={duration:750,easing:"swing",attribute:"data-id",adjustHeight:"auto",adjustWidth:"auto",useScaling:!1,enhancement:function(){},selector:"> *",atomic:!1,dx:0,dy:0,maxWidth:0,retainExisting:!0};b.extend(a,j);if(b.browser.msie||"undefined"==typeof b.fn.scale)a.useScaling=!1;var q;"function"==typeof j?q=j:typeof("function"==n)&&(q=n);return this.each(function(f){var p,g=[],l;l="function"==typeof a.attribute?b(w):b(w).filter("["+a.attribute+"]").clone();
var c=b(this);f=b(this).css("height");var j=b(this).css("width"),r,n=!1,x=!1,k=b(c).offset(),s=[],m=b(this).find(a.selector),y=b(m).innerWidth();if(b.browser.msie&&7>parseInt(b.browser.version,10))c.html("").append(l);else{var z=0,t=function(){b(this).css("margin","").css("position","").css("top","").css("left","").css("opacity","");if(!z){z=1;if(!a.atomic){var d=c.find(a.selector);if(a.retainExisting){var e=b([]);h.find(a.selector).each(function(f){var g=b([]);if("function"==typeof a.attribute){var h=
a.attribute(b(this));d.each(function(){if(a.attribute(this)==h)return g=b(this),!1})}else g=d.filter("["+a.attribute+'="'+b(this).attr(a.attribute)+'"]');0<g.length&&(e=e.add(g),0===f?c.prepend(g):g.insertAfter(c.find(a.selector).get(f-1)))});d.not(e).remove()}else c.prepend(h.find(a.selector)),d.remove();n&&c.css("height",r);x&&c.css("width",j)}a.enhancement(c);"function"==typeof q&&q.call(this)}!1===a.adjustHeight&&c.css("height","auto");!1===a.adjustWidth&&c.css("width","auto")},e=c.offsetParent(),
d=e.offset();"relative"==e.css("position")?"body"!=e.get(0).nodeName.toLowerCase()&&(d.top+=parseFloat(e.css("border-top-width"))||0,d.left+=parseFloat(e.css("border-left-width"))||0):(d.top-=parseFloat(e.css("border-top-width"))||0,d.left-=parseFloat(e.css("border-left-width"))||0,d.top-=parseFloat(e.css("margin-top"))||0,d.left-=parseFloat(e.css("margin-left"))||0);isNaN(d.left)&&(d.left=0);isNaN(d.top)&&(d.top=0);d.left-=a.dx;d.top-=a.dy;c.css("height",b(this).height());c.css("width",b(this).width());
m.each(function(a){s[a]=b(this).offset()});b(this).stop();var u=0,v=0;m.each(function(e){b(this).stop();var c=b(this).get(0);"absolute"==c.style.position?(u=-a.dx,v=-a.dy):(u=a.dx,v=a.dy);c.style.position="absolute";c.style.margin="0";a.adjustWidth||(c.style.width=y+"px");c.style.top=s[e].top-parseFloat(c.style.marginTop)-d.top+v+"px";c.style.left=s[e].left-parseFloat(c.style.marginLeft)-d.left+u+"px";0<a.maxWidth&&s[e].left>a.maxWidth&&(c.style.display="none")});var h=b(c).clone(),e=h.get(0);e.innerHTML=
"";e.setAttribute("id","");e.style.height="auto";e.style.width=c.width()+"px";h.append(l);h.insertBefore(c);h.css("opacity",0);e.style.zIndex=-1;e.style.margin="0";e.style.position="absolute";e.style.top=k.top-d.top+"px";e.style.left=k.left-d.left+"px";"dynamic"===a.adjustHeight?c.animate({height:h.height()},a.duration,a.easing):"auto"===a.adjustHeight&&(r=h.height(),parseFloat(f)<parseFloat(r)?c.css("height",r):n=!0);"dynamic"===a.adjustWidth?c.animate({width:h.width()},a.duration,a.easing):"auto"===
a.adjustWidth&&(f=h.width(),parseFloat(j)<parseFloat(f)?c.css("width",f):x=!0);m.each(function(){var c=[];"function"==typeof a.attribute?(p=a.attribute(b(this)),l.each(function(){if(a.attribute(this)==p)return c=b(this),!1})):c=l.filter("["+a.attribute+'="'+b(this).attr(a.attribute)+'"]');c.length?a.useScaling?g.push({element:b(this),dest:c,style:{top:b(this).offset().top,left:b(this).offset().left,opacity:""},animation:{top:c.offset().top-d.top,left:c.offset().left-d.left,opacity:1,scale:"1.0"}}):
g.push({element:b(this),dest:c,style:{top:b(this).offset().top,left:b(this).offset().left,opacity:""},animation:{top:c.offset().top-d.top,left:c.offset().left-d.left,opacity:1}}):a.useScaling?g.push({element:b(this),animation:{opacity:"0.0",style:{top:b(this).offset().top,left:b(this).offset().left,opacity:""},scale:"0.0"}}):g.push({element:b(this),style:{top:b(this).offset().top,left:b(this).offset().left,opacity:""},animation:{opacity:"0.0"}})});l.each(function(){var e=[],f=[];"function"==typeof a.attribute?
(p=a.attribute(b(this)),m.each(function(){if(a.attribute(this)==p)return e=b(this),!1}),l.each(function(){if(a.attribute(this)==p)return f=b(this),!1})):(e=m.filter("["+a.attribute+'="'+b(this).attr(a.attribute)+'"]'),f=l.filter("["+a.attribute+'="'+b(this).attr(a.attribute)+'"]'));var h;if(0===e.length&&0<f.length){h=a.useScaling?{opacity:"1.0",scale:"1.0"}:{opacity:"1.0"};var j=f.clone(),k=j.get(0);k.style.position="absolute";k.style.margin="0";a.adjustWidth||(k.style.width=y+"px");k.style.top=
f.offset().top-d.top+"px";k.style.left=f.offset().left-d.left+"px";j.css("opacity",0);a.useScaling&&j.css("transform","scale(0.0)");j.appendTo(c);(0===a.maxWidth||f.offset().left<a.maxWidth)&&g.push({element:b(j),dest:f,animation:h})}});h.remove();if(a.atomic){$toDelete=c.find(a.selector);c.prepend(h.find(a.selector));for(f=0;f<g.length;f++)g[f].dest&&g[f].style?(k=g[f].dest,e=k.offset(),k.css({position:"relative",top:g[f].style.top-e.top,left:g[f].style.left-e.left}),k.animate({top:"0",left:"0"},
a.duration,a.easing,t)):g[f].element.animate(g[f].animation,a.duration,a.easing,t);$toDelete.remove()}else{a.enhancement(c);for(f=0;f<g.length;f++)g[f].element.animate(g[f].animation,a.duration,a.easing,t)}}})}})(jQuery);

/* tipsy */
(function(b){function j(a,c){this.$element=b(a);this.options=c;this.enabled=!0;this.fixTitle()}j.prototype={show:function(){var a=this.getTitle();if(a&&this.enabled){var c=this.tip();c.find(".tipsy-inner")[this.options.html?"html":"text"](a);c[0].className="tipsy";c.remove().css({top:0,left:0,visibility:"hidden",display:"block"}).prependTo(document.body);var a=b.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight}),d=c[0].offsetWidth,f=c[0].offsetHeight,
e="function"==typeof this.options.gravity?this.options.gravity.call(this.$element[0]):this.options.gravity,g;switch(e.charAt(0)){case "n":g={top:a.top+a.height+this.options.offset,left:a.left+a.width/2-d/2};break;case "s":g={top:a.top-f-this.options.offset,left:a.left+a.width/2-d/2};break;case "e":g={top:a.top+a.height/2-f/2,left:a.left-d-this.options.offset};break;case "w":g={top:a.top+a.height/2-f/2,left:a.left+a.width+this.options.offset}}2==e.length&&(g.left="w"==e.charAt(1)?a.left+a.width/2-
15:a.left+a.width/2-d+15);c.css(g).addClass("tipsy-"+e);c.find(".tipsy-arrow")[0].className="tipsy-arrow tipsy-arrow-"+e.charAt(0);this.options.className&&c.addClass("function"==typeof this.options.className?this.options.className.call(this.$element[0]):this.options.className);this.options.fade?c.stop().css({opacity:0,display:"block",visibility:"visible"}).animate({opacity:this.options.opacity}):c.css({visibility:"visible",opacity:this.options.opacity})}},hide:function(){this.options.fade?this.tip().stop().fadeOut(function(){b(this).remove()}):
this.tip().remove()},fixTitle:function(){var a=this.$element;if(a.attr("title")||"string"!=typeof a.attr("original-title"))a.attr("original-title",a.attr("title")||"").removeAttr("title")},getTitle:function(){var a,b=this.$element,d=this.options;this.fixTitle();d=this.options;"string"==typeof d.title?a=b.attr("title"==d.title?"original-title":d.title):"function"==typeof d.title&&(a=d.title.call(b[0]));return(a=(""+a).replace(/(^\s*|\s*$)/,""))||d.fallback},tip:function(){this.$tip||(this.$tip=b('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'),
this.$tip.data("tipsy-pointee",this.$element[0]));return this.$tip},validate:function(){this.$element[0].parentNode||(this.hide(),this.options=this.$element=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled}};b.fn.tipsy=function(a){function c(c){var d=b.data(c,"tipsy");d||(d=new j(c,b.fn.tipsy.elementOptions(c,a)),b.data(c,"tipsy",d));return d}function d(){var b=c(this);b.hoverState="in";0==a.delayIn?b.show():(b.fixTitle(),
setTimeout(function(){"in"==b.hoverState&&b.show()},a.delayIn))}function f(){var b=c(this);b.hoverState="out";0==a.delayOut?b.hide():setTimeout(function(){"out"==b.hoverState&&b.hide()},a.delayOut)}if(!0===a)return this.data("tipsy");if("string"==typeof a){var e=this.data("tipsy");if(e)e[a]();return this}a=b.extend({},b.fn.tipsy.defaults,a);a.live||this.each(function(){c(this)});if("manual"!=a.trigger){var e=a.live?"live":"bind",g="hover"==a.trigger?"mouseleave":"blur";this[e]("hover"==a.trigger?
"mouseenter":"focus",d)[e](g,f)}return this};b.fn.tipsy.defaults={className:null,delayIn:0,delayOut:0,fade:!1,fallback:"",gravity:"n",html:!1,live:!1,offset:0,opacity:0.8,title:"title",trigger:"hover"};b.fn.tipsy.revalidate=function(){b(".tipsy").each(function(){var a=b.data(this,"tipsy-pointee"),c;if(!(c=!a)){a:{for(;a=a.parentNode;)if(a==document){a=!0;break a}a=!1}c=!a}c&&b(this).remove()})};b.fn.tipsy.elementOptions=function(a,c){return b.metadata?b.extend({},c,b(a).metadata()):c};b.fn.tipsy.autoNS=
function(){return b(this).offset().top>b(document).scrollTop()+b(window).height()/2?"s":"n"};b.fn.tipsy.autoWE=function(){return b(this).offset().left>b(document).scrollLeft()+b(window).width()/2?"e":"w"};b.fn.tipsy.autoBounds=function(a,c){return function(){var d=c[0],f=1<c.length?c[1]:!1,e=b(document).scrollTop()+a,g=b(document).scrollLeft()+a,h=b(this);h.offset().top<e&&(d="n");h.offset().left<g&&(f="w");b(window).width()+b(document).scrollLeft()-h.offset().left<a&&(f="e");b(window).height()+b(document).scrollTop()-
h.offset().top<a&&(d="s");return d+(f?f:"")}}})(jQuery);

        $('.all img').tipsy({
          gravity: 's'
        });

        $('a.tools').click(function(e){
          e.preventDefault();
          var href = $(this).attr('href');
          var destination = tools.find('ul.'+href.substr(1,href.length));
          if(destination.length) {
            /*$('.all li[title]').each(function(){
              $(this).attr('title',$(this).attr('original-title')).removeAttr('original-title');
            });*/
            tools.find('.all').quicksand(destination.find('li'),{
              easing: 'easeInOutQuad',
              useScaling: true
            },function(){
              $('.all img').tipsy({
                gravity: 's'
              });
            });
          }
        });
      }

      /*window['yandex_metrika_callbacks'] = [function(){
        try {
          window.yaCounter21066022 = new Ya.Metrika({
            id: 21066022,
            enableAll: true
          });
        }
        catch(e) {}
      }];
      yepnope(('https:' == location.protocol ? 'https:' : 'http:')+'//mc.yandex.ru/metrika/watch.js');

      if(document.documentElement.className.match('lt-ie8')) {
        yepnope({
          load: '//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js',
          complete: function(){
            CFInstall.check({mode:'overlay'});
          }
        });
      }*/

    }
  });
})();