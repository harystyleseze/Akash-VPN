# Akash VPN 🌐
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Fluffy9/Akash-VPN?utm_source=oss&utm_medium=github&utm_campaign=Fluffy9%2FAkash-VPN&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

**Decentralized Privacy for Everyone - Powered by Akash Network**

![Akash VPN Logo](/design-system/avpn.png)

A comprehensive, decentralized VPN solution built on the Akash Network. Akash VPN provides secure, private internet access without centralized control, leveraging the power of decentralized cloud infrastructure.

## Getting Started

To get started with Akash VPN, follow these steps:

1. Deploy the SoftEther VPN SDL to Akash using the deployment file located at `vpn/deploy.yml`.
2. Once deployed, obtain the lease URL and update the `akashic-records.json` file in `frontend/public/data` with the new hostname.
3. Deploy the frontend SDL using the deployment file located at `frontend/deploy.yml`.
4. Visit the frontend URL and download the OpenVPN configuration file by clicking the "Download Region 1 Config" button.
5. Import the configuration file into your OpenVPN client and connect to the VPN.

For more information on OpenVPN clients and setup instructions, visit our [documentation page](https://github.com/rodri-r/Akash-VPN/blob/r1/frontend/src/app/docs/page.tsx).

## 🏗️ Project Architecture

This repository contains three core components that together form the Akash VPN ecosystem:

### 📚 [Documentation](/docs/)
Comprehensive guides and setup instructions.

### 🖥️ [Web Frontend](/frontend/)
Modern React/Next.js user interface featuring a stunning 3D globe visualization and intuitive VPN controls.

### 🔒 [VPN Server](/vpn/)
SoftEther VPN server implementation providing multi-protocol support (OpenVPN).

### ⚡ API Server (To be Developed)
Backend service handling user authentication, server management, and VPN configuration (planned for future development).

---
