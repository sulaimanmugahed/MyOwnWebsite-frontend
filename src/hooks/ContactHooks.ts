import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"


export const useContactMe = () => {
    const { t } = useTranslation()
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: any) => {
            const emailData = {
                service_id: import.meta.env.VITE_EMAIL_SERVICE_ID,
                template_id: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                user_id: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
                template_params: {
                    from_name: data.name,
                    from_email: data.email,
                    subject: data.subject,
                    message: data.message
                },
            }
            return (await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData)).data
        },
        onSuccess: () => {
            toast.success(t('email_sent_successfully'))

        },
        onError: () => {
            toast.error(t('some_thing_went_wrong'))
        }
    })

    return {
        send: mutate,
        isPending
    }
}