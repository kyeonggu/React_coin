import {React, useState, useEffect} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=50")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    })
  }, [])

  return (
    <>
      <h1 className="coin-title">The Coins</h1>
      {loading ? <strong>Loading...</strong> : null}
      <div className="coin-list">
        <ul>
          {coins.map((item) => (
            <li key={item.id}>
              <div className="coin-content">
                <p className="coin-rank">{item.rank}</p>
                <p className="coin-name">{item.name}<span> ({item.symbol})</span></p>
              </div>
              <div className={"coin-info " + 
              (item.quotes.USD.percent_change_24h > 0 ? "coin-up" : "coin-down")
              }>
                <p className="coin-price">
                  {(item.quotes.USD.price.toFixed(2))}
                </p>
                <p className="coin-updown">{item.quotes.USD.percent_change_24h}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
