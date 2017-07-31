"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError_1 = require("../http-error/HttpError");
/**
 * Base driver functionality for all other drivers.
 */
var BaseDriver = (function () {
    function BaseDriver() {
        // -------------------------------------------------------------------------
        // Public Properties
        // -------------------------------------------------------------------------
        /**
         * Global application prefix.
         */
        this.routePrefix = "";
    }
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    BaseDriver.prototype.processJsonError = function (error) {
        var _this = this;
        if (!this.isDefaultErrorHandlingEnabled)
            return error;
        var processedError = {};
        if (error instanceof Error) {
            var name_1 = error.name && error.name !== "Error" ? error.name : error.constructor.name;
            if (name_1 && (this.developmentMode || error.message))
                processedError.name = name_1;
            if (error.message)
                processedError.message = error.message;
            if (error.stack && this.developmentMode)
                processedError.stack = error.stack;
            Object.keys(error)
                .filter(function (key) { return key !== "stack" && key !== "name" && key !== "message" && (!(error instanceof HttpError_1.HttpError) || key !== "httpCode"); })
                .forEach(function (key) { return processedError[key] = error[key]; });
            if (this.errorOverridingMap)
                Object.keys(this.errorOverridingMap)
                    .filter(function (key) { return name_1 === key; })
                    .forEach(function (key) { return processedError = _this.merge(processedError, _this.errorOverridingMap[key]); });
            return Object.keys(processedError).length > 0 ? processedError : undefined;
        }
        return error;
    };
    BaseDriver.prototype.processTextError = function (error) {
        if (!this.isDefaultErrorHandlingEnabled)
            return error;
        if (error instanceof Error) {
            if (this.developmentMode && error.stack) {
                return error.stack;
            }
            else if (error.message) {
                return error.message;
            }
        }
        return error;
    };
    BaseDriver.prototype.merge = function (obj1, obj2) {
        var result = {};
        for (var i in obj1) {
            if ((i in obj2) && (typeof obj1[i] === "object") && (i !== null)) {
                result[i] = this.merge(obj1[i], obj2[i]);
            }
            else {
                result[i] = obj1[i];
            }
        }
        for (var i in obj2) {
            result[i] = obj2[i];
        }
        return result;
    };
    return BaseDriver;
}());
exports.BaseDriver = BaseDriver;

//# sourceMappingURL=BaseDriver.js.map
