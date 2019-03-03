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
  [Route("api/lists")]
  [EnableCors("AllowAll")]

  public class ListsController : Microsoft.AspNetCore.Mvc.Controller
  {
    private readonly moviesContext db;

    public ListsController(moviesContext context)
    {
      db = context;
    }

    // GET: api/list
    [HttpGet]
    public IEnumerable<List> GetLists()
    {
      return db.List;
    }

    // GET api/list/:id
    [HttpGet("{id}")]
    public string Get(int id)
    {
      var list = db.List.First(t => t.Id == id);
      return list.ToString();
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

    // PUT api/list/:id
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
