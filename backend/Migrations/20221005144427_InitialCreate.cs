using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Classroom",
                columns: table => new
                {
                    ClassroomId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClassroomName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classroom", x => x.ClassroomId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    UserCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    IsFirstLogin = table.Column<bool>(type: "bit", nullable: false),
                    IsDiabled = table.Column<bool>(type: "bit", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    StudentCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    IsFirstLogin = table.Column<bool>(type: "bit", nullable: false),
                    IsDiabled = table.Column<bool>(type: "bit", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ClassroomName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClassroomId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.StudentId);
                    table.ForeignKey(
                        name: "FK_Student_Classroom_ClassroomId",
                        column: x => x.ClassroomId,
                        principalTable: "Classroom",
                        principalColumn: "ClassroomId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Classroom",
                columns: new[] { "ClassroomId", "ClassroomName" },
                values: new object[,]
                {
                    { 1, "10 Sinh" },
                    { 2, "10 Toan" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "UserId", "DateOfBirth", "FirstName", "Gender", "IsDiabled", "IsFirstLogin", "LastName", "PasswordHash", "Role", "UserCode", "UserName" },
                values: new object[,]
                {
                    { 1, new DateTime(2000, 2, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Dao", 0, false, false, "Quy Vuong", "$2a$11$gKsrf/Zfxt5SfA3btVG6fe4etC5iycBSV26h.ufDGzM80Snl7fVTu", 0, "AD1", "Admin" },
                    { 2, new DateTime(2000, 2, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Do", 0, false, false, "Duy Nam", "$2a$11$l1a2WQ8Mn8C4/aiNAJKk4u9r8uDzykd4bG0V3exf./Ld99IKak5ge", 1, "TC1", "Teacher" }
                });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "ClassroomId", "ClassroomName", "DateOfBirth", "FirstName", "Gender", "IsDiabled", "IsFirstLogin", "LastName", "PasswordHash", "Role", "StudentCode", "UserName" },
                values: new object[] { 1, 1, "10 Sinh", new DateTime(2000, 2, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Le", 1, false, false, "Thi Van", "$2a$11$BuROAYK3JmJVkhoNYA8CHOBkFtenroNnhHM2fZyXOOAb9bYfEjBxe", 2, "ST1", "Student1" });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "ClassroomId", "ClassroomName", "DateOfBirth", "FirstName", "Gender", "IsDiabled", "IsFirstLogin", "LastName", "PasswordHash", "Role", "StudentCode", "UserName" },
                values: new object[] { 2, 1, "10 Sinh", new DateTime(2000, 2, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Nguyen", 0, false, false, "Van A", "$2a$11$/1t2OHU4VDHkRfZpy8./YObajrKn4VA1nrMUDo3m0Y3zF8e3K4HFG", 2, "ST2", "Student2" });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "ClassroomId", "ClassroomName", "DateOfBirth", "FirstName", "Gender", "IsDiabled", "IsFirstLogin", "LastName", "PasswordHash", "Role", "StudentCode", "UserName" },
                values: new object[] { 3, 2, "10 Toan", new DateTime(2000, 2, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Nguyen", 0, false, false, "Van B", "$2a$11$lajNbRSbrWTvGPJWPwk1n.Q/cd3jN9j2G8suCDwcotVgWkC7S2ul2", 2, "ST4", "Student3" });

            migrationBuilder.CreateIndex(
                name: "IX_Student_ClassroomId",
                table: "Student",
                column: "ClassroomId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Classroom");
        }
    }
}
