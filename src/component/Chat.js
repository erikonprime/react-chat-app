import React, {useState, useEffect} from "react";
import {db, auth} from "../firebase-config";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

export const Chat = ({room}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });

            setMessages(messages);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!newMessage) {
            return;
        }

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            uId: auth.currentUser.uid,
            room,
        });

        setNewMessage('');
    };

    return (
        <div className="container mt-5 position-relative">
            <div className="row d-flex justify-content-center">
                <div className="col-md-auto">

                    <div className="header">
                        <h1>Welcome to: {room.toUpperCase()}</h1>
                    </div>

                    <div className="container-message">
                        {messages.map((message, index) => (
                            message.uId === auth.currentUser.uid ? (
                                <div key={index} className="margin-top-md sender">
                                    <div className="upper-text">{message.user}</div>
                                    <div className="message-container">
                                        <div className="character-picture"></div>
                                        <div className="message">
                                            {message.text}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div key={index} className="margin-top-md">
                                    <div className="upper-text">{message.user}</div>
                                    <div className="message-container">
                                        <div className="character-picture"></div>
                                        <div className="message">
                                            {message.text}
                                        </div>
                                    </div>
                                </div>

                            )
                        ))}
                    </div>

                    <div className="card px-5 py-5 margin-top-md">
                        <div className="auth text-center">
                            <form onSubmit={handleSubmit} className="new-message-form">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(event) => setNewMessage(event.target.value)}
                                    className="new-message-input form-control"
                                    placeholder="Type your message here..."
                                />
                                <button type="submit" className="send-button btn btn-warning mt-2">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
