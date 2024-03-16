const presetProgressiveBlur = '\
{\
    "generatorVersion": "381",\
    "nodes":\
    [\
        {\
        "type": "WAVE",\
        "created": "1710617338024",\
        "updated": "1710617341990",\
        "id": "wave",\
        "name": "wave",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4951",\
        "y": "4166",\
        "z": "0",\
        "useWavelength": "false",\
        "offsetAbsolute": "false",\
        "params":\
        [\
                ["NUM#", "offset", "50,0"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1710615386773",\
        "updated": "1710617318757",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5136",\
        "y": "3932",\
        "z": "1",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "255,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1710615181093",\
        "updated": "1710617318757",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5475",\
        "y": "3788",\
        "z": "2",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "300,0"],\
                ["NUM#", "y", "300,0"],\
                ["NUM#", "width", "10,0"],\
                ["NUM#", "height", "10,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1710615411205",\
        "updated": "1710615411211",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5763",\
        "y": "3788",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "x", "200,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1710615297970",\
        "updated": "1710615303435",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6586",\
        "y": "4270",\
        "z": "4",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1710615294584",\
        "updated": "1710615333421",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6746",\
        "y": "4048",\
        "z": "5",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "600,0"],\
                ["NUM#", "height", "600,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1710615505984",\
        "updated": "1710617355753",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5806",\
        "y": "4152",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710615772142",\
        "updated": "1710617355753",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6351",\
        "y": "4078",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "count", "50,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1710615416894",\
        "updated": "1710615544324",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6120.46",\
        "y": "3788",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "angle", "352.8,1"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1710617351784",\
        "updated": "1710617355753",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6037.75",\
        "y": "4163.28",\
        "z": "9",\
        "active": "true",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "LBLR",\
        "created": "1710617309059",\
        "updated": "1710617341990",\
        "id": "layerBlur",\
        "name": "layer%20blur",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5136",\
        "y": "4075",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "radius", "56.26666167821522,10"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1710615610779",\
        "updated": "1710615610784",\
        "id": "bias",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5974",\
        "y": "3942",\
        "z": "11"\
        },\
        {\
        "type": "CMB",\
        "created": "1710617315426",\
        "updated": "1710617318757",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5299.83",\
        "y": "4003.31",\
        "z": "12",\
        "active": "true",\
        "width": "120",\
        "height": "51"\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1710617318757",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1710615411210",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710615772147",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1710615303434",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1710615772146",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710617355752",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1710615416899",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710615610784",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1710617351785",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710617351786",\
        "outputNodeId": "wave",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710617341990",\
        "outputNodeId": "wave",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "layerBlur",\
        "inputId": "radius",\
        "list": "false"\
        },\
        {\
        "created": "1710615610783",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710617315428",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710617315430",\
        "outputNodeId": "layerBlur",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
}';