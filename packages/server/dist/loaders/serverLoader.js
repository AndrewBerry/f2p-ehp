"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverLoader = void 0;
const bodyParser = require("koa-bodyparser");
const corsMiddleware_1 = require("../middlewares/corsMiddleware");
function serverLoader(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(corsMiddleware_1.corsMiddleware);
        app.use(bodyParser());
        app.keys = process.env.APP_COOKIE_KEY.split(",");
    });
}
exports.serverLoader = serverLoader;
//# sourceMappingURL=serverLoader.js.map