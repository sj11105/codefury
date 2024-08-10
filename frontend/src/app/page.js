// pages/page.jsx
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Mapbox = dynamic(() => import('./components/Mapbox'), { ssr: false });

const Page = () => (
  <>
    <Head>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
        rel="stylesheet"
      />
    </Head>
    <div>
      <Mapbox />
    </div>
  </>
);

export default Page;
