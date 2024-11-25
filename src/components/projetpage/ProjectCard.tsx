import React, { useState } from 'react';

interface GameCardProps {
  title: string;
  description: string;
  releaseDate: string;
  categories: string[];
  installationLink: string;
  photos: string[]; // Array of image URLs representing the game
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  releaseDate,
  categories,
  installationLink,
  photos,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length); // Loop back to the first photo when the end is reached
  };

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length // Loop to the last photo when reaching the beginning
    );
  };

  return (
    <div className="flex flex-col items-center bg-[#171717] text-white rounded-lg p-10 mb-2 shadow-lg">
      {/* Game Title */}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {/* Photo and Navigation */}
      <div className="relative w-full flex items-center justify-center mb-4">
        {/* Left Arrow */}
        <button
          className="absolute z-30 left-14 bg-gray-700 hover:bg-gray-600 text-3xl font-bold text-white w-14 h-14 flex items-center justify-center rounded-full shadow-md"
          onClick={goToPreviousPhoto}
        >
          &#8592;
        </button>

        {/* Photo */}
        <div className="w-96 h-80 bg-gray-900 rounded-md flex items-center justify-center">
          <img
            src={photos[currentPhotoIndex]}
            alt={`${title} screenshot`}
            className="object-cover w-96 h-80 rounded-md"
          />
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-14 z-30 bg-gray-700 hover:bg-gray-600 text-white text-3xl font-bold w-14 h-14 flex items-center justify-center rounded-full shadow-md"
          onClick={goToNextPhoto}
        >
          &#8594;
        </button>
      </div>

      {/* Description */}
      <p className="text-lg font-bold text-gray-300 mt-4">{description}</p>

      {/* Release Date */}
      <p className="text-gray-400 mt-2">Release Date: {releaseDate}</p>

      {/* Categories */}
      <div className="mt-2 flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <span
            key={index}
            className="bg-gray-600 text-xs text-white px-3 py-1 rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Installation Link */}
      <a
        href={installationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
      >
        Install Now
      </a>
    </div>
  );
};

export default GameCard;
