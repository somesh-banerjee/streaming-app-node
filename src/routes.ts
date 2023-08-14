import { Router } from 'express';
import { listFilesInDirectory } from './controllers/listFiles';
import { videoTransfer } from './controllers/videoTransfer';

const router = Router();

router.get('/files', async (req: any, res: any) => {
  const { directory } = req.query;
  try {
    let files: any;
    if (!directory) {
      files = await listFilesInDirectory('');
    } else {
      files = await listFilesInDirectory(directory);
    }
    return res.status(200).send(files);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: 'Internal server error',
    });
  }
});

router.get('/video/:directory', async (req: any, res: any) => {
  const { range } = req.headers;
  if (!range) {
    return res.status(400).send('Requires Range header');
  }
  return videoTransfer(req, res);
});

export default router;
