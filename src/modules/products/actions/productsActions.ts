// React
import { useEffect } from "react";

// Libs
import { useAsyncExecute } from "@/hooks/useAsyncExecute";
import { Model } from "@/lib/queryBuilder/Model";

// Data Definition
import {
    CategoryData,
    MeasurementUnitData,
    Product,
    ProductData,
    Stock,
    StockData,
} from "@/definitions/data";
import { ProductFormType } from "../schemas/productSchema";
import { TABLES } from "@/definitions/enums";

// Store
import { useProductsStore } from "../stores/productsStore";

export const useProductsActions = () => {
    const loadProducts = useAsyncExecute({
        execute: async () => {
            const { pagination, filters } = useProductsStore.getState();

            const productsModel = new Model<ProductData>(TABLES.PRODUCTS);
            const stockModel = new Model<StockData>(TABLES.STOCK);
            const categoryModel = new Model<CategoryData>(TABLES.CATEGORIES);
            const measurementModel = new Model<MeasurementUnitData>(
                TABLES.MEASUREMENT_UNITS,
            );

            const productsData = await productsModel.select(
                {
                    filters: [{ column: "name", operator: "like", value: "?" }],
                    order: "DESC",
                    pagination: { size: "?", skip: "?" },
                },
                [
                    filters.search,
                    pagination.pageSize,
                    (pagination.currentPage - 1) * pagination.pageSize,
                ],
            );

            const data: Array<ProductData> = await Promise.all(
                productsData.map(async (item) => {
                    const stockData = await stockModel.select(
                        {
                            filters: [
                                {
                                    column: "product_id",
                                    operator: "=",
                                    value: "?",
                                },
                            ],
                        },
                        [item.id],
                    );

                    const measurementData = await measurementModel.select(
                        {
                            filters: [
                                {
                                    column: "id",
                                    operator: "=",
                                    value: "?",
                                },
                            ],
                        },
                        [stockData[0].unit_per_measurement],
                    );

                    const categoryData = await categoryModel.select(
                        {
                            filters: [
                                {
                                    column: "id",
                                    operator: "=",
                                    value: "?",
                                },
                            ],
                        },
                        [item.category_id],
                    );

                    return {
                        ...item,
                        stock: {
                            data: stockData[0],
                            measurement: measurementData[0],
                        },
                        category: categoryData[0],
                    };
                }),
            );

            const total = await productsModel.count(
                {
                    where: [{ column: "name", operator: "like", value: "?" }],
                },
                [filters.search],
            );

            const totalPages = Math.ceil(total / pagination.pageSize);

            useProductsStore.setState((state) => ({
                ...state,
                products: [...data],
                pagination: {
                    ...state.pagination,
                    totalPages,
                },
            }));
        },
    });

    const addProducts = useAsyncExecute<ProductFormType>({
        execute: async (values) => {
            if (values) {
                const productsModel = new Model<Product>(TABLES.PRODUCTS);
                const stockModel = new Model<Stock>(TABLES.STOCK);

                const { lastInsertId } = await productsModel.create(
                    {
                        name: "?",
                        purchase_usd: "?",
                        purchase_bs: "?",
                        sale_usd: "?",
                        iva: "?",
                        category_id: "?",
                        code: "?",
                    },
                    [
                        values.name,
                        values.purchase_usd,
                        values.purchase_bs,
                        values.sale_usd,
                        values.iva,
                        values.category_id,
                        values.code,
                    ],
                );

                if (lastInsertId) {
                    await stockModel.create(
                        {
                            measurement_unit_id: "?",
                            product_id: "?",
                            quantity: "?",
                            unit_per_measurement: "?",
                        },
                        [
                            values.measurement_unit_id,
                            lastInsertId,
                            values.quantity,
                            values.unit_per_measurement,
                        ],
                    );
                }
            }
        },
    });

    const deleteProducts = useAsyncExecute<ProductData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<ProductData>(TABLES.PRODUCTS);
                await model.delete({ id: values.id });
            }
        },
    });

    const updateProducts = useAsyncExecute<ProductData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<ProductData>(TABLES.PRODUCTS);
                const state = useProductsStore.getState().products;

                await model.update(
                    {
                        data: { name: "?" },
                        id: "?",
                    },
                    [values.name, values.id],
                );

                useProductsStore.setState((prev) => ({
                    ...prev,
                    products: [
                        ...state.map((product) => {
                            if (product.id === values.id) {
                                return { ...product, name: values.name };
                            } else {
                                return { ...product };
                            }
                        }),
                    ],
                }));
            }
        },
    });

    useEffect(() => {
        const unsubscribe = useProductsStore.subscribe(
            (state) => state.pagination.currentPage,
            () => {
                loadProducts.run();
            },
        );

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = useProductsStore.subscribe(
            (state) => state.filters.search,
            (newSearch, prevSearch) => {
                const state = useProductsStore.getState();

                // Start search
                if (newSearch.trim() && !prevSearch.trim()) {
                    state.pagination.prevPage = state.pagination.currentPage;
                    state.pagination.setCurrentPage(1);
                }

                // Input search cleared
                if (!newSearch.trim() && prevSearch.trim()) {
                    state.pagination.setCurrentPage(state.pagination.prevPage);
                }

                loadProducts.run();
            },
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (
            addProducts.finished &&
            addProducts.success &&
            !addProducts.loading
        ) {
            loadProducts.run();
            addProducts.reset();
        }
    }, [addProducts.finished]);

    useEffect(() => {
        if (
            deleteProducts.finished &&
            deleteProducts.success &&
            !deleteProducts.loading
        ) {
            loadProducts.run();
            deleteProducts.reset();
        }
    }, [deleteProducts.finished]);

    return {
        loadProducts,
        addProducts,
        updateProducts,
        deleteProducts,
    };
};
