import "./Chatbot.css";
import { useState } from "react";

function Chatbot() {

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi! 👋 I'm your website assistant. How can I help you?"
        }
    ]);

    const [loading, setLoading] = useState(false);


    const sendMessage = async (e) => {

        e.preventDefault();

        if (!message.trim() || loading) {
            return;
        }

        const userMessage = message.trim();

        setMessages((previous) => [
            ...previous,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");

        setLoading(true);


        try {

            const response = await fetch(
                "/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message || "Chatbot request failed"
                );
            }


            setMessages((previous) => [
                ...previous,
                {
                    sender: "bot",
                    text: data.reply
                }
            ]);


        } catch (error) {

            console.error("Chatbot error:", error);

            setMessages((previous) => [
                ...previous,
                {
                    sender: "bot",
                    text: "Sorry, I'm unable to respond right now. Please try again."
                }
            ]);

        } finally {

            setLoading(false);

        }

    };


    return (
        <>
            {/* CHAT BUTTON */}

            <button
                className="chatbot-button"
                onClick={() => setOpen(!open)}
            >
                {open ? "×" : "💬"}
            </button>


            {/* CHAT WINDOW */}

            {open && (

                <div className="chatbot-window">

                    {/* HEADER */}

                    <div className="chatbot-header">

                        <div>
                            <h3>Cynox Assistant</h3>

                            <span>
                                ● Online
                            </span>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                        >
                            ×
                        </button>

                    </div>


                    {/* MESSAGES */}

                    <div className="chatbot-messages">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={
                                    msg.sender === "user"
                                        ? "chat-message user-message"
                                        : "chat-message bot-message"
                                }
                            >
                                {msg.text}
                            </div>

                        ))}


                        {loading && (

                            <div className="chat-message bot-message">
                                Typing...
                            </div>

                        )}

                    </div>


                    {/* INPUT */}

                    <form
                        className="chatbot-input"
                        onSubmit={sendMessage}
                    >

                        <input
                            type="text"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="Ask something..."
                        />

                        <button type="submit">
                            ➤
                        </button>

                    </form>

                </div>

            )}

        </>
    );
}

export default Chatbot;