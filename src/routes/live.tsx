import { HlsPlayer } from "../components/HlsPlayer";

const nginxRtmpServerURL = import.meta.env.VITE_NGINX_RTMP_SERVER_URL;

const testStreamPlaylistURL = `${nginxRtmpServerURL}/hls/test/stream.m3u8`;
// const mainStreamPlaylistURL = `${nginxRtmpServerURL}/hls/main/stream.m3u8`;

export default function Live() {
  return (
    <div>
      <HlsPlayer
        controls
        src={testStreamPlaylistURL}
        width="100%"
        height="auto"
      />
    </div>
  );
}
