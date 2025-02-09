const presetCairoTiles = '\
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
            "x": "3902.93",\
            "y": "5193",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "x", "-57,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6704",\
            "y": "5658",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "angle", "90,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7461",\
            "y": "5552",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "scaleX", "30,0"],\
                    ["NUM#", "scaleY", "30,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5837",\
            "y": "5923",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5419",\
            "y": "5789",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            },\
            {\
            "type": "RSTX",\
            "id": "reset",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5572",\
            "y": "5487",\
            "z": "5"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5597",\
            "y": "5719",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "add", "200,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7243",\
            "y": "5553",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "centerX", "0,0"],\
                    ["NUM#", "centerY", "0,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point5",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3914.93",\
            "y": "5733",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "y", "-143,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point4",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3905.93",\
            "y": "5591",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "x", "100,0"],\
                    ["NUM#", "y", "-100,0"]\
            ]\
            },\
            {\
            "type": "APPLY",\
            "id": "apply2",\
            "name": "apply",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5240",\
            "y": "5536",\
            "z": "10",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4948",\
            "y": "5557",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "angle", "180,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6085",\
            "y": "5549",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "count", "10,0"]\
            ]\
            },\
            {\
            "type": "ITER",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5600",\
            "y": "5974",\
            "z": "13"\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5415",\
            "y": "5939",\
            "z": "14",\
            "width": "120",\
            "height": "54"\
            },\
            {\
            "type": "MOVE",\
            "id": "move3",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6546",\
            "y": "5548",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "x", "75,0"],\
                    ["NUM#", "y", "400,0"]\
            ]\
            },\
            {\
            "type": "NEG",\
            "id": "neg",\
            "name": "negative",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3706.93",\
            "y": "5217",\
            "z": "16"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6042",\
            "y": "5851",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "add", "400,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3514.93",\
            "y": "5264",\
            "z": "18",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "57,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4243.93",\
            "y": "5476",\
            "z": "19",\
            "width": "120",\
            "height": "90"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7536.07",\
            "y": "5867",\
            "z": "20",\
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
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5742",\
            "y": "5340",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "x", "1800,0"],\
                    ["NUM#", "y", "-200,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4688",\
            "y": "4921",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "seed", "8709,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "NEG",\
            "id": "neg2",\
            "name": "negative",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3712.93",\
            "y": "5483",\
            "z": "23"\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3520.93",\
            "y": "5530",\
            "z": "24",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "100,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine4",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7054",\
            "y": "5545",\
            "z": "25",\
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
            "x": "4980",\
            "y": "4944",\
            "z": "26",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "226,0"],\
                    ["NUM#", "c2", "11,0"],\
                    ["NUM#", "c3", "11,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point3",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3908.93",\
            "y": "5459",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "x", "-100,0"],\
                    ["NUM#", "y", "-100,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4319.93",\
            "y": "5724",\
            "z": "28",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 255,0 255,0 255,0 100,0 0,0"],\
                    ["NUM#", "weight", "4,0"]\
            ]\
            },\
            {\
            "type": "APPLY",\
            "id": "apply",\
            "name": "apply",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5237",\
            "y": "5416",\
            "z": "29",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4472.93",\
            "y": "5475",\
            "z": "30",\
            "params":\
            [\
                    ["LIST#", "points", "5 PT# -100,0 -100,0 PT# -57,0 0,0 PT# 57,0 0,0 PT# 100,0 -100,0 PT# 0,0 -143,0"],\
                    ["NUM#", "closed", "1,0"],\
                    ["NUM#", "degree", "0,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7701.07",\
            "y": "5666",\
            "z": "31",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "500,0"],\
                    ["NUM#", "height", "500,0"],\
                    ["NUM#", "round", "10,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5416",\
            "y": "6024",\
            "z": "32",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "-200,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4819",\
            "y": "5102",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "seed", "295,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4686",\
            "y": "5101",\
            "z": "34",\
            "params":\
            [\
                    ["NUM#", "seed", "302,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4169.93",\
            "y": "5750",\
            "z": "35",\
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
            "type": "MOVE",\
            "id": "move4",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6854",\
            "y": "5658",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4794",\
            "y": "5556",\
            "z": "37",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6235",\
            "y": "5549",\
            "z": "38",\
            "params":\
            [\
                    ["NUM#", "y", "1600,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3530.93",\
            "y": "5782",\
            "z": "39",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "-143,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5839",\
            "y": "5766",\
            "z": "40",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4981",\
            "y": "5123",\
            "z": "41",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "27,0"],\
                    ["NUM#", "c2", "36,0"],\
                    ["NUM#", "c3", "85,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5399",\
            "y": "5478",\
            "z": "42",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3899.93",\
            "y": "5325",\
            "z": "43",\
            "params":\
            [\
                    ["NUM#", "x", "57,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6391",\
            "y": "5548",\
            "z": "44"\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4821",\
            "y": "4920",\
            "z": "45",\
            "params":\
            [\
                    ["NUM#", "seed", "8709,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "neg",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "reset",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence",\
            "inputId": "add",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point5",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "point4",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point3",\
            "outputId": "y",\
            "outputOrder": "0",\
            "inputNodeId": "point4",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply2",\
            "inputId": "props",\
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
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "neg",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence2",\
            "inputId": "add",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h4",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "reset",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "neg2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine4",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "move4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine4",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "neg2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point3",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "apply",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move4",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "move4",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color4",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color4",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "apply",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "apply2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "point2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "y",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';