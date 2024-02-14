## Streaming settings for OBS Studio

This is a reference for the settings in OBS Studio for streaming to Eulerroom hosts. Setting values are aligned to the Eulerroom Owncast platform.
For a more detailed guide including initial installation, audio configuration, optimization, etc. see the [TOPLAP Streaming User Guide](https://docs.google.com/document/d/1hiaT4YEmqF5s6IkYySfhE9Hu1oopOGcVUG2E4DvyKWM/edit?usp=sharing).

### Requirements

* [OBS Studio](https://obsproject.com/) installed and running
* Valid Stream Key from a current [Eulerroom.com](https://eulerroom.com/) event registration

### Links

* Streaming server: rtmp://live.eulerroom.com/live
* Stream viewing LIVE: https://live.eulerroom.com
* Stream viewing TEST: https://test.eulerroom.com
* Event registration / slot lineup: https://eulerroom.com/

### Settings - OBS Preferences

- Stream (used for both live streaming and testing/stream validation)
    - Service: Custom
    - Server: **rtmp://live.eulerroom.com/live**
    - Stream Key: (enter your key)

- Output
    - Output Mode: Simple
    - Video Bitrate: **800 Kbps** (Performances with large video content may need a higher value. See Notes.)
    - Audio Bitrate: **160**
    - Encoder Preset: default is fine for most circumstances

- Audio
    - Desktop Audio: (select your audio driver configured for streaming)
    - See the User Guide (link above) for details on how to get audio configured

- Video
    - Base (Canvas) Resolution: (This will set the screen size used by OBS on your desktop.)
    - Output (Scaled Resolution): This is what is streamed to Eulerroom.
    **Max value: 1920x1080**
    - FPS: **24**

### Test your stream

* Once you have a valid stream key, you can test at any time.
* If you start streaming outside of your performance time, the muxy server will redirect your stream to the test server.
* Eulerroom only allows one stream at a time - both live and test. If someone else is testing when you try to connect, the server will reject you. 
You can verify this by viewing the test stream. 

### Getting help

* [TOPLAP Discord](https://discord.com/channels/790732544491913216/954091873293709373): TOPLAP Live Coding > stream-help
* [OBS Discord](https://discord.com/invite/obsproject)
* [OBS Help Portal](https://obsproject.com/help)

### Notes

* **Profiles**: The use of OBS Profiles is now optional. Previously we used separate profiles for Live and Test streams. That is no longer needed.
* **Video Bitrates**: The OBS config wizard will usually set this quite high. This can cause problems leading to buffering and stream disruption. 
Most live coding should do fine with a **800 Kbsp** bitrate. If you use actual motion video in your live coding, you may need a higher bitrate. You should experiment with higher values, but keep to a maximum **2500 Kbps**.
* Connectivity constraints: your Internet **upload** speed can impact your streaming. If your upload speeds are consistently at 1 Mbps or less, you may experience streaming problems like dropped frames, audio disruption from buffering, etc. In this scenario a low video bitrate, lower FPS, etc are important.
