const presetColorContrast = '\
{\
        "generatorVersion": "447",\
                "nodes":\
        [\
                {\
                        "type": "COL",\
                        "created": "1738989515620",\
                        "updated": "1738989540475",\
                        "id": "color",\
                        "name": "color",\
                        "renamed": "false",\
                        "enabled": "true",\
                        "highlight": "0",\
                        "notCondition": "false",\
                        "x": "1123",\
                        "y": "2661",\
                        "z": "0",\
                        "prevSpace": "hsv",\
                        "params":\
                                [\
                                        ["NUM#", "space", "3,0"],\
                                        ["NUM#", "c1", "187.00000000000003,0"],\
                                        ["NUM#", "c2", "100,0"],\
                                        ["NUM#", "c3", "100,0"]\
                                ]\
                },\
                {\
                        "type": "COL",\
                        "created": "1738989515622",\
                        "updated": "1738989539123",\
                        "id": "color2",\
                        "name": "color",\
                        "renamed": "false",\
                        "enabled": "true",\
                        "highlight": "0",\
                        "notCondition": "false",\
                        "x": "1123",\
                        "y": "2466",\
                        "z": "1",\
                        "prevSpace": "hsv",\
                        "params":\
                                [\
                                        ["NUM#", "space", "3,0"],\
                                        ["NUM#", "c1", "222,0"],\
                                        ["NUM#", "c2", "90,0"],\
                                        ["NUM#", "c3", "31,0"]\
                                ]\
                },\
                {\
                        "type": "CCNT",\
                        "created": "1738989529878",\
                        "updated": "1738989535538",\
                        "id": "contrast",\
                        "name": "contrast",\
                        "renamed": "false",\
                        "enabled": "true",\
                        "highlight": "0",\
                        "notCondition": "false",\
                        "x": "1314",\
                        "y": "2540",\
                        "z": "2"\
                },\
                {\
                        "type": "CCNT",\
                        "created": "1738989529878",\
                        "updated": "1738989540475",\
                        "id": "contrast2",\
                        "name": "contrast",\
                        "renamed": "false",\
                        "enabled": "true",\
                        "highlight": "0",\
                        "notCondition": "false",\
                        "x": "1312",\
                        "y": "2655",\
                        "z": "3"\
                },\
                {\
                        "type": "NUM",\
                        "created": "1738989555510",\
                        "updated": "1738989555515",\
                        "id": "num",\
                        "name": "number",\
                        "renamed": "false",\
                        "enabled": "true",\
                        "highlight": "0",\
                        "notCondition": "false",\
                        "x": "1483",\
                        "y": "2548",\
                        "z": "4",\
                        "active": "true",\
                        "width": "120",\
                        "height": "54",\
                        "params":\
                                [\
                                        ["NUM#", "value", "74.6288956286683,1"]\
                                ]\
                },\
                {\
                        "type": "NUM",\
                        "created": "1738989557246",\
                        "updated": "1738989557248",\
                        "id": "num2",\
                        "name": "number",\
                        "renamed": "false",\
                        "enabled": "true",\
                        "highlight": "0",\
                        "notCondition": "false",\
                        "x": "1484",\
                        "y": "2663",\
                        "z": "5",\
                        "active": "true",\
                        "width": "120",\
                        "height": "54",\
                        "params":\
                                [\
                                        ["NUM#", "value", "-74.67145925421315,1"]\
                                ]\
                }\
        ],\
                "connections":\
        [\
                {\
                        "created": "1738989533147",\
                        "outputNodeId": "color2",\
                        "outputId": "h0",\
                        "outputOrder": "0",\
                        "inputNodeId": "contrast",\
                        "inputId": "h0",\
                        "list": "false"\
                },\
                {\
                        "created": "1738989535538",\
                        "outputNodeId": "color",\
                        "outputId": "h0",\
                        "outputOrder": "0",\
                        "inputNodeId": "contrast",\
                        "inputId": "h1",\
                        "list": "false"\
                },\
                {\
                        "created": "1738989540474",\
                        "outputNodeId": "color",\
                        "outputId": "h0",\
                        "outputOrder": "1",\
                        "inputNodeId": "contrast2",\
                        "inputId": "h0",\
                        "list": "false"\
                },\
                {\
                        "created": "1738989539122",\
                        "outputNodeId": "color2",\
                        "outputId": "h0",\
                        "outputOrder": "1",\
                        "inputNodeId": "contrast2",\
                        "inputId": "h1",\
                        "list": "false"\
                },\
                {\
                        "created": "1738989555513",\
                        "outputNodeId": "contrast",\
                        "outputId": "h0",\
                        "outputOrder": "0",\
                        "inputNodeId": "num",\
                        "inputId": "h0",\
                        "list": "false"\
                },\
                {\
                        "created": "1738989557248",\
                        "outputNodeId": "contrast2",\
                        "outputId": "h0",\
                        "outputOrder": "0",\
                        "inputNodeId": "num2",\
                        "inputId": "h0",\
                        "list": "false"\
                }\
        ]\
}';