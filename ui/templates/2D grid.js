const template2Dgrid = '\
{\
    "generatorVersion": "348",\
    "nodes":\
    [\
        {\
        "type": "REPT",\
        "created": "1706765948606",\
        "updated": "1706765999076",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4565.82",\
        "y": "888.065",\
        "z": "16",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1706765950008",\
        "updated": "1706766085094",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4565.82",\
        "y": "1044.07",\
        "z": "17",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1706765959622",\
        "updated": "1706766017213",\
        "id": "move5",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4358.82",\
        "y": "702.065",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "x", "100,0"],\
                ["NUM#", "y", "100,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1706765989985",\
        "updated": "1706765999076",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4183.82",\
        "y": "885.065",\
        "z": "19"\
        },\
        {\
        "type": "RANGE",\
        "created": "1706765989985",\
        "updated": "1706766001173",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4183.82",\
        "y": "1046.07",\
        "z": "20"\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1706765966311",\
        "outputNodeId": "move5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1706765999075",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1706765950012",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1706766001173",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1706765994927",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move5",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1706765997096",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move5",\
        "inputId": "y",\
        "list": "false"\
        }\
    ]\
}';