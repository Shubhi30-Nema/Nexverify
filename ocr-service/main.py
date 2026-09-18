from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
import uvicorn
import os

app = FastAPI()

# Placeholder OCR function – replace with actual PaddleOCR integration
def dummy_ocr(file_path: str):
    # Simulated OCR output
    return {
        "raw_text": f"Extracted text from {os.path.basename(file_path)}",
        "confidence": 93.2,
        "bounding_box_count": 38,
        "extracted_fields": {
            "legal_name": "Acme Corp",
            "gstin": "29AAACB1234F1Z5",
            "pan": "ABCDE1234F",
            "udyam_number": "AA12345",
            "category": "Micro",
            "validity_expired": False,
            "months_to_expiry": 12,
            "local_content_pct": 68,
            "self_certification": True,
            "debarred": False,
            "auth_expired": False,
        },
        "processing_time_ms": 842,
    }

@app.post("/ocr")
async def ocr_endpoint(file: UploadFile = File(...), doc_type: str = Form(...)):
    # Save uploaded file temporarily
    import tempfile
    temp_path = os.path.join(tempfile.gettempdir(), file.filename)
    with open(temp_path, "wb") as f:
        content = await file.read()
        f.write(content)
    # Run dummy OCR – replace with PaddleOCR call like: ocr = PaddleOCR(...); result = ocr.ocr(...)
    result = dummy_ocr(temp_path)
    # Cleanup
    try:
        os.remove(temp_path)
    except Exception:
        pass
    return JSONResponse(content=result)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
