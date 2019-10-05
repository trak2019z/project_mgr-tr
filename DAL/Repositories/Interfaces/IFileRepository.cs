using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IFileRepository : IRepository<File>
    {
        void AddDownload(Guid id);
        File Get(Guid id);
    }
}
