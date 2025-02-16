import { useToast } from "@/hooks/use-toast";

export const useAlert = () => {
    const { toast } = useToast();

    const emitSuccessAlert = (msg: string) => {
        toast({
            title: msg,
        });
    };

    const emitErrorAlert = (msg: string) => {
        toast({
            title: msg,
            variant: "destructive",
        });
    };

    return { emitSuccessAlert, emitErrorAlert };
};
