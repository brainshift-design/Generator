const presetBasicTransform = '\
    {\
        "nodes":\
        [\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "toggle%20%3Cb%3Emove%26thinsp%3B.%26hairsp%3BmoveSpace%3C%2Fb%3E%20to%20see%20their%20effect",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "708",\
            "y": "541",\
            "z": "0"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "shape",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-39",\
            "y": "199",\
            "z": "1",\
            "width": "487.7051179016323",\
            "height": "405.5981990149978",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "304",\
            "y": "255",\
            "z": "2",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1002",\
            "y": "255",\
            "z": "3",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "angle", "45,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Adjust%20%3Cb%3Emove%26thinsp%3B.%26thinsp%3BX%3C%2Fb%3E%20and%20%3Cb%3Erotate%26thinsp%3B.%26hairsp%3Bangle%3C%2Fb%3E%2C%20and",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "710",\
            "y": "497",\
            "z": "4"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "transformation",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "731",\
            "y": "204",\
            "z": "5",\
            "width": "417",\
            "height": "226.25287762942608",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "145",\
            "y": "391",\
            "z": "6",\
            "params":\
            [\
                    ["EXPAND#", "fills", "1 FILL# 255,0 131,0 53,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-10",\
            "y": "418",\
            "z": "7",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "255,0"],\
                    ["NUM#", "c2", "131,0"],\
                    ["NUM#", "c3", "53,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "on%20the%20transformation.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "708",\
            "y": "586",\
            "z": "8"\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "760",\
            "y": "255",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "affectSpace", "0,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "710",\
            "y": "342",\
            "z": "10"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';
