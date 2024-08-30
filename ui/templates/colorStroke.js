const templateColorStroke = '\
{\
    "nodes":\
    [\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1705642638300",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3574",\
        "y": "459",\
        "z": "6",\
        "active": "true",\
        "params":\
        [\
                ["EXPAND#", "fills", "1 FILL# 217,0 217,0 217,0 100,0 0,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1705642638300",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3412",\
        "y": "461",\
        "z": "7",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "217,0"],\
                ["NUM#", "c2", "217,0"],\
                ["NUM#", "c3", "217,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1705642638294",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        }\
    ]\
}';