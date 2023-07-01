import IProjetos from "@/interfaces/IProjetos";
import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";


interface Estado {
    projetos: IProjetos[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [
            {
                id: new Date().toISOString(),
                nome: 'TypeScript'
            },
            {
                id: new Date().toISOString(),
                nome: 'Vue'
            },
            {
                id: new Date().toISOString(),
                nome: 'Vuex'
            },
        ]
    }
})