// import { cookies } from 'next/headers'
// import Link from 'next/link'
//
// import { createSupabaseClient } from '@/app/_lib/supabase'
// import { fetchUserWithEmail, fetchUserWithId } from '@/app/_services/userService'
// import { redirect } from 'next/navigation'
//
// type Props = {
//   params: {
//     id: string
//   }
// }
//
// /**
//  * ユーザーのマイページです.
//  * 一般ユーザーもストリーマーユーザーも、自身の情報を確認/編集することができます.
//  * 自身のマイページ以外はアクセス不可.
//  */
// export default async function Page({ params }: Props) {
//   const cookieStore = cookies()
//   const supabase = createSupabaseClient(cookieStore)
//
//   const { data } = await supabase.auth.getSession()
//   const { session } = data
//
//   // ログインユーザー取得
//   const me = session && (await fetchUserWithEmail(session.user.email!))
//
//   // マイページの持ち主ユーザー取得
//   const user = await fetchUserWithId(Number(params.id))
//
//   // 何らかのエラーによりユーザー情報が取得できない場合
//   // トップページにリダイレクト
//   if (!me || !user) redirect('/')
//
//   // 自身のマイページ以外にアクセスしようとした場合
//   // トップページにリダイレクト
//   if (me.id !== user.id) redirect('/')
//
//   return (
//     <>
//       {user ? (
//         <>
//           <p>ユーザーネーム: {user.name}</p>
//           <p>プロフィール: {user.profile}</p>
//           <Link href={`/users/${params.id}/edit`}>
//             <OutlinedButton>プロフィールを編集</OutlinedButton>
//           </Link>
//           {user.isStreamer && (
//             <>
//               <p>プランのリストアイテムがここに並ぶ</p>
//               <Link href={`/users/${params.id}/plans/create`}>
//                 <OutlinedButton>プランを作成</OutlinedButton>
//               </Link>
//               <p>予約可能日時のリストアイテムがここに並ぶ</p>
//               <Link href={`/users/${params.id}/availableDateTimes/create`}>
//                 <OutlinedButton>予約可能日時を作成</OutlinedButton>
//               </Link>
//             </>
//           )}
//         </>
//       ) : (
//         <p>お探しのユーザーは存在しません</p>
//       )}
//     </>
//   )
// }
