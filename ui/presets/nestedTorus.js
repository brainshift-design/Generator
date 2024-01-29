const presetNestedTorus = '\
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
            "x": "4749",\
            "y": "3093",\
            "z": "0",\
            "width": "60",\
            "height": "64"\
            },\
            {\
            "type": "SMATH",\
            "id": "math5",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4182",\
            "y": "3398",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            },\
            {\
            "type": "CONST",\
            "id": "constant",\
            "name": "constant",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3874",\
            "y": "3010",\
            "z": "2",\
            "params":\
            []\
            },\
            {\
            "type": "SMATH",\
            "id": "math7",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3013",\
            "y": "3235",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "operand", "0.5,1"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math8",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3012",\
            "y": "3342",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2627",\
            "y": "3580",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "start", "45,0"],\
                    ["NUM#", "add", "-8,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3214",\
            "y": "2880",\
            "z": "6",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 89,0 0,0"],\
                    ["NUM#", "opacity", "5,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3400.05",\
            "y": "2853",\
            "z": "7",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 255,0 89,0 0,0 5,0 0,0"],\
                    ["NUM#", "weight", "2.25,1"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3736",\
            "y": "2671",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "centerX", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4626",\
            "y": "2672",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "scaleX", "0,0"],\
                    ["NUM#", "scaleY", "67,0"],\
                    ["NUM#", "affectStyle", "0,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2821",\
            "y": "3569",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "start", "50,0"],\
                    ["NUM#", "add", "-15,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5166",\
            "y": "3120",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "centerX", "0,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5317",\
            "y": "3120",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "angle", "180,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4049",\
            "y": "2938",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "end", "3.1415926536,10"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math6",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4034",\
            "y": "3221",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4866",\
            "y": "3038",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "RSTX",\
            "id": "reset",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5021",\
            "y": "3119",\
            "z": "16"\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3563.05",\
            "y": "2671",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "width", "400,0"],\
                    ["NUM#", "height", "400,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range2",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3873",\
            "y": "3198",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "end", "3.1415926536,10"]\
            ]\
            },\
            {\
            "type": "TRIG",\
            "id": "trig2",\
            "name": "trigonometric",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4182",\
            "y": "3222",\
            "z": "19",\
            "params":\
            []\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3494",\
            "y": "3452",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "start", "100,0"],\
                    ["NUM#", "add", "60,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4344",\
            "y": "2937",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "40,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5479",\
            "y": "3044",\
            "z": "22",\
            "width": "118.46411091634813",\
            "height": "51"\
            },\
            {\
            "type": "SMATH",\
            "id": "math9",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2864",\
            "y": "3165",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4351",\
            "y": "3222",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "67,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3057",\
            "y": "2907",\
            "z": "25",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "21,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3990",\
            "y": "2670",\
            "z": "26",\
            "params":\
            [\
                    ["NUM#", "scaleX", "280,0"],\
                    ["NUM#", "scaleY", "280,0"],\
                    ["NUM#", "affectStyle", "0,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4183",\
            "y": "3291",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "operand", "1,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5585",\
            "y": "3578",\
            "z": "28",\
            "width": "63.14231120745772",\
            "height": "64"\
            },\
            {\
            "type": "TRIG",\
            "id": "trig3",\
            "name": "trigonometric",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3012",\
            "y": "3166",\
            "z": "29",\
            "params":\
            []\
            },\
            {\
            "type": "TRIG",\
            "id": "trig",\
            "name": "trigonometric",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4194",\
            "y": "2937",\
            "z": "30"\
            },\
            {\
            "type": "SMATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3207",\
            "y": "3172",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "3,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5708",\
            "y": "3524",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "count", "4,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range3",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2650",\
            "y": "3113",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "end", "3.1415926536,10"]\
            ]\
            },\
            {\
            "type": "REVLST",\
            "id": "reverse",\
            "name": "reverse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5858",\
            "y": "3524",\
            "z": "34",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range3",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trig3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math7",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math8",\
            "inputId": "h0",\
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
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill",\
            "inputId": "opacity",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "weight",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "reset",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "constant",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "range",\
            "inputId": "end",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "reset",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trig2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trig",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math9",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale2",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trig2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine3",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trig3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trig",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine3",\
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
            "inputNodeId": "reverse",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';
