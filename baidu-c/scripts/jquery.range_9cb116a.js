"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(t,i,s,o){var e=function(){return this.init.apply(this,arguments)};e.prototype={defaults:{onstatechange:function(){},isRange:!1,showLabels:!0,showScale:!0,step:1,format:"%s",theme:"theme-green",width:300,disable:!1},template:'<div class="slider-container">			<div class="back-bar">                <div class="selected-bar"></div>                <div class="pointer low"></div><div class="pointer-label">123456</div>                <div class="pointer high"></div><div class="pointer-label">456789</div>                <div class="clickable-dummy"></div>            </div>            <div class="scale"></div>		</div>',init:function(i,s){this.options=t.extend({},this.defaults,s),this.inputNode=t(i),this.options.value=this.inputNode.val()||(this.options.isRange?this.options.from+","+this.options.from:this.options.from),this.domNode=t(this.template),this.domNode.addClass(this.options.theme),this.inputNode.after(this.domNode),this.domNode.on("change",this.onChange),this.pointers=t(".pointer",this.domNode),this.lowPointer=this.pointers.first(),this.highPointer=this.pointers.last(),this.labels=t(".pointer-label",this.domNode),this.lowLabel=this.labels.first(),this.highLabel=this.labels.last(),this.scale=t(".scale",this.domNode),this.bar=t(".selected-bar",this.domNode),this.clickableBar=this.domNode.find(".clickable-dummy"),this.interval=this.options.to-this.options.from,this.render()},render:function(){return 0!==this.inputNode.width()||this.options.width?(this.domNode.width(this.options.width||this.inputNode.width()),this.inputNode.hide(),this.isSingle()&&(this.lowPointer.hide(),this.lowLabel.hide()),this.options.showLabels||this.labels.hide(),this.attachEvents(),this.options.showScale&&this.renderScale(),void this.setValue(this.options.value)):void console.log("jRange : no width found, returning")},isSingle:function(){return"number"==typeof this.options.value?!0:-1!==this.options.value.indexOf(",")||this.options.isRange?!1:!0},attachEvents:function(){this.clickableBar.click(t.proxy(this.barClicked,this)),this.pointers.on("mousedown touchstart",t.proxy(this.onDragStart,this)),this.pointers.bind("dragstart",function(t){t.preventDefault()})},onDragStart:function(i){if(!(this.options.disable||"mousedown"===i.type&&1!==i.which)){i.stopPropagation(),i.preventDefault();var o=t(i.target);this.pointers.removeClass("last-active"),o.addClass("focused last-active"),this[(o.hasClass("low")?"low":"high")+"Label"].addClass("focused"),t(s).on("mousemove.slider touchmove.slider",t.proxy(this.onDrag,this,o)),t(s).on("mouseup.slider touchend.slider touchcancel.slider",t.proxy(this.onDragEnd,this))}},onDrag:function(t,i){i.stopPropagation(),i.preventDefault(),i.originalEvent.touches&&i.originalEvent.touches.length?i=i.originalEvent.touches[0]:i.originalEvent.changedTouches&&i.originalEvent.changedTouches.length&&(i=i.originalEvent.changedTouches[0]);var s=i.clientX-this.domNode.offset().left;this.domNode.trigger("change",[this,t,s])},onDragEnd:function(){this.pointers.removeClass("focused"),this.labels.removeClass("focused"),t(s).off(".slider")},barClicked:function(t){if(!this.options.disable){var i=t.pageX-this.clickableBar.offset().left;if(this.isSingle())this.setPosition(this.pointers.last(),i,!0,!0);else{var s=Math.abs(parseInt(this.pointers.first().css("left"),10)-i+this.pointers.first().width()/2)<Math.abs(parseInt(this.pointers.last().css("left"),10)-i+this.pointers.first().width()/2)?this.pointers.first():this.pointers.last();this.setPosition(s,i,!0,!0)}}},onChange:function(t,i,s,o){var e,n;i.isSingle()?(e=0,n=i.domNode.width()):(e=s.hasClass("high")?i.lowPointer.position().left+i.lowPointer.width()/2:0,n=s.hasClass("low")?i.highPointer.position().left+i.highPointer.width()/2:i.domNode.width());var h=Math.min(Math.max(o,e),n);i.setPosition(s,h,!0)},setPosition:function(t,i,s,o){var e,n=this.lowPointer.position().left,h=this.highPointer.position().left,a=this.highPointer.width()/2;s||(i=this.prcToPx(i)),t[0]===this.highPointer[0]?h=Math.round(i-a):n=Math.round(i-a),t[o?"animate":"css"]({left:Math.round(i-a)}),e=this.isSingle()?0:n+a,this.bar[o?"animate":"css"]({width:Math.round(h+a-e),left:e}),this.showPointerValue(t,i,o),this.isReadonly()},setValue:function(t){var i=t.toString().split(",");this.options.value=t;var s=this.valuesToPrc(2===i.length?i:[0,i[0]]);this.isSingle()?this.setPosition(this.highPointer,s[1]):(this.setPosition(this.lowPointer,s[0]),this.setPosition(this.highPointer,s[1]))},renderScale:function(){for(var i=this.options.scale||[this.options.from,this.options.to],s=Math.round(100/(i.length-1)*10)/10,o="",e=0;e<i.length;e++)o+='<span style="left: '+e*s+'%">'+("|"!=i[e]?"<ins>"+i[e]+"</ins>":"")+"</span>";this.scale.html(o),t("ins",this.scale).each(function(){t(this).css({marginLeft:-t(this).outerWidth()/2})})},getBarWidth:function(){var t=this.options.value.split(",");return t.length>1?parseInt(t[1],10)-parseInt(t[0],10):parseInt(t[0],10)},showPointerValue:function(i,s,e){var n,h=t(".pointer-label",this.domNode)[i.hasClass("low")?"first":"last"](),a=this.positionToValue(s);if(t.isFunction(this.options.format)){var l=this.isSingle()?o:i.hasClass("low")?"low":"high";n=this.options.format(a,l)}else n=this.options.format.replace("%s",a);var r=h.html(n).width(),d=s-r/2;d=Math.min(Math.max(d,0),this.options.width-r),h[e?"animate":"css"]({left:d}),this.setInputValue(i,a)},valuesToPrc:function(t){var i=100*(t[0]-this.options.from)/this.interval,s=100*(t[1]-this.options.from)/this.interval;return[i,s]},prcToPx:function(t){return this.domNode.width()*t/100},positionToValue:function(t){var i=t/this.domNode.width()*this.interval;return i+=this.options.from,Math.round(i/this.options.step)*this.options.step},setInputValue:function(t,i){if(this.isSingle())this.options.value=i.toString();else{var s=this.options.value.split(",");this.options.value=t.hasClass("low")?i+","+s[1]:s[0]+","+i}this.inputNode.val()!==this.options.value&&(this.inputNode.val(this.options.value),this.options.onstatechange.call(this,this.options.value))},getValue:function(){return this.options.value},isReadonly:function(){this.domNode.toggleClass("slider-readonly",this.options.disable)},disable:function(){this.options.disable=!0,this.isReadonly()},enable:function(){this.options.disable=!1,this.isReadonly()},toggleDisable:function(){this.options.disable=!this.options.disable,this.isReadonly()}};var n="jRange";t.fn[n]=function(s){var o,h=arguments;return this.each(function(){var a=t(this),l=t.data(this,"plugin_"+n),r="object"===("undefined"==typeof s?"undefined":_typeof(s))&&s;l||(a.data("plugin_"+n,l=new e(this,r)),t(i).resize(function(){l.setValue(l.getValue())})),"string"==typeof s&&(o=l[s].apply(l,Array.prototype.slice.call(h,1)))}),o||this}}(jQuery,window,document);