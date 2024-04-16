import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export const uploadFile = async (file: File, userId: string): Promise<string> => {
  const filePath = `icons/${userId}/${file.name}`
  const { error } = await supabase.storage
    .from('gamepity-images')
    .upload(filePath, file)
  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from('gamepity-images').getPublicUrl(filePath)
  return data.publicUrl
}

export const insertIconUrl = async(isStreamer: boolean, userId: string, iconUrl: string): Promise<void> => {
  const query = isStreamer ? supabase.from('streamers').update({ icon_url: iconUrl }).eq('id', userId).select('*') : supabase.from('users').update({ icon_url: iconUrl }).eq('id', userId)
  const { error } = await query
  if (error) {
    await deleteFile(iconUrl)
    throw new Error(error.message)
  }
}

const deleteFile = async(filePath: string): Promise<void> => {
  const { error } = await supabase.storage.from('gamepity-images').remove([filePath])
  if (error) throw new Error(error.message)
}
