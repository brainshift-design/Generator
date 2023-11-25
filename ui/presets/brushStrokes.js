const presetBrushStrokes = '\
    {\
        "nodes":\
        [\
        {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7712",\
            "y": "7077",\
            "z": "0",\
            "params":\
            [\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "blur", "0,0"],\
                ["FILL#", "fill", "0,0 0,0 0,0 35,0 0,0"],\
                ["NUM#", "behind", "1,0"]\
            ]\
        },\
        {\
            "type": "INSH",\
            "id": "innerShadow2",\
            "name": "inner%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7712",\
            "y": "6888",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "x", "-1,0"],\
                ["NUM#", "y", "-1,0"],\
                ["NUM#", "blur", "2,0"],\
                ["FILL#", "fill", "0,0 0,0 0,0 5,0 0,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7185",\
            "y": "7015",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "seed", "4734,0"],\
                ["NUM#", "max", "600,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "detail", "4,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "4954",\
            "y": "7207",\
            "z": "3",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "35,0"]\
            ]\
        },\
        {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5779",\
            "y": "6952",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "start", "-15,0"],\
                ["NUM#", "end", "15,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5941",\
            "y": "6872",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "x", "15,0"],\
                ["NUM#", "y", "11,0"]\
            ]\
        },\
        {\
            "type": "REVLST",\
            "id": "reverse",\
            "name": "reverse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6278",\
            "y": "6960",\
            "z": "6"\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6607",\
            "y": "6960",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "scaleX", "95,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5444",\
            "y": "6624",\
            "z": "8",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "3,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5617",\
            "y": "6602",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "value", "-3,0"],\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5791",\
            "y": "6556",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "seed", "4921,0"],\
                ["NUM#", "min", "-3,0"],\
                ["NUM#", "max", "3,0"]\
            ]\
        },\
        {\
            "type": "RANGE",\
            "id": "range2",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5793",\
            "y": "6406",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "start", "-15,0"],\
                ["NUM#", "end", "15,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6842",\
            "y": "6551",\
            "z": "12",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "NOISE",\
            "id": "noise6",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6475",\
            "y": "6620",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "seed", "7952,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "7,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise5",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6339",\
            "y": "6620",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "seed", "7722,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "5,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6641",\
            "y": "6635",\
            "z": "15",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "56.38025180247028,0"],\
                ["NUM#", "c2", "38.757193348917994,0"],\
                ["NUM#", "c3", "20.877846590376034,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move3",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7374",\
            "y": "6540",\
            "z": "16",\
            "params":\
            [\
                ["NUM#", "x", "157.4310270647426,0"],\
                ["NUM#", "y", "434.9711263129307,0"]\
            ]\
        },\
        {\
            "type": "RSTX",\
            "id": "reset2",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7749",\
            "y": "6540",\
            "z": "17"\
        },\
        {\
            "type": "NOISE",\
            "id": "noise9",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7547",\
            "y": "7780",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "seed", "8952,0"],\
                ["NUM#", "min", "5,0"],\
                ["NUM#", "max", "95,0"],\
                ["NUM#", "scale", "5,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7815",\
            "y": "7552",\
            "z": "19",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "40.05037320780119,0"],\
                ["NUM#", "c2", "12.298190108173614,0"],\
                ["NUM#", "c3", "68.8223632768832,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num9",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7862",\
            "y": "8375",\
            "z": "20",\
            "width": "120",\
            "height": "54"\
        },\
        {\
            "type": "DEFINE",\
            "id": "define2",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8000",\
            "y": "8342",\
            "z": "21"\
        },\
        {\
            "type": "FILL",\
            "id": "fill3",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7998",\
            "y": "8069",\
            "z": "22",\
            "params":\
            [\
                ["COL#", "color", "1,0 0,0 0,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num7",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7846",\
            "y": "8000",\
            "z": "23",\
            "width": "120",\
            "height": "54"\
        },\
        {\
            "type": "DEFINE",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7984",\
            "y": "7967",\
            "z": "24"\
        },\
        {\
            "type": "REPT",\
            "id": "repeat6",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8150",\
            "y": "7766",\
            "z": "25",\
            "params":\
            [\
                ["NUM#", "count", "400,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8170",\
            "y": "7562",\
            "z": "26",\
            "width": "120",\
            "height": "64"\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8470",\
            "y": "7208",\
            "z": "27",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "400,0"],\
                ["NUM#", "height", "600,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6100",\
            "y": "6323",\
            "z": "28",\
            "params":\
            [\
                ["NUM#", "count", "40,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7714",\
            "y": "7364",\
            "z": "29",\
            "width": "62.174222782259434",\
            "height": "142"\
        },\
        {\
            "type": "INSH",\
            "id": "innerShadow",\
            "name": "inner%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7710",\
            "y": "6693",\
            "z": "30",\
            "params":\
            [\
                ["NUM#", "x", "-1,0"],\
                ["NUM#", "y", "1,0"],\
                ["NUM#", "blur", "2,0"],\
                ["FILL#", "fill", "255,0 255,0 255,0 10,0 0,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine4",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7863",\
            "y": "6810",\
            "z": "31",\
            "width": "76.61290503628408",\
            "height": "64"\
        },\
        {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7186",\
            "y": "6806",\
            "z": "32",\
            "params":\
            [\
                ["NUM#", "seed", "4645,0"],\
                ["NUM#", "max", "400,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "detail", "4,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5274",\
            "y": "7188",\
            "z": "33",\
            "params":\
            [\
                ["NUM#", "seed", "4919,0"],\
                ["NUM#", "min", "-35,0"],\
                ["NUM#", "max", "35,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6207",\
            "y": "6619",\
            "z": "34",\
            "params":\
            [\
                ["NUM#", "seed", "2689,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5432",\
            "y": "7188",\
            "z": "35",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "-16,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7361",\
            "y": "6810",\
            "z": "36",\
            "params":\
            [\
                ["NUM#", "seed", "1708,0"],\
                ["NUM#", "min", "-2,0"],\
                ["NUM#", "max", "2,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num8",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7862",\
            "y": "8307",\
            "z": "37",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "20,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5605",\
            "y": "7166",\
            "z": "38",\
            "params":\
            [\
                ["NUM#", "value", "16,0"],\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7104",\
            "y": "6531",\
            "z": "39",\
            "params":\
            [\
                ["LIST#", "points", "80 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 -89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0 PT# 0,0 89.99543067229081,0"],\
                ["NUM#", "closed", "1,0"],\
                ["NUM#", "degree", "0,0"]\
            ]\
        },\
        {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4850",\
            "y": "6647",\
            "z": "40",\
            "width": "120",\
            "height": "384",\
            "params":\
            [\
                ["NUM#", "0", "4921,0"],\
                ["NUM#", "1", "2016,0"],\
                ["NUM#", "2", "4645,0"],\
                ["NUM#", "3", "4734,0"],\
                ["NUM#", "4", "2689,0"],\
                ["NUM#", "5", "7722,0"],\
                ["NUM#", "6", "7952,0"],\
                ["NUM#", "7", "9964,0"],\
                ["NUM#", "8", "469,0"],\
                ["NUM#", "9", "8952,0"],\
                ["NUM#", "10", "7198,0"],\
                ["NUM#", "11", "2046,0"],\
                ["NUM#", "12", "4919,0"],\
                ["NUM#", "13", "7804,0"],\
                ["NUM#", "14", "9902,0"],\
                ["NUM#", "15", "3072,0"]\
            ]\
        },\
        {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5654",\
            "y": "6855",\
            "z": "41",\
            "params":\
            [\
                ["NUM#", "y", "89.99543067229081,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6314",\
            "y": "7159",\
            "z": "42",\
            "params":\
            [\
                ["NUM#", "seed", "7804,0"],\
                ["NUM#", "min", "70,0"],\
                ["NUM#", "max", "95,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "5009",\
            "y": "6381",\
            "z": "43",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "10,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise8",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7415",\
            "y": "7779",\
            "z": "44",\
            "params":\
            [\
                ["NUM#", "seed", "469,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math5",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5162",\
            "y": "6313",\
            "z": "45",\
            "params":\
            [\
                ["NUM#", "value", "-10,0"],\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise7",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5323",\
            "y": "6899",\
            "z": "46",\
            "params":\
            [\
                ["NUM#", "seed", "9964,0"],\
                ["NUM#", "min", "30,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5536",\
            "y": "6398",\
            "z": "47",\
            "params":\
            [\
                ["NUM#", "value", "-89.99543067229081,0"],\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7489",\
            "y": "6692",\
            "z": "48",\
            "params":\
            [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "90,0"]\
            ]\
        },\
        {\
            "type": "GRAD",\
            "id": "grad3",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8311",\
            "y": "8009",\
            "z": "49",\
            "params":\
            [\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "angle", "90,0"],\
                ["NUM#", "blend", "2,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6776",\
            "y": "7059",\
            "z": "50",\
            "params":\
            [\
                ["COL#", "color", "1,0 74,0 71,0 33,0"],\
                ["NUM#", "opacity", "83.72225438548938,0"]\
            ]\
        },\
        {\
            "type": "APPLY",\
            "id": "apply",\
            "name": "apply",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7899",\
            "y": "6540",\
            "z": "51",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "6927",\
            "y": "6718",\
            "z": "52",\
            "params":\
            [\
                ["NUM#", "y", "100,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4698",\
            "y": "6798",\
            "z": "53",\
            "params":\
            [\
                ["NUM#", "count", "16,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat7",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8166",\
            "y": "8141",\
            "z": "54",\
            "params":\
            [\
                ["NUM#", "count", "800,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7834",\
            "y": "7707",\
            "z": "55",\
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
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "4658",\
            "y": "6615",\
            "z": "56",\
            "width": "347",\
            "height": "444.2434882662275",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8006",\
            "y": "7630",\
            "z": "57",\
            "params":\
            [\
                ["COL#", "color", "1,0 0,0 0,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise11",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6648",\
            "y": "7214",\
            "z": "58",\
            "params":\
            [\
                ["NUM#", "seed", "9902,0"],\
                ["NUM#", "min", "75,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "detail", "4,0"]\
            ]\
        },\
        {\
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8311",\
            "y": "7771",\
            "z": "59",\
            "params":\
            [\
                ["NUM#", "blend", "2,0"]\
            ]\
        },\
        {\
            "type": "RSTX",\
            "id": "reset",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6438",\
            "y": "6960",\
            "z": "60"\
        },\
        {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5793",\
            "y": "6323",\
            "z": "61",\
            "params":\
            [\
                ["NUM#", "y", "-89.99543067229081,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6117",\
            "y": "6957",\
            "z": "62",\
            "params":\
            [\
                ["NUM#", "count", "40,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise10",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7683",\
            "y": "7780",\
            "z": "63",\
            "params":\
            [\
                ["NUM#", "seed", "7198,0"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "95,0"],\
                ["NUM#", "scale", "7,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat5",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6931",\
            "y": "7151",\
            "z": "64",\
            "params":\
            [\
                ["NUM#", "count", "30,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "5377",\
            "y": "6533",\
            "z": "65",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "15,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math6",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5556",\
            "y": "6477",\
            "z": "66",\
            "params":\
            [\
                ["NUM#", "value", "-15,0"],\
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
            "x": "7599",\
            "y": "6540",\
            "z": "67",\
            "params":\
            [\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5782",\
            "y": "7123",\
            "z": "68",\
            "params":\
            [\
                ["NUM#", "seed", "2016,0"],\
                ["NUM#", "min", "16,0"],\
                ["NUM#", "max", "-16,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num6",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7846",\
            "y": "7932",\
            "z": "69",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "20,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5289",\
            "y": "6629",\
            "z": "70",\
            "params":\
            [\
                ["NUM#", "seed", "2046,0"],\
                ["NUM#", "min", "-10,0"],\
                ["NUM#", "max", "10,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5943",\
            "y": "6323",\
            "z": "71",\
            "params":\
            [\
                ["NUM#", "x", "15,0"],\
                ["NUM#", "y", "-1,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "4698",\
            "y": "6657",\
            "z": "72",\
            "params":\
            [\
                ["NUM#", "seed", "2206,0"],\
                ["NUM#", "max", "10000,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math7",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5106",\
            "y": "7139",\
            "z": "73",\
            "params":\
            [\
                ["NUM#", "value", "-35,0"],\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat4",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "8215",\
            "y": "7347",\
            "z": "74",\
            "params":\
            [\
                ["NUM#", "count", "200,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "4374",\
            "y": "7421",\
            "z": "75",\
            "params":\
            [\
                ["NUM#", "start", "2056,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4698",\
            "y": "6915",\
            "z": "76"\
        },\
        {\
            "type": "ROUND",\
            "id": "round",\
            "name": "round",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7512",\
            "y": "6809",\
            "z": "77",\
            "active": "true"\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "4",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range2",\
            "outputId": "start",\
            "outputOrder": "0",\
            "inputNodeId": "range",\
            "inputId": "start",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range2",\
            "outputId": "end",\
            "outputOrder": "0",\
            "inputNodeId": "range",\
            "inputId": "end",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "reverse",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "reset",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "num",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "4",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "range2",\
            "inputId": "start",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "range2",\
            "inputId": "end",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "4",\
            "inputNodeId": "noise6",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "4",\
            "inputNodeId": "noise5",\
            "inputId": "seed",\
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
            "outputNodeId": "noise5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "reset2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "9",\
            "outputOrder": "3",\
            "inputNodeId": "noise9",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "define2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "fill3",\
            "inputId": "opacity",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat6",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat6",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "grad2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "grad3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "true"\
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
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h4",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h5",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h6",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise7",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine2",\
            "inputId": "h7",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h8",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "innerShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine4",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "innerShadow2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine4",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "dropShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine4",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "4",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "12",\
            "outputOrder": "3",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random4",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "random4",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "4",\
            "inputNodeId": "noise4",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "num2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
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
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "freeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "noise7",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "point2",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "13",\
            "outputOrder": "2",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "8",\
            "outputOrder": "3",\
            "inputNodeId": "noise8",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math5",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "7",\
            "outputOrder": "4",\
            "inputNodeId": "noise7",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "round",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad3",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "grad2",\
            "outputId": "blend",\
            "outputOrder": "0",\
            "inputNodeId": "grad3",\
            "inputId": "blend",\
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
            "outputNodeId": "noise11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "opacity",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "reset2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "repeat5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "grad",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat7",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "define2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat7",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "opacity",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "14",\
            "outputOrder": "2",\
            "inputNodeId": "noise11",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "reverse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "reset",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "y",\
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
            "outputNodeId": "repeat",\
            "outputId": "count",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "count",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range",\
            "outputId": "end",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "10",\
            "outputOrder": "3",\
            "inputNodeId": "noise10",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat5",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise11",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat5",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math6",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "4",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "11",\
            "outputOrder": "3",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random5",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "random5",\
            "inputId": "max",\
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
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math7",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "apply",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "loop",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "round",\
            "inputId": "h0",\
            "list": "false"\
        }\
        ]\
    }';