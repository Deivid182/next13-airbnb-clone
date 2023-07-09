"use client"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) =>  {

  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url)
  }, [onChange])

  return (
    <CldUploadWidget 
      onUpload={handleUpload}
      uploadPreset="d9y0krwj"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed p-20 border-neutral-200 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus className="w-20 h-20" />
            <div className="font-semibold text-lg">
              Click to upload image
            </div>
            {value && (
              <div  className="absolute inset-0 w-full h-full">
                <Image 
                  fill
                  src={value}
                  style={{ objectFit: "cover" }}
                  alt="uploaded image"
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload