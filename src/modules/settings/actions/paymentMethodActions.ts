import { PaymentMethod, PaymentMethodData } from "@/definitions/data";
import { useAsyncExecute } from "@/hooks/useAsyncExecute";
import { usePaymentMethodsStore } from "../stores/paymentMethodsStore";
import { TABLES } from "@/definitions/enums";
import { Model } from "@/lib/queryBuilder/Model";
import { useEffect } from "react";

export const usePaymentMethodsActions = () => {
    const loadPaymentMethods = useAsyncExecute<PaymentMethod>({
        execute: async () => {
            const { pagination, filters } = usePaymentMethodsStore.getState();

            const model = new Model<PaymentMethodData>(TABLES.PAYMENT_METHODS);

            const data = await model.select(
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

            const total = await model.count(
                {
                    where: [{ column: "name", operator: "like", value: "?" }],
                },
                [filters.search],
            );

            const totalPages = Math.ceil(total / pagination.pageSize);

            usePaymentMethodsStore.setState((state) => ({
                ...state,
                paymentMethods: [
                    ...data.map((pm) => {
                        const activeValue = String(pm.active);
                        if (activeValue === "true") {
                            return { ...pm, active: true };
                        }

                        if (activeValue === "false") {
                            return { ...pm, active: false };
                        }

                        return pm;
                    }),
                ],
                pagination: {
                    ...state.pagination,
                    totalPages,
                },
            }));
        },
    });

    const addPaymentMethod = useAsyncExecute<PaymentMethod>({
        execute: async (values) => {
            if (values) {
                const model = new Model<PaymentMethod>(TABLES.PAYMENT_METHODS);
                await model.create({ name: "?", active: "?" }, [
                    values.name,
                    values.active,
                ]);
            }
        },
    });

    const deletePaymentMethod = useAsyncExecute<PaymentMethodData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<PaymentMethod>(TABLES.PAYMENT_METHODS);
                await model.delete({ id: values.id });
            }
        },
    });

    const updatePaymentMethod = useAsyncExecute<PaymentMethodData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<PaymentMethod>(TABLES.PAYMENT_METHODS);
                await model.update(
                    {
                        data: { name: "?" },
                        id: "?",
                    },
                    [values.name, values.id],
                );

                usePaymentMethodsStore.setState((prev) => ({
                    ...prev,
                    paymentMethods: [
                        ...prev.paymentMethods.map((paymentMethod) => {
                            if (paymentMethod.id === values.id) {
                                return { ...paymentMethod, name: values.name };
                            } else {
                                return { ...paymentMethod };
                            }
                        }),
                    ],
                }));
            }
        },
    });

    const updateStatus = useAsyncExecute<{ id: number; status: boolean }>({
        execute: async (values) => {
            if (values) {
                const model = new Model<PaymentMethod>(TABLES.PAYMENT_METHODS);
                await model.update(
                    {
                        data: { active: "?" },
                        id: "?",
                    },
                    [values.status, values.id],
                );

                usePaymentMethodsStore.setState((state) => ({
                    ...state,
                    paymentMethods: state.paymentMethods.map((pm) => {
                        if (pm.id === values.id) {
                            return { ...pm, active: values.status };
                        } else {
                            return pm;
                        }
                    }),
                }));
            }
        },
    });

    useEffect(() => {
        const unsubscribe = usePaymentMethodsStore.subscribe(
            (state) => state.pagination.currentPage,
            () => {
                loadPaymentMethods.run();
            },
        );

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = usePaymentMethodsStore.subscribe(
            (state) => state.filters.search,
            (newSearch, prevSearch) => {
                const state = usePaymentMethodsStore.getState();

                // Start search
                if (newSearch.trim() && !prevSearch.trim()) {
                    state.pagination.prevPage = state.pagination.currentPage;
                    state.pagination.setCurrentPage(1);
                }

                // Input search cleared
                if (!newSearch.trim() && prevSearch.trim()) {
                    state.pagination.setCurrentPage(state.pagination.prevPage);
                }

                loadPaymentMethods.run();
            },
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (
            addPaymentMethod.finished &&
      addPaymentMethod.success &&
      !addPaymentMethod.loading
        ) {
            loadPaymentMethods.run();
            addPaymentMethod.reset();
        }
    }, [addPaymentMethod.finished]);

    useEffect(() => {
        if (
            deletePaymentMethod.finished &&
      deletePaymentMethod.success &&
      !deletePaymentMethod.loading
        ) {
            loadPaymentMethods.run();
            deletePaymentMethod.reset();
        }
    }, [deletePaymentMethod.finished]);

    return {
        loadPaymentMethods,
        addPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
        updateStatus,
    };
};
