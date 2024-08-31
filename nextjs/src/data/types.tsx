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
    has_unspecified_quantity: boolean;
    is_virtual_product: boolean;
    price_after_discount: number;
    brand_id: number;
    description: string;
    price: number;
    cost: number;
    is_discounted: boolean;
    free_shipping: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    default_currency: string;
    featuredProdcut: boolean;
    images: {
        main_image: {
            name: string;
            url: string;
        };
        sub_images: {
            name: string;
            url: string;
        }[];
    };
};
