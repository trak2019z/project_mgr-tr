
using DAL.Models;
namespace DAL.Repositories.Interfaces
{
    public interface IProjectRepository : IRepository<Project>
    {
        void AddView(int id);
    }
}
