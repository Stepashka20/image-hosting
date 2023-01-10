import { useState } from 'react';
import RightNavBarr from './RightNavBar';
import MainDropzone from './MainDropzone';
import Previews from './Previews';
import { Card } from '@mantine/core';
import uuid from 'react-uuid';
export function App() {
    const [files, setFiles] = useState([]);
    const mySetFiles = (_files) => {
        _files = _files.map((file) => {
            file.id = uuid();
            return file;
        });
        console.log(_files)
        setFiles(_files);
    }
    return (
        <div>
            <Card style={{maxWidth: 1000, margin: "0 auto",marginTop: 40}}>
                <MainDropzone onDrop={mySetFiles} />
                <Previews files={files} setFiles={setFiles}/>
            </Card>
            
        </div>
  );
}

export default App;