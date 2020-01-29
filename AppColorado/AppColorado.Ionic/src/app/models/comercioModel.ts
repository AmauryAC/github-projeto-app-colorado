export class ComercioModel {
    _id: string;
    nome: string;
    descricao: string;
    foto: string;
    categoria: any;
    usuario: any;
    contatos: Array<any>;
    vendProdutos: boolean;
    prestServicos: boolean;
    estabFixo: boolean;
    endereco: any;
    areaAtuacao: string;
    horarioFunc: Array<any>;
}