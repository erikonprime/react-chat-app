import {auth, provider} from "../firebase-config.js";
import {signInWithPopup} from 'firebase/auth';
import "../App.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({setIsAuth}) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center ">
                <div className="col-md-auto">
                    <div className="card px-5 py-5">
                        <div className="auth text-center">
                            <p> Sign In With Google To Continue </p>
                            <button className="btn btn-outline-primary" onClick={signInWithGoogle}> Sign In With
                                Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
