var conn = require('../config/connection');
var nodemailer = require('nodemailer');
var moment = require('moment');
var mail = require('./mail.helper');

function content_replace(content, data = []) {

    //  content = content.replace(/\[/g, '');  
    // content = content.replace(/\]/g, '');  
    content = content.replace(/{{today_date}}/gi, moment().format('mm-dd-yyyy:hh:mm:ss'));
    content = content.replace(/{{business_name}}/gi, data.business_name);
    content = content.replace(/{{account_link}}/gi, data.account_link);
    content = content.replace(/{{account_code}}/gi, data.account_code);
    content = content.replace(/{{user_name}}/gi, data.user_name);
    /*for (var key in data) { 
    console.log("{{"+key+"}}");
      content = content.replace(/{{+key+}}/gi", data[key]);
    }*/
    content = content.replace(/undefined/gi, '');
    return content;
}
var transporter = nodemailer.createTransport({

    host: "",
    port: 2525,
    secure: false,
    auth: {
        user: '',
        pass: ''
    },

    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

function send_email(to, cc = '', subject = '', body = '', from_email) {

    let smtpConfig = mail.settings();

    // Create a SMTP transport object
    var transport = nodemailer.createTransport(smtpConfig);

    // Message object
    var message = {
        // sender info
        from: '',
        to: to.trim(),
        cc: cc,
        // Subject of the message
        subject: subject,
        // HTML req
        html: body
    };

    transport.sendMail(message, function(error) {
        if (error) {
            msg = error;
            success = false;
        } else {
            return msg = "Mail Sent Succesfully";
            return success = true;
        }
        transport.close(); // close the connection pool
    });
}

/***

@@ Desc : common mail function to all mail templates 
@@ params : email template id, to,cc email array, replace data

**/

exports.email = {

    sendEmail: function(template_id, to, cc_email = [], data = {}) {
        var cc = '';
        if (cc_email.length > 0) {
            cc = cc_email.toString();
        }

        conn.query('SELECT * FROM `email_templates` WHERE id= ' + template_id + ' AND status =1 LIMIT 1', false, function(err, emailRow) {
            //var emailRow = mysql.db.parse(emailRow);
            if (emailRow.length > 0) {
                var subject = emailRow[0].subject;
                var body = emailRow[0].body;
                //subject = content_replace(subject,data);
                body = content_replace(body, data);

                send_email(to, cc, subject, body);
            }

        });
    },
    /*send_email : function(to,cc='',subject='',body=''){ 
        
                            let smtpConfig = mail.settings();
                            // Create a SMTP transport object
                            var transport = nodemailer.createTransport(smtpConfig);
                    
                            // Message object
                            var message = {        
                                // sender info
                                from: constant.FROM_EMIL,
                                to:to.trim(),
                                cc:cc,
                                // Subject of the message
                                subject: subject,
                                // HTML req
                                html: body 
                            };
                    
                            transport.sendMail(message, function(error) {
                                if (error) {    
                                   
                                } else {
                                  
                                }
                                transport.close(); // close the connection pool
                            });
    }*/
};