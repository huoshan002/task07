"use strict";function GetBit(e,t){return e>>t&1}function e2c(){TheDate=3!=arguments.length?new Date:new Date(arguments[0],arguments[1],arguments[2]);var e,t,a,n,r=!1,i=TheDate.getYear();for(1900>i&&(i+=1900),e=365*(i-1921)+Math.floor((i-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38,TheDate.getYear()%4==0&&TheDate.getMonth()>1&&e++,t=0;;t++){for(n=CalendarData[t]<4095?11:12,a=n;a>=0;a--){if(e<=29+GetBit(CalendarData[t],a)){r=!0;break}e=e-29-GetBit(CalendarData[t],a)}if(r)break}cYear=1921+t,cMonth=n-a+1,cDay=e,12==n&&(cMonth==Math.floor(CalendarData[t]/65536)+1&&(cMonth=1-cMonth),cMonth>Math.floor(CalendarData[t]/65536)+1&&cMonth--)}function GetcDateString(){var e="";return e+=tgString.charAt((cYear-4)%10),e+=dzString.charAt((cYear-4)%12),e+="(",e+=sx.charAt((cYear-4)%12),e+=")年 ",1>cMonth?(e+="(闰)",e+=monString.charAt(-cMonth-1)):e+=monString.charAt(cMonth-1),e+="月",e+=11>cDay?"初":20>cDay?"十":30>cDay?"廿":"三十",(cDay%10!=0||10==cDay)&&(e+=numString.charAt((cDay-1)%10)),e}function GetLunarDay(e,t,a){return 1921>e||e>2020?"":(t=parseInt(t)>0?t-1:11,e2c(e,t,a),GetcDateString())}function GetCNDate(){return GetLunarDay(yy,mm,dd)}function clearCookie(){var e=document.cookie.match(/[^ =;]+(?=\=)/g);if(e)for(var t=e.length;t--;)document.cookie=e[t]+"=0;expires="+new Date(0).toUTCString()}var DateUtil={};DateUtil.parseDate=function(e,t){if(!e)return null;var a,n=0,r=0,i=0,o=0,D=0,c=0,d=e.split(" ");if(d[0]){var s=d[0].split("-");n=parseInt(s[0],10),r=parseInt(s[1],10)-1,i=parseInt(s[2],10)}if(d[1]){var g=d[1].split(":");o=parseInt(g[0],10),D=parseInt(g[1],10),c=parseInt(g[2],10)}return"yyyy-MM-dd"==t?a=new Date(n,r,i):"yyyy-MM-dd HH:mm:ss"==t?a=new Date(n,r,i,o,D,c):null},DateUtil.fomatDate=function(e,t){var a=e.getFullYear(),n=e.getMonth(),r=e.getDate(),i=e.getHours(),o=e.getMinutes(),D=e.getSeconds(),c=i>12?i-12:i,d=t.replace("yyyy",a).replace("MM",DateUtil.addZero(n+1)).replace("dd",DateUtil.addZero(r)).replace("HH",DateUtil.addZero(i)).replace("mm",DateUtil.addZero(o)).replace("ss",DateUtil.addZero(D)).replace("hh",DateUtil.addZero(c));return d},DateUtil.addZero=function(e){return 10>e?"0"+e:e},DateUtil.parseDate=function(e,t){if(!e)return null;var a,n=0,r=0,i=0,o=0,D=0,c=0,d=e.split(" ");if(d[0]){var s=d[0].split("-");n=parseInt(s[0],10),r=parseInt(s[1],10)-1,i=parseInt(s[2],10)}if(d[1]){var g=d[1].split(":");o=parseInt(g[0],10),D=parseInt(g[1],10),c=parseInt(g[2],10)}return"yyyy-MM-dd"==t?a=new Date(n,r,i):"yyyy-MM-dd HH:mm:ss"==t?a=new Date(n,r,i,o,D,c):null},DateUtil.getLastDate=function(e){e=arguments[0]||new Date;var t=new Date(e.getTime());t.setMonth(t.getMonth()+1),t.setDate(1);var a=t.getTime()-864e5;return t=new Date(a)},DateUtil.getFirstDate=function(e){e=arguments[0]||new Date;var t=new Date(e.getTime());return t.setDate(1),t},DateUtil.dateAdd=function(e,t,a){switch(a=arguments[2]||new Date,e){case"s":return new Date(a.getTime()+1e3*t);case"n":return new Date(a.getTime()+6e4*t);case"h":return new Date(a.getTime()+36e5*t);case"d":return new Date(a.getTime()+864e5*t);case"w":return new Date(a.getTime()+6048e5*t);case"m":return new Date(a.getFullYear(),a.getMonth()+t,a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds());case"y":return new Date(a.getFullYear()+t,a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds())}};var CalendarData=new Array(100),madd=new Array(12),tgString="甲乙丙丁戊己庚辛壬癸",dzString="子丑寅卯辰巳午未申酉戌亥",numString="一二三四五六七八九十",monString="正二三四五六七八九十冬腊",weekString="日一二三四五六",sx="鼠牛虎兔龙蛇马羊猴鸡狗猪",cYear,cMonth,cDay,TheDate;CalendarData=new Array(2635,333387,1701,1748,267701,694,2391,133423,1175,396438,3402,3749,331177,1453,694,201326,2350,465197,3221,3402,400202,2901,1386,267611,605,2349,137515,2709,464533,1738,2901,330421,1242,2651,199255,1323,529706,3733,1706,398762,2741,1206,267438,2647,1318,204070,3477,461653,1386,2413,330077,1197,2637,268877,3365,531109,2900,2922,398042,2395,1179,267415,2635,661067,1701,1748,398772,2742,2391,330031,1175,1611,200010,3749,527717,1452,2742,332397,2350,3222,268949,3402,3493,133973,1386,464219,605,2349,334123,2709,2890,267946,2773,592565,1210,2651,395863,1323,2707,265877),madd[0]=0,madd[1]=31,madd[2]=59,madd[3]=90,madd[4]=120,madd[5]=151,madd[6]=181,madd[7]=212,madd[8]=243,madd[9]=273,madd[10]=304,madd[11]=334;var D=new Date,yy=D.getFullYear(),mm=D.getMonth()+1,dd=D.getDate(),ww=D.getDay(),ss=parseInt(D.getTime()/1e3);100>yy&&(yy="19"+yy);var CommonUtil={};CommonUtil.setCookie=function(e,t,a){var n=a;a||(n=2592e6);var r=new Date;r.setTime(r.getTime()+n),document.cookie=e+"="+escape(t)+";Path=/;expires="+r.toGMTString()},CommonUtil.getCookie=function(e){var t,a=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(a))?unescape(t[2]):null};