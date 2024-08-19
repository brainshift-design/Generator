const presetLoop2d = `
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
        "x": "3517",
        "y": "3623",
        "z": "0",
        "params":
        [
            ["NUM#", "add", "120,0"],
            ["NUM#", "end", "?,0"]
        ]
    },
    {
        "type": "COL",
        "id": "color",
        "name": "color",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "3045",
        "y": "3327",
        "z": "1",
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
        "type": "CMNT",
        "id": "comment5",
        "name": "the%20repeat%20is%20done.%20Unlink%20the%20gray%20wires%20to%20see%20the%20difference.",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "3415",
        "y": "4031",
        "z": "2"
    },
    {
        "type": "CMNT",
        "id": "comment2",
        "name": "with%20each%20new%20repeat%20receiving%20new%20X%20and%20Y%20values",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "3460",
        "y": "3848",
        "z": "3"
    },
    {
        "type": "PANEL",
        "id": "panel",
        "name": "2D%20loop",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "3458",
        "y": "3100",
        "z": "4",
        "width": "691",
        "height": "673.6051224213832",
        "params":
        [
        ]
    },
    {
        "type": "CMNT",
        "id": "comment4",
        "name": "%3Cb%3ELinking%20a%20sequence%20to%20a%20repeat%3C%2Fb%3E%20causes%20it%20to%20reset%20when%20",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "3415",
        "y": "3986",
        "z": "5"
    },
    {
        "type": "CMNT",
        "id": "comment3",
        "name": "from%20two%20separate%20sequences.",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "3463",
        "y": "3893",
        "z": "6"
    },
    {
        "type": "POLY",
        "id": "poly",
        "name": "polygon",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "3207",
        "y": "3168",
        "z": "7",
        "params":
        [
            ["NUM#", "corners", "4,0"]
        ]
    },
    {
        "type": "SEQ",
        "id": "sequence",
        "name": "sequence",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "3517",
        "y": "3448",
        "z": "8",
        "params":
        [
            ["NUM#", "add", "120,0"],
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
        "x": "3740",
        "y": "3168",
        "z": "9",
        "params":
        [
            ["NUM#", "x", "480,0"],
            ["NUM#", "y", "480,0"]
        ]
    },
    {
        "type": "REPT",
        "id": "repeat",
        "name": "repeat",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "3967",
        "y": "3448",
        "z": "10",
        "params":
        [
        ]
    },
    {
        "type": "REPT",
        "id": "repeat2",
        "name": "repeat",
        "renamed": "false",
        "enabled": "true",
        "highlight": "0",
        "x": "3967",
        "y": "3623",
        "z": "11",
        "active": "true",
        "params":
        [
        ]
    },
    {
        "type": "CMNT",
        "id": "comment",
        "name": "Incoming%20data%20(in%20this%20case%20a%20polygon)%20is%20%22repeated%E2%80%89%22%2C",
        "renamed": "true",
        "enabled": "true",
        "highlight": "0",
        "x": "3462",
        "y": "3804",
        "z": "12"
    },
    {
        "type": "PANEL",
        "id": "panel2",
        "name": "",
        "renamed": "false",
        "enabled": "true",
        "highlight": "5",
        "x": "3721",
        "y": "3640",
        "z": "13",
        "active": "true",
        "width": "60",
        "height": "32",
        "params":
        [
        ]
    },
    {
        "type": "PANEL",
        "id": "panel3",
        "name": "",
        "renamed": "false",
        "enabled": "true",
        "highlight": "5",
        "x": "3781",
        "y": "3661",
        "z": "14",
        "active": "true",
        "width": "60",
        "height": "32",
        "params":
        [
        ]
    },
    {
        "type": "PANEL",
        "id": "panel4",
        "name": "",
        "renamed": "false",
        "enabled": "true",
        "highlight": "5",
        "x": "3841",
        "y": "3679",
        "z": "15",
        "active": "true",
        "width": "60",
        "height": "32",
        "params":
        [
        ]
    },
    {
        "type": "PANEL",
        "id": "panel5",
        "name": "",
        "renamed": "false",
        "enabled": "true",
        "highlight": "5",
        "x": "3725",
        "y": "3466",
        "z": "16",
        "active": "true",
        "width": "60",
        "height": "32",
        "params":
        [
        ]
    },
    {
        "type": "PANEL",
        "id": "panel6",
        "name": "",
        "renamed": "false",
        "enabled": "true",
        "highlight": "5",
        "x": "3785",
        "y": "3487",
        "z": "17",
        "active": "true",
        "width": "60",
        "height": "32",
        "params":
        [
        ]
    },
    {
        "type": "PANEL",
        "id": "panel7",
        "name": "",
        "renamed": "false",
        "enabled": "true",
        "highlight": "5",
        "x": "3845",
        "y": "3505",
        "z": "18",
        "active": "true",
        "width": "60",
        "height": "32",
        "params":
        [
        ]
    },
    {
        "type": "PANEL",
        "id": "panel8",
        "name": "",
        "renamed": "false",
        "enabled": "true",
        "highlight": "5",
        "x": "3387",
        "y": "3973",
        "z": "19",
        "active": "true",
        "width": "826.8969014821726",
        "height": "119",
        "params":
        [
        ]
    }
    ],
    "connections":
    [
    {
        "outputNodeId": "color",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "poly",
        "inputId": "props",
        "list": "false"
    },
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
        "outputNodeId": "sequence2",
        "outputId": "h0",
        "outputOrder": "1",
        "inputNodeId": "move",
        "inputId": "y",
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
        "outputNodeId": "sequence",
        "outputId": "h0",
        "outputOrder": "1",
        "inputNodeId": "repeat",
        "inputId": "loop",
        "list": "false"
    },
    {
        "outputNodeId": "repeat",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "repeat2",
        "inputId": "h0",
        "list": "true"
    },
    {
        "outputNodeId": "sequence2",
        "outputId": "h0",
        "outputOrder": "0",
        "inputNodeId": "repeat2",
        "inputId": "loop",
        "list": "false"
    }
    ]
}
`;