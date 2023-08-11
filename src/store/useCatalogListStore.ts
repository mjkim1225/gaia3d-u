import { create } from 'zustand'

interface useCatalogListStoreInterface {
    catalogIdList: number[],
    addCatalogId: (id: number) => void,
    removeCatalogId: (id: number) => void,
}

const useCatalogListStore = create<useCatalogListStoreInterface>((set) => ({
    catalogIdList: [],
    addCatalogId: (id) => {
        set((state) => ({
            catalogIdList: [...state.catalogIdList, id]
        }))
    },
    removeCatalogId: (id) => {
        set((state) => ({
            catalogIdList: state.catalogIdList.filter((catalogId) => catalogId !== id)
        }))
    }
}))

export default useCatalogListStore


/**
 * TYPE DEFINITION
 */
