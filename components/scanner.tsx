"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scannerRef.current) {
        const qrScanner = new Html5QrcodeScanner("qr-scanner", {
          fps: 10,
          qrbox: 250,
        }, false);
  
        qrScanner.render(
          (decodedText) => {
            setScannedData(decodedText);
            qrScanner.clear();
            window.location.href = decodedText; // Redirect to scanned URL
          },
          (errorMessage) => {
            console.error("QR Scan Error:", errorMessage);
          }
        );
  
        return () => {
          qrScanner.clear();
        };
      }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
      <div id="qr-scanner" ref={scannerRef} className="w-[300px] h-[300px]"></div>
      {scannedData && (
        <p className="mt-4 text-green-600 font-bold">Scanned: {scannedData}</p>
      )}
    </div>
  );
}
