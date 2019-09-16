using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;
using DAL.Models;
using System.Collections.Generic;
using System.Net;
using DAL.Repositories.Interfaces;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet("projects")]
        public IEnumerable<Project> GetAll()
        {
            return _projectRepository.GetAll();
        }

        [HttpGet("create")]
        public HttpStatusCode Create(Project project)
        {
            try
            {
                _projectRepository.Add(project);
                return HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }
        }

    }
}