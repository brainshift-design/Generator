const presetShapesStyles = '\
    {\
        "nodes":\
        [\
            {\
            "type": "RECT",\
            "id": "rect5",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "739",\
            "y": "2096",\
            "z": "0",\
            "active": "true",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "741",\
            "y": "1334",\
            "z": "1",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "y", "50,0"],\
                    ["NUM#", "corners", "6,0"]\
            ]\
            },\
            {\
            "type": "INSH",\
            "id": "innerShadow",\
            "name": "inner%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "168",\
            "y": "3099",\
            "z": "2",\
            "params":\
            [\
                    ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "739",\
            "y": "949",\
            "z": "3",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "50,0"]\
            ]\
            },\
            {\
            "type": "LBLR",\
            "id": "layerBlur",\
            "name": "layer%20blur",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "166",\
            "y": "3311",\
            "z": "4"\
            },\
            {\
            "type": "STRK",\
            "id": "stroke3",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "556",\
            "y": "2233",\
            "z": "5",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 64,0 128,0 255,0 50,0 0,0"],\
                    ["NUM#", "weight", "4,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "367",\
            "y": "1877",\
            "z": "6",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "110.00000000000001,0"],\
                    ["NUM#", "c2", "65,0"],\
                    ["NUM#", "c3", "90,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "173",\
            "y": "2287",\
            "z": "7",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "220.00000000000003,0"],\
                    ["NUM#", "c2", "75,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse2",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "839",\
            "y": "2698",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "Connect%20the%20stroke%2C%20the%20inner%20shadow%20and%20the%20layer%20blur",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "364",\
            "y": "3048",\
            "z": "9"\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "169",\
            "y": "2693",\
            "z": "10",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "75,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "369",\
            "y": "2260",\
            "z": "11",\
            "params":\
            [\
                    ["COL#", "color", "1,0 64,0 128,0 255,0"],\
                    ["NUM#", "opacity", "50,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect4",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "739",\
            "y": "1712",\
            "z": "12",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "y", "50,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "550",\
            "y": "1493",\
            "z": "13",\
            "params":\
            [\
                    ["COL#", "color", "1,0 230,0 229,0 23,0"],\
                    ["NUM#", "opacity", "50,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "550",\
            "y": "1130",\
            "z": "14",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "75,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "To%20apply%20several%20styles%20to%20an%20object%2C%20first%20combine%20them.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "165",\
            "y": "2598",\
            "z": "15"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "(fill%2C%20stroke%20etc.)%2C%20otherwise%20it\'s%20shown",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "184",\
            "y": "673",\
            "z": "16"\
            },\
            {\
            "type": "STRK",\
            "id": "stroke2",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "558",\
            "y": "1850",\
            "z": "17",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 105,0 230,0 80,0 100,0 0,0"],\
                    ["NUM#", "weight", "4,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "169",\
            "y": "2863",\
            "z": "18",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 255,0 255,0 64,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-12",\
            "y": "2892",\
            "z": "19",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "60,0"],\
                    ["NUM#", "c2", "75,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "737",\
            "y": "608",\
            "z": "20",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "-50,0"],\
                    ["NUM#", "y", "-50,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "366",\
            "y": "1520",\
            "z": "21",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "60,0"],\
                    ["NUM#", "c2", "90,0"],\
                    ["NUM#", "c3", "90,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "529",\
            "y": "2941",\
            "z": "22",\
            "width": "120",\
            "height": "38"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "A%20shape%20needs%20at%20least%20one%20%22style%22",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "190",\
            "y": "622",\
            "z": "23"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "with%20a%20dotted%20stroke.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "188",\
            "y": "722",\
            "z": "24"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "to%20the%20combine%20node%2C%20then%20connect%20the%20combine%20node%20to",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "364",\
            "y": "3089",\
            "z": "25"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "the%20ellipse\'s%20style%20parameter.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "364",\
            "y": "3132",\
            "z": "26"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "474",\
            "y": "2945",\
            "z": "27"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "474",\
            "y": "2959",\
            "z": "28"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment15",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "474",\
            "y": "2971",\
            "z": "29"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "777",\
            "y": "2875",\
            "z": "30"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "stroke3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect5",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke3",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "stroke2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect4",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke2",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';



