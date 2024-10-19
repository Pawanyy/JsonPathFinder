import { useState } from "react";
import JsonReaderBox from "./JsonReaderBox";

interface PathDisplayProps {
    pathData: string;
    editorData: string;
}

export default function PathDisplay({ pathData, editorData }: PathDisplayProps) {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(pathData)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 1500);
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    return (
        <section aria-label="JSON Path Display" className="flex-1 h-full bg-blue-50 dark:bg-blue-900 dark:text-white border-slate-500 rounded-xl border-1 shadow overflow-y-hidden">
            <div className="h-full">
                <div className="flex h-[48px] justify-between py-2 px-2">
                    <label htmlFor="json-path" className="px-2">
                        Path:
                    </label>
                    <input
                        id="json-path"
                        className="w-full rounded rounded-e-none px-1 bg-white dark:bg-gray-700 dark:text-white"
                        value={pathData}
                        readOnly
                        aria-label="JSON Path"
                    />
                    <button
                        onClick={handleCopyClick}
                        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-3 py-1 rounded rounded-s-none transition-colors"
                        aria-label="Copy JSON Path"
                    >
                        {copySuccess ? "Copied!" : "Copy"}
                    </button>
                </div>
                <div className="bg-white dark:bg-gray-800 overflow-y-scroll" style={{ height: 'calc(100% - 48px)' }}>
                    <JsonReaderBox jsonText={editorData} />
                </div>
            </div>
        </section>
    );
}
