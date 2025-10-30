import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

const ErrorAlert = ({ message }: { message: string | undefined }) => {
    return (
        <Box sx={{ my: 1 }}>
            <FormHelperText error sx={{ minHeight: (theme) => theme.typography.caption.lineHeight }}>
                {message || ' '}
            </FormHelperText>
        </Box>
    );
};

export default ErrorAlert;