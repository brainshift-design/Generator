const presetTargets = '\
{\
    "generatorVersion": "386",\
    "nodes":\
    [\
        {\
        "type": "SEQ",\
        "created": "1711399600880",\
        "updated": "1711399600880",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7711.88",\
        "y": "7239",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "add", "100,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1711399600885",\
        "updated": "1711399600885",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6232.12",\
        "y": "7031",\
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
        "created": "1711399600887",\
        "updated": "1711399600887",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6231.12",\
        "y": "6889",\
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
        "created": "1711399600890",\
        "updated": "1711399600890",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6234.12",\
        "y": "6748",\
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
        "created": "1711399600894",\
        "updated": "1711399600894",\
        "id": "scale",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7222.12",\
        "y": "6714",\
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
        "created": "1711399600897",\
        "updated": "1711399600897",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7904.88",\
        "y": "6988",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "x", "400,0"],\
                ["NUM#", "y", "400,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1711399600900",\
        "updated": "1711399600900",\
        "id": "sequence3",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7712.88",\
        "y": "7396",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "add", "100,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1711399600906",\
        "updated": "1711399628124",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6697.12",\
        "y": "6714",\
        "z": "7",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1711399600908",\
        "updated": "1711399611048",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8107",\
        "y": "7399",\
        "z": "8",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1711399600910",\
        "updated": "1711399600910",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7053.12",\
        "y": "6982",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "start", "100,0"],\
                ["NUM#", "add", "-35,0"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1711399600912",\
        "updated": "1711399600912",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "6",\
        "notCondition": "false",\
        "x": "7400.12",\
        "y": "6988",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "count", "3,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1711399600914",\
        "updated": "1711399600914",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8104.88",\
        "y": "7243",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1711399600918",\
        "updated": "1711399623056",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "5",\
        "notCondition": "false",\
        "x": "6445",\
        "y": "7162",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "seed", "397,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "2,0"]\
        ]\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600919",\
        "updated": "1711399600933",\
        "id": "comment",\
        "name": "%E2%9F%B5",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6545",\
        "y": "7183",\
        "z": "13"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600919",\
        "updated": "1711399600933",\
        "id": "comment2",\
        "name": "Change%20the%20random%20seed",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6595",\
        "y": "7183",\
        "z": "14"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600919",\
        "updated": "1711399600933",\
        "id": "comment3",\
        "name": "to%20distribute%20the%20colors%20differently.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6596",\
        "y": "7226",\
        "z": "15"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600919",\
        "updated": "1711399600933",\
        "id": "comment4",\
        "name": "1.%20Create%20a%20circle%20with",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6372",\
        "y": "6531",\
        "z": "16"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600919",\
        "updated": "1711399600933",\
        "id": "comment5",\
        "name": "2.%20Repeat%20the%20circle%203%20times%2C",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7457",\
        "y": "6810",\
        "z": "17"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600919",\
        "updated": "1711399600933",\
        "id": "comment7",\
        "name": "scaling%20it%20down%20each%20time.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7497",\
        "y": "6851",\
        "z": "18"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600919",\
        "updated": "1711399600933",\
        "id": "comment6",\
        "name": "3.%20Repeat%20the%20complete%20target%205%26thinsp%3B%C3%97%26thinsp%3B5%20times%2C",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8171",\
        "y": "7099",\
        "z": "19"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600920",\
        "updated": "1711399600933",\
        "id": "comment8",\
        "name": "moving%20them%20right%20and%20down%20to%20create%20the%20grid.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8206",\
        "y": "7139",\
        "z": "20"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600920",\
        "updated": "1711399600933",\
        "id": "comment9",\
        "name": "one%20of%20three%20color%20fills%2C",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6399",\
        "y": "6571",\
        "z": "21"\
        },\
        {\
        "type": "CMNT",\
        "created": "1711399600920",\
        "updated": "1711399600933",\
        "id": "comment10",\
        "name": "determined%20randomly.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6395",\
        "y": "6613",\
        "z": "22"\
        },\
        {\
        "type": "SELECT",\
        "created": "1711399618588",\
        "updated": "1711399628124",\
        "id": "select2",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6475",\
        "y": "6901",\
        "z": "23",\
        "active": "true",\
        "width": "120",\
        "height": "86",\
        "params":\
        [\
                ["NUM#", "index", "1,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1711399600927",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "scaleX",\
        "list": "false"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "scale",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1711399628124",\
        "outputNodeId": "select2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "scale",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1711399600927",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1711399618590",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1711399618591",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1711399618591",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1711399623056",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select2",\
        "inputId": "index",\
        "list": "false"\
        }\
    ]\
}';