using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;
using DAL.Models;
using System.Collections.Generic;
using System.Net;
using DAL;
using Microsoft.Extensions.Options;
using System.IO;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    public class ProjectsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly FileUploadConfig _config;

        public ProjectsController(IUnitOfWork unitOfWork, IOptions<AppSettings> config)
        {
            _unitOfWork = unitOfWork;
            _config = config.Value.FileUploadConfig;
        }

        [HttpGet("")]
        public IEnumerable<Project> GetAll()
        {
            return _unitOfWork.Projects.GetAll();
        }

        [HttpGet("{id}")]
        public Project Get(int id)
        {
            return _unitOfWork.Projects.Get(id);
        }

        [HttpPost("create")]
        [Authorize(Authorization.Policies.CreateProjectsPolicy)]

        public HttpStatusCode Create(Project project)
        {
            try
            {
                _unitOfWork.Projects.Add(project);
                _unitOfWork.SaveChanges();
                return HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Authorization.Policies.DeleteProjectsPolicy)]
        public HttpStatusCode Delete(int id)
        {
            try
            {
               var project = _unitOfWork.Projects.Get(id);
                _unitOfWork.Projects.Remove(project);
                _unitOfWork.SaveChanges();
                System.IO.File.Delete(Path.Combine(_config.ImagesLocation, project.Images.Path));
                System.IO.File.Delete(Path.Combine(_config.ProjectFilesLocation, project.ProjectFile.Path));
                return HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }
        }

        [HttpPost("addview/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(500)]
        public HttpStatusCode AddView(int id)
        {
            try
            {
                _unitOfWork.Projects.AddView(id);
                return HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }
        }
    }
}