using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using MagnificentMovieMenu.AzureDbContext;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace MagnificentMovieMenu.Controllers
{
  [Produces("application/json")]
  [Route("api/movie")]
  [EnableCors("AllowAll")]

  public class MoviesController : Microsoft.AspNetCore.Mvc.Controller
  {
    private readonly moviesContext db;

    public MoviesController(moviesContext context)
    {
      db = context;
    }

    // GET: api/movie
    [HttpGet]
    [EnableCors("AllowAll")]

    public IEnumerable<Movie> GetMovies()
    {
      return db.Movie;
    }

    // GET api/movie/:slug
    [HttpGet("{slug}")]
    [EnableCors("AllowAll")]

    public string Get(string slug)
    {
      var movie = db.Movie.First(m => m.Slug == slug);
      return movie.ToString();
    }

    // POST api/movie
    [HttpPost]
    [EnableCors("AllowAll")]
    public void Post([FromBody]JObject value)
    {
      Movie posted = value.ToObject<Movie>();
      {
        db.Movie.Add(posted);
        db.SaveChanges();
      }
    }

    // PUT api/movie/:id
    [HttpPut("{id}")]
    [EnableCors("AllowAll")]

    public void Put(int id, [FromBody]JObject value)
    {
      Movie posted = value.ToObject<Movie>();
      posted.Id = id; // Ensure an id is attached
      {
        db.Movie.Update(posted);
        db.SaveChanges();
      }
    }

    // DELETE api/movie/:id
    [HttpDelete("{id}")]
    [EnableCors("AllowAll")]

    public void Delete(int id)
    {
      {
        if (db.Movie.Where(t => t.Id == id).Count() > 0) // Check if element exists
          db.Movie.Remove(db.Movie.First(t => t.Id == id));
        db.SaveChanges();
      }
    }
  }
}
