const presetClock = '\
    {\
        "nodes":\
        [\
            {\
            "type": "TRPZ",\
            "id": "trapeze3",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6351",\
            "y": "5778",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-100,0"],\
                    ["NUM#", "bias", "-20,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6491",\
            "y": "5499",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale3",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6693",\
            "y": "5501",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "scaleX", "15,0"],\
                    ["NUM#", "scaleY", "120,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate4",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6843",\
            "y": "5501",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "angle", "-415.000000008,9"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6335",\
            "y": "5285",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-100,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse2",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6445",\
            "y": "6151",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-50,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6772",\
            "y": "6151",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "scaleX", "20,0"],\
                    ["NUM#", "scaleY", "20,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5793",\
            "y": "4984",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "-360,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5980",\
            "y": "4871",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "operand", "60,0"]\
            ]\
            },\
            {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5443",\
            "y": "4560",\
            "z": "9"\
            },\
            {\
            "type": "TXTS",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5701",\
            "y": "4534",\
            "z": "10",\
            "params":\
            [\
                    ["TEXT#", "text", "12", "center"],\
                    ["NUM#", "x", "-30,0"],\
                    ["NUM#", "y", "-25,0"],\
                    ["NUM#", "width", "62,0"],\
                    ["NUM#", "height", "50,0"],\
                    ["NUM#", "size", "40,0"],\
                    ["TEXT#", "style", "Black"],\
                    ["NUM#", "alignH", "1,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6516",\
            "y": "4534",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "angle", "270,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6749.11",\
            "y": "4912",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "count", "12,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow2",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6232",\
            "y": "4155",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "blur", "10,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6073",\
            "y": "3942",\
            "z": "14",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 68,0 68,0 68,0 100,0 0,0"],\
                    ["NUM#", "weight", "15,0"],\
                    ["NUM#", "fit", "2,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6076",\
            "y": "3834",\
            "z": "15",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "238,0"],\
                    ["NUM#", "c2", "238,0"],\
                    ["NUM#", "c3", "238,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale4",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6703",\
            "y": "5780",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "scaleX", "3.5,1"],\
                    ["NUM#", "scaleY", "142,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze2",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6341",\
            "y": "5499",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-100,0"],\
                    ["NUM#", "bias", "-20,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6485",\
            "y": "5285",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate3",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6837",\
            "y": "5287",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "angle", "-303.59999998800004,9"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6269",\
            "y": "4877",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "value", "270,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6078",\
            "y": "4155",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "y", "10,0"],\
                    ["NUM#", "blur", "30,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5925",\
            "y": "3941",\
            "z": "22",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "68,0"],\
                    ["NUM#", "c2", "68,0"],\
                    ["NUM#", "c3", "68,0"]\
            ]\
            },\
            {\
            "type": "DATE",\
            "id": "dateTime",\
            "name": "date%20%26%20time",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5199",\
            "y": "5327",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "hours", "14,0"],\
                    ["NUM#", "minutes", "3,0"],\
                    ["NUM#", "seconds", "47,0"],\
                    ["NUM#", "date", "5,0"],\
                    ["NUM#", "month", "11,0"],\
                    ["NUM#", "year", "2023,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate5",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6853",\
            "y": "5780",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "angle", "-216,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5852",\
            "y": "5476",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "-360,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6226",\
            "y": "3834",\
            "z": "26",\
            "width": "120",\
            "height": "90"\
            },\
            {\
            "type": "RSTX",\
            "id": "reset",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6319",\
            "y": "4535",\
            "z": "27"\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6611",\
            "y": "6194",\
            "z": "28",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "20,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6687",\
            "y": "5287",\
            "z": "29",\
            "params":\
            [\
                    ["NUM#", "scaleX", "10,0"],\
                    ["NUM#", "scaleY", "140,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5851",\
            "y": "4534",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "x", "160,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "INSH",\
            "id": "innerShadow",\
            "name": "inner%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5925",\
            "y": "4159",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "y", "10,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5911",\
            "y": "5644",\
            "z": "32",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "10,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "75,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5281",\
            "y": "4560",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "start", "1,0"],\
                    ["NUM#", "add", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5536",\
            "y": "4827",\
            "z": "34",\
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
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5709",\
            "y": "5477",\
            "z": "35",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "60,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7140",\
            "y": "4376",\
            "z": "36",\
            "active": "true",\
            "width": "120",\
            "height": "116"\
            },\
            {\
            "type": "CENTR",\
            "id": "center3",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6501",\
            "y": "5778",\
            "z": "37",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect2",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6431",\
            "y": "3708",\
            "z": "38",\
            "params":\
            [\
                    ["NUM#", "x", "-200,0"],\
                    ["NUM#", "y", "-200,0"],\
                    ["NUM#", "width", "400,0"],\
                    ["NUM#", "height", "400,0"],\
                    ["NUM#", "round", "30,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6163",\
            "y": "4535",\
            "z": "39",\
            "params":\
            [\
                    ["NUM#", "angle", "-270,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "TIMER",\
            "id": "timer",\
            "name": "timer",\
            "renamed": "false",\
            "enabled": "false",\
            "highlight": "0",\
            "x": "7342",\
            "y": "4402",\
            "z": "40"\
            },\
            {\
            "type": "SMATH",\
            "id": "math6",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5706",\
            "y": "5356",\
            "z": "41",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "720,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math5",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5852",\
            "y": "5355",\
            "z": "42",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "-360,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math7",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5423",\
            "y": "5354",\
            "z": "43",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "60,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math8",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5562",\
            "y": "5356",\
            "z": "44",\
            "params":\
            [\
                    ["NUM#", "value", "830,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math9",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5422",\
            "y": "5229",\
            "z": "45",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "60,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math10",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5561",\
            "y": "5231",\
            "z": "46",\
            "params":\
            [\
                    ["NUM#", "value", "3036,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math11",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5705",\
            "y": "5231",\
            "z": "47",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "3600,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math12",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5851",\
            "y": "5230",\
            "z": "48",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "-360,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6104",\
            "y": "5652",\
            "z": "49",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow3",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5904",\
            "y": "5803",\
            "z": "50",\
            "params":\
            [\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine4",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6148",\
            "y": "5874",\
            "z": "51",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow4",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5907",\
            "y": "6014",\
            "z": "52",\
            "params":\
            [\
                    ["NUM#", "y", "2,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse3",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6443",\
            "y": "6435",\
            "z": "53",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-50,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale5",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6770",\
            "y": "6435",\
            "z": "54",\
            "params":\
            [\
                    ["NUM#", "scaleX", "10,0"],\
                    ["NUM#", "scaleY", "10,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6609",\
            "y": "6478",\
            "z": "55",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "10,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "combine4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze3",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "trapeze2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate4",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "trapeze",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse2",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "ellipse2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale2",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "text",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "reset",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "center3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "trapeze2",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "trapeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math12",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate3",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate5",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dropShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dropShadow2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "innerShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h4",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "reset",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dateTime",\
            "outputId": "seconds",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
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
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "rotate3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h4",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h5",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h6",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect2",\
            "inputId": "props",\
            "list": "true"\
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
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dateTime",\
            "outputId": "hours",\
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
            "outputNodeId": "dateTime",\
            "outputId": "minutes",\
            "outputOrder": "0",\
            "inputNodeId": "math8",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dateTime",\
            "outputId": "minutes",\
            "outputOrder": "1",\
            "inputNodeId": "math9",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math10",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dateTime",\
            "outputId": "seconds",\
            "outputOrder": "1",\
            "inputNodeId": "math10",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math11",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math12",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dropShadow3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dropShadow4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine4",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ellipse3",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "ellipse3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale5",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale5",\
            "inputId": "scaleY",\
            "list": "false"\
            }\
        ]\
    }';