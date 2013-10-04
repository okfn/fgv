'use strict';
'use strict';

angular.module("ngSocial").directive('ngSocialFacebook', function() {
    var options = {
        counter: {
            url: 'http://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=JSON_CALLBACK',
            getNumber: function(data) {
                return data.data[0].total_count;
            }
        },
        popup: {
            url: 'http://www.facebook.com/sharer/sharer.php?u={url}',
            width: 600,
            height: 500
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-facebook');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
'use strict';

angular.module("ngSocial").directive('ngSocialTwitter', function() {
    var options = {
        counter: {
            url: 'http://urls.api.twitter.com/1/urls/count.json?url={url}&callback=JSON_CALLBACK',
            getNumber: function(data) {
                return data.count;
            }
        },
        popup: {
            url: 'http://twitter.com/intent/tweet?url={url}&text={title}',
            width: 600,
            height: 450
        },
        click: function(options) {
            // Add colon to improve readability
            if (!/[\.:\-–—]\s*$/.test(options.pageTitle)) options.pageTitle += ':';
            return true;
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-twitter');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
'use strict';

angular.module("ngSocial").directive('ngSocialGooglePlus', function() {
    var options = {
        popup: {
            url: 'https://plus.google.com/share?url={url}',
            width: 700,
            height: 500
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope, $http) {
            /*var url = 'https://plusone.google.com/_/+1/fastbutton?url=' + encodeURIComponent('http://news.mistinfo.com/');
            $.get(url, function (data) { console.info(data);
                    var aggregate = $('#aggregateCount', data).html(),
                        exactMatch = $('script', data).html().match('\\s*c\\s*:\\s*(\\d+)');

                    $scope.count = exactMatch ? exactMatch[1] + ' (' + aggregate + ')' : aggregate;
                }
            );*/
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-google-plus');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
'use strict';

angular.module("ngSocial").directive('ngSocialVk', function() {
    var options = {
        counter:{
            url: 'http://vkontakte.ru/share.php?act=count&url={url}&index={index}',
            get: function(jsonUrl, deferred, $http) {
                if (!options._) {
                    options._ = [];
                    if (!window.VK) window.VK = {};
                    window.VK.Share = {
                        count: function(idx, number) {
                            options._[idx].resolve(number);
                        }
                    };
                }

                var index = options._.length;
                options._.push(deferred);
                $http.jsonp(jsonUrl.replace('{index}', index));
            }
        },
        popup: {
            url: 'http://vk.com/share.php?url={url}&title={title}&description={description}&image={image}',
            width: 550,
            height: 330
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-vk');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
'use strict';

angular.module("ngSocial").directive('ngSocialOdnoklassniki', function() {
    var options = {
        counter: {
            url: 'http://www.odnoklassniki.ru/dk?st.cmd=shareData&ref={url}&cb=JSON_CALLBACK',
            getNumber: function(data) {
                return data.count;
            }
        },
        popup: {
            url: 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl={url}',
            width: 550,
            height: 360
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-odnoklassniki');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
'use strict';

angular.module("ngSocial").directive('ngSocialMailru', function() {
    var options = {
        counter: {
            url: 'http://connect.mail.ru/share_count?url_list={url}&callback=1&func=JSON_CALLBACK',
            getNumber: function(data) {
                for (var url in data) if (data.hasOwnProperty(url)) {
                    return data[url].shares;
                }
            }
        },
        popup: {
            url: 'http://connect.mail.ru/share?share_url={url}&title={title}',
            width: 550,
            height: 360
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-mailru');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
'use strict';

angular.module("ngSocial").directive('ngSocialPinterest', function() {
    var options = {
        counter: {
            url: 'http://api.pinterest.com/v1/urls/count.json?url={url}&callback=JSON_CALLBACK',
            getNumber: function(data) {
                return data.count;
            }
        },
        popup: {
            url: 'http://pinterest.com/pin/create/button/?url={url}&description={title}',
            width: 630,
            height: 270
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-pinterest');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
'use strict';

angular.module("ngSocial").directive('ngSocialGithubForks', function() {
    var options = {
        counter: {
            url: 'https://api.github.com/repos/{user}/{repository}?callback=JSON_CALLBACK',
            getNumber: function(data) {
                return data.data.forks_count;
            }
        },
        clickUrl: 'https://github.com/{user}/{repository}/'
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-github ng-social-github-forks');
            if (!ctrl) {
                return;
            }
            options.urlOptions = {
                'user': attrs.user,
                'repository': attrs.repository
            };
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
'use strict';

angular.module("ngSocial").directive('ngSocialGithub', function() {
    var options = {
        counter: {
            url: 'https://api.github.com/repos/{user}/{repository}?callback=JSON_CALLBACK',
            getNumber: function(data) {
                return data.data.watchers_count;
            }
        },
        clickUrl: 'https://github.com/{user}/{repository}/'
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-github');
            if (!ctrl) {
                return;
            }
            options.urlOptions = {
                'user': attrs.user,
                'repository': attrs.repository
            };
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});
angular.module('ngSocial').run(['$templateCache', function ($templateCache) {
	$templateCache.put('/views/buttons.html', '<div class="ng-social-container ng-cloak"><ul class="ng-social" ng-transclude></ul></div>');
}]);