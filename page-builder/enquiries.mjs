// Public form access key supplied by the client's Web3Forms dashboard.
// This is the public form identifier embedded in page HTML, not an account credential.
export const enquiryAccessKey = (process.env.REROL_WEB3FORMS_ACCESS_KEY || '78e9653d-1e9b-469a-8692-f5411036f623').trim();
if (enquiryAccessKey && !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(enquiryAccessKey)) {
  throw new Error('REROL_WEB3FORMS_ACCESS_KEY must be the form UUID from Web3Forms.');
}
export const captureEnabled = Boolean(enquiryAccessKey);
