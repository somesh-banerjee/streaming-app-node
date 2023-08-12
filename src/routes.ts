import { Router } from 'express';
import { listFilesInDirectory } from './controllers/listFiles';

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

export default router;
