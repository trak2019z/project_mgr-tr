using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Image : AuditableEntity
    {
        public Guid Id { get; set; }
        public string Path { get; set; }

        public Image()
        {
            Id = Guid.NewGuid();
            CreatedDate = DateTime.Now;
            UpdatedDate = DateTime.Now;
        }
    }
}
