import { Header, Container,Text } from '@mantine/core';
import image from "../assets/image.svg"
export default function TopHeader({}) {
    return (
        <Header height={56} mb={40}>
            <Container style={{display: "flex", alignItems: "center", height: 56, justifyContent: "center"}}>
                <Text size="xl" weight={700} color="white" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                    <img src={image} style={{height: 30, marginRight: 10}}/>
                    Image Cloud
                </Text>
            </Container>
        </Header>
    )
}