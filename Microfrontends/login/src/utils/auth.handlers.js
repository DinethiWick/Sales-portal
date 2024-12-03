import axios from 'axios';
import * as singleSpa from 'single-spa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginHandler = async () => {
    var username = document.getElementById("username_field").value;
    var password = document.getElementById("password_field").value;
    let userId;
    
    try {
        var users = await axios.get('http://localhost:3000/api/v1/users');
        console.log("Login handler | Got users from bff");
        for(var userentry in users.data.data){
            const userObject =users.data.data[userentry];
            if (userObject.username===username){
                userId = userObject.userId;
                console.log("Login handler | Found user id: ",userId);

                const userData = {
                    "username":username,
                    "password":password
                }
                
                toast("Authenticating...");
                console.log("Login handler | Authenticating");
                const userTokens = await axios.post(`http://localhost:3000/api/v1/users/${userId}/authenticate`,userData);
                console.log("Login handler | Authenticated user id: ",userId);
                document.cookie = `userToken=${userTokens.data.accessToken.jwtToken}`;
                
                toast("Authentication successful");
                await new Promise((resolve)=>{setTimeout(resolve, 2000)});
                singleSpa.navigateToUrl("/home");
                return;
            }
        }
        throw new Error("User not found");
    } catch (error) {
        toast("Authentication failed");
        console.error("Login handler | Exception occured: ",error);
    }
}

const registerHandler = async () =>{
    var username = document.getElementById("username_field").value;
    var password = document.getElementById("password_field").value;
    
    try {
        console.log("Register handler | Registering user");
        toast("Registering...");

        const userData = {
            "username":username,
            "password":password
        }

        console.log("Register handler | Creating user",username);
        const createdUser = await axios.post(`http://localhost:3000/api/v1/users`,userData);
        console.log(createdUser);
        console.log("Login handler | Successfully registered.");
        toast("Registered user. Login to Continue");
    } catch (error) {
        console.error("Login handler | Exception occured: ",error);
        toast("Registration failed");
    }
}

export {loginHandler,registerHandler}