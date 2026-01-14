import type { TagModel } from "../models/TagModel";

const CATEGORIES = {
    PROD: "Produtos",
    CLI: "Cliente",
    COMP: "Compra",
    VENDA: "Venda",
    LJ: "Loja",
    VEND: "Vendedor",
    PROMO: "Promoção",
    FORN: "Fornecedor",
    CONV: "Convênio",
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
    { id: "prod_perm_desconto", name: "Produto Permite Desconto", category: CATEGORIES.PROD },
    { id: "prod_perm_ped_elet", name: "Produto Permite Pedido Eletrônico", category: CATEGORIES.PROD },
    { id: "prod_pbm", name: "PBM Produto", category: CATEGORIES.PROD },
    { id: "prod_sit", name: "Situação Produto", category: CATEGORIES.PROD },
];

export const costumerTags: TagModel[] = [
    { id: "cli_nome_cli", name: "Nome Cliente", category: CATEGORIES.CLI},
    { id: "cli_cod_cli", name: "Cod. Cliente", category: CATEGORIES.CLI},
    { id: "cli_cpf_cnpj", name: "CPF/CNPJ", category: CATEGORIES.CLI},
    { id: "cli_rg", name: "RG", category: CATEGORIES.CLI},
    { id: "cli_dt_nasc", name: "Data Nascimento", category: CATEGORIES.CLI},
    { id: "cli_sit", name: "Situação Cliente", category: CATEGORIES.CLI},
    { id: "cli_cat", name: "Categoria Cliente", category: CATEGORIES.CLI},
    { id: "cli_tipo", name: "Tipo Cliente", category: CATEGORIES.CLI},
    { id: "cli_rest", name: "Restrição Cliente", category: CATEGORIES.CLI},
    { id: "cli_obs", name: "Observação Cliente", category: CATEGORIES.CLI},
    { id: "cli_end", name: "Endereço Cliente", category: CATEGORIES.CLI},
    { id: "cli_tel", name: "Telefone Cliente", category: CATEGORIES.CLI},
];

export const purchaseTags: TagModel[] = [
    { id: "comp_num_nota", name: "Num. Nota", category: CATEGORIES.COMP },
    { id: "comp_dt_compra", name: "Data Compra", category: CATEGORIES.COMP },
    { id: "comp_qtde_comprada", name: "Qtde. Comprada", category: CATEGORIES.COMP },
    { id: "comp_valor_total", name: "Valor Total da Nota", category: CATEGORIES.COMP },
    { id: "comp_valor_unitário", name: "Valor Unitário", category: CATEGORIES.COMP },
    { id: "comp_valor_bruto", name: "Valor Bruto", category: CATEGORIES.COMP },
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
    { id: "venda_valor_comis", name: "Valor Comissão", category: CATEGORIES.VENDA },
    { id: "venda_perc_comis", name: "% Comissão", category: CATEGORIES.VENDA },
    { id: "venda_cod_caixa", name: "Cod. Caixa", category: CATEGORIES.VENDA },
    { id: "venda_cmv_perc", name: "% CMV", category: CATEGORIES.VENDA },
    { id: "venda_mc_perc", name: "% MC", category: CATEGORIES.VENDA },
    { id: "venda_valor_frete", name: "Valor Frete", category: CATEGORIES.VENDA },
    { id: "venda_forma_pagamento", name: "Forma de Pagamento", category: CATEGORIES.VENDA },
    { id: "venda_origem", name: "Origem da Venda", category: CATEGORIES.VENDA },
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
    { id: "promo_perc_mkp", name: "% MKP Promoção", category: CATEGORIES.PROMO },
]

export const supplierTags: TagModel[] = [
    { id: "sup_cod_fornecedor", name: "Cod. Fornecedor", category: CATEGORIES.FORN },
    { id: "sup_nome_fornecedor", name: "Nome Fornecedor", category: CATEGORIES.FORN },
    { id: "sup_cnpj_fornecedor", name: "CNPJ Fornecedor", category: CATEGORIES.FORN },
]

export const covenantTags: TagModel[] = [
    { id: "conv_cod_emp", name: "Cod. Empresa", category: CATEGORIES.CONV },
    { id: "conv_data_fech", name: "Data Fechamento", category: CATEGORIES.CONV },
    { id: "conv_data_venc", name: "Data Vencimento", category: CATEGORIES.CONV },
    { id: "conv_cnpj_emp", name: "CNPJ Empresa", category: CATEGORIES.CONV },
    { id: "conv_razap_emp", name: "Razão Social Empresa", category: CATEGORIES.CONV },
    { id: "conv_fanta_emp", name: "Nome Fantasia Empresa", category: CATEGORIES.CONV },
    { id: "conv_sit", name: "Situação Empresa", category: CATEGORIES.CONV },
    { id: "conv_valor_fechamento", name: "Valor Fechamento", category: CATEGORIES.CONV },
]

export const reportTags: TagModel[] = [
    ...productTags,
    ...costumerTags,
    ...purchaseTags,
    ...saleTags,
    ...storeTags,
    ...sellerTags,
    ...promotionTags,
    ...supplierTags,
    ...covenantTags,
];