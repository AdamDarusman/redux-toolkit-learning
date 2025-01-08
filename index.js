const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

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

const initialState = {
    numOffCakes: 10
}

const reducer = (state = initialState, action) => {
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

const store = createStore(reducer)
console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => 
    console.log('update store', store.getState())
)

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockedCake(5))

const actions = redux.bindActionCreators({orderCake, restockedCake}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockedCake(3)

unsubscribe()