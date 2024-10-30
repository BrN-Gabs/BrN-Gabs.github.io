document.addEventListener('DOMContentLoaded', (event) => {

	document.getElementById('buttonSemana').addEventListener('click', () => {
        const url = new URL('semana.html', window.location.href);
        url.searchParams.append('form', 'semanaForm');
        window.location.href = url.toString();
    });

    document.getElementById('buttonMes').addEventListener('click', () => {
        const url = new URL('mes.html', window.location.href);
        url.searchParams.append('form', 'mesForm');
        window.location.href = url.toString();
    });
	
	document.getElementById('buttonNegocios').addEventListener('click', () => {
        const url = new URL('negocios.html', window.location.href);
        url.searchParams.append('form', 'negociosForm');
        window.location.href = url.toString();
    });
});
