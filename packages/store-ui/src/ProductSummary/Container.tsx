/** @jsx jsx */
import { ComponentPropsWithoutRef, FC } from 'react'
import { jsx } from 'theme-ui'

import LocalizedLink from '../LocalizedLink/index'

type LocalizedLinkProps = ComponentPropsWithoutRef<typeof LocalizedLink>

interface Props extends LocalizedLinkProps {
  variant: string
}

const ProductSummaryContainer: FC<Props> = ({ children, variant, ...rest }) => (
  <LocalizedLink
    state={{ fromSummary: true }}
    sx={{
      variant: `productSummary.${variant}.container`,
    }}
    {...rest}
  >
    {children}
  </LocalizedLink>
)

export default ProductSummaryContainer
