import {configureStore} from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import savedJobReducer from './savedJobsSlice';

import themereducer from './themeSlice';


export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        savedJobs: savedJobReducer,
        theme: themereducer,
    },
});