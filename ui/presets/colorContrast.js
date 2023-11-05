const presetColorContrast = '\
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
            "x": "1073",\
            "y": "2611",\
            "z": "0",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "187.00000000000003,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1073",\
            "y": "2416",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "222,0"],\
                    ["NUM#", "c2", "90,0"],\
                    ["NUM#", "c3", "31,0"]\
            ]\
            },\
            {\
            "type": "CCNT",\
            "id": "contrast2",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1296",\
            "y": "2472",\
            "z": "2",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "contrast", "74.6288956286683,1"]\
            ]\
            },\
            {\
            "type": "CCNT",\
            "id": "contrast3",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1296",\
            "y": "2597",\
            "z": "3",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "contrast", "10.17373424657917,2"],\
                    ["NUM#", "standard", "0,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "contrast2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "contrast2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "contrast3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "contrast3",\
            "inputId": "h1",\
            "list": "false"\
            }\
        ]\
    }';