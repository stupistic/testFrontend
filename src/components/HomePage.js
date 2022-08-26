import Navbar from "./Navbar";
import url from "../config";
import Auth from "./auth/Auth";
import Image from "./Homepage/Image";
import Product from "./Homepage/Product";
import Register from "./Homepage/Register";
import Catalog from "./Homepage/Catalog";
import Slider from "./Homepage/Slider";
import Footer from "./Homepage/Footer";

//

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* <Auth /> */}
      <Image />
      <Product />
      <Register />
      <Slider />
      <Catalog />
      <Footer />

      {/* <Container sx={laptopStyle} maxWidth={false}>
          <div
            id="findByVehicle"
            style={{
              height: "350px",
              width: "100%",
              maxWidth: "700px",
              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                marginRight: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                boxSizing: "border-box",
              }}
            >
              <MenuButton
                options={["Company Name", ...makeList]}
                callbackFunction={fetchModels}
                defaultValue={make}
              />

              <MenuButton
                options={["Model", ...modelList]}
                callbackFunction={fetchYears}
                defaultValue={model}
              />

              <MenuButton
                options={["Year", ...yearList]}
                callbackFunction={(year) => {
                  setYear(year);
                }}
                defaultValue={year}
              />

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
                    backgroundColor: "#ffffff",
                  },
                }}
                onClick={fetchVehicleIDs}
                disabled={year === "Year"}
              >
                Search
              </Button>
            </div>

            <div
              id="Company logo"
              style={{
                marginRight: "10px",
                boxSizing: "border-box",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img
                    src={force}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <img
                    src={mahindra}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <img
                    src={tata}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <img
                    src={eicher}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Container> */}

      {/* <Container sx={mobileStyle} maxWidth={false}>
          <div
            id="findByVehicle"
            style={{
              height: "350px",
              width: "100%",
              maxWidth: "450px",
              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                marginRight: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                boxSizing: "border-box",
              }}
            >
              <MenuButton
                options={["Company Name", ...makeList]}
                callbackFunction={fetchModels}
              />

              <MenuButton
                options={["Model", ...modelList]}
                make={make}
                callbackFunction={fetchYears}
              />

              <MenuButton
                options={["Year", ...yearList]}
                callbackFunction={(year) => {
                  setYear(year);
                }}
              />

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
                    backgroundColor: "#ffffff",
                  },
                }}
                onClick={fetchVehicleIDs}
                disabled={year === "Year"}
              >
                Search
              </Button>
            </div>
          </div>
        </Container> */}

      {/* <Footer /> */}
      {/* // </ThemeProvider> */}
    </>
  );
};

export default HomePage;
