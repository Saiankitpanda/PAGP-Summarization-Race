---
template_id: temp_001
title: Service Agreement
File_description: Standard service agreement template
jurisdiction: unknown
doc_type: agreement
variables:
- key: agreement_date
  label: Agreement Date
  description: The date the agreement is entered into.
  example: 2024-01-29
  required: true
  dtype: date
  regex: \d{4}-\d{2}-\d{2}
- key: company_name
  label: Company Name
  description: The full legal name of the company.
  example: ACME CORP
  required: true
  dtype: string
- key: contractor_name
  label: Contractor Name
  description: The full legal name of the contractor.
  example: JOHN DOE
  required: true
  dtype: string
similarity_tags: ["service", "agreement", "contractor"]
---

SERVICE AGREEMENT
This AGREEMENT is made on {{agreement_date}}.
BETWEEN: {{company_name}} (hereinafter "Company") AND {{contractor_name}} (hereinafter "Contractor").
... [Template content truncated for brevity] ...
Article 1
Details regarding Article 1.
