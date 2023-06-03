import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectApps = (state) => state.apps

const appsSelector = createDraftSafeSelector(selectApps, (apps) => apps)

export default appsSelector
