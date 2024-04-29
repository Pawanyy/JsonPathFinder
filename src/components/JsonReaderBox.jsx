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

function LeafNode({ child }) {
    return (
        <button className="block w-full text-start px-1 py-2 border-b-2 focus:bg-blue-100">
            <span className="text-blue-700 font-semibold">{child.prop}:</span>
            <span className="ps-2">{child.value}</span>
        </button>
    )
}

function TreeNode({ node }) {
    return (
        <details>
            <summary className="px-1 py-2 text-blue-700 font-semibold border-b-2 hover:cursor-pointer focus:bg-blue-100">
                <span>{node.prop}:</span>
            </summary>
            {node.children && node.children.length > 0 && (
                <div className="ms-4">
                    {node.children.map((child, index) => (
                        <>
                            {
                                child.children
                                    ? (<TreeNode key={index} node={child} />)
                                    : (<LeafNode key={index} child={child} />)
                            }
                        </>
                    ))}
                </div>
            )}
        </details>
    );
}

export default function ReaderBox({ jsonText }) {

    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        try {
            const json = JSON.parse(jsonText);

            const absData = mapPath(json, "data");

            setJsonData(absData);
            console.log("RenderJson", absData);
        } catch (error) {
            console.log("Action: JSON Render Data | Error ::> ", error.message)
        }
    }, [jsonText])

    return (<div className="json-reader-tree">
        <div className="px-2">
            {jsonData.map((row, index) => (
                <>
                    {row.children ? (<TreeNode key={index} node={row} />) : (<LeafNode key={index} child={row} />)}
                </>
            )
            )}
        </div >
    </div>)
} 