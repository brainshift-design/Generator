const presetCircleFields = '\
    {\
        "nodes":\
        [\
        {\
            "type": "NOISE",\
            "id": "noise6",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-102",\
            "y": "857",\
            "z": "0",\
            "params":\
            [\
                ["NUM#", "seed", "2451,0"],\
                ["NUM#", "min", "300,0"],\
                ["NUM#", "max", "500,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0.49,2"]\
            ]\
        },\
        {\
            "type": "PT",\
            "id": "point3",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "298",\
            "y": "738",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "x", "265.3304933345296,0"],\
                ["NUM#", "y", "449.1475285522352,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-906",\
            "y": "545",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "seed", "7360,0"],\
                ["NUM#", "max", "10000,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "417",\
            "y": "919",\
            "z": "3",\
            "prevSpace": "hex",\
            "params":\
            [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "143,0"],\
                ["NUM#", "c2", "214,0"],\
                ["NUM#", "c3", "2,0"]\
            ]\
        },\
        {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "818",\
            "y": "896",\
            "z": "4",\
            "params":\
            [\
                ["LIST#", "fills", "1 FILL# 143,0 214,0 2,0 100,0 6,0"],\
                ["NUM#", "weight", "2,0"],\
                ["TEXT#", "dashes", "", "center"]\
            ]\
        },\
        {\
            "type": "MESPT",\
            "id": "measure",\
            "name": "measure",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "862",\
            "y": "669",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "distance", "65.16124927647955,10"],\
                ["NUM#", "angle", "133.40818426421168,10"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-102",\
            "y": "350",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "seed", "6198,0"],\
                ["NUM#", "min", "300,0"],\
                ["NUM#", "max", "500,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0.49,2"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1430",\
            "y": "799",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "count", "50,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise5",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-244",\
            "y": "859",\
            "z": "8",\
            "params":\
            [\
                ["NUM#", "seed", "4768,0"],\
                ["NUM#", "min", "100,0"],\
                ["NUM#", "max", "300,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0.49,2"]\
            ]\
        },\
        {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "299",\
            "y": "500",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "x", "263.6275391103047,0"],\
                ["NUM#", "y", "356.1422815093347,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-99",\
            "y": "594",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "seed", "1942,0"],\
                ["NUM#", "min", "300,0"],\
                ["NUM#", "max", "500,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0.49,2"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-241",\
            "y": "596",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "seed", "5331,0"],\
                ["NUM#", "min", "100,0"],\
                ["NUM#", "max", "300,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0.49,2"]\
            ]\
        },\
        {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "292",\
            "y": "615",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "x", "154.2547030403694,0"],\
                ["NUM#", "y", "394.90561377327765,0"]\
            ]\
        },\
        {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-745",\
            "y": "563",\
            "z": "13",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                ["NUM#", "0", "5521,0"],\
                ["NUM#", "1", "6198,0"],\
                ["NUM#", "2", "5331,0"],\
                ["NUM#", "3", "1942,0"],\
                ["NUM#", "4", "4768,0"],\
                ["NUM#", "5", "2451,0"],\
                ["NUM#", "6", "5012,0"],\
                ["NUM#", "7", "7887,0"],\
                ["NUM#", "8", "5940,0"],\
                ["NUM#", "9", "8294,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-906",\
            "y": "726",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "count", "10,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-244",\
            "y": "352",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "seed", "5521,0"],\
                ["NUM#", "min", "100,0"],\
                ["NUM#", "max", "300,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0.49,2"]\
            ]\
        },\
        {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1062",\
            "y": "542",\
            "z": "16",\
            "params":\
            [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "218.84929619892165,10"],\
                ["NUM#", "y", "403.480399015639,10"],\
                ["NUM#", "width", "65.16124927647955,10"],\
                ["NUM#", "height", "65.16124927647955,10"]\
            ]\
        },\
        {\
            "type": "CIRCEN",\
            "id": "circleCenter",\
            "name": "circle%20center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "496",\
            "y": "604",\
            "z": "17"\
        },\
        {\
            "type": "PT",\
            "id": "point4",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "865",\
            "y": "564",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "x", "218.84929619892165,10"],\
                ["NUM#", "y", "403.480399015639,10"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-604",\
            "y": "1093",\
            "z": "19",\
            "params":\
            [\
                ["NUM#", "add", "0.01,2"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1749",\
            "y": "665",\
            "z": "20",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "400,0"],\
                ["NUM#", "height", "800,0"],\
                ["NUM#", "round", "10,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1564",\
            "y": "967",\
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
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "623",\
            "y": "902",\
            "z": "22",\
            "params":\
            [\
                ["COL#", "color", "1,0 143,0 214,0 2,0"],\
                ["NUM#", "blend", "6,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "-943",\
            "y": "504",\
            "z": "23",\
            "width": "356.1439573182158",\
            "height": "357.55866837246697",\
            "params":\
            [\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "5",\
            "inputNodeId": "noise6",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise4",\
            "outputId": "min",\
            "outputOrder": "0",\
            "inputNodeId": "noise6",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise4",\
            "outputId": "max",\
            "outputOrder": "0",\
            "inputNodeId": "noise6",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise5",\
            "outputId": "scale",\
            "outputOrder": "0",\
            "inputNodeId": "noise6",\
            "inputId": "scale",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "4",\
            "inputNodeId": "noise6",\
            "inputId": "offset",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point3",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point3",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "measure",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "circleCenter",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "measure",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "5",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "scale",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "scale",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "offset",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "5",\
            "inputNodeId": "noise5",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise3",\
            "outputId": "min",\
            "outputOrder": "0",\
            "inputNodeId": "noise5",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise3",\
            "outputId": "max",\
            "outputOrder": "0",\
            "inputNodeId": "noise5",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise4",\
            "outputId": "scale",\
            "outputOrder": "0",\
            "inputNodeId": "noise5",\
            "inputId": "scale",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "noise5",\
            "inputId": "offset",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "5",\
            "inputNodeId": "noise4",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "min",\
            "outputOrder": "0",\
            "inputNodeId": "noise4",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "max",\
            "outputOrder": "0",\
            "inputNodeId": "noise4",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise3",\
            "outputId": "scale",\
            "outputOrder": "0",\
            "inputNodeId": "noise4",\
            "inputId": "scale",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "noise4",\
            "inputId": "offset",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "5",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "min",\
            "outputOrder": "0",\
            "inputNodeId": "noise3",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "max",\
            "outputOrder": "0",\
            "inputNodeId": "noise3",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "scale",\
            "outputOrder": "0",\
            "inputNodeId": "noise3",\
            "inputId": "scale",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise3",\
            "inputId": "offset",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "5",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "offset",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point4",\
            "outputId": "x",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point4",\
            "outputId": "y",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "measure",\
            "outputId": "distance",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "width",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "measure",\
            "outputId": "distance",\
            "outputOrder": "1",\
            "inputNodeId": "ellipse",\
            "inputId": "height",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "circleCenter",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "circleCenter",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "circleCenter",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "circleCenter",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point4",\
            "inputId": "h0",\
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
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
        }\
        ]\
    }';