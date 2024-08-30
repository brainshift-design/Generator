const presetLineGraph = '\
{\
    "generatorVersion": "375",\
    "nodes":\
    [\
        {\
        "type": "COUNT",\
        "created": "1709587715058",\
        "updated": "1709587746543",\
        "id": "itemCount2",\
        "name": "N%20of%20cities",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5302",\
        "y": "3779",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "value", "10,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709586719292",\
        "updated": "1709587056762",\
        "id": "select2",\
        "name": "city%20name",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5385",\
        "y": "3471",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709587823688",\
        "updated": "1709587826351",\
        "id": "sequence4",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6940",\
        "y": "4090",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "start", "-105,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "TXTS",\
        "created": "1709587046581",\
        "updated": "1709587826351",\
        "id": "text3",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7151",\
        "y": "3948",\
        "z": "3",\
        "params":\
        [\
                ["TEXT#", "text", "Lisbon", "center"],\
                ["NUM#", "x", "-30,0"],\
                ["NUM#", "y", "-15,0"],\
                ["NUM#", "size", "8,0"],\
                ["TEXT#", "style", "Regular"],\
                ["NUM#", "alignX", "2,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1709586791540",\
        "updated": "1709586924454",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6532",\
        "y": "3154",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "x", "220,0"],\
                ["NUM#", "y", "-74,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709587498198",\
        "updated": "1709587509568",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6809.2",\
        "y": "2731.85",\
        "z": "5",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "RAND",\
        "created": "1709587576941",\
        "updated": "1709587586125",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5162",\
        "y": "3984",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "seed", "4252,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "max", "360,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1709587568750",\
        "updated": "1709588060270",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5327",\
        "y": "4057",\
        "z": "7",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "329,0"],\
                ["NUM#", "c2", "99,0"],\
                ["NUM#", "c3", "80,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709587589482",\
        "updated": "1709587599954",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5487",\
        "y": "4057",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "count", "12,0"]\
        ]\
        },\
        {\
        "type": "FRZ",\
        "created": "1709587621627",\
        "updated": "1709587621631",\
        "id": "freeze",\
        "name": "freeze",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5647",\
        "y": "4057",\
        "z": "9"\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709587594313",\
        "updated": "1709587791865",\
        "id": "select4",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5852",\
        "y": "4058",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "index", "9,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709586856055",\
        "updated": "1709587791865",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5556",\
        "y": "3596",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1709587175160",\
        "updated": "1709587667247",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6582",\
        "y": "2593",\
        "z": "12",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "220,0"],\
                ["NUM#", "y", "-74,0"],\
                ["NUM#", "width", "2,0"],\
                ["NUM#", "height", "2,0"],\
                ["NUM#", "start", "-74,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709587217641",\
        "updated": "1709587472792",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7782.96",\
        "y": "3572",\
        "z": "13",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "REPT",\
        "created": "1709587734121",\
        "updated": "1709620782972",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8164",\
        "y": "4322",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "count", "10,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709587694460",\
        "updated": "1709587800795",\
        "id": "sequence3",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4933",\
        "y": "4404",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709586711644",\
        "updated": "1709587777164",\
        "id": "select",\
        "name": "city%20row",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "4",\
        "notCondition": "false",\
        "x": "5385",\
        "y": "3366",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "index", "9,0"]\
        ]\
        },\
        {\
        "type": "COUNT",\
        "created": "1709586809750",\
        "updated": "1709621187161",\
        "id": "itemCount",\
        "name": "item%20count",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5724",\
        "y": "3460",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "value", "12,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709588198630",\
        "updated": "1709621459848",\
        "id": "sequence7",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7203",\
        "y": "2264",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "TEXT",\
        "created": "1709586675069",\
        "updated": "1709586675073",\
        "id": "text",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4630.1",\
        "y": "3335.09",\
        "z": "19",\
        "width": "278.25904486251807",\
        "height": "298",\
        "params":\
        [\
                ["TEXT#", "value", "City%2CJanuary%2CFebruary%2CMarch%2CApril%2CMay%2CJune%2CJuly%2CAugust%2CSeptember%2COctober%2CNovember%2CDecember%0ALondon%2C55%2C41%2C47%2C44%2C49%2C45%2C49%2C57%2C49%2C57%2C64%2C55%0AParis%2C49%2C40%2C44%2C43%2C50%2C49%2C54%2C58%2C55%2C60%2C52%2C58%0ABerlin%2C42%2C35%2C40%2C37%2C60%2C68%2C78%2C82%2C45%2C37%2C49%2C55%0AMadrid%2C33%2C35%2C25%2C45%2C52%2C25%2C12%2C10%2C22%2C60%2C82%2C90%0ARome%2C67%2C73%2C58%2C55%2C53%2C34%2C19%2C15%2C85%2C97%2C110%2C120%0AWarsaw%2C37%2C30%2C28%2C38%2C56%2C69%2C73%2C74%2C55%2C40%2C49%2C42%0AOslo%2C49%2C36%2C47%2C41%2C53%2C65%2C81%2C89%2C90%2C86%2C73%2C55%0AAthens%2C56%2C46%2C40%2C30%2C20%2C10%2C5%2C6%2C13%2C52%2C58%2C69%0AMoscow%2C52%2C43%2C35%2C37%2C55%2C85%2C85%2C83%2C75%2C71%2C55%2C58%0ALisbon%2C60%2C53%2C38%2C45%2C28%2C16%2C4%2C6%2C26%2C57%2C67%2C74", "left"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1709588415706",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7342",\
        "y": "1972",\
        "z": "20",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "136,0"],\
                ["NUM#", "c3", "136,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709621628437",\
        "updated": "1709621642652",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7662",\
        "y": "2008",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "operand", "65,0"]\
        ]\
        },\
        {\
        "type": "N2T",\
        "created": "1709588330498",\
        "updated": "1709722180172",\
        "id": "numToText",\
        "name": "number%20to%20text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7651",\
        "y": "1277",\
        "z": "22",\
        "params":\
        [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
        ]\
        },\
        {\
        "type": "TXTS",\
        "created": "1709588317761",\
        "updated": "1709722180172",\
        "id": "text2",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7830",\
        "y": "1251",\
        "z": "23",\
        "params":\
        [\
                ["TEXT#", "text", "120", "center"],\
                ["NUM#", "x", "-10,0"],\
                ["NUM#", "y", "-120,0"],\
                ["NUM#", "size", "6,0"],\
                ["TEXT#", "style", "Regular"],\
                ["NUM#", "alignX", "2,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1709588415706",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7241",\
        "y": "1303",\
        "z": "24",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "136,0"],\
                ["NUM#", "c3", "136,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709588249579",\
        "updated": "1709621953387",\
        "id": "combine5",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8507.42",\
        "y": "3092.28",\
        "z": "25",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "COL",\
        "created": "1709622056963",\
        "updated": "1709622060126",\
        "id": "color5",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8619",\
        "y": "3286",\
        "z": "26",\
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
        "type": "PANEL",\
        "created": "1709621769695",\
        "updated": "1709712914527",\
        "id": "panel2",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "6370",\
        "y": "2527",\
        "z": "27",\
        "width": "1294.9347861922863",\
        "height": "1136.7392431784983",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709586831188",\
        "updated": "1709586940704",\
        "id": "select3",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5724",\
        "y": "3366",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "index", "11,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1709586900061",\
        "updated": "1709587245733",\
        "id": "neg",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6046",\
        "y": "3366",\
        "z": "29"\
        },\
        {\
        "type": "CMB",\
        "created": "1709588357258",\
        "updated": "1709621199199",\
        "id": "combine7",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7983",\
        "y": "1850.48",\
        "z": "30",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "RAND",\
        "created": "1709587576941",\
        "updated": "1709588060270",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5165",\
        "y": "4184",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "seed", "4211,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709587194839",\
        "updated": "1709587199081",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7446.2",\
        "y": "2965.85",\
        "z": "32",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "TCSV",\
        "created": "1709586700984",\
        "updated": "1709621245883",\
        "id": "csv",\
        "name": "csv",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "4948",\
        "y": "3335",\
        "z": "33",\
        "params":\
        [\
                ["TEXT#", "rowSeparator", "%5Cn", "left"],\
                ["TEXT#", "columnSeparator", "%2C", "left"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709588195499",\
        "updated": "1709588365522",\
        "id": "repeat5",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8159",\
        "y": "1152",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "count", "13,0"]\
        ]\
        },\
        {\
        "type": "SUBLST",\
        "created": "1709621303141",\
        "updated": "1709621303148",\
        "id": "sublist3",\
        "name": "sublist",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5320",\
        "y": "3185",\
        "z": "35",\
        "_connected": "false",\
        "params":\
        [\
                ["NUM#", "start", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1709587576941",\
        "updated": "1709712914527",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5165",\
        "y": "4184",\
        "z": "36",\
        "params":\
        [\
                ["NUM#", "seed", "922,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709588195499",\
        "updated": "1709621199199",\
        "id": "repeat6",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8144",\
        "y": "1860",\
        "z": "37",\
        "params":\
        [\
                ["NUM#", "count", "12,0"]\
        ]\
        },\
        {\
        "type": "SUBLST",\
        "created": "1709586958965",\
        "updated": "1709586964299",\
        "id": "sublist2",\
        "name": "data",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5158",\
        "y": "3364",\
        "z": "38",\
        "_connected": "false",\
        "params":\
        [\
                ["NUM#", "start", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1709588235223",\
        "id": "stroke3",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7495",\
        "y": "1928",\
        "z": "39",\
        "params":\
        [\
                ["EXPAND#", "fills", "1 FILL# 136,0 136,0 136,0 100,0 0,0"],\
                ["NUM#", "weight", "0.5,1"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1709587013440",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7065",\
        "y": "3383",\
        "z": "40",\
        "params":\
        [\
                ["EXPAND#", "fills", "1 FILL# 14,0 204,0 21,0 100,0 0,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709621240891",\
        "updated": "1709621245883",\
        "id": "select5",\
        "name": "months",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5160",\
        "y": "3185",\
        "z": "41",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "VPATH",\
        "created": "1709586993843",\
        "updated": "1709587036169",\
        "id": "path",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7219",\
        "y": "3124",\
        "z": "42",\
        "params":\
        [\
                ["EXPAND#", "points", "12 PT# 0,0 -60,0 PT# 20,0 -53,0 PT# 40,0 -38,0 PT# 60,0 -45,0 PT# 80,0 -28,0 PT# 100,0 -16,0 PT# 120,0 -4,0 PT# 140,0 -6,0 PT# 160,0 -26,0 PT# 180,0 -57,0 PT# 200,0 -67,0 PT# 220,0 -74,0"],\
                ["NUM#", "degree", "0,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709588198630",\
        "updated": "1709588315204",\
        "id": "sequence5",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7426",\
        "y": "1073",\
        "z": "43",\
        "params":\
        [\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1709588235223",\
        "id": "stroke2",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7416",\
        "y": "1266",\
        "z": "44",\
        "params":\
        [\
                ["EXPAND#", "fills", "1 FILL# 136,0 136,0 136,0 100,0 0,0"],\
                ["NUM#", "weight", "0.5,1"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709588198630",\
        "updated": "1709621638525",\
        "id": "sequence6",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7411",\
        "y": "1781",\
        "z": "45",\
        "params":\
        [\
                ["NUM#", "start", "-65,0"],\
                ["NUM#", "add", "20,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "T2N",\
        "created": "1709586844688",\
        "updated": "1709586933663",\
        "id": "textToNum",\
        "name": "text%20to%20number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5884",\
        "y": "3366",\
        "z": "46",\
        "params":\
        [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709587498198",\
        "updated": "1709587520436",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6753.2",\
        "y": "3265.85",\
        "z": "47",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "SUBLST",\
        "created": "1709586730283",\
        "updated": "1709586783992",\
        "id": "sublist",\
        "name": "temps%20F",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5545",\
        "y": "3366",\
        "z": "48",\
        "_connected": "false",\
        "params":\
        [\
                ["NUM#", "start", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1709588309396",\
        "updated": "1709588394073",\
        "id": "neg2",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7613",\
        "y": "1039",\
        "z": "49"\
        },\
        {\
        "type": "REPT",\
        "created": "1709586804329",\
        "updated": "1709587503471",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7004",\
        "y": "2591",\
        "z": "50",\
        "params":\
        [\
                ["NUM#", "count", "12,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709586804329",\
        "updated": "1709587520436",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6949",\
        "y": "3148",\
        "z": "51",\
        "params":\
        [\
                ["NUM#", "count", "12,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "created": "1709620846310",\
        "updated": "1709621026870",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7821",\
        "y": "1756",\
        "z": "52",\
        "params":\
        [\
                ["NUM#", "angle", "90,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1709621944970",\
        "updated": "1709714759597",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8776",\
        "y": "3084",\
        "z": "53",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "-90,0"],\
                ["NUM#", "y", "-150,0"],\
                ["NUM#", "width", "350,0"],\
                ["NUM#", "height", "190,0"],\
                ["NUM#", "round", "5,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1709588357258",\
        "updated": "1709588365522",\
        "id": "combine6",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7998",\
        "y": "1142.48",\
        "z": "54",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "TSUB",\
        "created": "1709621596465",\
        "updated": "1709621596471",\
        "id": "substring",\
        "name": "substring",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7518",\
        "y": "2192",\
        "z": "55",\
        "params":\
        [\
                ["NUM#", "end", "3,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709586856055",\
        "updated": "1709621638525",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6039",\
        "y": "3663",\
        "z": "56",\
        "params":\
        [\
                ["NUM#", "add", "20,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1709620686694",\
        "updated": "1709712914527",\
        "id": "panel",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "7",\
        "notCondition": "false",\
        "x": "5118",\
        "y": "3932",\
        "z": "57",\
        "width": "889.1083931126853",\
        "height": "471.7713402937093",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "LINE",\
        "created": "1709588180479",\
        "updated": "1709588365522",\
        "id": "line",\
        "name": "line",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7838",\
        "y": "1032",\
        "z": "58",\
        "params":\
        [\
                ["NUM#", "x", "-4,0"],\
                ["NUM#", "y", "-120,0"],\
                ["NUM#", "width", "229,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1709621818203",\
        "updated": "1709712914527",\
        "id": "panel3",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "6872",\
        "y": "3877",\
        "z": "59",\
        "width": "477.9046219510662",\
        "height": "455.64615853647587",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "LINE",\
        "created": "1709588180479",\
        "updated": "1709621025156",\
        "id": "line2",\
        "name": "line",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7680",\
        "y": "1755",\
        "z": "60",\
        "params":\
        [\
                ["NUM#", "x", "155,0"],\
                ["NUM#", "y", "-60,0"],\
                ["NUM#", "width", "130,0"]\
        ]\
        },\
        {\
        "type": "TXTS",\
        "created": "1709588317761",\
        "updated": "1709621642652",\
        "id": "text4",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7815",\
        "y": "1959",\
        "z": "61",\
        "params":\
        [\
                ["TEXT#", "text", "Dec", "center"],\
                ["NUM#", "x", "220,0"],\
                ["NUM#", "y", "10,0"],\
                ["NUM#", "size", "6,0"],\
                ["TEXT#", "style", "Regular"],\
                ["NUM#", "alignX", "1,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709621264995",\
        "updated": "1709621351686",\
        "id": "select6",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7358",\
        "y": "2192",\
        "z": "62",\
        "params":\
        [\
                ["NUM#", "index", "11,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1709587633099",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6161",\
        "y": "3986",\
        "z": "63",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "14.279999999999992,0"],\
                ["NUM#", "c2", "204,0"],\
                ["NUM#", "c3", "20.60399357060003,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sublist2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "itemCount2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "select2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text3",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "text3",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine3",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "itemCount",\
        "outputId": "value",\
        "outputOrder": "2",\
        "inputNodeId": "repeat3",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "freeze",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "freeze",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select4",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ellipse",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "ellipse",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "select4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "text3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "itemCount2",\
        "outputId": "value",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "repeat4",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sublist2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sublist",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "itemCount",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence6",\
        "outputId": "h0",\
        "outputOrder": "5",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence5",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "numToText",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709722180171",\
        "outputNodeId": "numToText",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "neg2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "text2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "text2",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "repeat5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "repeat6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h2",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sublist",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select3",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "textToNum",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "neg",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "text4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine7",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "text",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "csv",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "combine6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "select5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "sublist3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "combine7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat6",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "itemCount",\
        "outputId": "value",\
        "outputOrder": "3",\
        "inputNodeId": "repeat6",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "csv",\
        "outputId": "value",\
        "outputOrder": "1",\
        "inputNodeId": "sublist2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke3",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "csv",\
        "outputId": "value",\
        "outputOrder": "2",\
        "inputNodeId": "select5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke2",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence",\
        "outputId": "add",\
        "outputOrder": "0",\
        "inputNodeId": "sequence6",\
        "inputId": "add",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "select3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "textToNum",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "combine4",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "sublist",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "neg2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "itemCount",\
        "outputId": "value",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "itemCount",\
        "outputId": "value",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "line2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "combine5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "color5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "line",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "text2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine6",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "select6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "substring",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "neg2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "line",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "stroke2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "line",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence6",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "line2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "stroke3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "line2",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "substring",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text4",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text4",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "text4",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sublist3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select6",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "sequence7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select6",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1709712914520",\
        "outputNodeId": "select4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "h0",\
        "list": "false"\
        }\
    ]\
}';