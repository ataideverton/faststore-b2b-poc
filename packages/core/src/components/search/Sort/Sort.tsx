import { useSearch } from '@faststore-b2b/sdk'
import { SelectField } from '@faststore-b2b/ui'

const OptionsMap = {
  price_desc: 'Price, descending',
  price_asc: 'Price, ascending',
  orders_desc: 'Top sales',
  name_asc: 'Name, A-Z',
  name_desc: 'Name, Z-A',
  release_desc: 'Release date',
  discount_desc: 'Discount',
  score_desc: 'Relevance',
}

const keys = Object.keys(OptionsMap) as Array<keyof typeof OptionsMap>
export interface SortProps {
  label?: string
  options?: {
    price_desc?: string
    price_asc?: string
    orders_desc?: string
    name_asc?: string
    name_desc?: string
    release_desc?: string
    discount_desc?: string
    score_desc?: string
  }
}

type SortOptionKeys = keyof SortProps['options']

function Sort({ label = 'Sort by', options = OptionsMap }: SortProps) {
  const { state, setState } = useSearch()

  const optionsMap = Object.keys(options).reduce(
    (acc, currentKey: SortOptionKeys) => {
      acc[currentKey] = options[currentKey] ?? OptionsMap[currentKey]
      return acc
    },
    {} as Record<SortOptionKeys, string>
  )

  return (
    <SelectField
      id="sort-select"
      className="sort / text__title-mini-alt"
      label={label}
      options={optionsMap}
      onChange={(e) => {
        const sort = keys[e.target.selectedIndex]

        setState({
          ...state,
          sort,
          page: 0,
        })
      }}
      value={state.sort}
      testId="search-sort"
    />
  )
}

export default Sort
