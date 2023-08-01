/*
* map config
* */

import {CameraOption} from "./types";

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYTM3ODhlNC1jOWUxLTRhOTYtYTgwZC1iMDA3OGJiMTQwZDciLCJpZCI6MTI5NDU5LCJpYXQiOjE2ODIwNTc4NjN9.GC-W9QfAFa9rXMh2Ow2rSC5UvLcwtS_qjWJ1v454z1A';

const DEFAULT_CAMERA_OPTION: CameraOption = {
    longitude: 126.98465233162544,
    latitude: 37.353248730001874,
    altitude: 15000,
    heading: 0.0,
    pitch: -40.0,
    roll: 0.0
};

export default {
    ACCESS_TOKEN,
    DEFAULT_CAMERA_OPTION,
};
