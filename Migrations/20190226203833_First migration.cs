using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MagnificentMovieMenu.Migrations
{
    public partial class Firstmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "movies");

            migrationBuilder.CreateTable(
                name: "Movie",
                schema: "movies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(11)", nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 45, nullable: false),
                    Year = table.Column<int>(type: "int(11)", nullable: true),
                    Category = table.Column<string>(unicode: false, maxLength: 45, nullable: true),
                    Rating = table.Column<int>(type: "int(11)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "movies",
                schema: "movies",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(10) unsigned", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    title = table.Column<string>(unicode: false, maxLength: 150, nullable: false),
                    year = table.Column<short>(type: "year(4)", nullable: true),
                    category = table.Column<string>(unicode: false, maxLength: 150, nullable: true),
                    rating = table.Column<int>(type: "int(11)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movies", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Movie",
                schema: "movies");

            migrationBuilder.DropTable(
                name: "movies",
                schema: "movies");
        }
    }
}
