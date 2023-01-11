import { useState } from 'react';
import RightNavBarr from './RightNavBar';
import MainDropzone from './MainDropzone';
import Previews from './Previews';
import { Button, Card } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {useHotkeys } from '@mantine/hooks';
import uuid from 'react-uuid';


export function App() {
    const [files, setFiles] = useState([]);
    const appendFiles = (_files) => {
        if (files.length + _files.length > 10) {
            showNotification({
                title: "Error",
                message: "You can only upload 10 files at a time",
                color: 'red',
            })
            return;
        }
        _files = _files.map((file) => {
            file.id = uuid();
            return file;
        });
        
        setFiles((prevFiles) => {
            return prevFiles.concat(_files);
        });
    }
    useHotkeys([
        ['ctrl+V', () => {
            // get image from clipboard
            navigator.clipboard.read().then((data) => {
                const items = data.items;
                for (const item of items) {
                    if (item.kind === 'file') {
                        const file = item.getAsFile();
                        appendFiles([file]);
                    }
                }
            });
        }],
      ]);
    return (
        <div>
            <Card style={{maxWidth: 1000, margin: "0 auto",marginTop: 40}}>
                <MainDropzone onDrop={appendFiles} />
                <Previews files={files} setFiles={setFiles}/>
                {files.length > 0 ? 
                <div style={{textAlign: "center",paddingTop: 20}}>
                    <Button>
                        Start Upload
                    </Button>
                </div>
                : null}

            </Card>
            
        </div>
  );
}

export default App;