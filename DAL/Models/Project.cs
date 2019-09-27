using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Project : AuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public File ProjectFile { get; set; }
        public Image  Images { get; set; }
        public int Views { get; set; }

        public Project()
        {
            CreatedDate = DateTime.Now;
            UpdatedDate = DateTime.Now;
            Views = 0;
        }
    }
}
