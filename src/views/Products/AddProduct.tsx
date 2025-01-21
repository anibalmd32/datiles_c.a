import { IconButton } from "@/components/shared/IconButton/IconButton"
import { ViewContainer } from "@/components/shared/ViewMisc/ViewContainer"
import { ViewTitle } from "@/components/shared/ViewMisc/ViewTitle"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { ProductForm } from "./ProductForm/ProductForm"

export function AddProduct() {
    const navigate = useNavigate()

    return (
        <ViewContainer>
            <div className="w-full flex justify-between">
                <ViewTitle titleValue="Agregar un nuevo producto" />
                <IconButton
                    text="Regresar"
                    Icon={ArrowLeft}
                    onClick={() => {
                        navigate('/products')
                    }}
                />
            </div>
            <div>
                <ProductForm />
            </div>
        </ViewContainer>
    )
}