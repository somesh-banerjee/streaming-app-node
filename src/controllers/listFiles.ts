import fs from 'fs';
import path from 'path';

const getFileType = (extension: string) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];

  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (videoExtensions.includes(extension)) {
    return 'video';
  } else {
    return 'other';
  }
};

export const listFilesInDirectory = async (directory: string) => {
  const directoryPath = path.join(__dirname, '../data', directory);

  let files: any[] = [];
  try {
    files = await fs.promises.readdir(directoryPath);
  } catch (error) {
    console.log(error);
    throw error;
  }

  files = await Promise.all(
    files.map(async (file, index) => {
      const filePath = path.join(directoryPath, file);
      try {
        const stats = await fs.promises.stat(filePath);
        return {
          id: index,
          name: file,
          type: stats.isDirectory()
            ? 'directory'
            : getFileType(path.extname(file).toLowerCase().substring(1)),
        };
      } catch (error) {
        console.log(`Error reading file info for ${file}: ${error}`);
        return {
          id: index,
          type: 'other',
          name: file,
        };
      }
    }),
  );
  return files;
};
