const presetCircleFields2 = '\
{\
    "generatorVersion": "415",\
    "nodes":\
    [\
        {\
        "type": "SCENTR",\
        "created": "1704360856231",\
        "updated": "1704360856244",\
        "id": "center",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5991",\
        "y": "5083",\
        "z": "0"\
        },\
        {\
        "type": "NUM",\
        "created": "1704340970659",\
        "updated": "1704357327126",\
        "id": "num3",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3676",\
        "y": "4444.13",\
        "z": "1",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "300,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1704340855425",\
        "updated": "1704357343395",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4180",\
        "y": "4458",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "seed", "7606,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "143,0"],\
                ["NUM#", "max", "457,0"],\
                ["NUM#", "scale", "2,0"],\
                ["NUM#", "offset", "1.5800000000000012,2"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "ITEMS",\
        "created": "1704341058359",\
        "updated": "1709372191462",\
        "id": "list",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4736",\
        "y": "4541.13",\
        "z": "3",\
        "width": "120",\
        "height": "98",\
        "divider": "0.25",\
        "scroll": "0",\
        "params":\
        [\
                ["PT#", "0", "291.5155255130929,0 275.72897479631575,0"],\
                ["PT#", "1", "289.3455680089843,0 337.3143739046257,0"],\
                ["PT#", "2", "234.67054461660598,0 339.94568118617093,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1704341174030",\
        "updated": "1709372203414",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5290",\
        "y": "4532",\
        "z": "4",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "260.4118962107344,10"],\
                ["NUM#", "y", "305.4639691643716,10"],\
                ["NUM#", "width", "43.030287540833854,-2"],\
                ["NUM#", "height", "43.030287540833854,-2"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1704341459045",\
        "updated": "1704360818359",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5666",\
        "y": "5083",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "count", "160,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1704341474402",\
        "updated": "1704356955320",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3938",\
        "y": "5151",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "add", "0.009999999999999997,2"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1704341531801",\
        "updated": "1704369594459",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4760",\
        "y": "4900",\
        "z": "7",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "161.0209083078583,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "RSTX",\
        "created": "1704358211335",\
        "updated": "1704360832248",\
        "id": "reset",\
        "name": "reset%20space",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5829",\
        "y": "5083",\
        "z": "8"\
        },\
        {\
        "type": "NUM",\
        "created": "1704340970659",\
        "updated": "1704357337665",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3677",\
        "y": "4613.13",\
        "z": "9",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "157,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1704357040074",\
        "updated": "1704357044500",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4925",\
        "y": "4891",\
        "z": "10",\
        "params":\
        [\
                ["COL#", "color", "1,0 0,0 255,0 174,0"],\
                ["NUM#", "opacity", "10,0"],\
                ["NUM#", "blend", "7,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1704340894215",\
        "updated": "1704356745816",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4580",\
        "y": "4541",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "count", "3,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1704357085560",\
        "updated": "1704368825712",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6348",\
        "y": "5245",\
        "z": "12",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "268,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "25.098039215686274,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1704341622469",\
        "updated": "1704368952095",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4921",\
        "y": "5141",\
        "z": "13",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "PT",\
        "created": "1704340880091",\
        "updated": "1704340890724",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4392",\
        "y": "4508",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "x", "234.67054461660598,0"],\
                ["NUM#", "y", "339.94568118617093,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1704357072679",\
        "updated": "1715190038635",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6594",\
        "y": "4949",\
        "z": "15",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "600,0"],\
                ["NUM#", "height", "600,0"],\
                ["NUM#", "round", "10,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1704340855425",\
        "updated": "1704357345832",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4179",\
        "y": "4678",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "seed", "241,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "143,0"],\
                ["NUM#", "max", "457,0"],\
                ["NUM#", "scale", "2,0"],\
                ["NUM#", "offset", "1.5800000000000012,2"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1704341373778",\
        "updated": "1704344354685",\
        "id": "point2",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5116",\
        "y": "4531",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "x", "260.4118962107344,10"],\
                ["NUM#", "y", "305.4639691643716,10"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1704340974203",\
        "updated": "1704357345832",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3902",\
        "y": "4656",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1704340974203",\
        "updated": "1704357341142",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3903",\
        "y": "4555",\
        "z": "19"\
        },\
        {\
        "type": "STRK",\
        "created": "1704341528646",\
        "updated": "1704370012391",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5116",\
        "y": "4876.24",\
        "z": "20",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 0,0 255,0 174,0 10,0 7,0"],\
                ["NUM#", "weight", "12.447655997778142,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1704341729191",\
        "updated": "1704356742820",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4392",\
        "y": "4621.13",\
        "z": "21",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CIRCEN",\
        "created": "1704341107283",\
        "updated": "1709372046790",\
        "id": "circleCenter",\
        "name": "circle%20center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4907",\
        "y": "4581",\
        "z": "22"\
        },\
        {\
        "type": "ROT",\
        "created": "1704358176960",\
        "updated": "1704368194499",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "false",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6150",\
        "y": "5085",\
        "z": "23"\
        },\
        {\
        "type": "RAND",\
        "created": "1704368796756",\
        "updated": "1704368825712",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6134",\
        "y": "5320",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "seed", "2353,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1704369589295",\
        "updated": "1704369594459",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4569",\
        "y": "4953",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "seed", "197,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1704369589295",\
        "updated": "1704370012391",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4749",\
        "y": "5233",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "seed", "9359,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "20,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"],\
                ["NUM#", "detail", "4,0"]\
        ]\
        },\
        {\
        "type": "MESPT",\
        "created": "1709372024419",\
        "updated": "1709372203414",\
        "id": "measure",\
        "name": "measure",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5124",\
        "y": "4668",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "length", "43.030287540833854,-2"],\
                ["NUM#", "angle", "126.74214340190639,-2"]\
        ]\
        },\
        {\
        "type": "VECLEN",\
        "created": "1709372038740",\
        "updated": "1709372191462",\
        "id": "vector",\
        "name": "vector",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4974",\
        "y": "4666",\
        "z": "28"\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1704360856240",\
        "outputNodeId": "reset",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "center",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1704357343394",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1704357333791",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "offset",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "list",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "point2",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "point2",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709372201415",\
        "outputNodeId": "measure",\
        "outputId": "length",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1709372203413",\
        "outputNodeId": "measure",\
        "outputId": "length",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1704357782768",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1704369594458",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1704358211338",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "reset",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1704357042728",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704356742819",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1704368825711",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1704356942653",\
        "outputNodeId": "list",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1704356955318",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1704360825676",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1704357137421",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1704357345831",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise2",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1704357341141",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise2",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1704356437990",\
        "outputNodeId": "noise",\
        "outputId": "scale",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "scale",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise2",\
        "inputId": "offset",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "circleCenter",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704357327126",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704357331407",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "math",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1704357324154",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704357329246",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1704357044500",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1704370012390",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "weight",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "list",\
        "outputId": "0",\
        "outputOrder": "0",\
        "inputNodeId": "circleCenter",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "list",\
        "outputId": "1",\
        "outputOrder": "0",\
        "inputNodeId": "circleCenter",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1704352996225",\
        "outputNodeId": "list",\
        "outputId": "2",\
        "outputOrder": "0",\
        "inputNodeId": "circleCenter",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1704360856243",\
        "outputNodeId": "center",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709372042537",\
        "outputNodeId": "vector",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "measure",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709372046790",\
        "outputNodeId": "circleCenter",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "vector",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709372191461",\
        "outputNodeId": "list",\
        "outputId": "2",\
        "outputOrder": "1",\
        "inputNodeId": "vector",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
}';