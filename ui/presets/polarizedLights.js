const presetPolarizedLights = '\
    {\
        "nodes":\
        [\
            {\
            "type": "REPT",\
            "id": "repeat4",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5995",\
            "y": "2378",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "count", "2,0"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze2",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5843",\
            "y": "2469",\
            "z": "1"\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5464",\
            "y": "2557",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "seed", "234,0"],\
                    ["NUM#", "max", "700,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5466",\
            "y": "2418",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "8,0"],\
                    ["NUM#", "max", "400,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4327",\
            "y": "2509",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "120,0"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "1,1"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3048",\
            "y": "2624",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "seed", "5132,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3045",\
            "y": "2814",\
            "z": "6"\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3766",\
            "y": "2292",\
            "z": "7",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 199,0 143,0"],\
                    ["NUM#", "opacity", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3439",\
            "y": "2447",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "seed", "?,?"],\
                    ["NUM#", "min", "30,0"],\
                    ["NUM#", "max", "46,1"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4342",\
            "y": "2112",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "scaleX", "158,0"],\
                    ["NUM#", "scaleY", "11,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4492",\
            "y": "2112",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "angle", "79.57543812672395,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4728",\
            "y": "2358",\
            "z": "11"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5843",\
            "y": "2355",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "count", "40,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5683",\
            "y": "2875",\
            "z": "13",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "210,0"],\
                    ["NUM#", "c2", "80,0"],\
                    ["NUM#", "c3", "20,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5688",\
            "y": "2718",\
            "z": "14",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "251,0"],\
                    ["NUM#", "c2", "99,0"],\
                    ["NUM#", "c3", "20,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3766",\
            "y": "2175",\
            "z": "15",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 199,0 143,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5641",\
            "y": "2356",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "x", "51,0"],\
                    ["NUM#", "y", "90,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3005",\
            "y": "2576",\
            "z": "17",\
            "width": "350",\
            "height": "412.7239406922519",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3200",\
            "y": "2640",\
            "z": "18",\
            "width": "120",\
            "height": "142",\
            "params":\
            [\
                    ["NUM#", "0", "109,0"],\
                    ["NUM#", "1", "121,0"],\
                    ["NUM#", "2", "120,0"],\
                    ["NUM#", "3", "8,0"],\
                    ["NUM#", "4", "234,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3934",\
            "y": "2239",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "gradType", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "size", "50,0"],\
                    ["NUM#", "aspect", "100,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4158",\
            "y": "2536",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "seed", "121,0"],\
                    ["NUM#", "min", "1,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3584",\
            "y": "2248",\
            "z": "21",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "30,0"],\
                    ["NUM#", "c2", "44.1,1"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4937",\
            "y": "2556",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "seed", "?,?"],\
                    ["NUM#", "min", "1,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3046",\
            "y": "2925",\
            "z": "23"\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4158",\
            "y": "2335",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "seed", "109,0"],\
                    ["NUM#", "min", "10,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4192",\
            "y": "2112",\
            "z": "25",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5114",\
            "y": "2358",\
            "z": "26",\
            "params":\
            [\
                    ["NUM#", "scaleX", "17,0"],\
                    ["NUM#", "scaleY", "17,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6218",\
            "y": "2563",\
            "z": "27",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "500,0"],\
                    ["NUM#", "height", "800,0"],\
                    ["NUM#", "round", "10,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5875",\
            "y": "2774",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "gradType", "1,0"],\
                    ["NUM#", "x", "80,0"],\
                    ["NUM#", "y", "100,0"],\
                    ["NUM#", "size", "170,0"],\
                    ["NUM#", "angle", "90,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "freeze2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "4",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "freeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "4",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "4",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale2",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "grad2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h1",\
            "list": "false"\
            }\
        ]\
    }';