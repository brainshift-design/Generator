const presetLetterSalad = '\
    {\
        "nodes":\
        [\
        {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4507",\
            "y": "1724",\
            "z": "0",\
            "prevSpace": "hex",\
            "params":\
            [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "170,0"],\
                ["NUM#", "c2", "170,0"],\
                ["NUM#", "c3", "170,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4115",\
            "y": "1676",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "count", "10,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4114",\
            "y": "1515",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "count", "10,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2961",\
            "y": "1116",\
            "z": "3",\
            "params":\
            [\
                ["NUM#", "x", "270,0"],\
                ["NUM#", "y", "306,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1982",\
            "y": "1206",\
            "z": "4",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "40,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2228",\
            "y": "1851",\
            "z": "5",\
            "width": "60",\
            "height": "64"\
        },\
        {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1968",\
            "y": "1698",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "type", "1,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "85,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1540",\
            "y": "1788",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "seed", "9756,0"],\
                ["NUM#", "min", "20,0"],\
                ["NUM#", "max", "100,0"]\
            ]\
        },\
        {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1972",\
            "y": "2015",\
            "z": "8",\
            "params":\
            [\
                ["NUM#", "y", "1,0"],\
                ["NUM#", "blur", "1,0"],\
                ["NUM#", "spread", "4,0"],\
                ["FILL#", "fill", "64,0 112,0 47,0 100,0 0,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1626",\
            "y": "2114",\
            "z": "9",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "103.99999999999999,0"],\
                ["NUM#", "c2", "58,0"],\
                ["NUM#", "c3", "44,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1402",\
            "y": "2273",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "seed", "1175,0"],\
                ["NUM#", "max", "70,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1803",\
            "y": "2315",\
            "z": "11",\
            "params":\
            [\
                ["COL#", "color", "1,0 64,0 112,0 47,0"],\
                ["NUM#", "opacity", "50,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2818",\
            "y": "1752",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "add", "34,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "MESPT",\
            "id": "measure",\
            "name": "measure",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3263.64",\
            "y": "1373",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "distance", "209.60916010518244,10"],\
                ["NUM#", "angle", "48.094058058917106,10"]\
            ]\
        },\
        {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3114.64",\
            "y": "1328",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "x", "130,0"],\
                ["NUM#", "y", "150,0"]\
            ]\
        },\
        {\
            "type": "TEXT",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1977",\
            "y": "1117",\
            "z": "15",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["TEXT#", "value", "L", "center"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1637",\
            "y": "1118",\
            "z": "16",\
            "params":\
            [\
                ["NUM#", "seed", "7214,0"],\
                ["NUM#", "min", "65,0"],\
                ["NUM#", "max", "90,0"],\
                ["NUM#", "unique", "100,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3727",\
            "y": "1317",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "0.5,1"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2816",\
            "y": "1586",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "add", "30,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3120.64",\
            "y": "1419",\
            "z": "19",\
            "params":\
            [\
                ["NUM#", "x", "270,0"],\
                ["NUM#", "y", "306,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1775",\
            "y": "1775",\
            "z": "20",\
            "prevSpace": "hex",\
            "params":\
            [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
            ]\
        },\
        {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2745",\
            "y": "1113",\
            "z": "21",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "TXTS",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2367",\
            "y": "1109",\
            "z": "22",\
            "params":\
            [\
                ["TEXT#", "text", "L", "center"],\
                ["NUM#", "width", "40,0"],\
                ["NUM#", "height", "45,0"],\
                ["NUM#", "size", "45,0"],\
                ["TEXT#", "style", "Regular"],\
                ["NUM#", "alignX", "1,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1780",\
            "y": "1634",\
            "z": "23",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "111,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "23,0"]\
            ]\
        },\
        {\
            "type": "DRSH",\
            "id": "dropShadow2",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1969",\
            "y": "2210",\
            "z": "24",\
            "params":\
            [\
                ["NUM#", "y", "2,0"],\
                ["NUM#", "blur", "5,0"],\
                ["NUM#", "spread", "4,0"],\
                ["FILL#", "fill", "64,0 112,0 47,0 50,0 0,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2578",\
            "y": "1213",\
            "z": "25",\
            "params":\
            [\
                ["NUM#", "angle", "90,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "TCHAR",\
            "id": "codeToChar",\
            "name": "to%20char",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1804",\
            "y": "1118",\
            "z": "26"\
        },\
        {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1983",\
            "y": "1268",\
            "z": "27",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "45,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "Letter%20salad",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4666",\
            "y": "1538",\
            "z": "28",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "310,0"],\
                ["NUM#", "height", "350,0"],\
                ["NUM#", "round", "10,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1999",\
            "y": "1355",\
            "z": "29",\
            "params":\
            [\
                ["NUM#", "seed", "5563,0"],\
                ["NUM#", "min", "9,0"],\
                ["NUM#", "max", "17,0"]\
            ]\
        },\
        {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2583",\
            "y": "1362",\
            "z": "30",\
            "params":\
            [\
                ["NUM#", "seed", "2620,0"],\
                ["NUM#", "chance", "75,0"]\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3896",\
            "y": "1118",\
            "z": "31",\
            "params":\
            [\
                ["NUM#", "scaleX", "5,1"],\
                ["NUM#", "scaleY", "5,1"],\
                ["NUM#", "affectStyle", "0,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1540",\
            "y": "1607",\
            "z": "32",\
            "params":\
            [\
                ["NUM#", "seed", "1391,0"],\
                ["NUM#", "min", "100,0"],\
                ["NUM#", "max", "140,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1402",\
            "y": "2092",\
            "z": "33",\
            "params":\
            [\
                ["NUM#", "seed", "1174,0"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "100,0"]\
            ]\
        },\
        {\
            "type": "SMINMAX",\
            "id": "minmax2",\
            "name": "min%2Fmax",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3577",\
            "y": "1318",\
            "z": "34",\
            "params":\
            [\
                ["NUM#", "operand", "10,0"],\
                ["NUM#", "operation", "1,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3430",\
            "y": "1318",\
            "z": "35",\
            "params":\
            [\
                ["NUM#", "operand", "200,0"],\
                ["NUM#", "operation", "0,0"],\
                ["NUM#", "invert", "1,0"]\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
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
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "dropShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "dropShadow2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "dropShadow",\
            "inputId": "fill",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "measure",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "measure",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "codeToChar",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "minmax2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "x",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "y",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text2",\
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
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "text",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "width",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "height",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "text2",\
            "inputId": "size",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "style",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "dropShadow2",\
            "inputId": "fill",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "codeToChar",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "minmax2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "measure",\
            "outputId": "distance",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
        }\
        ]\
    }';