import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function App() {
  const [ticker, setTicker] = useState('AAPL');
  const [chartData, setChartData] = useState([]);
  const [price, setPrice] = useState(0);

  const fetchStock = async () => {
    const API_KEY = 'WABKA2HFWI3VUNGV';
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`);

    const timeSeries = response.data['Time Series (Daily)'];
    const formattedData = Object.keys(timeSeries).slice(0, 30).map(date => ({
      date,
      price: parseFloat(timeSeries[date]['4. close'])
    })).reverse();

    setChartData(formattedData);
    setPrice(formattedData[formattedData.length - 1].price);
  };

  const handleBuy = async () => {
    await axios.post('https://your-backend-url.onrender.com/trade', {
      userId: 1,
      symbol: ticker,
      shares: 10,
      price: price,
      type: 'BUY'
    });
    alert(`Bought 10 shares of ${ticker}!`);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Paper Trader 📈</h1>

      <div className="flex gap-4 mb-8">
        <input
          className="border p-2 rounded"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button onClick={fetchStock} className="bg-blue-600 text-white p-2 rounded">Search</button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl">Current Price: ${price}</h2>
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </div>

      <button onClick={handleBuy} className="bg-green-500 text-white px-6 py-3 rounded text-lg">
        Buy 10 Shares (Fake Money)
      </button>
    </div>
  );
}

export default App;