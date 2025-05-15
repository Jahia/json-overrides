const fs = require('fs');

// Load and parse icons.json
const icons = JSON.parse(fs.readFileSync('icons.json', 'utf8'));

// Adjust this if your JSON structure is different
// For Iconify sets, icons are usually under icons property
const iconEntries = icons.icons ? Object.entries(icons.icons) : Object.entries(icons);

// Limit icon entries to 100 random icons
const randomIconEntries = iconEntries.sort(() => 0.5 - Math.random()).slice(0, 100);

const valueConstraints = randomIconEntries.map(([name, icon], idx) => ({
    value: {
        type: 'String',
        value: name
    },
    displayValue: name,
    displayValueKey: null,
    propertyList: [
        {
            name: 'iconStart',
            value: buildSvgFromBody(icon.body)
        }
    ]
}));

function buildSvgFromBody(body, width = 24, height = 24, viewBox = '0 0 24 24') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">${body}</svg>`;
}

console.log(JSON.stringify({ valueConstraints }, null, 2));
