import { useState } from 'react';

export default function UploadBox({ onUpload }) {
    const [docType, setDocType] = useState('service_agreement');

    const handleProcess = () => {
        onUpload(docType);
    };

    return (
        <div className="card">
            <div className="field">
                <label>DOCUMENT TYPE</label>
                <select value={docType} onChange={(e) => setDocType(e.target.value)}>
                    <option value="service_agreement">Legal Service Agreement</option>
                    <option value="aadhar_card">Aadhar Card Extraction</option>
                    <option value="ration_card">Ration Card Digitization</option>
                    <option value="real_estate">Real Estate Deed</option>
                    <option value="admission_form">College Admission Form</option>
                </select>
            </div>

            <div className="field">
                <label>SELECT FILE</label>
                <input type="file" />
            </div>

            <button onClick={handleProcess}>INITIALIZE UPLOAD</button>
        </div>
    );
}
