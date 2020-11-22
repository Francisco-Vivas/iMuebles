const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendBienvenida = (newUser) => {
  return transporter.sendMail({
    from: '"iMuebles" <imuebles.noreply@gmail.com>',
    to: newUser.email,
    subject: "¡Bienvenido a iMuebles!",
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width"/>
	<title>¡Bienvenido a iMuebles!</title>
	<style type="text/css">
		/*////// RESET STYLES //////*/
		body{height:100% !important; margin:0; padding:0; width:100% !important;}
		table{border-collapse:separate;}
		img, a img{border:0; outline:none; text-decoration:none;}
		h1, h2, h3, h4, h5, h6{margin:0; padding:0;}
		p{margin: 1em 0;}

		/*////// CLIENT-SPECIFIC STYLES //////*/
		.ReadMsgBody{width:100%;} .ExternalClass{width:100%;}
		.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%;}
		table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}
		#outlook a{padding:0;}
		img{-ms-interpolation-mode: bicubic;}
		body, table, td, p, a, li, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;}
			
		/*////// GENERAL STYLES //////*/
		img{ max-width: 100%; height: auto; }

		/*////// TABLET STYLES //////*/
		@media only screen and (max-width: 620px) {
		.shrink_font{
			font-size: 62px;
		}
		/*////// GENERAL STYLES //////*/
			#foxeslab-email .table1 { width: 90% !important;}
			#foxeslab-email .table1-2 { width: 98% !important; margin-left: 1%; margin-right: 1%;}
			#foxeslab-email .table1-3 { width: 98% !important; margin-left: 1%; margin-right: 1%;}
			#foxeslab-email .table1-4 { width: 98% !important; margin-left: 1%; margin-right: 1%;}
			#foxeslab-email .table1-5 { width: 90% !important; margin-left: 5%; margin-right: 5%;}

			#foxeslab-email .tablet_no_float { clear: both; width: 100% !important; margin: 0 auto !important; text-align: center !important; }
			#foxeslab-email .tablet_wise_float { clear: both; float: none !important; width: auto !important; margin: 0 auto !important; text-align: center !important; }

			#foxeslab-email .tablet_hide { display: none !important; }

			#foxeslab-email .image1 { width: 98% !important; }
			#foxeslab-email .image1-290 { width: 100% !important; max-width: 290px !important; }

			.center_content{ text-align: center !important; }
			.center_image{ margin: 0 auto !important; }
			.center_button{ width: 50% !important;margin-left: 25% !important;max-width: 250px !important; }
			.centerize{margin: 0 auto !important;}
		}

	
		/*////// MOBILE STYLES //////*/
		@media only screen and (max-width: 480px){
			.shrink_font{
				font-size: 48px;
			}
			.safe_color{
				color: #6a1b9a !important;
			}
			/*////// CLIENT-SPECIFIC STYLES //////*/
			body{width:100% !important; min-width:100% !important;} /* Force iOS Mail to render the email at full width. */
			table[class="flexibleContainer"]{ width: 100% !important; }/* to prevent Yahoo Mail from rendering media query styles on desktop */

			/*////// GENERAL STYLES //////*/
			img[class="flexibleImage"]{height:auto !important; width:100% !important;}

			#foxeslab-email .table1 { width: 98% !important; }
			#foxeslab-email .no_float { clear: both; width: 100% !important; margin: 0 auto !important; text-align: center !important; }
			#foxeslab-email .wise_float {	clear: both;	float: none !important;	width: auto !important;	margin: 0 auto !important;	text-align: center !important;	}

			#foxeslab-email .mobile_hide { display: none !important; }
			.auto_height{height: auto !important;}
		}
	</style>
</head>




