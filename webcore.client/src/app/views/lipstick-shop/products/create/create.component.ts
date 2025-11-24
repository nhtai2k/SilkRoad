import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, FormCheckComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective } from '@coreui/angular';
import { cilCloudUpload } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { CkeditorComponent } from '@components/ckeditor/ckeditor.component';
import { CategoryViewModel } from '@models/lipstick-shop-models/category.model';
import { SubCategoryViewModel } from '@models/lipstick-shop-models/sub-category.model';
import { CategoryService } from '@services/lipstick-shop-services/category.service';
import { SubCategoryService } from '@services/lipstick-shop-services/sub-category.service';
import { SizeViewModel } from '@models/lipstick-shop-models/size.model';
import { ColorViewModel } from '@models/lipstick-shop-models/color.model';
import { BrandViewModel } from '@models/lipstick-shop-models/brand.model';
import { ProductService } from '@services/lipstick-shop-services/product.service';
import { BrandService } from '@services/lipstick-shop-services/brand.service';
import { SizeService } from '@services/lipstick-shop-services/size.service';
import { ColorService } from '@services/lipstick-shop-services/color.service';
import { EColors } from '@common/global';
import { ToastService } from '@services/helper-services/toast.service';
@Component({
  selector: 'app-create',
  imports: [FormDirective, FormLabelDirective, FormSelectDirective,
    FormControlDirective, ButtonDirective, CkeditorComponent,
    RouterLink, CardComponent, CardBodyComponent, IconDirective,
    FormCheckComponent, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  saleOff: boolean = false;
  categories: CategoryViewModel[] = [];
  subCategories: SubCategoryViewModel[] = [];
  brands: BrandViewModel[] = [];
  sizes: SizeViewModel[] = [];
  colors: ColorViewModel[] = [];
  reviewUploadAvatar: string = '';
  reviewUploadBackGroundImage: string = '';
  reviewUploadImages: string = '';
  icons: any = { cilCloudUpload };
  imageFiles: File[] = [];
  imageUrls: string[] = [];
  createForm: FormGroup = new FormGroup({
    categoryId: new FormControl(-1, Validators.min(1)),
    subCategoryId: new FormControl(-1, Validators.min(1)),
    brandId: new FormControl(-1, Validators.min(1)),
    sizeId: new FormControl(-1, Validators.min(1)),
    colorId: new FormControl(-1, Validators.min(1)),
    nameEN: new FormControl('', Validators.required),
    nameVN: new FormControl('', Validators.required),
    descriptionEN: new FormControl('', Validators.required),
    descriptionVN: new FormControl('', Validators.required),
    detailsEN: new FormControl('', Validators.required),
    detailsVN: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    inHomePage: new FormControl(false),
    isRecommended: new FormControl(false),
    price: new FormControl(0, Validators.required),
    quantity: new FormControl(0, Validators.required),
    discountPercent: new FormControl(0),
    salePrice: new FormControl(0),
    saleOff: new FormControl(false),
    startDiscountDate: new FormControl(new Date()),
    endDiscountDate: new FormControl(new Date()),
    avatarFile: new FormControl(null),
    backgroundFile: new FormControl(null),
    imageFiles: new FormControl(null)
  });
  constructor(
    private subCategoryService: SubCategoryService, 
    private categoryService: CategoryService, 
    private router : Router,
    private productService: ProductService,
    private brandService: BrandService,
    private toastService: ToastService,
    private sizeService: SizeService,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.categoryService.getAllActive().subscribe(res => {
      this.categories = res.data;
      this.createForm.patchValue({ categoryId: this.categories[0].id });
      this.subCategoryService.getByCategoryId(this.categories[0].id).subscribe(res => {
        this.subCategories = res.data;
      });
    });
    this.brandService.getAllActive().subscribe(res => {
      this.brands = res.data;
    });
    this.sizeService.getAllActive().subscribe(res => {
      this.sizes = res.data;
    });
    this.colorService.getAllActive().subscribe(res => {
      this.colors = res.data;
    });
    this.saleOff = this.createForm.value.saleOff;
    this.createForm.patchValue({ startDiscountDate: new Date().toISOString().slice(0, 16) });
    this.createForm.patchValue({ endDiscountDate: new Date().toISOString().slice(0, 16) });
  }
  
  onChangeSaleOff(event: any): void {
    this.saleOff = event.target.checked;
  }

  onChangeUploadImageFile(event: any,type: string): void {
    const file: File = event.target.files[0];
    if (file) {
      //show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if(type === 'avatar')
        {
          this.reviewUploadAvatar = e.target.result;
          this.createForm.patchValue({ avatarFile: file });
        }
        else if(type === 'background')
        {
          this.reviewUploadBackGroundImage = e.target.result;
          this.createForm.patchValue({ backgroundFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  }
  // onChangeUploadImageFiles(event: any): void {
  //   const files: FileList = event.target.files;
  //   if (files && files.length > 0) {
  //     this.reviewUploadImages = '';
  //     const fileArray: File[] = Array.from(files);
  //     fileArray.forEach((file, index) => {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.reviewUploadImages += `<img src="${e.target.result}" alt="Image Preview ${index + 1}" class="mw-100 mh-100"/>`;
  //         if (index === fileArray.length - 1) {
  //           this.createForm.patchValue({ imageFiles: fileArray });
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  // }

  onChangeUploadImageFiles(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.imageFiles.push(files[i]);
        this.imageUrls.push(URL.createObjectURL(files[i]));
      }
    }
  }

  openFileInput(id: string): void {
    document.getElementById(id)?.click();
  }
  onChangeCategory(event: any) {
    const categoryId = event.target.value;
    if(categoryId === '-1'){
      this.subCategories = [];
      return;
    };
    this.subCategoryService.getByCategoryId(categoryId).subscribe(res => {
      this.subCategories = res.data;
    });
  }

  onSubmit(): void {
    console.log(this.createForm.value);
    if(this.createForm.valid){
      const formData = new FormData();
      formData.append('categoryId', this.createForm.value.categoryId);
      formData.append('subCategoryId', this.createForm.value.subCategoryId);
      formData.append('brandId', this.createForm.value.brandId);
      formData.append('sizeId', this.createForm.value.sizeId);
      formData.append('colorId', this.createForm.value.colorId);
      formData.append('nameEN', this.createForm.value.nameEN);
      formData.append('nameVN', this.createForm.value.nameVN);
      formData.append('descriptionEN', this.createForm.value.descriptionEN);
      formData.append('descriptionVN', this.createForm.value.descriptionVN);
      formData.append('detailsEN', this.createForm.value.detailsEN);
      formData.append('detailsVN', this.createForm.value.detailsVN);
      formData.append('isActive', this.createForm.value.isActive);
      formData.append('inHomePage', this.createForm.value.inHomePage);
      formData.append('isRecommended', this.createForm.value.isRecommended);
      formData.append('price', this.createForm.value.price);
      formData.append('quantity', this.createForm.value.quantity);
      formData.append('discountPercent', this.createForm.value.discountPercent);
      formData.append('salePrice', this.createForm.value.salePrice);
      formData.append('saleOff', this.createForm.value.saleOff);
      formData.append('startDiscountDate', this.createForm.value.startDiscountDate);
      formData.append('endDiscountDate', this.createForm.value.endDiscountDate);
      formData.append('avatarFile', this.createForm.value.avatarFile);
      formData.append('backgroundFile', this.createForm.value.backgroundFile);      
      this.imageFiles.forEach(file => {
        formData.append('imageFiles', file);
      });
      this.productService.create(formData).subscribe(res => {
        this.toastService.showToast(EColors.success, res.message);
        this.router.navigate(['/lipstick-shop/products']);
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  composeText(data: string, type: string): void {
    if (type === 'VN')
      this.createForm.patchValue({ detailsVN: data });
    else if (type === 'EN')
      this.createForm.patchValue({ detailsEN: data });
  }

  removeImageItem(index: number): void {
    this.imageUrls.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }

get categoryId() { return this.createForm.get('categoryId'); }
get subCategoryId() { return this.createForm.get('subCategoryId'); }
get brandId() { return this.createForm.get('brandId'); }
get sizeId() { return this.createForm.get('sizeId'); }
get colorId() { return this.createForm.get('colorId'); }
get nameEN() { return this.createForm.get('nameEN'); }
get nameVN() { return this.createForm.get('nameVN'); }
get descriptionEN() { return this.createForm.get('descriptionEN'); }
get descriptionVN() { return this.createForm.get('descriptionVN'); }
get detailsEN() { return this.createForm.get('detailsEN'); }
get detailsVN() { return this.createForm.get('detailsVN'); }
get price() { return this.createForm.get('price'); }
get quantity() { return this.createForm.get('quantity'); }


}
