function navigateTo(page) {
    window.location.href = page;
}

const base64negocios = localStorage.getItem('base64negocios');
const base64negocios2 = localStorage.getItem('base64negocios2');
const base64ecommerce = localStorage.getItem('base64ecommerce');

document.addEventListener('DOMContentLoaded', function() {
	
    const selectElement = document.getElementById('negocio_text');
	const metaFields = document.querySelector('.meta-fields');
	const despesaFields = document.querySelector('.despesa-fields');
    const recebimentoFields = document.querySelector('.recebimento-fields');
	const lucroFields = document.querySelector('.lucro-fields');

    selectElement.addEventListener('change', function() {
        const selectedValue = selectElement.value;
        if (selectedValue === 'varejo' || selectedValue === 'atacado' || selectedValue === 'industria') {
			metaFields.classList.remove('hidden');
			despesaFields.classList.remove('hidden');
            recebimentoFields.classList.remove('hidden');
			lucroFields.classList.remove('hidden');
        }  else if (selectedValue === 'ecommerce') {
			metaFields.classList.remove('hidden');
			despesaFields.classList.remove('hidden');
			recebimentoFields.classList.add('hidden');
			lucroFields.classList.remove('hidden');
		} else if (selectedValue === 'select') {
			metaFields.classList.add('hidden');
			despesaFields.classList.add('hidden');
			recebimentoFields.classList.add('hidden');
			lucroFields.classList.add('hidden');
		}
		else {
			despesaFields.classList.remove('hidden');
			metaFields.classList.remove('hidden');
            recebimentoFields.classList.add('hidden');
			lucroFields.classList.add('hidden');
        }
    });
});

var cleaveMetaVenda, cleaveVendaRealizado, cleaveMetaRecebimento, cleaveRecebimentoRealizado, cleaveMetaLucro, cleaveLucroBrutoRealizado, cleaveMetaDespesa, cleaveDespesaRealizado; 

