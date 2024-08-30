const presetMagicDots = '\
{\
    "generatorVersion": "347",\
    "nodes":\
    [\
        {\
        "type": "COL",\
        "created": "1706635342173",\
        "updated": "1706635665836",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4003",\
        "y": "5662",\
        "z": "0",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "181.13975008601852,0"],\
                ["NUM#", "c2", "86.06557377049181,0"],\
                ["NUM#", "c3", "95.68627450980392,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1706635348001",\
        "updated": "1706643739349",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4377",\
        "y": "5664",\
        "z": "1",\
        "width": "60",\
        "height": "51"\
        },\
        {\
        "type": "DRSH",\
        "created": "1706635357956",\
        "updated": "1706635364451",\
        "id": "dropShadow",\
        "name": "drop%20shadow",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4193",\
        "y": "5710",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "blur", "47,0"],\
                ["FILL#", "fill", "34,0 240,0 244,0 100,0 0,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1706635393520",\
        "updated": "1706643743888",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4780",\
        "y": "5450",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "x", "274,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1706635419367",\
        "updated": "1706635432136",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5100",\
        "y": "5452",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "angle", "346.66666666666663,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1706635422103",\
        "updated": "1706635533320",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5267",\
        "y": "5685",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "count", "27,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1706635429250",\
        "updated": "1706635435933",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4919",\
        "y": "5758",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1706635456348",\
        "updated": "1706643144636",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5456",\
        "y": "5960",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "count", "10,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1706635469801",\
        "updated": "1706635525549",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4575",\
        "y": "6026",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "end", "274,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1706635498397",\
        "updated": "1706636033216",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4778.55",\
        "y": "5931.97",\
        "z": "9",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "27,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1706635515955",\
        "updated": "1706635533320",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4983",\
        "y": "5950",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1706635515955",\
        "updated": "1706635527559",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4774",\
        "y": "6056",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1706635658212",\
        "updated": "1706643842312",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3829",\
        "y": "5717",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "seed", "200,0"],\
                ["NUM#", "min", "-360,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "50,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1706635781670",\
        "updated": "1706643842319",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4160",\
        "y": "5389",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "seed", "163,0"],\
                ["NUM#", "min", "5,0"],\
                ["NUM#", "max", "25,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1706636026087",\
        "updated": "1706643842323",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4389",\
        "y": "5970",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "seed", "117,0"],\
                ["NUM#", "max", "50,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1705641039798",\
        "updated": "1706643723390",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3172",\
        "y": "5593",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "seed", "9730,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1705641042300",\
        "updated": "1705641042315",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3316",\
        "y": "5593",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "count", "7,0"]\
        ]\
        },\
        {\
        "type": "EXPAND",\
        "created": "1705641043411",\
        "updated": "1706643842346",\
        "id": "list",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3472.24",\
        "y": "5587.86",\
        "z": "17",\
        "width": "120",\
        "height": "186",\
        "divider": "0.25",\
        "scroll": "0",\
        "params":\
        [\
                ["NUM#", "0", "200,0"],\
                ["NUM#", "1", "163,0"],\
                ["NUM#", "2", "117,0"],\
                ["NUM#", "3", "63,0"],\
                ["NUM#", "4", "192,0"],\
                ["NUM#", "5", "224,0"],\
                ["NUM#", "6", "31,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1705641064229",\
        "updated": "1706643062479",\
        "id": "panel",\
        "name": "",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "1",\
        "notCondition": "false",\
        "x": "3135",\
        "y": "5548",\
        "z": "18",\
        "width": "491",\
        "height": "274.7234639413329",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1706643139092",\
        "updated": "1706643520469",\
        "id": "rotate2",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5646",\
        "y": "5960",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "angle", "-90,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1706643220472",\
        "updated": "1706643525014",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5843.68",\
        "y": "5780",\
        "z": "20",\
        "active": "true",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "COL",\
        "created": "1706643228309",\
        "updated": "1706643510694",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5478",\
        "y": "5794",\
        "z": "21",\
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
        "type": "STAR",\
        "created": "1706643506478",\
        "updated": "1706643658419",\
        "id": "star",\
        "name": "star",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5657",\
        "y": "5506",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "width", "400,0"],\
                ["NUM#", "height", "400,0"],\
                ["NUM#", "points", "9,0"],\
                ["NUM#", "convex", "85,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1706643562661",\
        "updated": "1706643842328",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5465",\
        "y": "5420",\
        "z": "23",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "seed", "63,0"],\
                ["NUM#", "min", "3,0"],\
                ["NUM#", "max", "12,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1706643562661",\
        "updated": "1706643842333",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5475",\
        "y": "5599",\
        "z": "24",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "seed", "192,0"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "100,0"]\
        ]\
        },\
        {\
        "type": "STAR",\
        "created": "1706643708465",\
        "updated": "1706643797223",\
        "id": "star2",\
        "name": "star",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4507",\
        "y": "5301",\
        "z": "25",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "width", "18.08694697958782,0"],\
                ["NUM#", "height", "18.08694697958782,0"],\
                ["NUM#", "points", "6.800211368359205,0"],\
                ["NUM#", "convex", "83.98513094116099,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1706643760486",\
        "updated": "1706643842338",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4319",\
        "y": "5224",\
        "z": "26",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "seed", "224,0"],\
                ["NUM#", "min", "3,0"],\
                ["NUM#", "max", "12,0"],\
                ["NUM#", "scale", "5,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1706643760486",\
        "updated": "1706643842346",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4326",\
        "y": "5425",\
        "z": "27",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "seed", "31,0"],\
                ["NUM#", "min", "80,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1706635665835",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1706635348003",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706635362242",\
        "outputNodeId": "dropShadow",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1706635364451",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "dropShadow",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1706643743888",\
        "outputNodeId": "star2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706635473598",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1706635419372",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706635432136",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1706635422106",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706635533320",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1706635435933",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1706635456353",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1706635476165",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1706636033215",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "num",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706635515959",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706635527558",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1706635523748",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706635525548",\
        "outputNodeId": "range2",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1706643071171",\
        "outputNodeId": "list",\
        "outputId": "0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1706643071174",\
        "outputNodeId": "list",\
        "outputId": "1",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1706643071177",\
        "outputNodeId": "list",\
        "outputId": "2",\
        "outputOrder": "0",\
        "inputNodeId": "random",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1705641042304",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705641043418",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "list",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1706643144635",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1706643513669",\
        "outputNodeId": "star",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706643520468",\
        "outputNodeId": "rotate2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1706643638671",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "star",\
        "inputId": "points",\
        "list": "false"\
        },\
        {\
        "created": "1706643658419",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "star",\
        "inputId": "convex",\
        "list": "false"\
        },\
        {\
        "created": "1706643510693",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "star",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1706643608144",\
        "outputNodeId": "list",\
        "outputId": "3",\
        "outputOrder": "0",\
        "inputNodeId": "random3",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1706643608150",\
        "outputNodeId": "list",\
        "outputId": "4",\
        "outputOrder": "0",\
        "inputNodeId": "random4",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1706643719693",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "star2",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1706643723390",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "star2",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1706643780741",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "star2",\
        "inputId": "points",\
        "list": "false"\
        },\
        {\
        "created": "1706643797223",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "star2",\
        "inputId": "convex",\
        "list": "false"\
        },\
        {\
        "created": "1706643739348",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "star2",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1706643842337",\
        "outputNodeId": "list",\
        "outputId": "5",\
        "outputOrder": "0",\
        "inputNodeId": "noise3",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "created": "1706643842345",\
        "outputNodeId": "list",\
        "outputId": "6",\
        "outputOrder": "0",\
        "inputNodeId": "noise4",\
        "inputId": "seed",\
        "list": "false"\
        }\
    ]\
}';