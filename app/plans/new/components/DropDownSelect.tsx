'use client'

import Select from 'react-select'

type Props = {
  options: { label: string; value: number }[]
}

export const DropDownSelect = ({ options }: Props) => {
  return (
    <Select
      options={options}
      name='gameIds'
      isMulti={true}
      placeholder='選択してください'
    />
  )
}
