const presetRainbowStrips = '\
    {\
    "generatorVersion": "433",\
    "nodes":\
    [\
        {\
        "type": "FRM",\
        "created": "1718360443280",\
        "updated": "1719147784212",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19472",\
        "y": "15225",\
        "z": "0",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "1920,0"],\
                ["NUM#", "height", "1080,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1718360456305",\
        "updated": "1718360458183",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19319",\
        "y": "15428",\
        "z": "1",\
        "k3201": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1718360478504",\
        "updated": "1718360782427",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17911",\
        "y": "14498",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "x", "2120,0"],\
                ["NUM#", "y", "-100,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1718360490439",\
        "updated": "1718360807602",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17594",\
        "y": "14641",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "start", "-200,0"],\
                ["NUM#", "end", "2120,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1718360507816",\
        "updated": "1718360815666",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19044",\
        "y": "15249",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "count", "400,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1718360478504",\
        "updated": "1718360634839",\
        "id": "point2",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17915",\
        "y": "15154",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "x", "2120,0"],\
                ["NUM#", "y", "1180,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1718360478504",\
        "updated": "1718361546241",\
        "id": "point3",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17905",\
        "y": "14802",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "x", "2228.783511357483,0"],\
                ["NUM#", "y", "1065.100627205076,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1718360580054",\
        "updated": "1718361000438",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18065",\
        "y": "14802",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1718360613271",\
        "updated": "1718361580112",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17474",\
        "y": "15221",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "seed", "4625,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-200,0"],\
                ["NUM#", "max", "200,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "13.566000000000082,3"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1718360613271",\
        "updated": "1718360833406",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17595",\
        "y": "14775",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "seed", "5613,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-200,0"],\
                ["NUM#", "max", "200,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "13.566000000000082,3"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1718360680816",\
        "updated": "1718360683824",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17755",\
        "y": "14708",\
        "z": "10"\
        },\
        {\
        "type": "NUM",\
        "created": "1718360686945",\
        "updated": "1718360697537",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17253.1",\
        "y": "14864",\
        "z": "11",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "200,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1718360695421",\
        "updated": "1718360698763",\
        "id": "neg",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17416",\
        "y": "14835",\
        "z": "12"\
        },\
        {\
        "type": "CMB",\
        "created": "1718360749273",\
        "updated": "1718360775300",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18325.1",\
        "y": "14799",\
        "z": "13",\
        "width": "116.00716137162834",\
        "height": "64"\
        },\
        {\
        "type": "VPATH",\
        "created": "1718360755481",\
        "updated": "1718360872072",\
        "id": "path",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18807",\
        "y": "14795",\
        "z": "14",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1718360810651",\
        "updated": "1718361000438",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18358.1",\
        "y": "15479.2",\
        "z": "15",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "SEQ",\
        "created": "1718360822671",\
        "updated": "1718361546241",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17180",\
        "y": "15497",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "add", "0.03400000000000002,3"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1718360872072",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18455",\
        "y": "14947",\
        "z": "17",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 62,0 0,0 156,0 100,0 0,0"],\
                ["NUM#", "weight", "30,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1718361226738",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18293",\
        "y": "14973",\
        "z": "18",\
        "k3201": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "264,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "61,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1718360979734",\
        "updated": "1718361558218",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17855.1",\
        "y": "15004",\
        "z": "19",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "SEQ",\
        "created": "1718361052361",\
        "updated": "1718361139290",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17420",\
        "y": "15941",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "start", "75,0"],\
                ["NUM#", "add", "-7,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1718361090533",\
        "updated": "1718361174627",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17580",\
        "y": "15941",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1718361102541",\
        "updated": "1718361174627",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17913",\
        "y": "15894",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "ITER",\
        "created": "1718361114558",\
        "updated": "1718361139290",\
        "id": "iterate",\
        "name": "iterate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18073",\
        "y": "15894",\
        "z": "23"\
        },\
        {\
        "type": "NUM",\
        "created": "1718361148961",\
        "updated": "1718361148963",\
        "id": "num2",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17421.1",\
        "y": "15852.6",\
        "z": "24",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "100,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1718361166777",\
        "updated": "1718361174627",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17740.1",\
        "y": "15887",\
        "z": "25",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "SEQ",\
        "created": "1718361216569",\
        "updated": "1718361804654",\
        "id": "sequence3",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17884",\
        "y": "15622",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "start", "225,0"],\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1718361510728",\
        "updated": "1718361558218",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17479",\
        "y": "15100",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "start", "100,0"],\
                ["NUM#", "end", "980,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1718361539127",\
        "updated": "1718361546241",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17648",\
        "y": "15162",\
        "z": "28"\
        },\
        {\
        "type": "NUM",\
        "created": "1718360686945",\
        "updated": "1718361580112",\
        "id": "num3",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17102.8",\
        "y": "15300",\
        "z": "29",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "200,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1718360695421",\
        "updated": "1718361577774",\
        "id": "neg2",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17266",\
        "y": "15271",\
        "z": "30"\
        },\
        {\
        "type": "RAND",\
        "created": "1718361784838",\
        "updated": "1718361784840",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17519",\
        "y": "15624",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "seed", "9467,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1718361792500",\
        "updated": "1718361804654",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17679",\
        "y": "15624",\
        "z": "32"\
        },\
        {\
        "type": "CMB",\
        "created": "1718361926567",\
        "updated": "1718361944681",\
        "id": "combine5",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18647.5",\
        "y": "15160",\
        "z": "33",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "DRSH",\
        "created": "1718361942382",\
        "updated": "1718361944681",\
        "id": "dropShadow",\
        "name": "drop%20shadow",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18455",\
        "y": "15190",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "blur", "50,0"],\
                ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1718360794463",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1718360458183",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1718360807602",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1718360782427",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718360815665",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1718360807602",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "point2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1718360683824",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point3",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1718361546241",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1718360580056",\
        "outputNodeId": "point3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718361000437",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1718361577774",\
        "outputNodeId": "neg2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1718361580111",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "noise",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1718360835718",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "evolve",\
        "list": "false"\
        },\
        {\
        "created": "1718360698762",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1718360689356",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1718360833406",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "evolve",\
        "list": "false"\
        },\
        {\
        "created": "1718360807602",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718360680818",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1718360697537",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "neg",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718360749274",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718360749274",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1718360749274",\
        "outputNodeId": "point2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1718360775300",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1718361926569",\
        "outputNodeId": "combine5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1718360810652",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "5",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718360841391",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1705642638294",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1718361226738",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1718361139289",\
        "outputNodeId": "iterate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1718360979735",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718360979735",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1718361558217",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1718361090534",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718361093178",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1718361174627",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1718361114559",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1718361166778",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718361166779",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1718361804654",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "sequence3",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1718361539128",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718361539129",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1718360697537",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "neg2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718361792501",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718361926568",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1718361944681",\
        "outputNodeId": "dropShadow",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
}';