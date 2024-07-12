
import { useNavigate, useParams } from 'react-router-dom'
import AppButton from '../common/AppButton'
import { AppModal } from '../common/AppModal'
import { Box, Typography } from '@mui/material'


import { useDeleteProject } from '../../hooks/ProjectHooks'


type DeleteProjectModalProps = {

}
const DeleteProjectModal = ({ }: DeleteProjectModalProps) => {
    const navigate = useNavigate()

    const { projectId } = useParams()

    const { deleteProject } = useDeleteProject()


    const handelConfirmed = () => {
        deleteProject(projectId!)
        navigate(-1)
    }
    return (
        <AppModal open>
            <Box sx={{ textAlign: 'center' }}>

                <Typography color={'text.primary'} variant='h6' gutterBottom>Delete Project</Typography>
                <Typography color={'text.secondary'} variant='body2' gutterBottom>Are you sure you want To Delete this Project?</Typography>

                <Box sx={{
                    pt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <AppButton sx={{ color: 'text.primary' }} variant='contained' onClick={handelConfirmed}>Yes</AppButton>
                    <AppButton variant='outlined' color='error' onClick={() => navigate(-1)}>No</AppButton>
                </Box>
            </Box>
        </AppModal >
    )
}

export default DeleteProjectModal