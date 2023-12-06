import { configureStore } from '@reduxjs/toolkit'
import accessReducer from './accessSlice'
import isLoadReducer from './isLoadSlice'

import projectsReducer from './projectsSlice'
import categoriesReducer from './categoriesSlice'
const reducer = {
    access: accessReducer,
    isLoad: isLoadReducer,
    projects: projectsReducer,
    categories: categoriesReducer
}
const store = configureStore({reducer})
export default store