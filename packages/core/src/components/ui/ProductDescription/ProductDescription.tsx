import { useState, useMemo } from 'react'

import {
  Accordion as UIAccordion,
  AccordionItem as UIAccordionItem,
  AccordionPanel as UIAccordionPanel,
  AccordionButton as UIAccordionButton,
} from '@faststore-b2b/ui'

type DescriptionData = {
  title: string
  content: string
}

interface ProductDescriptionProps {
  /**
   * Controls which articles will be initially expanded.
   *
   * @default 'first'
   */
  initiallyExpanded?: 'first' | 'all' | 'none'
  /**
   * Product description data.
   *
   */
  descriptionData: DescriptionData[]
}

function ProductDescription({
  descriptionData,
  initiallyExpanded = 'first',
}: ProductDescriptionProps) {
  /**
   * Maps 'initiallyExpanded' prop values to indices
   */
  const INITIALLY_EXPANDED_MAP = useMemo(
    () => ({
      none: [],
      first: [0],
      all: [0, 1, 2, 3],
    }),
    []
  )

  const [indices, setIndices] = useState(
    new Set(INITIALLY_EXPANDED_MAP[initiallyExpanded])
  )

  const onChange = (index: number) => {
    setIndices((currentIndices) => {
      const newIndices = new Set(currentIndices)

      if (currentIndices.has(index)) {
        newIndices.delete(index)
      } else {
        newIndices.add(index)
      }

      return newIndices
    })
  }

  return (
    <section data-fs-product-description>
      <UIAccordion
        indices={indices}
        onChange={onChange}
        aria-label="Product Details Content"
      >
        {descriptionData.map(({ title, content }, index) => (
          <UIAccordionItem
            as="article"
            index={index}
            key={String(index)}
            prefixId="product-description"
            data-fs-product-details-description
          >
            <UIAccordionButton>{title}</UIAccordionButton>
            <UIAccordionPanel>
              <div
                // Applies display: contents through FastStore UI
                data-fs-product-details-description-content
                // The content is already sanitized by FastStore API
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </UIAccordionPanel>
          </UIAccordionItem>
        ))}
      </UIAccordion>
    </section>
  )
}

export default ProductDescription
