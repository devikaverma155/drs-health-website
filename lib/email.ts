/**
 * Email sending utilities
 * Currently uses console logging as placeholder.
 * Replace with real email service (Nodemailer, SendGrid, Resend, etc.)
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ ok: boolean; error?: string }> {
  const { to, subject, html } = options;

  if (!to || !subject || !html) {
    return { ok: false, error: 'Missing email parameters' };
  }

  // TODO: Replace with real email service
  // For now, log to console
  console.log('[Email] Sending:', { to, subject, previewLength: html.length });

  try {
    // Example: Using a real email service like Resend, SendGrid, or Nodemailer
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: process.env.MAIL_FROM_EMAIL || 'orders@drshealth.com',
    //     to,
    //     subject,
    //     html,
    //   }),
    // });
    // if (!response.ok) {
    //   throw new Error(`Email service error: ${response.statusText}`);
    // }
    // return { ok: true };

    return { ok: true };
  } catch (error) {
    console.error('[Email error]', error);
    return { ok: false, error: error instanceof Error ? error.message : 'Email send failed' };
  }
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(
  email: string,
  orderData: {
    orderNumber: string;
    total: string;
    items: Array<{ name: string; quantity: number; price: string }>;
    date: string;
  }
): Promise<{ ok: boolean; error?: string }> {
  const itemsHtml = orderData.items
    .map(
      (item) =>
        `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td><td style="padding: 8px; border-bottom: 1px solid #eee;">x${item.quantity}</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td></tr>`
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #A3261A 0%, #D97706 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px 0; }
          .order-info { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .order-info p { margin: 8px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .total-row { font-weight: bold; background: #f5f5f5; padding: 12px 8px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
          .button { background: #A3261A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
          </div>

          <div class="content">
            <p>Hi,</p>
            <p>Your order has been successfully placed. Here are the details:</p>

            <div class="order-info">
              <p><strong>Order Number:</strong> #${orderData.orderNumber}</p>
              <p><strong>Order Date:</strong> ${orderData.date}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>

            <h3>Order Items</h3>
            <table>
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                  <th style="padding: 8px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr class="total-row">
                  <td colspan="2" style="padding: 12px 8px;">Total Amount:</td>
                  <td style="padding: 12px 8px; text-align: right;">₹${orderData.total}</td>
                </tr>
              </tbody>
            </table>

            <p style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://drshealth.com'}/account/orders" class="button">View Your Orders</a>
            </p>

            <p style="margin-top: 30px;">
              We'll notify you once your order is shipped. Thank you for choosing DRS Health!
            </p>
          </div>

          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} DRS Health. All rights reserved.</p>
            <p>If you have any questions, please <a href="mailto:support@drshealth.com">contact us</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Order Confirmation - DRS Health #${orderData.orderNumber}`,
    html,
  });
}

/**
 * Send order shipped email
 */
export async function sendOrderShippedEmail(
  email: string,
  orderData: {
    orderNumber: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
  }
): Promise<{ ok: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #A3261A 0%, #D97706 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px 0; }
          .info-box { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Order is On the Way!</h1>
          </div>

          <div class="content">
            <p>Hi,</p>
            <p>Great news! Your order has been shipped.</p>

            <div class="info-box">
              <p><strong>Order Number:</strong> #${orderData.orderNumber}</p>
              ${orderData.trackingNumber ? `<p><strong>Tracking Number:</strong> ${orderData.trackingNumber}</p>` : ''}
              ${orderData.estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}</p>` : ''}
            </div>

            <p style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://drshealth.com'}/account/orders" style="background: #A3261A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">Track Your Order</a>
            </p>

            <p>Thank you for your patience. We hope you enjoy your purchase!</p>
          </div>

          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} DRS Health. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Your Order is Shipped - DRS Health #${orderData.orderNumber}`,
    html,
  });
}
