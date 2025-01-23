import { useNavigate } from "react-router";

export const usePresentationCard = () => {
    const navigate = useNavigate()

    const enterBtnOnClick = () => navigate('app')

    return { enterBtnOnClick }
}
