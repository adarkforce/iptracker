import React from 'react'
import './App.css';
import BackgroundMapWithOverlay from './components/BackgroundMapWithOverlay';
import CardPanel from './components/CardPanel';
import SearchBar from './components/SearchBar';
import useIpfy from './hooks/useIpfy';

function App() {

  const [ipInfo, search, loading, error] = useIpfy();

  const handleOnSearch = (query) => {
    search(query)
  }

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <h2>IP Address Tracker</h2>
        </div>
        <div className="searchBarContainer">
          <SearchBar onSearch={handleOnSearch} error={error && error.messages}></SearchBar>
        </div>
        <div className="cardPanelContainer">
          <CardPanel
            location={ipInfo && ipInfo.location && `${ipInfo.location.city}, ${ipInfo.location.country}\n${ipInfo.location.postalCode}`}
            ipAddress={ipInfo && ipInfo.ip && `${ipInfo.ip}`}
            timezone={ipInfo && ipInfo.location && `${ipInfo.location.timezone}`}
            isp={ipInfo && ipInfo.isp && `${ipInfo.isp}`}
            loading={loading}
          />
        </div>
      </div>
      <BackgroundMapWithOverlay location={ipInfo && ipInfo.location && [ipInfo.location.lat, ipInfo.location.lng]} style={{ position: 'absolute' }} />
    </div>
  );
}

export default App;
