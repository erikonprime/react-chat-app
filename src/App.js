import React, {useState, useRef} from "react";
import {Auth} from "./component/Auth.js";
import Cookies from "universal-cookie";
import "./App.css";
import {Chat} from "./component/Chat";
import {signOut} from "firebase/auth";
import {auth} from "./firebase-config";

const cookies = new Cookies();

function App() {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState(cookies.get("room"));
    const roomInputRef = useRef('');

    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        cookies.remove("room");
        setIsAuth(false);
        setRoom('');
    };

    const setInputRoom = (e) => {
        e.preventDefault();
        setRoom(roomInputRef.current.value)
        cookies.set("room", roomInputRef.current.value);
    };

    let render = room ? (
        <div>
            <div className="sign-out top-0 end-0 m-3">
                <button className="btn btn-danger" onClick={signUserOut}>
                    Sign Out
                </button>
            </div>
            <Chat room={room}/>
        </div>
    ) : (

        <div>
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-auto">
                    <div className="card px-5 py-5">
                        <div className="auth text-center px-5">
                            <div className="room">
                                <label>Type room name:</label>
                                <input className="form-control" ref={roomInputRef}/>
                                <button className="btn btn-warning mt-2"
                                        onClick={setInputRoom}>
                                    Enter Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!isAuth) {
        render = (
            <Auth setIsAuth={setIsAuth}/>
        );
    }

    return (<div className="container-fluid">
        {render}
    </div>);
}

export default App;
