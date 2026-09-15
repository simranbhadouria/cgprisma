export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    try {
        const { message } = req.body || {};

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing");
            return res.status(500).json({
                message: "Gemini API key is not configured"
            });
        }

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `You are the Cynox Global website assistant.

Answer questions helpfully and professionally.

The website is about cybersecurity, security solutions, platforms, datasheets, blogs, and enterprise security.

If the user asks about Cynox Global, explain based on the website context.

User question:
${message.trim()}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API error:", data);

            return res.status(response.status).json({
                message:
                    data?.error?.message ||
                    "Gemini API request failed"
            });
        }

        const reply =
            data?.candidates?.[0]?.content?.parts
                ?.map((part) => part.text || "")
                .join("")
                .trim();

        if (!reply) {
            console.error("Gemini returned no text:", data);

            return res.status(500).json({
                message: "Gemini returned an empty response"
            });
        }

        return res.status(200).json({
            reply
        });

    } catch (error) {
        console.error("Chatbot server error:", error);

        return res.status(500).json({
            message: "Unable to connect to Gemini"
        });
    }
}