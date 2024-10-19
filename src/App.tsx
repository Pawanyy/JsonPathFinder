import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import Header from "./components/Header";
import JSONEditor from "./components/JSONEditor";
import PathDisplay from "./components/PathDisplay";

export default function App() {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

    const [editorData, setEditorData] = useState<string>("");
    const [pathData, setPathData] = useState<string>("");

    useEffect(() => {
        const pathChangeEvent = (event: CustomEvent<{ path: string }>) => {
            setPathData(event.detail.path);
            console.log('Path Selected event data:', event.detail.path);
        };

        window.addEventListener('pathSelected', pathChangeEvent as EventListener);

        return () => {
            window.removeEventListener('pathSelected', pathChangeEvent as EventListener);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>JSON Path Finder | Easily Find Paths in JSON Data</title>
                <meta name="description" content="JSON Path Finder is a powerful tool to search and navigate JSON data effortlessly. Find paths in JSON data with ease!" />
                <meta name="keywords" content="JSON, JSON path, path finder, JSON data, tool, search, navigate" />
                <meta property="og:title" content="JSON Path Finder | Easily Find Paths in JSON Data" />
                <meta property="og:description" content="JSON Path Finder is a powerful tool to search and navigate JSON data effortlessly. Find paths in JSON data with ease!" />
                <meta property="og:image" content={`${baseUrl}/icon.svg`} />
                <meta property="og:url" content={baseUrl} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="JSON Path Finder | Easily Find Paths in JSON Data" />
                <meta name="twitter:description" content="JSON Path Finder is a powerful tool to search and navigate JSON data effortlessly. Find paths in JSON data with ease!" />
                <meta name="twitter:image" content={`${baseUrl}/icon.svg`} />
            </Helmet>
            <div className="h-screen">
                <Header title="JSON Smart Path Finder" />
                <div className="block lg:flex bg-gray-200 lg:space-x-3 px-3 py-2 lg:space-y-0 space-y-3" style={{ height: 'calc(100% - 48px)' }}>
                    <JSONEditor
                        editorData={editorData}
                        setEditorData={setEditorData}
                    />
                    <PathDisplay
                        pathData={pathData}
                        editorData={editorData}
                    />
                </div>
            </div>
        </>
    )
}
