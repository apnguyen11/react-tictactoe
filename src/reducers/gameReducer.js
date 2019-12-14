import {X, O} from '../symbols/symbols';
import * as _ from 'lodash';
import resultForSymbol from '../logic/logic'

export const initialState = {
    board: {
        0: ['', '', ''],
        1: ['', '', ''],
        2: ['', '', '']
    },
    won: undefined,
    wonLine: undefined,
    draw: false,
    turn: 0
};

export const gameReducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_SYMBOL':
        const {symbol, row, position} = action;
        const newState = _.cloneDeep(state);
        newState.board[row][position] = symbol;
  
        const xResult = resultForSymbol(X, newState.board);
        const oResult = resultForSymbol(O, newState.board);

        if(xResult.won){
            newState.won = X;
            newState.wonLine = xResult.line;
        }

        if(oResult.won){
            newState.won = O;
            newState.wonLine = oResult.line;
        }

        if(!newState.won){
            newState.turn = newState.turn === O ? X : O;
        }

        const boardIsFull = [
            ...newState.board[0],
            ...newState.board[1],
            ...newState.board[2]
            
        ].filter(symbol => symbol !== "").length===9; 

        if(boardIsFull && !newState.won){
            newState.draw = true;
        }

        return newState;
        case 'START_AGAIN':
            return initialState;
        default:
            return state;

        
    }
}