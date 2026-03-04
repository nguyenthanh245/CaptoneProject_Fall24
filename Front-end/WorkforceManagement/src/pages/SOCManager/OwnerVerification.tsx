import { useEffect, useState } from 'react';

const OwnerVerification = () => {
  const fakeDomainInfo = {
    domain: "ananas.vn",
    whoisInformation: {
      registrar: null,
      status: null,
      expirationDate: null,
      rawData: JSON.stringify({
        WhoisRecord: {
          domainName: "ananas.vn",
          nameServers: {
            rawText: "isaac.ns.cloudflare.com\nmaisie.ns.cloudflare.com",
            hostNames: [
              "isaac.ns.cloudflare.com",
              "maisie.ns.cloudflare.com"
            ],
            ips: []
          },
          registrant: {
            name: "IPv4 address block not managed by the RIPE NCC",
            organization: "NON-RIPE-NCC-MANAGED-ADDRESS-BLOCK",
            country: "EU # Country is really world wide",
          },
          createdDateNormalized: "1970-01-01 00:00:00 UTC",
          updatedDateNormalized: "2001-09-22 09:31:27 UTC"
        }
      }),
      createdDate: null,
      updatedDate: null,
      expiresDate: null,
      domainAvailability: null,
      contactEmail: null,
      domainNameExt: ".vn",
      estimatedDomainAge: 20031,
      ips: []
    },
    dnsInformation: {
      aRecords: ["103.221.222.78"],
      aaaaRecords: [],
      mxRecords: [
        "mx92209.maychuemail.net.",
        "mail92209.maychuemail.com."
      ],
      nsRecords: [
        "isaac.ns.cloudflare.com.",
        "maisie.ns.cloudflare.com."
      ],
      soaRecord: "isaac.ns.cloudflare.com."
    }
  };

  const [parsedData, setParsedData] = useState<any>(null);

  useEffect(() => {
    if (fakeDomainInfo && fakeDomainInfo.whoisInformation && fakeDomainInfo.whoisInformation.rawData) {
      try {
        const parsedRawData = JSON.parse(fakeDomainInfo.whoisInformation.rawData);
        setParsedData(parsedRawData.WhoisRecord);
      } catch (error) {
        console.error('Error parsing rawData:', error);
      }
    }
  }, []);

  if (!parsedData) return <p>Loading...</p>;

  const {
    domainName,
    nameServers,
    registrant,
    createdDateNormalized,
    updatedDateNormalized,
  } = parsedData;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Domain Information</h1>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">General Details</h2>
          <p><span className="font-medium">Domain Name:</span> {domainName}</p>
          <p><span className="font-medium">Created Date:</span> {createdDateNormalized || 'N/A'}</p>
          <p><span className="font-medium">Updated Date:</span> {updatedDateNormalized || 'N/A'}</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">Name Servers</h2>
          <ul className="list-disc list-inside">
            {nameServers?.hostNames?.map((server: string, index: number) => (
              <li key={index}>{server}</li>
            )) || <p>No name servers available</p>}
          </ul>
        </div>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">Registrant Information</h2>
          <p><span className="font-medium">Name:</span> {registrant?.name || 'N/A'}</p>
          <p><span className="font-medium">Organization:</span> {registrant?.organization || 'N/A'}</p>
          <p><span className="font-medium">Country:</span> {registrant?.country || 'N/A'}</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">DNS Information</h2>
          <div>
            <h3 className="font-semibold">A Records:</h3>
            <ul className="list-disc list-inside">
              {fakeDomainInfo.dnsInformation.aRecords.map((record: string, index: number) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">MX Records:</h3>
            <ul className="list-disc list-inside">
              {fakeDomainInfo.dnsInformation.mxRecords.map((record: string, index: number) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">NS Records:</h3>
            <ul className="list-disc list-inside">
              {fakeDomainInfo.dnsInformation.nsRecords.map((record: string, index: number) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          </div>
          <p><span className="font-medium">SOA Record:</span> {fakeDomainInfo.dnsInformation.soaRecord}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerVerification;
