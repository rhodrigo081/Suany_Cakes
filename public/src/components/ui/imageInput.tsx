import { useState, useRef, type ChangeEvent } from "react";
import { Trash2, Upload } from "lucide-react";
import { Button } from "./button";

interface ImageInputProps {
    onChange?: (file: File | null) => void;
    defaultValue?: string;
}

export const ImageInput = ({ onChange, defaultValue }: ImageInputProps) => {
    const [preview, setPreview] = useState<string | null>(defaultValue || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleContainerClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            if (onChange) onChange(file);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (onChange) onChange(null);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="group border-2 border-dashed bg-accent/20 rounded-3xl flex flex-col items-center justify-center transition-colors cursor-pointer h-96 hover:opacity-80 overflow-hidden">
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <div
                    onClick={handleContainerClick}
                    className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden"
                >
                    {preview ? (
                        <div>
                            <img
                                src={preview}
                                alt="Preview"
                                className="relative w-full h-full object-cover"
                            />
                            <Button
                                variant="destructive"
                                buttonSize="icon"
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-4 right-4 p-2 text-foreground"
                            >
                                <Trash2/>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Upload size={40} className="text-accent-foreground mb-3" />
                            <p className="text-sm text-accent-foreground text-center">
                                Clique para fazer upload <br />
                                <span className="text-xs">PNG, JPG até 5MB</span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};