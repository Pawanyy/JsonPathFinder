import ThemeSwitcher from "./components/ThemeSwitcher";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import JsonReaderBox from "./components/JsonReaderBox";
import { Helmet } from 'react-helmet';


export default function App() {

    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

    const [pathStartProp, setPathStartProp] = useState("x");

    const [editorData, setEditorData] = useState("");
    const [pathData, setPathData] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);

    const onEditorChange = (text) => {
        setEditorData(text);
        console.log("change", text);
    }


    const handleCopyClick = () => {
        navigator.clipboard.writeText(pathData)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 1500); // Reset success message after 1.5 seconds
            })
            .catch(err => console.error('Failed to copy:', err));
    };


    useEffect(() => {

        const pathChangeEvent = (event) => {
            setPathData(event.detail.path);
            console.log('Path Selected event data:', event.detail.path);
        };

        window.addEventListener('pathSelected', pathChangeEvent);

        return () => {
            window.removeEventListener('pathSelected', pathChangeEvent);
        };
    }, [])

    const beautifyClick = () => {
        try {
            const jsonData = JSON.parse(editorData);
            setEditorData(JSON.stringify(jsonData, null, 2));
        } catch (error) {
            console.log("Action: Beautify Data | Error ::> ", error.message)
        }
    }

    const minifyClick = () => {
        try {
            const jsonData = JSON.parse(editorData);
            setEditorData(JSON.stringify(jsonData));
        } catch (error) {
            console.log("Action: minify Data | Error ::> ", error.message)
        }
    }

    const sampleClick = async () => {
        try {
            const response = await fetch("/data.json");
            const data = await response.json();
            setEditorData(JSON.stringify(data, null, 2));
            console.log("json :: ", data);
        } catch (error) {
            console.log("Action: Load Sample | Error ::> ", error.message)
        }
    }


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
                <header className="bg-blue-500 dark:bg-blue-900 py-2 px-5 flex justify-between h-[48px]">
                    <header className="bg-blue-500 dark:bg-blue-900 py-2 px-5 flex justify-between h-[48px]">
                        <h1 className="text-white font-bold text-2xl">
                            JSON Smart Path Finder
                        </h1>
                        <ThemeSwitcher />
                    </header>
                    <div className="block lg:flex bg-gray-200 lg:space-x-3 px-3 py-2 lg:space-y-0 space-y-3" style={{ height: 'calc(100% - 48px)' }}>
                        <div className="flex-1 h-full bg-blue-50 border-slate-500 rounded-xl border-1 shadow overflow-y-hidden">
                            <div className="h-[48px]">
                                <div className="flex justify-between p-2">
                                    <Button onClick={sampleClick} text="Sa ummmple" />
                                    <Button onClick={beautifyClick} text="Beautify" />
                                    <Button onClick={minifyClick} text="Minify" />
                                </div>
                            </div>
                            <AceEditor
                                mode="json"
                                theme="chrome"
                                tabSize={2}
                                width="100%"
                                height="calc(100% - 48px)"
                                height="calc(100% - 48px)"
                                showPrintMargin={false}
                                value={editorData}
                                onChange={onEditorChange}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: false }}
                            />
                        </div>
                        <div className="flex-1 h-full bg-blue-50 border-slate-500 rounded-xl border-1 shadow overflow-y-hidden">
                            <div className="h-full">
                                <div className="flex h-[48px] justify-between py-2 px-2">
                                    <div className="px-2">
                                        Path:
                                    </div>
                                    <input
                                        className="w-full rounded rounded-e-none px-1"
                                        value={pathData}
                                        readOnly
                                    />
                                    <button onClick={handleCopyClick} className="bg-blue-500 text-white px-3 py-1 rounded rounded-s-none">
                                        {copySuccess ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                                <div className="bg-white overflow-y-scroll" style={{ height: 'calc(100% - 48px)' }}>
                                    <JsonReaderBox jsonText={editorData} />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}