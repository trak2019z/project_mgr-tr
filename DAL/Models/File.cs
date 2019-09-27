using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class File : AuditableEntity
    {
        public Guid Id { get; set; }
        public int Downloads { get; set; }
        public string Path { get; set; }

        public File()
        {
            Id = Guid.NewGuid();
            UpdatedDate = DateTime.Now;
            CreatedDate = DateTime.Now;
            Downloads = 0;
        }

        //public File(DateTime updatedDate,DateTime createdDate,Guid id,int downloads, string path )
        //{
        //    Id = id;
        //    UpdatedDate = updatedDate;
        //    CreatedDate = createdDate;
        //    Downloads = downloads;
        //    Path = path;
        //}
    }
}
