import React from 'react';
import { ChartDataPoint } from '@/types/trading';

interface CandlestickChartProps {
  data: ChartDataPoint[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Loading chart data...
      </div>
    );
  }

  const maxPrice = Math.max(...data.map(d => d.high));
  const minPrice = Math.min(...data.map(d => d.low));
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;

  const chartHeight = 350;
  const chartWidth = data.length * 8; // Width per candle
  const candleWidth = 6;

  const priceToY = (price: number) => {
    return ((maxPrice + padding - price) / (priceRange + 2 * padding)) * chartHeight;
  };

  return (
    <div className="w-full h-full overflow-x-auto">
      <svg
        width={Math.max(chartWidth, 800)}
        height={chartHeight + 60}
        className="border border-border/20 rounded-lg bg-card/30"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = ratio * chartHeight + 20;
          const price = maxPrice + padding - (ratio * (priceRange + 2 * padding));
          return (
            <g key={ratio}>
              <line
                x1={40}
                y1={y}
                x2={Math.max(chartWidth, 800) - 20}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                strokeDasharray="2,2"
              />
              <text
                x={10}
                y={y + 4}
                fill="hsl(var(--muted-foreground))"
                fontSize="10"
                textAnchor="start"
              >
                ${price.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Candlesticks */}
        {data.map((candle, index) => {
          const x = 50 + index * 8;
          const isGreen = candle.close >= candle.open;
          const color = isGreen ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
          
          const highY = priceToY(candle.high) + 20;
          const lowY = priceToY(candle.low) + 20;
          const openY = priceToY(candle.open) + 20;
          const closeY = priceToY(candle.close) + 20;
          
          const bodyTop = Math.min(openY, closeY);
          const bodyBottom = Math.max(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);

          return (
            <g key={index}>
              {/* Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth={1}
              />
              
              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(bodyHeight, 1)}
                fill={isGreen ? 'transparent' : color}
                stroke={color}
                strokeWidth={1}
              />

              {/* Time labels (every 10th candle) */}
              {index % Math.max(Math.floor(data.length / 10), 1) === 0 && (
                <text
                  x={x}
                  y={chartHeight + 45}
                  fill="hsl(var(--muted-foreground))"
                  fontSize="10"
                  textAnchor="middle"
                  transform={`rotate(-45 ${x} ${chartHeight + 45})`}
                >
                  {candle.time}
                </text>
              )}
            </g>
          );
        })}

        {/* Volume bars */}
        {data.map((candle, index) => {
          const x = 50 + index * 8;
          const maxVolume = Math.max(...data.map(d => d.volume));
          const volumeHeight = (candle.volume / maxVolume) * 40;
          const isGreen = candle.close >= candle.open;
          
          return (
            <rect
              key={`volume-${index}`}
              x={x - candleWidth / 2}
              y={chartHeight - volumeHeight + 20}
              width={candleWidth}
              height={volumeHeight}
              fill={isGreen ? 'hsl(var(--success) / 0.3)' : 'hsl(var(--destructive) / 0.3)'}
            />
          );
        })}

        {/* Legend */}
        <g>
          <rect x={50} y={5} width={200} height={35} fill="hsl(var(--card))" stroke="hsl(var(--border))" rx={4} />
          <circle cx={60} cy={15} r={3} fill="hsl(var(--success))" />
          <text x={70} y={19} fill="hsl(var(--foreground))" fontSize="10">Bullish (Green)</text>
          <circle cx={60} cy={30} r={3} fill="hsl(var(--destructive))" />
          <text x={70} y={34} fill="hsl(var(--foreground))" fontSize="10">Bearish (Red)</text>
        </g>
      </svg>
    </div>
  );
};

export default CandlestickChart;