import { create } from 'zustand'
import {GaiaObjType} from "../types";

interface useGaiaObjListStoreInterface {
    gaiaObjList: GaiaObjType[]
    gaiaObjIdList: number[]
    addGaiaObj: (gaiaObj: GaiaObjType) => void
    removeGaiaObjById: (id: number) => void
}

const useGaiaObjListStore = create<useGaiaObjListStoreInterface>((set) => ({
    gaiaObjList: [],
    gaiaObjIdList: [],
    addGaiaObj: (gaiaObj) => set((state) => ({
        gaiaObjList: [...state.gaiaObjList, gaiaObj],
        gaiaObjIdList: [...state.gaiaObjIdList, gaiaObj.id],
    })),
    removeGaiaObjById: (id) => set((state) => ({
            gaiaObjList: state.gaiaObjList.filter((obj) => obj.id !== id),
            gaiaObjIdList: state.gaiaObjIdList.filter((_id) => _id !== id),
    })),
}))

export default useGaiaObjListStore


/**
 * TYPE DEFINITION
 */
