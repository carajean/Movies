using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MoviesModel
{
  public class MoviesContext : DbContext
  {
    public DbSet<Movie> Movies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite("Data Source=movies.db");
    }
  }

  public class Movie
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int Year { get; set; }
    public string Category { get; set; }
    public int Rating { get; set; }
  }
}