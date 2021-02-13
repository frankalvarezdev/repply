"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fuse_js_1 = __importDefault(require("fuse.js"));
var data_1 = __importDefault(require("./data"));
module.exports = function (text, config) {
    if (config === void 0) { config = {
        data: null, default_data: true, error_message: "Lo siento, no puedo entender lo que tratas de decir"
    }; }
    var data;
    config = {
        data: typeof config.data !== 'undefined' ? config.data : null,
        default_data: typeof config.default_data !== 'undefined' ? config.default_data : true,
        error_message: typeof config.error_message !== 'undefined' ? config.error_message : "Lo siento, no puedo entender lo que tratas de decir"
    };
    if (config.data != null && config.default_data) {
        data = __spreadArrays(data_1.default, config.data);
    }
    else if (config.data != null) {
        data = config.data;
    }
    else {
        data = data_1.default;
    }
    var fuseOptions = {
        includeScore: true,
        keys: ['text']
    };
    var fuse = new fuse_js_1.default(data, fuseOptions);
    var result = fuse.search((text).toUpperCase());
    var scoreData = 0;
    var reply = null;
    result.forEach(function (res) {
        var score = parseFloat((res.score).toString().slice(0, 5));
        if (score > scoreData) {
            scoreData = score;
            var n = Math.floor(Math.random() * (res.item.reply).length);
            reply = res.item.reply[n];
        }
    });
    if (scoreData > 0.6) {
        return reply;
    }
    else {
        return config.error_message;
    }
};
