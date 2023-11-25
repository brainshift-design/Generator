const presetFeedback = '\
    {\
        "nodes":\
        [\
            {\
            "type": "START",\
            "id": "start",\
            "name": "start",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "2716",\
            "y": "336",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "feedback", "1,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3382",\
            "y": "-253",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "scaleX", "106.1873696824477,0"],\
                    ["NUM#", "scaleY", "103.96793015020337,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2446",\
            "y": "-241",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "width", "200,0"],\
                    ["NUM#", "height", "2,0"],\
                    ["NUM#", "round", "10,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3184",\
            "y": "-41",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "150.1398079517017,0"],\
                    ["NUM#", "min", "93,0"],\
                    ["NUM#", "max", "107,0"],\
                    ["NUM#", "scale", "11,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3007",\
            "y": "-43",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "1,0"],\
                    ["NUM#", "min", "-14,0"],\
                    ["NUM#", "max", "14,0"],\
                    ["NUM#", "scale", "10.5,1"],\
                    ["NUM#", "offset", "3,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3588",\
            "y": "315",\
            "z": "5",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "100,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2951",\
            "y": "-253",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "x", "9.5,1"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3177",\
            "y": "-253",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "angle", "4.030862128453997,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3184",\
            "y": "169",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "seed", "161.1398079517017,0"],\
                    ["NUM#", "min", "90,0"],\
                    ["NUM#", "max", "110,0"],\
                    ["NUM#", "scale", "11,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2268",\
            "y": "-103",\
            "z": "9",\
            "active": "true",\
            "params":\
            [\
                    ["COL#", "color", "1,0 28,0 185,0 67,0"],\
                    ["NUM#", "opacity", "60,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "start",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
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
            "outputNodeId": "start",\
            "outputId": "from",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "start",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
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
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            }\
        ]\
    }';
