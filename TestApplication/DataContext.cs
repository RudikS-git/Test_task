using System;
using Microsoft.EntityFrameworkCore;
using TestApplication.Models;

namespace TestApplication
{
    public class DataContext : DbContext
    {
        public DbSet<Person> People { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>(options =>
            {
                options.HasKey(u => u.Id);
                options.Property(u => u.Registration).IsRequired().HasColumnType("date");
                options.Property(u => u.LastActivity).IsRequired().HasColumnType("date");

                options.HasCheckConstraint("CK_People_LastActivity", "\"LastActivity\" >= \"Registration\"");
            });
        }

    }
    
}
