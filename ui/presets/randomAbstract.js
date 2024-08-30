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
            "x": "616",\
            "y": "26",\
            "z": "0",\
            "params":\
            [\
                ["NUM#", "seed", "2774,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "3,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1151",\
            "y": "28",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "round", "25.571374980763302,0"],\
                ["NUM#", "bias", "-10.476373188368143,0"]\
            ]\
        },\
        {\
            "type": "EXPAND",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "249",\
            "y": "812",\
            "z": "2",\
            "width": "131",\
            "height": "472",\
            "params":\
            [\
                ["NUM#", "0", "1230,0"],\
                ["NUM#", "1", "566,0"],\
                ["NUM#", "2", "4108,0"],\
                ["NUM#", "3", "3691,0"],\
                ["NUM#", "4", "4107,0"],\
                ["NUM#", "5", "4980,0"],\
                ["NUM#", "6", "4380,0"],\
                ["NUM#", "7", "2234,0"],\
                ["NUM#", "8", "1144,0"],\
                ["NUM#", "9", "2697,0"],\
                ["NUM#", "10", "194,0"],\
                ["NUM#", "11", "566,0"],\
                ["NUM#", "12", "4041,0"],\
                ["NUM#", "13", "4234,0"],\
                ["NUM#", "14", "3670,0"],\
                ["NUM#", "15", "2774,0"],\
                ["NUM#", "16", "3247,0"],\
                ["NUM#", "17", "1729,0"],\
                ["NUM#", "18", "2498,0"],\
                ["NUM#", "19", "1436,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "82.5576",\
            "y": "1014",\
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
            "x": "83.5576",\
            "y": "812",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "seed", "9157,0"],\
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
            "x": "1508",\
            "y": "769.254",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "seed", "4980,0"],\
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
            "x": "1845",\
            "y": "876",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "seed", "2234,0"],\
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
            "x": "2042",\
            "y": "1334",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "seed", "4041,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2514",\
            "y": "357",\
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
            "x": "657",\
            "y": "-219",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "seed", "3670,0"],\
                ["NUM#", "max", "50,0"],\
                ["NUM#", "scale", "12,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise6",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2020",\
            "y": "889",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "seed", "2697,0"],\
                ["NUM#", "max", "2000,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "1278",\
            "y": "508.254",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "seed", "3691,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "max", "255,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise12",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "732",\
            "y": "497",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "seed", "1729,0"],\
                ["NUM#", "min", "-100,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise11",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "908",\
            "y": "102",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "seed", "1436,0"],\
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
            "x": "1837",\
            "y": "698",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "seed", "4380,0"],\
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
            "x": "2289",\
            "y": "593",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "seed", "194,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise10",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "904",\
            "y": "-102",\
            "z": "16",\
            "params":\
            [\
                ["NUM#", "seed", "2498,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "3,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "986",\
            "y": "505.254",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "seed", "566,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "max", "255,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2029",\
            "y": "259",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "x", "1843,0"],\
                ["NUM#", "y", "904,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2700",\
            "y": "347",\
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
            "x": "1151",\
            "y": "-419.043",\
            "z": "20",\
            "params":\
            [\
                ["NUM#", "round", "25.571374980763302,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "732",\
            "y": "309",\
            "z": "21",\
            "params":\
            [\
                ["NUM#", "seed", "3247,0"],\
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
            "x": "1305",\
            "y": "750.254",\
            "z": "22",\
            "params":\
            [\
                ["NUM#", "seed", "4107,0"],\
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
            "x": "2238",\
            "y": "1321",\
            "z": "23",\
            "prevSpace": "rgb",\
            "params":\
            [\
                ["NUM#", "space", "1,0"],\
                ["NUM#", "c1", "238,0"],\
                ["NUM#", "c2", "54,0"],\
                ["NUM#", "c3", "220,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1481",\
            "y": "529",\
            "z": "24",\
            "prevSpace": "rgb",\
            "params":\
            [\
                ["NUM#", "space", "1,0"],\
                ["NUM#", "c1", "242.98712985030707,0"],\
                ["NUM#", "c2", "204.57397802375937,0"],\
                ["NUM#", "c3", "134.80114463822792,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1654",\
            "y": "503",\
            "z": "25",\
            "params":\
            [\
                ["COL#", "color", "1,0 243,0 205,0 135,0"],\
                ["NUM#", "opacity", "18.128536171999997,0"],\
                ["NUM#", "blend", "12,0"]\
            ]\
        },\
        {\
            "type": "APPLY",\
            "id": "apply",\
            "name": "apply",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1853",\
            "y": "-52",\
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
            "x": "1660",\
            "y": "-60",\
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
            "x": "1133",\
            "y": "507.254",\
            "z": "28",\
            "params":\
            [\
                ["NUM#", "seed", "4108,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "max", "255,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1461",\
            "y": "-81",\
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
            "x": "2041",\
            "y": "1514",\
            "z": "30",\
            "params":\
            [\
                ["NUM#", "seed", "4234,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2329",\
            "y": "260",\
            "z": "31",\
            "params":\
            [\
                ["NUM#", "angle", "13.53548760823702,0"]\
            ]\
        },\
        {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1150",\
            "y": "231",\
            "z": "32",\
            "params":\
            [\
                ["NUM#", "round", "25.571374980763302,0"],\
                ["NUM#", "corners", "7,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "26.8206",\
            "y": "770",\
            "z": "33",\
            "width": "397.1793598325037",\
            "height": "569",\
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
            "x": "2042",\
            "y": "1153",\
            "z": "34",\
            "params":\
            [\
                ["NUM#", "seed", "566,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1441",\
            "y": "80",\
            "z": "35",\
            "params":\
            [\
                ["NUM#", "seed", "1230,0"],\
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
            "x": "2020",\
            "y": "676",\
            "z": "36",\
            "params":\
            [\
                ["NUM#", "seed", "1144,0"],\
                ["NUM#", "max", "2000,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2179",\
            "y": "260",\
            "z": "37",\
            "params":\
            [\
                ["NUM#", "scaleX", "221.65405936174068,0"],\
                ["NUM#", "scaleY", "1807.4976912772102,0"],\
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
            "x": "1152",\
            "y": "-239",\
            "z": "38",\
            "params":\
            [\
                ["NUM#", "inner", "27.186353086580738,0"],\
                ["NUM#", "start", "235.31566810576084,0"],\
                ["NUM#", "sweep", "10.306737445608434,0"]\
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
            "list": "false"\
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
            "list": "false"\
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
            "list": "false"\
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
            "inputId": "start",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "sweep",\
            "list": "false"\
        }\
        ]\
    }';