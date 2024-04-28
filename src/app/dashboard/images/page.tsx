"use client";
import React, { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import NextImage from "./NextImage/NextImage";
import { getImages } from "./Service/Service";
import { Button, ButtonGroup, useDisclosure } from "@nextui-org/react";
import ImageModal from "./ImageModal/ImageModal";
import { Image } from "@/types";

export default function Page() {
    const [images, setImages] = useState<Image[]>([])
    const [mode, setMode] = useState<"public" | "private">("public");
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    useEffect(() => {
        const _getImages = async () => setImages(await getImages());
        _getImages();
    },[])

    return (
        <div className="flex flex-col gap-4">
            <ButtonGroup>
                <Button 
                    color={mode === "public" ? "success" : "default"} 
                    onClick={() => setMode("public")}>
                        Explore
                </Button>
                <Button
                    color={mode === "private" ? "success" : "default"}
                    onClick={() => setMode("private")}>
                        My Images
                </Button>
                {mode === "private" &&
                    <Button
                        color="warning"
                        onPress={onOpen}>
                            Upload Image
                    </Button>
                }
            </ButtonGroup>
            <PhotoAlbum 
                layout="rows"
                photos={images}
                renderPhoto={ (props) => (<NextImage mode={mode} {...props}/>) }
                sizes={{ size: "100vw" }}
            />

            <ImageModal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange} 
                onClose={onClose} 
                mode="upload"/>
        </div>
    );
}