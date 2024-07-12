import { Chip, Grid } from '@mui/material'
import { ProjectFilterType } from '../../utils/types/ProjectsTypes'
import AppSearch from '../common/AppSearch'
import { AppSearchFormValues } from '../../utils/types/CommonTypes'
import { useTranslation } from 'react-i18next'

type ProjectFilterProps = {
    handelFilter: (value: string) => void
    filters: ProjectFilterType[]
    handleSearchSubmit: (value: AppSearchFormValues) => void
    currentFilter: string
}

const ProjectFilter = ({
    handelFilter,
    filters,
    handleSearchSubmit,
    currentFilter
}: ProjectFilterProps) => {
    const { t } = useTranslation()
    return (
        <Grid container sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: {
                xs: 'column',
                md: 'row'
            },
            gap: { xs: 2, md: 0 },
            p: 2
        }}>
            <Grid sx={{
                display: 'flex',
                alignItems: {
                    xs: 'center',
                    md: 'start'
                },
                justifyContent: {
                    xs: 'center',
                    md: 'start'
                },
                gap: 1,
            }} item md={6} xs={12}  >
                {
                    filters.map((filter, index) => (
                        <Chip size="small" key={index} color={currentFilter === filter.value ? 'primary' : 'default'} sx={{ width: '100px', height: '30px' }} label={t(filter.value)} variant="outlined" onClick={() => handelFilter(filter.value)} />
                    ))
                }
            </Grid>
            <Grid md={6} xs={12} sx={{
                display: 'flex',
                alignItems: {
                    xs: 'center',
                    md: 'end'
                },
                justifyContent: {
                    xs: 'center',
                    md: 'end'
                }
            }} item>
                <AppSearch onSubmit={handleSearchSubmit} placeholder={t('project-search-placeholder')} />
            </Grid>
        </Grid>
    )
}

export default ProjectFilter