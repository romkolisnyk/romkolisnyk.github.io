import puppeteer from 'puppeteer';
import path from 'path';
import { spawn } from 'child_process';

const startServer = async () => {
  const server = spawn('npx', ['serve', 'docs'], { stdio: 'inherit' });
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return server;
};

const PAGE_WIDTH = 1300;

const generatePDF = async () => {
  const pdfOutputPath = path.resolve('./', 'docs/assets/Roman_Kolisnyk_FE_resume.pdf');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: PAGE_WIDTH, height: 800 });
  await page.emulateMediaType('print');

  const htmlUrl = `http://localhost:3000`;
  await page.goto(htmlUrl, { waitUntil: 'networkidle0' });

  const contentHeight = await page.evaluate(() => document.documentElement.scrollHeight);

  await page.pdf({
    path: pdfOutputPath,
    width: `${PAGE_WIDTH}px`,
    height: `${contentHeight}px`,
    printBackground: true,
  });

  await browser.close();
};

(async () => {
  const server = await startServer();

  try {
    await generatePDF();
    console.log('PDF successfully generated!');
  } catch (err) {
    console.error('PDF generating error:', err);
  } finally {
    server.kill();
  }
})();
