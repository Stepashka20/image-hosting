import {SimpleGrid,Image,ActionIcon,createStyles } from '@mantine/core';
import { IconX } from '@tabler/icons';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

import './Previews.css';
 
const useStyles = createStyles((theme) => ({
    imageParent: {
        position: "relative"
    },
    deleteBtn:{
        position: "absolute",
        top: -10,
        right: -10,
        zIndex: 10,
    }
}));

export function Previews({files,setFiles}) {
    console.log(files)

    const {classes} = useStyles();

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        console.log(file.id)
        return (
            <CSSTransition in={true} timeout={300} classNames="alert" key={file.id} unmountOnExit>
                <span className={classes.imageParent}>
                    <Image
                        src={imageUrl}
                        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                    />
                    <ActionIcon
                        variant="default"
                        radius="xl"  
                        className={classes.deleteBtn}    
                        onClick={() => setFiles(files.filter((item) => item.id !== file.id))}
                    >
                        <IconX size={16}/>
                    </ActionIcon>
                </span>
            </CSSTransition>
        );
    });
    return (
        <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
            mt={previews.length > 0 ? 'xl' : 0}
        >
            <TransitionGroup component={null}>
                {previews}
            </TransitionGroup>
        </SimpleGrid>
    )
}

export default Previews;