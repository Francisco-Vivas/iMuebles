const { sendEmail, mailFactura } = require("../configs/nodemailer");
const CartModel = require("../models/Cart.model");
const { getCartItems } = require("./cart.controller");

exports.sendMensajito = async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  await sendEmail(name, email, subject, message);
  res.render("message", { email, subject, message });
};

exports.sendFactura = async (req, res, next) => {
  const { cartItems, totalPrice } = await getCartItems(req, res);

  const cartHTMLList = cartItems.reduce((acc, cv) => {
    return (
      acc +
      `
      <!-- row-1 -->
      <tr>
        <td bgcolor="#ffffff" style="padding: 0 20px;border: 1px solid #ebebeb;border-radius: 5px;">
          <table border="0" cellpadding="0" cellspacing="0">
            <tbody><tr>
              <td>
                <!-- column-1 -->
                <table width="105" class="table1-3" align="left" border="0" cellpadding="0" cellspacing="0">
                  <!-- margin-top -->
                  <tbody><tr><td height="20"></td></tr>
                  <tr>
                    <td>
                      <table height="80" width="105" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 100px;">
                        <tbody><tr>
                          <td align="center" valign="middle" bgcolor="#fcfcfc" style="border: 1px solid #ebebeb;border-radius: 5px;" class="editable-img">
                            <a href="#">
                              <img editable="true" mc:edit="image105" src="${cv.productId.imagesURL[0]}" style="display:block; line-height:0; font-size:0; border:0;max-width: 100%;" border="0" alt="image">
                            </a>
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                  <!-- margin-bottom -->
                  <tr class="tablet_hide"><td height="20"></td></tr>
                </tbody></table><!-- ENd column-1 -->

                <!-- vertical gutter -->
                <table class="table1-3" width="19" align="left" border="0" cellpadding="0" cellspacing="0">
                  <tbody><tr><td height="1"></td></tr>
                </tbody></table>

                <!-- column-2 -->
                <table width="265" class="table1-3" align="left" border="0" cellpadding="0" cellspacing="0">
                  <!-- margin-top -->
                  <tbody><tr><td height="25"></td></tr>
                  <tr>
                    <td>
                      <table width="265" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 265px;">
                        <tbody><tr>
                          <td align="left" mc:edit="text103" class="text_color_282828 center_content" style="line-height: 1;color: #282828;font-size: 14px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                            <div class="editable-text">
                              <span class="text_container">${cv.productId.name}</span>
                            </div>
                          </td>
                        </tr>

                        <!-- horizontal gap -->
                        <tr><td height="10"></td></tr>

                        <tr>
                          <td align="left" mc:edit="text104" class="text_color_c6c6c6 center_content" style="line-height: 1.8;color: #c6c6c6;font-size: 12px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                            <div class="editable-text">
                              <span class="text_container">Cantidad alquilada: ${cv.quantity}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                  <!-- margin-bottom -->
                  <tr class="tablet_hide"><td height="20"></td></tr>
                </tbody></table><!-- ENd column-2 -->

                <!-- vertical gutter -->
                <table class="table1-3" width="19" align="left" border="0" cellpadding="0" cellspacing="0">
                  <tbody><tr><td height="1"></td></tr>
                </tbody></table>

                <!-- column-3 -->
                <table width="70" class="table1-3" align="right" border="0" cellpadding="0" cellspacing="0">
                  <!-- margin-top -->
                  <tbody><tr><td height="25"></td></tr>
                  <tr>
                    <td valign="top">
                      <table align="center" border="0" cellspacing="0" cellpadding="0">
                        <tbody><tr>
                          <td align="center" mc:edit="text105" class="text_color_282828 center_content" style="line-height: 1;color: #282828;font-size: 14px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                            <div class="editable-text">
                              <span class="text_container">Precio</span>
                            </div>
                          </td>
                        </tr>

                        <!-- horizontal gap -->
                        <tr><td height="15"></td></tr>

                        <tr>
                          <td align="center" mc:edit="text106" class="text_color_e5c5b5 center_content" style="line-height: 1;color: #e5c5b5;font-size: 14px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                            <div class="editable-text"><multiline>${cv.subtotal}</multiline></div>
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                  <!-- margin-bottom -->
                  <tr><td height="20"></td></tr>
                </tbody></table><!-- ENd column-3 -->
              </td>
            </tr>
          </tbody></table>
        </td>
      </tr><!-- END row-1 -->

      <!-- horizontal gap -->
      <tr><td height="25"></td></tr>

      `
    );
  }, "");

  const totalSection = `
<!-- row-2 -->
<tr>
  <td bgcolor="#ffffff" style="padding: 0 20px;border: 1px solid #ebebeb;border-radius: 5px;">
    <table border="0" cellpadding="0" cellspacing="0">
      <tbody><tr>
        <td>
          <!-- column-1 -->
          <table width="105" class="table1-3" align="left" border="0" cellpadding="0" cellspacing="0">
            <!-- margin-top -->
            <tbody><tr><td height="20"></td></tr>
            <tr>
              <td>
                <table height="80" width="105" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 100px;">																
                  <tbody><tr>
                    
                  </tr>
                </tbody></table>
              </td>
            </tr>
            <!-- margin-bottom -->
            <tr class="tablet_hide"><td height="20"></td></tr>
          </tbody></table><!-- ENd column-1 -->
          
          <!-- vertical gutter -->
          <table class="table1-3" width="19" align="left" border="0" cellpadding="0" cellspacing="0">
            <tbody><tr><td height="1"></td></tr>
          </tbody></table>

          <!-- column-2 -->
          <table width="265" class="table1-3" align="left" border="0" cellpadding="0" cellspacing="0">
            <!-- margin-top -->
            <tbody><tr><td height="25"></td></tr>
            <tr>
              <td>
                <table width="265" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 265px;">																
                  <tbody><tr>
                    <td align="left" mc:edit="text107" class="text_color_282828 center_content" style="line-height: 1;color: #282828;font-size: 14px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                      <div class="editable-text"><multiline></multiline></div>
                    </td>
                  </tr>

                  <!-- horizontal gap -->
                  <tr><td height="10"></td></tr>

                  <tr>
                    <td align="left" mc:edit="text108" class="text_color_c6c6c6 center_content" style="line-height: 1.8;color: #c6c6c6;font-size: 12px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                      <div class="editable-text"><multiline><h2><span style="color:#000000"><strong>TOTAL</strong></span></h2>
</multiline></div>
                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
            <!-- margin-bottom -->
            <tr class="tablet_hide"><td height="20"></td></tr>
          </tbody></table><!-- ENd column-2 -->

          <!-- vertical gutter -->
          <table class="table1-3" width="19" align="left" border="0" cellpadding="0" cellspacing="0">
            <tbody><tr><td height="1"></td></tr>
          </tbody></table>

          <!-- column-3 -->
          <table width="70" class="table1-3" align="right" border="0" cellpadding="0" cellspacing="0">
            <!-- margin-top -->
            <tbody><tr><td height="25"></td></tr>
            <tr>
              <td valign="top">
                <table align="center" border="0" cellspacing="0" cellpadding="0">
                  <tbody><tr>
                    <td align="center" mc:edit="text109" class="text_color_282828 center_content" style="line-height: 1;color: #282828;font-size: 14px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                      <div class="editable-text"><multiline></multiline></div>
                    </td>
                  </tr>

                  <!-- horizontal gap -->
                  <tr><td height="15"></td></tr>

                  <tr>
                    <td align="center" mc:edit="text110" class="text_color_e5c5b5 center_content" style="line-height: 1;color: #e5c5b5;font-size: 14px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                      <div class="editable-text"><multiline>$${(
                        totalPrice / 100
                      ).toFixed(2)} USD</multiline></div>
                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
            <!-- margin-bottom -->
            <tr><td height="20"></td></tr>
          </tbody></table><!-- ENd column-3 -->
        </td>
      </tr>
    </tbody></table>
  </td>
</tr><!-- END row-2 -->`;

  await mailFactura(cartHTMLList, totalSection, req);

  next();
};
