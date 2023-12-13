const presetRays = '\
    {\
        "nodes":\
        [\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7151",\
            "y": "3663",\
            "z": "0",\
            "active": "true",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6114",\
            "y": "3369",\
            "z": "1",\
            "prevSpace": "rgb",\
            "params":\
            [\
                ["NUM#", "space", "1,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "193,0"],\
                ["NUM#", "c3", "0,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6114",\
            "y": "3519",\
            "z": "2",\
            "prevSpace": "hex",\
            "params":\
            [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "17,0"],\
                ["NUM#", "c2", "17,0"],\
                ["NUM#", "c3", "17,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6698",\
            "y": "4056",\
            "z": "3",\
            "params":\
            [\
                ["NUM#", "count", "200,0"]\
            ]\
        },\
        {\
            "type": "LINE",\
            "id": "line",\
            "name": "line",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6134",\
            "y": "3879",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "width", "402.04251585157704,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6051",\
            "y": "4319",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "seed", "7354,0"],\
                ["NUM#", "min", "400,0"],\
                ["NUM#", "max", "420,0"],\
                ["NUM#", "scale", "2,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5239",\
            "y": "4108",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "seed", "9268,0"],\
                ["NUM#", "min", "20,0"],\
                ["NUM#", "max", "60,0"],\
                ["NUM#", "scale", "3,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill3",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5595",\
            "y": "4162",\
            "z": "7",\
            "params":\
            [\
                ["COL#", "color", "1,0 217,0 190,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5587",\
            "y": "3928",\
            "z": "8",\
            "params":\
            [\
                ["COL#", "color", "1,0 217,0 190,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6500",\
            "y": "3878",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "angle", "358.2,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5412",\
            "y": "4243",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "seed", "9283,0"],\
                ["NUM#", "min", "-30,0"],\
                ["NUM#", "max", "150,0"],\
                ["NUM#", "scale", "5,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6515",\
            "y": "3589",\
            "z": "11",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "1300,0"]\
            ]\
        },\
        {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5956",\
            "y": "3972",\
            "z": "12",\
            "params":\
            [\
                ["LIST#", "fills", "1 GRAD# 3 FILL# 217,0 190,0 0,0 0,0 0,0 FILL# 217,0 190,0 0,0 40.986791695217306,0 0,0 FILL# 217,0 190,0 0,0 0,0 0,0 0,0 0,0 50,0 100,0 0,0 100,0 0,0 0,0"],\
                ["NUM#", "weight", "5.941303471479861,0"],\
                ["TEXT#", "dashes", "", "center"]\
            ]\
        },\
        {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6296",\
            "y": "3879",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "centerX", "-50,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5782",\
            "y": "4311",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "seed", "7347,0"],\
                ["NUM#", "max", "8,0"],\
                ["NUM#", "scale", "4,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6304",\
            "y": "3420",\
            "z": "15",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "type", "1,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "65,0"]\
            ]\
        },\
        {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5787",\
            "y": "3998",\
            "z": "16"\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6702",\
            "y": "3258",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "scaleX", "1300,0"],\
                ["NUM#", "scaleY", "1300,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5408",\
            "y": "4059",\
            "z": "18",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "52.522696565148834,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "85.09803921568627,0"]\
            ]\
        },\
        {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6467",\
            "y": "3258",\
            "z": "19",\
            "params":\
            [\
                ["NUM#", "x", "-247,0"],\
                ["NUM#", "y", "-44,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5589",\
            "y": "4045",\
            "z": "20",\
            "params":\
            [\
                ["COL#", "color", "1,0 217,0 190,0 0,0"],\
                ["NUM#", "opacity", "40.986791695217306,0"]\
            ]\
        },\
        {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6304",\
            "y": "4127",\
            "z": "21",\
            "params":\
            [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
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
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "line",\
            "inputId": "width",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "line",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "fill3",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "center",\
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
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "weight",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "line",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h1",\
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
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "grad2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "opacity",\
            "list": "false"\
        }\
        ]\
    }';