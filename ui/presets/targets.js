const presetTargets = '\
    {\
        "nodes":\
        [\
        {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7661.88",\
            "y": "7189",\
            "z": "0",\
            "params":\
            [\
                ["NUM#", "add", "100,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6182.12",\
            "y": "6981",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "220.00000000000003,0"],\
                ["NUM#", "c2", "83,0"],\
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
            "x": "6181.12",\
            "y": "6839",\
            "z": "2",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "45,0"],\
                ["NUM#", "c2", "85,0"],\
                ["NUM#", "c3", "100,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6184.12",\
            "y": "6698",\
            "z": "3",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "79,0"],\
                ["NUM#", "c3", "100,0"]\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7172.12",\
            "y": "6664",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "scaleX", "30,0"],\
                ["NUM#", "scaleY", "30,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7854.88",\
            "y": "6938",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "x", "400,0"],\
                ["NUM#", "y", "400,0"]\
            ]\
        },\
        {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6489.12",\
            "y": "6845",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "index", "1,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7662.88",\
            "y": "7346",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "add", "100,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6647.12",\
            "y": "6664",\
            "z": "8",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6339.12",\
            "y": "6829",\
            "z": "9",\
            "width": "120",\
            "height": "64"\
        },\
        {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8057",\
            "y": "7349",\
            "z": "10",\
            "active": "true",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7003.12",\
            "y": "6932",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "start", "100,0"],\
                ["NUM#", "add", "-35,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "7350.12",\
            "y": "6938",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "count", "3,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8054.88",\
            "y": "7193",\
            "z": "13",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "6395",\
            "y": "7112",\
            "z": "14",\
            "params":\
            [\
                ["NUM#", "seed", "397,0"],\
                ["NUM#", "max", "2,0"]\
            ]\
        },\
        {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "%E2%9F%B5",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6495",\
            "y": "7133",\
            "z": "15"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "Change%20the%20random%20seed",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6545",\
            "y": "7133",\
            "z": "16"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "to%20distribute%20the%20colors%20differently.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6546",\
            "y": "7176",\
            "z": "17"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "1.%20Create%20a%20circle%20with",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6322",\
            "y": "6481",\
            "z": "18"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "2.%20Repeat%20the%20circle%203%20times%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7407",\
            "y": "6760",\
            "z": "19"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "scaling%20it%20down%20each%20time.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7447",\
            "y": "6801",\
            "z": "20"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "3.%20Repeat%20the%20complete%20target%205%26thinsp%3B%C3%97%26thinsp%3B5%20times%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8121",\
            "y": "7049",\
            "z": "21"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "moving%20them%20right%20and%20down%20to%20create%20the%20grid.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8156",\
            "y": "7089",\
            "z": "22"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "one%20of%20three%20color%20fills%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6349",\
            "y": "6521",\
            "z": "23"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "determined%20randomly.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6345",\
            "y": "6563",\
            "z": "24"\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat3",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
        }\
        ]\
    }';