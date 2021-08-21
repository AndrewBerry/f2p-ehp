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
exports.corsMiddleware = void 0;
function corsMiddleware(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.set("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
        ctx.set("Access-Control-Max-Age", "600");
        ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
        ctx.set("Access-Control-Allow-Credentials", "true");
        ctx.set("Access-Control-Allow-Headers", "content-type");
        yield next();
    });
}
exports.corsMiddleware = corsMiddleware;
//# sourceMappingURL=corsMiddleware.js.map