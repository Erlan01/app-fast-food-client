import {ACCESS_TOKEN, API_BASE_URL} from '../constants';
import {api} from "../constants/api";
import {messageService} from "./MessageUtils";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                messageService(json)
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json.data;
            })
        );
};

const getUrl = (urlSuffix) => {
    return API_BASE_URL + urlSuffix;
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: getUrl(api.userMe),
        method: 'GET'
    });
}

export function signUp(signUpRequest) {
    return request({
        url: getUrl(api.signUp),
        method: 'POST',
        body: JSON.stringify(signUpRequest)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function checkPhone(signupRequest) {
    return request({
        url: getUrl(api.checkPhone),
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkVerificationCode(requestBody) {
    return request({
        url: getUrl(api.checkVerificationCode),
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function getRegions() {
    return request({
        url: getUrl(api.getRegions),
        method: 'GET'
    });
}

export function getDistricts(regionId) {
    return request({
        url: getUrl(api.getDistrictsByRegionId) + "/" + regionId,
        method: 'GET'
    });
}

export function test(){
    return request({
        url: getUrl(api.test),
        method: 'GET'
    })
}