const presetDefault = `
{
    "nodes":
    [
        {
        "type": "CENTR",
        "id": "center",
        "name": "center",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "6443.46",
        "y": "5887",
        "z": "0",
        "params":
        [
                ["NUM#", "centerY", "100,0"]
        ]
        },
        {
        "type": "COL",
        "id": "color2",
        "name": "color",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "5547.54",
        "y": "6156",
        "z": "1",
        "prevSpace": "hsv",
        "params":
        [
                ["NUM#", "space", "2,0"],
                ["NUM#", "c1", "215,0"],
                ["NUM#", "c2", "90.11926605504587,0"],
                ["NUM#", "c3", "100,0"]
        ]
        },
        {
        "type": "FILL",
        "id": "fill",
        "name": "fill",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "5711.54",
        "y": "6129",
        "z": "2",
        "active": "true",
        "params":
        [
                ["COL#", "color", "1,0 25,0 121,0 255,0"],
                ["NUM#", "opacity", "30,0"]
        ]
        },
        {
        "type": "SEQ",
        "id": "sequence3",
        "name": "scale%20W",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "6282.46",
        "y": "6238",
        "z": "3",
        "active": "true",
        "params":
        [
                ["NUM#", "start", "100,0"],
                ["NUM#", "add", "-10,0"],
                ["NUM#", "end", "?,0"]
        ]
        },
        {
        "type": "SEQ",
        "id": "sequence",
        "name": "move%20Y",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "6012",
        "y": "6201",
        "z": "4",
        "active": "true",
        "params":
        [
                ["NUM#", "add", "3,0"],
                ["NUM#", "end", "?,0"]
        ]
        },
        {
        "type": "REPT",
        "id": "repeat",
        "name": "repeat",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "6711",
        "y": "5948",
        "z": "5",
        "active": "true"
        },
        {
        "type": "SCALE",
        "id": "scale",
        "name": "scale",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "6443.46",
        "y": "6004",
        "z": "6",
        "params":
        [
                ["NUM#", "scaleX", "10,0"],
                ["NUM#", "scaleY", "10,0"]
        ]
        },
        {
        "type": "ELPS",
        "id": "ellipse",
        "name": "ellipse",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "5885.54",
        "y": "5948",
        "z": "7",
        "params":
        [
                ["NUM#", "width", "200,0"],
                ["NUM#", "height", "200,0"]
        ]
        },
        {
        "type": "MOVE",
        "id": "move",
        "name": "move",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "6159",
        "y": "5948",
        "z": "8",
        "params":
        [
                ["NUM#", "y", "27,0"]
        ]
        },
        {
        "type": "SEQ",
        "id": "sequence2",
        "name": "scale%20H",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "6283.46",
        "y": "6357",
        "z": "9",
        "active": "true",
        "params":
        [
                ["NUM#", "start", "100,0"],
                ["NUM#", "add", "-10,0"],
                ["NUM#", "end", "?,0"]
        ]
        }
    ],
    "connections":
    [
        {
        "outputNodeId": "move",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "center",
        "inputId": "h0",
        "list": "false"
        },
        {
        "outputNodeId": "color2",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "fill",
        "inputId": "color",
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
        "outputNodeId": "sequence3",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "scale",
        "inputId": "scaleX",
        "list": "false"
        },
        {
        "outputNodeId": "sequence2",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "scale",
        "inputId": "scaleY",
        "list": "false"
        },
        {
        "outputNodeId": "fill",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "ellipse",
        "inputId": "props",
        "list": "false"
        },
        {
        "outputNodeId": "ellipse",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "move",
        "inputId": "h0",
        "list": "false"
        },
        {
        "outputNodeId": "sequence",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "move",
        "inputId": "y",
        "list": "false"
        }
    ]
}
`;
