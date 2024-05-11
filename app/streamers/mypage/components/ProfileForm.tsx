'use client'

import { ChangeEvent, useState } from 'react'
import { updateProfile } from '@/actions/streamer'

type Props = {
  streamerId: string
  initialName: string
  initialProfile: string | null
  initialYoutubeUrl: string | null
  initialTwitchUrl: string | null
  initialXUrl: string | null
}

export default function ProfileForm({
  streamerId,
  initialName,
  initialProfile,
  initialYoutubeUrl,
  initialTwitchUrl,
  initialXUrl,
}: Props) {
  const [name, setName] = useState<string>(initialName)
  const [profile, setProfile] = useState<string>(initialProfile ?? '')
  const [youtubeUrl, setYoutubeUrl] = useState<string>(initialYoutubeUrl ?? '')
  const [twitchUrl, setTwitchUrl] = useState<string>(initialTwitchUrl ?? '')
  const [xUrl, setXUrl] = useState<string>(initialXUrl ?? '')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleNameBlur = async () => {
    if (initialName !== name) {
      await updateProfile({ streamerId, name })
    }
  }

  const handleProfileChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProfile(e.target.value)
  }

  const handleProfileBlur = async () => {
    if (initialProfile !== profile) {
      await updateProfile({ streamerId, profile })
    }
  }

  const handleYoutubeUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value)
  }

  const handleYoutubeUrlBlur = async () => {
    if (initialYoutubeUrl !== youtubeUrl) {
      await updateProfile({ streamerId, youtubeUrl })
    }
  }

  const handleTwitchUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTwitchUrl(e.target.value)
  }

  const handleTwitchUrlBlur = async () => {
    if (initialTwitchUrl !== twitchUrl) {
      await updateProfile({ streamerId, twitchUrl })
    }
  }

  const handleXUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setXUrl(e.target.value)
  }

  const handleXUrlBlur = async () => {
    if (initialXUrl !== xUrl) {
      await updateProfile({ streamerId, xUrl })
    }
  }

  return (
    <form className='basis-3/5 space-y-4 pl-10'>
      <input
        className='border-game-gray-500 bg-game-gray-700 text-game-white block border-2 text-3xl font-bold'
        value={name}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
      />
      <textarea
        className='border-game-gray-500 bg-game-gray-700 text-game-white h-32 w-full border-2'
        value={profile}
        onChange={handleProfileChange}
        onBlur={handleProfileBlur}
      />
      <div className='flex flex-row space-x-3'>
        <div>
          <label className='text-game-white block text-xs'>Youtube</label>
          <input
            className='border-game-gray-500 bg-game-gray-700 text-game-white block border-2'
            value={youtubeUrl}
            onChange={handleYoutubeUrlChange}
            onBlur={handleYoutubeUrlBlur}
          />
        </div>
        <div>
          <label className='text-game-white block text-xs'>Twitch</label>
          <input
            className='border-game-gray-500 bg-game-gray-700 text-game-white block border-2'
            value={twitchUrl}
            onChange={handleTwitchUrlChange}
            onBlur={handleTwitchUrlBlur}
          />
        </div>
        <div>
          <label className='text-game-white block text-xs'>X</label>
          <input
            className='border-game-gray-500 bg-game-gray-700 text-game-white block border-2'
            value={xUrl}
            onChange={handleXUrlChange}
            onBlur={handleXUrlBlur}
          />
        </div>
      </div>
    </form>
  )
}
