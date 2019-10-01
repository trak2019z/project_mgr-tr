using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;
using DAL.Models;
using System.Collections.Generic;
using System.Net;
using DAL;
using DAL.Repositories.Interfaces;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    public class ProjectsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("")]
        public IEnumerable<Project> GetAll()
        {
            return _unitOfWork.Projects.GetAll();
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

        [HttpPost("delete")]
        [Authorize(Authorization.Policies.DeleteProjectsPolicy)]
        public HttpStatusCode Delete(int id)
        {
            try
            {
               var project = _unitOfWork.Projects.Get(id);
                _unitOfWork.Projects.Remove(project);
                _unitOfWork.SaveChanges();
                return HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }
        }
    }
}