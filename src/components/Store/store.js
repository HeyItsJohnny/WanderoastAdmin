import { configureStore } from '@reduxjs/toolkit';
import cartSystem from '../Systems/cartSystem';

const store = configureStore({
    reducer: {
        name: cartSystem
    }
});

export default store;