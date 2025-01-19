import ClipLoader from "react-spinners/ClipLoader";

type Props = {
    loading: boolean;
    size?: number;
    color?: string;
}

export function LoaderSpinner({ color = 'black', size = 16, loading = false }: Props) {
    return (
        <ClipLoader
            color={color}
            loading={loading}
            size={size}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}
