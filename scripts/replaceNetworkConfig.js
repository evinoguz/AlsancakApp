const fs = require('fs');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const API_IP = process.env.API_IP;

if (!API_IP) {
  console.error('❌ ERROR: Missing API_IP in .env file.');
  process.exit(1);
}

const filePath = path.join(
  __dirname,
  '../android/app/src/main/res/xml/network_security_config.xml'
);

const xml = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config cleartextTrafficPermitted="true">
    <domain includeSubdomains="true">${API_IP}</domain>
  </domain-config>
</network-security-config>
`;

fs.writeFileSync(filePath, xml, 'utf8');
console.log(`✅ network_security_config.xml updated with IP.`);