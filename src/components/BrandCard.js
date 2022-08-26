import {Card, CardContent, CardMedia, Typography, CardActionArea} from '@mui/material';

const cardStyle = {
    maxWidth: 345, 
    margin: "20px auto",
    background: "rgba(255, 255, 255, 0.06)",
    boxShadow: "0px 2px 40px rgba(160, 0, 0, 0.57)",
    borderRadius: "10px",
    color: "#ffffff"
}

const BrandCard = ({details}) => {

    return(
        <Card sx={cardStyle}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="80px"
                    image={details.image}
                    sx={{objectFit: "contain"}}
                    alt="green iguana"
                />

                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" align='center'>
                        {details.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>  
    );
};

export default BrandCard;
