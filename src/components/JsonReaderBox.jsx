import { useEffect, useState } from "react"


function mapPath(data, prefix = "") {
    const mapPathArray = [];

    for (let key in data) {
        const keyPath = Array.isArray(data) ? `${prefix}[${key}]` : `${prefix}.${key}`;

        let children = null;

        if (typeof data[key] === "object" && data[key] !== null) {
            children = mapPath(data[key], keyPath);
        }

        const la = {
            prop: key,
            type: Array.isArray(data[key]) ? "array" : typeof data[key],
            value: data[key],
            path: keyPath,
            children: children
        };
        mapPathArray.push(la);
    }

    return mapPathArray;
}

export default function ReaderBox({ jsonText }) {

    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        try {
            const json = JSON.parse(jsonText);

            const absData = mapPath(json, "data");

            setJsonData(absData);
            console.log("RenderJson", json);
        } catch (error) {
            console.log("Action: JSON Render Data | Error ::> ", error.message)
        }
    }, [])

    return (<div className="json-reader-tree">
        <div className="px-2">
            {jsonData.map(row => {
                return (<>
                    {row.children ? (<details>{
                        <summary className="json-reader-tree-parent json-reader-tree-property-selected">
                            <span>{row.prop}:</span>
                        </summary>

                    }</details>) : (<div>a</div>)}
                </>
                )
            })}
        </div >
    </div>)
} 