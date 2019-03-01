using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using MagnificentMovieMenu.MagnificentMovieMenu;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace MagnificentMovieMenu.Controllers
{
    [Produces("application/json")]
    [Route("api/movies")]
    [EnableCors("AllowAll")]

    public class MoviesController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly moviesContext db;

        public MoviesController(moviesContext context)
        {
            db = context;
        }

        // GET: api/movies
        [HttpGet]
        public IEnumerable<Movie> GetMovies()
        {
            return db.Movie;
        }

        // GET api/movie/:id
        [HttpGet("{id}")]
        public string Get(int id)
        {
            var movie = db.Movie.First(t => t.Id == id);
            return movie.ToString();
        }

        // POST api/movies
        [HttpPost]
        public void Post([FromBody]JObject value)
        {
            Movie posted = value.ToObject<Movie>();
            {
                db.Movie.Add(posted);
                db.SaveChanges();
            }
        }

        // PUT api/movies/:id
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]JObject value)
        {
            Movie posted = value.ToObject<Movie>();
            posted.Id = id; // Ensure an id is attached
            {
                db.Movie.Update(posted);
                db.SaveChanges();
            }
        }

        // DELETE api/movies/5
        [HttpDelete("{id}")]
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

//[Route("api/[controller]")]
//public class MoviesController : Controller
//{
//    // GET: api/values
//    [HttpGet]
//    public IEnumerable<string> Get()
//    {
//        return new string[] { "value1", "value2" };
//    }

//    // GET api/values/5
//    [HttpGet("{id}")]
//    public string Get(int id)
//    {
//        return "value";
//    }

//    // POST api/values
//    [HttpPost]
//    public void Post([FromBody]string value)
//    {
//    }

//    // PUT api/values/5
//    [HttpPut("{id}")]
//    public void Put(int id, [FromBody]string value)
//    {
//    }

//    // DELETE api/values/5
//    [HttpDelete("{id}")]
//    public void Delete(int id)
//    {
//    }
//}
