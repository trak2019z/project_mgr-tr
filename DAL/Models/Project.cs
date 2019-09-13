namespace DAL.Models
{
    public class Project : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string LinkToFile { get; set; }
        public string Images { get; set; }
    }
}
