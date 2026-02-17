/**
 * WhatsApp abstraction layer.
 * Replace implementation with real provider (Twilio, MessageBird, etc.) later.
 */

export type SendResult = { ok: boolean; error?: string };

/**
 * Send a free-form text message to a phone number.
 * Phone should be in E.164 format (e.g. +919876543210).
 */
export async function sendWhatsAppMessage(
  phone: string,
  message: string
): Promise<SendResult> {
  // TODO: integrate real WhatsApp Business API provider
  if (!phone || !message.trim()) {
    return { ok: false, error: 'Phone and message are required.' };
  }
  console.log('[WhatsApp stub] sendWhatsAppMessage', { phone, message: message.slice(0, 50) });
  return { ok: true };
}

/**
 * Send a template message (pre-approved by WhatsApp).
 * Template name and params are provider-specific.
 */
export async function sendTemplateMessage(
  phone: string,
  template: { name: string; params?: string[] }
): Promise<SendResult> {
  if (!phone || !template.name) {
    return { ok: false, error: 'Phone and template name are required.' };
  }
  console.log('[WhatsApp stub] sendTemplateMessage', { phone, template });
  return { ok: true };
}
