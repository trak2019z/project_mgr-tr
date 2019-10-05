using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Security;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        FileController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public HttpStatusCode AddDownload(int id)
        {
            try
            {
                _unitOfWork.Files.AddDownload(id);
                return HttpStatusCode.OK;
            }
            catch (Exception e)
            {
                return HttpStatusCode.InternalServerError;
            }
        }
    }
}