using System;
using System.Collections.Generic;

namespace MagnificentMovieMenu.azureDB
{
    public partial class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Year { get; set; }
        public string Category { get; set; }
        public int? Rating { get; set; }
        public string Slug { get; set; }
    }
}
