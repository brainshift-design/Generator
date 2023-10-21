const presetFalsePerspective = '\
    {\
        "nodes":\
        [\
            {\
            "type": "PTLERP",\
            "id": "interpolate2",\
            "name": "interpolate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1244",\
            "y": "1960",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "amount", "100,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "847",\
            "y": "2277",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "spread", "1,0"],\
                    ["NUM#", "bias", "-66,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select4",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1055",\
            "y": "1685",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "index", "0,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "99",\
            "y": "440",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2.45,2"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "314",\
            "y": "609",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "x", "980.0000000000001,2"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "542",\
            "y": "611",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "count", "15,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "COUNT",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "287",\
            "y": "942",\
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
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "540",\
            "y": "185",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "count", "15,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1442",\
            "y": "387",\
            "z": "8",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1332",\
            "y": "1232",\
            "z": "9",\
            "params":\
            [\
                    ["COL#", "color", "1,0 0,0 0,0 0,0"]\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1838",\
            "y": "368",\
            "z": "10",\
            "params":\
            [\
                    ["LIST#", "points", "2 PT# 0,0 0,0 PT# -284,0 100,0"],\
                    ["NUM#", "degree", "0,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "2070",\
            "y": "915",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "count", "15,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1810",\
            "y": "-562",\
            "z": "12",\
            "active": "true",\
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
            "id": "interpolate",\
            "name": "interpolate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1244",\
            "y": "1659",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "amount", "100,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-361",\
            "y": "86",\
            "z": "14",\
            "width": "2635",\
            "height": "1016.9245370561073",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select5",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1058",\
            "y": "1914",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "index", "-1,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-253",\
            "y": "611",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "x", "-284,0"],\
                    ["NUM#", "y", "100,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1496",\
            "y": "1230",\
            "z": "17",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1163",\
            "y": "1259",\
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
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1810",\
            "y": "-453",\
            "z": "19",\
            "active": "true",\
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
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-252",\
            "y": "189",\
            "z": "20"\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "1201",\
            "y": "184",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "index", "14,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "962",\
            "y": "372",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "add", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "746",\
            "y": "1542",\
            "z": "23",\
            "width": "1583",\
            "height": "944.9359744379389",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select6",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1058",\
            "y": "2014",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "index", "-1,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat4",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "2091",\
            "y": "2207",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "count", "15,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2157",\
            "y": "-623",\
            "z": "26",\
            "active": "true",\
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
            "id": "path2",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1720",\
            "y": "1826",\
            "z": "27",\
            "params":\
            [\
                    ["LIST#", "points", "2 PT# -284,0 100,0 PT# 696.0000000000001,0 100,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range2",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-55",\
            "y": "368",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "end", "400,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1426",\
            "y": "1846",\
            "z": "29",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "317",\
            "y": "187",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "x", "400,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select3",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1057",\
            "y": "1604",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "index", "0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2679",\
            "y": "1572",\
            "z": "32",\
            "active": "true",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "SEL",\
            "id": "select2",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "1201",\
            "y": "611",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "index", "14,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1979",\
            "y": "-511",\
            "z": "34",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "size", "75,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "select5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "interpolate2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "interpolate2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "interpolate2",\
            "inputId": "amount",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "select4",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat2",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
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
            "outputNodeId": "combine",\
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
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "repeat3",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "repeat3",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "interpolate",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "interpolate",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "interpolate",\
            "inputId": "amount",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "select5",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select6",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "path2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "repeat4",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path2",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "path2",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "interpolate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "interpolate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
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
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h2",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select2",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            }\
        ]\
    }';
