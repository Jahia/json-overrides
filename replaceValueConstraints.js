// replaceValueConstraints.js
const fs = require('fs');
const path = require('path');

const formPath = path.join('src', 'main', 'resources', 'META-INF', 'jahia-content-editor-forms', 'forms', 'cent_overridesContent.json');
const constraintsPath = 'constraints.json';

// Load files
const form = JSON.parse(fs.readFileSync(formPath, 'utf8'));
const constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));

// Find the "icon" field and replace its valueConstraints
form.sections.forEach(section => {
    section.fieldSets?.forEach(fieldSet => {
        fieldSet.fields?.forEach(field => {
            if (field.name === 'icon') {
                field.valueConstraints = constraints.valueConstraints;
            }
        });
    });
});

// Write back the updated form
fs.writeFileSync(formPath, JSON.stringify(form, null, 2));
console.log('valueConstraints updated in', formPath);
