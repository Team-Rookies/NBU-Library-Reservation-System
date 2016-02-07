var Admin = (function () {
    function Admin(username, password, repeatPassword) {
        this.username = username;
        var valid = validatePassword(password, repeatPassword);
        if(valid === 0) {
            this.password = sjcl.encrypt('password', password);
        } else {
            throw Error('Passwords do not match');
        }
    }

    //Admin.prototype.freeze = function() {
    //    //return Object.freeze(this);
    //};

    //Admin.prototype.grantDeleteRights = function(admin) {
    //    if(admin && admin.allowDelete) {
    //        this.allowDelete = true;
    //    } else {
    //        throw Error('User does not have rights to grant delete function access');
    //    }
    //};

    function validatePassword(password, repeatPassword) {
        return password.localeCompare(repeatPassword);
    };

    return Admin;
}());