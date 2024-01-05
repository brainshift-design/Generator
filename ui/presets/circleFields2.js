const presetCircleFields2 = '\
    {\
        "nodes":\
        [\
        {\
            "type": "CENTR",\
            "created": "1704360856231",\
            "updated": "1704360856244",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5841",\
            "y": "4933",\
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
            "x": "3526",\
            "y": "4380",\
            "z": "1",\
            "width": "120",\
            "height": "32",\
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
            "x": "4030",\
            "y": "4406",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "seed", "1473,0"],\
                ["NUM#", "min", "143,0"],\
                ["NUM#", "max", "457,0"],\
                ["NUM#", "scale", "2,0"],\
                ["NUM#", "offset", "1.5799999999999994,2"]\
            ]\
        },\
        {\
            "type": "LIST",\
            "created": "1704341058359",\
            "updated": "1704356942655",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4586",\
            "y": "4477",\
            "z": "3",\
            "width": "120",\
            "height": "98",\
            "scroll": "0",\
            "params":\
            [\
                ["PT#", "0", "301.5845805127189,0 190.51914480048504,0"],\
                ["PT#", "1", "351.63811988241827,0 212.0916403704625,0"],\
                ["PT#", "2", "393.3030420281949,0 243.7980813180718,0"]\
            ]\
        },\
        {\
            "type": "ELPS",\
            "created": "1704341174030",\
            "updated": "1704356939158",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5140",\
            "y": "4468",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "240.2414027619797,9"],\
                ["NUM#", "y", "401.7050890555764,10"],\
                ["NUM#", "width", "219.9147300829877,9"],\
                ["NUM#", "height", "219.9147300829877,9"]\
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
            "x": "5516",\
            "y": "4933",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "count", "160,0"]\
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
            "x": "3788",\
            "y": "5001",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "add", "0.009999999999999997,2"],\
                ["NUM#", "end", "?,0"]\
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
            "x": "4610",\
            "y": "4750",\
            "z": "7",\
            "g3176": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "34.16543377342748,0"],\
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
            "x": "5679",\
            "y": "4933",\
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
            "x": "3527",\
            "y": "4549",\
            "z": "9",\
            "width": "120",\
            "height": "32",\
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
            "x": "4775",\
            "y": "4741",\
            "z": "10",\
            "params":\
            [\
                ["COL#", "color", "1,0 255,0 145,0 0,0"],\
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
            "x": "4430",\
            "y": "4477",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "count", "3,0"]\
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
            "x": "6198",\
            "y": "5095",\
            "z": "12",\
            "g3176": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "230,0"],\
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
            "x": "4771",\
            "y": "4991",\
            "z": "13",\
            "width": "120",\
            "height": "32"\
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
            "x": "4242",\
            "y": "4444",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "x", "393.3030420281949,0"],\
                ["NUM#", "y", "243.7980813180718,0"]\
            ]\
        },\
        {\
            "type": "FRM",\
            "created": "1704357072679",\
            "updated": "1704388052954",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6444",\
            "y": "4799",\
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
            "x": "4029",\
            "y": "4605",\
            "z": "16",\
            "params":\
            [\
                ["NUM#", "seed", "5655,0"],\
                ["NUM#", "min", "143,0"],\
                ["NUM#", "max", "457,0"],\
                ["NUM#", "scale", "2,0"],\
                ["NUM#", "offset", "1.5799999999999994,2"]\
            ]\
        },\
        {\
            "type": "MESPT",\
            "created": "1704341418266",\
            "updated": "1704341442789",\
            "id": "measure",\
            "name": "measure",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4965",\
            "y": "4578",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "distance", "219.9147300829877,9"],\
                ["NUM#", "angle", "-45.892683884230635,10"]\
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
            "x": "4966",\
            "y": "4467",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "x", "240.2414027619797,9"],\
                ["NUM#", "y", "401.7050890555764,10"]\
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
            "x": "3752",\
            "y": "4592",\
            "z": "19",\
            "params":\
            [\
                ["NUM#", "operation", "0,0"]\
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
            "x": "3753",\
            "y": "4491",\
            "z": "20"\
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
            "x": "4966",\
            "y": "4726.24",\
            "z": "21",\
            "params":\
            [\
                ["LIST#", "fills", "1 FILL# 255,0 145,0 0,0 10,0 7,0"],\
                ["NUM#", "weight", "10.156495605601505,0"],\
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
            "x": "4242",\
            "y": "4557",\
            "z": "22",\
            "width": "120",\
            "height": "32"\
        },\
        {\
            "type": "CIRCEN",\
            "created": "1704341107283",\
            "updated": "1704344350634",\
            "id": "circleCenter",\
            "name": "circle%20center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4774",\
            "y": "4518",\
            "z": "23"\
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
            "x": "6000",\
            "y": "4935",\
            "z": "24"\
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
            "x": "5984",\
            "y": "5170",\
            "z": "25",\
            "params":\
            [\
                ["NUM#", "seed", "6421,0"],\
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
            "x": "4419",\
            "y": "4803",\
            "z": "26",\
            "params":\
            [\
                ["NUM#", "seed", "6217,0"],\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0,1"]\
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
            "x": "4599",\
            "y": "5083",\
            "z": "27",\
            "params":\
            [\
                ["NUM#", "seed", "9521,0"],\
                ["NUM#", "max", "20,0"],\
                ["NUM#", "scale", "40,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "detail", "4,0"]\
            ]\
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
            "created": "1704352996225",\
            "outputNodeId": "measure",\
            "outputId": "distance",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "width",\
            "list": "false"\
        },\
        {\
            "created": "1704352996225",\
            "outputNodeId": "measure",\
            "outputId": "distance",\
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
            "outputOrder": "1",\
            "inputNodeId": "measure",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1704352996225",\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "1",\
            "inputNodeId": "measure",\
            "inputId": "h1",\
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
            "list": "false"\
        }\
        ]\
    }';