using Microsoft.EntityFrameworkCore;
using Models;

namespace backend;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
    public DbSet<Post> Posts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure the Department enum
        modelBuilder.Entity<Post>()
            .Property(p => p.Department)
            .HasConversion<String>(); // Store as integer in database

        // Alternative: Store as string in database
        // modelBuilder.Entity<Post>()
        //     .Property(p => p.Department)
        //     .HasConversion<string>();

        base.OnModelCreating(modelBuilder);
    }
}
