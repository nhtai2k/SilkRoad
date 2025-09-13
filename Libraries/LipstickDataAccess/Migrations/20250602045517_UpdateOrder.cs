using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LipstickDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Table_Orders",
                newName: "PaymentStatusId");

            migrationBuilder.AddColumn<int>(
                name: "OrderStatusId",
                table: "Table_Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderStatusId",
                table: "Table_Orders");

            migrationBuilder.RenameColumn(
                name: "PaymentStatusId",
                table: "Table_Orders",
                newName: "StatusId");
        }
    }
}
