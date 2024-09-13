const presetAlphabetSoup = '\
{\
    "generatorVersion": "392",\
    "nodes":\
    [\
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
        "x": "2183",\
        "y": "1468",\
        "z": "0",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "45,0"]\
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
        "x": "3160",\
        "y": "1530",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "x", "130,0"],\
                ["NUM#", "y", "150,0"]\
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
        "x": "3630",\
        "y": "1518",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "operand", "300,0"],\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "invert", "1,0"]\
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
        "x": "3777",\
        "y": "1518",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "operand", "10,0"],\
                ["NUM#", "operation", "1,0"]\
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
        "x": "2004",\
        "y": "1318",\
        "z": "4"\
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
        "x": "2169",\
        "y": "2410",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "y", "2,0"],\
                ["NUM#", "blur", "5,0"],\
                ["NUM#", "spread", "4,0"],\
                ["FILL#", "fill", "48,0 41,0 13,0 50,0 0,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1709379188034",\
        "updated": "1709379188034",\
        "id": "random7",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1196",\
        "y": "1989",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "seed", "8260,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"]\
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
        "x": "2172",\
        "y": "2215",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "y", "1,0"],\
                ["NUM#", "blur", "1,0"],\
                ["NUM#", "spread", "4,0"],\
                ["FILL#", "fill", "48,0 41,0 13,0 100,0 0,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1711970644906",\
        "updated": "1711970644908",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1821",\
        "y": "1778",\
        "z": "8"\
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
        "x": "4314",\
        "y": "1715",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "count", "12,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1709379187961",\
        "updated": "1711971191218",\
        "id": "color5",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4654",\
        "y": "2321",\
        "z": "10",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "213,0"],\
                ["NUM#", "c2", "55,0"],\
                ["NUM#", "c3", "44,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1711972373442",\
        "updated": "1711972427686",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4968.3",\
        "y": "2210.93",\
        "z": "11",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "FRM",\
        "created": "1709379188023",\
        "updated": "1711974029929",\
        "id": "frame",\
        "name": "Alphabet%20Soup",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5231",\
        "y": "2015",\
        "z": "12",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "310,0"],\
                ["NUM#", "height", "310,0"],\
                ["NUM#", "round", "200,0"]\
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
        "x": "3162",\
        "y": "1621",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "x", "275,0"],\
                ["NUM#", "y", "275,0"]\
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
        "x": "2177",\
        "y": "1317",\
        "z": "14",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["TEXT#", "value", "I", "center"]\
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
        "x": "2945",\
        "y": "1313",\
        "z": "15",\
        "params":\
        [\
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
        "x": "3463.64",\
        "y": "1573",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "length", "191.44189719076647,-2"],\
                ["NUM#", "angle", "40.763605200941164,-2"]\
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
        "x": "3018",\
        "y": "1952",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "add", "25,0"],\
                ["NUM#", "end", "?,?"]\
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
        "x": "2199",\
        "y": "1555",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "seed", "6838,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "9,0"],\
                ["NUM#", "max", "17,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1711971418562",\
        "updated": "1711971423745",\
        "id": "random8",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2380",\
        "y": "1591",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "seed", "9466,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "1525,0"]\
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
        "x": "1602",\
        "y": "2473",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "seed", "5244,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "70,0"]\
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
        "x": "1604",\
        "y": "2269",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "seed", "3800,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "50,0"]\
        ]\
        },\
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
        "x": "4648",\
        "y": "2211",\
        "z": "22",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "241,0"],\
                ["NUM#", "c2", "124,0"],\
                ["NUM#", "c3", "135,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1711970644906",\
        "updated": "1711970687196",\
        "id": "cache2",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1356",\
        "y": "1989",\
        "z": "23"\
        },\
        {\
        "type": "COL",\
        "created": "1709379187980",\
        "updated": "1711970687196",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1826",\
        "y": "2314",\
        "z": "24",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "47,0"],\
                ["NUM#", "c2", "73,0"],\
                ["NUM#", "c3", "19,0"]\
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
        "x": "1975",\
        "y": "1975",\
        "z": "25",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "8,0"],\
                ["NUM#", "c2", "66,0"],\
                ["NUM#", "c3", "64,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1711972389397",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4818",\
        "y": "2524",\
        "z": "26",\
        "params":\
        [\
                ["ITEMS#", "fills", "1 FILL# 217,0 217,0 217,0 100,0 0,0"],\
                ["NUM#", "weight", "6,0"],\
                ["NUM#", "fit", "2,0"],\
                ["TEXT#", "dashes", "", "center"]\
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
        "x": "1980",\
        "y": "1834",\
        "z": "27",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "54,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "49,0"]\
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
        "x": "2182",\
        "y": "1406",\
        "z": "28",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "40,0"]\
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
        "x": "4096",\
        "y": "1318",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "scaleX", "32.56743084277006,10"],\
                ["NUM#", "scaleY", "32.56743084277006,10"],\
                ["NUM#", "affectStyle", "0,0"],\
                ["NUM#", "affectSpace", "0,0"]\
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
        "x": "2003",\
        "y": "2515",\
        "z": "30",\
        "params":\
        [\
                ["COL#", "color", "1,0 48,0 41,0 13,0"],\
                ["NUM#", "opacity", "50,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709379187963",\
        "updated": "1711973453515",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4320",\
        "y": "1871",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "count", "12,0"],\
                ["NUM#", "iteration", "?,0"]\
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
        "x": "2783",\
        "y": "1562",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "seed", "6920,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "chance", "75,0"]\
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
        "x": "3016",\
        "y": "1786",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "add", "25,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1711971184569",\
        "updated": "1711971191218",\
        "id": "grad2",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4808",\
        "y": "2211",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "angle", "90,0"]\
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
        "x": "1837",\
        "y": "1318",\
        "z": "35",\
        "params":\
        [\
                ["NUM#", "seed", "9021,0"],\
                ["NUM#", "iteration", "?,?"],\
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
        "x": "3927",\
        "y": "1517",\
        "z": "36",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "0.3,1"]\
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
        "x": "3161",\
        "y": "1316",\
        "z": "37",\
        "params":\
        [\
                ["NUM#", "x", "275,0"],\
                ["NUM#", "y", "275,0"]\
        ]\
        },\
        {\
        "type": "INSH",\
        "created": "1711972424625",\
        "updated": "1711972427686",\
        "id": "innerShadow",\
        "name": "inner%20shadow",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4984",\
        "y": "2505",\
        "z": "38",\
        "params":\
        [\
                ["NUM#", "blur", "15,0"],\
                ["NUM#", "spread", "9,0"],\
                ["FILL#", "fill", "136,0 0,0 0,0 100,0 0,0"]\
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
        "x": "3317",\
        "y": "1570",\
        "z": "39"\
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
        "x": "1661",\
        "y": "1778",\
        "z": "40",\
        "params":\
        [\
                ["NUM#", "seed", "9988,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"]\
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
        "x": "1740",\
        "y": "1988",\
        "z": "41",\
        "params":\
        [\
                ["NUM#", "seed", "6259,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "20,0"]\
        ]\
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
        "x": "2168",\
        "y": "1898",\
        "z": "42",\
        "params":\
        [\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "85,0"],\
                ["NUM#", "gradType", "1,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1705642638300",\
        "id": "color6",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4656",\
        "y": "2526",\
        "z": "43",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "217,0"],\
                ["NUM#", "c2", "217,0"],\
                ["NUM#", "c3", "217,0"]\
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
        "x": "2428",\
        "y": "2051",\
        "z": "44",\
        "width": "60",\
        "height": "64"\
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
        "x": "2778",\
        "y": "1413",\
        "z": "45",\
        "params":\
        [\
                ["NUM#", "angle", "90,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "TXTS",\
        "created": "1709379188011",\
        "updated": "1711971423745",\
        "id": "text2",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2567",\
        "y": "1309",\
        "z": "46",\
        "params":\
        [\
                ["TEXT#", "text", "I", "center"],\
                ["NUM#", "width", "40,0"],\
                ["NUM#", "height", "45,0"],\
                ["TEXT#", "font", "Mukta%20Vaani"],\
                ["NUM#", "size", "45,0"],\
                ["TEXT#", "style", ""],\
                ["NUM#", "alignX", "1,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1711973332111",\
        "updated": "1711973700766",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3416",\
        "y": "2267",\
        "z": "47",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "width", "1,0"],\
                ["NUM#", "height", "1,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1706765948606",\
        "updated": "1706765999076",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4079",\
        "y": "2488",\
        "z": "48",\
        "params":\
        [\
                ["NUM#", "count", "100,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1706765959622",\
        "updated": "1711973378848",\
        "id": "move5",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3872",\
        "y": "2263.99",\
        "z": "49",\
        "params":\
        [\
                ["NUM#", "x", "212,0"],\
                ["NUM#", "y", "116,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1711973351395",\
        "updated": "1711973365223",\
        "id": "random9",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3637",\
        "y": "2500",\
        "z": "50",\
        "params":\
        [\
                ["NUM#", "seed", "5350,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "310,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1711973351395",\
        "updated": "1711973368733",\
        "id": "random10",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3637",\
        "y": "2715",\
        "z": "51",\
        "params":\
        [\
                ["NUM#", "seed", "3562,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "310,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1711973351395",\
        "updated": "1711973403811",\
        "id": "random11",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3121",\
        "y": "2352",\
        "z": "52",\
        "params":\
        [\
                ["NUM#", "seed", "4739,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "4,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1711973433415",\
        "updated": "1711973453515",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4600.37",\
        "y": "2045.63",\
        "z": "53",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "GRAD",\
        "created": "1711973483126",\
        "updated": "1711973700766",\
        "id": "grad3",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2973",\
        "y": "2707",\
        "z": "54",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "50,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1711973488530",\
        "updated": "1711974129154",\
        "id": "color7",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2448",\
        "y": "2973",\
        "z": "55",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "255,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1711973495857",\
        "updated": "1711974129154",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2618",\
        "y": "2660",\
        "z": "56",\
        "params":\
        [\
                ["COL#", "color", "1,0 153,0 134,0 77,0"],\
                ["NUM#", "opacity", "41,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1711973497898",\
        "updated": "1711973511166",\
        "id": "colorStop",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2768",\
        "y": "2663",\
        "z": "57",\
        "params":\
        [\
                ["FILL#", "fill", "153,0 134,0 77,0 41,0 0,0"],\
                ["NUM#", "position", "50,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1711973495857",\
        "updated": "1711973606375",\
        "id": "fill3",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2616",\
        "y": "2820",\
        "z": "58",\
        "params":\
        [\
                ["COL#", "color", "1,0 68,0 0,0 0,0"],\
                ["NUM#", "opacity", "50,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1711973497898",\
        "updated": "1711973512754",\
        "id": "colorStop2",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2765",\
        "y": "2813",\
        "z": "59",\
        "params":\
        [\
                ["FILL#", "fill", "68,0 0,0 0,0 50,0 0,0"],\
                ["NUM#", "position", "90,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1711973495857",\
        "updated": "1711973609720",\
        "id": "fill4",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2613",\
        "y": "2935",\
        "z": "60",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "57,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1711973497898",\
        "updated": "1711973612323",\
        "id": "colorStop3",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2762",\
        "y": "2928",\
        "z": "61",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 57,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1711973488530",\
        "updated": "1711973606375",\
        "id": "color8",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2446",\
        "y": "2865",\
        "z": "62",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "68,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1711973483126",\
        "updated": "1711973688447",\
        "id": "grad4",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2960",\
        "y": "3119",\
        "z": "63",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "x", "72,0"],\
                ["NUM#", "y", "31,0"],\
                ["NUM#", "size", "50,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1711973488530",\
        "updated": "1711973609720",\
        "id": "color9",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2420",\
        "y": "3167",\
        "z": "64",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "255,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1711973495857",\
        "updated": "1711973506388",\
        "id": "fill5",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2605",\
        "y": "3072",\
        "z": "65",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1711973497898",\
        "updated": "1711973511166",\
        "id": "colorStop4",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2755",\
        "y": "3075",\
        "z": "66",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 100,0 0,0"],\
                ["NUM#", "position", "10,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1711973495857",\
        "updated": "1711973609720",\
        "id": "fill7",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2598",\
        "y": "3225",\
        "z": "67",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1711973497898",\
        "updated": "1711973612323",\
        "id": "colorStop6",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2747",\
        "y": "3218",\
        "z": "68",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 0,0 0,0"],\
                ["NUM#", "position", "30,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1711973694375",\
        "updated": "1711973812898",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3133",\
        "y": "2913",\
        "z": "69",\
        "width": "114.45940385149473",\
        "height": "64"\
        },\
        {\
        "type": "BLEND",\
        "created": "1711973810374",\
        "updated": "1711973971390",\
        "id": "blend",\
        "name": "blend",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3115",\
        "y": "3193",\
        "z": "70",\
        "params":\
        [\
                ["NUM#", "blend", "11,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1711973929930",\
        "updated": "1711973971390",\
        "id": "random12",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2980",\
        "y": "3457",\
        "z": "71",\
        "params":\
        [\
                ["NUM#", "seed", "1820,0"],\
                ["NUM#", "iteration", "?,?"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1711973488530",\
        "updated": "1711974129154",\
        "id": "color10",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2443",\
        "y": "2648",\
        "z": "72",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "45,0"],\
                ["NUM#", "c2", "50,0"],\
                ["NUM#", "c3", "60,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1711970521232",\
        "outputNodeId": "measure",\
        "outputId": "length",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "minmax2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "codeToChar",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "dropShadow2",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "dropShadow",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1711970644907",\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "scale",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1711972373447",\
        "outputNodeId": "grad2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1711972389395",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711972427686",\
        "outputNodeId": "innerShadow",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1711973453515",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1711972373449",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "move",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "move",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "codeToChar",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "text2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ifElse",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "prob",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "condition",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "vector",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "measure",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970683865",\
        "outputNodeId": "random7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970687195",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1711972383382",\
        "outputNodeId": "color6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1711970644908",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "random5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "scaleX",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "scale",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1711971184581",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711971191218",\
        "outputNodeId": "color5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "minmax2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "vector",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "point2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "vector",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "dropShadow",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "dropShadow2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "text2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "text",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1711971423744",\
        "outputNodeId": "random8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "font",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "text2",\
        "inputId": "size",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "style",\
        "list": "false"\
        },\
        {\
        "created": "1711970521232",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1711973401357",\
        "outputNodeId": "random11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1711973403811",\
        "outputNodeId": "random11",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1711973700765",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1706765966311",\
        "outputNodeId": "move5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711973378848",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711973365223",\
        "outputNodeId": "random9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move5",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1711973368733",\
        "outputNodeId": "random10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move5",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1711973433418",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1711973433419",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1711973511165",\
        "outputNodeId": "colorStop",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711973512753",\
        "outputNodeId": "colorStop2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711973612322",\
        "outputNodeId": "colorStop3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad3",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1711974129153",\
        "outputNodeId": "color10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1711973501557",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1711973606374",\
        "outputNodeId": "color8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill3",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1711973501557",\
        "outputNodeId": "fill3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop2",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1711973609719",\
        "outputNodeId": "color7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill4",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1711973501557",\
        "outputNodeId": "fill4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1711973511165",\
        "outputNodeId": "colorStop4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711973612322",\
        "outputNodeId": "colorStop6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711973506387",\
        "outputNodeId": "color9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill5",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1711973501557",\
        "outputNodeId": "fill5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop4",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1711973609719",\
        "outputNodeId": "color9",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill7",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1711973501557",\
        "outputNodeId": "fill7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop6",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1711973694380",\
        "outputNodeId": "grad3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1711973694381",\
        "outputNodeId": "grad4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1711973812896",\
        "outputNodeId": "blend",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h2",\
        "list": "false"\
        }\
    ]\
}';