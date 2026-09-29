# Government API Mock Adapters & Production Architecture

> **Official Documentation for Evaluation Committee & Judges**  
> **Platform:** NexVerify — GeM Bidder Compliance & Verification System  
> **Standard:** API Setu / NIC / GSTN National Public Digital Infrastructure

---

## 1. Executive Summary for Judges: Why Mock Adapters?

Official Government of India APIs—including the **Goods & Services Tax Network (GSTN)**, **Ministry of Corporate Affairs (MCA21)**, **CBDT Income Tax e-Filing**, **CPPP Central Debarment Watchlist**, and **DigiLocker**—are **strictly confidential and restricted**. 

Accessing production government gateways requires:
1. **Official Government Agency MoU** & Whitelisted static Ministry IP addresses.
2. **Class-3 Hardware Security Module (HSM)** Digital Signature Certificates (DSC) under the IT Act 2000.
3. Two-factor dynamic cryptographic keys refreshed on dedicated government LANs.

### Our Engineering Solution: The Adapter Pattern
To deliver a fully operational system without exposing classified credentials or stalling evaluation, we designed an enterprise-grade **Adapter Architecture** using the **GoF Adapter / Strategy Pattern**:
- **`MockGovtAdapter`**: High-fidelity offline simulation conforming strictly to **API Setu v2.1** and **NIC API schemas**, featuring realistic WAN latency simulation, status codes, and deterministic edge cases (compliant, borderline, and debarred suppliers).
- **`LiveGovtAdapter`**: The production-ready counterpart containing all live endpoint URLs, request signing headers (`X-Gov-Auth-Signature`), and isolated credential slots ready for activation once production keys are granted.
- **`GovtApiGateway`**: A unified facade that lets the entire platform toggle between Mock and Live gateways with zero changes to business logic or UI code.

---

## 2. Architectural Diagram

```mermaid
graph TD
    UI[Frontend UI / Compliance Engine] -->|Invokes Standard Methods| Gateway[GovtApiGateway Facade]
    
    Gateway -->|Mode = 'MOCK' (Hackathon Demo)| Mock[MockGovtAdapter]
    Gateway -->|Mode = 'LIVE' (Production Cleared)| Live[LiveGovtAdapter]
    
    Mock -->|Simulates 280ms Latency & Real Schemas| MockDB[(API Setu / NIC Data Schemas)]
    
    Live -->|PKI Request Signing & HMAC| NIC[Official NIC / GSTN / MCA21 APIs]
    
    subgraph "Pluggable Govt API Layer"
        Mock
        Live
    end
```

---

## 3. Supported Government Portals & Simulated Schemas

| Portal / Gateway | Simulated Endpoint | Key Verification Data Returned |
| :--- | :--- | :--- |
| **1. Udyam / MSME Portal** | `GET /verify/udyam-number` | Enterprise class (Micro/Small/Medium), GFR 153 exemption eligibility, investment limit |
| **2. GST Registration & Filing** | `POST /returns/gstr3b` | Active/Cancelled status, GSTR-3B filing regularity, compliance rating (1–5 stars) |
| **3. PAN & Income Tax Compliance** | `POST /itr/turnover-verification` | 3-year turnover consistency, Form 3CA/CD tax audit compliance, PAN validity |
| **4. Make in India (MII) / Local Content** | `POST /mii/v2/local-content-verify` | Class-I (>=50%) or Class-II local supplier self-certification, BOM % breakdown, CA audit |
| **5. EPFO / ESIC Statutory Compliance** | `POST /labour/v1/compliance-check` | Worker Provident Fund (ECR) & State Insurance (ESIC) active payroll contributions |
| **6. Startup India, NSIC & OEM Authorization** | `POST /enterprise/v1/special-status-verify` | DPIIT Startup Recognition (GFR 173 waiver), NSIC SPRS registry, Direct OEM Authorization (MAF) |
| **7. DigiLocker / Document Verification** | `POST /file/verify-pki` | SHA-256 tamper-proofing hash, CCA India licensed digital signature & certificate validity |
| **8. CPPP Debarment Registry** | `POST /cppp/blacklist-check` | GFR 2017 Rule 151 cross-check against 34 CPSE blacklists & debarment orders |

---

## 4. Code Structure

All adapter code is cleanly separated in `src/adapters/govtApi/`:

```
bid software/
├── src/
│   └── adapters/
│       └── govtApi/
│           ├── GovtApiInterface.js   # Unified contract defining all 8 verification signatures
│           ├── MockGovtAdapter.js    # High-fidelity offline simulation with realistic latency
│           ├── LiveGovtAdapter.js    # PRODUCTION SLOT: Pre-configured endpoints, headers & keys
│           ├── GovtApiGateway.js     # Unified selector, telemetry logger & mode switcher
│           └── index.js              # Module exports
└── server/
    └── src/
        └── services/
            └── govtAdapters/         # Node.js backend equivalent of the adapter architecture
```

---

## 5. Dedicated Space for Adding Real Government APIs

To switch from Mock to Production Live APIs, **no code rewrite is required**. Engineers simply insert official Ministry credentials in [LiveGovtAdapter.js](file:///c:/Users/user/Downloads/newsih/bid%20software/src/adapters/govtApi/LiveGovtAdapter.js) or via environment variables:

```bash
# In your .env file:
VITE_GOVT_API_MODE=LIVE
VITE_GOVT_CLIENT_ID=NIC_OFFICIAL_MINISTRY_CLIENT_ID_XXXX
VITE_GOVT_CLIENT_SECRET=NIC_SECURE_OAUTH2_SECRET_YYYY
VITE_GOVT_GSTN_KEY=GSTN_PRODUCTION_API_KEY_ZZZZ
```

Inside [src/adapters/govtApi/LiveGovtAdapter.js](file:///c:/Users/user/Downloads/newsih/bid%20software/src/adapters/govtApi/LiveGovtAdapter.js):
```javascript
/* ========================================================================== */
/* ====== PRODUCTION GOVERNMENT API CONFIGURATION (INSERT CREDENTIALS HERE) ====== */
/* ========================================================================== */
this.endpoints = {
  gstn: 'https://api.gst.gov.in/taxpayerapi/v1.2',
  udyam: 'https://apisetu.gov.in/api/v1/msme/udyam',
  mca21: 'https://apisetu.gov.in/api/v1/mca/company',
  cbdtItr: 'https://eportal.incometax.gov.in/api/v2/itr',
  cpppDebarment: 'https://gem.gov.in/api/v2/cppp-debarment',
  epfo: 'https://unifiedportal-epfo.gov.in/api/v1',
  esic: 'https://esic.gov.in/api/v1/employer',
  digilocker: 'https://api.digitallocker.gov.in/public/oauth2/1'
};
```

---

## 6. Testing the Adapters in the Live Web Interface

Open the **Government API Gateways** tab in the navigation bar:
- **Interactive Sandbox:** Click **"Test Verification Query"** on any portal to see real-time latency and the exact NIC/API Setu JSON payload returned by the Mock Adapter.
- **Mode Toggle:** Toggle between **Mock Sandbox** and **Live Gateway** to demonstrate to judges how the application gracefully signals pending Ministry authorization without crashing.
