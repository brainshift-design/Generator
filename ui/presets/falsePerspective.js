const presetFalsePerspective = '\
{\
    "generatorVersion": "373",\
    "nodes":\
    [\
        {\
        "type": "PTLERP",\
        "created": "1709378687613",\
        "updated": "1709378687613",\
        "id": "interpolate2",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1444",\
        "y": "2160",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "amount", "100,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1709378687614",\
        "updated": "1709378813732",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "1047",\
        "y": "2477",\
        "z": "1"\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709378687616",\
        "updated": "1709378687616",\
        "id": "select4",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1255",\
        "y": "1885",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709378687618",\
        "updated": "1709378793319",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "302",\
        "y": "654",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "2.45,2"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1709378687621",\
        "updated": "1709378687621",\
        "id": "move2",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "514",\
        "y": "809",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "x", "980.0000000000001,2"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709378687622",\
        "updated": "1709378687622",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "742",\
        "y": "811",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "count", "15,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1709378687624",\
        "updated": "1709378687624",\
        "id": "num",\
        "name": "COUNT",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "487",\
        "y": "1142",\
        "z": "6",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "15,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709378687625",\
        "updated": "1709378687625",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "740",\
        "y": "385",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "count", "15,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709378687626",\
        "updated": "1709378687626",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1642",\
        "y": "587",\
        "z": "8",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "FILL",\
        "created": "1709378687628",\
        "updated": "1709378687628",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1532",\
        "y": "1432",\
        "z": "9",\
        "params":\
        [\
                ["COL#", "color", "1,0 0,0 0,0 0,0"]\
        ]\
        },\
        {\
        "type": "VPATH",\
        "created": "1709378687631",\
        "updated": "1709378687631",\
        "id": "path",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2038",\
        "y": "568",\
        "z": "10",\
        "params":\
        [\
                ["ITEMS#", "points", "2 PT# 0,0 0,0 PT# -284,0 100,0"],\
                ["NUM#", "degree", "0,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709378687632",\
        "updated": "1709378687632",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "2270",\
        "y": "1115",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "count", "15,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1709378687635",\
        "updated": "1709378687635",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2010",\
        "y": "-362",\
        "z": "12",\
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
        "type": "PTLERP",\
        "created": "1709378687637",\
        "updated": "1709378687637",\
        "id": "interpolate",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1444",\
        "y": "1859",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "amount", "100,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1709378687637",\
        "updated": "1709378687706",\
        "id": "panel2",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-161",\
        "y": "286",\
        "z": "14",\
        "width": "2635",\
        "height": "1016.9245370561073",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709378687638",\
        "updated": "1709378687638",\
        "id": "select5",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1258",\
        "y": "2114",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "index", "-1,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1709378687639",\
        "updated": "1709378687639",\
        "id": "point2",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-53",\
        "y": "811",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "x", "-284,0"],\
                ["NUM#", "y", "100,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1709378687644",\
        "updated": "1709378687644",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1696",\
        "y": "1430",\
        "z": "17",\
        "params":\
        [\
                ["ITEMS#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1709378687647",\
        "updated": "1709378687647",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1363",\
        "y": "1459",\
        "z": "18",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "30,0"],\
                ["NUM#", "c2", "80,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1709378687649",\
        "updated": "1709378687649",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2010",\
        "y": "-253",\
        "z": "19",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "204,0"],\
                ["NUM#", "c2", "204,0"],\
                ["NUM#", "c3", "204,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1709378687651",\
        "updated": "1709378687651",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-52",\
        "y": "389",\
        "z": "20"\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709378687652",\
        "updated": "1709378687652",\
        "id": "select",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "4",\
        "notCondition": "false",\
        "x": "1401",\
        "y": "384",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "index", "14,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709378687654",\
        "updated": "1709378687654",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1162",\
        "y": "572",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1709378687654",\
        "updated": "1709378687706",\
        "id": "panel",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "946",\
        "y": "1742",\
        "z": "23",\
        "width": "1583",\
        "height": "944.9359744379389",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709378687655",\
        "updated": "1709378687655",\
        "id": "select6",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1258",\
        "y": "2214",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "index", "-1,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709378687657",\
        "updated": "1709378813732",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "2291",\
        "y": "2407",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "count", "15,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1709378687662",\
        "updated": "1709378687662",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2357",\
        "y": "-423",\
        "z": "26",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "x", "-344,0"],\
                ["NUM#", "y", "-209,0"],\
                ["NUM#", "width", "1100,0"],\
                ["NUM#", "height", "550,0"]\
        ]\
        },\
        {\
        "type": "VPATH",\
        "created": "1709378687665",\
        "updated": "1709378687665",\
        "id": "path2",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1920",\
        "y": "2026",\
        "z": "27",\
        "params":\
        [\
                ["ITEMS#", "points", "2 PT# -284,0 100,0 PT# 696.0000000000001,0 100,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1709378687667",\
        "updated": "1709378687667",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "145",\
        "y": "568",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "end", "400,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709378687667",\
        "updated": "1709378687667",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1626",\
        "y": "2046",\
        "z": "29",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "MOVE",\
        "created": "1709378687670",\
        "updated": "1709378687670",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "517",\
        "y": "387",\
        "z": "30",\
        "params":\
        [\
                ["NUM#", "x", "400,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709378687671",\
        "updated": "1709378687671",\
        "id": "select3",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1257",\
        "y": "1804",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709378687672",\
        "updated": "1709378844927",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2879",\
        "y": "1772",\
        "z": "32",\
        "active": "true",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709378687672",\
        "updated": "1709378687672",\
        "id": "select2",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "4",\
        "notCondition": "false",\
        "x": "1401",\
        "y": "811",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "index", "14,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1709378687677",\
        "updated": "1709378687677",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2179",\
        "y": "-311",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "75,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1709378804698",\
        "updated": "1709378813732",\
        "id": "bias",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1257",\
        "y": "2341",\
        "z": "35",\
        "params":\
        [\
                ["NUM#", "bias", "-66,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1709378687688",\
        "outputNodeId": "select5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "interpolate2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "select6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "interpolate2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709378804703",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "interpolate2",\
        "inputId": "amount",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "select4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "point2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378793319",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "move2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "select2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "repeat3",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "select3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "interpolate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "select4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "interpolate",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709378804702",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "interpolate",\
        "inputId": "amount",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "select5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select6",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "path2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378813731",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat4",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path2",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "path2",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "interpolate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "interpolate2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h2",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select2",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709378687688",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709378804701",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "h0",\
        "list": "false"\
        }\
    ]\
}';