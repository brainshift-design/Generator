const presetTreeRings = '\
{\
    "generatorVersion": "410",\
    "nodes":\
    [\
        {\
        "type": "VPATH",\
        "created": "1713433283925",\
        "updated": "1713442007056",\
        "id": "path",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8856",\
        "y": "8456",\
        "z": "0",\
        "params":\
        [\
                ["LIST#", "points", "20 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0 PT# 62.596017652827655,0 0,0"],\
                ["NUM#", "closed", "1,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1713444409440",\
        "updated": "1713444566730",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8235",\
        "y": "9245",\
        "z": "1",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "25,0"],\
                ["NUM#", "c2", "80,0"],\
                ["NUM#", "c3", "57,0"]\
        ]\
        },\
        {\
        "type": "ITER",\
        "created": "1713441984662",\
        "updated": "1713442007056",\
        "id": "iterate2",\
        "name": "iterate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8075",\
        "y": "9245",\
        "z": "2"\
        },\
        {\
        "type": "SMINMAX",\
        "created": "1713444718772",\
        "updated": "1713444718777",\
        "id": "minmax",\
        "name": "min%2Fmax",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8518",\
        "y": "9352",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "operand", "15,0"],\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1713433171281",\
        "updated": "1713442433009",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7908",\
        "y": "8483",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "count", "20,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1713433185915",\
        "updated": "1713433989457",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7711",\
        "y": "8331",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "moveType", "1,0"],\
                ["NUM#", "x", "5.201038614988782,9"],\
                ["NUM#", "y", "342,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1713433155446",\
        "updated": "1713433211786",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7452",\
        "y": "8248",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "x", "62.596017652827655,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1713433980083",\
        "updated": "1713433989457",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7523",\
        "y": "8372",\
        "z": "7"\
        },\
        {\
        "type": "BUKLST",\
        "created": "1713433313143",\
        "updated": "1713443548387",\
        "id": "blendEdges",\
        "name": "blend%20edges",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7140",\
        "y": "8361",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "amount", "10,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713442588783",\
        "updated": "1713442810808",\
        "id": "range8",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6702",\
        "y": "8861",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "start", "15,0"],\
                ["NUM#", "end", "3,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713437626246",\
        "updated": "1713441901092",\
        "id": "range3",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6510",\
        "y": "9028",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "end", "5,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1713434078924",\
        "updated": "1713444601285",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8236.96",\
        "y": "8866.58",\
        "z": "11",\
        "width": "112.42420507885642",\
        "height": "129"\
        },\
        {\
        "type": "NOISE",\
        "created": "1713433117226",\
        "updated": "1713442810808",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6652",\
        "y": "8361",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "seed", "1889,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "5,0"],\
                ["NUM#", "scale", "3,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "5,0"],\
                ["NUM#", "detail", "3,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1713433997921",\
        "updated": "1713961299527",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9126",\
        "y": "8832",\
        "z": "13",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "count", "100,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "ITER",\
        "created": "1713433164316",\
        "updated": "1713434871939",\
        "id": "iterate",\
        "name": "iterate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7321",\
        "y": "8367",\
        "z": "14"\
        },\
        {\
        "type": "REPT",\
        "created": "1713441980677",\
        "updated": "1713442082655",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7727",\
        "y": "9242",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "count", "4,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713442035317",\
        "updated": "1713442082655",\
        "id": "range4",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7357",\
        "y": "9349",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "start", "25,0"],\
                ["NUM#", "end", "57,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713434073232",\
        "updated": "1713441901092",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6524",\
        "y": "8903",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "start", "25,0"],\
                ["NUM#", "end", "5,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713434073232",\
        "updated": "1713442544846",\
        "id": "range6",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6516",\
        "y": "8775",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "start", "5,0"],\
                ["NUM#", "end", "3,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1713433120780",\
        "updated": "1713442429045",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6812",\
        "y": "8361",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "count", "20,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713433216696",\
        "updated": "1713433239441",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7382",\
        "y": "8577",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1713444578359",\
        "updated": "1713444601285",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8180",\
        "y": "9440",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "seed", "4700,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-22,0"],\
                ["NUM#", "max", "8,0"],\
                ["NUM#", "scale", "13,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713442588783",\
        "updated": "1713442601395",\
        "id": "range7",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6698",\
        "y": "8730",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "start", "100,0"],\
                ["NUM#", "end", "20,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1713444563138",\
        "updated": "1713444589035",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8377",\
        "y": "9342",\
        "z": "23"\
        },\
        {\
        "type": "NUM",\
        "created": "1713442425924",\
        "updated": "1713442594400",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6826.36",\
        "y": "8634.78",\
        "z": "24",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "20,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1713433220622",\
        "updated": "1713438446698",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7601.47",\
        "y": "8579",\
        "z": "25",\
        "width": "111.52526497371453",\
        "height": "64"\
        },\
        {\
        "type": "RANGE",\
        "created": "1713442035317",\
        "updated": "1713442085940",\
        "id": "range5",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7353",\
        "y": "9225",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "start", "100,0"],\
                ["NUM#", "end", "80,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1713433954433",\
        "updated": "1713434088784",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7161",\
        "y": "8898",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "start", "200,0"],\
                ["NUM#", "add", "-1.9999999999999991,1"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1713437928288",\
        "updated": "1713441884771",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6972",\
        "y": "8361",\
        "z": "28"\
        },\
        {\
        "type": "COL",\
        "created": "1713444411955",\
        "updated": "1713444568210",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8667",\
        "y": "9251",\
        "z": "29",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "25,0"],\
                ["NUM#", "c2", "80,0"],\
                ["NUM#", "c3", "50.75721639273659,10"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1713441968884",\
        "updated": "1713442085940",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7552",\
        "y": "9113",\
        "z": "30",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "25,0"],\
                ["NUM#", "c2", "80,0"],\
                ["NUM#", "c3", "57,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1713441982212",\
        "updated": "1713441982234",\
        "id": "cache2",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7915",\
        "y": "9245",\
        "z": "31"\
        },\
        {\
        "type": "CMB",\
        "created": "1713442076340",\
        "updated": "1713442082655",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7538.14",\
        "y": "9331.16",\
        "z": "32",\
        "width": "120",\
        "height": "51"\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1713433286832",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1713444411964",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1713444409445",\
        "outputNodeId": "iterate2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713441984667",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713444718775",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "minmax",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713433185922",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713442433009",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1713433224637",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1713433208346",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713433989457",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1713433239441",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1713433980085",\
        "outputNodeId": "iterate",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713433980086",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713437928294",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "blendEdges",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713434078925",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713434078926",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713437643216",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1713441825794",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h3",\
        "list": "true"\
        },\
        {\
        "created": "1713442544845",\
        "outputNodeId": "range6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1713442601394",\
        "outputNodeId": "range7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h5",\
        "list": "false"\
        },\
        {\
        "created": "1713442795604",\
        "outputNodeId": "range8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h6",\
        "list": "false"\
        },\
        {\
        "created": "1713444601284",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h7",\
        "list": "false"\
        },\
        {\
        "created": "1713434679413",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1713442810807",\
        "outputNodeId": "range8",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "scale",\
        "list": "false"\
        },\
        {\
        "created": "1713437652204",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "evolve",\
        "list": "false"\
        },\
        {\
        "created": "1713442538780",\
        "outputNodeId": "range6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "detail",\
        "list": "false"\
        },\
        {\
        "created": "1713433997925",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713434088784",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1713433313149",\
        "outputNodeId": "blendEdges",\
        "outputId": "h1",\
        "outputOrder": "1",\
        "inputNodeId": "iterate",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713441980693",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713442082655",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1713433120783",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713442429045",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1713441901091",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1713444566729",\
        "outputNodeId": "color",\
        "outputId": "c3",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713444589035",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713442594399",\
        "outputNodeId": "range7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "num",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713433220624",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713434871938",\
        "outputNodeId": "iterate",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713438446697",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1713437928292",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713444411962",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713444718777",\
        "outputNodeId": "minmax",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color3",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1713442085939",\
        "outputNodeId": "range5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "color2",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1713442037362",\
        "outputNodeId": "range4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1713441982217",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713442076342",\
        "outputNodeId": "range5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713442076342",\
        "outputNodeId": "range4",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
}';