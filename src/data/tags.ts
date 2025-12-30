import type { TagModel } from "../models/TagModel";

const CATEGORIES = {
    PROD: "Produtos",
    CLI: "Cliente",
    COMP: "Compra",
    VENDA: "Venda",
    LJ: "Loja",
    VEND: "Vendedor",
    PROMO: "Promoção",
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
    { id: "prod_ult_custo", name: "Ult. Custo", category: CATEGORIES.PROD },
    { id: "prod_custo_medio", name: "Custo Médio", category: CATEGORIES.PROD },
    { id: "prod_ncm", name: "NCM", category: CATEGORIES.PROD },
    { id: "prod_cest", name: "CEST", category: CATEGORIES.PROD },
    { id: "prod_icms", name: "CST", category: CATEGORIES.PROD },
    { id: "prod_aliq_icms", name: "Aliq. ICMS", category: CATEGORIES.PROD },
    { id: "prod_margem_lucro", name: "Margem de Lucro", category: CATEGORIES.PROD },
    { id: "prod_ult_compra", name: "Ult. Compra", category: CATEGORIES.PROD },
    { id: "prod_custo", name: "Custo", category: CATEGORIES.PROD },
    { id: "prod_unidade", name: "Unidade", category: CATEGORIES.PROD },
    { id: "prod_giro", name: "Giro", category: CATEGORIES.PROD },
    { id: "prod_curva", name: "Curva", category: CATEGORIES.PROD },
];

export const costumerTags: TagModel[] = [
    { id: "cli_nome_cli", name: "Nome Cliente", category: CATEGORIES.CLI},
    { id: "cli_cod_cli", name: "Cod. Cliente", category: CATEGORIES.CLI},
    { id: "cli_cpf_cnpj", name: "CPF/CNPJ", category: CATEGORIES.CLI}
];

export const purchaseTags: TagModel[] = [
    { id: "comp_num_nota", name: "Num. Nota", category: CATEGORIES.COMP },
    { id: "comp_dt_compra", name: "Data Compra", category: CATEGORIES.COMP },
    { id: "comp_qtde_comprada", name: "Qtde. Comprada", category: CATEGORIES.COMP }
]

export const saleTags: TagModel[] = [
    { id: "venda_cupom", name: "Cupom", category: CATEGORIES.VENDA },
    { id: "venda_data_venda", name: "Data Venda", category: CATEGORIES.VENDA },
    { id: "venda_hora_venda", name: "Hora Venda", category: CATEGORIES.VENDA },
    { id: "venda_tipo_venda", name: "Tipo Venda", category: CATEGORIES.VENDA },
    { id: "venda_qtde_vendida", name: "Qtde. Vendida", category: CATEGORIES.VENDA },
    { id: "venda_valor_bruto", name: "Valor Bruto", category: CATEGORIES.VENDA },
    { id: "venda_valor_desconto", name: "Valor Desconto", category: CATEGORIES.VENDA },
    { id: "venda_valor_venda", name: "Valor Venda", category: CATEGORIES.VENDA },
    { id: "venda_cmv", name: "CMV", category: CATEGORIES.VENDA },
    { id: "venda_perc_desconto", name: "% Desconto", category: CATEGORIES.VENDA },
    { id: "venda_valor_ICMS", name: "Valor ICMS", category: CATEGORIES.VENDA },
]

export const storeTags: TagModel[] = [
    { id: "store_num_loja", name: "Num. Loja", category: CATEGORIES.LJ },
    { id: "store_cod_loja", name: "Cod. Loja", category: CATEGORIES.LJ },
    { id: "store_nome_loja", name: "Nome Loja", category: CATEGORIES.LJ },
    { id: "store_cnpj_loja", name: "CNPJ Loja", category: CATEGORIES.LJ }
]

export const sellerTags: TagModel[] = [
    { id: "seller_cod_vendedor", name: "Cod. Vendedor", category: CATEGORIES.VEND },
    { id: "seller_nome_vendedor", name: "Nome Vendedor", category: CATEGORIES.VEND },
]

export const promotionTags: TagModel[] = [
    { id: "promo_dt_inicial_promo", name: "Data Inical Promoção", category: CATEGORIES.PROMO },
    { id: "promo_dt_final_promo", name: "Data Final Promoção", category: CATEGORIES.PROMO },
    { id: "promo_valor_promo", name: "Valor Promoção", category: CATEGORIES.PROMO },
    { id: "promo_tabloide", name: "Tabloide", category: CATEGORIES.PROMO },
    { id: "promo_PBM", name: "PBM Promoção", category: CATEGORIES.PROMO },
]


export const reportTags: TagModel[] = [
    ...productTags,
    ...costumerTags,
    ...purchaseTags,
    ...saleTags,
    ...storeTags,
    ...sellerTags,
    ...promotionTags
];