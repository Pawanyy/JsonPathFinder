import { useEffect, useState } from "react";
import Header from "./components/Header";
import JSONEditor from "./components/JsonEditor";
import PathDisplay from "./components/PathDisplay";
import SeoComponent from "./components/SeoComponent";

export default function App() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
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
            <SeoComponent
                title="JSON Smart Path Finder | Easy JSON Navigation"
                description="Navigate and explore JSON data easily with our JSON Smart Path Finder. Beautify, minify, and find paths in your JSON effortlessly."
                keywords="JSON, path finder, JSON navigator, JSON beautifier, JSON minifier"
                author="git@github.com:Pawanyy"
                baseUrl={baseUrl}
            />
            <div className="h-screen">
                <Header title="JSON Smart Path Finder" />
                <main className="block lg:flex bg-gray-200 dark:bg-gray-900 lg:space-x-3 px-3 py-2 lg:space-y-0 space-y-3" style={{ height: 'calc(100% - 48px)' }}>
                    <JSONEditor
                        editorData={editorData}
                        setEditorData={setEditorData}
                    />
                    <PathDisplay
                        pathData={pathData}
                        editorData={editorData}
                    />
                </main>
            </div>
        </>
    )
}
