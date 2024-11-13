import React, { useCallback, useMemo, } from "react"

interface JsonNode {
    prop: string;
    type: string;
    value: any;
    path: string;
    children: JsonNode[] | null;
}

function mapPath(data: any, prefix = ""): JsonNode[] {
    const mapPathArray: JsonNode[] = [];

    for (let key in data) {
        let keyPath = key;

        if (Array.isArray(data)) {
            keyPath = `${prefix ? prefix : ""}[${key}]`;
        } else if (new RegExp(/[\s|\W]/ig).test(key)) {
            keyPath = `${prefix ? prefix : ""}["${key}"]`;
        } else {
            keyPath = `${prefix ? prefix + "." : ""}${key}`;
        }

        const tempObj: JsonNode = {
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

const selectedNode = (path: string) => {
    console.log('Selected Node::> ', path);
    window.dispatchEvent(new CustomEvent('pathSelected', { detail: { message: 'Path change event', path: path } }));
}

interface LeafNodeProps {
    child: JsonNode;
}

const LeafNode = React.memo(({ child }: LeafNodeProps) => {

    const handleSelectNode = useCallback(() => selectedNode(child.path), [child.path]);

    return (
        <button onClick={handleSelectNode} className="block w-full text-start px-1 py-2 border-b-2 focus:bg-blue-100 focus:dark:bg-blue-400">
            <span className="text-blue-700 font-semibold">{child.prop}:</span>
            <span className="ps-2">{child.value}</span>
        </button>
    )
}, (prevProp, nextProp) => prevProp.child.path === nextProp.child.path && prevProp.child.value === nextProp.child.value)

interface TreeNodeProps {
    node: JsonNode;
}

const TreeNode = React.memo(({ node }: TreeNodeProps) => {

    const handleSelectNode = useCallback(() => selectedNode(node.path), [node.path]);

    const childNodes = useMemo(() => (
        node.children ? node.children.map((child, index) => (
            <div key={index} className="ms-4">
                {child.children ? <TreeNode node={child} /> : <LeafNode child={child} />}
            </div>
        )) : null
    ), [node.children]);

    return (
        <details>
            <summary onClick={handleSelectNode} className="px-1 py-2 text-blue-700 font-semibold border-b-2 hover:cursor-pointer focus:bg-blue-100 focus:dark:bg-blue-300">
                <span>{node.prop}:</span>
            </summary>

            {childNodes}

        </details>
    );
}, (prevProp, nextProp) => prevProp.node.path == nextProp.node.path)

interface ReaderBoxProps {
    jsonText: string;
}

function ReaderBox({ jsonText }: ReaderBoxProps) {

    const jsonData = useMemo(() => {
        try {
            console.time("MapPath");
            const json = JSON.parse(jsonText);
            const mapData = mapPath(json, "data");
            console.timeEnd("MapPath");
            return mapData;
        } catch (error) {
            console.log("Action: JSON Render Data | Error ::> ", (error as Error).message)
            return [];
        }
    }, [jsonText])

    return (
        <>
            {jsonData.map((row, index) => (
                <div key={index} className="px-2">
                    {row.children ? (<TreeNode key={index} node={row} />) : (<LeafNode key={index} child={row} />)}
                </div >
            ))}
        </>
    )
}

export default React.memo(ReaderBox, (prevProp, nextProp) => prevProp.jsonText === nextProp.jsonText);