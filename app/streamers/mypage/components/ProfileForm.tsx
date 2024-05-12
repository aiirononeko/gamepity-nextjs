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
        className='block border-2 border-game-gray-500 bg-game-gray-700 text-3xl font-bold text-game-white'
        value={name}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
      />
      <textarea
        className='h-32 w-full border-2 border-game-gray-500 bg-game-gray-700 text-game-white'
        value={profile}
        onChange={handleProfileChange}
        onBlur={handleProfileBlur}
      />
      <div className='flex flex-row space-x-3'>
        <div>
          <label className='block text-xs text-game-white'>Youtube</label>
          <input
            className='block border-2 border-game-gray-500 bg-game-gray-700 text-game-white'
            value={youtubeUrl}
            onChange={handleYoutubeUrlChange}
            onBlur={handleYoutubeUrlBlur}
          />
        </div>
        <div>
          <label className='block text-xs text-game-white'>Twitch</label>
          <input
            className='block border-2 border-game-gray-500 bg-game-gray-700 text-game-white'
            value={twitchUrl}
            onChange={handleTwitchUrlChange}
            onBlur={handleTwitchUrlBlur}
          />
        </div>
        <div>
          <label className='block text-xs text-game-white'>X</label>
          <input
            className='block border-2 border-game-gray-500 bg-game-gray-700 text-game-white'
            value={xUrl}
            onChange={handleXUrlChange}
            onBlur={handleXUrlBlur}
          />
        </div>
      </div>
    </form>
  )
}
