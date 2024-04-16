'use client'

import { insertIconUrl, uploadFile } from "@/actions/storage"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  userId: string
  initialIconUrl: string | null
}

export default function IconUploadForm({ userId, initialIconUrl }: Props) {
  const [iconUrl, setIconUrl] = useState<string>()

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length < 1) return
    const iconUrl = await uploadFile(e.currentTarget.files[0], userId)
    await insertIconUrl(true, userId, iconUrl)
    setIconUrl(iconUrl)
  }

  useEffect(() => {
    if (initialIconUrl) setIconUrl(initialIconUrl)
  }, [initialIconUrl])

  return (
    <div className='flex basis-2/5 items-center justify-center'>
      <label
        htmlFor='dropzone-file'
        className='relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600'
      >
        <div className='flex flex-col items-center justify-center pb-6 pt-5'>
          <svg
            className='mb-4 size-8 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 16'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
            />
          </svg>
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            クリックしてファイルをアップロード
          </p>
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            {' '}
            またはドラッグ&ドロップ
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>PNG, JPG</p>
        </div>
        {iconUrl && <Image alt='icon' src={iconUrl} fill={true} />}
        <input
          id='dropzone-file'
          type='file'
          className='hidden'
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}
