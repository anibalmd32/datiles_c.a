// React
import { useEffect } from "react";

// Zustand
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Tauri db plugin
import Database from "@tauri-apps/plugin-sql";

// Libs
import { useAsyncExecute } from "@/hooks/useAsyncExecute";
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { createFilterSlice, FilterState } from "@/lib/filtersSlice";

// Data Definition
import { Category, CategoryData } from "@/definitions/data";

// State Definition
type StoreState = {
  categories: CategoryData[];
  pagination: PaginationState;
  filters: FilterState;
};

// Store instance
export const useCategoriesStore = create<StoreState>()(
    subscribeWithSelector((...a) => ({
        categories: [],
        ...createFilterSlice()(...a),
        ...createPaginationSlice()(...a),
    })),
);

// Async actions that mutate the store
export const useCategoryActions = () => {
    const loadCategories = useAsyncExecute<Category>({
        execute: async () => {
            const db = await Database.load("sqlite:datiles.db");
            const { pagination, filters } = useCategoriesStore.getState();

            let countSql = `
                SELECT COUNT(*) AS total
                FROM categories;
            `;
            let countParams: Array<string | number> = [];

            let selectSql = `
                SELECT *
                FROM categories
                ORDER BY id DESC
                LIMIT ? OFFSET ?;
            `;
            let selectParams: Array<string | number> = [
                pagination.pageSize,
                (pagination.currentPage - 1) * pagination.pageSize,
            ];

            if (filters.search?.trim()) {
                const searchValue = filters.search.replace(/[%_]/g, "\\$&");

                countSql = `
                    SELECT COUNT(*) AS total
                    FROM categories
                    WHERE name LIKE '%' || ? || '%';
                `;
                countParams = [searchValue];

                selectSql = `
                    SELECT *
                    FROM categories
                    WHERE name LIKE '%' || ? || '%'
                    ORDER BY id DESC
                    LIMIT ? OFFSET ?;
                `;
                selectParams = [
                    searchValue,
                    pagination.pageSize,
                    (pagination.currentPage - 1) * pagination.pageSize,
                ];
            }

            const [totalCategoryStoredRows] = await db.select<
        Array<{ total: number }>
      >(countSql, countParams);

            const totalPages = Math.ceil(
                totalCategoryStoredRows.total / pagination.pageSize,
            );

            const paginatedData = await db.select<Array<CategoryData>>(
                selectSql,
                selectParams,
            );

            useCategoriesStore.setState((state) => ({
                ...state,
                categories: [...paginatedData],
                pagination: {
                    ...state.pagination,
                    totalPages,
                },
            }));
        },
    });

    const addCategory = useAsyncExecute<Category>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load("sqlite:datiles.db");
                await db.execute("INSERT INTO categories (name) VALUES (?)", [
                    values.name,
                ]);
            }
        },
    });

    const deleteCategory = useAsyncExecute<CategoryData>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load("sqlite:datiles.db");

                await db.execute("DELETE FROM categories WHERE id = ?", [values.id]);
            }
        },
    });

    const updateCategory = useAsyncExecute<CategoryData>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load("sqlite:datiles.db");
                const categoriesState = useCategoriesStore.getState().categories;

                const queryResult = await db.execute(
                    "UPDATE categories SET name = ? WHERE id = ?;",
                    [values.name, values.id],
                );

                if (queryResult.rowsAffected >= 1) {
                    useCategoriesStore.setState((prev) => ({
                        ...prev,
                        categories: [
                            ...categoriesState.map((category) => {
                                if (category.id === values.id) {
                                    return { ...category, name: values.name };
                                } else {
                                    return { ...category };
                                }
                            }),
                        ],
                    }));
                }
            }
        },
    });

    useEffect(() => {
        const unsubscribe = useCategoriesStore.subscribe(
            (state) => state.pagination.currentPage,
            () => {
                loadCategories.run();
            },
        );

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = useCategoriesStore.subscribe(
            (state) => state.filters.search,
            (newSearch, prevSearch) => {
                const state = useCategoriesStore.getState();

                // Start search
                if (newSearch.trim() && !prevSearch.trim()) {
                    state.pagination.prevPage = state.pagination.currentPage;
                    state.pagination.setCurrentPage(1);
                }

                // Input search cleared
                if (!newSearch.trim() && prevSearch.trim()) {
                    state.pagination.setCurrentPage(state.pagination.prevPage);
                }

                loadCategories.run();
            },
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (addCategory.finished && addCategory.success && !addCategory.loading) {
            loadCategories.run();
            addCategory.reset();
        }
    }, [addCategory.finished]);

    useEffect(() => {
        if (
            deleteCategory.finished &&
      deleteCategory.success &&
      !deleteCategory.loading
        ) {
            loadCategories.run();
            deleteCategory.reset();
        }
    }, [deleteCategory.finished]);

    return {
        loadCategories,
        addCategory,
        updateCategory,
        deleteCategory,
    };
};
