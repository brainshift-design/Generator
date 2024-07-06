const presetArcSunset = '\
{\
    "generatorVersion": "437",\
    "nodes":\
    [\
        {\
        "type": "ELPS",\
        "created": "1712921789207",\
        "updated": "1712925941075",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "610",\
        "y": "1519",\
        "z": "0",\
        "innerAbsolute": "true",\
        "sweepInDegrees": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "width", "180,0"],\
                ["NUM#", "height", "180,0"],\
                ["NUM#", "inner", "100,0"],\
                ["NUM#", "start", "354.98116051243403,0"],\
                ["NUM#", "sweep", "5.018839487565939,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1711715435817",\
        "updated": "1712925941075",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "39",\
        "y": "1749",\
        "z": "1",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "289.6021147123346,0"],\
                ["NUM#", "c2", "82.65877772480889,0"],\
                ["NUM#", "c3", "16.69182808286575,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1712921885196",\
        "updated": "1712925941075",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-237",\
        "y": "2107",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "seed", "5011,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "50,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1712921902906",\
        "updated": "1712925941075",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-77",\
        "y": "2107",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "count", "18,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1712921905513",\
        "updated": "1712925941075",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-75",\
        "y": "2251",\
        "z": "4"\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1712921919942",\
        "updated": "1712925941075",\
        "id": "select",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "119",\
        "y": "2109",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "index", "17,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1712921931976",\
        "updated": "1712925941075",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "125",\
        "y": "2254",\
        "z": "6"\
        },\
        {\
        "type": "MATH",\
        "created": "1712921941704",\
        "updated": "1712925941075",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "288",\
        "y": "2169",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1712921953328",\
        "updated": "1712925941075",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "454",\
        "y": "2173",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "90,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1712921988661",\
        "updated": "1712925941075",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "928",\
        "y": "2433",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "count", "18,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "ACCUM",\
        "created": "1712922009204",\
        "updated": "1712925941075",\
        "id": "accum",\
        "name": "accumulate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "420",\
        "y": "1873",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "when", "1,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1712922098741",\
        "updated": "1712925941075",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-91",\
        "y": "2521",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1712922173094",\
        "updated": "1712925941075",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "305",\
        "y": "2704",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1712922192045",\
        "updated": "1712925941075",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "512",\
        "y": "2710",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "operand", "10,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1712922233453",\
        "updated": "1712925941075",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "5",\
        "notCondition": "false",\
        "x": "1119",\
        "y": "2624",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "count", "18,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1712922282391",\
        "updated": "1712925941075",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "858.184",\
        "y": "2697.1",\
        "z": "15",\
        "width": "120",\
        "height": "77"\
        },\
        {\
        "type": "SEQ",\
        "created": "1712922331519",\
        "updated": "1712925941075",\
        "id": "sequence3",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-270",\
        "y": "2718",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "start", "1,0"],\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1712922428328",\
        "updated": "1720262856187",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1637",\
        "y": "2817",\
        "z": "17",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "-150,0"],\
                ["NUM#", "y", "-100,0"],\
                ["NUM#", "width", "300,0"],\
                ["NUM#", "height", "200,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1712922452298",\
        "updated": "1712925941075",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1461",\
        "y": "3019",\
        "z": "18",\
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
        "type": "CMB",\
        "created": "1712922887855",\
        "updated": "1712925941075",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "702.686",\
        "y": "2525.16",\
        "z": "19",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "REPT",\
        "created": "1712922929926",\
        "updated": "1712925941075",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1292",\
        "y": "2833",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "count", "4,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1712923123604",\
        "updated": "1712925941075",\
        "id": "sequence4",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-41",\
        "y": "2920",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "add", "90,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1712923155444",\
        "updated": "1712925941075",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "574",\
        "y": "1944",\
        "z": "22"\
        },\
        {\
        "type": "SEQ",\
        "created": "1712923333508",\
        "updated": "1712925941075",\
        "id": "sequence5",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "1",\
        "notCondition": "false",\
        "x": "-815",\
        "y": "2633",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "start", "95,0"],\
                ["NUM#", "add", "-5,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1712923434233",\
        "updated": "1712925941075",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1115.24",\
        "y": "2916.51",\
        "z": "24",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "NOISE",\
        "created": "1712923483215",\
        "updated": "1712925941075",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-799",\
        "y": "3333",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "seed", "1704,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-10,0"],\
                ["NUM#", "max", "10,0"],\
                ["NUM#", "scale", "3,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1712923671327",\
        "updated": "1712925941075",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-525",\
        "y": "3207",\
        "z": "26"\
        },\
        {\
        "type": "NOISE",\
        "created": "1712923483215",\
        "updated": "1712925941075",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-803",\
        "y": "2799",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "seed", "9197,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-10,0"],\
                ["NUM#", "max", "10,0"],\
                ["NUM#", "scale", "3,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1712923721384",\
        "updated": "1712925941075",\
        "id": "math7",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-643",\
        "y": "2717",\
        "z": "28"\
        },\
        {\
        "type": "NOISE",\
        "created": "1712923483215",\
        "updated": "1712925941075",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-477",\
        "y": "1779",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "seed", "8330,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "70,0"],\
                ["NUM#", "scale", "3,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1712925445929",\
        "updated": "1712925941075",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-979.2",\
        "y": "3060.18",\
        "z": "30",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "5,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1712925445929",\
        "updated": "1712925941075",\
        "id": "num2",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-972.2",\
        "y": "3134.18",\
        "z": "31",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "20,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1712925445929",\
        "updated": "1712925941075",\
        "id": "num3",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-978.2",\
        "y": "3215.18",\
        "z": "32",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "330,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1712925445929",\
        "updated": "1712925941075",\
        "id": "num4",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-989.2",\
        "y": "3303.18",\
        "z": "33",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "290,0"]\
        ]\
        },\
        {\
        "type": "ITER",\
        "created": "1712925471832",\
        "updated": "1712925941075",\
        "id": "iterate",\
        "name": "iterate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-812",\
        "y": "3178",\
        "z": "34"\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1712925941081",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1712925941081",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1712925941080",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "inner",\
        "list": "false"\
        },\
        {\
        "created": "1712925941086",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1712925941079",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "sweep",\
        "list": "false"\
        },\
        {\
        "created": "1712925941076",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1712925941088",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941089",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1712925941089",\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1712925941076",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941083",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1712925941077",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1712925941077",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1712925941080",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1712925941077",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1712925941078",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941078",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941078",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941079",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941079",\
        "outputNodeId": "repeat",\
        "outputId": "count",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1712925941085",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1712925941080",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "accum",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941080",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941081",\
        "outputNodeId": "sequence2",\
        "outputId": "add",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1712925941081",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1712925941083",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1712925941082",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1712925941083",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941084",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1712925941087",\
        "outputNodeId": "sequence5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1712925941085",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1712925941084",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1712925941084",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941085",\
        "outputNodeId": "accum",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941085",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1712925941087",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1712925941086",\
        "outputNodeId": "accum",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941086",\
        "outputNodeId": "sequence4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941087",\
        "outputNodeId": "sequence4",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941091",\
        "outputNodeId": "iterate",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941088",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941090",\
        "outputNodeId": "iterate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math6",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941088",\
        "outputNodeId": "sequence5",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941088",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math7",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941089",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1712925941090",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1712925941090",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1712925941090",\
        "outputNodeId": "num4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate",\
        "inputId": "h3",\
        "list": "false"\
        }\
    ]\
}';