<!-- template-2 -->
<table class="table_full editable-bg-color bg_color_ffffff editable-bg-image" bgcolor="#ffffff" width="100%" align="center" mc:repeatable="castellab" mc:variant="Header" cellspacing="0" cellpadding="0" border="0" style="background-image: url(&quot;#&quot;); background-repeat: no-repeat; background-position: left center; background-size: 100% 100%; border-collapse: collapse; background-color: rgb(242, 246, 245);" background="#">
	<!-- padding-top -->
	<tbody><tr><td height="100"></td></tr>

	<!-- header -->
	<tr>
		<td>
			<table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
				<tbody><tr>
					<td bgcolor="#f4d9c6" style="padding-top: 30px;padding-right: 40px;padding-bottom: 0;padding-left: 40px; border: 1px solid #f4d9c6; border-radius: 5px;">
						<!-- Logo -->
						<table class="no_float" align="left" border="0" cellspacing="0" cellpadding="0">
							<tbody><tr>
                <td class="editable-img" align="center">
                <h2>
									<a href="http://imuebles.herokuapp.com/" class="text_color_282828" style="text-decoration:none; font-family: 'Open Sans', Helvetica, sans-serif; color:#282828; font-weight: 600; mso-line-height-rule: exactly;">
										iMuebles
                  </a>
                  </h2>
								</td>
							</tr>
							<!-- margin-bottom -->
							<tr><td height="30"></td></tr>
						</tbody></table><!-- END logo -->

						<!-- social icons -->
						<table class="no_float" width="135" align="right" border="0" cellspacing="0" cellpadding="0">
							<tbody><tr>
								<td>
									
								</td>
							</tr>
							<!-- margin-bottom -->
							<tr><td height="30"></td></tr>
						</tbody></table><!-- END social icons -->
					</td>
				</tr>
			</tbody></table>
		</td>
	</tr><!-- END header -->

	<!-- horizontal gap -->
	<tr><td height="25"></td></tr>

	<!-- body -->
	<tr>
		<td>
			<table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
				<tbody><tr>
					<td bgcolor="#fcfcfc" style="padding: 40px 0;border: 1px solid #f2f2f2;border-radius: 5px;">
						<!-- body-container -->
						<table class="table1" width="480" align="center" border="0" cellspacing="0" cellpadding="0">

							<!-- email heading -->
							<tbody><tr>
								<td align="center" mc:edit="text101" class="text_color_282828" style="line-height: 1;color: #282828; font-size: 18px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
									<div class="editable-text"><multiline>¡Bienvenido a iMuebles!</multiline></div>
								</td>
							</tr><!-- END email heading -->

							<!-- horizontal gap -->
							<tr><td height="20"></td></tr>

							<!-- email details -->
							<tr>
								<td align="center" mc:edit="text102" class="text_color_c6c6c6" style="line-height: 1.8;color: #c6c6c6; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
									<div class="editable-text" id="foxeslab-swap-text-wrapper"><div id="foxeslab-swap-text-html"><multiline>Estamos muy felices de que hagas parte de nuestra gran familia.<br>
Ahora sí puedes aprovechar para alquilar todo tipo de exclusivos muebles o para brindarle al mundo de tus diseños únicos.</multiline></div></div>
								</td>
							</tr><!-- END email details -->

							<!-- horizontal gap -->
							<tr><td height="40"></td></tr>

							<!-- main-icon -->
							<tr>
								<td class="editable-img" align="center">
									
										<img editable="true" mc:edit="image105" src=${newUser.pictureURL} style="width: 10rem;display:block; line-height:0; font-size:0; border:0;" border="0" alt="image">
									
								</td>
							</tr><!-- END main-icon -->

							<!-- horizontal gap -->
							<tr><td height="20"></td></tr>

							<tr>
								<td align="center" mc:edit="text103" class="text_color_c6c6c6" style="line-height: 1;color: #c6c6c6;font-style: italic; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
									<div class="editable-text"><multiline></multiline></div>
								</td>
							</tr>

							<!-- horizontal gap -->
							<tr><td height="10"></td></tr>

							<tr>
								<td align="center" mc:edit="text104" class="text_color_93c054" style="line-height: 1; color: rgb(244, 217, 198); font-size: 14px; font-style: italic; font-weight: 400; font-family: &quot;Open Sans&quot;, Helvetica, sans-serif;">
									<div class="editable-text"><multiline>¡Bienvenido ${newUser.username}!</multiline></div>
								</td>
							</tr>

							<!-- horizontal gap -->
							<tr><td height="40"></td></tr>

							<!-- buttons -->
							<tr>
								<td align="center">
									<table align="center" border="0" cellspacing="0">
										<tbody><tr>
											<td>
												<table class="button_bg_color_93c054" bgcolor="#93c054" width="190" height="45" align="center" border="0" cellpadding="0" cellspacing="0" style="border-radius:5px; border-collapse: separate">
													<tbody><tr>
														<td mc:edit="text105" align="center" valign="middle" style="font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
															<div class="editable-text"><multiline><a href="http://imuebles.herokuapp.com/auth/login" style="text-decoration: none;"><span style="color:#FFFFFF;">¡Ingresa ahora!</span></a></multiline></div>
														</td>
													</tr>
												</tbody></table>
											</td>
										</tr>
									</tbody></table>
								</td>
							</tr><!-- END buttons -->

							<!-- horizontal gap -->
							<tr><td height="40"></td></tr>
							
							<!-- Unsubscribe link -->
							<tr>
								<td align="center" mc:edit="text106" style="line-height: 1;font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
									<div class="editable-text"><multiline></multiline></div>
								</td>
							</tr>
						</tbody></table><!-- END body-container -->
					</td>
				</tr>
			</tbody></table>
		</td>
	</tr><!-- END body -->

	<!-- padding-bottom -->
	<tr><td height="100"></td></tr>
