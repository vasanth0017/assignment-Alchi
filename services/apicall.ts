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
