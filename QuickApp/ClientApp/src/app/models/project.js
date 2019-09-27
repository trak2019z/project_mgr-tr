"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var auditableEntity_1 = require("./auditableEntity");
var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project(name, author, description, shortDescription) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.author = author;
        _this.description = description;
        _this.shortDescription = shortDescription;
        return _this;
    }
    return Project;
}(auditableEntity_1.AuditableEntity));
exports.Project = Project;
var GetProjectsResponse = /** @class */ (function (_super) {
    __extends(GetProjectsResponse, _super);
    function GetProjectsResponse(name, author, description, shortDescription, projectFileId, images) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.author = author;
        _this.description = description;
        _this.shortDescription = shortDescription;
        _this.projectFileId = projectFileId;
        _this.images = images;
        return _this;
    }
    return GetProjectsResponse;
}(auditableEntity_1.AuditableEntity));
exports.GetProjectsResponse = GetProjectsResponse;
var ProjectFile = /** @class */ (function (_super) {
    __extends(ProjectFile, _super);
    function ProjectFile(id, downloads, path) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.downloads = downloads;
        _this.path = path;
        return _this;
    }
    return ProjectFile;
}(auditableEntity_1.AuditableEntity));
exports.ProjectFile = ProjectFile;
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(id, path) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.path = path;
        return _this;
    }
    return Image;
}(auditableEntity_1.AuditableEntity));
exports.Image = Image;
//# sourceMappingURL=project.js.map