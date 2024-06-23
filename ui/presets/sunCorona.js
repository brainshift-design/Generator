const presetSunCorona = '\
{\
    "generatorVersion": "434",\
    "nodes":\
    [\
        {\
        "type": "PT",\
        "created": "1717504825286",\
        "updated": "1717504825287",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18250",\
        "y": "13236",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "x", "960,0"],\
                ["NUM#", "y", "540,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1717505419789",\
        "updated": "1717505446129",\
        "id": "noise5",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18817",\
        "y": "13839",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "seed", "572,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "250,0"],\
                ["NUM#", "max", "350,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1717505228759",\
        "updated": "1717505295567",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18958",\
        "y": "13934",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "seed", "6816,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-50,0"],\
                ["NUM#", "max", "150,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1717504842870",\
        "updated": "1717505136554",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18249",\
        "y": "13571",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "seed", "3432,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-30,0"],\
                ["NUM#", "max", "30,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1717504954371",\
        "updated": "1717504960124",\
        "id": "neg",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18063",\
        "y": "13634",\
        "z": "4"\
        },\
        {\
        "type": "MOVE",\
        "created": "1717505037833",\
        "updated": "1717505429140",\
        "id": "move2",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19175",\
        "y": "13387",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "moveType", "1,0"],\
                ["NUM#", "x", "278.75933329008257,0"],\
                ["NUM#", "y", "424.4200519500789,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1717504827418",\
        "updated": "1717504889516",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18531",\
        "y": "13239",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "moveType", "1,0"],\
                ["NUM#", "x", "84.75222959258883,0"],\
                ["NUM#", "y", "344.9799691262092,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1717504857801",\
        "updated": "1717504860499",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18412",\
        "y": "13509",\
        "z": "7"\
        },\
        {\
        "type": "GRAD",\
        "created": "1717508239760",\
        "updated": "1717508468778",\
        "id": "grad4",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19995",\
        "y": "14641",\
        "z": "8",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "2,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "50,0"],\
                ["NUM#", "blend", "8,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1717507302145",\
        "updated": "1717507314986",\
        "id": "grad3",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18626",\
        "y": "13991.5",\
        "z": "9",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "0,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "50,0"],\
                ["NUM#", "blend", "7,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1717505828645",\
        "updated": "1717505841731",\
        "id": "grad2",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20652",\
        "y": "13963",\
        "z": "10",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "2,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "68,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1717506205635",\
        "updated": "1717508691310",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19940",\
        "y": "14154",\
        "z": "11",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "2,0"],\
                ["NUM#", "x", "50,0"],\
                ["NUM#", "size", "50,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1717508460549",\
        "updated": "1717508646865",\
        "id": "fill5",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19606",\
        "y": "14864",\
        "z": "12",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1717504902973",\
        "updated": "1717507296680",\
        "id": "fill4",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18455",\
        "y": "14066",\
        "z": "13",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 123,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1717504902973",\
        "updated": "1717507314986",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18466",\
        "y": "13917",\
        "z": "14",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 123,0 0,0"],\
                ["NUM#", "opacity", "30,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1717505491636",\
        "updated": "1717508262099",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20164",\
        "y": "13761",\
        "z": "15",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "960,0"],\
                ["NUM#", "y", "540,0"],\
                ["NUM#", "width", "300,0"],\
                ["NUM#", "height", "300,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717505541052",\
        "updated": "1717505822539",\
        "id": "colorStop5",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20491",\
        "y": "13913",\
        "z": "16",\
        "params":\
        [\
                ["FILL#", "fill", "136,0 0,0 0,0 100,0 0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717505261600",\
        "updated": "1717505446129",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19380.6",\
        "y": "13765.2",\
        "z": "17",\
        "width": "123.69343324003475",\
        "height": "64"\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717505541052",\
        "updated": "1717505549332",\
        "id": "colorStop4",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19773",\
        "y": "14404",\
        "z": "18",\
        "params":\
        [\
                ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"],\
                ["NUM#", "position", "80,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717508219640",\
        "updated": "1717508285345",\
        "id": "colorStop9",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19787",\
        "y": "14706",\
        "z": "19",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 100,0 0,0"],\
                ["NUM#", "position", "95,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717505514502",\
        "updated": "1717505548221",\
        "id": "color5",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19624",\
        "y": "14305",\
        "z": "20",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717505541052",\
        "updated": "1717505548221",\
        "id": "colorStop3",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19772",\
        "y": "14304",\
        "z": "21",\
        "params":\
        [\
                ["FILL#", "fill", "136,0 0,0 0,0 100,0 0,0"],\
                ["NUM#", "position", "91,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1717505042241",\
        "updated": "1717505267716",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19515",\
        "y": "13567",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "count", "200,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717505541052",\
        "updated": "1717505547121",\
        "id": "colorStop2",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19769",\
        "y": "14202",\
        "z": "23",\
        "params":\
        [\
                ["FILL#", "fill", "204,0 102,0 0,0 100,0 0,0"],\
                ["NUM#", "position", "93,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717505541052",\
        "updated": "1717506185587",\
        "id": "colorStop",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19780",\
        "y": "14099",\
        "z": "24",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 0,0 100,0 0,0"],\
                ["NUM#", "position", "94,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1717505020064",\
        "updated": "1719148174008",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20802",\
        "y": "13633",\
        "z": "25",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "1920,0"],\
                ["NUM#", "height", "1080,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717505541052",\
        "updated": "1717506232759",\
        "id": "colorStop8",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19776",\
        "y": "13909",\
        "z": "26",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 0,0 0,0 0,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717505514502",\
        "updated": "1717506425184",\
        "id": "color9",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19416",\
        "y": "14003",\
        "z": "27",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "204,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717505514502",\
        "updated": "1717505547121",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19620",\
        "y": "14198",\
        "z": "28",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "204,0"],\
                ["NUM#", "c2", "102,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717505514502",\
        "updated": "1717505545811",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19624",\
        "y": "14097",\
        "z": "29",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717508212288",\
        "updated": "1717508646865",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19607",\
        "y": "14713",\
        "z": "30",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "300,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717508212288",\
        "updated": "1717508419002",\
        "id": "color11",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19601",\
        "y": "14599",\
        "z": "31",\
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
        "type": "NOISE",\
        "created": "1717505084863",\
        "updated": "1717505267716",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19042",\
        "y": "13641",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "seed", "7937,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "720,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717504900434",\
        "updated": "1717507296680",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18258",\
        "y": "13990",\
        "z": "33",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "29.000000000000004,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1717505289793",\
        "updated": "1717506788698",\
        "id": "bias",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19106",\
        "y": "13943",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "min", "-50,0"],\
                ["NUM#", "max", "150,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717505514502",\
        "updated": "1717505548221",\
        "id": "color7",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20343",\
        "y": "13914",\
        "z": "35",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717508219640",\
        "updated": "1717508229429",\
        "id": "colorStop10",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19770",\
        "y": "14592",\
        "z": "36",\
        "params":\
        [\
                ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "SCALE",\
        "created": "1717505222606",\
        "updated": "1717505247893",\
        "id": "scale",\
        "name": "scale",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19335",\
        "y": "13387",\
        "z": "37",\
        "params":\
        [\
                ["NUM#", "scaleX", "60.10187429554115,10"],\
                ["NUM#", "scaleY", "60.10187429554115,10"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717508219640",\
        "updated": "1717508468778",\
        "id": "colorStop11",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19794",\
        "y": "14835",\
        "z": "38",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 100,0 0,0"],\
                ["NUM#", "position", "96,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1717504838052",\
        "updated": "1717504838053",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18250",\
        "y": "13417",\
        "z": "39",\
        "params":\
        [\
                ["NUM#", "end", "360,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1717505255984",\
        "updated": "1717505255986",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19242",\
        "y": "13935",\
        "z": "40"\
        },\
        {\
        "type": "REPT",\
        "created": "1717504829537",\
        "updated": "1717504916305",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18738",\
        "y": "13414",\
        "z": "41",\
        "params":\
        [\
                ["NUM#", "count", "50,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717504869890",\
        "updated": "1717505145080",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18418.6",\
        "y": "13639.2",\
        "z": "42",\
        "width": "120",\
        "height": "38"\
        },\
        {\
        "type": "ELPS",\
        "created": "1717505491636",\
        "updated": "1717508694662",\
        "id": "ellipse2",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20161",\
        "y": "14136",\
        "z": "43",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "960,0"],\
                ["NUM#", "y", "540,0"],\
                ["NUM#", "width", "300,0"],\
                ["NUM#", "height", "300,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717505541052",\
        "updated": "1717506425184",\
        "id": "colorStop7",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19778",\
        "y": "14003",\
        "z": "44",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 204,0 0,0 35,0 0,0"],\
                ["NUM#", "position", "95,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1717505541052",\
        "updated": "1717505822539",\
        "id": "colorStop6",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20492",\
        "y": "14013",\
        "z": "45",\
        "params":\
        [\
                ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1717504883985",\
        "updated": "1717505145080",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17849",\
        "y": "13403",\
        "z": "46",\
        "params":\
        [\
                ["NUM#", "seed", "9224,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "40,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1717504949016",\
        "updated": "1717504960124",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17915.6",\
        "y": "13712.2",\
        "z": "47",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "30,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717505514502",\
        "updated": "1717506232759",\
        "id": "color10",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19431",\
        "y": "13902",\
        "z": "48",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717505514502",\
        "updated": "1717505549332",\
        "id": "color6",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19625",\
        "y": "14416",\
        "z": "49",\
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
        "type": "FILL",\
        "created": "1717506227403",\
        "updated": "1717506232759",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19599",\
        "y": "13874",\
        "z": "50",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 0,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "VPATH",\
        "created": "1717504910934",\
        "updated": "1717507314986",\
        "id": "path",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19015",\
        "y": "13387",\
        "z": "51",\
        "params":\
        [\
                ["NUM#", "closed", "1,0"],\
                ["NUM#", "winding", "1,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717505403949",\
        "updated": "1717508694662",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20286.6",\
        "y": "13647.2",\
        "z": "52",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "CMB",\
        "created": "1717508256754",\
        "updated": "1717508684805",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20100",\
        "y": "14451",\
        "z": "53",\
        "width": "122.63429107828797",\
        "height": "38"\
        },\
        {\
        "type": "FILL",\
        "created": "1717506227403",\
        "updated": "1717506425184",\
        "id": "fill3",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19600",\
        "y": "13991",\
        "z": "54",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 204,0 0,0"],\
                ["NUM#", "opacity", "35,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717505514502",\
        "updated": "1717505549332",\
        "id": "color8",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "20344",\
        "y": "14025",\
        "z": "55",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1717504958671",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717504960123",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "noise",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717504954372",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "neg",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717505037834",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717505429140",\
        "outputNodeId": "noise5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1717505091579",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1717504827420",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717504889516",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1717504860499",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1717504857802",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717504857802",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717508239766",\
        "outputNodeId": "colorStop10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717508285344",\
        "outputNodeId": "colorStop9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717508468778",\
        "outputNodeId": "colorStop11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1717507302147",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717507302148",\
        "outputNodeId": "fill4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717505828647",\
        "outputNodeId": "colorStop5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717505828648",\
        "outputNodeId": "colorStop6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717506205639",\
        "outputNodeId": "colorStop8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717506205639",\
        "outputNodeId": "colorStop7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717506205639",\
        "outputNodeId": "colorStop",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1717506205639",\
        "outputNodeId": "colorStop2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1717506205640",\
        "outputNodeId": "colorStop3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1717506205640",\
        "outputNodeId": "colorStop4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h5",\
        "list": "false"\
        },\
        {\
        "created": "1717508646865",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill5",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717507296679",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill4",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717504904901",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717508262099",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1717505822538",\
        "outputNodeId": "color7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop5",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505261601",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717505261601",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717505446128",\
        "outputNodeId": "noise5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1717505549332",\
        "outputNodeId": "color6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop4",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717508227310",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop9",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505548220",\
        "outputNodeId": "color5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505222609",\
        "outputNodeId": "scale",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717505267716",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1717505547120",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop2",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505545811",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505403951",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1717505841731",\
        "outputNodeId": "grad2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1717506232759",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop8",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505289794",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717505293722",\
        "outputNodeId": "noise4",\
        "outputId": "min",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717505295567",\
        "outputNodeId": "noise4",\
        "outputId": "max",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717508229428",\
        "outputNodeId": "color11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop10",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505222608",\
        "outputNodeId": "move2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717505255985",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "scale",\
        "inputId": "scaleX",\
        "list": "false"\
        },\
        {\
        "created": "1717505255985",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "scale",\
        "inputId": "scaleY",\
        "list": "false"\
        },\
        {\
        "created": "1717508466682",\
        "outputNodeId": "fill5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop11",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505289795",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717505008957",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717504873236",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1717504869891",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717508691310",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse2",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1717506425184",\
        "outputNodeId": "fill3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop7",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717505822538",\
        "outputNodeId": "color8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop6",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717506230768",\
        "outputNodeId": "color10",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717504916305",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1717507314986",\
        "outputNodeId": "grad3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1717505403951",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1717505564596",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717508694662",\
        "outputNodeId": "ellipse2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1717508256756",\
        "outputNodeId": "grad4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717506420281",\
        "outputNodeId": "color9",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill3",\
        "inputId": "color",\
        "list": "false"\
        }\
    ]\
}';