document.addEventListener('DOMContentLoaded', function() {
	
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

	cleaveMetaLucro = new Cleave('#meta_lucro', {
		numeral: true,
		numeralIntegerScale: 3, // Quantidade máxima de dígitos inteiros
		numeralDecimalScale: 2, // Quantidade máxima de dígitos decimais
		numeralDecimalMark: ',', // Separador decimal
		delimiter: '.', // Separador de milhares
		suffix: '%', // Sufixo de porcentagem
	});

	cleaveLucroBrutoRealizado = new Cleave('#lucrobruto_realizado', {
		numeral: true,
		numeralIntegerScale: 3, // Quantidade máxima de dígitos inteiros
		numeralDecimalScale: 2, // Quantidade máxima de dígitos decimais
		numeralDecimalMark: ',', // Separador decimal
		delimiter: '.', // Separador de milhares
		suffix: '%', // Sufixo de porcentagem
	});

	cleaveMetaDespesa = new Cleave('#despesa', {
		numeral: true,
		numeralIntegerScale: 3, // Quantidade máxima de dígitos inteiros
		numeralDecimalScale: 2, // Quantidade máxima de dígitos decimais
		numeralDecimalMark: ',', // Separador decimal
		delimiter: '.', // Separador de milhares
		suffix: '%', // Sufixo de porcentagem
	});

	cleaveDespesaRealizado = new Cleave('#despesa_realizado', {
		numeral: true,
		numeralIntegerScale: 3, // Quantidade máxima de dígitos inteiros
		numeralDecimalScale: 2, // Quantidade máxima de dígitos decimais
		numeralDecimalMark: ',', // Separador decimal
		delimiter: '.', // Separador de milhares
		suffix: '%', // Sufixo de porcentagem
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


document.getElementById('negociosForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

			function getNumberFromCleaveInput(cleaveInstance) {
				return Number(cleaveInstance.getRawValue());
			}

			function formatarNumeroGrande(numero) {
				return numeral(numero).format('0,0.00').replace(/,/g, 'X').replace(/\./g, ',').replace(/X/g, '.');
			}

			function formatarPorcentagem (numero) {
				return (numero) + '%';
			}

			function definirCorMeta(numero) {
				return numero >= 100 ? "green" : "red";
			}

			function definirCorDespesa(meta, realizado) {
				return realizado > meta ? "red" : "green";
			}

			const negocio = document.getElementById('negocio_text').value;
		
			const meta_venda = getNumberFromCleaveInput(cleaveMetaVenda);
			const venda_realizado = getNumberFromCleaveInput(cleaveVendaRealizado);
			const meta_recebimento = getNumberFromCleaveInput(cleaveMetaRecebimento);
			const recebimento_realizado = getNumberFromCleaveInput(cleaveRecebimentoRealizado);
			const meta_lucro = getNumberFromCleaveInput(cleaveMetaLucro);
			const lucrobruto_realizado = getNumberFromCleaveInput(cleaveLucroBrutoRealizado);
			const despesa = getNumberFromCleaveInput(cleaveMetaDespesa);
			const despesa_realizado = getNumberFromCleaveInput(cleaveDespesaRealizado);

			const venda_porcentagem = (venda_realizado / meta_venda) * 100;
			const vendaPorcentagemFormatada = venda_porcentagem.toFixed(2);

			const recebimento_porcentagem = (recebimento_realizado / meta_recebimento) * 100;
			const recebimentoPorcentagemFormatada = recebimento_porcentagem.toFixed(2);

			const lucro_porcentagem = (lucrobruto_realizado / meta_lucro) * 100;
			const lucroPorcentagemFormatada = formatarPorcentagem(lucro_porcentagem.toFixed(2));
		
			const corVenda = definirCorMeta(venda_porcentagem);
			const corRecebimento = definirCorMeta(recebimento_porcentagem);
			const corLucro = definirCorMeta(lucro_porcentagem);
			const corDespesa = definirCorDespesa(despesa, despesa_realizado);

			const metaVendaFormatada = formatarNumeroGrande(meta_venda);
			const realizadoVendaFormatada = formatarNumeroGrande(venda_realizado);
			const metaRecebimentoFormatada = formatarNumeroGrande(meta_recebimento);
			const realizadoRecebimentoFormatada = formatarNumeroGrande(recebimento_realizado);
			const metaLucroFormatada = formatarPorcentagem(meta_lucro);
			const realizadoLucroFormatada = formatarPorcentagem(lucrobruto_realizado);
			const metaDespesaFormatada = formatarPorcentagem(despesa);
			const realizadoDespesaFormatada = formatarPorcentagem(despesa_realizado);

			const canvas = document.getElementById('canvas');
			const ctx = canvas.getContext('2d');

			function clearCanvas() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}

			function clearInput(inputElement) {
				inputElement.value = '';
			}

			var negocioInput = document.getElementById('negocio_text');
			var metaVenda = document.getElementById('meta_venda');
			var vendaRealizado = document.getElementById('venda_realizado');
			var despesaInput = document.getElementById('despesa');
			var despesaRealizado = document.getElementById('despesa_realizado');
			var metaRecebimento = document.getElementById('meta_recebimento');
			var recebimentoRealizado = document.getElementById('recebimento_realizado');
			var metaLucro = document.getElementById('meta_lucro');
			var lucroRealizado = document.getElementById('lucrobruto_realizado');

			negocioInput.addEventListener('input', function() {
				clearCanvas();
				clearInput(metaVenda);
				clearInput(vendaRealizado);
				clearInput(despesaInput);
				clearInput(despesaRealizado);
				clearInput(metaRecebimento);
				clearInput(recebimentoRealizado);
				clearInput(metaLucro);
				clearInput(lucroRealizado);
				document.getElementById('downloadPDF').style.display = 'none';
				document.getElementById('downloadJPG').style.display = 'none';
			});

			var imgBase64;
			let medidaVendaX;
			let medidaVendaY;
			let medidaDespesaX;
	
			if (negocio === 'ecommerce') {
				imgBase64 = base64ecommerce;
				medidaVendaX = [310, 265, 525, 333, 340, 315, 265];
				medidaVendaY = [190, 230, 240, 275, 313, 375, 350, 385, 360, 400];
				medidaDespesaX = [450, 550, 555, 540];
			} else if (negocio === 'paranatec' || negocio === 'consorcio' || negocio === 'posto' || negocio === 'bank') {
				imgBase64 = base64negocios2;
				medidaVendaX = [310, 265, 525, 333, 340, 315, 280];
				medidaVendaY = [190, 230, 240, 275, 313, 375, 350, 385, 360, 400];
				medidaDespesaX = [290, 390, 395, 380];
			} else {
				imgBase64 = base64negocios;
				medidaVendaX = [145, 100, 360, 168, 175, 150, 100];
				medidaVendaY = [190, 230, 240, 275, 313, 375, 350, 385, 360, 400];
				medidaDespesaX = [450, 550, 555, 540];
			}

			 // Substitua pela string Base64 completa
			const img = new Image();
			img.src = imgBase64;
			img.onload = function() {
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				switch (negocio) {
					case 'varejo':
						ctx.font = 'bold 50px Bahnschrift';
						ctx.fillStyle = 'white';
						ctx.fillText("VAREJO", 305, 65);
						break;	
					case 'atacado':
						ctx.font = 'bold 50px Bahnschrift';
						ctx.fillStyle = 'white';
						ctx.fillText("ATACADO", 290, 65);
						break;
					case 'industria':
						ctx.font = 'bold 50px Bahnschrift';
						ctx.fillStyle = 'white';
						ctx.fillText("INDÚSTRIA", 270, 65);
						break;
					case 'ecommerce':
						ctx.font = 'bold 50px Bahnschrift';
						ctx.fillStyle = 'white';
						ctx.fillText("E-COMMERCE", 245, 65);
						break;
					case 'paranatec':
						ctx.font = 'bold 50px Bahnschrift';
						ctx.fillStyle = 'white';
						ctx.fillText("PARANATEC", 255, 65);
						break;
					case 'consorcio':
						ctx.font = 'bold 50px Bahnschrift';
						ctx.fillStyle = 'white';
						ctx.fillText("CONSÓRCIO", 270, 65);
						break;	
					case 'posto':
						ctx.font = 'bold 50px Bahnschrift';
						ctx.fillStyle = 'white';
						ctx.fillText("AUTO POSTO", 260, 65);
						break;	
					case 'bank':
						ctx.font = 'bold 50px Bahnschrift';
						ctx.fillStyle = 'white';
						ctx.fillText("GAZIN BANK", 260, 65);
						break;
						
				}
				ctx.font = 'bold 22px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("META DE VENDA:", medidaVendaX[0], medidaVendaY[0]); // Meta de venda

				ctx.font = 'bold 35px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("R$" + metaVendaFormatada, medidaVendaX[6], medidaVendaY[1]); // Substitua name por meta_venda
				
				ctx.beginPath();
				ctx.moveTo(medidaVendaX[1], medidaVendaY[2]); // Coordenadas x, y do ponto inicial
				ctx.lineTo(medidaVendaX[2], medidaVendaY[2]); // Coordenadas x, y do ponto final
				ctx.lineWidth = 2; // Espessura da linha
				ctx.strokeStyle = '#273582'; // Cor da linha
				ctx.stroke(); //Linha

				ctx.font = 'bold 22px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("REALIZADO:", medidaVendaX[3], medidaVendaY[3]); // Realizado

				ctx.font = 'bold 35px Bahnschrift';
				ctx.fillStyle = corVenda;
				ctx.fillText("R$" + realizadoVendaFormatada, medidaVendaX[6], medidaVendaY[4]); // Substitua date por recebimento_realizado


				ctx.font = 'bold 50px Bahnschrift';
				ctx.fillStyle = corVenda;
				ctx.fillText(vendaPorcentagemFormatada + "%", medidaVendaX[4], medidaVendaY[5]); // Porcentagem

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
					drawUpTriangle(medidaVendaX[5], medidaVendaY[6], 15);
					drawVerticalLine(medidaVendaX[5], medidaVendaY[7], 35);
				} else {
					drawDownwardTriangle(medidaVendaX[5], medidaVendaY[5], 15);
					drawVerticalLine(medidaVendaX[5], medidaVendaY[8], 35);
				}

				ctx.beginPath();
				ctx.moveTo(medidaVendaX[1], medidaVendaY[9]); // Coordenadas x, y do ponto inicial
				ctx.lineTo(medidaVendaX[2], medidaVendaY[9]); // Coordenadas x, y do ponto final
				ctx.lineWidth = 2; // Espessura da linha
				ctx.strokeStyle = '#cacaca'; // Cor da linha
				ctx.stroke(); //Linha
				
								
				if (negocio === 'varejo' || negocio === 'atacado' || negocio === 'industria') {
					ctx.font = 'bold 22px Bahnschrift';
					ctx.fillStyle = '#273582';
					ctx.fillText("META DE RECEBIMENTO:", 440, 190); // Meta de recebimento

					ctx.font = 'bold 35px Bahnschrift';
					ctx.fillStyle = '#273582';
					ctx.fillText("R$" + metaRecebimentoFormatada, 430, 230); // Substitua message por meta_recebimento

					ctx.beginPath();
					ctx.moveTo(435, 240); // Coordenadas x, y do ponto inicial
					ctx.lineTo(695, 240); // Coordenadas x, y do ponto final
					ctx.lineWidth = 2; // Espessura da linha
					ctx.strokeStyle = '#273582'; // Cor da linha
					ctx.stroke(); //Linha

					ctx.font = 'bold 22px Bahnschrift';
					ctx.fillStyle = '#273582';
					ctx.fillText("REALIZADO:", 502, 275); // Realizado

					ctx.font = 'bold 35px Bahnschrift';
					ctx.fillStyle = corRecebimento;
					ctx.fillText("R$" + realizadoRecebimentoFormatada, 430, 313); // Substitua message por recebimento_realizado

					ctx.font = 'bold 50px Bahnschrift';
					ctx.fillStyle = corRecebimento;
					ctx.fillText(recebimentoPorcentagemFormatada + "%", 510, 375); // Porcentagem


					// Define o estilo da linha da seta
					ctx.strokeStyle = corRecebimento; // Cor da linha
					ctx.lineWidth = 12; // Largura da linha
					ctx.fillStyle = corRecebimento;

					// Compara a cor e chama qual triangulo e linha usar
					if (corRecebimento === 'green') {
						drawUpTriangle(485, 350, 15);
						drawVerticalLine(485, 385, 35);
					} else {
						drawDownwardTriangle(485, 375, 15);
						drawVerticalLine(485, 360, 35);
					}

					ctx.beginPath();
					ctx.moveTo(435, 400); // Coordenadas x, y do ponto inicial
					ctx.lineTo(695, 400); // Coordenadas x, y do ponto final
					ctx.lineWidth = 2; // Espessura da linha
					ctx.strokeStyle = '#cacaca'; // Cor da linha
					ctx.stroke(); //Linha
					
				}
				
				if (negocio === 'varejo' || negocio === 'atacado' || negocio === 'industria' || negocio === 'ecommerce') {
				
					ctx.font = 'bold 14px Bahnschrift';
					ctx.fillStyle = '#273582';
					ctx.fillText("META DE", 125, 470);
					ctx.fillText("LUCRO BRUTO:", 125, 485);

					ctx.font = 'bold 35px Bahnschrift';
					ctx.fillStyle = '#273582';
					ctx.fillText(metaLucroFormatada, 220, 482);

					ctx.font = 'bold 14px Bahnschrift';
					ctx.fillStyle = '#273582';
					ctx.fillText("REALIZADO:", 125, 522);

					ctx.font = 'bold 40px Bahnschrift';
					ctx.fillStyle = corLucro;
					ctx.fillText(realizadoLucroFormatada, 230, 530);


					// Define o estilo da linha da seta
					ctx.strokeStyle = corLucro; // Cor da linha
					ctx.lineWidth = 8; // Largura da linha
					ctx.fillStyle = corLucro;

					// Compara a cor e chama qual triangulo e linha usar
					if (corLucro === 'green') {
						drawUpTriangle(215, 510, 8);
						drawVerticalLine(215, 535, 28);
					} else {
						drawDownwardTriangle(215, 530, 8);
						drawVerticalLine(215, 525, 28);
					}
					
				}	
			 
				
				ctx.font = 'bold 14px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("DESPESA", medidaDespesaX[0], 470);
				ctx.fillText("OPERACIONAL:", medidaDespesaX[0], 485);
				
				ctx.font = 'bold 35px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText(metaDespesaFormatada, medidaDespesaX[1], 482);
				
				ctx.font = 'bold 14px Bahnschrift';
				ctx.fillStyle = '#273582';
				ctx.fillText("REALIZADO:", medidaDespesaX[0], 522);
				
				ctx.font = 'bold 40px Bahnschrift';
				ctx.fillStyle = corDespesa;
				ctx.fillText(realizadoDespesaFormatada, medidaDespesaX[2], 530);
				
				// Define o estilo da linha da seta
				ctx.strokeStyle = corDespesa; // Cor da linha
				ctx.lineWidth = 8; // Largura da linha
				ctx.fillStyle = corDespesa;

				// Compara a cor e chama qual triangulo e linha usar
				if (corDespesa === 'green') {
					drawUpTriangle(medidaDespesaX[3], 510, 8);
					drawVerticalLine(medidaDespesaX[3], 535, 28);
				} else {
					drawDownwardTriangle(medidaDespesaX[3], 530, 8);
					drawVerticalLine(medidaDespesaX[3], 525, 28);
				}
				

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