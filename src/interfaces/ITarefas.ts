import IProjetos from "./IProjetos";

export default interface ITarefas {
    duracaoEmSegundos: number,
    descricao: string,
    projeto: IProjetos,
}