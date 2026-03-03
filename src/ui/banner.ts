import figlet from "figlet";
import gradient from "gradient-string";

export function renderBanner() {
    const text = figlet.textSync('Weather Zero X CLI', { font: 'Big' });
    console.log(gradient.pastel.multiline(text));
}