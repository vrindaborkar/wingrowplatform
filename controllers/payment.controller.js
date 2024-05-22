const Insta = require('instamojo-nodejs');
const crypto = require('crypto');
//order Api
const ordersApi = async(req,res)=>
{
    Insta.setKeys('7038816d889a1d9598016bb4801f87fd', 'e22abfc3f0358d917cbd41d182a5911a')
    const data=new Insta.PaymentData();

    data.purpose=req.body.purpose;
    data.amount=req.body.amount;
    data.buyer_name=req.body.buyer_name;
    data.redirect_url=req.body.redirect_url;
    data.email=req.body.email;
    data.phone=req.body.phone;
    data.send_email=false;
    data.webhook='http://www.example.com/webhook/';
    data.send_sms=false;
    data.allow_repeated_payments=false;
    data.currency=req.body.currency;

    Insta.createPayment(data, function(error, response){
        if(error){

        }
        else{
            console.log(response);
            const responseData=JSON.parse(response);
            const redirectUrl=responseData.payment_request.longurl;
            console.log(redirectUrl);
            res.status(200).json(redirectUrl);
        }
    });

    // app.get('callback/',(req,res)=>{
    //     const url=require('url');
    //     let url_parts=url.parse(req.url,true);
    //     responseData=url.url_parts.query;

    //     if(responseData.payment_id){
            
    //     }
    // })

}


const controller = {
    ordersApi
}

module.exports = controller;