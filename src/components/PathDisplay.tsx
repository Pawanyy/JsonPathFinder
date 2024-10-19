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
    );
}
