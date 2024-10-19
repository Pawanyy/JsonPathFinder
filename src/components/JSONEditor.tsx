import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";
import Button from "./Button";

interface JSONEditorProps {
    editorData: string;
    setEditorData: (data: string) => void;
}

export default function JSONEditor({ editorData, setEditorData }: JSONEditorProps) {
    const onEditorChange = (text: string) => {
        setEditorData(text);
        console.log("change", text);
    };

    const formatJSON = (beautify: boolean) => {
        try {
            const jsonData = JSON.parse(editorData);
            setEditorData(JSON.stringify(jsonData, null, beautify ? 2 : undefined));
        } catch (error) {
            console.log(`Action: ${beautify ? 'Beautify' : 'Minify'} Data | Error ::> `, (error as Error).message);
        }
    };

    const sampleClick = async () => {
        try {
            const response = await fetch("/data.json");
            const data = await response.json();
            setEditorData(JSON.stringify(data, null, 2));
            console.log("json :: ", data);
        } catch (error) {
            console.log("Action: Load Sample | Error ::> ", (error as Error).message);
        }
    };

    return (
        <div className="flex-1 h-full bg-blue-50 border-slate-500 rounded-xl border-1 shadow overflow-y-hidden">
            <div className="h-[48px]">
                <div className="flex justify-between p-2">
                    <Button onClick={sampleClick} text="Sample" />
                    <Button onClick={() => formatJSON(true)} text="Beautify" />
                    <Button onClick={() => formatJSON(false)} text="Minify" />
                </div>
            </div>
            <AceEditor
                mode="json"
                theme="chrome"
                tabSize={2}
                width="100%"
                height="calc(100% - 48px)"
                showPrintMargin={false}
                value={editorData}
                onChange={onEditorChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: false }}
            />
        </div>
    );
}
