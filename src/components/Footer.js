import { Grid, Typography } from "@mui/material";

const Footer = () => {

    return(<>
        <Grid container spacing={0} sx={{padding: "20px", backgroundColor: "#f5f5f7"}}>
            <Grid item md={12} sx={{margin: "10px auto"}}>
                <Typography variant="h5" align="center">
                    Get in Touch
                </Typography>

                <Typography align="center">
                    Email ID: salonee@morsebiz.com
                </Typography>

                <Typography align="center">
                    Phone: +91 9833064499
                </Typography>
            </Grid>
        </Grid>
    </>)
}

export default Footer;
