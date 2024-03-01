const presetHotSpring = '\
    {\
        "nodes":\
        [\
            {\
            "type": "ELPS",\
            "id": "ellipse2",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6361",\
            "y": "3678",\
            "z": "0"\
            },\
            {\
            "type": "GETP",\
            "id": "getParam",\
            "name": "get%20param",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6511",\
            "y": "3678",\
            "z": "1",\
            "width": "120",\
            "height": "54",\
            "_connected": "false",\
            "params":\
            [\
                    ["TEXT#", "name", "zz", "left"]\
            ]\
            },\
            {\
            "type": "LBLR",\
            "id": "layerBlur",\
            "name": "layer%20blur",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5423",\
            "y": "3615",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "radius", "0,10"]\
            ]\
            },\
            {\
            "type": "WAVE",\
            "id": "wave3",\
            "name": "wave",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4786",\
            "y": "3611",\
            "z": "3",\
            "useWavelength": "false",\
            "offsetAbsolute": "false",\
            "params":\
            [\
                    ["NUM#", "base", "100,0"],\
                    ["NUM#", "amplitude", "80,0"],\
                    ["NUM#", "frequency", "4,0"],\
                    ["NUM#", "offset", "93,2"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5560",\
            "y": "3305",\
            "z": "4",\
            "width": "60",\
            "height": "51"\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5674",\
            "y": "3111",\
            "z": "5",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SETP",\
            "id": "setParam",\
            "name": "set%20param",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5894",\
            "y": "3114",\
            "z": "6",\
            "width": "120",\
            "height": "NaN",\
            "_connected": "false",\
            "params":\
            [\
                    ["TEXT#", "name", "zz", "left"]\
            ]\
            },\
            {\
            "type": "SORT",\
            "id": "sort",\
            "name": "sort",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6708",\
            "y": "3560",\
            "z": "7",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SGRP",\
            "id": "group",\
            "name": "group",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6910",\
            "y": "3563",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5915",\
            "y": "3581",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "end", "-1500,0"]\
            ]\
            },\
            {\
            "type": "WAVE",\
            "id": "wave",\
            "name": "wave",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5915",\
            "y": "3397",\
            "z": "10",\
            "useWavelength": "false",\
            "offsetAbsolute": "false",\
            "params":\
            [\
                    ["NUM#", "amplitude", "458,0"],\
                    ["NUM#", "frequency", "4,0"],\
                    ["NUM#", "offset", "-25,1"]\
            ]\
            },\
            {\
            "type": "WAVE",\
            "id": "wave2",\
            "name": "wave",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5694",\
            "y": "3493",\
            "z": "11",\
            "useWavelength": "false",\
            "offsetAbsolute": "false",\
            "params":\
            [\
                    ["NUM#", "frequency", "4,0"],\
                    ["NUM#", "offset", "50,2"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5028",\
            "y": "3519",\
            "z": "12",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "20,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5191",\
            "y": "3415",\
            "z": "13",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "14,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "20,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5020",\
            "y": "3302",\
            "z": "14",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "14,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "92.47133493451882,10"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6172",\
            "y": "3117",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "x", "-454.3885332020307,9"],\
                    ["NUM#", "y", "-1500,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5359",\
            "y": "3292",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "size", "100,0"],\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "y", "0,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            },\
            {\
            "type": "WAVE",\
            "id": "wave4",\
            "name": "wave",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5049",\
            "y": "3735",\
            "z": "17",\
            "useWavelength": "false",\
            "offsetAbsolute": "false",\
            "params":\
            [\
                    ["NUM#", "amplitude", "75,0"],\
                    ["NUM#", "frequency", "4,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6205",\
            "y": "3466",\
            "z": "18",\
            "width": "120",\
            "height": "90"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6491",\
            "y": "3412",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "count", "200,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "ellipse2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "getParam",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "wave4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "layerBlur",\
            "inputId": "radius",\
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
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "setParam",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "wave2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "setParam",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sort",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sort",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "group",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "wave3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "setParam",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "wave",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "wave",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "wave2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "wave3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "wave4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h4",\
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
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "getParam",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sort",\
            "inputId": "condition",\
            "list": "false"\
            }\
        ]\
    }';