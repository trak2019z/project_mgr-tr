using System;
using DAL;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Services;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IFileService _fileService;

        public FileController(UnitOfWork unitOfWork, IFileService fileService)
        {
            _unitOfWork = unitOfWork;
            _fileService = fileService;
        }


        [HttpGet("download/{id}")]
        public IActionResult DownloadFile(Guid id)
        {
            return _fileService.PrepareFileToDownload(id);
        }
    }
}