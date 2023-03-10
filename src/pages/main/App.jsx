import { useState } from 'react';

import MainDropzone from './MainDropzone';
import Previews from './Previews';
import { Button, Card } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {useHotkeys } from '@mantine/hooks';
import uuid from 'react-uuid';

const MAIN_URL = window.location.origin;

export function App() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [maxProgress, setMaxProgress] = useState(100);
    const [progress, setProgress] = useState(0);
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
        ['ctrl+V', (e) => {
            navigator.clipboard.read().then(async (clipboardItems) => {
                for (const clipboardItem of clipboardItems) {
                    for (const type of clipboardItem.types) {
                        const blob = await clipboardItem.getType(type);
                        if (type === "image/png") {
                            appendFiles([blob]);
                        }
                    }
                }
            })
        }],
      ]);
    const startUpload = async () => {
        setLoading(true);
        setMaxProgress(files.length);
        setProgress(0);
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("upload", file);
        });
        const response = await fetch(`${MAIN_URL}/api/upload`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            showNotification({
                title: "Success",
                message: "Files uploaded successfully",
                color: 'green',
            })
            // navigate to /${data.key}
            location.href = `/${data.key}`;
        }
        else {
            showNotification({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
        }
        setFiles([]);
        setLoading(false);
    }
    return (
        <div>
            <Card style={{maxWidth: 1000, margin: "0 auto",marginTop: 40}}>
                <MainDropzone onDrop={appendFiles} />
                <Previews files={files} setFiles={setFiles} loading={loading}/>
                {files.length > 0 ? 
                <div style={{textAlign: "center",paddingTop: 20}}>
                    <Button onClick={startUpload} loading={loading}>
                        {/* progress in % */}
                        {loading ? `Uploading... ${Math.round(progress/maxProgress*100)}%` : "Upload"}
                    </Button>
                </div>
                : null}
            </Card>
            
        </div>
  );
}

export default App;