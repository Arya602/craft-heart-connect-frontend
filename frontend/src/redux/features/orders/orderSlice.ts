import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
    id: string;
    title: string;
    price: number;
    image: string;
    artisan: string;
    quantity: number;
}

export interface Order {
    orderId: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: string;
    deliveryAddress: {
        fullName: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    orderDate: string;
    estimatedDelivery?: string;
    trackingUpdates: {
        status: string;
        message: string;
        timestamp: string;
    }[];
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload);
        },
        updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
            const order = state.orders.find(o => o.orderId === action.payload.orderId);
            if (order) {
                order.status = action.payload.status;
            }
        },
        addTrackingUpdate: (state, action: PayloadAction<{ orderId: string; update: Order['trackingUpdates'][0] }>) => {
            const order = state.orders.find(o => o.orderId === action.payload.orderId);
            if (order) {
                order.trackingUpdates.push(action.payload.update);
            }
        },
    },
});

export const { addOrder, updateOrderStatus, addTrackingUpdate } = orderSlice.actions;
export default orderSlice.reducer;
