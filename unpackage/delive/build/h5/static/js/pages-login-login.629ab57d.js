(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"05f1":function(e,t,n){var o=n("24fb");t=o(!1),t.push([e.i,'@font-face{font-family:uniicons;font-weight:400;font-style:normal;src:url(https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf?t=1536565627510) format("truetype")}.m-icon[data-v-a4c0901e]{font-family:uniicons;font-size:24px;font-weight:400;font-style:normal;line-height:1;display:inline-block;text-decoration:none;-webkit-font-smoothing:antialiased}.m-icon.uni-active[data-v-a4c0901e]{color:#007aff}.m-icon-contact[data-v-a4c0901e]:before{content:"\\e100"}.m-icon-person[data-v-a4c0901e]:before{content:"\\e101"}.m-icon-personadd[data-v-a4c0901e]:before{content:"\\e102"}.m-icon-contact-filled[data-v-a4c0901e]:before{content:"\\e130"}.m-icon-person-filled[data-v-a4c0901e]:before{content:"\\e131"}.m-icon-personadd-filled[data-v-a4c0901e]:before{content:"\\e132"}.m-icon-phone[data-v-a4c0901e]:before{content:"\\e200"}.m-icon-email[data-v-a4c0901e]:before{content:"\\e201"}.m-icon-chatbubble[data-v-a4c0901e]:before{content:"\\e202"}.m-icon-chatboxes[data-v-a4c0901e]:before{content:"\\e203"}.m-icon-phone-filled[data-v-a4c0901e]:before{content:"\\e230"}.m-icon-email-filled[data-v-a4c0901e]:before{content:"\\e231"}.m-icon-chatbubble-filled[data-v-a4c0901e]:before{content:"\\e232"}.m-icon-chatboxes-filled[data-v-a4c0901e]:before{content:"\\e233"}.m-icon-weibo[data-v-a4c0901e]:before{content:"\\e260"}.m-icon-weixin[data-v-a4c0901e]:before{content:"\\e261"}.m-icon-pengyouquan[data-v-a4c0901e]:before{content:"\\e262"}.m-icon-chat[data-v-a4c0901e]:before{content:"\\e263"}.m-icon-qq[data-v-a4c0901e]:before{content:"\\e264"}.m-icon-videocam[data-v-a4c0901e]:before{content:"\\e300"}.m-icon-camera[data-v-a4c0901e]:before{content:"\\e301"}.m-icon-mic[data-v-a4c0901e]:before{content:"\\e302"}.m-icon-location[data-v-a4c0901e]:before{content:"\\e303"}.m-icon-mic-filled[data-v-a4c0901e]:before,\r\n.m-icon-speech[data-v-a4c0901e]:before{content:"\\e332"}.m-icon-location-filled[data-v-a4c0901e]:before{content:"\\e333"}.m-icon-micoff[data-v-a4c0901e]:before{content:"\\e360"}.m-icon-image[data-v-a4c0901e]:before{content:"\\e363"}.m-icon-map[data-v-a4c0901e]:before{content:"\\e364"}.m-icon-compose[data-v-a4c0901e]:before{content:"\\e400"}.m-icon-trash[data-v-a4c0901e]:before{content:"\\e401"}.m-icon-upload[data-v-a4c0901e]:before{content:"\\e402"}.m-icon-download[data-v-a4c0901e]:before{content:"\\e403"}.m-icon-close[data-v-a4c0901e]:before{content:"\\e404"}.m-icon-redo[data-v-a4c0901e]:before{content:"\\e405"}.m-icon-undo[data-v-a4c0901e]:before{content:"\\e406"}.m-icon-refresh[data-v-a4c0901e]:before{content:"\\e407"}.m-icon-star[data-v-a4c0901e]:before{content:"\\e408"}.m-icon-plus[data-v-a4c0901e]:before{content:"\\e409"}.m-icon-minus[data-v-a4c0901e]:before{content:"\\e410"}.m-icon-circle[data-v-a4c0901e]:before,\r\n.m-icon-checkbox[data-v-a4c0901e]:before{content:"\\e411"}.m-icon-close-filled[data-v-a4c0901e]:before,\r\n.m-icon-clear[data-v-a4c0901e]:before{content:"\\e434"}.m-icon-refresh-filled[data-v-a4c0901e]:before{content:"\\e437"}.m-icon-star-filled[data-v-a4c0901e]:before{content:"\\e438"}.m-icon-plus-filled[data-v-a4c0901e]:before{content:"\\e439"}.m-icon-minus-filled[data-v-a4c0901e]:before{content:"\\e440"}.m-icon-circle-filled[data-v-a4c0901e]:before{content:"\\e441"}.m-icon-checkbox-filled[data-v-a4c0901e]:before{content:"\\e442"}.m-icon-closeempty[data-v-a4c0901e]:before{content:"\\e460"}.m-icon-refreshempty[data-v-a4c0901e]:before{content:"\\e461"}.m-icon-reload[data-v-a4c0901e]:before{content:"\\e462"}.m-icon-starhalf[data-v-a4c0901e]:before{content:"\\e463"}.m-icon-spinner[data-v-a4c0901e]:before{content:"\\e464"}.m-icon-spinner-cycle[data-v-a4c0901e]:before{content:"\\e465"}.m-icon-search[data-v-a4c0901e]:before{content:"\\e466"}.m-icon-plusempty[data-v-a4c0901e]:before{content:"\\e468"}.m-icon-forward[data-v-a4c0901e]:before{content:"\\e470"}.m-icon-back[data-v-a4c0901e]:before,\r\n.m-icon-left-nav[data-v-a4c0901e]:before{content:"\\e471"}.m-icon-checkmarkempty[data-v-a4c0901e]:before{content:"\\e472"}.m-icon-home[data-v-a4c0901e]:before{content:"\\e500"}.m-icon-navigate[data-v-a4c0901e]:before{content:"\\e501"}.m-icon-gear[data-v-a4c0901e]:before{content:"\\e502"}.m-icon-paperplane[data-v-a4c0901e]:before{content:"\\e503"}.m-icon-info[data-v-a4c0901e]:before{content:"\\e504"}.m-icon-help[data-v-a4c0901e]:before{content:"\\e505"}.m-icon-locked[data-v-a4c0901e]:before{content:"\\e506"}.m-icon-more[data-v-a4c0901e]:before{content:"\\e507"}.m-icon-flag[data-v-a4c0901e]:before{content:"\\e508"}.m-icon-home-filled[data-v-a4c0901e]:before{content:"\\e530"}.m-icon-gear-filled[data-v-a4c0901e]:before{content:"\\e532"}.m-icon-info-filled[data-v-a4c0901e]:before{content:"\\e534"}.m-icon-help-filled[data-v-a4c0901e]:before{content:"\\e535"}.m-icon-more-filled[data-v-a4c0901e]:before{content:"\\e537"}.m-icon-settings[data-v-a4c0901e]:before{content:"\\e560"}.m-icon-list[data-v-a4c0901e]:before{content:"\\e562"}.m-icon-bars[data-v-a4c0901e]:before{content:"\\e563"}.m-icon-loop[data-v-a4c0901e]:before{content:"\\e565"}.m-icon-paperclip[data-v-a4c0901e]:before{content:"\\e567"}.m-icon-eye[data-v-a4c0901e]:before{content:"\\e568"}.m-icon-arrowup[data-v-a4c0901e]:before{content:"\\e580"}.m-icon-arrowdown[data-v-a4c0901e]:before{content:"\\e581"}.m-icon-arrowleft[data-v-a4c0901e]:before{content:"\\e582"}.m-icon-arrowright[data-v-a4c0901e]:before{content:"\\e583"}.m-icon-arrowthinup[data-v-a4c0901e]:before{content:"\\e584"}.m-icon-arrowthindown[data-v-a4c0901e]:before{content:"\\e585"}.m-icon-arrowthinleft[data-v-a4c0901e]:before{content:"\\e586"}.m-icon-arrowthinright[data-v-a4c0901e]:before{content:"\\e587"}.m-icon-pulldown[data-v-a4c0901e]:before{content:"\\e588"}.m-icon-scan[data-v-a4c0901e]:before{content:"\\e612"}',""]),e.exports=t},"0e8e":function(e,t,n){var o=n("05f1");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("6650f679",o,!0,{sourceMap:!1,shadowMode:!1})},"23a7":function(e,t,n){var o=n("3067");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("5e37197e",o,!0,{sourceMap:!1,shadowMode:!1})},"2e4e":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-uni-view",{staticClass:"content"},[o("v-uni-view",{staticClass:"imgBox"},[o("v-uni-image",{staticClass:"img",attrs:{src:n("407d"),mode:""}})],1),o("v-uni-view",{staticClass:"input-group"},[o("v-uni-view",{staticClass:"input-row border"},[o("v-uni-text",{staticClass:"title"},[e._v("账号：")]),o("m-input",{staticClass:"m-input",attrs:{type:"text",clearable:!0,focus:!0,placeholder:"请输入账号"},model:{value:e.account,callback:function(t){e.account=t},expression:"account"}})],1),o("v-uni-view",{staticClass:"input-row border"},[o("v-uni-text",{staticClass:"title"},[e._v("密码：")]),o("m-input",{attrs:{type:"password",displayable:!0,placeholder:"请输入密码"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),o("v-uni-view",{staticClass:"input-row border"},[o("v-uni-text",{staticClass:"title"},[e._v("确认：")]),o("m-input",{attrs:{type:"password",displayable:!0,placeholder:"请输入密码"},model:{value:e.confirm_password,callback:function(t){e.confirm_password=t},expression:"confirm_password"}})],1)],1),o("v-uni-view",{staticClass:"btn-row"},[o("v-uni-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.bindLogin.apply(void 0,arguments)}}},[e._v("登录")])],1),e.hasProvider?o("v-uni-view",{staticClass:"oauth-row",style:{top:e.positionTop+"px"}},e._l(e.providerList,(function(t){return o("v-uni-view",{key:t.value,staticClass:"oauth-image"},[o("v-uni-image",{attrs:{src:t.image},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.oauth(t.value)}}})],1)})),1):e._e()],1)},i=[]},3067:function(e,t,n){var o=n("24fb");t=o(!1),t.push([e.i,".action-row[data-v-72025dda]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.action-row uni-navigator[data-v-72025dda]{color:#007aff;padding:0 10px}.oauth-row[data-v-72025dda]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:absolute;top:0;left:0;width:100%}.oauth-image[data-v-72025dda]{position:relative;width:50px;height:50px;border:1px solid #ddd;border-radius:50px;margin:0 20px;background-color:#fff}.oauth-image uni-image[data-v-72025dda]{width:30px;height:30px;margin:10px}.oauth-image uni-button[data-v-72025dda]{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0}.imgBox[data-v-72025dda]{width:100%;height:30%;padding:1%;box-sizing:border-box}.imgBox>.img[data-v-72025dda]{display:block;width:100px;height:100px;margin:0 auto;position:relative;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}",""]),e.exports=t},3282:function(e,t,n){var o=n("d3ac");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("61a6786d",o,!0,{sourceMap:!1,shadowMode:!1})},"407d":function(e,t,n){e.exports=n.p+"static/img/user.8b01173a.png"},"427a":function(e,t,n){"use strict";n.r(t);var o=n("4f69"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},4630:function(e,t,n){"use strict";var o=n("0e8e"),a=n.n(o);a.a},"4f09":function(e,t,n){"use strict";n.r(t);var o=n("ede6"),a=n("eecf");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("4630");var c,r=n("f0c5"),s=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"a4c0901e",null,!1,o["a"],c);t["default"]=s.exports},"4f69":function(e,t,n){"use strict";var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("4f09")),i={components:{mIcon:a.default},props:{type:String,value:String,placeholder:String,clearable:{type:[Boolean,String],default:!1},displayable:{type:[Boolean,String],default:!1},focus:{type:[Boolean,String],default:!1}},model:{prop:"value",event:"input"},data:function(){return{showPassword:!1,isFocus:!1}},computed:{inputType:function(){var e=this.type;return"password"===e?"text":e}},methods:{clear:function(){this.$emit("input","")},display:function(){this.showPassword=!this.showPassword},onFocus:function(){this.isFocus=!0},onBlur:function(){var e=this;this.$nextTick((function(){e.isFocus=!1}))},onInput:function(e){this.$emit("input",e.detail.value)}}};t.default=i},b3fb:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={props:{type:String},methods:{onClick:function(){this.$emit("click")}}};t.default=o},bf83:function(e,t,n){"use strict";var o=n("23a7"),a=n.n(o);a.a},c31f:function(e,t,n){"use strict";n.r(t);var o=n("f998"),a=n("427a");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("d006");var c,r=n("f0c5"),s=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"1056c9dc",null,!1,o["a"],c);t["default"]=s.exports},c826:function(e,t,n){"use strict";var o=n("4ea4");n("c975"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("5530")),i=o(n("d345")),c=o(n("5fa6")),r=n("2f62"),s=o(n("c31f")),d={components:{mInput:s.default},data:function(){return{providerList:[],hasProvider:!1,account:"",password:"",positionTop:0,isDevtools:!1,confirm_password:""}},computed:(0,r.mapState)(["forcedLogin"]),methods:(0,a.default)((0,a.default)({},(0,r.mapMutations)(["login"])),{},{initProvider:function(){var e=this,t=["weixin","qq","sinaweibo"];uni.getProvider({service:"oauth",success:function(n){if(n.provider&&n.provider.length){for(var o=0;o<n.provider.length;o++)~t.indexOf(n.provider[o])&&e.providerList.push({value:n.provider[o],image:"../../static/img/"+n.provider[o]+".png"});e.hasProvider=!0}},fail:function(e){console.error("获取服务供应商失败："+JSON.stringify(e))}})},initPosition:function(){this.positionTop=uni.getSystemInfoSync().windowHeight-100},bindLogin:function(){var e=this;if(this.password.length>20||this.password.length<6)uni.showToast({icon:"none",title:"密码为 6到20 个字符"});else{var t=this.account,n=this.password,o=this.confirm_password,a=Date.parse(new Date)/1e3,r=(0,c.default)(i.default.makeSign({user_name:t,user_pass:n,confirm_password:o,timestamp:a}));uni.request({url:this.$store.state.url+"logininfo/login",data:{user_name:t,user_pass:n,confirm_password:o,sign:r,timestamp:a},method:"post",success:function(t){var n=t.data;if(1==n.code){var o={type:n.data.type,house_id:n.data.house_id,userName:n.data.user_name,user_id:n.data.user_id};e.$store.commit("login",n.data.user_name),e.$store.dispatch("setType",o).then((function(){uni.switchTab({url:"../main/main"})}))}else uni.showToast({title:n.msg,icon:"none"})},fail:function(e){}})}},oauth:function(e){var t=this;uni.login({provider:e,success:function(n){uni.getUserInfo({provider:e,success:function(e){t.toMain(e.userInfo.nickName)},fail:function(){uni.showToast({icon:"none",title:"登陆失败"})}})},fail:function(e){console.error("授权登录失败："+JSON.stringify(e))}})},getUserInfo:function(e){var t=e.detail;t.userInfo?this.toMain(t.userInfo.nickName):uni.showToast({icon:"none",title:"登陆失败"})},toMain:function(e){this.login(e),this.forcedLogin?uni.reLaunch({url:"../main/main"}):uni.navigateBack()}}),onReady:function(){this.initPosition(),this.initProvider()},onLoad:function(){this.hasLogin&&uni.switchTab({url:"../main/main"})}};t.default=d},d006:function(e,t,n){"use strict";var o=n("3282"),a=n.n(o);a.a},d1e8:function(e,t,n){"use strict";n.r(t);var o=n("2e4e"),a=n("ed52");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("bf83");var c,r=n("f0c5"),s=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"72025dda",null,!1,o["a"],c);t["default"]=s.exports},d3ac:function(e,t,n){var o=n("24fb");t=o(!1),t.push([e.i,".m-input-view[data-v-1056c9dc]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;\n\t/* width: 100%; */-webkit-box-flex:1;-webkit-flex:1;flex:1;padding:0 10px}.m-input-input[data-v-1056c9dc]{-webkit-box-flex:1;-webkit-flex:1;flex:1;width:100%;min-height:100%;line-height:inherit;background-color:transparent}.m-input-icon[data-v-1056c9dc]{width:20px;font-size:20px;line-height:20px;color:#666}",""]),e.exports=t},ed52:function(e,t,n){"use strict";n.r(t);var o=n("c826"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},ede6:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"m-icon",class:["m-icon-"+e.type],on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClick()}}})},i=[]},eecf:function(e,t,n){"use strict";n.r(t);var o=n("b3fb"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},f998:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var o={mIcon:n("4f09").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"m-input-view"},[n("v-uni-input",{staticClass:"m-input-input",attrs:{focus:e.focus,type:e.inputType,value:e.value,placeholder:e.placeholder,password:"password"===e.type&&!e.showPassword},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.onInput.apply(void 0,arguments)},focus:function(t){arguments[0]=t=e.$handleEvent(t),e.onFocus.apply(void 0,arguments)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e.onBlur.apply(void 0,arguments)}}}),e.clearable&&!e.displayable&&e.value.length?n("v-uni-view",{staticClass:"m-input-icon"},[n("m-icon",{attrs:{color:"#666666",type:"clear"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clear.apply(void 0,arguments)}}})],1):e._e(),e.displayable?n("v-uni-view",{staticClass:"m-input-icon"},[n("m-icon",{style:{color:e.showPassword?"#666666":"#cccccc"},attrs:{type:"eye"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.display.apply(void 0,arguments)}}})],1):e._e()],1)},i=[]}}]);