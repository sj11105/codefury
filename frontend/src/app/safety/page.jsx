// src/pages/page.js
"use client"
import React from 'react';
import DisasterCard from '../disaster-card/DisasterCard';


function Page() {
    return (
        <div className="flex flex-wrap gap-6 justify-center">
            <DisasterCard
                link="https://seismo.gov.in/dos-and-donts"
                imageUrl="https://images.unsplash.com/photo-1675881441492-1d862c4285e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGVhcnRocXVha2V8ZW58MHx8MHx8fDA%3D"
                description="Learn how to prepare for and respond to earthquakes."
                name="Earthquake"
            />
            <DisasterCard
                link="https://ndma.gov.in/Natural-Hazards/Floods/Do-Donts"
                imageUrl="https://media.istockphoto.com/id/1423667422/photo/heavy-flood-2022.jpg?s=612x612&w=0&k=20&c=3b0prsnytsBR5cK8xrLofOeJyx4Eyj_5vNZx7nVhuG0="
                description="Learn how to prepare for and respond to floods."
                name="Floods"
            />
            <DisasterCard
                link="https://www.nationwide.com/lc/resources/emergency-preparedness/articles/hurricanes"
                imageUrl="https://cdn.pixabay.com/photo/2013/02/25/16/00/key-west-86025_640.jpg"
                description="Learn how to prepare for and respond to hurricane."
                name="Hurricane"
            />
           
        </div>
    );
}

export default Page;
