import { Folder } from './components/Folder';
import Viewer from './components/Viewer';
import { useAppContext } from './utils/Context';

function App() {
  const { current_file } = useAppContext();
  return (
    <>
      {current_file && <Viewer />}
      <Folder />
    </>
  );
}

export default App;
