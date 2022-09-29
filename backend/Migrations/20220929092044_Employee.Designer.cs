﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20220929092044_Employee")]
    partial class Employee
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("backend.Entities.Classroom", b =>
                {
                    b.Property<int>("ClassroomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ClassroomId"), 1L, 1);

                    b.Property<string>("ClassroomName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ClassroomId");

                    b.ToTable("Classroom", (string)null);

                    b.HasData(
                        new
                        {
                            ClassroomId = 1,
                            ClassroomName = "10 Sinh"
                        },
                        new
                        {
                            ClassroomId = 2,
                            ClassroomName = "10 Toan"
                        });
                });

            modelBuilder.Entity("backend.Entities.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmployeeId"), 1L, 1);

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmployeeCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<bool>("IsFirstLogin")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmployeeId");

                    b.ToTable("Employee", (string)null);

                    b.HasData(
                        new
                        {
                            EmployeeId = 1,
                            DateOfBirth = new DateTime(2022, 9, 29, 16, 20, 43, 121, DateTimeKind.Local).AddTicks(5662),
                            EmployeeCode = "AD1",
                            FirstName = "Nguyen",
                            Gender = 0,
                            IsFirstLogin = true,
                            LastName = "Van Quyet",
                            PasswordHash = "$2a$11$3izrWSoWnO6bQHG9JT4ULuHxRU2911OJjhG16yj4g4jIEx.6HJTiG",
                            PhoneNumber = "0335878777",
                            Role = 0,
                            UserName = "Staff1"
                        },
                        new
                        {
                            EmployeeId = 2,
                            DateOfBirth = new DateTime(2022, 9, 29, 16, 20, 43, 316, DateTimeKind.Local).AddTicks(2017),
                            EmployeeCode = "AD2",
                            FirstName = "Do",
                            Gender = 1,
                            IsFirstLogin = true,
                            LastName = "Thi Van",
                            PasswordHash = "$2a$11$9N3CvXwbOgiMFjcD74M99eOuBMLFMDdxUx7.3u.xX5XoAS/3k8gKq",
                            PhoneNumber = "1900561252",
                            Role = 0,
                            UserName = "Staff2"
                        },
                        new
                        {
                            EmployeeId = 3,
                            DateOfBirth = new DateTime(2022, 9, 29, 16, 20, 43, 513, DateTimeKind.Local).AddTicks(4876),
                            EmployeeCode = "TC1",
                            FirstName = "Dinh",
                            Gender = 0,
                            IsFirstLogin = true,
                            LastName = "Quoc Vuong",
                            PasswordHash = "$2a$11$MMuZdPdqYbmZ8kgS/fgE.uTubWwoavx7ZMx1OrR2mYgsJXRre9onu",
                            PhoneNumber = "0335689232",
                            Role = 1,
                            UserName = "Staff3"
                        },
                        new
                        {
                            EmployeeId = 4,
                            DateOfBirth = new DateTime(2022, 9, 29, 16, 20, 43, 711, DateTimeKind.Local).AddTicks(6734),
                            EmployeeCode = "TC2",
                            FirstName = "Le",
                            Gender = 1,
                            IsFirstLogin = true,
                            LastName = "Anh Vien",
                            PasswordHash = "$2a$11$Qn3AYMJ4dpOGlvhaBmkEte/ph6xQBPRzcVmep7JrA1R5otYxcszIm",
                            PhoneNumber = "0983287143",
                            Role = 1,
                            UserName = "Staff4"
                        });
                });

            modelBuilder.Entity("backend.Entities.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StudentId"), 1L, 1);

                    b.Property<int>("ClassroomId")
                        .HasColumnType("int");

                    b.Property<string>("ClassroomName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<bool>("IsFirstLogin")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StudentCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StudentId");

                    b.HasIndex("ClassroomId");

                    b.ToTable("Student", (string)null);

                    b.HasData(
                        new
                        {
                            StudentId = 1,
                            ClassroomId = 1,
                            ClassroomName = "10 Sinh",
                            DateOfBirth = new DateTime(2022, 9, 29, 16, 20, 43, 914, DateTimeKind.Local).AddTicks(6166),
                            FirstName = "Le",
                            Gender = 0,
                            IsFirstLogin = true,
                            LastName = "Van Luyen",
                            PasswordHash = "$2a$11$DYK0LB0NiTl8mRExgBdW0u6bHwFPFORSW2yzUnTS3FITTh8PqpRA.",
                            StudentCode = "ST1",
                            UserName = "Student1"
                        },
                        new
                        {
                            StudentId = 2,
                            ClassroomId = 1,
                            ClassroomName = "10 Toan",
                            DateOfBirth = new DateTime(2022, 9, 29, 16, 20, 44, 114, DateTimeKind.Local).AddTicks(2841),
                            FirstName = "Anna",
                            Gender = 1,
                            IsFirstLogin = true,
                            LastName = "Viet Nam",
                            PasswordHash = "$2a$11$5LASeELmElUdtiaOoYPMv.Pad5gRkZRWX6DurHvtXJ6hAHjVlrpLu",
                            StudentCode = "ST2",
                            UserName = "Student2"
                        },
                        new
                        {
                            StudentId = 3,
                            ClassroomId = 2,
                            ClassroomName = "10 Toan",
                            DateOfBirth = new DateTime(2022, 9, 29, 16, 20, 44, 307, DateTimeKind.Local).AddTicks(6693),
                            FirstName = "Dao",
                            Gender = 0,
                            IsFirstLogin = true,
                            LastName = "Quy Vuong",
                            PasswordHash = "$2a$11$u9kvnnixf0XtUhtvAfPwYea.ee4n02Lxdic7xkASq9hA5kaBS7NTS",
                            StudentCode = "ST3",
                            UserName = "Student3"
                        });
                });

            modelBuilder.Entity("backend.Entities.Student", b =>
                {
                    b.HasOne("backend.Entities.Classroom", "Classroom")
                        .WithMany("Students")
                        .HasForeignKey("ClassroomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Classroom");
                });

            modelBuilder.Entity("backend.Entities.Classroom", b =>
                {
                    b.Navigation("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
