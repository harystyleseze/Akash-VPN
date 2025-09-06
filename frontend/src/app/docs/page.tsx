import Link from "next/link";

export default function Docs() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Akash VPN Documentation</h1>
      <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
      <p className="text-muted-foreground mb-4">
        To get started with Akash VPN, follow these steps:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li>Download the OpenVPN configuration file by clicking the &quot;Download Region 1 Config&quot; button on our homepage.</li>
        <li>Import the configuration file into your OpenVPN client.</li>
        <li>Connect to the VPN using your OpenVPN client.</li>
      </ol>
      <h2 className="text-2xl font-bold mb-2">OpenVPN Clients</h2>
      <p className="text-muted-foreground mb-4">
        You can use any OpenVPN client to connect to Akash VPN. Here are some popular options:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><Link href="https://openvpn.net/community-downloads/" className="underline hover:text-primary">OpenVPN Connect (Official)</Link></li>
        <li><Link href="https://tunnelblick.net/" className="underline hover:text-primary">Tunnelblick (for macOS)</Link></li>
        <li><Link href="https://openvpn.net/vpn-server-resources/openvpn-connect/openvpn-connect-android/" className="underline hover:text-primary">OpenVPN Connect (for Android)</Link></li>
        <li><Link href="https://openvpn.net/vpn-server-resources/openvpn-connect/openvpn-connect-ios/" className="underline hover:text-primary">OpenVPN Connect (for iOS)</Link></li>
      </ul>
    </div>
  );
}
