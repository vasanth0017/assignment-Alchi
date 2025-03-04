import { useState } from "react";
import {QRCodeSVG} from "qrcode.react";


export default function GenerateQR() {
   
   
  const [uniqueId, setUniqueId] = useState(() => Date.now().toString());
 const code = "9469d599-7a58-469c-b6cf-733b112ec80b"
const qrData = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/testform/?code=${code}`;
console.log(qrData)
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>QR Code for Paint Box</h2>
      <QRCodeSVG value={qrData} size={256} />
      <p>Scan this code to claim ₹10</p>
    </div>
  );
}
