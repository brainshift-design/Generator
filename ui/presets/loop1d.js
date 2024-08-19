const presetLoop1d = `
{
    "nodes":
    [
        {
        "type": "COL",
        "id": "color",
        "name": "color",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "95",
        "y": "377",
        "z": "0",
        "prevSpace": "hsv",
        "params":
        [
                ["NUM#", "space", "2,0"],
                ["NUM#", "c1", "46,0"],
                ["NUM#", "c2", "75,0"],
                ["NUM#", "c3", "90,0"]
        ]
        },
        {
        "type": "MOVE",
        "id": "move",
        "name": "move",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "790",
        "y": "218",
        "z": "1",
        "params":
        [
                ["NUM#", "x", "1080,0"]
        ]
        },
        {
        "type": "REPT",
        "id": "repeat",
        "name": "repeat",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "1037",
        "y": "498",
        "z": "2",
        "active": "true"
        },
        {
        "type": "SEQ",
        "id": "sequence",
        "name": "sequence",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "567",
        "y": "498",
        "z": "3",
        "params":
        [
                ["NUM#", "add", "120,0"],
                ["NUM#", "end", "?,0"]
        ]
        },
        {
        "type": "PANEL",
        "id": "panel",
        "name": "1D%20loop",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "508",
        "y": "150",
        "z": "4",
        "width": "691",
        "height": "494.2911638796187",
        "params":
        [
        ]
        },
        {
        "type": "POLY",
        "id": "poly",
        "name": "polygon",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "257",
        "y": "218",
        "z": "5",
        "params":
        [
        ]
        },
        {
        "type": "CMNT",
        "id": "comment",
        "name": "Incoming%20data%20(in%20this%20case%20a%20polygon)%20is%20%22repeated%E2%80%89%22%2C%20with%20",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "497",
        "y": "674",
        "z": "6"
        },
        {
        "type": "CMNT",
        "id": "comment2",
        "name": "each%20new%20repeat%20receiving%20a%20new%20X%20value%20from%20the%20sequence.",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "496",
        "y": "717",
        "z": "7"
        }
    ],
    "connections":
    [
        {
        "outputNodeId": "poly",
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
        "inputId": "x",
        "list": "false"
        },
        {
        "outputNodeId": "move",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "repeat",
        "inputId": "h0",
        "list": "false"
        },
        {
        "outputNodeId": "color",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "poly",
        "inputId": "props",
        "list": "false"
        }
    ]
}
`;
