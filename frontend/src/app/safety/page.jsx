// src/pages/page.js
import React from 'react';
import DisasterCard from '../disaster-card/DisasterCard';

function Page() {
    return (
        <div className="flex flex-wrap gap-6 justify-center">
            <DisasterCard
                disaster="earthquake"
                imageUrl="https://images.unsplash.com/photo-1675881441492-1d862c4285e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGVhcnRocXVha2V8ZW58MHx8MHx8fDA%3D"
                description="Learn how to prepare for and respond to earthquakes."
            />
            <DisasterCard
                disaster="earthquake"
                imageUrl="https://images.unsplash.com/photo-1675881441492-1d862c4285e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGVhcnRocXVha2V8ZW58MHx8MHx8fDA%3D"
                description="Learn how to prepare for and respond to earthquakes."
            />
            <DisasterCard
                disaster="earthquake"
                imageUrl="https://images.unsplash.com/photo-1675881441492-1d862c4285e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGVhcnRocXVha2V8ZW58MHx8MHx8fDA%3D"
                description="Learn how to prepare for and respond to earthquakes."
            />
        </div>
    );
}

export default Page;
