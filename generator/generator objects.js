const OBJ_RECT = 1;


const MAX_OBJECTS = 0x10000;
var nObjects  = 0;

const gobjects  = new Array(MAX_OBJECTS);
const gobjNodes = new Array(MAX_OBJECTS);

var nextObjId = 0;



function newObjectId()
{
    var id = nextObjId;

    var looped = false;

    while (id < MAX_OBJECTS
        && !!gobjects[id])
    {
        id++;

        if (id == MAX_OBJECTS)
        {
            if (looped)
                return -1;

            id     = 0
            looped = true;
        }
    }

    nextObjId == id + 1;
    
    return id;
}