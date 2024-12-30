"use client";

import React, { useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const Creatememe = () => {
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const input1 = useRef();
    const input2 = useRef();
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const templateId = searchParams?.get("id");
    const templateUrl = searchParams?.get("url");

    const createMeme = async (e) => {
        e.preventDefault();

        const firstInput = input1.current.value.trim();
        const secondInput = input2.current.value.trim();

        if (!templateId || !templateUrl) {
            setError("Invalid template data. Please check the URL.");
            return;
        }

        if (!firstInput || !secondInput) {
            setError("Both text fields must be filled out.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `https://api.imgflip.com/caption_image?template_id=${templateId}&username=mabdullah6600&password=asdfgfdsa123&text0=${firstInput}&text1=${secondInput}`,
                { method: "POST" }
            );
            const data = await response.json();

            if (data.success) {
                setImage(data.data.url);
            } else {
                setError("Failed to create meme. Please try again.");
            }
        } catch (error) {
            setError("Error creating meme: " + error.message);
        } finally {
            setLoading(false);
            input1.current.value = "";
            input2.current.value = "";
        }
    };

    return (
        <div className="container mx-auto p-1">
            <header
                onClick={() => window.history.back()}
                className="w-full h-[70px] flex justify-start items-center bg-[#0D003B] border-b px-4 sm:px-8 md:px-16 lg:px-[166px] cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white mr-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                </svg>
            </header>

            <div className="mt-2 border-2 bg-gray-200 pt-8 pb-8 p-4">
                <div className="text-center mb-6">
                    <img
                        className="w-full max-w-[450px] h-auto mx-auto mb-6"
                        src={templateUrl || "https://via.placeholder.com/450?text=Meme+Template"}
                        alt="Meme Template"
                    />
                </div>

                <form
                    onSubmit={createMeme}
                    className="space-y-4 w-full max-w-md mx-auto text-center"
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your first text"
                            ref={input1}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D003B] transition-all"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your second text"
                            ref={input2}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D003B] transition-all"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#0D003B] text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition-all"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Create Meme"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-5 mb-5 bg-gray-200 pt-8 pb-8 p-4">
                {image ? (
                    <div className="text-center">
                        <img
                            src={image}
                            alt="Created Meme"
                            className="w-full max-w-[450px] h-auto mx-auto mb-6"
                        />
                        <button
                            onClick={() => {
                                const link = document.createElement("a");
                                link.href = image;
                                link.download = "meme.png";
                                link.click();
                            }}
                            className="w-full max-w-[450px] py-3 bg-[#0D003B] text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition-all"
                        >
                            Download Meme
                        </button>
                    </div>
                ) : (
                    <h2 className="text-xl text-gray-600 text-center">
                        Waiting for your meme...
                    </h2>
                )}
            </div>
        </div>
    );
};

const CreatememePage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Creatememe />
    </Suspense>
);

export default CreatememePage;
