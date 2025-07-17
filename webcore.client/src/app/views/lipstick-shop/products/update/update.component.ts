import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { baseUrl, EColors } from '@common/global';
import { ToastService } from '@services/helper-services/toast.service';

interface IProductImageFile {
  type: 'AVAILABLE' | 'NEW';
  file: File;
}

@Component({
  selector: 'app-update',
  imports: [
      FormDirective, FormLabelDirective, FormSelectDirective,
      FormControlDirective, ButtonDirective, NgIf, CkeditorComponent,
      RouterLink, CardComponent, CardBodyComponent, IconDirective, NgFor,
      FormCheckComponent, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
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
  imageFiles: IProductImageFile[] = [];
  imageSrcs: string[] = [];
  initialDetailsEN: string = '';
  initialDetailsVN: string = '';
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(-1, Validators.required),
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
    private route: ActivatedRoute,
    private subCategoryService: SubCategoryService, 
    private categoryService: CategoryService, 
    private router : Router,
    private toastService: ToastService,
    private productService: ProductService,
    private brandService: BrandService,
    private sizeService: SizeService,
    private colorService: ColorService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getById(id).subscribe(res => {
      this.updateForm.patchValue(res.data);
      this.initialDetailsEN = res.data.detailsEN;
      this.initialDetailsVN = res.data.detailsVN;
      this.saleOff = res.data.saleOff;
      this.reviewUploadAvatar = baseUrl + res.data.avatar;
      this.reviewUploadBackGroundImage = baseUrl + res.data.backgroundImage;
      let imageUrls = res.data.images.split(';');
      imageUrls.forEach((imageUrl: string) => {
        this.imageSrcs.push(baseUrl + imageUrl);
        this.imageFiles.push({
          type: 'AVAILABLE',
          file: new File([], imageUrl)});
      });
      this.subCategoryService.getByCategoryId(res.data.categoryId).subscribe(res => {
        this.subCategories = res.data;
      });
    });
    this.categoryService.getAllActive().subscribe(res => {
      this.categories = res.data;
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
          this.updateForm.patchValue({ avatarFile: file });
        }
        else if(type === 'background')
        {
          this.reviewUploadBackGroundImage = e.target.result;
          this.updateForm.patchValue({ backgroundFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onChangeUploadImageFiles(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.imageFiles.push({
          type: 'NEW',
          file: files[i]
        });
        this.imageSrcs.push(URL.createObjectURL(files[i]));
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
    if(this.updateForm.valid){
      let availableImageFiles: string[] = this.imageFiles.filter(file => file.type === 'AVAILABLE').map(file => file.file.name);
      let newImageFiles: IProductImageFile[] = this.imageFiles.filter(file => file.type === 'NEW');
      const formData = new FormData();
      formData.append('id', this.updateForm.value.id);
      formData.append('categoryId', this.updateForm.value.categoryId);
      formData.append('subCategoryId', this.updateForm.value.subCategoryId);
      formData.append('brandId', this.updateForm.value.brandId);
      formData.append('sizeId', this.updateForm.value.sizeId);
      formData.append('colorId', this.updateForm.value.colorId);
      formData.append('nameEN', this.updateForm.value.nameEN);
      formData.append('nameVN', this.updateForm.value.nameVN);
      formData.append('descriptionEN', this.updateForm.value.descriptionEN);
      formData.append('descriptionVN', this.updateForm.value.descriptionVN);
      formData.append('detailsEN', this.updateForm.value.detailsEN);
      formData.append('detailsVN', this.updateForm.value.detailsVN);
      formData.append('isActive', this.updateForm.value.isActive);
      formData.append('inHomePage', this.updateForm.value.inHomePage);
      formData.append('isRecommended', this.updateForm.value.isRecommended);
      formData.append('price', this.updateForm.value.price);
      formData.append('quantity', this.updateForm.value.quantity);
      formData.append('discountPercent', this.updateForm.value.discountPercent);
      formData.append('salePrice', this.updateForm.value.salePrice);
      formData.append('saleOff', this.updateForm.value.saleOff);
      formData.append('startDiscountDate', this.updateForm.value.startDiscountDate);
      formData.append('endDiscountDate', this.updateForm.value.endDiscountDate);
      if (this.updateForm.value.avatarFile) {
        formData.append('avatarFile', this.updateForm.value.avatarFile);
      }
      if (this.updateForm.value.backgroundFile) {
        formData.append('backgroundFile', this.updateForm.value.backgroundFile);
      }
      formData.append('images', availableImageFiles.join(';'));
      newImageFiles.forEach(item => {
        formData.append('imageFiles', item.file);
      });
      this.productService.update(formData).subscribe(res => {
        this.toastService.showToast(EColors.success, res.message);
        this.router.navigate(['/lipstick-shop/products']);
      }, (failure) => {
        this.toastService.showToast(EColors.danger, failure.error.message);
      });
    }
  }

  composeText(data: string, type: string): void {
    if (type === 'VN')
      this.updateForm.patchValue({ detailsVN: data });
    else if (type === 'EN')
      this.updateForm.patchValue({ detailsEN: data });
  }

  removeImageItem(index: number): void {
    this.imageSrcs.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }

  get categoryId() { return this.updateForm.get('categoryId'); }
  get subCategoryId() { return this.updateForm.get('subCategoryId'); }
  get brandId() { return this.updateForm.get('brandId'); }
  get sizeId() { return this.updateForm.get('sizeId'); }
  get colorId() { return this.updateForm.get('colorId'); }
  get nameEN() { return this.updateForm.get('nameEN'); }
  get nameVN() { return this.updateForm.get('nameVN'); }
  get descriptionEN() { return this.updateForm.get('descriptionEN'); }
  get descriptionVN() { return this.updateForm.get('descriptionVN'); }
  get detailsEN() { return this.updateForm.get('detailsEN'); }
  get detailsVN() { return this.updateForm.get('detailsVN'); }
  get price() { return this.updateForm.get('price'); }
  get quantity() { return this.updateForm.get('quantity'); }
}