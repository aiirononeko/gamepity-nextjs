'server-only'

import { SupabaseClient } from '@supabase/supabase-js'
import { decode } from 'base64-arraybuffer'

export const manageImage = async (
  supabase: SupabaseClient,
  image: string | undefined,
  userId: string,
) => {
  if (!image) {
    // ストレージから画像を削除
    const { error } = await supabase.storage
      .from('gamepity-images')
      .remove([`icons/${userId}.jpeg`])
    if (error) console.error(error)
    return
  }

  if (image?.startsWith('data:')) {
    // 画像をアップロード
    const base64String = image.split(',')[1]
    const buffer = decode(base64String)
    const { data, error } = await supabase.storage
      .from('gamepity-images')
      .upload(`icons/${userId}.jpeg`, buffer, {
        upsert: true,
        contentType: 'image/jpeg',
      })
    if (error) console.error(error)

    // アップロードした画像のURLを取得
    if (data) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('gamepity-images').getPublicUrl(data.path)
      return publicUrl
    }
  }

  return image
}
