## Tax upload integration plan (frontend)

1) Request a presigned URL
POST `/api/uploads/presign`
Body:
```json
{ "filename": "2023-tax-return.pdf", "contentType": "application/pdf" }
```
Response:
```json
{ "uploadId": "...", "key": "...", "url": "https://..." }
```

2) Upload file directly to S3
Use `PUT` to the returned `url` with the file body and `Content-Type`.

3) Optional status check
GET `/api/uploads/:id` to display metadata/status.

Notes:
- Attach `Authorization: Bearer <supabase_access_token>` to the API requests.
- Restrict client file types to PDF/XLS/XLSX/CSV before calling the API.
