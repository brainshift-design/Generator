const presetWobblyCircle = '\
    {\
        "nodes":\
        [\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "2533",\
            "y": "2097",\
            "z": "0",\
            "active": "true",\
            "width": "580",\
            "height": "202.9305695272746",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "2660",\
            "y": "1951",\
            "z": "1",\
            "active": "true",\
            "width": "60",\
            "height": "32",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3371",\
            "y": "2177",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2724",\
            "y": "1903",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "to%20set%20the%20circle%20radius.%20Disable%20%3Cb%3Emove%20space%3C%2Fb%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2726",\
            "y": "1766",\
            "z": "4"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "to%20see%20how%20the%20wobbly%20circle%20is%20formed.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2902",\
            "y": "2686",\
            "z": "5"\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4246",\
            "y": "2612",\
            "z": "6",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 217,0 217,0 217,0 100,0 0,0"],\
                    ["NUM#", "weight", "4,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "from%20left%20to%20right",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2678",\
            "y": "2635",\
            "z": "7"\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2272",\
            "y": "1903",\
            "z": "8"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment19",\
            "name": "The%20path%20needs%20a%20stroke%20or%20a%20fill%20to%20be%20properly%20visible.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4440",\
            "y": "2691",\
            "z": "9"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment16",\
            "name": "%3Cb%3E4.%3C%2Fb%3E%20This%20collection%20of%20points%20is%20now%20connected%20to%20a%20Path%20node.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4543",\
            "y": "1939",\
            "z": "10"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "To%20complete%20the%20circle%20the%20path%20must%20be%20%3Cb%3Eclosed%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4762",\
            "y": "2120",\
            "z": "11"\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4239",\
            "y": "2456",\
            "z": "12",\
            "params":\
            [\
                    ["COL#", "color", "1,0 179,0 60,0 67,0"],\
                    ["NUM#", "opacity", "50,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "This%20makes%20it%20easy%20to%20set%20the%20number%20of%20points.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3630",\
            "y": "1810",\
            "z": "13"\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4427",\
            "y": "2531",\
            "z": "14",\
            "width": "60",\
            "height": "51"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "the%20center%20of%20the%20circle.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2273",\
            "y": "1765",\
            "z": "15"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment15",\
            "name": "Note%20the%20Random%20min%20%26%20max%20values.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2603",\
            "y": "2226",\
            "z": "16"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "%3Cb%3E1.%3C%2Fb%3E%20Create%20a%20point%20at",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2246",\
            "y": "1721",\
            "z": "17"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4064",\
            "y": "2639",\
            "z": "18",\
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
            "type": "CMNT",\
            "id": "comment3",\
            "name": "%3Cb%3E2.%3C%2Fb%3E%20Move%20the%20point%20away%20from%20the%20center",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2685",\
            "y": "1721",\
            "z": "19"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "Rotate%20the%20point%20around%20the%20center%20using%20a%20Range.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3634",\
            "y": "1763",\
            "z": "20"\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2534",\
            "y": "1951",\
            "z": "21",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "5022,0"],\
                    ["NUM#", "min", "180,0"],\
                    ["NUM#", "max", "220,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "Double%20click%20each%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2377",\
            "y": "2580",\
            "z": "22"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment18",\
            "name": "%E2%9F%B5",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4714",\
            "y": "2121",\
            "z": "23"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "%3Cb%3E5.%3C%2Fb%3E%20Connect%20the%20random%20output%20to",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2565",\
            "y": "2131",\
            "z": "24"\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4581",\
            "y": "2077",\
            "z": "25",\
            "active": "true",\
            "params":\
            [\
                    ["LIST#", "points", "30 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0"],\
                    ["NUM#", "closed", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2669",\
            "y": "1946",\
            "z": "26"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3919",\
            "y": "2104",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "count", "30,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel4",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2279",\
            "y": "2510",\
            "z": "28",\
            "width": "1205.3135943048746",\
            "height": "285.10430605107064",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "the%20X%20parameter%20of%20the%20Move%20node.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2603",\
            "y": "2177",\
            "z": "29"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "%3Cb%3E3.%3C%2Fb%3E%20This%20is%20where%20the%20circle%20is%20actually%20created.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3593",\
            "y": "1720",\
            "z": "30"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4063",\
            "y": "2483",\
            "z": "31",\
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
            "type": "CMNT",\
            "id": "comment9",\
            "name": "so%20the%20circle%20center%20is%20not%20moved%20with%20the%20point.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2725",\
            "y": "1810",\
            "z": "32"\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3632",\
            "y": "1904",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "angle", "348,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
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
            }\
        ]\
    }';
