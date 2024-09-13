const presetLinesOfFire = '\
    {\
        "nodes":\
        [\
        {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3264",\
            "y": "1685",\
            "z": "0",\
            "params":\
            [\
                ["COL#", "color", "1,0 255,0 255,0 173,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3082",\
            "y": "1758",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "60,0"],\
                ["NUM#", "c2", "32,0"],\
                ["NUM#", "c3", "100,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4087",\
            "y": "1949",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "seed", "112,0"],\
                ["NUM#", "max", "1000,0"],\
                ["NUM#", "scale", "75,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3182.45",\
            "y": "2312",\
            "z": "3",\
            "params":\
            [\
                ["NUM#", "seed", "5082,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4089",\
            "y": "2165",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "seed", "2,0"],\
                ["NUM#", "max", "500,0"],\
                ["NUM#", "scale", "75,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4416",\
            "y": "2080",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "count", "400,0"]\
            ]\
        },\
        {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3690",\
            "y": "1622",\
            "z": "6",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3432",\
            "y": "1749",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "50,0"],\
                ["NUM#", "blend", "9,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3708",\
            "y": "1857",\
            "z": "8",\
            "params":\
            [\
                ["NUM#", "seed", "90,0"],\
                ["NUM#", "min", "200,0"],\
                ["NUM#", "max", "600,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4140",\
            "y": "1622",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "x", "608.3361389143399,0"],\
                ["NUM#", "y", "260.20256660587654,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "ITEMS",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3326.45",\
            "y": "2312",\
            "z": "10",\
            "width": "120",\
            "height": "142",\
            "params":\
            [\
                ["NUM#", "0", "90,0"],\
                ["NUM#", "1", "23,0"],\
                ["NUM#", "2", "130,0"],\
                ["NUM#", "3", "112,0"],\
                ["NUM#", "4", "2,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3913",\
            "y": "1854",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "seed", "130,0"],\
                ["NUM#", "min", "-360,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "164.2915082012082,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3707",\
            "y": "2042",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "seed", "23,0"],\
                ["NUM#", "min", "1,0"],\
                ["NUM#", "max", "8,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3180.45",\
            "y": "2501",\
            "z": "13"\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3990",\
            "y": "1622",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "angle", "336.42400577374326,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3264",\
            "y": "1802",\
            "z": "15",\
            "params":\
            [\
                ["COL#", "color", "1,0 255,0 255,0 173,0"],\
                ["NUM#", "opacity", "0,0"]\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3840",\
            "y": "1622",\
            "z": "16",\
            "params":\
            [\
                ["NUM#", "scaleX", "464,0"],\
                ["NUM#", "scaleY", "7,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3137",\
            "y": "2259",\
            "z": "17",\
            "width": "341",\
            "height": "373.9278209623572",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4671",\
            "y": "2062",\
            "z": "18",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "1000,0"],\
                ["NUM#", "height", "500,0"],\
                ["NUM#", "round", "10,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4302",\
            "y": "2394",\
            "z": "19",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "55.00000000000001,0"],\
                ["NUM#", "c3", "10,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "3889",\
            "y": "2186",\
            "z": "20",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "75,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3653",\
            "y": "2251",\
            "z": "21",\
            "params":\
            [\
                ["NUM#", "seed", "?,?"],\
                ["NUM#", "min", "100,0"],\
                ["NUM#", "max", "200,0"],\
                ["NUM#", "scale", "100,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4307",\
            "y": "2237",\
            "z": "22",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "40,0"]\
            ]\
        },\
        {\
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4494",\
            "y": "2293",\
            "z": "23",\
            "params":\
            [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "80,0"],\
                ["NUM#", "angle", "90,0"]\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "scale",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise2",\
            "inputId": "scale",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise3",\
            "inputId": "scale",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "grad2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h1",\
            "list": "false"\
        }\
        ]\
    }';