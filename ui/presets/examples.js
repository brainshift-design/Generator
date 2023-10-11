const presetBooksOnShelf = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SEQ",\
            "id": "sequence6",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8147",\
            "y": "-250",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "add", "-0.4,1"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence5",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7576",\
            "y": "229",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "start", "-0.03,2"],\
                    ["NUM#", "add", "0.004,3"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "ACCUM",\
            "id": "accum",\
            "name": "accumulate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7576",\
            "y": "-57",\
            "z": "2"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6765",\
            "y": "-229",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "start", "90,0"],\
                    ["NUM#", "add", "0.7,1"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4530",\
            "y": "-27",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "8084,0"],\
                    ["NUM#", "max", "400,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3765",\
            "y": "-1584",\
            "z": "5",\
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
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "4275",\
            "y": "-284",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "value", "82.32000000000001,1"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "0.2,1"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5873",\
            "y": "148",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "angle", "180,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4535",\
            "y": "449",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "seed", "3003,0"],\
                    ["NUM#", "max", "400,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4834",\
            "y": "533",\
            "z": "9",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                    ["NUM#", "opacity", "50,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4448",\
            "y": "-1000",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "y", "-60,0"],\
                    ["NUM#", "size", "150,0"],\
                    ["NUM#", "angle", "90,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5215",\
            "y": "252",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "x", "20,0"],\
                    ["NUM#", "y", "30,0"]\
            ]\
            },\
            {\
            "type": "ABS",\
            "id": "abs",\
            "name": "absolute",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4079",\
            "y": "387",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "value", "56.185635645223876,1"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4871",\
            "y": "104",\
            "z": "13",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                    ["NUM#", "opacity", "75,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4522",\
            "y": "-204",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "value", "370.44000000000005,1"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "0.9,1"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine6",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5374",\
            "y": "93",\
            "z": "15",\
            "width": "115.41300100514482",\
            "height": "51"\
            },\
            {\
            "type": "LIST",\
            "id": "list2",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2295",\
            "y": "-824",\
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
            "type": "IF",\
            "id": "ifElse3",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6042",\
            "y": "107",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "condition", "0,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math6",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3931",\
            "y": "-720",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "value", "33,0"],\
                    ["NUM#", "operand", "-15,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3087",\
            "y": "-151",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "index", "52,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color7",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4119",\
            "y": "-990",\
            "z": "20",\
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
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6014",\
            "y": "-985",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "width", "411.6,1"],\
                    ["NUM#", "height", "82.32000000000001,1"],\
                    ["NUM#", "round", "2,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5020",\
            "y": "-158",\
            "z": "22",\
            "params":\
            [\
                    ["TEXT#", "text", "In%20a%20Free%20State", "center"],\
                    ["NUM#", "width", "370.44000000000005,1"],\
                    ["NUM#", "height", "30,0"],\
                    ["TEXT#", "font", "Arimo"],\
                    ["NUM#", "size", "20,0"],\
                    ["NUM#", "alignV", "2,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math5",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3931",\
            "y": "-898",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "value", "28,0"],\
                    ["NUM#", "operand", "-20,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4555",\
            "y": "-1351",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "y", "7,0"],\
                    ["NUM#", "blur", "20,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 40,0 0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3033",\
            "y": "-1418",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "seed", "1843,0"],\
                    ["NUM#", "min", "-40,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4141",\
            "y": "-1586",\
            "z": "26",\
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
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4385",\
            "y": "-1428",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "y", "160,0"],\
                    ["NUM#", "size", "220,0"],\
                    ["NUM#", "angle", "-90,0"]\
            ]\
            },\
            {\
            "type": "NBOOL",\
            "id": "bool",\
            "name": "boolean",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5043",\
            "y": "-335",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4728",\
            "y": "-1401",\
            "z": "29",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5825",\
            "y": "-857",\
            "z": "30",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "TREPL",\
            "id": "replace",\
            "name": "replace",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2399",\
            "y": "-179",\
            "z": "31",\
            "width": "239.31498377267474",\
            "height": "98",\
            "params":\
            [\
                    ["TEXT#", "what", "%22(%5B%5E%22%5D*)%2C%20(%5B%5E%22%5D*)%22", "center"],\
                    ["TEXT#", "with", "%242%20%241", "center"],\
                    ["NUM#", "regex", "1,0"],\
                    ["TEXT#", "value", "Title%2CAuthor%2CGenre%2CHeight%2CPublisher%0AFundamentals%20of%20Wavelets%2CJaideva%20Goswami%2Csignal_processing%2C228%2CWiley%0AData%20Smart%2CJohn%20Foreman%2Cdata_science%2C235%2CWiley%0AGod%20Created%20the%20Integers%2CStephen%20Hawking%2Cmathematics%2C197%2CPenguin%0ASuperfreakonomics%2CStephen%20Dubner%2Ceconomics%2C179%2CHarperCollins%0AOrientalism%2CEdward%20Said%2Chistory%2C197%2CPenguin%0AThe%20Nature%20of%20Statistical%20Learning%20Theory%2CVladimir%20Vapnik%2Cdata_science%2C230%2CSpringer%0AIntegration%20of%20the%20Indian%20States%2CV%20P%20Menon%2Chistory%2C217%2COrient%20Blackswan%0AThe%20Drunkard\'s%20Walk%2CLeonard%20Mlodinow%2Cscience%2C197%2CPenguin%0AImage%20Processing%20%26%20Mathematical%20Morphology%2CFrank%20Shih%2Csignal_processing%2C241%2CCRC%0AHow%20to%20Think%20Like%20Sherlock%20Holmes%2CMaria%20Konnikova%2Cpsychology%2C240%2CPenguin%0AData%20Scientists%20at%20Work%2CSebastian%20Gutierrez%2Cdata_science%2C230%2CApress%0ASlaughterhouse%20Five%2CKurt%20Vonnegut%2Cfiction%2C198%2CRandom%20House%0ABirth%20of%20a%20Theorem%2CCedric%20Villani%2Cmathematics%2C234%2CBodley%20Head%0AStructure%20%26%20Interpretation%20of%20Computer%20Programs%2CGerald%20Sussman%2Ccomputer_science%2C240%2CMIT%20Press%0AThe%20Age%20of%20Wrath%2CAbraham%20Eraly%2Chistory%2C238%2CPenguin%0AThe%20Trial%2CFrank%20Kafka%2Cfiction%2C198%2CRandom%20House%0AStatistical%20Decision%20Theory\'%2CJohn%20Pratt%2Cdata_science%2C236%2CMIT%20Press%0AData%20Mining%20Handbook%2CRobert%20Nisbet%2Cdata_science%2C242%2CApress%0AThe%20New%20Machiavelli%2CH.%20G.%20Wells%2Cfiction%2C180%2CPenguin%0APhysics%20%26%20Philosophy%2CWerner%20Heisenberg%2Cscience%2C197%2CPenguin%0AMaking%20Software%2CAndy%20Oram%2Ccomputer_science%2C232%2CO\'Reilly%0AVol%20I%20Analysis%2CTerence%20Tao%2Cmathematics%2C248%2CHBA%0AMachine%20Learning%20for%20Hackers%2CDrew%20Conway%2Cdata_science%2C233%2CO\'Reilly%0AThe%20Signal%20and%20the%20Noise%2CNate%20Silver%2Cdata_science%2C233%2CPenguin%0APython%20for%20Data%20Analysis%2CWes%20McKinney%2Cdata_science%2C233%2CO\'Reilly%0AIntroduction%20to%20Algorithms%2CThomas%20Cormen%2Ccomputer_science%2C234%2CMIT%20Press%0AThe%20Beautiful%20and%20the%20Damned%2CSiddhartha%20Deb%2Cnonfiction%2C198%2CPenguin%0AThe%20Outsider%2CAlbert%20Camus%2Cfiction%2C198%2CPenguin%0AThe%20-%20Vol%20I%20Complete%20Sherlock%20Holmes%2CArthur%20Conan%20Doyle%2Cfiction%2C176%2CRandom%20House%0AThe%20-%20Vol%20II%20Complete%20Sherlock%20Holmes%2CArthur%20Conan%20Doyle%2Cfiction%2C176%2CRandom%20House%0AThe%20Wealth%20of%20Nations%2CAdam%20Smith%2Ceconomics%2C175%2CRandom%20House%0AThe%20Pillars%20of%20the%20Earth%2CKen%20Follett%2Cfiction%2C176%2CRandom%20House%0AMein%20Kampf%2CAdolf%20Hitler%2Cnonfiction%2C212%2CRupa%0AThe%20Tao%20of%20Physics%2CFritjof%20Capra%2Cscience%2C179%2CPenguin%0ASurely%20You\'re%20Joking%20Mr%20Feynman%2CRichard%20Feynman%2Cscience%2C198%2CRandom%20House%0AA%20Farewell%20to%20Arms%2CErnest%20Hemingway%2Cfiction%2C179%2CRupa%0AThe%20Veteran%2CFrederick%20Forsyth%2Cfiction%2C177%2CTransworld%0AFalse%20Impressions%2CJeffery%20Archer%2Cfiction%2C177%2CPan%0AThe%20Last%20Lecture%2CRandy%20Pausch%2Cnonfiction%2C197%2CHyperion%0AReturn%20of%20the%20Primitive%2CAyn%20Rand%2Cphilosophy%2C202%2CPenguin%0AJurassic%20Park%2CMichael%20Crichton%2Cfiction%2C174%2CRandom%20House%0AA%20Russian%20Journal%2CJohn%20Steinbeck%2Cnonfiction%2C196%2CPenguin%0ATales%20of%20Mystery%20and%20Imagination%2CEdgar%20Allen%20Poe%2Cfiction%2C172%2CHarperCollins%0AFreakonomics%2CStephen%20Dubner%2Ceconomics%2C197%2CPenguin%0AThe%20Hidden%20Connections%2CFritjof%20Capra%2Cscience%2C197%2CHarperCollins%0AThe%20Story%20of%20Philosophy%2CWill%20Durant%2Cphilosophy%2C170%2CPocket%0AAsami%20Asami%2CP%20L%20Deshpande%2Cfiction%2C205%2CMauj%0AJournal%20of%20a%20Novel%2CJohn%20Steinbeck%2Cfiction%2C196%2CPenguin%0AOnce%20There%20Was%20a%20War%2CJohn%20Steinbeck%2Cnonfiction%2C196%2CPenguin%0AThe%20Moon%20is%20Down%2CJohn%20Steinbeck%2Cfiction%2C196%2CPenguin%0AThe%20Brethren%2CJohn%20Grisham%2Cfiction%2C174%2CRandom%20House%0AIn%20a%20Free%20State%2CV.%20S.%20Naipaul%2Cfiction%2C196%2CRupa%0ACatch%2022%2CJoseph%20Heller%2Cfiction%2C178%2CRandom%20House%0AThe%20Complete%20Mastermind%2CBBC%2Cnonfiction%2C178%2CBBC%0ADylan%20on%20Dylan%2CBob%20Dylan%2Cnonfiction%2C197%2CRandom%20House%0ASoft%20Computing%20%26%20Intelligent%20Systems%2CMadan%20Gupta%2Cdata_science%2C242%2CElsevier%0ATextbook%20of%20Economic%20Theory%2CAlfred%20Stonier%2Ceconomics%2C242%2CPearson%0AEconometric%20Analysis%2CW.%20H.%20Greene%2Ceconomics%2C242%2CPearson%0ALearning%20OpenCV%2CGary%20Bradsky%2Cdata_science%2C232%2CO\'Reilly%0AData%20Structures%20Using%20C%20%26%20C%2B%2B%2CAndrew%20Tanenbaum%2Ccomputer_science%2C235%2CPrentice%20Hall%0AA%20Modern%20Approach%20Computer%20Vision%2CDavid%20Forsyth%2Cdata_science%2C255%2CPearson%0APrinciples%20of%20Communication%20Systems%2CSchilling%20Taub%2Ccomputer_science%2C240%2CTMH%0ALet%20Us%20C%2CYashwant%20Kanetkar%2Ccomputer_science%2C213%2CPrentice%20Hall%0AThe%20Amulet%20of%20Samarkand%2CJonathan%20Stroud%2Cfiction%2C179%2CRandom%20House%0ACrime%20and%20Punishment%2CFyodor%20Dostoevsky%2Cfiction%2C180%2CPenguin%0AAngels%20%26%20Demons%2CDan%20Brown%2Cfiction%2C178%2CRandom%20House%0AThe%20Argumentative%20Indian%2CAmartya%20Sen%2Cnonfiction%2C209%2CPicador%0ASea%20of%20Poppies%2CAmitav%20Ghosh%2Cfiction%2C197%2CPenguin%0AThe%20Idea%20of%20Justice%2CAmartya%20Sen%2Cnonfiction%2C212%2CPenguin%0AA%20Raisin%20in%20the%20Sun%2CLorraine%20Hansberry%2Cfiction%2C175%2CPenguin%0AAll%20the%20President\'s%20Men%2CBob%20Woodward%2Chistory%2C177%2CRandom%20House%0AA%20Prisoner%20of%20Birth%2CJeffery%20Archer%2Cfiction%2C176%2CPan%0AScoop!%2CKuldip%20Nayar%2Chistory%2C216%2CHarperCollins%0AAhe%20Manohar%20Tari%2CSunita%20Deshpande%2Cnonfiction%2C213%2CMauj%0AThe%20Last%20Mughal%2CWilliam%20Dalrymple%2Chistory%2C199%2CPenguin%0AVol%2039%20No.%201%20Social%20Choice%20%26%20Welfare%2CVarious%2Ceconomics%2C235%2CSpringer%0ARadiowaril%20Bhashane%20%26%20Shrutika%2CP%20L%20Deshpande%2Cnonfiction%2C213%2CMauj%0AGun%20Gayin%20Awadi%2CP%20L%20Deshpande%2Cnonfiction%2C212%2CMauj%0AAghal%20Paghal%2CP%20L%20Deshpande%2Cnonfiction%2C212%2CMauj%0AMaqta-e-Ghalib%2CSanjay%20Garg%2Cfiction%2C221%2CMauj%0ABeyond%20Degrees%2C%2Cnonfiction%2C222%2CHarperCollins%0AManasa%2CV%20P%20Kale%2Cnonfiction%2C213%2CMauj%0AIndia%20from%20Midnight%20to%20Milennium%2CShashi%20Tharoor%2Chistory%2C198%2CPenguin%0AThe%20World\'s%20Greatest%20Trials%2C%2Chistory%2C210%2C%0AThe%20Great%20Indian%20Novel%2CShashi%20Tharoor%2Cfiction%2C198%2CPenguin%0AO%20Jerusalem!%2CDominique%20Lapierre%2Chistory%2C217%2Cvikas%0AThe%20City%20of%20Joy%2CDominique%20Lapierre%2Cfiction%2C177%2Cvikas%0AFreedom%20at%20Midnight%2CDominique%20Lapierre%2Chistory%2C167%2Cvikas%0AThe%20Winter%20of%20Our%20Discontent%2CJohn%20Steinbeck%2Cfiction%2C196%2CPenguin%0AOn%20Education%2CBertrand%20Russell%2Cphilosophy%2C203%2CRoutledge%0AFree%20Will%2CSam%20Harris%2Cphilosophy%2C203%2CFreePress%0ABookless%20in%20Baghdad%2CShashi%20Tharoor%2Cnonfiction%2C206%2CPenguin%0AThe%20Case%20of%20the%20Lame%20Canary%2CEarle%20Stanley%20Gardner%2Cfiction%2C179%2C%0AThe%20Theory%20of%20Everything%2CStephen%20Hawking%2Cscience%2C217%2CJaico%0ANew%20Markets%20%26%20Other%20Essays%2CPeter%20Drucker%2Ceconomics%2C176%2CPenguin%0AElectric%20Universe%2CDavid%20Bodanis%2Cscience%2C201%2CPenguin%0AThe%20Hunchback%20of%20Notre%20Dame%2CVictor%20Hugo%2Cfiction%2C175%2CRandom%20House%0ABurning%20Bright%2CJohn%20Steinbeck%2Cfiction%2C175%2CPenguin%0AThe%20Age%20of%20Discontuinity%2CPeter%20Drucker%2Ceconomics%2C178%2CRandom%20House%0ADoctor%20in%20the%20Nude%2CRichard%20Gordon%2Cfiction%2C179%2CPenguin%0ADown%20and%20Out%20in%20Paris%20%26%20London%2CGeorge%20Orwell%2Cnonfiction%2C179%2CPenguin%0AIdentity%20%26%20Violence%2CAmartya%20Sen%2Cphilosophy%2C219%2CPenguin%0ABeyond%20the%20Three%20Seas%2CWilliam%20Dalrymple%2Chistory%2C197%2CRandom%20House%0AThe%20World\'s%20Greatest%20Short%20Stories%2C%2Cfiction%2C217%2CJaico%0ATalking%20Straight%2CLee%20Iacoca%2Cnonfiction%2C175%2C%0AVol%203%20Maugham\'s%20Collected%20Short%20Stories%2CWilliam%20S%20Maugham%2Cfiction%2C171%2CVintage%0AThe%20Phantom%20of%20Manhattan%2CFrederick%20Forsyth%2Cfiction%2C180%2C%0AAshenden%20of%20The%20British%20Agent%2CWilliam%20S%20Maugham%2Cfiction%2C160%2CVintage%0AZen%20%26%20The%20Art%20of%20Motorcycle%20Maintenance%2CRobert%20Pirsig%2Cphilosophy%2C172%2CVintage%0AThe%20Great%20War%20for%20Civilization%2CRobert%20Fisk%2Chistory%2C197%2CHarperCollins%0AWe%20the%20Living%2CAyn%20Rand%2Cfiction%2C178%2CPenguin%0AThe%20Artist%20and%20the%20Mathematician%2CAmir%20Aczel%2Cscience%2C186%2CHighStakes%0AHistory%20of%20Western%20Philosophy%2CBertrand%20Russell%2Cphilosophy%2C213%2CRoutledge%0ASelected%20Short%20Stories%2C%2Cfiction%2C215%2CJaico%0ARationality%20%26%20Freedom%2CAmartya%20Sen%2Ceconomics%2C213%2CSpringer%0AClash%20of%20Civilizations%20and%20Remaking%20of%20the%20World%20Order%2CSamuel%20Huntington%2Chistory%2C228%2CSimon%26Schuster%0AUncommon%20Wisdom%2CFritjof%20Capra%2Cnonfiction%2C197%2CFontana%0AOne%2CRichard%20Bach%2Cnonfiction%2C172%2CDell%0AKarl%20Marx%20Biography%2C%2Cnonfiction%2C162%2C%0ATo%20Sir%20With%20Love%2CBraithwaite%2Cfiction%2C197%2CPenguin%0AHalf%20A%20Life%2CV%20S%20Naipaul%2Cfiction%2C196%2C%0AThe%20Discovery%20of%20India%2CJawaharlal%20Nehru%2Chistory%2C230%2C%0AApulki%2CP%20L%20Deshpande%2Cnonfiction%2C211%2C%0AUnpopular%20Essays%2CBertrand%20Russell%2Cphilosophy%2C198%2C%0AThe%20Deceiver%2CFrederick%20Forsyth%2Cfiction%2C178%2C%0AVeil%3A%20Secret%20Wars%20of%20the%20CIA%2CBob%20Woodward%2Chistory%2C171%2C%0AChar%20Shabda%2CP%20L%20Deshpande%2Cnonfiction%2C214%2C%0ARosy%20is%20My%20Relative%2CGerald%20Durrell%2Cfiction%2C176%2C%0AThe%20Moon%20and%20Sixpence%2CWilliam%20S%20Maugham%2Cfiction%2C180%2C%0APolitical%20Philosophers%2C%2Cphilosophy%2C162%2C%0AA%20Short%20History%20of%20the%20World%2CH%20G%20Wells%2Chistory%2C197%2C%0AThe%20Trembling%20of%20a%20Leaf%2CWilliam%20S%20Maugham%2Cfiction%2C205%2C%0ADoctor%20on%20the%20Brain%2CRichard%20Gordon%2Cfiction%2C204%2C%0ASimpsons%20%26%20Their%20Mathematical%20Secrets%2CSimon%20Singh%2Cscience%2C233%2C%0APattern%20Classification%2CHart%20Duda%2Cdata_science%2C241%2C%0AFrom%20Beirut%20to%20Jerusalem%2CThomas%20Friedman%2Chistory%2C202%2C%0AThe%20Code%20Book%2CSimon%20Singh%2Cscience%2C197%2C%0AThe%20Age%20of%20the%20Warrior%2CRobert%20Fisk%2Chistory%2C197%2C%0AFinal%20Crisis%2C%2Ccomic%2C257%2C%0AThe%20Killing%20Joke%2C%2Ccomic%2C283%2C%0AFlashpoint%2C%2Ccomic%2C265%2C%0ABatman%20Earth%20One%2C%2Ccomic%2C265%2C%0ACrisis%20on%20Infinite%20Earths%2C%2Ccomic%2C258%2C%0AThe%20Numbers%20Behind%20Numb3rs%2CKeith%20Devlin%2Cscience%2C202%2C%0ASuperman%20Earth%20One%20-%201%2C%2Ccomic%2C259%2C%0ASuperman%20Earth%20One%20-%202%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20Throne%20of%20Atlantis%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20The%20Villain\'s%20Journey%2C%2Ccomic%2C258%2C%0AThe%20Death%20of%20Superman%2C%2Ccomic%2C258%2C%0AHistory%20of%20the%20DC%20Universe%2C%2Ccomic%2C258%2C%0ABatman%3A%20The%20Long%20Halloween%2C%2Ccomic%2C258%2C%0AA%20Life%20in%20Letters%2CJohn%20Steinbeck%2Cnonfiction%2C196%2C%0AThe%20Information%2CJames%20Gleick%2Cscience%2C233%2C%0Avol%20106%20No%203%20Journal%20of%20Economics%2C%2Ceconomics%2C235%2C%0AElements%20of%20Information%20Theory%2CJoy%20Thomas%2Cdata_science%2C229%2C%0APower%20Electronics%20-%20Rashid%2CMuhammad%20Rashid%2Ccomputer_science%2C235%2C%0APower%20Electronics%20-%20Mohan%2CNed%20Mohan%2Ccomputer_science%2C237%2C%0ANeural%20Networks%2CSimon%20Haykin%2Cdata_science%2C240%2C%0AThe%20Grapes%20of%20Wrath%2CJohn%20Steinbeck%2Cfiction%2C196%2C%0AVyakti%20ani%20Valli%2CP%20L%20Deshpande%2Cnonfiction%2C211%2C%0AStatistical%20Learning%20Theory%2CVladimir%20Vapnik%2Cdata_science%2C228%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Tainted%20Throne%2CAlex%20Rutherford%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Brothers%20at%20War%2CAlex%20Rutherford%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Ruler%20of%20the%20World%2CAlex%20Rutherford%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Serpent\'s%20Tooth%2CAlex%20Rutherford%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Raiders%20from%20the%20North%2CAlex%20Rutherford%2Chistory%2C180%2C%0AMossad%2CMichael%20Baz-Zohar%2Chistory%2C236%2C%0AJim%20Corbett%20Omnibus%2CJim%20Corbett%2Cnonfiction%2C223%2C%0A20000%20Leagues%20Under%20the%20Sea%2CJules%20Verne%2Cfiction%2C190%2C%0ABatatyachi%20Chal%2CDeshpande%20P%20L%2Cfiction%2C200%2C%0AHafasavnuk%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0AUrlasurla%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0APointers%20in%20C%2CYashwant%20Kanetkar%2Ccomputer_science%2C213%2C%0AThe%20Cathedral%20and%20the%20Bazaar%2CEric%20Raymond%2Ccomputer_science%2C217%2C%0ADesign%20with%20OpAmps%2CSergio%20Franco%2Ccomputer_science%2C240%2C%0AThink%20Complexity%2CAllen%20Downey%2Cdata_science%2C230%2C%0AThe%20Devil\'s%20Advocate%2CMorris%20West%2Cfiction%2C178%2C%0AAyn%20Rand%20Answers%2CAyn%20Rand%2Cphilosophy%2C203%2C%0APhilosophy%3A%20Who%20Needs%20It%2CAyn%20Rand%2Cphilosophy%2C171%2C%0AThe%20World\'s%20Great%20Thinkers%2C%2Cphilosophy%2C189%2C%0AData%20Analysis%20with%20Open%20Source%20Tools%2CPhillip%20Janert%2Cdata_science%2C230%2C%0ABroca\'s%20Brain%2CCarl%20Sagan%2Cscience%2C174%2C%0AMen%20of%20Mathematics%2CE%20T%20Bell%2Cmathematics%2C217%2C%0AOxford%20book%20of%20Modern%20Science%20Writing%2CRichard%20Dawkins%2Cscience%2C240%2C%0AJudiciary%20and%20Democracy%20Justice%2CSudhanshu%20Ranjan%2Cphilosophy%2C224%2C%0AThe%20Arthashastra%2CKautiyla%2Cphilosophy%2C214%2C%0AWe%20the%20People%2CPalkhivala%2Cphilosophy%2C216%2C%0AWe%20the%20Nation%2CPalkhivala%2Cphilosophy%2C216%2C%0AThe%20Courtroom%20Genius%2CSorabjee%2Cnonfiction%2C217%2C%0ADongri%20to%20Dubai%2CHussain%20Zaidi%2Cnonfiction%2C216%2C%0AFoundation%20History%20of%20England%2CPeter%20Ackroyd%2Chistory%2C197%2C%0ACity%20of%20Djinns%2CWilliam%20Dalrymple%2Chistory%2C198%2C%0AIndia\'s%20Legal%20System%2CNariman%2Cnonfiction%2C177%2C%0AMore%20Tears%20to%20Cry%2CJean%20Sassoon%2Cfiction%2C235%2C%0AThe%20Ropemaker%2CPeter%20Dickinson%2Cfiction%2C196%2C%0AAngels%20%26%20Demons%2CDan%20Brown%2Cfiction%2C170%2C%0AThe%20Judge%2C%2Cfiction%2C170%2C%0AThe%20Attorney%2C%2Cfiction%2C170%2C%0AThe%20Prince%2CMachiavelli%2Cphilosophy%2C173%2C%0AEyeless%20in%20Gaza%2CAldous%20Huxley%2Cfiction%2C180%2C%0ATales%20of%20Beedle%20the%20Bard%2CJ%20K%20Rowling%2Cfiction%2C184%2C%0AGirl%20with%20the%20Dragon%20Tattoo%2CSteig%20Larsson%2Cfiction%2C179%2C%0AGirl%20who%20kicked%20the%20Hornet\'s%20Nest%2CSteig%20Larsson%2Cfiction%2C179%2C%0AGirl%20who%20played%20with%20Fire%2CSteig%20Larsson%2Cfiction%2C179%2C%0ABatman%20Handbook%2C%2Ccomic%2C270%2C%0AMurphy\'s%20Law%2C%2Cnonfiction%2C178%2C%0AStructure%20and%20Randomness%2CTerence%20Tao%2Cmathematics%2C252%2C%0AImage%20Processing%20with%20MATLAB%2CSteve%20Eddins%2Csignal_processing%2C241%2C%0AAnimal%20Farm%2CGeorge%20Orwell%2Cfiction%2C180%2C%0AThe%20Idiot%2CFyodor%20Dostoevsky%2Cfiction%2C197%2C%0AA%20Christmas%20Carol%2CCharles%20Dickens%2Cfiction%2C196%2C", "left"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence4",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7627",\
            "y": "111",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "start", "3,0"],\
                    ["NUM#", "add", "0.07,3"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center3",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5725",\
            "y": "146",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "centerY", "65,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill4",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4916",\
            "y": "-527",\
            "z": "34",\
            "params":\
            [\
                    ["COL#", "color", "1,0 0,0 0,0 0,0"],\
                    ["NUM#", "opacity", "40,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "3711",\
            "y": "-1658",\
            "z": "35",\
            "width": "1167.5093567440279",\
            "height": "544.510129930884",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel5",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "4876",\
            "y": "-725",\
            "z": "36",\
            "width": "787.2715194875075",\
            "height": "410.2452782933203",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4703",\
            "y": "-46",\
            "z": "37",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "30,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6984",\
            "y": "-453",\
            "z": "38",\
            "params":\
            [\
                    ["NUM#", "angle", "107.5,1"],\
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
            "x": "5026",\
            "y": "255",\
            "z": "39",\
            "params":\
            [\
                    ["TEXT#", "text", "V.%20S.%20Naipaul", "center"],\
                    ["NUM#", "width", "370.44000000000005,1"],\
                    ["NUM#", "height", "30,0"],\
                    ["TEXT#", "font", "Almendra%20SC"],\
                    ["NUM#", "size", "16,0"],\
                    ["NUM#", "alignV", "2,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4734",\
            "y": "393",\
            "z": "40",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "30,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math7",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7794",\
            "y": "-176",\
            "z": "41",\
            "params":\
            [\
                    ["NUM#", "value", "2172.97,3"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2142",\
            "y": "-823",\
            "z": "42"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3717",\
            "y": "221",\
            "z": "43",\
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
            "type": "GRAD",\
            "id": "grad3",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5498",\
            "y": "-674",\
            "z": "44"\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3034",\
            "y": "-1281",\
            "z": "45",\
            "params":\
            [\
                    ["NUM#", "seed", "7262,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7279",\
            "y": "-506",\
            "z": "46",\
            "width": "1447",\
            "height": "887.8927327301616",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3735",\
            "y": "477",\
            "z": "47",\
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
            "type": "T2N",\
            "id": "textToNum",\
            "name": "to%20number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3721",\
            "y": "-320",\
            "z": "48",\
            "params":\
            [\
                    ["NUM#", "value", "196,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel4",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "6732",\
            "y": "-515",\
            "z": "49",\
            "width": "400",\
            "height": "425.6608238154229",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse2",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5313",\
            "y": "-1191",\
            "z": "50",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color8",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3762",\
            "y": "-812",\
            "z": "51",\
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
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3777",\
            "y": "-993",\
            "z": "52",\
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
            "type": "FILL",\
            "id": "fill3",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4919",\
            "y": "-648",\
            "z": "53",\
            "params":\
            [\
                    ["COL#", "color", "1,0 0,0 0,0 0,0"],\
                    ["NUM#", "opacity", "0,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5544",\
            "y": "100",\
            "z": "54"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8524",\
            "y": "-140",\
            "z": "55",\
            "params":\
            [\
                    ["NUM#", "count", "26,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "3720",\
            "y": "-1051",\
            "z": "56",\
            "width": "885",\
            "height": "438",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3967",\
            "y": "-293",\
            "z": "57",\
            "params":\
            [\
                    ["NUM#", "value", "411.6,1"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2.1,1"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text3",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2062",\
            "y": "-178",\
            "z": "58",\
            "width": "309",\
            "height": "213.83694298372413",\
            "params":\
            [\
                    ["TEXT#", "value", "Title%2CAuthor%2CGenre%2CHeight%2CPublisher%0AFundamentals%20of%20Wavelets%2C%22Goswami%2C%20Jaideva%22%2Csignal_processing%2C228%2CWiley%0AData%20Smart%2C%22Foreman%2C%20John%22%2Cdata_science%2C235%2CWiley%0AGod%20Created%20the%20Integers%2C%22Hawking%2C%20Stephen%22%2Cmathematics%2C197%2CPenguin%0ASuperfreakonomics%2C%22Dubner%2C%20Stephen%22%2Ceconomics%2C179%2CHarperCollins%0AOrientalism%2C%22Said%2C%20Edward%22%2Chistory%2C197%2CPenguin%0A%22Nature%20of%20Statistical%20Learning%20Theory%2C%20The%22%2C%22Vapnik%2C%20Vladimir%22%2Cdata_science%2C230%2CSpringer%0AIntegration%20of%20the%20Indian%20States%2C%22Menon%2C%20V%20P%22%2Chistory%2C217%2COrient%20Blackswan%0A%22Drunkard\'s%20Walk%2C%20The%22%2C%22Mlodinow%2C%20Leonard%22%2Cscience%2C197%2CPenguin%0AImage%20Processing%20%26%20Mathematical%20Morphology%2C%22Shih%2C%20Frank%22%2Csignal_processing%2C241%2CCRC%0AHow%20to%20Think%20Like%20Sherlock%20Holmes%2C%22Konnikova%2C%20Maria%22%2Cpsychology%2C240%2CPenguin%0AData%20Scientists%20at%20Work%2CSebastian%20Gutierrez%2Cdata_science%2C230%2CApress%0ASlaughterhouse%20Five%2C%22Vonnegut%2C%20Kurt%22%2Cfiction%2C198%2CRandom%20House%0ABirth%20of%20a%20Theorem%2C%22Villani%2C%20Cedric%22%2Cmathematics%2C234%2CBodley%20Head%0AStructure%20%26%20Interpretation%20of%20Computer%20Programs%2C%22Sussman%2C%20Gerald%22%2Ccomputer_science%2C240%2CMIT%20Press%0A%22Age%20of%20Wrath%2C%20The%22%2C%22Eraly%2C%20Abraham%22%2Chistory%2C238%2CPenguin%0A%22Trial%2C%20The%22%2C%22Kafka%2C%20Frank%22%2Cfiction%2C198%2CRandom%20House%0AStatistical%20Decision%20Theory\'%2C%22Pratt%2C%20John%22%2Cdata_science%2C236%2CMIT%20Press%0AData%20Mining%20Handbook%2C%22Nisbet%2C%20Robert%22%2Cdata_science%2C242%2CApress%0A%22New%20Machiavelli%2C%20The%22%2C%22Wells%2C%20H.%20G.%22%2Cfiction%2C180%2CPenguin%0APhysics%20%26%20Philosophy%2C%22Heisenberg%2C%20Werner%22%2Cscience%2C197%2CPenguin%0AMaking%20Software%2C%22Oram%2C%20Andy%22%2Ccomputer_science%2C232%2CO\'Reilly%0A%22Analysis%2C%20Vol%20I%22%2C%22Tao%2C%20Terence%22%2Cmathematics%2C248%2CHBA%0AMachine%20Learning%20for%20Hackers%2C%22Conway%2C%20Drew%22%2Cdata_science%2C233%2CO\'Reilly%0A%22Signal%20and%20the%20Noise%2C%20The%22%2C%22Silver%2C%20Nate%22%2Cdata_science%2C233%2CPenguin%0APython%20for%20Data%20Analysis%2C%22McKinney%2C%20Wes%22%2Cdata_science%2C233%2CO\'Reilly%0AIntroduction%20to%20Algorithms%2C%22Cormen%2C%20Thomas%22%2Ccomputer_science%2C234%2CMIT%20Press%0A%22Beautiful%20and%20the%20Damned%2C%20The%22%2C%22Deb%2C%20Siddhartha%22%2Cnonfiction%2C198%2CPenguin%0A%22Outsider%2C%20The%22%2C%22Camus%2C%20Albert%22%2Cfiction%2C198%2CPenguin%0A%22Complete%20Sherlock%20Holmes%2C%20The%20-%20Vol%20I%22%2C%22Doyle%2C%20Arthur%20Conan%22%2Cfiction%2C176%2CRandom%20House%0A%22Complete%20Sherlock%20Holmes%2C%20The%20-%20Vol%20II%22%2C%22Doyle%2C%20Arthur%20Conan%22%2Cfiction%2C176%2CRandom%20House%0A%22Wealth%20of%20Nations%2C%20The%22%2C%22Smith%2C%20Adam%22%2Ceconomics%2C175%2CRandom%20House%0A%22Pillars%20of%20the%20Earth%2C%20The%22%2C%22Follett%2C%20Ken%22%2Cfiction%2C176%2CRandom%20House%0AMein%20Kampf%2C%22Hitler%2C%20Adolf%22%2Cnonfiction%2C212%2CRupa%0A%22Tao%20of%20Physics%2C%20The%22%2C%22Capra%2C%20Fritjof%22%2Cscience%2C179%2CPenguin%0ASurely%20You\'re%20Joking%20Mr%20Feynman%2C%22Feynman%2C%20Richard%22%2Cscience%2C198%2CRandom%20House%0A%22Farewell%20to%20Arms%2C%20A%22%2C%22Hemingway%2C%20Ernest%22%2Cfiction%2C179%2CRupa%0A%22Veteran%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C177%2CTransworld%0AFalse%20Impressions%2C%22Archer%2C%20Jeffery%22%2Cfiction%2C177%2CPan%0A%22Last%20Lecture%2C%20The%22%2C%22Pausch%2C%20Randy%22%2Cnonfiction%2C197%2CHyperion%0AReturn%20of%20the%20Primitive%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C202%2CPenguin%0AJurassic%20Park%2C%22Crichton%2C%20Michael%22%2Cfiction%2C174%2CRandom%20House%0A%22Russian%20Journal%2C%20A%22%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2CPenguin%0ATales%20of%20Mystery%20and%20Imagination%2C%22Poe%2C%20Edgar%20Allen%22%2Cfiction%2C172%2CHarperCollins%0AFreakonomics%2C%22Dubner%2C%20Stephen%22%2Ceconomics%2C197%2CPenguin%0A%22Hidden%20Connections%2C%20The%22%2C%22Capra%2C%20Fritjof%22%2Cscience%2C197%2CHarperCollins%0A%22Story%20of%20Philosophy%2C%20The%22%2C%22Durant%2C%20Will%22%2Cphilosophy%2C170%2CPocket%0AAsami%20Asami%2C%22Deshpande%2C%20P%20L%22%2Cfiction%2C205%2CMauj%0AJournal%20of%20a%20Novel%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0AOnce%20There%20Was%20a%20War%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2CPenguin%0A%22Moon%20is%20Down%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0A%22Brethren%2C%20The%22%2C%22Grisham%2C%20John%22%2Cfiction%2C174%2CRandom%20House%0AIn%20a%20Free%20State%2C%22Naipaul%2C%20V.%20S.%22%2Cfiction%2C196%2CRupa%0ACatch%2022%2C%22Heller%2C%20Joseph%22%2Cfiction%2C178%2CRandom%20House%0A%22Complete%20Mastermind%2C%20The%22%2CBBC%2Cnonfiction%2C178%2CBBC%0ADylan%20on%20Dylan%2C%22Dylan%2C%20Bob%22%2Cnonfiction%2C197%2CRandom%20House%0ASoft%20Computing%20%26%20Intelligent%20Systems%2C%22Gupta%2C%20Madan%22%2Cdata_science%2C242%2CElsevier%0ATextbook%20of%20Economic%20Theory%2C%22Stonier%2C%20Alfred%22%2Ceconomics%2C242%2CPearson%0AEconometric%20Analysis%2C%22Greene%2C%20W.%20H.%22%2Ceconomics%2C242%2CPearson%0ALearning%20OpenCV%2C%22Bradsky%2C%20Gary%22%2Cdata_science%2C232%2CO\'Reilly%0AData%20Structures%20Using%20C%20%26%20C%2B%2B%2C%22Tanenbaum%2C%20Andrew%22%2Ccomputer_science%2C235%2CPrentice%20Hall%0A%22Computer%20Vision%2C%20A%20Modern%20Approach%22%2C%22Forsyth%2C%20David%22%2Cdata_science%2C255%2CPearson%0APrinciples%20of%20Communication%20Systems%2C%22Taub%2C%20Schilling%22%2Ccomputer_science%2C240%2CTMH%0ALet%20Us%20C%2C%22Kanetkar%2C%20Yashwant%22%2Ccomputer_science%2C213%2CPrentice%20Hall%0A%22Amulet%20of%20Samarkand%2C%20The%22%2C%22Stroud%2C%20Jonathan%22%2Cfiction%2C179%2CRandom%20House%0ACrime%20and%20Punishment%2C%22Dostoevsky%2C%20Fyodor%22%2Cfiction%2C180%2CPenguin%0AAngels%20%26%20Demons%2C%22Brown%2C%20Dan%22%2Cfiction%2C178%2CRandom%20House%0A%22Argumentative%20Indian%2C%20The%22%2C%22Sen%2C%20Amartya%22%2Cnonfiction%2C209%2CPicador%0ASea%20of%20Poppies%2C%22Ghosh%2C%20Amitav%22%2Cfiction%2C197%2CPenguin%0A%22Idea%20of%20Justice%2C%20The%22%2C%22Sen%2C%20Amartya%22%2Cnonfiction%2C212%2CPenguin%0A%22Raisin%20in%20the%20Sun%2C%20A%22%2C%22Hansberry%2C%20Lorraine%22%2Cfiction%2C175%2CPenguin%0AAll%20the%20President\'s%20Men%2C%22Woodward%2C%20Bob%22%2Chistory%2C177%2CRandom%20House%0A%22Prisoner%20of%20Birth%2C%20A%22%2C%22Archer%2C%20Jeffery%22%2Cfiction%2C176%2CPan%0AScoop!%2C%22Nayar%2C%20Kuldip%22%2Chistory%2C216%2CHarperCollins%0AAhe%20Manohar%20Tari%2C%22Deshpande%2C%20Sunita%22%2Cnonfiction%2C213%2CMauj%0A%22Last%20Mughal%2C%20The%22%2C%22Dalrymple%2C%20William%22%2Chistory%2C199%2CPenguin%0A%22Social%20Choice%20%26%20Welfare%2C%20Vol%2039%20No.%201%22%2CVarious%2Ceconomics%2C235%2CSpringer%0ARadiowaril%20Bhashane%20%26%20Shrutika%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C213%2CMauj%0AGun%20Gayin%20Awadi%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C212%2CMauj%0AAghal%20Paghal%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C212%2CMauj%0AMaqta-e-Ghalib%2C%22Garg%2C%20Sanjay%22%2Cfiction%2C221%2CMauj%0ABeyond%20Degrees%2C%2Cnonfiction%2C222%2CHarperCollins%0AManasa%2C%22Kale%2C%20V%20P%22%2Cnonfiction%2C213%2CMauj%0AIndia%20from%20Midnight%20to%20Milennium%2C%22Tharoor%2C%20Shashi%22%2Chistory%2C198%2CPenguin%0A%22World\'s%20Greatest%20Trials%2C%20The%22%2C%2Chistory%2C210%2C%0A%22Great%20Indian%20Novel%2C%20The%22%2C%22Tharoor%2C%20Shashi%22%2Cfiction%2C198%2CPenguin%0AO%20Jerusalem!%2C%22Lapierre%2C%20Dominique%22%2Chistory%2C217%2Cvikas%0A%22City%20of%20Joy%2C%20The%22%2C%22Lapierre%2C%20Dominique%22%2Cfiction%2C177%2Cvikas%0AFreedom%20at%20Midnight%2C%22Lapierre%2C%20Dominique%22%2Chistory%2C167%2Cvikas%0A%22Winter%20of%20Our%20Discontent%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0AOn%20Education%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C203%2CRoutledge%0AFree%20Will%2C%22Harris%2C%20Sam%22%2Cphilosophy%2C203%2CFreePress%0ABookless%20in%20Baghdad%2C%22Tharoor%2C%20Shashi%22%2Cnonfiction%2C206%2CPenguin%0A%22Case%20of%20the%20Lame%20Canary%2C%20The%22%2C%22Gardner%2C%20Earle%20Stanley%22%2Cfiction%2C179%2C%0A%22Theory%20of%20Everything%2C%20The%22%2C%22Hawking%2C%20Stephen%22%2Cscience%2C217%2CJaico%0ANew%20Markets%20%26%20Other%20Essays%2C%22Drucker%2C%20Peter%22%2Ceconomics%2C176%2CPenguin%0AElectric%20Universe%2C%22Bodanis%2C%20David%22%2Cscience%2C201%2CPenguin%0A%22Hunchback%20of%20Notre%20Dame%2C%20The%22%2C%22Hugo%2C%20Victor%22%2Cfiction%2C175%2CRandom%20House%0ABurning%20Bright%2C%22Steinbeck%2C%20John%22%2Cfiction%2C175%2CPenguin%0A%22Age%20of%20Discontuinity%2C%20The%22%2C%22Drucker%2C%20Peter%22%2Ceconomics%2C178%2CRandom%20House%0ADoctor%20in%20the%20Nude%2C%22Gordon%2C%20Richard%22%2Cfiction%2C179%2CPenguin%0ADown%20and%20Out%20in%20Paris%20%26%20London%2C%22Orwell%2C%20George%22%2Cnonfiction%2C179%2CPenguin%0AIdentity%20%26%20Violence%2C%22Sen%2C%20Amartya%22%2Cphilosophy%2C219%2CPenguin%0ABeyond%20the%20Three%20Seas%2C%22Dalrymple%2C%20William%22%2Chistory%2C197%2CRandom%20House%0A%22World\'s%20Greatest%20Short%20Stories%2C%20The%22%2C%2Cfiction%2C217%2CJaico%0ATalking%20Straight%2C%22Iacoca%2C%20Lee%22%2Cnonfiction%2C175%2C%0A%22Maugham\'s%20Collected%20Short%20Stories%2C%20Vol%203%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C171%2CVintage%0A%22Phantom%20of%20Manhattan%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C180%2C%0AAshenden%20of%20The%20British%20Agent%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C160%2CVintage%0AZen%20%26%20The%20Art%20of%20Motorcycle%20Maintenance%2C%22Pirsig%2C%20Robert%22%2Cphilosophy%2C172%2CVintage%0A%22Great%20War%20for%20Civilization%2C%20The%22%2C%22Fisk%2C%20Robert%22%2Chistory%2C197%2CHarperCollins%0AWe%20the%20Living%2C%22Rand%2C%20Ayn%22%2Cfiction%2C178%2CPenguin%0A%22Artist%20and%20the%20Mathematician%2C%20The%22%2C%22Aczel%2C%20Amir%22%2Cscience%2C186%2CHighStakes%0AHistory%20of%20Western%20Philosophy%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C213%2CRoutledge%0ASelected%20Short%20Stories%2C%2Cfiction%2C215%2CJaico%0ARationality%20%26%20Freedom%2C%22Sen%2C%20Amartya%22%2Ceconomics%2C213%2CSpringer%0AClash%20of%20Civilizations%20and%20Remaking%20of%20the%20World%20Order%2C%22Huntington%2C%20Samuel%22%2Chistory%2C228%2CSimon%26Schuster%0AUncommon%20Wisdom%2C%22Capra%2C%20Fritjof%22%2Cnonfiction%2C197%2CFontana%0AOne%2C%22Bach%2C%20Richard%22%2Cnonfiction%2C172%2CDell%0AKarl%20Marx%20Biography%2C%2Cnonfiction%2C162%2C%0ATo%20Sir%20With%20Love%2CBraithwaite%2Cfiction%2C197%2CPenguin%0AHalf%20A%20Life%2C%22Naipaul%2C%20V%20S%22%2Cfiction%2C196%2C%0A%22Discovery%20of%20India%2C%20The%22%2C%22Nehru%2C%20Jawaharlal%22%2Chistory%2C230%2C%0AApulki%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C211%2C%0AUnpopular%20Essays%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C198%2C%0A%22Deceiver%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C178%2C%0AVeil%3A%20Secret%20Wars%20of%20the%20CIA%2C%22Woodward%2C%20Bob%22%2Chistory%2C171%2C%0AChar%20Shabda%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C214%2C%0ARosy%20is%20My%20Relative%2C%22Durrell%2C%20Gerald%22%2Cfiction%2C176%2C%0A%22Moon%20and%20Sixpence%2C%20The%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C180%2C%0APolitical%20Philosophers%2C%2Cphilosophy%2C162%2C%0A%22Short%20History%20of%20the%20World%2C%20A%22%2C%22Wells%2C%20H%20G%22%2Chistory%2C197%2C%0A%22Trembling%20of%20a%20Leaf%2C%20The%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C205%2C%0ADoctor%20on%20the%20Brain%2C%22Gordon%2C%20Richard%22%2Cfiction%2C204%2C%0ASimpsons%20%26%20Their%20Mathematical%20Secrets%2C%22Singh%2C%20Simon%22%2Cscience%2C233%2C%0APattern%20Classification%2C%22Duda%2C%20Hart%22%2Cdata_science%2C241%2C%0AFrom%20Beirut%20to%20Jerusalem%2C%22Friedman%2C%20Thomas%22%2Chistory%2C202%2C%0A%22Code%20Book%2C%20The%22%2C%22Singh%2C%20Simon%22%2Cscience%2C197%2C%0A%22Age%20of%20the%20Warrior%2C%20The%22%2C%22Fisk%2C%20Robert%22%2Chistory%2C197%2C%0AFinal%20Crisis%2C%2Ccomic%2C257%2C%0A%22Killing%20Joke%2C%20The%22%2C%2Ccomic%2C283%2C%0AFlashpoint%2C%2Ccomic%2C265%2C%0ABatman%20Earth%20One%2C%2Ccomic%2C265%2C%0ACrisis%20on%20Infinite%20Earths%2C%2Ccomic%2C258%2C%0A%22Numbers%20Behind%20Numb3rs%2C%20The%22%2C%22Devlin%2C%20Keith%22%2Cscience%2C202%2C%0ASuperman%20Earth%20One%20-%201%2C%2Ccomic%2C259%2C%0ASuperman%20Earth%20One%20-%202%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20Throne%20of%20Atlantis%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20The%20Villain\'s%20Journey%2C%2Ccomic%2C258%2C%0A%22Death%20of%20Superman%2C%20The%22%2C%2Ccomic%2C258%2C%0AHistory%20of%20the%20DC%20Universe%2C%2Ccomic%2C258%2C%0ABatman%3A%20The%20Long%20Halloween%2C%2Ccomic%2C258%2C%0A%22Life%20in%20Letters%2C%20A%22%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2C%0A%22Information%2C%20The%22%2C%22Gleick%2C%20James%22%2Cscience%2C233%2C%0A%22Journal%20of%20Economics%2C%20vol%20106%20No%203%22%2C%2Ceconomics%2C235%2C%0AElements%20of%20Information%20Theory%2C%22Thomas%2C%20Joy%22%2Cdata_science%2C229%2C%0APower%20Electronics%20-%20Rashid%2C%22Rashid%2C%20Muhammad%22%2Ccomputer_science%2C235%2C%0APower%20Electronics%20-%20Mohan%2C%22Mohan%2C%20Ned%22%2Ccomputer_science%2C237%2C%0ANeural%20Networks%2C%22Haykin%2C%20Simon%22%2Cdata_science%2C240%2C%0A%22Grapes%20of%20Wrath%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2C%0AVyakti%20ani%20Valli%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C211%2C%0AStatistical%20Learning%20Theory%2C%22Vapnik%2C%20Vladimir%22%2Cdata_science%2C228%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Tainted%20Throne%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Brothers%20at%20War%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Ruler%20of%20the%20World%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Serpent\'s%20Tooth%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Raiders%20from%20the%20North%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AMossad%2C%22Baz-Zohar%2C%20Michael%22%2Chistory%2C236%2C%0AJim%20Corbett%20Omnibus%2C%22Corbett%2C%20Jim%22%2Cnonfiction%2C223%2C%0A20000%20Leagues%20Under%20the%20Sea%2C%22Verne%2C%20Jules%22%2Cfiction%2C190%2C%0ABatatyachi%20Chal%2CDeshpande%20P%20L%2Cfiction%2C200%2C%0AHafasavnuk%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0AUrlasurla%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0APointers%20in%20C%2C%22Kanetkar%2C%20Yashwant%22%2Ccomputer_science%2C213%2C%0A%22Cathedral%20and%20the%20Bazaar%2C%20The%22%2C%22Raymond%2C%20Eric%22%2Ccomputer_science%2C217%2C%0ADesign%20with%20OpAmps%2C%22Franco%2C%20Sergio%22%2Ccomputer_science%2C240%2C%0AThink%20Complexity%2C%22Downey%2C%20Allen%22%2Cdata_science%2C230%2C%0A%22Devil\'s%20Advocate%2C%20The%22%2C%22West%2C%20Morris%22%2Cfiction%2C178%2C%0AAyn%20Rand%20Answers%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C203%2C%0APhilosophy%3A%20Who%20Needs%20It%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C171%2C%0A%22World\'s%20Great%20Thinkers%2C%20The%22%2C%2Cphilosophy%2C189%2C%0AData%20Analysis%20with%20Open%20Source%20Tools%2C%22Janert%2C%20Phillip%22%2Cdata_science%2C230%2C%0ABroca\'s%20Brain%2C%22Sagan%2C%20Carl%22%2Cscience%2C174%2C%0AMen%20of%20Mathematics%2C%22Bell%2C%20E%20T%22%2Cmathematics%2C217%2C%0AOxford%20book%20of%20Modern%20Science%20Writing%2C%22Dawkins%2C%20Richard%22%2Cscience%2C240%2C%0A%22Justice%2C%20Judiciary%20and%20Democracy%22%2C%22Ranjan%2C%20Sudhanshu%22%2Cphilosophy%2C224%2C%0A%22Arthashastra%2C%20The%22%2CKautiyla%2Cphilosophy%2C214%2C%0AWe%20the%20People%2CPalkhivala%2Cphilosophy%2C216%2C%0AWe%20the%20Nation%2CPalkhivala%2Cphilosophy%2C216%2C%0A%22Courtroom%20Genius%2C%20The%22%2CSorabjee%2Cnonfiction%2C217%2C%0ADongri%20to%20Dubai%2C%22Zaidi%2C%20Hussain%22%2Cnonfiction%2C216%2C%0A%22History%20of%20England%2C%20Foundation%22%2C%22Ackroyd%2C%20Peter%22%2Chistory%2C197%2C%0ACity%20of%20Djinns%2C%22Dalrymple%2C%20William%22%2Chistory%2C198%2C%0AIndia\'s%20Legal%20System%2CNariman%2Cnonfiction%2C177%2C%0AMore%20Tears%20to%20Cry%2C%22Sassoon%2C%20Jean%22%2Cfiction%2C235%2C%0A%22Ropemaker%2C%20The%22%2C%22Dickinson%2C%20Peter%22%2Cfiction%2C196%2C%0AAngels%20%26%20Demons%2C%22Brown%2C%20Dan%22%2Cfiction%2C170%2C%0A%22Judge%2C%20The%22%2C%2Cfiction%2C170%2C%0A%22Attorney%2C%20The%22%2C%2Cfiction%2C170%2C%0A%22Prince%2C%20The%22%2CMachiavelli%2Cphilosophy%2C173%2C%0AEyeless%20in%20Gaza%2C%22Huxley%2C%20Aldous%22%2Cfiction%2C180%2C%0ATales%20of%20Beedle%20the%20Bard%2C%22Rowling%2C%20J%20K%22%2Cfiction%2C184%2C%0AGirl%20with%20the%20Dragon%20Tattoo%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0AGirl%20who%20kicked%20the%20Hornet\'s%20Nest%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0AGirl%20who%20played%20with%20Fire%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0ABatman%20Handbook%2C%2Ccomic%2C270%2C%0AMurphy\'s%20Law%2C%2Cnonfiction%2C178%2C%0AStructure%20and%20Randomness%2C%22Tao%2C%20Terence%22%2Cmathematics%2C252%2C%0AImage%20Processing%20with%20MATLAB%2C%22Eddins%2C%20Steve%22%2Csignal_processing%2C241%2C%0AAnimal%20Farm%2C%22Orwell%2C%20George%22%2Cfiction%2C180%2C%0A%22Idiot%2C%20The%22%2C%22Dostoevsky%2C%20Fyodor%22%2Cfiction%2C197%2C%0A%22Christmas%20Carol%2C%20A%22%2C%22Dickens%2C%20Charles%22%2Cfiction%2C196%2C", "left"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move3",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8041",\
            "y": "-451",\
            "z": "59",\
            "params":\
            [\
                    ["NUM#", "x", "2172.97,3"],\
                    ["NUM#", "y", "500,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5210",\
            "y": "-158",\
            "z": "60",\
            "params":\
            [\
                    ["NUM#", "x", "20,0"],\
                    ["NUM#", "y", "10,0"]\
            ]\
            },\
            {\
            "type": "SKEW",\
            "id": "skew",\
            "name": "skew",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8314",\
            "y": "-451",\
            "z": "61",\
            "params":\
            [\
                    ["NUM#", "skewY", "-10,1"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel6",\
            "name": "seeds",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "1784",\
            "y": "-933",\
            "z": "62",\
            "width": "680.9091290631509",\
            "height": "298.7272608735842",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color9",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4123",\
            "y": "-814",\
            "z": "63",\
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
            "type": "CCNT",\
            "id": "contrast",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3936",\
            "y": "345",\
            "z": "64",\
            "params":\
            [\
                    ["NUM#", "contrast", "56.185635645223876,1"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1994",\
            "y": "-822",\
            "z": "65",\
            "params":\
            [\
                    ["NUM#", "count", "6,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3252",\
            "y": "-155",\
            "z": "66",\
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
            "type": "COND",\
            "id": "cond",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4237",\
            "y": "389",\
            "z": "67",\
            "params":\
            [\
                    ["NUM#", "operation", "5,0"],\
                    ["NUM#", "operand", "70,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1844",\
            "y": "-822",\
            "z": "68",\
            "params":\
            [\
                    ["NUM#", "seed", "8152,0"],\
                    ["NUM#", "max", "10000,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3941",\
            "y": "-1492",\
            "z": "69",\
            "params":\
            [\
                    ["NUM#", "value", "-52,0"],\
                    ["NUM#", "operand", "-100,0"]\
            ]\
            },\
            {\
            "type": "TCSV",\
            "id": "csv",\
            "name": "csv",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2673",\
            "y": "-179",\
            "z": "70"\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6785",\
            "y": "-453",\
            "z": "71",\
            "params":\
            [\
                    ["NUM#", "centerX", "0,0"],\
                    ["NUM#", "centerY", "0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "6408",\
            "y": "-458",\
            "z": "72",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4423",\
            "y": "358",\
            "z": "73",\
            "params":\
            [\
                    ["NUM#", "condition", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3031",\
            "y": "-1138",\
            "z": "74",\
            "params":\
            [\
                    ["NUM#", "seed", "1233,0"],\
                    ["NUM#", "min", "25,0"],\
                    ["NUM#", "max", "75,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3350",\
            "y": "-1278",\
            "z": "75",\
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
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7704",\
            "y": "-5",\
            "z": "76",\
            "params":\
            [\
                    ["NUM#", "add", "4.75,3"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PROB",\
            "id": "prob2",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "4327",\
            "y": "150",\
            "z": "77",\
            "params":\
            [\
                    ["NUM#", "seed", "1885,0"],\
                    ["NUM#", "chance", "45,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2934",\
            "y": "-65",\
            "z": "78",\
            "params":\
            [\
                    ["NUM#", "start", "1,0"],\
                    ["NUM#", "add", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5007",\
            "y": "-934",\
            "z": "79",\
            "params":\
            [\
                    ["NUM#", "seed", "4699,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8839",\
            "y": "441",\
            "z": "80",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "2,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine4",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8340",\
            "y": "-63",\
            "z": "81",\
            "width": "120",\
            "height": "103"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence7",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7788",\
            "y": "444",\
            "z": "82",\
            "params":\
            [\
                    ["NUM#", "add", "500,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "Book%20size%20is%20proportinal%20to%20page%20count.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2062",\
            "y": "188",\
            "z": "83",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Dataset%20taken%20from",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2063",\
            "y": "90",\
            "z": "84",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment18",\
            "name": "%3Ca%20href%3D%22https%3A%2F%2Fgist.github.com%2Fjaidevd%2F23aef12e9bf56c618c41%22%3Ehttps%3A%2F%2Fgist.github.com%2Fjaidevd%2F23aef12e9bf56c618c41%3C%2Fa%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2063",\
            "y": "136",\
            "z": "85",\
            "active": "true"\
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
            "outputNodeId": "list2",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
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
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
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
            "outputNodeId": "list2",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
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
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
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
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
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
            "outputNodeId": "freeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list2",\
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
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math6",\
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
            "outputNodeId": "list2",\
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
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
            "outputNodeId": "prob2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "bool",\
            "inputId": "h0",\
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
            "outputNodeId": "text3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "replace",\
            "inputId": "h0",\
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
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "center3",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "list2",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
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
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "8",\
            "inputNodeId": "color8",\
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
            "outputNodeId": "combine6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "skew",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
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
            "outputNodeId": "textToNum",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "math4",\
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
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "skew",\
            "inputId": "h0",\
            "list": "false"\
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
            "outputNodeId": "abs",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "cond",\
            "inputId": "h0",\
            "list": "false"\
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
            "outputNodeId": "replace",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "csv",\
            "inputId": "h0",\
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
            "outputNodeId": "list2",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
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
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence3",\
            "inputId": "add",\
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
            }\
        ]\
    }';



const presetWobbles = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SEQ",\
            "id": "sequence5",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3401.77",\
            "y": "1119.28",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "start", "100,0"],\
                    ["NUM#", "add", "-3,0"],\
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
            "x": "4007.26",\
            "y": "1485.6",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "add", "150,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3625",\
            "y": "796",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "scaleY", "13,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3775",\
            "y": "796",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "angle", "87,0"],\
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
            "x": "2129",\
            "y": "512",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "angle", "315,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4404",\
            "y": "1668",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1111",\
            "y": "1736",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "seed", "5019,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1359",\
            "y": "510",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "y", "175,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2663",\
            "y": "731",\
            "z": "8",\
            "width": "1491",\
            "height": "693.5517174805657",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3475",\
            "y": "796",\
            "z": "9",\
            "params":\
            [\
                    ["LIST#", "points", "8 PT# 200,0 175,0 PT# 200,0 175,0 PT# 200,0 175,0 PT# 200,0 175,0 PT# 200,0 175,0 PT# 200,0 175,0 PT# 200,0 175,0 PT# 200,0 175,0"],\
                    ["NUM#", "closed", "1,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2207",\
            "y": "882",\
            "z": "10",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4202",\
            "y": "1189",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "x", "600,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3946",\
            "y": "1190",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "count", "30,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3727.08",\
            "y": "1244",\
            "z": "13",\
            "width": "105.92167250469313",\
            "height": "77"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2781",\
            "y": "989",\
            "z": "14",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "205,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "85.09803921568627,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3402",\
            "y": "1259",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "seed", "9763,0"],\
                    ["NUM#", "min", "-5,0"],\
                    ["NUM#", "max", "5,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4099",\
            "y": "1723",\
            "z": "16",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3237",\
            "y": "934",\
            "z": "17",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 0,0 127,0 217,0 42,0 7,0"],\
                    ["NUM#", "weight", "4,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2734",\
            "y": "1235",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "start", "100,0"],\
                    ["NUM#", "add", "-2,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2378",\
            "y": "821",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "count", "8,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence6",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3619",\
            "y": "1036",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "add", "3,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "1237.1",\
            "y": "418",\
            "z": "21",\
            "width": "1333.9016219584505",\
            "height": "678",\
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
            "x": "3040",\
            "y": "961",\
            "z": "22",\
            "params":\
            [\
                    ["COL#", "color", "1,0 0,0 127,0 217,0"],\
                    ["NUM#", "opacity", "42,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1836",\
            "y": "863",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1404",\
            "y": "869",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "seed", "21,0"],\
                    ["NUM#", "min", "101,0"],\
                    ["NUM#", "max", "150,0"],\
                    ["NUM#", "offset", "2.9000000000000004,1"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1730",\
            "y": "509",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "x", "133.10369816906348,0"],\
                    ["NUM#", "affectSpace", "0,0"],\
                    ["NUM#", "showCenter", "1,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "2458",\
            "y": "1719",\
            "z": "26",\
            "params":\
            [\
                    ["NUM#", "start", "120,0"],\
                    ["NUM#", "add", "13,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1150",\
            "y": "1229",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "add", "0.1,1"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4674",\
            "y": "1573",\
            "z": "28",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "1010,0"],\
                    ["NUM#", "height", "360,0"],\
                    ["NUM#", "round", "40,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4513",\
            "y": "1831",\
            "z": "29",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "y", "0,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4306",\
            "y": "1820",\
            "z": "30",\
            "active": "true",\
            "params":\
            [\
                    ["COL#", "color", "1,0 122,0 140,0 223,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill3",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4305",\
            "y": "1954",\
            "z": "31",\
            "active": "true",\
            "params":\
            [\
                    ["COL#", "color", "1,0 51,0 51,0 51,0"]\
            ]\
            },\
            {\
            "type": "DEFINE",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2185",\
            "y": "1434",\
            "z": "32",\
            "active": "true"\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1945",\
            "y": "1367",\
            "z": "33",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "100,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1946",\
            "y": "1437",\
            "z": "34",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "50,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1948",\
            "y": "1502",\
            "z": "35",\
            "active": "true",\
            "width": "120",\
            "height": "54"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence5",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "angle",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
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
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine3",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
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
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence6",\
            "inputId": "add",\
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
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "opacity",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "offset",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
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
            "outputNodeId": "fill3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "define",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "define",\
            "inputId": "h4",\
            "list": "false"\
            }\
        ]\
    }';



const presetRandomAbstract = '\
    {\
        "nodes":\
        [\
            {\
            "type": "NOISE",\
            "id": "noise9",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "466",\
            "y": "-124",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "seed", "499,0"],\
                    ["NUM#", "max", "100,0"],\
                    ["NUM#", "scale", "3,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1001",\
            "y": "-122",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "round", "42.80495095144383,0"],\
                    ["NUM#", "bias", "-13.905499986861685,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "99",\
            "y": "662",\
            "z": "2",\
            "width": "131",\
            "height": "472",\
            "params":\
            [\
                    ["NUM#", "0", "1761,0"],\
                    ["NUM#", "1", "1228,0"],\
                    ["NUM#", "2", "4661,0"],\
                    ["NUM#", "3", "3646,0"],\
                    ["NUM#", "4", "3528,0"],\
                    ["NUM#", "5", "3136,0"],\
                    ["NUM#", "6", "4528,0"],\
                    ["NUM#", "7", "4883,0"],\
                    ["NUM#", "8", "3321,0"],\
                    ["NUM#", "9", "647,0"],\
                    ["NUM#", "10", "707,0"],\
                    ["NUM#", "11", "1566,0"],\
                    ["NUM#", "12", "2713,0"],\
                    ["NUM#", "13", "4333,0"],\
                    ["NUM#", "14", "1310,0"],\
                    ["NUM#", "15", "499,0"],\
                    ["NUM#", "16", "2210,0"],\
                    ["NUM#", "17", "2158,0"],\
                    ["NUM#", "18", "3553,0"],\
                    ["NUM#", "19", "2912,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-51",\
            "y": "662",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random8",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "-201",\
            "y": "662",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "9129,0"],\
                    ["NUM#", "max", "4999,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1358",\
            "y": "579",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "seed", "3136,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1695",\
            "y": "726",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "seed", "4883,0"],\
                    ["NUM#", "min", "-300,0"],\
                    ["NUM#", "max", "1400,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1892",\
            "y": "1184",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "seed", "2713,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2364",\
            "y": "207",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "count", "50,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise8",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "507",\
            "y": "-369",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "seed", "1310,0"],\
                    ["NUM#", "max", "50,0"],\
                    ["NUM#", "scale", "12,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise6",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1870",\
            "y": "739",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "seed", "647,0"],\
                    ["NUM#", "max", "2000,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "1128",\
            "y": "318",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "seed", "3646,0"],\
                    ["NUM#", "scale", "20,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise12",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "614",\
            "y": "251",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "seed", "2158,0"],\
                    ["NUM#", "min", "-100,0"],\
                    ["NUM#", "max", "100,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise11",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "758",\
            "y": "-48",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "seed", "2912,0"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "5,0"],\
                    ["NUM#", "offset", "0.1,1"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1687",\
            "y": "548",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "4528,0"],\
                    ["NUM#", "max", "1920,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise7",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2139",\
            "y": "443",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "seed", "707,0"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise10",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "754",\
            "y": "-252",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "seed", "3553,0"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "3,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "856",\
            "y": "315",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "seed", "1228,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1879",\
            "y": "109",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "x", "712,0"],\
                    ["NUM#", "y", "865,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2550",\
            "y": "197",\
            "z": "19",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "1440,0"],\
                    ["NUM#", "height", "1600,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect2",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1001",\
            "y": "-534",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "round", "42.80495095144383,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "601",\
            "y": "117",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "seed", "2210,0"],\
                    ["NUM#", "max", "8,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1155",\
            "y": "560",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "seed", "3528,0"],\
                    ["NUM#", "max", "100,0"],\
                    ["NUM#", "scale", "5,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2088",\
            "y": "1171",\
            "z": "23",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "205,0"],\
                    ["NUM#", "c2", "158,0"],\
                    ["NUM#", "c3", "27,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1331",\
            "y": "379",\
            "z": "24",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "187.0010511027654,0"],\
                    ["NUM#", "c2", "79.92356821426604,0"],\
                    ["NUM#", "c3", "39.0349836777613,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1504",\
            "y": "353",\
            "z": "25",\
            "params":\
            [\
                    ["COL#", "color", "1,0 187,0 80,0 39,0"],\
                    ["NUM#", "opacity", "83.06592158693132,0"],\
                    ["NUM#", "blend", "5,0"]\
            ]\
            },\
            {\
            "type": "APPLY",\
            "id": "apply",\
            "name": "apply",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1703",\
            "y": "-202",\
            "z": "26",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1510",\
            "y": "-210",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "index", "2,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "993",\
            "y": "317",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "seed", "4661,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1311",\
            "y": "-231",\
            "z": "29",\
            "width": "120",\
            "height": "77"\
            },\
            {\
            "type": "RAND",\
            "id": "random11",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1899",\
            "y": "1325",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "seed", "4333,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2179",\
            "y": "110",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "angle", "180.36801470870378,0"]\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1000",\
            "y": "84",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "round", "42.80495095144383,0"],\
                    ["NUM#", "corners", "4,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "-248",\
            "y": "620",\
            "z": "33",\
            "active": "true",\
            "width": "522",\
            "height": "568.8684207118664",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random9",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1897",\
            "y": "1049",\
            "z": "34",\
            "params":\
            [\
                    ["NUM#", "seed", "1566,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1291",\
            "y": "-70",\
            "z": "35",\
            "params":\
            [\
                    ["NUM#", "seed", "1761,0"],\
                    ["NUM#", "max", "3,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise5",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1870",\
            "y": "526",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "seed", "3321,0"],\
                    ["NUM#", "max", "2000,0"],\
                    ["NUM#", "scale", "10,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2029",\
            "y": "110",\
            "z": "37",\
            "params":\
            [\
                    ["NUM#", "scaleX", "228.438025647921,0"],\
                    ["NUM#", "scaleY", "339.70445880226134,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1002",\
            "y": "-351",\
            "z": "38",\
            "params":\
            [\
                    ["NUM#", "inner", "83.66618088151625,0"],\
                    ["NUM#", "from", "143.4829042914705,0"],\
                    ["NUM#", "to", "163.371140908702,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "list",\
            "outputId": "15",\
            "outputOrder": "2",\
            "inputNodeId": "noise9",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise12",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "bias",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "2",\
            "inputNodeId": "random7",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "7",\
            "outputOrder": "2",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "12",\
            "outputOrder": "2",\
            "inputNodeId": "random10",\
            "inputId": "seed",\
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
            "outputNodeId": "list",\
            "outputId": "14",\
            "outputOrder": "2",\
            "inputNodeId": "noise8",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "9",\
            "outputOrder": "2",\
            "inputNodeId": "noise6",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "2",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "17",\
            "outputOrder": "2",\
            "inputNodeId": "noise12",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "19",\
            "outputOrder": "2",\
            "inputNodeId": "noise11",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "2",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "10",\
            "outputOrder": "2",\
            "inputNodeId": "noise7",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "18",\
            "outputOrder": "2",\
            "inputNodeId": "noise10",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "2",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "apply",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise8",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "rect2",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "16",\
            "outputOrder": "2",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "2",\
            "inputNodeId": "noise4",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "opacity",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "blend",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply",\
            "inputId": "props",\
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
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "2",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
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
            "outputNodeId": "trapeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "13",\
            "outputOrder": "2",\
            "inputNodeId": "random11",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "noise7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise8",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "poly",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "poly",\
            "inputId": "corners",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "11",\
            "outputOrder": "2",\
            "inputNodeId": "random9",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "2",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "8",\
            "outputOrder": "2",\
            "inputNodeId": "noise5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "noise5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "inner",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "from",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "to",\
            "list": "false"\
            }\
        ]\
    }';



const presetNamesLogos = '\
    {\
        "nodes":\
        [\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "TEXT",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "101",\
            "y": "1095",\
            "z": "0",\
            "active": "true",\
            "width": "2144.652440864147",\
            "height": "1382.3651641322876",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6499.83",\
            "y": "1279",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "size", "80,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random24",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6100.83",\
            "y": "1280",\
            "z": "2",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "243,0"],\
                    ["NUM#", "min", "50,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move3",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5266.17",\
            "y": "845",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "x", "100,0"],\
                    ["NUM#", "y", "100,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5107.17",\
            "y": "684",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4904.17",\
            "y": "590",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "x", "720,0"],\
                    ["NUM#", "y", "720,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat5",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2378",\
            "y": "-68",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "count", "2,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1869",\
            "y": "-68",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "x", "-6,0"],\
                    ["NUM#", "y", "-11,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "970",\
            "y": "-792",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "inner", "64,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random19",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "227",\
            "y": "-300",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "seed", "103,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random20",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "227",\
            "y": "-155",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "seed", "154,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random21",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "227",\
            "y": "-7",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "seed", "238,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random11",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "678",\
            "y": "-341",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "seed", "119,0"],\
                    ["NUM#", "max", "50,0"]\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "959",\
            "y": "163",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "corners", "8,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "663",\
            "y": "268",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "204,0"],\
                    ["NUM#", "min", "3,0"],\
                    ["NUM#", "max", "8,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1255",\
            "y": "85",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "seed", "110,0"],\
                    ["NUM#", "max", "3,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3304.95",\
            "y": "453",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "angle", "183,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random9",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3004.95",\
            "y": "708",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "seed", "157,0"],\
                    ["NUM#", "min", "-50,0"],\
                    ["NUM#", "max", "50,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random12",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3198.95",\
            "y": "716",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "seed", "203,0"],\
                    ["NUM#", "max", "360,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1979",\
            "y": "1410",\
            "z": "19",\
            "params":\
            [\
                    ["TEXT#", "text", "JEHOGE", "center"],\
                    ["NUM#", "x", "-100,0"],\
                    ["NUM#", "y", "45,0"],\
                    ["NUM#", "width", "300,0"],\
                    ["NUM#", "height", "29,0"],\
                    ["TEXT#", "font", "Microsoft%20YaHei"],\
                    ["NUM#", "size", "29,0"],\
                    ["NUM#", "alignH", "1,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1722",\
            "y": "1474",\
            "z": "20",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "300,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1599",\
            "y": "1996",\
            "z": "21",\
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
            "type": "REPT",\
            "id": "repeat",\
            "name": "syllables%20in%20word",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1270",\
            "y": "1427",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "count", "3,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select3",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "837",\
            "y": "1302",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "index", "4,0"]\
            ]\
            },\
            {\
            "type": "TSPLT",\
            "id": "split",\
            "name": "split",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "461",\
            "y": "1275",\
            "z": "24",\
            "params":\
            [\
                    ["LIST#", "value", "20 TEXT# B TEXT# C TEXT# D TEXT# F TEXT# G TEXT# H TEXT# J TEXT# K TEXT# L TEXT# M TEXT# N TEXT# P TEXT# Q TEXT# R TEXT# S TEXT# T TEXT# V TEXT# W TEXT# X TEXT# Z"]\
            ]\
            },\
            {\
            "type": "TSPLT",\
            "id": "split2",\
            "name": "split",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "461",\
            "y": "1403",\
            "z": "25",\
            "params":\
            [\
                    ["LIST#", "value", "6 TEXT# A TEXT# E TEXT# I TEXT# O TEXT# U TEXT# Y"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text2",\
            "name": "vowels",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "288",\
            "y": "1403",\
            "z": "26",\
            "width": "141.22003193114557",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "AEIOUY", "center"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4698.17",\
            "y": "686",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "add", "180,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4701.17",\
            "y": "840",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "add", "180,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "-1240",\
            "y": "558",\
            "z": "29",\
            "params":\
            [\
                    ["NUM#", "seed", "2615,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "SHAPES",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "116",\
            "y": "-973",\
            "z": "30",\
            "active": "true",\
            "width": "2521.6900494808324",\
            "height": "1539.1624426742724",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6280.83",\
            "y": "1228",\
            "z": "31",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "287,0"],\
                    ["NUM#", "c2", "53,0"],\
                    ["NUM#", "c3", "69,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random14",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3595.95",\
            "y": "751",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "seed", "197,0"],\
                    ["NUM#", "min", "50,0"],\
                    ["NUM#", "max", "150,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6278.83",\
            "y": "1382",\
            "z": "33",\
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
            "type": "RAND",\
            "id": "random13",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3592.95",\
            "y": "617",\
            "z": "34",\
            "params":\
            [\
                    ["NUM#", "seed", "21,0"],\
                    ["NUM#", "min", "50,0"],\
                    ["NUM#", "max", "150,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "682",\
            "y": "1666",\
            "z": "35",\
            "params":\
            [\
                    ["NUM#", "seed", "237,0"],\
                    ["NUM#", "max", "5,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "random%20logos",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6740",\
            "y": "708",\
            "z": "36",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "1040,0"],\
                    ["NUM#", "height", "1040,0"],\
                    ["NUM#", "round", "80,0"]\
            ]\
            },\
            {\
            "type": "COUNT",\
            "id": "count",\
            "name": "count",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "481",\
            "y": "1569",\
            "z": "37",\
            "params":\
            [\
                    ["NUM#", "value", "19,0"],\
                    ["NUM#", "start", "0,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-940",\
            "y": "558",\
            "z": "38",\
            "width": "120",\
            "height": "582",\
            "params":\
            [\
                    ["NUM#", "0", "172,0"],\
                    ["NUM#", "1", "237,0"],\
                    ["NUM#", "2", "73,0"],\
                    ["NUM#", "3", "56,0"],\
                    ["NUM#", "4", "21,0"],\
                    ["NUM#", "5", "108,0"],\
                    ["NUM#", "6", "31,0"],\
                    ["NUM#", "7", "13,0"],\
                    ["NUM#", "8", "53,0"],\
                    ["NUM#", "9", "172,0"],\
                    ["NUM#", "10", "84,0"],\
                    ["NUM#", "11", "70,0"],\
                    ["NUM#", "12", "65,0"],\
                    ["NUM#", "13", "153,0"],\
                    ["NUM#", "14", "224,0"],\
                    ["NUM#", "15", "152,0"],\
                    ["NUM#", "16", "123,0"],\
                    ["NUM#", "17", "74,0"],\
                    ["NUM#", "18", "182,0"],\
                    ["NUM#", "19", "84,0"],\
                    ["NUM#", "20", "39,0"],\
                    ["NUM#", "21", "155,0"],\
                    ["NUM#", "22", "10,0"],\
                    ["NUM#", "23", "243,0"],\
                    ["NUM#", "24", "101,0"]\
            ]\
            },\
            {\
            "type": "TJOIN",\
            "id": "join2",\
            "name": "join%20as%20text",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1433",\
            "y": "1431",\
            "z": "39",\
            "width": "120",\
            "height": "59.9999844390567",\
            "params":\
            [\
                    ["TEXT#", "value", "JEHOGE", "center"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "963",\
            "y": "-418",\
            "z": "40",\
            "params":\
            [\
                    ["NUM#", "y", "25,0"],\
                    ["NUM#", "height", "50,0"],\
                    ["NUM#", "round", "46,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random23",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6098.83",\
            "y": "1145",\
            "z": "41",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "10,0"],\
                    ["NUM#", "max", "360,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1008",\
            "y": "1544",\
            "z": "42",\
            "params":\
            [\
                    ["NUM#", "seed", "64,0"],\
                    ["NUM#", "min", "2,0"],\
                    ["NUM#", "max", "4,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3007.95",\
            "y": "842",\
            "z": "43",\
            "params":\
            [\
                    ["NUM#", "seed", "82,0"],\
                    ["NUM#", "min", "-50,0"],\
                    ["NUM#", "max", "50,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1421",\
            "y": "-75",\
            "z": "44",\
            "params":\
            [\
                    ["NUM#", "index", "2,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random17",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1523",\
            "y": "1534",\
            "z": "45",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"],\
                    ["NUM#", "min", "15,0"],\
                    ["NUM#", "max", "35,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1599",\
            "y": "1897",\
            "z": "46",\
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
            "type": "RAND",\
            "id": "random25",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6098.83",\
            "y": "1417",\
            "z": "47",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "101,0"],\
                    ["NUM#", "min", "50,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3494.95",\
            "y": "359",\
            "z": "48",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "TJOIN",\
            "id": "join",\
            "name": "syllable",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "1009",\
            "y": "1370",\
            "z": "49",\
            "width": "120",\
            "height": "72.9999952221861",\
            "params":\
            [\
                    ["TEXT#", "value", "GE", "center"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse2",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1764",\
            "y": "1946",\
            "z": "50",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "SEEDS",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "-1325",\
            "y": "484",\
            "z": "51",\
            "width": "545.623045846669",\
            "height": "688",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3747.95",\
            "y": "354",\
            "z": "52",\
            "params":\
            [\
                    ["NUM#", "scaleX", "133,0"],\
                    ["NUM#", "scaleY", "58,0"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text3",\
            "name": "consonants",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "289",\
            "y": "1275",\
            "z": "53",\
            "width": "141.22003193114557",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "BCDFGHJKLMNPQRSTVWXZ", "center"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "682",\
            "y": "1525",\
            "z": "54",\
            "params":\
            [\
                    ["NUM#", "seed", "172,0"],\
                    ["NUM#", "max", "19,0"]\
            ]\
            },\
            {\
            "type": "COND",\
            "id": "cond",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1448",\
            "y": "2236",\
            "z": "55",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "70,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random16",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1606",\
            "y": "379",\
            "z": "56",\
            "params":\
            [\
                    ["NUM#", "seed", "29,0"],\
                    ["NUM#", "min", "-20,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            },\
            {\
            "type": "COUNT",\
            "id": "count2",\
            "name": "count",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "483",\
            "y": "1711",\
            "z": "57",\
            "params":\
            [\
                    ["NUM#", "value", "5,0"],\
                    ["NUM#", "start", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random22",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2167",\
            "y": "0",\
            "z": "58",\
            "params":\
            [\
                    ["NUM#", "seed", "157,0"],\
                    ["NUM#", "max", "4,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat4",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5116.17",\
            "y": "845",\
            "z": "59",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1722",\
            "y": "1539",\
            "z": "60",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "29,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "657",\
            "y": "117",\
            "z": "61",\
            "params":\
            [\
                    ["NUM#", "seed", "173,0"],\
                    ["NUM#", "min", "-100,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-1090",\
            "y": "558",\
            "z": "62",\
            "params":\
            [\
                    ["NUM#", "count", "25,0"]\
            ]\
            },\
            {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3400.95",\
            "y": "704",\
            "z": "63",\
            "params":\
            [\
                    ["NUM#", "seed", "9807,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "453",\
            "y": "-141",\
            "z": "64",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "192,0"],\
                    ["NUM#", "c2", "165,0"],\
                    ["NUM#", "c3", "135,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random8",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "656",\
            "y": "-640",\
            "z": "65",\
            "params":\
            [\
                    ["NUM#", "seed", "229,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select2",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "837",\
            "y": "1430",\
            "z": "66",\
            "params":\
            [\
                    ["NUM#", "index", "1,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1243",\
            "y": "-96",\
            "z": "67",\
            "width": "120.06478332057225",\
            "height": "77"\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "967",\
            "y": "-130",\
            "z": "68",\
            "params":\
            [\
                    ["NUM#", "bias", "-44,0"]\
            ]\
            },\
            {\
            "type": "SKEW",\
            "id": "skew",\
            "name": "skew",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3142.95",\
            "y": "455",\
            "z": "69",\
            "params":\
            [\
                    ["NUM#", "skewX", "1,0"],\
                    ["NUM#", "skewY", "37,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random18",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1520",\
            "y": "1680",\
            "z": "70",\
            "params":\
            [\
                    ["NUM#", "seed", "74,0"],\
                    ["NUM#", "max", "1525,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3947.95",\
            "y": "583",\
            "z": "71",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "RAND",\
            "id": "random15",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1603",\
            "y": "245",\
            "z": "72",\
            "params":\
            [\
                    ["NUM#", "seed", "105,0"],\
                    ["NUM#", "min", "-20,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1275",\
            "y": "2143",\
            "z": "73",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "69.83397579534783,0"],\
                    ["NUM#", "c2", "7.058445966677505,0"],\
                    ["NUM#", "c3", "73.8022140577134,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "23",\
            "outputOrder": "0",\
            "inputNodeId": "random24",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat3",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random22",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat5",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random15",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random16",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "inner",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "18",\
            "outputOrder": "0",\
            "inputNodeId": "random19",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "19",\
            "outputOrder": "0",\
            "inputNodeId": "random20",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "20",\
            "outputOrder": "0",\
            "inputNodeId": "random21",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "0",\
            "inputNodeId": "random11",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "poly",\
            "inputId": "corners",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "14",\
            "outputOrder": "0",\
            "inputNodeId": "random7",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "skew",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random12",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "8",\
            "outputOrder": "0",\
            "inputNodeId": "random9",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "10",\
            "outputOrder": "0",\
            "inputNodeId": "random12",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "join2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "text",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
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
            "outputNodeId": "random18",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "font",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "text",\
            "inputId": "size",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "join",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "split",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "select3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select3",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "split",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "split2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random23",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random24",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random25",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "12",\
            "outputOrder": "0",\
            "inputNodeId": "random14",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "11",\
            "outputOrder": "0",\
            "inputNodeId": "random13",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "count2",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "split",\
            "outputId": "value",\
            "outputOrder": "1",\
            "inputNodeId": "count",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "22",\
            "outputOrder": "0",\
            "inputNodeId": "random23",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "9",\
            "outputOrder": "0",\
            "inputNodeId": "random10",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "16",\
            "outputOrder": "0",\
            "inputNodeId": "random17",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "24",\
            "outputOrder": "0",\
            "inputNodeId": "random25",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "prob",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "condition",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "cond",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "condition",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random13",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random14",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "count",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "cond",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "7",\
            "outputOrder": "0",\
            "inputNodeId": "random16",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "split2",\
            "outputId": "value",\
            "outputOrder": "1",\
            "inputNodeId": "count2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "21",\
            "outputOrder": "0",\
            "inputNodeId": "random22",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat4",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random17",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "num2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "13",\
            "outputOrder": "0",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "15",\
            "outputOrder": "0",\
            "inputNodeId": "prob",\
            "inputId": "chance",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random19",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random20",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random21",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "random8",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "split2",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "select2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select2",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "bias",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "trapeze",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "skew",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "skew",\
            "inputId": "skewX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "skew",\
            "inputId": "skewY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "17",\
            "outputOrder": "0",\
            "inputNodeId": "random18",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "0",\
            "inputNodeId": "random15",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "4",\
            "inputNodeId": "color4",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';
    


const presetAfterTheStorm = '\
    {\
        "nodes":\
        [\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "467",\
            "y": "293",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-138",\
            "y": "606",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "start", "220,0"],\
                    ["NUM#", "add", "-11,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-380",\
            "y": "546",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "start", "5,0"],\
                    ["NUM#", "add", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-143",\
            "y": "335",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "9271,0"],\
                    ["NUM#", "max", "11.5,1"],\
                    ["NUM#", "scale", "24,0"],\
                    ["NUM#", "offset", "3.7000000000000015,1"],\
                    ["NUM#", "detail", "10,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "628",\
            "y": "146",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "angle", "358.8,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "968",\
            "y": "534",\
            "z": "5",\
            "width": "120",\
            "height": "77"\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "286",\
            "y": "146",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "x", "18.849291214091316,1"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "96",\
            "y": "324",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "value", "18.849291214091316,1"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-13",\
            "y": "146",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "x", "75,0"],\
                    ["NUM#", "y", "125,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1147",\
            "y": "476",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "792",\
            "y": "218",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "count", "300,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-377",\
            "y": "430",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "start", "40,0"],\
                    ["NUM#", "add", "-1.5,1"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "959",\
            "y": "192",\
            "z": "12",\
            "params":\
            [\
                    ["LIST#", "points", "300 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0 PT# 75,0 125,0"],\
                    ["NUM#", "closed", "1,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "42",\
            "y": "575",\
            "z": "13",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "86,0"],\
                    ["NUM#", "c2", "99,0"],\
                    ["NUM#", "c3", "179,0"]\
            ]\
            },\
            {\
            "type": "DEFINE",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "207",\
            "y": "742",\
            "z": "14"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "41",\
            "y": "699",\
            "z": "15",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "171,0"],\
                    ["NUM#", "c2", "85,0"],\
                    ["NUM#", "c3", "162,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "37",\
            "y": "965",\
            "z": "16",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "236,0"],\
                    ["NUM#", "c2", "203,0"],\
                    ["NUM#", "c3", "56,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "38",\
            "y": "853",\
            "z": "17",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "170,0"],\
                    ["NUM#", "c2", "209,0"],\
                    ["NUM#", "c3", "62,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "701",\
            "y": "1022",\
            "z": "18",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "517",\
            "y": "1192",\
            "z": "19",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 244,0 214,0 37,0 100,0 7,0"],\
                    ["NUM#", "weight", "0.5,1"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "208",\
            "y": "1198",\
            "z": "20",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "244,0"],\
                    ["NUM#", "c2", "214,0"],\
                    ["NUM#", "c3", "37,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1452",\
            "y": "337",\
            "z": "21",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "200,0"],\
                    ["NUM#", "height", "300,0"],\
                    ["NUM#", "round", "5,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1234",\
            "y": "702",\
            "z": "22",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "57,0"],\
                    ["NUM#", "c2", "93,0"],\
                    ["NUM#", "c3", "160,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "365",\
            "y": "742",\
            "z": "23",\
            "params":\
            [\
                    ["COL#", "color", "1,0 236,0 203,0 56,0"],\
                    ["NUM#", "blend", "14,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "359",\
            "y": "1196",\
            "z": "24",\
            "params":\
            [\
                    ["COL#", "color", "1,0 244,0 214,0 37,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "542",\
            "y": "786",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "angle", "185,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color7",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "366",\
            "y": "852",\
            "z": "26",\
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
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "215",\
            "y": "1025",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "seed", "1214,0"],\
                    ["NUM#", "max", "360,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "scale",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "angle",\
            "list": "false"\
            }\
        ]\
    }';



const presetSunsetDreams = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-695",\
            "y": "1859",\
            "z": "0",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "17,0"],\
                    ["NUM#", "c2", "77,0"],\
                    ["NUM#", "c3", "53,0"]\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1044",\
            "y": "258",\
            "z": "1",\
            "params":\
            [\
                    ["LIST#", "points", "300 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0"],\
                    ["NUM#", "closed", "1,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-1964",\
            "y": "529",\
            "z": "2",\
            "active": "true",\
            "width": "655",\
            "height": "578.1433539931897",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "37",\
            "y": "196",\
            "z": "3"\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "592",\
            "y": "836",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "angle", "90,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1145",\
            "y": "540",\
            "z": "5",\
            "width": "120",\
            "height": "129"\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze2",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-395",\
            "y": "1859",\
            "z": "6"\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "594",\
            "y": "1385",\
            "z": "7",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 92,0 181,0 128,0 66,0 7,0"],\
                    ["NUM#", "weight", "0.3911765540679002,1"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "439",\
            "y": "353",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1390",\
            "y": "519",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "-1920",\
            "y": "596",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "seed", "2663,0"],\
                    ["NUM#", "max", "10000,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-908",\
            "y": "2024",\
            "z": "11",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "5920,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-1468",\
            "y": "596",\
            "z": "12",\
            "width": "120",\
            "height": "472",\
            "params":\
            [\
                    ["NUM#", "0", "5200,0"],\
                    ["NUM#", "1", "3864,0"],\
                    ["NUM#", "2", "2143,0"],\
                    ["NUM#", "3", "1690,0"],\
                    ["NUM#", "4", "5638,0"],\
                    ["NUM#", "5", "7851,0"],\
                    ["NUM#", "6", "5354,0"],\
                    ["NUM#", "7", "4101,0"],\
                    ["NUM#", "8", "9409,0"],\
                    ["NUM#", "9", "3456,0"],\
                    ["NUM#", "10", "8574,0"],\
                    ["NUM#", "11", "2564,0"],\
                    ["NUM#", "12", "5920,0"],\
                    ["NUM#", "13", "5193,0"],\
                    ["NUM#", "14", "9274,0"],\
                    ["NUM#", "15", "8689,0"],\
                    ["NUM#", "16", "3683,0"],\
                    ["NUM#", "17", "3624,0"],\
                    ["NUM#", "18", "4994,0"],\
                    ["NUM#", "19", "1697,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-84",\
            "y": "599",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "start", "220,0"],\
                    ["NUM#", "add", "-11,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random8",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "971",\
            "y": "1128",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "3456,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "845",\
            "y": "285",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "count", "300,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "976",\
            "y": "830",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "seed", "4101,0"]\
            ]\
            },\
            {\
            "type": "DEFINE",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-123",\
            "y": "1861",\
            "z": "17"\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "265",\
            "y": "1075",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "seed", "5354,0"],\
                    ["NUM#", "max", "360,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-903",\
            "y": "1722",\
            "z": "19",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "8574,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "782",\
            "y": "923",\
            "z": "20",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "146",\
            "y": "374",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "value", "11.885797457419585,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-320",\
            "y": "557",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "start", "31,0"],\
                    ["NUM#", "add", "-0.1,1"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "415",\
            "y": "792",\
            "z": "23",\
            "params":\
            [\
                    ["COL#", "color", "1,0 17,0 77,0 53,0"],\
                    ["NUM#", "blend", "14,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1227",\
            "y": "908",\
            "z": "24",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "242,0"],\
                    ["NUM#", "c2", "24,0"],\
                    ["NUM#", "c3", "72,0"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-1620",\
            "y": "596",\
            "z": "25"\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "painting",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1618",\
            "y": "382",\
            "z": "26",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "200,0"],\
                    ["NUM#", "height", "300,0"],\
                    ["NUM#", "round", "5,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-1770",\
            "y": "596",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "974",\
            "y": "983",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "seed", "9409,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "654",\
            "y": "198",\
            "z": "29",\
            "params":\
            [\
                    ["NUM#", "angle", "358.8,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1194",\
            "y": "258",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "x", "180.6959201406175,0"],\
                    ["NUM#", "y", "147.39799819186447,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "391",\
            "y": "1411",\
            "z": "31",\
            "params":\
            [\
                    ["COL#", "color", "1,0 92,0 181,0 128,0"],\
                    ["NUM#", "opacity", "66,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat4",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-545",\
            "y": "1859",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "count", "4,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random9",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-909",\
            "y": "1865",\
            "z": "33",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "2564,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color7",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "416",\
            "y": "902",\
            "z": "34",\
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
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "336",\
            "y": "196",\
            "z": "35",\
            "params":\
            [\
                    ["NUM#", "x", "11.885797457419585,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-85",\
            "y": "346",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "seed", "5200,0"],\
                    ["NUM#", "max", "3,0"],\
                    ["NUM#", "scale", "29.1,1"],\
                    ["NUM#", "offset", "3.7000000000000015,1"],\
                    ["NUM#", "detail", "10,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-319",\
            "y": "441",\
            "z": "37",\
            "params":\
            [\
                    ["NUM#", "start", "60,0"],\
                    ["NUM#", "add", "-3,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "790",\
            "y": "464",\
            "z": "38",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "5638,0"],\
                    ["NUM#", "scale", "5,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "789",\
            "y": "664",\
            "z": "39",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "7851,0"],\
                    ["NUM#", "scale", "7,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "579",\
            "y": "516",\
            "z": "40",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "5193,0"],\
                    ["NUM#", "min", "2,0"],\
                    ["NUM#", "max", "10,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "578",\
            "y": "659",\
            "z": "41",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "9274,0"],\
                    ["NUM#", "min", "4,0"],\
                    ["NUM#", "max", "10,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "225",\
            "y": "1440",\
            "z": "42",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "92,0"],\
                    ["NUM#", "c2", "181,0"],\
                    ["NUM#", "c3", "128,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random11",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "12",\
            "y": "1605",\
            "z": "43",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "3624,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random12",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "17",\
            "y": "1303",\
            "z": "44",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "8689,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random13",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "11",\
            "y": "1446",\
            "z": "45",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "3683,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random14",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "225",\
            "y": "1591",\
            "z": "46",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "4994,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random15",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-769",\
            "y": "615",\
            "z": "47",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "3864,0"],\
                    ["NUM#", "min", "10,0"],\
                    ["NUM#", "max", "40,0"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze3",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-619",\
            "y": "615",\
            "z": "48"\
            },\
            {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "439",\
            "y": "1662",\
            "z": "49",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "1690,0"],\
                    ["NUM#", "max", "0.5,1"],\
                    ["NUM#", "scale", "116,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random17",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "87",\
            "y": "1963",\
            "z": "50",\
            "params":\
            [\
                    ["NUM#", "seed", "1697,0"],\
                    ["NUM#", "min", "1,0"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze4",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "237",\
            "y": "1963",\
            "z": "51",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h4",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h5",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h6",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h7",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "weight",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "12",\
            "outputOrder": "0",\
            "inputNodeId": "random10",\
            "inputId": "seed",\
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
            "outputNodeId": "list",\
            "outputId": "9",\
            "outputOrder": "0",\
            "inputNodeId": "random8",\
            "inputId": "seed",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "7",\
            "outputOrder": "0",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "freeze2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "10",\
            "outputOrder": "0",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "freeze3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence3",\
            "inputId": "start",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color6",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color6",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color6",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "8",\
            "outputOrder": "0",\
            "inputNodeId": "random7",\
            "inputId": "seed",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random14",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "opacity",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "11",\
            "outputOrder": "0",\
            "inputNodeId": "random9",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "scale",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise2",\
            "inputId": "scale",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "0",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise3",\
            "inputId": "scale",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "13",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "14",\
            "outputOrder": "0",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random12",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random13",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "17",\
            "outputOrder": "0",\
            "inputNodeId": "random11",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "15",\
            "outputOrder": "0",\
            "inputNodeId": "random12",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "16",\
            "outputOrder": "0",\
            "inputNodeId": "random13",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "18",\
            "outputOrder": "0",\
            "inputNodeId": "random14",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random15",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random15",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "noise4",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "freeze4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise4",\
            "inputId": "scale",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "19",\
            "outputOrder": "0",\
            "inputNodeId": "random17",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random17",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze4",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';



const presetAvatars = '\
    {\
        "nodes":\
        [\
            {\
            "type": "TRPZ",\
            "id": "trapeze6",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1861",\
            "y": "4244",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "y", "4,0"],\
                    ["NUM#", "round", "16,0"],\
                    ["NUM#", "bias", "-9,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze5",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1724",\
            "y": "10538",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "y", "130,0"],\
                    ["NUM#", "height", "120,0"],\
                    ["NUM#", "bias", "28,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze3",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2012",\
            "y": "3394",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "y", "62,0"],\
                    ["NUM#", "bias", "0,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1979",\
            "y": "5152",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "round", "48,0"],\
                    ["NUM#", "bias", "29,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke2",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1150",\
            "y": "7695",\
            "z": "4",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 74,0 212,0 137,0 100,0 0,0"],\
                    ["NUM#", "weight", "4,0"],\
                    ["NUM#", "fit", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale9",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2011",\
            "y": "4244",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "scaleX", "40,0"],\
                    ["NUM#", "scaleY", "35,0"],\
                    ["NUM#", "affectCorners", "0,0"],\
                    ["NUM#", "affectStyle", "0,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale8",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1874",\
            "y": "10538",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "scaleX", "150,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale4",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1337",\
            "y": "6419",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "scaleX", "20,0"],\
                    ["NUM#", "scaleY", "20,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale3",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1351",\
            "y": "7047",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "scaleX", "7,0"],\
                    ["NUM#", "scaleY", "7,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2130",\
            "y": "5369",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "scaleX", "103,0"],\
                    ["NUM#", "scaleY", "140,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2129",\
            "y": "5152",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "scaleY", "140,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-1283",\
            "y": "6746",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "count", "33,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5556",\
            "y": "7132",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "count", "3,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1572",\
            "y": "7564",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "y", "2,0"],\
                    ["NUM#", "round", "1,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "973",\
            "y": "5420",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "6951,0"],\
                    ["NUM#", "min", "15,0"],\
                    ["NUM#", "max", "75,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random33",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1485",\
            "y": "4000",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "seed", "8801,0"],\
                    ["NUM#", "min", "-20,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random31",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1817",\
            "y": "4563",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "seed", "1078,0"],\
                    ["NUM#", "min", "37,0"],\
                    ["NUM#", "max", "48,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5558",\
            "y": "7384",\
            "z": "17",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "3,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "984",\
            "y": "5609",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "seed", "3451,0"],\
                    ["NUM#", "min", "20,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random29",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1110",\
            "y": "10303",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "seed", "645,0"],\
                    ["NUM#", "min", "-20,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random28",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1110",\
            "y": "10745",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "seed", "8531,0"],\
                    ["NUM#", "min", "25,0"],\
                    ["NUM#", "max", "50,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random27",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1110",\
            "y": "10604",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "seed", "8103,0"],\
                    ["NUM#", "min", "-20,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random26",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1112",\
            "y": "11255",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "seed", "1273,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random21",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "634",\
            "y": "7129",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "seed", "979,0"],\
                    ["NUM#", "min", "-5,0"],\
                    ["NUM#", "max", "6,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random20",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "638",\
            "y": "6978",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "seed", "6116,0"],\
                    ["NUM#", "min", "-4,0"],\
                    ["NUM#", "max", "4,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random8",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "630",\
            "y": "7452",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "seed", "3478,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random19",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1705",\
            "y": "9921",\
            "z": "26",\
            "params":\
            [\
                    ["NUM#", "seed", "4112,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random18",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1707",\
            "y": "9761",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "seed", "7304,0"],\
                    ["NUM#", "min", "25,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random17",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2092",\
            "y": "9898",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "seed", "2059,0"],\
                    ["NUM#", "min", "5,0"],\
                    ["NUM#", "max", "15,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random16",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2372",\
            "y": "7027",\
            "z": "29",\
            "params":\
            [\
                    ["NUM#", "seed", "7244,0"],\
                    ["NUM#", "min", "16,0"],\
                    ["NUM#", "max", "25,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random15",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2374",\
            "y": "7188",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "seed", "3940,0"],\
                    ["NUM#", "min", "-8,0"],\
                    ["NUM#", "max", "4,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random13",\
            "name": "mouth%20W",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "887",\
            "y": "8906",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "seed", "6374,0"],\
                    ["NUM#", "min", "10,0"],\
                    ["NUM#", "max", "18,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random12",\
            "name": "SMILE",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "891",\
            "y": "9272",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "seed", "117,0"],\
                    ["NUM#", "min", "0.01,2"],\
                    ["NUM#", "max", "2,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random11",\
            "name": "mouth%20Y",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "885",\
            "y": "9106",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "seed", "1021,0"],\
                    ["NUM#", "min", "85,0"],\
                    ["NUM#", "max", "95,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "631",\
            "y": "7728",\
            "z": "34",\
            "params":\
            [\
                    ["NUM#", "seed", "9472,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-1433",\
            "y": "6746",\
            "z": "35",\
            "params":\
            [\
                    ["NUM#", "seed", "8965,0"],\
                    ["NUM#", "max", "10000,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point3",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1970",\
            "y": "9192",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "x", "61,0"],\
                    ["NUM#", "y", "89.02,2"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1967",\
            "y": "9041",\
            "z": "37",\
            "params":\
            [\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "y", "92.98,2"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel9",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "-1481",\
            "y": "6688",\
            "z": "38",\
            "width": "675",\
            "height": "850.2387442741393",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel5",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "948",\
            "y": "6968",\
            "z": "39",\
            "width": "677.7812629633441",\
            "height": "374",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random22",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1723",\
            "y": "5131",\
            "z": "40",\
            "params":\
            [\
                    ["NUM#", "seed", "5829,0"],\
                    ["NUM#", "min", "-10,0"],\
                    ["NUM#", "max", "30,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "HEAD",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1248",\
            "y": "5037",\
            "z": "41",\
            "width": "1286.9697655449204",\
            "height": "813.2472771288833",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move5",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2217",\
            "y": "4503",\
            "z": "42",\
            "params":\
            [\
                    ["NUM#", "x", "46,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move3",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5312",\
            "y": "6906",\
            "z": "43",\
            "params":\
            [\
                    ["NUM#", "x", "460,0"],\
                    ["NUM#", "y", "640,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2677",\
            "y": "6947",\
            "z": "44",\
            "params":\
            [\
                    ["NUM#", "x", "21,0"],\
                    ["NUM#", "y", "-3,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel11",\
            "name": "TORSO",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1409",\
            "y": "10413",\
            "z": "45",\
            "width": "914.7946695395184",\
            "height": "834",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2681",\
            "y": "6736",\
            "z": "46",\
            "params":\
            [\
                    ["NUM#", "x", "-21,0"],\
                    ["NUM#", "y", "-3,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math9",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1657",\
            "y": "3648",\
            "z": "47",\
            "params":\
            [\
                    ["NUM#", "value", "58.036915051043195,0"],\
                    ["NUM#", "operand", "-5,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math8",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1559",\
            "y": "8877",\
            "z": "48",\
            "params":\
            [\
                    ["NUM#", "value", "-11,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math7",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1732",\
            "y": "9451",\
            "z": "49",\
            "params":\
            [\
                    ["NUM#", "value", "61,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math6",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1728",\
            "y": "9085",\
            "z": "50",\
            "params":\
            [\
                    ["NUM#", "value", "89.02,2"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1728",\
            "y": "9260",\
            "z": "51",\
            "params":\
            [\
                    ["NUM#", "value", "89.02,2"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1643",\
            "y": "5645",\
            "z": "52",\
            "params":\
            [\
                    ["NUM#", "value", "53.036915051043195,0"],\
                    ["NUM#", "operand", "-10,0"]\
            ]\
            },\
            {\
            "type": "MASK",\
            "id": "mask",\
            "name": "mask",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1332",\
            "y": "6835",\
            "z": "53"\
            },\
            {\
            "type": "SMATH",\
            "id": "math10",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1517",\
            "y": "4498",\
            "z": "54",\
            "params":\
            [\
                    ["NUM#", "value", "58.036915051043195,0"],\
                    ["NUM#", "operand", "-5,0"]\
            ]\
            },\
            {\
            "type": "SGRP",\
            "id": "group2",\
            "name": "right%20eye",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1802",\
            "y": "7137",\
            "z": "55"\
            },\
            {\
            "type": "SGRP",\
            "id": "group",\
            "name": "left%20eye",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1795",\
            "y": "6712",\
            "z": "56"\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-1133",\
            "y": "6746",\
            "z": "57"\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse2",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1164",\
            "y": "6420",\
            "z": "58",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine9",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4510",\
            "y": "6892",\
            "z": "59",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "917",\
            "y": "8176",\
            "z": "60",\
            "params":\
            [\
                    ["NUM#", "seed", "1702,0"],\
                    ["NUM#", "min", "2,0"],\
                    ["NUM#", "max", "5,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine7",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1424",\
            "y": "7698",\
            "z": "61",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "CMB",\
            "id": "combine6",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2917",\
            "y": "6873",\
            "z": "62",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1992",\
            "y": "6574",\
            "z": "63",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "SCALE",\
            "id": "scale7",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1865",\
            "y": "10887",\
            "z": "64",\
            "params":\
            [\
                    ["NUM#", "scaleX", "150,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine10",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2408",\
            "y": "4460",\
            "z": "65",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "COL",\
            "id": "color10",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1817",\
            "y": "3554",\
            "z": "66",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "40.45863546017523,0"],\
                    ["NUM#", "c2", "19.469410312069403,0"],\
                    ["NUM#", "c3", "58.036915051043195,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "head",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2340",\
            "y": "5290",\
            "z": "67",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel8",\
            "name": "GLASSES",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "930",\
            "y": "7495",\
            "z": "68",\
            "width": "1257.5823961519156",\
            "height": "442",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color8",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "986",\
            "y": "7667",\
            "z": "69",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "74,0"],\
                    ["NUM#", "c2", "212,0"],\
                    ["NUM#", "c3", "137,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze4",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1715",\
            "y": "10887",\
            "z": "70",\
            "params":\
            [\
                    ["NUM#", "y", "130,0"],\
                    ["NUM#", "height", "150,0"],\
                    ["NUM#", "round", "31,0"],\
                    ["NUM#", "bias", "-10,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1332",\
            "y": "5312",\
            "z": "71",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "16,0"],\
                    ["NUM#", "c2", "52,0"],\
                    ["NUM#", "c3", "54,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1803",\
            "y": "5551",\
            "z": "72",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "40.45863546017523,0"],\
                    ["NUM#", "c2", "19.469410312069403,0"],\
                    ["NUM#", "c3", "53.036915051043195,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "969",\
            "y": "6603",\
            "z": "73",\
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
            "type": "VPATH",\
            "id": "path",\
            "name": "mouth",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2442",\
            "y": "9042",\
            "z": "74",\
            "params":\
            [\
                    ["LIST#", "points", "3 PT# 39,0 89.02,2 PT# 50,0 92.98,2 PT# 61,0 89.02,2"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color11",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1533",\
            "y": "11047",\
            "z": "75",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "154,0"],\
                    ["NUM#", "c2", "56,0"],\
                    ["NUM#", "c3", "71,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1805",\
            "y": "5311",\
            "z": "76",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "16,0"],\
                    ["NUM#", "c2", "52,0"],\
                    ["NUM#", "c3", "54,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine5",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1978",\
            "y": "7008",\
            "z": "77",\
            "width": "130.0792025208136",\
            "height": "64"\
            },\
            {\
            "type": "APPLY",\
            "id": "apply",\
            "name": "apply",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1499",\
            "y": "6710",\
            "z": "78",\
            "params":\
            [\
                    ["NUM#", "replace", "1,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2279",\
            "y": "9180",\
            "z": "79",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 163,0 91,0 91,0 100,0 0,0"],\
                    ["NUM#", "weight", "11,0"],\
                    ["NUM#", "cap", "2,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1486",\
            "y": "5552",\
            "z": "80",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "40.45863546017523,0"],\
                    ["NUM#", "c2", "19.469410312069403,0"],\
                    ["NUM#", "c3", "63.036915051043195,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random30",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1110",\
            "y": "10444",\
            "z": "81",\
            "params":\
            [\
                    ["NUM#", "seed", "4123,0"],\
                    ["NUM#", "min", "25,0"],\
                    ["NUM#", "max", "50,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1167",\
            "y": "8169",\
            "z": "82",\
            "params":\
            [\
                    ["NUM#", "seed", "3691,0"],\
                    ["NUM#", "max", "75,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2511",\
            "y": "6829",\
            "z": "83",\
            "params":\
            [\
                    ["NUM#", "value", "-21,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "SGRP",\
            "id": "group3",\
            "name": "torso",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2124",\
            "y": "10746",\
            "z": "84"\
            },\
            {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1601",\
            "y": "8159",\
            "z": "85",\
            "params":\
            [\
                    ["NUM#", "seed", "2266,0"],\
                    ["NUM#", "chance", "25,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-981",\
            "y": "6746",\
            "z": "86",\
            "width": "142.46670185875394",\
            "height": "758",\
            "params":\
            [\
                    ["NUM#", "0", "2266,0"],\
                    ["NUM#", "1", "3691,0"],\
                    ["NUM#", "2", "3451,0"],\
                    ["NUM#", "3", "8111,0"],\
                    ["NUM#", "4", "6685,0"],\
                    ["NUM#", "5", "6951,0"],\
                    ["NUM#", "6", "1702,0"],\
                    ["NUM#", "7", "3478,0"],\
                    ["NUM#", "8", "85,0"],\
                    ["NUM#", "9", "9472,0"],\
                    ["NUM#", "10", "6374,0"],\
                    ["NUM#", "11", "1021,0"],\
                    ["NUM#", "12", "117,0"],\
                    ["NUM#", "13", "6510,0"],\
                    ["NUM#", "14", "3940,0"],\
                    ["NUM#", "15", "7244,0"],\
                    ["NUM#", "16", "7304,0"],\
                    ["NUM#", "17", "4112,0"],\
                    ["NUM#", "18", "2059,0"],\
                    ["NUM#", "19", "6116,0"],\
                    ["NUM#", "20", "979,0"],\
                    ["NUM#", "21", "5829,0"],\
                    ["NUM#", "22", "8634,0"],\
                    ["NUM#", "23", "4664,0"],\
                    ["NUM#", "24", "6009,0"],\
                    ["NUM#", "25", "1273,0"],\
                    ["NUM#", "26", "645,0"],\
                    ["NUM#", "27", "4123,0"],\
                    ["NUM#", "28", "8103,0"],\
                    ["NUM#", "29", "8531,0"],\
                    ["NUM#", "30", "1078,0"],\
                    ["NUM#", "31", "8801,0"],\
                    ["NUM#", "32", "6117,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random9",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "630",\
            "y": "7588",\
            "z": "87",\
            "params":\
            [\
                    ["NUM#", "seed", "85,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale5",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1722",\
            "y": "7564",\
            "z": "88",\
            "params":\
            [\
                    ["NUM#", "scaleX", "33,0"],\
                    ["NUM#", "scaleY", "33,0"],\
                    ["NUM#", "affectCorners", "0,0"],\
                    ["NUM#", "affectStyle", "0,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel12",\
            "name": "EARS",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1251",\
            "y": "4145",\
            "z": "89",\
            "width": "1332",\
            "height": "624.5304244661015",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel4",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "927",\
            "y": "6364",\
            "z": "90",\
            "width": "723.8278993022228",\
            "height": "560",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1879",\
            "y": "7568",\
            "z": "91",\
            "params":\
            [\
                    ["NUM#", "condition", "0,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1963",\
            "y": "8897",\
            "z": "92",\
            "params":\
            [\
                    ["NUM#", "x", "39,0"],\
                    ["NUM#", "y", "89.02,2"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "1739",\
            "y": "6936",\
            "z": "93",\
            "width": "426.40765806349543",\
            "height": "327.05733753723734",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color7",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2077",\
            "y": "9321",\
            "z": "94",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "44,0"],\
                    ["NUM#", "c3", "64,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math5",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1728",\
            "y": "9163",\
            "z": "95",\
            "params":\
            [\
                    ["NUM#", "value", "92.98,2"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1187",\
            "y": "7046",\
            "z": "96",\
            "params":\
            [\
                    ["NUM#", "x", "-1,0"],\
                    ["NUM#", "y", "-2,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "991",\
            "y": "7228",\
            "z": "97",\
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
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5089",\
            "y": "7118",\
            "z": "98",\
            "params":\
            [\
                    ["NUM#", "add", "230,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel10",\
            "name": "NECK",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1391",\
            "y": "3310",\
            "z": "99",\
            "width": "994.5560192854539",\
            "height": "486",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine11",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3769",\
            "y": "6878",\
            "z": "100",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel6",\
            "name": "EYES",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "852",\
            "y": "6281",\
            "z": "101",\
            "width": "2263.529228220072",\
            "height": "1732.364936588097",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine4",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2181",\
            "y": "9054",\
            "z": "102",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "RAND",\
            "id": "random25",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1110",\
            "y": "11113",\
            "z": "103",\
            "params":\
            [\
                    ["NUM#", "seed", "6009,0"],\
                    ["NUM#", "max", "80,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5081",\
            "y": "7373",\
            "z": "104",\
            "params":\
            [\
                    ["NUM#", "add", "320,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale6",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2162",\
            "y": "3394",\
            "z": "105",\
            "params":\
            [\
                    ["NUM#", "scaleX", "50,0"]\
            ]\
            },\
            {\
            "type": "TRPZ",\
            "id": "trapeze2",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1980",\
            "y": "5369",\
            "z": "106",\
            "params":\
            [\
                    ["NUM#", "y", "-8,0"],\
                    ["NUM#", "round", "48,0"],\
                    ["NUM#", "bias", "29,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color12",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1360",\
            "y": "4405",\
            "z": "107",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "40.45863546017523,0"],\
                    ["NUM#", "c2", "19.469410312069403,0"],\
                    ["NUM#", "c3", "63.036915051043195,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel7",\
            "name": "MOUTH",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1121",\
            "y": "8626",\
            "z": "108",\
            "width": "1543",\
            "height": "963.124627409665",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random23",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1210",\
            "y": "7302",\
            "z": "109",\
            "params":\
            [\
                    ["NUM#", "seed", "8634,0"],\
                    ["NUM#", "min", "6,0"],\
                    ["NUM#", "max", "10,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1742",\
            "y": "8772",\
            "z": "110",\
            "params":\
            [\
                    ["NUM#", "value", "39,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1287",\
            "y": "7726",\
            "z": "111",\
            "params":\
            [\
                    ["NUM#", "y", "1,0"],\
                    ["NUM#", "blur", "8,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 50,0 0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random24",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1110",\
            "y": "10977",\
            "z": "112",\
            "params":\
            [\
                    ["NUM#", "seed", "4664,0"],\
                    ["NUM#", "max", "360,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine8",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4128",\
            "y": "6888",\
            "z": "113",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "973",\
            "y": "5285",\
            "z": "114",\
            "params":\
            [\
                    ["NUM#", "seed", "6685,0"],\
                    ["NUM#", "min", "40,0"],\
                    ["NUM#", "max", "55,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math11",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2025",\
            "y": "4448",\
            "z": "115",\
            "params":\
            [\
                    ["NUM#", "value", "-46,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random14",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1389",\
            "y": "8159",\
            "z": "116",\
            "params":\
            [\
                    ["NUM#", "seed", "6510,0"],\
                    ["NUM#", "min", "30,0"],\
                    ["NUM#", "max", "37,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "975",\
            "y": "5153",\
            "z": "117",\
            "params":\
            [\
                    ["NUM#", "seed", "8111,0"],\
                    ["NUM#", "min", "15,0"],\
                    ["NUM#", "max", "25,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num6",\
            "name": "mouth%20X",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "889",\
            "y": "8780",\
            "z": "118",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "50,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move4",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2215",\
            "y": "4246",\
            "z": "119",\
            "params":\
            [\
                    ["NUM#", "x", "-46,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "1719",\
            "y": "6492",\
            "z": "120",\
            "width": "457.30574642817976",\
            "height": "350.86625466129954",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color13",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1677",\
            "y": "4404",\
            "z": "121",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "40.45863546017523,0"],\
                    ["NUM#", "c2", "19.469410312069403,0"],\
                    ["NUM#", "c3", "58.036915051043195,0"]\
            ]\
            },\
            {\
            "type": "MASK",\
            "id": "mask2",\
            "name": "mask",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1563",\
            "y": "10723",\
            "z": "122"\
            },\
            {\
            "type": "COL",\
            "id": "color9",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1500",\
            "y": "3555",\
            "z": "123",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "40.45863546017523,0"],\
                    ["NUM#", "c2", "19.469410312069403,0"],\
                    ["NUM#", "c3", "63.036915051043195,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3411",\
            "y": "6869",\
            "z": "124",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "RAND",\
            "id": "random32",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1661",\
            "y": "4000",\
            "z": "125",\
            "params":\
            [\
                    ["NUM#", "seed", "6117,0"],\
                    ["NUM#", "min", "10,0"],\
                    ["NUM#", "max", "20,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "random32",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze6",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random33",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze6",\
            "inputId": "bias",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color13",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze6",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random29",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze5",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random30",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze5",\
            "inputId": "bias",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "mask2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze5",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze3",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random22",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "bias",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke2",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke2",\
            "inputId": "weight",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale9",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale8",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random23",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale3",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random23",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale3",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze",\
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
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "6",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "31",\
            "outputOrder": "0",\
            "inputNodeId": "random33",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "30",\
            "outputOrder": "0",\
            "inputNodeId": "random31",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
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
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "6",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "26",\
            "outputOrder": "2",\
            "inputNodeId": "random29",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "29",\
            "outputOrder": "2",\
            "inputNodeId": "random28",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "28",\
            "outputOrder": "2",\
            "inputNodeId": "random27",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "25",\
            "outputOrder": "2",\
            "inputNodeId": "random26",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "20",\
            "outputOrder": "4",\
            "inputNodeId": "random21",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "19",\
            "outputOrder": "4",\
            "inputNodeId": "random20",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "7",\
            "outputOrder": "6",\
            "inputNodeId": "random8",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "17",\
            "outputOrder": "4",\
            "inputNodeId": "random19",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "16",\
            "outputOrder": "4",\
            "inputNodeId": "random18",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "18",\
            "outputOrder": "4",\
            "inputNodeId": "random17",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "15",\
            "outputOrder": "4",\
            "inputNodeId": "random16",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "14",\
            "outputOrder": "6",\
            "inputNodeId": "random15",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "10",\
            "outputOrder": "6",\
            "inputNodeId": "random13",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "12",\
            "outputOrder": "6",\
            "inputNodeId": "random12",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "11",\
            "outputOrder": "6",\
            "inputNodeId": "random11",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "9",\
            "outputOrder": "6",\
            "inputNodeId": "random10",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point3",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point3",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "21",\
            "outputOrder": "4",\
            "inputNodeId": "random22",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale9",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "move5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random31",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move5",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random16",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random15",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "move2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random15",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color9",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math9",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random13",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math8",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math7",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random13",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math7",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random12",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math6",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random11",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random12",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "math4",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color12",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math10",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "apply",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "group2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "scale3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "group2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "apply",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "group",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "scale3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "group",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse2",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine9",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "group3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine9",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "6",\
            "inputNodeId": "random7",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "stroke2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine7",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dropShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine7",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "scale4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "group",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale7",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine10",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine10",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color10",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color9",\
            "outputId": "space",\
            "outputOrder": "0",\
            "inputNodeId": "color10",\
            "inputId": "space",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color10",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color8",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color8",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color8",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random28",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze4",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random27",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze4",\
            "inputId": "bias",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze4",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "space",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "space",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random24",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color11",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random25",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color11",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random26",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color11",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale4",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "group2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine5",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine5",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "apply",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "mask",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "apply",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random17",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "weight",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "color4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "27",\
            "outputOrder": "2",\
            "inputNodeId": "random30",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "6",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random16",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "group3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "group3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "6",\
            "inputNodeId": "prob",\
            "inputId": "seed",\
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
            "outputNodeId": "list",\
            "outputId": "8",\
            "outputOrder": "6",\
            "inputNodeId": "random9",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random14",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale5",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random14",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale5",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "prob",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "condition",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random18",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color7",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random19",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color7",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random11",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random12",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math5",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random20",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random21",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine11",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine11",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine4",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine4",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "24",\
            "outputOrder": "2",\
            "inputNodeId": "random25",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "trapeze2",\
            "inputId": "round",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random22",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "trapeze2",\
            "inputId": "bias",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze2",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "color12",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "22",\
            "outputOrder": "2",\
            "inputNodeId": "random23",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "23",\
            "outputOrder": "2",\
            "inputNodeId": "random24",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine8",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine8",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "6",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random31",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math11",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "13",\
            "outputOrder": "6",\
            "inputNodeId": "random14",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "6",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "scale9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move4",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color12",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color13",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color12",\
            "outputId": "space",\
            "outputOrder": "0",\
            "inputNodeId": "color13",\
            "inputId": "space",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color13",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "color9",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "32",\
            "outputOrder": "0",\
            "inputNodeId": "random32",\
            "inputId": "seed",\
            "list": "false"\
            }\
        ]\
    }';



const presetLinesOfFire = '\
    {\
        "nodes":\
        [\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3214",\
            "y": "1635",\
            "z": "0",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 173,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3032",\
            "y": "1708",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "60,0"],\
                    ["NUM#", "c2", "32,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4037",\
            "y": "1899",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "seed", "112,0"],\
                    ["NUM#", "max", "1000,0"],\
                    ["NUM#", "scale", "75,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2809",\
            "y": "2262",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "5082,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4039",\
            "y": "2115",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "2,0"],\
                    ["NUM#", "max", "500,0"],\
                    ["NUM#", "scale", "75,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4366",\
            "y": "2030",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "count", "400,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3640",\
            "y": "1572",\
            "z": "6",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3382",\
            "y": "1699",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "size", "50,0"],\
                    ["NUM#", "aspect", "100,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3667",\
            "y": "1838",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "seed", "90,0"],\
                    ["NUM#", "min", "200,0"],\
                    ["NUM#", "max", "600,0"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3109",\
            "y": "2262",\
            "z": "9"\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4090",\
            "y": "1572",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "x", "608.3361389143399,0"],\
                    ["NUM#", "y", "260.20256660587654,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3259",\
            "y": "2262",\
            "z": "11",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                    ["NUM#", "0", "90,0"],\
                    ["NUM#", "1", "23,0"],\
                    ["NUM#", "2", "130,0"],\
                    ["NUM#", "3", "112,0"],\
                    ["NUM#", "4", "2,0"],\
                    ["NUM#", "5", "89,0"],\
                    ["NUM#", "6", "36,0"],\
                    ["NUM#", "7", "108,0"],\
                    ["NUM#", "8", "181,0"],\
                    ["NUM#", "9", "90,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3863",\
            "y": "1804",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "seed", "130,0"],\
                    ["NUM#", "min", "-360,0"],\
                    ["NUM#", "max", "360,0"],\
                    ["NUM#", "scale", "119.54404233773575,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3668",\
            "y": "1975",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "seed", "23,0"],\
                    ["NUM#", "min", "1,0"],\
                    ["NUM#", "max", "8,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2959",\
            "y": "2262",\
            "z": "14"\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3940",\
            "y": "1572",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "angle", "145.7141851801623,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3214",\
            "y": "1752",\
            "z": "16",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 173,0"],\
                    ["NUM#", "opacity", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3790",\
            "y": "1572",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "scaleX", "464,0"],\
                    ["NUM#", "scaleY", "7,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2762",\
            "y": "2209",\
            "z": "18",\
            "width": "666.338987568369",\
            "height": "345.7752959441644",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4621",\
            "y": "2012",\
            "z": "19",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "1000,0"],\
                    ["NUM#", "height", "500,0"],\
                    ["NUM#", "round", "10,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4252",\
            "y": "2344",\
            "z": "20",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "55.00000000000001,0"],\
                    ["NUM#", "c3", "10,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "6",\
            "x": "3813",\
            "y": "2133",\
            "z": "21",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "75,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise4",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3603",\
            "y": "2201",\
            "z": "22",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "89,0"],\
                    ["NUM#", "min", "100,0"],\
                    ["NUM#", "max", "200,0"],\
                    ["NUM#", "scale", "100,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4257",\
            "y": "2187",\
            "z": "23",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "40,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4444",\
            "y": "2243",\
            "z": "24",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "size", "80,0"],\
                    ["NUM#", "angle", "90,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "scale",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise2",\
            "inputId": "scale",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
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
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "seed",\
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
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
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
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise3",\
            "inputId": "scale",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
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
            "outputNodeId": "repeat",\
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
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "0",\
            "inputNodeId": "noise4",\
            "inputId": "seed",\
            "list": "false"\
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



const presetClouds = '\
    {\
        "nodes":\
        [\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3845",\
            "y": "3327",\
            "z": "0",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "500,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4400",\
            "y": "2996",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "seed", "143,0"],\
                    ["NUM#", "min", "-500,0"],\
                    ["NUM#", "max", "500,0"],\
                    ["NUM#", "scale", "7,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3842",\
            "y": "3155",\
            "z": "2",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "400,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4614",\
            "y": "3058",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "value", "330.8758067242062,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3658",\
            "y": "2955",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3424",\
            "y": "2714",\
            "z": "5"\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3834",\
            "y": "2720",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "angle", "342,0"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2735",\
            "y": "3145",\
            "z": "7"\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2885",\
            "y": "3145",\
            "z": "8",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                    ["NUM#", "0", "69,0"],\
                    ["NUM#", "1", "254,0"],\
                    ["NUM#", "2", "143,0"],\
                    ["NUM#", "3", "133,0"],\
                    ["NUM#", "4", "30,0"],\
                    ["NUM#", "5", "47,0"],\
                    ["NUM#", "6", "159,0"],\
                    ["NUM#", "7", "46,0"],\
                    ["NUM#", "8", "128,0"],\
                    ["NUM#", "9", "133,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3666",\
            "y": "3670",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "seed", "254,0"],\
                    ["NUM#", "max", "15,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill3",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3265",\
            "y": "3732",\
            "z": "10",\
            "params":\
            [\
                    ["COL#", "color", "1,0 128,0 74,0 64,0"],\
                    ["NUM#", "opacity", "10,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3273",\
            "y": "3601",\
            "z": "11",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                    ["NUM#", "opacity", "10,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill4",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3276",\
            "y": "3490",\
            "z": "12",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                    ["NUM#", "opacity", "30,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3508",\
            "y": "3595",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "y", "0,0"],\
                    ["NUM#", "angle", "90,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4019",\
            "y": "3546",\
            "z": "14",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4179",\
            "y": "2855",\
            "z": "15",\
            "params":\
            [\
                    ["LIST#", "points", "20 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0 PT# 0,0 0,0"],\
                    ["NUM#", "closed", "1,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4964",\
            "y": "3055",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "count", "300,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4812",\
            "y": "3492",\
            "z": "17",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "208.99999651666667,0"],\
                    ["NUM#", "c2", "70,0"],\
                    ["NUM#", "c3", "50,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4030",\
            "y": "3338",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "value", "-100,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4793",\
            "y": "2853",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "x", "330.8758067242062,0"],\
                    ["NUM#", "y", "248.97754003451368,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3098",\
            "y": "3761",\
            "z": "20",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "9.999999833333364,0"],\
                    ["NUM#", "c2", "50,0"],\
                    ["NUM#", "c3", "50,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4810",\
            "y": "3638",\
            "z": "21",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "240,0"],\
                    ["NUM#", "c2", "80,0"],\
                    ["NUM#", "c3", "80,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3425",\
            "y": "2841",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "seed", "69,0"],\
                    ["NUM#", "min", "30,0"],\
                    ["NUM#", "max", "50,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3986",\
            "y": "2884",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "LBLR",\
            "id": "layerBlur",\
            "name": "layer%20blur",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3818",\
            "y": "3641",\
            "z": "24",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2435",\
            "y": "3145",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "seed", "4975,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3115",\
            "y": "3593",\
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
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5009",\
            "y": "3584",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "y", "0,0"],\
                    ["NUM#", "angle", "90,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise2",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4400",\
            "y": "3205",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "seed", "133,0"],\
                    ["NUM#", "min", "-100,0"],\
                    ["NUM#", "max", "100,0"],\
                    ["NUM#", "scale", "30,0"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3843",\
            "y": "3233",\
            "z": "29",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "200,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2396",\
            "y": "3089",\
            "z": "30",\
            "width": "667.9144719580215",\
            "height": "364.78746215396427",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "Clouds",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "5207",\
            "y": "3320",\
            "z": "31",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "800,0"],\
                    ["NUM#", "height", "400,0"],\
                    ["NUM#", "round", "10,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2585",\
            "y": "3145",\
            "z": "32"\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3846",\
            "y": "3416",\
            "z": "33",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "100,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4011",\
            "y": "3213",\
            "z": "34",\
            "params":\
            [\
                    ["NUM#", "value", "-500,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4605",\
            "y": "3186",\
            "z": "35",\
            "params":\
            [\
                    ["NUM#", "value", "248.97754003451368,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3589",\
            "y": "2716",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "x", "47,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "3367",\
            "y": "2655",\
            "z": "37",\
            "width": "982.3473782674874",\
            "height": "475",\
            "params":\
            [\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "min",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h1",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill3",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill4",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "layerBlur",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "seed",\
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
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "layerBlur",\
            "inputId": "radius",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise2",\
            "inputId": "min",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "noise2",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
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
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            }\
        ]\
    }';



const presetPolarizedLights = '\
    {\
        "nodes":\
        [\
            {\
            "type": "NOISE",\
            "id": "noise3",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3825",\
            "y": "2019",\
            "z": "0",\
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
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3656",\
            "y": "1845",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "seed", "109,0"],\
                    ["NUM#", "min", "10,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2698",\
            "y": "2150",\
            "z": "2",\
            "width": "120",\
            "height": "252",\
            "params":\
            [\
                    ["NUM#", "0", "109,0"],\
                    ["NUM#", "1", "121,0"],\
                    ["NUM#", "2", "120,0"],\
                    ["NUM#", "3", "8,0"],\
                    ["NUM#", "4", "234,0"],\
                    ["NUM#", "5", "58,0"],\
                    ["NUM#", "6", "212,0"],\
                    ["NUM#", "7", "177,0"],\
                    ["NUM#", "8", "56,0"],\
                    ["NUM#", "9", "169,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2937",\
            "y": "1957",\
            "z": "3",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "212,0"],\
                    ["NUM#", "min", "30,0"],\
                    ["NUM#", "max", "46,1"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3264",\
            "y": "1685",\
            "z": "4",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 164,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3990",\
            "y": "1622",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "angle", "334.928176279612,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale2",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4611.6",\
            "y": "1868",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "scaleX", "62,0"],\
                    ["NUM#", "scaleY", "62,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5186",\
            "y": "2228",\
            "z": "7",\
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
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5136.6",\
            "y": "1870",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "x", "51,0"],\
                    ["NUM#", "y", "90,0"],\
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
            "x": "3690",\
            "y": "1622",\
            "z": "9",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4226",\
            "y": "1868",\
            "z": "10"\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3264",\
            "y": "1802",\
            "z": "11",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 164,0"],\
                    ["NUM#", "opacity", "0,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3840",\
            "y": "1622",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "scaleX", "69,0"],\
                    ["NUM#", "scaleY", "4,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4434.6",\
            "y": "2066",\
            "z": "13",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "58,0"],\
                    ["NUM#", "min", "1,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3657",\
            "y": "1992",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "121,0"],\
                    ["NUM#", "min", "1,0"],\
                    ["NUM#", "max", "5,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5181",\
            "y": "2385",\
            "z": "15",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "80,0"],\
                    ["NUM#", "c3", "20,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2546",\
            "y": "2134",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "seed", "5132,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3082",\
            "y": "1758",\
            "z": "17",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "60,0"],\
                    ["NUM#", "c2", "35.8,1"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4961.6",\
            "y": "2067",\
            "z": "18",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "234,0"],\
                    ["NUM#", "max", "700,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2503",\
            "y": "2086",\
            "z": "19",\
            "width": "350.0185469679293",\
            "height": "368",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5387",\
            "y": "1868",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "count", "40,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5565",\
            "y": "2099",\
            "z": "21",\
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
            "x": "5373",\
            "y": "2284",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "80,0"],\
                    ["NUM#", "y", "100,0"],\
                    ["NUM#", "size", "170,0"],\
                    ["NUM#", "angle", "90,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4963.6",\
            "y": "1928",\
            "z": "23",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "8,0"],\
                    ["NUM#", "max", "400,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3432",\
            "y": "1749",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "size", "50,0"],\
                    ["NUM#", "aspect", "100,0"],\
                    ["NUM#", "blend", "9,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2545",\
            "y": "2276",\
            "z": "25"\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2546",\
            "y": "2387",\
            "z": "26"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "4",\
            "inputNodeId": "noise3",\
            "inputId": "seed",\
            "list": "false"\
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
            "outputNodeId": "freeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "0",\
            "inputNodeId": "random7",\
            "inputId": "seed",\
            "list": "false"\
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
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
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
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "0",\
            "inputNodeId": "random6",\
            "inputId": "seed",\
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
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
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
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';