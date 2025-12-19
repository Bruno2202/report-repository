import type { TagModel } from "../models/TagModel";

const CATEGORIES = {
    PROD: "Produtos",
    CLI: "Cliente"
} as const;

export const productTags: TagModel[] = [
    { id: "prod_cod_prod", name: "Cod. Prod", category: CATEGORIES.PROD},
    { id: "prod_barras", name: "Barras", category: CATEGORIES.PROD},
    { id: "prod_nome_prod", name: "Nome do Produto", category: CATEGORIES.PROD },
    { id: "prod_preco_venda", name: "Preço de Venda", category: CATEGORIES.PROD },
    { id: "prod_qtde_estoque", name: "Qtde. Estoque", category: CATEGORIES.PROD },
    { id: "prod_classe", name: "Classe", category: CATEGORIES.PROD },
    { id: "prod_secao", name: "Seção", category: CATEGORIES.PROD },
    { id: "prod_fabricante", name: "Fabricante", category: CATEGORIES.PROD },
    { id: "prod_ult_cusot", name: "Ult. Custo", category: CATEGORIES.PROD },
    { id: "prod_custo_medio", name: "Custo Médio", category: CATEGORIES.PROD }
];

export const costumerTags: TagModel[] = [
    { id: "cli_nome_cli", name: "Nome Cliente", category: CATEGORIES.CLI},
    { id: "cli_cod_cli", name: "Cod. Cliente", category: CATEGORIES.CLI},
    { id: "cli_cpf_cnpj", name: "CPF/CNPJ", category: CATEGORIES.CLI},
];


export const reportTags: TagModel[] = [
    ...productTags,
    ...costumerTags
];