<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '../components/Header.svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';
	import { nav } from '$lib/state/navigation.svelte';

	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser // Habilita consultas apenas no navegador
			}
		}
	});

	/* Quem dispara o onNavigate são as três navegações de verdade:
      clicar num card    <a href="/movie/N">     → onNavigate ✓
      digitar na busca   goto(url)               → onNavigate ✓
      botão Voltar       history.back()          → onNavigate ✓ */
	/* changePage() usa replaceState(), que é shallow routing: troca a URL exibida sem navegar. Sem navegação, sem onNavigate, sem view transition.
      paginação          replaceState(url)       → onNavigate ✗
      é exatamente por isso que a cascata continua funcionando na paginação e não nas outras. Onde o navegador anima, o Svelte cede. */
	onNavigate((navigation) => {
		// Navegador sem suporte à View Transitions API. Retornar undefined faz o
		// SvelteKit seguir a navegação normal, sem animação. Degrada, não quebra.
		if (!document.startViewTransition) return;

		// Só levanta uma bandeira — não fotografa nada. O ShowCard lê esta flag para NÃO rodar o in:fly: se a cascata rodasse, os cards estariam em
		// opacity: 0 esperando o delay quando o navegador tira a foto do estado novo, e a foto sairia de uma grade vazia.
		nav.transitioning = true;

		// Inversão de controle: startViewTransition exige um callback que troque o DOM na hora, mas quem troca a rota é o SvelteKit, de forma assíncrona.
		// Devolvendo esta Promise, o SvelteKit para e espera nossa autorização.
		return new Promise((resolve) => {
			// Nesta linha o navegador TIRA A FOTO DO ESTADO ANTIGO e congela a tela.
			const vt = document.startViewTransition(async () => {
				// Destrava o SvelteKit: agora ele pode trocar a rota. O lugar deste
				// resolve() é o ponto todo — depois da foto antiga, antes da nova.
				resolve();

				// Segura este callback até a rota nova terminar de renderizar. É aqui que os ShowCards nascem e leem nav.transitioning como true.
				// A tela segue congelada na foto antiga durante a espera.
				// Quando isto resolver, o navegador tira a FOTO DO ESTADO NOVO, pareia os view-transition-name iguais e começa a animar.
				await navigation.complete;
			});

			// vt é o controle da transição, com as promises ready/finished.
			// finished resolve quando a animação acaba (ou é abortada) — só então liberamos a cascata do in:fly de novo.
			vt.finished.finally(() => (nav.transitioning = false));
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Header />
	{@render children()}
</QueryClientProvider>
