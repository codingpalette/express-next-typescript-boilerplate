"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        // return res.status(200).json({isError: true, message: '로그인이 필요합니다.'})
        res.status(401).send('로그인이 필요합니다.');
    }
};
exports.isLoggedIn = isLoggedIn;
var isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        // return res.status(200).json({isError: true, message: '로그인하지 않는 사용자만 접근 가능합니다.'})
        res.status(401).send('로그인하지 않는 사용자만 접근 가능합니다.');
    }
};
exports.isNotLoggedIn = isNotLoggedIn;
