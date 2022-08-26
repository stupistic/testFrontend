import { Button, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import EmailLogin from "./EmailLogin";
import SendLoginOTP from "./SendLoginOTP";
import GoogleAuth from "./GoogleAuth";
import SpinnerSmall from "../loading/SpinnerSmall";
import { signup, noAuth } from "../../actions";
import { useDispatch } from "react-redux";

const outerPaperStyle = {
  backgroundColor: "rgb(28, 28, 28, 0.85)",
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1000",
  position: "absolute",
};

const innerPaperStyle = {
  width: "100%",
  maxWidth: "400px",
  height: "230px",
  padding: "24px",
  opacity: "1",
  borderRadius: "8px",
};

const iconStyle = {
  fontSize: "25px",
  cursor: "pointer",
};

const buttonStyle = {
  textTransform: "none",
  display: "block",
  width: "100%",
  margin: "20px auto",
  fontSize: "18px",
};

const LoginOptions = () => {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState("none");
  const [isLoading, setIsLoading] = useState(false);

  const closeButtonClicked = () => {
    setFlag("none");
    dispatch(noAuth());
  };

  if (flag === "none") {
    return (
      <>
        <Paper id="outerPaper" sx={outerPaperStyle}>
          <Paper id="innerPaper" sx={innerPaperStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">Login</Typography>

              <CloseIcon sx={iconStyle} onClick={closeButtonClicked} />
            </div>

            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SpinnerSmall />
              </div>
            )}

            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={() => setFlag("email")}
              style={{ width: "200px" }}
            >
              <span style={{ fontSize: "16px" }}>Continue with Email</span>
            </Button>

            <GoogleAuth setIsLoading={setIsLoading} setFlag={setFlag} />

            <Typography>
              New to Morsebiz?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => dispatch(signup())}
              >
                Create account
              </span>
            </Typography>
          </Paper>
        </Paper>
      </>
    );
  }

  if (flag === "email") {
    return (
      <>
        <Paper id="outerPaper" sx={outerPaperStyle}>
          <EmailLogin setFlag={setFlag} />
        </Paper>
      </>
    );
  }

  if (flag === "otp") {
    return (
      <>
        <Paper id="outerPaper" sx={outerPaperStyle}>
          <SendLoginOTP setFlag={setFlag} />
        </Paper>
      </>
    );
  }
};

export default LoginOptions;
