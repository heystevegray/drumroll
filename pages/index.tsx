import DrumRoll from 'components/DrumRoll';
import Head from 'next/head';
import AppBar from '../components/AppBar';

export default function Home() {
    return (
        <>
            <Head>
                <title>drumroll</title>
                <meta name="description" content="When you need a drumroll on demand 🥁" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar />
            <DrumRoll />
        </>
    );
}
