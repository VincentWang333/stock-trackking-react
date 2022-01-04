import { useSelector } from 'react-redux';
import './App.css';
import { RootState } from './State/reducers';
import TickerPicker from './Component/TickerPicker';
import StockPerformanceChart from './Component/StockPerformanceChart';
import WeekPicker from './Component/WeekPicker';


function App(){

  const state = useSelector((state: RootState)=>state.stock);

  return (
    <div className='App'>
      <h1 className='title'>CAPINTEL CHALLENGE</h1>
      <div>
        <p className="info">Growth of 10,000$</p>
        <div className="stock-picker-container">
          <label>NASDAQ: </label>
          <TickerPicker selectedTicker = {state.selectedTicker}/>
        </div>
      </div>
      <div className='char-container'>
        <StockPerformanceChart 
          selectedWeekRange={state.selectedWeekRangeTimestamp}
          performanceData={state.performanceData}
          selectedTicker={state.selectedTicker}/>
      </div>
      <div>
        <p>Start the week of: </p>
        <WeekPicker 
          selectedTicker = {state.selectedTicker}
          maxDateTimestamp={state.maxDateRangeTimestamp} 
          minDateTimestamp={state.minDateRangeTimestamp}/>
      </div>
    </div>
    )
}

export default App;
