const presetSorting = '\
    {\
        "nodes":\
        [\
            {\
            "type": "GETP",\
            "id": "getParam",\
            "name": "get%20param",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "995",\
            "y": "1578",\
            "z": "0",\
            "_connected": "false",\
            "params":\
            [\
                    ["TEXT#", "name", "x", "left"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "189",\
            "y": "1599",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "seed", "9746,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "347",\
            "y": "1522",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "x", "4,0"],\
                    ["NUM#", "y", "96,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "980",\
            "y": "1025",\
            "z": "3",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "4,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "653.032",\
            "y": "982",\
            "z": "4",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                    ["NUM#", "0", "53,0"],\
                    ["NUM#", "1", "62,0"],\
                    ["NUM#", "2", "6,0"],\
                    ["NUM#", "3", "7,0"],\
                    ["NUM#", "4", "95,0"],\
                    ["NUM#", "5", "84,0"],\
                    ["NUM#", "6", "88,0"],\
                    ["NUM#", "7", "28,0"],\
                    ["NUM#", "8", "66,0"],\
                    ["NUM#", "9", "4,0"]\
            ]\
            },\
            {\
            "type": "SORT",\
            "id": "sort",\
            "name": "sort",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1154.47",\
            "y": "982",\
            "z": "5",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Sorting%20requires%20a%20criterion%2C%20which%20must%20be%20%22implied%22.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "842",\
            "y": "811",\
            "z": "6"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "In%20this%20case%20we%20know%20the%20list%20is%20composed%20of%20points%2C%20so%20we",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "842",\
            "y": "1351.04",\
            "z": "7"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "so%20to%20do%20a%20basic%20sort%20connect%20a%20%3Cb%3Enumber%3C%2Fb%3E%20node%20to%20the%20sort%20order.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "842",\
            "y": "895",\
            "z": "8"\
            },\
            {\
            "type": "LIST",\
            "id": "list4",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1303.53",\
            "y": "1522",\
            "z": "9",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                    ["PT#", "0", "4,0 96,0"],\
                    ["PT#", "1", "6,0 71,0"],\
                    ["PT#", "2", "7,0 16,0"],\
                    ["PT#", "3", "28,0 72,0"],\
                    ["PT#", "4", "53,0 95,0"],\
                    ["PT#", "5", "62,0 26,0"],\
                    ["PT#", "6", "66,0 65,0"],\
                    ["PT#", "7", "84,0 94,0"],\
                    ["PT#", "8", "88,0 60,0"],\
                    ["PT#", "9", "95,0 53,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "create%20a%20Point%20node%20and%20extract%20its%20X%20coordinate%2C%20and%20use%20that",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "842",\
            "y": "1393.04",\
            "z": "10"\
            },\
            {\
            "type": "LIST",\
            "id": "list3",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "650",\
            "y": "1522.04",\
            "z": "11",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                    ["PT#", "0", "53,0 95,0"],\
                    ["PT#", "1", "62,0 26,0"],\
                    ["PT#", "2", "6,0 71,0"],\
                    ["PT#", "3", "7,0 16,0"],\
                    ["PT#", "4", "95,0 53,0"],\
                    ["PT#", "5", "84,0 94,0"],\
                    ["PT#", "6", "88,0 60,0"],\
                    ["PT#", "7", "28,0 72,0"],\
                    ["PT#", "8", "66,0 65,0"],\
                    ["PT#", "9", "4,0 96,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "as%20the%20sort%20criterion.%20Change%20it%20to%20Y%20to%20see%20how%20the%20sort%20order%20changes.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "842",\
            "y": "1435.04",\
            "z": "12"\
            },\
            {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "845",\
            "y": "1578",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "x", "4,0"],\
                    ["NUM#", "y", "96,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "503.032",\
            "y": "982",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "count", "10,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "For%20instance%2C%20here%20we%20know%20that%20the%20list%20is%20composed%20of%20numbers%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "842",\
            "y": "853",\
            "z": "15"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "503",\
            "y": "1522",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "count", "10,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "188",\
            "y": "1455",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "seed", "9683,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "SORT",\
            "id": "sort2",\
            "name": "sort",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1153.53",\
            "y": "1522",\
            "z": "18",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "353.032",\
            "y": "982",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "seed", "9683,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list2",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1304.47",\
            "y": "982",\
            "z": "20",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                    ["NUM#", "0", "4,0"],\
                    ["NUM#", "1", "6,0"],\
                    ["NUM#", "2", "7,0"],\
                    ["NUM#", "3", "28,0"],\
                    ["NUM#", "4", "53,0"],\
                    ["NUM#", "5", "62,0"],\
                    ["NUM#", "6", "66,0"],\
                    ["NUM#", "7", "84,0"],\
                    ["NUM#", "8", "88,0"],\
                    ["NUM#", "9", "95,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "getParam",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sort",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sort",\
            "inputId": "order",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sort2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list4",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sort2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "getParam",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sort2",\
            "inputId": "order",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sort",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list2",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';