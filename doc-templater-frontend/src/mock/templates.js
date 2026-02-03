export const templates = {
    service_agreement: {
        template: "SERVICE AGREEMENT\n\nThis AGREEMENT is made on {{agreement_date}}.\n\nBETWEEN:\n{{company_name}}, a company incorporated under the laws of {{company_jurisdiction}} (hereinafter \"Company\")\nAND\n{{contractor_name}}, residing at {{contractor_address}} (hereinafter \"Contractor\").\n\n1. SERVICES\nThe Contractor shall provide: {{service_description}}.\n\n2. FEES\nFee: {{fee_amount}}.\n\nSigned:\n{{company_name}}\n{{contractor_name}}",
        variables: [
            { key: "agreement_date", label: "Date", required: true },
            { key: "company_name", label: "Company Name", required: true },
            { key: "company_jurisdiction", label: "Jurisdiction", required: false },
            { key: "contractor_name", label: "Contractor Name", required: true },
            { key: "contractor_address", label: "Contractor Address", required: false },
            { key: "service_description", label: "Services", required: true },
            { key: "fee_amount", label: "Fee", required: true }
        ]
    },
    aadhar_card: {
        template: "GOVERNMENT OF INDIA\n\nName: {{full_name}}\nDOB: {{dob}}\nGender: {{gender}}\n\nAadhar No: {{aadhar_number}}\n\nAddress:\n{{address_line_1}}\n{{address_line_2}}\n{{city}}, {{state}} - {{pincode}}",
        variables: [
            { key: "full_name", label: "Full Name", required: true },
            { key: "dob", label: "Date of Birth", required: true },
            { key: "gender", label: "Gender", required: true },
            { key: "aadhar_number", label: "Aadhar Number", required: true },
            { key: "address_line_1", label: "Address Line 1", required: true },
            { key: "city", label: "City", required: true },
            { key: "state", label: "State", required: true },
            { key: "pincode", label: "Pincode", required: true }
        ]
    },
    ration_card: {
        template: "RATION CARD\n\nCard No: {{card_number}}\nHead of Household: {{head_of_family}}\nFPS Code: {{fps_code}}\n\nFamily Members:\n1. {{member_1_name}} ({{member_1_age}})\n2. {{member_2_name}} ({{member_2_age}})\n3. {{member_3_name}} ({{member_3_age}})\n\nAddress: {{address}}",
        variables: [
            { key: "card_number", label: "Card Number", required: true },
            { key: "head_of_family", label: "Head of Family", required: true },
            { key: "fps_code", label: "FPS Code", required: true },
            { key: "member_1_name", label: "Member 1 Name", required: false },
            { key: "member_1_age", label: "Member 1 Age", required: false },
            { key: "address", label: "Address", required: true }
        ]
    },
    real_estate: {
        template: "DEED OF SALE\n\nThis DEED OF SALE is executed on {{execution_date}} at {{location}}.\n\nBETWEEN\n{{seller_name}} (Seller)\nAND\n{{buyer_name}} (Buyer)\n\nPROPERTY SCHEDULE:\nAll that piece and parcel of land bearing Survey No. {{survey_number}}, measuring {{area_sqft}} sq.ft.\n\nCONSIDERATION:\nRs. {{sale_amount}} ({{sale_amount_words}}).",
        variables: [
            { key: "execution_date", label: "Execution Date", required: true },
            { key: "location", label: "Location", required: true },
            { key: "seller_name", label: "Seller Name", required: true },
            { key: "buyer_name", label: "Buyer Name", required: true },
            { key: "survey_number", label: "Survey Number", required: true },
            { key: "area_sqft", label: "Area (Sq.ft)", required: true },
            { key: "sale_amount", label: "Sale Amount", required: true }
        ]
    },
    admission_form: {
        template: "COLLEGE ADMISSION FORM\n\nSession: {{academic_session}}\nCourse Applied: {{course_name}}\n\nSTUDENT DETAILS:\nName: {{student_name}}\nFather's Name: {{father_name}}\nMother's Name: {{mother_name}}\nCategory: {{category}}\n\nACADEMIC RECORD:\n10th Percentage: {{class_10_percent}}%\n12th Percentage: {{class_12_percent}}%\n\nDeclaration: I hereby declare that the above information is true.",
        variables: [
            { key: "academic_session", label: "Session", required: true },
            { key: "course_name", label: "Course", required: true },
            { key: "student_name", label: "Student Name", required: true },
            { key: "father_name", label: "Father Name", required: true },
            { key: "category", label: "Category (Gen/OBC/SC/ST)", required: true },
            { key: "class_12_percent", label: "Class 12 %", required: true }
        ]
    }
};
