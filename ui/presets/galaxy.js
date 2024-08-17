const presetGalaxy ='\
{\
    "generatorVersion": "434",\
    "nodes":\
    [\
        {\
        "type": "TRIG",\
        "created": "1717249885335",\
        "updated": "1717250042974",\
        "id": "trig2",\
        "name": "trigonometric",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16938",\
        "y": "14347",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "function", "1,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1717322607665",\
        "updated": "1717322664677",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18925",\
        "y": "13508",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "angle", "22,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1717320248541",\
        "updated": "1717322603519",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18459",\
        "y": "15011",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "count", "6,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1717249190750",\
        "updated": "1717249398960",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18256",\
        "y": "12587",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "count", "100,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1717248386499",\
        "updated": "1717249430645",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18408",\
        "y": "10720",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "count", "1000,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1717321577591",\
        "updated": "1717321722443",\
        "id": "range5",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17001",\
        "y": "13490",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "start", "25,0"],\
                ["NUM#", "end", "0,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1717321519124",\
        "updated": "1717321893869",\
        "id": "range4",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17397",\
        "y": "14257",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "start", "3,0"],\
                ["NUM#", "end", "0,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1717320044544",\
        "updated": "1717320170387",\
        "id": "range3",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16611",\
        "y": "14771",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "end", "636,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1717249862901",\
        "updated": "1717321315655",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16399",\
        "y": "14334",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "start", "5.235987756,9"],\
                ["NUM#", "end", "11.5191730632,10"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717249136803",\
        "updated": "1717249146634",\
        "id": "random9",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16275",\
        "y": "10518",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "seed", "7030,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "0.25,2"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717249060604",\
        "updated": "1717249064683",\
        "id": "random8",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16021",\
        "y": "9619",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "seed", "2633,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "10,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717248962573",\
        "updated": "1717248973888",\
        "id": "random5",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15971",\
        "y": "9890",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "seed", "1115,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "255,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717248722212",\
        "updated": "1717249146634",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16432",\
        "y": "10314",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "seed", "6346,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "0.05,2"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717248722212",\
        "updated": "1717248750220",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16246",\
        "y": "10271",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "seed", "8129,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "0.1,1"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717248402520",\
        "updated": "1717248627528",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16739",\
        "y": "10911",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "seed", "9697,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "1080,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717249280882",\
        "updated": "1717249313240",\
        "id": "random12",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17733",\
        "y": "12523",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "seed", "2206,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "1920,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717249246783",\
        "updated": "1717249269330",\
        "id": "random11",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17133",\
        "y": "12032",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "seed", "1871,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "20,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1717321844384",\
        "updated": "1717321853319",\
        "id": "num3",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16614.1",\
        "y": "14916.3",\
        "z": "17",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "12,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1717249524875",\
        "updated": "1717249753436",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18106",\
        "y": "14155",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "count", "400,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1716207995894",\
        "updated": "1717248733652",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16450",\
        "y": "10062",\
        "z": "19",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1717321989380",\
        "updated": "1717322006784",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16573",\
        "y": "13256",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "seed", "2654,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "TRIG",\
        "created": "1717249885335",\
        "updated": "1717250032882",\
        "id": "trig",\
        "name": "trigonometric",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16936",\
        "y": "14055",\
        "z": "21"\
        },\
        {\
        "type": "NOISE",\
        "created": "1717321772952",\
        "updated": "1717322231813",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16917",\
        "y": "14814",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "seed", "5068,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-12,0"],\
                ["NUM#", "max", "12,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"],\
                ["NUM#", "detail", "5,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1717321928737",\
        "updated": "1717323102009",\
        "id": "neg2",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17648",\
        "y": "14138",\
        "z": "23"\
        },\
        {\
        "type": "SMATH",\
        "created": "1717249724609",\
        "updated": "1717249931262",\
        "id": "math7",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17307",\
        "y": "14029",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1717249675880",\
        "updated": "1717249742983",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17479",\
        "y": "14029",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "operand", "540,0"],\
                ["NUM#", "invert", "1,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1717248867792",\
        "updated": "1717248890014",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16643",\
        "y": "9819",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "5,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1717321888766",\
        "updated": "1717321911445",\
        "id": "math14",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17820",\
        "y": "14020",\
        "z": "27"\
        },\
        {\
        "type": "SMATH",\
        "created": "1717249966146",\
        "updated": "1717320507008",\
        "id": "math10",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16094",\
        "y": "14201",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "1,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1716208018263",\
        "updated": "1717248621608",\
        "id": "grad2",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17284",\
        "y": "10196",\
        "z": "29",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "3,0"],\
                ["NUM#", "x", "179,0"],\
                ["NUM#", "y", "23,0"],\
                ["NUM#", "blend", "5,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1716208018263",\
        "updated": "1717248500064",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17071",\
        "y": "10057",\
        "z": "30",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "3,0"],\
                ["NUM#", "x", "179,0"],\
                ["NUM#", "y", "23,0"],\
                ["NUM#", "blend", "5,0"]\
        ]\
        },\
        {\
        "type": "RECT",\
        "created": "1717322588316",\
        "updated": "1717322603519",\
        "id": "rect",\
        "name": "rectangle",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18765",\
        "y": "13508",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "width", "1920,0"],\
                ["NUM#", "height", "1080,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1717249656171",\
        "id": "fill7",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17392",\
        "y": "13604",\
        "z": "32",\
        "params":\
        [\
                ["COL#", "color", "1,0 236,0 153,0 245,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1717249236194",\
        "id": "fill5",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17649",\
        "y": "12305",\
        "z": "33",\
        "params":\
        [\
                ["COL#", "color", "1,0 10,0 0,0 31,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1717249276091",\
        "id": "fill4",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17644",\
        "y": "12077",\
        "z": "34",\
        "params":\
        [\
                ["COL#", "color", "1,0 10,0 0,0 31,0"],\
                ["NUM#", "opacity", "10,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1716207991423",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16738",\
        "y": "10152",\
        "z": "35",\
        "params":\
        [\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1716208018263",\
        "updated": "1717249317112",\
        "id": "grad4",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17982",\
        "y": "12210",\
        "z": "36",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "3,0"],\
                ["NUM#", "x", "1071,0"],\
                ["NUM#", "y", "277,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717320438443",\
        "updated": "1717321174375",\
        "id": "combine8",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16457.8",\
        "y": "15088.8",\
        "z": "37",\
        "width": "125.65685424949247",\
        "height": "38"\
        },\
        {\
        "type": "GRAD",\
        "created": "1716208018263",\
        "updated": "1717248627528",\
        "id": "grad3",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17468",\
        "y": "10409",\
        "z": "38",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "3,0"],\
                ["NUM#", "x", "179,0"],\
                ["NUM#", "y", "23,0"],\
                ["NUM#", "blend", "5,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717248374754",\
        "updated": "1717248378912",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17963.4",\
        "y": "9824.2",\
        "z": "39",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207998471",\
        "id": "colorStop6",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17822",\
        "y": "12162",\
        "z": "40",\
        "params":\
        [\
                ["FILL#", "fill", "10,0 0,0 31,0 10,0 0,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207982970",\
        "id": "colorStop5",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17822",\
        "y": "12061",\
        "z": "41",\
        "params":\
        [\
                ["FILL#", "fill", "10,0 0,0 31,0 10,0 0,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207982970",\
        "id": "colorStop9",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17557",\
        "y": "13421",\
        "z": "42",\
        "params":\
        [\
                ["FILL#", "fill", "236,0 153,0 245,0 0,0 0,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207991423",\
        "id": "colorStop12",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17557",\
        "y": "13617",\
        "z": "43",\
        "params":\
        [\
                ["FILL#", "fill", "236,0 153,0 245,0 0,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1717321989380",\
        "updated": "1717322003342",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16567",\
        "y": "13000",\
        "z": "44",\
        "params":\
        [\
                ["NUM#", "seed", "6546,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "200,0"],\
                ["NUM#", "max", "300,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717321963098",\
        "updated": "1717322010232",\
        "id": "color5",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16993",\
        "y": "13142",\
        "z": "45",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "294.0863469621141,0"],\
                ["NUM#", "c2", "82.37530628457986,0"],\
                ["NUM#", "c3", "78.03130410783481,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207991423",\
        "id": "colorStop4",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16908",\
        "y": "10207",\
        "z": "46",\
        "params":\
        [\
                ["FILL#", "fill", "217,0 217,0 217,0 0,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717248955780",\
        "updated": "1717248981652",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16388",\
        "y": "9815",\
        "z": "47",\
        "prevSpace": "rgb",\
        "params":\
        [\
                ["NUM#", "space", "1,0"],\
                ["NUM#", "c1", "158,0"],\
                ["NUM#", "c2", "177,0"],\
                ["NUM#", "c3", "71,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717247987597",\
        "updated": "1717247990253",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19347",\
        "y": "12154",\
        "z": "48",\
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
        "type": "NBIAS",\
        "created": "1717250026001",\
        "updated": "1717321285512",\
        "id": "bias2",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16761",\
        "y": "14346",\
        "z": "49",\
        "params":\
        [\
                ["NUM#", "min", "5.235987756,9"],\
                ["NUM#", "max", "11.5191730632,10"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717249749859",\
        "updated": "1717321621770",\
        "id": "combine7",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17591.3",\
        "y": "14403.3",\
        "z": "50",\
        "width": "120",\
        "height": "90"\
        },\
        {\
        "type": "NBIAS",\
        "created": "1717250026001",\
        "updated": "1717320178108",\
        "id": "bias",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16756",\
        "y": "14055",\
        "z": "51",\
        "params":\
        [\
                ["NUM#", "min", "5.235987756,9"],\
                ["NUM#", "max", "11.5191730632,10"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1717321899232",\
        "updated": "1717323102009",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17826",\
        "y": "14123",\
        "z": "52",\
        "params":\
        [\
                ["NUM#", "seed", "992,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-2,0"],\
                ["NUM#", "max", "2,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1717249675880",\
        "updated": "1717249733103",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17481",\
        "y": "13840",\
        "z": "53",\
        "params":\
        [\
                ["NUM#", "operand", "960,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1717321848159",\
        "updated": "1717321851440",\
        "id": "neg",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16764",\
        "y": "14884",\
        "z": "54"\
        },\
        {\
        "type": "CMB",\
        "created": "1717248417596",\
        "updated": "1717248820691",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17600.8",\
        "y": "10813.8",\
        "z": "55",\
        "width": "120",\
        "height": "90"\
        },\
        {\
        "type": "SMATH",\
        "created": "1717249724609",\
        "updated": "1717249899477",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17308",\
        "y": "13840",\
        "z": "56",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "1.5,1"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1717247958025",\
        "updated": "1719148474252",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19955",\
        "y": "12382",\
        "z": "57",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "1920,0"],\
                ["NUM#", "height", "1080,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717248962573",\
        "updated": "1717248975647",\
        "id": "random6",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16106",\
        "y": "9890",\
        "z": "58",\
        "params":\
        [\
                ["NUM#", "seed", "7230,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "255,0"]\
        ]\
        },\
        {\
        "type": "PROB",\
        "created": "1717248657497",\
        "updated": "1717248664553",\
        "id": "prob",\
        "name": "probability",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17704",\
        "y": "10425",\
        "z": "59",\
        "params":\
        [\
                ["NUM#", "seed", "9094,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "chance", "1,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1717249922873",\
        "updated": "1717320167079",\
        "id": "math8",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17113",\
        "y": "14055",\
        "z": "60",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "639.3677952907392,10"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1717249922873",\
        "updated": "1717320170387",\
        "id": "math9",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17111",\
        "y": "14348",\
        "z": "61",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "639.3677952907392,10"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716208007711",\
        "updated": "1717248808106",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16600",\
        "y": "10098",\
        "z": "62",\
        "params":\
        [\
                ["NUM#", "operand", "0.04,2"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1717322224451",\
        "updated": "1717322231813",\
        "id": "bias5",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17077",\
        "y": "14814",\
        "z": "63",\
        "params":\
        [\
                ["NUM#", "min", "-12,0"],\
                ["NUM#", "max", "12,0"],\
                ["NUM#", "spread", "-100,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1717321764266",\
        "updated": "1717321774880",\
        "id": "math13",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17077",\
        "y": "14615",\
        "z": "64"\
        },\
        {\
        "type": "MATH",\
        "created": "1717320284158",\
        "updated": "1717320810678",\
        "id": "math11",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16402.4",\
        "y": "14590",\
        "z": "65"\
        },\
        {\
        "type": "CMB",\
        "created": "1717249294038",\
        "updated": "1717249298972",\
        "id": "combine5",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17901.6",\
        "y": "12675.1",\
        "z": "66",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "RANGE",\
        "created": "1717249862901",\
        "updated": "1717321320608",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16412",\
        "y": "14045",\
        "z": "67",\
        "params":\
        [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "start", "5.235987756,9"],\
                ["NUM#", "end", "11.5191730632,10"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717248962573",\
        "updated": "1717248977104",\
        "id": "random7",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16240",\
        "y": "9892",\
        "z": "68",\
        "params":\
        [\
                ["NUM#", "seed", "5764,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "255,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207982970",\
        "id": "colorStop",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16961",\
        "y": "9771",\
        "z": "69",\
        "params":\
        [\
                ["FILL#", "fill", "97,0 97,0 97,0 75,0 0,0"]\
        ]\
        },\
        {\
        "type": "CONST",\
        "created": "1717249870652",\
        "updated": "1717321345605",\
        "id": "constant",\
        "name": "constant",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15877",\
        "y": "14199",\
        "z": "70",\
        "params":\
        [\
                ["NUM#", "constant", "5,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1717249057743",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16476",\
        "y": "9637",\
        "z": "71",\
        "params":\
        [\
                ["COL#", "color", "1,0 97,0 97,0 97,0"],\
                ["NUM#", "opacity", "75,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716208012223",\
        "id": "colorStop7",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17819",\
        "y": "12259",\
        "z": "72",\
        "params":\
        [\
                ["FILL#", "fill", "10,0 0,0 31,0 0,0 0,0"],\
                ["NUM#", "position", "16,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717249246783",\
        "updated": "1717249257071",\
        "id": "random10",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17124",\
        "y": "11799",\
        "z": "73",\
        "params":\
        [\
                ["NUM#", "seed", "618,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "220,0"],\
                ["NUM#", "max", "280,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717249240706",\
        "updated": "1717249276091",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17513",\
        "y": "11803",\
        "z": "74",\
        "prevSpace": "hsb",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "260,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "12,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717249280882",\
        "updated": "1717249317112",\
        "id": "random13",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17734",\
        "y": "12752",\
        "z": "75",\
        "params":\
        [\
                ["NUM#", "seed", "5419,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "1080,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717248002916",\
        "updated": "1717322780215",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "19681.6",\
        "y": "12574",\
        "z": "76",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "SMATH",\
        "created": "1717321337962",\
        "updated": "1717321345605",\
        "id": "math12",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15883",\
        "y": "14635",\
        "z": "77",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "6,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717248327425",\
        "updated": "1717248327427",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17651.6",\
        "y": "10272.3",\
        "z": "78",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "IF",\
        "created": "1717248330536",\
        "updated": "1717248664553",\
        "id": "ifElse",\
        "name": "if%2Felse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17812",\
        "y": "10272",\
        "z": "79",\
        "params":\
        [\
                ["NUM#", "condition", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1717249050205",\
        "updated": "1717249064683",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16214",\
        "y": "9604",\
        "z": "80",\
        "prevSpace": "hsb",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "300,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "38,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1717321976439",\
        "id": "fill6",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17387",\
        "y": "13418",\
        "z": "81",\
        "params":\
        [\
                ["COL#", "color", "1,0 236,0 153,0 245,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1717248906414",\
        "id": "colorStop2",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16961",\
        "y": "9872",\
        "z": "82",\
        "params":\
        [\
                ["FILL#", "fill", "158,0 177,0 71,0 15,0 0,0"],\
                ["NUM#", "position", "0,1"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1717321924869",\
        "updated": "1717321936715",\
        "id": "num4",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17573.7",\
        "y": "14211",\
        "z": "83",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "2,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1717248981652",\
        "id": "fill3",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16795",\
        "y": "9821",\
        "z": "84",\
        "params":\
        [\
                ["COL#", "color", "1,0 158,0 177,0 71,0"],\
                ["NUM#", "opacity", "15,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1717321609558",\
        "updated": "1717321722443",\
        "id": "bias4",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17161",\
        "y": "13490",\
        "z": "85",\
        "params":\
        [\
                ["NUM#", "min", "25,0"],\
                ["NUM#", "max", "0,0"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207991423",\
        "id": "colorStop8",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17819",\
        "y": "12360",\
        "z": "86",\
        "params":\
        [\
                ["FILL#", "fill", "10,0 0,0 31,0 0,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1717320137524",\
        "updated": "1717320178108",\
        "id": "bias3",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16917",\
        "y": "14615",\
        "z": "87",\
        "params":\
        [\
                ["NUM#", "max", "636,0"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1717320267772",\
        "updated": "1717321345605",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15895",\
        "y": "15081",\
        "z": "88",\
        "params":\
        [\
                ["NUM#", "add", "1.0471975512,10"],\
                ["NUM#", "end", "?,?"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1717321989380",\
        "updated": "1717322010232",\
        "id": "noise5",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16573",\
        "y": "13497",\
        "z": "89",\
        "params":\
        [\
                ["NUM#", "seed", "1578,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "85,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716208012223",\
        "id": "colorStop3",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16908",\
        "y": "10106",\
        "z": "90",\
        "params":\
        [\
                ["FILL#", "fill", "217,0 217,0 217,0 0,0 0,0"],\
                ["NUM#", "position", "0.04,2"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1717248402520",\
        "updated": "1717248625084",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16743",\
        "y": "10673",\
        "z": "91",\
        "params":\
        [\
                ["NUM#", "seed", "2428,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "1920,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1716208018263",\
        "updated": "1717321893869",\
        "id": "grad5",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17772",\
        "y": "13535",\
        "z": "92",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "3,0"],\
                ["NUM#", "x", "129.43682331546756,10"],\
                ["NUM#", "y", "699.8419216529306,10"],\
                ["NUM#", "size", "-1.28358232446985,0"],\
                ["NUM#", "blend", "6,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1716207995894",\
        "updated": "1716208009472",\
        "id": "num2",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17360.6",\
        "y": "12215.1",\
        "z": "93",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "0,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716208007711",\
        "updated": "1716208012223",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17511",\
        "y": "12251",\
        "z": "94",\
        "params":\
        [\
                ["NUM#", "operand", "16,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1717249391718",\
        "updated": "1717322780215",\
        "id": "combine6",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18952.6",\
        "y": "12595",\
        "z": "95",\
        "width": "117.36098417845417",\
        "height": "51"\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1717250042974",\
        "outputNodeId": "bias2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "trig2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717322607668",\
        "outputNodeId": "rect",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717320248544",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1717320447681",\
        "outputNodeId": "combine8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1717249190752",\
        "outputNodeId": "grad4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717249298972",\
        "outputNodeId": "combine5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1717248386500",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1717248440281",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1717321315655",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "range2",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1717320318285",\
        "outputNodeId": "math11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range2",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1717249146634",\
        "outputNodeId": "random9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "random4",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717249524878",\
        "outputNodeId": "grad5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717249753436",\
        "outputNodeId": "combine7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1717248733652",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "num",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717250032882",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "trig",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321851439",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717321853319",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717321928739",\
        "outputNodeId": "num4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "neg2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717249931262",\
        "outputNodeId": "math9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717249740233",\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248870000",\
        "outputNodeId": "fill",\
        "outputId": "opacity",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321890789",\
        "outputNodeId": "range4",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math14",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321911445",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math14",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717250242041",\
        "outputNodeId": "constant",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math10",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248188284",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248618916",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "grad2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1717248621607",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "grad2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "colorStop",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "colorStop2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "colorStop3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "colorStop4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1717248497993",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "grad",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1717248500064",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "grad",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1717322603519",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1717249655413",\
        "outputNodeId": "fill6",\
        "outputId": "color",\
        "outputOrder": "0",\
        "inputNodeId": "fill7",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717249236194",\
        "outputNodeId": "fill4",\
        "outputId": "color",\
        "outputOrder": "0",\
        "inputNodeId": "fill5",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717249276090",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill4",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "colorStop5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "colorStop6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "colorStop7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "colorStop8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad4",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1717249313240",\
        "outputNodeId": "random12",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad4",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1717249317112",\
        "outputNodeId": "random13",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad4",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1717321113544",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248227621",\
        "outputNodeId": "grad2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248625084",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "grad3",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1717248627527",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "grad3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1717248377276",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248378911",\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "fill4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop6",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop6",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "fill4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop5",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717249647347",\
        "outputNodeId": "fill6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop9",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717249512831",\
        "outputNodeId": "fill7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop12",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717322003341",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color5",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1717322006784",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color5",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1717322010232",\
        "outputNodeId": "noise5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color5",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop4",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717248973888",\
        "outputNodeId": "random5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1717248975646",\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1717248977104",\
        "outputNodeId": "random7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1717321109269",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "bias2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321285512",\
        "outputNodeId": "range2",\
        "outputId": "start",\
        "outputOrder": "0",\
        "inputNodeId": "bias2",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717250040994",\
        "outputNodeId": "range2",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias2",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717250045554",\
        "outputNodeId": "bias",\
        "outputId": "bias",\
        "outputOrder": "0",\
        "inputNodeId": "bias2",\
        "inputId": "bias",\
        "list": "false"\
        },\
        {\
        "created": "1717321106922",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321109266",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine7",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717321111162",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine7",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1717321536331",\
        "outputNodeId": "range4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine7",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1717321621770",\
        "outputNodeId": "range5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine7",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1717321106925",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "bias",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717250029961",\
        "outputNodeId": "range",\
        "outputId": "start",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717250031270",\
        "outputNodeId": "range",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717323102009",\
        "outputNodeId": "neg2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise2",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717321936715",\
        "outputNodeId": "num4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise2",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717249729163",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321848161",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "neg",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248417597",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248417597",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717248660961",\
        "outputNodeId": "prob",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1717248750220",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1717248820691",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1717249922876",\
        "outputNodeId": "math8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717322664677",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "false"\
        },\
        {\
        "created": "1717248002918",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1717249922876",\
        "outputNodeId": "trig",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321764269",\
        "outputNodeId": "math13",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math8",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1717249927652",\
        "outputNodeId": "trig2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math9",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321764269",\
        "outputNodeId": "math13",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math9",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248808106",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1717322224454",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717322229876",\
        "outputNodeId": "noise",\
        "outputId": "min",\
        "outputOrder": "0",\
        "inputNodeId": "bias5",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717322231813",\
        "outputNodeId": "noise",\
        "outputId": "max",\
        "outputOrder": "0",\
        "inputNodeId": "bias5",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717321764268",\
        "outputNodeId": "bias3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math13",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717322224454",\
        "outputNodeId": "bias5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math13",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717321113538",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math11",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717320312009",\
        "outputNodeId": "math10",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math11",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717249294039",\
        "outputNodeId": "random12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717249294040",\
        "outputNodeId": "random13",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717321320607",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "range",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1717320507008",\
        "outputNodeId": "math11",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "range",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717249057743",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "fill5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop7",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop7",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1717249257071",\
        "outputNodeId": "random10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color4",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1717249269330",\
        "outputNodeId": "random11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color4",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1717248002918",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717322780215",\
        "outputNodeId": "combine6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1717321339953",\
        "outputNodeId": "constant",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math12",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248327426",\
        "outputNodeId": "grad2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717248327426",\
        "outputNodeId": "grad3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717248330538",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1717248664553",\
        "outputNodeId": "prob",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ifElse",\
        "inputId": "condition",\
        "list": "false"\
        },\
        {\
        "created": "1717249064683",\
        "outputNodeId": "random8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color3",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1717321976439",\
        "outputNodeId": "color5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill6",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717321609561",\
        "outputNodeId": "bias4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill6",\
        "inputId": "opacity",\
        "list": "false"\
        },\
        {\
        "created": "1717248906414",\
        "outputNodeId": "fill3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop2",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop2",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1717248981652",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill3",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1717248890013",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill3",\
        "inputId": "opacity",\
        "list": "false"\
        },\
        {\
        "created": "1717321609560",\
        "outputNodeId": "range5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717321720559",\
        "outputNodeId": "range5",\
        "outputId": "start",\
        "outputOrder": "0",\
        "inputNodeId": "bias4",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717321722443",\
        "outputNodeId": "range5",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias4",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "fill5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop8",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717321111165",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "bias3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717320155063",\
        "outputNodeId": "range3",\
        "outputId": "start",\
        "outputOrder": "1",\
        "inputNodeId": "bias3",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1717320159461",\
        "outputNodeId": "range3",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias3",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1717320178108",\
        "outputNodeId": "bias",\
        "outputId": "bias",\
        "outputOrder": "1",\
        "inputNodeId": "bias3",\
        "inputId": "bias",\
        "list": "false"\
        },\
        {\
        "created": "1717321345605",\
        "outputNodeId": "math12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "sequence",\
        "inputId": "add",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1717248046632",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1716208018265",\
        "outputNodeId": "colorStop9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716208018266",\
        "outputNodeId": "colorStop12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1717249733103",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad5",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1717249742983",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad5",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1717321893868",\
        "outputNodeId": "math14",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad5",\
        "inputId": "size",\
        "list": "false"\
        },\
        {\
        "created": "1717249182220",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1717249398959",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine6",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1717249430644",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine6",\
        "inputId": "h1",\
        "list": "true"\
        }\
    ]\
}';