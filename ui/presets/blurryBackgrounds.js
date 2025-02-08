const presetBlurryBackgrounds = '\
{\
    "generatorVersion": "447",\
        "nodes":\
    [\
        {\
            "type": "RSTX",\
            "created": "1738990385529",\
            "updated": "1738990385529",\
            "id": "reset",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6411",\
            "y": "989",\
            "z": "0"\
        },\
        {\
            "type": "FRM",\
            "created": "1738990385532",\
            "updated": "1738990385589",\
            "id": "frame2",\
            "name": "alt_background",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7225",\
            "y": "1069",\
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
            "created": "1738990385533",\
            "updated": "1738990385533",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5612",\
            "y": "1558.84",\
            "z": "2",\
            "params":\
                [\
                    ["NUM#", "seed", "7597,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "min", "50,0"],\
                    ["NUM#", "max", "200,0"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385535",\
            "updated": "1738990385535",\
            "id": "random8",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5613",\
            "y": "1350.84",\
            "z": "3",\
            "params":\
                [\
                    ["NUM#", "seed", "3751,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "min", "30,0"],\
                    ["NUM#", "max", "120,0"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385536",\
            "updated": "1738990385536",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5349",\
            "y": "1027",\
            "z": "4",\
            "params":\
                [\
                    ["NUM#", "seed", "9581,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "min", "-20,0"],\
                    ["NUM#", "max", "20,0"]\
                ]\
        },\
        {\
            "type": "ROT",\
            "created": "1738990385537",\
            "updated": "1738990385537",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5510",\
            "y": "949",\
            "z": "5",\
            "params":\
                [\
                    ["NUM#", "angle", "-7.85258475125422,0"],\
                    ["NUM#", "affectSpace", "2,0"]\
                ]\
        },\
        {\
            "type": "LIST",\
            "created": "1738990385537",\
            "updated": "1738990385537",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4753",\
            "y": "940",\
            "z": "6",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "SMATH",\
            "created": "1738990385538",\
            "updated": "1738990385538",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4909",\
            "y": "1185",\
            "z": "7",\
            "params":\
                [\
                    ["NUM#", "operand", "1440,0"]\
                ]\
        },\
        {\
            "type": "RECT",\
            "created": "1738990385540",\
            "updated": "1738990405006",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5124",\
            "y": "805",\
            "z": "8",\
            "params":\
                [\
                    ["NUM#", "x", "-500,0"],\
                    ["NUM#", "y", "-200,0"],\
                    ["NUM#", "width", "2440,0"],\
                    ["NUM#", "height", "305,0"]\
                ]\
        },\
        {\
            "type": "MOVE",\
            "created": "1738990385541",\
            "updated": "1738990385541",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5274",\
            "y": "805",\
            "z": "9",\
            "params":\
                [\
                    ["NUM#", "y", "481.68066054660864,0"],\
                    ["NUM#", "affectSpace", "2,0"]\
                ]\
        },\
        {\
            "type": "SCENTR",\
            "created": "1738990385542",\
            "updated": "1738990385542",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5874",\
            "y": "809",\
            "z": "10",\
            "params":\
                [\
                    ["NUM#", "centerX", "17.92867314905332,0"]\
                ]\
        },\
        {\
            "type": "SCALE",\
            "created": "1738990385543",\
            "updated": "1738990385543",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6034",\
            "y": "805",\
            "z": "11",\
            "params":\
                [\
                    ["NUM#", "scaleX", "45.405785695372984,0"],\
                    ["NUM#", "scaleY", "105.53128451832166,0"],\
                    ["NUM#", "affectSpace", "2,0"]\
                ]\
        },\
        {\
            "type": "ITEMS",\
            "created": "1738990385543",\
            "updated": "1738990385543",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "3944",\
            "y": "931",\
            "z": "12",\
            "width": "127.93624156812596",\
            "height": "142",\
            "divider": "0.5",\
            "scroll": "0",\
            "showValueNames": "false",\
            "params":\
                [\
                    ["NUM#", "0", "6562.34264117961,0"],\
                    ["NUM#", "1", "9814.898602740326,0"],\
                    ["NUM#", "2", "3605.5981822580093,0"],\
                    ["NUM#", "3", "5085.703056198407,0"],\
                    ["NUM#", "4", "6346.394080689361,0"]\
                ]\
        },\
        {\
            "type": "COL",\
            "created": "1738990385546",\
            "updated": "1738990385546",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6172",\
            "y": "1192",\
            "z": "13",\
            "prevSpace": "hsv",\
            "params":\
                [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "142.1638094141392,0"],\
                    ["NUM#", "c2", "77.6636227861343,0"],\
                    ["NUM#", "c3", "63.593196614455984,0"]\
                ]\
        },\
        {\
            "type": "PANEL",\
            "created": "1738990385546",\
            "updated": "1738990385589",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "notCondition": "false",\
            "x": "3729",\
            "y": "877",\
            "z": "14",\
            "width": "392",\
            "height": "410.27661420278594",\
            "params":\
                [\
                ]\
        },\
        {\
            "type": "SCALE",\
            "created": "1738990385547",\
            "updated": "1738990385547",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6705",\
            "y": "1101",\
            "z": "15",\
            "params":\
                [\
                    ["NUM#", "scaleX", "51,0"],\
                    ["NUM#", "affectSpace", "2,0"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385548",\
            "updated": "1738990385548",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4308",\
            "y": "982",\
            "z": "16",\
            "params":\
                [\
                    ["NUM#", "seed", "9814.898602740326,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "min", "15,0"]\
                ]\
        },\
        {\
            "type": "FRM",\
            "created": "1738990385550",\
            "updated": "1738990385589",\
            "id": "frame",\
            "name": "background",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7225",\
            "y": "785",\
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
            "created": "1738990385551",\
            "updated": "1738990385551",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4478",\
            "y": "934",\
            "z": "18",\
            "prevSpace": "hsv",\
            "params":\
                [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "142.1638094141392,0"],\
                    ["NUM#", "c2", "94.81688190708722,0"],\
                    ["NUM#", "c3", "40.55816001284782,0"]\
                ]\
        },\
        {\
            "type": "PROB",\
            "created": "1738990385552",\
            "updated": "1738990385552",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5556",\
            "y": "1205",\
            "z": "19",\
            "params":\
                [\
                    ["NUM#", "seed", "7320,0"],\
                    ["NUM#", "iteration", "?,?"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385554",\
            "updated": "1738990385554",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5932",\
            "y": "1489.84",\
            "z": "20",\
            "params":\
                [\
                    ["NUM#", "seed", "189,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "min", "20,0"],\
                    ["NUM#", "max", "70,0"]\
                ]\
        },\
        {\
            "type": "IF",\
            "created": "1738990385554",\
            "updated": "1738990385554",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5708",\
            "y": "806",\
            "z": "21",\
            "params":\
                [\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385555",\
            "updated": "1738990385555",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "notCondition": "false",\
            "x": "3781",\
            "y": "916",\
            "z": "22",\
            "params":\
                [\
                    ["NUM#", "seed", "2112,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "min", "2,0"],\
                    ["NUM#", "max", "10000,0"]\
                ]\
        },\
        {\
            "type": "REPT",\
            "created": "1738990385556",\
            "updated": "1738990385556",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6197",\
            "y": "805",\
            "z": "23",\
            "params":\
                [\
                    ["NUM#", "count", "40,0"],\
                    ["NUM#", "iteration", "?,0"]\
                ]\
        },\
        {\
            "type": "MOVE",\
            "created": "1738990385557",\
            "updated": "1738990385557",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6855",\
            "y": "1101",\
            "z": "24",\
            "params":\
                [\
                    ["NUM#", "y", "-166,0"],\
                    ["NUM#", "affectSpace", "2,0"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385559",\
            "updated": "1738990385559",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5933",\
            "y": "1282",\
            "z": "25",\
            "params":\
                [\
                    ["NUM#", "seed", "6346.394080689361,0"],\
                    ["NUM#", "iteration", "?,?"]\
                ]\
        },\
        {\
            "type": "SCENTR",\
            "created": "1738990385560",\
            "updated": "1738990385560",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6555",\
            "y": "1101",\
            "z": "26",\
            "params":\
                [\
                    ["NUM#", "centerX", "12,0"],\
                    ["NUM#", "centerY", "22,0"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385561",\
            "updated": "1738990385561",\
            "id": "random9",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5716",\
            "y": "1028",\
            "z": "27",\
            "params":\
                [\
                    ["NUM#", "seed", "5085.703056198407,0"],\
                    ["NUM#", "iteration", "?,?"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385562",\
            "updated": "1738990385562",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4308",\
            "y": "1193.84",\
            "z": "28",\
            "params":\
                [\
                    ["NUM#", "seed", "3605.5981822580093,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "min", "10,0"]\
                ]\
        },\
        {\
            "type": "SMATH",\
            "created": "1738990385563",\
            "updated": "1738990385563",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4763",\
            "y": "1185",\
            "z": "29",\
            "params":\
                [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2,0"]\
                ]\
        },\
        {\
            "type": "PANEL",\
            "created": "1738990385563",\
            "updated": "1738990385589",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "notCondition": "false",\
            "x": "7160",\
            "y": "738",\
            "z": "30",\
            "width": "246",\
            "height": "602.5939691444601",\
            "params":\
                [\
                ]\
        },\
        {\
            "type": "NOISE",\
            "created": "1738990385565",\
            "updated": "1738990385565",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4309",\
            "y": "724.158",\
            "z": "31",\
            "params":\
                [\
                    ["NUM#", "seed", "6562.34264117961,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "5,0"],\
                    ["NUM#", "offset", "0,1"],\
                    ["NUM#", "evolve", "0,1"]\
                ]\
        },\
        {\
            "type": "LBLR",\
            "created": "1738990385566",\
            "updated": "1738990401550",\
            "id": "layerBlur",\
            "name": "layer%20blur",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4521",\
            "y": "1159",\
            "z": "32",\
            "params":\
                [\
                    ["NUM#", "radius", "500,0"]\
                ]\
        },\
        {\
            "type": "REPT",\
            "created": "1738990385567",\
            "updated": "1738990385567",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "3779",\
            "y": "1127.99",\
            "z": "33",\
            "params":\
                [\
                    ["NUM#", "count", "5,0"],\
                    ["NUM#", "iteration", "?,0"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738990385568",\
            "updated": "1738990385568",\
            "id": "random10",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5140",\
            "y": "1263",\
            "z": "34",\
            "params":\
                [\
                    ["NUM#", "seed", "897,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "max", "2640,0"]\
                ]\
        },\
        {\
            "type": "NEG",\
            "created": "1738990398417",\
            "updated": "1738990405006",\
            "id": "neg",\
            "name": "negative",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "4869",\
            "y": "1089",\
            "z": "35",\
            "active": "true"\
        }\
    ],\
        "connections":\
    [\
        {\
            "created": "1738990385576",\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "reset",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame2",\
            "inputId": "children",\
            "list": "true"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "frame2",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "layerBlur",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990405005",\
            "outputNodeId": "neg",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "width",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "centerX",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "color2",\
            "outputId": "c1",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "4",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "prob",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "condition",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "4",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "reset",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "1",\
            "inputNodeId": "random9",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "4",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "layerBlur",\
            "outputId": "radius",\
            "outputOrder": "1",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "4",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "created": "1738990385576",\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738990401550",\
            "outputNodeId": "layerBlur",\
            "outputId": "radius",\
            "outputOrder": "2",\
            "inputNodeId": "neg",\
            "inputId": "h0",\
            "list": "false"\
        }\
    ]\
}';