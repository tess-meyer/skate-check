import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

const SkateparkListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const SkateparkItem = styled.div`
  margin-bottom: 10px;
`;

interface Skatepark {
  lat: number;
  lon: number;
  tags: {
    name: string;
  };
}

interface Props {
  userLocation: { lat: number; lon: number };
}

const SkateparkList: React.FC<Props> = ({ userLocation }) => {
  const [skateparks, setSkateparks] = useState<Skatepark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkateparks = async () => {
      try {
        const query = `
          [out:json];
          (
            node["leisure"="skatepark"](${userLocation.lat - 0.1},${userLocation.lon - 0.1},${userLocation.lat + 0.1},${userLocation.lon + 0.1});
          );
          out;
        `;
        const response = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        console.log('API Response:', response.data);
                setSkateparks(response.data.elements);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching skateparks:', error.message);
        // Set loading to false and save the error message
        setLoading(false);
        setError('Error fetching skateparks. Please try again.');
      }
    };

    fetchSkateparks();
  }, [userLocation]);

  // Function to calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  useEffect(() => {
    // Render Map
    const map = L.map('map').setView([userLocation.lat, userLocation.lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
    // Mark user's location
    L.marker([userLocation.lat, userLocation.lon]).addTo(map).bindPopup('Your Location');
  
    // Mark skatepark locations
    skateparks.forEach((skatepark) => {
      const { lat, lon, tags } = skatepark;
      L.marker([lat, lon]).addTo(map).bindPopup(tags.name || 'Skatepark');
    });
  
    // Remove the map when the component is unmounted
    return () => {
      map.remove();
    };
  }, []); 
  
  
  return (
    <SkateparkListContainer>
      <div id="map" style={{ height: '400px' }}></div>
      <h2>Skateparks Near You</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : skateparks.length === 0 ? (
        <p>No skateparks found in the area.</p>
      ) : null}
    </SkateparkListContainer>
  );
      }
export default SkateparkList;
