using System;
using System.IO;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;

namespace QuickApp.Services
{
    public interface IFileService
    {
        FileContentResult PrepareFileToDownload(Guid fileId);
    }

    public class FileService : IFileService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly FileUploadConfig _config;

        public FileService(IUnitOfWork unitOfWork, IOptions<AppSettings> config)
        {
            _unitOfWork = unitOfWork;
            _config = config.Value.FileUploadConfig;
        }

        public FileContentResult PrepareFileToDownload(Guid fileId)
        {
            var file = _unitOfWork.Files.Get(fileId);
            var filepath = Path.Combine(_config.ProjectFilesLocation, file.Path);

            var mimeType = GetMimeType(Path.GetFileName(filepath));

            var fileBytes = File.ReadAllBytes(filepath);

            _unitOfWork.Files.AddDownload(fileId);

            return new FileContentResult(fileBytes, mimeType)
            {
                FileDownloadName = Path.GetFileName(filepath)
            };
        }

        private string GetMimeType(string fileName)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(fileName, out contentType)) contentType = "application/octet-stream";
            return contentType;
        }
    }
}