using DAL.Repositories;
using DAL.Repositories.Interfaces;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

        ICustomerRepository _customers;
        IProjectRepository _projects;
        IFileRepository _files;
        IImageRepository _images;


        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public ICustomerRepository Customers
        {
            get
            {
                if (_customers == null)
                    _customers = new CustomerRepository(_context);

                return _customers;
            }
        }


        public IProjectRepository Projects
        {
            get
            {
                if (_projects == null)
                    _projects = new ProjectRepository(_context);

                return _projects;
            }
        }

        public IFileRepository Files
        {
            get
            {
                if (_files == null)
                    _files = new FileRepository(_context);
                return _files;
            }
        }


        public IImageRepository Images
        {
            get
            {
                if (_images == null)
                    _images = new ImageRepository(_context);
                return _images;
            }
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
