import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  offset = 0;
  limit = 20;
  isLoading = false;
  totalProducts = 0;
  

   @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchTotalProducts();
    this.fetchProducts();
    this.setupIntersectionObserver();

  }

  fetchTotalProducts(): void {
    this.productService.getTotalProducts().subscribe(data => {
      this.totalProducts = data;
      
    });
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.getProducts(this.offset, this.limit).subscribe(data => {
      this.products.push(...data);
      this.offset += this.limit;
      this.isLoading = false;
    });
  }
  setupIntersectionObserver(): void {
    const options = {
      root: this.scrollContainer.nativeElement,
      rootMargin: '0px',
      threshold: 1
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.isLoading) {
        this.fetchProducts();
      }
    }, options);

    const sentinel = document.createElement('div');
    this.scrollContainer.nativeElement.appendChild(sentinel);
    observer.observe(sentinel);
  }
}
