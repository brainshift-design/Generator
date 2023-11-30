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
            "x": "4407",\
            "y": "1624",\
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
            "x": "4015",\
            "y": "1576",\
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
            "x": "4014",\
            "y": "1415",\
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
            "x": "2861",\
            "y": "1016",\
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
            "x": "1882",\
            "y": "1106",\
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
            "x": "2128",\
            "y": "1751",\
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
            "x": "1868",\
            "y": "1598",\
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
            "x": "1440",\
            "y": "1688",\
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
            "x": "1872",\
            "y": "1915",\
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
            "x": "1526",\
            "y": "2014",\
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
            "x": "1302",\
            "y": "2173",\
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
            "x": "1703",\
            "y": "2215",\
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
            "x": "2718",\
            "y": "1652",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "add", "34,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3180.64",\
            "y": "1121",\
            "z": "13",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "200,0"]\
            ]\
        },\
        {\
            "type": "MESPT",\
            "id": "measure",\
            "name": "measure",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3163.64",\
            "y": "1273",\
            "z": "14",\
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
            "x": "3014.64",\
            "y": "1228",\
            "z": "15",\
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
            "x": "1877",\
            "y": "1017",\
            "z": "16",\
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
            "x": "1537",\
            "y": "1018",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "seed", "7214,0"],\
                ["NUM#", "min", "65,0"],\
                ["NUM#", "max", "90,0"],\
                ["NUM#", "unique", "100,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3327.64",\
            "y": "1193",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "value", "-9.60916010518244,10"],\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3627",\
            "y": "1217",\
            "z": "19",\
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
            "x": "2716",\
            "y": "1486",\
            "z": "20",\
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
            "x": "3020.64",\
            "y": "1319",\
            "z": "21",\
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
            "x": "1675",\
            "y": "1675",\
            "z": "22",\
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
            "x": "2645",\
            "y": "1013",\
            "z": "23",\
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
            "x": "2267",\
            "y": "1009",\
            "z": "24",\
            "params":\
            [\
                ["TEXT#", "text", "L", "center"],\
                ["NUM#", "width", "40,0"],\
                ["NUM#", "height", "45,0"],\
                ["NUM#", "size", "45,0"],\
                ["TEXT#", "style", "Regular"],\
                ["NUM#", "alignH", "1,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1680",\
            "y": "1534",\
            "z": "25",\
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
            "x": "1869",\
            "y": "2110",\
            "z": "26",\
            "params":\
            [\
                ["NUM#", "y", "2,0"],\
                ["NUM#", "blur", "5,0"],\
                ["NUM#", "spread", "4,0"],\
                ["FILL#", "fill", "64,0 112,0 47,0 50,0 0,0"]\
            ]\
        },\
        {\
            "type": "MINMAX",\
            "id": "minmax",\
            "name": "min%2Fmax",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3477",\
            "y": "1217",\
            "z": "27",\
            "params":\
            [\
                ["NUM#", "value", "10,0"],\
                ["NUM#", "operation", "1,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2478",\
            "y": "1113",\
            "z": "28",\
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
            "x": "1704",\
            "y": "1018",\
            "z": "29"\
        },\
        {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1883",\
            "y": "1168",\
            "z": "30",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "45,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3334",\
            "y": "1293",\
            "z": "31",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "10,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "Letter%20salad",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4566",\
            "y": "1438",\
            "z": "32",\
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
            "x": "1899",\
            "y": "1255",\
            "z": "33",\
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
            "x": "2483",\
            "y": "1262",\
            "z": "34",\
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
            "x": "3796",\
            "y": "1018",\
            "z": "35",\
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
            "x": "1440",\
            "y": "1507",\
            "z": "36",\
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
            "x": "1302",\
            "y": "1992",\
            "z": "37",\
            "params":\
            [\
                ["NUM#", "seed", "1174,0"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "100,0"]\
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
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "measure",\
            "outputId": "distance",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "minmax",\
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
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "minmax",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "minmax",\
            "inputId": "h1",\
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
        }\
        ]\
    }';