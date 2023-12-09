const presetSpiderWeb = '\
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
            "x": "6482",\
            "y": "6527",\
            "z": "0",\
            "params":\
            [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5934",\
            "y": "6472",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "scaleX", "57,0"],\
                ["NUM#", "scaleY", "57,0"],\
                ["NUM#", "affectStyle", "0,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5647",\
            "y": "6078",\
            "z": "2",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "128,0"]\
            ]\
        },\
        {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5374",\
            "y": "6349",\
            "z": "3",\
            "params":\
            [\
                ["LIST#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"],\
                ["NUM#", "weight", "12,0"],\
                ["NUM#", "cap", "2,0"],\
                ["TEXT#", "dashes", "", "center"]\
            ]\
        },\
        {\
            "type": "VPATH",\
            "id": "path2",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5918",\
            "y": "6043",\
            "z": "4",\
            "params":\
            [\
                ["LIST#", "points", "3 PT# 156,0 6,0 PT# 156,0 156,0 PT# 262.06601717798213,9 49.93398282201787,9"],\
                ["NUM#", "degree", "0,0"],\
                ["NUM#", "round", "128,0"]\
            ]\
        },\
        {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6385",\
            "y": "6325",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "centerX", "0,0"],\
                ["NUM#", "centerY", "100,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5036",\
            "y": "6503",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "value", "45,0"],\
                ["NUM#", "operation", "3,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4886",\
            "y": "6585",\
            "z": "7",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "8,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5181",\
            "y": "6508",\
            "z": "8",\
            "params":\
            [\
                ["NUM#", "value", "-45,0"],\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5168",\
            "y": "6108",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "angle", "-45,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4885",\
            "y": "6465",\
            "z": "10",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "360,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5018",\
            "y": "6108",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "y", "-150,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5215",\
            "y": "6369",\
            "z": "12",\
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
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4836",\
            "y": "6263",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "x", "156,0"],\
                ["NUM#", "y", "156,0"]\
            ]\
        },\
        {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5545",\
            "y": "6209",\
            "z": "14",\
            "params":\
            [\
                ["LIST#", "points", "3 PT# 156,0 156,0 PT# 156,0 156,0 PT# 156,0 156,0"],\
                ["NUM#", "degree", "0,0"]\
            ]\
        },\
        {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5759",\
            "y": "6259",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "centerX", "0,0"],\
                ["NUM#", "centerY", "100,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5639",\
            "y": "6537",\
            "z": "16",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "57,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5332",\
            "y": "6221",\
            "z": "17",\
            "width": "120",\
            "height": "64"\
        },\
        {\
            "type": "VPATH",\
            "id": "path3",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6076",\
            "y": "6749",\
            "z": "18",\
            "params":\
            [\
                ["LIST#", "points", "3 PT# 156,0 70.50000000000001,1 PT# 156,0 156,0 PT# 216.45762979144982,10 95.54237020855018,10"],\
                ["NUM#", "degree", "0,0"],\
                ["NUM#", "round", "67,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6235",\
            "y": "6325",\
            "z": "19",\
            "width": "120",\
            "height": "77"\
        },\
        {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5768",\
            "y": "6869",\
            "z": "20",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "67,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6616",\
            "y": "6326",\
            "z": "21",\
            "params":\
            [\
                ["NUM#", "angle", "315,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6763",\
            "y": "6540",\
            "z": "22",\
            "params":\
            [\
                ["NUM#", "count", "8,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "Spider%20web%20icon",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7008",\
            "y": "6537",\
            "z": "23",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "312,0"],\
                ["NUM#", "height", "312,0"],\
                ["NUM#", "round", "156,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6778",\
            "y": "6807.51",\
            "z": "24",\
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
            "type": "NUM",\
            "id": "num6",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4662",\
            "y": "6289",\
            "z": "25",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "156,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6651",\
            "y": "6666",\
            "z": "26",\
            "params":\
            [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "2,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6809",\
            "y": "6686",\
            "z": "27",\
            "params":\
            [\
                ["NUM#", "operation", "3,0"],\
                ["NUM#", "operand", "2,0"]\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
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
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path2",\
            "inputId": "round",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path",\
            "outputId": "props",\
            "outputOrder": "0",\
            "inputNodeId": "path2",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
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
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
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
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "point",\
            "inputId": "y",\
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
            "outputOrder": "1",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path3",\
            "inputId": "round",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path",\
            "outputId": "props",\
            "outputOrder": "1",\
            "inputNodeId": "path3",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "path2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rotate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "count",\
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
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "width",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "frame",\
            "inputId": "height",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "round",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
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
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
        }\
        ]\
    }';