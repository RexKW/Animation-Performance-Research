import fs from 'fs';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

// 1. CONFIGURATION
const BASE_URL = 'https://animation-performance-research-d4cd.vercel.app'; 
const ITERATIONS = 30;

// The 6 test routes matching your proposal
const ROUTES = [
  { path: '/lottie-ssr', format: 'Lottie', rendering: 'SSR' },
  { path: '/lottie-csr', format: 'Lottie', rendering: 'CSR' },
  { path: '/svg-ssr', format: 'SVG', rendering: 'SSR' },
  { path: '/svg-csr', format: 'SVG', rendering: 'CSR' },
  { path: '/gif-ssr', format: 'GIF', rendering: 'SSR' },
  { path: '/gif-csr', format: 'GIF', rendering: 'CSR' }
];

// Lighthouse throttling profiles for mobile environments
const NETWORK_PROFILES = [
  {
    name: 'Broadband',
    config: {
      throttlingMethod: 'provided', // No throttling, relies on your actual connection/server speed
      emulatedFormFactor: 'mobile',
    }
  },
  {
    name: 'Fast 4G',
    config: {
      throttlingMethod: 'devtools',
      emulatedFormFactor: 'mobile',
      throttling: {
        rttMs: 150,
        throughputKbps: 1.6 * 1024,
        requestLatencyMs: 150,
        downloadThroughputKbps: 1.6 * 1024,
        uploadThroughputKbps: 750,
        cpuSlowdownMultiplier: 2 // Light CPU throttle
      }
    }
  },
  {
    name: 'Slow 4G',
    config: {
      throttlingMethod: 'devtools',
      emulatedFormFactor: 'mobile',
      throttling: {
        rttMs: 400,
        throughputKbps: 400,
        requestLatencyMs: 400,
        downloadThroughputKbps: 400,
        uploadThroughputKbps: 400,
        cpuSlowdownMultiplier: 4 // Heavy CPU throttle (standard mobile constraint)
      }
    }
  }
];

const CSV_FILENAME = 'data_eksperimen.csv';

// 2. CSV INITIALIZATION
// Write the exact headers your Python script expects
if (!fs.existsSync(CSV_FILENAME)) {
  fs.writeFileSync(CSV_FILENAME, 'Iterasi,Jaringan,Format,Rendering,LCP,TBT,CLS,Payload\n');
}

// 3. EXECUTION FUNCTION
async function runAudits() {
  console.log(`🚀 Starting Lighthouse Automation: 540 Audits Total`);
  
  // Launch a single headless Chrome instance to reuse
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  
  let totalCompleted = 278;

  for (let iter = 1; iter <= ITERATIONS; iter++) {
    for (const network of NETWORK_PROFILES) {
      for (const route of ROUTES) {
        
        const url = `${BASE_URL}${route.path}`;
        console.log(`[${totalCompleted + 1}/540] Auditing: ${route.format} ${route.rendering} on ${network.name} (Iter: ${iter})`);

        const options = {
          logLevel: 'error',
          output: 'json',
          onlyCategories: ['performance'],
          port: chrome.port,
        };

        try {
          // Run Lighthouse with the specific network config
          const runnerResult = await lighthouse(url, options, {
            extends: 'lighthouse:default',
            settings: network.config
          });

          // Extract metrics from the JSON result
          const audits = runnerResult.lhr.audits;
          const lcp = audits['largest-contentful-paint'].numericValue.toFixed(2);
          const tbt = audits['total-blocking-time'].numericValue.toFixed(2);
          const cls = audits['cumulative-layout-shift'].numericValue.toFixed(3);
          
          // Convert payload bytes to KB
          const payloadBytes = audits['total-byte-weight'].numericValue;
          const payloadKb = (payloadBytes / 1024).toFixed(2);

          // Append directly to CSV
          const csvRow = `${iter},${network.name},${route.format},${route.rendering},${lcp},${tbt},${cls},${payloadKb}\n`;
          fs.appendFileSync(CSV_FILENAME, csvRow);

          totalCompleted++;
          
        } catch (error) {
          console.error(`❌ Error auditing ${url}:`, error.message);
        }
      }
    }
  }

  await chrome.kill();
  console.log(`✅ All audits complete! Data saved to ${CSV_FILENAME}`);
}

runAudits();