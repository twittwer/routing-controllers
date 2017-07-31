"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * "Use middleware" metadata.
 */
var UseMetadata = (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function UseMetadata(args) {
        this.target = args.target;
        this.method = args.method;
        this.middleware = args.middleware;
        this.afterAction = args.afterAction;
    }
    return UseMetadata;
}());
exports.UseMetadata = UseMetadata;

//# sourceMappingURL=UseMetadata.js.map
