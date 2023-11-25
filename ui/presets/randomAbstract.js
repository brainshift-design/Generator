const presetRandomAbstract = '\
    {\
        "nodes":\
        [\
            {\
            "type": "NOISE",\
            "id": "noise9",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "466",\
            "y": "-124",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "seed", "499,0"],\
                    ["NUM#", "max", "100,0"],\
                    ["NUM#", "scale", "3,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1001",\
            "y": "-122",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "round", "42.80495095144383,0"],\
                    ["NUM#", "bias", "-13.905499986861685,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "99",\
            "y": "662",\
            "z": "2",\
            "width": "131",\
            "height": "472",\
            "params":\
            [\
                    ["NUM#", "0", "1761,0"],\
                    ["NUM#", "1", "1228,0"],\
                    ["NUM#", "2", "4661,0"],\
                    ["NUM#", "3", "3646,0"],\
                    ["NUM#", "4", "3528,0"],\
                    ["NUM#", "5", "3136,0"],\
                    ["NUM#", "6", "4528,0"],\
                    ["NUM#", "7", "4883,0"],\
                    ["NUM#", "8", "3321,0"],\
                    ["NUM#", "9", "647,0"],\
                    ["NUM#", "10", "707,0"],\
                    ["NUM#", "11", "1566,0"],\
                    ["NUM#", "12", "2713,0"],\
                    ["NUM#", "13", "4333,0"],\
                    ["NUM#", "14", "1310,0"],\
                    ["NUM#", "15", "499,0"],\
                    ["NUM#", "16", "2210,0"],\
                    ["NUM#", "17", "2158,0"],\
                    ["NUM#", "18", "3553,0"],\
                    ["NUM#", "19", "2912,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-51",\
            "y": "662",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random8",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "-201",\
            "y": "662",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "9129,0"],\
                    ["NUM#", "max", "4999,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1358",\
            "y": "579",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "seed", "3136,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1695",\
            "y": "726",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "seed", "4883,0"],\
                    ["NUM#", "min", "-300,0"],\
                    ["NUM#", "max", "1400,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1892",\
            "y": "1184",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "seed", "2713,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2364",\
            "y": "207",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "count", "50,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise8",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "507",\
            "y": "-369",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "seed", "1310,0"],\
                    ["NUM#", "max", "50,0"],\
                    ["NUM#", "scale", "12,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise6",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1870",\
            "y": "739",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "seed", "647,0"],\
                    ["NUM#", "max", "2000,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "1128",\
            "y": "318",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "seed", "3646,0"],\
                    ["NUM#", "scale", "20,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise12",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "614",\
            "y": "251",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "seed", "2158,0"],\
                    ["NUM#", "min", "-100,0"],\
                    ["NUM#", "max", "100,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise11",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "758",\
            "y": "-48",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "seed", "2912,0"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "5,0"],\
                    ["NUM#", "offset", "0.1,1"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1687",\
            "y": "548",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "4528,0"],\
                    ["NUM#", "max", "1920,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise7",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2139",\
            "y": "443",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "seed", "707,0"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise10",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "754",\
            "y": "-252",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "seed", "3553,0"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "3,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "856",\
            "y": "315",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "seed", "1228,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1879",\
            "y": "109",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "x", "712,0"],\
                    ["NUM#", "y", "865,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2550",\
            "y": "197",\
            "z": "19",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "1440,0"],\
                    ["NUM#", "height", "1600,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect2",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1001",\
            "y": "-534",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "round", "42.80495095144383,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "601",\
            "y": "117",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "seed", "2210,0"],\
                    ["NUM#", "max", "8,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1155",\
            "y": "560",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "seed", "3528,0"],\
                    ["NUM#", "max", "100,0"],\
                    ["NUM#", "scale", "5,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2088",\
            "y": "1171",\
            "z": "23",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "205,0"],\
                    ["NUM#", "c2", "158,0"],\
                    ["NUM#", "c3", "27,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1331",\
            "y": "379",\
            "z": "24",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "187.0010511027654,0"],\
                    ["NUM#", "c2", "79.92356821426604,0"],\
                    ["NUM#", "c3", "39.0349836777613,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1504",\
            "y": "353",\
            "z": "25",\
            "params":\
            [\
                    ["COL#", "color", "1,0 187,0 80,0 39,0"],\
                    ["NUM#", "opacity", "83.06592158693132,0"],\
                    ["NUM#", "blend", "5,0"]\
            ]\
            },\
            {\
            "type": "APPLY",\
            "id": "apply",\
            "name": "apply",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1703",\
            "y": "-202",\
            "z": "26",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1510",\
            "y": "-210",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "index", "2,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "993",\
            "y": "317",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "seed", "4661,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1311",\
            "y": "-231",\
            "z": "29",\
            "width": "120",\
            "height": "77"\
            },\
            {\
            "type": "RAND",\
            "id": "random11",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1899",\
            "y": "1325",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "seed", "4333,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2179",\
            "y": "110",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "angle", "180.36801470870378,0"]\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1000",\
            "y": "84",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "round", "42.80495095144383,0"],\
                    ["NUM#", "corners", "4,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "-248",\
            "y": "620",\
            "z": "33",\
            "active": "true",\
            "width": "522",\
            "height": "568.8684207118664",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random9",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1897",\
            "y": "1049",\
            "z": "34",\
            "params":\
            [\
                    ["NUM#", "seed", "1566,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1291",\
            "y": "-70",\
            "z": "35",\
            "params":\
            [\
                    ["NUM#", "seed", "1761,0"],\
                    ["NUM#", "max", "3,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise5",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1870",\
            "y": "526",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "seed", "3321,0"],\
                    ["NUM#", "max", "2000,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2029",\
            "y": "110",\
            "z": "37",\
            "params":\
            [\
                    ["NUM#", "scaleX", "228.438025647921,0"],\
                    ["NUM#", "scaleY", "339.70445880226134,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1002",\
            "y": "-351",\
            "z": "38",\
            "params":\
            [\
                    ["NUM#", "inner", "83.66618088151625,0"],\
                    ["NUM#", "from", "143.4829042914705,0"],\
                    ["NUM#", "to", "163.371140908702,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "list",\
            "outputId": "15",\
            "outputOrder": "2",\
            "inputNodeId": "noise9",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise12",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "bias",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "2",\
            "inputNodeId": "random7",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "7",\
            "outputOrder": "2",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "12",\
            "outputOrder": "2",\
            "inputNodeId": "random10",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "14",\
            "outputOrder": "2",\
            "inputNodeId": "noise8",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "9",\
            "outputOrder": "2",\
            "inputNodeId": "noise6",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "2",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "17",\
            "outputOrder": "2",\
            "inputNodeId": "noise12",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "19",\
            "outputOrder": "2",\
            "inputNodeId": "noise11",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "2",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "10",\
            "outputOrder": "2",\
            "inputNodeId": "noise7",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "18",\
            "outputOrder": "2",\
            "inputNodeId": "noise10",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "2",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "apply",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
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
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise8",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "rect2",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "16",\
            "outputOrder": "2",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "2",\
            "inputNodeId": "noise4",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "opacity",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "blend",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "2",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "13",\
            "outputOrder": "2",\
            "inputNodeId": "random11",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "noise7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise8",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "poly",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "poly",\
            "inputId": "corners",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "11",\
            "outputOrder": "2",\
            "inputNodeId": "random9",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "2",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "8",\
            "outputOrder": "2",\
            "inputNodeId": "noise5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "noise5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "inner",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "from",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "to",\
            "list": "false"\
            }\
        ]\
    }';
