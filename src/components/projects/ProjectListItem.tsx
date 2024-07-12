import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ProjectDto } from '../../utils/types/ProjectsTypes';
import { Box, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';



type ProjectListItemProps = {
    project: ProjectDto
    innerRef?: React.Ref<HTMLDivElement>

}
const ProjectListItem = ({
    project,
    innerRef
}: ProjectListItemProps) => {
    const navigate = useNavigate()
    const maxDescriptionLength: number = 150

    return (
        <Box ref={innerRef} sx={{
            p: 2
        }}>
            <Typography variant="h6" color='text.primary'>{project.title}</Typography>
            <Typography variant="body2" color='text.secondary'>{project.description.length > maxDescriptionLength ? project.description.slice(0, maxDescriptionLength) + '...' : project.description}</Typography>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',

            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Rating readOnly size='small' icon={<FavoriteIcon fontSize='inherit' color='primary' sx={{ width: '15px' }} />} emptyIcon={<FavoriteBorderIcon fontSize='inherit' sx={{ width: '15px' }} />} value={project.totalRate} />
                    <Typography variant="body2" color={'text.secondary'}>{dayjs(project.startDate).format('DD/MM/YY')}</Typography>
                </Box>
                <Box>
                    <Tooltip title='Remove'>
                        <IconButton onClick={() => navigate(`delete/${project.id}`)} size="small" type="button" sx={{}} aria-label="removeProject">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Edit'>
                        <IconButton onClick={() => { navigate(`edit/${project.id}`) }} size="small" type="button" sx={{}} aria-label="editProject">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Details'>
                        <IconButton onClick={() => { navigate(`details/${project.id}`) }} size="small" type="button" sx={{}} aria-label="details">
                            <SubjectRoundedIcon />
                        </IconButton>
                    </Tooltip>

                </Box>
            </Box>
        </Box>
    )
}

export default ProjectListItem