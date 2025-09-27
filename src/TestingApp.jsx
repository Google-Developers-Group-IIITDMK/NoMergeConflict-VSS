import CseStockPrice from "./components/stock_engines/cse"
import AidsStockPrice from "./components/stock_engines/aids"
import EceStockPrice from "./components/stock_engines/ece"
import MechStockPrice from "./components/stock_engines/mech"
import CseStockChart from "./components/stock_charts/cse"

export default function App(){
    return(
    <div>
        <CseStockPrice />
        <AidsStockPrice />
        <EceStockPrice />
        <MechStockPrice />
    </div>)
}