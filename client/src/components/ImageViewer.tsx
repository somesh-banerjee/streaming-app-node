interface ImageViewerProps {
  imagePath: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imagePath }) => {
  return <img src={imagePath} alt="Image" className="w-full h-auto" />;
};

export default ImageViewer;
