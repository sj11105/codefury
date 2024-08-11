// src/components/DisasterCard.js
import Link from 'next/link';

const DisasterCard = ({ disaster, imageUrl, description }) => {
    return (
        <Link href={`/${disaster}`} passHref>
            <div className="w-96 h-96 bg-white shadow-lg hover:shadow-xl transition-shadow transition-transform duration-300 transform hover:scale-105 cursor-pointer rounded-lg overflow-hidden mt-8 ml-8">
                <figure className="w-full h-3/4">
                    <img
                        src={imageUrl}
                        alt={`${disaster} Safety`}
                        className="w-full h-full object-cover"
                    />
                </figure>
                <div className="h-1/4 p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1 capitalize">
                        {disaster}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default DisasterCard;
