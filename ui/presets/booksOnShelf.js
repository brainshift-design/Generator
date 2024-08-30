const presetBooksOnShelf = '\
    {\
    "nodes":\
    [\
        {\
        "type": "ACCUM",\
        "id": "accum",\
        "name": "accumulate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7804",\
        "y": "-9",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "when", "1,0"]\
        ]\
        },\
        {\
        "type": "CENTR",\
        "id": "center3",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5975",\
        "y": "396",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "centerY", "65,0"]\
        ]\
        },\
        {\
        "type": "ROT",\
        "id": "rotate2",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6123",\
        "y": "398",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "angle", "180,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "TXTS",\
        "id": "text2",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5276",\
        "y": "505",\
        "z": "3",\
        "params":\
        [\
                ["TEXT#", "text", "V.%20S.%20Naipaul", "center"],\
                ["NUM#", "width", "370.44000000000005,1"],\
                ["NUM#", "height", "30,0"],\
                ["TEXT#", "font", "Almendra%20SC"],\
                ["NUM#", "size", "16,0"],\
                ["NUM#", "alignY", "2,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4780",\
        "y": "223",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "seed", "8084,0"],\
                ["NUM#", "max", "400,0"]\
        ]\
        },\
        {\
        "type": "ABS",\
        "id": "abs",\
        "name": "absolute",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4329",\
        "y": "637",\
        "z": "5"\
        },\
        {\
        "type": "COL",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3985",\
        "y": "727",\
        "z": "6",\
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
        "type": "NUM",\
        "id": "num2",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4953",\
        "y": "204",\
        "z": "7",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "30,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color8",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4012",\
        "y": "-562",\
        "z": "8",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "54,0"],\
                ["NUM#", "c3", "48,0"]\
        ]\
        },\
        {\
        "type": "CENTR",\
        "id": "center2",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5794",\
        "y": "350",\
        "z": "9"\
        },\
        {\
        "type": "IF",\
        "id": "ifElse3",\
        "name": "if%2Felse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6292",\
        "y": "357",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "condition", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color9",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4373",\
        "y": "-564",\
        "z": "11",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "54,0"],\
                ["NUM#", "c3", "33,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "id": "grad2",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4698",\
        "y": "-750",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "y", "-60,0"],\
                ["NUM#", "size", "150,0"],\
                ["NUM#", "angle", "90,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3281",\
        "y": "-851.595",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "seed", "1233,0"],\
                ["NUM#", "min", "25,0"],\
                ["NUM#", "max", "75,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2398",\
        "y": "-453",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "count", "6,0"]\
        ]\
        },\
        {\
        "type": "EXPAND",\
        "id": "list",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3503",\
        "y": "100",\
        "z": "15",\
        "width": "224.46657575662033",\
        "height": "142",\
        "params":\
        [\
                ["TEXT#", "0", "In%20a%20Free%20State", "left"],\
                ["TEXT#", "1", "V.%20S.%20Naipaul", "left"],\
                ["TEXT#", "2", "fiction", "left"],\
                ["TEXT#", "3", "196", "left"],\
                ["TEXT#", "4", "Rupa", "left"]\
        ]\
        },\
        {\
        "type": "EXPAND",\
        "id": "list2",\
        "name": "list",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2553",\
        "y": "-638",\
        "z": "16",\
        "width": "120",\
        "height": "164",\
        "params":\
        [\
                ["NUM#", "0", "1843,0"],\
                ["NUM#", "1", "7262,0"],\
                ["NUM#", "2", "1233,0"],\
                ["NUM#", "3", "8084,0"],\
                ["NUM#", "4", "3003,0"],\
                ["NUM#", "5", "1885,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3283",\
        "y": "-1215",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "seed", "1843,0"],\
                ["NUM#", "min", "-40,0"],\
                ["NUM#", "max", "200,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4635",\
        "y": "-1178",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "y", "160,0"],\
                ["NUM#", "size", "220,0"],\
                ["NUM#", "angle", "-90,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4978",\
        "y": "-1151",\
        "z": "19",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CMNT",\
        "id": "comment18",\
        "name": "%3Ca%20href%3D%22https%3A%2F%2Fgist.github.com%2Fjaidevd%2F23aef12e9bf56c618c41%22%3Ehttps%3A%2F%2Fgist.github.com%2Fjaidevd%2F23aef12e9bf56c618c41%3C%2Fa%3E",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2313",\
        "y": "386",\
        "z": "20"\
        },\
        {\
        "type": "DRSH",\
        "id": "dropShadow",\
        "name": "drop%20shadow",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4805",\
        "y": "-1101",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "y", "7,0"],\
                ["NUM#", "blur", "20,0"],\
                ["FILL#", "fill", "0,0 0,0 0,0 40,0 0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6075",\
        "y": "-607",\
        "z": "22",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "SMATH",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "4",\
        "x": "4522",\
        "y": "-59",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "0.2,1"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4214",\
        "y": "-68",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "2.1,1"]\
        ]\
        },\
        {\
        "type": "SKEW",\
        "id": "skew",\
        "name": "skew",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "8564",\
        "y": "-201",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "skewY", "-10,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "id": "panel4",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "4",\
        "x": "6982",\
        "y": "-265",\
        "z": "26",\
        "width": "400",\
        "height": "425.6608238154229",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "SEQ",\
        "id": "sequence6",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "8397",\
        "y": "0",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "add", "-0.4,1"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "id": "sequence4",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7803",\
        "y": "329",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "start", "3,0"],\
                ["NUM#", "add", "0.07,2"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "id": "random5",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4785",\
        "y": "699",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "seed", "3003,0"],\
                ["NUM#", "max", "400,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "id": "panel3",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7529",\
        "y": "-256",\
        "z": "30",\
        "width": "1447",\
        "height": "915.1908753212565",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "CMB",\
        "id": "combine6",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5624",\
        "y": "343",\
        "z": "31",\
        "width": "115.41300100514482",\
        "height": "51"\
        },\
        {\
        "type": "CENTR",\
        "id": "center",\
        "name": "center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7035",\
        "y": "-203",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "centerX", "0,0"],\
                ["NUM#", "centerY", "0,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7015",\
        "y": "21",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "start", "90,0"],\
                ["NUM#", "add", "0.7,1"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "id": "sequence7",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "8041",\
        "y": "759",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "add", "500,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3184",\
        "y": "185",\
        "z": "35",\
        "params":\
        [\
                ["NUM#", "start", "1,0"],\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "id": "panel2",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "5",\
        "x": "3970",\
        "y": "-801",\
        "z": "36",\
        "width": "885",\
        "height": "438",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "CMNT",\
        "id": "comment3",\
        "name": "Dataset%20taken%20from",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2313",\
        "y": "340",\
        "z": "37"\
        },\
        {\
        "type": "SMATH",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4191",\
        "y": "-1242",\
        "z": "38",\
        "params":\
        [\
                ["NUM#", "operand", "-100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color6",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4027",\
        "y": "-743",\
        "z": "39",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "54,0"],\
                ["NUM#", "c3", "48,0"]\
        ]\
        },\
        {\
        "type": "TEXT",\
        "id": "text3",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2312",\
        "y": "72",\
        "z": "40",\
        "width": "309",\
        "height": "213.83694298372413",\
        "params":\
        [\
                ["TEXT#", "value", "Title%2CAuthor%2CGenre%2CHeight%2CPublisher%0AFundamentals%20of%20Wavelets%2C%22Goswami%2C%20Jaideva%22%2Csignal_processing%2C228%2CWiley%0AData%20Smart%2C%22Foreman%2C%20John%22%2Cdata_science%2C235%2CWiley%0AGod%20Created%20the%20Integers%2C%22Hawking%2C%20Stephen%22%2Cmathematics%2C197%2CPenguin%0ASuperfreakonomics%2C%22Dubner%2C%20Stephen%22%2Ceconomics%2C179%2CHarperCollins%0AOrientalism%2C%22Said%2C%20Edward%22%2Chistory%2C197%2CPenguin%0A%22Nature%20of%20Statistical%20Learning%20Theory%2C%20The%22%2C%22Vapnik%2C%20Vladimir%22%2Cdata_science%2C230%2CSpringer%0AIntegration%20of%20the%20Indian%20States%2C%22Menon%2C%20V%20P%22%2Chistory%2C217%2COrient%20Blackswan%0A%22Drunkard\'s%20Walk%2C%20The%22%2C%22Mlodinow%2C%20Leonard%22%2Cscience%2C197%2CPenguin%0AImage%20Processing%20%26%20Mathematical%20Morphology%2C%22Shih%2C%20Frank%22%2Csignal_processing%2C241%2CCRC%0AHow%20to%20Think%20Like%20Sherlock%20Holmes%2C%22Konnikova%2C%20Maria%22%2Cpsychology%2C240%2CPenguin%0AData%20Scientists%20at%20Work%2CSebastian%20Gutierrez%2Cdata_science%2C230%2CApress%0ASlaughterhouse%20Five%2C%22Vonnegut%2C%20Kurt%22%2Cfiction%2C198%2CRandom%20House%0ABirth%20of%20a%20Theorem%2C%22Villani%2C%20Cedric%22%2Cmathematics%2C234%2CBodley%20Head%0AStructure%20%26%20Interpretation%20of%20Computer%20Programs%2C%22Sussman%2C%20Gerald%22%2Ccomputer_science%2C240%2CMIT%20Press%0A%22Age%20of%20Wrath%2C%20The%22%2C%22Eraly%2C%20Abraham%22%2Chistory%2C238%2CPenguin%0A%22Trial%2C%20The%22%2C%22Kafka%2C%20Frank%22%2Cfiction%2C198%2CRandom%20House%0AStatistical%20Decision%20Theory\'%2C%22Pratt%2C%20John%22%2Cdata_science%2C236%2CMIT%20Press%0AData%20Mining%20Handbook%2C%22Nisbet%2C%20Robert%22%2Cdata_science%2C242%2CApress%0A%22New%20Machiavelli%2C%20The%22%2C%22Wells%2C%20H.%20G.%22%2Cfiction%2C180%2CPenguin%0APhysics%20%26%20Philosophy%2C%22Heisenberg%2C%20Werner%22%2Cscience%2C197%2CPenguin%0AMaking%20Software%2C%22Oram%2C%20Andy%22%2Ccomputer_science%2C232%2CO\'Reilly%0A%22Analysis%2C%20Vol%20I%22%2C%22Tao%2C%20Terence%22%2Cmathematics%2C248%2CHBA%0AMachine%20Learning%20for%20Hackers%2C%22Conway%2C%20Drew%22%2Cdata_science%2C233%2CO\'Reilly%0A%22Signal%20and%20the%20Noise%2C%20The%22%2C%22Silver%2C%20Nate%22%2Cdata_science%2C233%2CPenguin%0APython%20for%20Data%20Analysis%2C%22McKinney%2C%20Wes%22%2Cdata_science%2C233%2CO\'Reilly%0AIntroduction%20to%20Algorithms%2C%22Cormen%2C%20Thomas%22%2Ccomputer_science%2C234%2CMIT%20Press%0A%22Beautiful%20and%20the%20Damned%2C%20The%22%2C%22Deb%2C%20Siddhartha%22%2Cnonfiction%2C198%2CPenguin%0A%22Outsider%2C%20The%22%2C%22Camus%2C%20Albert%22%2Cfiction%2C198%2CPenguin%0A%22Complete%20Sherlock%20Holmes%2C%20The%20-%20Vol%20I%22%2C%22Doyle%2C%20Arthur%20Conan%22%2Cfiction%2C176%2CRandom%20House%0A%22Complete%20Sherlock%20Holmes%2C%20The%20-%20Vol%20II%22%2C%22Doyle%2C%20Arthur%20Conan%22%2Cfiction%2C176%2CRandom%20House%0A%22Wealth%20of%20Nations%2C%20The%22%2C%22Smith%2C%20Adam%22%2Ceconomics%2C175%2CRandom%20House%0A%22Pillars%20of%20the%20Earth%2C%20The%22%2C%22Follett%2C%20Ken%22%2Cfiction%2C176%2CRandom%20House%0AMein%20Kampf%2C%22Hitler%2C%20Adolf%22%2Cnonfiction%2C212%2CRupa%0A%22Tao%20of%20Physics%2C%20The%22%2C%22Capra%2C%20Fritjof%22%2Cscience%2C179%2CPenguin%0ASurely%20You\'re%20Joking%20Mr%20Feynman%2C%22Feynman%2C%20Richard%22%2Cscience%2C198%2CRandom%20House%0A%22Farewell%20to%20Arms%2C%20A%22%2C%22Hemingway%2C%20Ernest%22%2Cfiction%2C179%2CRupa%0A%22Veteran%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C177%2CTransworld%0AFalse%20Impressions%2C%22Archer%2C%20Jeffery%22%2Cfiction%2C177%2CPan%0A%22Last%20Lecture%2C%20The%22%2C%22Pausch%2C%20Randy%22%2Cnonfiction%2C197%2CHyperion%0AReturn%20of%20the%20Primitive%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C202%2CPenguin%0AJurassic%20Park%2C%22Crichton%2C%20Michael%22%2Cfiction%2C174%2CRandom%20House%0A%22Russian%20Journal%2C%20A%22%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2CPenguin%0ATales%20of%20Mystery%20and%20Imagination%2C%22Poe%2C%20Edgar%20Allen%22%2Cfiction%2C172%2CHarperCollins%0AFreakonomics%2C%22Dubner%2C%20Stephen%22%2Ceconomics%2C197%2CPenguin%0A%22Hidden%20Connections%2C%20The%22%2C%22Capra%2C%20Fritjof%22%2Cscience%2C197%2CHarperCollins%0A%22Story%20of%20Philosophy%2C%20The%22%2C%22Durant%2C%20Will%22%2Cphilosophy%2C170%2CPocket%0AAsami%20Asami%2C%22Deshpande%2C%20P%20L%22%2Cfiction%2C205%2CMauj%0AJournal%20of%20a%20Novel%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0AOnce%20There%20Was%20a%20War%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2CPenguin%0A%22Moon%20is%20Down%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0A%22Brethren%2C%20The%22%2C%22Grisham%2C%20John%22%2Cfiction%2C174%2CRandom%20House%0AIn%20a%20Free%20State%2C%22Naipaul%2C%20V.%20S.%22%2Cfiction%2C196%2CRupa%0ACatch%2022%2C%22Heller%2C%20Joseph%22%2Cfiction%2C178%2CRandom%20House%0A%22Complete%20Mastermind%2C%20The%22%2CBBC%2Cnonfiction%2C178%2CBBC%0ADylan%20on%20Dylan%2C%22Dylan%2C%20Bob%22%2Cnonfiction%2C197%2CRandom%20House%0ASoft%20Computing%20%26%20Intelligent%20Systems%2C%22Gupta%2C%20Madan%22%2Cdata_science%2C242%2CElsevier%0ATextbook%20of%20Economic%20Theory%2C%22Stonier%2C%20Alfred%22%2Ceconomics%2C242%2CPearson%0AEconometric%20Analysis%2C%22Greene%2C%20W.%20H.%22%2Ceconomics%2C242%2CPearson%0ALearning%20OpenCV%2C%22Bradsky%2C%20Gary%22%2Cdata_science%2C232%2CO\'Reilly%0AData%20Structures%20Using%20C%20%26%20C%2B%2B%2C%22Tanenbaum%2C%20Andrew%22%2Ccomputer_science%2C235%2CPrentice%20Hall%0A%22Computer%20Vision%2C%20A%20Modern%20Approach%22%2C%22Forsyth%2C%20David%22%2Cdata_science%2C255%2CPearson%0APrinciples%20of%20Communication%20Systems%2C%22Taub%2C%20Schilling%22%2Ccomputer_science%2C240%2CTMH%0ALet%20Us%20C%2C%22Kanetkar%2C%20Yashwant%22%2Ccomputer_science%2C213%2CPrentice%20Hall%0A%22Amulet%20of%20Samarkand%2C%20The%22%2C%22Stroud%2C%20Jonathan%22%2Cfiction%2C179%2CRandom%20House%0ACrime%20and%20Punishment%2C%22Dostoevsky%2C%20Fyodor%22%2Cfiction%2C180%2CPenguin%0AAngels%20%26%20Demons%2C%22Brown%2C%20Dan%22%2Cfiction%2C178%2CRandom%20House%0A%22Argumentative%20Indian%2C%20The%22%2C%22Sen%2C%20Amartya%22%2Cnonfiction%2C209%2CPicador%0ASea%20of%20Poppies%2C%22Ghosh%2C%20Amitav%22%2Cfiction%2C197%2CPenguin%0A%22Idea%20of%20Justice%2C%20The%22%2C%22Sen%2C%20Amartya%22%2Cnonfiction%2C212%2CPenguin%0A%22Raisin%20in%20the%20Sun%2C%20A%22%2C%22Hansberry%2C%20Lorraine%22%2Cfiction%2C175%2CPenguin%0AAll%20the%20President\'s%20Men%2C%22Woodward%2C%20Bob%22%2Chistory%2C177%2CRandom%20House%0A%22Prisoner%20of%20Birth%2C%20A%22%2C%22Archer%2C%20Jeffery%22%2Cfiction%2C176%2CPan%0AScoop!%2C%22Nayar%2C%20Kuldip%22%2Chistory%2C216%2CHarperCollins%0AAhe%20Manohar%20Tari%2C%22Deshpande%2C%20Sunita%22%2Cnonfiction%2C213%2CMauj%0A%22Last%20Mughal%2C%20The%22%2C%22Dalrymple%2C%20William%22%2Chistory%2C199%2CPenguin%0A%22Social%20Choice%20%26%20Welfare%2C%20Vol%2039%20No.%201%22%2CVarious%2Ceconomics%2C235%2CSpringer%0ARadiowaril%20Bhashane%20%26%20Shrutika%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C213%2CMauj%0AGun%20Gayin%20Awadi%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C212%2CMauj%0AAghal%20Paghal%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C212%2CMauj%0AMaqta-e-Ghalib%2C%22Garg%2C%20Sanjay%22%2Cfiction%2C221%2CMauj%0ABeyond%20Degrees%2C%2Cnonfiction%2C222%2CHarperCollins%0AManasa%2C%22Kale%2C%20V%20P%22%2Cnonfiction%2C213%2CMauj%0AIndia%20from%20Midnight%20to%20Milennium%2C%22Tharoor%2C%20Shashi%22%2Chistory%2C198%2CPenguin%0A%22World\'s%20Greatest%20Trials%2C%20The%22%2C%2Chistory%2C210%2C%0A%22Great%20Indian%20Novel%2C%20The%22%2C%22Tharoor%2C%20Shashi%22%2Cfiction%2C198%2CPenguin%0AO%20Jerusalem!%2C%22Lapierre%2C%20Dominique%22%2Chistory%2C217%2Cvikas%0A%22City%20of%20Joy%2C%20The%22%2C%22Lapierre%2C%20Dominique%22%2Cfiction%2C177%2Cvikas%0AFreedom%20at%20Midnight%2C%22Lapierre%2C%20Dominique%22%2Chistory%2C167%2Cvikas%0A%22Winter%20of%20Our%20Discontent%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0AOn%20Education%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C203%2CRoutledge%0AFree%20Will%2C%22Harris%2C%20Sam%22%2Cphilosophy%2C203%2CFreePress%0ABookless%20in%20Baghdad%2C%22Tharoor%2C%20Shashi%22%2Cnonfiction%2C206%2CPenguin%0A%22Case%20of%20the%20Lame%20Canary%2C%20The%22%2C%22Gardner%2C%20Earle%20Stanley%22%2Cfiction%2C179%2C%0A%22Theory%20of%20Everything%2C%20The%22%2C%22Hawking%2C%20Stephen%22%2Cscience%2C217%2CJaico%0ANew%20Markets%20%26%20Other%20Essays%2C%22Drucker%2C%20Peter%22%2Ceconomics%2C176%2CPenguin%0AElectric%20Universe%2C%22Bodanis%2C%20David%22%2Cscience%2C201%2CPenguin%0A%22Hunchback%20of%20Notre%20Dame%2C%20The%22%2C%22Hugo%2C%20Victor%22%2Cfiction%2C175%2CRandom%20House%0ABurning%20Bright%2C%22Steinbeck%2C%20John%22%2Cfiction%2C175%2CPenguin%0A%22Age%20of%20Discontuinity%2C%20The%22%2C%22Drucker%2C%20Peter%22%2Ceconomics%2C178%2CRandom%20House%0ADoctor%20in%20the%20Nude%2C%22Gordon%2C%20Richard%22%2Cfiction%2C179%2CPenguin%0ADown%20and%20Out%20in%20Paris%20%26%20London%2C%22Orwell%2C%20George%22%2Cnonfiction%2C179%2CPenguin%0AIdentity%20%26%20Violence%2C%22Sen%2C%20Amartya%22%2Cphilosophy%2C219%2CPenguin%0ABeyond%20the%20Three%20Seas%2C%22Dalrymple%2C%20William%22%2Chistory%2C197%2CRandom%20House%0A%22World\'s%20Greatest%20Short%20Stories%2C%20The%22%2C%2Cfiction%2C217%2CJaico%0ATalking%20Straight%2C%22Iacoca%2C%20Lee%22%2Cnonfiction%2C175%2C%0A%22Maugham\'s%20Collected%20Short%20Stories%2C%20Vol%203%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C171%2CVintage%0A%22Phantom%20of%20Manhattan%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C180%2C%0AAshenden%20of%20The%20British%20Agent%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C160%2CVintage%0AZen%20%26%20The%20Art%20of%20Motorcycle%20Maintenance%2C%22Pirsig%2C%20Robert%22%2Cphilosophy%2C172%2CVintage%0A%22Great%20War%20for%20Civilization%2C%20The%22%2C%22Fisk%2C%20Robert%22%2Chistory%2C197%2CHarperCollins%0AWe%20the%20Living%2C%22Rand%2C%20Ayn%22%2Cfiction%2C178%2CPenguin%0A%22Artist%20and%20the%20Mathematician%2C%20The%22%2C%22Aczel%2C%20Amir%22%2Cscience%2C186%2CHighStakes%0AHistory%20of%20Western%20Philosophy%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C213%2CRoutledge%0ASelected%20Short%20Stories%2C%2Cfiction%2C215%2CJaico%0ARationality%20%26%20Freedom%2C%22Sen%2C%20Amartya%22%2Ceconomics%2C213%2CSpringer%0AClash%20of%20Civilizations%20and%20Remaking%20of%20the%20World%20Order%2C%22Huntington%2C%20Samuel%22%2Chistory%2C228%2CSimon%26Schuster%0AUncommon%20Wisdom%2C%22Capra%2C%20Fritjof%22%2Cnonfiction%2C197%2CFontana%0AOne%2C%22Bach%2C%20Richard%22%2Cnonfiction%2C172%2CDell%0AKarl%20Marx%20Biography%2C%2Cnonfiction%2C162%2C%0ATo%20Sir%20With%20Love%2CBraithwaite%2Cfiction%2C197%2CPenguin%0AHalf%20A%20Life%2C%22Naipaul%2C%20V%20S%22%2Cfiction%2C196%2C%0A%22Discovery%20of%20India%2C%20The%22%2C%22Nehru%2C%20Jawaharlal%22%2Chistory%2C230%2C%0AApulki%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C211%2C%0AUnpopular%20Essays%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C198%2C%0A%22Deceiver%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C178%2C%0AVeil%3A%20Secret%20Wars%20of%20the%20CIA%2C%22Woodward%2C%20Bob%22%2Chistory%2C171%2C%0AChar%20Shabda%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C214%2C%0ARosy%20is%20My%20Relative%2C%22Durrell%2C%20Gerald%22%2Cfiction%2C176%2C%0A%22Moon%20and%20Sixpence%2C%20The%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C180%2C%0APolitical%20Philosophers%2C%2Cphilosophy%2C162%2C%0A%22Short%20History%20of%20the%20World%2C%20A%22%2C%22Wells%2C%20H%20G%22%2Chistory%2C197%2C%0A%22Trembling%20of%20a%20Leaf%2C%20The%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C205%2C%0ADoctor%20on%20the%20Brain%2C%22Gordon%2C%20Richard%22%2Cfiction%2C204%2C%0ASimpsons%20%26%20Their%20Mathematical%20Secrets%2C%22Singh%2C%20Simon%22%2Cscience%2C233%2C%0APattern%20Classification%2C%22Duda%2C%20Hart%22%2Cdata_science%2C241%2C%0AFrom%20Beirut%20to%20Jerusalem%2C%22Friedman%2C%20Thomas%22%2Chistory%2C202%2C%0A%22Code%20Book%2C%20The%22%2C%22Singh%2C%20Simon%22%2Cscience%2C197%2C%0A%22Age%20of%20the%20Warrior%2C%20The%22%2C%22Fisk%2C%20Robert%22%2Chistory%2C197%2C%0AFinal%20Crisis%2C%2Ccomic%2C257%2C%0A%22Killing%20Joke%2C%20The%22%2C%2Ccomic%2C283%2C%0AFlashpoint%2C%2Ccomic%2C265%2C%0ABatman%20Earth%20One%2C%2Ccomic%2C265%2C%0ACrisis%20on%20Infinite%20Earths%2C%2Ccomic%2C258%2C%0A%22Numbers%20Behind%20Numb3rs%2C%20The%22%2C%22Devlin%2C%20Keith%22%2Cscience%2C202%2C%0ASuperman%20Earth%20One%20-%201%2C%2Ccomic%2C259%2C%0ASuperman%20Earth%20One%20-%202%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20Throne%20of%20Atlantis%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20The%20Villain\'s%20Journey%2C%2Ccomic%2C258%2C%0A%22Death%20of%20Superman%2C%20The%22%2C%2Ccomic%2C258%2C%0AHistory%20of%20the%20DC%20Universe%2C%2Ccomic%2C258%2C%0ABatman%3A%20The%20Long%20Halloween%2C%2Ccomic%2C258%2C%0A%22Life%20in%20Letters%2C%20A%22%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2C%0A%22Information%2C%20The%22%2C%22Gleick%2C%20James%22%2Cscience%2C233%2C%0A%22Journal%20of%20Economics%2C%20vol%20106%20No%203%22%2C%2Ceconomics%2C235%2C%0AElements%20of%20Information%20Theory%2C%22Thomas%2C%20Joy%22%2Cdata_science%2C229%2C%0APower%20Electronics%20-%20Rashid%2C%22Rashid%2C%20Muhammad%22%2Ccomputer_science%2C235%2C%0APower%20Electronics%20-%20Mohan%2C%22Mohan%2C%20Ned%22%2Ccomputer_science%2C237%2C%0ANeural%20Networks%2C%22Haykin%2C%20Simon%22%2Cdata_science%2C240%2C%0A%22Grapes%20of%20Wrath%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2C%0AVyakti%20ani%20Valli%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C211%2C%0AStatistical%20Learning%20Theory%2C%22Vapnik%2C%20Vladimir%22%2Cdata_science%2C228%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Tainted%20Throne%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Brothers%20at%20War%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Ruler%20of%20the%20World%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Serpent\'s%20Tooth%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Raiders%20from%20the%20North%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AMossad%2C%22Baz-Zohar%2C%20Michael%22%2Chistory%2C236%2C%0AJim%20Corbett%20Omnibus%2C%22Corbett%2C%20Jim%22%2Cnonfiction%2C223%2C%0A20000%20Leagues%20Under%20the%20Sea%2C%22Verne%2C%20Jules%22%2Cfiction%2C190%2C%0ABatatyachi%20Chal%2CDeshpande%20P%20L%2Cfiction%2C200%2C%0AHafasavnuk%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0AUrlasurla%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0APointers%20in%20C%2C%22Kanetkar%2C%20Yashwant%22%2Ccomputer_science%2C213%2C%0A%22Cathedral%20and%20the%20Bazaar%2C%20The%22%2C%22Raymond%2C%20Eric%22%2Ccomputer_science%2C217%2C%0ADesign%20with%20OpAmps%2C%22Franco%2C%20Sergio%22%2Ccomputer_science%2C240%2C%0AThink%20Complexity%2C%22Downey%2C%20Allen%22%2Cdata_science%2C230%2C%0A%22Devil\'s%20Advocate%2C%20The%22%2C%22West%2C%20Morris%22%2Cfiction%2C178%2C%0AAyn%20Rand%20Answers%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C203%2C%0APhilosophy%3A%20Who%20Needs%20It%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C171%2C%0A%22World\'s%20Great%20Thinkers%2C%20The%22%2C%2Cphilosophy%2C189%2C%0AData%20Analysis%20with%20Open%20Source%20Tools%2C%22Janert%2C%20Phillip%22%2Cdata_science%2C230%2C%0ABroca\'s%20Brain%2C%22Sagan%2C%20Carl%22%2Cscience%2C174%2C%0AMen%20of%20Mathematics%2C%22Bell%2C%20E%20T%22%2Cmathematics%2C217%2C%0AOxford%20book%20of%20Modern%20Science%20Writing%2C%22Dawkins%2C%20Richard%22%2Cscience%2C240%2C%0A%22Justice%2C%20Judiciary%20and%20Democracy%22%2C%22Ranjan%2C%20Sudhanshu%22%2Cphilosophy%2C224%2C%0A%22Arthashastra%2C%20The%22%2CKautiyla%2Cphilosophy%2C214%2C%0AWe%20the%20People%2CPalkhivala%2Cphilosophy%2C216%2C%0AWe%20the%20Nation%2CPalkhivala%2Cphilosophy%2C216%2C%0A%22Courtroom%20Genius%2C%20The%22%2CSorabjee%2Cnonfiction%2C217%2C%0ADongri%20to%20Dubai%2C%22Zaidi%2C%20Hussain%22%2Cnonfiction%2C216%2C%0A%22History%20of%20England%2C%20Foundation%22%2C%22Ackroyd%2C%20Peter%22%2Chistory%2C197%2C%0ACity%20of%20Djinns%2C%22Dalrymple%2C%20William%22%2Chistory%2C198%2C%0AIndia\'s%20Legal%20System%2CNariman%2Cnonfiction%2C177%2C%0AMore%20Tears%20to%20Cry%2C%22Sassoon%2C%20Jean%22%2Cfiction%2C235%2C%0A%22Ropemaker%2C%20The%22%2C%22Dickinson%2C%20Peter%22%2Cfiction%2C196%2C%0AAngels%20%26%20Demons%2C%22Brown%2C%20Dan%22%2Cfiction%2C170%2C%0A%22Judge%2C%20The%22%2C%2Cfiction%2C170%2C%0A%22Attorney%2C%20The%22%2C%2Cfiction%2C170%2C%0A%22Prince%2C%20The%22%2CMachiavelli%2Cphilosophy%2C173%2C%0AEyeless%20in%20Gaza%2C%22Huxley%2C%20Aldous%22%2Cfiction%2C180%2C%0ATales%20of%20Beedle%20the%20Bard%2C%22Rowling%2C%20J%20K%22%2Cfiction%2C184%2C%0AGirl%20with%20the%20Dragon%20Tattoo%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0AGirl%20who%20kicked%20the%20Hornet\'s%20Nest%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0AGirl%20who%20played%20with%20Fire%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0ABatman%20Handbook%2C%2Ccomic%2C270%2C%0AMurphy\'s%20Law%2C%2Cnonfiction%2C178%2C%0AStructure%20and%20Randomness%2C%22Tao%2C%20Terence%22%2Cmathematics%2C252%2C%0AImage%20Processing%20with%20MATLAB%2C%22Eddins%2C%20Steve%22%2Csignal_processing%2C241%2C%0AAnimal%20Farm%2C%22Orwell%2C%20George%22%2Cfiction%2C180%2C%0A%22Idiot%2C%20The%22%2C%22Dostoevsky%2C%20Fyodor%22%2Cfiction%2C197%2C%0A%22Christmas%20Carol%2C%20A%22%2C%22Dickens%2C%20Charles%22%2Cfiction%2C196%2C", "left"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "id": "fill3",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5169",\
        "y": "-398",\
        "z": "41",\
        "params":\
        [\
                ["COL#", "color", "1,0 0,0 0,0 0,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "SEL",\
        "id": "select",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3337",\
        "y": "99",\
        "z": "42",\
        "params":\
        [\
                ["NUM#", "index", "52,0"]\
        ]\
        },\
        {\
        "type": "TCSV",\
        "id": "csv",\
        "name": "csv",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2923",\
        "y": "71",\
        "z": "43",\
        "params":\
        [\
                ["TEXT#", "rowSeparator", "%5Cn", "left"],\
                ["TEXT#", "columnSeparator", "%2C", "left"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5121",\
        "y": "354",\
        "z": "44",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "75,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "id": "panel",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "5",\
        "x": "3961",\
        "y": "-1408",\
        "z": "45",\
        "width": "1167.5093567440279",\
        "height": "544.510129930884",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "FILL",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5084",\
        "y": "783",\
        "z": "46",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "50,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "id": "panel5",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "6",\
        "x": "5126",\
        "y": "-475",\
        "z": "47",\
        "width": "787.2715194875075",\
        "height": "410.2452782933203",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "RAND",\
        "id": "random6",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2399",\
        "y": "-639",\
        "z": "48",\
        "params":\
        [\
                ["NUM#", "seed", "8152,0"],\
                ["NUM#", "max", "10000,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color7",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4369",\
        "y": "-740",\
        "z": "49",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "54,0"],\
                ["NUM#", "c3", "28,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "id": "sequence5",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7656",\
        "y": "485",\
        "z": "50",\
        "params":\
        [\
                ["NUM#", "start", "-0.03,2"],\
                ["NUM#", "add", "0.004,3"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "CCNT",\
        "id": "contrast",\
        "name": "contrast",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4186",\
        "y": "595",\
        "z": "51",\
        "params":\
        [\
                ["NUM#", "contrast", "56.185635645223876,1"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "id": "grad3",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5748",\
        "y": "-424",\
        "z": "52"\
        },\
        {\
        "type": "ROT",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7234",\
        "y": "-203",\
        "z": "53",\
        "params":\
        [\
                ["NUM#", "angle", "107.5,1"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4015",\
        "y": "-1334",\
        "z": "54",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "54,0"],\
                ["NUM#", "c3", "48,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4772",\
        "y": "46",\
        "z": "55",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "0.9,1"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4181",\
        "y": "-648",\
        "z": "56",\
        "params":\
        [\
                ["NUM#", "operand", "-20,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "id": "fill4",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5166",\
        "y": "-277",\
        "z": "57",\
        "params":\
        [\
                ["COL#", "color", "1,0 0,0 0,0 0,0"],\
                ["NUM#", "opacity", "40,0"]\
        ]\
        },\
        {\
        "type": "CMNT",\
        "id": "comment2",\
        "name": "Book%20size%20is%20proportinal%20to%20page%20count.",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2312",\
        "y": "438",\
        "z": "58"\
        },\
        {\
        "type": "MOVE",\
        "id": "move3",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "8291",\
        "y": "-201",\
        "z": "59",\
        "params":\
        [\
                ["NUM#", "x", "2172.97,2"],\
                ["NUM#", "y", "500,0"]\
        ]\
        },\
        {\
        "type": "IF",\
        "id": "ifElse",\
        "name": "if%2Felse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4673",\
        "y": "608",\
        "z": "60",\
        "params":\
        [\
                ["NUM#", "condition", "0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "8590",\
        "y": "176",\
        "z": "61",\
        "width": "120",\
        "height": "116"\
        },\
        {\
        "type": "SEQ",\
        "id": "sequence3",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "7954",\
        "y": "185",\
        "z": "62",\
        "params":\
        [\
                ["NUM#", "add", "4.75,2"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "id": "move2",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5465",\
        "y": "502",\
        "z": "63",\
        "params":\
        [\
                ["NUM#", "x", "20,0"],\
                ["NUM#", "y", "30,0"]\
        ]\
        },\
        {\
        "type": "IF",\
        "id": "ifElse2",\
        "name": "if%2Felse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5563",\
        "y": "-941",\
        "z": "64",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "TREPL",\
        "id": "replace",\
        "name": "replace",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "2649",\
        "y": "71",\
        "z": "65",\
        "width": "239.31498377267474",\
        "height": "98",\
        "params":\
        [\
                ["TEXT#", "what", "%22(%5B%5E%22%5D*)%2C%20(%5B%5E%22%5D*)%22", "center"],\
                ["TEXT#", "with", "%242%20%241", "center"],\
                ["NUM#", "regex", "1,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "id": "panel6",\
        "name": "seeds",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "1",\
        "x": "2367",\
        "y": "-683",\
        "z": "66",\
        "width": "340",\
        "height": "351.87384389666073",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "COND",\
        "id": "cond",\
        "name": "condition",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4487",\
        "y": "639",\
        "z": "67",\
        "params":\
        [\
                ["NUM#", "operation", "5,0"],\
                ["NUM#", "operand", "70,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3967",\
        "y": "471",\
        "z": "68",\
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
        "type": "REPT",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "9089",\
        "y": "691",\
        "z": "69",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "count", "2,0"]\
        ]\
        },\
        {\
        "type": "PROB",\
        "id": "prob2",\
        "name": "probability",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "6",\
        "x": "4577",\
        "y": "400",\
        "z": "70",\
        "params":\
        [\
                ["NUM#", "seed", "1885,0"],\
                ["NUM#", "chance", "45,0"]\
        ]\
        },\
        {\
        "type": "T2N",\
        "id": "textToNum",\
        "name": "to%20number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3971",\
        "y": "-70",\
        "z": "71",\
        "params":\
        [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "id": "math7",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "8022",\
        "y": "-128",\
        "z": "72"\
        },\
        {\
        "type": "COL",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3600",\
        "y": "-1028",\
        "z": "73",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "54,0"],\
                ["NUM#", "c3", "48,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "8774",\
        "y": "110",\
        "z": "74",\
        "params":\
        [\
                ["NUM#", "count", "26,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "id": "num4",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4984",\
        "y": "602",\
        "z": "75",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "30,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "1",\
        "x": "6658",\
        "y": "-208",\
        "z": "76",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "RAND",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "3284",\
        "y": "-1035",\
        "z": "77",\
        "params":\
        [\
                ["NUM#", "seed", "7262,0"],\
                ["NUM#", "max", "100,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4181",\
        "y": "-470",\
        "z": "78",\
        "params":\
        [\
                ["NUM#", "operand", "-15,0"]\
        ]\
        },\
        {\
        "type": "RECT",\
        "id": "rect",\
        "name": "rectangle",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "6264",\
        "y": "-735",\
        "z": "79",\
        "params":\
        [\
                ["NUM#", "width", "411.6,1"],\
                ["NUM#", "height", "82.32000000000001,1"],\
                ["NUM#", "round", "2,0"]\
        ]\
        },\
        {\
        "type": "PROB",\
        "id": "prob",\
        "name": "probability",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5257",\
        "y": "-684",\
        "z": "80",\
        "params":\
        [\
                ["NUM#", "seed", "4699,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "id": "color5",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "4391",\
        "y": "-1336",\
        "z": "81",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "54,0"],\
                ["NUM#", "c3", "-52,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5460",\
        "y": "92",\
        "z": "82",\
        "params":\
        [\
                ["NUM#", "x", "20,0"],\
                ["NUM#", "y", "10,0"]\
        ]\
        },\
        {\
        "type": "TXTS",\
        "id": "text",\
        "name": "text",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "x": "5270",\
        "y": "92",\
        "z": "83",\
        "params":\
        [\
                ["TEXT#", "text", "In%20a%20Free%20State", "center"],\
                ["NUM#", "width", "370.44000000000005,1"],\
                ["NUM#", "height", "30,0"],\
                ["TEXT#", "font", "Arimo"],\
                ["NUM#", "size", "20,0"],\
                ["NUM#", "alignY", "2,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "accum",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "center2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "center3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "center3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "list",\
        "outputId": "1",\
        "outputOrder": "4",\
        "inputNodeId": "text2",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "text2",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "num4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "random5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "font",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text2",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "list2",\
        "outputId": "3",\
        "outputOrder": "0",\
        "inputNodeId": "random4",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "contrast",\
        "outputId": "contrast",\
        "outputOrder": "0",\
        "inputNodeId": "abs",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "8",\
        "inputNodeId": "color8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "combine6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "center2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "center2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "rotate2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse3",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "prob2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse3",\
        "inputId": "condition",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color9",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color9",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "6",\
        "inputNodeId": "grad2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "list2",\
        "outputId": "2",\
        "outputOrder": "0",\
        "inputNodeId": "random3",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "list",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "list2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "list2",\
        "outputId": "0",\
        "outputOrder": "0",\
        "inputNodeId": "random",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "5",\
        "inputNodeId": "grad",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "dropShadow",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "grad3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "ifElse2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "textToNum",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "move3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "skew",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "sequence6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "skew",\
        "inputId": "skewY",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "sequence5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "sequence4",\
        "inputId": "add",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "list2",\
        "outputId": "4",\
        "outputOrder": "0",\
        "inputNodeId": "random5",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "move2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine6",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "center",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "color2",\
        "outputId": "c3",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "7",\
        "inputNodeId": "color6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "csv",\
        "outputId": "value",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "replace",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "csv",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color7",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "contrast",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "contrast",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "fill4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "fill3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "center",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "color2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "5",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color6",\
        "outputId": "c3",\
        "outputOrder": "0",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move3",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "sequence7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ifElse",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "cond",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "condition",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "accum",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "sequence4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "sequence5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "sequence6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h5",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "list",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h6",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "sequence4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "sequence3",\
        "inputId": "add",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "text2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "grad2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse2",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "prob",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse2",\
        "inputId": "condition",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "text3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "replace",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "abs",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cond",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "sequence7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "list2",\
        "outputId": "5",\
        "outputOrder": "0",\
        "inputNodeId": "prob2",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "list",\
        "outputId": "3",\
        "outputOrder": "5",\
        "inputNodeId": "textToNum",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "sequence3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "accum",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math7",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color3",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color3",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color3",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "skew",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "rect",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "ifElse3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "list2",\
        "outputId": "1",\
        "outputOrder": "0",\
        "inputNodeId": "random2",\
        "inputId": "seed",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "color8",\
        "outputId": "c3",\
        "outputOrder": "0",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "rect",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color5",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "text",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "list",\
        "outputId": "0",\
        "outputOrder": "5",\
        "inputNodeId": "text",\
        "inputId": "text",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text",\
        "inputId": "font",\
        "list": "false"\
        },\
        {\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "text",\
        "inputId": "props",\
        "list": "false"\
        }\
    ]\
    }';