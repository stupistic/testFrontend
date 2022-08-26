import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import MenuButton from "../MenuButton";
import url from "../../config";
import axios from "axios";

const FindByVehicle = ({ makeDefaultValue, modelDefaultValue, yearDefaultValue }) => {

    // Find by vehicle starts

    const navigate = useNavigate();

    const [ make, setMake ] = useState("");
    const [ makeList, setMakeList ] = useState([]);
    const [ model, setModel ] = useState("");
    const [ modelList, setModelList ] = useState([]);
    const [ year, setYear ] = useState("");
    const [ yearList, setYearList ] = useState([]);


    const fetchModels = async (_make) => {
        setMake(_make);
        setModel("Model");
        setYear("Year");
        try{
            const response = await axios.post(`${url}/category/make`, {
                "make": _make
            });
            const modelArray = response.data.data;
            setModelList(modelArray);
        }catch(error){
            console.log(error.response.data);
        }
    }

    const fetchYears = async (_model) => {
        setModel(_model);
        setYear("Year");
        try{
            const response = await axios.post(`${url}/category/makeModel`, {
                "make": (make !== "") ? make : makeDefaultValue,
                "model": _model
            });
            const yearArray = response.data.data;
            setYearList(yearArray);
        }catch(error){
            console.log(error.response.data);
        }
    }

    const fetchVehicleIDs = async () => {
        navigate(`/categories/${make}/${model}/${year}`);
    }

    useEffect(() => {
        const fetchMakeList = async () => {
            try{
                const response = await axios.get(`${url}/category/makeList`)
                const makeArray = response.data.data;
                setMakeList(makeArray);
            }catch(error){
                console.log(error.response.data);
            }
        }

        fetchMakeList();
        setMake(makeDefaultValue);

        fetchModels(makeDefaultValue);
        setModel(modelDefaultValue);

        fetchYears(modelDefaultValue);
        setYear(yearDefaultValue);
    }, [])

    return (
        <div
            id="findByVehicle"
            style={{
                width: "100%",
                minWidth: "300px",
                maxWidth: "300px",
                display: "flex",
                flexDirection: "column",
                padding: "0 20px",
                boxSizing: "border-box",
            }}
        >
            <Typography 
                sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                }}
            >
                Search by Vehicle
            </Typography>

            <div style={{margin: "10px 0"}} >
                <MenuButton 
                    options={["Company Name", ...makeList]}
                    callbackFunction={fetchModels}
                    defaultValue={make}
                />
            </div>


            <div style={{margin: "10px 0"}} >
                <MenuButton 
                    options={["Model", ...modelList]}
                    callbackFunction={fetchYears}
                    defaultValue={model}
                />
            </div>

            <div style={{margin: "10px 0"}} >
                <MenuButton 
                    options={["Year", ...yearList]}
                    callbackFunction={(year) => {setYear(year)}}
                    defaultValue={year}
                />
            </div>

            <Button
                sx={{
                    padding: "6px",
                    fontSize: "16px",
                    backgroundColor: "#ffffff",
                    color: "#103F6D",
                    borderRadius: "5px",
                    width: "100%",
                    fontWeight: "700",

                    "&:hover": {
                        backgroundColor: "#ffffff"
                    }
                }}

                onClick={fetchVehicleIDs}
                disabled={year === "Year"}
            >
                Search
            </Button>

        </div>
    );
}

export default FindByVehicle;
