const presetClock = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5916",\
            "y": "6536",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "60,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate5",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7060",\
            "y": "6839",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "angle", "-294.000000012,9"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6816",\
            "y": "7537",\
            "z": "2",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "10,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse2",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6652",\
            "y": "7210",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-50,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math8",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5769",\
            "y": "6415",\
            "z": "4",\
            "params":\
            []\
            },\
            {\
            "type": "SMATH",\
            "id": "math6",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5913",\
            "y": "6415",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "720,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze2",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6548",\
            "y": "6558",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-100,0"],\
                    ["NUM#", "bias", "-20,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate4",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7050",\
            "y": "6560",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "angle", "-473.500000008,9"]\
            ]\
            },\
            {\
            "type": "DATE",\
            "id": "dateTime",\
            "name": "date%20%26%20time",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5406",\
            "y": "6386",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "hours", "15,0"],\
                    ["NUM#", "minutes", "48,0"],\
                    ["NUM#", "seconds", "6,0"],\
                    ["NUM#", "date", "5,0"],\
                    ["NUM#", "month", "11,0"],\
                    ["NUM#", "year", "2023,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math9",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5629",\
            "y": "6288",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "60,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math11",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5912",\
            "y": "6290",\
            "z": "10",\
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
            "x": "6058",\
            "y": "6289",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "-360,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow3",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6111",\
            "y": "6862",\
            "z": "12",\
            "params":\
            [\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6118",\
            "y": "6703",\
            "z": "13",\
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
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6542",\
            "y": "6344",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-100,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6692",\
            "y": "6344",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6894",\
            "y": "6346",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "scaleX", "10,0"],\
                    ["NUM#", "scaleY", "140,0"],\
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
            "x": "6093",\
            "y": "5284",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "-360,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5503",\
            "y": "4861",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "start", "1,0"],\
                    ["NUM#", "add", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5665",\
            "y": "4861",\
            "z": "19"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5672",\
            "y": "5441",\
            "z": "20",\
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
            "type": "TXTS",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6001",\
            "y": "4834",\
            "z": "21",\
            "params":\
            [\
                    ["TEXT#", "text", "12", "center"],\
                    ["NUM#", "x", "-29,0"],\
                    ["NUM#", "y", "-25,0"],\
                    ["NUM#", "width", "58,0"],\
                    ["NUM#", "height", "50,0"],\
                    ["NUM#", "size", "35,0"],\
                    ["TEXT#", "style", "Black"],\
                    ["NUM#", "alignH", "1,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6463",\
            "y": "4835",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "angle", "-270,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6378",\
            "y": "4455",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "y", "10,0"],\
                    ["NUM#", "blur", "30,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6376",\
            "y": "4134",\
            "z": "24",\
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
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6526",\
            "y": "4134",\
            "z": "25",\
            "width": "120",\
            "height": "90"\
            },\
            {\
            "type": "RECT",\
            "id": "rect2",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6731",\
            "y": "4008",\
            "z": "26",\
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
            "type": "ELPS",\
            "id": "ellipse3",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6650",\
            "y": "7494",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-50,0"]\
            ]\
            },\
            {\
            "type": "TIMER",\
            "id": "timer",\
            "name": "timer",\
            "renamed": "false",\
            "enabled": "false",\
            "highlight": "2",\
            "x": "7997",\
            "y": "5225",\
            "z": "28",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "interval", "1,0"]\
            ]\
            },\
            {\
            "type": "NEG",\
            "id": "neg",\
            "name": "negative",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6569",\
            "y": "5177",\
            "z": "29"\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow2",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6532",\
            "y": "4455",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "blur", "10,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6151",\
            "y": "4834",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "x", "175,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center3",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6708",\
            "y": "6837",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine4",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6355",\
            "y": "6933",\
            "z": "33",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "SMATH",\
            "id": "math5",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6059",\
            "y": "6414",\
            "z": "34",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "-360,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6225",\
            "y": "4241",\
            "z": "35",\
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
            "type": "SMATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6059",\
            "y": "6535",\
            "z": "36",\
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
            "x": "6311",\
            "y": "6711",\
            "z": "37",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "INSH",\
            "id": "innerShadow",\
            "name": "inner%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6225",\
            "y": "4459",\
            "z": "38",\
            "params":\
            [\
                    ["NUM#", "y", "2,0"],\
                    ["NUM#", "blur", "6,0"],\
                    ["NUM#", "spread", "17,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7049.11",\
            "y": "5212",\
            "z": "39",\
            "params":\
            [\
                    ["NUM#", "count", "12,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate3",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7044",\
            "y": "6346",\
            "z": "40",\
            "params":\
            [\
                    ["NUM#", "angle", "-286.899999984,9"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6373",\
            "y": "4242",\
            "z": "41",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 68,0 68,0 68,0 100,0 0,0"],\
                    ["NUM#", "weight", "15,0"],\
                    ["NUM#", "fit", "2,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow4",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6114",\
            "y": "7073",\
            "z": "42",\
            "params":\
            [\
                    ["NUM#", "y", "2,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6280",\
            "y": "5171",\
            "z": "43",\
            "params":\
            [\
                    ["NUM#", "operand", "60,0"]\
            ]\
            },\
            {\
            "type": "RSTX",\
            "id": "reset",\
            "name": "reset%20space",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6619",\
            "y": "4835",\
            "z": "44"\
            },\
            {\
            "type": "SCALE",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6979",\
            "y": "7210",\
            "z": "45",\
            "params":\
            [\
                    ["NUM#", "scaleX", "20,0"],\
                    ["NUM#", "scaleY", "20,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math10",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5768",\
            "y": "6290",\
            "z": "46",\
            "params":\
            []\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7729",\
            "y": "5197",\
            "z": "47",\
            "width": "120",\
            "height": "90"\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6818",\
            "y": "7253",\
            "z": "48",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "20,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6816",\
            "y": "4834",\
            "z": "49",\
            "params":\
            [\
                    ["NUM#", "angle", "270,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6698",\
            "y": "6558",\
            "z": "50",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze3",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6558",\
            "y": "6837",\
            "z": "51",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-100,0"],\
                    ["NUM#", "bias", "-20,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale3",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6900",\
            "y": "6560",\
            "z": "52",\
            "params":\
            [\
                    ["NUM#", "scaleX", "15,0"],\
                    ["NUM#", "scaleY", "120,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale5",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6977",\
            "y": "7494",\
            "z": "53",\
            "params":\
            [\
                    ["NUM#", "scaleX", "10,0"],\
                    ["NUM#", "scaleY", "10,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale4",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6910",\
            "y": "6839",\
            "z": "54",\
            "params":\
            [\
                    ["NUM#", "scaleX", "3.5,1"],\
                    ["NUM#", "scaleY", "142,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math7",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5630",\
            "y": "6413",\
            "z": "55",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "60,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Enable%20the%20timer%20to%20get%20the%20clock%20started.%20%3A",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7802",\
            "y": "5357",\
            "z": "56",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": ")",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8320",\
            "y": "5363",\
            "z": "57",\
            "active": "true"\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze4",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6365",\
            "y": "5531",\
            "z": "58",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-50,0"],\
                    ["NUM#", "bias", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale6",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6515",\
            "y": "5531",\
            "z": "59",\
            "params":\
            [\
                    ["NUM#", "scaleX", "2,0"],\
                    ["NUM#", "scaleY", "10,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6665",\
            "y": "5531",\
            "z": "60",\
            "params":\
            [\
                    ["NUM#", "y", "-150,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate6",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6815",\
            "y": "5531",\
            "z": "61",\
            "params":\
            [\
                    ["NUM#", "angle", "-354,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6979",\
            "y": "5679",\
            "z": "62",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "60,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range2",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6671",\
            "y": "5752",\
            "z": "63",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "-360,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine5",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7320",\
            "y": "7154",\
            "z": "64",\
            "active": "true",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "CMB",\
            "id": "combine6",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7312",\
            "y": "6611",\
            "z": "65",\
            "active": "true",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "ITER",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6378",\
            "y": "5986",\
            "z": "66",\
            "active": "true"\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6194",\
            "y": "5940",\
            "z": "67",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "10,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6196",\
            "y": "6040",\
            "z": "68",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "10,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate7",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7129",\
            "y": "5679",\
            "z": "69"\
            },\
            {\
            "type": "ITER",\
            "id": "define2",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6376",\
            "y": "5781",\
            "z": "70",\
            "active": "true"\
            },\
            {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6192",\
            "y": "5735",\
            "z": "71",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "6,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num6",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6194",\
            "y": "5835",\
            "z": "72",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "2,0"]\
            ]\
            },\
            {\
            "type": "TREPL",\
            "id": "replace",\
            "name": "replace",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5815",\
            "y": "4861",\
            "z": "73",\
            "width": "120",\
            "height": "98",\
            "params":\
            [\
                    ["TEXT#", "what", "0", "center"],\
                    ["TEXT#", "with", "0%C2%A0%C2%A0", "center"],\
                    ["NUM#", "regex", "0,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "dateTime",\
            "outputId": "seconds",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
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
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse2",\
            "inputId": "props",\
            "list": "true"\
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
            "outputNodeId": "math8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math6",\
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
            "outputNodeId": "dateTime",\
            "outputId": "minutes",\
            "outputOrder": "1",\
            "inputNodeId": "math9",\
            "inputId": "h0",\
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
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "trapeze",\
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
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
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
            "outputNodeId": "replace",\
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
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect2",\
            "inputId": "props",\
            "list": "true"\
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
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "timer",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "neg",\
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
            "outputNodeId": "trapeze3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center3",\
            "inputId": "h0",\
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
            "outputNodeId": "math6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math5",\
            "inputId": "h0",\
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
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
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
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "reset",\
            "inputId": "h0",\
            "list": "false"\
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
            "outputNodeId": "combine6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "rotate7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h4",\
            "list": "true"\
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
            "outputNodeId": "neg",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "angle",\
            "list": "false"\
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
            "outputNodeId": "combine4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze3",\
            "inputId": "props",\
            "list": "true"\
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
            "outputNodeId": "dateTime",\
            "outputId": "hours",\
            "outputOrder": "0",\
            "inputNodeId": "math7",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "trapeze4",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "define2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale6",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale6",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "rotate6",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine5",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h2",\
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
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "define",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "define",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "define",\
            "inputId": "h4",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate7",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "define2",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "define2",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "define2",\
            "inputId": "h4",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "replace",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';