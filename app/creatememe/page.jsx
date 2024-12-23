"use client";

import React, { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const Creatememe = () => {
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const input1 = useRef();
    const input2 = useRef();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const createMeme = async (e) => {
        e.preventDefault();
        const firstInput = input1.current.value.trim();
        const secondInput = input2.current.value.trim();

        if (!firstInput || !secondInput) {
            setError("Both text fields must be filled out.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const data = await fetch(
                `https://api.imgflip.com/caption_image?template_id=${searchParams.get("id")}&username=mabdullah6600&password=asdfgfdsa123&text0=${firstInput}&text1=${secondInput}`,
                {
                    method: "POST",
                }
            );
            const response = await data.json();
            setImage(response.data.url);
            setLoading(false);
            input1.current.value = "";
            input2.current.value = "";

        } catch (error) {
            setError("Error creating meme: " + error.message);
            setLoading(false);
        }
    };

    // Function to download the meme
    const downloadMeme = () => {
        const link = document.createElement("a");
        link.href = image;
        link.download = "meme.png";
        link.click();
    };

    return (
        <>
            <div className="container mx-auto p-1">

                {/* Header Section */}
                <header onClick={() => window.history.back()} className="w-full h-[70px] flex justify-start items-center mt-0 bg-[#0D003B] border-b px-4 sm:px-8 md:px-16 lg:px-[166px] cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </header>


                <div className="mt-2 border-2 bg-gray-200 pt-8 pb-8 p-4">
                    {/* Meme Image Display */}
                    <div className="text-center mb-6">
                        <img
                            className="w-full max-w-[450px] h-auto mx-auto mb-6"
                            src={searchParams.get("url")}
                            alt="meme-image"
                        />
                    </div>

                    {/* Form for Text Input */}
                    <form onSubmit={createMeme} className="space-y-4 w-full max-w-md mx-auto text-center">
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
                        {error && (
                            <div className="text-red-500 text-sm">
                                <p>{error}</p>
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#0D003B] text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition-all"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex justify-center">
                                        <span className="loader"></span> Loading...
                                    </span>
                                ) : (
                                    <span>Create Meme</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Meme Image Preview and Download */}
                <div className="mt-5 mb-5 bg-gray-200 pt-8 pb-8 p-4">
                    {image ? (
                        <div className="text-center">
                            <img
                                src={image}
                                alt="Created meme"
                               className="w-full max-w-[450px] h-auto mx-auto mb-6"
                            />
                            <button
                                onClick={downloadMeme}
                                className="w-full max-w-[450px]  py-3 bg-[#0D003B] text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition-all"
                            >
                                Download Meme
                            </button>
                        </div>
                    ) : (
                        <h2 className="text-xl text-gray-600 text-center">Waiting for your meme...</h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default Creatememe;
