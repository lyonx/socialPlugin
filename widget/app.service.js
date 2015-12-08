'use strict';

(function (angular, buildfire) {
    angular.module('socialPluginWidget')
        .provider('Buildfire', [function () {
            var Buildfire = this;
            Buildfire.$get = function () {
                return buildfire
            };
            return Buildfire;
        }])
        .factory('Location', [function () {
            var _location = location;
            return {
                go: function (path) {
                    _location.href = path;
                },
                goToHome: function () {
                    _location.href = _location.href.substr(0, _location.href.indexOf('#'));
                }
            };
        }])
        .factory("SocialDataStore", ['Buildfire', '$q', 'SERVER_URL', '$http', 'Upload', function (Buildfire, $q, SERVER_URL, $http, Upload) {
            return {
                createPost: function (postData) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    console.log('buildfire is: >>>>>', Buildfire.context);
                    postDataObject.id = '1';
                    postDataObject.method = 'thread/add';
                    postDataObject.params = postData || {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.secureToken = null;
                    postDataObject.params.userToken = 'ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=' || localStorage.getItem('user') && localStorage.getItem('user').userToken;
                    postDataObject.params.parentThreadId = '564f676cfbe10b9c240002ff' || Buildfire.context.appId + Buildfire.context.instanceId;
                    postDataObject.userToken = null;
                    console.log(postDataObject);
                    if (localStorage.getItem('user'))
                        postData.params.userToken = localStorage.getItem('user').userToken;
                    var successCallback = function (response) {
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    /*$http.get('http://social.kaleoapps.com/src/server.js?data={"id":1,"method":"thread/add","params":{"appId":"551ae57f94ed199c3400002e","parentThreadId":"564f676cfbe10b9c240002ff","userToken":"ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=","text":"testThread","title":"","imageUrl":null,"secureToken":null},"userToken":null}').then(successCallback, errorCallback);*/
                    return deferred.promise;
                },
                getPosts: function (data) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'thread/findByPage';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.parentThreadId = '564f676cfbe10b9c240002ff' || Buildfire.context.appId + Buildfire.context.instanceId;
                    postDataObject.params.lastThreadId = data.lastThreadId;
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                getUsers: function (userIdsArray) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'users/getUsers';
                    postDataObject.params = {};
                    postDataObject.params.userIds = userIdsArray || [];
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                addComment: function (data) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'threadComments/add';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.threadId = data.threadId;
                    postDataObject.params.comment = data.comment;
                    postDataObject.params.attachedImage = data.imageUrl;
                    postDataObject.params.userToken = 'ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=' || localStorage.getItem('user') && localStorage.getItem('user').userToken;
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        console.log('add Comment callback recieved--------------', response);
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        console.log('add Comment callback recieved--Error------------', err);
                        return deferred.reject(err);
                    };
                    console.log('Data----------------------------in add comment method--------',JSON.stringify(postDataObject));
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                getThreadByUniqueLink: function (threadUniqueLink) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'thread/getThread';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.uniqueLink = threadUniqueLink;
                    postDataObject.params.userToken = null;
                    postDataObject.params.title = null;
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        console.log('get Post callback recieved--------------', response);
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        console.log('get Post callback recieved--Error------------', err);
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                getCommentsOfAPost:function(data){
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'threadComments/findByPage';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.threadId = data.threadId;
                    postDataObject.params.lastCommentId = data.lastCommentId || null;
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        console.log('get Comment callback recieved--------------', response);
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        console.log('get Comment callback recieved--Error------------', err);
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                addThreadLike: function (post, type){
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'threadLikes/add';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.threadId = post._id;
                    postDataObject.params.userToken = 'ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=' || localStorage.getItem('user') && localStorage.getItem('user').userToken;
                    postDataObject.params.parentThreadId = post.parentThreadId || post.threadId;
                    postDataObject.params.additionalInfo = {
                        type: type,
                        refId: post._id,
                        externalAppId: '551ae57f94ed199c3400002e' || Buildfire.context.appId
                    };
                    var successCallback = function (response) {
                        console.log('add like callback recieved--------------', response);
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        console.log('add like callback recieved--Error------------', err);
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                uploadImage: function (file) {
                    var deferred = $q.defer();
                    console.log('inside upload image method : ', file, Upload);
                    Upload.upload({
                        url: SERVER_URL.link + '?method=Image/upload',
                        data: {'files': file, 'userToken': 'ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=' || localStorage.getItem('user') && localStorage.getItem('user').userToken,'secureToken': "null",
                            'appId': "551ae57f94ed199c3400002e"}
                    }).then(function (resp) {
                        console.log('Success uploaded. Response: ' + resp);
                        deferred.resolve(resp);
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                        deferred.reject(resp);
                    });
                    return deferred.promise;
                },
                getUserSettings:function(data){
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'users/getUserSettings';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.threadId = data.threadId;
                    postDataObject.params.userId = "55f8a6c6bed1b418e3000001" || null;
                    postDataObject.userToken = data.userToken ||"c2/F3n4YXQhH9qVR+NTACCUJ70lWJW3zpQQNuU+5PvI=";
                    var successCallback = function (response) {
                        console.log('get Comment callback recieved--------------', response);
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        console.log('get Comment callback recieved--Error------------', err);
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                saveUserSettings:function(){

                },
                getThreadLikes: function (uniqueIds) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'threadLikes/getLikes';
                    postDataObject.params = {};
                    postDataObject.params.uniqueIds = uniqueIds;
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.userId = "5317c378a6611c6009000001" || null;
                    var success = function (response) {
                        return deferred.resolve(response);
                    };
                    var error = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(success, error);
                    return deferred.promise;
                },
                removeThreadLike: function (post, type) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'threadLikes/unlike';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.threadId = post._id;
                    postDataObject.params.userToken = 'ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=' || localStorage.getItem('user') && localStorage.getItem('user').userToken;
                    postDataObject.params.parentThreadId = post.parentThreadId || post.threadId;
                    postDataObject.params.additionalInfo = {
                        type: type,
                        refId: post._id,
                        externalAppId: '551ae57f94ed199c3400002e' || Buildfire.context.appId
                    };
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        console.log('remove like callback recieved--------------', response);
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        console.log('remove like callback recieved--Error------------', err);
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data=' + JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                }
            }
        }])
})(window.angular, window.buildfire);