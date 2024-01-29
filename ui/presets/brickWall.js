const presetBrickWall = '\
    {\
        "nodes":\
        [\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4782",\
            "y": "5200",\
            "z": "0",\
            "width": "60",\
            "height": "51"\
        },\
        {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4414",\
            "y": "5438.86",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "seed", "7184,0"],\
                ["NUM#", "min", "-0.3,1"],\
                ["NUM#", "max", "0.3,1"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4443",\
            "y": "5051",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "add", "24,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "NEG",\
            "id": "neg",\
            "name": "negative",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4232",\
            "y": "5465",\
            "z": "3"\
        },\
        {\
            "type": "INSH",\
            "id": "innerShadow",\
            "name": "inner%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3745",\
            "y": "5020",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "y", "1,0"],\
                ["NUM#", "blur", "2,0"],\
                ["FILL#", "fill", "255,0 255,0 255,0 25,0 0,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3739",\
            "y": "4674",\
            "z": "5",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "20,0"],\
                ["NUM#", "c2", "52,0"],\
                ["NUM#", "c3", "79,0"]\
            ]\
        },\
        {\
            "type": "DEFINE",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4077",\
            "y": "5194",\
            "z": "6"\
        },\
        {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4156",\
            "y": "4681",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "x", "-5,0"],\
                ["NUM#", "width", "50,0"],\
                ["NUM#", "height", "20,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5002",\
            "y": "5063",\
            "z": "8",\
            "params":\
            [\
                ["NUM#", "count", "30,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5206",\
            "y": "5236",\
            "z": "9",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "300,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "20,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "id": "frame",\
            "name": "Brick%20wall",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5395",\
            "y": "4928",\
            "z": "10",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "width", "500,0"],\
                ["NUM#", "height", "690,0"]\
            ]\
        },\
        {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3742",\
            "y": "4810",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "y", "1,0"],\
                ["NUM#", "blur", "2,0"],\
                ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3483",\
            "y": "4662.86",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "seed", "9829,0"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "70,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4443",\
            "y": "4908",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "add", "54,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4045",\
            "y": "5393",\
            "z": "14",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "0.3,1"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4622",\
            "y": "5054",\
            "z": "15",\
            "params":\
            []\
        },\
        {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3935",\
            "y": "5229",\
            "z": "16",\
            "width": "120",\
            "height": "54"\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4998",\
            "y": "4912",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "count", "10,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4738",\
            "y": "4686",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "x", "485.7,1"],\
                ["NUM#", "y", "695.9,1"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3962",\
            "y": "4802",\
            "z": "19",\
            "width": "60",\
            "height": "64"\
        },\
        {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4100",\
            "y": "4983",\
            "z": "20",\
            "params":\
            [\
                ["NUM#", "operand", "-5,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3482",\
            "y": "4841.86",\
            "z": "21",\
            "params":\
            [\
                ["NUM#", "seed", "9837,0"],\
                ["NUM#", "min", "70,0"],\
                ["NUM#", "max", "90,0"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3935",\
            "y": "5154",\
            "z": "22",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "-28,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4617",\
            "y": "4900",\
            "z": "23",\
            "params":\
            []\
        },\
        {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4415",\
            "y": "5255",\
            "z": "24",\
            "params":\
            [\
                ["NUM#", "seed", "7178,0"],\
                ["NUM#", "min", "-0.3,1"],\
                ["NUM#", "max", "0.3,1"]\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "neg",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "random4",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "random4",\
            "inputId": "max",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "neg",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
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
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h1",\
            "list": "false"\
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
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "dropShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "innerShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "neg",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random3",\
            "inputId": "min",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "random3",\
            "inputId": "max",\
            "list": "false"\
        }\
        ]\
    }';