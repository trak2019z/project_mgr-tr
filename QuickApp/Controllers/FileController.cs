using System;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Services;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }


        [HttpGet("download/{id}")]
        public IActionResult DownloadFile(Guid id)
        {
            return _fileService.PrepareFileToDownload(id);
        }
    }
}