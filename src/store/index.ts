import IProjetos from "@/interfaces/IProjetos";
import ITarefas from "@/interfaces/ITarefas";
import { INotificacao } from "@/interfaces/INotificacao";


import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, ADICIONA_TAREFA, NOTIFICAR } from "./tipo-mutacoes";

interface Estado {
    projetos: IProjetos[],
    tarefas: ITarefas[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
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
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notf => notf.id != novaNotificacao.id);
            }, 3000)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}