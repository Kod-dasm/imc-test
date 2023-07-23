import { FormGenerator } from '@/components'
import { JsonObject } from '@/types/JsonObjects'
import { ref } from 'vue'

export default {
	components: {
		FormGenerator,
	},
	setup() {
		const jsonString = ref('')
		const showModalFormGenerator = ref(false)
		const jsonObjects = ref<JsonObject[] | void>()

		const isAnJsonObject = (obj: object): obj is JsonObject => 'type' in obj && 'code' in obj && 'parent' in obj
			&& (Object.keys(obj).length > 3 ? 'listdata' in obj && 'value' in obj || 'value' in obj && Object.keys(obj).length < 5 : true)

		const getJsonObject = (json: string): JsonObject[] | void => {
			try {
				const jsonObjects: JsonObject[] = JSON.parse(json)

				for (let i = 0; i < jsonObjects.length; i++) {
					if(!isAnJsonObject(jsonObjects[i])) {
						return
					}
				}

				return jsonObjects
			} catch (e) {
				return console.error('error =', e)
			}
		}

		const handleGenerateForm = (json: string) => {
			jsonObjects.value = getJsonObject(json)
			if(!jsonObjects.value) {
				return alert('Данный JSON не соответствует шаблону для генерации формы')
			}
			showModalFormGenerator.value = true
			return
		}

		return {
			jsonString,
			showModalFormGenerator,
			jsonObjects,
			handleGenerateForm
		}
	}
}
