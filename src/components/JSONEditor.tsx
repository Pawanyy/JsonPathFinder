import { useCallback, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-cloud9_night_low_color";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";
import Button from "./Button";
import Alert from "./Alert";
import { useAppSelector } from "../hooks";

interface JSONEditorProps {
    editorData: string;
    setEditorData: (data: string) => void;
}

export default function JSONEditor({ editorData, setEditorData }: JSONEditorProps) {
    const [error, setError] = useState<string | null>(null);

    const theme = useAppSelector((state) => state.theme.mode);

    const onEditorChangeHandler = useCallback((text: string) => {
        setEditorData(text);
        setError(null);
        console.log("change jsonText");
    }, []);

    const formatJSON = useCallback((beautify: boolean) => {
        try {
            const jsonData = JSON.parse(editorData);
            setEditorData(JSON.stringify(jsonData, null, beautify ? 2 : undefined));
            setError(null);
        } catch (error) {
            const errorMessage = `Invalid JSON: ${(error as Error).message}`;
            console.log(`Action: ${beautify ? 'Beautify' : 'Minify'} Data | Error ::> `, errorMessage);
            setError(errorMessage);
        }
    }, [editorData]);

    const sampleClickHandler = useCallback(async () => {
        try {
            const response = await fetch("/data.json");
            const data = await response.json();
            setEditorData(JSON.stringify(data, null, 2));
            setError(null);
            console.log("json :: ", data);
        } catch (error) {
            const errorMessage = `Failed to load sample: ${(error as Error).message}`;
            console.log("Action: Load Sample | Error ::> ", errorMessage);
            setError(errorMessage);
        }
    }, []);


    const beautifyHandler = useCallback(async () => {
        formatJSON(true);
    }, []);

    const minifyHandler = useCallback(async () => {
        formatJSON(false);
    }, []);


    return (
        <section aria-label="JSON Editor" className="flex-1 h-full bg-blue-50 dark:bg-blue-900 border-slate-500 rounded-xl border-1 shadow overflow-y-hidden relative">
            <div className="h-[48px]">
                <div className="flex justify-between p-2">
                    <Button onClick={sampleClickHandler} text="Sample" aria-label="Load sample JSON" />
                    <Button onClick={beautifyHandler} text="Beautify" aria-label="Beautify JSON" />
                    <Button onClick={minifyHandler} text="Minify" aria-label="Minify JSON" />
                </div>
            </div>
            {error && (
                <Alert
                    message={error}
                    type="error"
                    onClose={() => setError(null)}
                />
            )}
            <AceEditor
                mode="json"
                theme={theme === "dark" ? "cloud9_night_low_color" : "chrome"}
                tabSize={2}
                width="100%"
                height="calc(100% - 48px)"
                showPrintMargin={false}
                value={editorData}
                onChange={onEditorChangeHandler}
                name="json-editor"
                editorProps={{ $blockScrolling: false }}
                aria-label="JSON Editor"
            />
        </section>
    );
}
