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
