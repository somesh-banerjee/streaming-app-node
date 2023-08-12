interface VideoPlayerProps {
  videoPath: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath }) => {
  return <video src={videoPath} controls className="w-full h-auto"></video>;
};

export default VideoPlayer;
