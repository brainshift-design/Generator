const presetTwistedTower = '\
    {\
        "nodes":\
        [\
        {\
            "type": "CMB",\
            "id": "combine9",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6676",\
            "y": "5880",\
            "z": "0",\
            "width": "120",\
            "height": "64"\
        },\
        {\
            "type": "MATH",\
            "id": "math5",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5928",\
            "y": "5948",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence4",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6085",\
            "y": "5880",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "add", "-10,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5137",\
            "y": "4506",\
            "z": "3",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "200,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "100,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine6",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5298",\
            "y": "4562",\
            "z": "4",\
            "width": "60",\
            "height": "51"\
        },\
        {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3494",\
            "y": "4595",\
            "z": "5"\
        },\
        {\
            "type": "MOVE",\
            "id": "move6",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3659",\
            "y": "4595",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "x", "200,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4706",\
            "y": "4693",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "scaleY", "39,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color7",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4987",\
            "y": "4677",\
            "z": "8",\
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
            "type": "RANGE",\
            "id": "range3",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4227",\
            "y": "5876",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "end", "90,0"],\
                ["NUM#", "spread", "25,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move5",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5186",\
            "y": "5060",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "y", "10,0"]\
            ]\
        },\
        {\
            "type": "RANGE",\
            "id": "range4",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3851",\
            "y": "4760",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
            ]\
        },\
        {\
            "type": "VPATH",\
            "id": "path3",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5907",\
            "y": "5522",\
            "z": "12",\
            "params":\
            [\
                ["LIST#", "points", "4 PT# 0,0 78,0 PT# 200,0 0,0 PT# 200,0 10,0 PT# 0,0 88,0"],\
                ["NUM#", "closed", "1,0"],\
                ["NUM#", "degree", "0,0"]\
            ]\
        },\
        {\
            "type": "STRK",\
            "id": "stroke2",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5136",\
            "y": "4651",\
            "z": "13",\
            "params":\
            [\
                ["LIST#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"],\
                ["TEXT#", "dashes", "", "center"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move8",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4909",\
            "y": "5054",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "y", "10,0"]\
            ]\
        },\
        {\
            "type": "SEL",\
            "id": "select4",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5185",\
            "y": "4973",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "index", "0,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat4",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6899",\
            "y": "5818",\
            "z": "16",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "count", "40,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math6",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5046",\
            "y": "5001",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "operand", "1,0"]\
            ]\
        },\
        {\
            "type": "VPATH",\
            "id": "path5",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5581",\
            "y": "5050",\
            "z": "18",\
            "params":\
            [\
                ["LIST#", "points", "4 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0"],\
                ["NUM#", "closed", "1,0"],\
                ["NUM#", "degree", "0,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat6",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4204",\
            "y": "4691",\
            "z": "19",\
            "params":\
            [\
                ["NUM#", "count", "4,0"]\
            ]\
        },\
        {\
            "type": "RSTX",\
            "id": "reset2",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4354",\
            "y": "4691",\
            "z": "20"\
        },\
        {\
            "type": "ROT",\
            "id": "rotate3",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4030",\
            "y": "4594",\
            "z": "21",\
            "params":\
            [\
                ["NUM#", "angle", "270,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move7",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6511",\
            "y": "5397",\
            "z": "22",\
            "params":\
            [\
                ["NUM#", "y", "-390,0"]\
            ]\
        },\
        {\
            "type": "SORT",\
            "id": "sort2",\
            "name": "sort",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6208",\
            "y": "5387",\
            "z": "23",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat5",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5742",\
            "y": "5385",\
            "z": "24",\
            "params":\
            [\
                ["NUM#", "count", "4,0"]\
            ]\
        },\
        {\
            "type": "GETP",\
            "type": "GETP",\
            "id": "getParam",\
            "name": "get%20param",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6042",\
            "y": "5546",\
            "z": "25",\
            "width": "120",\
            "height": "54",\
            "_connected": "false",\
            "params":\
            [\
                ["TEXT#", "name", "y", "left"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine10",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6348",\
            "y": "5099",\
            "z": "26",\
            "width": "126.4039819059024",\
            "height": "51"\
        },\
        {\
            "type": "MINMAX",\
            "id": "minmax",\
            "name": "min%2Fmax",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6042",\
            "y": "5607",\
            "z": "27"\
        },\
        {\
            "type": "CMB",\
            "id": "combine7",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5378",\
            "y": "5055",\
            "z": "28",\
            "width": "120",\
            "height": "77"\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4654",\
            "y": "5470",\
            "z": "29",\
            "params":\
            [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "SEL",\
            "id": "select3",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4909",\
            "y": "4972",\
            "z": "30",\
            "params":\
            [\
                ["NUM#", "index", "3,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate4",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4533",\
            "y": "4692",\
            "z": "31",\
            "params":\
            [\
                ["NUM#", "angle", "90,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5325",\
            "y": "5309",\
            "z": "32",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "200,0"],\
                ["NUM#", "c2", "50,0"],\
                ["NUM#", "c3", "94,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine8",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5478",\
            "y": "5312",\
            "z": "33",\
            "width": "60",\
            "height": "51"\
        },\
        {\
            "type": "VPATH",\
            "id": "path4",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5404",\
            "y": "4432",\
            "z": "34",\
            "params":\
            [\
                ["LIST#", "points", "4 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0"],\
                ["NUM#", "closed", "1,0"],\
                ["NUM#", "degree", "0,0"]\
            ]\
        },\
        {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4801",\
            "y": "5723",\
            "z": "35",\
            "params":\
            [\
                ["NUM#", "start", "10,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color8",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5011",\
            "y": "5307",\
            "z": "36",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "200,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "100,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5168",\
            "y": "5486.55",\
            "z": "37",\
            "params":\
            [\
                ["NUM#", "operation", "0,0"],\
                ["NUM#", "operand", "6,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5167",\
            "y": "5376",\
            "z": "38",\
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
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine9",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine9",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine9",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move8",\
            "outputId": "y",\
            "outputOrder": "1",\
            "inputNodeId": "math5",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence4",\
            "inputId": "add",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "stroke2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move6",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rotate4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "select4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move5",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move8",\
            "outputId": "y",\
            "outputOrder": "0",\
            "inputNodeId": "move5",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke2",\
            "inputId": "fills",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "select3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move8",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "select4",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "math6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select4",\
            "inputId": "index",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "loop",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "select3",\
            "outputId": "index",\
            "outputOrder": "0",\
            "inputNodeId": "math6",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path5",\
            "inputId": "points",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path5",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "rotate3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat6",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat6",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "reset2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "move6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate3",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move7",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move7",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sort2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "minmax",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sort2",\
            "inputId": "condition",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat5",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat5",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path3",\
            "outputId": "points",\
            "outputOrder": "0",\
            "inputNodeId": "getParam",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sort2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine10",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "path4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine10",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "getParam",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "minmax",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "select3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine7",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "select4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine7",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine7",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine7",\
            "inputId": "h3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select3",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select3",\
            "inputId": "index",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "reset2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate4",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "range3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate4",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color6",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color8",\
            "outputId": "space",\
            "outputOrder": "0",\
            "inputNodeId": "color6",\
            "inputId": "space",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color6",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color6",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine8",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "stroke2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine8",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "path4",\
            "inputId": "points",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path4",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "color8",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color8",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color8",\
            "outputId": "c2",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
        }\
        ]\
    }';