import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    title: "Сарансккабель",
    searchMachine: ""
};

export function setTitle (text) {
    return {
        type: "SET_TITLE",
        text: text
    }
}

export const store = createStore(reducer, initialState);