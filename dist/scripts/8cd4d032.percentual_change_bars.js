(function(){angular.module("fgvApp").filter("percentual",function(){var a;return a=function(a){var b,c;return b=Math.abs(a),c=b>100?0:b>10?1:2,a.toFixed(c).replace(".",",")},function(b){return a(100*b||0)+"%"}})}).call(this),function(){var a={}.hasOwnProperty;angular.module("fgvApp").directive("percentualChangeBars",["$q","openspending","routing",function(b,c,d){var e,f,g;return f=function(a){return a.reduce(function(a,b){return a[b.type]=b.id,a},{})},e=function(b){var c,d,e,f,g,h;g=100,f=0;for(h in b)a.call(b,h)&&(c=b[h],e=Math.abs(c.delta),e>f&&(f=e));d=function(a){return Math.abs(a*g/f)};for(h in b)a.call(b,h)&&(c=b[h],c.height=d(c.delta));return b},g=function(a,b,d){var g,h,i;return h=f(b),delete h.year,i=[b[b.length-1].type,"year"],g=void 0,c.aggregate(h,i).then(function(b){var c,f,h,i,j,k,l,m,n,o,p,q;for(g=function(){var a,c,e,f;for(e=b.data.drilldown,f=[],a=0,c=e.length;c>a;a++)h=e[a],f.push({label:h.year,value:h.amount/d[h.year]});return f}(),g.sort(function(a,b){return parseInt(a.label)-parseInt(b.label)}),k=g[0].value,j=l=0,o=g.length;o>l;j=++l)c=g[j],0===j?c.delta=0:(i=c.value/k-1,c.delta=i);for(a.bars=e(g),f=[{key:"Percentual",bar:!0,values:[]}],j=m=0,p=g.length;p>m;j=++m)c=g[j],f[0].values.push([parseInt(c.label),c.height]);for(f.push({key:"IPCA",values:[]}),j=n=0,q=g.length;q>n;j=++n)c=g[j],f[1].values.push([parseInt(c.label),c.height*Math.random()]);return console.log(f[1]),console.log(f),a.barsData=f})},{restrict:"E",templateUrl:"/views/partials/percentual_change_bars.html",scope:{year:"="},link:function(a){var b;return c.aggregate(void 0,["year"]).then(function(b){var c,d,e,f,g;for(d={},g=b.data.drilldown,e=0,f=g.length;f>e;e++)c=g[e],d[c.year]=c.amount;return a.totals=d}),b=function(){var b;return b=d.getBreadcrumb(),b&&a.totals?g(a,b,a.totals):void 0},a.$watch(d.getBreadcrumb,b,!0),a.$watch("totals",b)}}}])}.call(this);