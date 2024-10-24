import type { AnalyticsEvent } from '@faststore-b2b/sdk'

import handleSearchEvent from './search'

export default function sendEvent(event: AnalyticsEvent) {
  // VTEX RC
  window?.sendrc?.(event.name, event.params)

  // VTEX Intelligent Search
  handleSearchEvent(event)
}
