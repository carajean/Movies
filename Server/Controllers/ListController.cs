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
   [Route("api/list")]
   public class ListController : Controller
   {
     private moviesContext db = new moviesContext();

     // GET: api/list
     [HttpGet]
     public IEnumerable<List> Get()
     {
       return db.List.ToList();
     }

     // GET api/list/:id
     [HttpGet("{id}")]
     public string Get(int id)
     {
       {
         var movie = db.List.First(t => t.Id == id);
         return movie.ToString();
       }
     }

     // POST api/list
     [HttpPost]
     public void Post([FromBody]JObject value)
     {
       List posted = value.ToObject<List>();
       {
         db.List.Add(posted);
         db.SaveChanges();
       }
     }

     // PUT api/list/5
     [HttpPut("{id}")]
     public void Put(int id, [FromBody]JObject value)
     {
       List posted = value.ToObject<List>();
       posted.Id = id; // Ensure an id is attached
       {
         db.List.Update(posted);
         db.SaveChanges();
       }
     }

     // DELETE api/list/5
     [HttpDelete("{id}")]
     public void Delete(int id)
     {
       {
         if (db.List.Where(t => t.Id == id).Count() > 0) // Check if element exists
           db.List.Remove(db.List.First(t => t.Id == id));
         db.SaveChanges();
       }
     }
   }
 }
