using System;
using System.Collections.Generic;

namespace MagnificentMovieMenu.movies
{
    public partial class Movies
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public short? Year { get; set; }
        public string Category { get; set; }
        public int? Rating { get; set; }
    }
}
