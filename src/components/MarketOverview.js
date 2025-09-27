import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';
const MarketOverview = ({ onSelectStock, selectedStock }) => {
    const { state } = useTrading();
    return (_jsxs(Card, { className: "trading-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: "Market Overview" }), _jsxs(Badge, { variant: "outline", className: state.isMarketOpen ? 'success-glow' : '', children: [_jsx(Activity, { className: "w-3 h-3 mr-1" }), state.isMarketOpen ? 'Market Open' : 'Market Closed'] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: state.stocks.map((stock) => {
                        const isPositive = stock.change >= 0;
                        const isSelected = selectedStock === stock.symbol;
                        return (_jsxs("div", { onClick: () => onSelectStock(stock.symbol), className: `p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-card/80 ${isSelected
                                ? 'border-primary bg-primary/5 shadow-lg'
                                : 'border-border/30 hover:border-border/60'}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-4 h-4 rounded-full animate-pulse-glow", style: { backgroundColor: stock.color } }), _jsxs("div", { children: [_jsx("div", { className: "font-bold text-lg", children: stock.symbol }), _jsx("div", { className: "text-sm text-muted-foreground line-clamp-1", children: stock.name })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-bold text-lg", children: ["$", stock.price.toFixed(2)] }), _jsxs("div", { className: `flex items-center justify-end space-x-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`, children: [isPositive ? (_jsx(TrendingUp, { className: "w-3 h-3" })) : (_jsx(TrendingDown, { className: "w-3 h-3" })), _jsxs("span", { className: "font-semibold", children: [isPositive ? '+' : '', "$", stock.change.toFixed(2), " (", stock.changePercent.toFixed(2), "%)"] })] })] })] }), isSelected && (_jsxs("div", { className: "mt-3 pt-3 border-t border-border/20 grid grid-cols-2 gap-4 text-xs", children: [_jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Volume" }), _jsxs("p", { className: "font-semibold", children: [(stock.volume / 1000000).toFixed(2), "M"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Market Cap" }), _jsx("p", { className: "font-semibold", children: stock.marketCap })] })] }))] }, stock.symbol));
                    }) }) })] }));
};
export default MarketOverview;
//# sourceMappingURL=MarketOverview.js.map