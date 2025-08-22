import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const ErrorAlert = ({ message }: { message: string | undefined }) => {
    if (!message) return null; // Don't render if there's no message

    return (
        <Box sx={{my:2}}>
            <Alert severity="error" variant="filled">
                {message}
            </Alert>
        </Box>
    );
};

export default ErrorAlert;