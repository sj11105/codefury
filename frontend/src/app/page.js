<<<<<<< HEAD


import axios from 'axios';
 import Link from 'next/link';
export default async function Home() {
   
    return (
        <div>
         <Link href="sms">sms</Link>
        </div>
    );
=======

import Image from "next/image";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
   <div>
      <Navbar/>
    
   </div>
  );
>>>>>>> 84f6b24aac0961da6ca93fd16934877c74d053c0
}
