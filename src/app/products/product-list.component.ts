import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    showImages: boolean = false;
    imageWidth: number = 50;
    imageMargin: number = 2;
    _listFilter: string;
    filteredProducts: IProduct[];
    products: IProduct[] = [];
    errorMessage: string;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        console.log('ngOnInit');
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
    }

    toggleImages(): void {
        this.showImages = !this.showImages;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }



}
