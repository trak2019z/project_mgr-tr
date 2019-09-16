﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using File = DAL.Models.File;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly FileUploadConfig _config;
        private readonly IUnitOfWork _unitOfWork;
        public UploadController(IOptions<AppSettings> config, ILogger<UploadController> logger, IUnitOfWork unitOfWork)
        {
            _config = config.Value.FileUploadConfig;
            _unitOfWork = unitOfWork;
        }


        [HttpPost("file"), DisableRequestSizeLimit]
        public ActionResult UploadFile()
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

                    uploadedFile.FullPath = fullPath;
                    uploadedFile.Downloads = 0;
                    uploadedFile.CreatedDate = DateTime.Now;
                    uploadedFile.UpdatedDate = DateTime.Now;

                    _unitOfWork.Files.Add(uploadedFile);
                    _unitOfWork.SaveChanges();
                }
                return Ok(new { uploadedFile });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("images"), DisableRequestSizeLimit]
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

                    uploadedImage.FullPath = fullPath;
                    uploadedImage.CreatedDate = DateTime.Now;
                    uploadedImage.UpdatedDate = DateTime.Now;

                    _unitOfWork.Images.Add(uploadedImage);
                    _unitOfWork.SaveChanges();
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
