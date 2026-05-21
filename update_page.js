const fs = require('fs');
const path = 'C:/xampp/htdocs/gulfoflex/src/app/products/[slug]/page.tsx'.replace(//g, '');
let content = fs.readFileSync(path, 'utf8');

// 1. Add import after the PipeLayerSectionClient import
const importLine = 'import PipeLayerSectionClient from "@/components/home/PipeLayerSectionClient";';
const newImport = importLine + '\nimport ProductAnimation from "@/components/products/ProductAnimation";';
if (content.indexOf('import ProductAnimation') === -1) {
    content = content.replace(importLine, newImport);
}

// 2. Find and replace the animation div block
const startMarker = '<div className="relative h-80 flex items-center justify-center overflow-hidden">';
const endMarker = '<div className="grid grid-cols-2 gap-px bg-white/[0.06]">';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1) { 
    if (content.indexOf('<ProductAnimation') !== -1) {
        console.log('ProductAnimation already exists');
        process.exit(0);
    }
    console.error('START MARKER NOT FOUND'); 
    process.exit(1); 
}
if (endIdx === -1) { console.error('END MARKER NOT FOUND'); process.exit(1); }

const blockBetween = content.slice(startIdx, endIdx);
const lastDivCloseIdx = blockBetween.lastIndexOf('</div>');
if (lastDivCloseIdx === -1) { console.error('CLOSE DIV NOT FOUND'); process.exit(1); }

const animBlockEnd = startIdx + lastDivCloseIdx + '</div>'.length;

const replacement = '                <ProductAnimation\n                  slug={slug}\n                  shortName={product.shortName}\n                  specValue={product.specs.find((s) => /thermal|conduct/i.test(s.label))?.value}\n                  productCount={Object.keys(products).length}\n                  index={Object.keys(products).indexOf(slug) + 1}\n                />';

content = content.slice(0, content.lastIndexOf('\n', startIdx) + 1) + replacement + content.slice(animBlockEnd);

fs.writeFileSync(path, content, 'utf8');
console.log('SUCCESS - file updated');
console.log('startIdx:', startIdx, 'animBlockEnd:', animBlockEnd);
