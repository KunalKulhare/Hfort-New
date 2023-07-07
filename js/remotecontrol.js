/* global defined */
(function () {
	"use strict";
	/**
	 * @classdesc Handle remote control events
	 * @type RemoteControl
	 * @version 1.8.1
	 * @since 1.8.1
	 */
	//jshint -W057
	window.RemoteControl = new function _RemoteControl() {


		var defined = function (e) {
			if (typeof (e) !== 'undefined' && e !== null) {
				return true;
			} else {
				return false;
			}
		}

		/* +--------------------------+ Private variables +-------------------------+ */
		//		<editor-fold defaultstate="collapsed" desc="Private variables">
		var keycode = {
			Num_0: { code: 48 },
			Num_1: { code: 49 },
			Num_2: { code: 50 },
			Num_3: { code: 51 },
			Num_4: { code: 52 },
			Num_5: { code: 53 },
			Num_6: { code: 54 },
			Num_7: { code: 55 },
			Num_8: { code: 56 },
			Num_9: { code: 57 },
			Left: { code: 37 },
			Up: { code: 38 },
			Right: { code: 39 },
			Down: { code: 40 },
			OK: { code: 13 },
			Yellow: { code: 405 },
			Blue: { code: 406 },
			Exit: { code: 10182 },
			Select: { code: 65376 },
			Info: { code: 457 },
			Return: { code: 10009 }
		};
		//		</editor-fold>

		/* +--------------------------+ Private functions +-------------------------+ */
		//		<editor-fold defaultstate="collapsed" desc="Private functions">
		var elementEnabled = function (e) {

			var calcBoxShown = function () {
				var coords = e.getBoundingClientRect();

				return ((coords.top + coords.height) < 0) || ((coords.left + coords.width) < 0);
			};

			// Visibility
			var vis = (window.getComputedStyle(e).visibility === "hidden");

			var box;
			if (e.localName === "my-rcbutton") {
				if (e.attributes.hasOwnProperty('ignore-position')) {
					box = 0;
				} else {
					box = calcBoxShown();
				}
			} else {
				box = calcBoxShown();
			}

			if (vis || box || e.disabled) {
				return false;
			}

			return true;
		};
		//		</editor-fold>

		/* +--------------------------+ Public functions +--------------------------+ */
		//		<editor-fold defaultstate="collapsed" desc="Public functions">
		/**
		 * Initialize RemoteControl.
		 * @returns None
		 */
		this.init = function () {

			var initSE = function () {
				var btnActElements = document.getElementsByClassName("rcbutton_active");
				if (btnActElements.length == 0) {
					var lse;
					var lastSEs = localStorage.getItem('lastSEs');
					if (lastSEs != null) {
						lastSEs = JSON.parse(lastSEs);
						lse = lastSEs[location.href];
						lse = document.getElementById(lse);
					}
					if (defined(lse)) {
						lse.classList.add("rcbutton_active");
					}
					else {
						var btnElements = document.getElementsByClassName("rcbutton");
						if (btnElements && btnElements.length > 0)
							btnElements[0].classList.add("rcbutton_active");
					}
				}
			}
			setTimeout(function () { initSE(); }, 300);

			var getSE = function (keyPressed) {
				console.log(keyPressed + ' is called.');
				console.debug(keyPressed + " is pressed on element " + se, se);
				var se = document.getElementsByClassName("rcbutton_active")[0];
				if (!defined(se) || (!elementEnabled(se))) {
					se = document.getElementById("webOS_Body");
				}
				return se;
			};

			var setSE = function (keyPressed, se, cse) {
				var nse;
				if (defined(cse)) {
					cse.classList.add("rcbutton_active");
					cse.scrollIntoView();
					nse = cse;
				} else {
					se.classList.add("rcbutton_active");
					nse = se;
				}
				console.debug(keyPressed + ": selected element " + nse, nse);
				var lastSEs = localStorage.getItem('lastSEs');
				if (lastSEs == null)
					lastSEs = {};
				else
					lastSEs = JSON.parse(lastSEs);
				lastSEs[location.href] = nse.id;
				localStorage.setItem('lastSEs', JSON.stringify(lastSEs));
			};

			var calculateD = function (x1, y1, x2, y2) {
				var ans = Math.sqrt(
					Math.pow((x1 - x2), 2) +
					Math.pow((y1 - y2), 2)
				);
				return ans;
			};

			var upkeypress = function () {
				var keyPressed = 'Up Key';
				var se = getSE(keyPressed);
				se.classList.remove("rcbutton_active");
				var secoords = se.getBoundingClientRect();

				var btnElements = document.getElementsByClassName("rcbutton");
				//				var btnElements = se.parentElement.getElementsByClassName("rcbutton");

				var cse = null;
				var mind = Number.MAX_SAFE_INTEGER;
				for (var i = 0; i < btnElements.length; i++) {
					btnElements[i].classList.remove("rcbutton_active");
					if (elementEnabled(btnElements[i])) {
						var coords = btnElements[i].getBoundingClientRect();
						if (secoords.top > coords.top) { // Scan only elements at the top
							//							var d  = Math.sqrt(Math.abs(coords.left - secoords.left)) + Math.sqrt(Math.abs(coords.top - secoords.top));
							var d = calculateD(coords.left, coords.top, secoords.left, secoords.top);
							if (mind > d) {
								cse = btnElements[i];
								mind = d;
							}
						}
					}
				}
				setSE(keyPressed, se, cse);
			};

			var downkeypress = function () {
				var keyPressed = 'Down Key';
				var se = getSE(keyPressed);
				se.classList.remove("rcbutton_active");
				var secoords = se.getBoundingClientRect();

				var btnElements = document.getElementsByClassName("rcbutton");
				//				var btnElements = se.parentElement.getElementsByClassName("rcbutton");

				var cse = null;
				var mind = Number.MAX_SAFE_INTEGER;
				for (var i = 0; i < btnElements.length; i++) {
					btnElements[i].classList.remove("rcbutton_active");
					if (elementEnabled(btnElements[i])) {
						var coords = btnElements[i].getBoundingClientRect();
						if (secoords.top < coords.top) { // Scan only elements at the bottom
							//							var d  = Math.sqrt(Math.abs(coords.left - secoords.left)) + Math.sqrt(Math.abs(coords.top - secoords.top));
							var d = calculateD(coords.left, coords.top, secoords.left, secoords.top);
							if (mind > d) {
								cse = btnElements[i];
								mind = d;
							}
						}
					}
				}
				setSE(keyPressed, se, cse);
			};

			var leftkeypress = function () {
				var keyPressed = 'Left Key';
				var se = getSE(keyPressed);
				se.classList.remove("rcbutton_active");
				var secoords = se.getBoundingClientRect();

				var btnElements = document.getElementsByClassName("rcbutton");
				//				var btnElements = se.parentElement.getElementsByClassName("rcbutton");

				var cse = null;
				var mind = Number.MAX_SAFE_INTEGER;
				for (var i = 0; i < btnElements.length; i++) {
					btnElements[i].classList.remove("rcbutton_active");
					if (elementEnabled(btnElements[i])) {
						var coords = btnElements[i].getBoundingClientRect();
						if (secoords.left > coords.left) { // Scan only elements at the left
							//var d  = Math.sqrt(Math.abs(coords.left - secoords.left)) + Math.sqrt(Math.abs(coords.top - secoords.top));
							var d = calculateD(coords.left, coords.top, secoords.left, secoords.top);
							if (mind > d) {
								cse = btnElements[i];
								mind = d;
							}
						}
					}
				}
				setSE(keyPressed, se, cse);
			};

			var rightkeypress = function () {
				var keyPressed = 'Right Key';
				var se = getSE(keyPressed);
				se.classList.remove("rcbutton_active");
				var secoords = se.getBoundingClientRect();

				var btnElements = document.getElementsByClassName("rcbutton");
				//				var btnElements = se.parentElement.getElementsByClassName("rcbutton");

				var cse = null;
				var mind = Number.MAX_SAFE_INTEGER;
				for (var i = 0; i < btnElements.length; i++) {
					btnElements[i].classList.remove("rcbutton_active");
					if (elementEnabled(btnElements[i])) {
						var coords = btnElements[i].getBoundingClientRect();
						if (secoords.left < coords.left) { // Scan only elements at the right
							//var d  = Math.sqrt(Math.abs(coords.left - secoords.left)) + Math.sqrt(Math.abs(coords.top - secoords.top));
							var d = calculateD(coords.left, coords.top, secoords.left, secoords.top);
							if (mind > d) {
								cse = btnElements[i];
								mind = d;
							}
						}
					}
				}
				setSE(keyPressed, se, cse);
			};

			var okkeypress = function (evt) {
				var keyPressed = 'OK Key';
				var se = getSE(keyPressed);

				if (se.type === "text" || se.type === "password") {
					//console.log(se.children[0].type)
					if (document.activeElement === se) {
						se.blur();
					} else {
						se.focus();
						setTimeout(function () {
							se.scrollIntoView();
						}, 1000);
					}
				}
				else if (se.click) {
					//se.classList.remove("rcbutton_active");
					se.fromKeyboard = true;
					se.click();
				}
			};

			document.onkeydown = function (evt) {
				var kc = event.keyCode;
				evt.stopPropagation();
				console.log('kcis -===', kc);
				switch (kc) {
					case keycode.Up.code:
						upkeypress();
						break;
					case keycode.Down.code:
						downkeypress();
						break;
					case keycode.Left.code:
						leftkeypress();
						break;
					case keycode.Right.code:
						rightkeypress();
						break;
					case keycode.Select.code:
					case keycode.OK.code:
						okkeypress(evt);
						break;
					case keycode.Exit.code:
						console.log('Exit button pressed');
						break;
					case keycode.Return.code:
						window.history.back();
						console.log('Exit button pressed');
						break;
					case keycode.Info.code:
						console.log('Info button pressed');
						if (AppVersionInformation.isDevVersion) {
							var el = document.getElementById('logContainer');
							if (el.style.visibility !== "visible") {
								el.style.visibility = "visible";
							} else {
								el.style.visibility = "hidden";
							}
						}
						break;
					default:
						for (var key in keycode) {
							if (keycode[key].code === kc) {
								console.debug("Key " + key + " pressed.");
								keycode[key].callback();
							}
						}
				}
			};

			tizen.tvinputdevice.registerKey("Exit");
			tizen.tvinputdevice.registerKey("Info");
		};

		/**
		 * Clears the currently selected button.
		 * @version 2.0.201
		 * @since 2.0.201
		 * @returns {undefined}
		 */
		this.clearActiveElement = function () {
			var se = document.getElementsByClassName("rcbutton_active")[0];
			se.classList.remove("rcbutton_active");
		};

		//		</editor-fold>
	}();
}());
