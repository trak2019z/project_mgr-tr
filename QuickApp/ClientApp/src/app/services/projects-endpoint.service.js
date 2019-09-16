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
var endpoint_base_service_1 = require("./endpoint-base.service");
var ProjectsEndpoint = /** @class */ (function (_super) {
    __extends(ProjectsEndpoint, _super);
    function ProjectsEndpoint(configurations, http, authService) {
        var _this = _super.call(this, http, authService) || this;
        _this.configurations = configurations;
        _this._projectsUrl = '/api/projects/';
        _this._createProjectsUrl = '/api/projects/create';
        return _this;
    }
    return ProjectsEndpoint;
}(endpoint_base_service_1.EndpointBase));
exports.ProjectsEndpoint = ProjectsEndpoint;
//# sourceMappingURL=projects-endpoint.service.js.map