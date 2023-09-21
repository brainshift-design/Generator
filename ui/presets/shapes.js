const presetShapes = '\
    {\
    "nodes":\
    [\
        {\
        "type": "COL",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-233",\
        "y": "1277",\
        "z": "0",\
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
        "type": "CMNT",\
        "id": "comment",\
        "name": "(fill%2C%20stroke%20etc.)%2C%20otherwise%20it\'s%20shown",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-445",\
        "y": "77",\
        "z": "1"\
        },\
        {\
        "type": "STRK",\
        "id": "stroke2",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-42",\
        "y": "1250",\
        "z": "2",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 105,0 230,0 80,0 100,0 0,0"],\
                ["NUM#", "weight", "4,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "id": "stroke3",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-44",\
        "y": "1633",\
        "z": "3",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 64,0 128,0 255,0 50,0 0,0"],\
                ["NUM#", "weight", "4,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-427",\
        "y": "1687",\
        "z": "4",\
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
        "type": "FILL",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-231",\
        "y": "1660",\
        "z": "5",\
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
        "x": "139",\
        "y": "1112",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "y", "50,0"]\
        ]\
        },\
        {\
        "type": "CMNT",\
        "id": "comment3",\
        "name": "A%20shape%20needs%20at%20least%20one%20%22style%22",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-439",\
        "y": "26",\
        "z": "7"\
        },\
        {\
        "type": "FILL",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-50",\
        "y": "893",\
        "z": "8",\
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
        "x": "-50",\
        "y": "530",\
        "z": "9",\
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
        "id": "comment4",\
        "name": "%3Cb%3EShift%3C%2Fb%3E%2BDouble%20click%20to%20activate%20%3Cb%3Emultiple%20nodes%3C%2Fb%3E%20at%20the%20same%20time.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "486",\
        "y": "53",\
        "z": "10"\
        },\
        {\
        "type": "RECT",\
        "id": "rect5",\
        "name": "rectangle",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "139",\
        "y": "1496",\
        "z": "11",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "CMNT",\
        "id": "comment2",\
        "name": "with%20a%20dotted%20stroke.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-441",\
        "y": "126",\
        "z": "12"\
        },\
        {\
        "type": "ELPS",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "139",\
        "y": "349",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "x", "50,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "-234",\
        "y": "920",\
        "z": "14",\
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
        "type": "CMNT",\
        "id": "comment6",\
        "name": "Objects%20created%20by%20Generator%20have%20the%20%26nbsp%3B%26hairsp%3B%E2%97%A6G%E2%80%A2%26nbsp%3B%26thinsp%3Bprefix%20in%20the%20name.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "479",\
        "y": "235",\
        "z": "15"\
        },\
        {\
        "type": "RECT",\
        "id": "rect",\
        "name": "rectangle",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "137",\
        "y": "8",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "x", "-50,0"],\
                ["NUM#", "y", "-50,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color5",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "1843",\
        "y": "701",\
        "z": "17",\
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
        "type": "ELPS",\
        "id": "ellipse2",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2407",\
        "y": "704",\
        "z": "18"\
        },\
        {\
        "type": "CMNT",\
        "id": "comment8",\
        "name": "To%20apply%20several%20styles%20to%20an%20object%2C%20combine%20them",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "1880",\
        "y": "402",\
        "z": "19"\
        },\
        {\
        "type": "CMNT",\
        "id": "comment9",\
        "name": "into%20a%20list%20using%20a%20Combine%20node.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "1880",\
        "y": "453",\
        "z": "20"\
        },\
        {\
        "type": "CMB",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2198",\
        "y": "949",\
        "z": "21",\
        "width": "120",\
        "height": "38"\
        },\
        {\
        "type": "COL",\
        "id": "color6",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "1657",\
        "y": "900",\
        "z": "22",\
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
        "type": "STRK",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "1838",\
        "y": "871",\
        "z": "23",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 255,0 255,0 64,0 100,0 0,0"]\
        ]\
        },\
        {\
        "type": "LBLR",\
        "id": "layerBlur",\
        "name": "layer%20blur",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "1835",\
        "y": "1319",\
        "z": "24"\
        },\
        {\
        "type": "CMNT",\
        "id": "comment10",\
        "name": "Connect%20these%20here%2C%20then%20this%20here.%20Then%20double-click%20here.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "1992",\
        "y": "1063",\
        "z": "25"\
        },\
        {\
        "type": "INSH",\
        "id": "innerShadow",\
        "name": "inner%20shadow",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "1837",\
        "y": "1107",\
        "z": "26",\
        "params":\
        [\
                ["FILL#", "fill", "0,0 0,0 0,0 25,0 0,0"]\
        ]\
        },\
        {\
        "type": "CMNT",\
        "id": "comment11",\
        "name": "%3Cb%3EDouble%20click%3C%2Fb%3E%20to%20activate%20the%20node%20to%20put%20the%20%3Cb%3Eobject%20on%20the%20canvas%3C%2Fb%3E.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "487",\
        "y": "-2",\
        "z": "27"\
        },\
        {\
        "type": "CMNT",\
        "id": "comment5",\
        "name": "Double%20click%20the%20plugin%20background%20to%20deactivate%20all%20nodes.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "481",\
        "y": "113",\
        "z": "28"\
        },\
        {\
        "type": "POLY",\
        "id": "poly",\
        "name": "polygon",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "141",\
        "y": "734",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "y", "50,0"],\
                ["NUM#", "corners", "6,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "573",\
        "y": "902",\
        "z": "30",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CMNT",\
        "id": "comment7",\
        "name": "Use%20a%20combine%20node%20to%20group%20objects",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "576",\
        "y": "756",\
        "z": "31"\
        },\
        {\
        "type": "CMNT",\
        "id": "comment12",\
        "name": "and%20force%20a%20Z-order.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "573",\
        "y": "807",\
        "z": "32"\
        },\
        {\
        "type": "CMNT",\
        "id": "comment13",\
        "name": "Connect%20the%20rest%20of%20these%20here.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "477",\
        "y": "1356",\
        "z": "33"\
        }\
    ],\
    "connections":\
    [\
        {\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke2",\
        "inputId": "fills",\
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
        "outputNodeId": "stroke3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect5",\
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
        "outputNodeId": "color5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
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
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "poly",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "rect",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
}';