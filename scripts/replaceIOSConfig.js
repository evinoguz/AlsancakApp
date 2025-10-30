const fs = require('fs');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const plistPath = path.join(__dirname, '../ios/dokuBiyoApp/Info.plist');
const API_IP = process.env.API_IP;

if (!API_IP) {
  console.error('❌ ERROR: Missing API_IP in .env file.');
  process.exit(1);
}

let plistContent = fs.readFileSync(plistPath, 'utf8');

// Eğer daha önce eklenmişse, eski IP'yi değiştir
if (plistContent.includes('<key>NSExceptionDomains</key>')) {
  plistContent = plistContent.replace(
    /<key>NSExceptionDomains<\/key>[\s\S]*?<\/dict>\s*<\/dict>(?=\s*<\/dict>)/m,
    `<key>NSExceptionDomains</key>
    <dict>
      <key>${API_IP}</key>
      <dict>
        <key>NSIncludesSubdomains</key>
        <true/>
        <key>NSExceptionAllowsInsecureHTTPLoads</key>
        <true/>
      </dict>
    </dict>
  </dict>`,
  );
} else {
  // Hiç yoksa NSAppTransportSecurity bloğunu ekle
  plistContent = plistContent.replace(
    /<\/dict>\s*<\/plist>/,
    `  <key>NSAppTransportSecurity</key>
  <dict>
    <key>NSExceptionDomains</key>
    <dict>
      <key>${API_IP}</key>
      <dict>
        <key>NSIncludesSubdomains</key>
        <true/>
        <key>NSExceptionAllowsInsecureHTTPLoads</key>
        <true/>
      </dict>
    </dict>
  </dict>
</dict>
</plist>`,
  );
}

fs.writeFileSync(plistPath, plistContent, 'utf8');
console.log(`✅ Info.plist updated with IP.`);
