import IProjetos from "@/interfaces/IProjetos";
import ITarefas from "@/interfaces/ITarefas";

import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, ADICIONA_TAREFA } from "./tipo-mutacoes";

interface Estado {
    projetos: IProjetos[],
    tarefas: ITarefas[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjetos
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjetos) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [ADICIONA_TAREFA](state, dadosDaTarefa: ITarefas) {
            const tarefa = {
                duracaoEmSegundos: dadosDaTarefa.duracaoEmSegundos,
                descricao: dadosDaTarefa.descricao,
                projeto: dadosDaTarefa.projeto
            } as ITarefas
            state.tarefas.push(tarefa);
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}