import { Box, Button, FormGroup, Grid, IconButton, Step, StepLabel, Stepper, TextField, TextFieldProps, Typography, useTheme } from "@mui/material"
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseIcon from '@mui/icons-material/Close';
import { AppStepper } from "../common/AppStepper";
import AppDatePicker from "../common/AppDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "../../utils/zod-validations-scheme";
import { ProjectCommandType, ProjectDetailsDto } from "../../utils/types/ProjectsTypes";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useProjectCommand } from "../../hooks/ProjectHooks";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUploadImages } from "../../hooks/FirebaseHooks";

import AppAvatarUpload from "../common/AppAvatarUpload";

type ProjectFormValues = z.infer<typeof projectFormSchema>

type ProjectFormProps = {
    project?: ProjectDetailsDto
}




export const ProjectForm = ({ project }: ProjectFormProps) => {

    const [additionalImagesUrls, setAdditionalImagesUrls] = useState<string[]>(project?.additionalImages.map(i => i.url) || []);
    const [additionalImagesFiles, setAdditionalImagesFiles] = useState<File[]>([]);
    const [homeImageUrl, setHomeImageUrl] = useState<string | undefined>(project?.homeImage?.url);
    const [homeImageFile, setHomeImageFile] = useState<File | null>(null);

    const theme = useTheme()

    const [activeStep, setActiveStep] = useState(0);

    const onHomeImageChange = (inComingFile: File) => {
        setHomeImageUrl(URL.createObjectURL(inComingFile))
        setHomeImageFile(inComingFile)
    }

    const onAdditionalImagesChange = (inComingFile: File, index: number) => {
        if (!inComingFile) return
        setAdditionalImagesUrls(prev => {
            const next = [...prev];
            next[index] = URL.createObjectURL(inComingFile);
            return next;
        })
        setAdditionalImagesFiles(prev => {
            const next = [...prev];
            next[index] = inComingFile;
            return next;
        })
    }

    const onAdditionalImageRemove = (index: number) => {
        setAdditionalImagesUrls(prev => prev.filter(i => i !== prev[index]))
        setAdditionalImagesFiles(prev => prev.filter(i => i !== prev[index]))
    }

    const onAdditionalImageAdd = () => {
        setAdditionalImagesUrls(prev => [...prev, ''])
    }



    const defaultValues = project ?
        {
            title: project.title,
            description: project.description,
            githubLink: project.githubLink,
            startDate: dayjs(project.startDate),
            endDate: project.endDate != null ? dayjs(project.endDate) : null,
            features: project.features?.map(value => ({ value })),
        } :
        {
            features: [{ value: '' }],
            startDate: dayjs(new Date()),
            endDate: null as Dayjs | null
        }

    const {
        register,
        formState: { errors },
        control,
        trigger,
        reset,
        handleSubmit } = useForm<ProjectFormValues>({
            defaultValues: defaultValues,
            resolver: zodResolver(projectFormSchema),
            mode: 'onBlur'
        })

    const { fields, append, remove } = useFieldArray({
        name: 'features',
        control,
    })


    const { submit, isPending } = useProjectCommand(project ? project.id : null)

    const navigate = useNavigate()

    const { uploadImages, isImagesUploadPending } = useUploadImages()

    const onSubmit = async (data: ProjectFormValues) => {

        const features: string[] = [];
        for (const feature of data?.features) {
            if (feature?.value)
                features.push(feature.value)
        }

        const command: ProjectCommandType = {
            title: data.title,
            description: data.description ?? undefined,
            githubLink: data.githubLink ?? undefined,
            startDate: data.startDate.toISOString(),
            endDate: data.endDate?.toISOString() ?? null,
            features: features,
        }

        let images = []
        if (homeImageFile) {
            images.push(homeImageFile)
        }


        for (var image of additionalImagesFiles) {
            if (image) {
                images.push(image)
            }
        }

        if (images?.length > 0 || additionalImagesUrls.length < (project?.additionalImages?.length || 0)) {
            await uploadImages({
                files: images, folder: 'project-images'
            },
                {
                    onSuccess: async (imagesUrls) => {
                        command.homeImage = homeImageFile ? imagesUrls?.[0] : undefined
                        command.additionalImages = homeImageFile ? imagesUrls?.slice(1) : imagesUrls
                        const existImages = project?.additionalImages?.filter(image => additionalImagesUrls.includes(image.url))
                        if (existImages && existImages.length > 0) {
                            for (const image of existImages) {
                                command.additionalImages.push(image)
                            }
                        }


                        await submit(command, {
                            onSuccess: () => {
                                reset()
                                navigate(-1)
                            }
                        })
                    }
                })

        }
        else {
            await submit(command, {
                onSuccess: () => {
                    reset()
                    navigate(-1)
                }
            })
        }


    }

    const commandSteps = [
        {
            title: 'Basics',
            fields: ['title', 'githubLink', 'description', 'startDate', 'endDate'],
            content: (
                <>
                    <Grid md={6} xs={12} item>
                        <TextField
                            sx={{ width: '100%' }}
                            label='Title'
                            id="title"
                            {...register('title')}
                            error={!!errors.title}
                            helperText={errors.title?.message} />
                    </Grid>
                    <Grid md={6} xs={12} item>
                        <TextField sx={{ width: '100%' }}
                            label='GithubLink'
                            id="githubLink" {...register('githubLink')}
                            error={!!errors.githubLink}
                            helperText={errors.githubLink?.message} />
                    </Grid>
                    <Grid md={12} xs={12} item>
                        <TextField
                            sx={{ width: '100%' }}
                            multiline rows={5}
                            label='Description'
                            id="description" {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message} />
                    </Grid >
                    <Grid md={6} xs={12} item>
                        <Controller
                            control={control}
                            name="startDate"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Start date is required",
                                },
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                                <AppDatePicker
                                    label="Start Date"
                                    disableFuture
                                    onChange={onChange}
                                    onAccept={onChange}
                                    value={value}
                                    inputRef={ref}
                                    sx={{ width: '100%' }}
                                    format="DD/MM/YYYY"
                                    maxDate={dayjs(new Date())}
                                    slotProps={{
                                        textField: {
                                            trulyAnError: !!errors.startDate,
                                            helperText: errors.startDate?.message
                                        } as TextFieldProps
                                    }}

                                />
                            )}
                        />
                    </Grid>
                    <Grid md={6} xs={12} item>
                        <Controller
                            control={control}
                            name="endDate"
                            render={({ field: { onChange, value, ref } }) => (
                                <AppDatePicker
                                    label={"End Date"}
                                    disableFuture
                                    onChange={onChange}
                                    onAccept={onChange}
                                    value={value != null ? dayjs(value) : null}
                                    inputRef={ref}
                                    maxDate={dayjs(new Date())}
                                    sx={{ width: '100%' }}
                                    slots={{
                                        textField: (params) => <TextField
                                            error={!!errors.endDate}
                                            helperText={errors.endDate?.message}
                                            {...params} />,

                                    }}
                                />
                            )}
                        />
                    </Grid>
                </>
            )
        },
        {
            title: 'Images',
            fields: [],
            content: (
                <>
                    <Grid md={12} xs={12} item mb={4}>
                        <Box sx={{
                            height: {
                                xs: 200,
                                sm: 320,
                                md: 370
                            }
                        }}>

                            <AppAvatarUpload
                                src={homeImageUrl}
                                changeLabel={homeImageUrl ? 'Upload a new image' : 'Upload'}
                                onChange={onHomeImageChange}
                                smartImgFit={'orientation'}
                                style={{
                                    width: '100%',
                                    height: '100%',

                                }}
                            />
                        </Box>

                    </Grid>

                    <Grid md={12} xs={12} item sx={{ position: 'relative' }}>
                        <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={onAdditionalImageAdd}>
                            <AddRoundedIcon />
                        </IconButton>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexDirection: { md: 'row', sm: 'row', xs: 'column' },
                            alignItems: 'center',
                            gap: 2,
                            flexWrap: 'wrap',
                            mt: 4
                        }}>
                            {
                                additionalImagesUrls.map((img, index) => (
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        position: 'relative',
                                        width: {
                                            md: 220,
                                            sm: 250,
                                            xs: '100%'
                                        }, height: {
                                            md: 140,
                                            sm: 140,
                                            xs: 200
                                        }, borderRadius: 2
                                    }}>
                                        <IconButton sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }} onClick={() => onAdditionalImageRemove(index)}>
                                            <CloseIcon />
                                        </IconButton>
                                        <AppAvatarUpload
                                            src={img}
                                            style={{ width: '100%', height: '100%' }}
                                            changeLabel={additionalImagesFiles[index] ? 'Change' : 'Upload'}
                                            accept=".png, .jpg"
                                            onChange={(selectedFile) => onAdditionalImagesChange(selectedFile, index)} >

                                        </AppAvatarUpload>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Grid>
                </>


            )
        },
        {
            title: 'Features',
            fields: ['features'],
            content: (
                <>
                    <Grid md={12} xs={12} item >
                        <Typography mb={2} color={'text.secondary'} variant="h6">Project Features</Typography>
                        <FormGroup sx={{}}>
                            {
                                fields.map((field, index) => {
                                    return (
                                        <Box key={field.id} sx={{ position: 'relative' }} >
                                            <TextField
                                                sx={{ width: '100%', mb: 1 }}
                                                {...register(`features.${index}.value`)}
                                                id={`features.${index}.value`}
                                                error={!!errors.features?.[index]}
                                                helperText={errors.features?.[index]?.value?.message} />


                                            <IconButton color="error" sx={{ position: 'absolute', right: 0 }} type="button" onClick={() => remove(index)}><CloseIcon /></IconButton>


                                        </Box>
                                    )
                                })
                            }
                        </FormGroup>
                        <IconButton type="button" onClick={() => append({ value: '' })}><AddRoundedIcon /></IconButton>
                    </Grid>
                </>
            )
        },
        {
            title: 'Submit',
            fields: [],
            content: (
                <Grid md={12} xs={12} item>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: "center",
                        height: 300

                    }}>
                        <Box sx={{
                            textAlign: 'center',
                            mb: 2
                        }}>
                            <Typography color={'text.primary'} variant="h6">Project ready to fire?</Typography>
                            <Typography color={'text.secondary'} variant="body1">Submit and let's make an impact!</Typography>
                        </Box>
                        <LoadingButton loading={(isPending || isImagesUploadPending)} size="large" sx={{ color: 'text.primary', borderRadius: 30, width: 150, mb: 1 }} variant='outlined' type="submit">Submit</LoadingButton>
                        {isImagesUploadPending && <Typography fontSize={11} color={'text.secondary'} variant="body2">Uploading the images ...</Typography>}
                        {isPending && <Typography fontSize={11} color={'text.secondary'} variant="body2">Just a moment ...</Typography>}


                    </Box>
                </Grid>
            )
        }
    ]


    type FieldName = keyof (ProjectFormValues)

    const handleNext = async () => {
        const output = await trigger(commandSteps[activeStep].fields as FieldName[], { shouldFocus: true });
        if (!output) return

        setActiveStep((prevActiveStep) => {
            return prevActiveStep + 1
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const nextButton = (
        <Button size="small" onClick={handleNext} disabled={activeStep === commandSteps.length - 1}>
            Next
            {theme.direction === 'rtl' ? (
                <KeyboardArrowLeftIcon />
            ) : (
                <KeyboardArrowRightIcon />
            )}
        </Button>
    )

    const backButton = (<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        {theme.direction === 'rtl' ? (
            <KeyboardArrowRightIcon />
        ) : (
            <KeyboardArrowLeftIcon />
        )}
        Back
    </Button>)



    return (
        <Grid noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} component={'form'} sx={{
            display: 'flex', flexDirection: "column", justifyContent: "space-between", height: {
                xs: '80vh',
                md: '75vh',
                sm: '80vh'
            }
        }} >
            {
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {commandSteps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>{step.title}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            }
            <Box sx={{ height: "100%", overflow: 'hidden', overflowY: 'scroll', p: 1 }}>
                <Grid spacing={2} container >
                    {
                        commandSteps[activeStep].content
                    }
                </Grid>
            </Box>
            <Box sx={{ width: '100%' }}>
                <AppStepper nextButton={nextButton} backButton={backButton} activeStep={activeStep} steps={commandSteps.length} />
            </Box>
        </Grid>


    )
}
