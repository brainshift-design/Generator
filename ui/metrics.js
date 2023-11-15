let metricsEvents = [];

const ignoreUsers = ['673258279043070642'];



setInterval(() => pingMetrics(),  60000);
setInterval(() => updateMetrics(), 5000);



const METRICS_PING        = 'PING';
const METRICS_MENU_BUTTON = 'MENU_BUTTON';
const METRICS_MENU_ITEM   = 'MENU_ITEM';
const METRICS_WINDOW_SIZE = 'WINDOW_SIZE';
const METRICS_PAN_ZOOM    = 'PAN_ZOOM';
//const METRICS_PARAM_VALUE = 'PARAM_VALUE';
//const METRICS_NODE_NAME   = 'NODE_NAME';
const METRICS_DEBUG_MODE  = 'DEBUG_MODE';
const METRICS_LOAD_PRESET = 'LOAD_PRESET';
const METRICS_SEARCH      = 'SEARCH';
const METRICS_ACTION_DO   = 'ACTION_DO';
const METRICS_ACTION_UNDO = 'ACTION_UNDO';
const METRICS_ACTION_REDO = 'ACTION_REDO';
const METRICS_CLICK_LINK  = 'CLICK_LINK';
const METRICS_ERROR       = 'ERROR';



function createMetricsEvent(type, data = '')
{
    // console.log('type =', type);
    // console.log('data =', data);
    
    const event =
    {
        userId:           currentUser.id,
        sessionId:        sessionId,
        generatorVersion: generatorVersion,
        dateTime:         new Date(),
        type:             type,
        data:             data
    };

    return event;
}



function addMetricsEvent(type, data, atStart = false)
{
    const event = createMetricsEvent(type, data);

    if (atStart) metricsEvents.unshift(event);
    else         metricsEvents.push   (event);
}



function pingMetrics()
{
    if (  !document.hasFocus()
        || ignoreUsers.includes(currentUser.id))
        return;


    postToServer(
    {
        action: 'updateMetrics',
        events:  JSON.stringify([createMetricsEvent(METRICS_PING)])
    })
    .then(response =>
    {   
        const update = generatorVersion < response.latestVersion;

        btnMain.setIcon(update ? iconGeneratorUpdate : iconGenerator);

        updateElementDisplay(menuItemRestartSep.div, update);
        updateElementDisplay(menuItemRestart   .div, update);
    })
    .catch(error =>
    {
        consoleError();
    });
}



function updateMetrics()
{
    if (   metricsEvents.length == 0
        || ignoreUsers.includes(currentUser.id))
        return;

    const events = [...metricsEvents];
    metricsEvents = [];


    postToServer(
    {
        action: 'updateMetrics',
        events:  JSON.stringify(events)
    })
    .then(response =>
    {   
        //console.log('metricsEvents =', events); 
    })
    .catch(error =>
    {
        consoleError();
    });
}



function hashUserId(userId, rounds = 10, salt = '')
{
    const saltBuffer = new Uint8Array(16);
    
    crypto.getRandomValues(saltBuffer);

    if (salt == '')
    {
        salt = Array.from(saltBuffer)
            .map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2))
            .join('');
    }
    

    const encoder = new TextEncoder();
    const data    = encoder.encode(userId + salt);
  
    let hash = sha256(data);
  
    for (let i = 0; i < rounds - 1; i++)
        hash = sha256(hash);

 
    return { 
        hash: hash.slice(0, 16), 
        salt };
}



function sha256(text) 
{
    const encoder = new TextEncoder();
    const data    = encoder.encode(text);

    
    let [h0, h1, h2, h3, h4, h5, h6, h7] = 
    [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,  // initial hash values (constants 
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19   // from the SHA-256 algorithm)
    ];

    const k = new Uint32Array([ // round constants
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 ]);


    // Main loop
    for (let i = 0; i < data.length; i += 64) 
    {
        const block = data.slice(i, i + 64);
        const words = new Uint32Array(new DataView(block.buffer));

        for (let j = 16; j < 64; j++) 
        {
            const s0 = 
                  (words[j - 15] >>>  7 | words[j - 15] << 25) 
                ^ (words[j - 15] >>> 18 | words[j - 15] << 14) 
                ^ (words[j - 15] >>> 3);

            const s1 = 
                  (words[j - 2] >>> 17 | words[j - 2] << 15) 
                ^ (words[j - 2] >>> 19 | words[j - 2] << 13) 
                ^ (words[j - 2] >>> 10);

            words[j] = (words[j - 16] + s0 + words[j - 7] + s1) | 0;
        }

        
        let [a, b, c, d, e, f, g, h] = [h0, h1, h2, h3, h4, h5, h6, h7];

        for (let j = 0; j < 64; j++) 
        {
            const s0 = 
                  (a >>>  2 | a << 30) 
                ^ (a >>> 13 | a << 19) 
                ^ (a >>> 22 | a << 10);

            const maj = 
                  (a & b) 
                ^ (a & c) 
                ^ (b & c);

            const t2 = s0 + maj;


            const s1 = 
                  (e >>>  6 | e << 26) 
                ^ (e >>> 11 | e << 21)
                ^ (e >>> 25 | e <<  7);

            const ch = 
                  (  e  & f) 
                ^ ((~e) & g);

            const t1 = h + s1 + ch + k[j] + words[j];


            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }


        h0 = (h0 + a) | 0;
        h1 = (h1 + b) | 0;
        h2 = (h2 + c) | 0;
        h3 = (h3 + d) | 0;
        h4 = (h4 + e) | 0;
        h5 = (h5 + f) | 0;
        h6 = (h6 + g) | 0;
        h7 = (h7 + h) | 0;
    }


    const hashArray = new Uint32Array([h0, h1, h2, h3, h4, h5, h6, h7]);

    return Array.from(new Uint8Array(hashArray.buffer))
        .map(byte => ('0' + byte.toString(16)).slice(-2))
        .join('');
}
