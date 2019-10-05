using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories
{
    public class FileRepository: Repository<File>, IFileRepository
    {
        public FileRepository(DbContext context) : base(context)
        { }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public void AddDownload(int id)
        {
            var file = _appContext.Files.Find(id);
            file.Downloads += 1;
            _appContext.Files.Update(file);
            _appContext.SaveChanges();
        }
    }
}
