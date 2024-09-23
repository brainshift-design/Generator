const presetClouds = '\
    {\
        "nodes":\
        [\
        {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3895",\
            "y": "3377",\
            "z": "0",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "500,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4450",\
            "y": "3046",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "seed", "143,0"],\
                ["NUM#", "min", "-500,0"],\
                ["NUM#", "max", "500,0"],\
                ["NUM#", "scale", "7,0"],\
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
            "x": "3892",\
            "y": "3205",\
            "z": "2",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "400,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4664",\
            "y": "3108",\
            "z": "3",\
            "params":\
            []\
        },\
        {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3708",\
            "y": "3005",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
            ]\
        },\
        {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3474",\
            "y": "2764",\
            "z": "5"\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3884",\
            "y": "2770",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "angle", "342,0"]\
            ]\
        },\
        {\
            "type": "ITEMS",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2963.22",\
            "y": "3195",\
            "z": "7",\
            "width": "120",\
            "height": "142",\
            "params":\
            [\
                ["NUM#", "0", "69,0"],\
                ["NUM#", "1", "254,0"],\
                ["NUM#", "2", "143,0"],\
                ["NUM#", "3", "133,0"],\
                ["NUM#", "4", "30,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3716",\
            "y": "3720",\
            "z": "8",\
            "params":\
            [\
                ["NUM#", "seed", "254,0"],\
                ["NUM#", "max", "15,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill3",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3315",\
            "y": "3782",\
            "z": "9",\
            "params":\
            [\
                ["COL#", "color", "1,0 128,0 74,0 64,0"],\
                ["NUM#", "opacity", "10,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3323",\
            "y": "3651",\
            "z": "10",\
            "params":\
            [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "10,0"]\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill4",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3326",\
            "y": "3540",\
            "z": "11",\
            "params":\
            [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "30,0"]\
            ]\
        },\
        {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3558",\
            "y": "3645",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "angle", "90,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4069",\
            "y": "3596",\
            "z": "13",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4229",\
            "y": "2905",\
            "z": "14",\
            "params":\
            [\
                ["LIST#", "points", "20 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0"],\
                ["NUM#", "closed", "1,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5014",\
            "y": "3105",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "count", "300,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4862",\
            "y": "3542",\
            "z": "16",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "208.99999651666667,0"],\
                ["NUM#", "c2", "70,0"],\
                ["NUM#", "c3", "50,0"]\
            ]\
        },\
        {\
            "type": "NEG",\
            "id": "neg4",\
            "name": "negative",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4080",\
            "y": "3388",\
            "z": "17"\
        },\
        {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4843",\
            "y": "2903",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "x", "330.8758067242062,0"],\
                ["NUM#", "y", "248.97754003451368,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3148",\
            "y": "3811",\
            "z": "19",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "9.999999833333364,0"],\
                ["NUM#", "c2", "50,0"],\
                ["NUM#", "c3", "50,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4860",\
            "y": "3688",\
            "z": "20",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "240,0"],\
                ["NUM#", "c2", "80,0"],\
                ["NUM#", "c3", "80,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3475",\
            "y": "2891",\
            "z": "21",\
            "params":\
            [\
                ["NUM#", "seed", "69,0"],\
                ["NUM#", "min", "30,0"],\
                ["NUM#", "max", "50,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4036",\
            "y": "2934",\
            "z": "22",\
            "params":\
            [\
                ["NUM#", "count", "20,0"]\
            ]\
        },\
        {\
            "type": "LBLR",\
            "id": "layerBlur",\
            "name": "layer%20blur",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3868",\
            "y": "3691",\
            "z": "23",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "2807.22",\
            "y": "3195",\
            "z": "24",\
            "params":\
            [\
                ["NUM#", "seed", "4975,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3165",\
            "y": "3643",\
            "z": "25",\
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
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5059",\
            "y": "3634",\
            "z": "26",\
            "params":\
            [\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "angle", "90,0"]\
            ]\
        },\
        {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4450",\
            "y": "3255",\
            "z": "27",\
            "params":\
            [\
                ["NUM#", "seed", "133,0"],\
                ["NUM#", "min", "-100,0"],\
                ["NUM#", "max", "100,0"],\
                ["NUM#", "scale", "30,0"],\
                ["NUM#", "offset", "0,1"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3893",\
            "y": "3283",\
            "z": "28",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "200,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2763",\
            "y": "3139",\
            "z": "29",\
            "width": "351",\
            "height": "380.64600572988104",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "Clouds",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "5257",\
            "y": "3370",\
            "z": "30",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "800,0"],\
                ["NUM#", "height", "400,0"],\
                ["NUM#", "round", "10,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2806.22",\
            "y": "3384",\
            "z": "31"\
        },\
        {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3896",\
            "y": "3466",\
            "z": "32",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "100,0"]\
            ]\
        },\
        {\
            "type": "NEG",\
            "id": "neg",\
            "name": "negative",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4061",\
            "y": "3263",\
            "z": "33"\
        },\
        {\
            "type": "MATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4655",\
            "y": "3236",\
            "z": "34",\
            "params":\
            []\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3639",\
            "y": "2766",\
            "z": "35",\
            "params":\
            [\
                ["NUM#", "x", "47,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3417",\
            "y": "2705",\
            "z": "36",\
            "width": "982.3473782674874",\
            "height": "475",\
            "params":\
            [\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "neg",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h1",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill3",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill4",\
            "inputId": "color",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "layerBlur",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "true"\
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
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "neg4",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "layerBlur",\
            "inputId": "radius",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "neg4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise2",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "grad2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "true"\
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
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "neg",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h1",\
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
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
        }\
        ]\
    }';