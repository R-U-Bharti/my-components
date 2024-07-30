import { baseUrl } from "./constants";

export default function baseApi() {

    let apiList = {
        loginApi: baseUrl + 'base/api/login', //post
        registerCompany: baseUrl + 'base/api/registercompany', //post
        profileDashboard: baseUrl + 'base/api/profile/', //get
    }

    return apiList;
}