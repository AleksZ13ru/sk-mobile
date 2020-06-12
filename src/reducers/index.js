export default function reducer (state, action) {
    switch (action.type) {
        case "SET_TITLE":
            return {
                ...state,
                title: action.text
            };
        case "SET_SEARCH_MACHINE":
            return{
                ...state,
                searchMachine: action.text
            };
        case "CLEAR_SEARCH_MACHINE":
            return{
                ...state,
                searchMachine: ''
            };
        case "DEFAULT":
            return; //вернуть новое состояние
        default:
            return state;
    }
}