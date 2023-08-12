import { useAppContext } from '../utils/Context';
import ImageViewer from './ImageViewer';
import VideoPlayer from './VideoPlayer';

const Viewer: React.FC = () => {
  const { current_file, current_file_type, current_directory, updateAppState } =
    useAppContext();

  const closeModal = () => {
    updateAppState({
      current_file: null,
      current_file_type: '',
      current_directory: current_directory,
    });
  };

  return (
    <div
      className={`${
        current_file
          ? 'fixed inset-0 flex items-center justify-center'
          : 'hidden'
      } bg-black bg-opacity-50 z-50 transition-opacity duration-300`}
      onClick={closeModal}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {current_file && current_file_type === 'image' && (
          <ImageViewer imagePath={current_file} />
        )}
        {current_file && current_file_type === 'video' && (
          <VideoPlayer videoPath={current_file} />
        )}
      </div>
    </div>
  );
};

export default Viewer;
