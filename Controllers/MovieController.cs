using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MagnificentMovieMenu.movies;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MagnificentMovieMenu.Controllers
{
    [Route("api/movie")]
    public class MovieController : Controller
    {
        private moviesContext db = new moviesContext();

        // GET: api/movie
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return db.Movie.ToList();
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            {
                var movie = db.Movie.First(t => t.Id == id);
                return movie.Name;
            }
        }

        // POST api/movie
        [HttpPost]
        public void Post([FromBody]JObject value)
        {
            Movie posted = value.ToObject<Movie>();
            {
                db.Movie.Add(posted);
                db.SaveChanges();
            }
        }

        // PUT api/movie/5
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

        // DELETE api/movie/5
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
