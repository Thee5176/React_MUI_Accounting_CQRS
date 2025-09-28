import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <Typography variant="h1">404 Not Found</Typography>
            <Button>
                <Link to='/'>Back to HomePage</Link>
            </Button>
        </>
    );
}