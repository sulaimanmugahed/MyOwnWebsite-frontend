import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Theme, SxProps } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close';
import { AppImage } from './AppImage';


type AppImageUpload = {
    onChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void
    value: ImageType[]
    maxNumber?: number
    multiple?: boolean
    imageSx?: SxProps<Theme>
    containerSx?: SxProps<Theme>
    imageContainerSx?: SxProps<Theme>
    textContainerSx?: SxProps<Theme>
    dataURLKey?: string,
    accept?: string[]
    maxSize?: number,
    defaultImages?: string[]

}

export const AppImageUpload = ({ maxSize, accept, dataURLKey, onChange, value, maxNumber, textContainerSx, multiple, imageContainerSx, imageSx, containerSx }: AppImageUpload) => {
    const theme = useTheme()


    return (
        <ImageUploading
            multiple={multiple ?? false}
            value={value}
            onChange={onChange}

            maxNumber={maxNumber}
            dataURLKey={dataURLKey || "data_url"}
            acceptType={accept || ['jpg', 'png']}
            maxFileSize={maxSize}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors
            }) => (
                <Box sx={{
                }}>

                    <Box
                        sx={{
                            ...containerSx,
                            border: `1px dashed  ${isDragging ? theme.palette.error.main : theme.palette.text.secondary}`,
                        }}

                        {...dragProps}
                    >
                        <>

                            {
                                imageList.length === 0 ?
                                    (<Box onClick={onImageUpload} sx={textContainerSx ?? {
                                        display: "flex",
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        cursor: "pointer",
                                        width: "100%",
                                        height: '100%',
                                        textAlign: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Typography variant='h6' color={'text.primary'} sx={{ cursor: 'pointer' }}>Click or Drop here to upload.</Typography>
                                        <Typography variant='body2' color={'text.secondary'} >Only 450x600 images size are allowed</Typography>
                                    </Box>)
                                    : (
                                        <>
                                            {
                                                multiple && (
                                                    <Box sx={{ alignSelf: 'end', mb: 1 }}>
                                                        <Tooltip title='Upload new image'>
                                                            <IconButton onClick={onImageUpload}><AddRoundedIcon /></IconButton>
                                                        </Tooltip>

                                                        <Tooltip title='Remove all uploaded images'>
                                                            <IconButton onClick={onImageRemoveAll}><ClearAllIcon /></IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                )
                                            }
                                            <Box sx={{
                                                ...imageContainerSx
                                            }}>
                                                {

                                                    imageList.map((image, index) => (
                                                        <Box key={index} sx={{
                                                            position: 'relative',
                                                        }} >
                                                            <AppImage src={image[dataURLKey || 'data_url']} sx={{ ...imageSx }} />
                                                            <Box sx={{ position: 'absolute', top: 0, right: 0 }} className="image-item__btn-wrapper">
                                                                <Tooltip title='change'>
                                                                    <IconButton color='primary' sx={{ color: 'primary' }} onClick={() => onImageUpdate(index)}><EditIcon sx={{ width: 15, height: 15 }} /></IconButton>
                                                                </Tooltip>
                                                                <Tooltip title='Delete'>
                                                                    <IconButton color='error' onClick={() => onImageRemove(index)}><CloseIcon sx={{ width: 15, height: 15 }} /></IconButton>
                                                                </Tooltip>
                                                            </Box>
                                                        </Box>
                                                    ))


                                                }


                                            </Box>
                                        </>
                                    )

                            }
                            {
                                errors &&
                                <Box>
                                    {errors.maxNumber && <Typography color={'error'}>the max number of images r {maxNumber}</Typography>}
                                    {errors.acceptType && <Typography color={'error'}>Your selected file type is not allowed</Typography>}
                                    {errors.maxFileSize && <Typography color={'error'}>maxFileSize error</Typography>}
                                    {errors.resolution && <Typography color={'error'}>resolution error</Typography>}

                                </Box>
                            }
                        </>
                    </Box>

                </Box>
            )
            }
        </ImageUploading >
    );
}