"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanIgn = void 0;
function cleanIgn(ign) {
    return ign
        .toLowerCase()
        .slice(0, 12)
        .replace(/[^a-z0-9]/g, "_");
}
exports.cleanIgn = cleanIgn;
//# sourceMappingURL=cleanIgn.js.map