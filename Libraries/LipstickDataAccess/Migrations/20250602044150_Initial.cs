using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LipstickDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Table_Blogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TopicId = table.Column<int>(type: "int", nullable: false),
                    SubjectEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubjectVN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionEN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DescriptionVN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContentEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentVN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Blogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(225)", maxLength: 225, nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Brands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameEN = table.Column<string>(type: "nvarchar(225)", maxLength: 225, nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(225)", maxLength: 225, nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InNavbar = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    Priority = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_Colors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameVN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Colors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_HomeBanners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BannerTypeId = table.Column<int>(type: "int", nullable: false),
                    Animation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubjectEN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubjectVN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DescriptionEN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DescriptionVN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RedirectUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    TagENs = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TagVNs = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_HomeBanners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PaymentMethodId = table.Column<int>(type: "int", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShippingAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProvinceId = table.Column<int>(type: "int", nullable: false),
                    DistrictId = table.Column<int>(type: "int", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    ShippingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReceiveDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    TotalQuantity = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_PageContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PageTypeId = table.Column<int>(type: "int", nullable: false),
                    TitleEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleVN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentVN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_PageContents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_PageIntros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PageTypeId = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TitleEN = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    TitleVN = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ContentEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentVN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_PageIntros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_PageTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Label = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_PageTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_Payments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    PaymentTypeId = table.Column<byte>(type: "tinyint", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    SepayObject = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Note = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Payments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    SubCategoryId = table.Column<int>(type: "int", nullable: false),
                    BrandId = table.Column<int>(type: "int", nullable: false),
                    SizeId = table.Column<int>(type: "int", nullable: false),
                    ColorId = table.Column<int>(type: "int", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DescriptionEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionVN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DetailsEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DetailsVN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Images = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BackgroundImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRecommended = table.Column<bool>(type: "bit", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    DiscountPercent = table.Column<int>(type: "int", nullable: true),
                    SalePrice = table.Column<double>(type: "float", nullable: true),
                    StartDiscountDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDiscountDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SaleOff = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_Sizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameVN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Sizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_SubCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InNavbar = table.Column<bool>(type: "bit", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_SubCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_Topics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameEN = table.Column<string>(type: "nvarchar(225)", maxLength: 225, nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(225)", maxLength: 225, nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InHomePage = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Topics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table_OrderDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NameVN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    SaleOff = table.Column<bool>(type: "bit", nullable: false),
                    DiscountPercent = table.Column<int>(type: "int", nullable: true),
                    SalePrice = table.Column<double>(type: "float", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_OrderDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Table_OrderDetails_Table_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Table_Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Table_OrderDetails_OrderId",
                table: "Table_OrderDetails",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Table_Orders_Code",
                table: "Table_Orders",
                column: "Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Table_Blogs");

            migrationBuilder.DropTable(
                name: "Table_Brands");

            migrationBuilder.DropTable(
                name: "Table_Categories");

            migrationBuilder.DropTable(
                name: "Table_Colors");

            migrationBuilder.DropTable(
                name: "Table_HomeBanners");

            migrationBuilder.DropTable(
                name: "Table_OrderDetails");

            migrationBuilder.DropTable(
                name: "Table_PageContents");

            migrationBuilder.DropTable(
                name: "Table_PageIntros");

            migrationBuilder.DropTable(
                name: "Table_PageTypes");

            migrationBuilder.DropTable(
                name: "Table_Payments");

            migrationBuilder.DropTable(
                name: "Table_Products");

            migrationBuilder.DropTable(
                name: "Table_Sizes");

            migrationBuilder.DropTable(
                name: "Table_SubCategories");

            migrationBuilder.DropTable(
                name: "Table_Topics");

            migrationBuilder.DropTable(
                name: "Table_Orders");
        }
    }
}
