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
            "x": "6261",\
            "y": "839",\
            "z": "0"\
            },\
            {\
            "type": "FRM",\
            "id": "frame2",\
            "name": "alt_background",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7075",\
            "y": "919",\
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
            "x": "5466",\
            "y": "1322",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "seed", "5970,0"],\
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
            "x": "5463",\
            "y": "1175",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "3804,0"],\
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
            "x": "5199",\
            "y": "877",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "5040,0"],\
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
            "x": "5360",\
            "y": "799",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "angle", "1,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4603",\
            "y": "790",\
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
            "x": "4759",\
            "y": "1035",\
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
            "x": "4974",\
            "y": "655",\
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
            "x": "5124",\
            "y": "655",\
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
            "x": "5724",\
            "y": "659",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "centerX", "18,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5881",\
            "y": "663",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "scaleX", "118,0"],\
                    ["NUM#", "scaleY", "122,0"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3628",\
            "y": "1024",\
            "z": "12"\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3794",\
            "y": "781",\
            "z": "13",\
            "width": "127.93624156812596",\
            "height": "252",\
            "params":\
            [\
                    ["NUM#", "0", "1717,0"],\
                    ["NUM#", "1", "3791,0"],\
                    ["NUM#", "2", "643,0"],\
                    ["NUM#", "3", "2950,0"],\
                    ["NUM#", "4", "6798,0"],\
                    ["NUM#", "5", "323,0"],\
                    ["NUM#", "6", "7495,0"],\
                    ["NUM#", "7", "5040,0"],\
                    ["NUM#", "8", "3804,0"],\
                    ["NUM#", "9", "5970,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5965",\
            "y": "1039",\
            "z": "14",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "196.39435762371605,0"],\
                    ["NUM#", "c2", "59,0"],\
                    ["NUM#", "c3", "56,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "3579",\
            "y": "727",\
            "z": "15",\
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
            "x": "6555",\
            "y": "951",\
            "z": "16",\
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
            "x": "4164",\
            "y": "862",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "seed", "3791,0"],\
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
            "x": "7072",\
            "y": "679",\
            "z": "18",\
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
            "x": "4328",\
            "y": "784",\
            "z": "19",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "193.45069022293808,0"],\
                    ["NUM#", "c2", "44,0"],\
                    ["NUM#", "c3", "74,0"]\
            ]\
            },\
            {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5406",\
            "y": "1055",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "seed", "7495,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5778",\
            "y": "1270",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "seed", "323,0"],\
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
            "x": "5558",\
            "y": "656",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "condition", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "3631",\
            "y": "766",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "seed", "8453,0"],\
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
            "x": "6031",\
            "y": "663",\
            "z": "24",\
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
            "x": "6705",\
            "y": "951",\
            "z": "25",\
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
            "x": "5783",\
            "y": "1132",\
            "z": "26",\
            "params":\
            [\
                    ["NUM#", "seed", "6798,0"],\
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
            "x": "6405",\
            "y": "951",\
            "z": "27",\
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
            "x": "5566",\
            "y": "878",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "seed", "2950,0"],\
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
            "x": "4166",\
            "y": "1018",\
            "z": "29",\
            "params":\
            [\
                    ["NUM#", "seed", "643,0"],\
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
            "x": "4613",\
            "y": "1035",\
            "z": "30",\
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
            "x": "7018",\
            "y": "629",\
            "z": "31",\
            "active": "true",\
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
            "x": "4159",\
            "y": "626",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "seed", "1717,0"],\
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
            "x": "4666",\
            "y": "933",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "value", "-400,0"],\
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
            "x": "4371",\
            "y": "1009",\
            "z": "34",\
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
            "x": "3628",\
            "y": "909",\
            "z": "35"\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4990",\
            "y": "1113",\
            "z": "36",\
            "active": "true",\
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
            "list": "false"\
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
            "outputNodeId": "list",\
            "outputId": "9",\
            "outputOrder": "1",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "8",\
            "outputOrder": "1",\
            "inputNodeId": "random8",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "7",\
            "outputOrder": "4",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
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
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "freeze",\
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
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "4",\
            "inputNodeId": "prob",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "4",\
            "inputNodeId": "random7",\
            "inputId": "seed",\
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
            "list": "false"\
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