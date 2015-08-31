///<reference path="..\services.ts"/>

class StringControl implements JSONForms.IRenderer {

    priority = 2;

    render(element: IUISchemaElement, subSchema: SchemaElement, schemaPath: string, dataProvider: JSONForms.IDataProvider): JSONForms.IRenderDescription {
        var control = new JSONForms.ControlRenderDescription(dataProvider.data, subSchema, schemaPath, element.label);
        control['template'] = `<input type="text" id="${schemaPath}" class="form-control qb-control qb-control-string" data-jsonforms-model/>`;
        return control;
    }

    isApplicable(uiElement: IUISchemaElement, subSchema: SchemaElement, schemaPath: string):boolean {
        return uiElement.type == 'Control' && subSchema.type == 'string';
    }

}

var app = angular.module('jsonForms.stringControl', []);

app.run(['JSONForms.RenderService', function(RenderService) {
    RenderService.register(new StringControl());
}]);