</tbody></table>


</body>
</html>
    
    `,
    text:
      "?Bienvenido a iMuebles!. Abra este correo en su navegador del computador para una mejor experiencia.",
  });
};

exports.mailFactura = (cartHTMLList, totalSection, req) => {
  return transporter.sendMail({
    from: '"iMuebles" <imuebles.noreply@gmail.com>',
    to: req.user.email,
    subject: "Estos son tus productos alquilados | iMuebles",
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width"/>
      <title>Aquí está tu carrito de compras</title>
      <style type="text/css">
        /*////// RESET STYLES //////*/
        body{height:100% !important; margin:0; padding:0; width:100% !important;}
        table{border-collapse:separate;}
        img, a img{border:0; outline:none; text-decoration:none;}
        h1, h2, h3, h4, h5, h6{margin:0; padding:0;}
        p{margin: 1em 0;}
    
        /*////// CLIENT-SPECIFIC STYLES //////*/
        .ReadMsgBody{width:100%;} .ExternalClass{width:100%;}
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%;}
        table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}
        #outlook a{padding:0;}
        img{-ms-interpolation-mode: bicubic;}
        body, table, td, p, a, li, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;}
          
        /*////// GENERAL STYLES //////*/
        img{ max-width: 100%; height: auto; }
    
        /*////// TABLET STYLES //////*/
        @media only screen and (max-width: 620px) {
        .shrink_font{
          font-size: 62px;
        }
        /*////// GENERAL STYLES //////*/
          #foxeslab-email .table1 { width: 90% !important;}
          #foxeslab-email .table1-2 { width: 98% !important; margin-left: 1%; margin-right: 1%;}
          #foxeslab-email .table1-3 { width: 98% !important; margin-left: 1%; margin-right: 1%;}
          #foxeslab-email .table1-4 { width: 98% !important; margin-left: 1%; margin-right: 1%;}
          #foxeslab-email .table1-5 { width: 90% !important; margin-left: 5%; margin-right: 5%;}
    
          #foxeslab-email .tablet_no_float { clear: both; width: 100% !important; margin: 0 auto !important; text-align: center !important; }
          #foxeslab-email .tablet_wise_float { clear: both; float: none !important; width: auto !important; margin: 0 auto !important; text-align: center !important; }
    
          #foxeslab-email .tablet_hide { display: none !important; }
    
          #foxeslab-email .image1 { width: 98% !important; }
          #foxeslab-email .image1-290 { width: 100% !important; max-width: 290px !important; }
    
          .center_content{ text-align: center !important; }
          .center_image{ margin: 0 auto !important; }
          .center_button{ width: 50% !important;margin-left: 25% !important;max-width: 250px !important; }
          .centerize{margin: 0 auto !important;}
        }
    
      
        /*////// MOBILE STYLES //////*/
        @media only screen and (max-width: 480px){
          .shrink_font{
            font-size: 48px;
          }
          .safe_color{
            color: #6a1b9a !important;
          }
          /*////// CLIENT-SPECIFIC STYLES //////*/
          body{width:100% !important; min-width:100% !important;} /* Force iOS Mail to render the email at full width. */
          table[class="flexibleContainer"]{ width: 100% !important; }/* to prevent Yahoo Mail from rendering media query styles on desktop */
    
          /*////// GENERAL STYLES //////*/
          img[class="flexibleImage"]{height:auto !important; width:100% !important;}
    
          #foxeslab-email .table1 { width: 98% !important; }
          #foxeslab-email .no_float { clear: both; width: 100% !important; margin: 0 auto !important; text-align: center !important; }
          #foxeslab-email .wise_float {	clear: both;	float: none !important;	width: auto !important;	margin: 0 auto !important;	text-align: center !important;	}
    
          #foxeslab-email .mobile_hide { display: none !important; }
          .auto_height{height: auto !important;}
        }
      </style>
    </head>
    
    <table class="table_full editable-bg-color bg_color_ffffff editable-bg-image" bgcolor="#F2F6F5" width="100%" align="center" mc:repeatable="castellab" mc:variant="Header" cellspacing="0" cellpadding="0" border="0" style="background-image: url(&quot;#&quot;); background-repeat: no-repeat; background-position: left center; background-size: 100% 100%; border-collapse: collapse; background-color: rgb(242, 246, 245);" background="#">
      <!-- padding-top -->
      <tbody><tr><td height="100"></td></tr>
    
      <!-- header -->
      <tr>
        <td>
          <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
            <tbody><tr>
              <td bgcolor="#f4d9c6" style="padding-top: 30px;padding-right: 40px;padding-bottom: 0;padding-left: 40px; border: 1px solid #f4d9c6; border-radius: 5px;">
                <!-- Logo -->
                <table class="no_float" align="left" border="0" cellspacing="0" cellpadding="0">
                  <tbody><tr>
                    <td class="editable-img" align="center">
                    <h2>
                    <a href="http://imuebles.herokuapp.com/" class="text_color_282828" style="text-decoration:none; font-family: 'Open Sans', Helvetica, sans-serif; color:#282828; font-weight: 600; mso-line-height-rule: exactly;">
                      iMuebles
                    </a>
                    </h2>
                    </td>
                  </tr>
                  <!-- margin-bottom -->
                  <tr><td height="30"></td></tr>
                </tbody></table><!-- END logo -->
              </td>
            </tr>
          </tbody></table>
        </td>
      </tr><!-- END header -->
    
      <!-- horizontal gap -->
      <tr><td height="25"></td></tr>
    
      <!-- body -->
      <tr>
        <td>
          <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
            <tbody><tr>
              <td bgcolor="#fcfcfc" style="padding: 40px 0;border: 1px solid #f2f2f2;border-radius: 5px;">
                <!-- body-container -->
                <table class="table1" width="520" align="center" border="0" cellspacing="0" cellpadding="0">
    
                  <!-- email heading -->
                  <tbody><tr>
                    <td align="left" mc:edit="text101" class="text_color_282828 center_content" style="line-height: 1;color: #282828; font-size: 18px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                      <div class="editable-text"><multiline>Hola ${req.user.username}, aquí está tu factura.</multiline></div>
                    </td>
                  </tr><!-- END email heading -->
    
                  <!-- horizontal gap -->
                  <tr><td height="20"></td></tr>
    
                  <!-- email details -->
                  <tr>
                    <td align="left" mc:edit="text102" class="text_color_c6c6c6 center_content" style="line-height: 1.8;color: #c6c6c6; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                      <div class="editable-text"><multiline>Tu pedido está en camino. En los próximos días el vendedor se contactará contigo para la entrega.</multiline></div>
                    </td>
                  </tr><!-- END email details -->
    
                  <!-- horizontal gap -->
                  <tr><td height="45"></td></tr>
                  
                  <!-- horizontal separator -->
                  <tr>
                    <td>
                      <table align="center" class="table1" width="460" border="0" cellpadding="0" cellspacing="0">
                        <tbody><tr><td height="1" bgcolor="#e0e0e0"></td></tr>
                      </tbody></table>
                    </td>
                  </tr>
    
                  <!-- horizontal gap -->
                  <tr><td height="40"></td></tr>
                  
                  ${cartHTMLList}

                </tbody></table><!-- END body-container -->
              </td>
            </tr>
          </tbody></table>
        </td>
      </tr><!-- END body -->
    
      <!-- horizontal gap -->
      <tr><td height="40"></td></tr>

      ${totalSection}
      <!-- horizontal gap -->
      <tr><td height="40"></td></tr>

      <!-- footer -->
      <tr>
        <td>
          <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
            <tbody><tr>
              <td align="center" mc:edit="text119" class="text_color_c6c6c6" style="line-height: 1;color: #c6c6c6; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                <div class="editable-text"><multiline>© 2020 iMuebles. All Rights Reserved.</multiline></div>
              </td>
            </tr>
            <!-- horizontal gap -->
            <tr><td height="15"></td></tr>
    
            <tr>
              <td align="center" mc:edit="text120" class="text_color_c6c6c6" style="line-height: 1;color: #c6c6c6; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                <div class="editable-text"><multiline>Made with love!</multiline></div>
              </td>
            </tr>
          </tbody></table>
        </td>
      </tr><!-- END footer -->
    
      <!-- padding-bottom -->
      <tr><td height="100"></td></tr>
    </tbody></table>
    
    
    </body>
    </html>
    `,
    text:
      "Estos son tus productos alquilados. Abre este correo en su navegador del computador para una mejor experiencia.",
  });
};
