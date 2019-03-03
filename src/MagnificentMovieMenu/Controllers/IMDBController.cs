using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using MagnificentMovieMenu.azureDB;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Hasseware.TheMovieDB;

public static async Task Sample(CancellationToken cancellationToken)
{
  using (var client = new ServiceClient("<ApiKey>"))
  {
    for (int i = 1, count = 1000; i <= count; i++)
    {
      var movies = await client.Movies.GetTopRatedAsync(null, i, cancellationToken);
      count = movies.PageCount; // keep track of the actual page count

      foreach (Movie m in movies.Results)
      {
        var movie = await client.Movies.GetAsync(m.Id, null, true, cancellationToken);

        var personIds = movie.Credits.Cast.Select(s => s.Id)
          .Union(movie.Credits.Crew.Select(s => s.Id));

        foreach (var id in personIds)
        {
          var person = await client.People.GetAsync(id, true, cancellationToken);

          foreach (var img in person.Images.Results)
          {
            string filepath = Path.Combine("People", img.FilePath.TrimStart('/'));
            await DownloadImage(img.FilePath, filepath, cancellationToken);
          }
        }
      }
    }
  }
}

