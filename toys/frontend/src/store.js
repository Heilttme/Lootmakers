import { create } from "zustand"

const useStore = create(set => ({
    cart: [],
    add: (item) => 
        set(state => ({cart: [...state.cart, {...item, quantity: 1}]})),
    remove: (item) => 
        set(state => {
            const newAr = []
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id !== item.id){
                    newAr.push(state.cart[i])
                }
            }
            return {cart: newAr}
        }),
    increment: (item) => 
        set(state => {
            const newAr = []
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id === item.id && (state.cart[i].quantity + 1 <= state.cart[i].quantityAvailable)) {
                    newAr.push({...state.cart[i], quantity: state.cart[i].quantity !== 99 ? state.cart[i].quantity + 1 : 99})
                } else {
                    newAr.push(state.cart[i])
                }
            }
            
            return {cart: newAr}
        }),
    decrement: (item) => 
        set(state => {
            const newAr = []
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id === item.id) {
                    newAr.push({...state.cart[i], quantity: state.cart[i].quantity !== 1 ? state.cart[i].quantity - 1 : 1})
                } else {
                    newAr.push(state.cart[i])
                }
            }

            return {cart: newAr}
        }),
    clearCart: (item) => 
        set(state => {
            return {cart: []}
        }),
    order: [],
    setOrder: (order) => 
        set(state => ({order: order})),
}))

export default useStore