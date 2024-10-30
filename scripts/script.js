function navigateTo(page) {
    window.location.href = page;
}

var cleaveMetaVenda, cleaveVendaRealizado, cleaveMetaRecebimento, cleaveRecebimentoRealizado;

document.addEventListener('DOMContentLoaded', function() {
    // Código que usa o Cleave
    cleaveMetaVenda = new Cleave('#meta_venda', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: '.',
        numeralDecimalMark: ',',
        numeralDecimalScale: 2
    });

    cleaveVendaRealizado = new Cleave('#venda_realizado', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: '.',
        numeralDecimalMark: ',',
        numeralDecimalScale: 2
    });

    cleaveMetaRecebimento = new Cleave('#meta_recebimento', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: '.',
        numeralDecimalMark: ',',
        numeralDecimalScale: 2
    });

    cleaveRecebimentoRealizado = new Cleave('#recebimento_realizado', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: '.',
        numeralDecimalMark: ',',
        numeralDecimalScale: 2
    });
});

document.querySelectorAll('.input-numerico').forEach(input => {
		input.addEventListener('blur', function() {
			if (this.value && !this.value.includes(',')) {
				this.value += ',00';
			} else if (this.value && this.value.split(',')[1].length === 1) {
				this.value += '0';
			}
		});
});

