"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
  const [regions, setRegions] = useState<RegionsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/akashic-records.json')
      .then(response => response.json())
      .then(data => {
        setRegions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
  };

  const handleDownload = () => {
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

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Button
        onClick={handleDownload}
        size="lg"
        className="px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Region 1 Config
      </Button>
    </div>
  );
}
