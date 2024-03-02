const presetLetterSalad = '\
{\
    "generatorVersion": "373",\
    "nodes":\
    [\
        {\
        "type": "COL",\
        "created": "1709379187961",\
        "updated": "1709379187961",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4557",\
        "y": "1774",\
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
        "created": "1709379187963",\
        "updated": "1709379187963",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4165",\
        "y": "1726",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "count", "10,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709379187964",\
        "updated": "1709379187964",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4164",\
        "y": "1565",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "count", "10,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1709379187967",\
        "updated": "1709379187967",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3011",\
        "y": "1166",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "x", "270,0"],\
                ["NUM#", "y", "306,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1709379187967",\
        "updated": "1709379187967",\
        "id": "num2",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2032",\
        "y": "1256",\
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
        "created": "1709379187968",\
        "updated": "1709379187968",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2278",\
        "y": "1901",\
        "z": "5",\
        "width": "60",\
        "height": "64"\
        },\
        {\
        "type": "GRAD",\
        "created": "1709379187971",\
        "updated": "1709379187971",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2018",\
        "y": "1748",\
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
        "created": "1709379187974",\
        "updated": "1709379187974",\
        "id": "random5",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1590",\
        "y": "1838",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "seed", "9756,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "20,0"]\
        ]\
        },\
        {\
        "type": "DRSH",\
        "created": "1709379187977",\
        "updated": "1709379187977",\
        "id": "dropShadow",\
        "name": "drop%20shadow",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2022",\
        "y": "2065",\
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
        "created": "1709379187980",\
        "updated": "1709379187980",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1676",\
        "y": "2164",\
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
        "created": "1709379187984",\
        "updated": "1709379187984",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1452",\
        "y": "2323",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "seed", "1175,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "max", "70,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1709379187986",\
        "updated": "1709379187986",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1853",\
        "y": "2365",\
        "z": "11",\
        "params":\
        [\
                ["COL#", "color", "1,0 64,0 112,0 47,0"],\
                ["NUM#", "opacity", "50,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709379187988",\
        "updated": "1709379187988",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2868",\
        "y": "1802",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "add", "34,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "MESPT",\
        "created": "1709379187989",\
        "updated": "1709379222544",\
        "id": "measure",\
        "name": "measure",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3313.64",\
        "y": "1423",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "length", "209.60916010518244,-2"],\
                ["NUM#", "angle", "48.094058058917106,-2"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1709379187990",\
        "updated": "1709379214647",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3010",\
        "y": "1380",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "x", "130,0"],\
                ["NUM#", "y", "150,0"]\
        ]\
        },\
        {\
        "type": "TEXT",\
        "created": "1709379187991",\
        "updated": "1709379187991",\
        "id": "text",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2027",\
        "y": "1167",\
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
        "created": "1709379187994",\
        "updated": "1709379187994",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1687",\
        "y": "1168",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "seed", "7214,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "65,0"],\
                ["NUM#", "max", "90,0"],\
                ["NUM#", "unique", "100,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709379187997",\
        "updated": "1709379187997",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3777",\
        "y": "1367",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "0.5,1"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709379187999",\
        "updated": "1709379187999",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2866",\
        "y": "1636",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "add", "30,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1709379188000",\
        "updated": "1709379216148",\
        "id": "point2",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3012",\
        "y": "1471",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "x", "270,0"],\
                ["NUM#", "y", "306,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1709379188003",\
        "updated": "1709379188003",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1825",\
        "y": "1825",\
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
        "created": "1709379188004",\
        "updated": "1709379188004",\
        "id": "ifElse",\
        "name": "if%2Felse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2795",\
        "y": "1163",\
        "z": "21",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "TXTS",\
        "created": "1709379188011",\
        "updated": "1709379188011",\
        "id": "text2",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2417",\
        "y": "1159",\
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
        "created": "1709379188014",\
        "updated": "1709379188014",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1830",\
        "y": "1684",\
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
        "created": "1709379188017",\
        "updated": "1709379188017",\
        "id": "dropShadow2",\
        "name": "drop%20shadow",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2019",\
        "y": "2260",\
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
        "created": "1709379188019",\
        "updated": "1709379188019",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2628",\
        "y": "1263",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "angle", "90,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "TCHAR",\
        "created": "1709379188019",\
        "updated": "1709379188019",\
        "id": "codeToChar",\
        "name": "to%20char",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1854",\
        "y": "1168",\
        "z": "26"\
        },\
        {\
        "type": "NUM",\
        "created": "1709379188020",\
        "updated": "1709379188020",\
        "id": "num3",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2033",\
        "y": "1318",\
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
        "created": "1709379188023",\
        "updated": "1709379225157",\
        "id": "frame",\
        "name": "Letter%20salad",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4716",\
        "y": "1588",\
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
        "created": "1709379188026",\
        "updated": "1709379188026",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2049",\
        "y": "1405",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "seed", "5563,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "9,0"],\
                ["NUM#", "max", "17,0"]\
        ]\
        },\
        {\
        "type": "PROB",\
        "created": "1709379188028",\
        "updated": "1709379188028",\
        "id": "prob",\
        "name": "probability",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2633",\
        "y": "1412",\
        "z": "30",\
        "params":\
        [\
                ["NUM#", "seed", "2620,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "chance", "75,0"]\
        ]\
        },\
        {\
        "type": "SCALE",\
        "created": "1709379188031",\
        "updated": "1709379188031",\
        "id": "scale",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3946",\
        "y": "1168",\
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
        "created": "1709379188034",\
        "updated": "1709379188034",\
        "id": "random6",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1590",\
        "y": "1657",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "seed", "1391,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "100,0"],\
                ["NUM#", "max", "140,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1709379188036",\
        "updated": "1709379188036",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1452",\
        "y": "2142",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "seed", "1174,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "50,0"]\
        ]\
        },\
        {\
        "type": "SMINMAX",\
        "created": "1709379188037",\
        "updated": "1709379188037",\
        "id": "minmax2",\
        "name": "min%2Fmax",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3627",\
        "y": "1368",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "operand", "10,0"],\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709379188039",\
        "updated": "1709379222544",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3480",\
        "y": "1368",\
        "z": "35",\
        "params":\
        [\
                ["NUM#", "operand", "200,0"],\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "invert", "1,0"]\
        ]\
        },\
        {\
        "type": "VECLEN",\
        "created": "1709379208414",\
        "updated": "1709379217415",\
        "id": "vector",\
        "name": "vector",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3167",\
        "y": "1420",\
        "z": "36"\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1709379188051",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "scale",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "dropShadow",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "dropShadow2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "dropShadow",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1709379217415",\
        "outputNodeId": "vector",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "measure",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "codeToChar",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "minmax2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "move",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "move",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "text2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ifElse",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "prob",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "condition",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "text",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "text2",\
        "inputId": "size",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "style",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "random5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "dropShadow2",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "text2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "codeToChar",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "scaleX",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "scale",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1709379188051",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "minmax2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379222544",\
        "outputNodeId": "measure",\
        "outputId": "length",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379214647",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "vector",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709379216147",\
        "outputNodeId": "point2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "vector",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
}';