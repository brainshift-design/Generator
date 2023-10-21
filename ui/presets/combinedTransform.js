const presetCombinedTransform = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-203",\
            "y": "1316",\
            "z": "12",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "53.54999999999999,0"],\
                    ["NUM#", "c2", "144.20251191912504,0"],\
                    ["NUM#", "c3", "255,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect2",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4",\
            "y": "883",\
            "z": "13",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "combined%20shapes",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-256",\
            "y": "816",\
            "z": "14",\
            "width": "629.0716566313172",\
            "height": "1011",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1",\
            "y": "1089",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "x", "100,0"]\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "0",\
            "y": "1350",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "y", "100,0"]\
            ]\
            },\
            {\
            "type": "STAR",\
            "id": "star",\
            "name": "star",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2",\
            "y": "1588",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "x", "100,0"],\
                    ["NUM#", "y", "100,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "199",\
            "y": "1312",\
            "z": "18",\
            "width": "120",\
            "height": "77"\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "854",\
            "y": "1333",\
            "z": "19",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "angle", "40,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel4",\
            "name": "transformation",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "583",\
            "y": "1282",\
            "z": "20",\
            "width": "417",\
            "height": "226.25287762942608",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "612",\
            "y": "1333",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "affectSpace", "0,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect2",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "star",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "star",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';
