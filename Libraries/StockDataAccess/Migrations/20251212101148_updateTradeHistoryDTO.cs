using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class updateTradeHistoryDTO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSell",
                table: "TradeHistories");

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "TradeHistories",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "TradeHistories");

            migrationBuilder.AddColumn<bool>(
                name: "IsSell",
                table: "TradeHistories",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
