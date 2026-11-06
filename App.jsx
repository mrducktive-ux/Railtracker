import { useMemo, useState } from "react";
import {
  MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker,
  useMap
} from "react-leaflet";
import L from "leaflet";
import {
  Search, TrainFront, MapPin, Layers, SlidersHorizontal, LocateFixed,
  Maximize2, Bookmark, Settings, Radio, X, ChevronRight, Clock3,
  ArrowUpRight, Menu
} from "lucide-react";
import { demoServices, stations, illustrativeLines } from "./data";

const ashford = [51.1437, 0.8760];

function trainIcon(selected = false) {
  const color = selected ? "#e58a2b" : "#142b40";
  return L.divIcon({
    className: "train-marker-wrap",
    html: `<div class="train-marker ${selected ? "selected" : ""}" style="--marker:${color}"><span>▰</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
}

function MapActions({ onLocate }) {
  const map = useMap();
  return <div className="map-tools">
    <button title="Centre on Ashford" onClick={() => { map.setView(ashford, 12); onLocate(); }}><LocateFixed size={18}/></button>
    <button title="Zoom in" onClick={() => map.zoomIn()}><span className="zoom-symbol">+</span></button>
    <button title="Zoom out" onClick={() => map.zoomOut()}><span className="zoom-symbol">−</span></button>
    <button title="Full screen" onClick={() => {
      const el = document.querySelector(".map-shell");
      if (el?.requestFullscreen) el.requestFullscreen();
    }}><Maximize2 size={17}/></button>
  </div>;
}

function DetailPanel({ service, onClose }) {
  if (!service) return <div className="empty-detail">
    <div className="empty-icon"><TrainFront size={25}/></div>
    <strong>Select a train on the map</strong>
    <span>Train details will appear here.</span>
  </div>;
  return <section className="detail-panel">
    <div className="detail-top">
      <div><div className="eyebrow">SELECTED SERVICE</div><h2>{service.headcode}</h2></div>
      <button className="icon-button" onClick={onClose} aria-label="Close details"><X size={18}/></button>
    </div>
    <div className="operator-line"><span className="operator-dot"/>{service.operator}</div>
    <div className="journey">
      <div className="journey-point"><span className="journey-dot"/><div><small>ORIGIN</small><strong>{service.origin}</strong></div></div>
      <div className="journey-line"/>
      <div className="journey-point"><span className="journey-dot destination"/><div><small>DESTINATION</small><strong>{service.destination}</strong></div></div>
    </div>
    <div className="detail-grid">
      <div><small>TRAIN TYPE</small><strong>{service.trainClass}</strong></div>
      <div><small>STATUS</small><strong>{service.status}</strong></div>
      <div><small>DIRECTION</small><strong>{service.direction}</strong></div>
      <div><small>NEXT STATION</small><strong>{service.next}</strong></div>
    </div>
    <div className="update-note"><Clock3 size={15}/>{service.updated}</div>
    <div className="demo-warning">DEMO RECORD — this is not a real train or live position.</div>
  </section>;
}

export default function App() {
  const [selected, setSelected] = useState(demoServices[0]);
  const [query, setQuery] = useState("");
  const [showStations, setShowStations] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showDemo, setShowDemo] = useState(true);
  const [mobilePanel, setMobilePanel] = useState(false);

  const filtered = useMemo(() => demoServices.filter(s =>
    `${s.headcode} ${s.operator} ${s.origin} ${s.destination}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  return <main className="app">
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark"><TrainFront size={22}/></div>
        <div><div className="brand-name">UK RAIL <b>RADAR</b></div><div className="brand-sub">BRITISH RAILWAY TRACKING</div></div>
      </div>
      <div className="top-search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search trains, headcodes or stations..." /></div>
      <div className="top-actions"><span className="demo-pill"><i/> DEMO MODE</span><button className="icon-button" aria-label="Settings"><Settings size={19}/></button></div>
      <button className="mobile-menu icon-button" onClick={() => setMobilePanel(!mobilePanel)} aria-label="Toggle services"><Menu/></button>
    </header>

    <div className="workspace">
      <aside className={`sidebar ${mobilePanel ? "open" : ""}`}>
        <div className="side-heading"><div><div className="eyebrow">RADAR OVERVIEW</div><h1>Live map</h1></div><span className="count-badge">{filtered.length}</span></div>
        <div className="location-card"><MapPin size={17}/><div><strong>Ashford, Kent</strong><small>Starting map location</small></div><ChevronRight size={17}/></div>
        <div className="list-heading"><strong>Services on map</strong><span>{filtered.length} examples</span></div>
        <div className="service-list">
          {filtered.map(service => <button key={service.id} className={`service-row ${selected?.id === service.id ? "active" : ""}`} onClick={() => {setSelected(service); setMobilePanel(false);}}>
            <div className="service-symbol"><TrainFront size={18}/></div>
            <div className="service-copy"><strong>{service.headcode}</strong><span>{service.operator}</span><small>{service.origin} → {service.destination}</small></div>
            <ChevronRight size={16}/>
          </button>)}
          {filtered.length === 0 && <div className="no-results">No matching demo services.</div>}
        </div>
        <div className="sidebar-bottom">
          <div className="eyebrow">MAP DISPLAY</div>
          <label className="toggle-row"><span><Layers size={16}/> Railway line illustrations</span><input type="checkbox" checked={showLines} onChange={e=>setShowLines(e.target.checked)}/></label>
          <label className="toggle-row"><span><MapPin size={16}/> Stations</span><input type="checkbox" checked={showStations} onChange={e=>setShowStations(e.target.checked)}/></label>
          <label className="toggle-row"><span><Radio size={16}/> Demo train markers</span><input type="checkbox" checked={showDemo} onChange={e=>setShowDemo(e.target.checked)}/></label>
          <div className="data-status"><span className="status-dot"/> No live railway feed connected</div>
        </div>
      </aside>

      <section className="map-column">
        <div className="map-heading"><div><span className="eyebrow">UNITED KINGDOM</span><h2>Ashford & surrounding area</h2></div><button className="filter-button"><SlidersHorizontal size={16}/> Map layers</button></div>
        <div className="map-shell">
          <MapContainer center={ashford} zoom={12} minZoom={5} maxZoom={18} scrollWheelZoom zoomControl={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showLines && illustrativeLines.map((line, i) => <Polyline key={i} positions={line} pathOptions={{color:"#e58a2b",weight:4,opacity:.72,dashArray:"8 5"}}/>)}
            {showStations && stations.map(station => <CircleMarker key={station.name} center={station.position} radius={5} pathOptions={{color:"#fff",weight:2,fillColor:"#526b7d",fillOpacity:1}}><Popup><strong>{station.name}</strong><br/><small>Station marker</small></Popup></CircleMarker>)}
            {showDemo && demoServices.map(service => <Marker key={service.id} position={service.position} icon={trainIcon(selected?.id === service.id)} eventHandlers={{click:()=>setSelected(service)}}><Popup><strong>{service.headcode}</strong><br/>{service.operator}<br/><small>Demo record — not live</small></Popup></Marker>)}
            <MapActions onLocate={() => {}}/>
          </MapContainer>
          <div className="map-legend"><span><i className="legend-train"/> Demo train</span><span><i className="legend-station"/> Station</span><span><i className="legend-line"/> Illustrative route</span></div>
          <div className="map-attribution">Map data © OpenStreetMap contributors</div>
        </div>
        <div className="map-footer"><span><MapPin size={14}/> Map opens around Ashford International</span><span>Zoom out to explore Britain</span></div>
      </section>

      <aside className="details-sidebar">
        <div className="detail-header"><div><div className="eyebrow">SERVICE INFORMATION</div><h2>Train details</h2></div><Bookmark size={19}/></div>
        <DetailPanel service={selected} onClose={() => setSelected(null)}/>
        <div className="data-card"><div className="data-card-icon"><Radio size={18}/></div><div><strong>Rail data connection</strong><p>Live positions, delays and real service information will appear after a data provider is connected.</p><span>NOT CONNECTED</span></div></div>
      </aside>
    </div>
    <footer className="footer"><span>UK RAIL RADAR <b>•</b> INDEPENDENT PROJECT</span><span>Map © OpenStreetMap contributors · Demo data only</span></footer>
  </main>;
}