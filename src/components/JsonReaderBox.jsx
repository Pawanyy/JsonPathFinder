import { useEffect, useState } from "react"


function mapPath(data, prefix = "") {
    const mapPathArray = [];

    for (let key in data) {
        let keyPath = key;

        if (Array.isArray(data)) {
            keyPath = `${prefix ? prefix : ""}[${key}]`;
        } else if (new RegExp(/[\s|\W]/ig).test(key)) {
            keyPath = `${prefix ? prefix : ""}["${key}"]`;
        } else {
            keyPath = `${prefix ? prefix + "." : ""}${key}`;
        }

        const tempObj = {
            prop: key,
            type: Array.isArray(data[key]) ? "array" : typeof data[key],
            value: data[key],
            path: keyPath,
            children: null
        };

        if (typeof data[key] === "object" && data[key] !== null) {
            tempObj["children"] = mapPath(data[key], tempObj.path);
        }



        mapPathArray.push(tempObj);
    }

    return mapPathArray;
}

const selectedNode = (path) => {
    console.log('Selected Node::> ', path);
    window.dispatchEvent(new CustomEvent('pathSelected', { detail: { message: 'Path change event', path: path } }));
}

function LeafNode({ child }) {
    return (
        <button onClick={() => selectedNode(child.path)} className="block w-full text-start px-1 py-2 border-b-2 focus:bg-blue-100">
            <span className="text-blue-700 font-semibold">{child.prop}:</span>
            <span className="ps-2">{child.value}</span>
        </button>
    )
}

function TreeNode({ node }) {
    return (
        <details>
            <summary onClick={() => selectedNode(node.path)} className="px-1 py-2 text-blue-700 font-semibold border-b-2 hover:cursor-pointer focus:bg-blue-100">
                <span>{node.prop}:</span>
            </summary>
            {node.children && node.children.length > 0 && (
                <>
                    {node.children.map((child, index) => (
                        <div key={index} className="ms-4">
                            {
                                child.children
                                    ? (<TreeNode key={index} node={child} />)
                                    : (<LeafNode key={index} child={child} />)
                            }
                        </div>
                    ))}
                </>
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

    return (
        <>
            {jsonData.map((row, index) => (
                <div key={index} className="px-2">
                    {row.children ? (<TreeNode key={index} node={row} />) : (<LeafNode key={index} child={row} />)}
                </div >
            )
            )}
        </>
    )
} 