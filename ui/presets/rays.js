const presetRays = '\
    {\
    "nodes":\
    [\
        {\
        "type": "CMB",\
        "created": "1704366301194",\
        "updated": "1704366301304",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7201",\
        "y": "3713",\
        "z": "0",\
        "active": "true",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "COL",\
        "created": "1704366301201",\
        "updated": "1704366301201",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6173",\
        "y": "3461",\
        "z": "1",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1704366301204",\
        "updated": "1704366301204",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6173",\
        "y": "3554",\
        "z": "2",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "237,0"],\
                ["NUM#", "c2", "106,0"],\
                ["NUM#", "c3", "5,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1704366301210",\
        "updated": "1704366301210",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6748",\
        "y": "4106",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "count", "200,0"]\
        ]\
        },\
        {\
        "type": "LINE",\
        "created": "1704366301214",\
        "updated": "1704366301214",\
        "id": "line",\
        "name": "line",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6184",\
        "y": "3929",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "width", "402.04251585157704,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1704366301218",\
        "updated": "1704366301218",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6101",\
        "y": "4369",\
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
        "created": "1704366301221",\
        "updated": "1704366301221",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5289",\
        "y": "4158",\
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
        "created": "1704366301226",\
        "updated": "1704366301226",\
        "id": "fill3",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5645",\
        "y": "4212",\
        "z": "7",\
        "params":\
        [\
                ["COL#", "color", "1,0 217,0 190,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1704366301229",\
        "updated": "1704366301229",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5637",\
        "y": "3978",\
        "z": "8",\
        "params":\
        [\
                ["COL#", "color", "1,0 217,0 190,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1704366301232",\
        "updated": "1704366301232",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6550",\
        "y": "3928",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "angle", "358.2,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1704366301236",\
        "updated": "1704366301236",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5462",\
        "y": "4293",\
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
        "created": "1704366301237",\
        "updated": "1704366301237",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6565",\
        "y": "3639",\
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
        "created": "1704366301245",\
        "updated": "1704366301245",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6006",\
        "y": "4022",\
        "z": "12",\
        "params":\
        [\
                ["LIST#", "fills", "1 GRAD# 3 CSTOP# 217,0 190,0 0,0 0,0 0,0 0,0 CSTOP# 217,0 190,0 0,0 40.986791695217306,0 0,0 50,0 CSTOP# 217,0 190,0 0,0 0,0 0,0 100,0 0,0 1,0 0,0 50,0 100,0 0,0 100,0 0 0,0 0,0"],\
                ["NUM#", "weight", "5.941303471479861,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "CENTR",\
        "created": "1704366301248",\
        "updated": "1704366301248",\
        "id": "center",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6346",\
        "y": "3929",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "centerX", "-50,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1704366301251",\
        "updated": "1704366301251",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5832",\
        "y": "4361",\
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
        "created": "1704366301257",\
        "updated": "1704366613203",\
        "id": "grad2",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6354",\
        "y": "3470",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "50,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1704366301262",\
        "updated": "1704366301262",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5837",\
        "y": "4048",\
        "z": "16"\
        },\
        {\
        "type": "SCALE",\
        "created": "1704366301267",\
        "updated": "1704366301267",\
        "id": "scale",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6752",\
        "y": "3308",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "scaleX", "1300,0"],\
                ["NUM#", "scaleY", "1300,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1704366301270",\
        "updated": "1704366301270",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5458",\
        "y": "4109",\
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
        "created": "1704366301276",\
        "updated": "1704366301276",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6517",\
        "y": "3308",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "x", "-247,0"],\
                ["NUM#", "y", "-44,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1704366301278",\
        "updated": "1704366301278",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5639",\
        "y": "4095",\
        "z": "20",\
        "params":\
        [\
                ["COL#", "color", "1,0 217,0 190,0 0,0"],\
                ["NUM#", "opacity", "40.986791695217306,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1704366301280",\
        "updated": "1704366301280",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6354",\
        "y": "4177",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1704366301204",\
        "updated": "1704366613203",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6172",\
        "y": "3647",\
        "z": "22",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1704366301286",\
        "outputNodeId": "scale",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "line",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "line",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "fill3",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "center",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "true"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "weight",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "line",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "center",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1704366613202",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "fill3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "scaleX",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "scale",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "grad2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1704366301286",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill2",\
        "inputId": "opacity",\
        "list": "false"\
        }\
    ]\
    }';