
export interface Products {
    id: number;
    name: string;
    categories: number[];
    available: boolean;
    bestSeller: boolean;
    price: string;
    img: string;
    description: string;
}

export interface Categories {
    id: number;
    name: string;
}

export interface Filters {
    id: number;
    name: string;
    type: string;
}

export interface ProductsShoppingCar {
    id: number;
    name: string;
    price: string;
    img: string;
    quantity: number;
}
