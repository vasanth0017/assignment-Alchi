import exp from "constants";
import Fetch from "./fetch";

export const generateQr = async () => {
    return await Fetch.postJSON("/qr-code/code");
  };
  //update call 
export const updateQr = async (code: string) => {
    console.log("code", code);  
    return await Fetch.updateJSON("/qr-code/updatecode", { code });
  }

  export const getQr = async (code :any) => {
    return await Fetch.getJSON(`/qr-code/getcode?code=${code}`);
  }
  //razor pay
  export const sendPayment = async ({  amount, recipientUserId }:any) => {
    return await Fetch.postJSON("/razorpay/razorpay", {  amount, recipientUserId });
  };
  export const completePay = async ({  orderId, paymentId, signature }:any) => {
    return await Fetch.postJSON("/razorpay/completePay", { orderId, paymentId, signature });
  };
export const getPayment = async ( ) => {
    return await Fetch.postJSON("/razorpay/payouts");
  }
  export const fundaccount = async ( { userUPIID, contactId }:any) => {
    return await Fetch.postJSON("/razorpay/fundaccount", { userUPIID, contactId  });
  }
  export const createContact = async ({ userName, userEmail, userContact }:any) => {
    return await Fetch.postJSON("/razorpay/create-contact",{ userName, userEmail, userContact });
  }