import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';

interface MarketOverviewProps {
  onSelectStock: (symbol: string) => void;
  selectedStock: string;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ onSelectStock, selectedStock }) => {
  const { state } = useTrading();

  return (
    <Card className="trading-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Market Overview</span>
          <Badge variant="outline" className={state.isMarketOpen ? 'success-glow' : ''}>
            <Activity className="w-3 h-3 mr-1" />
            {state.isMarketOpen ? 'Market Open' : 'Market Closed'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {state.stocks.map((stock) => {
            const isPositive = stock.change >= 0;
            const isSelected = selectedStock === stock.symbol;
            
            return (
              <div
                key={stock.symbol}
                onClick={() => onSelectStock(stock.symbol)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-card/80 ${
                  isSelected 
                    ? 'border-primary bg-primary/5 shadow-lg' 
                    : 'border-border/30 hover:border-border/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse-glow" 
                      style={{ backgroundColor: stock.color }}
                    />
                    <div>
                      <div className="font-bold text-lg">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {stock.name}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg">${stock.price.toFixed(2)}</div>
                    <div className={`flex items-center justify-end space-x-1 text-sm ${
                      isPositive ? 'text-success' : 'text-destructive'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="font-semibold">
                        {isPositive ? '+' : ''}${stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-border/20 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Volume</p>
                      <p className="font-semibold">{(stock.volume / 1000000).toFixed(2)}M</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Market Cap</p>
                      <p className="font-semibold">{stock.marketCap}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;