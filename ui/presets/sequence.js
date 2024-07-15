const presetSequence = `
{
    "nodes":
    [
        {
        "type": "SEQ",
        "id": "sequence2",
        "name": "sequence",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "311",
        "y": "1907",
        "z": "0",
        "active": "true",
        "params":
        [
                ["NUM#", "add", "15,0"],
                ["NUM#", "end", "?,0"]
        ]
        },
        {
        "type": "SEQ",
        "id": "sequence",
        "name": "sequence",
        "renamed": "false",
        "enabled": "true",
        "highlight": "1",
        "x": "707",
        "y": "2229",
        "z": "1",
        "params":
        [
                ["NUM#", "start", "1,0"],
                ["NUM#", "multiply", "1.07,2"],
                ["NUM#", "add", "1,0"],
                ["NUM#", "end", "?,0"]
        ]
        },
        {
        "type": "MOVE",
        "id": "move",
        "name": "move",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "500",
        "y": "1702",
        "z": "2",
        "params":
        [
                ["NUM#", "x", "735,0"]
        ]
        },
        {
        "type": "CENTR",
        "id": "center",
        "name": "center",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "759",
        "y": "1702",
        "z": "3",
        "params":
        [
                ["NUM#", "centerY", "100,0"]
        ]
        },
        {
        "type": "COL",
        "id": "color",
        "name": "color",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "-5",
        "y": "1840",
        "z": "4",
        "prevSpace": "hsv",
        "params":
        [
                ["NUM#", "space", "2,0"],
                ["NUM#", "c1", "142,0"],
                ["NUM#", "c2", "80,0"],
                ["NUM#", "c3", "70,0"]
        ]
        },
        {
        "type": "REPT",
        "id": "repeat",
        "name": "repeat",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "1090",
        "y": "1937",
        "z": "5",
        "active": "true",
        "params":
        [
                ["NUM#", "count", "50,0"]
        ]
        },
        {
        "type": "PANEL",
        "id": "panel",
        "name": "",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "-51",
        "y": "1657",
        "z": "6",
        "width": "1305.8120687980118",
        "height": "417.66207376486375",
        "params":
        [
        ]
        },
        {
        "type": "SCALE",
        "id": "scale",
        "name": "scale",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "909",
        "y": "1702",
        "z": "7",
        "params":
        [
                ["NUM#", "scaleY", "405.0376694910721,10"]
        ]
        },
        {
        "type": "RECT",
        "id": "rect",
        "name": "rectangle",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "156",
        "y": "1702",
        "z": "8",
        "params":
        [
                ["NUM#", "width", "10,0"]
        ]
        },
        {
        "type": "CMNT",
        "id": "comment",
        "name": "Sequence%20performs%20a%20multiply-and-add%20operation%2C",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "908",
        "y": "2244",
        "z": "9",
        "active": "true"
        },
        {
        "type": "CMNT",
        "id": "comment2",
        "name": "which%20gives%20you%20good%20control%20over%20simple%20curvature.",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "908",
        "y": "2290",
        "z": "10",
        "active": "true"
        }
    ],
    "connections":
    [
        {
        "outputNodeId": "rect",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "move",
        "inputId": "h0",
        "list": "false"
        },
        {
        "outputNodeId": "sequence2",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "move",
        "inputId": "x",
        "list": "false"
        },
        {
        "outputNodeId": "move",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "center",
        "inputId": "h0",
        "list": "false"
        },
        {
        "outputNodeId": "scale",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "repeat",
        "inputId": "h0",
        "list": "false"
        },
        {
        "outputNodeId": "center",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "scale",
        "inputId": "h0",
        "list": "false"
        },
        {
        "outputNodeId": "sequence",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "scale",
        "inputId": "scaleY",
        "list": "false"
        },
        {
        "outputNodeId": "color",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "rect",
        "inputId": "props",
        "list": "false"
        }
    ]
}
`;
