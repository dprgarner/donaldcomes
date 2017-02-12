/* Adapted from tchouky's ZALGO text script generator */

//those go DOWN
var zalgo_down = [
  '\u0316', /*     ̖     */   '\u0317', /*     ̗     */   '\u0318', /*     ̘     */   '\u0319', /*     ̙     */
  '\u031c', /*     ̜     */   '\u031d', /*     ̝     */   '\u031e', /*     ̞     */   '\u031f', /*     ̟     */
  '\u0320', /*     ̠     */   '\u0324', /*     ̤     */   '\u0325', /*     ̥     */   '\u0326', /*     ̦     */
  '\u0329', /*     ̩     */   '\u032a', /*     ̪     */   '\u032b', /*     ̫     */   '\u032c', /*     ̬     */
  '\u032d', /*     ̭     */   '\u032e', /*     ̮     */   '\u032f', /*     ̯     */   '\u0330', /*     ̰     */
  '\u0331', /*     ̱     */   '\u0332', /*     ̲     */   '\u0333', /*     ̳     */   '\u0339', /*     ̹     */
  '\u033a', /*     ̺     */   '\u033b', /*     ̻     */   '\u033c', /*     ̼     */   '\u0345', /*     ͅ     */
  '\u0347', /*     ͇     */   '\u0348', /*     ͈     */   '\u0349', /*     ͉     */   '\u034d', /*     ͍     */
  '\u034e', /*     ͎     */   '\u0353', /*     ͓     */   '\u0354', /*     ͔     */   '\u0355', /*     ͕     */
  '\u0356', /*     ͖     */   '\u0359', /*     ͙     */   '\u035a', /*     ͚     */   '\u0323' /*     ̣     */
];

// rand funcs
//---------------------------------------------------

//gets an int between 0 (inclusive) and max (exclusive)
function rand(max) {
  return Math.floor(Math.random() * max);
}

//gets a random char from a zalgo char table
function rand_zalgo(array) {
  var ind = Math.floor(Math.random() * array.length);
  return array[ind];
}

//lookup char to know if its a zalgo char or not
function is_zalgo_char(c) {
  var i;
  for (i = 0; i < zalgo_down.length; i++)
    if (c == zalgo_down[i])
      return true;
  return false;
}

// main shit
//---------------------------------------------------
module.exports = function zalgoText(txt) {
  var newtxt = '';

  for (var i = 0; i < txt.length; i++) {
    if (is_zalgo_char(txt.substr(i, 1)))
      continue;

    var num_down;

    //add the normal character
    newtxt += txt.substr(i, 1);

    if (txt.length < 5) {
      // 'Normal' mode
      num_down = rand(16) / 2 + 1;
    } else {
      // 'Mini' mode
      num_down = rand(8);
    }

    for (var j = 0; j < num_down; j++)
      newtxt += rand_zalgo(zalgo_down);
  }

  return newtxt;
}
