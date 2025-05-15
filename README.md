# Jahia Content Editor Form Overrides

This repository provides custom form definitions and overrides for the Jahia Content Editor.  

Use this repository as an example to create your own custom forms for Jahia modules.

The main configuration files are located in:

`src/main/resources/META-INF/jahia-content-editor-forms/forms/`

## Directory Structure

- **forms/**  
  Contains JSON files that define or override content editor forms for Jahia modules.  
  Each file corresponds to a specific content type or form customization.

## Key Files

- **cent_overridesContent.json**  
  Customizes the form for a specific content type, including field constraints, default values, and icon selection.  
  The `valueConstraints` array for the `icon` field can be programmatically updated to include SVG icons.

## Usage

- Place your form override JSON files in the `forms/` directory.
- The Jahia platform will automatically detect and apply these overrides when the module is deployed.

## Updating Icon Constraints

To update the `valueConstraints` for icons:
1. Run the script `downloadIcons.js` to fetch the latest icons from the Iconify repository.
2. You will need to set up a GITHUB_TOKEN environment variable with a personal access token that has read access to the repository: https://github.com/iconify/icon-sets
3. Choose the icon set you want to use and specify it in the command line.
4. The script will download the icons and update the `valueConstraints` in the cent_overridesContent.json file.

```shell
./downloadIcons.sh "https://raw.githubusercontent.com/iconify/icon-sets/master/json/line-md.json"
```
This example shows how to generate a dropdown list of icons from the `line-md` icon set. 
It will create a file name icons.json in the current directory. As well as a file named constraints.json that contains the valueConstraints for the icon field in the cent_overridesContent.json file.

### Iconify Icon Sets
Iconify provides a wide range of icon sets. You can find the available icon sets here: [Iconify Icon Sets](https://github.com/iconify/icon-sets)
You could use one of the existing icon sets in your eact applications, this conversion tools shows how you could design a dropdown to offer your user to choose the icon visually

## JSON override structure
The JSON files should follow the Jahia Content Editor schema.
The structure typically includes:
- **name**: The name of the form or content type.
- **description**: A brief description of the form.
- **fields**: An array of field definitions, each containing:
  - **name**: The name of the field.
  - **type**: The type of the field (e.g., text, number, select).
  - **label**: The label displayed for the field in the editor.
  - **valueConstraints**: Constraints or options for the field values (e.g., dropdown options).
  - **defaultValue**: The default value for the field.
  - **required**: A boolean indicating if the field is required.
  - **selectorType**: The type of selector for the field (e.g., 'Choicelist', 'RichText', 'Checkbox', 'Category', 'Color', 'DateTimePicker', 'DatePicker', 'MultipleLeftRightSelector', 'Tag', 'Text', 'TextArea').

See the `cent_overridesContent.json` file for an example of how to structure your JSON overrides.


## Contributing

- Edit or add new JSON files in the `forms/` directory to customize content editor forms as needed.
- Follow Jahia's [Content Editor documentation](https://academy.jahia.com/documentation/content-editor) for schema details.

## License

This repository is provided under the terms of the MIT license.
