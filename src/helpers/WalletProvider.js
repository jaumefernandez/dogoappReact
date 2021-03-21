import axios from "axios";

export const getTransactions = async(fromMail) => {
    const parameter = {emailid: fromMail};
    const resp = await axios.post("http://localhost:4000/trans/from-email", parameter);
 
    if (resp.status === 200) return resp.data;
    return {};
};


export const saveTransaction = async (data) => {
    const resp = await axios.post("http://localhost:4000/trans/save-trans", data);   
    if (resp.status === 200) return true;
    return false;

};