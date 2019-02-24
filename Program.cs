using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

// namespace Movies
// {
//   public class Program
//   {
//     public static void Main(string[] args)
//     {
//       CreateWebHostBuilder(args).Build().Run();
//     }

//     public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
//         WebHost.CreateDefaultBuilder(args)
//             .UseStartup<Startup>();
//   }
// }

// using System;

namespace MoviesModel
{
  public class Program
  {
    public static void Main()
    {
      using (var db = new MoviesContext())
      {
        db.Movies.Add(new Movie { Name = "Inception", Year = 2019, Category = "Sci-Fi", Rating = 3 });
        var count = db.SaveChanges();
        Console.WriteLine("{0} records saved to database", count);

        Console.WriteLine();
        Console.WriteLine("All movies in database:");
        foreach (var movie in db.Movies)
        {
          Console.WriteLine(" - {0}", movie.Name);
        }
      }
    }
  }
}
