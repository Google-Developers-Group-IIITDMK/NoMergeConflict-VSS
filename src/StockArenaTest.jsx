import StockArena from "./components/StockArena"
import TradingDesk from "./components/gameplay/tradingdesk";
import Login from "./components/login"
import React, { useState, useEffect } from "react";
export default function App(){
    const [username, setUsername] = useState(null);
    if (!username) return <Login onLogin={setUsername} />;

    return (
        <>
            <StockArena />
            <TradingDesk />
        </>
    );
}