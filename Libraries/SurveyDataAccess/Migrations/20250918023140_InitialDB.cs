using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SurveyDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class InitialDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Table_QuestionGroupLibraries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameEN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    Priority = table.Column<byte>(type: "tinyint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(100)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "varchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_QuestionGroupLibraries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_QuestionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_QuestionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_SurveyForms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    TitleEN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    TitleVN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    DescriptionEN = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    DescriptionVN = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(100)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "varchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_SurveyForms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_QuestionLibraries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionGroupLibraryId = table.Column<int>(type: "int", nullable: false),
                    QuestionTypeId = table.Column<int>(type: "int", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(100)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "varchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_QuestionLibraries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Table_QuestionLibraries_Table_QuestionGroupLibraries_QuestionGroupLibraryId",
                        column: x => x.QuestionGroupLibraryId,
                        principalTable: "Table_QuestionGroupLibraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Table_QuestionLibraries_Table_QuestionTypes_QuestionTypeId",
                        column: x => x.QuestionTypeId,
                        principalTable: "Table_QuestionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Table_Participants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    SurveyFormId = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "varchar(10)", nullable: true),
                    Email = table.Column<string>(type: "varchar(255)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Participants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Table_Participants_Table_SurveyForms_SurveyFormId",
                        column: x => x.SurveyFormId,
                        principalTable: "Table_SurveyForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Table_QuestionGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    SurveyFormId = table.Column<int>(type: "int", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    Priority = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_QuestionGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Table_QuestionGroups_Table_SurveyForms_SurveyFormId",
                        column: x => x.SurveyFormId,
                        principalTable: "Table_SurveyForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Table_PredefinedAnswerLibraries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    QuestionLibraryId = table.Column<int>(type: "int", nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_PredefinedAnswerLibraries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Table_PredefinedAnswerLibraries_Table_QuestionLibraries_QuestionLibraryId",
                        column: x => x.QuestionLibraryId,
                        principalTable: "Table_QuestionLibraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Table_Answers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParticipantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AnswerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rating = table.Column<byte>(type: "tinyint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Table_Answers_Table_Participants_ParticipantId",
                        column: x => x.ParticipantId,
                        principalTable: "Table_Participants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Table_Questions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    QuestionGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SurveyFormId = table.Column<int>(type: "int", nullable: true),
                    QuestionTypeId = table.Column<int>(type: "int", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Table_Questions_Table_QuestionGroups_QuestionGroupId",
                        column: x => x.QuestionGroupId,
                        principalTable: "Table_QuestionGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Table_Questions_Table_QuestionTypes_QuestionTypeId",
                        column: x => x.QuestionTypeId,
                        principalTable: "Table_QuestionTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Table_Questions_Table_SurveyForms_SurveyFormId",
                        column: x => x.SurveyFormId,
                        principalTable: "Table_SurveyForms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Table_PredefinedAnswers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_PredefinedAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Table_PredefinedAnswers_Table_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Table_Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Table_QuestionTypes",
                columns: new[] { "Id", "CreatedAt", "IsActive", "Name", "Note" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 9, 18, 9, 31, 40, 79, DateTimeKind.Local).AddTicks(9496), true, "Câu hỏi đóng", "Câu hỏi đóng (Closed-ended question) – Chỉ có các câu trả lời sẵn." },
                    { 2, new DateTime(2025, 9, 18, 9, 31, 40, 80, DateTimeKind.Local).AddTicks(641), true, "Câu hỏi mở", "Câu hỏi mở (Open-ended question) – Người dùng nhập câu trả lời." },
                    { 3, new DateTime(2025, 9, 18, 9, 31, 40, 80, DateTimeKind.Local).AddTicks(645), true, "Câu hỏi kết hợp", "Câu hỏi kết hợp (Hybrid question) hoặc Câu hỏi mở rộng (Extended question) – Vừa có câu trả lời sẵn, vừa cho phép người dùng nhập câu trả lời riêng." },
                    { 4, new DateTime(2025, 9, 18, 9, 31, 40, 80, DateTimeKind.Local).AddTicks(646), true, "Câu hỏi nhiều lựa chọn", "Cho phép chọn nhiều đáp án cùng lúc." },
                    { 5, new DateTime(2025, 9, 18, 9, 31, 40, 80, DateTimeKind.Local).AddTicks(647), true, "Câu hỏi đánh giá", "Cẩu hỏi đáng giá (rating question) - Cho người dùng đánh giá mức độ trên 5 sao." }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Table_Answers_ParticipantId",
                table: "Table_Answers",
                column: "ParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_Participants_SurveyFormId",
                table: "Table_Participants",
                column: "SurveyFormId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_PredefinedAnswerLibraries_QuestionLibraryId",
                table: "Table_PredefinedAnswerLibraries",
                column: "QuestionLibraryId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_PredefinedAnswers_QuestionId",
                table: "Table_PredefinedAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_QuestionGroups_SurveyFormId",
                table: "Table_QuestionGroups",
                column: "SurveyFormId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_QuestionLibraries_QuestionGroupLibraryId",
                table: "Table_QuestionLibraries",
                column: "QuestionGroupLibraryId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_QuestionLibraries_QuestionTypeId",
                table: "Table_QuestionLibraries",
                column: "QuestionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_Questions_QuestionGroupId",
                table: "Table_Questions",
                column: "QuestionGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_Questions_QuestionTypeId",
                table: "Table_Questions",
                column: "QuestionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_Questions_SurveyFormId",
                table: "Table_Questions",
                column: "SurveyFormId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Table_Answers");

            migrationBuilder.DropTable(
                name: "Table_PredefinedAnswerLibraries");

            migrationBuilder.DropTable(
                name: "Table_PredefinedAnswers");

            migrationBuilder.DropTable(
                name: "Table_Participants");

            migrationBuilder.DropTable(
                name: "Table_QuestionLibraries");

            migrationBuilder.DropTable(
                name: "Table_Questions");

            migrationBuilder.DropTable(
                name: "Table_QuestionGroupLibraries");

            migrationBuilder.DropTable(
                name: "Table_QuestionGroups");

            migrationBuilder.DropTable(
                name: "Table_QuestionTypes");

            migrationBuilder.DropTable(
                name: "Table_SurveyForms");
        }
    }
}
