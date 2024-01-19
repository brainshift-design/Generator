const templateRandomSeeds = '\
{\
    "nodes":\
    [\
        {\
        "type": "RAND",\
        "created": "1705641039798",\
        "updated": "1705641039810",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3336",\
        "y": "196",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "seed", "3122,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1705641042300",\
        "updated": "1705641042315",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3336",\
        "y": "378",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "count", "11,0"]\
        ]\
        },\
        {\
        "type": "LIST",\
        "created": "1705641043411",\
        "updated": "1705641043425",\
        "id": "list",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3479",\
        "y": "200",\
        "z": "2",\
        "active": "true",\
        "width": "120",\
        "height": "274",\
        "divider": "0.25",\
        "scroll": "0",\
        "params":\
        [\
                ["NUM#", "0", "238,0"],\
                ["NUM#", "1", "8,0"],\
                ["NUM#", "2", "190,0"],\
                ["NUM#", "3", "82,0"],\
                ["NUM#", "4", "223,0"],\
                ["NUM#", "5", "6,0"],\
                ["NUM#", "6", "113,0"],\
                ["NUM#", "7", "153,0"],\
                ["NUM#", "8", "163,0"],\
                ["NUM#", "9", "135,0"],\
                ["NUM#", "10", "101,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1705641064229",\
        "updated": "1705641064229",\
        "id": "panel",\
        "name": "",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "1",\
        "notCondition": "false",\
        "x": "3303",\
        "y": "160",\
        "z": "3",\
        "active": "true",\
        "width": "329.8504781594585",\
        "height": "348",\
        "params":\
        [\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1705641042304",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1705641043418",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "list",\
        "inputId": "h0",\
        "list": "true"\
        }\
    ]\
}';