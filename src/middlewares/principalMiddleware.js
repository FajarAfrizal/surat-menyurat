const flaverr = require('flaverr');

const AuthhorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.position)) {
            throw flaverr('E_UNAUTHORIZED',Error('Unauthorized to access this route'));          
        }
        next();
    }
}


module.exports = {
    AuthhorizeRoles
}