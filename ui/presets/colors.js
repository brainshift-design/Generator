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
            "x": "973",\
            "y": "2512",\
            "z": "0",\
            "active": "true",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "60,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "85.09803921568627,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "973",\
            "y": "2316",\
            "z": "1",\
            "active": "true",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "172,0"],\
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
            "x": "1196",\
            "y": "2372",\
            "z": "2",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "contrast", "65.52882974629615,1"]\
            ]\
            },\
            {\
            "type": "CCNT",\
            "id": "contrast3",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1196",\
            "y": "2497",\
            "z": "3",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "contrast", "6.257915965905285,2"],\
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