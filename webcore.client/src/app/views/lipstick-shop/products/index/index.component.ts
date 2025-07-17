import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import { DataTableComponent } from '@components/data-table/data-table.component';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective, TemplateIdDirective } from '@coreui/angular';
import { BrandViewModel } from '@models/lipstick-shop-models/brand.model';
import { CategoryViewModel } from '@models/lipstick-shop-models/category.model';
import { ColorViewModel } from '@models/lipstick-shop-models/color.model';
import { ProductViewModel } from '@models/lipstick-shop-models/product.model';
import { SizeViewModel } from '@models/lipstick-shop-models/size.model';
import { SubCategoryViewModel } from '@models/lipstick-shop-models/sub-category.model';
import { PageInformation, Pagination } from '@models/pagination.model';
import { BrandService } from '@services/lipstick-shop-services/brand.service';
import { CategoryService } from '@services/lipstick-shop-services/category.service';
import { ColorService } from '@services/lipstick-shop-services/color.service';
import { ProductService } from '@services/lipstick-shop-services/product.service';
import { SizeService } from '@services/lipstick-shop-services/size.service';
import { SubCategoryService } from '@services/lipstick-shop-services/sub-category.service';

@Component({
  selector: 'app-index',
  imports: [ModalBodyComponent, NgFor, RouterLink,
    ModalComponent, ButtonDirective, ReactiveFormsModule,  AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective,
    ModalFooterComponent, ButtonCloseDirective, ModalHeaderComponent,
    FormSelectDirective,DataTableComponent, NgFor],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  pageInformation: PageInformation = new PageInformation();
  visibleDelete: boolean = false;
  deleteById: number = -1;
  topicId: number = -1;
  productList: ProductViewModel[] = [];
  categories: CategoryViewModel[] = [];
  subCategories: SubCategoryViewModel[] = [];
  subCategoryList: SubCategoryViewModel[] = [];
  brands: BrandViewModel[] = [];
  sizes: SizeViewModel[] = [];
  colors: ColorViewModel[] = [];
  data: Pagination<ProductViewModel> = new Pagination<ProductViewModel>();
  filterForm: FormGroup = new FormGroup({
    categoryId: new FormControl(-1),
    subCategoryId: new FormControl(-1),
    brandId: new FormControl(-1),
    sizeId: new FormControl(-1),
    colorId: new FormControl(-1),
    nameEN: new FormControl(''),
    nameVN: new FormControl(''),
  });
  constructor(
      private subCategoryService: SubCategoryService, 
      private categoryService: CategoryService, 
      private productService: ProductService,
      private brandService: BrandService,
      private sizeService: SizeService,
      private colorService: ColorService) {}
  ngOnInit(): void {
    this.categoryService.getAllActive().subscribe((res) => {
      this.categories = res.data;
      this.subCategoryService.getByCategoryId(this.filterForm.value.categoryId).subscribe((res) => {
        this.subCategoryList = res.data;
        this.subCategories = res.data;
      });
    });
    this.brandService.getAllActive().subscribe((res) => {
      this.brands = res.data;
    });
    this.sizeService.getAllActive().subscribe((res) => {
      this.sizes = res.data;
    });
    this.colorService.getAllActive().subscribe((res) => {
      this.colors = res.data;
    });
    this.getData();
  }
  getData(){
    const query : Params = {
      nameEN: this.filterForm.value.nameEN,
      nameVN: this.filterForm.value.nameVN,
      categoryId: this.filterForm.value.categoryId,
      subCategoryId: this.filterForm.value.subCategoryId,
      brandId: this.filterForm.value.brandId,
      sizeId: this.filterForm.value.sizeId,
      colorId: this.filterForm.value.colorId,
      pageIndex: this.pageInformation.pageIndex,
      pageSize: this.pageInformation.pageSize,
    }
    this.productService.getAllByFilter(query).subscribe((res) => {
      this.data = res.data;
      this.pageInformation.totalItems = res.data.totalItems;
      this.pageInformation.totalPages = res.data.totalPages;
      this.pageInformation.currentPage = res.data.currentPage;
    });
  }
  filter(){
    this.getData();
  }
  onPageIndexChange(index: any) {
    this.pageInformation.pageIndex = index;
    this.getData();
  }
  onPageSizeChange(size: any) {
    this.pageInformation.pageSize = size;
    this.pageInformation.pageIndex = 1;
    this.getData();
  }
  changeCategoryId(event: any) {
    this.subCategories = this.subCategoryList.filter((item) => item.categoryId == this.filterForm.value.categoryId);
  }

  //#region Delete
  deleteData(id: number) {
    this.deleteById = id;
    this.toggleLiveDelete();
  }
  deleteDataConfirm() {
    this.productService.softDelete(this.deleteById).subscribe(() => {
      this.toggleLiveDelete();
      this.getData();
    });
  }
  toggleLiveDelete() {
    this.visibleDelete = !this.visibleDelete;
  }

  handleLiveDeleteChange(event: any) {
    this.visibleDelete = event;
  }
  //#endregion
}
