const presetRoughStar = '\
    {\
        "nodes":\
        [\
        {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2422",\
            "y": "2053",\
            "z": "0",\
            "params":\
            [\
                ["NUM#", "x", "400,0"],\
                ["NUM#", "y", "400,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2128",\
            "y": "2208",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "seed", "5782,0"],\
                ["NUM#", "min", "20,0"],\
                ["NUM#", "max", "300,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2628",\
            "y": "2215",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "value", "543.6226647821652,1"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3149.55",\
            "y": "2589",\
            "z": "3",\
            "params":\
            [\
                ["NUM#", "seed", "4329,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "50,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "1588",\
            "y": "2511",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "seed", "1838,0"],\
                ["NUM#", "max", "10000,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3961",\
            "y": "2734.41",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "seed", "2656,0"],\
                ["NUM#", "max", "360,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3410.55",\
            "y": "2711",\
            "z": "6",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "177.80178035143345,0"],\
                ["NUM#", "c2", "20.59897967168503,0"],\
                ["NUM#", "c3", "14.927842045515462,0"]\
            ]\
        },\
        {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3592.55",\
            "y": "2684",\
            "z": "7",\
            "params":\
            [\
                ["LIST#", "fills", "1 FILL# 30,0 38,0 38,0 100,0 0,0"],\
                ["NUM#", "weight", "1.5,1"],\
                ["TEXT#", "dashes", "", "center"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2478",\
            "y": "2296",\
            "z": "8",\
            "params":\
            [\
                ["NUM#", "seed", "7380,0"],\
                ["NUM#", "min", "99.5,1"],\
                ["NUM#", "max", "597,0"],\
                ["NUM#", "scale", "4,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4207.55",\
            "y": "2737",\
            "z": "9",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "176,0"],\
                ["NUM#", "c2", "31,0"],\
                ["NUM#", "c3", "30,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3151",\
            "y": "3007",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "seed", "5681,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1752",\
            "y": "2529",\
            "z": "11",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                ["NUM#", "0", "7380,0"],\
                ["NUM#", "1", "4329,0"],\
                ["NUM#", "2", "6458,0"],\
                ["NUM#", "3", "5681,0"],\
                ["NUM#", "4", "2656,0"],\
                ["NUM#", "5", "2771,0"],\
                ["NUM#", "6", "780,0"],\
                ["NUM#", "7", "5782,0"],\
                ["NUM#", "8", "5762,0"],\
                ["NUM#", "9", "5186,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2802",\
            "y": "2054",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "x", "543.6226647821652,1"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3963",\
            "y": "3113.41",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "seed", "780,0"],\
                ["NUM#", "max", "100,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2051",\
            "y": "2871",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "add", "3,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1591",\
            "y": "2708",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "count", "10,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3888.55",\
            "y": "2627",\
            "z": "16",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4055.55",\
            "y": "2566",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "count", "200,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4387.55",\
            "y": "2427",\
            "z": "18",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "800,0"],\
                ["NUM#", "height", "1200,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3151",\
            "y": "2796",\
            "z": "19",\
            "params":\
            [\
                ["NUM#", "seed", "6458,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2052",\
            "y": "2728",\
            "z": "20",\
            "params":\
            [\
                ["NUM#", "add", "0.5,1"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3962",\
            "y": "2922.41",\
            "z": "21",\
            "params":\
            [\
                ["NUM#", "seed", "2771,0"],\
                ["NUM#", "max", "100,0"]\
            ]\
        },\
        {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3757.55",\
            "y": "2225",\
            "z": "22",\
            "params":\
            [\
                ["LIST#", "points", "100 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0 PT# 400,0 400,0"],\
                ["NUM#", "closed", "1,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3259.55",\
            "y": "2310",\
            "z": "23",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3547.55",\
            "y": "2254",\
            "z": "24",\
            "params":\
            [\
                ["NUM#", "count", "100,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3260.55",\
            "y": "2054",\
            "z": "25",\
            "params":\
            [\
                ["NUM#", "angle", "356.4,0"]\
            ]\
        },\
        {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3006",\
            "y": "2302",\
            "z": "26",\
            "params":\
            [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "1545",\
            "y": "2461",\
            "z": "27",\
            "width": "371.5298287121238",\
            "height": "396.44122858901545",\
            "params":\
            [\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "list",\
            "outputId": "7",\
            "outputOrder": "1",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "1",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "1",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "1",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random4",\
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
            "outputId": "3",\
            "outputOrder": "1",\
            "inputNodeId": "noise4",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "1",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
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
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "1",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "1",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "true"\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
        }\
        ]\
    }';