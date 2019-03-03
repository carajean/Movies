using Microsoft.EntityFrameworkCore.Migrations;

namespace MagnificentMovieMenu.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "movies");

            migrationBuilder.CreateTable(
                name: "list",
                schema: "movies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(11)", nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 45, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_list", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "movie",
                schema: "movies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(11)", nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 45, nullable: false),
                    Year = table.Column<int>(type: "int(11)", nullable: true),
                    Category = table.Column<string>(unicode: false, maxLength: 45, nullable: true),
                    Rating = table.Column<int>(type: "int(11)", nullable: true),
                    Slug = table.Column<string>(unicode: false, maxLength: 45, nullable: true),
                    Img = table.Column<string>(unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "list",
                schema: "movies");

            migrationBuilder.DropTable(
                name: "movie",
                schema: "movies");
        }
    }
}
