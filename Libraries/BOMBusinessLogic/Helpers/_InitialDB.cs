using BOM.DAL;
using BOM.DAL.DTOs;
using Microsoft.AspNetCore.Hosting;
using OfficeOpenXml;

namespace BOM.BLL.Helpers
{
    public class InitialDB
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public InitialDB(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
        }
        public void InitializeAsync()
        {
            //InsertMaterialGroups();
            //InsertUnits();
            //InsertMaterialCategories();
            //InsertDishes();
            //InsertProperties();
            //InsertMaterials();
            //InsertEmployees();
        }


        private void InsertMaterialGroups()
        {
            string name = "materialgroup.xlsx";
            string path = Path.Combine(_webHostEnvironment.WebRootPath, name);

            // Check if the file exists  
            if (!File.Exists(path))
            {
                throw new FileNotFoundException("The specified file does not exist.", path);
            }
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            // Open the Excel file  
            using var package = new OfficeOpenXml.ExcelPackage(new FileInfo(path));

            // Get the first worksheet  
            var worksheet = package.Workbook.Worksheets.FirstOrDefault();
            if (worksheet == null)
            {
                throw new InvalidOperationException("The Excel file does not contain any worksheets.");
            }

            // Read data from columns A, B, C  
            int rowCount = worksheet.Dimension.Rows;
            List<MaterialGroupDTO> existingDishes = new List<MaterialGroupDTO>();
            for (int row = 2; row <= rowCount; row++) // Assuming the first row contains headers  
            {
                string columnA = worksheet.Cells[row, 1].Text;
                string columnB = worksheet.Cells[row, 2].Text;


                MaterialGroupDTO model = new MaterialGroupDTO()
                {
                    Code = columnA.Trim(),
                    Name = columnB.Trim(),
                    IsActive = true
                };
                model.Create("system");
                bool exists = existingDishes.Any(x => x.Code == model.Code);
                if (!exists)
                {
                    existingDishes.Add(model);
                }
            }
            foreach (var item in existingDishes)
            {

                _unitOfWork.MaterialGroupRepository.Create(item);
            }
            _unitOfWork.SaveChanges();
        }

        private void InsertMaterialCategories()
        {
            string name = "materialcategory.xlsx";
            string path = Path.Combine(_webHostEnvironment.WebRootPath, name);

            // Check if the file exists  
            if (!File.Exists(path))
            {
                throw new FileNotFoundException("The specified file does not exist.", path);
            }
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            // Open the Excel file  
            using var package = new OfficeOpenXml.ExcelPackage(new FileInfo(path));

            // Get the first worksheet  
            var worksheet = package.Workbook.Worksheets.FirstOrDefault();
            if (worksheet == null)
            {
                throw new InvalidOperationException("The Excel file does not contain any worksheets.");
            }

            // Read data from columns A, B, C  
            int rowCount = worksheet.Dimension.Rows;
            List<MaterialCategoryDTO> existingDishes = new List<MaterialCategoryDTO>();
            for (int row = 2; row <= rowCount; row++) // Assuming the first row contains headers  
            {
                string columnA = worksheet.Cells[row, 1].Text;
                string columnB = worksheet.Cells[row, 2].Text;


                MaterialCategoryDTO model = new MaterialCategoryDTO()
                {
                    Code = columnA.Trim(),
                    Name = columnB.Trim(),
                    IsActive = true
                };
                model.Create("system");
                bool exists = existingDishes.Any(x => x.Code == model.Code);
                if (!exists)
                {
                    existingDishes.Add(model);
                }
            }
            foreach (var item in existingDishes)
            {

                _unitOfWork.MaterialCategoryRepository.Create(item);
            }
            _unitOfWork.SaveChanges();
        }

        private void InsertDishes()
        {
            string name = "dish.xlsx";
            string path = Path.Combine(_webHostEnvironment.WebRootPath, name);
            // Check if the file exists  
            if (!File.Exists(path))
            {
                throw new FileNotFoundException("The specified file does not exist.", path);
            }
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            // Open the Excel file  
            using var package = new OfficeOpenXml.ExcelPackage(new FileInfo(path));

            // Get the first worksheet  
            var worksheet = package.Workbook.Worksheets.FirstOrDefault();
            if (worksheet == null)
            {
                throw new InvalidOperationException("The Excel file does not contain any worksheets.");
            }

            // Read data from columns A, B, C  
            int rowCount = worksheet.Dimension.Rows;
            List<DishDTO> existingDishes = new List<DishDTO>();
            for (int row = 2; row <= rowCount; row++) // Assuming the first row contains headers  
            {
                string columnA = worksheet.Cells[row, 1].Text;
                string columnB = worksheet.Cells[row, 2].Text;
                string columnC = worksheet.Cells[row, 3].Text;

                if (!int.TryParse(columnA, out int dishGroupId))
                {
                    throw new FormatException($"Invalid DishGroupId value at row {row}.");
                }

                DishDTO model = new DishDTO()
                {
                    DishGroupId = dishGroupId,
                    Code = columnB.Trim(),
                    Name = columnC.Trim(),
                    IsActive = true
                };
                model.Create("system");
                bool exists = existingDishes.Any(x => x.Code == model.Code);
                if (!exists)
                {
                    existingDishes.Add(model);
                }
            }
            foreach (var item in existingDishes)
            {

                _unitOfWork.DishRepository.Create(item);
            }
            _unitOfWork.SaveChanges();
        }

