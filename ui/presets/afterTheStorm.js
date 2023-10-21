const presetAfterTheStorm = '\
    {\
        "nodes":\
        [\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "467",\
            "y": "293",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-138",\
            "y": "606",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "start", "220,0"],\
                    ["NUM#", "add", "-11,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-380",\
            "y": "546",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "start", "5,0"],\
                    ["NUM#", "add", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-143",\
            "y": "335",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "9271,0"],\
                    ["NUM#", "max", "11.5,1"],\
                    ["NUM#", "scale", "24,0"],\
                    ["NUM#", "offset", "3.7000000000000015,1"],\
                    ["NUM#", "detail", "10,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "628",\
            "y": "146",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "angle", "358.8,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "968",\
            "y": "534",\
            "z": "5",\
            "width": "120",\
            "height": "77"\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "286",\
            "y": "146",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "x", "18.849291214091316,1"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "96",\
            "y": "324",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "value", "18.849291214091316,1"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-13",\
            "y": "146",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "x", "75,0"],\
                    ["NUM#", "y", "125,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1147",\
            "y": "476",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "792",\
            "y": "218",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "count", "300,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-377",\
            "y": "430",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "start", "40,0"],\
                    ["NUM#", "add", "-1.5,1"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "959",\
            "y": "192",\
            "z": "12",\
            "params":\
            [\
                    ["LIST#", "points", "300 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0"],\
                    ["NUM#", "closed", "1,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "42",\
            "y": "575",\
            "z": "13",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "86,0"],\
                    ["NUM#", "c2", "99,0"],\
                    ["NUM#", "c3", "179,0"]\
            ]\
            },\
            {\
            "type": "DEFINE",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "207",\
            "y": "742",\
            "z": "14"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "41",\
            "y": "699",\
            "z": "15",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "171,0"],\
                    ["NUM#", "c2", "85,0"],\
                    ["NUM#", "c3", "162,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "37",\
            "y": "965",\
            "z": "16",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "236,0"],\
                    ["NUM#", "c2", "203,0"],\
                    ["NUM#", "c3", "56,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "38",\
            "y": "853",\
            "z": "17",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "170,0"],\
                    ["NUM#", "c2", "209,0"],\
                    ["NUM#", "c3", "62,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "701",\
            "y": "1022",\
            "z": "18",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "517",\
            "y": "1192",\
            "z": "19",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 244,0 214,0 37,0 100,0 7,0"],\
                    ["NUM#", "weight", "0.5,1"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "208",\
            "y": "1198",\
            "z": "20",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "244,0"],\
                    ["NUM#", "c2", "214,0"],\
                    ["NUM#", "c3", "37,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1452",\
            "y": "337",\
            "z": "21",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "200,0"],\
                    ["NUM#", "height", "300,0"],\
                    ["NUM#", "round", "5,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1234",\
            "y": "702",\
            "z": "22",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "57,0"],\
                    ["NUM#", "c2", "93,0"],\
                    ["NUM#", "c3", "160,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "365",\
            "y": "742",\
            "z": "23",\
            "params":\
            [\
                    ["COL#", "color", "1,0 236,0 203,0 56,0"],\
                    ["NUM#", "blend", "14,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "359",\
            "y": "1196",\
            "z": "24",\
            "params":\
            [\
                    ["COL#", "color", "1,0 244,0 214,0 37,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "542",\
            "y": "786",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "angle", "185,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color7",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "366",\
            "y": "852",\
            "z": "26",\
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
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "215",\
            "y": "1025",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "seed", "1214,0"],\
                    ["NUM#", "max", "360,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "scale",\
            "list": "false"\
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
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
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
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
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
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
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
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
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
            "outputNodeId": "color6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "angle",\
            "list": "false"\
            }\
        ]\
    }';
