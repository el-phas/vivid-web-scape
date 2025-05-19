
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft, MapPin } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('home');
  const [mapboxToken, setMapboxToken] = useState('');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [locationValue, setLocationValue] = useState('local');

  const toggleLocation = (value: string) => {
    setLocationValue(value);
  };

  // Mock business locations
  const locations = [
    { id: '1', name: 'Naivas Store', lat: -1.286389, lng: 36.817223, type: 'supermarket', color: 'blue' },
    { id: '2', name: 'ABC Hospital', lat: -1.292257, lng: 36.821400, type: 'hospital', color: 'red' },
    { id: '3', name: 'XYZ Mechanics', lat: -1.283800, lng: 36.823500, type: 'repair', color: 'purple' },
    { id: '4', name: 'Nakumatt', lat: -1.290391, lng: 36.826712, type: 'supermarket', color: 'blue' },
    { id: '5', name: 'Quick Repairs', lat: -1.287000, lng: 36.819800, type: 'repair', color: 'green' },
    { id: '6', name: 'Beauty Salon', lat: -1.285241, lng: 36.824123, type: 'beauty', color: 'pink' }
  ];

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map only if we have a token
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [36.82, -1.29], // Nairobi coordinates
      zoom: 13
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each location
    locations.forEach(location => {
      const markerElement = document.createElement('div');
      markerElement.className = `marker-${location.color}`;
      
      new mapboxgl.Marker({
        color: getColorByType(location.type),
        element: markerElement
      })
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${location.name}</h3><p>Type: ${location.type}</p>`
          )
        )
        .addTo(map.current!);
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken]);

  const getColorByType = (type: string): string => {
    switch(type) {
      case 'supermarket': return '#3B82F6';
      case 'hospital': return '#EF4444';
      case 'repair': return '#8B5CF6';
      case 'beauty': return '#EC4899';
      default: return '#10B981';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-reachmesh-blue">Reach<span className="text-black">Mesh</span></h1>
        <div className="ml-auto">
          <span className="text-sm font-medium">{locationValue.charAt(0).toUpperCase() + locationValue.slice(1)}</span>
        </div>
      </div>
      
      <div className="p-3 bg-white">
        <div className="relative flex-1">
          <input
            type="text"
            defaultValue={searchQuery}
            placeholder="Search businesses or services"
            className="w-full px-4 py-2 pl-10 border rounded-full text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
        <p className="text-sm text-gray-600 mt-2">Businesses Near You</p>
      </div>
      
      <div className="relative">
        {/* Mapbox token input - temporary solution */}
        <div className="p-3 bg-white border-b">
          <input
            type="text"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="Enter your Mapbox public token"
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Visit mapbox.com to create an account and get your public token
          </p>
        </div>

        {/* Map container */}
        <div className="w-full h-[calc(100vh-280px)]">
          {mapboxToken ? (
            <div ref={mapContainer} className="w-full h-full" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Enter your Mapbox token to load the map</p>
            </div>
          )}
        </div>

        {/* Fallback pins when no token is provided */}
        {!mapboxToken && (
          <div className="relative w-full h-[calc(100vh-280px)] bg-gray-200 overflow-hidden">
            <img 
              src="public/lovable-uploads/78d6c66b-3c4c-4cd0-a7fb-3b8f8fb36807.png" 
              alt="Map View" 
              className="w-full h-full object-cover"
            />
            
            {/* Location pins - these would be dynamically positioned in a real app */}
            {locations.map((location) => (
              <div 
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  top: `${Math.random() * 60 + 20}%`,
                  left: `${Math.random() * 60 + 20}%`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full bg-${location.color}-500 flex items-center justify-center animate-pulse`}>
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div className={`mt-1 px-2 py-1 rounded-md bg-${location.color}-500 text-white text-xs whitespace-nowrap`}>
                    {location.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Add custom CSS for map markers */}
      <style>
        {`
          .marker-blue { background-color: #3B82F6; width: 24px; height: 24px; border-radius: 50%; }
          .marker-red { background-color: #EF4444; width: 24px; height: 24px; border-radius: 50%; }
          .marker-purple { background-color: #8B5CF6; width: 24px; height: 24px; border-radius: 50%; }
          .marker-green { background-color: #10B981; width: 24px; height: 24px; border-radius: 50%; }
          .marker-pink { background-color: #EC4899; width: 24px; height: 24px; border-radius: 50%; }
        `}
      </style>
    </div>
  );
};

export default MapView;