function configureFormEvent(formId, customConst, cleaveInstances) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', function(event) {
        event.preventDefault();
		
			function getNumberFromCleaveInput(cleaveInstance) {
				return Number(cleaveInstance.getRawValue());
			}

			function formatarNumeroGrande(numero) {
				return numeral(numero).format('0,0.00').replace(/,/g, 'X').replace(/\./g, ',').replace(/X/g, '.');
			}

			function definirCorMeta(numero) {
				return numero >= 100 ? "green" : "red";
			}
		
			const meta_venda = getNumberFromCleaveInput(cleaveMetaVenda);
			const venda_realizado = getNumberFromCleaveInput(cleaveVendaRealizado);
			const meta_recebimento = getNumberFromCleaveInput(cleaveMetaRecebimento);
			const recebimento_realizado = getNumberFromCleaveInput(cleaveRecebimentoRealizado);

			const venda_porcentagem = (venda_realizado / meta_venda) * 100;
			const vendaPorcentagemFormatada = venda_porcentagem.toFixed(2);

			const recebimento_porcentagem = (recebimento_realizado / meta_recebimento) * 100;
			const recebimentoPorcentagemFormatada = recebimento_porcentagem.toFixed(2);

			const corVenda = definirCorMeta(venda_porcentagem);
			const corRecebimento = definirCorMeta(recebimento_porcentagem);

			const metaVendaFormatada = formatarNumeroGrande(meta_venda);
			const realizadoVendaFormatada = formatarNumeroGrande(venda_realizado);
			const metaRecebimentoFormatada = formatarNumeroGrande(meta_recebimento);
			const realizadoRecebimentoFormatada = formatarNumeroGrande(recebimento_realizado);

			const canvas = document.getElementById('canvas');
			const ctx = canvas.getContext('2d');
		
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const imgBase64 = customConst; // Substitua pela string Base64 completa
			const img = new Image();
			img.src = imgBase64;
			img.onload = function() {
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				if (formId === 'semanaForm') {
					ctx.font = 'bold 50px Bahnschrift';
					ctx.fillStyle = 'white';
					ctx.fillText("SEMANA", 290, 85);
				} else if (formId === 'mesForm') {
					ctx.font = 'bold 50px Bahnschrift';
					ctx.fillStyle = 'white';
					ctx.fillText("MÊS", 345, 65); // Mes				
				}

				ctx.font = 'bold 22px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("META DE VENDA:", 145, 240); // Meta de venda

				ctx.font = 'bold 35px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("R$" + metaVendaFormatada, 100, 280); // Substitua name por meta_venda

				ctx.beginPath();
				ctx.moveTo(100, 290); // Coordenadas x, y do ponto inicial
				ctx.lineTo(360, 290); // Coordenadas x, y do ponto final
				ctx.lineWidth = 2; // Espessura da linha
				ctx.strokeStyle = '#273582'; // Cor da linha
				ctx.stroke(); //Linha

				ctx.font = 'bold 22px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("REALIZADO:", 168, 325); // Realizado

				ctx.font = 'bold 35px Bahnschrift';
				ctx.fillStyle = corVenda;
				ctx.fillText("R$" + realizadoVendaFormatada, 100, 363); // Substitua date por recebimento_realizado


				ctx.font = 'bold 50px Bahnschrift';
				ctx.fillStyle = corVenda;
				ctx.fillText(vendaPorcentagemFormatada + "%", 175, 425); // Porcentagem

				// Função para desenhar uma linha vertical
				function drawVerticalLine(x, startY, length) {
					ctx.beginPath();
					ctx.moveTo(x, startY);
					ctx.lineTo(x, startY - length);
					ctx.stroke();
				}

				// Função para desenhar um triângulo separado
				function drawUpTriangle(baseX, baseY, size) {
					// Calcula os pontos do triângulo
					const height = size * Math.sqrt(3) / 2;
					const leftX = baseX - size / 2;
					const rightX = baseX + size / 2;
					const topY = baseY - height;

					ctx.beginPath();
					ctx.moveTo(leftX, baseY); // Ponto inferior esquerdo
					ctx.lineTo(rightX, baseY); // Ponto inferior direito
					ctx.lineTo(baseX, topY); // Ponto superior
					ctx.closePath(); // Fecha o triângulo
					ctx.stroke();
					ctx.fill();
				}

				function drawDownwardTriangle(baseX, baseY, size) {
					// Calcula os pontos do triângulo
					const height = size * Math.sqrt(3) / 2;
					const leftX = baseX - size / 2;
					const rightX = baseX + size / 2;
					const topY = baseY - height;

					ctx.beginPath();
					ctx.moveTo(baseX, baseY); // Ponto inferior central
					ctx.lineTo(leftX, topY); // Ponto superior esquerdo
					ctx.lineTo(rightX, topY); // Ponto superior direito
					ctx.closePath(); // Fecha o triângulo
					ctx.stroke();
					ctx.fill();
				}
				
				
				// Define o estilo da linha da seta
				ctx.strokeStyle = corVenda; // Cor da linha
				ctx.lineWidth = 12; // Largura da linha
				ctx.fillStyle = corVenda;

				// Compara a cor e chama qual triangulo e linha usar
				if (corVenda === 'green') {
					drawUpTriangle(150, 400, 15);
					drawVerticalLine(150, 435, 35);
				} else {
					drawDownwardTriangle(150, 425, 15);
					drawVerticalLine(150, 415, 35);
				}

				ctx.beginPath();
				ctx.moveTo(100, 450); // Coordenadas x, y do ponto inicial
				ctx.lineTo(360, 450); // Coordenadas x, y do ponto final
				ctx.lineWidth = 2; // Espessura da linha
				ctx.strokeStyle = '#cacaca'; // Cor da linha
				ctx.stroke(); //Linha

				ctx.font = 'bold 22px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("META DE RECEBIMENTO:", 440, 240); // Meta de recebimento

				ctx.font = 'bold 35px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("R$" + metaRecebimentoFormatada, 430, 280); // Substitua message por meta_recebimento

				ctx.beginPath();
				ctx.moveTo(435, 290); // Coordenadas x, y do ponto inicial
				ctx.lineTo(695, 290); // Coordenadas x, y do ponto final
				ctx.lineWidth = 2; // Espessura da linha
				ctx.strokeStyle = '#273582'; // Cor da linha
				ctx.stroke(); //Linha

				ctx.font = 'bold 22px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("REALIZADO:", 502, 325); // Realizado

				ctx.font = 'bold 35px Bahnschrift';
				ctx.fillStyle = corRecebimento;
				ctx.fillText("R$" + realizadoRecebimentoFormatada, 430, 363); // Substitua message por recebimento_realizado

				ctx.font = 'bold 50px Bahnschrift';
				ctx.fillStyle = corRecebimento;
				ctx.fillText(recebimentoPorcentagemFormatada + "%", 510, 425); // Porcentagem

				// Define o estilo da linha da seta
				ctx.strokeStyle = corRecebimento; // Cor da linha
				ctx.lineWidth = 12; // Largura da linha
				ctx.fillStyle = corRecebimento;

				// Compara a cor e chama qual triangulo e linha usar
				if (corRecebimento === 'green') {
					drawUpTriangle(485, 400, 15);
					drawVerticalLine(485, 435, 35);
				} else {
					drawDownwardTriangle(485, 425, 15);
					drawVerticalLine(485, 415, 35);
				}

				ctx.beginPath();
				ctx.moveTo(435, 450); // Coordenadas x, y do ponto inicial
				ctx.lineTo(695, 450); // Coordenadas x, y do ponto final
				ctx.lineWidth = 2; // Espessura da linha
				ctx.strokeStyle = '#cacaca'; // Cor da linha
				ctx.stroke(); //Linha

				document.getElementById('downloadPDF').style.display = 'block';
				document.getElementById('downloadJPG').style.display = 'block';
				
				document.getElementById('downloadPDF')?.addEventListener('click', function() {
					const canvas = document.getElementById('canvas');
					const imgData = canvas.toDataURL('image/png');

					const { jsPDF } = window.jspdf;
					const pdf = new jsPDF('landscape');
				
					var imgWidth = 298;
					var imgHeight = canvas.height * imgWidth / canvas.width;
				
					pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
					pdf.save('download.pdf');
				});

				document.getElementById('downloadJPG')?.addEventListener('click', function() {
					const canvas = document.getElementById('canvas');
					const link = document.createElement('a');
					link.href = canvas.toDataURL('image/jpeg', 1.0);
					link.download = 'download.jpg';
					link.click();
				});
			};
    });
}

const base64semana = localStorage.getItem('base64semana');
const base64mes = localStorage.getItem('base64mes');
							
document.addEventListener('DOMContentLoaded', () => {
				
    const params = new URLSearchParams(window.location.search);
    const formId = params.get('form');

    if (formId === 'semanaForm') {
        configureFormEvent(formId, base64semana);
    } else if (formId === 'mesForm') {
		configureFormEvent(formId, base64mes);			
    } else {
		console.error('Parâmetros ausentes na URL.');				
	}
});


