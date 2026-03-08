import { createWorker } from "tesseract.js";

let worker;

export async function extractTextFromImage(image) {
	try {

		// create worker only once
		if (!worker) {
			worker = await createWorker("eng");
		}

		console.log("Starting OCR...");

		const { data } = await worker.recognize(image);

		console.log("OCR finished");

		return data.text;

	} catch (error) {
		console.error("OCR Error:", error);
		throw error;
	}
}