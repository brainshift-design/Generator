const presetColorSpaces = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2208",\
            "y": "2732",\
            "z": "0",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "255,0"],\
                    ["NUM#", "c2", "235,0"],\
                    ["NUM#", "c3", "40,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2022",\
            "y": "2835",\
            "z": "1",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "255,0"],\
                    ["NUM#", "c2", "235,0"],\
                    ["NUM#", "c3", "40,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2208",\
            "y": "2835",\
            "z": "2",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "54.41860465116281,0"],\
                    ["NUM#", "c2", "84.31372549019608,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2209",\
            "y": "2985",\
            "z": "3",\
            "active": "true",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "102.8916688473251,0"],\
                    ["NUM#", "c2", "20.242185668089707,0"],\
                    ["NUM#", "c3", "92.76589836625774,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2387",\
            "y": "2834",\
            "z": "4",\
            "active": "true",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "54.4186037441861,0"],\
                    ["NUM#", "c2", "99.99999999999999,0"],\
                    ["NUM#", "c3", "57.843137254901954,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Adjust%20color%20to",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1791",\
            "y": "2826",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "get%20its%20value%20in",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1785",\
            "y": "2871",\
            "z": "6",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "other%20color%20spaces.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1749",\
            "y": "2915",\
            "z": "7",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "color3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "color4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';