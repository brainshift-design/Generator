const presetNestedTorus = '\
{\
    "generatorVersion": "373",\
    "nodes":\
    [\
        {\
        "type": "CMB",\
        "created": "1709373554042",\
        "updated": "1709373554042",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4849",\
        "y": "3193",\
        "z": "0",\
        "width": "60",\
        "height": "64"\
        },\
        {\
        "type": "SMATH",\
        "created": "1709373554044",\
        "updated": "1709373554044",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4282",\
        "y": "3498",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "CONST",\
        "created": "1709373554045",\
        "updated": "1709373554045",\
        "id": "constant",\
        "name": "constant",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3974",\
        "y": "3110",\
        "z": "2"\
        },\
        {\
        "type": "SMATH",\
        "created": "1709373554047",\
        "updated": "1709373554047",\
        "id": "math7",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3113",\
        "y": "3335",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "operand", "0.5,1"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709373554049",\
        "updated": "1709373554049",\
        "id": "math8",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3112",\
        "y": "3442",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709373554051",\
        "updated": "1709373554051",\
        "id": "sequence3",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2727",\
        "y": "3680",\
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
        "created": "1709373554053",\
        "updated": "1709373554053",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3314",\
        "y": "2980",\
        "z": "6",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 89,0 0,0"],\
                ["NUM#", "opacity", "5,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1709373554056",\
        "updated": "1709373554056",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3500.05",\
        "y": "2953",\
        "z": "7",\
        "params":\
        [\
                ["EXPAND#", "fills", "1 FILL# 255,0 89,0 0,0 5,0 0,0"],\
                ["NUM#", "weight", "2.25,1"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "SCENTR",\
        "created": "1709373554058",\
        "updated": "1709373554058",\
        "id": "center",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3836",\
        "y": "2771",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "centerX", "0,0"]\
        ]\
        },\
        {\
        "type": "SCALE",\
        "created": "1709373554063",\
        "updated": "1709373554063",\
        "id": "scale",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4726",\
        "y": "2772",\
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
        "created": "1709373554065",\
        "updated": "1709373554065",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2921",\
        "y": "3669",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "start", "50,0"],\
                ["NUM#", "add", "-15,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "SCENTR",\
        "created": "1709373554068",\
        "updated": "1709373554068",\
        "id": "center2",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5266",\
        "y": "3220",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "centerX", "0,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1709373554070",\
        "updated": "1709373554070",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5417",\
        "y": "3220",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "angle", "180,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1709373554072",\
        "updated": "1709373554072",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4149",\
        "y": "3038",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "end", "3.1415926536,10"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709373554074",\
        "updated": "1709373554074",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4134",\
        "y": "3321",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709373554075",\
        "updated": "1709373554075",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4966",\
        "y": "3138",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "count", "20,0"]\
        ]\
        },\
        {\
        "type": "RSTX",\
        "created": "1709373554077",\
        "updated": "1709373554077",\
        "id": "reset",\
        "name": "reset%20space",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5121",\
        "y": "3219",\
        "z": "16"\
        },\
        {\
        "type": "ELPS",\
        "created": "1709373554082",\
        "updated": "1709373554082",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3663.05",\
        "y": "2771",\
        "z": "17",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "width", "400,0"],\
                ["NUM#", "height", "400,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1709373554086",\
        "updated": "1709373554086",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3973",\
        "y": "3298",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "end", "3.1415926536,10"]\
        ]\
        },\
        {\
        "type": "TRIG",\
        "created": "1709373554087",\
        "updated": "1709373554087",\
        "id": "trig2",\
        "name": "trigonometric",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4282",\
        "y": "3322",\
        "z": "19"\
        },\
        {\
        "type": "SEQ",\
        "created": "1709373554089",\
        "updated": "1709373554089",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3594",\
        "y": "3552",\
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
        "created": "1709373554092",\
        "updated": "1709373554092",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4444",\
        "y": "3037",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "40,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709373554093",\
        "updated": "1709373554093",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5579",\
        "y": "3144",\
        "z": "22",\
        "width": "118.46411091634813",\
        "height": "51"\
        },\
        {\
        "type": "SMATH",\
        "created": "1709373554095",\
        "updated": "1709373554095",\
        "id": "math9",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2964",\
        "y": "3265",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709373554097",\
        "updated": "1709373554097",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4451",\
        "y": "3322",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "67,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1709373554100",\
        "updated": "1709373554100",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3157",\
        "y": "3007",\
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
        "created": "1709373554104",\
        "updated": "1709373554104",\
        "id": "scale2",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4090",\
        "y": "2770",\
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
        "created": "1709373554106",\
        "updated": "1709373554106",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4283",\
        "y": "3391",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "operand", "1,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709373554107",\
        "updated": "1709373554107",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5685",\
        "y": "3678",\
        "z": "28",\
        "width": "63.14231120745772",\
        "height": "64"\
        },\
        {\
        "type": "TRIG",\
        "created": "1709373554107",\
        "updated": "1709373554107",\
        "id": "trig3",\
        "name": "trigonometric",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3112",\
        "y": "3266",\
        "z": "29"\
        },\
        {\
        "type": "TRIG",\
        "created": "1709373554108",\
        "updated": "1709373554108",\
        "id": "trig",\
        "name": "trigonometric",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4294",\
        "y": "3037",\
        "z": "30"\
        },\
        {\
        "type": "SMATH",\
        "created": "1709373554110",\
        "updated": "1709373554110",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3307",\
        "y": "3272",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "3,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709373554112",\
        "updated": "1709373579926",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5808",\
        "y": "3624",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "count", "4,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1709373554115",\
        "updated": "1709373554115",\
        "id": "range3",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2750",\
        "y": "3213",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "end", "3.1415926536,10"]\
        ]\
        },\
        {\
        "type": "REVLST",\
        "created": "1709373554115",\
        "updated": "1709373587284",\
        "id": "reverse",\
        "name": "reverse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5977",\
        "y": "3623",\
        "z": "34"\
        },\
        {\
        "type": "ELPS",\
        "created": "1709373598218",\
        "updated": "1709373609468",\
        "id": "ellipse2",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5939",\
        "y": "2198",\
        "z": "35",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "y", "200,0"],\
                ["NUM#", "width", "550,0"],\
                ["NUM#", "height", "550,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1709373603010",\
        "updated": "1709373609468",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5770",\
        "y": "2424",\
        "z": "36",\
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
        "created": "1709373633055",\
        "updated": "1709373633073",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6343.16",\
        "y": "2908.74",\
        "z": "37",\
        "active": "true",\
        "width": "120",\
        "height": "51"\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1709373554126",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "trig3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill",\
        "inputId": "opacity",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "weight",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "center",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "scale2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "scaleX",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "reset",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "center2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "center2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "constant",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "scale",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "reset",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "trig2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "trig",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math9",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "center",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale2",\
        "inputId": "scaleX",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "scale2",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "trig2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "trig3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "trig",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "math8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709373554126",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1709373587284",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "reverse",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709373609468",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse2",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709373633057",\
        "outputNodeId": "ellipse2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709373633058",\
        "outputNodeId": "reverse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "true"\
        }\
    ]\
}';