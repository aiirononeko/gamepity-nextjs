'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  open: boolean
}

export const PlanDialog = ({ open }: Props) => {
  const [isOpen, setIsOpen] = useState(open)

  const handleClickButton = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-4'>予約日の追加をお忘れなく！</DialogTitle>
          <DialogDescription>
            新しいプランが追加されましたが、まだ予約可能な日付が設定されていません。
            ユーザーがあなたのプランを予約できるように、予約日を追加しましょう！
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={handleClickButton}>
            今はやめる
          </Button>
          <Button variant='default' asChild>
            <Link href='/available-date-times'>予約日を追加する</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
