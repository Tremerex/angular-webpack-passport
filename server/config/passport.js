import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Strategy as LocalStrategy }  from 'passport-local';
import { Strategy as BearerStrategy} from 'passport-http-bearer';
import http from 'http';

export default (passport) => {

    if (typeof passport === 'undefined')
        throw "passport object is needed";

    passport.use('login', new LocalStrategy({ 
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        (req, email, password, cb) => {
            var cipher = crypto.createCipher('aes192', password);
            var pass = cipher.final('hex');
            req.session.token = jwt.sign({ user: email }, 'secret', { expiresIn: "3 days" });
            var data = { email: email, pass: pass };
            return cb(data);
        })
    );

    passport.use(new BearerStrategy({
            passReqToCallback: true 
        },
        (req, token, next) => {
            if (typeof token !== undefined) {
                if (req.session.token === token) {
                    return next(null, true);
                }
            }
            return next('Unauthorized');
        })
    );

    const authFunction = (req, res, next) => {
        passport.authenticate('bearer', { session: false }, (err, data) => {
            if (err || !data) {
                return res.status(401).send(http.STATUS_CODES[401]);
            }
            return next();
        })(req, res, next);
    }

    return authFunction;

}
