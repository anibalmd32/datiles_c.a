import { useState } from "react";

type Props<T> = {
    execute: (values?: T) => Promise<void>;
};

export type ExternalCallbacks = {
    onSuccess?: () => void;
    onError?: (errMsg: string) => void;
    onFinish?: () => void;
};

export type AsyncAction<T> = {
    run: (cbs?: ExternalCallbacks, values?: T | undefined) => Promise<void>;
    loading: boolean;
    success: boolean;
    finished: boolean;
};

export function useAsyncExecute<T>({ execute }: Props<T>) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [finished, setFinished] = useState(false);

    const reset = () => {
        setFinished(false);
        setSuccess(false);
        setLoading(false);
    };

    const run = async (cbs?: ExternalCallbacks, values?: T) => {
        setLoading(true);

        try {
            await execute(values);
            setSuccess(true);
            cbs?.onSuccess?.();
        } catch (err) {
            const e = err as { message: string };
            cbs?.onError?.(e.message);
            setSuccess(false);
        } finally {
            setLoading(false);
            setFinished(true);
            cbs?.onFinish?.();
        }
    };

    return {
        run,
        loading,
        success,
        finished,
        reset,
    };
}
