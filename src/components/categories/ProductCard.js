import {Card, CardContent, Typography, CardActionArea} from '@mui/material';

const ProductCard = ({ details, setSelected }) =>  {

    return(
        <Card
            sx={{
                display: "block",
                margin: "25px auto",
                boxShadow: "0px 2px 30px #103F6D",
                borderRadius: "10px",
                maxWidth: "300px",
                width: "90%",
            }}
        >
            <CardActionArea
                sx={{
                    paddingTop: "100px",
                }}
                onClick={() => setSelected(details)}
            >
                <CardContent>
                    <Typography
                        align="center" 
                        sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#103F6D"
                        }}
                    >
                        {details.name}
                    </Typography>

                    <Typography
                        align="center"
                        sx={{
                            fontSize: "16px",
                            fontWeight: 600
                        }}
                    >
                        SKU: {details.sku_code}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>  
    )
}

export default ProductCard;
