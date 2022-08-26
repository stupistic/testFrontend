import * as React from 'react';
import {Card, CardContent, CardMedia, Typography, CardActionArea} from '@mui/material';

const CardComponent = ({details}) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      <CardActionArea>
        <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            {details.title}
        </Typography>
        </CardContent>
            <CardMedia
                component="img"
                height="250px"
                image={details.image}
                sx={{objectFit: "contain"}}
                alt="green iguana"
            />
      </CardActionArea>
    </Card>
  );
}

export default CardComponent;
