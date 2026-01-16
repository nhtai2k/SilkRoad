using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalFinanceDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateResourceTypeDTO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "ResourceTypes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ResourceTypes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "ResourceTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ResourceTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedAt",
                table: "ResourceTypes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "ResourceTypes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResourceTypeDTOId",
                table: "Resources",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Resources_ResourceTypeDTOId",
                table: "Resources",
                column: "ResourceTypeDTOId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_TypeId",
                table: "Resources",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_ResourceTypes_ResourceTypeDTOId",
                table: "Resources",
                column: "ResourceTypeDTOId",
                principalTable: "ResourceTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_ResourceTypes_TypeId",
                table: "Resources",
                column: "TypeId",
                principalTable: "ResourceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_ResourceTypes_ResourceTypeDTOId",
                table: "Resources");

            migrationBuilder.DropForeignKey(
                name: "FK_Resources_ResourceTypes_TypeId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Resources_ResourceTypeDTOId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Resources_TypeId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "ResourceTypes");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ResourceTypes");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ResourceTypes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ResourceTypes");

            migrationBuilder.DropColumn(
                name: "ModifiedAt",
                table: "ResourceTypes");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "ResourceTypes");

            migrationBuilder.DropColumn(
                name: "ResourceTypeDTOId",
                table: "Resources");
        }
    }
}
