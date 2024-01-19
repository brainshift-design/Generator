const templateFilledColorStop = '\
{\
    "nodes":\
    [\
        {\
        "type": "FILL",\
        "created": "1705642582453",\
        "updated": "1705643252026",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3577",\
        "y": "1136",\
        "z": "0",\
        "active": "true",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1705642585493",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3416",\
        "y": "1136",\
        "z": "1",\
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
        "type": "CSTOP",\
        "created": "1705643248268",\
        "updated": "1705643252026",\
        "id": "colorStop",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "3740",\
        "y": "1137",\
        "z": "3",\
        "active": "true",\
        "params":\
        [\
                ["FILL#", "fill", "217,0 217,0 217,0 100,0 0,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1705643193991",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1705643252026",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop",\
        "inputId": "fill",\
        "list": "false"\
        }\
    ]\
}';