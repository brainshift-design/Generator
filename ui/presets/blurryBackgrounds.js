const presetBlurryBackgrounds = '\
    {\
        "nodes":\
        [\
        {\
            "type": "RSTX",\
            "id": "reset",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6361",\
            "y": "939",\
            "z": "0"\
        },\
        {\
            "type": "FRM",\
            "id": "frame2",\
            "name": "alt_background",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7175",\
            "y": "1019",\
            "z": "1",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "x", "1536,0"],\
                ["NUM#", "width", "640,0"],\
                ["NUM#", "height", "1871,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5562",\
            "y": "1457",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "seed", "?,?"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "200,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random8",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5563",\
            "y": "1275",\
            "z": "3",\
            "params":\
            [\
                ["NUM#", "seed", "?,?"],\
                ["NUM#", "min", "30,0"],\
                ["NUM#", "max", "120,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5299",\
            "y": "977",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "seed", "?,?"],\
                ["NUM#", "min", "-20,0"],\
                ["NUM#", "max", "20,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5460",\
            "y": "899",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "angle", "8,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4703",\
            "y": "890",\
            "z": "6",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4859",\
            "y": "1135",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "operand", "1440,0"]\
            ]\
        },\
        {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5074",\
            "y": "755",\
            "z": "8",\
            "params":\
            [\
                ["NUM#", "x", "-400,0"],\
                ["NUM#", "y", "-200,0"],\
                ["NUM#", "width", "2240,0"],\
                ["NUM#", "height", "305,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5224",\
            "y": "755",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "y", "2417,0"]\
            ]\
        },\
        {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5824",\
            "y": "759",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "centerX", "63,0"]\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5981",\
            "y": "763",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "scaleX", "93,0"],\
                ["NUM#", "scaleY", "155,0"]\
            ]\
        },\
        {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3894",\
            "y": "881",\
            "z": "12",\
            "width": "127.93624156812596",\
            "height": "142",\
            "params":\
            [\
                ["NUM#", "0", "471,0"],\
                ["NUM#", "1", "913,0"],\
                ["NUM#", "2", "6830,0"],\
                ["NUM#", "3", "6412,0"],\
                ["NUM#", "4", "5064,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6065",\
            "y": "1139",\
            "z": "13",\
            "prevSpace": "hsb",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "37.826443574310474,0"],\
                ["NUM#", "c2", "20,0"],\
                ["NUM#", "c3", "37,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3679",\
            "y": "827",\
            "z": "14",\
            "width": "391.5464527901859",\
            "height": "361.9571393556358",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6655",\
            "y": "1051",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "scaleX", "51,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4258",\
            "y": "932",\
            "z": "16",\
            "params":\
            [\
                ["NUM#", "seed", "913,0"],\
                ["NUM#", "min", "15,0"],\
                ["NUM#", "max", "100,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "background",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7172",\
            "y": "779",\
            "z": "17",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "1440,0"],\
                ["NUM#", "height", "2640,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4428",\
            "y": "884",\
            "z": "18",\
            "prevSpace": "hsb",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "47.57186057749399,0"],\
                ["NUM#", "c2", "16,0"],\
                ["NUM#", "c3", "80,0"]\
            ]\
        },\
        {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5506",\
            "y": "1155",\
            "z": "19",\
            "params":\
            [\
                ["NUM#", "seed", "?,?"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5882",\
            "y": "1414",\
            "z": "20",\
            "params":\
            [\
                ["NUM#", "seed", "?,?"],\
                ["NUM#", "min", "20,0"],\
                ["NUM#", "max", "70,0"]\
            ]\
        },\
        {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5658",\
            "y": "756",\
            "z": "21",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3731",\
            "y": "866",\
            "z": "22",\
            "params":\
            [\
                ["NUM#", "seed", "8494,0"],\
                ["NUM#", "min", "2,0"],\
                ["NUM#", "max", "10000,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6131",\
            "y": "763",\
            "z": "23",\
            "params":\
            [\
                ["NUM#", "count", "20,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6805",\
            "y": "1051",\
            "z": "24",\
            "params":\
            [\
                ["NUM#", "y", "-166,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5883",\
            "y": "1232",\
            "z": "25",\
            "params":\
            [\
                ["NUM#", "seed", "5064,0"],\
                ["NUM#", "max", "100,0"]\
            ]\
        },\
        {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6505",\
            "y": "1051",\
            "z": "26",\
            "params":\
            [\
                ["NUM#", "centerX", "12,0"],\
                ["NUM#", "centerY", "22,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random9",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5666",\
            "y": "978",\
            "z": "27",\
            "params":\
            [\
                ["NUM#", "seed", "6412,0"],\
                ["NUM#", "max", "100,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4258",\
            "y": "1118",\
            "z": "28",\
            "params":\
            [\
                ["NUM#", "seed", "6830,0"],\
                ["NUM#", "min", "10,0"],\
                ["NUM#", "max", "100,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4713",\
            "y": "1135",\
            "z": "29",\
            "params":\
            [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "2,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "7118",\
            "y": "729",\
            "z": "30",\
            "width": "245.8044905377676",\
            "height": "527.9494652984481",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4259",\
            "y": "726",\
            "z": "31",\
            "params":\
            [\
                ["NUM#", "seed", "471,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "5,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4766",\
            "y": "1033",\
            "z": "32",\
            "params":\
            [\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "LBLR",\
            "id": "layerBlur",\
            "name": "layer%20blur",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4471",\
            "y": "1109",\
            "z": "33",\
            "params":\
            [\
                ["NUM#", "radius", "400,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3729",\
            "y": "1057",\
            "z": "34"\
        },\
        {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5090",\
            "y": "1213",\
            "z": "35",\
            "params":\
            [\
                ["NUM#", "seed", "3262,0"],\
                ["NUM#", "max", "2640,0"]\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "reset",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame2",\
            "inputId": "children",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "frame2",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "layerBlur",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "width",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "centerX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
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
            "outputNodeId": "color2",\
            "outputId": "c1",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "4",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
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
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "prob",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "condition",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "4",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "reset",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "1",\
            "inputNodeId": "random9",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "4",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "layerBlur",\
            "outputId": "radius",\
            "outputOrder": "1",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "4",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "layerBlur",\
            "outputId": "radius",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
        }\
        ]\
    }';