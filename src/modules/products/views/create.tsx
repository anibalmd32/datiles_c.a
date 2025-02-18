import { ViewContainer } from "@/components/shared/ViewMisc/ViewContainer";
import { ViewTitle } from "@/components/shared/ViewMisc/ViewTitle";
import { Separator } from "@/components/ui/separator";
// import { IconButton } from "@/components/shared/IconButton/IconButton";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router";
import { ProductsForm } from "../components/ProductsForm";

export function CreateProduct() {
    // const navigate = useNavigate();

    return (
        <ViewContainer>
            <div className="flex justify-between">
                <ViewTitle titleValue="Agregar un nuevo producto" />

                {/* <IconButton
                    type="button"
                    Icon={ArrowLeft}
                    text="Regresar"
                    onClick={() => navigate("/app/products")}
                /> */}
                <a href="/app/products">Regresar</a>
            </div>

            <Separator />

            <ProductsForm />
        </ViewContainer>
    );
}
