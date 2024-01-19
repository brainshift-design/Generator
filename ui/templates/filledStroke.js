const templateFilledStroke = '\
{\
    "nodes":\
    [\
        {\
        "type": "FILL",\
        "created": "1705642582453",\
        "updated": "1705642649757",\
        "id": "fill3",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3571",\
        "y": "728",\
        "z": "5",\
        "active": "true",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1705642585493",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3410",\
        "y": "728",\
        "z": "8",\
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
        "created": "1705642622692",\
        "updated": "1705642649757",\
        "id": "stroke2",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3735",\
        "y": "729",\
        "z": "9",\
        "active": "true",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 217,0 217,0 217,0 100,0 0,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1705642627145",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill3",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1705642649756",\
        "outputNodeId": "fill3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke2",\
        "inputId": "fills",\
        "list": "false"\
        }\
    ]\
}';