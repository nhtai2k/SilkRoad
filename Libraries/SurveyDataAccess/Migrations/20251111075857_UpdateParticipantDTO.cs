using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveyDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateParticipantDTO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsComplete",
                table: "Participants",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHighlighted",
                table: "Participants",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRejected",
                table: "Participants",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "Participants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PlaceholderVN",
                table: "ParticipantInfoConfigs",
                type: "nvarchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PlaceholderEN",
                table: "ParticipantInfoConfigs",
                type: "nvarchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 11, 14, 58, 56, 248, DateTimeKind.Local).AddTicks(7252));

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 11, 14, 58, 56, 248, DateTimeKind.Local).AddTicks(8410));

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 11, 14, 58, 56, 248, DateTimeKind.Local).AddTicks(8414));

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 11, 14, 58, 56, 248, DateTimeKind.Local).AddTicks(8415));

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 11, 14, 58, 56, 248, DateTimeKind.Local).AddTicks(8416));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsComplete",
                table: "Participants");

            migrationBuilder.DropColumn(
                name: "IsHighlighted",
                table: "Participants");

            migrationBuilder.DropColumn(
                name: "IsRejected",
                table: "Participants");

            migrationBuilder.DropColumn(
                name: "Reason",
                table: "Participants");

            migrationBuilder.AlterColumn<string>(
                name: "PlaceholderVN",
                table: "ParticipantInfoConfigs",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PlaceholderEN",
                table: "ParticipantInfoConfigs",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 10, 16, 6, 27, 791, DateTimeKind.Local).AddTicks(1242));

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 10, 16, 6, 27, 791, DateTimeKind.Local).AddTicks(3250));

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 10, 16, 6, 27, 791, DateTimeKind.Local).AddTicks(3259));

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 10, 16, 6, 27, 791, DateTimeKind.Local).AddTicks(3261));

            migrationBuilder.UpdateData(
                table: "QuestionTypes",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 11, 10, 16, 6, 27, 791, DateTimeKind.Local).AddTicks(3262));
        }
    }
}
