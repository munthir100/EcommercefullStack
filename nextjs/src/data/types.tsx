export type Country = {
    id: number;
    name: string;
    phone_code: string;
    phone_digits_number: number;
    currency_code: string;
};

export type Product = {
    id: number;
    category_id: number;
    store_id: number;
    name: string;
    sku: string;
    quantity: number | null;
    weight: number;
    short_description: string;
    unspecified_quantity: number;
    is_virtual_product: number;
    price_after_discount: number;
    brand_id: number;
    description: string;
    price: number;
    cost: number;
    is_discounted: number;
    free_shipping: number;
    is_active: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    default_currency: string;
    featuredProdcut: number;
    images: {
        main_image: {
            name: string;
            url: string;
        }[];
        sub_images: {
            name: string;
            url: string;
        }[];
    };
};

export type Category = {
    id: number;
    store_id: number;
    name: string;
    parent_id: number;
    is_active: number;
    image: {
        name: string;
        url: string;
    }[];
}