using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using DAL.Models.Interfaces;

namespace DAL.Models
{
    public class AuditableEntity : IAuditableEntity
    {
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