const presetBasicTransform = '\
    {\
        "nodes":\
        [\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "toggle%20%3Cb%3Emove%26thinsp%3B.%26hairsp%3BmoveSpace%3C%2Fb%3E%20to%20see%20their%20effect",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "708",\
            "y": "541",\
            "z": "0"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "shape",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-39",\
            "y": "199",\
            "z": "1",\
            "width": "487.7051179016323",\
            "height": "405.5981990149978",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "304",\
            "y": "255",\
            "z": "2",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1002",\
            "y": "255",\
            "z": "3",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "angle", "45,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Adjust%20%3Cb%3Emove%26thinsp%3B.%26thinsp%3BX%3C%2Fb%3E%20and%20%3Cb%3Erotate%26thinsp%3B.%26hairsp%3Bangle%3C%2Fb%3E%2C%20and",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "710",\
            "y": "497",\
            "z": "4"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "transformation",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "731",\
            "y": "204",\
            "z": "5",\
            "width": "417",\
            "height": "226.25287762942608",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "145",\
            "y": "391",\
            "z": "6",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 255,0 131,0 53,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-10",\
            "y": "418",\
            "z": "7",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "255,0"],\
                    ["NUM#", "c2", "131,0"],\
                    ["NUM#", "c3", "53,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "on%20the%20transformation.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "708",\
            "y": "586",\
            "z": "8"\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "760",\
            "y": "255",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "affectSpace", "0,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "710",\
            "y": "342",\
            "z": "10"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
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
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';



const presetCombinedTransform = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-203",\
            "y": "1316",\
            "z": "12",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "53.54999999999999,0"],\
                    ["NUM#", "c2", "144.20251191912504,0"],\
                    ["NUM#", "c3", "255,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect2",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4",\
            "y": "883",\
            "z": "13",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "combined%20shapes",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-256",\
            "y": "816",\
            "z": "14",\
            "width": "629.0716566313172",\
            "height": "1011",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1",\
            "y": "1089",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "x", "100,0"]\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "0",\
            "y": "1350",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "y", "100,0"]\
            ]\
            },\
            {\
            "type": "STAR",\
            "id": "star",\
            "name": "star",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2",\
            "y": "1588",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "x", "100,0"],\
                    ["NUM#", "y", "100,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "199",\
            "y": "1312",\
            "z": "18",\
            "width": "120",\
            "height": "77"\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "854",\
            "y": "1333",\
            "z": "19",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "angle", "40,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel4",\
            "name": "transformation",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "583",\
            "y": "1282",\
            "z": "20",\
            "width": "417",\
            "height": "226.25287762942608",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "612",\
            "y": "1333",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "affectSpace", "0,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect2",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "star",\
            "inputId": "props",\
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
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "star",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';



const presetFeedback = '\
    {\
        "nodes":\
        [\
            {\
            "type": "START",\
            "id": "start",\
            "name": "start",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2716",\
            "y": "336",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "feedback", "1,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3382",\
            "y": "-253",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "scaleX", "106.1873696824477,0"],\
                    ["NUM#", "scaleY", "103.96793015020337,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2446",\
            "y": "-241",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "width", "200,0"],\
                    ["NUM#", "height", "2,0"],\
                    ["NUM#", "round", "10,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3184",\
            "y": "-41",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "150.1398079517017,0"],\
                    ["NUM#", "min", "93,0"],\
                    ["NUM#", "max", "107,0"],\
                    ["NUM#", "scale", "11,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3007",\
            "y": "-43",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "1,0"],\
                    ["NUM#", "min", "-14,0"],\
                    ["NUM#", "max", "14,0"],\
                    ["NUM#", "scale", "10.5,1"],\
                    ["NUM#", "offset", "3,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3588",\
            "y": "315",\
            "z": "5",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "100,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2951",\
            "y": "-253",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "x", "9.5,1"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3177",\
            "y": "-253",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "angle", "4.030862128453997,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3184",\
            "y": "169",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "seed", "161.1398079517017,0"],\
                    ["NUM#", "min", "90,0"],\
                    ["NUM#", "max", "110,0"],\
                    ["NUM#", "scale", "11,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2268",\
            "y": "-103",\
            "z": "9",\
            "active": "true",\
            "params":\
            [\
                    ["COL#", "color", "1,0 28,0 185,0 67,0"],\
                    ["NUM#", "opacity", "60,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "start",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
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
            "outputNodeId": "start",\
            "outputId": "from",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "start",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
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
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            }\
        ]\
    }';



