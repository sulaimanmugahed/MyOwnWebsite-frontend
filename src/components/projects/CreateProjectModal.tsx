import { Box, Typography } from "@mui/material"
import { AppModal } from "../common/AppModal"
import { useNavigate } from "react-router-dom"
import { ProjectForm } from "./ProjectForm"


type CreateProjectModalProps =
    {
        open?: boolean
    }


const CreateProjectModal = ({
    open }: CreateProjectModalProps) => {
    const navigate = useNavigate()

    const handelCloseButton = () => {
        navigate(-1)
    }




    return (
        <AppModal height=
            {{
                xs: '95vh',
                sm: '95vh',
                md: '95vh'
            }}
            width={{
                xs: '95%',
                sm: '70%',
                md: '60%',
            }} closeButton handelCloseButton={handelCloseButton} open={open ?? true}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography mb={2} color={'text.primary'} variant="h6">Adding New Project</Typography>
                <Box width={'100%'}>
                    <ProjectForm />

                </Box>
            </Box>
        </AppModal>
    )
}

export default CreateProjectModal