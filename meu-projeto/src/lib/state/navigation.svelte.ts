// transitioning é um booleano com um significado só: "o navegador está animando uma troca de página neste exato momento?"
// Com duration e delay zerados, o Svelte não cria animação nenhuma. O card nasce direto no estado final, opacity: 1. A foto sai cheia.
export const nav = $state({ transitioning: false });