const presetWobblyCircle = '\
    {\
        "nodes":\
        [\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "2608",\
            "y": "1879",\
            "z": "0",\
            "active": "true",\
            "width": "60",\
            "height": "32",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2617",\
            "y": "1874",\
            "z": "1"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "%3Cb%3E1.%3C%2Fb%3E%20Create%20a%20point%20at",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2196",\
            "y": "1671",\
            "z": "2"\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2222",\
            "y": "1853",\
            "z": "3"\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3582",\
            "y": "1854",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "angle", "348,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "%3Cb%3E3.%3C%2Fb%3E%20This%20is%20where%20the%20circle%20is%20actually%20created.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3543",\
            "y": "1670",\
            "z": "5"\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3321",\
            "y": "2127",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "2481",\
            "y": "2025",\
            "z": "7",\
            "active": "true",\
            "width": "580",\
            "height": "202.9305695272746",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "the%20center%20of%20the%20circle.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2223",\
            "y": "1715",\
            "z": "8"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "to%20see%20how%20the%20wobbly%20circle%20is%20formed.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2852",\
            "y": "2636",\
            "z": "9"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "Rotate%20the%20point%20around%20the%20center%20using%20a%20Range.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3584",\
            "y": "1713",\
            "z": "10"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "%3Cb%3E5.%3C%2Fb%3E%20Connect%20the%20random%20output%20to",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2513",\
            "y": "2059",\
            "z": "11"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3869",\
            "y": "2054",\
            "z": "12",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "30,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "from%20left%20to%20right",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2628",\
            "y": "2585",\
            "z": "13"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "%3Cb%3E2.%3C%2Fb%3E%20Move%20the%20point%20away%20from%20the%20center",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2635",\
            "y": "1671",\
            "z": "14"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "the%20X%20parameter%20of%20the%20Move%20node.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2551",\
            "y": "2105",\
            "z": "15"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "to%20set%20the%20circle%20radius.%20Disable%20%3Cb%3Emove%20space%3C%2Fb%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2676",\
            "y": "1716",\
            "z": "16"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "This%20makes%20it%20easy%20to%20set%20the%20number%20of%20points.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3580",\
            "y": "1760",\
            "z": "17"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "so%20the%20circle%20center%20is%20not%20moved%20with%20the%20point.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2675",\
            "y": "1760",\
            "z": "18"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "Double%20click%20each%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2327",\
            "y": "2530",\
            "z": "19"\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2482",\
            "y": "1879",\
            "z": "20",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "5022,0"],\
                    ["NUM#", "min", "180,0"],\
                    ["NUM#", "max", "220,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2674",\
            "y": "1853",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment15",\
            "name": "Note%20the%20Random%20min%20%26%20max%20values.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2551",\
            "y": "2154",\
            "z": "22"\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4531",\
            "y": "2027",\
            "z": "23",\
            "active": "true",\
            "params":\
            [\
                    ["LIST#", "points", "30 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0"],\
                    ["NUM#", "closed", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment16",\
            "name": "%3Cb%3E4.%3C%2Fb%3E%20This%20collection%20of%20points%20is%20now%20connected%20to%20a%20Path%20node.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4493",\
            "y": "1889",\
            "z": "24"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "To%20complete%20the%20circle%20the%20path%20must%20be%20%3Cb%3Eclosed%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4712",\
            "y": "2070",\
            "z": "25"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment18",\
            "name": "%E2%9F%B5",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4664",\
            "y": "2071",\
            "z": "26"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4014",\
            "y": "2589",\
            "z": "27",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "217,0"],\
                    ["NUM#", "c2", "217,0"],\
                    ["NUM#", "c3", "217,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4196",\
            "y": "2562",\
            "z": "28",\
            "active": "true",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 217,0 217,0 217,0 100,0 0,0"],\
                    ["NUM#", "weight", "4,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment19",\
            "name": "The%20path%20needs%20a%20stroke%20or%20a%20fill%20to%20be%20properly%20visible.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4390",\
            "y": "2641",\
            "z": "29"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4013",\
            "y": "2433",\
            "z": "30",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "179,0"],\
                    ["NUM#", "c2", "60,0"],\
                    ["NUM#", "c3", "67,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4189",\
            "y": "2406",\
            "z": "31",\
            "active": "true",\
            "params":\
            [\
                    ["COL#", "color", "1,0 179,0 60,0 67,0"],\
                    ["NUM#", "opacity", "50,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4377",\
            "y": "2481",\
            "z": "32",\
            "active": "true",\
            "width": "60",\
            "height": "51"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel4",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2229",\
            "y": "2460",\
            "z": "33",\
            "width": "1205.3135943048746",\
            "height": "285.10430605107064",\
            "params":\
            [\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            }\
        ]\
    }';



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
            "y": "3378",\
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
            [\
                    ["NUM#", "value", "3.1415926536,10"]\
            ]\
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
                    ["NUM#", "value", "1.5,1"],\
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
            "y": "3322",\
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
            [\
                    ["NUM#", "value", "1,0"]\
            ]\
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
                    ["NUM#", "value", "2,0"],\
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
            [\
                    ["NUM#", "value", "1,0"]\
            ]\
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



