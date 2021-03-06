<script lang="ts">
import { defineComponent } from '../../config/vue';
import { JsonForms, JsonFormsChangeEvent } from '../../config/jsonforms';
import { vanillaRenderers, mergeStyles, defaultStyles } from '../../src';
import '../../vanilla.css';

const schema = {
  properties: {
    string: {
      type: 'string',
      description: 'a string'
    },
    multiString: {
      type: 'string',
      description: 'a string'
    },
    boolean: {
      type: 'boolean',
      description: 'enable / disable number'
    },
    boolean2: {
      type: 'boolean',
      description: 'show / hide integer'
    },
    number: {
      type: 'number',
      description: 'a number'
    },
    integer: {
      type: 'integer',
      description: 'an integer'
    },
    enum: {
      type: 'string',
      enum: ['a', 'b', 'c'],
      description: 'an enum'
    },
    oneOfEnum: {
      oneOf: [
        { const: '1', title: 'Number 1' },
        { const: 'B', title: 'Foo' }
      ],
      description: 'one of enum'
    },
    date: {
      type: 'string',
      format: 'date',
      description: 'a date'
    },
    dateTime: {
      type: 'string',
      format: 'date-time',
      description: 'a date time'
    },
    time: {
      type: 'string',
      format: 'time',
      description: 'a time'
    },
    array: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'integer' }
        }
      }
    }
  },
  required: ['string', 'number']
} as any;

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/string'
            },
            {
              type: 'Control',
              scope: '#/properties/multiString'
            },
            {
              type: 'Control',
              scope: '#/properties/boolean'
            },
            {
              type: 'Control',
              scope: '#/properties/boolean2'
            },
            {
              type: 'Control',
              scope: '#/properties/number',
              rule: {
                effect: 'DISABLE',
                condition: {
                  scope: '#/properties/boolean',
                  schema: {
                    const: true
                  }
                }
              }
            }
          ]
        },
        {
          type: 'Group',
          label: 'My group',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/integer',
              rule: {
                effect: 'HIDE',
                condition: {
                  scope: '#/properties/boolean2',
                  schema: {
                    const: true
                  }
                }
              }
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/enum'
                },
                {
                  type: 'Control',
                  scope: '#/properties/oneOfEnum'
                },
                {
                  type: 'Control',
                  scope: '#/properties/date'
                }
              ]
            },
            {
              type: 'Control',
              scope: '#/properties/dateTime'
            },
            {
              type: 'Control',
              scope: '#/properties/time',
              options: {
                styles: {
                  control: {
                    root: 'control my-time'
                  }
                }
              }
            }
          ]
        }
      ]
    },
    {
      type: 'Label',
      text: 'This is my label'
    },
    {
      type: 'Control',
      scope: '#/properties/array',
      options: {
        childLabelProp: 'age'
      }
    }
  ]
} as any;

// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, { control: { root: 'my-control' } });

export default defineComponent({
  name: 'app',
  components: {
    JsonForms
  },
  data: function() {
    return {
      renderers: Object.freeze(vanillaRenderers),
      data: {
        number: 5
      },
      schema,
      uischema,
      config: {
        hideRequiredAsterisk: true
      }
    };
  },
  methods: {
    setSchema() {
      this.schema = {
        properties: {
          name: {
            type: 'string',
            title: 'NAME',
            description: 'The name'
          }
        }
      };
    },
    onChange(event: JsonFormsChangeEvent) {
      console.log(event);
      this.data = event.data;
    },
    switchAsterisk() {
      this.config.hideRequiredAsterisk = !this.config.hideRequiredAsterisk;
    },
    adaptData() {
      this.data.number = 10;
    },
    adaptUiSchema() {
      this.uischema.elements[0].elements[0].elements[1].options = {
        multi: true
      };
    }
  },
  provide() {
    return {
      styles: myStyles
    }
  }
});
</script>

<style scoped>
.form {
  max-width: 500px;
  flex: 1;
}
.container {
  display: flex;
}
.data {
  flex: 1;
}
</style>

<template>
  <div class="container">
    <div class="form">
      <json-forms
        :data="data"
        :schema="schema"
        :uischema="uischema"
        :renderers="renderers"
        :config="config"
        @change="onChange"
      />
      <button @click="setSchema">Set Schema</button>
      <button @click="switchAsterisk">Switch Asterisk</button>
      <button @click="adaptData">Adapt data</button>
      <button @click="adaptUiSchema">Adapt uischema</button>
    </div>
    <div class="data">
      <pre
        >{{ JSON.stringify(data, null, 2) }}
    </pre
      >
      <pre
        >{{ JSON.stringify(config, null, 2) }}
    </pre
      >
    </div>
  </div>
</template>
