(() => {
  const accessKey = document.querySelector('meta[name="rerol-enquiry-access-key"]')?.content || '';
  const endpoint = 'https://api.web3forms.com/submit';
  const fields = ['name', 'company', 'phone', 'email', 'requirement', 'quantity', 'location', 'message'];
  for (const form of document.querySelectorAll('[data-quote-form], [data-whatsapp-form]')) {
    const status = form.querySelector('[data-form-status]');
    const submit = form.querySelector('[type="submit"]');
    let pending = false;
    let savedPayload = '';
    const notify = (message, error = false, url = '') => {
      status.replaceChildren(document.createTextNode(message));
      status.classList.toggle('is-error', error);
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = ' Continue on WhatsApp';
        status.append(link);
      }
    };
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (pending) return;
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const values = Object.fromEntries(fields.map(name => [name, String(data.get(name) || '').trim().slice(0, name === 'message' ? 4000 : 200)]));
      if (!values.name || !values.phone || !values.requirement) {
        notify('Please enter your name, phone number and requirement.', true);
        return;
      }
      const message = ['Hi Rerol, I would like to discuss an enquiry.', ...fields.filter(name => values[name]).map(name => `${name[0].toUpperCase() + name.slice(1)}: ${values[name]}`)].join('\n');
      const whatsapp = `https://wa.me/919176642399?text=${encodeURIComponent(message)}`;
      if (!accessKey) {
        notify('Your WhatsApp draft is ready. Send it in WhatsApp to contact us.', false, whatsapp);
        window.location.assign(whatsapp);
        return;
      }
      if (data.get('botcheck')) return;
      const payload = JSON.stringify({ ...values, access_key: accessKey, botcheck: false, source: window.location.origin + window.location.pathname, consent: 'Contact me about this enquiry', subject: 'Rerol website enquiry', from_name: 'Rerol website' });
      if (savedPayload === payload) {
        notify('Your enquiry has already been submitted.', false, whatsapp);
        window.location.assign(whatsapp);
        return;
      }
      pending = true;
      submit.disabled = true;
      form.setAttribute('aria-busy', 'true');
      notify('Submitting your enquiry…');
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: payload, signal: controller.signal });
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error('Submission not confirmed');
        savedPayload = payload;
        notify('Your enquiry has been submitted to Rerol. Opening WhatsApp is optional.', false, whatsapp);
        window.location.assign(whatsapp);
      } catch {
        notify('We could not confirm your submission. Your details are still here. Please retry or contact us on WhatsApp.', true, whatsapp);
      } finally {
        clearTimeout(timer);
        pending = false;
        submit.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
  }
})();
