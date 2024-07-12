import { z } from "zod";
import { client } from "./client";
import dayjs, { Dayjs } from "dayjs";






export const loginFormValidationSchema = z.object({
    password: z
        .string()
        .min(6, 'password_should_more_5'),


    username: z
        .string()
        .min(5, 'username_should_more_4')

})



const zodDay = z.instanceof(dayjs as unknown as typeof Dayjs, { message: 'invalid date' })



export const projectFormSchema = z.object({
    title: z.string().min(1, "the title is required"),
    description: z.string().max(4000, "the max chars is 4000").nullish(),
    githubLink: z
        .union([z.string().nullish().refine((url) => {
            if (url && !url.startsWith('https://github.com/')) {
                return false;
            }
            return true;
        }, 'invalid github link'), z.literal("")]),

    features: z.array(z.object({
        value: z.string().nullish(),
    })),
    startDate: zodDay,
    endDate: zodDay.nullable()
})


export const ContactFormScheme = z.object({
    name: z.string().min(1, 'name_req'),
    email: z.string().min(1, 'email_req').email("invalid_email"),
    subject: z.string().min(1, 'subject_req'),
    message: z.string().min(1, 'message_req')
});



export const registerFormValidationSchema = z.object({
    name: z
        .string()
        .min(1, 'name_req'),

    email: z
        .string()
        .min(1, 'email_req')
        .regex(/^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})$/, "Invalid Email")
        .refine(async (value) => {
            const data = await client
                .post(`account/isEmailExist?email=${value}`)
                .then(response => response?.data?.data);
            return !data
        }, 'email_exist'),

    username: z
        .string()
        .min(1, 'username_req')
        .refine(async (value) => {
            const data = await client
                .post(`account/isUsernameExist?username=${value}`)
                .then(response => response?.data?.data);
            return !data
        }, 'username_exist'),

    password: z
        .string()
        .min(1, 'password_req'),

    confirmPassword: z
        .string()
        .min(1, 'confirm_password_req'),
})
    .refine(data => data.password === data.confirmPassword,
        {
            message: 'password_no_match',
            path: ['confirmPassword'], // Set the error path to confirmPassword
        })