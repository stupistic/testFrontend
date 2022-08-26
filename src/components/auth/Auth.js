import LoginOptions from "./LoginOptions";
import SignupOptions from "./SignupOptions";
import { useSelector } from "react-redux";

const Auth = () => {

    const authMethod = useSelector(state => state.authMethod);

    return (
        <div>
        { 
            authMethod === "login" 
            ?
            (<LoginOptions />)
            : 
            (<></>)
        }

        {
            authMethod === "signup" 
            ?
            (<SignupOptions />)
            : 
            (<></>)
        }
        </div>
    )
}

export default Auth;
