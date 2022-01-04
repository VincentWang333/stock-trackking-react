import { ActionType } from "../action-types";

interface ChangeTickerAction{
    type: ActionType.CHANGE_TIKCER
    payload: string
}

interface ChangeSelectedDateAction{
    type: ActionType.CHANGE_SELECTED_DATE_OF_WEEK
    payload: number[]
}

interface UpdateSelectedTickerInfoAction{
    type: ActionType.UPDATE_PERFORMANCE_DATA
    payload: any
}

export type Action = ChangeTickerAction | ChangeSelectedDateAction | UpdateSelectedTickerInfoAction