const presetTargets = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7461.88",\
            "y": "6989",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "add", "100,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5982.12",\
            "y": "6781",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "220.00000000000003,0"],\
                    ["NUM#", "c2", "83,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5981.12",\
            "y": "6639",\
            "z": "2",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "45,0"],\
                    ["NUM#", "c2", "85,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5984.12",\
            "y": "6498",\
            "z": "3",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "79,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6972.12",\
            "y": "6464",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "scaleX", "30,0"],\
                    ["NUM#", "scaleY", "30,0"],\
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
            "x": "7654.88",\
            "y": "6738",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "x", "400,0"],\
                    ["NUM#", "y", "400,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6289.12",\
            "y": "6645",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "index", "1,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7462.88",\
            "y": "7146",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "add", "100,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6447.12",\
            "y": "6464",\
            "z": "8",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6139.12",\
            "y": "6629",\
            "z": "9",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7856.88",\
            "y": "7149",\
            "z": "10",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6803.12",\
            "y": "6732",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "start", "100,0"],\
                    ["NUM#", "add", "-35,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7150.12",\
            "y": "6738",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "count", "3,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7854.88",\
            "y": "6993",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "6214.12",\
            "y": "6832",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "382,0"],\
                    ["NUM#", "max", "2,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "ellipse",\
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
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat3",\
            "inputId": "loop",\
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
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
            }\
        ]\
    }';



const presetSpiderWeb = '\
    {\
        "nodes":\
        [\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6082",\
            "y": "6127",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5534",\
            "y": "6072",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "scaleX", "57,0"],\
                    ["NUM#", "scaleY", "57,0"],\
                    ["NUM#", "affectStyle", "0,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5247",\
            "y": "5678",\
            "z": "2",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "128,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4974",\
            "y": "5949",\
            "z": "3",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"],\
                    ["NUM#", "weight", "12,0"],\
                    ["NUM#", "cap", "2,0"]\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path2",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5518",\
            "y": "5643",\
            "z": "4",\
            "params":\
            [\
                    ["LIST#", "points", "3 PT# 156,0 6,0 PT# 156,0 156,0 PT# 262.06601717798213,9 49.93398282201787,9"],\
                    ["NUM#", "degree", "0,0"],\
                    ["NUM#", "round", "128,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5985",\
            "y": "5925",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "centerX", "0,0"],\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4636",\
            "y": "6103",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "value", "45,0"],\
                    ["NUM#", "operation", "3,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4486",\
            "y": "6185",\
            "z": "7",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "8,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4781",\
            "y": "6108",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "value", "-45,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4768",\
            "y": "5708",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "angle", "-45,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4485",\
            "y": "6065",\
            "z": "10",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "360,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4618",\
            "y": "5708",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "y", "-150,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4815",\
            "y": "5969",\
            "z": "12",\
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
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4436",\
            "y": "5863",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "x", "156,0"],\
                    ["NUM#", "y", "156,0"]\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5145",\
            "y": "5809",\
            "z": "14",\
            "params":\
            [\
                    ["LIST#", "points", "3 PT# 156,0 156,0 PT# 156,0 156,0 PT# 156,0 156,0"],\
                    ["NUM#", "degree", "0,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5359",\
            "y": "5859",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "centerX", "0,0"],\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5239",\
            "y": "6137",\
            "z": "16",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "57,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4932",\
            "y": "5821",\
            "z": "17",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "VPATH",\
            "id": "path3",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5676",\
            "y": "6349",\
            "z": "18",\
            "params":\
            [\
                    ["LIST#", "points", "3 PT# 156,0 70.50000000000001,1 PT# 156,0 156,0 PT# 216.45762979144982,10 95.54237020855018,10"],\
                    ["NUM#", "degree", "0,0"],\
                    ["NUM#", "round", "67,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5835",\
            "y": "5925",\
            "z": "19",\
            "width": "120",\
            "height": "77"\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5368",\
            "y": "6469",\
            "z": "20",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "67,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6216",\
            "y": "5926",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "angle", "315,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6363",\
            "y": "6140",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "count", "8,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "Spider%20web%20icon",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6608",\
            "y": "6137",\
            "z": "23",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "312,0"],\
                    ["NUM#", "height", "312,0"],\
                    ["NUM#", "round", "156,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6378",\
            "y": "6388",\
            "z": "24",\
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
            "type": "NUM",\
            "id": "num6",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4262",\
            "y": "5889",\
            "z": "25",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "156,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6251",\
            "y": "6266",\
            "z": "26",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6409",\
            "y": "6286",\
            "z": "27",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path2",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "props",\
            "outputOrder": "0",\
            "inputNodeId": "path2",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
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
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "point",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path3",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "props",\
            "outputOrder": "1",\
            "inputNodeId": "path3",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "path2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "range",\
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
            "list": "true"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "frame",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
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
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';