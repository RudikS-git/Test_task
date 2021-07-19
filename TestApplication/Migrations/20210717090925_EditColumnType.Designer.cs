﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TestApplication;

namespace TestApplication.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210717090925_EditColumnType")]
    partial class EditColumnType
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("TestApplication.Models.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("LastActivity")
                        .HasColumnType("date");

                    b.Property<DateTime>("Registration")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("People");

                    b.HasCheckConstraint("CK_People_LastActivity", "\"LastActivity\" >= \"Registration\"");
                });
#pragma warning restore 612, 618
        }
    }
}
