<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field" id="dataInput">
                <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { store } from '../../store/index';
import { useStore } from '../../store/index';
import { defineComponent } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO } from "../../store/tipo-mutacoes";
import { TipoNotificacao } from '@/interfaces/INotificacao';
// import { notificacaoMixin } from '@/mixins/noticar';
import useNotificador from '@/hooks/notificador';


export default defineComponent({
    name: 'FormularioProjeto',
    props: {
        id: {
            type: String
        }
    },
    // mixins: [notificacaoMixin],
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    data() {
        return {
            nomeDoProjeto: "",
        };
    },
    methods: {
        salvar() {
            if (this.id) {
                const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.nomeDoProjeto = '';
            this.notificar(TipoNotificacao.SUCESSO, 'Novo projeto salvo', 'Prontinho ;) seu projeto já está disponível.');
            this.$router.push('/projetos');
        },

    },
    setup() {
        const store = useStore();
        const { notificar } = useNotificador();
        return {
            store,
            notificar
        }
    }
});

</script>