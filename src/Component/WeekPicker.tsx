import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker"
import type {Value} from "react-multi-date-picker"
import InputIcon from "react-multi-date-picker/components/input_icon"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "../State";

export default function WeekPicker(props:{selectedTicker:string, maxDateTimestamp:number, minDateTimestamp:number}) {
  const dispatch = useDispatch();
  const {changeSelectedWeekTo} = bindActionCreators(actionCreators, dispatch);
  const [value, setValue] = useState<Value>(new Date(props.minDateTimestamp));

  useEffect(()=>{
    if(props.minDateTimestamp && props.selectedTicker){
      setValue(new Date(props.minDateTimestamp));
    }
  },[props.minDateTimestamp, props.selectedTicker]);
  
  const handleDatePickerChange = (value:Value) => {
    var selectedRange = value?.toString();
    var selectedWeek = selectedRange?.split(",");
    var selectedWeekendUpperBound = selectedWeek?.[1].split('/');
    var selectedWeekendLowerBound = selectedWeek?.[0].split('/');
    var selectedRangeUpperBoundDate = new Date(Number(selectedWeekendUpperBound?.[0]), 
                                                Number(selectedWeekendUpperBound?.[1])-1, 
                                                Number(selectedWeekendUpperBound?.[2]));
    var selectedWeekendLowerBoundDate = new Date(Number(selectedWeekendLowerBound?.[0]),
                                                  Number(selectedWeekendLowerBound?.[1])-1,
                                                  Number(selectedWeekendLowerBound?.[2]));
    changeSelectedWeekTo(selectedWeekendLowerBoundDate.getTime(), selectedRangeUpperBoundDate.getTime());
  }

  return <DatePicker                    
            range 
            weekPicker={true} 
            render={<InputIcon/>}
            value = {value}
            onChange={(value)=>handleDatePickerChange(value)}
            maxDate={new Date(props.maxDateTimestamp)}
            minDate={new Date(props.minDateTimestamp)}
            showOtherDays/>;
}