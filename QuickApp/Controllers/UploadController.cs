using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using IdentityServer4.AccessTokenValidation;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using QuickApp.ViewModels;
using File = DAL.Models.File;

namespace QuickApp.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]

    public class UploadController : ControllerBase
    {
        private readonly FileUploadConfig _config;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthorizationService _authorizationService;
        public UploadController(IOptions<AppSettings> config, ILogger<UploadController> logger, IUnitOfWork unitOfWork, IAuthorizationService authorizationService)
        {
            _config = config.Value.FileUploadConfig;
            _unitOfWork = unitOfWork;
            _authorizationService = authorizationService;
        }


        [HttpPost("file"), DisableRequestSizeLimit]
        [Authorize(Authorization.Policies.CreateProjectsPolicy)]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(500)]

        public async Task<ActionResult> UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                var uploadedFile = new File();
                string newPath = Path.Combine(_config.ProjectFilesLocation, uploadedFile.Id.ToString());

                string fullPath = String.Empty;
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    if (newPath.IsNullOrEmpty())
                        throw new InvalidOperationException("File Path is null or empty");
                    
                    uploadedFile.Path = Path.Combine(uploadedFile.Id.ToString(), fileName).Replace(@"\", "/");
                    uploadedFile.Downloads = 0;
                    uploadedFile.CreatedDate = DateTime.Now;
                    uploadedFile.UpdatedDate = DateTime.Now;

                }
                return Ok(new { uploadedFile });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("images"), DisableRequestSizeLimit]
        [Authorize(Authorization.Policies.CreateProjectsPolicy)]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(500)]
        public ActionResult UploadImage()
        {
            try
            {
                var file = Request.Form.Files[0];
                var uploadedImage = new Image();

                string newPath = Path.Combine(_config.ImagesLocation, uploadedImage.Id.ToString());
                string fullPath = String.Empty;
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    if (newPath.IsNullOrEmpty())
                        throw new InvalidOperationException("Image Path is null or empty");

                    uploadedImage.Path = Path.Combine(uploadedImage.Id.ToString(), fileName).Replace(@"\", "/");


                    uploadedImage.CreatedDate = DateTime.Now;
                    uploadedImage.UpdatedDate = DateTime.Now;

                }
                return Ok(new { uploadedImage });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
