import { Box } from '@mui/material'
import { AppImage } from '../common/AppImage'
import { ProjectImage } from '../../utils/types/ProjectsTypes'
import NoImage from "../../assets/no-image.png"
import Slider from 'react-slick'


type ProjectDetailsSliderProps = {
    homeImage?: ProjectImage,
    additionalImages?: ProjectImage[]
}

const ProjectDetailsSlider = ({ homeImage, additionalImages }: ProjectDetailsSliderProps) => {

    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        arrows: false
    };

    return (
        <Box mb={4}>
            {
                (additionalImages?.length === 0 && !homeImage) ?
                    (
                        <Slider  {...settings}>
                            <AppImage src={NoImage} sx={{
                                width: '100%',
                                maxHeight: {
                                    xs: 160,
                                    sm: 450,
                                    md: 450
                                },
                                objectFit: 'contain'

                            }} />
                        </Slider>
                    )
                    : (
                        <Slider  {...settings}>
                            {
                                homeImage && (
                                    < AppImage src={homeImage.url} sx={{
                                        width: '100%',
                                        maxHeight: {
                                            xs: 160,
                                            sm: 450,
                                            md: 450
                                        },
                                        objectFit: 'cover'

                                    }} />
                                )
                            }
                            {

                                additionalImages?.map((image, index) => (

                                    <AppImage key={index} src={image.url} sx={{
                                        width: '100%',
                                        maxHeight: {
                                            xs: 160,
                                            sm: 450,
                                            md: 450
                                        },
                                        objectFit: 'cover'
                                    }} />

                                ))
                            }
                        </Slider>)}
        </Box>
    )
}

export default ProjectDetailsSlider