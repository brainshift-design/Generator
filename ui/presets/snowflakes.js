const presetSnowflakes = '\
    {\
    "nodes":\
    [\
        {\
        "type": "RAND",\
        "created": "1702902613733",\
        "updated": "1702969672949",\
        "id": "random5",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "39183.5",\
        "y": "8745",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "seed", "6,0"],\
                ["NUM#", "min", "2,0"],\
                ["NUM#", "max", "40,0"],\
                ["NUM#", "bias", "-200,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1702902157544",\
        "updated": "1702908575294",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "37336",\
        "y": "8665",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "start", "-22,0"],\
                ["NUM#", "add", "54,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1702902116783",\
        "updated": "1702905496921",\
        "id": "neg",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "37147",\
        "y": "8504",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "operation", "0,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1702901982804",\
        "updated": "1702902123982",\
        "id": "rotate2",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "37146",\
        "y": "8587",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "angle", "-60,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "SCALE",\
        "created": "1702902034592",\
        "updated": "1702962078906",\
        "id": "scale",\
        "name": "scale",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36783",\
        "y": "8462",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "scaleY", "57.6,1"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1702901971255",\
        "updated": "1702902070973",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36943",\
        "y": "8462",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "y", "54,0"]\
        ]\
        },\
        {\
        "type": "RECT",\
        "created": "1702901935313",\
        "updated": "1702962102202",\
        "id": "rect",\
        "name": "stem",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36119",\
        "y": "8258",\
        "z": "6",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "SCALE",\
        "created": "1702902375796",\
        "updated": "1702964321863",\
        "id": "scale2",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36431",\
        "y": "8258",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "scaleX", "10,0"],\
                ["NUM#", "scaleY", "200,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1702902234330",\
        "updated": "1702909291133",\
        "id": "rotate3",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "38801",\
        "y": "8276",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "angle", "300,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1702902589774",\
        "updated": "1702918016648",\
        "id": "move3",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "40044",\
        "y": "8458",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "x", "298,0"],\
                ["NUM#", "y", "819,0"]\
        ]\
        },\
        {\
        "type": "SCALE",\
        "created": "1702907151306",\
        "updated": "1702907171865",\
        "id": "scale3",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "40531",\
        "y": "8459",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "scaleX", "23,0"],\
                ["NUM#", "scaleY", "23,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1702902597538",\
        "updated": "1702969747608",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "40942",\
        "y": "9120",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "count", "30,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1702902141688",\
        "updated": "1702964325684",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "37764",\
        "y": "8804",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "count", "3,0"]\
        ]\
        },\
        {\
        "type": "SGRP",\
        "created": "1702908169586",\
        "updated": "1702964589519",\
        "id": "group2",\
        "name": "branch",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "38022",\
        "y": "8268",\
        "z": "13"\
        },\
        {\
        "type": "RSTX",\
        "created": "1702903212002",\
        "updated": "1702969029593",\
        "id": "reset",\
        "name": "reset%20space",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "39725",\
        "y": "8456",\
        "z": "14"\
        },\
        {\
        "type": "MOVE",\
        "created": "1702902151052",\
        "updated": "1702907000618",\
        "id": "move2",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "37502",\
        "y": "8464",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "y", "86,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1702901982804",\
        "updated": "1702905496921",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "37145",\
        "y": "8387",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "angle", "60,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1702902265740",\
        "updated": "1702903882620",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "38595",\
        "y": "8528",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
        ]\
        },\
        {\
        "type": "LBLR",\
        "created": "1702902548943",\
        "updated": "1702919377293",\
        "id": "layerBlur",\
        "name": "layer%20blur",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "39328.5",\
        "y": "8649",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "radius", "27,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1702902634782",\
        "updated": "1702969689441",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "39856",\
        "y": "8601",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "seed", "127,0"],\
                ["NUM#", "max", "1000,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1702902613733",\
        "updated": "1702969702137",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "40105",\
        "y": "8733",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "seed", "51,0"],\
                ["NUM#", "max", "360,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1702908572236",\
        "updated": "1702910693136",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "37554",\
        "y": "8881",\
        "z": "21",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "ONAME",\
        "created": "1702962058362",\
        "updated": "1702965180973",\
        "id": "objectName",\
        "name": "object%20name",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36620",\
        "y": "8463",\
        "z": "22",\
        "params":\
        [\
                ["TEXT#", "name", "leaf", "center"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1702902505975",\
        "updated": "1702969412088",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36429",\
        "y": "8926",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "seed", "8587,0"],\
                ["NUM#", "min", "0.2,1"],\
                ["NUM#", "max", "0.8,1"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1702902137273",\
        "updated": "1702904055410",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "37330",\
        "y": "8455",\
        "z": "24",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "COL",\
        "created": "1702902317124",\
        "updated": "1702962102202",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "35944",\
        "y": "8395",\
        "z": "25",\
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
        "type": "RAND",\
        "created": "1702969398625",\
        "updated": "1702969661900",\
        "id": "random7",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36224",\
        "y": "9190",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "seed", "34,0"],\
                ["NUM#", "max", "10000,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1702910663756",\
        "updated": "1702910673792",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36532",\
        "y": "8690",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1702910538273",\
        "updated": "1702910669305",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36232",\
        "y": "8887",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "start", "15,0"],\
                ["NUM#", "multiply", "2,0"],\
                ["NUM#", "add", "6,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1702902592041",\
        "updated": "1702918010855",\
        "id": "rotate4",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "40282",\
        "y": "8457",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "angle", "87,0"]\
        ]\
        },\
        {\
        "type": "CENTR",\
        "created": "1702902230758",\
        "updated": "1702920546232",\
        "id": "center2",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "38604",\
        "y": "8276",\
        "z": "30",\
        "params":\
        [\
                ["NUM#", "centerY", "0,0"],\
                ["NUM#", "showCenter", "1,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1702902236000",\
        "updated": "1702964610634",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "39006",\
        "y": "8454",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "count", "6,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1702902634782",\
        "updated": "1702969694461",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "39859",\
        "y": "8807",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "seed", "92,0"],\
                ["NUM#", "max", "1000,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1702902613733",\
        "updated": "1702969707625",\
        "id": "random6",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "40341",\
        "y": "8731",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "seed", "159,0"],\
                ["NUM#", "min", "20,0"],\
                ["NUM#", "max", "50,0"]\
        ]\
        },\
        {\
        "type": "CENTR",\
        "created": "1702902050743",\
        "updated": "1702962102202",\
        "id": "center",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "36277",\
        "y": "8258",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "centerY", "0,0"]\
        ]\
        },\
        {\
        "type": "APPLY",\
        "created": "1702902542959",\
        "updated": "1702969557858",\
        "id": "apply",\
        "name": "apply",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "39486.5",\
        "y": "8456",\
        "z": "35",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1702969579822",\
        "updated": "1702969579827",\
        "id": "random8",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "35477",\
        "y": "9469",\
        "z": "36",\
        "params":\
        [\
                ["NUM#", "seed", "7318,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1702969581812",\
        "updated": "1702969581821",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "35478",\
        "y": "9648",\
        "z": "37",\
        "params":\
        [\
                ["NUM#", "count", "6,0"]\
        ]\
        },\
        {\
        "type": "ITEMS",\
        "created": "1702969585897",\
        "updated": "1702969707625",\
        "id": "list",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "35625",\
        "y": "9469",\
        "z": "38",\
        "width": "120",\
        "height": "164",\
        "params":\
        [\
                ["NUM#", "0", "34,0"],\
                ["NUM#", "1", "6,0"],\
                ["NUM#", "2", "127,0"],\
                ["NUM#", "3", "92,0"],\
                ["NUM#", "4", "51,0"],\
                ["NUM#", "5", "159,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1702969742956",\
        "updated": "1702970018937",\
        "id": "frame",\
        "name": "snowflakes",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "41445",\
        "y": "8980",\
        "z": "39",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "1000,0"],\
                ["NUM#", "height", "1000,0"],\
                ["NUM#", "round", "20,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1702969770032",\
        "updated": "1702969776284",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "41017",\
        "y": "9273",\
        "z": "40",\
        "active": "true",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "203,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1702969770032",\
        "updated": "1702969777927",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "41015",\
        "y": "9429",\
        "z": "41",\
        "active": "true",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "218.99999999999997,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1702969773428",\
        "updated": "1702969797716",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "41181",\
        "y": "9347",\
        "z": "42",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "y", "100,0"],\
                ["NUM#", "angle", "-90,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1702969993011",\
        "updated": "1702969993013",\
        "id": "panel",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "1",\
        "x": "35449",\
        "y": "9434",\
        "z": "43",\
        "active": "true",\
        "width": "319.3631788944897",\
        "height": "344.4967335247786",\
        "params":\
        [\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1702969672949",\
        "outputNodeId": "list",\
        "outputId": "1",\
        "outputOrder": "0",\
        "inputNodeId": "random5",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "rotate",\
        "outputId": "angle",\
        "outputOrder": "0",\
        "inputNodeId": "neg",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "rotate2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate2",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1702962078905",\
        "outputNodeId": "objectName",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "scale",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702962102203",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1702962102204",\
        "outputNodeId": "center",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "center2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate3",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "reset",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "move3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move3",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "rotate4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale3",\
        "inputId": "scaleX",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "scale3",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "scale3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1702969426645",\
        "outputNodeId": "random7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "move2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1702962102202",\
        "outputNodeId": "scale2",\
        "outputId": "h0",\
        "outputOrder": "5",\
        "inputNodeId": "group2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702962119970",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "group2",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "apply",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "reset",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "random5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "layerBlur",\
        "inputId": "radius",\
        "list": "false"\
        },\
        {\
        "created": "1702969689440",\
        "outputNodeId": "list",\
        "outputId": "2",\
        "outputOrder": "0",\
        "inputNodeId": "random3",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1702969702137",\
        "outputNodeId": "list",\
        "outputId": "4",\
        "outputOrder": "0",\
        "inputNodeId": "random2",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1702962102204",\
        "outputNodeId": "scale2",\
        "outputId": "h0",\
        "outputOrder": "6",\
        "inputNodeId": "objectName",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702969412088",\
        "outputNodeId": "random7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "random",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "rotate2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1702969661899",\
        "outputNodeId": "list",\
        "outputId": "0",\
        "outputOrder": "0",\
        "inputNodeId": "random7",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "move3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate4",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "group2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "center2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "rotate3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1702969694460",\
        "outputNodeId": "list",\
        "outputId": "3",\
        "outputOrder": "0",\
        "inputNodeId": "random4",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1702969707624",\
        "outputNodeId": "list",\
        "outputId": "5",\
        "outputOrder": "0",\
        "inputNodeId": "random6",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1702962102202",\
        "outputNodeId": "rect",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "center",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "apply",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1702960670002",\
        "outputNodeId": "layerBlur",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "apply",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1702969581815",\
        "outputNodeId": "random8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702969585899",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "list",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1702969747607",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1702969797715",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1702969776275",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1702969777917",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
    }';