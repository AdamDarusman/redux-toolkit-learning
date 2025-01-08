const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
    return{
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockedCake(qty = 1) {
    return{
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1) {
    return{
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockedIceCream(qty = 1) {
    return{
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

// const initialState = {
//     numOffCakes: 10,
//     numOffIceCreams: 20
// }

const initialCakeState = {
    numOffCakes: 10,
}

const initialIceCreamState = {
    numOffIceCreams: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOffCakes: state.numOffCakes - 1,
            }
            case CAKE_RESTOCKED:
                return {
                    ...state,
                    numOffCakes: state.numOffCakes + action.payload
                }
                default:
                    return state
    }
}

const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOffIceCreams: state.numOffIceCreams - 1,
            }
            case ICECREAM_RESTOCKED:
                return {
                    ...state,
                    numOffIceCreams: state.numOffIceCreams + action.payload
                }
                default:
                    return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: IceCreamReducer
})

const store = createStore(rootReducer)
console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => 
    console.log('update store', store.getState())
)

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockedCake(5))

const actions = bindActionCreators({orderCake, restockedCake, orderIceCream, restockedIceCream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockedCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockedIceCream(2)

unsubscribe()