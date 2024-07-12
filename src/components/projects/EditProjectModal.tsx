import { Box, Typography } from "@mui/material"
import { AppModal } from "../common/AppModal"
import { useNavigate, useParams } from "react-router-dom"
import { ProjectForm } from "./ProjectForm"
import { useProjectDetailsData } from "../../hooks/ProjectHooks"
import { AppError } from "../common/errors/AppError"

type EditProjectModalProps =
    {
        open?: boolean
    }


const EditProjectModal = ({
    open }: EditProjectModalProps) => {
    const navigate = useNavigate()

    const { projectId } = useParams()

    const { projectDetail, isLoadingProjectDetail, isErrorProjectDetail } = useProjectDetailsData(projectId!)

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
            }}
            closeButton handelCloseButton={handelCloseButton} open={open ?? true}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography mb={2} color={'text.primary'} variant="h6">Editing Exist Project</Typography>
                <Box width={'100%'}>
                    {
                        isErrorProjectDetail ?
                            (
                                <AppError />
                            ) :
                            isLoadingProjectDetail ? (
                                <Typography color={'text.secondary'} variant="h6">Loading ...</Typography>

                            ) : (
                                <ProjectForm project={projectDetail} />
                            )
                    }
                </Box>
            </Box>
        </AppModal>
    )
}

export default EditProjectModal