
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { TextField, TextFieldProps } from '@mui/material';

function CustomTextField(props: TextFieldProps & { trulyAnError?: boolean }) {
    const { trulyAnError, ...other } = props;
    return <TextField {...other} error={trulyAnError ?? props.error} />;
}

type AppDatePickerProps = {

} & DatePickerProps<Dayjs>
const AppDatePicker = (props: AppDatePickerProps) => {

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                {...props}
                slots={{
                    textField: (params) => <CustomTextField {...params} />
                }}
            />
        </LocalizationProvider>
    )
}

export default AppDatePicker



//  <Controller
//     control={control}
//     defaultValue={dayjs().startOf("D")}
//     name="startDate"
//     rules={{
//       required: {
//         value: true,
//         message: "Start date is required",
//       },
//     }}
//     render={({ field: { onChange, value, ref } }) => (
//       <DateTimePicker
//         label="Start Date"
//         disableFuture
//         onChange={onChange}
//         onAccept={onChange}
//         value={value}
//         inputRef={ref}
//       />
//     )}
//   />