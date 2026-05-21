const fs = require('fs');
const path = 'c:/xampp/htdocs/gulfoflex/src/app/products/[slug]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add import after the PipeLayerSectionClient import
const importLine = 'import PipeLayerSectionClient from "@/components/home/PipeLayerSectionClient";';
const newImport = importLine + '\nimport ProductAnimation from "@/components/products/ProductAnimation";';
content = content.replace(importLine, newImport);

// 2. Find and replace the animation div block
const startMarker = '                <div className="relative h-80 flex items-center justify-center overflow-hidden">';
const endMarker = '                <div className="grid grid-cols-2 gap-px bg-white/[0.06]">';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1) { console.error('START MARKER NOT FOUND'); process.exit(1); }
if (endIdx === -1) { console.error('END MARKER NOT FOUND'); process.exit(1); }

const blockBetween = content.slice(startIdx, endIdx);
const lastDivCloseIdx = blockBetween.lastIndexOf('                </div>');
if (lastDivCloseIdx === -1) { console.error('CLOSE DIV NOT FOUND'); process.exit(1); }

const animBlockEnd = startIdx + lastDivCloseIdx + '                </div>'.length;

const replacement = `                <ProductAnimation
                  slug={slug}
                  shortName={product.shortName}
                  specValue={product.specs.find((s) => /thermal|conduct/i.test(s.label))?.value}
                  productCount={Object.keys(products).length}
                  index={Object.keys(products).indexOf(slug) + 1}
                />`;

content = content.slice(0, startIdx) + replacement + content.slice(animBlockEnd);

fs.writeFileSync(path, content, 'utf8');
console.log('SUCCESS - file updated');
console.log('startIdx:', startIdx, 'animBlockEnd:', animBlockEnd);

// Verify: show lines around the replacement
const lines = content.split('\n');
const replIdx = lines.findIndex(l => l.includes('ProductAnimation'));
console.log('\nContext around replacement (lines ' + (replIdx - 2) + ' to ' + (replIdx + 8) + '):');
lines.slice(Math.max(0, replIdx - 2), replIdx + 9).forEach((l, i) => console.log((replIdx - 2 + i + 1) + ': ' + l));
