using Microsoft.EntityFrameworkCore;
using dotnet_shop.Models;  

namespace dotnet_shop.Data  
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Products 테이블과 연동되는 DbSet 설정
        public DbSet<Product> Products { get; set; }
    }
}
