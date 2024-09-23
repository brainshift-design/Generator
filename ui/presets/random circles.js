const presetRandomCircles = '\
{\
    "generatorVersion": "378",\
    "nodes":\
    [\
        {\
        "type": "NOISE",\
        "created": "1710340626490",\
        "updated": "1710340629811",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3837",\
        "y": "4067",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "seed", "7537,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "-30,0"],\
                ["NUM#", "max", "30,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1710341017804",\
        "updated": "1710341239241",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2962",\
        "y": "4327",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "seed", "4696,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "scale", "4,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1710341043319",\
        "updated": "1710341047611",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2953",\
        "y": "4110",\
        "z": "2",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 64,0 0,0"],\
                ["NUM#", "opacity", "20,0"],\
                ["NUM#", "blend", "7,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1710340737324",\
        "updated": "1710340742270",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2842",\
        "y": "3553",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "seed", "7368,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "max", "600,0"],\
                ["NUM#", "scale", "17,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1710340551647",\
        "updated": "1710341047611",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2789",\
        "y": "2634",\
        "z": "4",\
        "r3201": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "229.99999999999997,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1710341043319",\
        "updated": "1710341047611",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2968",\
        "y": "2621",\
        "z": "5",\
        "params":\
        [\
                ["COL#", "color", "1,0 0,0 43,0 255,0"],\
                ["NUM#", "opacity", "15,0"],\
                ["NUM#", "blend", "6,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710340587750",\
        "updated": "1710341326322",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4655",\
        "y": "2387",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "count", "110,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1710340485771",\
        "updated": "1710340799089",\
        "id": "ellipse2",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3359",\
        "y": "2370",\
        "z": "7",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "-83,0"],\
                ["NUM#", "y", "267,0"],\
                ["NUM#", "width", "1430.7810129214638,0"],\
                ["NUM#", "height", "1430.7810129214638,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1710340594801",\
        "updated": "1710340609549",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3830",\
        "y": "3928",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "add", "20,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1710340485771",\
        "updated": "1710340799089",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3271",\
        "y": "3803",\
        "z": "9",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "-83,0"],\
                ["NUM#", "y", "267,0"],\
                ["NUM#", "width", "174.3307421837757,0"],\
                ["NUM#", "height", "174.3307421837757,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1710340578163",\
        "updated": "1710340629811",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4008",\
        "y": "3819",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "moveType", "1,0"],\
                ["NUM#", "x", "2180,0"],\
                ["NUM#", "y", "6.772299734796867,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1710341017804",\
        "updated": "1710341239241",\
        "id": "noise6",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2991",\
        "y": "2837",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "seed", "1548,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "max", "500,0"],\
                ["NUM#", "scale", "4,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1710340578163",\
        "updated": "1710340629811",\
        "id": "move2",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4096",\
        "y": "2386",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "moveType", "1,0"],\
                ["NUM#", "x", "2180,0"],\
                ["NUM#", "y", "0.7965931835923428,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710340587750",\
        "updated": "1710341822720",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4554",\
        "y": "3821",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "count", "110,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1710340551647",\
        "updated": "1710341047611",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2780",\
        "y": "4112",\
        "z": "14",\
        "r3201": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "15,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1710340737324",\
        "updated": "1710340742270",\
        "id": "noise5",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2944",\
        "y": "2118",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "seed", "6214,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "max", "1600,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1710340795331",\
        "updated": "1710341239241",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3138",\
        "y": "4089",\
        "z": "16",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 255,0 64,0 0,0 20,0 7,0"],\
                ["NUM#", "weight", "55.06433462279758,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1710340594801",\
        "updated": "1710340609549",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3881",\
        "y": "2514",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "add", "20,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1710340626490",\
        "updated": "1710340629811",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3881",\
        "y": "2655",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "seed", "5194,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "-10,0"],\
                ["NUM#", "max", "10,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1710340795331",\
        "updated": "1710341239241",\
        "id": "stroke2",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3184",\
        "y": "2598",\
        "z": "19",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 0,0 43,0 255,0 15,0 6,0"],\
                ["NUM#", "weight", "25.54672611714554,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1710341517763",\
        "updated": "1710341517767",\
        "id": "panel",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "6",\
        "notCondition": "false",\
        "x": "2706",\
        "y": "2078",\
        "z": "20",\
        "width": "2169.239754332901",\
        "height": "1019.4274851056109",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1710341517763",\
        "updated": "1710341551831",\
        "id": "panel2",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "2715",\
        "y": "3468",\
        "z": "21",\
        "width": "2169",\
        "height": "1112.075292223945",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1710341452313",\
        "updated": "1710341495164",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5074.5",\
        "y": "3121.06",\
        "z": "22",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "COL",\
        "created": "1710340436148",\
        "updated": "1710340438631",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5271",\
        "y": "3344",\
        "z": "23",\
        "r3201": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1710340421871",\
        "updated": "1710341789789",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5449",\
        "y": "3104",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "width", "1920,0"],\
                ["NUM#", "height", "720,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1710411090280",\
        "updated": "1710411090291",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5609",\
        "y": "3104",\
        "z": "25",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "angle", "-90,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1710341045369",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "move2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "noise5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse2",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "noise5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse2",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "stroke2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse2",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1710340740088",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1710340742268",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1710340799088",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1710340578170",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710340609547",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1710340629810",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "ellipse2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1710340587755",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710341047611",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1710341239238",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "weight",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke2",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1710341326317",\
        "outputNodeId": "noise6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke2",\
        "inputId": "weight",\
        "list": "false"\
        },\
        {\
        "created": "1710341452317",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710341452318",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1710341495163",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1710340438629",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1710411090287",\
        "outputNodeId": "frame",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        }\
    ]\
}';