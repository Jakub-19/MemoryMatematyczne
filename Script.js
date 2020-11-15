//Jakub Wadas
var data1 = ['$$\\sqrt{49}$$','$$1,5^2$$','$$\\sin{\\tfrac{\\pi}{6}}$$','$$\\cos{\\tfrac{\\pi}{4}}$$','$$\\tan{\\tfrac{\\pi}{3}}$$','$$\\tan{\\tfrac{\\pi}{6}}$$','$$\\lim_{n\\to\\infty} (1+\\tfrac{1}{n})^n$$','$$e^{\\pi i}+1$$','$$\\int x\\,dx$$','$$\\int \\tfrac{1}{x}\\,dx$$','$$\\int \\,dx$$','$$\\int e^x \\,dx$$','$$\\int \\sin{x} \\,dx$$','$$\\int \\cos{x} \\,dx$$','$$\\frac{10}{9}$$','$$(a+b)^2$$','$$(a-b)^2$$','$$a^2-b^2$$'];
var data2 = ['$$7$$','$$2,25$$','$$\\frac{1}{2}$$','$$\\frac{\\sqrt{2}}{2}$$','$$\\sqrt{3}$$','$$\\frac{\\sqrt{3}}{3}$$','$$e$$','$$0$$','$$\\tfrac{1}{2}x^2+C$$','$$\\ln{|x|}+C$$','$$x+C$$','$$e^x+C$$','$$- \\cos{x}+C$$','$$\\sin{x}+C$$','$$1,(1)$$','$$a^2+2ab+b^2$$','$$a^2-2ab+b^2$$','$$(a-b)(a+b)$$'];

var state = false;//stan gry
var firstCard;
var movements = 0;
var pairsFound = 0;


window.addEventListener('load', function(){
	var values = data1.concat(data2);
	shuffle(values);//tasowanie kart
	let m = document.querySelector('body main div#board');
	for(let i = 0; i < values.length; i++)//rozklad kart na planszy
	{
		m.innerHTML += '<button onClick="cardFunc(this)"><p>' + values[i] + '<p></button>';
	}
}, true);

function shuffle(a) 
{
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) 
	{
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function cardFunc(e)
{
	//zabezpieczenie przed wybraniem tej samej karty
	if(firstCard == e && state)
		return;

	checkCard(e);
	
	if(state)
	{
		var firstCardCopy = firstCard;//zabezpiecza przed zbugowaniem przy szybkim klikaniu
		var secondCard = e;
		movements++;
		
		//przywrocenie kodu html mathjax do danych z tablicy data1 i data2
		let fcContent = firstCardCopy.innerHTML.substr(firstCardCopy.innerHTML.lastIndexOf('">')+2);
		fcContent = fcContent.substr(0, fcContent.indexOf('</script>'));
		fcContent = fcContent;
		let scContent = secondCard.innerHTML.substr(secondCard.innerHTML.lastIndexOf('">')+2);
		scContent = scContent.substr(0, scContent.indexOf('</script>'));
		scContent = scContent;
		
		//odczytanie indeksow odkrytych elementow
		let scIndex = data1.indexOf('$$' + scContent + '$$');
		if(scIndex == -1)
		{scIndex = data2.indexOf('$$' + scContent + '$$');}
	
		let fcIndex = data1.indexOf('$$' + fcContent + '$$');
		if(fcIndex == -1)
		{fcIndex = data2.indexOf('$$' + fcContent + '$$');}
		
		//porownanie kart na podstawie indeksow
		if(scIndex == fcIndex)
		{
			blockCard(firstCardCopy);
			blockCard(secondCard);
			console.log('good');
			pairsFound++;
		}
		else
		{
			reverseCard(firstCardCopy);
			reverseCard(secondCard);
			console.log('bad');
		}
		
		//czy znaleziono wszystkie pary
		if(pairsFound == data1.length)
		{
			winScreen();
		}
	}
	else
	{
		firstCard = e;
	}
	
	state = !state;
}

function checkCard(e)
{
	e.style.transform = 'rotateY(180deg)';	
	setTimeout(function(){
		e.style.backgroundColor = '#892cdc';
		e.querySelector('p').style.color = '#000000';
		e.disabled = true;
    }, 300);
}

function reverseCard(e)
{
	setTimeout(function(){
		e.style.transform = '';
		setTimeout(function(){
			e.style.backgroundColor = '';
			e.style.fontSize = '';
			e.querySelector('p').style.color = '';
			e.disabled = false;
		}, 300);
    }, 2000);
}

function blockCard(e)
{
	e.disabled = true;
	e.style.cursor = 'default';
}

function winScreen()
{
	setTimeout(function(){
		let winnerHtml = '<h2>Gratulacje</h2><h3>Ukończyłeś grę wykonując ' + movements + ' ruchów.</h3><button onClick="location.reload()">Spróbuj ponownie</button>';
		let m = document.querySelector('body main');
		m.innerHTML =  winnerHtml + m.innerHTML;
	}, 700);
}