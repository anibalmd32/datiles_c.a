import { create } from "zustand";
import { Product, SharedDataProp } from "@/definitions/data";
import { PaginatedData } from "@/definitions/helpers";
import { AsyncSlice } from "@/lib/asyncSlices";
import { addProductSlice } from "./productsSlices/addProductSlice";
import { loadProductsSlice } from "./productsSlices/loadProductsSlice";

export type ProductsBaseState = {
    products: PaginatedData<Array<Product & SharedDataProp & { category_name: string}>>;
    totalInvested: {
        bs: number;
        usd: number;
    };
}

type ProductsSlices = {
    loadProducts: AsyncSlice<PaginatedData<Array<Product>>>;
    addProduct: AsyncSlice<Product>;
}

export const useProductsStore = create<
    ProductsBaseState & ProductsSlices
>()((...a) => ({
    products: {
        currentPage: 1,
        data: [],
        nextPage: 2,
        pageSize: 10,
        prevPage: 0,
        totalPages: 0
    },
    totalInvested: { bs: 0, usd: 0 },
    addProduct: addProductSlice(...a),
    loadProducts: loadProductsSlice(...a)
}))
