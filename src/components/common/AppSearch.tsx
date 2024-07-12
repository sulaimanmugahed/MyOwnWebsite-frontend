import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";
import { AppSearchFormValues } from "../../utils/types/CommonTypes";




type AppSearchProps = {
    onSubmit: (data: AppSearchFormValues) => void,
    placeholder?: string
}

const AppSearch = ({
    onSubmit,
    placeholder
}: AppSearchProps) => {

    const { register, handleSubmit } = useForm<AppSearchFormValues>({
        defaultValues: {
            searchValue: ''
        }
    })


    return (
        <>
            <Paper
                autoComplete="off"
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ p: '2px 4px', borderRadius: 30, position: 'sticky', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{marginInline:2, flex: 1 }}
                    {...register('searchValue')}
                    id="searchValue"
                    placeholder={placeholder}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>

        </>

    )
}

export default AppSearch