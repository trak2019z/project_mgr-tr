using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectRepository(DbContext context) : base(context)
        {
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext) _context;

        public override IEnumerable<Project> GetAll()
        {
            return _appContext.Projects.Include(nameof(Project.ProjectFile)).Include(nameof(Project.Images)).ToList();
        }

        public override Project Get(int id) =>
            _appContext.Projects.Include(nameof(Project.ProjectFile)).Include(nameof(Project.Images)).FirstOrDefault(p=>p.Id==id);


        public void AddView(int id)
        {
            var project = _appContext.Projects.Find(id);
            project.Views = +1;
            _appContext.Projects.Update(project);
            _appContext.SaveChanges();
        }
    }
}
