using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalFinanceDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class updateExpenseDTO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasRefund",
                table: "Expenses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "RefundAmount",
                table: "Expenses",
                type: "decimal(18,2)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasRefund",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "RefundAmount",
                table: "Expenses");
        }
    }
}
