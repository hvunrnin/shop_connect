import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = { id: 0, name: '', price: 0 };  // 선택된 제품
  isEditing = false;  // 제품 추가/수정 상태 확인

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();  // 컴포넌트가 로드될 때 제품 목록을 불러옴
  }

  // 모든 제품을 로드
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error loading products', error);
      }
    );
  }
  // 제품 추가
  addProduct(): void {
    this.productService.addProduct(this.selectedProduct).subscribe(
      (newProduct: Product) => {
        this.products.push(newProduct);
        this.clearForm();  // 폼 초기화
      },
      error => {
        console.error('Error adding product', error);
      }
    );
  }

  // 제품 수정
  updateProduct(): void {
    this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(
      () => {
        // 수정된 제품을 목록에서 업데이트
        const index = this.products.findIndex(p => p.id === this.selectedProduct.id);
        if (index !== -1) {
          this.products[index] = { ...this.selectedProduct };  // 기존 목록에서 수정된 데이터를 반영
        }
        this.clearForm();  // 폼 초기화
      },
      error => {
        console.error('Error updating product', error);
      }
    );
  }


  // 제품 삭제
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== id);
      },
      error => {
        console.error('Error deleting product', error);
      }
    );
  }

  // 제품 수정 모드로 변경
  editProduct(product: Product): void {
    this.selectedProduct = { ...product };  // 선택된 제품을 복사해서 편집 모드로 설정
    this.isEditing = true;
  }

  // 폼 초기화
  clearForm(): void {
    this.selectedProduct = { id: 0, name: '', price: 0 };
    this.isEditing = false;
  }
}