        private void InsertProperties()
        {
            string name = "property.xlsx";
            string path = Path.Combine(_webHostEnvironment.WebRootPath, name);
            // Check if the file exists  
            if (!File.Exists(path))
            {
                throw new FileNotFoundException("The specified file does not exist.", path);
            }
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            // Open the Excel file  
            using var package = new OfficeOpenXml.ExcelPackage(new FileInfo(path));

            // Get the first worksheet  
            var worksheet = package.Workbook.Worksheets.FirstOrDefault();
            if (worksheet == null)
            {
                throw new InvalidOperationException("The Excel file does not contain any worksheets.");
            }

            // Read data from columns A, B, C  
            int rowCount = worksheet.Dimension.Rows;
            List<PropertyDTO> existingDishes = new List<PropertyDTO>();
            for (int row = 2; row <= rowCount; row++) // Assuming the first row contains headers  
            {
                string ma = worksheet.Cells[row, 1].Text;
                string nam = worksheet.Cells[row, 2].Text;
                string unit = worksheet.Cells[row, 3].Text;
                string quantity = worksheet.Cells[row, 4].Text;
                string price = worksheet.Cells[row, 5].Text.Replace(".", "");
                string kl = worksheet.Cells[row, 6].Text;


                if (!int.TryParse(unit, out int unitId))
                {
                    throw new FormatException($"Invalid DishGroupId value at row {row}.");
                }
                if (!double.TryParse(quantity, out double sl))
                {
                    throw new FormatException($"Invalid DishGroupId value at row {row}.");
                }
                if (!int.TryParse(price, out int gia))
                {
                    throw new FormatException($"Invalid DishGroupId value at row {row}.");
                }
                if (!int.TryParse(kl, out int kh))
                {
                    throw new FormatException($"Invalid DishGroupId value at row {row}.");
                }

                PropertyDTO model = new PropertyDTO()
                {
                    //PropertyTypeId = 2,
                    UnitId = unitId,
                    DepartmentId = -1,
                    TimeUnitId = 3,
                    Code = ma,
                    Name = nam,
                    //Quantity = sl,
                    Price = gia,
                    //DepreciationPeriod = kh,
                    IsActive = true
                };
                model.Create("system");
                bool exists = existingDishes.Any(x => x.Code == model.Code);
                if (!exists)
                {
                    existingDishes.Add(model);
                }
            }
            foreach (var item in existingDishes)
            {

                _unitOfWork.PropertyRepository.Create(item);
            }
            _unitOfWork.SaveChanges();
        }

        private void InsertMaterials()
        {
            string name = "material.xlsx";
            string path = Path.Combine(_webHostEnvironment.WebRootPath, name);
            // Check if the file exists  
            if (!File.Exists(path))
            {
                throw new FileNotFoundException("The specified file does not exist.", path);
            }
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            // Open the Excel file  
            using var package = new OfficeOpenXml.ExcelPackage(new FileInfo(path));

            // Get the first worksheet  
            var worksheet = package.Workbook.Worksheets.FirstOrDefault();
            if (worksheet == null)
            {
                throw new InvalidOperationException("The Excel file does not contain any worksheets.");
            }

            // Read data from columns A, B, C  
            int rowCount = worksheet.Dimension.Rows;
            var rand = new Random();
            List<MaterialDTO> existingDishes = new List<MaterialDTO>();
            for (int row = 2; row <= rowCount; row++) // Assuming the first row contains headers  
            {
                string columnA = worksheet.Cells[row, 1].Text;
                string columnB = worksheet.Cells[row, 2].Text;
                string columnC = worksheet.Cells[row, 3].Text;
                string columnD = worksheet.Cells[row, 4].Text;
                string columnE = worksheet.Cells[row, 5].Text;

                if (!int.TryParse(columnB, out int categoryId))
                {
                    throw new FormatException($"Invalid DishGroupId value at row {row}.");
                }
                if (!double.TryParse(columnE.Replace(",", ""), out double price))
                {
                    throw new FormatException($"Invalid DishGroupId value at row {row}.");
                }

                MaterialDTO model = new MaterialDTO()
                {
                    MaterialGroupId = rand.Next(1, 10),
                    MaterialCategoryId = categoryId,
                    BaseUnitId = rand.Next(1, 29),
                    Code = columnA.Trim(),
                    Name = columnC.Trim(),
                    Note = columnD.Trim(),
                    Price = price,
                    IsActive = true
                };
                model.Create("system");
                bool exists = existingDishes.Any(x => x.Code == model.Code);
                if (!exists)
                {
                    existingDishes.Add(model);
                }
            }
            foreach (var item in existingDishes)
            {

                _unitOfWork.MaterialRepository.Create(item);
            }
            _unitOfWork.SaveChanges();
        }

    }
}
