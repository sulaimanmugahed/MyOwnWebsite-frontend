import { Box, IconButton, Modal, ModalProps, useTheme } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'




type AppModalProps = {
    handelCloseButton?: () => void
    width?: string | {
        xs?: string,
        md?: string,
        sm?: string
    }
    height?: string | {
        xs?: string,
        md?: string,
        sm?: string
    }
    top?: string
    left?: string
    closeButton?: boolean

} & ModalProps
export const AppModal = ({
    children,
    width,
    height,
    top,
    left,
    closeButton,
    handelCloseButton,
    ...rest
}: AppModalProps) => {

    const theme = useTheme()

    return (
        <Modal {...rest}>
            <Box sx={{
                position: 'absolute',
                top: top ?? '50%',
                left: left ?? '50%',
                transform: 'translate(-50%,-50%)',
                width: width ?? 'auto',
                height: height ?? 'auto',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 24,
                bgcolor: theme.palette.background.default,

            }
            }>

                <Box sx={{
                    height: '100%',
                    overflow: 'auto',
                    p: { xs: 2, md: 4 },
                    mt: 2,

                }} >
                    {
                        closeButton &&
                        <IconButton onClick={handelCloseButton} sx={{ position: 'fixed', top: 0, right: 0, zIndex: 1000, color: theme.palette.text.primary, bgcolor: theme.palette.background.default }} aria-label="close modal" size="small">
                            <CloseIcon />
                        </IconButton>
                    }

                    {children}
                </Box>



            </Box>

        </Modal>
    )
}
