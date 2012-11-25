(function () {
	
	function getUniqueKeys(keys) {
		var uniques = [];
		
		keys.split('').forEach(function (k) {
			if (uniques.indexOf(k) === -1) {
				uniques.push(k);
			}
		});
		
		return uniques;
	}
	
	function makeUniqueString(keys, count) {
		var keyCount = keys.length,
			result = '',
			i, keyIndex;
		
		for (i = 0; i < count; i++) {
			keyIndex = Math.floor(Math.random() * keyCount);
			result += keys[keyIndex];
		}
		
		return result;
	}
	
	
	window.onload = function () {
		var beginButton = document.getElementById('Begin-button'),
			resetButton = document.getElementById('Reset-button');
			
		beginButton.onclick = function () {
			var characterSetInput = document.getElementById('Character-set'),
				quantityInput = document.getElementById('Quantity'),
				problemSpan = document.getElementById('Problem'),
				trackerSpan = document.getElementById('Tracker'),
				selectKeysDiv = document.getElementById('Select-keys'),
				typeKeysDiv = document.getElementById('Type-keys'),
				resultsDiv = document.getElementById('Results');
				
			if (characterSetInput.value.trim() === '' || quantityInput.value.trim() === '') {
				alert('Must inter characters and quantity.');
				return;
			}
				
			var keys = characterSetInput.value,
				quantity = parseInt(quantityInput.value, 10) || 100,
				
				uniques = getUniqueKeys(keys),
				problemString = makeUniqueString(uniques, quantity),
				problemIndex = 0,
				correctKeys = 0,
				mistakeKeys = 0,
				startTime = new Date(),
				endTime;
			
			problemSpan.innerHTML = problemString;
			trackerSpan.innerHTML = '^';
			
			selectKeysDiv.style.display = 'none';
			typeKeysDiv.style.display = 'inline-block';
			
			document.onkeypress = function (e) {
				var key = String.fromCharCode(e.keyCode);
				
				if (problemSpan.innerHTML[0] === key) {
					correctKeys += 1;
					problemSpan.innerHTML = problemSpan.innerHTML.substring(1);
					
					if (problemSpan.innerHTML === '') {
						endTime = new Date();
						
						typeKeysDiv.style.display = '';
						resultsDiv.style.display = 'inline-block';
						
						(function () {
							var resultsTimeSpan = document.getElementById('Results-time'),
								resultsCorrectSpan = document.getElementById('Results-correct'),
								resultsMistakesSpan = document.getElementById('Results-mistakes'),
								resultsWpmSpan = document.getElementById('Results-wpm'),
								resultsResetButton = document.getElementById('Results-reset-button'),
								time = (endTime - startTime) / 1000,
								wpm = Math.floor(correctKeys / (time / 60));
							
							resultsCorrectSpan.innerHTML = correctKeys;
							resultsMistakesSpan.innerHTML = mistakeKeys;
							resultsTimeSpan.innerHTML = time + ' seconds';
							resultsWpmSpan.innerHTML = wpm;
							
							resultsResetButton.onclick = function () {
								resultsDiv.style.display = '';
								selectKeysDiv.style.display = 'inline-block';
							};
						}());
					}
				} else {
					mistakeKeys += 1;
				}
			};
			
			resetButton.onclick = function () {
				typeKeysDiv.style.display = '';
				selectKeysDiv.style.display = 'inline-block';
			};
		};
	};
}());