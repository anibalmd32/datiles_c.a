import {
    useCategoryActions,
    useCategoriesStore,
} from "../stores/categoriesStore";
import { Category, CategoryData } from "@/definitions/data";
import { FilterState } from "@/lib/filtersSlice";
import { PaginationState } from "@/lib/paginationSlice";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { AsyncAction } from "@/hooks/useAsyncExecute";

const CategoriesCtx = createContext(
  {} as {
    categories: CategoryData[];
    filters: FilterState;
    pagination: PaginationState;
    addCategory: AsyncAction<Category>;
    deleteCategory: AsyncAction<CategoryData>;
    loadCategories: AsyncAction<CategoryData>;
    updateCategory: AsyncAction<CategoryData>;
    openEditForm: boolean;
    editDefaultValues: CategoryData | null;
    handleOpenEditForm: (values: CategoryData) => void;
    handleCloseEditForm: () => void;
  },
);

export function CategoriesProvider({ children }: { children: ReactNode }) {
    const [openEditForm, setOpenEditForm] = useState(false);
    const [editDefaultValues, setEditDefaultValues] =
    useState<CategoryData | null>(null);

    const { categories, filters, pagination } = useCategoriesStore();
    const { addCategory, deleteCategory, loadCategories, updateCategory } =
    useCategoryActions();

    const handleOpenEditForm = (values: CategoryData) => {
        setOpenEditForm(true);
        setEditDefaultValues(values);
    };

    const handleCloseEditForm = () => {
        setOpenEditForm(false);
        setEditDefaultValues(null);
    };

    useEffect(() => {
        loadCategories.run();
    }, []);

    return (
        <CategoriesCtx.Provider
            value={{
                categories,
                filters,
                pagination,
                addCategory,
                deleteCategory,
                updateCategory,
                loadCategories,
                editDefaultValues,
                handleCloseEditForm,
                handleOpenEditForm,
                openEditForm,
            }}
        >
            {children}
        </CategoriesCtx.Provider>
    );
}

export const useCategories = () => useContext(CategoriesCtx);
