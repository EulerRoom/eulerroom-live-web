## Streaming settings for OBS Studio

This is a reference for the settings in OBS Studio for streaming to Eulerroom hosts. Values are aligned to the Eulerroom Owncast platform.
For a more detailed guide including initial installation, audio configuration, optimization, etc. see the [TOPLAP Streaming User Guide](https://docs.google.com/document/d/1hiaT4YEmqF5s6IkYySfhE9Hu1oopOGcVUG2E4DvyKWM/edit?usp=sharing).

### Requirements

- [OBS Studio](https://obsproject.com/) installed and running
- Valid Stream Key from a current [Eulerroom.com](https://eulerroom.com/) event registration

### Links

- Stream viewing LIVE: https://live.eulerroom.com
- Stream viewing TEST: https://test.eulerroom.com
- Event registration / slot lineup: https://eulerroom.com/

### Settings - OBS Preferences

- Stream Server
    - LIVE: **rtmp://live.eulerroom.com/live**
    - TEST: **rtmp://live.eulerroom.com/test**
    - Stream Service: **Custom**
- Video Bitrate:
    - code window: **800 Kbps**
    - graphics / motion video: **2500 Kbps**
- Audio Bitrate: **160**
- Video: Output (Scaled Resolution): **Max value: 1920x1080**
- FPS: **24**

### Test your stream

- Once you have a valid stream key, you can test at any time.
- If you start streaming outside of your performance time, the muxy server will redirect your stream to the test server.
- Eulerroom only allows one stream at a time - both live and test. If someone else is testing when you try to connect, the server will reject you.
You can verify this by viewing the test stream.

### Getting help

- [TOPLAP Discord](https://discord.com/channels/790732544491913216/954091873293709373): TOPLAP Live Coding > stream-help
- [OBS Discord](https://discord.com/invite/obsproject)
- [OBS Help Portal](https://obsproject.com/help)

### Notes

- **Video Bitrates**: The OBS config wizard will usually set this quite high. This can cause problems leading to buffering and stream disruption.
Most live coding should do fine with a **800 Kbsp** bitrate. If you use actual motion video in your live coding, you may need a higher bitrate. You should experiment with higher values, but keep to a maximum **2500 Kbps**.

- Connectivity constraints: your Internet **upload** speed can impact your streaming. If your upload speeds are consistently at 1 Mbps or less, you may experience streaming problems like dropped frames, audio disruption from buffering, etc. In this scenario a low video bitrate, lower FPS, etc are important.
