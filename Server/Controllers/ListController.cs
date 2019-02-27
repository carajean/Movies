// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using MagnificentMovieMenu.movies;
// using Microsoft.AspNetCore.Mvc;
// using Newtonsoft.Json;
// using Newtonsoft.Json.Linq;

// namespace MagnificentMovieMenu.Controllers
// {
//   [Route("api/movie")]
//   public class ListController : Controller
//   {
//     private moviesContext db = new moviesContext();

//     // GET: api/movie
//     [HttpGet]
//     public IEnumerable<List> Get()
//     {
//       return db.List.ToList();
//     }

//     // GET api/movie/:id
//     [HttpGet("{id}")]
//     public string Get(int id)
//     {
//       {
//         var movie = db.List.First(t => t.Id == id);
//         return movie.ToString();
//       }
//     }

//     // GET api/movie/:category
//     [HttpGet("{category}")]
//     public string Get(string category)
//     {
//       {
//         var movies = db.List.Select(t => t.Category == category);
//         return movies.ToString();
//       }
//     }

//     // POST api/movie
//     [HttpPost]
//     public void Post([FromBody]JObject value)
//     {
//       List posted = value.ToObject<List>();
//       {
//         db.List.Add(posted);
//         db.SaveChanges();
//       }
//     }

//     // PUT api/movie/5
//     [HttpPut("{id}")]
//     public void Put(int id, [FromBody]JObject value)
//     {
//       List posted = value.ToObject<List>();
//       posted.Id = id; // Ensure an id is attached
//       {
//         db.List.Update(posted);
//         db.SaveChanges();
//       }
//     }

//     // DELETE api/movie/5
//     [HttpDelete("{id}")]
//     public void Delete(int id)
//     {
//       {
//         if (db.List.Where(t => t.Id == id).Count() > 0) // Check if element exists
//           db.List.Remove(db.List.First(t => t.Id == id));
//         db.SaveChanges();
//       }
//     }
//   }
// }
