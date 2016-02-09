var app = app || {};

app.userController = (function() {
    function UserController() {
    }

    UserController.prototype.register = function(username, password, repeatPassword) {
        var _this = this;
        var newAdmin = new Admin(username, password, repeatPassword);
        //var frozen = newAdmin.freeze();
        var resultingJson;
        $.getJSON('jsonDB/admins.json', function (json) {
            json.admins.forEach(function(a){
                if(a.username === username) {
                    throw new Error('Username already exists');
                }
            });
            json.admins.push(newAdmin);
            resultingJson = json;
        }).then(function() {
            var saveData = {
                method: 'saveAdmin',
                json: JSON.stringify(resultingJson)
            };

            $.post('api/admins.php', saveData, function (response) {
                $.parseHTML(response);
            }).success(function (data) {
                console.log('Success: ' + data);
            }).error(function (error) {
                console.log('Error: ' + error);
            }).complete(function (status) {
                _this.login(username, password);
            });
        })
    };

    UserController.prototype.login = function(username, password) {
        $.getJSON('jsonDB/admins.json', function (json) {
            json.admins.forEach(function(a){
                if(username === a.username) {
                    if(password === sjcl.decrypt('password', a.password)) {
                        localStorage['sessionCookie'] = username.hashCode() + new Date().getTime();
                        localStorage['username'] = username;
                        var data = {
                            method:'saveSession',
                            data: JSON.stringify({
                                username: username,
                                sessionCookie: localStorage['sessionCookie']
                            })
                        };

                        $.post('api/admins.php', data, function (response) {
                            $.parseHTML(response);
                        }).success(function (data) {
                            console.log('Success: ' + data);
                        }).error(function (error) {
                            console.log('Error: ' + error);
                        }).complete(function (status) {
                            window.location.replace("./events.html");
                        });
                        return false;
                    } else {
                        console.log(a);
                    }
                }
            })
        })
    };

    UserController.prototype.logout = function() {
        var data = {
            method : 'deleteSession',
            data: JSON.stringify({
                username:localStorage['username'],
                sessionCookie:localStorage['sessionCookie']
            })
        };

        delete localStorage['sessionCookie'];
        delete localStorage['username'];

        $.post('api/admins.php', data, function (response) {
            $.parseHTML(response);
        }).success(function (data) {
            console.log('Success: ' + data);
        }).error(function (error) {
            console.log('Error: ' + error);
        }).complete(function (status) {
            window.location.replace("./events.html");
        });
    };

    UserController.prototype.checkSession = function() {
        var defer = Q.defer();
        if(localStorage['sessionCookie'] && localStorage['username']) {
            var checkString = JSON.stringify({
                username: localStorage['username'],
                sessionCookie: localStorage['sessionCookie']
            });

            $.getJSON('jsonDB/sessions.json', function(json){
                for (var i in json.sessions) {
                    if(json.sessions[i] === checkString) {
                        defer.resolve(true);
                        return true;
                    }
                }
                defer.reject(false);
            });
        } else {
            defer.reject(false)
        }
        return defer.promise;
    };

    return new UserController();
}());