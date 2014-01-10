OpenSpending="OpenSpending"in window?OpenSpending:{},function(a){OpenSpending.Treemap=function(b,c,d){var e=this,f=[OpenSpending.scriptRoot+"/widgets/treemap/js/thejit-2.min.js",OpenSpending.scriptRoot+"/widgets/treemap/css/treemap.css"];window.HTMLCanvasElement||f.push(OpenSpending.scriptRoot+"/widgets/treemap/js/excanvas.js"),e.context=a.extend({click:function(a){if(a.data.link){var b=c.embed?a.data.link+"?embed=true":a.data.link;document.location.href=b}},hasClick:function(a){return void 0!==a.data.link},createLabel:function(a,b,c){c.data.value/e.total>.03&&(b.innerHTML="<div class='desc'><div class='amount'>"+OpenSpending.Utils.formatAmountWithCommas(c.data.value,0,e.currency)+"</div><div class='lbl'>"+c.name+"</div></div>")},tooltipMessage:function(a,b){var c=100*b.data.value/a.total;return b.name+" ("+OpenSpending.Utils.formatAmountWithCommas(c,2)+"%)"},drilldown:function(a){e.drilldown(a)}},c),e.state=d,this.configure=function(a){e.$qb.empty();new OpenSpending.Widgets.QueryBuilder(e.$qb,e.update,a,e.context,[{variable:"drilldowns",label:"Tiles:",type:"select","default":e.state.drilldowns,help:"Each selected dimension will display as an additional level of tiles for the treemap."},{variable:"year",label:"Year:",type:"slider",dimension:"time",attribute:"year","default":e.state.year,help:"Filter by year."},{variable:"cuts",label:"Filters:",type:"cuts","default":e.state.cuts,help:"Limit the set of data to display."}])},this.update=function(a){e.state=a,e.state.drilldowns=e.state.drilldowns||[e.state.drilldown],e.state.cuts=e.state.cuts||{};var b=[];for(var c in e.state.cuts)b.push(c+":"+e.state.cuts[c]);e.state.year&&b.push("time.year:"+e.state.year),"undefined"!=typeof e.context.member&&"undefined"!=typeof e.context.dimension&&b.push(e.context.dimension+":"+e.context.member),e.state.drilldowns&&(e.aggregator=new OpenSpending.Aggregator({siteUrl:e.context.siteUrl,dataset:e.context.dataset,drilldowns:e.state.drilldowns,cuts:b,rootNodeLabel:"Total",callback:function(a){e.setDataFromAggregator(this.dataset,a)}}))},this.getDownloadURL=function(){return e.aggregator.getCSVURL()},this.serialize=function(){return e.state},this.init=function(){e.$e=b,e.$e.before('<div class="treemap-qb"></div>'),e.$qb=b.prev(),e.$e.addClass("treemap-widget"),e.update(d)},this.setDataFromAggregator=function(a,b){e.currency=b.currency,e.setNode(b)},this.setNode=function(b){var c=!0;e.total=b.amount,e.data={children:a.map(b.children,function(a){return a.color&&(c=!1),{children:[],id:a.id,name:a.label||a.name,data:{node:a,value:a.amount,$area:a.amount,title:a.label||a.name,link:a.html_url,name:a.name,$color:a.color||"#333333"}}})},c&&this.autoColorize(),e.draw()},this.drilldown=function(a){a.data.node.children.length?e.setNode(a.data.node):e.context.click(a)},this.autoColorize=function(){for(var a=e.data.children.length,b=OpenSpending.Utils.getColorPalette(a),c=0;a>c;c++)e.data.children[c].data.$color=b[c]},this.draw=function(){return e.$e.empty(),e.data.children.length?(a(e.$e).show(),e.tm=new $jit.TM.Squarified({injectInto:e.$e.prop("id"),levelsToShow:1,titleHeight:0,animate:!0,transition:$jit.Trans.Expo.easeOut,offset:2,Label:{type:"HTML",size:12,family:"Tahoma, Verdana, Arial",color:"#DDE7F0"},Node:{color:"#243448",CanvasStyles:{shadowBlur:0,shadowColor:"#000"}},Events:{enable:!0,onClick:function(a){a&&e.context.drilldown(a)},onRightClick:function(){e.tm.out()},onMouseEnter:function(a){a&&(e.context.hasClick(a)||e.$e.find("#"+a.id).css("cursor","default"),a.setCanvasStyle("shadowBlur",8),a.orig_color=a.getData("color"),a.setData("color","#A3B3C7"),e.tm.fx.plotNode(a,e.tm.canvas))},onMouseLeave:function(a){a&&(a.removeData("color"),a.removeCanvasStyle("shadowBlur"),a.setData("color",a.orig_color),e.tm.plot())}},duration:1e3,Tips:{enable:!0,type:"Native",offsetX:20,offsetY:20,onShow:function(a,b){{var c='<div class="tip-title">'+e.context.tooltipMessage(e,b)+'</div><div class="tip-text">';b.data}a.innerHTML=c}},request:function(a,b,c){var d=json,e=$jit.json.getSubtree(d,a);$jit.json.prune(e,1),c.onComplete(a,e)},onCreateLabel:function(a,b){e.context.createLabel(e,a,b)}}),e.tm.loadJSON(this.data),e.tm.refresh(),void 0):(a(e.$e).hide(),void 0)};var g=a.Deferred();return g.done(function(a){a.init()}),window.treemapWidgetLoaded?g.resolve(e):yepnope({load:f,complete:function(){window.treemapWidgetLoaded=!0,g.resolve(e)}}),g.promise()}}(jQuery),function(){angular.module("fgvApp").filter("slug",function(){return function(a){var b,c,d,e,f,g,h;if(!a)return"";for(e=a.trim().toLowerCase(),c="àáäâãèéëêìíïîòóöôõùúüûñç·/_,:;",f="aaaaaeeeeiiiiooooouuuunc------",d=g=0,h=c.length;h>g;d=++g)b=c[d],e=e.replace(new RegExp(b,"g"),f.charAt(d));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}})}.call(this),function(){angular.module("fgvApp").filter("sort",function(){var a,b;return a=function(a,b){return a-b},b=function(a,b){return b-a},function(c,d){var e;if(c)return e=c.slice(),"desc"===d?e.sort(b):e.sort(a)}})}.call(this),function(){var a,b,c={}.hasOwnProperty;angular.module("fgvApp").factory("routing",["$state","$filter","$rootScope","openspending",function(d,e,f,g){var h,i,j,k,l,m,n,o,p,q,r,s,t,u;return s={year:"treemap.year","funcao.year":"treemap.year.funcao","funcao.subfuncao.year":"treemap.year.funcao.subfuncao","funcao.orgao.subfuncao.year":"treemap.year.funcao.subfuncao.orgao","funcao.orgao.subfuncao.uo.year":"treemap.year.funcao.subfuncao.orgao.uo","funcao.mod_aplic.orgao.subfuncao.uo.year":"treemap.year.funcao.subfuncao.orgao.uo.mod_aplic"},t={year:"treemap.year",funcao:"treemap.year.funcao",subfuncao:"treemap.year.funcao.subfuncao",orgao:"treemap.year.funcao.subfuncao.orgao",uo:"treemap.year.funcao.subfuncao.orgao.uo",mod_aplic:"treemap.year.funcao.subfuncao.orgao.uo.mod_aplic"},l=new b,m=new a,i=function(a){return a&&("string"==typeof a||a instanceof String)?l.val(a):l.all()},j=function(a){var b,c,e,f,g,h;for(c=t[a.type],b={},h=i(),f=0,g=h.length;g>f;f++)e=h[f],b[e.type]=q(e);return b[a.type]=q(a),c?d.href(c,b):void 0},k=function(a){var b,c,e,f,g;null!=a&&(l.push(a.type,a),m.set(a)),c={},g=l.vals;for(f in g)b=g[f],c[b.type]=q(b);return e=r(c),null!=e?d.go(e,c):void 0},h=function(){return d.go("^")},u=function(){var a,b,c,e,f,g,h,i,j,k,m;for(e=d.current.name.split("."),h=d.params,f=[],i=0,k=e.length;k>i;i++)c=e[i],h[c]&&f.push({type:c,id:parseInt(h[c])});for(;l.length()>f.length;)l.pop();for(j=0,m=f.length;m>j;j++)g=f[j],b=l.val(g.type),a=!b||g.id!==parseInt(b.id),a&&l.push(g.type,g);return n()},r=function(a){var b;return b=Object.keys(a).sort().join("."),s[b]},n=function(){var a,b,d,e,f,h;e={},h=i();for(f in h)c.call(h,f)&&(d=h[f],d.label||"year"===d.type||(a=m.get(d),a?d.label=a.label:e[d.type]=d.id));return b=Object.keys(e),b.length?g.aggregate(e,b).then(function(a){var b,d,f,g,h;for(h in e)c.call(e,h)&&(g=e[h],b=a.data.drilldown[0][h],d=null!=l.val(h)&&parseInt(g)===parseInt(b.name),d&&(f=i(h),f.label=b.label,m.set(f)));return k()}):void 0},q=function(a){var b;return b=a.id,a.label&&(b+="-"+p(a.label)),b},p=e("slug"),o=function(){return f.$on("$stateChangeSuccess",u),u()},o(),{href:j,updateState:k,back:h,getBreadcrumb:i}}]),b=function(){function a(){this.keys=[],this.vals={}}return a.prototype.push=function(a,b){return this.vals[a]||this.keys.push(a),this.vals[a]=b},a.prototype.peek=function(){var a;return a=this.keys[this.keys.length-1],this.vals[a]},a.prototype.pop=function(){var a,b;return a=this.keys.pop(),b=this.vals[a],delete this.vals[a],b},a.prototype.all=function(){var a,b,c,d,e;for(d=this.keys,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(this.vals[a]);return e},a.prototype.length=function(){return this.keys.length},a.prototype.val=function(a){return this.vals[a]},a}(),a=function(){function a(){this.vals={}}return a.prototype.set=function(a){return this.vals[this._getKey(a)]=a},a.prototype.get=function(a){return this.vals[this._getKey(a)]},a.prototype._getKey=function(a){return""+a.type+a.id},a}()}.call(this),function(){angular.module("fgvApp").factory("choroplethScale",["$q","openspending",function(a,b){var c,d,e,f,g;return g=[{threshold:.2,className:"level-0"},{threshold:.4,className:"level-1"},{threshold:.6,className:"level-2"},{threshold:.8,className:"level-3"},{threshold:1/0,className:"level-4"}],e=function(a){var b,c,d,e;return c=(new Date).getFullYear(),e=$.extend(!0,[],g),parseInt(a)===c&&(b=(new Date).getMonth(),d=b/12,e.map(function(a){return a.threshold*=d})),e},d=function(a,b){return function(c){var d,e,f,g,h;for(f=a[c.data.name],d="",g=0,h=b.length;h>g;g++)if(e=b[g],f<e.threshold){d=e.className;break}return d}},f=function(a,b){var c;return c=e(b),{levels:c,classNameFor:d(a,c)}},c=function(c,d,e){var g;return g=a.defer(),b.aggregate(c,[d],e).then(function(a){var b,e,h,i,j,k,l,m,n;for(e={},n=a.data.drilldown,l=0,m=n.length;m>l;l++)h=n[l],j=h[d].name,b=h.amount,i=h.pago+h.rppago,k=i/(b+h.rppago),e[j]=k;return g.resolve(f(e,c.year))}),g.promise},{get:c}}])}.call(this),function(){angular.module("fgvApp").directive("treemap",["$q","choroplethScale","openspending",function(a,b,c){var d,e,f,g,h,i,j,k;return f=function(a){var b,c,d;for(d=[],b=c=0;a>=0?a>c:c>a;b=a>=0?++c:--c)d.push("#FFFFFF");return d},h=function(a,b){return"<div class='desc'><div class='amount'>"+OpenSpending.Utils.formatAmountWithCommas(a.data.value,0,b)+"</div><div class='lbl'>"+a.name+"</div></div>"},e=function(a,b,c){var d;return b.className+=" "+j.classNameFor(c),d=c.endData.$width>=105,d?b.innerHTML=h(c,a.currency):void 0},j=void 0,i=function(){},g=function(){return!0},k=function(a,b){var c;return c=a.context.drilldown,a.context.drilldown=function(a){return b.$apply(function(){return i(a),c(a)})}},d=function(a,b,d,f){var h,i,j;return j={drilldowns:b,cuts:d},h={dataset:c.dataset,siteUrl:c.url,embed:!0,click:function(){},hasClick:g,createLabel:e},i=new window.OpenSpending.Treemap(a,h,j),i.done(function(a){return k(a,f)}),i},{restrict:"E",scope:{cuts:"=",click:"=",drilldown:"=",scale:"@"},templateUrl:"/views/partials/treemap.html",link:function(a,e,h){var k,l,m;return window.OpenSpending.Utils.getColorPalette=f,window.OpenSpending.scriptRoot=""+c.url+"/static/openspendingjs",window.OpenSpending.localeGroupSeparator=".",window.OpenSpending.localeDecimalSeparator=",",l=e.children("#treemap"),null!=a.click&&(i=a.click),k=h.measures.split("|"),g=function(a){return a.data.node.taxonomy!==h.lastDrilldown},m=function(c,e){return c&&e?b.get(c,e,k).then(function(b){return j=b,a.scale=j,d(l,[e],c,a)}):void 0},$("#mosaico_info_button").click(function(){return $("#mosaico_info_box").toggle(300)}),$("#mosaico_info_close_button").click(function(){return $("#mosaico_info_box").toggle(300)}),a.$watch("cuts",function(){return m(a.cuts,a.drilldown)},!0)}}}])}.call(this),function(){var a=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};angular.module("fgvApp").directive("years",["openspending",function(b){return{templateUrl:"/views/partials/years.html",restrict:"E",scope:{year:"=",years:"=",cuts:"="},link:function(c){var d;return d=function(d){var e;return e=$.extend({},d),delete e.year,b.aggregate(e,["year"]).then(function(b){var d,e,f;return e=function(){var a,c,e,f;for(e=b.data.drilldown,f=[],a=0,c=e.length;c>a;a++)d=e[a],f.push(d.year);return f}(),c.years=e.sort(),!c.year||(f=c.year,a.call(c.years,f)<0)?c.year=c.years[c.years.length-1]:void 0})},c.$watch("cuts",d,!0)}}}])}.call(this),function(){angular.module("fgvApp").directive("breadcrumb",["$state","routing",function(a,b){return{restrict:"E",templateUrl:"/views/partials/breadcrumb.html",link:function(a,c){var d;return d=function(d){var e,f;for(e=0,f=d.length;f>e;e++)c=d[e],c.url=b.href(c);return a.breadcrumb=d,$("#treemap_breadcrumb > li > span.atLevel").tipsy({clsStyle:"breadcrumb",gravity:"s",opacity:"1"})},a.$watch(b.getBreadcrumb,d,!0)}}}])}.call(this),function(){var a={}.hasOwnProperty;angular.module("fgvApp").controller("TreemapCtrl",["$scope","routing",function(b,c){var d,e,f,g,h,i;return d=["funcao","subfuncao","orgao","uo","mod_aplic","elemento_despesa"],b.back=c.back,b.treemapOnClick=function(a){var b,e;return b={id:parseInt(a.data.name),label:a.name,type:a.data.node.taxonomy},e=d[d.length-1],b.type!==e?c.updateState(b):void 0},b.$watch("year",function(a){var b;return b={id:a,type:"year"},b.id?c.updateState(b):void 0}),h=function(a){var c;return c=a[0],c?b.year=c.id.toString():void 0},g=function(c){var d,e,f;e={};for(f in c)a.call(c,f)&&(d=c[f],e[d.type]=parseInt(d.id));return b.cuts=e},f=function(a){var c,e;return e=a[a.length-1].type,c=d.indexOf(e)+1,b.currentDrilldown=d[c]},i=function(a){var c;return c=a[0],b.yearCut={year:c.id}},e=function(a){return a.length?(h(a),g(a),f(a),i(a)):void 0},b.$watch(c.getBreadcrumb,e,!0)}])}.call(this);