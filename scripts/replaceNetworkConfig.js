const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const filePath = path.join(
  __dirname,
  '../android/app/src/main/res/xml/network_security_config.xml'
);

const xml = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config cleartextTrafficPermitted="true">
    <domain includeSubdomains="true">${process.env.API_IP}</domain>
  </domain-config>
</network-security-config>
`;

fs.writeFileSync(filePath, xml);
console.log(`✅ network_security_config.xml updated with IP.`);