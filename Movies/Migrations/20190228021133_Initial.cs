using Microsoft.EntityFrameworkCore.Migrations;

namespace MagnificentMovieMenu.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "movies");

            migrationBuilder.CreateTable(
                name: "List",
                schema: "movies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(11)", nullable: false),
                    List = table.Column<string>(unicode: false, maxLength: 45, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_List", x => x.Id);
                });

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "List",
                schema: "movies");

            migrationBuilder.DropTable(
                name: "Movie",
                schema: "movies");
        }
    }
}
