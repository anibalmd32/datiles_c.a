import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  size?: number;
  color?: string;
};

export function LoaderSpinner({ color = "black", size = 16 }: Props) {
    return (
        <ClipLoader
            color={color}
            loading={true}
            size={size}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}
