'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useDropzone } from 'react-dropzone'

export default function ImageSelector({
  width = '100%',
  aspectRatio = 1,
  resultWidth,
  value = '',
  onChange,
}: {
  width?: string
  aspectRatio?: number
  resultWidth: number
  defaultValue?: string | null
  value: string
  onChange: (value: string) => void
}) {
  const editor = useRef<AvatarEditor>(null)
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    noKeyboard: true,
    maxSize: 1024 * 1024 * 4,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    onDropAccepted: (dropped) => {
      setImage(dropped[0])
      setScale(1.0)
      setOpen(true)
    },
  })
  const [image, setImage] = useState<File>()
  const [scale, setScale] = useState(1.0)
  const [open, setOpen] = useState(false)

  const cropImage = async () => {
    const dataUrl = editor.current?.getImage().toDataURL('image/jpeg')
    const result = await resizeBase64Img(
      dataUrl!,
      resultWidth,
      resultWidth / aspectRatio,
    )
    setOpen(false)
    onChange(result)
  }

  return (
    <div>
      <div className='relative w-fit'>
        <div
          className={cn(
            'relative grid cursor-pointer place-content-center overflow-hidden rounded-md border',
            isDragAccept ? 'scale-150 bg-primary' : 'bg-muted',
          )}
          style={{
            aspectRatio,
            width,
          }}
          {...getRootProps()}
        >
          {!value && <ImagePlus className='size-10 text-gray-300' />}
          {value && (
            <Image
              unoptimized
              className='object-cover'
              fill
              src={value}
              alt=''
            />
          )}
          <input {...getInputProps()} className='hidden' />
          <span className='sr-only'>画像を選択</span>
        </div>

        {value && (
          <Button
            type='button'
            className='absolute right-2 top-2 size-8 text-muted-foreground'
            size='icon'
            variant='outline'
            onClick={() => {
              onChange('')
            }}
          >
            <X size={20} />
            <span className='sr-only'>イメージを削除</span>
          </Button>
        )}
      </div>

      <Dialog open={open} onOpenChange={(status) => setOpen(status)}>
        <DialogContent className='max-w-md'>
          <div
            className='relative overflow-hidden rounded-lg border'
            style={{
              aspectRatio,
            }}
          >
            {image && (
              <AvatarEditor
                className='absolute inset-0 max-h-full max-w-full'
                scale={scale}
                ref={editor}
                width={1000}
                height={1000 / aspectRatio}
                image={image}
              />
            )}
          </div>

          <div className='my-4'>
            <Slider
              max={2}
              step={0.01}
              min={1}
              defaultValue={[1]}
              onValueChange={([value]) => setScale(value)}
            />
          </div>

          <div className='flex justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>閉じる</Button>
            </DialogClose>
            <Button onClick={cropImage}>切り取る</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function resizeBase64Img(base64: string, width: number, height: number) {
  return new Promise<string>((resolve, reject) => {
    const img = document.createElement('img')

    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx!.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg'))
    }

    img.onerror = function (err) {
      reject(err)
    }

    img.src = base64
  })
}
