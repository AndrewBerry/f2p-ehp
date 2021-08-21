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
exports.loaders = void 0;
const serverLoader_1 = require("./serverLoader");
const routerLoader_1 = require("./routerLoader");
function loaders(app) {
    return __awaiter(this, void 0, void 0, function* () {
        yield serverLoader_1.serverLoader(app);
        yield routerLoader_1.routerLoader(app);
    });
}
exports.loaders = loaders;
//# sourceMappingURL=loaders.js.map