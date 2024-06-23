const presetGlitterField = '\
{\
    "generatorVersion": "434",\
    "nodes":\
    [\
        {\
        "type": "WAVE",\
        "created": "1715968167542",\
        "updated": "1715970645337",\
        "id": "wave2",\
        "name": "wave",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-1150",\
        "y": "462",\
        "z": "0",\
        "useWavelength": "false",\
        "offsetAbsolute": "false",\
        "params":\
        [\
                ["NUM#", "base", "3,0"],\
                ["NUM#", "amplitude", "400,0"],\
                ["NUM#", "frequency", "0.5,1"]\
        ]\
        },\
        {\
        "type": "WAVE",\
        "created": "1715968167542",\
        "updated": "1715968209597",\
        "id": "wave",\
        "name": "wave",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-1159",\
        "y": "1206",\
        "z": "1",\
        "useWavelength": "false",\
        "offsetAbsolute": "false",\
        "params":\
        [\
                ["NUM#", "base", "4,0"],\
                ["NUM#", "amplitude", "-4,0"],\
                ["NUM#", "frequency", "0.5,1"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1715967134675",\
        "updated": "1716897541797",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1221",\
        "y": "2192",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "count", "40,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "RECT",\
        "created": "1715967965580",\
        "updated": "1715967977294",\
        "id": "rect",\
        "name": "rectangle",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1624",\
        "y": "2055",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "width", "1920,0"],\
                ["NUM#", "height", "1080,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1715967051946",\
        "updated": "1715967713035",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-312",\
        "y": "1462",\
        "z": "4"\
        },\
        {\
        "type": "NUM",\
        "created": "1715966932043",\
        "updated": "1715967093985",\
        "id": "num5",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-733.626",\
        "y": "1662.57",\
        "z": "5",\
        "width": "120",\
        "height": "54"\
        },\
        {\
        "type": "NUM",\
        "created": "1715966496222",\
        "updated": "1715968192262",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-760",\
        "y": "1048.41",\
        "z": "6",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "3.68616361708862,10"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1715967124434",\
        "updated": "1715968435756",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-869",\
        "y": "2298",\
        "z": "7"\
        },\
        {\
        "type": "NOISE",\
        "created": "1715969121248",\
        "updated": "1715969188631",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "7",\
        "notCondition": "false",\
        "x": "-840",\
        "y": "568",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "seed", "1134,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-180,0"],\
                ["NUM#", "max", "540,0"],\
                ["NUM#", "scale", "8000,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"],\
                ["NUM#", "detail", "10,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1715966942598",\
        "updated": "1715967092337",\
        "id": "neg2",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-565",\
        "y": "1593",\
        "z": "9"\
        },\
        {\
        "type": "MATH",\
        "created": "1715967072970",\
        "updated": "1715967236289",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-151",\
        "y": "1521",\
        "z": "10"\
        },\
        {\
        "type": "FILL",\
        "created": "1715966396306",\
        "updated": "1715966446981",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-367",\
        "y": "754",\
        "z": "11",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 5,0 254,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1715966396306",\
        "updated": "1715972002527",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-372",\
        "y": "552",\
        "z": "12",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 5,0 254,0"],\
                ["NUM#", "opacity", "0.003133608848102208,10"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1715967704687",\
        "updated": "1715967713035",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "351.595",\
        "y": "1741.5",\
        "z": "13",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CMB",\
        "created": "1715967665041",\
        "updated": "1716897308793",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "799",\
        "y": "2298",\
        "z": "14",\
        "width": "123.62450479271247",\
        "height": "90"\
        },\
        {\
        "type": "WAVE",\
        "created": "1715968167542",\
        "updated": "1715969513729",\
        "id": "wave4",\
        "name": "wave",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-965",\
        "y": "2867",\
        "z": "15",\
        "useWavelength": "false",\
        "offsetAbsolute": "false",\
        "params":\
        [\
                ["NUM#", "base", "1,0"],\
                ["NUM#", "amplitude", "-3,0"],\
                ["NUM#", "frequency", "0.5,1"]\
        ]\
        },\
        {\
        "type": "WAVE",\
        "created": "1715968167542",\
        "updated": "1715968735669",\
        "id": "wave3",\
        "name": "wave",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-1282",\
        "y": "2723",\
        "z": "16",\
        "useWavelength": "false",\
        "offsetAbsolute": "false",\
        "params":\
        [\
                ["NUM#", "base", "-0.5,1"],\
                ["NUM#", "amplitude", "2,0"],\
                ["NUM#", "frequency", "0.5,1"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1715966415689",\
        "updated": "1715966446981",\
        "id": "colorStop4",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-201",\
        "y": "835",\
        "z": "17",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 5,0 254,0 0,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1715966471122",\
        "updated": "1715967987252",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1777",\
        "y": "2449",\
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
        "type": "COL",\
        "created": "1715966386706",\
        "updated": "1715970066232",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-555",\
        "y": "655",\
        "z": "19",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "300.22904798330694,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "50.98431491762927,10"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1715970613589",\
        "updated": "1715970645337",\
        "id": "bias3",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-988",\
        "y": "454",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "max", "400,0"],\
                ["NUM#", "spread", "-100,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1715966449453",\
        "updated": "1715967076777",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "152",\
        "y": "631",\
        "z": "21",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "2,0"],\
                ["NUM#", "x", "99.89688314646395,0"],\
                ["NUM#", "y", "102.18344896979188,1"],\
                ["NUM#", "blend", "7,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1715970216231",\
        "updated": "1715970433311",\
        "id": "bias2",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-881",\
        "y": "842",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "bias", "-100,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1715966887578",\
        "updated": "1715967236289",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-316",\
        "y": "1580",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "seed", "3569,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-1,0"],\
                ["NUM#", "max", "1,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1715968660386",\
        "updated": "1715972002527",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-1121",\
        "y": "2823",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "SMINMAX",\
        "created": "1715966567025",\
        "updated": "1715969508094",\
        "id": "minmax",\
        "name": "min%2Fmax",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-761",\
        "y": "1157",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1715966887578",\
        "updated": "1715967751248",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "1",\
        "notCondition": "false",\
        "x": "-202",\
        "y": "1927",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "seed", "3935,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-5,1"],\
                ["NUM#", "max", "5,1"],\
                ["NUM#", "scale", "16,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "29.550000000001006,2"],\
                ["NUM#", "detail", "4,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1715966517970",\
        "updated": "1715966543905",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-589",\
        "y": "1050",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1715966352778",\
        "updated": "1719154150488",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2178",\
        "y": "2238",\
        "z": "28",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "1920,0"],\
                ["NUM#", "height", "1080,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1715967746219",\
        "updated": "1715967751248",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-378",\
        "y": "2290",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "add", "0.003,3"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1715966415689",\
        "updated": "1715966535392",\
        "id": "colorStop2",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-206",\
        "y": "712",\
        "z": "30",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 5,0 254,0 0,0 0,0"],\
                ["NUM#", "position", "8.68991117301015,10"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1715966942598",\
        "updated": "1715966947899",\
        "id": "neg",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-392",\
        "y": "1993",\
        "z": "31"\
        },\
        {\
        "type": "NOISE",\
        "created": "1715968552879",\
        "updated": "1715968730206",\
        "id": "noise5",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "-964",\
        "y": "3067",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "seed", "4225,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "20,0"],\
                ["NUM#", "scale", "1.5,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"],\
                ["NUM#", "detail", "3,0"]\
        ]\
        },\
        {\
        "type": "SCALE",\
        "created": "1715968036186",\
        "updated": "1715968036189",\
        "id": "scale",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1784",\
        "y": "2055",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "scaleX", "150,0"],\
                ["NUM#", "scaleY", "150,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1715966975430",\
        "updated": "1715968435756",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-15",\
        "y": "1822",\
        "z": "34"\
        },\
        {\
        "type": "NUM",\
        "created": "1715966932043",\
        "updated": "1715967263904",\
        "id": "num3",\
        "name": "vertical%20spread",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "1",\
        "notCondition": "false",\
        "x": "-577",\
        "y": "2037",\
        "z": "35",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "5,1"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1715966517970",\
        "updated": "1715966535392",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-589",\
        "y": "1149",\
        "z": "36"\
        },\
        {\
        "type": "MATH",\
        "created": "1715968660386",\
        "updated": "1715969508094",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-804",\
        "y": "2967",\
        "z": "37",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1715966820842",\
        "updated": "1716897541797",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "555",\
        "y": "1658",\
        "z": "38",\
        "params":\
        [\
                ["NUM#", "count", "86,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1715966415689",\
        "updated": "1715966533653",\
        "id": "colorStop3",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-206",\
        "y": "599",\
        "z": "39",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 5,0 254,0 0.003133608848102208,10 0,0"],\
                ["NUM#", "position", "-1.317583938832911,10"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1715971973821",\
        "updated": "1715972002527",\
        "id": "bias4",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-907",\
        "y": "2719",\
        "z": "40",\
        "params":\
        [\
                ["NUM#", "bias", "-50,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1715970049749",\
        "updated": "1715970433311",\
        "id": "noise6",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-1119",\
        "y": "846",\
        "z": "41",\
        "params":\
        [\
                ["NUM#", "seed", "4533,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "scale", "2,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1715966415689",\
        "updated": "1715966420261",\
        "id": "colorStop",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-209",\
        "y": "464",\
        "z": "42",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 5,0 254,0 0.003133608848102208,10 0,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1715968424118",\
        "updated": "1715968435756",\
        "id": "bias",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-657",\
        "y": "2281",\
        "z": "43",\
        "params":\
        [\
                ["NUM#", "spread", "-50,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1715968552879",\
        "updated": "1715968730206",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-1281",\
        "y": "2923",\
        "z": "44",\
        "params":\
        [\
                ["NUM#", "seed", "8440,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "scale", "1.5,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"],\
                ["NUM#", "detail", "3,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1715967995985",\
        "updated": "1715967995988",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1971",\
        "y": "2055",\
        "z": "45",\
        "params":\
        [\
                ["NUM#", "angle", "15,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1716897541797",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "wave",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "num",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "num5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "neg2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "bias4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "opacity",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "wave",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "wave2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "wave3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "wave4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop4",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "bias2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "wave2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "bias3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "colorStop",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "colorStop3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "colorStop2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "colorStop4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise6",\
        "outputId": "min",\
        "outputOrder": "0",\
        "inputNodeId": "bias2",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise6",\
        "outputId": "max",\
        "outputOrder": "0",\
        "inputNodeId": "bias2",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "neg2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "num5",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "noise",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "wave3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "minmax",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "evolve",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "minmax",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop2",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop2",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "neg",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "rect",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "minmax",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "wave4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "noise5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math6",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "bias3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop3",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "bias4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "bias",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "range2",\
        "outputId": "start",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "range2",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716895976940",\
        "outputNodeId": "scale",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        }\
    ]\
}';