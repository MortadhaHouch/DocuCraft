import { generateRandomUsers } from "./generateRandomUser"

export const userData = {
    name: "Mortadha Houch",
    email: "mortahouch123@gmail.com",
    phone: "+216 26 118 089",
    address: "El Khadra city, Tunisia",
    linkedin:"https://www.linkedin.com/in/mortadha-houch/",
    github:"https://github.com/MortadhaHouch",
}
export const SESSION_EXPIRES_IN = 60 * 60 * 1000 * 24 * 7; // 7 days
export const randomUsers = generateRandomUsers()