"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ShieldOff } from "lucide-react";

interface Server {
  region: string;
  hostname: string;
  external_port: number;
  hub_name: string;
}

interface Country {
  country: string;
  country_code: string;
  flag: string;
  servers: Server[];
}

interface Continent {
  continent: string;
  continent_code: string;
  countries: Country[];
}

interface RegionsData {
  regions: Continent[];
}

export function ConnectionControls() {
  const [isConnected, setIsConnected] = useState(false);
  const [regions, setRegions] = useState<RegionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/akashic-records.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load regions');
        }
        return response.json();
      })
      .then(data => {
        setRegions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading regions:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const downloadConfig = (server: Server) => {
    const configContent = `client
dev tun
proto udp
remote ${server.hostname} ${server.external_port}
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
cipher AES-256-CBC
verb 3
`;
    const blob = new Blob([configContent], { type: 'application/x-openvpn-profile' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akash-vpn-${server.region}.ovpn`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsConnected(true);
  };

  const handleConnect = () => {
    if (regions?.regions?.[0]?.countries?.[0]?.servers?.[0]) {
      downloadConfig(regions.regions[0].countries[0].servers[0]);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="text-center">Loading VPN configuration...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button
          onClick={handleConnect}
          size="lg"
          className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
            isConnected 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {isConnected ? (
            <>
              <Shield className="w-5 h-5 mr-2" />
              Connected
            </>
          ) : (
            <>
              <Shield className="w-5 h-5 mr-2" />
              Connect
            </>
          )}
        </Button>

        <Button
          onClick={() => setIsConnected(false)}
          variant="outline"
          size="lg"
          className="px-8 py-3 text-lg font-semibold"
          disabled={!isConnected}
        >
          <ShieldOff className="w-5 h-5 mr-2" />
          Disconnect
        </Button>
      </div>

      <div className="text-sm text-muted-foreground text-center max-w-md">
        Click Connect to download the OpenVPN configuration file. 
        Import it into your OpenVPN client to establish a secure connection.
      </div>
    </div>
  );
}
