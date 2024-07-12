import { Button, ButtonProps } from "@mui/material"


type AppButtonProps = {
    children: string
} & ButtonProps


const AppButton = ({
    children,
    ...rest
}: AppButtonProps) => {
    return (

        <Button {...rest}>{children}</Button>
    )
}

export default AppButton