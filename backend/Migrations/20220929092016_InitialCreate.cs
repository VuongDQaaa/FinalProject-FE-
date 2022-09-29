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
                name: "Employee",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    IsFirstLogin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClassroomId = table.Column<int>(type: "int", nullable: false),
                    ClassroomName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsFirstLogin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.StudentId);
                    table.ForeignKey(
                        name: "FK_Student_Classroom_ClassroomId",
                        column: x => x.ClassroomId,
                        principalTable: "Classroom",
                        principalColumn: "ClassroomId",
                        onDelete: ReferentialAction.Cascade);
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
                table: "Employee",
                columns: new[] { "EmployeeId", "DateOfBirth", "EmployeeCode", "FirstName", "Gender", "IsFirstLogin", "LastName", "PasswordHash", "PhoneNumber", "Role", "UserName" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 9, 29, 16, 20, 15, 145, DateTimeKind.Local).AddTicks(9797), "AD1", "Nguyen", 0, true, "Van Quyet", "$2a$11$B/KM85QNDVgjJAiJwNQmrui8eJYTzaLY5smNKaTlpESRVEC1pWLu2", "0335878777", 0, "Staff1" },
                    { 2, new DateTime(2022, 9, 29, 16, 20, 15, 346, DateTimeKind.Local).AddTicks(4987), "AD2", "Do", 1, true, "Thi Van", "$2a$11$Fq8I6TfKioABxs6Y0iv.PecgF3kSNHBirpugAmhotvIukJFi.2.pG", "1900561252", 0, "Staff2" },
                    { 3, new DateTime(2022, 9, 29, 16, 20, 15, 544, DateTimeKind.Local).AddTicks(7474), "TC1", "Dinh", 0, true, "Quoc Vuong", "$2a$11$xh7BQRRsEcSfBv3o.DX3HuAYKEROdMTJCxrmckqKZ38zD/ZTkNalu", "0335689232", 1, "Staff3" },
                    { 4, new DateTime(2022, 9, 29, 16, 20, 15, 739, DateTimeKind.Local).AddTicks(6010), "TC2", "Le", 1, true, "Anh Vien", "$2a$11$SKZsT.4uApbu5feo/KJAn.eYzFNd2MImipjl6y5jQfeFsrmPT.z..", "0983287143", 1, "Staff4" }
                });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "ClassroomId", "ClassroomName", "DateOfBirth", "FirstName", "Gender", "IsFirstLogin", "LastName", "PasswordHash", "StudentCode", "UserName" },
                values: new object[] { 1, 1, "10 Sinh", new DateTime(2022, 9, 29, 16, 20, 15, 933, DateTimeKind.Local).AddTicks(9087), "Le", 0, true, "Van Luyen", "$2a$11$LGQFu/ECitpYYcoqNHntteiR2Wlb9S9n6AeZ8pOwHeEVI/XacI57y", "ST1", "Student1" });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "ClassroomId", "ClassroomName", "DateOfBirth", "FirstName", "Gender", "IsFirstLogin", "LastName", "PasswordHash", "StudentCode", "UserName" },
                values: new object[] { 2, 1, "10 Toan", new DateTime(2022, 9, 29, 16, 20, 16, 127, DateTimeKind.Local).AddTicks(3668), "Anna", 1, true, "Viet Nam", "$2a$11$66HwMPMq49RZ/JoGOnDUUOeAV6QdGo3xBbhPRchxQ2GUBPKy1B4Ea", "ST2", "Student2" });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "ClassroomId", "ClassroomName", "DateOfBirth", "FirstName", "Gender", "IsFirstLogin", "LastName", "PasswordHash", "StudentCode", "UserName" },
                values: new object[] { 3, 2, "10 Toan", new DateTime(2022, 9, 29, 16, 20, 16, 323, DateTimeKind.Local).AddTicks(7476), "Dao", 0, true, "Quy Vuong", "$2a$11$oAX4LaccV5BI08vEzxlywu6a0i/bSsZIaPbfvb3BvUAZPiMd17eM6", "ST3", "Student3" });

            migrationBuilder.CreateIndex(
                name: "IX_Student_ClassroomId",
                table: "Student",
                column: "ClassroomId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.DropTable(
                name: "Classroom");
        }
    }
}
