import { toast } from "sonner";
import { multiUploadToFireStorage } from "../utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useUploadImages = () => {
    const { t } = useTranslation()
    const {
        mutateAsync,
        isPending,
        isSuccess } = useMutation({
            mutationFn: async ({ files, folder }: { files: File[], folder: string }) => {
                const imageUrls = await multiUploadToFireStorage(files, folder)
                return imageUrls;
            },
            onError: () => toast.error(t('error_uploading_images')),
            retry: 3
        })

    return {
        uploadImages: mutateAsync,
        isImagesUploadPending: isPending,
        isImagesUploadSuccess: isSuccess
    }
}

