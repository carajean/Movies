using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MagnificentMovieMenu.AzureDbContext
{
  public partial class moviesContext : DbContext
  {
    public moviesContext()
    {
    }

    public moviesContext(DbContextOptions<moviesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<List> List { get; set; }
    public virtual DbSet<Movie> Movie { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        optionsBuilder.UseMySQL("server=moviemenuserver.mysql.database.azure.com;port=3306;user=adminLogin@moviemenuserver;password=Rileyroo1988;database=movies");
      }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

      modelBuilder.Entity<List>(entity =>
      {
        entity.ToTable("list", "movies");

        entity.Property(e => e.Id)
                  .HasColumnType("int(11)")
                  .ValueGeneratedNever();

        entity.Property(e => e.Name)
                  .IsRequired()
                  .HasMaxLength(45)
                  .IsUnicode(false);
      });

      modelBuilder.Entity<Movie>(entity =>
      {
        entity.ToTable("movie", "movies");

        entity.Property(e => e.Id)
                  .HasColumnType("int(11)")
                  .ValueGeneratedNever();

        entity.Property(e => e.Category)
                  .HasMaxLength(45)
                  .IsUnicode(false);

        entity.Property(e => e.Img)
                  .HasMaxLength(255)
                  .IsUnicode(false);

        entity.Property(e => e.Name)
                  .IsRequired()
                  .HasMaxLength(45)
                  .IsUnicode(false);

        entity.Property(e => e.Rating).HasColumnType("int(11)");

        entity.Property(e => e.Slug)
                  .HasMaxLength(45)
                  .IsUnicode(false);

        entity.Property(e => e.Year).HasColumnType("int(11)");
      });
    }
  }
}
