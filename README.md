# Code Challenge ZAP Group

* Vue.js
* South Real Estate HTML Bootstrap Template (free under license)

		como rodar localmente?
		* Você precisa estar conectado a internet, dependências e dados são obtidos remotamente
		* Apenas abra o arquivo index.html
		* index-basic.html contém a lógica pura de separação dos elementos do json de acordo com as regras de negócio, sem design ou template

		como rodar os testes?
		* Basta navegar pela interface

		como fazer o deploy?
		* Inicialmente não há necessidade de deploy


## TODO
- [ ] Change vue script to production
- [x] Install and load vue script
- [x] Get the data via axios
- [x] Filter data with array filter
- [ ] Create interface for user to select tipo (viva/zap) and aplly filters
- [ ] Extra: create more filters (pricingInfos.businessType, parkingSpaces, bathrooms, bedrooms, pricingInfos.price range, pricingInfos.rentalTotalPrice range)
- [x] Create reusable template for item view
- [x] Beautify (bootstrap, style)
- [ ] Integrate beautify template with received data
- [ ] Infinity scroll
- [ ] Single view
- [ ] Review rules and job description
- [ ] Extra: transpill with Babel
- [ ] Extra: get user location
- [ ] Extra: AI to suggest reatly
- [ ] Extra: cache images
- [ ] Extra: favicon

		Root Instance
		└─ RealtyList
		   ├─ Realty
		   │  ├─ Magnify
		   │  └─ Favorite
		   └─ Realty
		      ├─ Magnify
		      └─ Favorite


## As regras de negócio atuais são as seguintes:

 * Ele apenas é elegível pro portal ZAP:
 ** Quando for aluguel e no mínimo o valor for de R$ 3.500,00.
 ** Quando for venda e no mínimo o valor for de R$ 600.000,00.
 * Ele apenas é elegível pro portal Vivareal:
 ** Quando for aluguel e no máximo o valor for de R$ 4.000,00.
 ** Quando for venda e no máximo o valor for de R$ 700.000,00.

### Agora com a fusão temos algumas alterações que precisam ser feitas. As seguintes regras precisam ser adicionadas às regras já existentes mencionadas no início deste texto:

 * Um imóvel não é elegível em NENHUM PORTAL se:
 ** Ele tem lat e lon iguais a 0.
 * Caso o imóvel seja para venda, ele é elegível para o portal ZAP se:
 ** O valor do metro quadrado (chave usableAreas) não pode ser menor/igual a R$ 3.500,00 - apenas considerando imóveis que tenham usableAreas acima de 0 (imóveis com usableAreas = 0 não são elegíveis).
 ** Quando o imóvel estiver dentro do bounding box dos arredores do GrupoZap (descrito abaixo) considere a regra de valor mínimo (do imóvel) 10% menor.
 * Caso o imóvel seja para aluguel, ele é elegível para o portal Vivareal se:
 ** O valor do condomínio não pode ser maior/igual que 30% do valor do aluguel - apenas aplicado para imóveis que tenham um monthlyCondoFee válido e numérico (imóveis com monthlyCondoFee não numérico ou inválido não são elegíveis).
 ** Quando o imóvel estiver dentro do bounding box dos arredores do GrupoZap (descrito abaixo) considere a regra de valor máximo (do aluguel do imóvel) 50% maior.

Old link: http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/#zap
Challenge description: https://grupozap.github.io/cultura/challenges/engineering.html