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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var promises_1 = require("fs/promises");
// Aconex API base URL
var API_BASE_URL = 'https://api.aconex.com/';
// Aconex project IDs
var PROJECT_1_ID = '1879048422';
var PROJECT_2_ID = '1879048400';
// Aconex login credentials
var USERNAME = 'poleary';
var PASSWORD = 'Auth3nt1c';
// Function to authenticate with Aconex and obtain an access token
function authenticate() {
    return __awaiter(this, void 0, void 0, function () {
        var response, access_token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(API_BASE_URL, "oauth/token"), {
                            grant_type: 'password',
                            username: USERNAME,
                            password: PASSWORD,
                        })];
                case 1:
                    response = _a.sent();
                    access_token = response.data.access_token;
                    return [2 /*return*/, access_token];
                case 2:
                    error_1 = _a.sent();
                    throw new Error('Authentication failed');
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Function to upload a document to a project
function uploadDocument(accessToken, projectId, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent, response, documentId, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, promises_1.readFile)(filePath, 'utf-8')];
                case 1:
                    fileContent = _a.sent();
                    return [4 /*yield*/, axios_1.default.post("".concat(API_BASE_URL, "v1/projects/").concat(projectId, "/documents"), {
                            content: fileContent,
                            // Add other document properties as required
                        }, {
                            headers: {
                                Authorization: "Bearer ".concat(accessToken),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    documentId = response.data.documentId;
                    return [2 /*return*/, documentId];
                case 3:
                    error_2 = _a.sent();
                    throw new Error('Document upload failed');
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to transfer a document from one project to another
function transferDocument(accessToken, sourceProjectId, targetProjectId, documentId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.patch("".concat(API_BASE_URL, "v1/projects/").concat(sourceProjectId, "/documents/").concat(documentId), {
                            projectId: targetProjectId,
                        }, {
                            headers: {
                                Authorization: "Bearer ".concat(accessToken),
                            },
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    throw new Error('Document transfer failed');
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Main function to transfer documents between projects
function transferDocuments() {
    return __awaiter(this, void 0, void 0, function () {
        var accessToken, documentIds, i, filePath, documentId, _i, documentIds_1, documentId, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, authenticate()];
                case 1:
                    accessToken = _a.sent();
                    documentIds = [];
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i <= 10)) return [3 /*break*/, 5];
                    filePath = "/path/to/document_".concat(i, ".pdf");
                    return [4 /*yield*/, uploadDocument(accessToken, PROJECT_1_ID, filePath)];
                case 3:
                    documentId = _a.sent();
                    documentIds.push(documentId);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    _i = 0, documentIds_1 = documentIds;
                    _a.label = 6;
                case 6:
                    if (!(_i < documentIds_1.length)) return [3 /*break*/, 9];
                    documentId = documentIds_1[_i];
                    return [4 /*yield*/, transferDocument(accessToken, PROJECT_1_ID, PROJECT_2_ID, documentId)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log('Documents transferred successfully!');
                    return [3 /*break*/, 11];
                case 10:
                    error_4 = _a.sent();
                    console.error('An error occurred:', error_4.message);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
// Run the document transfer
transferDocuments();
