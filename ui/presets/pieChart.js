const presetPieChart = '\
{\
    "generatorVersion": "339",\
    "nodes":\
    [\
        {\
        "type": "MATH",\
        "created": "1705770924189",\
        "updated": "1705771002960",\
        "id": "math18",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3556",\
        "y": "682",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"]\
        ]\
        },\
        {\
        "type": "FETCH",\
        "created": "1705766418769",\
        "updated": "1705766450404",\
        "id": "fetch",\
        "name": "fetch",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-461.377",\
        "y": "191.41",\
        "z": "1",\
        "width": "327.46362583033977",\
        "height": "54",\
        "params":\
        [\
                ["TEXT#", "request", "https%3A%2F%2Fdummyjson.com%2Fuser", "center"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1705766497838",\
        "updated": "1705899446970",\
        "id": "select",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "87",\
        "y": "218",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1705766681630",\
        "updated": "1705901285160",\
        "id": "select2",\
        "name": "select",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1522",\
        "y": "269",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "ACCUM",\
        "created": "1705767319750",\
        "updated": "1705770353713",\
        "id": "accum",\
        "name": "accumulate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "2",\
        "notCondition": "false",\
        "x": "2796",\
        "y": "328",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "when", "1,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1705770362496",\
        "updated": "1705856356613",\
        "id": "cache2",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2956",\
        "y": "328",\
        "z": "5"\
        },\
        {\
        "type": "NUM",\
        "created": "1705821597730",\
        "updated": "1705901285160",\
        "id": "num3",\
        "name": "number%20of%20arcs",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "7",\
        "notCondition": "false",\
        "x": "1672.77",\
        "y": "-570.921",\
        "z": "6",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "1,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1705839492764",\
        "updated": "1705852515791",\
        "id": "math12",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2251",\
        "y": "-442",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1705839609906",\
        "updated": "1705852981683",\
        "id": "math16",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2778",\
        "y": "-590",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1705852964542",\
        "updated": "1705853034181",\
        "id": "math17",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2797",\
        "y": "-165",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"]\
        ]\
        },\
        {\
        "type": "SGRP",\
        "created": "1705767688454",\
        "updated": "1705825417984",\
        "id": "group",\
        "name": "group",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4526",\
        "y": "981",\
        "z": "10"\
        },\
        {\
        "type": "REPT",\
        "created": "1705766977307",\
        "updated": "1705901299340",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4964",\
        "y": "2050",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "count", "7,0"]\
        ]\
        },\
        {\
        "type": "LIST",\
        "created": "1705859115795",\
        "updated": "1705906826428",\
        "id": "list",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "703",\
        "y": "572",\
        "z": "12",\
        "active": "true",\
        "width": "120",\
        "height": "648",\
        "divider": "0.25",\
        "scroll": "0",\
        "params":\
        [\
                ["TEXT#", "0", "id", "left"],\
                ["TEXT#", "1", "firstName", "left"],\
                ["TEXT#", "2", "lastName", "left"],\
                ["TEXT#", "3", "maidenName", "left"],\
                ["TEXT#", "4", "age", "left"],\
                ["TEXT#", "5", "gender", "left"],\
                ["TEXT#", "6", "email", "left"],\
                ["TEXT#", "7", "phone", "left"],\
                ["TEXT#", "8", "username", "left"],\
                ["TEXT#", "9", "password", "left"],\
                ["TEXT#", "10", "birthDate", "left"],\
                ["TEXT#", "11", "image", "left"],\
                ["TEXT#", "12", "bloodGroup", "left"],\
                ["TEXT#", "13", "height", "left"],\
                ["TEXT#", "14", "weight", "left"],\
                ["TEXT#", "15", "eyeColor", "left"],\
                ["TEXT#", "16", "hair", "left"],\
                ["TEXT#", "17", "domain", "left"],\
                ["TEXT#", "18", "ip", "left"],\
                ["TEXT#", "19", "address", "left"],\
                ["TEXT#", "20", "macAddress", "left"],\
                ["TEXT#", "21", "university", "left"],\
                ["TEXT#", "22", "bank", "left"],\
                ["TEXT#", "23", "company", "left"],\
                ["TEXT#", "24", "ein", "left"],\
                ["TEXT#", "25", "ssn", "left"],\
                ["TEXT#", "26", "userAgent", "left"],\
                ["TEXT#", "27", "crypto", "left"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1705856687582",\
        "updated": "1705856689788",\
        "id": "select4",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "393",\
        "y": "464",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1705767127712",\
        "updated": "1705906826428",\
        "id": "panel3",\
        "name": "DATA",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-509",\
        "y": "86",\
        "z": "14",\
        "width": "765.3002257276189",\
        "height": "288",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1705821418700",\
        "updated": "1705906826428",\
        "id": "panel4",\
        "name": "ARCS",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "5",\
        "notCondition": "false",\
        "x": "3144",\
        "y": "-651",\
        "z": "15",\
        "width": "933",\
        "height": "767.983409940748",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1705847194815",\
        "updated": "1705898345952",\
        "id": "math8",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2587",\
        "y": "30",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "operand", "0.5,1"]\
        ]\
        },\
        {\
        "type": "LIST",\
        "created": "1705898485414",\
        "updated": "1705906826428",\
        "id": "list2",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "943",\
        "y": "-26",\
        "z": "17",\
        "active": "true",\
        "width": "120",\
        "height": "186",\
        "divider": "0.3416666666666667",\
        "scroll": "0",\
        "params":\
        [\
                ["TEXT#", "bloodGroup0", "A-", "left"],\
                ["TEXT#", "bloodGroup1", "O%2B", "left"],\
                ["TEXT#", "bloodGroup3", "B%2B", "left"],\
                ["TEXT#", "bloodGroup5", "A%2B", "left"],\
                ["TEXT#", "bloodGroup6", "B-", "left"],\
                ["TEXT#", "bloodGroup11", "O-", "left"],\
                ["TEXT#", "bloodGroup17", "AB-", "left"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705767478291",\
        "updated": "1705771184564",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2182",\
        "y": "907",\
        "z": "18",\
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
        "type": "NUM",\
        "created": "1705838928548",\
        "updated": "1705852910604",\
        "id": "num6",\
        "name": "end",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "7",\
        "notCondition": "false",\
        "x": "1676.77",\
        "y": "-49.921",\
        "z": "19",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "50,0"]\
        ]\
        },\
        {\
        "type": "SORT",\
        "created": "1705899514002",\
        "updated": "1705901179630",\
        "id": "sort",\
        "name": "sort",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1060",\
        "y": "251",\
        "z": "20",\
        "params":\
        [\
                ["LIST#", "indices", "7 NUM# 6,0 NUM# 2,0 NUM# 3,0 NUM# 4,0 NUM# 5,0 NUM# 0,0 NUM# 1,0"]\
        ]\
        },\
        {\
        "type": "GVNAMES",\
        "created": "1705859108485",\
        "updated": "1705859108491",\
        "id": "getNames",\
        "name": "get%20names",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "543",\
        "y": "464",\
        "z": "21"\
        },\
        {\
        "type": "PANEL",\
        "created": "1705767099541",\
        "updated": "1705906826428",\
        "id": "panel2",\
        "name": "SWEEP",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "6",\
        "notCondition": "false",\
        "x": "1881",\
        "y": "239",\
        "z": "22",\
        "width": "679.5826302121978",\
        "height": "265",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1705839561273",\
        "updated": "1705853034181",\
        "id": "math14",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2957",\
        "y": "-44",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1705766722787",\
        "updated": "1705767349857",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2166",\
        "y": "316",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "TJSON",\
        "created": "1705766478651",\
        "updated": "1705766499974",\
        "id": "json",\
        "name": "json",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "-94",\
        "y": "191",\
        "z": "25"\
        },\
        {\
        "type": "IF",\
        "created": "1705771180769",\
        "updated": "1705902008803",\
        "id": "ifElse",\
        "name": "if%2Felse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2411",\
        "y": "853",\
        "z": "26"\
        },\
        {\
        "type": "MATH",\
        "created": "1705839537582",\
        "updated": "1705852841337",\
        "id": "math15",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2406",\
        "y": "-486",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1705766834465",\
        "updated": "1705851001429",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3690",\
        "y": "-574",\
        "z": "28",\
        "innerAbsolute": "true",\
        "sweepInDegrees": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "width", "53.84615384615385,1"],\
                ["NUM#", "height", "53.84615384615385,1"],\
                ["NUM#", "inner", "50,1"],\
                ["NUM#", "start", "275.75,7"],\
                ["NUM#", "sweep", "83.5,7"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1705771241889",\
        "updated": "1705847496975",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3904",\
        "y": "-133",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "count", "7,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1705767751420",\
        "updated": "1705824502918",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3660",\
        "y": "1481",\
        "z": "30",\
        "params":\
        [\
                ["NUM#", "x", "120,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "LIST",\
        "created": "1705898552760",\
        "updated": "1705906826428",\
        "id": "list3",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1090",\
        "y": "-29",\
        "z": "31",\
        "active": "true",\
        "width": "120",\
        "height": "186",\
        "divider": "0.25",\
        "scroll": "0",\
        "params":\
        [\
                ["NUM#", "0", "7,0"],\
                ["NUM#", "1", "7,0"],\
                ["NUM#", "2", "2,0"],\
                ["NUM#", "3", "3,0"],\
                ["NUM#", "4", "4,0"],\
                ["NUM#", "5", "6,0"],\
                ["NUM#", "6", "1,0"]\
        ]\
        },\
        {\
        "type": "PLACE",\
        "created": "1705822742935",\
        "updated": "1705856389531",\
        "id": "place",\
        "name": "place",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4007",\
        "y": "1317",\
        "z": "32",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "CLMN",\
        "created": "1705766562210",\
        "updated": "1705902082072",\
        "id": "column",\
        "name": "column",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "411",\
        "y": "224",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "index", "12,0"]\
        ]\
        },\
        {\
        "type": "TXTS",\
        "created": "1705767461626",\
        "updated": "1705901228451",\
        "id": "text",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3135",\
        "y": "1317",\
        "z": "34",\
        "params":\
        [\
                ["TEXT#", "text", "O%2B", "center"],\
                ["NUM#", "size", "7,0"],\
                ["TEXT#", "style", "Regular"],\
                ["NUM#", "alignH", "1,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1705766945629",\
        "updated": "1705770576911",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "798",\
        "y": "1863",\
        "z": "35",\
        "params":\
        [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1705847194815",\
        "updated": "1705847301833",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3481",\
        "y": "-243",\
        "z": "36",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "operand", "0.25,1"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1705768649128",\
        "updated": "1705768823592",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1042.99",\
        "y": "1629.35",\
        "z": "37",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1705847464745",\
        "updated": "1705851029568",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3555.39",\
        "y": "-75.059",\
        "z": "38",\
        "width": "98.5763638556769",\
        "height": "51"\
        },\
        {\
        "type": "MATH",\
        "created": "1705843408378",\
        "updated": "1705852619249",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2604",\
        "y": "-598",\
        "z": "39",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1705839481469",\
        "updated": "1705847822554",\
        "id": "math7",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2106",\
        "y": "-439",\
        "z": "40",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "operand", "0.5,1"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1705836453589",\
        "updated": "1705851737840",\
        "id": "math9",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3405",\
        "y": "-559",\
        "z": "41",\
        "params":\
        [\
                ["NUM#", "operand", "53.84615384615385,1"],\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "invert", "1,0"]\
        ]\
        },\
        {\
        "type": "UNIQ",\
        "created": "1705766636317",\
        "updated": "1705901166355",\
        "id": "unique",\
        "name": "unique",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "614",\
        "y": "228",\
        "z": "42",\
        "params":\
        [\
                ["LIST#", "counts", "7 NUM# 7,0 NUM# 7,0 NUM# 2,0 NUM# 3,0 NUM# 4,0 NUM# 6,0 NUM# 1,0"],\
                ["LIST#", "indices", "7 LIST# 7 NUM# 0,0 NUM# 2,0 NUM# 7,0 NUM# 18,0 NUM# 20,0 NUM# 26,0 NUM# 28,0 LIST# 7 NUM# 1,0 NUM# 4,0 NUM# 9,0 NUM# 12,0 NUM# 13,0 NUM# 23,0 NUM# 24,0 LIST# 2 NUM# 3,0 NUM# 15,0 LIST# 3 NUM# 5,0 NUM# 8,0 NUM# 14,0 LIST# 4 NUM# 6,0 NUM# 10,0 NUM# 21,0 NUM# 27,0 LIST# 6 NUM# 11,0 NUM# 16,0 NUM# 19,0 NUM# 22,0 NUM# 25,0 NUM# 29,0 LIST# 1 NUM# 17,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705767478291",\
        "updated": "1705771183145",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2179",\
        "y": "806",\
        "z": "43",\
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
        "type": "SMATH",\
        "created": "1705766880545",\
        "updated": "1705856345660",\
        "id": "math4",\
        "name": "start",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2372",\
        "y": "323",\
        "z": "44",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "360,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1705767587950",\
        "updated": "1705841988579",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4481.63",\
        "y": "2091.37",\
        "z": "45",\
        "width": "111.48325715468533",\
        "height": "77"\
        },\
        {\
        "type": "SMATH",\
        "created": "1705850983916",\
        "updated": "1705851010151",\
        "id": "math11",\
        "name": "arc%20gaps",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "5",\
        "notCondition": "false",\
        "x": "3452",\
        "y": "-405",\
        "z": "46",\
        "params":\
        [\
                ["NUM#", "operand", "0,1"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1705771356311",\
        "updated": "1705852246494",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3214",\
        "y": "-110",\
        "z": "47",\
        "params":\
        [\
                ["NUM#", "start", "100,0"],\
                ["NUM#", "end", "53.84615384615385,1"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1705838928548",\
        "updated": "1705852910604",\
        "id": "num2",\
        "name": "start",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "7",\
        "notCondition": "false",\
        "x": "1678.77",\
        "y": "-133.921",\
        "z": "48",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "100,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1705839318976",\
        "updated": "1705852968499",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2153",\
        "y": "-186",\
        "z": "49",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"]\
        ]\
        },\
        {\
        "type": "NPREC",\
        "created": "1705767184636",\
        "updated": "1705767184644",\
        "id": "precision",\
        "name": "precision",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1952",\
        "y": "283",\
        "z": "50",\
        "params":\
        [\
                ["NUM#", "decimals", "7,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1705768875771",\
        "updated": "1705901188448",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1203",\
        "y": "1629",\
        "z": "51"\
        },\
        {\
        "type": "MATH",\
        "created": "1705766715796",\
        "updated": "1705766730815",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1952",\
        "y": "412",\
        "z": "52"\
        },\
        {\
        "type": "ROT",\
        "created": "1705767795587",\
        "updated": "1705856389531",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3821",\
        "y": "1481",\
        "z": "53",\
        "params":\
        [\
                ["NUM#", "angle", "-318,7"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1705822707793",\
        "updated": "1705824052964",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3499",\
        "y": "1481",\
        "z": "54"\
        },\
        {\
        "type": "SMATH",\
        "created": "1705768602037",\
        "updated": "1705856356613",\
        "id": "math20",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3402",\
        "y": "612",\
        "z": "55",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "-1,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1705767836983",\
        "updated": "1705856345660",\
        "id": "math19",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3396",\
        "y": "743",\
        "z": "56",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "COUNT",\
        "created": "1705766957754",\
        "updated": "1705766984298",\
        "id": "count",\
        "name": "count",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1527",\
        "y": "502",\
        "z": "57",\
        "params":\
        [\
                ["NUM#", "value", "7,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1705839537582",\
        "updated": "1705906826428",\
        "id": "math13",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2408",\
        "y": "-393",\
        "z": "58",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1705847290587",\
        "updated": "1705898332217",\
        "id": "math10",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "2787",\
        "y": "67",\
        "z": "59",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1705901162954",\
        "updated": "1705901228451",\
        "id": "select5",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1774",\
        "y": "1347",\
        "z": "60",\
        "params":\
        [\
                ["NUM#", "index", "1,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1705901162954",\
        "updated": "1705901197851",\
        "id": "select6",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1632",\
        "y": "1430",\
        "z": "61",\
        "params":\
        [\
                ["NUM#", "index", "6,0"]\
        ]\
        },\
        {\
        "type": "TXTS",\
        "created": "1705767461626",\
        "updated": "1705902094654",\
        "id": "text2",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4968",\
        "y": "2371",\
        "z": "62",\
        "params":\
        [\
                ["TEXT#", "text", "Blood%20Group", "center"],\
                ["TEXT#", "style", "Regular"],\
                ["NUM#", "alignH", "1,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1705902040147",\
        "updated": "1705906826428",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "5",\
        "notCondition": "false",\
        "x": "5309.82",\
        "y": "2206.77",\
        "z": "63",\
        "active": "true",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1705902075667",\
        "updated": "1705902094654",\
        "id": "select3",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "703",\
        "y": "464",\
        "z": "64",\
        "params":\
        [\
                ["NUM#", "index", "12,0"]\
        ]\
        },\
        {\
        "type": "TREPL",\
        "created": "1705902154327",\
        "updated": "1705902154335",\
        "id": "replace",\
        "name": "replace",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "863",\
        "y": "464",\
        "z": "65",\
        "width": "120",\
        "height": "98",\
        "params":\
        [\
                ["TEXT#", "what", "(%5Ba-z%5D)(%5BA-Z%5D)", "center"],\
                ["TEXT#", "with", "%241%20%242", "center"],\
                ["NUM#", "regex", "1,0"]\
        ]\
        },\
        {\
        "type": "TCASE",\
        "created": "1705902198375",\
        "updated": "1705902198383",\
        "id": "case",\
        "name": "case",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "1023",\
        "y": "464",\
        "z": "66",\
        "params":\
        [\
                ["NUM#", "case", "2,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1705856308041",\
        "outputNodeId": "math20",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math18",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856308041",\
        "outputNodeId": "math19",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math18",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "json",\
        "outputId": "value",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705899535097",\
        "outputNodeId": "sort",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select2",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "accum",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "accum",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705901285159",\
        "outputNodeId": "select2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "num3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "math12",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "math12",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math16",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "math17",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math16",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math17",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "group",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "place",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "group",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "group",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "count",\
        "outputId": "value",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1705859115799",\
        "outputNodeId": "getNames",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "list",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856689787",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "select4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "9",\
        "inputNodeId": "math8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705898487493",\
        "outputNodeId": "unique",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "list2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705900911336",\
        "outputNodeId": "unique",\
        "outputId": "counts",\
        "outputOrder": "4",\
        "inputNodeId": "sort",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705859108489",\
        "outputNodeId": "select4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "getNames",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math14",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math17",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math14",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "precision",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "fetch",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "json",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math15",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math12",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math15",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math11",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math9",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "ellipse",\
        "inputId": "inner",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "sweep",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1705856308041",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705899218170",\
        "outputNodeId": "unique",\
        "outputId": "counts",\
        "outputOrder": "3",\
        "inputNodeId": "list3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "text",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "place",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856389531",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "place",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1705899498552",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "column",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705901228451",\
        "outputNodeId": "select5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math6",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "5",\
        "inputNodeId": "num",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "14",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "5",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math15",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "6",\
        "inputNodeId": "math5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math16",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math9",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "10",\
        "inputNodeId": "math9",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "column",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "unique",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "6",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "5",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "18",\
        "inputNodeId": "math11",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math14",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "select2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "precision",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "unique",\
        "outputId": "counts",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856308041",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856308041",\
        "outputNodeId": "math18",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1705856356613",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "math20",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856345659",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "10",\
        "inputNodeId": "math19",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "unique",\
        "outputId": "counts",\
        "outputOrder": "2",\
        "inputNodeId": "count",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math13",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705856250111",\
        "outputNodeId": "math12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math13",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705898345952",\
        "outputNodeId": "math8",\
        "outputId": "operand",\
        "outputOrder": "0",\
        "inputNodeId": "math10",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705901166353",\
        "outputNodeId": "unique",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "select5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705901197851",\
        "outputNodeId": "select6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select5",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1705901179629",\
        "outputNodeId": "sort",\
        "outputId": "indices",\
        "outputOrder": "0",\
        "inputNodeId": "select6",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705901188447",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "select6",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1705902198382",\
        "outputNodeId": "case",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "created": "1705902008802",\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "text2",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1705902040153",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705902040153",\
        "outputNodeId": "text2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705902075671",\
        "outputNodeId": "getNames",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1705902082071",\
        "outputNodeId": "column",\
        "outputId": "index",\
        "outputOrder": "0",\
        "inputNodeId": "select3",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1705902154333",\
        "outputNodeId": "select3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "replace",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705902198380",\
        "outputNodeId": "replace",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "case",\
        "inputId": "h0",\
        "list": "false"\
        }\
    ]\
}';