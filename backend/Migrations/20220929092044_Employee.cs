using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class Employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Employee",
                keyColumn: "EmployeeId",
                keyValue: 1,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 43, 121, DateTimeKind.Local).AddTicks(5662), "$2a$11$3izrWSoWnO6bQHG9JT4ULuHxRU2911OJjhG16yj4g4jIEx.6HJTiG" });

            migrationBuilder.UpdateData(
                table: "Employee",
                keyColumn: "EmployeeId",
                keyValue: 2,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 43, 316, DateTimeKind.Local).AddTicks(2017), "$2a$11$9N3CvXwbOgiMFjcD74M99eOuBMLFMDdxUx7.3u.xX5XoAS/3k8gKq" });

            migrationBuilder.UpdateData(
                table: "Employee",
                keyColumn: "EmployeeId",
                keyValue: 3,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 43, 513, DateTimeKind.Local).AddTicks(4876), "$2a$11$MMuZdPdqYbmZ8kgS/fgE.uTubWwoavx7ZMx1OrR2mYgsJXRre9onu" });

            migrationBuilder.UpdateData(
                table: "Employee",
                keyColumn: "EmployeeId",
                keyValue: 4,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 43, 711, DateTimeKind.Local).AddTicks(6734), "$2a$11$Qn3AYMJ4dpOGlvhaBmkEte/ph6xQBPRzcVmep7JrA1R5otYxcszIm" });

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 1,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 43, 914, DateTimeKind.Local).AddTicks(6166), "$2a$11$DYK0LB0NiTl8mRExgBdW0u6bHwFPFORSW2yzUnTS3FITTh8PqpRA." });

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 2,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 44, 114, DateTimeKind.Local).AddTicks(2841), "$2a$11$5LASeELmElUdtiaOoYPMv.Pad5gRkZRWX6DurHvtXJ6hAHjVlrpLu" });

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 3,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 44, 307, DateTimeKind.Local).AddTicks(6693), "$2a$11$u9kvnnixf0XtUhtvAfPwYea.ee4n02Lxdic7xkASq9hA5kaBS7NTS" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Employee",
                keyColumn: "EmployeeId",
                keyValue: 1,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 15, 145, DateTimeKind.Local).AddTicks(9797), "$2a$11$B/KM85QNDVgjJAiJwNQmrui8eJYTzaLY5smNKaTlpESRVEC1pWLu2" });

            migrationBuilder.UpdateData(
                table: "Employee",
                keyColumn: "EmployeeId",
                keyValue: 2,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 15, 346, DateTimeKind.Local).AddTicks(4987), "$2a$11$Fq8I6TfKioABxs6Y0iv.PecgF3kSNHBirpugAmhotvIukJFi.2.pG" });

            migrationBuilder.UpdateData(
                table: "Employee",
                keyColumn: "EmployeeId",
                keyValue: 3,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 15, 544, DateTimeKind.Local).AddTicks(7474), "$2a$11$xh7BQRRsEcSfBv3o.DX3HuAYKEROdMTJCxrmckqKZ38zD/ZTkNalu" });

            migrationBuilder.UpdateData(
                table: "Employee",
                keyColumn: "EmployeeId",
                keyValue: 4,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 15, 739, DateTimeKind.Local).AddTicks(6010), "$2a$11$SKZsT.4uApbu5feo/KJAn.eYzFNd2MImipjl6y5jQfeFsrmPT.z.." });

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 1,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 15, 933, DateTimeKind.Local).AddTicks(9087), "$2a$11$LGQFu/ECitpYYcoqNHntteiR2Wlb9S9n6AeZ8pOwHeEVI/XacI57y" });

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 2,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 16, 127, DateTimeKind.Local).AddTicks(3668), "$2a$11$66HwMPMq49RZ/JoGOnDUUOeAV6QdGo3xBbhPRchxQ2GUBPKy1B4Ea" });

            migrationBuilder.UpdateData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: 3,
                columns: new[] { "DateOfBirth", "PasswordHash" },
                values: new object[] { new DateTime(2022, 9, 29, 16, 20, 16, 323, DateTimeKind.Local).AddTicks(7476), "$2a$11$oAX4LaccV5BI08vEzxlywu6a0i/bSsZIaPbfvb3BvUAZPiMd17eM6" });
        }
    }
}
