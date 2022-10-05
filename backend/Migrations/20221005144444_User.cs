using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$oy5n26R8aN.kMhrUUYZZgOZp2FMygQaVa1Fm3o91KQ8XAZuIH43Ya");

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$90gYKaaIQNT4TVz0wPlsEOUnEm3LcGiaWLWOv6wW4GJTxTXI/SSdK");

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 3,
                column: "PasswordHash",
                value: "$2a$11$fpXqM4qsNXJqLhiL5.6xLe9PgUm8oV21aB/lUdlMEJCy4OejCmd1u");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$fblKOcsT.KfMeDNQG.2TQuoHdKKqXv1FtceBVFj7E.d6HqVbpDnHW");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$pAsRwnETY2y.a31jiba4p.nGjPG9ubpqy8IY8jTU0GS.zoUkl/mr2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$BuROAYK3JmJVkhoNYA8CHOBkFtenroNnhHM2fZyXOOAb9bYfEjBxe");

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$/1t2OHU4VDHkRfZpy8./YObajrKn4VA1nrMUDo3m0Y3zF8e3K4HFG");

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 3,
                column: "PasswordHash",
                value: "$2a$11$lajNbRSbrWTvGPJWPwk1n.Q/cd3jN9j2G8suCDwcotVgWkC7S2ul2");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$gKsrf/Zfxt5SfA3btVG6fe4etC5iycBSV26h.ufDGzM80Snl7fVTu");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$l1a2WQ8Mn8C4/aiNAJKk4u9r8uDzykd4bG0V3exf./Ld99IKak5ge");
        }
    }
}
