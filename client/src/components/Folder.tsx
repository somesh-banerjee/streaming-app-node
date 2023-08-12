import React, { useEffect, useState } from 'react';
import { useAppContext } from '../utils/Context';

interface File {
  id: number;
  name: string;
  type: 'image' | 'video' | 'directory' | 'other';
}

const getFileIcon = (fileType: 'image' | 'video' | 'directory' | 'other') => {
  if (fileType === 'image') {
    return '📷';
  } else if (fileType === 'video') {
    return '🎥';
  } else if (fileType === 'directory') {
    return '📁';
  }
  return '📄';
};

const FileList: React.FC<{
  files: File[];
  handleClick: (file: File) => void;
}> = ({ files, handleClick }) => {
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex flex-col md:flex-row items-center md:space-x-2 space-y-2 md:space-y-0 hover:bg-gray-100 rounded-lg cursor-pointer"
          onClick={() => handleClick(file)}
        >
          <span className="text-lg">{getFileIcon(file.type)}</span>
          <span>{file.name}</span>
        </div>
      ))}
    </div>
  );
};

export const Folder: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { current_directory, updateAppState } = useAppContext();

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch(`/api/files?directory=${current_directory}`);
      const data = await res.json();
      setFiles(data);
    };

    fetchFiles();
  }, [current_directory]);

  const goBack = () => {
    updateAppState({
      current_file: null,
      current_file_type: '',
      current_directory: current_directory.split('/').slice(0, -1).join('/'),
    });
  };

  const handleClick = (file: File) => {
    if (file.type === 'directory') {
      updateAppState({
        current_file: null,
        current_file_type: '',
        current_directory: `${current_directory}/${file.name}`,
      });
    } else {
      updateAppState({
        current_file: `${current_directory}/${file.name}`,
        current_file_type: file.type,
        current_directory: current_directory,
      });
    }
  };

  return (
    <>
      <div className="w-screen p-1 m-1">
        <div className="cursor-pointer" onClick={goBack}>
          Back
        </div>
      </div>
      <FileList files={files} handleClick={handleClick} />
    </>
  );
};

export default FileList;
