// this script allows the usage of nodejs and electron specific modules and libraries without typical security vulnerabilities
import { IpcRenderer, contextBridge } from "electron";

const mockAPI = {
    stuff: "here's some stuff"//this could be functions, classes, react components probably, etc
}

contextBridge.exposeInMainWorld("apiName", mockAPI)


