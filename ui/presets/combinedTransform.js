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
            "x": "97",\
            "y": "1616",\
            "z": "0",\
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
            "x": "301",\
            "y": "1206",\
            "z": "1",\
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
            "x": "44",\
            "y": "1157.26",\
            "z": "2",\
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
            "x": "301",\
            "y": "1389",\
            "z": "3",\
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
            "x": "303",\
            "y": "1660",\
            "z": "4",\
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
            "x": "302",\
            "y": "1888",\
            "z": "5",\
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
            "x": "499",\
            "y": "1612",\
            "z": "6",\
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
            "x": "1154",\
            "y": "1633",\
            "z": "7",\
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
            "x": "883",\
            "y": "1582",\
            "z": "8",\
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
            "x": "912",\
            "y": "1633",\
            "z": "9",\
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