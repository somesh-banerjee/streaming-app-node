import { useRef } from 'react';

interface VideoPlayerProps {
  videoPath: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      src={'api/video' + videoPath}
      controls
      className="w-full h-auto"
      autoPlay
    ></video>
  );
};

export default VideoPlayer;
