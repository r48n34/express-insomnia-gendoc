"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeGenDoc = void 0;
var fs_1 = __importDefault(require("fs"));
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
var nanoid_1 = require("nanoid");
function routeGenDoc(app, currentPort, options) {
    return __awaiter(this, void 0, void 0, function () {
        var routeGenOptions, currentTime, routeObj, wrkUid, envAndjarId, envUid, spcUid, routeArr, expressRouterArr, pushedFlag, _i, expressRouterArr_1, v, apiDoc;
        return __generator(this, function (_a) {
            routeGenOptions = __assign({ collectionsName: "My API Router", documentsName: "insomnia_doc", export_source: "insomnia.desktop.app:v2022.5.1" }, options);
            currentTime = new Date().getTime();
            routeObj = {
                "_type": "export",
                "__export_format": 4,
                "__export_date": new Date(),
                "__export_source": routeGenOptions.export_source,
            };
            wrkUid = "wrk_" + (0, nanoid_1.nanoid)(32) //"wrk_2a2d 9d72 ee23 45da b928 a28f a015 f623"
            ;
            envAndjarId = (0, nanoid_1.nanoid)(40);
            envUid = "env_" + envAndjarId //"env_149d 10b8 b1b2 20b5 6a51 998d 14ff 244c 039b 6c15"
            ;
            spcUid = "spc_" + (0, nanoid_1.nanoid)(32) //"spc_0103 7dc5 0361 48f3 860b b00b 3303 6a48"
            ;
            routeArr = [];
            expressRouterArr = (0, express_list_endpoints_1.default)(app);
            pushedFlag = false;
            for (_i = 0, expressRouterArr_1 = expressRouterArr; _i < expressRouterArr_1.length; _i++) {
                v = expressRouterArr_1[_i];
                apiDoc = {
                    "_id": "req_" + (0, nanoid_1.nanoid)(32),
                    "parentId": wrkUid,
                    "modified": currentTime + 3,
                    "created": currentTime,
                    "url": "http://localhost:".concat(currentPort).concat(v.path),
                    "name": "".concat(v.path),
                    "description": "",
                    "method": v.methods[0],
                    "body": {},
                    "parameters": [],
                    "headers": [],
                    "authentication": {},
                    "metaSortKey": -1 * currentTime,
                    "isPrivate": false,
                    "settingStoreCookies": true,
                    "settingSendCookies": true,
                    "settingDisableRenderRequestBody": false,
                    "settingEncodeUrl": true,
                    "settingRebuildPath": true,
                    "settingFollowRedirects": "global",
                    "_type": "request"
                };
                routeArr.push(apiDoc);
                if (!pushedFlag) {
                    routeArr.push({
                        "_id": wrkUid,
                        "parentId": null,
                        "modified": currentTime + 2,
                        "created": currentTime,
                        "name": routeGenOptions.collectionsName,
                        "description": "generated router",
                        "scope": "collection",
                        "_type": "workspace"
                    });
                    pushedFlag = true;
                }
            }
            routeArr.push({
                "_id": envUid,
                "parentId": wrkUid,
                "modified": currentTime,
                "created": currentTime,
                "name": "Base Environment",
                "data": {},
                "dataPropertyOrder": null,
                "color": null,
                "isPrivate": false,
                "metaSortKey": currentTime,
                "_type": "environment"
            }, {
                "_id": spcUid,
                "parentId": wrkUid,
                "modified": currentTime,
                "created": currentTime,
                "fileName": routeGenOptions.collectionsName,
                "contents": "",
                "contentType": "yaml",
                "_type": "api_spec"
            });
            routeObj["resources"] = routeArr;
            try {
                fs_1.default.writeFileSync(routeGenOptions.documentsName + ".json", JSON.stringify(routeObj));
                console.log("Success writing ".concat(routeGenOptions.documentsName, ".json"));
            }
            catch (error) {
                console.log("writing files error");
            }
            return [2 /*return*/];
        });
    });
}
exports.routeGenDoc = routeGenDoc;
