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
            "x": "6476",\
            "y": "5680",\
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
            "x": "5728",\
            "y": "5748",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "value", "-10,0"],\
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
            "x": "5885",\
            "y": "5680",\
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
            "x": "4937",\
            "y": "4306",\
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
            "x": "5098",\
            "y": "4362",\
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
            "x": "3294",\
            "y": "4395",\
            "z": "5"\
            },\
            {\
            "type": "MOVE",\
            "id": "move6",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3459",\
            "y": "4395",\
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
            "x": "4506",\
            "y": "4493",\
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
            "x": "4787",\
            "y": "4477",\
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
            "x": "4027",\
            "y": "5676",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "end", "90,0"],\
                    ["NUM#", "spread", "2,0"],\
                    ["NUM#", "bias", "25,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move5",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4986",\
            "y": "4860",\
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
            "x": "3651",\
            "y": "4560",\
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
            "x": "5707",\
            "y": "5322",\
            "z": "12",\
            "params":\
            [\
                    ["LIST#", "points", "4 PT# 200,0 0,0 PT# 0,0 -78,0 PT# 0,0 -68,0 PT# 200,0 10,0"],\
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
            "x": "4936",\
            "y": "4451",\
            "z": "13",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move8",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4709",\
            "y": "4854",\
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
            "x": "4985",\
            "y": "4773",\
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
            "x": "6699",\
            "y": "5618",\
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
            "x": "4846",\
            "y": "4801",\
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
            "x": "5381",\
            "y": "4850",\
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
            "x": "4004",\
            "y": "4491",\
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
            "x": "4154",\
            "y": "4491",\
            "z": "20"\
            },\
            {\
            "type": "ROT",\
            "id": "rotate3",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3830",\
            "y": "4394",\
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
            "x": "6311",\
            "y": "5197",\
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
            "x": "6008",\
            "y": "5187",\
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
            "x": "5542",\
            "y": "5185",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "count", "4,0"]\
            ]\
            },\
            {\
            "type": "EXTRP",\
            "id": "extractParam",\
            "name": "extract%20value",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5842",\
            "y": "5346",\
            "z": "25",\
            "_connected": "false",\
            "params":\
            [\
                    ["TEXT#", "name", "y", "center"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine10",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6148",\
            "y": "4899",\
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
            "x": "5842",\
            "y": "5407",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "value", "-78,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine7",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5178",\
            "y": "4855",\
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
            "x": "4454",\
            "y": "5270",\
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
            "x": "4709",\
            "y": "4772",\
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
            "x": "4333",\
            "y": "4492",\
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
            "x": "5125",\
            "y": "5109",\
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
            "x": "5278",\
            "y": "5112",\
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
            "x": "5204",\
            "y": "4232",\
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
            "x": "4601",\
            "y": "5523",\
            "z": "35",\
            "active": "true",\
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
            "x": "4811",\
            "y": "5107",\
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
            "x": "4968",\
            "y": "5270",\
            "z": "37",\
            "active": "true",\
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
            "x": "4967",\
            "y": "5176",\
            "z": "38",\
            "active": "true",\
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
            "inputId": "order",\
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
            "inputNodeId": "extractParam",\
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
            "outputNodeId": "extractParam",\
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