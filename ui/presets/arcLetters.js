const presetArcLetters = '\
{\
    "generatorVersion": "385",\
    "nodes":\
    [\
        {\
        "type": "NUM",\
        "created": "1710744220807",\
        "updated": "1710745354020",\
        "id": "num3",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5109.91",\
        "y": "6231.16",\
        "z": "0",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "90,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1710745785500",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5264",\
        "y": "6527",\
        "z": "1",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"],\
                ["NUM#", "weight", "5,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1710743114206",\
        "updated": "1710748435859",\
        "id": "point2",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5021",\
        "y": "5740",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "y", "100,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1710748374483",\
        "updated": "1710748401238",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5853.66",\
        "y": "6821.41",\
        "z": "3",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "NUM",\
        "created": "1710744220807",\
        "updated": "1710745352838",\
        "id": "num2",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5109.91",\
        "y": "6166.16",\
        "z": "4",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "-90,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1710743114206",\
        "updated": "1710748434000",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5027",\
        "y": "5624",\
        "z": "5",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1710746139358",\
        "updated": "1710746222009",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6409",\
        "y": "7104",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "add", "130,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1710747868202",\
        "updated": "1710747897484",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4360",\
        "y": "5617",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1710745941945",\
        "updated": "1710748276750",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5670",\
        "y": "6763",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "seed", "1474,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "2,0"],\
                ["NUM#", "max", "5,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1710747773997",\
        "updated": "1710750493053",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4219",\
        "y": "5614",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "seed", "9019,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "5,0"],\
                ["NUM#", "unique", "200,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710745824770",\
        "updated": "1710748379925",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6042",\
        "y": "6737",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "count", "2,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1710748229508",\
        "updated": "1710748379925",\
        "id": "sequence3",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4516",\
        "y": "6200",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1710748221000",\
        "updated": "1710750493053",\
        "id": "math8",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4774",\
        "y": "6803",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "operand", "1,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1710748197849",\
        "updated": "1710748434000",\
        "id": "select",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4791",\
        "y": "5622",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "index", "1,0"]\
        ]\
        },\
        {\
        "type": "ABS",\
        "created": "1710747546994",\
        "updated": "1710747546997",\
        "id": "abs",\
        "name": "absolute",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5398",\
        "y": "5876",\
        "z": "14"\
        },\
        {\
        "type": "SEQ",\
        "created": "1710746139358",\
        "updated": "1710746222009",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6406",\
        "y": "6942",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "add", "110,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710746131348",\
        "updated": "1710953931131",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6872",\
        "y": "7094",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "count", "3,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1710743204339",\
        "updated": "1710747447754",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5396",\
        "y": "5929",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1705642638300",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5102",\
        "y": "6529",\
        "z": "18",\
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
        "type": "REPT",\
        "created": "1710747953595",\
        "updated": "1710750493053",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "2",\
        "notCondition": "false",\
        "x": "4513",\
        "y": "5621",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "count", "6,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710746131348",\
        "updated": "1710746687261",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6874",\
        "y": "6943",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "count", "6,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1710746128049",\
        "updated": "1710747590919",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6638",\
        "y": "6737",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "x", "550,0"],\
                ["NUM#", "y", "260,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1710743204339",\
        "updated": "1710747523461",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5399",\
        "y": "5673",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "SMINMAX",\
        "created": "1710748323011",\
        "updated": "1710748323016",\
        "id": "minmax",\
        "name": "min%2Fmax",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4934",\
        "y": "6803",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "operand", "2,0"],\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "PROB",\
        "created": "1710743260558",\
        "updated": "1710745722575",\
        "id": "prob",\
        "name": "probability",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5262",\
        "y": "6195",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "seed", "9647,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "alternate", "50,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1710748197849",\
        "updated": "1710748435859",\
        "id": "select2",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4786",\
        "y": "5742",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "index", "2,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1710748221000",\
        "updated": "1710748238560",\
        "id": "math7",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4666",\
        "y": "5919",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "operand", "1,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1710747958123",\
        "updated": "1710748425334",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4514",\
        "y": "5765",\
        "z": "27"\
        },\
        {\
        "type": "SMATH",\
        "created": "1710747853558",\
        "updated": "1710747903504",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4361",\
        "y": "5707",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "operand", "100,0"],\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "invert", "1,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710748412735",\
        "updated": "1710748428435",\
        "id": "repeat5",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6202",\
        "y": "6737",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "count", "1,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "ARC",\
        "created": "1710743138822",\
        "updated": "1710747526021",\
        "id": "arc",\
        "name": "arc",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5743",\
        "y": "6056",\
        "z": "30",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "y", "50,0"],\
                ["NUM#", "width", "50,0"],\
                ["NUM#", "height", "50,0"],\
                ["NUM#", "start", "90,0"],\
                ["NUM#", "sweep", "50,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1710743197527",\
        "updated": "1710747399195",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5399",\
        "y": "5586",\
        "z": "31"\
        },\
        {\
        "type": "MATH",\
        "created": "1710743197527",\
        "updated": "1710747447754",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5398",\
        "y": "5792",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1710953886424",\
        "updated": "1710953997628",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7236",\
        "y": "7067",\
        "z": "33",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "-99,0"],\
                ["NUM#", "y", "-42,0"],\
                ["NUM#", "width", "726,0"],\
                ["NUM#", "height", "460,0"],\
                ["NUM#", "round", "15,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1710953923237",\
        "updated": "1710953926272",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7077",\
        "y": "7247",\
        "z": "34",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "255,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1710953615456",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "point",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "select2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "prob",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math6",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "minmax",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "random3",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "arc",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "repeat4",\
        "outputId": "count",\
        "outputOrder": "0",\
        "inputNodeId": "math8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "abs",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "abs",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "repeat5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "minmax",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "prob",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "prob",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select2",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "random4",\
        "outputId": "max",\
        "outputOrder": "0",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "repeat5",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "arc",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "arc",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "arc",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "prob",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "arc",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "arc",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "point",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "point2",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "point2",\
        "outputId": "y",\
        "outputOrder": "2",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710953615456",\
        "outputNodeId": "point",\
        "outputId": "y",\
        "outputOrder": "1",\
        "inputNodeId": "math4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710953931130",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1710953926271",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        }\
    ]\
}';