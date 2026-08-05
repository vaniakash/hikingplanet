'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    console.log('DEBUG: Using Upload Preset:', uploadPreset || "boundlesspath_unsigned (fallback)");

    const onUpload = (result: any) => {
        // Cloudinary returns secure_url
        if (result.event === 'success') {
            onChange([...value, result.info.secure_url]);
        }
    };

    const onRemove = (url: string) => {
        onChange(value.filter((current) => current !== url));
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={() => onRemove(url)}
                                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                disabled={disabled}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "boundlesspath_unsigned"}
                onSuccess={onUpload}
                options={{
                    maxFiles: 5,
                    resourceType: "image"
                }}
            >
                {({ open }) => {
                    return (
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => open()}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition border border-gray-300"
                        >
                            <ImagePlus className="w-4 h-4" />
                            Upload Images
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}
