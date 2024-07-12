import { Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import AppButton from '../common/AppButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useNavigate } from 'react-router-dom'
import { ProjectDto } from '../../utils/types/ProjectsTypes'
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'sonner'
import NoImage from "../../assets/no-image.png"
import { useTranslation } from 'react-i18next'



type ProjectCardProps = {
    project: ProjectDto,
    innerRef?: React.Ref<HTMLDivElement>
}


export const ProjectCard = ({
    project,
    innerRef


}: ProjectCardProps) => {

    const maxDescriptionLength: number = 200
    const { t } = useTranslation()

    const navigate = useNavigate()
    const [, copy] = useCopyToClipboard()

    const showDetails = (id: string) => {
        navigate('/projects/' + id)
    }

    return (
        <Card ref={innerRef} sx={{
            height: {
                md: '420px',
                xs: '480px',

            },

            position: 'relative',
        }}  >
            <CardMedia
                component={'img'}
                sx={{
                    height: {
                        md: 180,
                        xs: 200
                    },
                    objectFit: project.homeImage ? 'cover' : 'contain'
                }

                }
                image={project.homeImage || NoImage}
                loading='lazy'
                alt={project.title} />

            <CardContent >
                <Typography variant="body1" fontWeight={'bold'} component={'div'}>{project.title}</Typography>
                <Rating precision={0.5} readOnly size='small' icon={<FavoriteIcon sx={{ width: '12px' }} fontSize='inherit' color='primary' />} emptyIcon={<FavoriteBorderIcon sx={{ width: '12px' }} fontSize='inherit' />} value={project.totalRate} />
                <Typography gutterBottom color={'text.secondary'} variant="body2" component={'div'}>{project.description.length > maxDescriptionLength ? project.description.slice(0, maxDescriptionLength) + '...' : project.description}</Typography>
            </CardContent>

            <CardActions sx={{ position: 'absolute', bottom: '10px' }}>
                <AppButton onClick={() => {
                    copy(`${window.location}/${project.id}`)
                    toast.info(t('link_copied_to_clipboard_info'))
                }} size="small">{t('share')}</AppButton>
                <AppButton onClick={() => showDetails(project.id)} size="small">{t('read-more')}</AppButton>
            </CardActions>
        </Card>
    )
}
