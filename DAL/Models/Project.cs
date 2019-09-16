using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class Project : AuditableEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public File ProjectFile { get; set; }
        public List<Image>  Images { get; set; }
        public int Views { get; set; }


        public Project()
        {
            Id = Guid.NewGuid();
            CreatedDate = DateTime.Now;
            UpdatedDate =DateTime.Now;
            Views = 0;
        }
    }
}
