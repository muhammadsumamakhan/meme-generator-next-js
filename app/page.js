import React from 'react';
import Link from 'next/link';

const Home = async () => {
  const data = await fetch('https://api.imgflip.com/get_memes');
  const response = await data.json();
  console.log(response.data.memes);

  return (
    <div className="container mx-auto p-1">
      <h1 className="bg-[#0D003B] text-white text-3xl pt-5 pb-5 font-bold mb-6 text-center">
        Meme Generator 😂🔥
      </h1>
      <p className="text-center mb-6 text-lg">Select a meme, customize it with your own text, and share your creation with friends! 📱🎨</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {response.data.memes.map((meme) => (
          <div
            key={meme.id}
            className="bg-white p-6 rounded-lg shadow-md shadow-black transition-shadow duration-600" 
          >
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-64 mb-3 rounded-lg object-cover" 
            />
            <p className="text-center font-bold text-sm mb-2">{meme.name}</p>
            <Link
              href={{
                pathname: "creatememe",
                query: {
                  url: meme.url,
                  id: meme.id
                }
              }}
            >
              <button className="w-full bg-[#0D003B] text-white text-xl font-semibold py-3 rounded-md hover:bg-orange-500 transition-all">
                Generate this meme
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
