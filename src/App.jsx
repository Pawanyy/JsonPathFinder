import ThemeSwitcher from "./components/ThemeSwitcher";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";
import Button from "./components/Button";
import JsonReaderBox from "./components/JsonReaderBox";

export default function App() {

    const [pathStartProp, setPathStartProp] = useState("x");

    const [editorData, setEditorData] = useState("");
    const [pathData, setPathData] = useState("");

    const onEditorChange = (text) => {
        setEditorData(text);
        console.log("change", text);
    }

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
            <div className="h-screen">
                <header className="bg-blue-200 dark:bg-blue-900 py-2 px-5 flex justify-between">
                    <h1 className="text-white font-bold text-2xl">
                        JSON Smart Path Finder
                    </h1>
                    <ThemeSwitcher />
                </header>
                <div className="flex bg-gray-200 space-x-3 h-full">
                    <div className="w-3/6 bg-blue-50 border-slate-500 border-1 shadow">
                        <div className="flex justify-between m-2">
                            <Button onClick={sampleClick} text="Sample" />
                            <Button onClick={beautifyClick} text="Beautify" />
                            <Button onClick={minifyClick} text="Minify" />
                        </div>
                        <AceEditor
                            mode="json"
                            theme="chrome"
                            tabSize={2}
                            width="100%"
                            height="100%"
                            showPrintMargin={false}
                            value={editorData}
                            onChange={onEditorChange}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: false }}
                        />
                    </div>
                    <div className="w-3/6 bg-blue-50 border-slate-500 border-1 shadow">
                        <div id="reader-box" className="">
                            <div id="reader-path-bar-holder" className="">
                                <div id="reader-path-bar" className="flex justify-between py-2">
                                    <div className="px-2">
                                        Path:
                                    </div>
                                    <input
                                        className="w-full rounded rounded-e-none"
                                        value={pathData}
                                        readOnly
                                    />
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded rounded-s-none">Copy</button>
                                </div>
                            </div>
                            <div id="json-reader" className="bg-white h-full">
                                <JsonReaderBox jsonText={editorData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}