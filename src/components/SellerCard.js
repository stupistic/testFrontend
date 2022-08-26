import * as React from 'react';
import {Card, CardContent, CardMedia, Typography, CardActionArea} from '@mui/material';

const SellerCard = ({details}) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="250px"
                image={details.image}
                sx={{objectFit: "contain"}}
                alt="green iguana"
            />

            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {details.title}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  );
}

export default SellerCard;
