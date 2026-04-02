import { useState, useRef, type ChangeEvent, useMemo } from "react";
import { Trash2, Upload } from "lucide-react";
import { Button } from "./button";

interface ImageInputProps {
    onChange?: (file: File | null | string) => void;
    value?: string | File | null;
}

export const ImageInput = ({ onChange, value }: ImageInputProps) => {

    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const preview = useMemo(() => {
        if (typeof value === "string") return value; 
        if (value instanceof File) return filePreview; 
        return null;
    }, [value, filePreview]);

    const handleContainerClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            if (onChange) onChange(file);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (onChange) onChange(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleContainerClick();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div
                role="button"
                tabIndex={0}
                aria-label="Upload de imagem do produto"
                className="group border-2 border-dashed bg-accent/20 rounded-3xl flex flex-col items-center justify-center transition-colors cursor-pointer h-96 hover:opacity-80 overflow-hidden focus-visible:ring-2 focus-visible:ring-primary outline-none"
                onClick={handleContainerClick}
                onKeyDown={handleKeyDown}
            >
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <div className="relative w-full h-full flex flex-col justify-center items-center pointer-events-none">
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="Preview do produto"
                                className="w-full h-full object-cover"
                            />
                            <Button
                                variant="destructive"
                                buttonSize="icon"
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-4 right-4 p-2 text-foreground pointer-events-auto"
                            >
                                <Trash2 />
                            </Button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Upload size={40} className="text-accent-foreground mb-3" />
                            <p className="text-sm text-accent-foreground text-center">
                                Clique ou arraste para fazer upload <br />
                                <span className="text-xs">PNG, JPG até 5MB</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};