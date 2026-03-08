"use client";

import { useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFetch } from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";
import Tesseract from "tesseract.js";

export function ReceiptScanner({ onScanComplete }) {

  const fileInputRef = useRef(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {

    if (file.size > 8 * 1024 * 1024) {
      toast.error("File size should be less than 8MB");
      return;
    }

    try {

      toast.info("Reading receipt...");

      const { data } = await Tesseract.recognize(
        file,
        "eng",
        { logger: m => console.log(m) }
      );

      const text = data.text;

      console.log("OCR TEXT:", text);

      await scanReceiptFn(text);

    } catch (error) {
      console.error("OCR error:", error);
      toast.error("Failed to scan receipt");
    }
  };

  useEffect(() => {

    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }

  }, [scanReceiptLoading, scannedData]);

  return (
    <div className="flex items-center gap-4">

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />

      <Button
        type="button"
        variant="outline"
        className="w-full h-10 bg-gradient-to-br from-purple-900 via-purple-500 to-purple-500 text-white"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >

        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Reading receipt or UPI screenshot...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Import Receipt/ UPI Screenshot</span>
          </>
        )}

      </Button>

    </div>
  );
}