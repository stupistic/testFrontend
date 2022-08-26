import {Card, CardContent, Typography, CardActionArea} from '@mui/material';

const CategoryCard = ({ details, setSelected }) =>  {
    return(
        <Card
            sx={{
                display: "block",
                margin: "25px auto",
                boxShadow: "0px 2px 30px #103F6D",
                borderRadius: "10px",
                maxWidth: "180px",
                width: "90%",
            }}
        >
            <CardActionArea
                sx={{
                    paddingTop: "100px",
                }}

                onClick={() => setSelected(details.name)}
            >
                <CardContent>
                    <Typography 
                        align="center"
                        sx={{
                            fontSize: "16px"
                        }}
                    >
                        {details.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>  
    )
}

export default CategoryCard;
