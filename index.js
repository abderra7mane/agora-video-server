const express = require('express');
const cors = require('cors');

const { RtcTokenBuilder, RtcRole } = require('agora-access-token');


const APP_ID = '820e0850d1724a4eb45f316a2a1c0658';
const APP_CERTIFICATE = '415a9186152b459e9a447da3e58810a4';


const app = express()
    .use(cors())
    .use(express.json());

app.post('/api/token', (req, res) => {
    const { channel, uid } = req.body;
    const role = RtcRole.PUBLISHER;

    const tokenValidityInSecs = 3600 * 24; // 1 day
    const currentTimeInSecs = Math.floor(Date.now() / 1000);
    const tokenExpiryTime = currentTimeInSecs + tokenValidityInSecs;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID, APP_CERTIFICATE, channel, uid, role, tokenExpiryTime);

    res.status(200).json({ token });
})

app.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});
